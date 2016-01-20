import * as utils from '../common/utils';


class Cell {

    // link
    // ----

    getTerminal(isSource) {

        return isSource ? this.source : this.target;
    }

    setTerminal(node, isSource) {

        let that = this;

        if (isSource) {
            that.source = node;
        } else {
            that.target = node;
        }

        return that;
    }

    removeFromTerminal(isSource) {

        // remove link from node

        let that = this;
        let node = that.getTerminal(isSource);

        if (node) {
            node.removeLink(that, isSource);
        }

        return that;
    }

    // geometry
    // --------
    // TODO

    getGeometry() {
    }


    // children
    // --------

    getChildCount() {

        return this.children ? this.children.length : 0;
    }

    indexOfChild(child) {

        return utils.indexOf(this.children, child);
    }

    getChildAt(index) {

        return this.children ? this.children[index] : null;
    }

    eachChild(iterator, context) {

        return utils.forEach(this.children, iterator, context);
    }

    filterChild(iterator, context) {

        return utils.filter(this.children, iterator, context);
    }

    insertChild(child, index) {

        let that = this;

        if (child) {

            let childCount = that.getChildCount();

            index = utils.fixIndex(index, childCount);

            if (child.parent === that && index === childCount) {
                index--;
            }


            child.removeFromParent();
            child.parent = that;


            let children = that.children;

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

        let that = this;
        let child = null;
        let children = that.children;

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

        return this.links ? this.links.length : 0;
    }

    indexOfLink(link) {

        return utils.indexOf(this.links, link);
    }

    getLinkAt(index) {

        return this.links ? this.links[index] : null;
    }

    eachLink(iterator, context) {

        return utils.forEach(this.links, iterator, context);
    }

    filterLink(iterator, context) {

        return utils.filter(this.links, iterator, context);
    }

    addLink(link, outgoing) {

        let that = this;
        let links = that.links;

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

        let that = this;
        let links = that.links;

        if (link) {

            // 连线的起点和终点是同一个节点时不需要移除
            if (links && link.getTerminal(!outgoing) !== that) {
                let index = that.indexOfLink(link);

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

        let that = this;
        let parent = that.parent;

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

        let data = this.data;

        if (data) {

            if (data.clone && utils.isFunction(data.clone)) {
                return data.clone();
            }

            if (utils.isNode(data)) {
                return data.cloneNode(true);
            }

            if (utils.isObject(data)) {
                return utils.merge({}, data);
            }
        }

        return data;
    }

    clone(cloneData) {

        let that = this;
        let metadata = utils.merge({}, that.metadata);

        metadata.data = cloneData === true ? that.cloneData() : that.data;
        metadata.visible = that.visible;

        return new that.constructor(metadata);
    }

    destroy() {}
}


// exports
// -------

export default Cell;
