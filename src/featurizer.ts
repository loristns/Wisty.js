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
     * Resets the state of the featurizer (if the stateful feature is used).
     */
    resetDialog(): void;
}
