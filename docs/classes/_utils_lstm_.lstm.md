[Wisty.js](../README.md) › [Globals](../globals.md) › ["utils/lstm"](../modules/_utils_lstm_.md) › [LSTM](_utils_lstm_.lstm.md)

# Class: LSTM

An LSTM cell with a dense layer on its top.

## Hierarchy

* **LSTM**

## Index

### Constructors

* [constructor](_utils_lstm_.lstm.md#constructor)

### Properties

* [denseBias](_utils_lstm_.lstm.md#private-densebias)
* [denseWeights](_utils_lstm_.lstm.md#private-denseweights)
* [dropout](_utils_lstm_.lstm.md#dropout)
* [lstmBias](_utils_lstm_.lstm.md#private-lstmbias)
* [lstmForgetBias](_utils_lstm_.lstm.md#private-lstmforgetbias)
* [lstmInitC](_utils_lstm_.lstm.md#private-lstminitc)
* [lstmInitH](_utils_lstm_.lstm.md#private-lstminith)
* [lstmKernel](_utils_lstm_.lstm.md#private-lstmkernel)

### Methods

* [export](_utils_lstm_.lstm.md#export)
* [initLSTM](_utils_lstm_.lstm.md#initlstm)
* [load](_utils_lstm_.lstm.md#load)
* [predict](_utils_lstm_.lstm.md#predict)

## Constructors

###  constructor

\+ **new LSTM**(`inputSize`: number, `hiddenSize`: number, `outputSize`: number, `dropout`: number): *[LSTM](_utils_lstm_.lstm.md)*

*Defined in [utils/lstm.ts:22](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L22)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`inputSize` | number | - | The dimension of the input data. |
`hiddenSize` | number | - | The dimension of the output of the LSTM, passed to the dense layer. |
`outputSize` | number | - | The dimension of the output data. |
`dropout` | number | 0.2 | The dropout rate between the LSTM cell and the dense layer.  |

**Returns:** *[LSTM](_utils_lstm_.lstm.md)*

## Properties

### `Private` denseBias

• **denseBias**: *Tensor*

*Defined in [utils/lstm.ts:19](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L19)*

___

### `Private` denseWeights

• **denseWeights**: *Tensor*

*Defined in [utils/lstm.ts:18](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L18)*

___

###  dropout

• **dropout**: *number*

*Defined in [utils/lstm.ts:22](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L22)*

___

### `Private` lstmBias

• **lstmBias**: *Tensor*

*Defined in [utils/lstm.ts:12](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L12)*

___

### `Private` lstmForgetBias

• **lstmForgetBias**: *Tensor*

*Defined in [utils/lstm.ts:13](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L13)*

___

### `Private` lstmInitC

• **lstmInitC**: *Tensor*

*Defined in [utils/lstm.ts:15](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L15)*

___

### `Private` lstmInitH

• **lstmInitH**: *Tensor*

*Defined in [utils/lstm.ts:14](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L14)*

___

### `Private` lstmKernel

• **lstmKernel**: *Tensor*

*Defined in [utils/lstm.ts:11](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L11)*

## Methods

###  export

▸ **export**(): *Promise‹object›*

*Defined in [utils/lstm.ts:110](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L110)*

Return all the LSTM model parameters.

**Returns:** *Promise‹object›*

___

###  initLSTM

▸ **initLSTM**(`clone`: boolean): *object*

*Defined in [utils/lstm.ts:48](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L48)*

Gives the initial state values of the LSTM (c and h).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`clone` | boolean | true | If it is necessary to clone states variable or no.  |

**Returns:** *object*

* **c**: *tf.Tensor2D*

* **h**: *tf.Tensor2D*

___

###  load

▸ **load**(`weights`: object): *void*

*Defined in [utils/lstm.ts:94](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L94)*

Update the given model parameters.

**Parameters:**

Name | Type |
------ | ------ |
`weights` | object |

**Returns:** *void*

___

###  predict

▸ **predict**(`x`: tf.Tensor1D, `c`: tf.Tensor2D, `h`: tf.Tensor2D, `mask?`: tf.Tensor1D, `temperature`: number): *[LSTMPrediction](../modules/_utils_lstm_.md#lstmprediction)*

*Defined in [utils/lstm.ts:62](https://github.com/the-new-sky/Wisty.js/blob/22c0b6f/src/utils/lstm.ts#L62)*

Make a prediction given an input and state values (c and h).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`x` | tf.Tensor1D | - | A vector of shape [inputSize]. |
`c` | tf.Tensor2D | - | LSTM's state value. |
`h` | tf.Tensor2D | - | LSTM's last output value. |
`mask?` | tf.Tensor1D | - | A vector of ones and zeros of shape [outputSize].  |
`temperature` | number | 1 | - |

**Returns:** *[LSTMPrediction](../modules/_utils_lstm_.md#lstmprediction)*
