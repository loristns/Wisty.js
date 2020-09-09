import { Stories } from '../utils';
/**
 * Split a set stories into random train and test subsets.
 *
 * @param stories Some stories.
 * @param testSize The proportion of stories to put in the test subset.
 */
export declare function trainTestSplit(stories: Stories, testSize: number): {
    train: Stories;
    test: Stories;
};
