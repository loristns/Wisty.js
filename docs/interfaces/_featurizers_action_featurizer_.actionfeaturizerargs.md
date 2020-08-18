[Wisty.js](../README.md) › [Globals](../globals.md) › ["featurizers/action_featurizer"](../modules/_featurizers_action_featurizer_.md) › [ActionFeaturizerArgs](_featurizers_action_featurizer_.actionfeaturizerargs.md)

# Interface: ActionFeaturizerArgs

Parameters for ActionFeaturizer constructor.

## Hierarchy

* **ActionFeaturizerArgs**

## Index

### Properties

* [LUSAction](_featurizers_action_featurizer_.actionfeaturizerargs.md#optional-lusaction)
* [maskLUS](_featurizers_action_featurizer_.actionfeaturizerargs.md#optional-masklus)
* [maskPreviousAction](_featurizers_action_featurizer_.actionfeaturizerargs.md#optional-maskpreviousaction)

## Properties

### `Optional` LUSAction

• **LUSAction**? : *string*

*Defined in [featurizers/action_featurizer.ts:25](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L25)*

The action the bot takes to let the user talk.
Default to 'LUS' (acronym for Let User Speak).

___

### `Optional` maskLUS

• **maskLUS**? : *boolean*

*Defined in [featurizers/action_featurizer.ts:13](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L13)*

Enable the masking of LUS when the user has just talked.
Enabled by default.

___

### `Optional` maskPreviousAction

• **maskPreviousAction**? : *boolean*

*Defined in [featurizers/action_featurizer.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/featurizers/action_featurizer.ts#L19)*

Enable the masking of the previous action.
Enabled by default.
