<p align='center'>
    <img src="https://github.com/the-new-sky/Wisty.js/raw/main/assets/logo-large.png" alt="Wisty" height="60"/>
</p>

<h2 align='center'>
    Build conversational interfaces for the browser.
</h2>

[![npm](https://img.shields.io/npm/v/wisty)](https://www.npmjs.com/package/wisty)
[![Build Status](https://travis-ci.org/the-new-sky/Wisty.js.svg?branch=main)](https://travis-ci.org/the-new-sky/Wisty.js)

**Wisty.js** is a JavaScript natural language processing library to build contextual chatbots or virtual assistants on the web.

- Powered by machine learning thanks to [TensorFlow.js](https://github.com/tensorflow/tfjs).

- Supports training and inference in Node.js and most browsers : you can integrate a bot into your front-end without having to rely on some infrastructure or a cloud service.

- It reduces the amount of hardcoded logic you have to write : new features are just a few training dialogs away.

### Status

The project is in alpha : the API is unstable as new feature keeps being added.

## Installation

You'll probably need to install TensorFlow.js along with Wisty.

```bash
$ npm install @tensorflow/tfjs wisty
```

```js
import * as wisty from 'wisty';

wisty.tools.parseStories(...);
```

If you intend to run Wisty on Node.js, then the TensorFlow C Backend can speeds up your bot :

```bash
$ npm install @tensorflow/tfjs-node
```

```js
const tf = require('@tensorflow/tfjs-node');
const wisty = require('wisty');
```

You can also use CDNs :

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<!--
    If you intend to use Universal Sentence Encoder model :
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder"></script>
-->

<script src="https://cdn.jsdelivr.net/npm/wisty@latest/dist/index.umd.min.js"></script>
```

## Demos

You can find open source demos of chatbots running with Wisty.js in [the demos folder](https://github.com/the-new-sky/Wisty.js/tree/main/demos).

- **Passwords** : An assistant trying to help you identify yourself on a web site if you have troubles logging in.
  - The implementation is quick and dirty javascript in the HTML and a customized style for [BotUI](https://github.com/botui/botui).

- **Restaurant** : A chatbot taking orders for a restaurant.
  - Implemented from scratch with Vue.js 3 and Vite.

## Documentation

For the moment, only the API reference is available on [GitHub Pages](https://the-new-sky.github.io/Wisty.js/).

## License

Wisty.js is licensed under the [MIT license](../main/license.txt).
