class Tree {
    constructor() {
        this.root = null;
    }

    hasNode(number) {
        let current = this.root;

        while (current !== null) {
            if (current.data === number) {
                return true;
            } else if (current.data > number) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    addNode(newNode) {
        if (this.root === null) {
            this.root = newNode;
        } else {
            let current = this.root;
            while (current !== null) {
                if (newNode.data > current.data) {
                    if (current.right === null) {
                        current.right = newNode;
                        break;
                    }
                    current = current.right;
                } else {
                    if (current.left === null) {
                        current.left = newNode;
                        break;
                    }
                    current = current.left;
                }
            }
        }
    }
}

module.exports = Tree;
