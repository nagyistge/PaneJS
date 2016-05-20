import * as utils from '../common/utils';
import       Rect from '../geometry/Rect';
import    Handler from '../handlers/Handler';


class SelectHandler extends Handler {

    configure(options) {

        this.options = utils.merge({
            multi: true,
            area: true,
            sense: 50
        }, options);

        return this;
    }

    init() {

        this.previewRect   = utils.createElement('div');
        this.selectionRect = utils.createElement('div');

        utils.addClass(this.previewRect, 'pane-selection-preview');
        utils.addClass(this.selectionRect, 'pane-selection-rect');

        this.origin        = null;
        this.selectedCells = [];
        this.bounds        = null;
        this.bounds        = null;

        this.getPaper()
            .on('cell:pointerDown', this.onCellMouseDown.bind(this))
            .on('cell:pointerMove', this.onCellMouseMove.bind(this))
            .on('cell:pointerUp', this.onCellMouseUp.bind(this))
            .on('blank:pointerDown', this.onBlankMouseDown.bind(this))
            .on('blank:pointerMove', this.onBlankMouseMove.bind(this))
            .on('blank:pointerUp', this.onBlankMouseUp.bind(this));

        return this;
    }

    onCellMouseDown(cell, view, e, localX, localY) {

        if (this.isDisabled()) {
            return;
        }

        if (cell.isLink()) {

            this.clearSelection();
            this.setCellFocused(cell, view);

        } else if (!view.isPortElem(e.target)) {

            this.origin = { x: localX, y: localY };

            if (!cell.selected || this.selectedCells.length < 2) {

                let multi = utils.hasModifierKey(e);

                this.selectCell(cell, view, multi);
                this.notifySelectionChange();

                if (!multi) {
                    this.setCellFocused(cell, view);
                }
            } else {
                this.lazyCheck = true;
            }
        }
    }

    onCellMouseMove(cell, view, e, localX, localY) {

        if (this.isDisabled() || cell.isLink() || !this.origin) {
            return;
        }

        if (!this.moving) {

            let bounds = null;

            utils.forEach(this.selectedCells, function (node) {
                if (node.isNode()) {
                    let rect = node.getBBox();
                    if (rect) {
                        bounds = bounds ? bounds.union(rect) : rect;
                    }
                }
            });

            if (bounds) {
                this.bounds         = bounds;
                this.previewOriginX = bounds.x;
                this.previewOriginY = bounds.y;

                this.updatePreview(true);
                this.showPreview();
            }

            this.moving = true;
        }

        if (this.bounds) {

            this.stopScrollTimer();

            let x = this.previewOriginX + localX - this.origin.x;
            let y = this.previewOriginY + localY - this.origin.y;

            let container = this.getPaper().container;

            x = utils.clamp(x, container.scrollLeft, container.clientWidth + container.scrollLeft - this.bounds.width);
            y = utils.clamp(y, container.scrollTop, container.clientHeight + container.scrollTop - this.bounds.height);

            this.bounds.x = x;
            this.bounds.y = y;

            this.updatePreview();
            this.autoScrollPreview();
        }
    }

    onCellMouseUp(cell, view, e, localX, localY) {

        if (this.isDisabled() || cell.isLink() || !this.origin) {
            return;
        }

        if (this.moving) {

            this.stopScrollTimer();
            this.hidePreview();

            let dx = localX - this.origin.x;
            let dy = localY - this.origin.y;

            if (dx !== 0 || dy !== 0) {

                let model = this.getModel();

                model.beginUpdate();

                utils.forEach(this.selectedCells, function (node) {
                    if (node.isNode()) {

                        let position = node.getPosition();

                        node.setPosition({
                            x: position.x + dx,
                            y: position.y + dy,
                            relative: position.relative === true
                        });
                    }
                }, this);

                model.endUpdate();

                this.getPaper().trigger('cells:updatePosition', this.selectedCells);
            }
        } else {
            if (this.lazyCheck) {
                this.selectCell(cell, view, false);
                this.setCellFocused(cell, view);
                this.notifySelectionChange();
            }
        }

        this.origin    = null;
        this.bounds    = null;
        this.moving    = false;
        this.lazyCheck = false;
    }

