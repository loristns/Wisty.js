import * as tf from '@tensorflow/tfjs';
import { Slot } from './slot';
import { fuzzyMatch } from '../utils';

type Categories = {[category: string]: string[]};
type CategoricalValue = { category: string, extract: string, score: number };

/**
 * Parameters for Categorical Slot constructor.
 */
interface CategoricalSlotArgs {
    /**
     * The name of the slot.
     */
    name: string;

    /**
     * An object with the name of the category as a key and an array of synonyms that belong to
     * the category as a value.
     */
    categories: Categories;

    /**
     * The list of actions that can be taken by the model only when the slot is defined.
     */
    dependantActions?: string[];

    /**
     * The list of actions that can be taken by the model only when the slot is undefined.
     */
    invDependantActions?: string[];

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
        name,
        categories,
        dependantActions = [],
        invDependantActions = [],
        threshold = 0.75
    }: CategoricalSlotArgs) {
        super(dependantActions, invDependantActions);

        this.categoryNames = Object.keys(categories);
        this.categories = categories;
        this.threshold = threshold;

        this.id = `${name}#Categorical`;
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
        const previousValue = this.getValue();
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

            // The best match is preferably a match of a different category with the highest score.
            if (match.extract !== undefined) {
                const currentUneqPrevious = category !== previousValue.category;
                const bestEqPrevious = bestValue.category === previousValue.category;
                const betterScore = match.score > bestValue.score;

                if (bestValue.category === undefined
                    || (currentUneqPrevious && betterScore)
                    || (bestEqPrevious && currentUneqPrevious)
                    || (bestEqPrevious && betterScore)
                ) {
                    bestValue = { category, ...match };
                }
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
