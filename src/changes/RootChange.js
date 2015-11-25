import Change from './Change';

export default Change.extend({

    constructor: function RootChange(graph, root) {

        var that = this;

        that.graph = graph;
        that.root = root;
        that.previous = root;
    },

    digest() {

        var that = this;
        var graph = that.graph;
        var previous = that.previous;

        that.root = previous;
        that.previous = graph.rootChanged(previous);

        return that;
    }
});
