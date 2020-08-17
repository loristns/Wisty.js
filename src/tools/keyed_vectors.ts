import * as tf from '@tensorflow/tfjs';
import { levenshteinDistance } from '../utils';

/**
 * A reusable class storing words embeddings for functions and class that needs it.
 */
export class KeyedVectors {
    private loaderFunction: () => Promise<string>;
    private vectors: {[key: string]: number[]};

    readonly size: number;
    private maxDistance: number;

    /**
     * Build a KeyedVector.
     *
     * @param loaderFunction A function that returns the json string containing the embedding.
     * @param size The dimension of the word embedding
     * @param maxDistance The maximum leveinshtein distance accepted to associate
     *                    a vector with a word out of vocabulary
     */
    constructor(loaderFunction: () => Promise<string>, size: number, maxDistance: number = 0.5) {
        this.loaderFunction = loaderFunction;
        this.size = size;
        this.maxDistance = maxDistance;
    }

    /**
     * Load the word embeddings.
     */
    async load() {
        this.vectors = JSON.parse(await this.loaderFunction());
    }

    /**
     * Check if the word embeddings were loaded.
     */
    isLoaded(): boolean {
        return this.vectors !== undefined;
    }

    /**
     * Return every keys stored as an array.
     */
    keys(): string[] {
        return Object.keys(this.vectors);
    }

    /**
     * Return the vector associated with a key.
     * If the key is not part of the vocabulary, it will use a similar key according to
     * the leveinshtein distance.
     * If no similar keys are below `maxDistance`, it will return undefined.
     */
    get(key: string): tf.Tensor1D {
        // If the token in in the vocabulary, just use its embedding.
        if (this.keys().includes(key)) {
            return tf.tensor1d(this.vectors[key]);
        }

        // If the token is out of vocabulary, use the most similarly spelled token instead.
        let bestKey: string;
        let lowestDistance: number = Infinity;

        this.keys().forEach((knownKey) => {
            const distance = levenshteinDistance(knownKey, key);

            if (distance < lowestDistance) {
                bestKey = knownKey;
                lowestDistance = distance;
            }
        });

        if (lowestDistance <= this.maxDistance) {
            return tf.tensor(this.vectors[bestKey]);
        }

        // If no tokens are enough similar, return undefined.
        return undefined;
    }
}
