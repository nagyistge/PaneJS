import {
    filter,
    forEach,
    isNumeric,
    isUndefined,
    isNullOrUndefined,
} from '../common/utils';

import Events from '../common/Events';

import Cell from '../cells/Cell';

import RootChange       from '../changes/RootChange';
import ChildChange      from '../changes/ChildChange';
import ChangeCollection from '../changes/ChangeCollection'

class Model extends Events {

    constructor(root) {

        super();

        var that = this;

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

    contains(cell) {
        return this.isAncestor(this.root, cell);
    }

    getCellById(id) {
        return this.cells ? this.cells[id] : null;
    }

    createCellId() {
        var that = this;
        var id = that.nextId;

        that.nextId += 1;

        return 'cell-' + id;
    }

    getAncestors(child) {

        var that = this;
        var result = [];
        var parent = child ? child.parent : null;

        if (parent) {
            result.push(parent);
            result = result.concat(that.getAncestors(parent));
        }

        return result;
    }

    getDescendants(parent) {

        var that = this;
        var result = [];

        parent = parent || that.getRoot();
        parent.eachChild(function (child) {
            result.push(child);
            result = result.concat(that.getDescendants(child));
        });

        return result;
    }

    getParents(cells) {

        var parents = [];

        if (cells) {

            var hash = {};

            each(cells, function (cell) {
                var parent = cell.parent;

                if (parent) {
                    var id = cellRoute.create(parent);

                    if (!hash[id]) {
                        hash[id] = parent;
                        parents.push(parent);
                    }
                }
            });
        }

        return parents;
    }


    // root
    // ----

    isRoot(cell) {
        return cell && this.root === cell;
    }

    createRoot() {
        var root = new Cell();

        root.insertChild(this.createLayer());

        return root;
    }

    getRoot(cell) {

        var root = cell || this.root;

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

        var that = this;
        var oldRoot = that.root;

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

    addCell(child, parent, index) {
        return this.addCells([child], parent, index);
    }

    addCells(cells, parent, index) {

        var that = this;

        parent = parent || that.getDefaultParent();
        index = isNullOrUndefined(index) ? parent.getChildCount() : index;

        that.beginUpdate();

        forEach(cells, function (cell) {
            if (cell && parent && cell !== parent) {
                that.digest(new ChildChange(that, parent, cell, index));
                index += 1;
            } else {
                index -= 1;
            }
        });

        that.endUpdate();

        return that;
    }

    childChanged(cell, newParent, newIndex) {

        var that = this;
        var oldParent = cell.parent;

        if (newParent) {
            if (newParent !== oldParent || oldParent.indexOfChild(cell) !== newIndex) {
                newParent.insertChild(cell, newIndex);
            }
        } else if (oldParent) {
            oldParent.removeChild(cell);
        }

        // check if the previous parent was already in the
        // model and avoids calling cellAdded if it was.
        if (newParent && !that.contains(oldParent)) {
            that.cellAdded(cell);
        } else if (!newParent) {
            that.cellRemoved(cell);
        }

        return oldParent;
    }

    linkChanged(link, newNode, isSource) {
        var oldNode = link.getNode(isSource);

        if (newNode) {
            newNode.addLink(link, isSource);
        } else if (oldNode) {
            oldNode.removeLink(link, isSource);
        }

        return oldNode;
    }

    cellAdded(cell) {

        var that = this;

        if (cell) {

            var id = cell.id || that.createCellId(cell);

            if (id) {

                // distinct
                var collision = that.getCellById(id);

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

        var that = this;

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

        var that = this;
        var cell = null;
        var source = link.getTerminal(true);
        var target = link.getTerminal(false);

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

                var geo = link.geometry;

                if (geo) {
                    var origin1 = that.getOrigin(link.parent);
                    var origin2 = that.getOrigin(cell);

                    var dx = origin2.x - origin1.x;
                    var dy = origin2.y - origin1.y;

                    geo = geo.clone();
                    geo.translate(-dx, -dy);
                    that.setGeometry(link, geo);
                }

                that.add(cell, link);
            }
        }
    }

    getNearestCommonAncestor(cell1, cell2) {

        if (cell1 && cell2) {

            var route1 = cellRoute.create(cell1);
            var route2 = cellRoute.create(cell2);

            if (route1 && route2) {

                var cell = cell1;
                var route = route2;
                var current = route1;

                if (route1.length > route2.length) {
                    cell = cell2;
                    route = route1;
                    current = route2;
                }

                while (cell) {
                    var parent = cell.parent;

                    // check if the cell path is equal to the beginning of the given cell path
                    if (route.indexOf(current + cellRoute.separator) === 0 && parent) {
                        return cell;
                    }

                    cell = parent;
                    current = cellRoute.getParentRoute(current);
                }
            }
        }

        return null;
    }

    // get the absolute, accumulated origin for the children
    // inside the given parent as an `Point`.
    getOrigin(cell) {

        var that = this;
        var result = null;

        if (cell) {
            result = that.getOrigin(cell.parent);

            if (!cell.isLink) {
                var geo = cell.geometry;

                if (geo) {
                    result.x += geo.x;
                    result.y += geo.y;
                }
            }
        } else {
            result = new Point();
        }

        return result;
    }

    remove(cell) {

        var that = this;

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

        var that = this;

        if (cell) {

            cell.eachChild(function (child) {
                that.cellRemoved(child);
            });

            var id = cell.id;
            var cells = that.cells;
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


    // update
    // ------

    digest(change) {

        var that = this;

        change.digest();

        that.beginUpdate();
        that.changes.add(change);
        that.endUpdate();

        return that;
    }

    beginUpdate() {

        var that = this;

        that.updateLevel += 1;
        that.trigger('beginUpdate');

        if (that.updateLevel === 1) {
            that.trigger('startEdit');
        }
    }

    endUpdate() {

        var that = this;

        that.updateLevel -= 1;

        if (that.updateLevel === 0) {
            that.trigger('endEdit');
        }

        if (!that.endingUpdate) {

            var changeCollection = that.changes;

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
