import Cell from './Cell';

export default Cell.extend({

    transients: ['id', 'value', 'parent', 'source', 'target'],

    isLink:true,

    constructor: function Link(value, geometry, style) {

        var that = this;

        Link.superclass.constructor.call(that, value, geometry, style);

        // lazy
        // that.source = null;
        // that.target = null;
    },

    getNode: function (isSource) {
        return isSource ? this.source : this.target;
    },

    setNode: function (node, isSource) {
        if (isSource) {
            this.source = node;
        }
        else {
            this.target = node;
        }

        return node;
    },

    removeFromNode: function (isSource) {

        var that = this;

        var node = that.getNode(isSource);

        node && node.removeLink(that, isSource);

        return that;
    }
});


