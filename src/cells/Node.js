import { each, indexOf, isNullOrUndefined } from '../common/utils';
import Cell from './Cell';


export default Cell.extend({

    constructor: function Node(value, geometry, style) {

        var that = this;

        Node.superclass.constructor.call(that, value, geometry, style);

        that.isNode = true;
        that.connectAble = true;

        // lazy
        // that.parent = null;
        // that.children = [];
        // that.links = [];
    },


    // children
    // --------

    getChildrenCount: function () {
        var children = this.children;
        return children ? children.length : 0;
    },

    getChildIndex: function (child) {
        return indexOf(this.children || [], child);
    },

    getChildAt: function (index) {
        var children = this.children;
        return children ? children[index] : null;
    },

    eachChild: function (iterator, context) {

        var that = this;

        each(that.children || [], iterator, context);

        return that;
    },

    insertChild: function (child, index) {
        var that = this;

        if (child) {

            // fix index
            if (isNullOrUndefined(index)) {
                index = that.getChildrenCount();

                if (child.parent === that) {
                    index--;
                }
            }


            child.removeFromParent();
            child.parent = that;


            var children = that.children;

            if (children) {
                children.splice(index, 0, child);
            } else {
                children = that.children = [];
                children.push(child);
            }

        }

        return that;
    },

    removeChild: function (child) {
        return this.removeChildAt(this.getChildIndex(child));
    },

    removeChildAt: function (index) {
        var that = this;
        var child = null;
        var children = that.children;

        if (children && index >= 0) {
            child = that.getChildAt(index);

            if (child) {
                children.splice(index, 1);
                child.parent = null;
            }
        }

        return child;
    },


    // links
    // ------

    getLinksCount: function () {
        var links = this.links;
        return links ? links.length : 0;
    },

    getLinkIndex: function (link) {
        return indexOf(this.links || [], link);
    },

    getLinkAt: function (index) {
        var links = this.links;
        return links ? links[index] : null;
    },

    eachLink: function (iterator, context) {
        var that = this;

        each(that.links || [], iterator, context);

        return that;
    },

    insertLink: function (link, outgoing) {

        var that = this;

        if (link) {
            link.removeFromNode(outgoing);
            link.setNode(that, outgoing);

            var links = that.links;

            if (!links || that.getLinkIndex(link) < 0 || link.getNode(!outgoing) !== that) {
                if (!links) {
                    links = that.links = [];
                }

                links.push(link);
            }
        }

        return link;
    },

    removeLink: function (link, outgoing) {

        var that = this;
        var links = that.links;

        if (link) {

            if (links && link.getNode(!outgoing) !== that) {
                var index = that.getLinkIndex(link);

                if (index >= 0) {
                    links.splice(index, 1);
                }
            }

            link.setNode(null, outgoing);
        }

        return link;
    }
});

