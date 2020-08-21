<template>
    <div class="chat-bubble" v-bind:class="{ userBubble }">
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'chat-bubble',

        props: {
            message: String,
            userBubble: Boolean
        },

        mounted() {
            if ('speechSynthesis' in window && !this.userBubble) {
                const utterance = new SpeechSynthesisUtterance(this.message);
                utterance.lang = 'en-US';
                speechSynthesis.speak(utterance);
            }
        }
    };
</script>

<style lang="scss" scoped>
    div {
        background-color: rgb(78, 78, 78);
        &.userBubble {
            background-color: rgb(122, 184, 255);
        }

        padding: 10px 20px;
        border-radius: 1em;

        p {
            margin: 0;

            color: white;
        }

        &.userBubble p {
            color: black;
            text-align: right;
        }
    }
</style>