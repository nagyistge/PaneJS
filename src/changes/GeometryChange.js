import Change from './Change';


class GeometryChange extends Change {

    constructor(model, cell, geometry) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.geometry = geometry;
    }

    digest() {
        // that.model.geometryChanged(that.cell, that.geometry);

        return this;
    }
}


// exports
// -------

export default GeometryChange;
