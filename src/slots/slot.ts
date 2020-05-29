import { Featurizer } from '../featurizers';

/**
 * An extension of featurizer that holds a value in its state.
 */
export abstract class Slot<Value> extends Featurizer {
    /**
     * The list of actions that can be taken by the model only when the slot is defined.
     */
    private dependantActions: String[];

    /**
     * The list of actions that can be taken by the model only when the slot is undefined.
     */
    private invDependantActions: String[];

    /**
     * Stores the value of the slot.
     */
    private value: Value;

    constructor(dependantActions: String[], invDependantActions: String[]) {
        super();
        this.dependantActions = dependantActions;
        this.invDependantActions = invDependantActions;
    }

    /**
     * Produce an action mask according to the dependant actions.
     */
    getActionMask(): boolean[] {
        return this.actions.map((action) => {
            const isDefined = this.value !== undefined;
            const isDependant = this.dependantActions.includes(action);
            const isInvDependant = this.invDependantActions.includes(action);

            return (!isDefined && (!isDependant || isInvDependant))
                || (isDefined && !isInvDependant);
        });
    }

    resetDialog(): void {
        this.value = undefined;
    }

    /**
     * Retrieves the value of the slot.
     */
    getValue(): Value {
        return this.value;
    }

    /**
     * Redefine a new value for the slot.
     */
    setValue(value: Value) {
        this.value = value;
    }
}
