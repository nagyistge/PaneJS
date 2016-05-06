import Change from './Change';


class VisibleChange extends Change {

    constructor(model, cell, visible) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.visible  = visible;
        this.previous = visible;
    }

    digest() {

        this.visible  = this.previous;
        this.previous = this.model.visibleChanged(this.cell, this.previous);

        return this;
    }
}


// exports
// -------

export default VisibleChange;

