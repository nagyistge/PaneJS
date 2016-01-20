import {
    // filter,
    forEach,
    fixIndex,
    isNumeric,
    // isUndefined,
    // isNullOrUndefined,
} from '../common/utils';

import Events from '../common/Events';

import Cell from '../cells/Cell';

import RootChange       from '../changes/RootChange';
import ChildChange      from '../changes/ChildChange';
import TerminalChange   from '../changes/TerminalChange';
import GeometryChange   from '../changes/GeometryChange';
import ChangeCollection from '../changes/ChangeCollection';

class Model extends Events {

    constructor(root) {

        super();

        let that = this;

        that.nextId = 0;
        that.updateLevel = 0;
        that.endingUpdate = false;
        that.changes = new ChangeCollection(that);

        if (root) {
            that.setRoot(root);
        } else {
            that.clear();
        }
    }

    clear() {
        return this.setRoot(this.createRoot());
    }

    getDefaultParent() {
        return this.getRoot().getChildAt(0);  // the first layer
    }

    isAncestor(parent, child) {

        if (!parent || !child) {
            return false;
        }

        while (child && child !== parent) {
            child = child.parent;
        }

        return child === parent;
    }

    isOrphan(cell) {
        return !(cell && cell.parent);
    }

    contains(cell) {
        return this.isAncestor(this.root, cell);
    }

    getCellById(id) {
        return this.cells ? this.cells[id] : null;
    }

    createCellId() {
        let that = this;
        let id = that.nextId;

        that.nextId += 1;

        return 'cell-' + id;
    }

    getAncestors(child) {

        let that = this;
        let result = [];
        let parent = child ? child.parent : null;

        if (parent) {
            result.push(parent);
            result = result.concat(that.getAncestors(parent));
        }

        return result;
    }

    getDescendants(parent) {

        let that = this;
        let result = [];

        parent = parent || that.getRoot();
        parent.eachChild(function (child) {
            result.push(child);
            result = result.concat(that.getDescendants(child));
        });

        return result;
    }

    getParents(/* cells */) {
        /* FIXME
         let parents = [];

         if (cells) {

         let hash = {};

         forEach(cells, function (cell) {
         let parent = cell.parent;

         if (parent) {
         let id = cellRoute.create(parent);

         if (!hash[id]) {
         hash[id] = parent;
         parents.push(parent);
         }
         }
         });
         }

         return parents;
         */
    }


    // root
    // ----

    isRoot(cell) {
        return cell && this.root === cell;
    }

    createRoot() {
        let root = new Cell();

        root.insertChild(this.createLayer());

        return root;
    }

    getRoot(cell) {

        let root = cell || this.root;

        if (cell) {
            while (cell) {
                root = cell;
                cell = cell.parent;
            }
        }

        return root;
    }

    setRoot(root) {
        return this.digest(new RootChange(this, root));
    }

    rootChanged(newRoot) {

        let that = this;
        let oldRoot = that.root;

        that.root = newRoot;
        that.cells = null;
        that.nextId = 0;
        that.cellAdded(newRoot);

        return oldRoot;
    }


    // Layers
    // ------

    isLayer(cell) {
        return cell && this.isRoot(cell.parent);
    }

    getLayers() {
        return this.getRoot().children || [];
    }

    createLayer() {
        return new Cell();
    }


    // child
    // -----

    getParent(cell) {
        return cell ? cell.parent : null;
    }

    addNode(child, parent, index) {
        return this.addCells([child], parent, index);
    }

    addLink(child, source, target, parent, index) {
        return this.addCells([child], parent, index, source, target);
    }

    addCell(cell, parent, index, source, target) {
        return this.addCells([cell], parent, index, source, target);
    }

