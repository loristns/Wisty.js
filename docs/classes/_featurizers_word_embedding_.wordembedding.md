[Wisty.js](../README.md) › [Globals](../globals.md) › ["featurizers/word_embedding"](../modules/_featurizers_word_embedding_.md) › [WordEmbedding](_featurizers_word_embedding_.wordembedding.md)

# Class: WordEmbedding

Featurize queries by pooling words embedding using SWEM-concat(*).

(*): Dinghan Shen, Guoyin Wang, Wenlin Wang, Martin Renqiang Min, Qinliang Su, Yizhe Zhang,
     Chunyuan Li, Ricardo Henao, Lawrence Carin- 2018.
     Baseline Needs More Love: On Simple Word-Embedding-Based Models and
     Associated Pooling Mechanisms.

## Hierarchy

* [Featurizer](_featurizers_featurizer_.featurizer.md)

  ↳ **WordEmbedding**

## Index

### Constructors

* [constructor](_featurizers_word_embedding_.wordembedding.md#constructor)

### Properties

* [actions](_featurizers_word_embedding_.wordembedding.md#protected-actions)
* [id](_featurizers_word_embedding_.wordembedding.md#readonly-id)
* [size](_featurizers_word_embedding_.wordembedding.md#readonly-size)
* [vectors](_featurizers_word_embedding_.wordembedding.md#private-vectors)

### Methods

* [export](_featurizers_word_embedding_.wordembedding.md#export)
* [getActionMask](_featurizers_word_embedding_.wordembedding.md#getactionmask)
* [getOptimizableFeatures](_featurizers_word_embedding_.wordembedding.md#getoptimizablefeatures)
* [handleAction](_featurizers_word_embedding_.wordembedding.md#handleaction)
* [handleQuery](_featurizers_word_embedding_.wordembedding.md#handlequery)
* [init](_featurizers_word_embedding_.wordembedding.md#init)
* [load](_featurizers_word_embedding_.wordembedding.md#load)
* [resetDialog](_featurizers_word_embedding_.wordembedding.md#resetdialog)

## Constructors

###  constructor

\+ **new WordEmbedding**(`vectors`: [KeyedVectors](_tools_keyed_vectors_.keyedvectors.md)): *[WordEmbedding](_featurizers_word_embedding_.wordembedding.md)*

*Defined in [featurizers/word_embedding.ts:17](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/word_embedding.ts#L17)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vectors` | [KeyedVectors](_tools_keyed_vectors_.keyedvectors.md) | The keyed vectors storing the embeddings.  |

**Returns:** *[WordEmbedding](_featurizers_word_embedding_.wordembedding.md)*

## Properties

### `Protected` actions

• **actions**: *any[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[actions](_featurizers_featurizer_.featurizer.md#protected-actions)*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Readonly` id

• **id**: *"Word Embedding"* = "Word Embedding"

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[id](_featurizers_featurizer_.featurizer.md#readonly-id)*

*Defined in [featurizers/word_embedding.ts:14](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/word_embedding.ts#L14)*

___

### `Readonly` size

• **size**: *number*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[size](_featurizers_featurizer_.featurizer.md#readonly-size)*

*Defined in [featurizers/word_embedding.ts:15](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/word_embedding.ts#L15)*

___

### `Private` vectors

• **vectors**: *[KeyedVectors](_tools_keyed_vectors_.keyedvectors.md)*

*Defined in [featurizers/word_embedding.ts:17](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/word_embedding.ts#L17)*

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

*Defined in [featurizers/word_embedding.ts:34](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/word_embedding.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹tf.Tensor1D›*

___

###  init

▸ **init**(`actions`: any[]): *Promise‹void›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[init](_featurizers_featurizer_.featurizer.md#init)*

*Defined in [featurizers/word_embedding.ts:28](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/word_embedding.ts#L28)*

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
