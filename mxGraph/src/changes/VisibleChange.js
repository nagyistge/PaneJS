import Change from './Change';

export default Change.extend({
    constructor: function VisibleChange(model, cell, visible) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.visible = visible;
        that.previous = visible;
    },

    digest() {

        var that = this;

        that.visible = that.previous;
        that.previous = that.model.visibleChanged(that.cell, that.previous);

        return that;
    }
});
