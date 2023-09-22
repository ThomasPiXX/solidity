class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        // Ensure that we have the root
        while (this.leaves.length > 1) {
            // Concat the layer in an array to regroup them
            const combinedLayer = [];
            // Pairing the leaf
            for (let i = 0; i < this.leaves.length; i += 2) {
                // Allocating odd node to right and no odd to left
                const left = this.leaves[i];
                const right = this.leaves[i + 1];

                if (right) {
                    // If there is a right node, that means there is an odd number of nodes following the implementation
                    const result = this.concat(left, right);
                    combinedLayer.push(result);
                } else {
                    // Else there is only one node
                    combinedLayer.push(left);
                }
            }
            this.leaves = combinedLayer;
        }
        return this.leaves[0];
    }


    getProof(index) {
    //make sure that the index isnt a negative value or bigger then the length of the array 
    //array maximum value should be array.length - 1 
    if (index < 0 || index >= this.leaves.length) {
        throw new Error('Invalid index');
    }
    const proof = [];
    let currentIndex = index;
    

    //iterates through the layers of the tree, from the leaf layer
    //math log 2 example , Math.log2(8) = 3
    for (let i = 0; i < Math.log2(this.leaves.length); i++) {
        // currentIndex % 2 if === 1 === left, else === 0 === right
        
        const isLeft = currentIndex % 2 === 1;
        // finding the location of the sibling leaf 
        const siblingIndex = isLeft ? currentIndex + 1 : currentIndex - 1;
        // get the sibling hash and assign it 
        const siblingHash = this.leaves[siblingIndex];
        // pushing the leaf to the proof array
        proof.push({ left: isLeft, data: siblingHash });
        // getting on the higher layer (node of the leaf until root is reach)
        currentIndex = Math.floor(currentIndex / 2);
    }
    return proof;
}

}

module.exports = MerkleTree;
