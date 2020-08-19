import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { ActionFeaturizer } from '../../src/featurizers';

use(chaiAsPromised);

describe('ActionFeaturizer', () => {
    const actionFeaturizer = new ActionFeaturizer();
    actionFeaturizer.init(['a', 'b', 'LUS']);

    describe('#handleQuery', () => {
        it('should encode when there is no previous action', async () => {
            await expect(
                actionFeaturizer.handleQuery('')
                    .then(async (tensor) => (await tensor.array())[0])
            ).to.eventually.eql([0, 0, 0]);
        });

        it('should encode when there is a previous action', async () => {
            actionFeaturizer.handleAction('a');

            await expect(
                actionFeaturizer.handleQuery('')
                    .then(async (tensor) => (await tensor.array())[0])
            ).to.eventually.eql([1, 0, 0]);
        });
    });

    describe('#getActionMask', () => {
        it('should mask the previous action', () => {
            expect(actionFeaturizer.getActionMask()).to.eql([false, true, true]);
        });

        it('should mask LUS after user talks', async () => {
            actionFeaturizer.resetDialog();
            await actionFeaturizer.handleQuery('hey');

            expect(actionFeaturizer.getActionMask()).to.eql([true, true, false]);
        });
    });
});
