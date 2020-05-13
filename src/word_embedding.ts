import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { levenshteinDistance } from './utils/levenshtein_distance';

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

    private loaderFunction: () => Promise<string>;
    private vectors: {[word: string]: number[]};

    /**
     * @param loaderFunction A function that loads the json string containing the embedding.
     * @param size The dimension of the word embedding
     */
    constructor(loaderFunction: () => Promise<string>, size: number) {
        super();
        this.size = 2 * size;
        this.loaderFunction = loaderFunction;
    }

    async init(actions: any[]) {
        await super.init(actions);
        this.vectors = JSON.parse(await this.loaderFunction());
    }

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        return <tf.Tensor1D> tf.tidy(() => {
            const tokens = query.toLowerCase() // Word embeddings are uncased.
                .split(/\W/g) // Tokenize at each non-word character.
                .filter((token) => token.length > 0);

            const embeddings: tf.Tensor1D[] = [];

            tokens.forEach((token) => {
                // If the token in in the vocabulary, just use its embedding.
                if (Object.keys(this.vectors).includes(token)) {
                    embeddings.push(tf.tensor(this.vectors[token]));

                // If the token is out of vocabulary, use the most similarly spelled token instead.
                } else {
                    let bestToken: string;
                    let lowestDistance: number = Infinity;

                    Object.keys(this.vectors).forEach((vocabToken) => {
                        const distance = levenshteinDistance(vocabToken, token);

                        if (distance < lowestDistance) {
                            bestToken = vocabToken;
                            lowestDistance = distance;
                        }
                    });

                    if (lowestDistance < 0.5) {
                        embeddings.push(tf.tensor(this.vectors[bestToken]));
                    }
                }
            });

            // When there is no embeddable tokens, return a zeros vector.
            if (embeddings.length === 0) {
                return tf.zeros([this.size]);
            }

            const embeddingsMatrix = tf.stack(embeddings);

            return tf.concat([embeddingsMatrix.mean(0), embeddingsMatrix.max(0)]);
        });
    }
}
