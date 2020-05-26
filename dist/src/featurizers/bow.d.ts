import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Featurizes queries as bag of words.
 * The algorithm use the hashing trick to avoid having to store a vocabulary in the memory.
 */
export declare class BOW extends Featurizer {
    readonly id = "Bag-of-Words";
    readonly size: number;
    constructor(size: number);
    /**
     * @return A tensor of shape [size].
     */
    handleQuery(query: string): Promise<tf.Tensor1D>;
}
