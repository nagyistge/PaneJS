import Change from './Change';


class RootChange extends Change {

    constructor(model, root) {

        super();

        this.model    = model;
        this.root     = root;
        this.previous = root;
    }

    digest() {

        let model    = this.model;
        let previous = this.previous;

        this.root     = previous;
        this.previous = model.rootChanged(previous);

        return this;
    }
}


// exports
// -------

export default RootChange;
