import Change from './Change';


class GeometryChange extends Change {

    constructor(model, cell, geometry) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.geometry = geometry;
        this.previous = geometry;

    }

    digest() {

        this.geometry = this.previous;
        this.previous = this.model.geometryChanged(this.cell, this.previous);

        return this;
    }
}


// exports
// -------

export default GeometryChange;
