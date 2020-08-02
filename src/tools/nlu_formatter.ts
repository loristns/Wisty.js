import { HCN } from '../models';
import { Slot } from '../slots';

/**
 * Parameters for NLUFormatter.
 */
interface NLUFormatterArgs {
    model: HCN;
    slots?: Slot<any>[];
    LUSAction?: string;
}

/**
 * An NLU digests containing the input query, the list of bot action to take,
 * the overall confidence of the turn (product of action's confidences) and slots values.
 */
interface NLUDigest {
    /**
     * The raw input query.
     */
    query: string;

    /**
     * An array of actions names.
     */
    actions: string[];

    /**
     * The overall confidence of the turn.
     */
    turnConfidence: number;

    /**
     * The value of each slot.
     */
    slots: {[slot: string]: any};
}

/**
 * An utility class using HCN methods and Slots to offer an higher level API
 * looking like NLU librairies.
 */
export class NLUFormatter {
    private model: HCN;
    private slots: Slot<any>[];
    private LUSAction: string;

    constructor({
        model,
        slots = [],
        LUSAction = 'LUS'
    }: NLUFormatterArgs) {
        this.model = model;
        this.slots = slots;
        this.LUSAction = LUSAction;
    }

    /**
     * Turn a query into a NLU digest.
     */
    async ask(query: string): Promise<NLUDigest> {
        const digest: NLUDigest = {
            query,
            actions: [],
            turnConfidence: 1,
            slots: {}
        };

        let { action, confidence } = await this.model.predict(query);

        while (action !== this.LUSAction) {
            digest.actions.push(action);
            digest.turnConfidence *= confidence;

            // eslint-disable-next-line no-await-in-loop
            ({ action, confidence } = await this.model.predict(''));
        }

        this.slots.forEach((slot) => {
            digest.slots[slot.id] = slot.getValue();
        });

        return digest;
    }

    /**
     * Reset the model state.
     */
    resetDialog() {
        this.model.resetDialog();
    }
}
