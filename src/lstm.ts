import * as tf from '@tensorflow/tfjs';

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

    private optimizer: tf.Optimizer;
    // Let dropout be public to allow to change its value when training/inference.
    public dropout: number;

    /**
     * @param inputSize The dimension of the input data.
     * @param hiddenSize The dimension of the output of the LSTM, passed to the dense layer.
     * @param outputSize The dimension of the output data.
     * @param optimizer The optimizer the model should use to train itself.
     * @param dropout The dropout rate between the LSTM cell and the dense layer.
     */
    constructor(inputSize: number, hiddenSize: number, outputSize: number,
        optimizer: tf.Optimizer = tf.train.adam(), dropout: number = 0.2) {
        this.lstmKernel = LSTM.randomVariable([inputSize + hiddenSize, hiddenSize * 4]);
        this.lstmBias = LSTM.randomVariable([hiddenSize * 4]);
        this.lstmForgetBias = LSTM.randomVariable([1], true); // (scalar)
        this.lstmInitH = LSTM.randomVariable([1, hiddenSize]);
        this.lstmInitC = LSTM.randomVariable([1, hiddenSize]);

        this.denseWeights = LSTM.randomVariable([hiddenSize, outputSize]);
        this.denseBias = LSTM.randomVariable([outputSize]);

        this.optimizer = optimizer;
        this.dropout = dropout;
    }

    /**
     * Utility method randomly initializing a variable of a given shape.
     */
    private static randomVariable(shape: number[], scalar: boolean = false): tf.Variable {
        return tf.tidy(() => {
            let randomTensor = tf.randomNormal(shape);
            if (scalar) randomTensor = randomTensor.asScalar();

            return randomTensor.variable();
        });
    }

    /**
     * Gives the initial state values of the LSTM (c and h).
     */
    initLSTM(): {c: tf.Tensor2D, h: tf.Tensor2D} {
        return {
            c: <tf.Tensor2D> this.lstmInitC.clone(),
            h: <tf.Tensor2D> this.lstmInitH.clone()
        };
    }

    /**
     * Make a prediction given an input and state values (c and h).
     * @param x A vector of shape [inputSize]
     */
    predict(x: tf.Tensor1D, c: tf.Tensor2D, h: tf.Tensor2D): LSTMPrediction {
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
            const y = <tf.Tensor1D> tf
                .dropout(nh, this.dropout)
                .matMul(this.denseWeights)
                .add(this.denseBias)
                .squeeze();

            return { y, nc, nh };
        });
    }

    /**
     * Train the model from a sequence.
     * @param inputSeq The input matrix of shape [length, inputSize]
     * @param targetSeq The expected output matrix of shape [length, outputSize]
     * @returns Loss and accuracy of the model prediction.
     */
    fitSequence(inputSeq: tf.Tensor2D, targetSeq: tf.Tensor2D): {loss: number, accuracy: number} {
        let loss: number;
        let accuracy: number;

        this.optimizer.minimize(() => {
            let c = this.lstmInitC;
            let h = this.lstmInitH;

            // Make a prediction for each step of the input sequence.
            const predSeq = tf.stack(
                inputSeq.unstack().map((x) => {
                    const pred = this.predict(
                        <tf.Tensor1D> x,
                        <tf.Tensor2D> c,
                        <tf.Tensor2D> h
                    );

                    c = pred.nc;
                    h = pred.nh;

                    return pred.y;
                })
            );

            // Compare the predicted sequence with the target.
            const lossScalar = <tf.Scalar> tf.losses.softmaxCrossEntropy(targetSeq, predSeq);

            // Store the loss and accuracy measures.
            loss = <number> lossScalar.arraySync();
            accuracy = <number> tf.metrics.categoricalAccuracy(targetSeq, predSeq)
                .mean()
                .arraySync();

            // Return the loss to the optimizer to update the model.
            return lossScalar;
        });

        return { loss, accuracy };
    }

    /**
     * Update the given model parameters.
     */
    setWeights(weights: {[key: string]: tf.Tensor}) {
        Object.entries(weights)
            .forEach(([key, tensor]) => {
                // TODO: Can we make this less ugly ?
                switch (key) {
                case 'lstmKernel':
                    this.lstmKernel = tensor;
                    break;
                case 'lstmBias':
                    this.lstmBias = tensor;
                    break;
                case 'lstmForgetBias':
                    this.lstmForgetBias = tensor;
                    break;
                case 'lstmInitH':
                    this.lstmInitH = tensor;
                    break;
                case 'lstmInitC':
                    this.lstmInitC = tensor;
                    break;
                case 'denseWeights':
                    this.denseWeights = tensor;
                    break;
                case 'denseBias':
                    this.denseBias = tensor;
                    break;
                default:
                    break;
                }
            });
    }

    /**
     * Return all the LSTM model parameters.
     */
    getWeights(): {[key: string]: tf.Tensor} {
        return {
            lstmKernel: this.lstmKernel.clone(),
            lstmBias: this.lstmBias.clone(),
            lstmForgetBias: this.lstmForgetBias.clone(),
            lstmInitH: this.lstmInitH.clone(),
            lstmInitC: this.lstmInitC.clone(),
            denseWeights: this.denseWeights.clone(),
            denseBias: this.denseBias.clone()
        };
    }
}
