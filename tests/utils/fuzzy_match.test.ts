import { expect } from 'chai';
import { fuzzyMatch } from '../../src/utils';

describe('fuzzyMatch', () => {
    it('should match exactly', () => {
        expect(fuzzyMatch('abba', 'bb')).to.eql({
            extract: 'bb',
            score: 1
        });
    });

    it('should not match', () => {
        expect(fuzzyMatch('abba', 'cc')).to.eql({
            extract: undefined,
            score: 0
        });
    });

    it('should partly match', () => {
        expect(fuzzyMatch('abba', 'bc')).to.eql({
            extract: 'bb',
            score: 0.5
        });
    });
});
