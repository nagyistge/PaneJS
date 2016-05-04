import * as utils from '../common/utils';
import     Events from '../common/Events';
import       Cell from '../cells/Cell';
import   Terminal from '../cells/Terminal';

import      RootChange  from '../changes/RootChange';
import      ChildChange from '../changes/ChildChange';
import   TerminalChange from '../changes/TerminalChange';
import   GeometryChange from '../changes/GeometryChange';
import ChangeCollection from '../changes/ChangeCollection';


class Model extends Events {

    constructor(root) {

        super();

        this.nextId       = 0;
        this.updateLevel  = 0;
        this.endingUpdate = false;

        this.changes = new ChangeCollection(this);

        if (root) {
            this.setRoot(root);
        } else {
            this.clear();
        }
    }

    clear() {

        return this.setRoot(this.createRoot());
    }

    getDefaultParent() {

        // the first layer
        return this.getRoot().getChildAt(0);
    }

    isOrphan(cell) {

        return cell && cell.isOrphan();
    }

    isAncestor(ancestor, descendant) {

        return ancestor && ancestor.isAncestor(descendant);
    }

    contains(ancestor, descendant) {

        if (!descendant) {
            descendant = ancestor;
            ancestor   = this.root;
        }

        return this.isAncestor(ancestor, descendant);
    }

    getAncestors(descendant) {

        return descendant ? descendant.getAncestors() : [];
    }

