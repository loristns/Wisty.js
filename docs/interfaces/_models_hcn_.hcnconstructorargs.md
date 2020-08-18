[Wisty.js](../README.md) › [Globals](../globals.md) › ["models/hcn"](../modules/_models_hcn_.md) › [HCNConstructorArgs](_models_hcn_.hcnconstructorargs.md)

# Interface: HCNConstructorArgs

Parameters for HCN constructor.

## Hierarchy

* **HCNConstructorArgs**

## Index

### Properties

* [actions](_models_hcn_.hcnconstructorargs.md#actions)
* [dropout](_models_hcn_.hcnconstructorargs.md#optional-dropout)
* [featurizers](_models_hcn_.hcnconstructorargs.md#featurizers)
* [hiddenSize](_models_hcn_.hcnconstructorargs.md#optional-hiddensize)
* [optimizer](_models_hcn_.hcnconstructorargs.md#optional-optimizer)
* [temperature](_models_hcn_.hcnconstructorargs.md#optional-temperature)

## Properties

###  actions

• **actions**: *string[]*

*Defined in [models/hcn.ts:25](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L25)*

The list of actions the model can take.
(keeping the order the same is important for pretrained models)

___

### `Optional` dropout

• **dropout**? : *number*

*Defined in [models/hcn.ts:55](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L55)*

The percentage of units to dropout between the LSTM cell layer and the dense.
Useful for regularizing the model. It's disabled by default (value = 0).

___

###  featurizers

• **featurizers**: *[Featurizer](../classes/_featurizers_featurizer_.featurizer.md)[]*

*Defined in [models/hcn.ts:31](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L31)*

The list of featurizers the model uses.
(keeping the order the same is important for pretrained models)

___

### `Optional` hiddenSize

• **hiddenSize**? : *number*

*Defined in [models/hcn.ts:37](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L37)*

The output size of the LSTM cell.
Default is set to 32 units.

___

### `Optional` optimizer

• **optimizer**? : *Optimizer*

*Defined in [models/hcn.ts:43](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L43)*

The optimization algorithm used for training.
By default, Adam with a learning rate of 0.01 is used.

___

### `Optional` temperature

• **temperature**? : *number*

*Defined in [models/hcn.ts:49](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L49)*

Temperature of the model softmax, used to calibrate confidence estimation.
By default, the temperature is 1 but you usually want it higher to make less overconfident.
