import { expect } from 'chai';
import { KeyedVectors } from '../../src/tools';

const vectors = {
    hello: [0, 0, 0, 1],
    world: [0, 0, 1, 0],
    how: [0, 0, 1, 1],
    are: [0, 1, 0, 0],
    you: [0, 1, 1, 1],
    '▁fine': [1, 0, 0, 0]
};

describe('KeyedVectors', () => {
    const keyedVectors = new KeyedVectors({
        loaderFunction: async () => JSON.stringify(vectors),
        size: 4,
        tokenization: 'byte_pair'
    });
    keyedVectors.load();

    describe('#keys', () => {
        it('should return the correct array of keys', () => {
            expect(keyedVectors.keys()).to.eql(['hello', 'world', 'how', 'are', 'you', '▁fine']);
        });
    });

    describe('#get', () => {
        it('should return the correct embeddings when the key is in the vocabulary', () => {
            expect(keyedVectors.get('hello').arraySync()).to.eql([0, 0, 0, 1]);
            expect(keyedVectors.get('world').arraySync()).to.eql([0, 0, 1, 0]);
        });

        it('should return the most correct embeddings when the key is out of the vocabulary', () => {
            expect(keyedVectors.get('helo').arraySync()).to.eql([0, 0, 0, 1]);
            expect(keyedVectors.get('yoo').arraySync()).to.eql([0, 1, 1, 1]);
        });

        it('should return undefined if no similar tokens are found', () => {
            expect(keyedVectors.get('alphabet')).to.equal(undefined);
        });
    });

    describe('#tokenize', () => {
        it('should tokenize the string', () => {
            expect(keyedVectors.tokenize('helloworldhowareyou'))
                .to.eql(['hello', 'world', 'how', 'are', 'you']);
        });

        it('should use the unknownKey when the token does not exist', () => {
            expect(keyedVectors.tokenize('hello dude howareyou'))
                .to.eql(['hello', undefined, 'how', 'are', 'you']);
        });

        it('should handle spaces properly', () => {
            expect(keyedVectors.tokenize('hello world areyou fine'))
                .to.eql(['hello', 'world', 'are', 'you', '▁fine']);
        });
    });
});
