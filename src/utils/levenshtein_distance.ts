/**
 * Compute the Levenshtein distance between two strings using the Wagner-Fisher algorithm.
 * (as described at https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm)
 */
export function levenshteinDistance(s1: string, s2: string): number {
    const d = Array.from(
        Array(s1.length + 1),
        () => new Array(s2.length + 1).fill(0)
    );

    for (let i = 1; i <= s1.length; i += 1) {
        d[i][0] = i;
    }

    for (let j = 1; j <= s2.length; j += 1) {
        d[0][j] = j;
    }

    for (let j = 0; j < s2.length; j += 1) {
        for (let i = 0; i < s1.length; i += 1) {
            const substitutionCost = (s1[i] !== s2[j]) ? 1 : 0;

            d[i + 1][j + 1] = Math.min(
                d[i][j + 1] + 1,
                d[i + 1][j] + 1,
                d[i][j] + substitutionCost
            );
        }
    }

    return d[s1.length][s2.length] / Math.max(s1.length, s2.length, 1);
}
