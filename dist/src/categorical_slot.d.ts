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
export declare class CategoricalSlot extends Featurizer {
    readonly id: string;
    readonly size: number;
    private categoryNames;
    private categories;
    private dependantActions;
    private inverselyDependantActions;
    private threshold;
    private value;
    constructor(categories: Categories, dependantActions?: any[], inverselyDependantActions?: any[], threshold?: number);
    init(actions: any[]): Promise<void>;
    private featurizeValue;
    handleQuery(query: string): Promise<tf.Tensor1D>;
    getActionMask(): boolean[];
    resetDialog(): void;
    getValue(): Value;
}
export {};
