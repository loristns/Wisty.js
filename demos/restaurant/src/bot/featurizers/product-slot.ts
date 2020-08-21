import * as tf from '@tensorflow/tfjs';
import * as wisty from 'wisty';

/**
 * A categorical slot where user can be suggested, order, remove or refuse a product.
 */
export class ProductSlot extends wisty.slots.CategoricalSlot {
    readonly size: number;

    private suggestAction: string;
    private orderAction: string;
    private refuseAction: string;
    private removeAction: string;

    private orderedProduct: string;

    private costs: { [category: string]: number };
    private productCost: number;
    private orderedCost: number;

    constructor(
        name: string,
        categories: { [category: string]: string[] },
        costs: { [category: string]: number },
        suggestAction: string,
        orderAction: string,
        refuseAction: string,
        removeAction: string,
        threshold: number = 0.75
    ) {
        // The order action can only be executed if the user has named a product.
        super({
            name,
            categories,
            dependantActions: [orderAction],
            threshold
        });

        // TODO: Fix size heritage
        this.size += 1;

        this.costs = costs;

        this.suggestAction = suggestAction;
        this.orderAction = orderAction;
        this.refuseAction = refuseAction;
        this.removeAction = removeAction;
    }

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        // Get the HCN features.
        const superFeature = await super.handleQuery(query);

        const features = tf.tidy(() => (
            tf.concat([
                superFeature,
                tf.tensor([this.orderedProduct !== undefined ? 1 : 0])
            ])
        ));

        // Update productCost
        const product = super.getValue().category;

        this.productCost = product != null ? this.costs[product] : 0;

        return features;
    }

    getActionMask(): boolean[] {
        const mask = super.getActionMask();

        this.actions.forEach((action, idx) => {
            switch (action) {
            // Only suggest action when the user has not choosed one or refused it.
            case this.suggestAction:
                mask[idx] = this.orderedProduct === undefined;
                break;

            // Only remove a product when the user has ordered one before.
            case this.removeAction:
                mask[idx] = this.orderedProduct != null;
                break;

            default:
                break;
            }
        });

        return mask;
    }

    handleAction(action: any) {
        switch (action) {
        case this.orderAction:
            this.orderedProduct = super.getValue().category;
            this.orderedCost = this.productCost;
            break;

        case this.removeAction:
            this.orderedProduct = undefined;
            this.orderedCost = 0;
            break;

        case this.refuseAction:
            this.orderedProduct = null;
            this.orderedCost = 0;
            break;

        default:
            break;
        }
    }

    resetDialog() {
        super.resetDialog();

        this.orderedProduct = undefined;
        this.orderedCost = 0;
        this.productCost = 0;
    }

    getValue() {
        return {
            ...super.getValue(),
            productCost: this.productCost,
            orderedProduct: this.orderedProduct,
            orderedCost: this.orderedCost
        };
    }
}
