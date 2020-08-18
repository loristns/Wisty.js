[Wisty.js](../README.md) › [Globals](../globals.md) › ["tools/nlu_formatter"](../modules/_tools_nlu_formatter_.md) › [NLUFormatter](_tools_nlu_formatter_.nluformatter.md)

# Class: NLUFormatter

An utility class using HCN methods and Slots to offer an higher level API
looking like NLU librairies.

## Hierarchy

* **NLUFormatter**

## Index

### Constructors

* [constructor](_tools_nlu_formatter_.nluformatter.md#constructor)

### Properties

* [LUSAction](_tools_nlu_formatter_.nluformatter.md#private-lusaction)
* [model](_tools_nlu_formatter_.nluformatter.md#private-model)
* [slots](_tools_nlu_formatter_.nluformatter.md#private-slots)

### Methods

* [ask](_tools_nlu_formatter_.nluformatter.md#ask)
* [resetDialog](_tools_nlu_formatter_.nluformatter.md#resetdialog)

## Constructors

###  constructor

\+ **new NLUFormatter**(`__namedParameters`: object): *[NLUFormatter](_tools_nlu_formatter_.nluformatter.md)*

*Defined in [tools/nlu_formatter.ts:46](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L46)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`LUSAction` | string | "LUS" |
`model` | [HCN](_models_hcn_.hcn.md)‹› | - |
`slots` | [Slot](_slots_slot_.slot.md)‹any›[] | [] |

**Returns:** *[NLUFormatter](_tools_nlu_formatter_.nluformatter.md)*

## Properties

### `Private` LUSAction

• **LUSAction**: *string*

*Defined in [tools/nlu_formatter.ts:46](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L46)*

___

### `Private` model

• **model**: *[HCN](_models_hcn_.hcn.md)*

*Defined in [tools/nlu_formatter.ts:44](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L44)*

___

### `Private` slots

• **slots**: *[Slot](_slots_slot_.slot.md)‹any›[]*

*Defined in [tools/nlu_formatter.ts:45](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L45)*

## Methods

###  ask

▸ **ask**(`query`: string): *Promise‹[NLUDigest](../interfaces/_tools_nlu_formatter_.nludigest.md)›*

*Defined in [tools/nlu_formatter.ts:61](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L61)*

Turn a query into a NLU digest.

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *Promise‹[NLUDigest](../interfaces/_tools_nlu_formatter_.nludigest.md)›*

___

###  resetDialog

▸ **resetDialog**(): *void*

*Defined in [tools/nlu_formatter.ts:89](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L89)*

Reset the model state.

**Returns:** *void*
