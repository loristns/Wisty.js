[Wisty.js](../README.md) › [Globals](../globals.md) › ["utils/metrics"](../modules/_utils_metrics_.md) › [Metrics](_utils_metrics_.metrics.md)

# Interface: Metrics

Some metrics about how a model is performing during training or at validation.

## Hierarchy

* **Metrics**

## Index

### Properties

* [accuracy](_utils_metrics_.metrics.md#accuracy)
* [averageConfidence](_utils_metrics_.metrics.md#optional-averageconfidence)
* [epoch](_utils_metrics_.metrics.md#optional-epoch)
* [failingSamples](_utils_metrics_.metrics.md#failingsamples)
* [loss](_utils_metrics_.metrics.md#optional-loss)
* [precision](_utils_metrics_.metrics.md#precision)
* [recall](_utils_metrics_.metrics.md#recall)

## Properties

###  accuracy

• **accuracy**: *number*

*Defined in [utils/metrics.ts:24](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L24)*

Accuracy of the model over the samples.

Accuracy = proportion of correctly predicted samples.

___

### `Optional` averageConfidence

• **averageConfidence**? : *number*

*Defined in [utils/metrics.ts:48](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L48)*

Average confidence of the model in its prediction.
Ideally, this value should be approximatively equal to the model's accuracy.

Only defined for validation metrics.

___

### `Optional` epoch

• **epoch**? : *number*

*Defined in [utils/metrics.ts:10](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L10)*

Epoch of the training.

Not defined for validation metrics.

___

###  failingSamples

• **failingSamples**: *number[]*

*Defined in [utils/metrics.ts:53](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L53)*

The array of the indexes of failling samples (< 0.999 accuracy).

___

### `Optional` loss

• **loss**? : *number*

*Defined in [utils/metrics.ts:17](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L17)*

Model's average loss.

Only defined on training metrics.

___

###  precision

• **precision**: *number*

*Defined in [utils/metrics.ts:40](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L40)*

Precision of the model over the samples.

Precision = (number of correctly assigned samples to a label) / (number of samples assigned
to a label)

___

###  recall

• **recall**: *number*

*Defined in [utils/metrics.ts:32](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/metrics.ts#L32)*

Recall of the model over the samples.

Recall = (number of correctly assigned samples to a label) / (number of samples that belong
to a label)
