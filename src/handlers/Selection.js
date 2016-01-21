import Handler from './Handler';
import vector from '../common/vector';
import VertexController from '../controllers/Vertex';
import * as utils from '../common/utils';

// TODO if cell is a link

const eventHasModifierKey = utils.eventHasModifierKey;

class SelectHandler extends Handler {
    init(options = {}) {
        let that = this;
        let paper = that.paper;
        let model = that.model;

        that.previewVel = vector('rect', {
            fill: 'none',
            'stroke-dasharray': '3px, 3px',
            stroke: 'black'
        });
        that.previewElem = that.previewVel.node;
        paper.controlPane.appendChild(that.previewElem);
        that.hidePreview();

        that.name = options.name || 'select';

        paper.selection = [];

        that.previousPosition = {
            x: 0,
            y: 0
        };
        paper.on('cell:pointerDown', function (cell, view, e/* , x, y */) {
            that.executeIfEnabled(function () {
                that.previousPosition = {
                    x: e.x,
                    y: e.y
                };
                that.selectCell(cell, eventHasModifierKey(e));
            });
        });
        paper.on('cell:pointerMove', function (cell, view, e/* , x, y */) {
            that.executeIfEnabled(function () {
                that.showPreview()
                    .redrawPreview(e);
            });
        });
        paper.on('cell:pointerUp', function (cell, view, e/* , x, y */) {
            that.executeIfEnabled(function () {
                let previousPosition = that.previousPosition;
                if (e.x !== previousPosition.x || e.y !== previousPosition.y) {
                    model.beginUpdate();
                    utils.forEach(paper.selection, function (c) {
                        let position = c.metadata.position;
                        model.setGeometry(c, {
                            position: {
                                x: position.x + (e.x - previousPosition.x),
                                y: position.y + (e.y - previousPosition.y),
                                relative: position.relative
                            }
                        });
                    });
                    model.endUpdate();
                    utils.forEach(paper.selection, function (c) {
                        c.vertexController.redraw();
                    });
                }
                that.hidePreview();
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

    hidePreview() {
        let that = this;

        that.previewVel.css({
            display: 'none'
        });
        return that;
    }

    showPreview() {
        let that = this;

        that.previewVel.css({
            display: ''
        });
        return that;
    }

    redrawPreview(position) {
        let that = this;
        let paper = that.paper;
        let selection = paper.selection;
        let previewVel = that.previewVel;

        if (selection.length) {
            let minP = {
                x: Number.MAX_VALUE,
                y: Number.MAX_VALUE
            };
            let maxP = {
                x: 0,
                y: 0
            };
            utils.forEach(selection, function (cell) {
                let view = paper.getView(cell);
                let bbox = view.vel.getBBox();
                if (bbox.x < minP.x) {
                    minP.x = bbox.x;
                }
                if (bbox.y < minP.y) {
                    minP.y = bbox.y;
                }
                if (bbox.x + bbox.width > maxP.x) {
                    maxP.x = bbox.x + bbox.width;
                }
                if (bbox.y + bbox.height > maxP.y) {
                    maxP.y = bbox.y + bbox.height;
                }
            });
            let previousPosition = that.previousPosition;
            previewVel.attr({
                x: minP.x + (position.x - previousPosition.x),
                y: minP.y + (position.y - previousPosition.y),
                width: maxP.x - minP.x,
                height: maxP.y - minP.y
            });
        }
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

    drawPreview() {
    }
}

export default SelectHandler;
