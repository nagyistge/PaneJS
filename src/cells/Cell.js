import * as utils from '../common/utils';


class Cell {

    // static
    // ------

    static isCell(cell) {
        return cell && cell instanceof Cell;
    }

    // link
    // ----

    getTerminal(isSource) {

        return isSource ? this.source : this.target;
    }

    setTerminal(terminal, isSource) {

        if (isSource) {
            this.source = terminal;

            if (terminal) {
                this.sourceNode  = terminal.node;
                this.sourcePort  = terminal.port;
                this.sourcePoint = terminal.point;
            } else {
                this.sourceNode  = null;
                this.sourcePort  = null;
                this.sourcePoint = null;
            }

        } else {
            this.target = terminal;

            if (terminal) {
                this.targetNode  = terminal.node;
                this.targetPort  = terminal.port;
                this.targetPoint = terminal.point;
            } else {
                this.targetNode  = null;
                this.targetPort  = null;
                this.targetPoint = null;
            }
        }

        return this;
    }

    getTerminalNode(isSource) {

        let node = isSource ? this.sourceNode : this.targetNode;

        if (!node) {

            let terminal = this.getTerminal(isSource);

            node = terminal && terminal.node || null;
        }

        return node;
    }

    setTerminalNode(node, isSource) {

        if (isSource) {
            this.sourceNode = node;
        } else {
            this.targetNode = node;
        }

        let terminal = this.getTerminal(isSource);
        if (terminal) {
            terminal.node = node;
        }

        return this;
    }

    getTerminalPort(isSource) {

        let port = isSource ? this.sourcePort : this.targetPort;

        if (!port) {

            let terminal = this.getTerminal(isSource);

            port = terminal && terminal.port || null;
        }

        return port;
    }

    setTerminalPort(port, isSource) {

        if (isSource) {
            this.sourcePort = port;
        } else {
            this.targetPort = port;
        }

        let terminal = this.getTerminal(isSource);
        if (terminal) {
            terminal.port = port;
        }

        return this;
    }

    getTerminalPoint(isSource) {

        let point = isSource ? this.sourcePoint : this.targetPoint;

        if (!point) {

            let terminal = this.getTerminal(isSource);

            point = terminal && terminal.point || null;
        }

        return point;
    }

    setTerminalPoint(point, isSource) {

        if (isSource) {
            this.sourcePoint = point;
        } else {
            this.targetPoint = point;
        }

        let terminal = this.getTerminal(isSource);
        if (terminal) {
            terminal.point = point;
        }

        return this;
    }

    removeFromTerminal(isSource) {

        // remove link from terminal
        let terminal = this.getTerminal(isSource);
        if (terminal) {
            terminal.removeLink(this, isSource);
        }

        return this;
    }


    // geometry
    // --------
    // TODO

    getGeometry() { }


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

            // update parent
            child.removeFromParent();
            child.parent = that;


            let children = that.children;
            if (children && children.length) {
                children.splice(index, 0, child);
            } else {
                // speed up
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

        let that     = this;
        let child    = null;
        let children = that.children;

        if (children && index >= 0) {

            child = that.getChildAt(index);

            if (child) {
                children.splice(index, 1);
                child.parent = null;
            }
        }

        // return the removed child
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

        let that  = this;
        let links = that.links;

        if (link) {

            link.removeFromTerminal(outgoing);

            if (!links || that.indexOfLink(link) < 0 ||
                    // 连线的起点和终点是同一个节点时,说明
                    // 连线已经和节点关联，则不需要重复添加
                link.getTerminalNode(!outgoing) !== that) {

                if (!links) {
                    links = that.links = [];
                }

                links.push(link);
            }

            link.setTerminalNode(that, outgoing);
        }

        return that;
    }

    removeLink(link, outgoing) {

        let that  = this;
        let links = that.links;

        if (link) {

            // 连线的起点和终点是同一个节点时不需要移除
            if (links && link.getTerminalNode(!outgoing) !== that) {

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

    isOrphan() {

        return !this.parent;
    }

    isAncestor(descendant) {

        if (!descendant) {
            return false;
        }

        while (descendant && descendant !== this) {
            descendant = descendant.parent;
        }

        return descendant === this;
    }

    contains(descendant) {

        return this.isAncestor(this, descendant);
    }

    getParent() {

        return this.parent;
    }

    getAncestors() {

        let result = [];
        let parent = this.parent;

        while (parent) {
            result.push(parent);
            parent = parent.parent;
        }

        return result;
    }

    getDescendants() {

        let that   = this;
        let result = [];

        that.eachChild(function (child) {
            result.push(child);
            result = result.concat(that.getDescendants(child));
        });

        return result;
    }

    removeFromParent() {

        let that   = this;
        let parent = that.parent;

        if (parent) {
            parent.removeChild(that);
        }

        return that;
    }


    // common
    // ------

    addTo(model, parent, index) {

        model.addCell(this, parent, index);

        return this;
    }

    getView() {}

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

    clone(options, withData) {

        let that     = this;
        let metadata = utils.merge({}, that.metadata, options);

        metadata.data    = withData === true ? that.cloneData() : that.data;
        metadata.visible = that.visible;

        return new that.constructor(metadata);
    }

    destroy() {}
}


// exports
// -------

export default Cell;
