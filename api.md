# Wisty.js API Draft

## Featurizers

```ts
interface Featurizer {
    async handleQuery(query: string): tf.Tensor;
    async getActionMask(actions: any[]): boolean[];

    resetDialog();
}
```

## Slot (featurizer)

- **Initially** No slot
- TextSlot
- CatSlot
- other slots

```ts
abstract class Slot implements Featurizer {
    async handleQuery(query: string): tf.Tensor;
    async getActionMask(actions: any[]): boolean[];

    abstract getValue(): any[];
}
```

## USE (Featurizer)

```ts
let encoder = new wisty.USE();

await encoder.init();
await encoder.handleQuery('Hey, what the forecast in London ?');
```

### BOW (Featurizer)

- *first* only USE
- **Initially** USE and BOW

```ts
let encoder = new wisty.BOW(dim=128);

await encoder.handleQuery('Hey, what the forecast in London ?');
```

## Hybrid Code Network

- **Initially** No action mask support
- Action mask support

```ts
interface State {
    query: string;
    action: any;
}

type Story = State[];
type Stories = Story[];
```

```ts
model = new wisty.HCN(actions=['sayHello', 'sellProduct', 'askCity', 'LUS'], featurizers: Featurizer[]);

await model.train(Stories, epochs, onEpochEnd= (epoch, loss, accuracy) => {});

model.resetDialog();
await model.predict('Hi !', mask);
// sayHello

await model.predict('');
// LUS

model.export()
// json

model.loadJSON(json)

model.load('https://...')
```

## Utils

### Wisty Stories

```ts
let stories = wisty.utils.parseStories(`WistyStories code....`);

let stories = wisty.utils.fetchStories('https://...');
```
