import * as tf from '@tensorflow/tfjs';
/**
 * A stateful featurizer that turns queries into numerical representations.
 */
export interface Featurizer {
    /**
     * The size of the vector returned by the featurizer.
     */
    readonly size: number;
    /**
     * Featurizes a text query into a numerical vector.
     * @async
     */
    handleQuery(query: string): Promise<tf.Tensor1D>;
    /**
     * Produce an action mask according to featurizer state.
     * (Generally, this method is implemented in stateful featurizers)
     *
     * @param actions The list of every actions
     * @returns An array of boolean mapping every actions availability.
     */
    getActionMask?(actions: any[]): boolean[];
    /**
     * Resets the state of the featurizer (if the stateful feature is used).
     */
    resetDialog(): void;
}
