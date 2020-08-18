[Wisty.js](../README.md) › [Globals](../globals.md) › ["featurizers/use"](../modules/_featurizers_use_.md) › [USE](_featurizers_use_.use.md)

# Class: USE

Featurizes queries using the Universal Sentence Encoder model.

## Hierarchy

* [Featurizer](_featurizers_featurizer_.featurizer.md)

  ↳ **USE**

## Index

### Properties

* [actions](_featurizers_use_.use.md#protected-actions)
* [emptyEncoding](_featurizers_use_.use.md#private-emptyencoding)
* [encoder](_featurizers_use_.use.md#private-encoder)
* [id](_featurizers_use_.use.md#readonly-id)
* [size](_featurizers_use_.use.md#readonly-size)

### Methods

* [encodeQuery](_featurizers_use_.use.md#private-encodequery)
* [export](_featurizers_use_.use.md#export)
* [getActionMask](_featurizers_use_.use.md#getactionmask)
* [getOptimizableFeatures](_featurizers_use_.use.md#getoptimizablefeatures)
* [handleAction](_featurizers_use_.use.md#handleaction)
* [handleQuery](_featurizers_use_.use.md#handlequery)
* [init](_featurizers_use_.use.md#init)
* [load](_featurizers_use_.use.md#load)
* [resetDialog](_featurizers_use_.use.md#resetdialog)

## Properties

### `Protected` actions

• **actions**: *any[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[actions](_featurizers_featurizer_.featurizer.md#protected-actions)*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Private` emptyEncoding

• **emptyEncoding**: *tf.Tensor1D*

*Defined in [featurizers/use.ts:12](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L12)*

___

### `Private` encoder

• **encoder**: *UniversalSentenceEncoder*

*Defined in [featurizers/use.ts:11](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L11)*

___

### `Readonly` id

• **id**: *"Universal Sentence Encoder"* = "Universal Sentence Encoder"

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[id](_featurizers_featurizer_.featurizer.md#readonly-id)*

*Defined in [featurizers/use.ts:9](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L9)*

___

### `Readonly` size

• **size**: *512* = 512

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[size](_featurizers_featurizer_.featurizer.md#readonly-size)*

*Defined in [featurizers/use.ts:14](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L14)*

## Methods

### `Private` encodeQuery

▸ **encodeQuery**(`query`: string): *Promise‹tf.Tensor1D›*

*Defined in [featurizers/use.ts:27](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L27)*

Encodes a query using the model.

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹tf.Tensor1D›*

___

###  export

▸ **export**(): *Promise‹[JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable)›*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[export](_featurizers_featurizer_.featurizer.md#export)*

*Defined in [featurizers/featurizer.ts:102](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L102)*

Export the featurizer's internal parameters to be serialized along the model.

**Returns:** *Promise‹[JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable)›*

___

###  getActionMask

▸ **getActionMask**(): *boolean[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[getActionMask](_featurizers_featurizer_.featurizer.md#getactionmask)*

*Defined in [featurizers/featurizer.ts:82](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L82)*

Produce an action mask according to featurizer state.
(Generally, this method is reimplemented in stateful featurizers)

**Returns:** *boolean[]*

An array of boolean mapping every actions availability.

___

###  getOptimizableFeatures

▸ **getOptimizableFeatures**(`data`: any): *tf.Tensor1D*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[getOptimizableFeatures](_featurizers_featurizer_.featurizer.md#getoptimizablefeatures)*

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

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[handleAction](_featurizers_featurizer_.featurizer.md#handleaction)*

*Defined in [featurizers/featurizer.ts:74](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L74)*

Let the featurizer know what action the model has taken.

**Parameters:**

Name | Type |
------ | ------ |
`action` | any |

**Returns:** *void*

___

###  handleQuery

▸ **handleQuery**(`query`: string): *Promise‹tf.Tensor1D›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[handleQuery](_featurizers_featurizer_.featurizer.md#handlequery)*

*Defined in [featurizers/use.ts:35](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹tf.Tensor1D›*

___

###  init

▸ **init**(`actions`: any[]): *Promise‹void›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[init](_featurizers_featurizer_.featurizer.md#init)*

*Defined in [featurizers/use.ts:16](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/use.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`actions` | any[] |

**Returns:** *Promise‹void›*

___

###  load

▸ **load**(`parameters`: [JSONSerializable](../modules/_featurizers_featurizer_.md#jsonserializable)): *void*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[load](_featurizers_featurizer_.featurizer.md#load)*

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

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[resetDialog](_featurizers_featurizer_.featurizer.md#resetdialog)*

*Defined in [featurizers/featurizer.ts:90](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L90)*

Resets the state of the featurizer (if the stateful feature is used).

**Returns:** *void*
