[Wisty.js](../README.md) › [Globals](../globals.md) › ["tools/train_test_split"](_tools_train_test_split_.md)

# Module: "tools/train_test_split"

## Index

### Functions

* [trainTestSplit](_tools_train_test_split_.md#traintestsplit)

## Functions

###  trainTestSplit

▸ **trainTestSplit**(`stories`: [Story](_utils_state_.md#story)[], `testSize`: number): *object*

*Defined in [tools/train_test_split.ts:9](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/tools/train_test_split.ts#L9)*

Split a list of stories into random train and test subsets.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`stories` | [Story](_utils_state_.md#story)[] | A list of stories. |
`testSize` | number | The proportion of stories to put in the test subset.  |

**Returns:** *object*

* **test**: *[Story](_utils_state_.md#story)[]*

* **train**: *[Story](_utils_state_.md#story)[]*
