import {
    each,
    isNullOrUndefined,
    isUndefined,
    isNumeric
} from '../common/utils';

import Class from '../common/class';
import Cell  from '../cell/Cell';
// events
import aspect      from '../events/aspect';
import eventNames  from '../events/eventNames';
import EventSource from '../events/EventSource';
// changes
import RootChange       from '../changes/RootChange';
import ChildChange      from '../changes/ChildChange';
import TerminalChange   from '../changes/TerminalChange';
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

    clear: function () {
        var that = this;
        that.setRoot(that.createRoot());
        return that;
    },

    isAncestor: function (parent, child) {
        while (child && child !== parent) {
            child = child.parent;
        }

        return child === parent;
    },

    contains: function (cell) {
        return this.isAncestor(this.root, cell);
    },

    getCellById: function (id) {
        return this.cells ? this.cells[id] : null;
    },

    // 按照层级获取所有父节点
    getParents: function (child) {

        var that = this;
        var result = [];
        var parent = child ? child.parent : null;

        if (parent) {
            result.push(parent);
            result = result.concat(that.getParents(parent));
        }

        return result;
    },

    // 获取子孙节点
    getDescendants: function (parent) {

        var that = this;
        var result = [];

        parent = parent || that.getRoot();
        parent.eachChild(function (child) {
            result.push(child);
            result = result.concat(that.getDescendants(child));
        });

        return result;
    },

    // Root
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
        var that = this;
        that.digest(new RootChange(that, root));
        return that;
    },

    // RootChange 的回调处理
    rootChanged: function (newRoot) {

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
    isLayer: function (cell) {
        return cell && this.isRoot(cell.parent);
    },

    // 获取所有图层
    getLayers: function () {
        // 根节点的所有子节点就是图层
        return this.getRoot().children || [];
    },

    // Changes
    // -------


    //
    //

    add: function (parent, child, index) {

        var that = this;

        if (parent && child && parent !== child) {

            if (isNullOrUndefined(index)) {
                index = parent.getChildCount();
            }

            var parentChanged = parent !== child.parent;

            that.digest(new ChildChange(that, parent, child, index));

            // TODO: maintainEdgeParent
            if (that.maintainEdgeParent && parentChanged) {
                that.updateEdgeParents(child);
            }
        }

        return that;
    },

    remove: function (cell) {
        if (cell == this.root) {
            this.setRoot(null);
        }
        else if (this.getParent(cell) != null) {
            this.execute(new ChildChange(this, null, cell));
        }

        return cell;
    },

    // cell 添加到画布后的处理工作
    cellAdded: function (cell) {

        var that = this;

        if (cell) {

            var id = cell.id;

            if (!id && that.createIds) {
                id = that.createId(cell);
            }

            // 去重
            if (id) {
                var collision = that.getCellById(id);

                if (collision !== cell) {
                    while (collision) {
                        id = that.createId(cell);
                        collision = that.getCellById(id);
                    }

                    if (!that.cells) {
                        that.cells = {};
                    }

                    cell.id = id;
                    that.cells[id] = cell;
                }
            }

            // 修正 nextId
            if (isNumeric(id)) {
                that.nextId = Math.max(that.nextId, id);
            }

            cell.eachChild(that.cellAdded, that);
        }
    },

    // cell 移除画布后的清理工作
    cellRemoved: function (cell) {

        var that = this;
        var cells = that.cells;

        if (cell && cells) {

            if (cell.isNode) {
                cell.eachChild(function (child) {
                    that.cellRemoved(child);
                });
            }

            var id = cell.id;
            if (cells && !isUndefined(id)) {
                delete cells[id];
            }
        }
    },

    updateEdgeParents: function (cell, root) {},

    updateEdgeParent: function (edge, root) {},

    getOrigin: function (cell) {},

    getNearestCommonAncestor: function (cell1, cell2) {},

    // ChildChange 的回调处理
    childChanged: function (cell, newParent, newIndex) {

        var that = this;
        var oldParent = cell.parent;

        if (newParent) {
            if (newParent !== oldParent || oldParent.getChildIndex(cell) !== newIndex) {
                newParent.insertChild(cell, newIndex);
            }
        } else if (oldParent) {
            oldParent.removeChild(cell);
        }

        // Checks if the previous parent was already in the
        // model and avoids calling cellAdded if it was.
        if (newParent && !that.contains(oldParent)) {
            that.cellAdded(cell);
        } else if (!newParent) {
            that.cellRemoved(cell);
        }

        return oldParent;
    },

    // ChildChange 的回调处理，处理连线连接的节点
    linkChanged: function (link, newNode, isSource) {
        var oldNode = link.getNode(isSource);

        if (newNode) {
            newNode.insertLink(link, isSource);
        } else if (oldNode) {
            oldNode.removeLink(link, isSource);
        }

        return oldNode;
    },


    getTerminal: function (link, isSource) {
        return link ? link.getTerminal(isSource) : null;
    },

    setTerminal: function (link, node, isSource) {
        var terminalChanged = node !== this.getTerminal(link, isSource);
        this.digest(new TerminalChange(this, link, node, isSource));

        if (this.maintainEdgeParent && terminalChanged) {
            this.updateEdgeParent(link, this.getRoot());
        }

        return node;
    },

    // 连线的起点节点或终点节点改变后
    terminalForCellChanged: function (link, node, isSource) {
        var previous = this.getTerminal(link, isSource);

        if (node) {
            node.insertLink(link, isSource);
        } else if (previous) {
            previous.removeLink(link, isSource);
        }

        return previous;
    },


    createId: function () {
        var that = this;
        var id = that.nextId;

        that.nextId += 1;

        return that.prefix + id + that.postfix;
    },

    digest: function (change) {

        var that = this;

        change.digest();

        that.beginUpdate();
        that.changeCollection.add(change);
        that.endUpdate();

        return that;
    },

    beginUpdate: function () {

        var that = this;
        that.updateLevel += 1;
        that.emit(eventNames.BEGIN_UPDATE);

        if (that.updateLevel === 1) {
            that.emit(eventNames.START_EDIT);
        }
    },

    endUpdate: function () {

        var that = this;

        that.updateLevel -= 1;

        if (that.updateLevel === 0) {
            that.emit(eventNames.END_EDIT);
        }

        if (!that.endingUpdate) {

            var changeCollection = that.changeCollection;

            that.endingUpdate = that.updateLevel === 0;
            that.emit(eventNames.END_UPDATE, {changes: changeCollection.changes});

            // 触发重绘
            if (that.endingUpdate && changeCollection.hasChange()) {
                changeCollection.notify().clear();
            }

            that.endingUpdate = false;
        }
    }
});
