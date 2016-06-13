import * as utils from '../common/utils';
import detector   from '../common/detector';

const defaults = {
    paper: null,
    padding: 0,
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
            utils.removeElement(this.elem);
            utils.destroy(this);
        }
    }

    install(options) {

        this.options = utils.merge({}, defaults, options);
        this.paper   = this.options.paper;

        let paper = this.paper;

        // keep scale values for a quicker access
        this.sx = paper.sx || paper.options.sx;
        this.sy = paper.sy || paper.options.sy;

        // keep the original paper size
        this.baseWidth   = paper.options.width;
        this.baseHeight  = paper.options.height;
        this.basePadding = utils.normalizeSides(this.options.padding);

        this.ensureElement();
        this.adjustPadding();

        paper.on('paper:scale', this.onScale, this);
        paper.on('paper:resize', this.onResize, this);
    }

    ensureElement() {

        let paper = this.paper;
        let elem  = this.elem = utils.createElement('div');

        utils.addClass(elem, 'pane-scroll');

        elem.appendChild(paper.root);
        paper.container.appendChild(elem);

        return this;
    }

    adjustPadding(padding = {}) {

        padding = utils.normalizeSides(padding);

        let basePadding = this.basePadding;
        let paddingTop  = Math.round(basePadding.top + padding.top);
        let paddingLeft = Math.round(basePadding.left + padding.left);

        // Make sure that at least a fragment of the
        // paper is always visible on the screen.
        paddingTop  = Math.min(paddingTop, this.elem.clientHeight * 0.9);
        paddingLeft = Math.min(paddingLeft, this.elem.clientWidth * 0.9);

        utils.setStyle(this.elem, {
            paddingLeft: paddingLeft + 'px',
            paddingTop: paddingTop + 'px'
        });

        // It is impossible to apply bottom and right padding on `this.elem`
        // as it would have no effect while overflow in FF and IE.
        // see 'https://bugzilla.mozilla.org/show_bug.cgi?id=748518'
        utils.setStyle(this.paper.root, {
            marginRight: Math.round(basePadding.right + padding.right) + 'px',
            marginBottom: Math.round(basePadding.bottom + padding.bottom) + 'px'
        });

        this.padding = {
            top: paddingTop,
            left: paddingLeft
        };

        return this;
    }

    adjustPaper() {

        // store the current mid point of visible paper area, so we can
        // center the paper to the same point after the resize.
        this.centerPoint = this.getCenter();

        let sx = this.sx;
        let sy = this.sy;

        let options = {
            frameWidth: this.baseWidth * sx,
            frameHeight: this.baseHeight * sy,
            allowNewOrigin: 'negative'
        };

        if (this.options.minWidth) {
            options.minWidth = this.options.minWidth * sx;
        }

        if (this.options.minHeight) {
            options.minHeight = this.options.minHeight * sy;
        }

        this.paper.fitToContent(options);

        return this;
    }

    onScale(sx, sy, ox, oy) {

        this.sx = sx;
        this.sy = sy;

        this.adjustPaper();

        if (ox || oy) {
            this.center(ox, oy);
        }

        return this;
    }

    onResize() {

        if (this.centerPoint) {
            this.center(this.centerPoint.x, this.centerPoint.y);
        }

        return this;
    }

    center(x, y) {

        // Adjust the paper position so the point [x,y] is moved to the
        // center of scroll element. If no point given [x,y] equals to
        // center of the paper element.

        let paper = this.paper;
        // the paper rectangle
        //   x1,y1 ---------
        //   |             |
        //   ----------- x2,y2
        let x1 = -paper.tx; // translate x
        let y1 = -paper.ty; // translate y
        let x2 = x1 + paper.width;
        let y2 = y1 + paper.height;

        if (utils.isUndefined(x) || utils.isUndefined(y)) {
            // get the center of the paper
            x = (x1 + x2) / 2;
            y = (y1 + y2) / 2;
        } else {
            // local coordinates to viewport coordinates
            x *= paper.sx; // scale x
            y *= paper.sy; // scale y
        }

        let rootCenterX = this.elem.clientWidth / 2;
        let rootCenterY = this.elem.clientHeight / 2;
        let basePadding = this.basePadding;

        // calculate padding
        let left   = rootCenterX - basePadding.left - x + x1;
        let right  = rootCenterX - basePadding.right + x - x2;
        let top    = rootCenterY - basePadding.top - y + y1;
        let bottom = rootCenterY - basePadding.bottom + y - y2;

        this.adjustPadding({
            top: Math.max(top, 0),
            right: Math.max(right, 0),
            bottom: Math.max(bottom, 0),
            left: Math.max(left, 0)
        });

        this.elem.scrollTop  = y - rootCenterY + paper.ty + this.padding.top;
        this.elem.scrollLeft = x - rootCenterX + paper.tx + this.padding.left;

        return this;
    }

    toLocalPoint(x, y) {

        x += this.elem.scrollLeft - this.padding.left - this.paper.tx;
        x /= this.paper.sx;

        y += this.elem.scrollTop - this.padding.top - this.paper.ty;
        y /= this.paper.sy;

        return {
            x: Math.round(x),
            y: Math.round(y)
        };
    }

    getCenter() {

        return this.toLocalPoint(this.elem.clientWidth / 2, this.elem.clientHeight / 2);
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

        // the center of the container
        let center = this.getCenter();
        // the scale center
        let cx = options.cx;
        let cy = options.cy;

        // if the scale center is not specified find
        // the center of the paper's visible area.
        if (utils.isUndefined(cx) || utils.isUndefined(cy)) {
            cx = center.x;
            cy = center.y;
        } else {
            let fsx = sx / this.sx;
            let fsy = sy / this.sy;

            cx = cx - ((cx - center.x) / fsx);
            cy = cy - ((cy - center.y) / fsy);
        }

        this.beforeZoom();

        // let dx = this.elem.clientWidth * (this.sx - sx);
        // let dy = this.elem.clientHeight * (this.sy - sy);

        this.paper.scale(sx, sy);
        this.center(cx, cy);

        this.afterZoom();

        return this;
    }

    zoomToFit(options = {}) {

        let paper = this.paper;

        let x = paper.tx;
        let y = paper.ty;

        let width  = this.elem.clientWidth;
        let height = this.elem.clientHeight;

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

    centerContent() {

        let bbox = this.paper.getContentBBox(true);
        this.center(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);

        return this;
    }
}


export default PaperScroll;
