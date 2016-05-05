import * as utils from '../common/utils';


class Cell {

    // static
    // ------

    static isCell(cell) {
        return cell && cell instanceof Cell;
    }


    // link
    // ----

    isLink() {
        return false;
    }

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

        let node = isSource
            ? this.sourceNode
            : this.targetNode;

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

        let port = isSource
            ? this.sourcePort
            : this.targetPort;

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

        let point = isSource
            ? this.sourcePoint
            : this.targetPoint;

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

        if (child) {

            let childCount = this.getChildCount();

            index = utils.fixIndex(index, childCount);

            if (child.parent === this && index === childCount) {
                index--;
            }

            // update parent
            child.removeFromParent();
            child.parent = this;

            if (this.children && this.children.length) {
                this.children.splice(index, 0, child);
            } else {
                // speed up
                this.children = [];
                this.children.push(child);
            }
        }

        return this;
    }

    removeChild(child) {

        return this.removeChildAt(this.indexOfChild(child));
    }

    removeChildAt(index) {

        if (this.children && this.children.length && index >= 0) {

            let child = this.getChildAt(index);
            if (child) {
                this.children.splice(index, 1);
                child.parent = null;
            }

            // return the removed child
            return child;
        }
    }


    // node
    // ----

    isNode() {
        return false;
    }

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

        if (link) {

            link.removeFromTerminal(outgoing);

            if (!this.links || this.indexOfLink(link) < 0 ||
                    // when source and target are the same node, these's
                    // no need to relate link with node once more.
                link.getTerminalNode(!outgoing) !== this) {

                if (!this.links) {
                    this.links = [];
                }

                // links are unordered, push it to the array directly.
                this.links.push(link);
            }

            link.setTerminalNode(this, outgoing);
        }

        return this;
    }

    removeLink(link, outgoing) {

        if (link) {
            // when the source and target are the same, do not remove it
            if (this.links && link.getTerminalNode(!outgoing) !== this) {

                let index = this.indexOfLink(link);
                if (index >= 0) {
                    this.links.splice(index, 1);
                }
            }

            // fixme: should call `link.setTerminalNode()` ?
            link.setTerminal(null, outgoing);
        }

        return link;
    }


    // parent
    // ------

    isOrphan() {

        return utils.isNil(this.parent);
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

        let result = [];

        this.eachChild(function (child) {
            result.push(child);
            result = result.concat(this.getDescendants(child));
        }, this);

        return result;
    }

    removeFromParent() {

        if (this.parent) {
            this.parent.removeChild(this);
        }

        return this;
    }


    // geometry
    // --------
    // TODO

    getGeometry() { }


    // common
    // ------

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    addTo(model, parent, index) {

        model.addCell(this, parent, index);

        return this;
    }

    getView() {}

    valueOf() {

        return this.data;
    }

    toString() {

        return this.getId() || Object.toString.call(this);
    }

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

        let metadata = utils.merge({}, this.metadata, options);

        metadata.data    = withData === true ? this.cloneData() : this.data;
        metadata.visible = this.visible;

        return new this.constructor(metadata);
    }

    destroy() {}
}


// exports
// -------

export default Cell;
