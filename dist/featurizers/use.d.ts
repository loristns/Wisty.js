import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
/**
 * Featurizes queries using the Universal Sentence Encoder model.
 */
export declare class USE extends Featurizer {
    readonly id = "Universal Sentence Encoder";
    private encoder;
    private emptyEncoding;
    readonly size = 512;
    init(actions: any[]): Promise<void>;
    /**
     * Encodes a query using the model.
     */
    private encodeQuery;
    handleQuery(query: string): Promise<tf.Tensor1D>;
}
