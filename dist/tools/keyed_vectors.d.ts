import * as tf from '@tensorflow/tfjs';
/**
 * Parameters for KeyedVectors.
 */
interface KeyedVectorsArgs {
    loaderFunction(): Promise<string>;
    size: number;
    tokenization?: 'word' | 'byte_pair';
    cased?: boolean;
    maxDistance?: number;
    unknownKey?: string;
}
/**
 * A reusable class storing words embeddings for functions and class that needs it.
 */
export declare class KeyedVectors {
    private vectors;
    private loaderFunction;
    readonly size: number;
    private tokenization;
    private cased;
    private trie;
    private maxDistance;
    private unknownKey;
    /**
     * Build a KeyedVector.
     */
    constructor({ loaderFunction, size, tokenization, cased, maxDistance, unknownKey }: KeyedVectorsArgs);
    /**
     * Return every keys stored as an array.
     */
    keys(): string[];
    /**
     * Load the word embeddings.
     */
    load(): Promise<void>;
    /**
     * Check if the word embeddings were loaded.
     */
    isLoaded(): boolean;
    /**
     * Return the vector associated with a key.
     * If the key is not part of the vocabulary, it will use a similar key according to
     * the leveinshtein distance.
     * If no similar keys are below `maxDistance`, it will return the unknown key vector or
     * undefined.
     */
    get(key: string): tf.Tensor1D;
    /**
     * Tokenize a string at each non-word character.
     *
     * @param text  A non tokenized text string.
     */
    private wordTokenize;
    /**
     * Tokenize a string based on the vocabulary.
     *
     * @param text A non tokenized text string.
     */
    private bytePairTokenize;
    /**
     * Tokenize a string based on the settings.
     *
     * @param text A raw text string.
     */
    tokenize(text: string): string[];
}
export {};
