import Change from './Change';


class GeometryChange extends Change {

    constructor(model, cell, geometry) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.geometry = geometry;
    }

    digest() {

        this.model.geometryChanged(this.cell, this.geometry);

        return this;
    }
}


// exports
// -------

export default GeometryChange;
