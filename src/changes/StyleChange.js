import Change from './Change';

export default Change.extend({
    constructor: function StyleChange(model, cell, style) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.style = style;
        that.previous = style;
    },

    digest: function () {

        var that = this;

        that.style = that.previous;
        that.previous = that.model.styleChanged(that.cell, that.previous);

        return that;
    }
});
