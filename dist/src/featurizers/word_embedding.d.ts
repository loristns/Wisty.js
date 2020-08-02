import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Featurize queries by pooling words embedding using SWEM-concat(*).
 *
 * (*): Dinghan Shen, Guoyin Wang, Wenlin Wang, Martin Renqiang Min, Qinliang Su, Yizhe Zhang,
 *      Chunyuan Li, Ricardo Henao, Lawrence Carin- 2018.
 *      Baseline Needs More Love: On Simple Word-Embedding-Based Models and
 *      Associated Pooling Mechanisms.
 */
export declare class WordEmbedding extends Featurizer {
    readonly id = "Word Embedding";
    readonly size: number;
    private loaderFunction;
    private vectors;
    /**
     * @param loaderFunction A function that returns the json string containing the embedding.
     * @param size The dimension of the word embedding
     */
    constructor(loaderFunction: () => Promise<string>, size: number);
    init(actions: any[]): Promise<void>;
    handleQuery(query: string): Promise<tf.Tensor1D>;
}