    addCells(cells, parent, index, source, target) {

        let that = this;

        parent = parent || that.getDefaultParent();
        index = fixIndex(index, parent.getChildCount());

        that.beginUpdate();

        try {

            forEach(cells, function (cell) {

                if (cell) {

                    if (cell !== parent) {

                        that.digest(new ChildChange(that, parent, cell, index));

                        // let parentChanged = cell.parent !== parent;

                        /* FIXME
                         if (parentChanged) {

                         }
                         */

                        index++;
                    }

                    if (source) {
                        that.cellConnected(cell, source, true);
                    }

                    if (target) {
                        that.cellConnected(cell, target, false);
                    }
                }

            });

        } finally {
            that.endUpdate();
        }

        return that;
    }

    cellConnected(link, terminal, isSource) {

        // connect link with node

        let that = this;

        if (link) {

            that.beginUpdate();

            try {

                that.setTerminal(link, terminal, isSource);

            } finally {
                that.endUpdate();
            }
        }

        return that;
    }


    childChanged(cell, parent, index) {

        let that = this;
        let previous = cell.parent;

        if (parent) {
            if (parent !== previous ||
                previous.indexOfChild(cell) !== index) {
                parent.insertChild(cell, index);
            }
        } else if (previous) {
            previous.removeChild(cell);
        }

        // check if the previous parent was already in the
        // model and avoids calling cellAdded if it was.
        if (parent && !that.contains(previous)) {
            that.cellAdded(cell);
        } else if (!parent) {
            that.cellRemoved(cell);
        }

        return previous;
    }

    linkChanged(link, newNode, isSource) {

        let oldNode = link.getTerminal(isSource);

        if (newNode) {
            newNode.addLink(link, isSource);
        } else if (oldNode) {
            oldNode.removeLink(link, isSource);
        }

        return oldNode;
    }

    cellAdded(cell) {

        let that = this;

        if (cell) {

            let id = cell.id || that.createCellId(cell);

            if (id) {

                // distinct
                let collision = that.getCellById(id);

                if (collision !== cell) {
                    while (collision) {
                        id = that.createCellId(cell);
                        collision = that.getCellById(id);
                    }

                    // as lazy as possible
                    if (!that.cells) {
                        that.cells = {};
                    }

                    cell.id = id;
                    that.cells[id] = cell;
                }
            }

            // fix nextId
            if (isNumeric(id)) {
                that.nextId = Math.max(that.nextId, id);
            }

            cell.eachChild(that.cellAdded, that);
        }
    }

    updateLinkParents(cell, root) {

        // Updates the parent for all links that are connected to node

        let that = this;

        root = root || that.getRoot(cell);

        // update links on children first
        cell.eachChild(function (child) {
            that.updateLinkParents(child, root);
        });

        // update the parents of all connected links
        cell.eachLink(function (link) {
            // update edge parent if edge and child have
            // a common root node (does not need to be the
            // model root node)
            if (that.isAncestor(root, link)) {
                that.updateLinkParent(link, root);
            }
        });
    }

    updateLinkParent(link, root) {

        let that = this;
        let cell = null;
        let source = link.getTerminal(true);
        let target = link.getTerminal(false);

        // use the first non-relative descendants of the source terminal
        while (source && !source.isLink && source.geometry && source.geometry.relative) {
            source = source.parent;
        }

        // use the first non-relative descendants of the target terminal
        while (target && !target.isLink && target.geometry && target.geometry.relative) {
            target = target.parent;
        }

        if (that.isAncestor(root, source) && that.isAncestor(root, target)) {

            if (source === target) {
                cell = source.parent;
            } else {
                cell = that.getNearestCommonAncestor(source, target);
            }

            if (cell &&
                (cell.parent !== that.root || that.isAncestor(cell, link)) &&
                link.parent !== cell) {

                let geo = link.geometry;

                if (geo) {
                    let origin1 = that.getOrigin(link.parent);
                    let origin2 = that.getOrigin(cell);

                    let dx = origin2.x - origin1.x;
                    let dy = origin2.y - origin1.y;

                    geo = geo.clone();
                    geo.translate(-dx, -dy);
                    that.setGeometry(link, geo);
                }

                that.add(cell, link);
            }
        }
    }

