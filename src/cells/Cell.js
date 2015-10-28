import {
    each,
    clone,
    indexOf,
    isNode,
    isFunction,
    isNullOrUndefined
} from '../common/utils';

import Base from '../lib/Base';

export default Base.extend({

    // 原型上的属性
    visible: true, // 默认可见
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

    // 获取连线连接的节点
    getTerminal: function (isSource) {
        return isSource ? this.source : this.target;
    },

    // 设置连线连接的节点
    setTerminal: function (node, isSource) {
        if (isSource) {
            this.source = node;
        } else {
            this.target = node;
        }

        return node;
    },

    // 将连线从节点移除
    removeFromTerminal: function (isSource) {

        var that = this;

        var node = that.getTerminal(isSource);

        if (node) {
            node.removeLink(that, isSource);
        }

        return that;
    },


    // children
    // --------

    getChildCount: function () {
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
    // -----

    getLinkCount: function () {
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

    removeLink: function (link, outgoing) {

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

    removeFromParent: function () {
        var that = this;
        var parent = that.parent;

        if (parent) {
            parent.removeChild(that);
        }

        return that;
    },

    cloneValue: function () {
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

    clone: function () {
        var that = this;
        var cloned = clone(that, that.transients);
        cloned.value = that.cloneValue();

        return cloned;
    }
});
