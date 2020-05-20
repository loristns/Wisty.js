import { Story } from '../state';
/**
 * Split a list of stories into random train and test subsets.
 *
 * @param stories A list of stories.
 * @param testSize The proportion of stories to put in the test subset.
 */
export declare function trainTestSplit(stories: Story[], testSize: number): {
    train: Story[];
    test: Story[];
};
