import * as tf from '@tensorflow/tfjs';
import { Featurizer } from '../featurizers';
import { LSTM, Story, Metrics } from '../utils';

interface SampleData {
    targets: tf.Tensor1D,
    predictions: tf.Tensor1D,
    loss: number,
    isFailing: boolean
}

type TrainingCallback = (metrics: Metrics) => void;

/**
 * Parameters for HCN constructor.
 */
interface HCNConstructorArgs {
    /**
     * The list of actions the model can take.
     * (keeping the order the same is important for pretrained models)
     */
    actions: string[];

    /**
     * The list of featurizers the model uses.
     * (keeping the order the same is important for pretrained models)
     */
    featurizers: Featurizer[];

    /**
     * The output size of the LSTM cell.
     * Default is set to 32 units.
     */
    hiddenSize?: number;

    /**
     * The optimization algorithm used for training.
     * By default, Adam with a learning rate of 0.01 is used.
     */
    optimizer?: tf.Optimizer;

    /**
     * The percentage of units to dropout between the LSTM cell layer and the dense.
     * Useful for regularizing the model. It's disabled by default (value = 0).
     */
    dropout?: number;
}

/**
 * Parameters for HCN train method.
 */
interface HCNTrainArgs {
    /**
     * Training stories to learn from.
     */
    stories: Story[];

    /**
     * Number of times the model will be passed the whole set of training stories during training.
     * Default is set to 12 epochs.
     */
    nEpochs?: number;

    /**
     * After each epoch, this callback function will be executed with the metrics collected
     * during the epoch.
     */
    onEpochEnd?: TrainingCallback;
}

/**
 * An implementation of Hybrid Code Networks(*) dialog manager.
 *
 * (*): Williams, Asadi, Zweig - 2017.
 *      Hybrid Code Networks: practical and efﬁcient end-to-end dialog control with supervised
 *      and reinforcement learning.
 */
export class HCN {
    private actions: string[];
    private featurizers: Featurizer[];
    private optimizer: tf.Optimizer;

    private inputSize: number;
    private hiddenSize: number;
    private outputSize: number;

    private lstm: LSTM;
    private lstmH: tf.Tensor2D;
    private lstmC: tf.Tensor2D;
    private lstmDropout: number;

    /**
     * Defines the model.
     * To fully initialize the model, run the async init() method.
     */
    constructor({
        actions,
        featurizers,
        hiddenSize = 32,
        optimizer = tf.train.adam(0.01),
        dropout = 0
    }: HCNConstructorArgs) {
        this.actions = actions;
        this.featurizers = featurizers;
        this.optimizer = optimizer;

        this.hiddenSize = hiddenSize;
        this.outputSize = actions.length;

        this.lstmDropout = dropout;
    }

    /**
     * Initialize the model and its featurizers.
     */
    async init() {
        // Initialize asynchronously all featurizers.
        await Promise.all(
            this.featurizers.map((featurizer) => featurizer.init(this.actions))
        );

        // The model input size is the sum of the sizes of features vectors.
        this.inputSize = this.featurizers
            .map((featurizer) => featurizer.size)
            .reduce((acc, size) => acc + size, 1);

        this.lstm = new LSTM(this.inputSize, this.hiddenSize, this.outputSize, this.lstmDropout);

        this.resetDialog();
    }

    /**
     * Resets the state of the model and its featurizers.
     */
    resetDialog() {
        this.featurizers.forEach((featurizer) => featurizer.resetDialog());
        ({ c: this.lstmC, h: this.lstmH } = this.lstm.initLSTM());
    }

    /**
     * Get the data returned from every featurizer's handleQuery method.
     */
    private async handleQuery(query: string): Promise<any[]> {
        return Promise.all(
            this.featurizers.map((featurizer) => featurizer.handleQuery(query))
        );
    }

    /**
     * Get the embedding vector resulted from every featurizers.
     */
    private getOptimizableFeatures(features: tf.Tensor[]): tf.Tensor1D {
        return tf.tidy(() => {
            const embeddings = this.featurizers.map(
                (featurizer, idx) => featurizer.getOptimizableFeatures(features[idx])
            );

            // Add a zero to make tf.concat work consistently even with only one featurizer.
            embeddings.push(tf.zeros([1]));

            return <tf.Tensor1D> tf.concat(embeddings);
        });
    }

    /**
     * Inform every featurizers of the taken action.
     */
    private handleAction(action: string) {
        this.featurizers.map((featurizer) => featurizer.handleAction(action));
    }