    onBlankMouseDown(e, localX, localY) {

        if (this.isDisabled()) {
            return;
        }

        if (!this.options.area) {
            if (!utils.hasModifierKey(e)) {
                this.clearSelection();
            }
        } else {
            this.origin = { x: localX, y: localY };
        }
    }

    onBlankMouseMove(e, localX, localY) {

        if (this.isDisabled() || !this.origin) {
            return;
        }

        if (!this.moving) {
            this.showSelectionRect();
            this.moving = true;
        }

        if (this.moving) {

            let x      = localX;
            let y      = localY;
            let width  = Math.abs(x - this.origin.x);
            let height = Math.abs(y - this.origin.y);

            let container = this.getPaper().container;
            let origin    = this.origin;

            let maxWidth;
            let maxHeight;

            if (x > origin.x) {

                x        = origin.x;
                maxWidth = container.scrollLeft + container.clientWidth - x;

                if (maxWidth < width) {
                    width = maxWidth;
                }

            } else {

                maxWidth = this.origin.x - container.scrollLeft;

                if (width > maxWidth) {
                    width = maxWidth;
                    x     = container.scrollLeft;
                }
            }

            if (y > this.origin.y) {

                y         = this.origin.y;
                maxHeight = container.scrollTop + container.clientHeight - y;

                if (maxHeight < height) {
                    height = maxHeight;
                }
            } else {

                maxHeight = this.origin.y - container.scrollTop;

                if (height > maxHeight) {
                    height = maxHeight;
                    y      = container.scrollTop;
                }
            }

            this.bounds = { x, y, width, height };
            this.stopScrollTimer();
            this.updateSelectionRect();
            this.autoScrollSelectionRect(localX, localY);
        }
    }

    onBlankMouseUp(e) {

        if (this.isDisabled()) {
            return;
        }

        if (!utils.hasModifierKey(e)) {
            this.clearSelection();
        }

        if (this.moving && this.bounds) {

            // range selection

            this.stopScrollTimer();
            this.hideSelectionRect();
            this.selectCellsInRect(this.bounds);

        } else {
            // unFocus all cell
            this.setCellFocused(null);
        }

        this.notifySelectionChange();

        this.bounds = null;
        this.origin = null;
        this.moving = false;
    }

    stopScrollTimer() {

        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
            this.scrollTimer = 0;
        }

