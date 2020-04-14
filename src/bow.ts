import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { hashcode } from './utils/hashcode';

/**
 * Featurizes queries as bag of words.
 * The algorithm use the hashing trick to avoid having to store a vocabulary in the memory.
 */
export class BOW implements Featurizer {
    readonly size: number;

    constructor(size: number) {
        this.size = size;
    }

    /**
     * @return A tensor of shape [size].
     */
    async handleQuery(query: string): Promise<tf.Tensor1D> {
        return tf.tidy(() => {
            const indexes = query.split(' ').map((word) => hashcode(word) % this.size);

            return <tf.Tensor1D> tf.oneHot(indexes, this.size).asType('float32').sum(0);
        });
    }

    // eslint-disable-next-line class-methods-use-this
    resetDialog() {}
}