    /**
     * Get the final action mask resulted from every featurizers.
     */
    private getActionMask(): tf.Tensor1D {
        return tf.tidy(() => this.featurizers
            // Get action mask and convert them to tensors.
            .map((featurizer) => <tf.Tensor1D> tf.tensor(
                featurizer.getActionMask(),
                undefined, 'float32'
            ))
            // Compute the product of every masks.
            .reduce((acc, mask) => tf.mul(acc, mask), tf.ones([this.actions.length])));
    }

    /**
     * Trains the model on a single training story.
     */
    private async fitStory(story: Story): Promise<SampleData> {
        this.resetDialog();

        // 1. Prepare the input data.
        const inputs: any[][] = [];
        const masks: tf.Tensor1D[] = [];
        const targets: tf.Tensor1D[] = [];

        // For each story's state...
        for (let stateIdx = 0; stateIdx < story.length; stateIdx += 1) {
            const state = story[stateIdx];

            // The query must be featurized before moving to the next state.
            // eslint-disable-next-line no-await-in-loop
            inputs.push(await this.handleQuery(state.query));

            masks.push(this.getActionMask());

            targets.push(
                <tf.Tensor1D> tf.oneHot(
                    this.actions.indexOf(state.action),
                    this.outputSize
                )
            );

            this.handleAction(state.action);
        }

        // 2. Fit the sequence.
        let data: SampleData;

        this.optimizer.minimize(() => {
            let { c, h } = this.lstm.initLSTM(false);

            // Make a prediction for each step of the input sequence.
            const predictions = inputs.map((features, idx) => {
                const statePred = this.lstm.predict(
                    <tf.Tensor1D> this.getOptimizableFeatures(features),
                    <tf.Tensor2D> c,
                    <tf.Tensor2D> h,
                    <tf.Tensor1D> masks[idx]
                );

                c = statePred.nc;
                h = statePred.nh;

                return statePred.y;
            });

            const targetsMatrix = tf.stack(targets);
            const predictionsMatrix = tf.stack(predictions);

            // Compare the predicted sequence with the target.
            const lossScalar = <tf.Scalar> tf.metrics.categoricalCrossentropy(
                targetsMatrix, predictionsMatrix
            ).mean();

            // Store the necessary data to build metrics.
            data = {
                targets: tf.keep(targetsMatrix.argMax(1)),
                predictions: tf.keep(predictionsMatrix.argMax(1)),
                loss: <number> lossScalar.arraySync(),
                isFailing: tf.metrics
                    .categoricalAccuracy(targetsMatrix, predictionsMatrix)
                    .mean()
                    .arraySync() < 0.999
            };

            // Return the loss to the optimizer to update the model.
            return lossScalar;
        });

        // BUG: two tensors leak in the memory at each loop :/
        tf.dispose([inputs, targets]);

        return data;
    }


    /**
     * Trains the model using the training stories.
     *
     * @returns Metrics collected from the last epoch (that correspond to the trained model).
     */
    async train({ stories, nEpochs = 12, onEpochEnd = undefined }: HCNTrainArgs): Promise<Metrics> {
        let epochMetrics: Metrics;

        // For each epoch...
        for (let epoch = 0; epoch < nEpochs; epoch += 1) {
            const allTargets: tf.Tensor1D[] = [];
            const allPredictions: tf.Tensor1D[] = [];
            const allLosses: number[] = [];
            const failingSamples: number[] = [];

            // For each training story...
            for (let storyIdx = 0; storyIdx < stories.length; storyIdx += 1) {
                // (Each story must be fitted sequentially)
                // eslint-disable-next-line no-await-in-loop
                const storyData = await this.fitStory(stories[storyIdx]);

                allTargets.push(storyData.targets);
                allPredictions.push(storyData.predictions);
                allLosses.push(storyData.loss);

                if (storyData.isFailing) {
                    failingSamples.push(storyIdx);
                }
            }

            // Build the metrics.
            const confusionMatrix = tf.tidy(() => tf.math.confusionMatrix(
                tf.concat(allTargets),
                tf.concat(allPredictions),
                this.outputSize
            ));

            const truePredictions = tf.tidy(() => confusionMatrix
                .mul(tf.eye(...confusionMatrix.shape))
                .sum(0));

            epochMetrics = {
                epoch,
                failingSamples,

                accuracy: <number> tf.tidy(() => (
                    truePredictions.sum().div(confusionMatrix.sum()).arraySync()
                )),

                recall: <number> tf.tidy(() => (
                    truePredictions.div(confusionMatrix.sum(1)).mean().arraySync()
                )),

                precision: <number> tf.tidy(() => (
                    truePredictions.div(confusionMatrix.sum(0)).mean().arraySync()
                )),

                loss: allLosses.reduce((a, b) => a + b) / allLosses.length
            };

            // Clear the tensors.
            tf.dispose(allTargets);
            tf.dispose(allPredictions);
            tf.dispose([truePredictions, confusionMatrix]);

            if (onEpochEnd !== undefined) {
                onEpochEnd(epochMetrics);
            }
        }

        this.resetDialog();
        return epochMetrics;
    }

