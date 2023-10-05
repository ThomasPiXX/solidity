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
        this.words = [];
    }

    contains(element) {
         let containsElement = false;

         this.words.forEach(word => {
             if(word === element) {
                 containsElement = true;
             }
         });
         return containsElement;
    }

    insert(word) {
        let currentNode = this.root;
        this.words.push(word);
        
        for (let i = 0; i < word.length; i++) {
            const key = word[i];
            

            if (!currentNode.children[key]) {
                currentNode.children[key] = new TrieNode(key);
            }
            currentNode = currentNode.children[key];
        }

        currentNode.isWord = true;
        
    }

}   