        return this;
    }

    autoScrollPreview() {

        let container  = this.getPaper().container;
        let scrollable = container.scrollWidth > container.clientWidth;

        if (scrollable) {

            let sense    = this.options.sense;
            let bounds   = this.bounds;
            let scrolled = false;

            if ((container.scrollLeft - bounds.x) === 0 && container.scrollLeft > 0) {

                scrolled = true;

                bounds.x             = Math.max(0, bounds.x - sense);
                container.scrollLeft = Math.max(0, container.scrollLeft - sense);

            } else if (((bounds.x + bounds.width) - (container.scrollLeft + container.clientWidth)) === 0 && container.scrollLeft < container.scrollWidth - container.clientWidth) {

                scrolled = true;

                bounds.x             = Math.min(container.scrollWidth - bounds.width, bounds.x + sense);
                container.scrollLeft = Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + sense);

            } else if ((container.scrollTop - bounds.y) === 0 && container.scrollTop > 0) {

                scrolled = true;

                bounds.y            = Math.max(0, bounds.y - sense);
                container.scrollTop = Math.max(0, container.scrollTop - sense);

            } else if (((bounds.y + bounds.height) - (container.scrollTop + container.clientHeight)) === 0 && container.scrollTop < container.scrollHeight - container.clientHeight) {

                scrolled = true;

                bounds.y            = Math.min(container.scrollHeight - bounds.height, bounds.y + sense);
                container.scrollTop = Math.min(container.scrollHeight - container.clientHeight, container.scrollTop + sense);
            }

            if (scrolled) {
                this.updatePreview();
                this.scrollTimer = setTimeout(this.autoScrollPreview.bind(this), 30);
            }
        }

        return this;
    }

    updatePreview(resize) {

        let elem   = this.previewRect;
        let bounds = this.bounds;

        if (bounds && elem) {

            utils.setTranslate(elem, bounds.x, bounds.y);

            if (resize) {
                elem.style.width  = bounds.width + 'px';
                elem.style.height = bounds.height + 'px';

                utils.toggleClass(elem, 'single', this.getSelectedNodesCount() === 1);
            }
        }


        return this;
    }

    hidePreview() {

        utils.removeElement(this.previewRect);

        return this;
    }

    showPreview() {

        let paper = this.getPaper();
        if (paper && paper.HTMLDrawPane) {
            paper.HTMLDrawPane.appendChild(this.previewRect);
        }

        return this;
    }

    hideSelectionRect() {

        utils.removeElement(this.selectionRect);

        return this;
    }

    showSelectionRect() {

        let paper = this.getPaper();
        if (paper && paper.HTMLDrawPane) {
            paper.HTMLDrawPane.appendChild(this.selectionRect);
        }

        return this;
    }

    updateSelectionRect() {

        let elem   = this.selectionRect;
        let bounds = this.bounds;

        if (bounds && elem) {

            utils.setTranslate(elem, bounds.x, bounds.y);

            elem.style.width  = bounds.width + 'px';
            elem.style.height = bounds.height + 'px';
        }

        return this;
    }

    autoScrollSelectionRect(localX, localY) {

        let container  = this.getPaper().container;
        let scrollable = container.scrollWidth > container.clientWidth;

        if (scrollable) {

            let sense    = this.options.sense;
            let bounds   = this.bounds;
            let scrolled = false;

            if (localX < container.scrollLeft && container.scrollLeft > 0) {

                // scroll left

                scrolled = true;
                localX -= sense;

                bounds.x             = Math.max(0, bounds.x - sense);
                container.scrollLeft = Math.max(0, container.scrollLeft - sense);

            } else if (localX > container.scrollLeft + container.clientWidth && container.scrollLeft < container.scrollWidth - container.clientWidth) {

                // scroll right

                scrolled = true;
                localX += sense;

                bounds.width         = Math.min(container.scrollWidth - bounds.x, bounds.width + sense);
                container.scrollLeft = Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + sense);

            } else if (localY < container.scrollTop && container.scrollTop > 0) {

                // scroll top

                scrolled = true;
                localY -= sense;

                bounds.y            = Math.max(0, bounds.y - sense);
                container.scrollTop = Math.max(0, container.scrollTop - sense);

            } else if (localY > container.scrollTop + container.clientHeight && container.scrollTop < container.scrollHeight - container.clientHeight) {

                // scroll bottom

                scrolled = true;
                localY += sense;

                bounds.height       = Math.min(container.scrollHeight - bounds.y, bounds.height + sense);
                container.scrollTop = Math.min(container.scrollHeight - container.clientHeight, container.scrollTop + sense);
            }

            if (scrolled) {
                this.updateSelectionRect();
                this.scrollTimer = setTimeout(this.autoScrollSelectionRect.bind(this, localX, localY), 30);
            }
        }

        return this;
    }

    getSelectedNodesCount() {

        let count = 0;

        utils.forEach(this.selectedCells, function (cell) {
            if (cell.isNode()) {
                count++;
            }
        });

        return count;
    }

    selectCellsInRect(area) {

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

    setCellFocused(cell, view) {

        if (this.focusedCell !== cell) {

            if (this.focusedCell) {

                let focusedView = this.getPaper().getView(this.focusedCell);
                if (focusedView) {
                    utils.removeClass(focusedView.elem, 'focused');
                }

                this.focusedCell = null;
            }

            if (cell && view) {
                utils.addClass(view.elem, 'focused');
                this.focusedCell = cell;
            }

            this.notifyFocusChange();
        }

        return this;
    }

    notifySelectionChange() {

        this.getPaper().trigger('cells:selectionChanged', this.selectedCells);
    }

    notifyFocusChange() {

        this.getPaper().trigger('cell:focusChanged', this.focusedCell);
    }
}


// exports
// -------

export default SelectHandler;
