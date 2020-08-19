import { expect } from 'chai';
import { parseStories } from '../../src/tools';

const story1 = `
## Hello World

> hello
- helloWorld
`;

const story2 = `
## Hello World

> hello
> world
- helloWorld
`;

const story3 = `
## Hello World

> hello
- helloWorld
- askHowAreYou

> fine
- userFine
`;

const story4 = `
## 1

> hello
- helloWorld
- askHowAreYou

## 2

> i'm fine
- userFine
`;

describe('parseStories', () => {
    it('should return a valid simple story', () => {
        const stories = parseStories(story1);

        expect(stories[0]).to.eql([
            { query: 'hello', action: 'helloWorld' },
            { query: '', action: 'LUS' }
        ]);
    });

    it('should return a valid story when user says 2 messages before an action happen', () => {
        const stories = parseStories(story2);

        expect(stories[0]).to.eql([
            { query: 'hello', action: 'LUS' },
            { query: 'world', action: 'helloWorld' },
            { query: '', action: 'LUS' }
        ]);
    });

    it('should return a valid multiturn story', () => {
        const stories = parseStories(story3);

        expect(stories[0]).to.eql([
            { query: 'hello', action: 'helloWorld' },
            { query: '', action: 'askHowAreYou' },
            { query: '', action: 'LUS' },
            { query: 'fine', action: 'userFine' },
            { query: '', action: 'LUS' }
        ]);
    });

    it('should handle multiple stories', () => {
        const stories = parseStories(story4);

        expect(stories).to.eql([
            [
                { query: 'hello', action: 'helloWorld' },
                { query: '', action: 'askHowAreYou' },
                { query: '', action: 'LUS' }
            ],
            [
                { query: "i'm fine", action: 'userFine' },
                { query: '', action: 'LUS' }
            ]
        ]);
    });
});
