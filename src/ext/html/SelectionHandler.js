import * as utils from '../../common/utils';
import     vector from '../../common/vector';
import       Rect from '../../geometry/Rect';
import    Handler from '../../handlers/Handler';


class SelectHandler extends Handler {

    configure(options) {

        this.options = utils.merge({
            multi: true,
            region: true
        }, options);

        return this;
    }

    init() {

        this.previewElem = utils.createElement('div');
        this.rangeElem   = utils.createElement('div');

        utils.addClass(this.previewElem, 'pane-selection-preview');
        utils.addClass(this.rangeElem, 'pane-selection-range');

        this.selectedCells = [];
        this.startPosition = null;
        this.previewBounds = null;

        let paper = this.getPaper();

        paper.on('cell:pointerDown', this.onCellMouseDown.bind(this));
        paper.on('cell:pointerMove', this.onCellMouseMove.bind(this));
        paper.on('cell:pointerUp', this.onCellMouseUp.bind(this));
        paper.on('blank:pointerDown', this.onBlankMouseDown.bind(this));
        paper.on('blank:pointerMove', this.onBlankMouseMove.bind(this));
        paper.on('blank:pointerUp', this.onBlankMouseUp.bind(this));

        return this;
    }

    onCellMouseDown(cell, view, e) {

        if (this.isDisabled()) {
            return;
        }

        this.startPosition = {
            x: e.x,
            y: e.y
        };


        if (!cell.selected || this.selectedCells.length < 2) {
            this.selectCell(cell, view, utils.hasModifierKey(e));
        } else {
            this.lazyCheck = true;
        }
    }

    onCellMouseMove(cell, view, e) {

        if (this.isDisabled()) {
            return;
        }

        if (!this.mouseMoving) {

            let bounds = null;

            utils.forEach(this.selectedCells, function (cell) {
                // only move node
                if (cell.isNode()) {
                    let rect = cell.getBBox();
                    if (rect) {
                        bounds = bounds ? bounds.union(rect) : rect;
                    }
                }
            });

            if (bounds) {

                utils.setTranslate(this.previewElem, bounds.x, bounds.y);

                this.previewElem.style.width  = bounds.width + 'px';
                this.previewElem.style.height = bounds.height + 'px';

                this.previewBounds = bounds;

                utils.toggleClass(this.previewElem, 'single', this.getSelectedNodesCount() === 1);

                this.getContainerBounds();
                this.showPreview();
            }

            this.mouseMoving = true;
        }

        if (this.previewBounds) {

            let x = this.previewBounds.x + e.x - this.startPosition.x;
            let y = this.previewBounds.y + e.y - this.startPosition.y

            x = utils.clamp(x, 0, this.containerBounds.width - this.previewBounds.width);
            y = utils.clamp(y, 0, this.containerBounds.height - this.previewBounds.height);

            this.dx = x - this.previewBounds.x;
            this.dy = y - this.previewBounds.y;

            utils.setTranslate(this.previewElem, x, y);
        }

        return this;
    }

    onCellMouseUp(cell, view, e) {

        if (this.isDisabled()) {
            return;
        }

        if (this.mouseMoving) {

            if (this.dx !== 0 || this.dy !== 0) {

                let model = this.getModel();

                model.beginUpdate();

                utils.forEach(this.selectedCells, function (cell) {
                    if (cell.isNode()) {

                        let position = cell.getPosition();

                        cell.setPosition({
                            x: position.x + this.dx,
                            y: position.y + this.dy,
                            relative: position.relative === true
                        });
                    }
                }, this);

                model.endUpdate();
            }

            this.hidePreview();

        } else {
            if (this.lazyCheck) {
                this.selectCell(cell, view, false);
            }
        }

        this.mouseMoving = false;
        this.lazyCheck   = false;
    }

    onBlankMouseDown(e, x, y) {

        if (this.isDisabled()) {
            return;
        }

        this.startPosition = { x, y };
    }

