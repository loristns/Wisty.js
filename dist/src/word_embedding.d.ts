import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Featurize queries by averaging word embedding.
 */
export declare class WordEmbedding extends Featurizer {
    readonly id = "Word Embedding";
    readonly size: number;
    private loaderFunction;
    private vectors;
    /**
     * @param loaderFunction A function that loads the json string containing the embedding.
     * @param size The dimension of the word embedding
     */
    constructor(loaderFunction: () => Promise<string>, size: number);
    init(actions: any[]): Promise<void>;
    handleQuery(query: string): Promise<tf.Tensor1D>;
}
