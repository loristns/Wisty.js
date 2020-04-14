import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { Featurizer } from './featurizer';

/**
 * Featurizes queries using the Universal Sentence Encoder model.
 */
export class USE implements Featurizer {
    private encoder: use.UniversalSentenceEncoder;
    private emptyEncoding: tf.Tensor1D;

    readonly size = 512;

    /**
     * Initializes the Universal Sentence Encoder model.
     */
    async init() {
        this.encoder = await use.load();

        // Cache the empty string embed (for optimization purpose).
        this.emptyEncoding = await this.encodeQuery('');
    }

    /**
     * Encodes a query using the model.
     */
    private async encodeQuery(query: string): Promise<tf.Tensor1D> {
        const embed = await this.encoder.embed([query]);
        const squeezedEmbed = <tf.Tensor1D> embed.squeeze();
        tf.dispose(embed);

        return squeezedEmbed;
    }

    /**
     * @return A tensor of shape [512].
     */
    async handleQuery(query: string): Promise<tf.Tensor1D> {
        // When the query is empty, return the cached empty query encoding.
        if (!query) {
            return this.emptyEncoding.clone();
        }

        return this.encodeQuery(query);
    }

    // eslint-disable-next-line class-methods-use-this
    resetDialog() {}
}
