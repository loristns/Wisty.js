/**
 * Inspired by Trie.js
 * https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0
 */
/**
 * A node holding a character and having a parent node and several children.
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
/**
 * A trie data structure.
 */
export declare class Trie {
    root: TrieNode;
    constructor();
    /**
     * Add a word to the trie.
     */
    add(word: string): void;
    /**
     * Split a text into a sequence of words based on the trie vocabulary.
     *
     * @param text A text to split into words
     * @param unknownKey The word used when the word is not found in the trie
     * @param ignoreTokens Words, not in the trie, to not replace by the unknown key.
     */
    split(text: string, unknownKey?: string, ignoreTokens?: string[]): string[];
}
