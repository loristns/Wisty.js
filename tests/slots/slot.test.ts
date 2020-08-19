import { expect } from 'chai';
import { Slot } from '../../src/slots';

const actions = ['dependant', 'invDependant', 'other'];

describe('Slot', () => {
    describe('#getActionMask', () => {
        it('should mask dependant actions', () => {
            const slot = new Slot(['dependant'], ['invDependant']);
            slot.init(actions);

            expect(slot.getActionMask()).to.eql([false, true, true]);
        });

        it('should mask inversively dependant actions', () => {
            const slot = new Slot(['dependant'], ['invDependant']);
            slot.init(actions);
            slot.setValue(1);

            expect(slot.getActionMask()).to.eql([true, false, true]);
        });
    });

    it('should set, get and reset values', () => {
        const slot = new Slot(['dependant'], ['invDependant']);
        slot.init(actions);

        expect(slot.getValue()).to.equal(undefined);

        slot.setValue(1);
        expect(slot.getValue()).to.equal(1);

        slot.resetDialog();
        expect(slot.getValue()).to.equal(undefined);
    });
});
