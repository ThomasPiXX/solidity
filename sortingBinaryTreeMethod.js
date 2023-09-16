

    sorting(number) {
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