import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { CategoricalSlot } from '../../src/slots';

use(chaiAsPromised);

describe('CategoricalSlot', () => {
    const slot = new CategoricalSlot({
        name: 'test',
        categories: { ab: ['ab'], cd: ['cd'] }
    });

    slot.init(['action']);

    describe('#handleQuery', () => {
        it('should handle a query without searched categories', async () => {
            await expect(
                slot.handleQuery('test')
                    .then((tensor) => tensor.array())
            ).to.eventually.eql([0, 0, 0, 0]);
        });

        it('should handle query with a searched category', async () => {
            await expect(
                slot.handleQuery('alphabet starts with ab')
                    .then((tensor) => tensor.array())
            ).to.eventually.eql([1, 0, 0, 0]);
        });

        it('should mark previous extracted category as "old" when a new query comes in', async () => {
            await expect(
                slot.handleQuery('test')
                    .then((tensor) => tensor.array())
            ).to.eventually.eql([0, 0, 1, 0]);
        });
    });

    describe('#getValue', () => {
        it('should return extracted value', () => {
            expect(slot.getValue()).to.eql({
                category: 'ab',
                extract: 'ab',
                score: 1
            });
        });
    });

    describe('#setValue', () => {
        it('should encode programatically set value', async () => {
            slot.setValue({ category: 'cd', extract: undefined, score: 1 });

            expect(slot.getValue()).to.eql({ category: 'cd', extract: undefined, score: 1 });

            await expect(
                slot.handleQuery('test')
                    .then((tensor) => tensor.array())
            ).to.eventually.eql([0, 0, 0, 1]);
        });
    });

    describe('#resetDialog', () => {
        it('should reset the values', async () => {
            slot.resetDialog();

            expect(slot.getValue()).to.eql({ category: undefined, extract: undefined, score: 0 });

            await expect(
                slot.handleQuery('test')
                    .then((tensor) => tensor.array())
            ).to.eventually.eql([0, 0, 0, 0]);
        });
    });
});
