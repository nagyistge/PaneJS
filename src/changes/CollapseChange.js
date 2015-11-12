import Change from './Change';

export default Change.extend({
    constructor: function CollapseChange(model, cell, collapsed) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.collapsed = collapsed;
        that.previous = collapsed;
    },

    digest() {

        var that = this;

        that.collapsed = that.previous;
        that.previous = that.model.collapseChanged(that.cell, that.previous);

        return that;
    }
});
