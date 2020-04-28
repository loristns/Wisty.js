import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
declare type Categories = {
    [category: string]: string[];
};
declare type Value = {
    category: string;
    extract: string;
    score: number;
};
export declare class CategoricalSlot implements Featurizer {
    readonly size: number;
    private categoryNames;
    private categories;
    private dependantActions;
    private inverselyDependantActions;
    private threshold;
    private value;
    constructor(categories: Categories, dependantActions?: any[], inverselyDependantActions?: any[], threshold?: number);
    private featurizeValue;
    handleQuery(query: string): Promise<tf.Tensor1D>;
    getActionMask(actions: any[]): boolean[];
    resetDialog(): void;
    getValue(): Value;
}
export {};
