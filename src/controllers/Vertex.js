import * as utils from '../common/utils';
import   detector from '../common/detector';
import     vector from '../common/vector';
import       Rect from '../geometry/Rect';
import Controller from './Controller';


// TODO listen to cell's change event to redraw

const win = window;
const doc = win.document;

const defaults = {
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

        this.options = utils.merge({}, defaults, options);

        let vel   = vector('g', {
            'class': 'vertex-bounds'
        });
        this.cell = options.cell;
        this.vel  = vel;
        this.elem = vel.node;
        this.paper.controlPane.appendChild(this.elem);

        this.redraw();

        return this;
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

        this.bindEvents();

        return this;
    }

    moveTo(pos) {

        this.vel.translate(pos.x, pos.y);
        this.position = pos;

        return this;
    }

    setSize(size) {

        this.size = size;

        return this;
    }

    rotate(rotation, cx, cy) {

        let cell = this.cell;

        cx       = utils.isNumeric(cx) ? cx : cell.size.width / 2;
        cy       = utils.isNumeric(cy) ? cy : cell.size.height / 2;
        rotation = utils.isNumeric(rotation) ? rotation : cell.rotation;

        this.vel.rotate(rotation, cx, cy);
        this.rotation = rotation;

        return this;
    }

    drawBounds() {

        let attrs = utils.extend({}, this.options.boundsAttr, this.size);
        if (this.boundsVel) {
            this.boundsVel.attr(attrs);
        } else {
            this.boundsVel = vector('rect', attrs);
            this.vel.append(this.boundsVel);
        }

        return this;
    }

    drawRotater() {

        if (!this.rotaterVel) {
            this.rotaterVel = vector('ellipse', this.options.rotaterAttr);
            this.vel.append(this.rotaterVel);
        }

        this.rotaterVel.translate(this.size.width / 2, this.options.rotaterOffset);

        return this;
    }

    drawResizers() {

        let options = this.options;

        if (!this.resizers) {
            this.resizers = [];
            utils.forEach(RESIZER_NAMES, function () {
                this.createResizer();
            }, this);
        }

        // TODO change class and cursor style according to cell rotate angle
        let resizers = this.resizers;
        let rx       = options.resizerAttr.width / 2;
        let ry       = options.resizerAttr.height / 2;
        let h        = this.size.height;
        let w        = this.size.width;
        resizers[0].translate(-rx, -ry);
        resizers[1].translate(-rx + w / 2, -ry);
        resizers[2].translate(-rx + w, -ry);
        resizers[3].translate(-rx + w, -ry + h / 2);
        resizers[4].translate(-rx + w, -ry + h);
        resizers[5].translate(-rx + w / 2, -ry + h);
        resizers[6].translate(-rx, -ry + h);
        resizers[7].translate(-rx, -ry + h / 2);

        this.cacheResizerBBox();
        this.adjustResizers();

        return this;
    }

    cacheResizerBBox() {

        utils.forEach(this.resizers, function (resizer) {
            if (!resizer.hidden) {
                resizer.cachedBBox = resizer.getBBox();
            }
        });
        return this;
    }

    adjustResizers() {
        let cell = this.cell;

        const STEP_ANGLE = 45;
        let rotation     = utils.normalizeAngle(cell.rotation);
        let offset       = Math.floor(rotation / STEP_ANGLE);
        let length       = RESIZER_NAMES.length;

        utils.forEach(this.resizers, function (resizer, i) {
            let name = RESIZER_NAMES[(i + offset) % length];
            resizer.attr({
                class: 'resizer ' + name
            });
            resizer.css({
                cursor: name
            });
        });
        return this;
    }

    createResizer() {
        let that = this;

        let resizerVel = vector('rect', that.options.resizerAttr);
        that.resizers.push(resizerVel);
        that.vel.append(resizerVel);
        return that;
    }

    hideRotater() {

        this.rotaterVel.hide();

        return this;
    }

    showRotater() {

        this.rotaterVel.show();
        return this;
    }

    showResizers() {

        utils.forEach(this.resizers, function (resizer) {
            resizer.show();
        });
        return this;
    }

    hideResizers(exceptNode) {

        this.cacheResizerBBox();
        utils.forEach(this.resizers, function (resizer) {
            if (resizer.node !== exceptNode) {
                resizer.hide();
            }
        });

        return this;
    }

    resetEvents(e) {

        this.isRotating  = false;
        this.isResizing  = false;
        this.eventTarget = null;

        if (e && e.target) {
            this.eventTarget      = e.target;
            this.isRotating       = (e.target === this.rotaterVel.node);
            this.isResizing       = utils.hasClass(e.target, 'resizer');
            this.oldEventPosition = {
                x: e.x,
                y: e.y
            };
        }
        if (this.isRotating) {
            this.hideResizers();
        } else {
            this.showResizers();
        }
        if (this.isResizing) {
            this.hideRotater();
            this.hideResizers(e.target);
        } else {
            this.showRotater();
        }

        return this;
    }

    bindEvents() {
        let elem = this.elem;
        this.resetEvents();

        let onPointerDown = this.onPointerDown.bind(this);
        let onPointerMove = this.onPointerMove.bind(this);
        let onPointerUp   = this.onPointerUp.bind(this);
        if (detector.IS_TOUCH) {
            utils.addEventListener(elem, 'touchstart', onPointerDown);
            utils.addEventListener(doc, 'touchmove', onPointerMove);
            utils.addEventListener(doc, 'touchend', onPointerUp);
        } else {
            utils.addEventListener(elem, 'mousedown', onPointerDown);
            utils.addEventListener(doc, 'mousemove', onPointerMove);
            utils.addEventListener(doc, 'mouseup', onPointerUp);
        }

        return this;
    }

    onPointerDown(e) {

        e.stopPropagation();

        this.resetEvents(e);

        return this;
    }

    onPointerMove(e) {
        let that = this;
        // let paper = that.paper;

        if (that.isRotating) {
            e.stopPropagation();
            let dx = that.position.x + that.size.width / 2 - e.x;
            let dy = that.position.y + that.size.height / 2 - e.y;

            let alpha = (dx !== 0) ? Math.atan(dy / dx) * 180 / Math.PI + 90 : ((dy < 0) ? 180 : 0);
            if (dx > 0) {
                alpha -= 180;
            }
            that.rotate(alpha);
        }
        if (that.isResizing) {
            e.stopPropagation();
            let oldPos                = that.oldEventPosition;
            let newPos                = {
                x: e.x,
                y: e.y
            };
            let eventTarget           = that.eventTarget;
            let currentResizerIndex   = 0;
            let isRotationResizer     = false;
            let isAntiRotationResizer = false;
            utils.some(that.resizers, function (resizer, i) {
                if (resizer.node === eventTarget) {
                    currentResizerIndex = i;
                    return true;
                }
                return false;
            });
            let oppositeResizerIndex = (currentResizerIndex - 4 + 8) % 8;
            if (currentResizerIndex % 2 !== 0) {
                if (currentResizerIndex === 1 || currentResizerIndex === 5) {
                    isRotationResizer = true;
                }
                if (currentResizerIndex === 3 || currentResizerIndex === 7) {
                    isAntiRotationResizer = true;
                }
                currentResizerIndex -= 1;
                oppositeResizerIndex -= 1;
            }
            let edgePoint       = that.resizers[oppositeResizerIndex].cachedBBox.getCenter();
            let movingEdgePoint = that.resizers[currentResizerIndex].getBBox().getCenter();
            let dx              = 0;
            let dy              = 0;
            if (isRotationResizer) {
                dx = 0; // TODO
                dy = 0; // TODO
            } else if (isAntiRotationResizer) {
                dx = 0; // TODO
                dy = 0; // TODO
            } else {
                dx = newPos.x - oldPos.x;
                dy = newPos.y - oldPos.y;
            }
            let newRect = Rect.fromVerticesAndRotation(edgePoint, {
                x: movingEdgePoint.x + dx,
                y: movingEdgePoint.y + dy
            }, that.rotation);
            // let newCenter = newRect.getCenter();
            that.moveTo({
                    x: newRect.x,
                    y: newRect.y
                })
                .setSize({
                    height: newRect.height,
                    width: newRect.width
                })
                .drawBounds()
                .drawResizers()
                .rotate(that.rotation/* , newCenter.x, newCenter.y */);

            that.oldEventPosition = newPos;
        }
        return that;
    }

    onPointerUp(e) {
        let that = this;

        if (that.isResizing || that.isRotating) {
            e.stopPropagation();
            let model = that.model;
            // let cell = that.cell;
            model.beginUpdate();
            if (that.isRotating) {
                model.setGeometry(that.cell, {
                    rotation: {
                        angle: that.rotation
                    }
                });
            }
            if (that.isResizing) {
                model.setGeometry(that.cell, {
                    position: {
                        x: that.position.x,
                        y: that.position.y
                    },
                    rotation: {
                        angle: that.rotation
                    },
                    size: {
                        width: that.size.width,
                        height: that.size.height,
                    }
                });
            }
            model.endUpdate();
            that.redraw();
            that.resetEvents();
        }
        return that;
    }

    destroy() {

        this.boundsVel.remove();
        this.rotaterVel.remove();

        utils.forEach(this.resizers, function (vel) {
            vel.remove();
        });

        this.vel.remove();

        utils.destroy(this);
    }
}


// exports
// -------

export default VertexController;
