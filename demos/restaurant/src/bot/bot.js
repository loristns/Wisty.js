import * as wisty from 'wisty';
import { ProductSlot } from './featurizers/product-slot.ts';
import { RestaurantFeaturizer } from './featurizers/restaurant-featurizer.ts';

// Define featurizers
const bow = new wisty.featurizers.BOW(200);

const embeddings = new wisty.tools.KeyedVectors(
    async () => fetch('/fasttext_light_en_30.json').then((response) => response.text()),
    30
);
const fasttext = new wisty.featurizers.WordEmbedding(embeddings);

// const use = new wisty.featurizers.USE();

const starterSlot = new ProductSlot(
    'starter', // Name
    { // Keywords
        salad: ['salad', 'lettuce'],
        eggs: ['boiled eggs', 'eggs'],
        quiche: ['quiche']
    },
    { salad: 1, eggs: 1, quiche: 2 }, // Costs
    'askStarter', 'orderStarter', 'noStarter', 'removeStarter' // Control actions
);

const mainSlot = new ProductSlot(
    'main',
    {
        pizza: ['pizza', 'neapolitan'],
        omelet: ['omelet', 'omelette', 'chanterelles']
    },
    { pizza: 5, omelet: 4 },
    'askMain', 'orderMain', 'noMain', 'removeMain'
);

const dessertSlot = new ProductSlot(
    'dessert',
    {
        muffin: ['muffin'],
        sundae: ['sundae', 'sunday', 'ice-cream']
    },
    { muffin: 1, sundae: 2 },
    'askDessert', 'orderDessert', 'noDessert', 'removeDessert'
);

const actionRules = new wisty.featurizers.ActionFeaturizer();

const restaurantRules = new RestaurantFeaturizer(starterSlot, mainSlot, dessertSlot);

const bot = new wisty.models.HCN({
    actions: [
        'giveMenu', 'askStarter', 'askMain', 'askDessert', 'orderStarter', 'orderMain',
        'orderDessert', 'noStarter', 'noMain', 'noDessert', 'removeStarter',
        'removeMain', 'removeDessert', 'unknown', 'askMorePoints', 'morePoints',
        'finalise', 'LUS'
    ],
    featurizers: [bow, fasttext, starterSlot, mainSlot, dessertSlot, actionRules, restaurantRules],
    hiddenSize: 24,
    temperature: 2
});

export const nlu = new wisty.tools.NLUFormatter({
    model: bot,
    slots: [starterSlot, mainSlot, dessertSlot]
});

export async function train() {
    await bot.init();

    const dataset = await fetch('/stories.md').then((response) => response.text());
    const stories = wisty.tools.parseStories(dataset);

    await bot.train({
        stories,
        nEpochs: 25,
        onEpochEnd: (metrics) => console.log('Train', metrics)
    });

    console.log(bot.export());
}

export async function load() {
    await bot.init();

    const model = await fetch('/model.json').then((response) => response.text());
    bot.load(model);
}

export function getMessage(action, digest) {
    switch (action) {
    case 'giveMenu':
        return [
            {
                message: `As a starter we have a traditional quiche from Lorraine
                            for 2 points, or hard-boiled eggs with mayonaise or simply
                            green salad for a point.`,
                userBubble: false
            },
            {
                message: `As a main course, we have a Neapolitan pizza for 5 points,
                            or an omelet with chanterelles for 4 points.`,
                userBubble: false
            },
            {
                message: `And finally, for dessert you have the choice between a
                            sundae on a bed of caramel for 2 points or just a muffin for
                            only 1 point.`,
                userBubble: false
            }
        ];

    case 'askStarter':
        return [{
            message: 'As a starter, what\'s your choice?',
            userBubble: false
        }];

    case 'askMain':
        return [{
            message: 'And for the main course, what will you have?',
            userBubble: false
        }];

    case 'askDessert':
        return [{
            message: 'For dessert, what would you like?',
            userBubble: false
        }];

    case 'orderStarter':
        return [{
            message: `${digest.slots['starter#Categorical'].category}, got it.`,
            userBubble: false
        }];

    case 'orderMain':
        return [{
            message: `For the main course, ${digest.slots['main#Categorical'].category}, got it.`,
            userBubble: false
        }];

    case 'orderDessert':
        return [{
            message: `A ${digest.slots['dessert#Categorical'].category},
                        ${Math.random() > 0.5 ? 'great choice' : 'got it'}.`,
            userBubble: false
        }];

    case 'noStarter':
        return [{
            message: 'Ok, no starter.',
            userBubble: false
        }];

    case 'noMain':
        return [{
            message: 'No main course, sure.',
            userBubble: false
        }];

    case 'noDessert':
        return [{
            message: 'No dessert, noted.',
            userBubble: false
        }];

    case 'removeStarter':
        return [{
            message: 'Okay, I removed the starter.',
            userBubble: false
        }];

    case 'removeMain':
        return [{
            message: 'I removed the main course.',
            userBubble: false
        }];

    case 'removeDessert':
        return [{
            message: 'I removed the dessert.',
            userBubble: false
        }];

    case 'unknown':
        return [{
            message: 'I\'m afraid we don\'t offer this product, sorry.',
            userBubble: false
        }];

    case 'askMorePoints':
        return [{
            message: `Your order will exceed the number of points you currently have,
                      would you like to purchase additional points?`,
            userBubble: false
        }];

    case 'morePoints':
        return [{
            message: 'Ok I added the extra points.',
            userBubble: false
        }];

    case 'finalise':
        return [{
            message: 'We\'re all good, your order will be prepared as soon as possible.',
            userBubble: false
        }];

    default:
        return undefined;
    }
}
