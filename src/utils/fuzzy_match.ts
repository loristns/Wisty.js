import { levenshteinDistance } from './levenshtein_distance';

type Match = { extract: string, score: number };

export function fuzzyMatch(text: string, substring: string): Match {
    let bestMatch: Match = { extract: undefined, score: 0 };

    for (let i = 0; i < text.length; i += 1) {
        const extract = text.substring(i, i + substring.length);

        const aMatch = {
            extract,
            score: 1 - levenshteinDistance(extract, substring)
        };

        if (aMatch.score === 1) {
            return aMatch;
        }

        if (aMatch.score > bestMatch.score) {
            bestMatch = aMatch;
        }
    }

    return bestMatch;
}
