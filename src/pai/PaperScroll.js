import * as utils from '../common/utils';
import detector   from '../common/detector';

const defaults = {
    paper: null,
    space: 30,
    minWidth: 0,
    minHeight: 0
};

class PaperScroll {

    constructor(options) {

        if (options) {
            this.install(options);
        }
    }

    destroy() {

        if (!this.destroyed) {
            utils.removeElement(this.scrollElem);
            utils.destroy(this);
        }
    }

    install(options) {

        this.options = utils.merge({}, defaults, options);
        this.space   = utils.normalizeSides(this.options.space);
        this.paper   = this.options.paper;

        const paper = this.paper;

        // keep scale values for a quicker access
        this.sx = paper.sx;
        this.sy = paper.sy;

        // keep the original canvas size
        this.baseWidth  = paper.width;
        this.baseHeight = paper.height;

        // init for next calculating
        this.scrollLeft = 0;
        this.scrollTop  = 0;

        paper.on('paper:scale', this.doScale, this);
        paper.on('paper:resize', this.doResize, this);

        this.ensureElement();
        this.addScrollEvent();

        const scrollBarWidth = utils.getScrollBarWidth();
        this.clientWidth     = this.scrollParent.clientWidth - scrollBarWidth;
        this.clientHeight    = this.scrollParent.clientHeight - scrollBarWidth;

        this.doResize();
        this.adjustPadding();
        this.center();
    }

    ensureElement() {

        const paper      = this.paper;
        const scrollElem = utils.createElement('div');

        this.scrollElem   = scrollElem;
        this.scrollParent = paper.wrapper;

        utils.addClass(scrollElem, 'pane-scroll');

        scrollElem.appendChild(paper.stage);
        paper.wrapper.appendChild(scrollElem);

        return this;
    }

    addScrollEvent() {

        if (!this.onScroll) {

            let that = this;

            this.onScroll = function () {
                that.setScroll(that.scrollParent.scrollLeft, that.scrollParent.scrollTop);
            };
        }

        utils.addEventListener(this.scrollParent, 'scroll', this.onScroll);

        return this;
    }

    removeScrollEvent() {

        utils.removeEventListener(this.scrollParent, 'scroll', this.onScroll);

        return this;
    }

    adjustPadding(padding) {

        if (padding) {
            padding = utils.normalizeSides(padding);

        } else {

            const space        = this.space;
            const clientWidth  = this.clientWidth;
            const clientHeight = this.clientHeight;

            padding = {
                top: clientHeight - space.top,
                right: clientWidth - space.right,
                bottom: clientHeight - space.bottom,
                left: clientWidth - space.left
            };
        }

        this.padding = padding;

        utils.setStyle(this.scrollElem, {
            paddingTop: padding.top + 'px',
            paddingRight: padding.right + 'px',
            paddingBottom: padding.bottom + 'px',
            paddingLeft: padding.left + 'px'
        });

        return this;
    }

    adjustPaper() {

        const paper = this.paper;

        let sx = paper.sx;
        let sy = paper.sy;

        let options = {
            frameWidth: this.baseWidth * sx,
            frameHeight: this.baseHeight * sy
        };

        if (this.options.minWidth) {
            options.minWidth = this.options.minWidth * sx;
        }

        if (this.options.minHeight) {
            options.minHeight = this.options.minHeight * sy;
        }


        let tx = paper.tx;
        let ty = paper.ty;

        if (paper.fitToContent(options)) {

            let dLeft = paper.tx - tx;
            let dTop  = paper.ty - ty;

            if (dLeft !== 0 || dTop !== 0) {
                this.doScroll(dLeft, dTop, { relative: true });
            }
        }

        return this;
    }

    doScale(sx, sy, ox, oy) {

        this.sx = sx;
        this.sy = sy;

        this.adjustPaper();

        if (ox || oy) {
            this.center(ox, oy);
        }

        return this;
    }

    doResize(width = this.baseWidth, height = this.baseHeight) {

        utils.setStyle(this.scrollElem, {
            width: width + 'px',
            height: height + 'px'
        });

        return this;
    }

    doScroll(scrollLeft, scrollTop, options = {}) {

        this.removeScrollEvent();

        if (options.relative) {
            scrollLeft += this.scrollLeft;
            scrollTop += this.scrollTop;
        }

        this.setScroll(scrollLeft, scrollTop);

        this.scrollParent.scrollLeft = scrollLeft;
        this.scrollParent.scrollTop  = scrollTop;

        this.addScrollEvent();

        return this;
    }


