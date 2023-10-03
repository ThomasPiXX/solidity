class TrieNode {
    constructor(key) {
        this.root = null;
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}



class Trie {
    constructor(root) {
        this.root = new TrieNode(root)
    }
}
