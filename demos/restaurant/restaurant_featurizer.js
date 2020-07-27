/* eslint-disable */

/**
 * A featurizer managing the point system of the restaurant.
 */
class RestaurantFeaturizer extends wisty.featurizers.Featurizer {
    constructor(starterSlot, mainSlot, dessertSlot) {
        super();
        this.id = 'RestaurantFeaturizer';

        this.starterSlot = starterSlot;
        this.mainSlot = mainSlot;
        this.dessertSlot = dessertSlot;
    }

    // Custom utility methods

    costOf(product) {
        switch (product) {
            case 'salad':
            case 'boiled-eggs':
            case 'muffin':
                return 1;

            case 'quiche':
            case 'sundae':
                return 2;

            case 'omelet':
                return 4;

            case 'pizza':
                return 5;

            default:
                return 0;
        }
    }

    countCost(action, cost) {
        if (action.startsWith('order')) {
            if (action.endsWith('Starter')) this.starterCost = cost;

            else if (action.endsWith('Main')) this.mainCost = cost;

            else if (action.endsWith('Dessert')) this.dessertCost = cost;

        } else if (action.startsWith('remove')) {
            if (action.endsWith('Starter')) this.starterCost = 0;

            else if (action.endsWith('Main')) this.mainCost = 0;

            else if (action.endsWith('Dessert')) this.dessertCost = 0;
        }
    }

    remainingPoints() {
        return 6 - (this.starterCost + this.mainCost + this.dessertCost) + this.additionalPoints;
    }

    // Control methods

    get size() {
        return 3;
    }

    init(actions) {
        super.init(actions);
        this.resetDialog();
    }

    async handleQuery(query) {
        return tf.tensor1d([
            this.starterCost > 0 ? 1 : 0,
            this.mainCost > 0 ? 1 : 0,
            this.dessertCost > 0 ? 1 : 0,
        ]);
    }

    getActionMask() {
        let mask = super.getActionMask();
        mask[this.actions.indexOf('askMorePoints')] = false;

        // Block the ordering of a product if the slot contains a too expensive item

        if (this.costOf(this.starterSlot.getValue().category) > this.remainingPoints() + this.starterCost) {
            mask[this.actions.indexOf('orderStarter')] = false;
            mask[this.actions.indexOf('askMorePoints')] = true;
        }

        if (this.costOf(this.mainSlot.getValue().category) > this.remainingPoints() + this.mainCost) {
            mask[this.actions.indexOf('orderMain')] = false;
            mask[this.actions.indexOf('askMorePoints')] = true;
        }

        if (this.costOf(this.dessertSlot.getValue().category) > this.remainingPoints() + this.dessertCost) {
            mask[this.actions.indexOf('orderDessert')] = false;
            mask[this.actions.indexOf('askMorePoints')] = true;
        }

        // Block the finalisation of the order if a product has not been choosed

        mask[this.actions.indexOf('finalise')] = starterSlot.getValue().orderedProduct !== undefined 
                                              && mainSlot.getValue().orderedProduct !== undefined
                                              && dessertSlot.getValue().orderedProduct !== undefined;

        // Block the ordering of additional points if the bot has not asked before

        mask[this.actions.indexOf('morePoints')] = this.previousAction === 'askMorePoints';

        return mask;
    }

    handleAction(action) {
        // Order specific code
        let slot;

        if (action.endsWith('Starter')) {
            slot = this.starterSlot;
        } else if (action.endsWith('Main')) {
            slot = this.mainSlot;
        } else if (action.endsWith('Dessert')) {
            slot = this.dessertSlot;
        }

        if (slot !== undefined) {
            this.countCost(action, this.costOf(slot.getValue().category));
        }

        // Other actions
        if (action === 'morePoints') {
            const orderedCost = this.costOf(this.starterSlot.getValue().category)
                              + this.costOf(this.mainSlot.getValue().category)
                              + this.costOf(this.dessertSlot.getValue().category);

            this.additionalPoints += orderedCost - (6 + this.additionalPoints);
        } 
        
        if (action !== 'LUS') {
            this.previousAction = action;
        }
    }

    resetDialog() {
        this.starterCost = 0;
        this.mainCost = 0;
        this.dessertCost = 0;
        this.additionalPoints = 0;
        this.previousAction = undefined;
    }
}