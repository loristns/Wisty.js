[Wisty.js](../README.md) › [Globals](../globals.md) › ["models/hcn"](../modules/_models_hcn_.md) › [HCNTrainArgs](_models_hcn_.hcntrainargs.md)

# Interface: HCNTrainArgs

Parameters for HCN train method.

## Hierarchy

* **HCNTrainArgs**

## Index

### Properties

* [nEpochs](_models_hcn_.hcntrainargs.md#optional-nepochs)
* [onEpochEnd](_models_hcn_.hcntrainargs.md#optional-onepochend)
* [stories](_models_hcn_.hcntrainargs.md#stories)

## Properties

### `Optional` nEpochs

• **nEpochs**? : *number*

*Defined in [models/hcn.ts:71](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L71)*

Number of times the model will be passed the whole set of training stories during training.
Default is set to 12 epochs.

___

### `Optional` onEpochEnd

• **onEpochEnd**? : *[TrainingCallback](../modules/_models_hcn_.md#trainingcallback)*

*Defined in [models/hcn.ts:77](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L77)*

After each epoch, this callback function will be executed with the metrics collected
during the epoch.

___

###  stories

• **stories**: *[Story](../modules/_utils_state_.md#story)[]*

*Defined in [models/hcn.ts:65](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L65)*

Training stories to learn from.
