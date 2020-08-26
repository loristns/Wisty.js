/**
 * Inspired by Trie.js
 * https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0
 */

export class TrieNode {
    readonly parent: TrieNode;
    readonly key: string;
    readonly childs: {[key: string]: TrieNode};
    ending: boolean;

    constructor(key: string, parent: TrieNode) {
        this.key = key;
        this.parent = parent;

        this.childs = {};
        this.ending = false;
    }

    addChild(child: TrieNode) {
        this.childs[child.key] = child;
    }

    setEnding() {
        this.ending = true;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode('', null);
    }

    add(word: string) {
        let actualNode = this.root;

        for (let i = 0; i < word.length; i += 1) {
            if (actualNode.childs[word[i]] === undefined) {
                actualNode.addChild(new TrieNode(word[i], actualNode));
            }

            actualNode = actualNode.childs[word[i]];

            if (i === word.length - 1) {
                actualNode.setEnding();
            }
        }
    }

    split(text: string, unknownKey: string = undefined, ignoreTokens: string[] = []): string[] {
        const splittedText = [];

        function pushUnknown(word: string) {
            if (splittedText[splittedText.length - 1] !== unknownKey
                && !ignoreTokens.includes(word)) {
                splittedText.push(unknownKey);
            }
        }

        let node = this.root;
        let word = '';

        for (let i = 0; i < text.length; i += 1) {
            const character = text[i];

            if (node.childs[character] !== undefined) {
                word += character;
                node = node.childs[character];
            } else {
                if (node.ending) splittedText.push(word);
                else pushUnknown(word);

                if (this.root.childs[character] !== undefined) {
                    word = character;
                    node = this.root.childs[character];
                } else {
                    pushUnknown(word);
                    word = '';
                    node = this.root;
                }
            }
        }

        if (node.ending) splittedText.push(word);
        else pushUnknown(word);

        return splittedText;
    }
}
