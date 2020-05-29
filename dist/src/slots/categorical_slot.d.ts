import * as tf from '@tensorflow/tfjs';
import { Slot } from './slot';
declare type Categories = {
    [category: string]: string[];
};
declare type CategoricalValue = {
    category: string;
    extract: string;
    score: number;
};
/**
 * Parameters for Categorical Slot constructor.
 */
interface CategoricalSlotArgs {
    /**
     * An object with the name of the category as a key and an array of synonyms that belong to
     * the category as a value.
     */
    categories: Categories;
    /**
     * The list of actions that can be taken by the model only when the slot is defined.
     */
    dependantActions?: String[];
    /**
     * The list of actions that can be taken by the model only when the slot is undefined.
     */
    invDependantActions?: String[];
    /**
     * The minimum similarity to get selected as a value. (based on Leveinshtein Distance)
     */
    threshold?: number;
}
export declare class CategoricalSlot extends Slot<CategoricalValue> {
    readonly id: string;
    readonly size: number;
    private categoryNames;
    private categories;
    private threshold;
    constructor({ categories, dependantActions, invDependantActions, threshold }: CategoricalSlotArgs);
    init(actions: any[]): Promise<void>;
    private oneHotValue;
    handleQuery(query: string): Promise<tf.Tensor1D>;
    getValue(): CategoricalValue;
}
export {};
