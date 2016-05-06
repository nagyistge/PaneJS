import Change from './Change';

class RootChange extends Change {

    constructor(model, root) {

        super();

        this.model    = model;
        this.root     = root;
        this.previous = root;
    }

    digest() {

        this.root     = this.previous;
        this.previous = this.model.rootChanged(this.previous);

        return this;
    }
}


// exports
// -------

export default RootChange;
