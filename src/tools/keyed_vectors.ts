import * as tf from '@tensorflow/tfjs';
import { levenshteinDistance } from '../utils';

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
export class KeyedVectors {
    private vectors: {[key: string]: number[]};

    private loaderFunction: () => Promise<string>;

    readonly size: number;
    private tokenization: 'word' | 'byte_pair';
    private cased: boolean;

    private maxDistance: number;
    private unknownKey: string;

    /**
     * Build a KeyedVector.
     */
    constructor({
        loaderFunction,
        size,
        tokenization = 'word',
        cased = false,
        maxDistance = 0.5,
        unknownKey = undefined
    }: KeyedVectorsArgs) {
        if (!['word', 'byte_pair'].includes(tokenization)) {
            throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"');
        }

        this.loaderFunction = loaderFunction;

        this.size = size;
        this.tokenization = tokenization;
        this.cased = cased;

        this.maxDistance = maxDistance;
        this.unknownKey = unknownKey;
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
     * If no similar keys are below `maxDistance`, it will return the unknown key vector or
     * undefined.
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

        // If no tokens are enough similar, return the unknownKey vector or undefined.
        if (this.unknownKey !== undefined) {
            return tf.tensor(this.vectors[this.unknownKey]);
        }

        return undefined;
    }

    /**
     * Tokenize a string at each non-word character.
     *
     * @param text  A non tokenized text string.
     */
    // eslint-disable-next-line class-methods-use-this
    private wordTokenize(text: string): string[] {
        return text.split(/\W/g).filter((token) => token.length > 0);
    }

    /**
     * Tokenize a string based on the vocabulary.
     *
     * @param text A non tokenized text string.
     */
    private bytePairTokenize(text: string): string[] {
        const toktext = ` ${text}`.split(' ').join('▁');
        const maxLength = this.keys().reduce((acc, curr) => acc + curr.length, 0);

        const tokens = [];
        let startPos = 0;
        let endPos = maxLength;

        while (startPos < maxLength) {
            const token = toktext.substring(startPos, endPos);

            // Simplest case : the actual token is in the vocabulary.
            if (this.keys().includes(token)) {
                tokens.push(token); // Add the token

                // Skip the added token and start over.
                startPos = endPos;
                endPos = startPos + maxLength;

            // No tokens were found in the vocabulary starting with the character at startPos.
            } else if (token === '') {
                // Add an unknown token except if the previous token is also an unknown token.
                if (tokens[tokens.length - 1] !== this.unknownKey) tokens.push(this.unknownKey);

                // Start over, at the next character.
                startPos += 1;
                endPos = startPos + maxLength;

            // The token is a space.
            } else if (token === '▁') {
                // Skip the space and start over.
                startPos += 1;
                endPos = startPos + maxLength;

            // Else, we just try removing a character at the end.
            } else {
                endPos -= 1;
            }
        }

        return tokens;
    }

    /**
     * Tokenize a string based on the settings.
     *
     * @param text A raw text string.
     */
    tokenize(text: string): string[] {
        if (this.cased) {
            // eslint-disable-next-line no-param-reassign
            text = text.toLowerCase();
        }

        switch (this.tokenization) {
        case 'word':
            return this.wordTokenize(text);

        case 'byte_pair':
            return this.bytePairTokenize(text);

        default:
            throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"');
        }
    }
}
