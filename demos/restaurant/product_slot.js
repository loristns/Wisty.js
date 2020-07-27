/* eslint-disable */

/**
 * A categorical slot where users can order, remove, refuse or be suggested a product.
 */
class ProductSlot extends wisty.slots.CategoricalSlot {
    constructor({
        name,
        categories,
        suggestAction,
        orderAction,
        refuseAction,
        removeAction,
        threshold = 0.75
    }) {
        super({
            name,
            categories,
            // An order can only be done if the user has precised the product.
            dependantActions: [orderAction],
            threshold
        });

        this.size += 1;

        this.suggestAction = suggestAction;
        this.orderAction = orderAction;
        this.refuseAction = refuseAction;
        this.removeAction = removeAction;

        this.orderedProduct = undefined;
    }

    async handleQuery(query) {
        const categoricalFeatures = await super.handleQuery(query);

        const features = tf.tidy(() => (
            tf.concat([
                categoricalFeatures,
                tf.tensor([this.orderedProduct !== undefined ? 1 : 0])
            ])
        ));

        tf.dispose(categoricalFeatures);
        return features;
    }

    getActionMask() {
        let mask = super.getActionMask();

        // We can suggest product only if the user has not choosed one (and not refused).
        mask[this.actions.indexOf(this.suggestAction)] = this.orderedProduct === undefined;

        // We can remove a product only if something was ordered in the first place.
        mask[this.actions.indexOf(this.removeAction)] = ![undefined, null].includes(this.orderedProduct);

        return mask;
    }

    handleAction(action) {
        // If the user order something
        if (action === this.orderAction) {
            this.orderedProduct = this.getValue().category;

        // If the user wants to cancel its order (but may want something else)
        } else if (action === this.removeAction) {
            this.orderedProduct = undefined;
        
        // If the user does not want these products
        } else if (action === this.refuseAction) {
            this.orderedProduct = null;
        }
    }

    resetDialog() {
        super.resetDialog();
        this.orderedProduct = undefined;
    }

    getValue() {
        return { orderedProduct: this.orderedProduct, ...super.getValue() };
    }
}