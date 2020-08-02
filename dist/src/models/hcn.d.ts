import * as tf from '@tensorflow/tfjs';
import { Featurizer } from '../featurizers';
import { Story, Metrics } from '../utils';
/**
 * @callback
 */
declare type TrainingCallback = (metrics: Metrics) => void;
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
     * Temperature of the model softmax, used to calibrate confidence estimation.
     * By default, the temperature is 1 but you usually want it higher to make less overconfident.
     */
    temperature?: number;
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
export declare class HCN {
    private actions;
    private featurizers;
    private optimizer;
    private inputSize;
    private hiddenSize;
    private outputSize;
    private lstm;
    private lstmH;
    private lstmC;
    private lstmTemperature;
    private lstmDropout;
    /**
     * Defines the model.
     *
     * To fully initialize the model, run the async *init()* method.
     */
    constructor({ actions, featurizers, hiddenSize, optimizer, temperature, dropout }: HCNConstructorArgs);
    /**
     * Initialize the model and its featurizers.
     */
    init(): Promise<void>;
    /**
     * Resets the state of the model and its featurizers.
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
     *
     * @returns Metrics collected from the last epoch (that correspond to the trained model).
     */
    train({ stories, nEpochs, onEpochEnd }: HCNTrainArgs): Promise<Metrics>;
    /**
     * Predict an action resulting from the given query.
     *
     * @param query The given query from the user.
     * @returns The predicted action from the model and its confidence.
     */
    predict(query: string): Promise<{
        action: string;
        confidence: number;
    }>;
    /**
     * Evaluate the model using stories.
     *
     * @param stories Validation stories to evaluate the model.
     * @returns Validation metrics based on the results from the stories.
     */
    score(stories: Story[]): Promise<Metrics>;
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
