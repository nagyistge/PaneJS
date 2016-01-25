import * as utils from '../common/utils';
import Controller from './Controller';
import detector   from '../common/detector';
import vector from '../common/vector';

const WIN = window;
const DOC = WIN.document;

// TODO listen to cell's change event to redraw

const DEFAULT_OPTIONS = {
    boundsAttr: {
        fill: 'none',
        'stroke-dasharray': '3px, 3px',
        stroke: '#0f0',
    },
    rotaterOffset: -12,
    rotaterAttr: {
        rx: 5,
        ry: 5,
        fill: '#0f0',
        stroke: 'black',
        style: 'cursor:crosshair;'
    },
    resizerAttr: {
        height: 6,
        width: 6,
        fill: '#0f0',
        stroke: 'black',
    }
};

const RESIZER_NAMES = [
    'nw-resize',
    'n-resize',
    'ne-resize',
    'e-resize',
    'se-resize',
    's-resize',
    'sw-resize',
    'w-resize',
];

class VertexController extends Controller {
    init(options) {
        /*
         {
         cell: cell
         }
         */
        let that = this;

        that.options = utils.merge({}, DEFAULT_OPTIONS, options);

        let vel = vector('g', {
            'class': 'vertex-bounds'
        });
        that.cell = options.cell;
        that.vel = vel;
        that.elem = vel.node;
        that.paper.controlPane.appendChild(that.elem);

        that.redraw();

        return that;
    }

    redraw() {
        let that = this;
        let cell = that.cell;

        that.moveTo(cell.position)
            .rotate()
            .setSize(cell.size)
            .drawBounds()
            .drawRotater()
            .drawResizers();

        that.bindEvents();

        return that;
    }

    moveTo(pos) {
        let that = this;

        that.vel.translate(pos.x, pos.y);
        that.position = pos;

        return that;
    }

    setSize(size) {
        let that = this;

        that.size = size;

        return that;
    }

    rotate(rotation) {
        let that = this;
        let cell = that.cell;

        let cx = cell.size.width / 2;
        let cy = cell.size.height / 2;
        that.vel.rotate(rotation || cell.rotation, cx, cy);
        that.rotation = rotation || cell.rotation;

        return that;
    }

    drawBounds() {
        let that = this;

        let attrs = utils.extend({}, that.options.boundsAttr, this.size);
        if (that.boundsVel) {
            that.boundsVel.attr(attrs);
        } else {
            that.boundsVel = vector('rect', attrs);
            that.vel.append(that.boundsVel);
        }

        return that;
    }

    drawRotater() {
        let that = this;
        let options = that.options;

        if (!that.rotaterVel) {
            that.rotaterVel = vector('ellipse', options.rotaterAttr);
            that.vel.append(that.rotaterVel);
        }
        that.rotaterVel.translate(that.size.width / 2, options.rotaterOffset);
        return that;
    }

    drawResizers() {
        let that = this;
        let options = that.options;

        if (!that.resizers) {
            that.resizers = [];
            utils.forEach(RESIZER_NAMES, function () {
                that.createResizer();
            });
        }

        // TODO change class and cursor style according to cell rotate angle
        let resizers = that.resizers;
        let rx = options.resizerAttr.width / 2;
        let ry = options.resizerAttr.height / 2;
        let h = that.size.height;
        let w = that.size.width;
        resizers[0].translate(-rx, -ry);
        resizers[1].translate(-rx + w / 2, -ry);
        resizers[2].translate(-rx + w, -ry);
        resizers[3].translate(-rx + w, -ry + h / 2);
        resizers[4].translate(-rx + w, -ry + h);
        resizers[5].translate(-rx + w / 2, -ry + h);
        resizers[6].translate(-rx, -ry + h);
        resizers[7].translate(-rx, -ry + h / 2);

        that.adjustResizers();

        return that;
    }

