import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { KeyedVectors } from '../tools';
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
    private vectors;
    /**
     * @param vectors The keyed vectors storing the embeddings.
     */
    constructor(vectors: KeyedVectors);
    init(actions: any[]): Promise<void>;
    handleQuery(query: string): Promise<tf.Tensor1D>;
}
