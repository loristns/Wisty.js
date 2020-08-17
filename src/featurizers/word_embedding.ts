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
export class WordEmbedding extends Featurizer {
    readonly id = 'Word Embedding';
    readonly size: number;

    private vectors: KeyedVectors;

    /**
     * @param vectors The keyed vectors storing the embeddings.
     */
    constructor(vectors: KeyedVectors) {
        super();
        this.size = 2 * vectors.size;
        this.vectors = vectors;
    }

    async init(actions: any[]) {
        await super.init(actions);

        if (!this.vectors.isLoaded()) await this.vectors.load();
    }

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        return <tf.Tensor1D> tf.tidy(() => {
            const tokens = query.toLowerCase() // Word embeddings are uncased.
                .split(/\W/g) // Tokenize at each non-word character.
                .filter((token) => token.length > 0);

            const embeddings: tf.Tensor1D[] = [];

            tokens.forEach((token) => embeddings.push(this.vectors.get(token)));
            embeddings.filter((v) => v !== undefined);

            // When there is no embeddable tokens, return a zeros vector.
            if (embeddings.length === 0) {
                return tf.zeros([this.size]);
            }

            const embeddingsMatrix = tf.stack(embeddings);

            return tf.concat([embeddingsMatrix.mean(0), embeddingsMatrix.max(0)]);
        });
    }
}
