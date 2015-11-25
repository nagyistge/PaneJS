import {
    isNumeric
} from '../common/utils';

import Class  from '../common/Class';
import Events from '../common/Events';

import Cell from '../cells/Cell';

import RootChange       from '../changes/RootChange';
import ChangeCollection from '../changes/ChangeCollection'


export default Class.create({

    Extends: Events,

    constructor: function Graph(root) {

        var that = this;

        that.changes = new ChangeCollection(that);

        if (root) {
            that.setRoot(root);
        } else {
            that.clear();
        }
    },

    clear: function () {
        return this.setRoot(this.createRoot());
    },

    isAncestor(parent, child) {

        if (!parent || !child) {
            return false;
        }

        while (child && child !== parent) {
            child = child.parent;
        }

        return child === parent;
    },

    contains(cell) {
        return this.isAncestor(this.root, cell);
    },

    getCellById(id) {
        return this.cells ? this.cells[id] : null;
    },

    createCellId() {
        var that = this;
        var id = that.nextId;

        if (!id) {
            id = that.nextId = 0;
        }

        that.nextId += 1;

        return 'cell-' + id;
    },

    getAncestors(child) {

        var that = this;
        var result = [];
        var parent = child ? child.parent : null;

        if (parent) {
            result.push(parent);
            result = result.concat(that.getAncestors(parent));
        }

        return result;
    },

    getDescendants(parent) {

        var that = this;
        var result = [];

        parent = parent || that.getRoot();
        parent.eachChild(function (child) {
            result.push(child);
            result = result.concat(that.getDescendants(child));
        });

        return result;
    },

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
    },


    // root
    // ----

    isRoot: function (cell) {
        return cell && this.root === cell;
    },

    createRoot: function () {
        var root = new Cell();

        root.insertChild(new Cell());

        return root;
    },

    getRoot: function (cell) {

        var root = cell || this.root;

        if (cell) {
            while (cell) {
                root = cell;
                cell = cell.parent;
            }
        }

        return root;
    },

    setRoot: function (root) {
        return this.digest(new RootChange(this, root));
    },

    rootChanged(newRoot) {

        var that = this;
        var oldRoot = that.root;

        that.root = newRoot;
        that.cells = null;
        that.nextId = 0;
        that.cellAdded(newRoot);

        return oldRoot;
    },

    // Layers
    // ------

    isLayer(cell) {
        return cell && this.isRoot(cell.parent);
    },

    getLayers() {
        return this.getRoot().children || [];
    },

    // child
    // -----

    getParent(cell) {
        return cell ? cell.parent : null;
    },

    add(parent, child, index) {

        var that = this;

        if (parent && child && parent !== child) {

            if (isNullOrUndefined(index)) {
                index = parent.getChildCount();
            }

            var parentChanged = parent !== child.parent;

            that.digest(new ChildChange(that, parent, child, index));

            // move the links into the nearest common ancestor of its terminals
            if (that.maintainEdgeParent && parentChanged) {
                that.updateLinkParents(child);
            }
        }

        return that;
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

    childChanged(cell, newParent, newIndex) {

        var that = this;
        var oldParent = cell.parent;

        if (newParent) {
            if (newParent !== oldParent || oldParent.getChildIndex(cell) !== newIndex) {
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
    },

    linkChanged(link, newNode, isSource) {
        var oldNode = link.getNode(isSource);

        if (newNode) {
            newNode.insertLink(link, isSource);
        } else if (oldNode) {
            oldNode.removeLink(link, isSource);
        }

        return oldNode;
    },

    getChildNodes(parent) {
        return this.getChildCells(parent, true, false);
    },

    getChildLinks(parent) {
        return this.getChildCells(parent, false, true);
    },

    getChildCells(parent, isNode, isLink) {
        return parent ? parent.filterChild(function (child) {
            return (isNode && child.isNode) || (isLink && child.isLink);
        }) : [];
    },


    // update
    // ------

    digest(change) {

        var that = this;

        change.digest();

        that.beginUpdate();
        that.changes.add(change);
        that.endUpdate();

        return that;
    },

    beginUpdate() {

        var that = this;

        if (!that.updateLevel) {
            that.updateLevel = 0;
        }

        that.updateLevel += 1;
        that.trigger('beginUpdate');

        if (that.updateLevel === 1) {
            that.trigger('startEdit');
        }
    },

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

            // 触发重绘
            if (that.endingUpdate && changeCollection.hasChange()) {
                changeCollection.notify().clear();
            }

            that.endingUpdate = false;
        }
    }
});