import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { Featurizer } from './featurizer';

/**
 * Featurizes queries using the Universal Sentence Encoder model.
 */
export class USE extends Featurizer {
    readonly id = 'Universal Sentence Encoder';

    private encoder: use.UniversalSentenceEncoder;
    private emptyEncoding: tf.Tensor1D;

    readonly size = 512;

    async init(actions: any[]) {
        await super.init(actions);
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

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        // When the query is empty, return the cached empty query encoding.
        if (!query) {
            return this.emptyEncoding.clone();
        }

        return this.encodeQuery(query);
    }
}
