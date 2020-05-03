import * as tf from '@tensorflow/tfjs';
declare type JSONSerializable = {
    [key: string]: any;
};
/**
 * A stateful featurizer that turns queries into numerical representations.
 */
export declare abstract class Featurizer {
    /**
     * An ID used by models for exportations.
     */
    readonly id: string;
    /**
     * The list of every action the model can take.
     */
    protected actions: any[];
    /**
     * The size of the vector returned by the featurizer.
     */
    readonly size: number;
    /**
     * Initialize the model, can be asynchronous async code.
     * This method is executed by the model during it's initialization,
     * it will also set the actions attribute.
     */
    init(actions: any[]): Promise<void>;
    /**
     * Featurizes a text query into a numerical vector.
     * @async
     */
    abstract handleQuery(query: string): Promise<tf.Tensor1D>;
    /**
     * Let the featurizer know what action the model has taken.
     */
    handleAction(action: any): void;
    /**
     * Produce an action mask according to featurizer state.
     * (Generally, this method is reimplemented in stateful featurizers)
     *
     * @returns An array of boolean mapping every actions availability.
     */
    getActionMask(): boolean[];
    /**
     * Resets the state of the featurizer (if the stateful feature is used).
     */
    resetDialog(): void;
    /**
     * Load parameters extracted from a JSON-like document.
     */
    load(parameters: JSONSerializable): void;
    /**
     * Export the featurizer's internal parameters to be serialized along the model.
     */
    export(): Promise<JSONSerializable>;
}
export {};
