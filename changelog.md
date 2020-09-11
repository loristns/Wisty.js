## 0.0.8 (2020-09-11)

### Features

- Support of WistyML Data at training time

### Dependencies

- Updated TensorFlow.js to version 2.3.0
- Updated Universal Sentence Encoder to version 1.3.2

---

## 0.0.7 (2020-09-10)

### Features

- WistyML support
    - Require commonmark.js dependancy
    - Training stories support (mostly the same syntax as previous Wisty Stories Language)
    - *Unimplemented* : Training of extractive slots
    - *Unimplemented* : Support of data to pass information to the featurizer at training time.

### BREAKING CHANGES

- Wisty Stories Language has been removed and replaced by WistyML.
- WistyML returns stories as an object instead of an array.
    - `wisty.tools.trainTestSplit` has been updated to split objects instead of arrays.

### Other

- Added tsconfig files at the root of the project directory.
