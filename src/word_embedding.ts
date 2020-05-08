import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';

/**
 * Featurize queries by averaging word embedding.
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
        this.size = size;
        this.loaderFunction = loaderFunction;
    }

    async init(actions: any[]) {
        await super.init(actions);
        this.vectors = JSON.parse(await this.loaderFunction());
    }

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        return tf.tidy(() => {
            const tokens = query.toLowerCase() // Word embeddings are uncased.
                // Tokenize each non-word.
                .split(/\W/g)
                // Keep only words in the vocabulary
                .filter((token) => Object.keys(this.vectors).includes(token));

            // When there is no tokens
            if (tokens.length === 0) {
                return <tf.Tensor1D> tf.zeros([this.size]);
            }

            return <tf.Tensor1D> tf.stack(
                tokens.map((token) => tf.tensor(this.vectors[token]))
            ).mean(0);
        });
    }
}
