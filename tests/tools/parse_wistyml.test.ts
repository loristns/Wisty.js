import { expect } from 'chai';
import { parseWistyML } from '../../src/tools';

const document1 = `
## wisty.stories

### hello world
> Hello
- helloWorld
`;

const document2 = `
## wisty.slots

### name

- what’s up \`Alexander\` ?
- hey there, how are you \`Loye\` ?
`;

const document3 = `
# comment
comment

## wisty.stories

> comment
- comment

### hello world

**comment**

> Hello
- helloWorld

## Comment section

comment

## wisty.slots

- comment \`comment\`

### name

comment *comment*

- what’s up \`Alexander\` ?
`;

const document4 = `
## wisty.stories

### hello world
> Hello
- helloWorld

## wisty.slots

### name

- what’s up \`Alexander\` ?

## wisty.stories

### happy path

> i want something
- youHaveSomething

## wisty.slots

### name
- hey there, how are you \`Loye\` ?
`;

const document5 = `
## wisty.stories

### hello world

> Hello
- helloWorld

> what's up [Loye](name) ?
\`\`\`json
{
    "mood": "happy"
}
\`\`\`
- tellMood
`;

describe('parseWistyML', () => {
    it('should parse a document with just one story', () => {
        const doc = parseWistyML(document1);

        expect(doc).to.eql({
            stories: {
                'hello world': [
                    { query: 'Hello', action: 'helloWorld' },
                    { query: '', action: 'LUS' }
                ]
            },
            extractedValues: {}
        });
    });

    it('should parse a document with just one slot', () => {
        const doc = parseWistyML(document2);

        expect(doc).to.eql({
            stories: {},
            extractedValues: {
                name: [
                    {
                        sentence: 'what’s up Alexander ?',
                        extract: 'Alexander',
                        start: 10,
                        end: 18
                    },
                    {
                        sentence: 'hey there, how are you Loye ?',
                        extract: 'Loye',
                        start: 23,
                        end: 26
                    }
                ]
            }
        });
    });

    it('should ignore comments', () => {
        const doc = parseWistyML(document3);

        expect(doc).to.eql({
            stories: {
                'hello world': [
                    { query: 'Hello', action: 'helloWorld' },
                    { query: '', action: 'LUS' }
                ]
            },
            extractedValues: {
                name: [
                    {
                        sentence: 'what’s up Alexander ?',
                        extract: 'Alexander',
                        start: 10,
                        end: 18
                    }
                ]
            }
        });
    });

    it('should handle multiple sections', () => {
        const doc = parseWistyML(document4);

        expect(doc).to.eql({
            stories: {
                'hello world': [
                    { query: 'Hello', action: 'helloWorld' },
                    { query: '', action: 'LUS' }
                ],
                'happy path': [
                    { query: 'i want something', action: 'youHaveSomething' },
                    { query: '', action: 'LUS' }
                ]
            },
            extractedValues: {
                name: [
                    {
                        sentence: 'what’s up Alexander ?',
                        extract: 'Alexander',
                        start: 10,
                        end: 18
                    },
                    {
                        sentence: 'hey there, how are you Loye ?',
                        extract: 'Loye',
                        start: 23,
                        end: 26
                    }
                ]
            }
        });
    });

    it('should support slot inside stories and data', () => {
        const doc = parseWistyML(document5);

        expect(doc).to.eql({
            stories: {
                'hello world': [
                    { query: 'Hello', action: 'helloWorld' },
                    { query: '', action: 'LUS' },
                    {
                        query: 'what’s up Loye ?',
                        action: 'tellMood',
                        data: { mood: 'happy' }
                    },
                    { query: '', action: 'LUS' }
                ]
            },
            extractedValues: {
                name: [
                    {
                        sentence: 'what’s up Loye ?',
                        extract: 'Loye',
                        start: 10,
                        end: 13
                    }
                ]
            }
        });
    });
});
