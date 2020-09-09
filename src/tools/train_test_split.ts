import { Stories } from '../utils';

/**
 * Split a set stories into random train and test subsets.
 *
 * @param stories Some stories.
 * @param testSize The proportion of stories to put in the test subset.
 */
export function trainTestSplit(stories: Stories, testSize: number):
    {train: Stories, test: Stories} {
    const trainEntries = Object.entries(stories);
    const testEntries = [];

    for (let i = 0; i / trainEntries.length < testSize; i += 1) {
        testEntries.push(...trainEntries.splice(
            Math.floor(Math.random() * trainEntries.length), 1
        ));
    }

    return {
        train: Object.fromEntries(trainEntries),
        test: Object.fromEntries(testEntries)
    };
}
