import * as tf from '@tensorflow/tfjs';
declare type LSTMPrediction = {
    y: tf.Tensor1D;
    nc: tf.Tensor2D;
    nh: tf.Tensor2D;
};
/**
 * An LSTM cell with a dense layer on its top.
 */
export declare class LSTM {
    private lstmKernel;
    private lstmBias;
    private lstmForgetBias;
    private lstmInitH;
    private lstmInitC;
    private denseWeights;
    private denseBias;
    private optimizer;
    dropout: number;
    /**
     * @param inputSize The dimension of the input data.
     * @param hiddenSize The dimension of the output of the LSTM, passed to the dense layer.
     * @param outputSize The dimension of the output data.
     * @param optimizer The optimizer the model should use to train itself.
     * @param dropout The dropout rate between the LSTM cell and the dense layer.
     */
    constructor(inputSize: number, hiddenSize: number, outputSize: number, optimizer?: tf.Optimizer, dropout?: number);
    /**
     * Utility method randomly initializing a variable of a given shape.
     */
    private static randomVariable;
    /**
     * Gives the initial state values of the LSTM (c and h).
     */
    initLSTM(): {
        c: tf.Tensor2D;
        h: tf.Tensor2D;
    };
    /**
     * Make a prediction given an input and state values (c and h).
     * @param x A vector of shape [inputSize].
     * @param c LSTM's state value.
     * @param h LSTM's last output value.
     * @param mask A vector of ones and zeros of shape [outputSize].
     */
    predict(x: tf.Tensor1D, c: tf.Tensor2D, h: tf.Tensor2D, mask?: tf.Tensor1D): LSTMPrediction;
    /**
     * Train the model from a sequence.
     * @param inputSeq The input matrix of shape [length, inputSize].
     * @param targetSeq The expected output matrix of shape [length, outputSize].
     * @param maskSeq The mask matrix of shape [length, outputSize].
     * @returns Loss and accuracy of the model prediction.
     */
    fitSequence(inputSeq: tf.Tensor2D, targetSeq: tf.Tensor2D, maskSeq?: tf.Tensor2D): {
        loss: number;
        accuracy: number;
    };
    /**
     * Update the given model parameters.
     */
    setWeights(weights: {
        [key: string]: tf.Tensor;
    }): void;
    /**
     * Return all the LSTM model parameters.
     */
    getWeights(): {
        [key: string]: tf.Tensor;
    };
}
export {};
