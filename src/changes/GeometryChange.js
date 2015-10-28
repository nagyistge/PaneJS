import Change from './Change';

export default Change.extend({
    constructor: function GeometryChange(model, cell, geometry) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.geometry = geometry;
        that.previous = geometry;
    },

    digest: function () {

        var that = this;

        that.geometry = that.previous;
        that.previous = that.model.geometryForCellChanged(that.cell, that.previous);

        return that;
    }
});
