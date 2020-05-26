import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { initializeVariable } from '../utils';

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
     * Default to 'LUS' (acronym for Let User Speak)
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
export class ActionFeaturizer extends Featurizer {
    readonly id = 'Action Featurizer';
    size: number;

    private LUSAction: any;
    private maskLUS: boolean;
    private maskPreviousAction: boolean;

    private userTalked: boolean;
    private previousAction: any;

    private embeddings: tf.Tensor;

    constructor({
        maskLUS = true,
        maskPreviousAction = true,
        LUSAction = 'LUS'
    }: ActionFeaturizerArgs = { maskLUS: true, maskPreviousAction: true, LUSAction: 'LUS' }) {
        super();
        this.maskLUS = maskLUS;
        this.maskPreviousAction = maskPreviousAction;
        this.LUSAction = LUSAction;

        this.resetDialog();
    }

    async init(actions: any[]) {
        await super.init(actions);

        this.size = actions.length;
        this.embeddings = initializeVariable([this.size, this.size]);
    }

    async handleQuery(query: string): Promise<tf.Tensor2D> {
        return tf.tidy(() => {
            this.userTalked = query !== '';

            // One-hot encode the previous action.
            return <tf.Tensor2D> tf.oneHot(
                [this.actions.indexOf(this.previousAction)],
                this.actions.length
            );
        });
    }

    getOptimizableFeatures(data: tf.Tensor2D): tf.Tensor1D {
        return <tf.Tensor1D> data.matMul(this.embeddings).squeeze();
    }

    handleAction(action: any) {
        // Store the new action if it's not the LUS action.
        this.previousAction = action !== this.LUSAction ? action : this.previousAction;
    }

    getActionMask(): boolean[] {
        const mask = super.getActionMask();

        // Mask LUS when the user talk and the option is enabled.
        if (this.maskLUS && this.userTalked) {
            mask[this.actions.indexOf(this.LUSAction)] = false;
        }

        // Mask the previous action when the option is enabled and if applicable.
        if (this.maskPreviousAction && this.actions.includes(this.previousAction)) {
            mask[this.actions.indexOf(this.previousAction)] = false;
        }

        return mask;
    }

    resetDialog() {
        this.userTalked = false;
        this.previousAction = undefined;
    }

    load(parameters: {embeddings: number[][]}) {
        this.embeddings = tf.tidy(() => tf.tensor(parameters.embeddings).variable());
    }

    async export(): Promise<{embeddings: number[][]}> {
        return {
            embeddings: <number[][]> await this.embeddings.array()
        };
    }
}
