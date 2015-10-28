import Change from './Change';

export default Change.extend({
    constructor: function ValueChange(model, cell, value) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.value = value;
        that.previous = value;
    },

    digest: function () {

        var that = this;

        that.value = that.previous;
        that.previous = that.model.valueForCellChanged(that.cell, that.previous);

        return that;
    }
});