    setScroll(scrollLeft, scrollTop) {

        this.scrollLeft = scrollLeft;
        this.scrollTop  = scrollTop;

        return this;
    }

    center(x, y) {

        // adjust the paper position so the point [x,y] is moved to the
        // center of scroll element. If no point given [x,y] equals to
        // center of the paper element.

        let paper = this.paper;

        let tx = paper.tx;
        let ty = paper.ty;


        if (utils.isUndefined(x) || utils.isUndefined(y)) {

            // the paper rectangle
            //   x1,y1 ---------
            //   |             |
            //   ----------- x2,y2
            let x1 = -tx; // translate x
            let y1 = -ty; // translate y
            let x2 = x1 + paper.width;
            let y2 = y1 + paper.height;

            // get the center of the paper
            x = (x1 + x2) / 2;
            y = (y1 + y2) / 2;
        } else {
            // local coordinates to viewport coordinates
            x *= paper.sx; // scale x
            y *= paper.sy; // scale y
        }

        let dLeft = this.clientWidth / 2 - (x + tx + this.padding.left - this.scrollLeft);
        let dTop  = this.clientHeight / 2 - (y + ty + this.padding.top - this.scrollTop);

        this.doScroll(-dLeft, -dTop, { relative: true });

        return this;
    }

    centerContent() {

        let bound = this.paper.getContentBBox(true);
        this.center(bound.x + bound.width / 2, bound.y + bound.height / 2);

        return this;
    }

    toLocalPoint(x, y) {

        // return point that relative to the stage's left-top corner
        // x: x coordinate relative to the wrapper
        // y: y coordinate relative to the wrapper

        const paper   = this.paper;
        const padding = this.padding;

        x += this.scrollLeft - padding.left - paper.tx;
        x /= paper.sx;

        y += this.scrollTop - padding.top - paper.ty;
        y /= paper.sy;

        return {
            x: Math.round(x),
            y: Math.round(y)
        };
    }

    getCenter() {

        return this.toLocalPoint(this.clientWidth / 2, this.clientHeight / 2);
    }

    beforeZoom() {

        if (detector.IS_IE) {
            // IE is trying to show every frame while we manipulate the paper.
            // That makes the viewport kind of jumping while zooming.
            utils.setStyle(this.elem, 'visibility', 'hidden');
        }

        return this;
    }

    afterZoom() {

        if (detector.IS_IE) {
            utils.setStyle(this.elem, 'visibility', '');
        }

        return this;
    }

    zoom(value, options = {}) {

        let sx = value;
        let sy = value;

        if (!options.absolute) {
            sx += this.sx;
            sy += this.sy;
        }

        let scaleGrid = options.scaleGrid;
        if (scaleGrid) {
            sx = utils.snapToGrid(sx, scaleGrid);
            sy = utils.snapToGrid(sy, scaleGrid);
        }

        // check if the new scale won't exceed the given boundaries
        let minScale = options.minScale;
        let maxScale = options.maxScale;

        sx = utils.clamp(sx, minScale || 0, maxScale || Number.MAX_VALUE);
        sy = utils.clamp(sy, minScale || 0, maxScale || Number.MAX_VALUE);

        // the scale center
        let cx = options.cx;
        let cy = options.cy;

        // if the scale center is not specified find
        // the center of the paper's visible area.
        if (utils.isUndefined(cx) || utils.isUndefined(cy)) {

            // the center of the container
            let center = this.getCenter();

            cx = center.x;
            cy = center.y;

        } else {

            cx = 800;
            cy = 600;
        }

        let dLeft = cx * (sx - this.sx);
        let dTop  = cy * (sy - this.sy);

        this.beforeZoom();
        this.paper.scale(sx, sy);
        this.doScroll(dLeft, dTop, { relative: true });
        this.afterZoom();

        return this;
    }

    zoomToFit(options = {}) {

        let paper = this.paper;

        let x = paper.tx;
        let y = paper.ty;

        let width  = this.scrollParent.clientWidth;
        let height = this.scrollParent.clientHeight;

        options.fittingBBox = options.fittingBBox || { x, y, width, height };

        this.beforeZoom();

        // scale the viewport
        paper.scaleContentToFit(options);
        // restore original origin
        paper.translate(x, y);

        this.adjustPaper();
        this.centerContent();

        this.afterZoom();

        return this;
    }
}


export default PaperScroll;
