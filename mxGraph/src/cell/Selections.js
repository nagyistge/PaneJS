import {
    filter,
    indexOf,
} from '../common/utils';

import Base from '../lib/Base';
import SelectionChange from '../changes/SelectionChange';

export default Base.extend({

    constructor: function Selections(graph) {

        var that = this;

        that.graph = graph;
        that.cells = [];
        that.multiple = true;
    },

    isSelected(cell) {
        return cell ? indexOf(this.cells, cell) >= 0 : false;
    },

    isEmpty() {
        return this.cells.length === 0;
    },

    clear() {
        return this.changeSelection(null, this.cells);
    },

    setCell(cell) {
        return cell ? this.setCells([cell]) : this;
    },

    setCells(cells) {
        var that = this;

        if (cells) {

            if (!that.multiple) {
                cells = [that.getFirstSelectableCell(cells)];
            }

            var graph = that.graph;
            var temp = filter(cells, graph.isCellSelectable, graph);
            that.changeSelection(temp, that.cells);
        }

        return that;
    },

    addCell(cell) {
        return cell ? this.addCells([cell]) : this;
    },

    addCells(cells) {

        var that = this;

        if (cells) {
            var remove = null;

            if (!that.multiple) {
                remove = that.cells;
                cells = [that.getFirstSelectableCell(cells)];
            }

            var temp = filter(cells, function (item) {
                return !that.isSelected(item) && that.graph.isCellSelectable(item);
            });

            this.changeSelection(temp, remove);
        }

        return that;
    },

    getFirstSelectableCell(cells) {
        if (cells) {
            for (var i = 0, l = cells.length; i < l; i++) {
                if (this.graph.isCellSelectable(cells[i])) {
                    return cells[i];
                }
            }
        }

        return null;
    },

    removeCell(cell) {
        return cell ? this.removeCells([cell]) : this;
    },

    removeCells(cells) {

        var that = this;

        if (cells) {
            var removed = filter(cells, that.isSelected, that);
            that.changeSelection(null, removed);
        }

        return that;
    },

    changeSelection(added, removed) {

        if ((added && added.length && added[0]) ||
            (removed && removed.length && removed[0])) {

            var change = new SelectionChange(this, added, removed);
            change.digest();
            //var edit = new mxUndoableEdit(this, false);
            //edit.add(change);
            //this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
        }
    },

    cellAdded(cell) {

        var that = this;

        if (cell && !that.isSelected(cell)) {
            that.cells.push(cell);
        }

        return that;
    },

    cellRemoved(cell) {

        var that = this;

        if (cell) {
            var cells = that.cells;
            var index = indexOf(cells, cell);
            if (index >= 0) {
                cells.splice(index, 1);
            }
        }

        return that;
    }
});