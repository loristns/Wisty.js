[Wisty.js](../README.md) › [Globals](../globals.md) › ["models/hcn"](../modules/_models_hcn_.md) › [HCN](_models_hcn_.hcn.md)

# Class: HCN

An implementation of Hybrid Code Networks(*) dialog manager.

(*): Williams, Asadi, Zweig - 2017.
     Hybrid Code Networks: practical and efﬁcient end-to-end dialog control with supervised
     and reinforcement learning.

## Hierarchy

* **HCN**

## Index

### Constructors

* [constructor](_models_hcn_.hcn.md#constructor)

### Properties

* [actions](_models_hcn_.hcn.md#private-actions)
* [featurizers](_models_hcn_.hcn.md#private-featurizers)
* [hiddenSize](_models_hcn_.hcn.md#private-hiddensize)
* [inputSize](_models_hcn_.hcn.md#private-inputsize)
* [lstm](_models_hcn_.hcn.md#private-lstm)
* [lstmC](_models_hcn_.hcn.md#private-lstmc)
* [lstmDropout](_models_hcn_.hcn.md#private-lstmdropout)
* [lstmH](_models_hcn_.hcn.md#private-lstmh)
* [lstmTemperature](_models_hcn_.hcn.md#private-lstmtemperature)
* [optimizer](_models_hcn_.hcn.md#private-optimizer)
* [outputSize](_models_hcn_.hcn.md#private-outputsize)

### Methods

* [export](_models_hcn_.hcn.md#export)
* [fitStory](_models_hcn_.hcn.md#private-fitstory)
* [getActionMask](_models_hcn_.hcn.md#private-getactionmask)
* [getOptimizableFeatures](_models_hcn_.hcn.md#private-getoptimizablefeatures)
* [handleAction](_models_hcn_.hcn.md#private-handleaction)
* [handleQuery](_models_hcn_.hcn.md#private-handlequery)
* [init](_models_hcn_.hcn.md#init)
* [load](_models_hcn_.hcn.md#load)
* [predict](_models_hcn_.hcn.md#predict)
* [resetDialog](_models_hcn_.hcn.md#resetdialog)
* [score](_models_hcn_.hcn.md#score)
* [train](_models_hcn_.hcn.md#train)

## Constructors

###  constructor

\+ **new HCN**(`__namedParameters`: object): *[HCN](_models_hcn_.hcn.md)*

*Defined in [models/hcn.ts:100](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L100)*

Defines the model.

To fully initialize the model, run the async *init()* method.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`actions` | string[] | - |
`dropout` | number | 0 |
`featurizers` | [Featurizer](_featurizers_featurizer_.featurizer.md)‹›[] | - |
`hiddenSize` | number | 32 |
`optimizer` | Optimizer‹› | tf.train.adam(0.01) |
`temperature` | number | 1 |

**Returns:** *[HCN](_models_hcn_.hcn.md)*

## Properties

### `Private` actions

• **actions**: *string[]*

*Defined in [models/hcn.ts:88](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L88)*

___

### `Private` featurizers

• **featurizers**: *[Featurizer](_featurizers_featurizer_.featurizer.md)[]*

*Defined in [models/hcn.ts:89](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L89)*

___

### `Private` hiddenSize

• **hiddenSize**: *number*

*Defined in [models/hcn.ts:93](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L93)*

___

### `Private` inputSize

• **inputSize**: *number*

*Defined in [models/hcn.ts:92](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L92)*

___

### `Private` lstm

• **lstm**: *[LSTM](_utils_lstm_.lstm.md)*

*Defined in [models/hcn.ts:96](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L96)*

___

### `Private` lstmC

• **lstmC**: *tf.Tensor2D*

*Defined in [models/hcn.ts:98](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L98)*

___

### `Private` lstmDropout

• **lstmDropout**: *number*

*Defined in [models/hcn.ts:100](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L100)*

___

### `Private` lstmH

• **lstmH**: *tf.Tensor2D*

*Defined in [models/hcn.ts:97](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L97)*

___

### `Private` lstmTemperature

• **lstmTemperature**: *number*

*Defined in [models/hcn.ts:99](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L99)*

___

### `Private` optimizer

• **optimizer**: *Optimizer*

*Defined in [models/hcn.ts:90](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L90)*

___

### `Private` outputSize

• **outputSize**: *number*

*Defined in [models/hcn.ts:94](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L94)*

## Methods

###  export

▸ **export**(): *Promise‹string›*

*Defined in [models/hcn.ts:475](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L475)*

Export the models parameters in a JSON format.

**Returns:** *Promise‹string›*

___

### `Private` fitStory

▸ **fitStory**(`story`: [Story](../modules/_utils_state_.md#story)): *Promise‹[SampleData](../interfaces/_models_hcn_.sampledata.md)›*

*Defined in [models/hcn.ts:202](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L202)*

Trains the model on a single training story.

**Parameters:**

Name | Type |
------ | ------ |
`story` | [Story](../modules/_utils_state_.md#story) |

**Returns:** *Promise‹[SampleData](../interfaces/_models_hcn_.sampledata.md)›*

___

### `Private` getActionMask

▸ **getActionMask**(): *tf.Tensor1D*

*Defined in [models/hcn.ts:188](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L188)*

Get the final action mask resulted from every featurizers.

**Returns:** *tf.Tensor1D*

___

### `Private` getOptimizableFeatures

▸ **getOptimizableFeatures**(`features`: Tensor[]): *tf.Tensor1D*

*Defined in [models/hcn.ts:165](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L165)*

Get the embedding vector resulted from every featurizers.

**Parameters:**

Name | Type |
------ | ------ |
`features` | Tensor[] |

**Returns:** *tf.Tensor1D*

___

### `Private` handleAction

▸ **handleAction**(`action`: string): *void*

*Defined in [models/hcn.ts:181](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L181)*

Inform every featurizers of the taken action.

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |

**Returns:** *void*

___

### `Private` handleQuery

▸ **handleQuery**(`query`: string): *Promise‹any[]›*

*Defined in [models/hcn.ts:156](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L156)*

Get the data returned from every featurizer's handleQuery method.

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹any[]›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [models/hcn.ts:129](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L129)*

Initialize the model and its featurizers.

**Returns:** *Promise‹void›*

___

###  load

▸ **load**(`json`: string): *void*

*Defined in [models/hcn.ts:460](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L460)*

Load the models parameters from a JSON formatted string.

**Parameters:**

Name | Type |
------ | ------ |
`json` | string |

**Returns:** *void*

___

###  predict

▸ **predict**(`query`: string): *Promise‹object›*

*Defined in [models/hcn.ts:360](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L360)*

Predict an action resulting from the given query.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`query` | string | The given query from the user. |

**Returns:** *Promise‹object›*

The predicted action from the model and its confidence.

___

###  resetDialog

▸ **resetDialog**(): *void*

*Defined in [models/hcn.ts:148](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L148)*

Resets the state of the model and its featurizers.

**Returns:** *void*

___

###  score

▸ **score**(`stories`: [Story](../modules/_utils_state_.md#story)[]): *Promise‹[Metrics](../interfaces/_utils_metrics_.metrics.md)›*

*Defined in [models/hcn.ts:398](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L398)*

Evaluate the model using stories.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`stories` | [Story](../modules/_utils_state_.md#story)[] | Validation stories to evaluate the model. |

**Returns:** *Promise‹[Metrics](../interfaces/_utils_metrics_.metrics.md)›*

Validation metrics based on the results from the stories.

___

###  train

▸ **train**(`__namedParameters`: object): *Promise‹[Metrics](../interfaces/_utils_metrics_.metrics.md)›*

*Defined in [models/hcn.ts:285](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/models/hcn.ts#L285)*

Trains the model using the training stories.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`nEpochs` | number | 12 |
`onEpochEnd` | function | undefined |
`stories` | [State](../interfaces/_utils_state_.state.md)[][] | - |

**Returns:** *Promise‹[Metrics](../interfaces/_utils_metrics_.metrics.md)›*

Metrics collected from the last epoch (that correspond to the trained model).