    getDescendants(ancestor) {

        return ancestor ? ancestor.getDescendants() : [];
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

    getCellById(id) {

        return this.cells ? this.cells[id] : null;
    }

    createCellId() {

        let id = this.nextId;
        this.nextId += 1;

        return 'cell-' + id;
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

        let root = this.root;

        while (cell) {
            root = cell;
            cell = cell.parent;
        }

        return root;
    }

    setRoot(root) {

        return this.digest(new RootChange(this, root));
    }

    rootChanged(root) {

        let prev = this.root;

        this.root   = root;
        this.cells  = null;
        this.nextId = 0;
        this.cellAdded(root);

        return prev;
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

    addNode(node, parent, index) {

        return this.addCells([node], parent, index);
    }

    addLink(link, source, target, parent, index) {

        return this.addCells([link], parent, index, source, target);
    }

    addCell(cell, parent, index, source, target) {

        return this.addCells([cell], parent, index, source, target);
    }

    addCells(cells, parent, index, source, target) {

        parent = parent || this.getDefaultParent();
        index  = utils.fixIndex(index, parent.getChildCount());

        this.beginUpdate();

        try {
            let that = this;

            utils.forEach(cells, function (child) {
                if (child) {
                    if (child !== parent) {

                        that.digest(new ChildChange(that, parent, child, index));

                        // let parentChanged = cell.parent !== parent;

                        /* FIXME
                         if (parentChanged) {

                         }
                         */

                        index++;
                    }

                    source && that.cellConnected(child, source, true);
                    target && that.cellConnected(child, target, false);
                }
            });
        } finally {
            this.endUpdate();
        }

        return this;
    }

    cellConnected(link, terminal, isSource) {

        // connect link with node
        if (link) {
            this.beginUpdate();
            try {
                this.setTerminal(link, terminal, isSource);
            } finally {
                this.endUpdate();
            }
        }

        return this;
    }

    childChanged(cell, parent, index) {

        let prev = cell.parent;

        if (parent) {
            if (parent !== prev || prev.indexOfChild(cell) !== index) {
                // `insertChild` will firstly remove cell from previous parent
                parent.insertChild(cell, index);
            }
        } else if (prev) {
            prev.removeChild(cell);
        }

        if (parent) {
            // check if the previous parent was already in the
            // model and avoids calling cellAdded if it was.
            if (!this.contains(prev)) {
                this.cellAdded(cell);
            }
        } else {
            this.cellRemoved(cell);
        }

        return prev;
    }

    linkChanged(link, terminal, isSource) {

        let prev = link.getTerminal(isSource);

        if (terminal) {
            terminal.addLink(link, isSource);
        } else if (prev) {
            prev.removeLink(link, isSource);
        }

        return prev;
    }

    cellAdded(cell) {

        // fix cell's id, and map the cell
        if (cell) {

            let id = cell.id || this.createCellId(cell);
            if (id) {
                // distinct
                let dist = this.getCellById(id);
                if (dist !== cell) {
                    while (dist) {
                        id   = this.createCellId(cell);
                        dist = this.getCellById(id);
                    }

                    // as lazy as possible
                    if (!this.cells) {
                        this.cells = {};
                    }

                    cell.id = id;
                    // mapping
                    this.cells[id] = cell;
                }
            }

            // fix nextId
            if (utils.isNumeric(id)) {
                this.nextId = Math.max(this.nextId, id);
            }

            cell.eachChild(this.cellAdded, this);
        }
    }

    updateLinkParents(cell, root) {

        // Updates the parent for all links that are connected to node

        root = root || this.getRoot(cell);

        // update links on children first
        cell.eachChild(function (child) {
            this.updateLinkParents(child, root);
        }, this);

        // update the parents of all connected links
        cell.eachLink(function (link) {
            // update edge parent if edge and child have
            // a common root node (does not need to be the
            // model root node)
            if (this.isAncestor(root, link)) {
                this.updateLinkParent(link, root);
            }
        }, this);
    }

    updateLinkParent(link, root) {

        let that   = this;
        let cell   = null;
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

    removeCell(cell) {

        if (cell) {
            if (cell === this.root) {
                this.setRoot(null);
            } else if (cell.parent) {
                this.digest(new ChildChange(this, null, cell));
            }
        }

        return cell;
    }

    cellRemoved(cell) {

        if (cell) {

            cell.eachChild(function (child) {
                this.cellRemoved(child);
            }, this);

            // un-map
            let id    = cell.id;
            let cells = this.cells;
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

        if (parent) {
            return parent.filterChild(function (child) {
                return (isNode && child.isNode) || (isLink && child.isLink);
            });
        }

        return [];
    }

    getTerminal(link, isSource) {

        return link ? link.getTerminal(isSource) : null;
    }

    setTerminal(link, terminal, isSource) {
        // FIXME: not used {
        // let terminalChanged = terminal !== that.getTerminal(link, isSource);
        // }

        this.digest(new TerminalChange(this, link, new Terminal(terminal), isSource));

        /*
         if (this.maintainEdgeParent && terminalChanged) {
         this.updateEdgeParent(link, this.getRoot());
         }
         */

        return this;
    }

    setTerminals(link, source, target) {

        this.beginUpdate();

        try {
            this.setTerminal(link, source, true);
            this.setTerminal(link, target, false);
        } finally {
            this.endUpdate();
        }

        return this;
    }

    terminalChanged(link, terminal, isSource) {

        let prev = this.getTerminal(link, isSource);

        if (terminal) {
            terminal.addLink(link, isSource);
        } else if (prev) {
            prev.removeLink(link, isSource);
        }

        return prev;
    }

    getGeometry(cell) {
        return cell;
    }

    setGeometry(cell, geometry) {

        this.digest(new GeometryChange(this, cell, geometry));

        return this;
    }

    // geometryChanged(cell, geometry) {

    // }


    // update
    // ------

    digest(change) {

        // take effect the change
        change.digest();

        this.beginUpdate();
        this.changes.add(change);
        this.endUpdate();

        return this;
    }

    beginUpdate() {

        this.updateLevel += 1;
        this.trigger('beginUpdate');

        if (this.updateLevel === 1) {
            this.trigger('startEdit');
        }
    }

    endUpdate() {

        this.updateLevel -= 1;

        if (this.updateLevel === 0) {
            this.trigger('endEdit');
        }

        if (!this.endingUpdate) {

            this.endingUpdate = this.updateLevel === 0;

            let changes = this.changes;

            this.trigger('endUpdate', changes.getChanges());

            // TODO: 如果此时还没有和 paper 关联, 所有的 changes 都将失效, 还需要一种机制来管理
            if (this.endingUpdate && changes.hasChange()) {
                changes
                    .notify()
                    .clear();
            }

            this.endingUpdate = false;
        }
    }
}


// exports
// -------

export default Model;
