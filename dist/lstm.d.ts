import * as tf from '@tensorflow/tfjs';
declare type LSTMPrediction = {
    y: tf.Tensor1D;
    nc: tf.Tensor2D;
    nh: tf.Tensor2D;
    nAttKeys: tf.Tensor2D;
    nAttValues: tf.Tensor2D;
};
/**
 * An LSTM cell with self attention and a dense layer on its top.
 */
export declare class LSTM {
    private lstmKernel;
    private lstmBias;
    private lstmForgetBias;
    private lstmInitH;
    private lstmInitC;
    private attentionQW;
    private attentionKW;
    private attentionVW;
    private denseWeights;
    private denseBias;
    private optimizer;
    /**
     * @param inputSize The dimension of the input data.
     * @param hiddenSize The dimension of the output of the LSTM, passed to the dense layer.
     * @param outputSize The dimension of the output data.
     * @param optimizer The optimizer the model should use to train itself.
     */
    constructor(inputSize: number, hiddenSize: number, outputSize: number, optimizer?: tf.Optimizer);
    /**
     * Utility method randomly initializing a variable of a given shape.
     */
    private static randomVariable;
    /**
     * Gives the initial state values of the LSTM (c and h) and of the self-attention.
     */
    initLSTM(): {
        c: tf.Tensor2D;
        h: tf.Tensor2D;
        attKeys: tf.Tensor2D;
        attValues: tf.Tensor2D;
    };
    /**
     * Make a prediction given an input and state values (c and h).
     * @param x A vector of shape [inputSize]
     */
    predict(x: tf.Tensor1D, c: tf.Tensor2D, h: tf.Tensor2D, attKeys: tf.Tensor2D, attValues: tf.Tensor2D): LSTMPrediction;
    /**
     * Train the model from a sequence.
     * @param inputSeq The input matrix of shape [length, inputSize]
     * @param targetSeq The expected output matrix of shape [length, outputSize]
     * @returns Loss and accuracy of the model prediction.
     */
    fitSequence(inputSeq: tf.Tensor2D, targetSeq: tf.Tensor2D): {
        loss: number;
        accuracy: number;
    };
}
export {};
