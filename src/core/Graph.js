import {
    each,
    isUndefined,
    isNullOrUndefined
} from './common/utils';
import Class       from './common/class';
import EventSource from './events/EventSource';
import Stylesheet  from './styles/Stylesheet';
import View        from './View';
import Model       from './Model';
import Node        from './cells/Node';
import Link        from './cells/Link';
import Geometry    from './lib/Geometry';

export default Class.create({

    Extends: EventSource,

    constructor: function Graph(container, model, stylesheet) {

        var that = this;

        that.model = model || new Model();
        that.view = new View(that);
        that.stylesheet = stylesheet || new Stylesheet();

        if (container) {
            that.init(container);
        }

        that.view.revalidate();
    },

    init: function (container) {

        var that = this;

        that.container = container;
        that.view.init();
    },

    insertNode: function (parent, id, value, x, y, width, height, style, relative) {

        var that = this;
        var node = that.createNode(id, value, x, y, width, height, style, relative);

        return that.addNode(node, parent);
    },

    createNode: function (id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height, relative);
        return new Node(id, value, geometry, style)
    },

    addNode: function (node, parent, index) {
        return this.addCells([node], parent, index)[0];
    },

    insertLink: function () {},

    createLink: function () {},

    addLink: function (cell, parent) {},

    addCells: function (cells, parent, index, source, target) {

        var that = this;
        var model = that.model;

        parent = parent || that.getDefaultParent();
        index = isUndefined(index) ? parent.getChildCount() : index;

        model.beginUpdate();
        that.cellsAdded(cells, parent, index, source, target, false, true);
        model.endUpdate();

        return cells;
    },

    cellsAdded: function (cells, parent, index, source, target, absolute, constrain) {

        var that = this;
        var model = that.model;

        if (cells && parent && !isUndefined(index)) {
            model.beginUpdate();

            var parentState = absolute ? this.view.getState(parent) : null;
            var parentOrigin = parentState ? parentState.origin : null;

            each(cells, function (cell, i) {

                if (!cell) {
                    index -= 1;
                    return;
                }

                var previous = cell.parent;

                // TODO: Keeps the cell at its absolute location
                if (parentOrigin && cell !== parent && previous !== parent) {

                }

                // TODO: Decrements all following indices if cell is already in parent
                if (previous === parent && index + i > parent.getChildCount()) {

                }

                that.model.add(parent, cell, index + i);

                if (that.autoSizeCellsOnAdd) {
                    that.autoSizeCell(cell, true);
                }

                // TODO: Extends the parent or constrains the child
                //if (this.isExtendParentsOnAdd() && this.isExtendParent(cells[i])) {
                //    this.extendParent(cells[i]);
                //}

                // TODO: Additionally constrains the child after extending the parent
                if (constrain) {
                    //this.constrainChild(cells[i]);
                }

                // Sets the source terminal
                //if (source) {
                //    this.cellConnected(cells[i], source, true);
                //}

                // Sets the target terminal
                //if (target) {
                //    this.cellConnected(cells[i], target, false);
                //}

            });

            model.endUpdate();
        }
    },


    getCellStyle: function (cell) {

    },

    getCurrentRoot: function () {
        return this.view.currentRoot;
    },

    getDefaultParent: function () {

        var that = this;

        return that.getCurrentRoot()
            || that.defaultParent
            || that.model.getRoot().getChildAt(0);

    },

    // 一些便利方法
    // ----------

    getModel: function () {
        return this.model;
    },

    getView: function () {
        return this.view;
    },

    beginUpdate: function () {
        this.model.beginUpdate();
        return this;
    },

    endUpdate: function () {
        this.model.endUpdate();
        return this;
    },
});
