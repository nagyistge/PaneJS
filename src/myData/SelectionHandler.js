import * as utils from '../common/utils';
import Rect       from '../geometry/Rect';
import Handler    from '../handlers/Handler';


const defaults = {
    multi: true,
    movement: true,
    areaSelect: true,
    areaSelectKey: 'shift',
    scrollDelay: 40,
    scrollSense: 18
};

const classNames = {
    cursorMove: 'pane-cursor-move',
    cursorMoving: 'pane-cursor-moving',
    cursorCross: 'pane-cursor-cross'
};

const scrollBarWidth = utils.getScrollBarWidth();

class SelectHandler extends Handler {

    configure(options) {

        this.options      = utils.merge({}, defaults, options);
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

        this.keyDownHandler = this.onKeyDown.bind(this);
        this.keyUpHandler   = this.onKeyUp.bind(this);

        utils.addEventListener(document.body, 'keydown', this.keyDownHandler);
        utils.addEventListener(document.body, 'keyup', this.keyUpHandler);

        this.switchMode(false);

        return this;
    }

    switchMode(isSelectMode) {

        this.isSelectMode = isSelectMode === true;
        this.switchModeClass(this.isSelectMode);

        return this;
    }

    switchModeClass(isSelectMode) {

        const wrap = this.getPaper().getWrap();
        this.setCursorStyle(wrap, isSelectMode);

        return this;
    }

    setCursorStyle(dom, isSelectMode) {

        utils.removeClass(dom, classNames.cursorMove);
        utils.removeClass(dom, classNames.cursorCross);

        if (isSelectMode === true) {
            utils.addClass(dom, classNames.cursorCross);
        } else if (isSelectMode === false) {
            utils.addClass(dom, classNames.cursorMove);
        }

        return this;
    }

    onKeyDown(e) {

        const areaSelectKey = this.options.areaSelectKey;

        if (this.options.areaSelect && areaSelectKey) {
            let method = 'has' + utils.ucFirst(areaSelectKey) + 'Key';
            if (utils[method]) {
                this.hasAreaSelectKey = utils[method](e);
            }
        }

        if (this.hasAreaSelectKey && !this.isSelectMode) {
            this.switchModeClass(true);
        }
    }

