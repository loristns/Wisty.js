import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { LSTM } from './lstm';
import { Story } from './state';

export type TrainingMetrics = {epoch: number, loss: number, accuracy: number};
type TrainingCallback = (metrics: TrainingMetrics[]) => any;

/**
 * An implementation of Hybrid Code Networks(*) dialog manager.
 *
 * (*): Williams, Asadi, Zweig - 2017.
 *      Hybrid Code Networks: practical and efﬁcient end-to-end dialog control with supervised
 *      and reinforcement learning.
 */
export class HCN<Action> {
    private actions: Action[];
    private featurizers: Featurizer[];
    private optimizer: tf.Optimizer;

    private inputSize: number;
    private hiddenSize: number;
    private outputSize: number;

    private lstm: LSTM;
    private lstmH: tf.Tensor2D;
    private lstmC: tf.Tensor2D;
    private lstmDropout: number;

    constructor(actions: Action[], featurizers: Featurizer[], hiddenSize: number = 128,
        optimizer: tf.Optimizer = tf.train.adam(0.01), dropout: number = 0.2) {
        this.actions = actions;
        this.featurizers = featurizers;
        this.optimizer = optimizer;

        this.hiddenSize = hiddenSize;
        this.outputSize = actions.length;

        this.lstmDropout = dropout;
    }

    /**
     * Initialize the model and it's featurizers.
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
     * Resets the state of the featurizers
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
    private handleAction(action: Action) {
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
    private async fitStory(story: Story, epoch: number): Promise<TrainingMetrics> {
        this.resetDialog();

        // Prepare the input data.

        const inputs: tf.Tensor[][] = [];
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

        // Fit the sequence.

        let loss: number;
        let accuracy: number;

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

            // Compare the predicted sequence with the target.
            const lossScalar = <tf.Scalar> tf.metrics.categoricalCrossentropy(
                tf.stack(targets),
                tf.stack(predictions)
            ).mean();

            // Store the loss and accuracy measures.
            loss = <number> lossScalar.arraySync();
            accuracy = <number> tf.metrics.categoricalAccuracy(
                tf.stack(targets),
                tf.stack(predictions)
            ).mean().arraySync();

            // Return the loss to the optimizer to update the model.
            return lossScalar;
        });

        // BUG: two tensors leak in the memory at each loop :/
        tf.dispose([inputs, targets]);

        return { epoch, loss, accuracy };
    }


    /**
     * Trains the model using the training stories.
     */
    async train(stories: Story[], nEpochs: number = 12,
        onEpochEnd?: TrainingCallback): Promise<TrainingMetrics[]> {
        const metrics: TrainingMetrics[] = [];

        // For each epoch...
        for (let epoch = 0; epoch < nEpochs; epoch += 1) {
            const epochMetrics = [];

            // For each training story...
            for (let storyIdx = 0; storyIdx < stories.length; storyIdx += 1) {
                // (Each story must be fitted sequentially)
                // eslint-disable-next-line no-await-in-loop
                epochMetrics.push(await this.fitStory(stories[storyIdx], epoch));
            }

            if (onEpochEnd !== undefined) {
                onEpochEnd(epochMetrics);
            }

            metrics.push(...epochMetrics);
        }

        this.resetDialog();
        return metrics;
    }

    /**
     * Predict an action resulting from the given query.
     */
    async predict(query: string, sampleSize: number = 10,
        temperature: number = 1): Promise<{action: Action, confidence: number}> {
        // If the prediction is done without sampling, dropout is disabled.
        if (sampleSize === 1) {
            this.lstm.dropout = 0;
        } else {
            this.lstm.dropout = this.lstmDropout;
        }

        const features = this.getOptimizableFeatures(await this.handleQuery(query));
        const masks = this.getActionMask();

        const ys: tf.Tensor1D[] = [];
        let prediction;

        for (let i = 0; i < sampleSize; i += 1) {
            tf.dispose(prediction);

            prediction = this.lstm.predict(features, this.lstmC, this.lstmH, masks, temperature);
            ys.push(prediction.y);
        }

        tf.dispose([this.lstmC, this.lstmH]);
        this.lstmC = prediction.nc.clone();
        this.lstmH = prediction.nh.clone();

        const { mean: y, variance } = tf.tidy(() => tf.moments(tf.stack(ys), 0));

        const actionIdx = <number> tf.tidy(() => y.argMax().arraySync());
        const confidence = <number> tf.tidy(() => y.sub(variance.sqrt()).arraySync()[actionIdx]);

        tf.dispose([features, masks, y, variance]);
        tf.dispose(prediction);
        tf.dispose(ys);

        this.handleAction(this.actions[actionIdx]);

        return { action: this.actions[actionIdx], confidence };
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