    adjustResizers() {
        let that = this;
        let cell = that.cell;

        const STEP_ANGLE = 45;
        let rotation = utils.normalizeAngle(cell.rotation);
        let offset = Math.floor(rotation / STEP_ANGLE);
        let length = RESIZER_NAMES.length;

        utils.forEach(that.resizers, function (resizer, i) {
            let name = RESIZER_NAMES[(i + offset) % length];
            resizer.attr({
                class: 'resizer ' + name
            });
            resizer.css({
                cursor: name
            });
        });
        return that;
    }

    createResizer() {
        let that = this;

        let resizerVel = vector('rect', that.options.resizerAttr);
        that.resizers.push(resizerVel);
        that.vel.append(resizerVel);
        return that;
    }

    /*
     drawPreview() {
     let that = this;
     return that;
     }
     */

    hideRotater() {
        let that = this;

        that.rotaterVel.hide();
        return that;
    }

    showRotater() {
        let that = this;

        that.rotaterVel.show();
        return that;
    }

    showResizers() {
        let that = this;

        utils.forEach(that.resizers, function (resizer) {
            resizer.show();
        });
        return that;
    }

    hideResizers() {
        let that = this;

        utils.forEach(that.resizers, function (resizer) {
            resizer.hide();
        });
        return that;
    }

    resetEvents(e) {
        let that = this;

        that.isRotating = false;
        that.isResizing = false;
        that.target = null;
        if (e && e.target) {
            that.target = e.target;
            that.isRotating = (e.target === that.rotaterVel.node);
            that.isResizing = utils.containsClassName(e.target, 'resizer');
            that.oldEventPosition = {
                x: e.x,
                y: e.y
            };
        }
        if (that.isRotating) {
            that.hideResizers();
        } else {
            that.showResizers();
        }
        if (that.isResizing) {
            that.hideRotater();
        } else {
            that.showRotater();
        }
        return that;
    }

    bindEvents() {
        let that = this;
        let elem = that.elem;
        that.resetEvents();

        let onPointerDown = that.onPointerDown.bind(that);
        let onPointerMove = that.onPointerMove.bind(that);
        let onPointerUp = that.onPointerUp.bind(that);
        if (detector.IS_TOUCH) {
            utils.addEventListener(elem, 'touchstart', onPointerDown);
            utils.addEventListener(DOC, 'touchmove', onPointerMove);
            utils.addEventListener(DOC, 'touchend', onPointerUp);
        } else {
            utils.addEventListener(elem, 'mousedown', onPointerDown);
            utils.addEventListener(DOC, 'mousemove', onPointerMove);
            utils.addEventListener(DOC, 'mouseup', onPointerUp);
        }

        return that;
    }

    onPointerDown(e) {
        let that = this;

        that.resetEvents(e);
        e.stopPropagation();
        return that;
    }

    onPointerMove(e) {
        let that = this;

        if (that.isRotating) {
            // let paper = that.paper;
            let dx = that.position.x + that.size.width / 2 - e.x;
            let dy = that.position.y + that.size.height / 2 - e.y;

            let alpha = (dx !== 0) ? Math.atan(dy / dx) * 180 / Math.PI + 90 : ((dy < 0) ? 180 : 0);
            if (dx > 0) {
                alpha -= 180;
            }
            that.rotate(alpha);

            e.stopPropagation();
        }
        return that;
    }

    onPointerUp(e) {
        let that = this;

        if (that.isResizing || that.isRotating) {
            let model = that.model;
            // let cell = that.cell;
            if (that.isRotating) {
                model.beginUpdate();
                model.setGeometry(that.cell, {
                    rotation: {
                        angle: that.rotation
                    }
                });
                model.endUpdate();
            }
            that.resetEvents();
            e.stopPropagation();
        }
        return that;
    }

    destroy() {
        let that = this;

        that.boundsVel.remove();
        that.rotaterVel.remove();
        utils.forEach(that.resizers, function (vel) {
            vel.remove();
        });
        that.vel.remove();
        utils.destroy(that);
        return that;
    }
}

export default VertexController;
