import Change from './Change';

class PositionChange extends Change {

    constructor(model, cell, position) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.position = position;
        this.previous = position;
    }

    digest() {

        this.position = this.previous;
        this.previous = this.model.positionChanged(this.cell, this.previous);

        return this;
    }
}


// exports
// -------

export default PositionChange;
