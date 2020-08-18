[Wisty.js](../README.md) › [Globals](../globals.md) › ["slots/slot"](../modules/_slots_slot_.md) › [Slot](_slots_slot_.slot.md)

# Class: Slot ‹**Value**›

An extension of featurizer that holds a value in its state.

**`abstract`** 

## Type parameters

▪ **Value**

## Hierarchy

* [Featurizer](_featurizers_featurizer_.featurizer.md)

  ↳ **Slot**

  ↳ [CategoricalSlot](_slots_categorical_slot_.categoricalslot.md)

## Index

### Constructors

* [constructor](_slots_slot_.slot.md#constructor)

### Properties

* [actions](_slots_slot_.slot.md#protected-actions)
* [dependantActions](_slots_slot_.slot.md#private-dependantactions)
* [id](_slots_slot_.slot.md#readonly-id)
* [invDependantActions](_slots_slot_.slot.md#private-invdependantactions)
* [size](_slots_slot_.slot.md#readonly-size)
* [value](_slots_slot_.slot.md#private-value)

### Methods

* [export](_slots_slot_.slot.md#export)
* [getActionMask](_slots_slot_.slot.md#getactionmask)
* [getOptimizableFeatures](_slots_slot_.slot.md#getoptimizablefeatures)
* [getValue](_slots_slot_.slot.md#getvalue)
* [handleAction](_slots_slot_.slot.md#handleaction)
* [handleQuery](_slots_slot_.slot.md#handlequery)
* [init](_slots_slot_.slot.md#init)
* [load](_slots_slot_.slot.md#load)
* [resetDialog](_slots_slot_.slot.md#resetdialog)
* [setValue](_slots_slot_.slot.md#setvalue)

## Constructors

###  constructor

\+ **new Slot**(`dependantActions`: string[], `invDependantActions`: string[]): *[Slot](_slots_slot_.slot.md)*

*Defined in [slots/slot.ts:21](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L21)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dependantActions` | string[] | The list of actions that can be taken by the model                         only when the slot is defined. |
`invDependantActions` | string[] | The list of actions that can be taken by the model                            only when the slot is undefined.  |

**Returns:** *[Slot](_slots_slot_.slot.md)*

## Properties

### `Protected` actions

• **actions**: *any[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[actions](_featurizers_featurizer_.featurizer.md#protected-actions)*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Private` dependantActions

• **dependantActions**: *string[]*

*Defined in [slots/slot.ts:11](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L11)*

The list of actions that can be taken by the model only when the slot is defined.

___

### `Readonly` id

• **id**: *string*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[id](_featurizers_featurizer_.featurizer.md#readonly-id)*

*Defined in [featurizers/featurizer.ts:14](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L14)*

An ID used by models for exportations.

___

### `Private` invDependantActions

• **invDependantActions**: *string[]*

*Defined in [slots/slot.ts:16](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L16)*

The list of actions that can be taken by the model only when the slot is undefined.

___

### `Readonly` size

• **size**: *number* = 1

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[size](_featurizers_featurizer_.featurizer.md#readonly-size)*

*Defined in [featurizers/featurizer.ts:25](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L25)*

The size of the vector returned by the featurizer.
By default it's set to 1 which is the default for a featurizer that returns no features.

___

### `Private` value

• **value**: *Value*

*Defined in [slots/slot.ts:21](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L21)*

Stores the value of the slot.

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

▸ **getValue**(): *Value*

*Defined in [slots/slot.ts:53](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L53)*

Retrieves the value of the slot.

**Returns:** *Value*

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

▸ **handleQuery**(`query`: string): *Promise‹any›*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[handleQuery](_featurizers_featurizer_.featurizer.md#handlequery)*

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

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[resetDialog](_featurizers_featurizer_.featurizer.md#resetdialog)*

*Defined in [slots/slot.ts:46](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L46)*

**Returns:** *void*

___

###  setValue

▸ **setValue**(`value`: Value): *void*

*Defined in [slots/slot.ts:60](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/slot.ts#L60)*

Redefine a new value for the slot.

**Parameters:**

Name | Type |
------ | ------ |
`value` | Value |

**Returns:** *void*
