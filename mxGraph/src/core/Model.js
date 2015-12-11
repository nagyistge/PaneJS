import {
    each,
    indexOf,
    isNullOrUndefined,
    isUndefined,
    isNumeric
} from '../common/utils';

import Class            from '../common/class';
import Cell             from '../cell/Cell';
import cellRoute        from '../cell/route';
import objectIdentity   from '../common/objectIdentity';
import Point            from '../lib/Point'
// events
import aspect           from '../events/aspect';
import EventSource      from '../events/EventSource';
// changes
import RootChange       from '../changes/RootChange';
import ChildChange      from '../changes/ChildChange';
import ValueChange      from '../changes/ValueChange';
import StyleChange      from '../changes/StyleChange';
import VisibleChange    from '../changes/VisibleChange';
import TerminalChange   from '../changes/TerminalChange';
import GeometryChange   from '../changes/GeometryChange';
import CollapseChange   from '../changes/CollapseChange';
import ChangeCollection from '../changes/ChangeCollection';


export default Class.create({

    Extends: EventSource,  // event
    Implements: aspect,    // AOP

    // 配置项
    createIds: true,
    prefix: '',
    postfix: '',
    maintainEdgeParent: true,

    constructor: function Model(root) {

        var that = this;

        that.nextId = 0;
        that.updateLevel = 0;
        that.endingUpdate = false;

        that.changeCollection = new ChangeCollection(that);

        if (root) {
            that.setRoot(root);
        } else {
            that.clear();
        }
    },

    clear() {
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

    createId() {
        var that = this;
        var id = that.nextId;

        that.nextId += 1;

        return that.prefix + id + that.postfix;
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

    // Root
    // ----

    isRoot(cell) {
        return cell && this.root === cell;
    },

    createRoot() {
        var root = new Cell();

        root.insertChild(new Cell());

        return root;
    },

    getRoot(cell) {

        var root = cell || this.root;

        if (cell) {
            while (cell) {
                root = cell;
                cell = cell.parent;
            }
        }

        return root;
    },

    setRoot(root) {
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

            var id = cell.id;

            if (!id && that.createIds) {
                id = that.createCellId(cell);
            }

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
    },

    linkChanged(link, newNode, isSource) {
        var oldNode = link.getNode(isSource);

        if (newNode) {
            newNode.addLink(link, isSource);
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

    // link
    // ----

    getTerminal(link, isSource) {
        return link ? link.getTerminal(isSource) : null;
    },

    setTerminal(link, node, isSource) {

        var that = this;
        var terminalChanged = node !== link.getTerminal(isSource);
        that.digest(new TerminalChange(that, link, node, isSource));

        if (that.maintainEdgeParent && terminalChanged) {
            that.updateLinkParent(link, that.getRoot());
        }

        return that;
    },

    terminalChanged(link, node, isSource) {

        var previous = link.getTerminal(isSource);

        if (node) {
            node.addLink(link, isSource);
        } else if (previous) {
            previous.removeLink(link, isSource);
        }

        return previous;
    },

    getDirectedLinkCount(cell, outgoing, ignoredEdge) {
        var count = 0;

        cell.eachLink(function (link) {
            if (link !== ignoredEdge && link.getTerminal(outgoing) === cell) {
                count++;
            }
        });

        return count;
    },

    getConnections(cell) {
        return this.getLinks(cell, true, true, false);
    },

    getIncomingLinks(cell) {
        return this.getLinks(cell, true, false, false);
    },

    getOutgoingLinks(cell) {
        return this.getLinks(cell, false, true, false);
    },

    getLinks(cell, incoming, outgoing, includeLoops) {
        return cell.filterLink(function (link) {
            var source = link.source;
            var target = link.target;

            if (source !== target) {
                if ((incoming && target === cell) ||
                    (outgoing && source === cell)) {
                    return true;
                }
            } else {
                if (includeLoops) {
                    return true;
                }
            }
        });
    },

    // Return all links between the given source and target pair.
    // If directed is true, then only links from the source to the target
    // are returned, otherwise, all edges between the two cells are returned.
    getLinksBetween(source, target, directed) {
        var tmp1 = source.getLinkCount();
        var tmp2 = target.getLinkCount();

        // use the smaller array of connected edges for searching
        var terminal = tmp1 < tmp2 ? source : target;

        return terminal.filterLink(function (link) {
            var src = link.source;
            var trg = link.target;

            var directedMatch = src == source && trg == target;
            var oppositeMatch = trg == source && src == target;

            return directedMatch || (!directed && oppositeMatch);
        });
    },

    getOpposites(links, terminal, isSource, isTarget) {
        var result = [];

        links && each(links, function (link) {
            var source = link.source;
            var target = link.target;

            if (source === terminal && target && target !== terminal && isTarget) {
                result.push(target);
            } else if (target === terminal && source && source !== terminal && isSource) {
                result.push(source);
            }
        });

        return result;
    },

    getTopmostCells(cells) {
        var result = [];

        cells && each(cells, function (cell) {

            var topmost = true;
            var parent = cell.parent;

            while (parent) {
                if (indexOf(cells, parent) >= 0) {
                    topmost = false;
                    break;
                }

                parent = parent.parent;
            }

            if (topmost) {
                result.push(cell);
            }
        });

        return result;
    },


    // value
    // -----
    getValue(cell) {
        return cell ? cell.value : null;
    },

    setValue(cell, value) {
        return this.digest(new ValueChange(this, cell, value));
    },

    valueChanged(cell, value) {
        var previous = cell.value;
        cell.value = value;
        return previous;
    },


    // geometry
    // --------

    getGeometry(cell) {
        return cell ? cell.geometry : null;
    },

    setGeometry(cell, geometry) {

        var that = this;

        if (geometry !== cell.geometry) {
            that.digest(new GeometryChange(that, cell, geometry));
        }

        return that;
    },

    geometryChanged(cell, geometry) {
        var previous = cell.geometry;
        cell.geometry = geometry;
        return previous;
    },


    // style
    // -----

    getStyle(cell) {
        return cell ? cell.style : null;
    },

    setStyle(cell, style) {

        var that = this;

        if (style !== cell.style) {
            that.digest(new StyleChange(that, cell, style));
        }

        return that;
    },

    styleChanged(cell, style) {
        var previous = cell.geometry;
        cell.style = style;
        return previous;
    },


    // collapse
    // --------

    isCollapsed(cell) {
        return cell ? cell.collapsed : false;
    },

    setCollapsed(cell, collapsed) {

        var that = this;

        if (collapsed !== cell.collapsed) {
            that.digest(new CollapseChange(that, cell, collapsed));
        }

        return that;
    },

    collapseChanged(cell, collapsed) {
        var previous = cell.collapsed;
        cell.collapsed = collapsed;
        return previous;
    },


    // visible
    // -------

    isVisible(cell) {
        return cell ? cell.visible : false
    },

    setVisible(cell, visible) {

        var that = this;

        if (visible !== cell.visible) {
            that.digest(new VisibleChange(that, cell, visible));
        }

        return that;
    },

    visibleChanged(cell, visible) {
        var previous = cell.visible;
        cell.visible = visible;
        return previous;
    },


    // update
    // ------

    digest(change) {

        var that = this;

        change.digest();

        that.beginUpdate();
        that.changeCollection.add(change);
        that.endUpdate();

        return that;
    },

    beginUpdate() {

        var that = this;
        that.updateLevel += 1;
        that.emit('beginUpdate');

        if (that.updateLevel === 1) {
            that.emit('startEdit');
        }
    },

    endUpdate() {

        var that = this;

        that.updateLevel -= 1;

        if (that.updateLevel === 0) {
            that.emit('endEdit');
        }

        if (!that.endingUpdate) {

            var changeCollection = that.changeCollection;

            that.endingUpdate = that.updateLevel === 0;
            that.emit('endUpdate', {changes: changeCollection.changes});

            // 触发重绘
            if (that.endingUpdate && changeCollection.hasChange()) {
                changeCollection.notify().clear();
            }

            that.endingUpdate = false;
        }
    },

    // clone
    // -----

    cloneCell(cell) {
        return cell ? this.cloneCells([cell], true) : null;
    },

    cloneCells(cells, recurse) {

        var that = this;
        var result = [];
        var mapping = {};

        cells && each(cells, function (cell) {
            var cloned = cell ? that.doCellClone(cell, mapping, recurse) : null;
            result.push(cloned);
        });

        each(result, function (cloned, index) {
            cloned && that.restoreClone(cloned, cells[index], mapping);
        });

        return result;
    },

    doCellClone(cell, mapping, recurse) {

        var that = this;
        var cloned = cell.clone();

        // 用被克隆的对象来生成唯一 ID
        mapping[objectIdentity.get(cell)] = cloned;

        if (recurse) {
            cell.eachChild(function (child) {
                var cloneChild = that.doCellClone(child, mapping, recurse);
                cloned.insertChild(cloneChild);
            });
        }

        return cloned;
    },

    restoreClone(cloned, cell, mapping) {

        var that = this;
        var temp;

        var source = cell.source;
        if (source) {
            temp = mapping[objectIdentity.get(source)];
            if (temp) {
                temp.addLink(cloned, true);
            }
        }

        var target = cell.target;
        if (target) {
            temp = mapping[objectIdentity.get(target)];
            if (temp) {
                temp.addLink(cloned, false);
            }
        }

        cloned.eachChild(function (child, index) {
            that.restoreClone(child, cell.getChildAt(index), mapping);
        });
    }
});
