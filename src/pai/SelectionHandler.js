import * as utils from '../common/utils';
import       Rect from '../geometry/Rect';
import    Handler from '../handlers/Handler';


class SelectHandler extends Handler {

    configure(options) {

        this.options = utils.merge({
            multi: true,
            area: true,
            delay: 30,
            sense: 10
        }, options);

        this.scrollParent = utils.getScrollParent(this.getPaper().svg);

        return this;
    }

    init() {

        this.previewRect   = utils.createElement('div');
        this.selectionRect = utils.createElement('div');

        utils.addClass(this.previewRect, 'pane-selection-preview');
        utils.addClass(this.selectionRect, 'pane-selection-rect');

        this.focusedCell   = null;
        this.movingCells   = [];
        this.selectedCells = [];

        this.origin = null;
        this.bounds = null;

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

        if (cell.isNode() && view.isPortElem(e.target)) {
            return;
        }

        this.moving = false;
        this.bounds = null;

        if (cell.isNode()) {
            this.origin      = { x: localX, y: localY };
            this.movingCells = cell.selected ? this.selectedCells : [cell];
        }
    }

    onCellMouseMove(cell, view, e, localX, localY) {

        if (this.isDisabled() || cell.isLink() || !this.origin) {
            return;
        }

        if (!this.moving) {

            let bounds = this.getPreviewBounds();
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

            let scrollParent = this.scrollParent;

            x = utils.clamp(x, scrollParent.scrollLeft, scrollParent.clientWidth + scrollParent.scrollLeft - this.bounds.width);
            y = utils.clamp(y, scrollParent.scrollTop, scrollParent.clientHeight + scrollParent.scrollTop - this.bounds.height);

            this.bounds.x = x;
            this.bounds.y = y;

            this.updatePreview();
            this.autoScrollPreview();
        }
    }

