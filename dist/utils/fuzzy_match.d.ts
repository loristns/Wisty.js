declare type Match = {
    extract: string;
    score: number;
};
export declare function fuzzyMatch(text: string, substring: string): Match;
export {};
