[Wisty.js](../README.md) › [Globals](../globals.md) › ["tools/keyed_vectors"](../modules/_tools_keyed_vectors_.md) › [KeyedVectors](_tools_keyed_vectors_.keyedvectors.md)

# Class: KeyedVectors

A reusable class storing words embeddings for functions and class that needs it.

## Hierarchy

* **KeyedVectors**

## Index

### Constructors

* [constructor](_tools_keyed_vectors_.keyedvectors.md#constructor)

### Properties

* [loaderFunction](_tools_keyed_vectors_.keyedvectors.md#private-loaderfunction)
* [maxDistance](_tools_keyed_vectors_.keyedvectors.md#private-maxdistance)
* [size](_tools_keyed_vectors_.keyedvectors.md#readonly-size)
* [vectors](_tools_keyed_vectors_.keyedvectors.md#private-vectors)

### Methods

* [get](_tools_keyed_vectors_.keyedvectors.md#get)
* [isLoaded](_tools_keyed_vectors_.keyedvectors.md#isloaded)
* [keys](_tools_keyed_vectors_.keyedvectors.md#keys)
* [load](_tools_keyed_vectors_.keyedvectors.md#load)

## Constructors

###  constructor

\+ **new KeyedVectors**(`loaderFunction`: function, `size`: number, `maxDistance`: number): *[KeyedVectors](_tools_keyed_vectors_.keyedvectors.md)*

*Defined in [tools/keyed_vectors.ts:12](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L12)*

Build a KeyedVector.

**Parameters:**

▪ **loaderFunction**: *function*

A function that returns the json string containing the embedding.

▸ (): *Promise‹string›*

▪ **size**: *number*

The dimension of the word embedding

▪`Default value`  **maxDistance**: *number*= 0.5

The maximum leveinshtein distance accepted to associate
                   a vector with a word out of vocabulary

**Returns:** *[KeyedVectors](_tools_keyed_vectors_.keyedvectors.md)*

## Properties

### `Private` loaderFunction

• **loaderFunction**: *function*

*Defined in [tools/keyed_vectors.ts:8](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L8)*

#### Type declaration:

▸ (): *Promise‹string›*

___

### `Private` maxDistance

• **maxDistance**: *number*

*Defined in [tools/keyed_vectors.ts:12](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L12)*

___

### `Readonly` size

• **size**: *number*

*Defined in [tools/keyed_vectors.ts:11](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L11)*

___

### `Private` vectors

• **vectors**: *object*

*Defined in [tools/keyed_vectors.ts:9](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L9)*

#### Type declaration:

* \[ **key**: *string*\]: number[]

## Methods

###  get

▸ **get**(`key`: string): *tf.Tensor1D*

*Defined in [tools/keyed_vectors.ts:55](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L55)*

Return the vector associated with a key.
If the key is not part of the vocabulary, it will use a similar key according to
the leveinshtein distance.
If no similar keys are below `maxDistance`, it will return undefined.

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *tf.Tensor1D*

___

###  isLoaded

▸ **isLoaded**(): *boolean*

*Defined in [tools/keyed_vectors.ts:38](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L38)*

Check if the word embeddings were loaded.

**Returns:** *boolean*

___

###  keys

▸ **keys**(): *string[]*

*Defined in [tools/keyed_vectors.ts:45](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L45)*

Return every keys stored as an array.

**Returns:** *string[]*

___

###  load

▸ **load**(): *Promise‹void›*

*Defined in [tools/keyed_vectors.ts:31](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/keyed_vectors.ts#L31)*

Load the word embeddings.

**Returns:** *Promise‹void›*