    onKeyUp() {

        if (this.hasAreaSelectKey && !this.isSelectMode) {
            this.switchModeClass(false);
            this.hasAreaSelectKey = false;
        }
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

            this.lastX = localX;
            this.lastY = localY;

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

            const bounds    = this.getScrollBounds();
            const direction = this.getMoveDirection(localX, localY);

            this.bounds.x = Math.round(utils.clamp(x, bounds.left, bounds.right - this.bounds.width));
            this.bounds.y = Math.round(utils.clamp(y, bounds.top, bounds.bottom - this.bounds.height));

            this.updatePreview();

            this.paper.trigger('cells:moving', this.movingCells, this.bounds);

            if (this.movingCells.length === 1) {
                this.paper.trigger('cell:moving', this.movingCells[0], this.bounds);
            }

            this.autoScrollPreview(direction);
        }
    }

    onCellMouseUp(cell, view, e, localX, localY) {

        if (this.isDisabled()) {
            return;
        }

        let dx = 0;
        let dy = 0;

        if (this.origin) {
            this.hidePreview();
            dx = localX - this.origin.x;
            dy = localY - this.origin.y;
        }

        // movement
        if (this.moving && (dx !== 0 || dy !== 0)) {

            dx = this.bounds.x - this.previewOriginX;
            dy = this.bounds.y - this.previewOriginY;

            this.stopScrollTimer();

            if (dx !== 0 || dy !== 0) {

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
            }

        } else {

            if (cell.isLink()) {
                this.clearSelection();
                this.setCellFocused(cell, view);
            } else {

                let multi = this.options.multi && utils.hasModifierKey(e);
                this.selectCell(cell, view, multi);
                this.notifySelectionChange();

                if (!multi) {
                    this.setCellFocused(cell, view);
                }
            }
        }

        if (this.moving) {

            this.paper.trigger('cells:moveEnd', this.movingCells, this.bounds);

            if (this.movingCells.length === 1) {
                this.paper.trigger('cell:moveEnd', this.movingCells[0], this.bounds);
            }

        }

        this.lastX       = null;
        this.lastY       = null;
        this.origin      = null;
        this.bounds      = null;
        this.moving      = false;
        this.movingCells = null;
    }

    onBlankMouseDown(e, localX, localY) {

        if (this.isDisabled() || this.isOnScrollBar(e)) {
            return;
        }

        this.isAreaSelect = this.isSelectMode || this.hasAreaSelectKey;

        // if (!this.isAreaSelect) {
        //    const areaSelectKey = this.options.areaSelectKey;
        //    if (this.options.areaSelect && areaSelectKey) {
        //        let method = 'has' + utils.ucFirst(areaSelectKey) + 'Key';
        //        if (utils[method]) {
        //            this.isAreaSelect = utils[method](e);
        //        }
        //    }
        //
        //    if (this.isAreaSelect) {
        //        this.switchModeClass(true);
        //        this.switchModeClass(true);
        //    }
        // }

        this.isMovement = !this.isAreaSelect && this.options.movement;

        if (this.isAreaSelect) {

            this.origin = { x: localX, y: localY };
        }

        if (this.isMovement) {

            this.origin           = { x: e.pageX, y: e.pageY };
            this.originScrollLeft = this.scrollParent.scrollLeft;
            this.originScrollTop  = this.scrollParent.scrollTop;

            const wrap = this.getPaper().getWrap();

            utils.removeClass(wrap, classNames.cursorMove);
            utils.addClass(wrap, classNames.cursorMoving);
            utils.addClass(document.body, classNames.cursorMoving);
        }

        if (!utils.hasModifierKey(e)) {
            this.clearSelection();
        }
    }

    onBlankMouseMove(e, localX, localY) {

        if (this.isDisabled()) {
            return;
        }

        if (this.isAreaSelect) {
            this.onAreaSelect(e, localX, localY);
        } else if (this.isMovement) {
            this.onMovement(e, localX, localY);
        }
    }

    onAreaSelect(e, localX, localY) {

        if (!this.moving) {
            this.setCursorStyle(document.body, true);
            this.showSelectionRect();
            this.moving = true;
        }

        if (this.moving) {

            const origin = this.origin;
            const bounds = this.getScrollBounds();

            let x      = localX;
            let y      = localY;
            let width  = Math.abs(x - origin.x);
            let height = Math.abs(y - origin.y);

            let max;

            if (x >= origin.x) {

                x   = origin.x;
                max = bounds.right - x;

                if (width > max) {
                    width = Math.round(max);
                }

            } else {

                max = origin.x - bounds.left;

                if (width > max) {
                    width = Math.round(max);
                    x     = Math.round(bounds.left);
                }
            }

            if (y >= origin.y) {

                y   = origin.y;
                max = bounds.bottom - y;

                if (max < height) {
                    height = Math.round(max);
                }
            } else {

                max = origin.y - bounds.top;

                if (height > max) {
                    height = Math.round(max);
                    y      = Math.round(bounds.top);
                }
            }

            this.bounds = { x, y, width, height };

            this.stopScrollTimer();
            this.updateSelectionRect();
            this.autoScrollSelectionRect(localX, localY);
        }
    }

    onMovement(e) {

        if (!this.moving) {
            this.moving = true;
        }

        const dx = this.origin.x - e.pageX;
        const dy = this.origin.y - e.pageY;

        this.scrollParent.scrollLeft = this.originScrollLeft + dx;
        this.scrollParent.scrollTop  = this.originScrollTop + dy;
    }

    onBlankMouseUp(e) {

        if (this.isDisabled()) {
            return;
        }

        if (this.isAreaSelect) {

            if (!utils.hasModifierKey(e)) {
                this.clearSelection();
            }

            if (this.moving && this.bounds) {
                // range selection
                this.stopScrollTimer();
                this.hideSelectionRect();
                this.selectCellsInRect(this.bounds);
            }

            this.notifySelectionChange();
            this.setCellFocused(null);

        } else if (this.isMovement) {

            this.originScrollLeft = 0;
            this.originScrollTop  = 0;

            if (!this.moving) {
                this.clearSelection();
                this.notifySelectionChange();
                this.setCellFocused(null);
            }

            const wrap = this.getPaper().getWrap();

            utils.addClass(wrap, classNames.cursorMove);
            utils.removeClass(wrap, classNames.cursorMoving);
            utils.removeClass(document.body, classNames.cursorMoving);
        }


        if (this.isAreaSelect || this.isMovement) {
            this.setCursorStyle(document.body);
        }

        this.switchModeClass(!!this.isSelectMode);

        this.bounds = null;
        this.origin = null;
        this.moving = false;

        this.isMovement   = false;
        this.isAreaSelect = false;
    }

    getScrollBounds(isViewport) {

        const paper        = this.getPaper();
        const scrollParent = this.scrollParent;
        const stageParent  = paper.stage.parentNode;

        const sx = paper.sx;
        const sy = paper.sy;

        const scrollTop    = scrollParent.scrollTop;
        const scrollLeft   = scrollParent.scrollLeft;
        const scrollWidth  = scrollParent.scrollWidth;
        const scrollHeight = scrollParent.scrollHeight;
        const clientWidth  = scrollParent.clientWidth;
        const clientHeight = scrollParent.clientHeight;
        const paddingLeft  = utils.toInt(stageParent.style.paddingLeft);
        const paddingTop   = utils.toInt(stageParent.style.paddingTop);

        return isViewport ? {
            left: (scrollLeft - paddingLeft - paper.tx) / sx,
            top: (scrollTop - paddingTop - paper.ty) / sy,
            right: (clientWidth + scrollLeft - paddingLeft - paper.tx) / sx,
            bottom: (clientHeight + scrollTop - paddingTop - paper.ty) / sy
        } : {
            left: -(paddingLeft + paper.tx) / sx,
            top: -(paddingTop + paper.ty) / sy,
            right: (scrollWidth - paddingLeft - paper.tx) / sx,
            bottom: (scrollHeight - paddingTop - paper.ty) / sy
        };
    }

    getMoveDirection(localX, localY) {

        let dx = localX - this.lastX;
        let dy = localY - this.lastY;

        this.lastX = localX;
        this.lastY = localY;

        // top   : 1
        // right : 2
        // bottom: 3
        // left  : 4
        let direction = 0;

        if (Math.abs(dx) > Math.abs(dy)) {
            direction = dx > 0 ? 2 : 4;
        } else {
            direction = dy > 0 ? 3 : 1;
        }

        return direction;
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

    autoScrollPreview(direction) {

        if (this.isParentScrollable()) {

            const bounds = this.bounds;
            const paper  = this.getPaper();

            const sx = paper.sx;
            const sy = paper.sy;

            const scrollParent = this.scrollParent;
            const scrollWidth  = scrollParent.scrollWidth;
            const scrollHeight = scrollParent.scrollHeight;
            const clientWidth  = scrollParent.clientWidth;
            const clientHeight = scrollParent.clientHeight;

            let sense = this.options.scrollSense;

            let x = bounds.x;
            let y = bounds.y;

            let width  = bounds.width;
            let height = bounds.height;

            let scrollTop  = scrollParent.scrollTop;
            let scrollLeft = scrollParent.scrollLeft;

            const sBounds = this.getScrollBounds();
            const vBounds = this.getScrollBounds(true);

            const minX = vBounds.left;
            const minY = vBounds.top;
            const maxX = vBounds.right - width;
            const maxY = vBounds.bottom - height;

            let scrolled = false;

            if (direction === 4 && scrollLeft > 0 && Math.round(x - minX) <= 0) {
                // scroll left
                scrolled = true;

                bounds.x   = Math.round(Math.max(sBounds.left, minX - sense / sx));
                scrollLeft = Math.round(Math.max(0, scrollLeft - sense));

            } else if (direction === 2 && scrollLeft < scrollWidth - clientWidth
                && Math.round(x - maxX) >= 0) {

                // scroll right
                scrolled = true;

                bounds.x   = Math.round(Math.min(sBounds.right - width, maxX + sense / sx));
                scrollLeft = Math.round(Math.min(scrollWidth - clientWidth, scrollLeft + sense));

            } else if (direction === 1 && scrollTop > 0 && Math.round(y - minY) <= 0) {

                // scroll top
                scrolled = true;

                bounds.y  = Math.round(Math.max(sBounds.top, minY - sense / sy));
                scrollTop = Math.round(Math.max(0, scrollTop - sense));

            } else if (direction === 3 && scrollTop < scrollHeight - clientHeight
                && Math.round(y - maxY) >= 0) {

                scrolled = true;

                bounds.y  = Math.round(Math.min(sBounds.bottom - height, maxY + sense / sy));
                scrollTop = Math.round(Math.min(scrollHeight - clientHeight, scrollTop + sense));
            }

            if (scrolled) {
                scrollParent.scrollTop  = scrollTop;
                scrollParent.scrollLeft = scrollLeft;
                this.updatePreview();
                this.scrollTimer = setTimeout(this.autoScrollPreview.bind(this, direction), this.options.scrollDelay);
            }
        }

        return this;
    }

    updatePreview(resize) {

        let bounds = this.bounds;
        if (bounds) {

            const paper = this.getPaper();
            const elem  = this.previewRect;

            const x = Math.round(bounds.x * paper.sx + paper.tx);
            const y = Math.round(bounds.y * paper.sy + paper.ty);

            utils.setTranslate(elem, x, y);

            // update size
            if (resize) {

                const width  = Math.round(bounds.width * paper.sx);
                const height = Math.round(bounds.height * paper.sy);

                utils.setStyle(elem, {
                    width: width + 'px',
                    height: height + 'px'
                });
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
        if (paper && paper.rawPane) {
            paper.rawPane.appendChild(this.previewRect);
        }

        return this;
    }

    hideSelectionRect() {

        utils.removeElement(this.selectionRect);

        return this;
    }

    showSelectionRect() {

        let paper = this.getPaper();
        if (paper && paper.rawPane) {
            paper.rawPane.appendChild(this.selectionRect);
        }

        return this;
    }

    updateSelectionRect() {

        let bounds = this.bounds;
        if (bounds) {

            const paper = this.getPaper();
            const elem  = this.selectionRect;

            const x      = Math.round(bounds.x * paper.sx + paper.tx);
            const y      = Math.round(bounds.y * paper.sy + paper.ty);
            const width  = Math.round(bounds.width * paper.sx);
            const height = Math.round(bounds.height * paper.sy);

            utils.setTranslate(elem, x, y);
            utils.setStyle(elem, {
                width: width + 'px',
                height: height + 'px'
            });
        }

        return this;
    }

    autoScrollSelectionRect(localX, localY) {

        if (this.isParentScrollable()) {

            let sense    = this.options.scrollSense;
            let bounds   = this.bounds;
            let scrolled = false;

            let scrollParent = this.scrollParent;
            let scrollWidth  = scrollParent.scrollWidth;
            let scrollHeight = scrollParent.scrollHeight;
            let clientWidth  = scrollParent.clientWidth;
            let clientHeight = scrollParent.clientHeight;
            let scrollTop    = scrollParent.scrollTop;
            let scrollLeft   = scrollParent.scrollLeft;

            const paper = this.getPaper();

            const sx = paper.sx;
            const sy = paper.sy;

            const sBounds = this.getScrollBounds();
            const vBounds = this.getScrollBounds(true);

            if (scrollLeft > 0 && localX <= vBounds.left) {

                // scroll left
                scrolled = true;
                localX -= sense / sx;

                bounds.x   = Math.round(Math.max(sBounds.left, bounds.x - sense / sx));
                scrollLeft = Math.round(Math.max(0, scrollLeft - sense));

            } else if (scrollLeft < scrollWidth - clientWidth
                && localX >= vBounds.right) {

                // scroll right
                scrolled = true;
                localX += sense / sx;

                bounds.width = Math.round(Math.min(sBounds.right - bounds.x, bounds.width + sense / sx));
                scrollLeft   = Math.round(Math.min(scrollWidth - clientWidth, scrollLeft + sense));

            } else if (scrollTop > 0 && localY < vBounds.top) {

                // scroll top
                scrolled = true;
                localY -= sense / sy;

                bounds.y  = Math.round(Math.max(sBounds.top, bounds.y - sense / sy));
                scrollTop = Math.round(Math.max(0, scrollTop - sense));

            } else if (scrollTop < scrollHeight - clientHeight
                && localY > vBounds.bottom) {

                // scroll bottom
                scrolled = true;
                localY += sense / sy;

                bounds.height = Math.round(Math.min(sBounds.bottom - bounds.y, bounds.height + sense / sy));
                scrollTop     = Math.round(Math.min(scrollHeight - clientHeight, scrollTop + sense));
            }

            if (scrolled) {
                scrollParent.scrollTop  = scrollTop;
                scrollParent.scrollLeft = scrollLeft;
                this.updateSelectionRect();
                this.scrollTimer = setTimeout(this.autoScrollSelectionRect.bind(this, localX, localY), this.options.scrollDelay);
            }
        }

        return this;
    }

    selectCellsInRect(area) {

        let model = this.getModel();
        let cells = model && model.findCellInArea(Rect.fromRect(area));

        this.selectCells(cells);

        return this;
    }

    selectCells(cells) {

        if (cells && cells.length) {
            utils.forEach(cells, function (cell) {
                this.setSelected(cell, this.paper.getView(cell), true);
            }, this);
        }

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
        }

        this.notifyFocus();

        return this;
    }

    isParentScrollable() {

        let scrollParent = this.scrollParent;

        return scrollParent.scrollWidth > scrollParent.clientWidth
            || scrollParent.scrollHeight > scrollParent.clientHeight;
    }

    isOnScrollBar(e) {

        const paper  = this.getPaper();
        const bounds = utils.getBounds(paper.getWrap());

        const maxX = bounds.left + bounds.width;
        const minX = maxX - scrollBarWidth;

        const maxY = bounds.top + bounds.height;
        const minY = maxY - scrollBarWidth;

        return utils.isWithin(e.pageX, minX, maxX)
            || utils.isWithin(e.pageY, minY, maxY);
    }

    notifyMoving() {

        this.getPaper().trigger('cells:moving', this.bounds, this.movingCells);
    }

    notifyFocus() {

        if (this.focusedCell) {
            this.getPaper().trigger('cell:focus', this.focusedCell);
        } else {
            this.getPaper().trigger('paper:focus');
        }
    }

    notifySelectionChange() {

        this.getPaper().trigger('cells:selectionChanged', this.selectedCells);
    }
}


// exports
// -------

export default SelectHandler;
