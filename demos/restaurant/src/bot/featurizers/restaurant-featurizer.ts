import * as tf from '@tensorflow/tfjs';
import * as wisty from 'wisty';

import { ProductSlot } from './product-slot';

/**
 * Featurizer ensuring that the restaurant point system is respected when it comes to ordering.
 */
export class RestaurantFeaturizer extends wisty.featurizers.Featurizer {
    readonly id = 'RestaurantFeaturizer';
    readonly size = 3;

    private starterSlot: ProductSlot;
    private mainSlot: ProductSlot;
    private dessertSlot: ProductSlot;
    private additionalPoints: number;

    constructor(starterSlot: ProductSlot, mainSlot: ProductSlot, dessertSlot: ProductSlot) {
        super();

        this.starterSlot = starterSlot;
        this.mainSlot = mainSlot;
        this.dessertSlot = dessertSlot;
    }

    remainingPoints(): number {
        return 6
            - this.starterSlot.getValue().orderedCost
            - this.mainSlot.getValue().orderedCost
            - this.dessertSlot.getValue().orderedCost
            + this.additionalPoints;
    }

    init(actions: any[]) {
        super.init(actions);
        this.resetDialog();
    }

    async handleQuery(): Promise<tf.Tensor1D> {
        // Encode if the user has ordered his starter, main course and dessert.
        return tf.tensor1d([
            this.starterSlot.getValue().orderedProduct !== undefined ? 1 : 0,
            this.mainSlot.getValue().orderedProduct !== undefined ? 1 : 0,
            this.dessertSlot.getValue().orderedProduct !== undefined ? 1 : 0,
        ]);
    }

    getActionMask(): boolean[] {
        const starter = this.starterSlot.getValue();
        const main = this.mainSlot.getValue();
        const dessert = this.dessertSlot.getValue();

        // Ordering something is only possible if we have enough points
        const mask = this.actions.map((action) => {
            switch (action) {
            case 'orderStarter':
                return starter.productCost <= this.remainingPoints() + starter.orderedCost;

            case 'orderMain':
                return main.productCost <= this.remainingPoints() + main.orderedCost;

            case 'orderDessert':
                return dessert.productCost <= this.remainingPoints() + dessert.orderedCost;

            case 'finalise':
                return starter.orderedProduct !== undefined
                    && main.orderedProduct !== undefined
                    && dessert.orderedProduct !== undefined;

            default:
                return true;
            }
        });

        // We can ask for more points if one of the product can't be ordered.
        mask[this.actions.indexOf('askMorePoints')] = !(
            mask[this.actions.indexOf('orderStarter')]
            && mask[this.actions.indexOf('orderMain')]
            && mask[this.actions.indexOf('orderDessert')]
        );

        return mask;
    }

    handleAction(action: any) {
        if (action === 'morePoints') {
            const totalCost = this.starterSlot.getValue().productCost
                            + this.mainSlot.getValue().productCost
                            + this.dessertSlot.getValue().productCost;

            this.additionalPoints = totalCost - 6;
        }
    }

    resetDialog() {
        this.additionalPoints = 0;
    }
}
