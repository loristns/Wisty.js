<template>
    <data-warning @loading-accepted="load()"/>
    
    <div v-if="loaded">
        <article id="intro">
            <h1>Wisty.js Restaurant Assistant Demo</h1>
            <p>
                This assistant will take your (virtual) order for this restaurant. <br>
                The restaurant has a rather special formula: your menu always costs the same 
                and offers you <em>6 points</em> that you can divide according to your wishes
                between a starter, a main course and a dessert. If you exceed this, you will
                have to take an extra charge.
            </p>
            <span>
                Tip: if you don't know what to order, you can start by asking for the menu.
            </span>
        </article>
    
        <section id="chat-history">
            <chat-bubble
                v-for="(bubble, idx) in bubbles" :key="idx"
                :message="bubble.message"
                :userBubble="bubble.userBubble"
            />
        </section>

        <user-input-form @new-message="handleMessage($event)">
            <section id="product-cards">
                <product-card
                    v-if="digest.slots['starter#Categorical'].orderedProduct != null"
                    :product_name="digest.slots['starter#Categorical'].orderedProduct"
                    :cost="digest.slots['starter#Categorical'].orderedCost"
                />
                <product-card
                    v-if="digest.slots['main#Categorical'].orderedProduct != null"
                    :product_name="digest.slots['main#Categorical'].orderedProduct"
                    :cost="digest.slots['main#Categorical'].orderedCost"
                />

                <product-card
                    v-if="digest.slots['dessert#Categorical'].orderedProduct != null"
                    :product_name="digest.slots['dessert#Categorical'].orderedProduct"
                    :cost="digest.slots['dessert#Categorical'].orderedCost"
                />
            </section>
        </user-input-form>
    </div>
</template>

<script lang="ts">
    import DataWarning from './components/DataWarning.vue';
    import ChatBubble from './components/ChatBubble.vue';
    import UserInputForm from './components/UserInputForm.vue';
    import ProductCard from './components/ProductCard.vue';

    import { load, nlu, getMessage } from './bot/bot.js';

    const emptyDigest = {
        slots: {
            "starter#Categorical": {},
            "main#Categorical": {},
            "dessert#Categorical": {}
        }
    };

    const welcomeBubble = {
        message: `Hello, i'm your restaurant order assistant,
                    let's order today's meal !`,
        userBubble: false
    }

    export default {
        name: 'App',

        components: {
            DataWarning,
            ChatBubble,
            UserInputForm,
            ProductCard
        },

        data() {
            return {
                loaded: false,
                bubbles: [],
                digest: emptyDigest
            };
        },

        methods: {
            async load() {
                this.loaded = true;

                this.bubbles = [
                    { message: 'Loading...', userBubble: false },
                ];
    
                await load();

                this.bubbles.push(welcomeBubble);
            },

            async handleMessage(message: string) {
                if (message === '/reset') {
                    nlu.resetDialog();

                    this.digest = emptyDigest;

                    this.bubbles = [
                        { message: 'The conversation has been reset.', userBubble: false },
                        welcomeBubble
                    ];
                } else if (message !== '') {
                    this.digest = await nlu.ask(message);

                    this.bubbles.push({ message, userBubble: true });


                    let totalDelay = 0;

                    this.digest.actions.forEach((action) => {
                        getMessage(action, this.digest)
                            .forEach((bubble) => {
                                setTimeout(() => this.bubbles.push(bubble), totalDelay);

                                totalDelay += 500;
                            }
                        );
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    #intro {
        h1 {
            font-size: 1.5em;
        }

        p {
            font-weight: lighter;
            text-align: justify;
            max-width: 600px;
        }

        span {
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-style: italic;
        }

        margin-bottom: 2em;
    }

    #chat-history {
        display: grid;
        grid-template-columns: 33% 33% auto;
        grid-gap: 1em;

        .chat-bubble {
            grid-column-start: 1;
            grid-column-end: 3;
            justify-self: start;
        }

        .chat-bubble.userBubble {
            grid-column-start: 2;
            grid-column-end: 4;
            justify-self: end;
        }

        margin-bottom: 25em;
    }

    .user-input-form {
        position: fixed;
        bottom: 0;
    }

    #product-cards {
        display: flex;
        justify-content: center;
    }
</style>
