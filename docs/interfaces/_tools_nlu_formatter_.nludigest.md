[Wisty.js](../README.md) › [Globals](../globals.md) › ["tools/nlu_formatter"](../modules/_tools_nlu_formatter_.md) › [NLUDigest](_tools_nlu_formatter_.nludigest.md)

# Interface: NLUDigest

An NLU digests containing the input query, the list of bot action to take,
the overall confidence of the turn (product of action's confidences) and slots values.

## Hierarchy

* **NLUDigest**

## Index

### Properties

* [actions](_tools_nlu_formatter_.nludigest.md#actions)
* [query](_tools_nlu_formatter_.nludigest.md#query)
* [slots](_tools_nlu_formatter_.nludigest.md#slots)
* [turnConfidence](_tools_nlu_formatter_.nludigest.md#turnconfidence)

## Properties

###  actions

• **actions**: *string[]*

*Defined in [tools/nlu_formatter.ts:26](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L26)*

An array of actions names.

___

###  query

• **query**: *string*

*Defined in [tools/nlu_formatter.ts:21](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L21)*

The raw input query.

___

###  slots

• **slots**: *object*

*Defined in [tools/nlu_formatter.ts:36](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L36)*

The value of each slot.

#### Type declaration:

* \[ **slot**: *string*\]: any

___

###  turnConfidence

• **turnConfidence**: *number*

*Defined in [tools/nlu_formatter.ts:31](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/nlu_formatter.ts#L31)*

The overall confidence of the turn.
