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
     * Featurizes and handle a text query.
     *
     * This method can directly return a 1D tensor to provide features to the model.
     * Alternatively, it can returns data of any type if the Featurizer implement a custom
     * getOptimizableFeatures method to handle those data.
     * @async
     */
    abstract handleQuery(query: string): Promise<any>;
    /**
     * Turn the data returned by handleQuery into an embedding vector.
     * This function is used to expose featurizer variables to the model optimizer for training.
     *
     * Reimplementing this method is not necessary if your featurizer is not meant to be optimizable
     * through gradient descent.
     * In this case, just return the feature vector directly using the handleQuery method.
     *
     * It's important to keep this function stateless, it should only depend of its tensor argument
     * and of featurizer's variables.
     */
    getOptimizableFeatures(data: any): tf.Tensor1D;
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
