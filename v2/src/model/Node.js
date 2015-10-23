define([
    '../common/utils',
    './Cell'
], function (
    utils,
    Cell
) {
    'use strict';

    var indexOf = utils.indexOf;

    return Cell.extend({
        constructor: function Node(value, geometry, style) {

            var that = this;

            Node.super.constructor.call(that, value, geometry, style);

            that.isNode = true;
            that.connectAble = true;
            that.links = [];
        },

        indexOfLink: function (link) {
            return indexOf(this.links, link);
        },

        linkAt: function (index) {
            return this.links[index];
        },

        insertLink: function (link, outgoing) {

            var that = this;

            if (link) {
                link.removeFromNode(outgoing);
                link.setNode(that, outgoing);

                // FIXME：自己链自己
                if (link.getNode(!outgoing) !== that || that.indexOfLink(link) < 0) {
                    that.links.push(link);
                }
            }

            return link;
        },

        removeLink: function (link, outgoing) {

            var that = this;

            if (link) {
                if (link.getNode(!outgoing) !== that) {
                    var index = that.indexOfLink(link);

                    if (index >= 0) {
                        that.links.splice(index, 1);
                    }
                }

                link.setNode(null, outgoing);
            }

            return link;
        },

        cloneValue: function () {},

        clone: function () {}
    });
});

