import * as utils from '../common/utils';
import Rect       from '../geometry/Rect';


const defaults = {
    paper: null,
    distance: 0,
};


class Snaplines {

    constructor(options) {

        if (options) {
            this.install(options);
        }
    }

    destroy() {

        if (!this.destroyed) {
            utils.removeElement(this.container);
            utils.destroy(this);
        }
    }

    install(options) {

        this.options = utils.merge({}, defaults, options);
        this.paper   = this.options.paper;

        this.ensureElement();
        this.hide();

        this.paper.on('cells:moving', this.onCellsMoving.bind(this));
        this.paper.on('cells:moveEnd', this.onCellsMoveEnd.bind(this));
    }

    ensureElement() {

        this.container = utils.createElement('div');
        this.hLine     = utils.createElement('div');
        this.vLine     = utils.createElement('div');

        this.container.appendChild(this.hLine);
        this.container.appendChild(this.vLine);

        this.paper.stage.appendChild(this.container);

        utils.addClass(this.container, 'pane-snaplines');
        utils.addClass(this.hLine, 'pane-snapline horizontal');
        utils.addClass(this.vLine, 'pane-snapline vertical');

        return this;
    }

    onCellsMoving(cells, bounds) {

        const previewCenter = bounds.getCenter();
        const previewOrigin = bounds.getOrigin();
        const previewCorner = bounds.getCorner();

        this.vertical   = null;
        this.horizontal = null;

        this.hide();

        this.paper.eachView(function (view) {

            const cell = view.cell;
            if (!cell || !cell.isNode()) {
                return;
            }

            //if (cells.length === 1 && cell === cells[0]) {
            //    return;
            //}

            const snapBBox   = cell.getBBox();
            const snapCenter = snapBBox.getCenter();
            const snapOrigin = snapBBox.getOrigin();
            const snapCorner = snapBBox.getCorner();

            return this.check(previewCenter, snapCenter, bounds, snapBBox)
                || this.check(previewCenter, snapOrigin, bounds, snapBBox)
                || this.check(previewCenter, snapCorner, bounds, snapBBox)
                || this.check(previewOrigin, snapOrigin, bounds, snapBBox)
                    //|| this.check(previewOrigin, snapCenter, bounds, snapBBox)
                || this.check(previewOrigin, snapCorner, bounds, snapBBox)
                || this.check(previewCorner, snapOrigin, bounds, snapBBox)
                    //|| this.check(previewCorner, snapCenter, bounds, snapBBox)
                || this.check(previewCorner, snapCorner, bounds, snapBBox)
        }, this);

        this.show();
    }

    onCellsMoveEnd() {

        this.hide();
    }

    check(previewPoint, snapPoint, previewBBox, spanBBox) {

        const distance = this.options.distance;

        let vertical   = this.vertical;
        let horizontal = this.horizontal;

        // horizontal
        let diff = previewPoint.y - snapPoint.y;
        if (Math.abs(diff) <= distance) {

            if (!horizontal) {
                horizontal = this.horizontal = {
                    top: snapPoint.y,
                    left: previewBBox.x,
                    right: previewBBox.x + previewBBox.width
                };
            }

            horizontal.left  = Math.min(horizontal.left, previewBBox.x, spanBBox.x);
            horizontal.right = Math.max(horizontal.right, previewBBox.x + previewBBox.width, spanBBox.x + spanBBox.width);

            return true;
        }

        // vertical
        diff = previewPoint.x - snapPoint.x;
        if (Math.abs(diff) <= distance) {

            if (!vertical) {
                vertical = this.vertical = {
                    left: snapPoint.x,
                    top: previewBBox.y,
                    bottom: previewBBox.y + previewBBox.height
                };
            }

            vertical.top    = Math.min(vertical.top, previewBBox.y, spanBBox.y);
            vertical.bottom = Math.max(vertical.bottom, previewBBox.y + previewBBox.height, spanBBox.y + spanBBox.height);

            return true;
        }


        return false;
    }

    hide() {

        utils.setStyle(this.hLine, 'display', 'none');
        utils.setStyle(this.vLine, 'display', 'none');

        return this;
    }

    show() {

        const paper = this.paper;

        const sx = paper.sx;
        const sy = paper.sy;
        const tx = paper.tx;
        const ty = paper.ty;

        const vertical   = this.vertical;
        const horizontal = this.horizontal;

        if (vertical) {

            utils.setStyle(this.vLine, {
                display: 'block',
                left: Math.round(vertical.left * sx + tx) + 'px',
                top: Math.round(vertical.top * sy + ty) + 'px',
                height: Math.round((vertical.bottom - vertical.top) * sy) + 'px'
            });
        }

        if (horizontal) {

            utils.setStyle(this.hLine, {
                display: 'block',
                left: Math.round(horizontal.left * sx + tx) + 'px',
                top: Math.round(horizontal.top * sy + ty) + 'px',
                width: Math.round((horizontal.right - horizontal.left) * sx) + 'px'
            });
        }
    }
}


// exports
// -------

export default Snaplines;
