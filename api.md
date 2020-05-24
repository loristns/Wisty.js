# Wisty.js API Draft

## Models

Models are the brain of the conversational interface, they predicts actions based on text input.
They support featurizers to provide features and control for the model.
They are found in the `wisty.models` namespace.

For now, only HCN (hybrid code networks) are proposed.
No abstract class was defined to implement other model for this first release.

```ts
const hcn = new wisty.models.HCN({
    actions: [],
    featurizers: [],
    /*
        Featurizer specific predefined parameters :
        hiddenSize = 32
        optimizer = tf.train.adam(0.01)
        temperature = 1
        dropout = 0
    */
});

await hcn.init(); // Initialize asynchronously

// Models are stateful, they should be reset when the conversation change.
hcn.resetDialog();

hcn.predict(query);

hcn.export(); // Return json as text (or other format)

// Those functions reset the model's state

hcn.train({
    stories: [],
    /*
        Predefined parameters :
        nEpochs (for training)
        onEpochEnd (callback function executed at each epoch)
    */
});

hcn.score(stories=[]);

hcn.load(json); // Take json as text (or other format)
```

## Featurizers

Featurizers are software element that controls the runtime and extends the model by providing features.
They can support multiple optional features depending on their nature.

- asynchronous initialisation
- handling of queries (for now it's not optional, but it may be in future release)
- gradient descent optimization
- handling of actions
- masking of actions
- loading/exporting of parameters

They are found in the `wisty.featurizers` namespace.
(see featurizers.ts for API details)

Currently we implemented :
- Hashing-trick bag of words featurizer
- Universal Sentence Encoder featurizer (support English, ~27MB)
- Word-Embedding featurizer that pool into a sentence embedding by using mean-pool and max-pool.
- Action featurizers that provides some optional features such as masking the previous action, or the "LUS" action.
- **slots**

## Slots

Slots are a special kind of featurizer that extract values from the user's utterances.

**If they fit the limitations**, they implements a simplified interface called `Slot`.

```ts
readonly id: string;
readonly size: number;

private dependantActions: string[];
private invDependantActions: string[];
private value: any[]

async init?(action: any[]);
async handleQuery(query: string): Promise<any>;
getOptimizableFeatures(data: any): tf.Tensor1D;
handleAction(action: any): void;

// getActionMask() is already implemented.
// It's based on dependantActions/invDependantActions

// resetDialog() is already implemented.
// It resets the value of the model.

load();
export();

// getValue(): any is already implemented.
// setValue(any) is also implemented.
```

For the first release, two slots are implemented :
- CategoricalSlot that uses approximate string matching
- TextSlot that use an LSTM internally. (maybe delayed)

They are found in the `wisty.slots` namespace.

## Utility

The `wisty.utils` namespaces contains utilities not related to conversational interfaces but that may be useful when implementing featurizers, slots or anything else.

It contains :
- An approximate string-matching algorithm
- An hashing function
- A tensorflow variable initializer
- A leveinshtein distance implementation
- Types modeling conversation state and training/inference metrics

## Tooling

The `wisty.tools` namespaces contains some utility function meant for using wisty.

It contains :
- A Wisty Story format parser
- A Wisty Entity format parser (maybe delayed or implemented differently)
- A train-test spliter
- A friendly NLU formatter that takes the model the slots.

```ts
const nlu = new wisty.tools.NLUFormatter({
    model: hcn,
    slots: [productNameSlot, personSlot],
    fallbackAction: 'fallback'
});

nlu.ask("I'd like a pizza please");
/*
{
    query: "I'd like a pizza please",
    actions: ['orderProduct', 'askAnythingElse'],
    turnConfidence: 0.86,
    slots: {
        'productNameSlot#Categorical': {
            category: 'pizza',
            extract: 'pizza',
            score: 1.0
        },
        'personSlot#Text': undefined
    }
}
*/

nlu.resetDialog();
```
