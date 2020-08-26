/**
 * Inspired by Trie.js
 * https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0
 */
export declare class TrieNode {
    readonly parent: TrieNode;
    readonly key: string;
    readonly childs: {
        [key: string]: TrieNode;
    };
    ending: boolean;
    constructor(key: string, parent: TrieNode);
    addChild(child: TrieNode): void;
    setEnding(): void;
}
export declare class Trie {
    root: TrieNode;
    constructor();
    add(word: string): void;
    split(text: string, unknownKey?: string, ignoreTokens?: string[]): string[];
}