    getNearestCommonAncestor(/* cell1, cell2 */) {

        /* FIXME
         if (cell1 && cell2) {

         let route1 = cellRoute.create(cell1);
         let route2 = cellRoute.create(cell2);

         if (route1 && route2) {

         let cell = cell1;
         let route = route2;
         let current = route1;

         if (route1.length > route2.length) {
         cell = cell2;
         route = route1;
         current = route2;
         }

         while (cell) {
         let parent = cell.parent;

         // check if the cell path is equal to the beginning of the given cell path
         if (route.indexOf(current + cellRoute.separator) === 0 && parent) {
         return cell;
         }

         cell = parent;
         current = cellRoute.getParentRoute(current);
         }
         }
         }
         */

        return null;
    }

    remove(cell) {

        let that = this;

        if (cell) {
            if (cell === that.root) {
                that.setRoot(null);
            } else if (cell.parent) {
                that.digest(new ChildChange(that, null, cell));
            }
        }

        return cell;
    }

    cellRemoved(cell) {

        let that = this;

        if (cell) {

            cell.eachChild(function (child) {
                that.cellRemoved(child);
            });

            let id = cell.id;
            let cells = that.cells;
            if (cells && id) {
                delete cells[id];
            }
        }
    }

    getChildNodes(parent) {
        return this.getChildCells(parent, true, false);
    }

    getChildLinks(parent) {
        return this.getChildCells(parent, false, true);
    }

    getChildCells(parent, isNode, isLink) {
        return parent ? parent.filterChild(function (child) {
            return (isNode && child.isNode) || (isLink && child.isLink);
        }) : [];
    }

    getTerminal(link, isSource) {
        return link ? link.getTerminal(isSource) : null;
    }

    setTerminal(link, terminal, isSource) {

        let that = this;
        // FIXME: not used {
        // let terminalChanged = terminal !== that.getTerminal(link, isSource);
        // }

        that.digest(new TerminalChange(that, link, terminal, isSource));

        /*
         if (this.maintainEdgeParent && terminalChanged) {
         this.updateEdgeParent(link, this.getRoot());
         }
         */

        return that;
    }

    setTerminals(link, source, target) {

        let that = this;

        that.beginUpdate();

        try {
            that.setTerminal(link, source, true);
            that.setTerminal(link, target, false);
        } finally {
            that.endUpdate();
        }

        return that;
    }

    terminalChanged(link, node, isSource) {

        let that = this;
        let previous = that.getTerminal(link, isSource);

        if (node) {
            node.addLink(link, isSource);
        } else if (previous) {
            previous.removeLink(link, isSource);
        }

        return previous;
    }

    getGeometry(cell) {
        return cell;
    }

    setGeometry(cell, geometry) {
        let that = this;

        that.digest(new GeometryChange(that, cell, geometry));
        return that;
    }

    // geometryChanged(cell, geometry) {

    // }

    // update
    // ------

    digest(change) {

        let that = this;

        change.digest();

        that.beginUpdate();
        that.changes.add(change);
        that.endUpdate();

        return that;
    }

    beginUpdate() {

        let that = this;

        that.updateLevel += 1;
        that.trigger('beginUpdate');

        if (that.updateLevel === 1) {
            that.trigger('startEdit');
        }
    }

    endUpdate() {

        let that = this;

        that.updateLevel -= 1;

        if (that.updateLevel === 0) {
            that.trigger('endEdit');
        }

        if (!that.endingUpdate) {

            let changeCollection = that.changes;

            that.endingUpdate = that.updateLevel === 0;
            that.trigger('endUpdate', changeCollection.changes);

            // TODO: 如果此时还没有和 paper 关联, 所有的 changes 都将失效, 所以需要一种机制来管理

            if (that.endingUpdate && changeCollection.hasChange()) {
                changeCollection.notify().clear();
            }

            that.endingUpdate = false;
        }
    }
}

export default Model;
