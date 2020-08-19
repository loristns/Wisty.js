import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Featurizes queries as bag of words.
 *
 * The algorithm uses the [hashing trick](https://en.wikipedia.org/wiki/Feature_hashing) to avoid
 * having to store a vocabulary in the memory.
 */
export declare class BOW extends Featurizer {
    readonly id = "Bag-of-Words";
    readonly size: number;
    /**
     * @param size The vocabulary size you allow to the featurizer.
     */
    constructor(size: number);
    handleQuery(query: string): Promise<tf.Tensor1D>;
}
