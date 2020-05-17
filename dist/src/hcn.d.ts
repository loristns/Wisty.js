import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { Story } from './state';
interface Metrics {
    /**
     * Epoch of the training.
     *
     * Not defined for validation metrics.
     */
    epoch?: number;
    /**
     * Model's average loss.
     *
     * Only defined on training metrics.
     */
    loss?: number;
    /**
     * Accuracy of the model over the samples.
     *
     * Accuracy = proportion of correctly predicted samples.
     */
    accuracy: number;
    /**
     * Recall of the model over the samples.
     *
     * Recall = (number of correctly assigned samples to a label) / (number of samples that belong
     * to a label)
     */
    recall: number;
    /**
     * Precision of the model over the samples.
     *
     * Precision = (number of correctly assigned samples to a label) / (number of samples assigned
     * to a label)
     */
    precision: number;
    /**
     * Average confidence of the model in its prediction.
     * Ideally, this value should be approximatively equal to the model's accuracy.
     *
     * Only defined for validation metrics.
     */
    averageConfidence?: number;
    /**
     * The array of the indexes of failling samples (< 0.999 accuracy).
     */
    failingSamples: number[];
}
declare type TrainingCallback = (metrics: Metrics) => any;
/**
 * An implementation of Hybrid Code Networks(*) dialog manager.
 *
 * (*): Williams, Asadi, Zweig - 2017.
 *      Hybrid Code Networks: practical and efﬁcient end-to-end dialog control with supervised
 *      and reinforcement learning.
 */
export declare class HCN<Action> {
    private actions;
    private featurizers;
    private optimizer;
    private inputSize;
    private hiddenSize;
    private outputSize;
    private lstm;
    private lstmH;
    private lstmC;
    private lstmDropout;
    constructor(actions: Action[], featurizers: Featurizer[], hiddenSize?: number, optimizer?: tf.Optimizer, dropout?: number);
    /**
     * Initialize the model and it's featurizers.
     */
    init(): Promise<void>;
    /**
     * Resets the state of the featurizers
     */
    resetDialog(): void;
    /**
     * Get the data returned from every featurizer's handleQuery method.
     */
    private handleQuery;
    /**
     * Get the embedding vector resulted from every featurizers.
     */
    private getOptimizableFeatures;
    /**
     * Inform every featurizers of the taken action.
     */
    private handleAction;
    /**
     * Get the final action mask resulted from every featurizers.
     */
    private getActionMask;
    /**
     * Trains the model on a single training story.
     */
    private fitStory;
    /**
     * Trains the model using the training stories.
     */
    train(stories: Story[], nEpochs?: number, onEpochEnd?: TrainingCallback): Promise<Metrics>;
    /**
     * Predict an action resulting from the given query.
     */
    predict(query: string, sampleSize?: number, temperature?: number): Promise<{
        action: Action;
        confidence: number;
    }>;
    score(stories: Story[], sampleSize?: number, temperature?: number): Promise<Metrics>;
    /**
     * Load the models parameters from a JSON formatted string.
     */
    load(json: string): void;
    /**
     * Export the models parameters in a JSON format.
     */
    export(): Promise<string>;
}
export {};
