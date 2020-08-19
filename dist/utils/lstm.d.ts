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
    dropout: number;
    /**
     * @param inputSize The dimension of the input data.
     * @param hiddenSize The dimension of the output of the LSTM, passed to the dense layer.
     * @param outputSize The dimension of the output data.
     * @param dropout The dropout rate between the LSTM cell and the dense layer.
     */
    constructor(inputSize: number, hiddenSize: number, outputSize: number, dropout?: number);
    /**
     * Gives the initial state values of the LSTM (c and h).
     *
     * @param clone If it is necessary to clone states variable or no.
     */
    initLSTM(clone?: boolean): {
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
    predict(x: tf.Tensor1D, c: tf.Tensor2D, h: tf.Tensor2D, mask?: tf.Tensor1D, temperature?: number): LSTMPrediction;
    /**
     * Update the given model parameters.
     */
    load(weights: {
        [key: string]: any;
    }): void;
    /**
     * Return all the LSTM model parameters.
     */
    export(): Promise<{
        [key: string]: any;
    }>;
}
export {};
