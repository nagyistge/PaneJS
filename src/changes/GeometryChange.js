/**
 * Created by liangwensen on 1/20/16.
 */
import Change from './Change';

class GeometryChange extends Change {
    constructor(model, cell, geometry) {
        super();

        let that = this;
        that.model = model;
        that.cell = cell;
        that.geometry = geometry;
        return that;
    }

    digest() {
        let that = this;

        // that.model.geometryChanged(that.cell, that.geometry);

        return that;
    }
}

// exports
// -------

export default GeometryChange;
