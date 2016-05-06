import Change from './Change';

class RotationChange extends Change {

    constructor(model, cell, rotation) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.rotation = rotation;
        this.previous = rotation;
    }

    digest() {

        this.position = this.previous;
        this.previous = this.model.rotationChanged(this.cell, this.previous);

        return this;
    }
}


// exports
// -------

export default RotationChange;
