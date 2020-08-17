import * as tf from '@tensorflow/tfjs';
/**
 * A reusable class storing words embeddings for functions and class that needs it.
 */
export declare class KeyedVectors {
    private loaderFunction;
    private vectors;
    readonly size: number;
    private maxDistance;
    /**
     * Build a KeyedVector.
     *
     * @param loaderFunction A function that returns the json string containing the embedding.
     * @param size The dimension of the word embedding
     * @param maxDistance The maximum leveinshtein distance accepted to associate
     *                    a vector with a word out of vocabulary
     */
    constructor(loaderFunction: () => Promise<string>, size: number, maxDistance?: number);
    /**
     * Load the word embeddings.
     */
    load(): Promise<void>;
    /**
     * Check if the word embeddings were loaded.
     */
    isLoaded(): boolean;
    /**
     * Return every keys stored as an array.
     */
    keys(): string[];
    /**
     * Return the vector associated with a key.
     * If the key is not part of the vocabulary, it will use a similar key according to
     * the leveinshtein distance.
     * If no similar keys are below `maxDistance`, it will return undefined.
     */
    get(key: string): tf.Tensor1D;
}
