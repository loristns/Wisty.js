import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Featurizes queries using the Universal Sentence Encoder model.
 */
export declare class USE implements Featurizer {
    private encoder;
    private emptyEncoding;
    readonly size = 512;
    /**
     * Initializes the Universal Sentence Encoder model.
     */
    init(): Promise<void>;
    /**
     * Encodes a query using the model.
     */
    private encodeQuery;
    /**
     * @return A tensor of shape [512].
     */
    handleQuery(query: string): Promise<tf.Tensor1D>;
    resetDialog(): void;
}
