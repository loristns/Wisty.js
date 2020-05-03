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

        this.lstm = new LSTM(
            this.inputSize, this.hiddenSize, this.outputSize,
            this.optimizer, this.lstmDropout
        );

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
     * Get the features vector resulted from every featurizers.
     */
    private async handleQuery(query: string): Promise<tf.Tensor1D> {
        const features = await Promise.all(
            this.featurizers.map((featurizer) => featurizer.handleQuery(query))
        );

        // Add a zero to make tf.concat work consistently even with only one featurizer.
        features.push(tf.zeros([1]));
        const featuresVec = tf.concat(features);

        tf.dispose(features);

        return featuresVec;
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

        const inputs: tf.Tensor1D[] = [];
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

        const metrics = {
            epoch,
            ...tf.tidy(() => this.lstm.fitSequence(
                    <tf.Tensor2D> tf.stack(inputs),
                    <tf.Tensor2D> tf.stack(targets),
                    <tf.Tensor2D> tf.stack(masks)
            ))
        };

        // BUG: two tensors leak in the memory at each loop :/
        tf.dispose([inputs, targets]);

        return metrics;
    }


    /**
     * Trains the model using the training stories.
     */
    async train(stories: Story[], nEpochs: number = 12,
        onEpochEnd?: TrainingCallback): Promise<TrainingMetrics[]> {
        const metrics: TrainingMetrics[] = [];

        // For each epoch...
        for (let epoch = 0; epoch < nEpochs; epoch += 1) {
            let epochMetrics = [];

            // For each training story...
            stories.forEach((story) => {
                epochMetrics.push(this.fitStory(story, epoch));
            });

            // eslint-disable-next-line no-await-in-loop
            epochMetrics = await Promise.all(epochMetrics);

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

        const features = await this.handleQuery(query);
        const masks = this.getActionMask();

        const ys: tf.Tensor1D[] = [];
        let prediction;

        for (let i = 0; i < sampleSize; i += 1) {
            tf.dispose(prediction);

            prediction = this.lstm.predict(features, this.lstmC, this.lstmH, masks);
            ys.push(tf.tidy(() => prediction.y.div(temperature).softmax()));
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

        this.featurizers.forEach((featurizer) => {
            parameters[featurizer.id] = featurizer.export();
        });

        await Promise.all(Object.values(parameters));
        return JSON.stringify(parameters);
    }
}
