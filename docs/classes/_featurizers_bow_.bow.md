[Wisty.js](../README.md) › [Globals](../globals.md) › ["featurizers/bow"](../modules/_featurizers_bow_.md) › [BOW](_featurizers_bow_.bow.md)

# Class: BOW

Featurizes queries as bag of words.

The algorithm uses the [hashing trick](https://en.wikipedia.org/wiki/Feature_hashing) to avoid
having to store a vocabulary in the memory.

## Hierarchy

* [Featurizer](_featurizers_featurizer_.featurizer.md)

  ↳ **BOW**

## Index

### Constructors

* [constructor](_featurizers_bow_.bow.md#constructor)

### Properties

* [actions](_featurizers_bow_.bow.md#protected-actions)
* [id](_featurizers_bow_.bow.md#readonly-id)
* [size](_featurizers_bow_.bow.md#readonly-size)

### Methods

* [export](_featurizers_bow_.bow.md#export)
* [getActionMask](_featurizers_bow_.bow.md#getactionmask)
* [getOptimizableFeatures](_featurizers_bow_.bow.md#getoptimizablefeatures)
* [handleAction](_featurizers_bow_.bow.md#handleaction)
* [handleQuery](_featurizers_bow_.bow.md#handlequery)
* [init](_featurizers_bow_.bow.md#init)
* [load](_featurizers_bow_.bow.md#load)
* [resetDialog](_featurizers_bow_.bow.md#resetdialog)

## Constructors

###  constructor

\+ **new BOW**(`size`: number): *[BOW](_featurizers_bow_.bow.md)*

*Defined in [featurizers/bow.ts:13](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/bow.ts#L13)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`size` | number | The vocabulary size you allow to the featurizer.  |

**Returns:** *[BOW](_featurizers_bow_.bow.md)*

## Properties

### `Protected` actions

• **actions**: *any[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[actions](_featurizers_featurizer_.featurizer.md#protected-actions)*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Readonly` id

• **id**: *"Bag-of-Words"* = "Bag-of-Words"

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[id](_featurizers_featurizer_.featurizer.md#readonly-id)*

*Defined in [featurizers/bow.ts:12](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/bow.ts#L12)*

___

### `Readonly` size

• **size**: *number*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[size](_featurizers_featurizer_.featurizer.md#readonly-size)*

*Defined in [featurizers/bow.ts:13](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/bow.ts#L13)*

## Methods

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

*Defined in [featurizers/bow.ts:23](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/bow.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹tf.Tensor1D›*

___

###  init

▸ **init**(`actions`: any[]): *Promise‹void›*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[init](_featurizers_featurizer_.featurizer.md#init)*

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