    onBlankMouseMove(e, x, y) {

        if (!this.mouseMoving) {

            this.showRange();
            this.getContainerBounds();

            this.mouseMoving = true;
        }

        if (this.mouseMoving) {

            let width  = Math.abs(x - this.startPosition.x);
            let height = Math.abs(y - this.startPosition.y);

            if (x > this.startPosition.x) {
                x = this.startPosition.x;

                let maxWidth = this.containerBounds.width - x;
                if (maxWidth < width) {
                    width = maxWidth;
                }
            } else {
                if (width > this.startPosition.x) {
                    width = this.startPosition.x;
                    x     = 0;
                }
            }

            if (y > this.startPosition.y) {

                y = this.startPosition.y;

                let maxHeight = this.containerBounds.height - y;
                if (maxHeight < height) {
                    height = maxHeight;
                }
            } else {

                if (height > this.startPosition.y) {
                    height = this.startPosition.y;
                    y      = 0;
                }
            }

            utils.setTranslate(this.rangeElem, x, y);

            this.rangeElem.style.width  = width + 'px';
            this.rangeElem.style.height = height + 'px';

            this.areaBounds = {
                x,
                y,
                width,
                height
            };
        }
    }

    onBlankMouseUp(e) {

        if (!utils.hasModifierKey(e)) {
            this.clearSelection();
        }

        if (this.mouseMoving && this.areaBounds) {
            this.selectCellInArea(this.areaBounds);
        }

        this.hideRange();

        this.areaBounds  = null;
        this.mouseMoving = false;
    }

    hidePreview() {

        utils.removeElement(this.previewElem);

        return this;
    }

    showPreview() {

        var paper = this.getPaper();
        if (paper && paper.HTMLDrawPane) {
            paper.HTMLDrawPane.appendChild(this.previewElem);
        }

        return this;
    }

    hideRange() {

        utils.removeElement(this.rangeElem);

        return this;
    }

    showRange() {

        var paper = this.getPaper();
        if (paper && paper.HTMLDrawPane) {
            paper.HTMLDrawPane.appendChild(this.rangeElem);
        }

        return this;
    }

    getSelectedNodesCount() {

        var count = 0;

        utils.forEach(this.selectedCells, function (cell) {
            if (cell.isNode()) {
                count++;
            }
        });

        return count;
    }

    getContainerBounds() {

        let container = this.getPaper().container;

        this.containerBounds = {
            x: 0,
            y: 0,
            width: container.clientWidth || container.offsetWidth,
            height: container.clientHeight || container.offsetHeight
        };
    }

    selectCellInArea(area) {

        let paper = this.getPaper();
        let model = this.getModel();
        let cells = model && model.findCellInArea(Rect.fromRect(area));

        utils.forEach(cells, function (cell) {
            this.setSelected(cell, paper.getView(cell), true);
        }, this);

        return this;
    }

    selectCell(cell, view, multi) {

        if (multi) {
            this.setSelected(cell, view, !cell.selected);
        } else {
            this.clearSelection()
                .setSelected(cell, view, true);
        }

        return this;
    }

    setSelected(cell, view, selected) {

        selected = !!selected;

        if (selected !== cell.selected) {

            cell.selected = selected;

            if (selected) {
                this.selectedCells.push(cell);
            } else {
                if (utils.contains(this.selectedCells, cell)) {
                    this.selectedCells.splice(utils.indexOf(this.selectedCells, cell), 1);
                }

                cell.selected = false;
            }

            utils.toggleClass(view.elem, 'selected', cell.selected);
        }

        return this;
    }

    clearSelection() {

        let paper = this.getPaper();

        utils.forEach(this.selectedCells, function (cell) {

            let view = paper.getView(cell);
            if (view) {
                utils.removeClass(view.elem, 'selected');
            }

            cell.selected = false;
        });

        this.selectedCells = [];

        return this;
    }
}


// exports
// -------

export default SelectHandler;
