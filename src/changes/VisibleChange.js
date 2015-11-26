import Change from './Change';

export default Change.extend({
    constructor: function VisibleChange(graph, cell, visible) {

        var that = this;

        that.graph = graph;
        that.cell = cell;
        that.visible = visible;
        that.previous = visible;
    },

    digest() {

        var that = this;

        that.visible = that.previous;
        that.previous = that.graph.visibleChanged(that.cell, that.previous);

        return that;
    }
});
