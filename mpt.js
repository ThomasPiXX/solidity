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

insert(word) {
    let currentNode = this.root;
    let branchNode = null;
    
    for (let i = 0; i < word.length; i++) {
        const key = word[i];

        if (!currentNode.children[key]) {
            currentNode.children[key] = new TrieNode(key);
        } else {
            if (branchNode) {
                const newKey = word[i + 1];
                if (!branchNode.children[newKey]) {
                    branchNode.children[newKey] = new TrieNode(newKey);
                }
                currentNode = branchNode.children[newKey];
                branchNode = null;
            }
        }
        
        currentNode = currentNode.children[key];
    }

    currentNode.isWord = true;
}

}

