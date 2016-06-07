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

        this.scrollParent = utils.getScrollParent(this.getPaper().svg);

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

            let scrollParent = this.scrollParent

            x = utils.clamp(x, scrollParent.scrollLeft, scrollParent.clientWidth + scrollParent.scrollLeft - this.bounds.width);
            y = utils.clamp(y, scrollParent.scrollTop, scrollParent.clientHeight + scrollParent.scrollTop - this.bounds.height);

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

            let scrollParent = this.scrollParent
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

    autoScrollPreview() {

        let scrollParent = this.scrollParent
        let scrollable   = scrollParent.scrollWidth > scrollParent.clientWidth
            || scrollParent.scrollHeight > scrollParent.clientHeight;

        if (scrollable) {

            let sense    = this.options.sense;
            let bounds   = this.bounds;
            let scrolled = false;

            if ((scrollParent.scrollLeft - bounds.x) === 0 && scrollParent.scrollLeft > 0) {

                scrolled = true;

                bounds.x                = Math.max(0, bounds.x - sense);
                scrollParent.scrollLeft = Math.max(0, scrollParent.scrollLeft - sense);

            } else if (((bounds.x + bounds.width) - (scrollParent.scrollLeft + scrollParent.clientWidth)) === 0 && scrollParent.scrollLeft < scrollParent.scrollWidth - scrollParent.clientWidth) {

                scrolled = true;

                bounds.x                = Math.min(scrollParent.scrollWidth - bounds.width, bounds.x + sense);
                scrollParent.scrollLeft = Math.min(scrollParent.scrollWidth - scrollParent.clientWidth, scrollParent.scrollLeft + sense);

            } else if ((scrollParent.scrollTop - bounds.y) === 0 && scrollParent.scrollTop > 0) {

                scrolled = true;

                bounds.y               = Math.max(0, bounds.y - sense);
                scrollParent.scrollTop = Math.max(0, scrollParent.scrollTop - sense);

            } else if (((bounds.y + bounds.height) - (scrollParent.scrollTop + scrollParent.clientHeight)) === 0 && scrollParent.scrollTop < scrollParent.scrollHeight - scrollParent.clientHeight) {

                scrolled = true;

                bounds.y               = Math.min(scrollParent.scrollHeight - bounds.height, bounds.y + sense);
                scrollParent.scrollTop = Math.min(scrollParent.scrollHeight - scrollParent.clientHeight, scrollParent.scrollTop + sense);
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

            elem.style.width  = bounds.width + 'px';
            elem.style.height = bounds.height + 'px';
        }

        return this;
    }

    autoScrollSelectionRect(localX, localY) {

        let scrollParent  = this.scrollParent;
        let scrollable = scrollParent.scrollWidth > scrollParent.clientWidth
            || scrollParent.scrollHeight > scrollParent.clientHeight;

        if (scrollable) {

            let sense    = this.options.sense;
            let bounds   = this.bounds;
            let scrolled = false;

            if (localX < scrollParent.scrollLeft && scrollParent.scrollLeft > 0) {

                // scroll left

                scrolled = true;
                localX -= sense;

                bounds.x             = Math.max(0, bounds.x - sense);
                scrollParent.scrollLeft = Math.max(0, scrollParent.scrollLeft - sense);

            } else if (localX > scrollParent.scrollLeft + scrollParent.clientWidth && scrollParent.scrollLeft < scrollParent.scrollWidth - scrollParent.clientWidth) {

                // scroll right

                scrolled = true;
                localX += sense;

                bounds.width         = Math.min(scrollParent.scrollWidth - bounds.x, bounds.width + sense);
                scrollParent.scrollLeft = Math.min(scrollParent.scrollWidth - scrollParent.clientWidth, scrollParent.scrollLeft + sense);

            } else if (localY < scrollParent.scrollTop && scrollParent.scrollTop > 0) {

                // scroll top

                scrolled = true;
                localY -= sense;

                bounds.y            = Math.max(0, bounds.y - sense);
                scrollParent.scrollTop = Math.max(0, scrollParent.scrollTop - sense);

            } else if (localY > scrollParent.scrollTop + scrollParent.clientHeight && scrollParent.scrollTop < scrollParent.scrollHeight - scrollParent.clientHeight) {

                // scroll bottom

                scrolled = true;
                localY += sense;

                bounds.height       = Math.min(scrollParent.scrollHeight - bounds.y, bounds.height + sense);
                scrollParent.scrollTop = Math.min(scrollParent.scrollHeight - scrollParent.clientHeight, scrollParent.scrollTop + sense);
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
