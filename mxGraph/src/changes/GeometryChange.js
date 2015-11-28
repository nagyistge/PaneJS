import Change from './Change';

export default Change.extend({
    constructor: function GeometryChange(model, cell, geometry) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.geometry = geometry;
        that.previous = geometry;
    },

    digest() {

        var that = this;

        that.geometry = that.previous;
        that.previous = that.model.geometryChanged(that.cell, that.previous);

        return that;
    }
});
