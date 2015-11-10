import {
    each,
    filter,
    indexOf,
    clone,
    isNode,
    isFunction,
    isNullOrUndefined
} from '../common/utils';

import Base from '../lib/Base';

export default Base.extend({

    // props on prototype
    visible: true,
    transients: ['id', 'value', 'parent', 'source', 'target', 'children', 'links'],

    constructor: function Cell(id, value, geometry, style) {

        var that = this;

        that.id = id;
        that.value = value;
        that.style = style;
        that.geometry = geometry;

        // props
        // -----
        // that.parent = null;
        // that.source = null;
        // that.target = null;
        // that.children = [];
        // that.links = [];
    },


    // link
    // ----

    getTerminal(isSource) {
        return isSource ? this.source : this.target;
    },

    setTerminal(node, isSource) {
        if (isSource) {
            this.source = node;
        } else {
            this.target = node;
        }

        return node;
    },

    // remove link from node
    removeFromTerminal(isSource) {

        var that = this;

        var node = that.getTerminal(isSource);

        if (node) {
            node.removeLink(that, isSource);
        }

        return that;
    },


    // children
    // --------

    getChildCount() {
        var children = this.children;
        return children ? children.length : 0;
    },

    getChildIndex(child) {
        return indexOf(this.children || [], child);
    },

    getChildAt(index) {
        var children = this.children;
        return children ? children[index] : null;
    },

    eachChild(iterator, context) {

        var that = this;
        var children = that.children;

        children && each(children, iterator, context);

        return that;
    },

    filterChild(iterator, context) {
        var children = this.children;
        return children ? filter(children, iterator, context) : [];
    },

    insertChild(child, index) {
        var that = this;

        if (child) {

            // fix index
            if (isNullOrUndefined(index)) {
                index = that.getChildCount();

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

    removeChild(child) {
        return this.removeChildAt(this.getChildIndex(child));
    },

    removeChildAt(index) {
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


    // node
    // -----

    getLinkCount() {
        var links = this.links;
        return links ? links.length : 0;
    },

    getLinkIndex(link) {
        return indexOf(this.links || [], link);
    },

    getLinkAt(index) {
        var links = this.links;
        return links ? links[index] : null;
    },

    eachLink(iterator, context) {

        var that = this;
        var links = that.links;

        links && each(links, iterator, context);

        return that;
    },

    filterLink(iterator, context) {
        var links = this.links;
        return links ? filter(links, iterator, context) : [];
    },

    insertLink(link, outgoing) {

        var that = this;

        if (link) {
            link.removeFromTerminal(outgoing);
            link.setTerminal(that, outgoing);

            var links = that.links;

            // 连线的起点和终点是同一个节点时，说明连线已经和节点关联，则不需要添加
            if (!links || that.getLinkIndex(link) < 0 || link.getNode(!outgoing) !== that) {
                if (!links) {
                    links = that.links = [];
                }

                links.push(link);
            }
        }

        return link;
    },

    removeLink(link, outgoing) {

        var that = this;
        var links = that.links;

        if (link) {

            // 连线的起点和终点是同一个节点时，不需要移除
            if (links && link.getTerminal(!outgoing) !== that) {
                var index = that.getLinkIndex(link);

                if (index >= 0) {
                    links.splice(index, 1);
                }
            }

            link.setTerminal(null, outgoing);
        }

        return link;
    },


    // common
    // ------

    removeFromParent() {
        var that = this;
        var parent = that.parent;

        if (parent) {
            parent.removeChild(that);
        }

        return that;
    },

    cloneValue() {
        var value = this.value;

        if (value) {
            if (value.clone && isFunction(value.clone)) {
                return value.clone();
            }

            if (isNode(value)) {
                return value.cloneNode(true);
            }
        }

        return value;
    },

    clone() {
        var that = this;
        var cloned = clone(that, that.transients);
        cloned.value = that.cloneValue();

        return cloned;
    }
});
