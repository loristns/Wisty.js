import { Story } from '../utils';

/**
 * Split a list of stories into random train and test subsets.
 *
 * @param stories A list of stories.
 * @param testSize The proportion of stories to put in the test subset.
 */
export function trainTestSplit(stories: Story[], testSize: number):
    {train: Story[], test: Story[]} {
    const test: Story[] = [];

    for (let i = 0; i / stories.length < testSize; i += 1) {
        test.push(...stories.splice(
            Math.floor(Math.random() * stories.length), 1
        ));
    }

    return { train: stories, test };
}
