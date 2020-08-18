[Wisty.js](../README.md) › [Globals](../globals.md) › ["featurizers/featurizer"](../modules/_featurizers_featurizer_.md) › [Featurizer](_featurizers_featurizer_.featurizer.md)

# Class: Featurizer

A stateful featurizer that turns queries into numerical representations.

**`abstract`** 

## Hierarchy

* **Featurizer**

  ↳ [ActionFeaturizer](_featurizers_action_featurizer_.actionfeaturizer.md)

  ↳ [BOW](_featurizers_bow_.bow.md)

  ↳ [USE](_featurizers_use_.use.md)

  ↳ [Slot](_slots_slot_.slot.md)

  ↳ [WordEmbedding](_featurizers_word_embedding_.wordembedding.md)

## Index

### Properties

* [actions](_featurizers_featurizer_.featurizer.md#protected-actions)
* [id](_featurizers_featurizer_.featurizer.md#readonly-id)
* [size](_featurizers_featurizer_.featurizer.md#readonly-size)

### Methods

* [export](_featurizers_featurizer_.featurizer.md#export)
* [getActionMask](_featurizers_featurizer_.featurizer.md#getactionmask)
* [getOptimizableFeatures](_featurizers_featurizer_.featurizer.md#getoptimizablefeatures)
* [handleAction](_featurizers_featurizer_.featurizer.md#handleaction)
* [handleQuery](_featurizers_featurizer_.featurizer.md#handlequery)
* [init](_featurizers_featurizer_.featurizer.md#init)
* [load](_featurizers_featurizer_.featurizer.md#load)
* [resetDialog](_featurizers_featurizer_.featurizer.md#resetdialog)

## Properties

### `Protected` actions

• **actions**: *any[]*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Readonly` id

• **id**: *string*

*Defined in [featurizers/featurizer.ts:14](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L14)*

An ID used by models for exportations.

___

### `Readonly` size

• **size**: *number* = 1

*Defined in [featurizers/featurizer.ts:25](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L25)*

The size of the vector returned by the featurizer.
By default it's set to 1 which is the default for a featurizer that returns no features.

## Methods

###  export

▸ **export**(): *Promise‹[JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable)›*

*Defined in [featurizers/featurizer.ts:102](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L102)*

Export the featurizer's internal parameters to be serialized along the model.

**Returns:** *Promise‹[JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable)›*

___

###  getActionMask

▸ **getActionMask**(): *boolean[]*

*Defined in [featurizers/featurizer.ts:82](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L82)*

Produce an action mask according to featurizer state.
(Generally, this method is reimplemented in stateful featurizers)

**Returns:** *boolean[]*

An array of boolean mapping every actions availability.

___

###  getOptimizableFeatures

▸ **getOptimizableFeatures**(`data`: any): *tf.Tensor1D*

*Defined in [featurizers/featurizer.ts:62](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L62)*

Turn the data returned by handleQuery into an embedding vector.
This function is used to expose featurizer variables to the model optimizer for training.

Reimplementing this method is not necessary if your featurizer is not meant to be optimizable
through gradient descent.
In this case, just return the feature vector directly using the handleQuery method.

**`remarks`** 
It's important to keep this function stateless, it should only depend of its tensor argument
and of featurizer's variables.

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *tf.Tensor1D*

___

###  handleAction

▸ **handleAction**(`action`: any): *void*

*Defined in [featurizers/featurizer.ts:74](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L74)*

Let the featurizer know what action the model has taken.

**Parameters:**

Name | Type |
------ | ------ |
`action` | any |

**Returns:** *void*

___

###  handleQuery

▸ **handleQuery**(`query`: string): *Promise‹any›*

*Defined in [featurizers/featurizer.ts:47](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L47)*

Featurizes and handle a text query.

**`remarks`** 
This method can directly return a 1D tensor to provide features to the model.
Alternatively, it can returns data of any type if the Featurizer implement a custom
getOptimizableFeatures method to handle those data.
If this method doesn't return something, no features will be passed to the model.

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹any›*

___

###  init

▸ **init**(`actions`: any[]): *Promise‹void›*

*Defined in [featurizers/featurizer.ts:33](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L33)*

Initialize the model, can be asynchronous async code.

This method is executed by the model during it's initialization,
it will also set the actions attribute.

**Parameters:**

Name | Type |
------ | ------ |
`actions` | any[] |

**Returns:** *Promise‹void›*

___

###  load

▸ **load**(`parameters`: [JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable)): *void*

*Defined in [featurizers/featurizer.ts:96](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L96)*

Load parameters extracted from a JSON-like document.

**Parameters:**

Name | Type |
------ | ------ |
`parameters` | [JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable) |

**Returns:** *void*

___

###  resetDialog

▸ **resetDialog**(): *void*

*Defined in [featurizers/featurizer.ts:90](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L90)*

Resets the state of the featurizer (if the stateful feature is used).

**Returns:** *void*
