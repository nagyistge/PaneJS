define([
    '../common/utils',
    './Cell'
], function (
    utils,
    Cell
) {
    'use strict';

    return Cell.extend({
        constructor: function Link(value, geometry, style) {

            var that = this;

            Link.super.constructor.call(that, value, geometry, style);

            that.isLink = true;
            that.source = null;
            that.target = null;
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
});


