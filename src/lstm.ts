import * as tf from '@tensorflow/tfjs';
import { initializeVariable } from './utils/initialize_variable';

type LSTMPrediction = {y: tf.Tensor1D, nc: tf.Tensor2D, nh: tf.Tensor2D};

/**
 * An LSTM cell with a dense layer on its top.
 */
export class LSTM {
    // LSTM parameters :
    private lstmKernel: tf.Tensor;
    private lstmBias: tf.Tensor;
    private lstmForgetBias: tf.Tensor;
    private lstmInitH: tf.Tensor;
    private lstmInitC: tf.Tensor;

    // Dense layer parameters :
    private denseWeights: tf.Tensor;
    private denseBias: tf.Tensor;

    // Let dropout be public to allow to change its value when training/inference.
    public dropout: number;

    /**
     * @param inputSize The dimension of the input data.
     * @param hiddenSize The dimension of the output of the LSTM, passed to the dense layer.
     * @param outputSize The dimension of the output data.
     * @param dropout The dropout rate between the LSTM cell and the dense layer.
     */
    constructor(inputSize: number, hiddenSize: number, outputSize: number, dropout: number = 0.2) {
        this.lstmKernel = initializeVariable([inputSize + hiddenSize, hiddenSize * 4]);
        this.lstmBias = initializeVariable([hiddenSize * 4], false, 'zeros');
        this.lstmForgetBias = initializeVariable([1], true, 'zeros'); // (scalar)
        this.lstmInitH = initializeVariable([1, hiddenSize]);
        this.lstmInitC = initializeVariable([1, hiddenSize]);

        this.denseWeights = initializeVariable([hiddenSize, outputSize]);
        this.denseBias = initializeVariable([outputSize], false, 'zeros');

        this.dropout = dropout;
    }

    /**
     * Gives the initial state values of the LSTM (c and h).
     *
     * @param clone If it is necessary to clone states variable or no.
     */
    initLSTM(clone: boolean = true): {c: tf.Tensor2D, h: tf.Tensor2D} {
        return {
            c: <tf.Tensor2D> (clone ? this.lstmInitC.clone() : this.lstmInitC),
            h: <tf.Tensor2D> (clone ? this.lstmInitH.clone() : this.lstmInitH)
        };
    }

    /**
     * Make a prediction given an input and state values (c and h).
     * @param x A vector of shape [inputSize].
     * @param c LSTM's state value.
     * @param h LSTM's last output value.
     * @param mask A vector of ones and zeros of shape [outputSize].
     */
    predict(x: tf.Tensor1D, c: tf.Tensor2D, h: tf.Tensor2D, mask?: tf.Tensor1D,
        temperature: number = 1): LSTMPrediction {
        return tf.tidy(() => {
            // Execute the LSTM cell.
            const [nc, nh] = tf.basicLSTMCell(
                <tf.Scalar> this.lstmForgetBias,
                <tf.Tensor2D> this.lstmKernel,
                <tf.Tensor1D> this.lstmBias,
                <tf.Tensor2D> tf.stack([x]),
                h, c
            );

            // Execute the dense layer on top of the LSTM cell.
            let y = <tf.Tensor1D> tf
                .dropout(nh, this.dropout)
                .matMul(this.denseWeights)
                .add(this.denseBias)
                .squeeze()
                .div(temperature)
                .softmax()
                .mul(mask ?? 1);

            // Apply normalization after the mask to get probabilities.
            y = y.div(tf.sum(y));

            return { y, nc, nh };
        });
    }

    /**
     * Update the given model parameters.
     */
    load(weights: {[key: string]: any}) {
        tf.tidy(() => {
            // Convert every parameter to a tf variable tensor.
            this.lstmKernel = tf.tensor(weights.lstmKernel).variable();
            this.lstmBias = tf.tensor(weights.lstmBias).variable();
            this.lstmForgetBias = tf.tensor(weights.lstmForgetBias).variable();
            this.lstmInitH = tf.tensor(weights.lstmInitH).variable();
            this.lstmInitC = tf.tensor(weights.lstmInitC).variable();
            this.denseWeights = tf.tensor(weights.denseWeights).variable();
            this.denseBias = tf.tensor(weights.denseBias).variable();
        });
    }

    /**
     * Return all the LSTM model parameters.
     */
    async export(): Promise<{[key: string]: any}> {
        const exports = {
            lstmKernel: await this.lstmKernel.array(),
            lstmBias: await this.lstmBias.array(),
            lstmForgetBias: await this.lstmForgetBias.array(),
            lstmInitH: await this.lstmInitH.array(),
            lstmInitC: await this.lstmInitC.array(),
            denseWeights: await this.denseWeights.array(),
            denseBias: await this.denseBias.array()
        };

        return exports;
    }
}
