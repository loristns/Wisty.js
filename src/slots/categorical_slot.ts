import * as tf from '@tensorflow/tfjs';
import { Slot } from './slot';
import { fuzzyMatch, hashcode } from '../utils';

type Categories = {[category: string]: string[]};
type CategoricalValue = { category: string, extract: string, score: number };

/**
 * Parameters for Categorical Slot constructor.
 */
interface CategoricalSlotArgs {
    /**
     * An object with the name of the category as a key and an array of synonyms that belong to
     * the category as a value.
     */
    categories: Categories;

    /**
     * The list of actions that can be taken by the model only when the slot is defined.
     */
    dependantActions?: String[];

    /**
     * The list of actions that can be taken by the model only when the slot is undefined.
     */
    invDependantActions?: String[];

    /**
     * The minimum similarity to get selected as a value. (based on Leveinshtein Distance)
     */
    threshold?: number;
}

/**
 * A slot that stores a categorical value extracted using fuzzy string matching.
 */
export class CategoricalSlot extends Slot<CategoricalValue> {
    readonly id: string;
    readonly size: number;

    private categoryNames: string[];
    private categories: Categories;

    private threshold: number;

    constructor({
        categories,
        dependantActions = [],
        invDependantActions = [],
        threshold = 0.75
    }: CategoricalSlotArgs) {
        super(dependantActions, invDependantActions);

        this.categoryNames = Object.keys(categories);
        this.categories = categories;
        this.threshold = threshold;

        this.id = `Categorical Slot #${hashcode(JSON.stringify(this.categoryNames))}`;
        this.size = 2 * this.categoryNames.length;
    }

    async init(actions: any[]) {
        await super.init(actions);
        this.resetDialog();
    }

    private oneHotValue(value: CategoricalValue): tf.Tensor1D {
        const categoryNames = Object.keys(this.categories);

        return <tf.Tensor1D> tf.oneHot(
            categoryNames.indexOf(value.category),
            categoryNames.length
        );
    }

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        let bestValue: CategoricalValue = { category: undefined, extract: undefined, score: 0 };

        // For each category...
        Object.entries(this.categories).forEach(([category, keywords]) => {
            // Find the best match of the category.
            const match = keywords
                .map((keyword) => fuzzyMatch(query.toLowerCase(), keyword.toLowerCase()))

                .filter((m) => m.score >= this.threshold)

                .reduce(
                    (hm, m) => (hm.score > m.score ? hm : m),
                    { extract: undefined, score: 0 }
                );

            // Check if this match is the best of every categories.
            if (match.score > bestValue.score) {
                bestValue = { category, ...match };
            }
        });

        const features = tf.tidy(() => (
            tf.concat([
                this.oneHotValue(bestValue),
                this.oneHotValue(this.getValue())
            ])
        ));

        if (bestValue.category !== undefined) {
            this.setValue(bestValue);
        }

        return features;
    }

    getValue(): CategoricalValue {
        if (super.getValue() === undefined) {
            return { category: undefined, extract: undefined, score: 0 };
        }

        return super.getValue();
    }
}
