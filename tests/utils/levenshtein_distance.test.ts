import { expect } from 'chai';
import { levenshteinDistance } from '../../src/utils';

describe('levenshteinDistance', () => {
    it('should properly count deletions', () => {
        expect(levenshteinDistance('aaa', 'aa')).to.equals(1 / 3);
    });

    it('should properly count insertions', () => {
        expect(levenshteinDistance('aaa', 'abaa')).to.equals(1 / 4);
    });

    it('should properly count substitutions', () => {
        expect(levenshteinDistance('aaa', 'aba')).to.equals(1 / 3);
    });
});
