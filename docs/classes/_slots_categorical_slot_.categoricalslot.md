[Wisty.js](../README.md) › [Globals](../globals.md) › ["slots/categorical_slot"](../modules/_slots_categorical_slot_.md) › [CategoricalSlot](_slots_categorical_slot_.categoricalslot.md)

# Class: CategoricalSlot

A slot that stores a categorical value extracted using fuzzy string matching.

## Hierarchy

  ↳ [Slot](_slots_slot_.slot.md)‹[CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue)›

  ↳ **CategoricalSlot**

## Index

### Constructors

* [constructor](_slots_categorical_slot_.categoricalslot.md#constructor)

### Properties

* [actions](_slots_categorical_slot_.categoricalslot.md#protected-actions)
* [categories](_slots_categorical_slot_.categoricalslot.md#private-categories)
* [categoryNames](_slots_categorical_slot_.categoricalslot.md#private-categorynames)
* [id](_slots_categorical_slot_.categoricalslot.md#readonly-id)
* [size](_slots_categorical_slot_.categoricalslot.md#readonly-size)
* [threshold](_slots_categorical_slot_.categoricalslot.md#private-threshold)

### Methods

* [export](_slots_categorical_slot_.categoricalslot.md#export)
* [getActionMask](_slots_categorical_slot_.categoricalslot.md#getactionmask)
* [getOptimizableFeatures](_slots_categorical_slot_.categoricalslot.md#getoptimizablefeatures)
* [getValue](_slots_categorical_slot_.categoricalslot.md#getvalue)
* [handleAction](_slots_categorical_slot_.categoricalslot.md#handleaction)
* [handleQuery](_slots_categorical_slot_.categoricalslot.md#handlequery)
* [init](_slots_categorical_slot_.categoricalslot.md#init)
* [load](_slots_categorical_slot_.categoricalslot.md#load)
* [oneHotValue](_slots_categorical_slot_.categoricalslot.md#private-onehotvalue)
* [resetDialog](_slots_categorical_slot_.categoricalslot.md#resetdialog)
* [setValue](_slots_categorical_slot_.categoricalslot.md#setvalue)

## Constructors

###  constructor

\+ **new CategoricalSlot**(`__namedParameters`: object): *[CategoricalSlot](_slots_categorical_slot_.categoricalslot.md)*

*Overrides [Slot](_slots_slot_.slot.md).[constructor](_slots_slot_.slot.md#constructor)*

*Defined in [slots/categorical_slot.ts:49](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L49)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`categories` | object | - |
`dependantActions` | string[] | [] |
`invDependantActions` | string[] | [] |
`name` | string | - |
`threshold` | number | 0.75 |

**Returns:** *[CategoricalSlot](_slots_categorical_slot_.categoricalslot.md)*

## Properties

### `Protected` actions

• **actions**: *any[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[actions](_featurizers_featurizer_.featurizer.md#protected-actions)*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Private` categories

• **categories**: *[Categories](../modules/_slots_categorical_slot_.md#categories)*

*Defined in [slots/categorical_slot.ts:47](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L47)*

___

### `Private` categoryNames

• **categoryNames**: *string[]*

*Defined in [slots/categorical_slot.ts:46](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L46)*

___

### `Readonly` id

• **id**: *string*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[id](_featurizers_featurizer_.featurizer.md#readonly-id)*

*Defined in [slots/categorical_slot.ts:43](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L43)*

___

### `Readonly` size

• **size**: *number*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[size](_featurizers_featurizer_.featurizer.md#readonly-size)*

*Defined in [slots/categorical_slot.ts:44](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L44)*

___

### `Private` threshold

• **threshold**: *number*

*Defined in [slots/categorical_slot.ts:49](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L49)*

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

*Inherited from [Slot](_slots_slot_.slot.md).[getActionMask](_slots_slot_.slot.md#getactionmask)*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[getActionMask](_featurizers_featurizer_.featurizer.md#getactionmask)*

*Defined in [slots/slot.ts:35](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L35)*

**Returns:** *boolean[]*

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

###  getValue

▸ **getValue**(): *[CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue)*

*Overrides [Slot](_slots_slot_.slot.md).[getValue](_slots_slot_.slot.md#getvalue)*

*Defined in [slots/categorical_slot.ts:129](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L129)*

**Returns:** *[CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue)*

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

*Defined in [slots/categorical_slot.ts:82](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹tf.Tensor1D›*

___

###  init

▸ **init**(`actions`: any[]): *Promise‹void›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[init](_featurizers_featurizer_.featurizer.md#init)*

*Defined in [slots/categorical_slot.ts:68](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L68)*

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

### `Private` oneHotValue

▸ **oneHotValue**(`value`: [CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue)): *tf.Tensor1D*

*Defined in [slots/categorical_slot.ts:73](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue) |

**Returns:** *tf.Tensor1D*

___

###  resetDialog

▸ **resetDialog**(): *void*

*Inherited from [Slot](_slots_slot_.slot.md).[resetDialog](_slots_slot_.slot.md#resetdialog)*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[resetDialog](_featurizers_featurizer_.featurizer.md#resetdialog)*

*Defined in [slots/slot.ts:46](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L46)*

**Returns:** *void*

___

###  setValue

▸ **setValue**(`value`: [CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue)): *void*

*Inherited from [Slot](_slots_slot_.slot.md).[setValue](_slots_slot_.slot.md#setvalue)*

*Defined in [slots/slot.ts:60](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L60)*

Redefine a new value for the slot.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [CategoricalValue](../modules/_slots_categorical_slot_.md#categoricalvalue) |

**Returns:** *void*