    /**
     * Predict an action resulting from the given query.
     *
     * @param query The given query from the user.
     * @param temperature Temperature of the model softmax, used to calibrate confidence estimation.
     * @returns The predicted action from the model and its confidence.
     */
    async predict(query: string, temperature: number = 1):
        Promise<{action: string, confidence: number}> {
        // At inference, dropout is disabled
        this.lstm.dropout = 0;

        const features = this.getOptimizableFeatures(await this.handleQuery(query));
        const masks = this.getActionMask();

        const prediction = this.lstm.predict(features, this.lstmC, this.lstmH, masks, temperature);

        // Update lstm internal state
        tf.dispose([this.lstmC, this.lstmH]);
        this.lstmC = prediction.nc.clone();
        this.lstmH = prediction.nh.clone();

        const actionIdx = <number> tf.tidy(() => prediction.y.argMax().arraySync());
        const confidence = <number> tf.tidy(() => prediction.y.arraySync()[actionIdx]);

        // Clear the memory
        tf.dispose([features, masks]);
        tf.dispose(prediction);

        // Retablish dropout (just in case)
        this.lstm.dropout = this.lstmDropout;

        this.handleAction(this.actions[actionIdx]);

        return { action: this.actions[actionIdx], confidence };
    }

    /**
     * Evaluate the model using stories.
     * @param stories Validation stories to evaluate the model.
     * @param temperature Temperature of the model softmax, used to calibrate confidence estimation.
     * @returns Validation metrics based on the results from the stories.
     */
    async score(stories: Story[], temperature: number = 1): Promise<Metrics> {
        const targets: number[] = [];
        const predictions: number[] = [];
        const confidences: number[] = [];
        const failingSamples: number[] = [];

        // For each stories and states, make predictions.
        for (let storyIdx = 0; storyIdx < stories.length; storyIdx += 1) {
            this.resetDialog();

            for (let stateIdx = 0; stateIdx < stories[storyIdx].length; stateIdx += 1) {
                const state = stories[storyIdx][stateIdx];

                // eslint-disable-next-line no-await-in-loop
                const { action, confidence } = await this.predict(state.query, temperature);

                targets.push(this.actions.indexOf(state.action));
                predictions.push(this.actions.indexOf(action));
                confidences.push(confidence);

                if (action !== state.action && !failingSamples.includes(storyIdx)) {
                    failingSamples.push(storyIdx);
                }
            }
        }

        // Build a confusion matrix out of the prediction and build the metrics.
        const confusionMatrix = tf.tidy(() => tf.math.confusionMatrix(
            tf.tensor(targets), tf.tensor(predictions), this.outputSize
        ));

        const truePredictions = tf.tidy(() => confusionMatrix
            .mul(tf.eye(...confusionMatrix.shape))
            .sum(0));

        const metrics: Metrics = {
            failingSamples,

            accuracy: <number> tf.tidy(() => (
                truePredictions.sum().div(confusionMatrix.sum()).arraySync()
            )),

            recall: <number> tf.tidy(() => (
                truePredictions.div(confusionMatrix.sum(1)).mean().arraySync()
            )),

            precision: <number> tf.tidy(() => (
                truePredictions.div(confusionMatrix.sum(0)).mean().arraySync()
            )),

            averageConfidence: confidences.reduce((a, b) => a + b) / confidences.length
        };

        tf.dispose([truePredictions, confusionMatrix]);

        this.resetDialog();
        return metrics;
    }

    /**
     * Load the models parameters from a JSON formatted string.
     */
    load(json: string) {
        const parameters = JSON.parse(json);

        this.featurizers.forEach((featurizer) => {
            featurizer.load(parameters[featurizer.id]);
        });

        this.lstm.load(parameters.lstm);

        this.resetDialog();
    }

    /**
     * Export the models parameters in a JSON format.
     */
    async export(): Promise<string> {
        const parameters = { lstm: await this.lstm.export() };

        for (let idx = 0; idx < this.featurizers.length; idx += 1) {
            const featurizer = this.featurizers[idx];

            // eslint-disable-next-line no-await-in-loop
            parameters[featurizer.id] = await featurizer.export();
        }

        return JSON.stringify(parameters);
    }
}
