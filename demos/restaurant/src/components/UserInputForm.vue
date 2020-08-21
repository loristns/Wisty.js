<template>
    <section class="user-input-form">
        <slot></slot>

        <div class="_input_form">
            <input
                v-model="userInput"
                @keyup.enter="sendInput()"
                :disabled="disabled"
                type="text"
                placeholder="Ask something"
            >
            <button
                @click="sendInput()"
                :disabled="disabled"
            >
                <i class="material-icons">send</i>
            </button>

            <button @click="toggleRecording()" v-if="speechRecognition !== undefined">
                <i class="material-icons" :class="{ isRecording }">mic</i>
            </button>
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        name: 'user-input-form',

        props: {
            disabled: Boolean
        },

        data() {
            return {
                speechRecognition: 'webkitSpeechRecognition' in window 
                                    ? new webkitSpeechRecognition() 
                                    : undefined,
                userInput: '',
                isRecording: false
            }
        },

        methods: {
            sendInput() {
                this.$emit('new-message', this.userInput);
                this.userInput = '';
            },
    
            toggleRecording() {
                this.isRecording = !this.isRecording;

                if (this.isRecording) {
                    this.speechRecognition.start();
                } else {
                    this.speechRecognition.stop();
                }
            },

            whenRecorded(event: SpeechRecognitionEvent) {
                this.$emit('new-message', event.results[0][0].transcript);
                this.speechRecognition.stop();
                this.isRecording = false;
            }
        },

        mounted() {
            if (this.speechRecognition !== undefined) {
                //this.speechRecognition.lang = 'en-US';
                this.speechRecognition.continuous = true;
                this.speechRecognition.onresult = this.whenRecorded;
            }
        }
    };
</script>

<style lang="scss" scoped>
    section {
        padding: 1em 0;
        background-color: black;
        width: calc(100% - 16px);

        ._input_form {
            margin-top: 1em;

            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            &>* {
                margin: 0 20px;
            }

            input {
                background-color: black;
                color: white;

                padding: 7px 14px;
                margin-bottom: 20px;

                flex-grow: 2;
                max-width: 40em;

                border: 0;
                border-bottom: 2px solid rgb(122, 184, 255);

                &:focus {
                    outline: none;
                }
            }

            button {
                background-color: black;
                color: rgb(122, 184, 255);
                font-weight: bold;

                border: 0;
                padding: 7px 14px;

                &:hover {
                    color: rgb(173, 211, 255);
                }

                & .isRecording {
                    color: rgb(179, 51, 0);
                }

                &:focus {
                    outline: none;
                }
            }
        }
    }
</style>