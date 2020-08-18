import { expect } from 'chai';
import { parseStories } from '../../src/tools';

describe('parseStories', () => {
    it('should return a valid simple story', () => {
        const stories = parseStories('## Hello World\n> hello\n- helloWorld');

        expect(stories[0]).to.eql([
            { query: 'hello', action: 'helloWorld' },
            { query: '', action: 'LUS' }
        ]);
    });
});
