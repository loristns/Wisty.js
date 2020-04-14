import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { Story } from './state';
export declare type TrainingMetrics = {
    epoch: number;
    loss: number;
    accuracy: number;
};
declare type TrainingCallback = (metrics: TrainingMetrics[]) => any;
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
    private inputSize;
    private outputSize;
    private lstm;
    private lstmH;
    private lstmC;
    private lstmAttK;
    private lstmAttV;
    constructor(actions: Action[], featurizers: Featurizer[], hiddenSize?: number, optimizer?: tf.Optimizer);
    /**
     * Resets the state of the featurizers
     */
    resetDialog(): void;
    /**
     * Get the features vector resulted from every featurizers.
     */
    private featurize;
    /**
     * Trains the model on a single training story.
     */
    private fitStory;
    /**
     * Trains the model using the training stories.
     */
    train(stories: Story[], nEpochs?: number, onEpochEnd?: TrainingCallback): Promise<TrainingMetrics[]>;
    /**
     * Predict an action resulting from the given query.
     */
    predict(query: string): Promise<Action>;
}
export {};
