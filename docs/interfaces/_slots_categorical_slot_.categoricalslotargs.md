[Wisty.js](../README.md) › [Globals](../globals.md) › ["slots/categorical_slot"](../modules/_slots_categorical_slot_.md) › [CategoricalSlotArgs](_slots_categorical_slot_.categoricalslotargs.md)

# Interface: CategoricalSlotArgs

Parameters for Categorical Slot constructor.

## Hierarchy

* **CategoricalSlotArgs**

## Index

### Properties

* [categories](_slots_categorical_slot_.categoricalslotargs.md#categories)
* [dependantActions](_slots_categorical_slot_.categoricalslotargs.md#optional-dependantactions)
* [invDependantActions](_slots_categorical_slot_.categoricalslotargs.md#optional-invdependantactions)
* [name](_slots_categorical_slot_.categoricalslotargs.md#name)
* [threshold](_slots_categorical_slot_.categoricalslotargs.md#optional-threshold)

## Properties

###  categories

• **categories**: *[Categories](../modules/_slots_categorical_slot_.md#categories)*

*Defined in [slots/categorical_slot.ts:21](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L21)*

An object with the name of the category as a key and an array of synonyms that belong to
the category as a value.

___

### `Optional` dependantActions

• **dependantActions**? : *string[]*

*Defined in [slots/categorical_slot.ts:26](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L26)*

The list of actions that can be taken by the model only when the slot is defined.

___

### `Optional` invDependantActions

• **invDependantActions**? : *string[]*

*Defined in [slots/categorical_slot.ts:31](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L31)*

The list of actions that can be taken by the model only when the slot is undefined.

___

###  name

• **name**: *string*

*Defined in [slots/categorical_slot.ts:15](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L15)*

The name of the slot.

___

### `Optional` threshold

• **threshold**? : *number*

*Defined in [slots/categorical_slot.ts:36](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/slots/categorical_slot.ts#L36)*

The minimum similarity to get selected as a value. (based on Leveinshtein Distance)
