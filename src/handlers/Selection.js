import Handler from './Handler';
import VertexController from '../controllers/Vertex';
import * as utils from '../common/utils';

const eventHasModifierKey = utils.eventHasModifierKey;

class SelectHandler extends Handler {
    init(/* options */) {
        let that = this;
        let paper = that.paper;

        paper.selection = [];
        paper.on('cell:pointerDown', function (cell, view, e/* , x, y */) {
            that.executeIfEnabled(function () {
                that.selectCell(cell, eventHasModifierKey(e));
            });
        });
        paper.on('blank:pointerDown', function (e/* , x, y */) {
            that.executeIfEnabled(function () {
                if (!eventHasModifierKey(e)) {
                    that.clearSelection();
                }
            });
        });
        return that;
    }

    _selectCell(cell) {
        let that = this;
        let paper = that.paper;

        cell.vertexController = new VertexController(paper, {
            cell
        });
        cell.selected = true;
        paper.selection.push(cell);
        return that;
    }

    _unselectCell(cell) {
        let that = this;
        let paper = that.paper;
        let selection = paper.selection;

        if (utils.contains(selection, cell)) {
            paper.selection.splice(utils.indexOf(selection, cell), 1);
        }

        cell.vertexController.destroy();
        cell.selected = false;
        return that;
    }

    selectCell(cell, isMultiSelection) {
        let that = this;

        if (!isMultiSelection) {
            that.clearSelection();
        } else {
            return cell.selected ? that._unselectCell(cell) : that._selectCell(cell);
        }

        if (cell.selected) {
            return that;
        }

        that.clearSelection();
        that._selectCell(cell);

        return that;
    }

    clearSelection() {
        let that = this;
        let paper = that.paper;

        utils.forEach(paper.selection, function (selectedCell) {
            selectedCell.vertexController.destroy();
            selectedCell.selected = false;
        });
        paper.selection = [];
        return that;
    }
}

export default SelectHandler;
