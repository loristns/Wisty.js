# Wisty.js API Draft

## Featurizers

```ts
interface Featurizer {
    async handleQuery(query: string): tf.Tensor;
    resetDialog();
}
```

## Slot tracker (Featurizer)

- **Initially** No tracker
- tracker

```ts
let city = new wisty.TextSlot();
city.train(...);

let productName = new wisty.CatSlot([/* list of products names */]);

slots = new wisty.SlotTracker({ city, productName });

await slots.handleQuery('Hey, what the forecast in London ?')
// slots.slots.city.parse('Hey, what the forecast in London ?')
// ['London'] --> added to tracker
// slots.slots.productName.parse('Hey, what the forecast in London ?')
// []
// retourne : <tf.Tensor> [1, 0, 1, 0] (getFeature + new features)
```

## Slot

- **Initially** No slot
- TextSlot
- CatSlot
- other slots

```ts
interface Slot {
    parse(query: string): string[]
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

### Slot Action Filter

- *first* no
- **Initially** slot action filter

```ts
let filter = new wisty.ActionFilter(SlotTracker, actions);

filter.setRule(action='sayHello', ())
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
