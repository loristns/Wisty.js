[Wisty.js](../README.md) › [Globals](../globals.md) › ["featurizers/action_featurizer"](../modules/_featurizers_action_featurizer_.md) › [ActionFeaturizer](_featurizers_action_featurizer_.actionfeaturizer.md)

# Class: ActionFeaturizer

Rule-based featurizer improving model robustness.

- Featurize the previous action the model has taken.
- Mask the LUS action when the user has just talked.
  (Force the model to reply at least once)
- Mask the previous action.
  (Prevent looping : the model can't take two times in a row the same action)

## Hierarchy

* [Featurizer](_featurizers_featurizer_.featurizer.md)

  ↳ **ActionFeaturizer**

## Index

### Constructors

* [constructor](_featurizers_action_featurizer_.actionfeaturizer.md#constructor)

### Properties

* [LUSAction](_featurizers_action_featurizer_.actionfeaturizer.md#private-lusaction)
* [actions](_featurizers_action_featurizer_.actionfeaturizer.md#protected-actions)
* [embeddings](_featurizers_action_featurizer_.actionfeaturizer.md#private-embeddings)
* [id](_featurizers_action_featurizer_.actionfeaturizer.md#readonly-id)
* [maskLUS](_featurizers_action_featurizer_.actionfeaturizer.md#private-masklus)
* [maskPreviousAction](_featurizers_action_featurizer_.actionfeaturizer.md#private-maskpreviousaction)
* [previousAction](_featurizers_action_featurizer_.actionfeaturizer.md#private-previousaction)
* [size](_featurizers_action_featurizer_.actionfeaturizer.md#size)
* [userTalked](_featurizers_action_featurizer_.actionfeaturizer.md#private-usertalked)

### Methods

* [export](_featurizers_action_featurizer_.actionfeaturizer.md#export)
* [getActionMask](_featurizers_action_featurizer_.actionfeaturizer.md#getactionmask)
* [getOptimizableFeatures](_featurizers_action_featurizer_.actionfeaturizer.md#getoptimizablefeatures)
* [handleAction](_featurizers_action_featurizer_.actionfeaturizer.md#handleaction)
* [handleQuery](_featurizers_action_featurizer_.actionfeaturizer.md#handlequery)
* [init](_featurizers_action_featurizer_.actionfeaturizer.md#init)
* [load](_featurizers_action_featurizer_.actionfeaturizer.md#load)
* [resetDialog](_featurizers_action_featurizer_.actionfeaturizer.md#resetdialog)

## Constructors

###  constructor

\+ **new ActionFeaturizer**(`__namedParameters`: object): *[ActionFeaturizer](_featurizers_action_featurizer_.actionfeaturizer.md)*

*Defined in [featurizers/action_featurizer.ts:48](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L48)*

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= { maskLUS: true, maskPreviousAction: true, LUSAction: 'LUS' }

Name | Type | Default |
------ | ------ | ------ |
`LUSAction` | string | "LUS" |
`maskLUS` | boolean | true |
`maskPreviousAction` | boolean | true |

**Returns:** *[ActionFeaturizer](_featurizers_action_featurizer_.actionfeaturizer.md)*

## Properties

### `Private` LUSAction

• **LUSAction**: *any*

*Defined in [featurizers/action_featurizer.ts:41](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L41)*

___

### `Protected` actions

• **actions**: *any[]*

*Inherited from [Featurizer](_featurizers_featurizer_.featurizer.md).[actions](_featurizers_featurizer_.featurizer.md#protected-actions)*

*Defined in [featurizers/featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/featurizer.ts#L19)*

The list of every action the model can take.

___

### `Private` embeddings

• **embeddings**: *Tensor*

*Defined in [featurizers/action_featurizer.ts:48](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L48)*

___

### `Readonly` id

• **id**: *"Action Featurizer"* = "Action Featurizer"

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[id](_featurizers_featurizer_.featurizer.md#readonly-id)*

*Defined in [featurizers/action_featurizer.ts:38](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L38)*

___

### `Private` maskLUS

• **maskLUS**: *boolean*

*Defined in [featurizers/action_featurizer.ts:42](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L42)*

___

### `Private` maskPreviousAction

• **maskPreviousAction**: *boolean*

*Defined in [featurizers/action_featurizer.ts:43](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L43)*

___

### `Private` previousAction

• **previousAction**: *any*

*Defined in [featurizers/action_featurizer.ts:46](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L46)*

___

###  size

• **size**: *number*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[size](_featurizers_featurizer_.featurizer.md#readonly-size)*

*Defined in [featurizers/action_featurizer.ts:39](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L39)*

___

### `Private` userTalked

• **userTalked**: *boolean*

*Defined in [featurizers/action_featurizer.ts:45](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L45)*

## Methods

###  export

▸ **export**(): *Promise‹object›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[export](_featurizers_featurizer_.featurizer.md#export)*

*Defined in [featurizers/action_featurizer.ts:116](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L116)*

**Returns:** *Promise‹object›*

___

###  getActionMask

▸ **getActionMask**(): *boolean[]*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[getActionMask](_featurizers_featurizer_.featurizer.md#getactionmask)*

*Defined in [featurizers/action_featurizer.ts:91](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L91)*

**Returns:** *boolean[]*

___

###  getOptimizableFeatures

▸ **getOptimizableFeatures**(`data`: tf.Tensor2D): *tf.Tensor1D*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[getOptimizableFeatures](_featurizers_featurizer_.featurizer.md#getoptimizablefeatures)*

*Defined in [featurizers/action_featurizer.ts:82](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | tf.Tensor2D |

**Returns:** *tf.Tensor1D*

___

###  handleAction

▸ **handleAction**(`action`: any): *void*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[handleAction](_featurizers_featurizer_.featurizer.md#handleaction)*

*Defined in [featurizers/action_featurizer.ts:86](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | any |

**Returns:** *void*

___

###  handleQuery

▸ **handleQuery**(`query`: string): *Promise‹tf.Tensor2D›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[handleQuery](_featurizers_featurizer_.featurizer.md#handlequery)*

*Defined in [featurizers/action_featurizer.ts:70](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹tf.Tensor2D›*

___

###  init

▸ **init**(`actions`: any[]): *Promise‹void›*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[init](_featurizers_featurizer_.featurizer.md#init)*

*Defined in [featurizers/action_featurizer.ts:63](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`actions` | any[] |

**Returns:** *Promise‹void›*

___

###  load

▸ **load**(`parameters`: object): *void*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[load](_featurizers_featurizer_.featurizer.md#load)*

*Defined in [featurizers/action_featurizer.ts:112](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L112)*

**Parameters:**

▪ **parameters**: *object*

Name | Type |
------ | ------ |
`embeddings` | number[][] |

**Returns:** *void*

___

###  resetDialog

▸ **resetDialog**(): *void*

*Overrides [Featurizer](_featurizers_featurizer_.featurizer.md).[resetDialog](_featurizers_featurizer_.featurizer.md#resetdialog)*

*Defined in [featurizers/action_featurizer.ts:107](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L107)*

**Returns:** *void*
