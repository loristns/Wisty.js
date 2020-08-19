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
    slots: {
        [slot: string]: any;
    };
}
/**
 * An utility class using HCN methods and Slots to offer an higher level API
 * looking like NLU librairies.
 */
export declare class NLUFormatter {
    private model;
    private slots;
    private LUSAction;
    constructor({ model, slots, LUSAction }: NLUFormatterArgs);
    /**
     * Turn a query into a NLU digest.
     */
    ask(query: string): Promise<NLUDigest>;
    /**
     * Reset the model state.
     */
    resetDialog(): void;
}
export {};
