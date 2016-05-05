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


    // cell
    // ----

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
            utils.forEach(cells, function (child) {
                if (child) {
                    if (child !== parent) {
                        this.setParent(child, parent, index);
                        index++;
                    }

                    source && this.setTerminal(child, source, true);
                    target && this.setTerminal(child, target, false);
                }
            }, this);

        } finally {
            this.endUpdate();
        }

        return this;
    }

    getParent(child) {

        return child ? child.parent : null;
    }

    setParent(child, parent, index) {

        if (child) {

            try {
                this.beginUpdate();
                // let parentChanged = cell.parent !== parent;

                this.digest(new ChildChange(this, child, parent, index));

                /* FIXME
                 if (parentChanged) {

                 }
                 */
            } finally {
                this.endUpdate();
            }
        }

        return this;
    }

    childChanged(child, parent, index) {

        let previous = this.getParent(child);

        if (parent) {
            if (parent !== previous || previous.indexOfChild(child) !== index) {
                // `insertChild` will firstly remove cell from previous parent
                parent.insertChild(child, index, { silent: true });
            }
        } else if (previous) {
            previous.removeChild(child, { silent: true });
        }

        if (parent) {
            // check if the previous parent was already in the
            // model and avoids calling cellAdded if it was.
            if (!this.contains(previous)) {
                this.cellAdded(child);
            }
        } else {
            this.cellRemoved(child);
        }

        return previous;
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

        // create an Id for the cell and map it

        if (cell) {
            // creates an Id for the cell if not Id exists
            let id = cell.getId() || this.createCellId(cell);
            if (id) {
                let collision = this.getCellById(id);

                if (collision !== cell) {
                    // creates new Id for the cell as long as there is a collision
                    while (collision) {
                        id        = this.createCellId(cell);
                        collision = this.getCellById(id);
                    }

                    // lazily creates the cells dictionary
                    if (!this.cells) {
                        this.cells = {};
                    }

                    cell.setId(id);
                    this.cells[id] = cell;
                }
            }

            // makes sure IDs of deleted cells are not reused
            if (utils.isNumeric(id)) {
                this.nextId = Math.max(this.nextId, id);
            }

            cell.setModel(this);
            // recursively processes child cells
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
        while (source && !source.isLink() && source.geometry && source.geometry.relative) {
            source = source.parent;
        }

        // use the first non-relative descendants of the target terminal
        while (target && !target.isLink() && target.geometry && target.geometry.relative) {
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
            if (this.isRoot(cell)) {
                this.setRoot(null);
            } else if (this.getParent(cell)) {
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

            let id = cell.getId();
            if (this.cells && id) {
                delete this.cells[id];
            }

            cell.setModel(null);
        }
    }


    // children
    // --------

    getChildNodes(parent) {

        return this.getChildCells(parent, true, false);
    }

    getChildLinks(parent) {

        return this.getChildCells(parent, false, true);
    }

    getChildCells(parent, isNode, isLink) {

        if (parent) {
            return parent.filterChild(function (child) {
                return (isNode && child.isNode()) || (isLink && child.isLink());
            });
        }

        return [];
    }

    indexOfChild(cell, child) {

        return cell ? cell.indexOfChild(child) : -1;
    }

    getChildAt(cell, index) {

        return cell ? cell.getChildAt(index) : null;
    }

    getChildren(cell) {

        return cell ? cell.children : null;
    }

    getChildCount(cell) {

        return cell ? cell.getChildCount() : 0;
    }


    // node
    // ----

    isNode(cell) {

        return cell ? cell.isNode() : false;
    }

    getLinkCount(cell) {

        return cell ? cell.getLinkCount() : 0;
    }

    indexOfLink(cell, link) {
        return cell ? cell.indexOfLink(link) : -1;
    }

    getLinkAt(cell, index) {

        return cell ? cell.getLinkAt(index) : null;
    }


    // link
    // ----

    isLink(link) {

        return link ? link.isLink() : false;
    }

    getTerminal(link, isSource) {

        return link ? link.getTerminal(isSource) : null;
    }

    setTerminal(link, terminal, isSource) {

        if (link) {
            try {
                this.beginUpdate();

                // FIXME: not used {
                // let terminalChanged = terminal !== that.getTerminal(link, isSource);
                // }

                this.digest(new TerminalChange(this, link, new Terminal(terminal), isSource));

                /*
                 if (this.maintainEdgeParent && terminalChanged) {
                 this.updateEdgeParent(link, this.getRoot());
                 }
                 */
            } finally {
                this.endUpdate();
            }
        }

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

    geometryChanged() {

    }


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


    // common
    // ------

    getPaper() {

        return this.paper;
    }

    setPaper(paper) {

        this.paper = paper || null;

        return this;
    }
}


// exports
// -------

export default Model;
