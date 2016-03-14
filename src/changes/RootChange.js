import Change from './Change';


class RootChange extends Change {

    constructor(model, root) {

        super();

        let that = this;

        that.model    = model;
        that.root     = root;
        that.previous = root;
    }

    digest() {

        let that     = this;
        let model    = that.model;
        let previous = that.previous;

        that.root     = previous;
        that.previous = model.rootChanged(previous);

        return that;
    }
}


// exports
// -------

export default RootChange;
