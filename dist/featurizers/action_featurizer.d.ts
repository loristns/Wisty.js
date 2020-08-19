import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Parameters for ActionFeaturizer constructor.
 */
interface ActionFeaturizerArgs {
    /**
     * Enable the masking of LUS when the user has just talked.
     * Enabled by default.
     */
    maskLUS?: boolean;
    /**
     * Enable the masking of the previous action.
     * Enabled by default.
     */
    maskPreviousAction?: boolean;
    /**
     * The action the bot takes to let the user talk.
     * Default to 'LUS' (acronym for Let User Speak).
     */
    LUSAction?: string;
}
/**
 * Rule-based featurizer improving model robustness.
 *
 * - Featurize the previous action the model has taken.
 * - Mask the LUS action when the user has just talked.
 *   (Force the model to reply at least once)
 * - Mask the previous action.
 *   (Prevent looping : the model can't take two times in a row the same action)
 */
export declare class ActionFeaturizer extends Featurizer {
    readonly id = "Action Featurizer";
    size: number;
    private LUSAction;
    private maskLUS;
    private maskPreviousAction;
    private userTalked;
    private previousAction;
    private embeddings;
    constructor({ maskLUS, maskPreviousAction, LUSAction }?: ActionFeaturizerArgs);
    init(actions: any[]): Promise<void>;
    handleQuery(query: string): Promise<tf.Tensor2D>;
    getOptimizableFeatures(data: tf.Tensor2D): tf.Tensor1D;
    handleAction(action: any): void;
    getActionMask(): boolean[];
    resetDialog(): void;
    load(parameters: {
        embeddings: number[][];
    }): void;
    export(): Promise<{
        embeddings: number[][];
    }>;
}
export {};
