import * as utils from '../common/utils';
import Controller from './Controller';
import detector   from '../common/detector';
import vector from '../common/vector';
import Rect from '../geometry/Rect';

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

    rotate(rotation, cx, cy) {
        let that = this;
        let cell = that.cell;

        cx = utils.isNumeric(cx) ? cx : cell.size.width / 2;
        cy = utils.isNumeric(cy) ? cy : cell.size.height / 2;
        rotation = utils.isNumeric(rotation) ? rotation : cell.rotation;
        that.vel.rotate(rotation, cx, cy);
        that.rotation = rotation;

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

        that.cacheResizerBBox();
        that.adjustResizers();

        return that;
    }

    cacheResizerBBox() {
        let that = this;

        utils.forEach(that.resizers, function (resizer) {
            if (!resizer.hidden) {
                resizer.cachedBBox = resizer.getBBox();
            }
        });
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

    hideResizers(exceptNode) {
        let that = this;

        that.cacheResizerBBox();
        utils.forEach(that.resizers, function (resizer) {
            if (resizer.node !== exceptNode) {
                resizer.hide();
            }
        });
        return that;
    }

    resetEvents(e) {
        let that = this;

        that.isRotating = false;
        that.isResizing = false;
        that.eventTarget = null;
        if (e && e.target) {
            that.eventTarget = e.target;
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
            that.hideResizers(e.target);
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

        e.stopPropagation();
        that.resetEvents(e);
        return that;
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
            let oldPos = that.oldEventPosition;
            let newPos = {
                x: e.x,
                y: e.y
            };
            let eventTarget = that.eventTarget;
            let currentResizerIndex = 0;
            let isRotationResizer = false;
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
            let edgePoint = that.resizers[oppositeResizerIndex].cachedBBox.getCenter();
            let movingEdgePoint = that.resizers[currentResizerIndex].getBBox().getCenter();
            let dx = 0;
            let dy = 0;
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
