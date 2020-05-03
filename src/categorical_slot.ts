import * as tf from '@tensorflow/tfjs';
import { Featurizer } from './featurizer';
import { fuzzyMatch } from './utils/fuzzy_match';
import { hashcode } from './utils/hashcode';

type Categories = {[category: string]: string[]};
type Value = { category: string, extract: string, score: number };

export class CategoricalSlot extends Featurizer {
    readonly id: string;
    readonly size: number;

    private categoryNames: string[];
    private categories: Categories;

    private dependantActions: any[];
    private inverselyDependantActions: any[];

    private threshold: number;
    private value: Value;

    constructor(categories: Categories, dependantActions: any[] = [],
        inverselyDependantActions: any[] = [], threshold: number = 0.75) {
        super();

        this.categoryNames = Object.keys(categories);
        this.categories = categories;

        this.id = `Categorical Slot (${hashcode(JSON.stringify(this.categoryNames))})`;

        this.dependantActions = dependantActions;
        this.inverselyDependantActions = inverselyDependantActions;

        this.threshold = threshold;

        this.size = 2 * this.categoryNames.length;
    }

    async init() {
        this.resetDialog();
    }

    private featurizeValue(value: Value): tf.Tensor1D {
        const categoryNames = Object.keys(this.categories);

        return <tf.Tensor1D> tf.oneHot(
            categoryNames.indexOf(value.category),
            categoryNames.length
        );
    }

    async handleQuery(query: string): Promise<tf.Tensor1D> {
        let bestValue: Value = { category: undefined, extract: undefined, score: 0 };

        Object.entries(this.categories).forEach(([category, keywords]) => {
            // Find the best match of one category.
            const match = keywords
                .map((keyword) => fuzzyMatch(query.toLowerCase(), keyword.toLowerCase()))
                .filter((m) => m.score >= this.threshold)
                .reduce(
                    (hm, m) => (hm.score > m.score ? hm : m),
                    { extract: undefined, score: 0 }
                );

            // If this match is the best of every categories.
            if (match.score > bestValue.score) {
                bestValue = { category, ...match };
            }
        });

        const features = tf.tidy(() => (
            tf.concat([
                this.featurizeValue(bestValue),
                this.featurizeValue(this.value)
            ])
        ));

        if (bestValue.category !== undefined) {
            this.value = bestValue;
        }

        return features;
    }

    getActionMask(): boolean[] {
        return this.actions.map((action) => {
            const u = this.value.extract === undefined;
            const d = this.dependantActions.includes(action);
            const i = this.inverselyDependantActions.includes(action);

            return (u && (i || !d)) || (!u && !i);
        });
    }

    resetDialog() {
        this.value = { category: undefined, extract: undefined, score: 0 };
    }

    getValue(): Value {
        return this.value;
    }
}
