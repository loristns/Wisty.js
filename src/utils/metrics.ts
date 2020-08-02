/**
 * Some metrics about how a model is performing during training or at validation.
 */
export interface Metrics {
    /**
     * Epoch of the training.
     *
     * Not defined for validation metrics.
     */
    epoch?: number;

    /**
     * Model's average loss.
     *
     * Only defined on training metrics.
     */
    loss?: number;

    /**
     * Accuracy of the model over the samples.
     *
     * Accuracy = proportion of correctly predicted samples.
     */
    accuracy: number;

    /**
     * Recall of the model over the samples.
     *
     * Recall = (number of correctly assigned samples to a label) / (number of samples that belong
     * to a label)
     */
    recall: number;

    /**
     * Precision of the model over the samples.
     *
     * Precision = (number of correctly assigned samples to a label) / (number of samples assigned
     * to a label)
     */
    precision: number;

    /**
     * Average confidence of the model in its prediction.
     * Ideally, this value should be approximatively equal to the model's accuracy.
     *
     * Only defined for validation metrics.
     */
    averageConfidence?: number;

    /**
     * The array of the indexes of failling samples (< 0.999 accuracy).
     */
    failingSamples: number[];
}
