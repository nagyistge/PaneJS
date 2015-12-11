import {
    merge,
    filter,
    forIn,
    forEach,
    indexOf,
    isNode,
    isObject,
    isFunction,
    isNullOrUndefined
} from '../common/utils';


class Cell {

    static configure(options) {

        var that = this;

        if (options) {

            forIn(options, function (val, key) {

                if (key === 'defaults') {
                    val = merge({}, that.defaults, val);
                }

                that[key] = val;
            });
        }
    }

    get markup() {
        return this.constructor.markup;
    }

    constructor(options) {

        var that = this;
        var raw  = merge({}, that.constructor.defaults, options);

        that.raw      = raw;
        that.data     = raw.data;
        that.attrs    = raw.attrs;
        that.visible  = raw.visible !== false;
        that.size     = raw.size;
        that.position = raw.position;
        that.rotation = raw.rotation;
    }

    isNode() {
        return false;
    }

    isLink() {
        return false;
    }


    // link
    // ----

    getTerminal(isSource) {

        return isSource ? this.source : this.target;
    }

    setTerminal(node, isSource) {

        var that = this;

        if (isSource) {
            that.source = node;
        } else {
            that.target = node;
        }

        return that;
    }

    removeFromTerminal(isSource) {

        // remove link from node

        var that = this;
        var node = that.getTerminal(isSource);

        if (node) {
            node.removeLink(that, isSource);
        }

        return that;
    }


    // children
    // --------

    getChildCount() {

        var children = this.children;
        return children ? children.length : 0;
    }

    indexOfChild(child) {

        return indexOf(this.children || [], child);
    }

    getChildAt(index) {

        var children = this.children;
        return children ? children[index] : null;
    }

    eachChild(iterator, context) {

        var that     = this;
        var children = that.children;

        children && forEach(children, iterator, context);

        return that;
    }

    filterChild(iterator, context) {

        var children = this.children;
        return children ? filter(children, iterator, context) : [];
    }

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
    }

    removeChild(child) {

        return this.removeChildAt(this.indexOfChild(child));
    }

    removeChildAt(index) {

        var that     = this;
        var child    = null;
        var children = that.children;

        if (children && index >= 0) {

            child = that.getChildAt(index);

            if (child) {
                children.splice(index, 1);
                child.parent = null;
            }
        }

        return child;
    }


    // node
    // -----

    getLinkCount() {

        var links = this.links;
        return links ? links.length : 0;
    }

    indexOfLink(link) {

        return indexOf(this.links || [], link);
    }

    getLinkAt(index) {

        var links = this.links;
        return links ? links[index] : null;
    }

    eachLink(iterator, context) {

        var that  = this;
        var links = that.links;

        links && forEach(links, iterator, context);

        return that;
    }

    filterLink(iterator, context) {

        var links = this.links;
        return links ? filter(links, iterator, context) : [];
    }

    addLink(link, outgoing) {

        var that  = this;
        var links = that.links;

        if (link) {

            link.removeFromTerminal(outgoing);
            link.setTerminal(that, outgoing);

            // 连线的起点和终点是同一个节点时，说明连线已经和节点关联，则不需要添加
            if (!links || that.indexOfLink(link) < 0 ||
                link.getTerminal(!outgoing) !== that) {

                if (!links) {
                    links = that.links = [];
                }

                links.push(link);
            }
        }

        return that;
    }

    removeLink(link, outgoing) {

        var that  = this;
        var links = that.links;

        if (link) {

            // 连线的起点和终点是同一个节点时不需要移除
            if (links && link.getTerminal(!outgoing) !== that) {
                var index = that.indexOfLink(link);

                if (index >= 0) {
                    links.splice(index, 1);
                }
            }

            link.setTerminal(null, outgoing);
        }

        return link;
    }


    // parent
    // ------

    getParent() {

        return this.parent;
    }

    removeFromParent() {

        var that   = this;
        var parent = that.parent;

        if (parent) {
            parent.removeChild(that);
        }

        return that;
    }


    // common
    // ------

    valueOf() {}

    toString() {}

    cloneData() {

        var that = this;
        var data = that.data;

        if (data) {

            if (data.clone && isFunction(data.clone)) {
                return data.clone();
            }

            if (isNode(data)) {
                return data.cloneNode(true);
            }

            if (isObject(data)) {
                return merge({}, data);
            }
        }

        return data;
    }

    clone(cloneData) {

        var that = this;
        var raw  = merge({}, that.raw);

        raw.data    = cloneData === true ? that.cloneData() : that.data;
        raw.visible = that.visible;

        return new Cell(raw);
    }

    destroy() {}
}


// exports
// -------

export default Cell;
