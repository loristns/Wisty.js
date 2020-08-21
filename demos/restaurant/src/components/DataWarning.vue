<template>
    <article class="data-warning" v-if='!accepted'>
        <h2>Load the AI model from your connection?</h2>
        <p>
            The weight of the model is about <strong>5MB</strong>. Using data over a mobile or
            limited network may incur additional fees.
        </p>
        <button @click="accept()">Load</button>
    </article>
</template>

<script lang="ts">
    export default {
        name: 'data-warning',

        data() {
            return {
                accepted: false
            }
        },

        methods: {
            accept() {
                this.accepted = true;
                this.$emit('loading-accepted');
            }
        }
    };
</script>

<style lang="scss" scoped>
    article {
        position: fixed;
        width: 80%;
        max-width: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;

        background-color: whitesmoke;
        color: black;

        padding: 1.2em;
        border-radius: 2em;
        text-align: center;

        h2 {
            font-weight: normal;
            font-size: 1.4em;
        }

        p {
            font-weight: lighter;
        }

        button {
            width: 100%;

            background-color: whitesmoke;
            border: 0;
            border-top: 1px solid gray;
            padding: 1em;

            color: rgb(3, 87, 182);
            font-weight: bold;

            &:hover {
                text-decoration: underline;
            }

            &:focus {
                outline: none;
            }
        }
    }
</style>

