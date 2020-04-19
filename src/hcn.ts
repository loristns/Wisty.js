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

    private inputSize: number;
    private outputSize: number;

    private lstm: LSTM;
    private lstmH: tf.Tensor2D;
    private lstmC: tf.Tensor2D;
    private lstmDropout: number;

    constructor(actions: Action[], featurizers: Featurizer[], hiddenSize: number = 128,
        optimizer: tf.Optimizer = tf.train.adam(0.01), dropout: number = 0.2) {
        this.actions = actions;
        this.featurizers = featurizers;

        // The model input size is the sum of the sizes of features vectors.
        this.inputSize = featurizers
            .map((featurizer) => featurizer.size)
            .reduce((acc, size) => acc + size, 1);

        this.outputSize = actions.length;

        this.lstm = new LSTM(this.inputSize, hiddenSize, this.outputSize, optimizer, dropout);
        this.lstmDropout = dropout;

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
    private async featurize(query: string): Promise<tf.Tensor1D> {
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
     * Trains the model on a single training story.
     */
    private async fitStory(story: Story, epoch: number): Promise<TrainingMetrics> {
        this.resetDialog();

        const inputs: tf.Tensor1D[] = [];
        const targets: tf.Tensor1D[] = [];

        // For each story's state...
        for (let stateIdx = 0; stateIdx < story.length; stateIdx += 1) {
            const state = story[stateIdx];

            // The query must be featurized before moving to the next state.
            // eslint-disable-next-line no-await-in-loop
            inputs.push(await this.featurize(state.query));

            targets.push(
                <tf.Tensor1D> tf.oneHot(
                    this.actions.indexOf(state.action),
                    this.outputSize
                )
            );
        }

        const metrics = {
            epoch,
            ...tf.tidy(() => this.lstm.fitSequence(
                    <tf.Tensor2D> tf.stack(inputs),
                    <tf.Tensor2D> tf.stack(targets)
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
        if (sampleSize === 1) this.lstm.dropout = 0;

        const features = await this.featurize(query);
        const ys: tf.Tensor1D[] = [];
        let prediction;

        for (let i = 0; i < sampleSize; i += 1) {
            tf.dispose(prediction);

            prediction = this.lstm.predict(features, this.lstmC, this.lstmH);
            ys.push(tf.tidy(() => prediction.y.div(temperature).softmax()));
        }

        tf.dispose([this.lstmC, this.lstmH]);
        this.lstmC = prediction.nc.clone();
        this.lstmH = prediction.nh.clone();

        const { mean: y, variance } = tf.tidy(() => tf.moments(tf.stack(ys), 0));
        const actionIdx = <number> tf.tidy(() => y.argMax().arraySync());
        const confidence = <number> 1 - tf.tidy(() => variance.sqrt().arraySync()[actionIdx]);

        tf.dispose([features, y, variance]);
        tf.dispose(prediction);
        tf.dispose(ys);

        return { action: this.actions[actionIdx], confidence };
    }

    /**
     * Load the models parameters from a JSON formatted string.
     */
    load(json: string) {
        tf.tidy(() => {
            const weights = JSON.parse(json);

            // Convert arrays into tensors
            Object.entries(weights)
                .forEach(([key, array]) => {
                    weights[key] = tf.tensor(<any[]> array).variable();
                });

            this.lstm.setWeights(weights);
        });
    }

    /**
     * Export the models parameters in a JSON format.
     */
    export(): string {
        return tf.tidy(() => {
            const weights = {};

            // Convert tensors into arrays
            Object.entries(this.lstm.getWeights())
                .forEach(([key, tensor]) => {
                    weights[key] = tensor.arraySync();
                });

            return JSON.stringify(weights);
        });
    }
}
