import * as commonmark from 'commonmark';
import { Stories, State, ExtractedValue } from '../utils';

export interface ParsedWistyML {
    stories: Stories,
    extractedValues: {[title: string]: ExtractedValue[]}
}

enum StateStep {
    query, data, action, empty
}

/**
 * Parse a source string formatted according the WistyML syntax.
 * Usually, this source string is extracted using fetch or from a file.
 */
export function parseWistyML(source: string): ParsedWistyML {
    const markdownParser = new commonmark.Parser({ smart: true });
    const parsedMarkdown = markdownParser.parse(source);

    const walker = parsedMarkdown.walker();
    let event = walker.next();

    const state = {
        // General
        section: undefined,
        status: undefined,
        // Slot
        slot: undefined,
        sentence: '',
        extractedValues: [],
        // Story
        storyName: undefined,
        story: [],
        currentState: undefined,
        stateStep: StateStep.empty
    };

    const parsedSource: ParsedWistyML = { stories: {}, extractedValues: {} };

    function endStory() {
        if (state.storyName !== undefined) {
            // Push the last step
            state.story.push(state.currentState);
            // Add a last LUS state
            state.story.push({ query: '', action: 'LUS' });

            // Push the story
            parsedSource.stories[state.storyName] = state.story;

            // Reset the state
            state.storyName = undefined;
            state.story = [];
            state.currentState = undefined;
            state.stateStep = StateStep.empty;
        }
    }

    function pushSlot(sentence: string) {
        if (parsedSource.extractedValues[state.slot] === undefined) {
            parsedSource.extractedValues[state.slot] = [];
        }

        // Push the samples to the parsed digest
        parsedSource.extractedValues[state.slot].push(
            // Add the complete sentence to the extracted values.
            ...state.extractedValues.map((extractedValues) => ({ sentence, ...extractedValues }))
        );

        state.extractedValues = [];
        state.sentence = '';
    }

    while (event !== null) {
        const { entering, node } = event;
        const {
            type,
            literal,
            destination,
            info,
            level
        } = node;

        /*
            Handle section change
            ## section name
        */
        if (entering && type === 'heading' && level === 2) {
            state.status = 'new-section';
            endStory();

        /*
            Get the new section name
        */
        } else if (type === 'text' && state.status === 'new-section') {
            state.section = literal;
            state.status = `${literal}.entering`;

        /*
            Slots section parsing :
            ## wisty.slots
        */
        } else if (state.section === 'wisty.slots') {
            /*
                Entering a new slot

                ## wisty.slots
                ...
                ### slot name
            */
            if (entering && type === 'heading' && level === 3) {
                state.status = 'slots.new-slot';

            /*
                Get the slot name
            */
            } else if (type === 'text' && state.status === 'slots.new-slot') {
                if (!(literal in parsedSource.extractedValues)) {
                    parsedSource.extractedValues[literal] = [];
                }

                state.slot = literal;
                state.status = 'slots.in-slot';

            /*
                Entering a sample

                - sample
            */
            } else if (entering && type === 'item' && state.status === 'slots.in-slot') {
                state.status = 'slots.in-sample';

            /*
                Getting sample text
            */
            } else if (type === 'text' && state.status === 'slots.in-sample') {
                state.sentence += literal;

            /*
                Getting selected sample text

                `selected text`
            */
            } else if (type === 'code' && state.status === 'slots.in-sample') {
                state.extractedValues.push({
                    extract: literal,
                    start: state.sentence.length,
                    end: state.sentence.length + literal.length - 1
                });

                state.sentence += literal;

            /*
                Exiting a sample
            */
            } else if (!entering && type === 'item' && state.status === 'slots.in-sample') {
                pushSlot(state.sentence);
                state.status = 'slots.in-slot';
            }

        /*
            Stories section parsing :

            ## wisty.stories
        */
        } else if (state.section === 'wisty.stories') {
            /*
                Entering a new story

                ## wisty.stories
                ...
                ### story name
            */
            if (entering && type === 'heading' && level === 3) {
                state.status = 'stories.new-story';

                endStory();

            /*
                Get the new story name
            */
            } else if (type === 'text' && state.status === 'stories.new-story') {
                state.storyName = literal;
                state.status = 'stories.in-story';

            /*
                State management code
            */
            } else if (
                entering
                && ['block_quote', 'item', 'code_block'].includes(type)
                && state.status === 'stories.in-story') {
                // Identify the type of data in the state (the "step")
                let newStep: StateStep;

                switch (type) {
                case 'block_quote':
                    newStep = StateStep.query;
                    break;

                case 'item':
                    newStep = StateStep.action;
                    break;

                case 'code_block':
                    newStep = StateStep.data;
                    break;

                default: break;
                }

                /*
                    If the new step is breaking the order of enunciation of the state step,
                    we begin a new state.
                */
                if (newStep <= state.stateStep) {
                    // Push the previous step
                    if (state.currentState !== undefined) {
                        state.story.push(state.currentState);

                        if (newStep === StateStep.query && state.currentState.action !== 'LUS') {
                            state.story.push(<State> { query: '', action: 'LUS' });
                        }
                    }

                    state.currentState = { query: '', action: 'LUS' };
                }

                switch (newStep) {
                case StateStep.query:
                    state.status = 'stories.new-query';
                    break;

                case StateStep.action:
                    state.status = 'stories.new-action';
                    break;

                case StateStep.data:
                    if (info === 'json') {
                        state.currentState.data = JSON.parse(literal);
                    }
                    break;

                default: break;
                }

                state.stateStep = newStep;

            /*
                Get the query
            */
            } else if (type === 'text' && state.status === 'stories.new-query') {
                state.currentState.query += literal;

            /*
                Slot training in a query
            */
            } else if (entering && type === 'link' && state.status === 'stories.new-query') {
                state.slot = destination;
                state.status = 'stories.new-slot';

            /*
                Get the extracted text from the slot
            */
            } else if (type === 'text' && state.status === 'stories.new-slot') {
                state.extractedValues.push({
                    extract: literal,
                    start: state.currentState.query.length,
                    end: state.currentState.query.length + literal.length - 1
                });

                state.currentState.query += literal;
                state.status = 'stories.new-query';

            /*
                End the query block
            */
            } else if (!entering && type === 'block_quote' && state.status === 'stories.new-query') {
                if (state.extractedValues.length > 0) pushSlot(state.currentState.query);

                state.status = 'stories.in-story';

            /*
                Get the action name
            */
            } else if (type === 'text' && state.status === 'stories.new-action') {
                state.currentState.action = literal;
                state.status = 'stories.in-story';
            }
        }

        event = walker.next();
    }

    endStory();

    return parsedSource;
}