    onCellMouseUp(cell, view, e, localX, localY) {

        if (this.isDisabled()) {
            return;
        }

        let dx = 0;
        let dy = 0;

        if (this.origin) {
            dx = localX - this.origin.x;
            dy = localY - this.origin.y;
        }

        // movement
        if (this.moving && (dx !== 0 || dy !== 0)) {

            this.stopScrollTimer();
            this.hidePreview();

            let model = this.getModel();

            model.beginUpdate();

            utils.forEach(this.movingCells, function (node) {
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

            this.getPaper().trigger('cells:updatePosition', this.movingCells);

        } else {
            if (cell.isLink()) {
                this.clearSelection();
                this.setCellFocused(cell, view);
            } else {

                let multi = utils.hasModifierKey(e);
                this.selectCell(cell, view, multi);
                this.notifySelectionChange();

                if (!multi) {
                    this.setCellFocused(cell, view);
                }
            }
        }

        this.origin      = null;
        this.bounds      = null;
        this.moving      = false;
        this.movingCells = null;
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

            let scrollParent = this.scrollParent;
            let origin       = this.origin;

            let maxWidth;
            let maxHeight;

            if (x > origin.x) {

                x        = origin.x;
                maxWidth = scrollParent.scrollLeft + scrollParent.clientWidth - x;

                if (maxWidth < width) {
                    width = maxWidth;
                }

            } else {

                maxWidth = this.origin.x - scrollParent.scrollLeft;

                if (width > maxWidth) {
                    width = maxWidth;
                    x     = scrollParent.scrollLeft;
                }
            }

            if (y > this.origin.y) {

                y         = this.origin.y;
                maxHeight = scrollParent.scrollTop + scrollParent.clientHeight - y;

                if (maxHeight < height) {
                    height = maxHeight;
                }
            } else {

                maxHeight = this.origin.y - scrollParent.scrollTop;

                if (height > maxHeight) {
                    height = maxHeight;
                    y      = scrollParent.scrollTop;
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

    getPreviewBounds() {

        let bounds = null;

        utils.forEach(this.movingCells, function (node) {
            if (node.isNode()) {
                let rect = node.getBBox();
                if (rect) {
                    bounds = bounds ? bounds.union(rect) : rect;
                }
            }
        });

        return bounds;
    }

    autoScrollPreview() {

        if (this.isParentScrollable()) {

            let sense  = this.options.sense;
            let bounds = this.bounds;

            let x = bounds.x;
            let y = bounds.y;

            let width  = bounds.width;
            let height = bounds.height;

            let scrollParent = this.scrollParent;
            let scrollWidth  = scrollParent.scrollWidth;
            let scrollHeight = scrollParent.scrollHeight;
            let clientWidth  = scrollParent.clientWidth;
            let clientHeight = scrollParent.clientHeight;
            let scrollTop    = scrollParent.scrollTop;
            let scrollLeft   = scrollParent.scrollLeft;

            let scrolled = false;

            if (scrollLeft > 0 && x - scrollLeft <= 0) {

                scrolled = true;

                bounds.x   = Math.max(0, x - sense);
                scrollLeft = Math.max(0, scrollLeft - sense);

            } else if ((x + width) - (scrollLeft + clientWidth) === 0
                && scrollLeft < scrollWidth - clientWidth) {

                scrolled = true;

                bounds.x   = Math.min(scrollWidth - width, x + sense);
                scrollLeft = Math.min(scrollWidth - clientWidth, scrollLeft + sense);

            } else if ((scrollTop - y) === 0 && scrollTop > 0) {

                scrolled = true;

                bounds.y  = Math.max(0, y - sense);
                scrollTop = Math.max(0, scrollTop - sense);

            } else if (((y + height) - (scrollTop + clientHeight)) === 0
                && scrollTop < scrollHeight - clientHeight) {

                scrolled = true;

                bounds.y  = Math.min(scrollHeight - height, y + sense);
                scrollTop = Math.min(scrollHeight - clientHeight, scrollTop + sense);
            }

            if (scrolled) {
                scrollParent.scrollTop  = scrollTop;
                scrollParent.scrollLeft = scrollLeft;
                this.updatePreview();
                this.scrollTimer = setTimeout(this.autoScrollPreview.bind(this), this.options.delay);
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
                utils.setStyle(elem, {
                    width: bounds.width + 'px',
                    height: bounds.height + 'px'
                });

                utils.toggleClass(elem, 'single', this.movingCells.length === 1);
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
        if (paper && paper.htmlPane) {
            paper.htmlPane.appendChild(this.previewRect);
        }

        return this;
    }

    hideSelectionRect() {

        utils.removeElement(this.selectionRect);

        return this;
    }

    showSelectionRect() {

        let paper = this.getPaper();
        if (paper && paper.htmlPane) {
            paper.htmlPane.appendChild(this.selectionRect);
        }

        return this;
    }

    updateSelectionRect() {

        let elem   = this.selectionRect;
        let bounds = this.bounds;

        if (bounds && elem) {
            utils.setTranslate(elem, bounds.x, bounds.y);
            utils.setStyle(elem, {
                width: bounds.width + 'px',
                height: bounds.height + 'px'
            });
        }

        return this;
    }

    autoScrollSelectionRect(localX, localY) {

        if (this.isParentScrollable()) {

            let sense    = this.options.sense;
            let bounds   = this.bounds;
            let scrolled = false;

            let scrollParent = this.scrollParent;
            let scrollWidth  = scrollParent.scrollWidth;
            let scrollHeight = scrollParent.scrollHeight;
            let clientWidth  = scrollParent.clientWidth;
            let clientHeight = scrollParent.clientHeight;
            let scrollTop    = scrollParent.scrollTop;
            let scrollLeft   = scrollParent.scrollLeft;

            if (localX < scrollLeft && scrollLeft > 0) {
                // scroll left

                scrolled = true;
                localX -= sense;

                bounds.x   = Math.max(0, bounds.x - sense);
                scrollLeft = Math.max(0, scrollLeft - sense);

            } else if (localX > scrollLeft + clientWidth
                && scrollLeft < scrollWidth - clientWidth) {
                // scroll right

                scrolled = true;
                localX += sense;

                bounds.width = Math.min(scrollWidth - bounds.x, bounds.width + sense);
                scrollLeft   = Math.min(scrollWidth - clientWidth, scrollLeft + sense);

            } else if (localY < scrollTop && scrollTop > 0) {
                // scroll top

                scrolled = true;
                localY -= sense;

                bounds.y  = Math.max(0, bounds.y - sense);
                scrollTop = Math.max(0, scrollTop - sense);

            } else if (localY > scrollTop + clientHeight
                && scrollTop < scrollHeight - clientHeight) {
                // scroll bottom

                scrolled = true;
                localY += sense;

                bounds.height = Math.min(scrollHeight - bounds.y, bounds.height + sense);
                scrollTop     = Math.min(scrollHeight - clientHeight, scrollTop + sense);
            }

            if (scrolled) {
                scrollParent.scrollTop  = scrollTop;
                scrollParent.scrollLeft = scrollLeft;
                this.updateSelectionRect();
                this.scrollTimer = setTimeout(this.autoScrollSelectionRect.bind(this, localX, localY), this.options.delay);
            }
        }

        return this;
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

    isParentScrollable() {

        let scrollParent = this.scrollParent;

        return scrollParent.scrollWidth > scrollParent.clientWidth
            || scrollParent.scrollHeight > scrollParent.clientHeight;
    }

    notifyMoving() {

        this.getPaper().trigger('cells:moving', this.bounds, this.movingCells);
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
