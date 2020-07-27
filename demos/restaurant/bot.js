/* eslint-disable */

const use = new wisty.featurizers.USE();

const bow = new wisty.featurizers.BOW(100);

const fasttext = new wisty.featurizers.WordEmbedding(
    async () => fetch('../passwords/fasttext_light_en_30.json').then((response) => response.text()),
    30
);

const starterSlot = new ProductSlot({
    name: 'starter',
    categories: {
        'salad': ['salad', 'lettuce'],
        'boiled-eggs': ['boiled eggs', 'eggs'],
        'quiche': ['quiche']
    },
    suggestAction: 'askStarter',
    orderAction: 'orderStarter',
    refuseAction: 'noStarter',
    removeAction: 'removeStarter'
});

const mainSlot = new ProductSlot({
    name: 'main',
    categories: {
        'pizza': ['pizza', 'calzone', 'margherita'],
        'omelet': ['omelet', 'omelette']
    },
    suggestAction: 'askMain',
    orderAction: 'orderMain',
    refuseAction: 'noMain',
    removeAction: 'removeMain'
});

const dessertSlot = new ProductSlot({
    name: 'dessert',
    categories: {
        'muffin': ['muffin'],
        'sundae': ['sundae', 'sunday', 'ice-cream']
    },
    suggestAction: 'askDessert',
    orderAction: 'orderDessert',
    refuseAction: 'noDessert',
    removeAction: 'removeDessert'
});


const actionRules = new wisty.featurizers.ActionFeaturizer();
const restaurantRules = new RestaurantFeaturizer(starterSlot, mainSlot, dessertSlot);

const bot = new wisty.models.HCN({
    actions: ['giveMenu', 'askStarter', 'askMain', 'askDessert', 'orderStarter', 'orderMain',
              'orderDessert', 'noStarter', 'noMain', 'noDessert', 'removeStarter',
              'removeMain', 'removeDessert', 'unknown', 'askMorePoints', 'morePoints',
              'finalise', 'LUS'],
    featurizers: [use, bow, fasttext, starterSlot, mainSlot, dessertSlot, actionRules, restaurantRules],
    hiddenSize: 64,
    temperature: 2
});

const nlu = new wisty.tools.NLUFormatter({model: bot, slots: [starterSlot, mainSlot, dessertSlot]});

let botui = new BotUI('chat-ui');

async function train() {
    await bot.init();

    const dataset = await fetch('./dataset.md').then((response) => response.text());
    const stories = wisty.tools.parseStories(dataset);

    await bot.train({
        stories: stories,
        nEpochs: 25,
        onEpochEnd: (metrics) => console.log('Train', metrics)
    });
}

async function chat() {
    const messages = await fetch('action_messages.json').then((response) => response.json());

    while (true) {
        const query = await botui.action.text({
            action: { placeholder: 'Enter a query...' }
        });

        if (query.value === '/reset') {
            await nlu.resetDialog();

            await botui.message.removeAll();

            await botui.message.bot({
                delay: 500,
                content: `The conversation has been reset.`
            });

            await botui.message.bot({
                delay: 500,
                content: `Hey I'm your Restaurant Assistant, let's order today's meal !`
            });

        } else {
            const digest = await nlu.ask(query.value);

            document.querySelector('#nlu-area').innerHTML = JSON.stringify(digest, undefined, 4);
            
            document.querySelector('#order-starter').innerHTML = digest.slots['starter#Categorical'].orderedProduct || '//';
            document.querySelector('#order-main').innerHTML = digest.slots['main#Categorical'].orderedProduct || '//';
            document.querySelector('#order-dessert').innerHTML = digest.slots['dessert#Categorical'].orderedProduct || '//';
            document.querySelector('#order-additional').innerHTML = restaurantRules.additionalPoints;

            digest.actions.forEach((action, idx) => {
                botui.message.bot({
                    type: 'html',
                    delay: (idx + 1) * 500,
                    content: messages[action].join('\n')
                        .replace('${starter}', digest.slots['starter#Categorical'].category)
                        .replace('${main}', digest.slots['main#Categorical'].category)
                        .replace('${dessert}', digest.slots['dessert#Categorical'].category)
                });
            });
        }
    }
}

async function main() {
    await botui.message.bot({
        delay: 500,
        content: `
        You are about to try a Wisty.js Demo.
        If you continue, your browser will download and train an AI model of more than 30MB.`
    });

    await botui.message.bot({
        delay: 500,
        content: `Do you want to continue?`
    });

    await botui.action.button({
        delay: 500,
        action: [
            { text: 'Go!', value: 'direct' }
        ]
    });

    await botui.message.bot({
        delay: 500,
        content: `Initialisation...`
    });

    await train();

    await botui.message.removeAll();

    await botui.message.bot({
        delay: 500,
        content: `Hey I'm your Restaurant Assistant, let's order today's meal !`
    });

    await chat();
}