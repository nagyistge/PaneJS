/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Klass = require('./class');
var utils = require('./utils');
var constants = require('./constants');
//var Point = require('./Point');
var Rectangle = require('./Rectangle');
var Canvas2D = require('./Canvas2D');

var each = utils.each;

var Shape = Klass.create({
    constructor: function Shape() {
        var shape = this;

        shape.strokewidth = 1;
        shape.rotation = 0;
        shape.opacity = 100;
        shape.flipH = false; // 水平翻转
        shape.flipV = false; // 垂直翻转
    },

    scale: 1,
    antiAlias: true, // 抗锯齿，平滑处理
    bounds: null,
    points: null,
    node: null,     // 形状的根节点
    state: null,    // cellState
    style: null,    // cellStyle
    boundingBox: null,
    stencil: null,
    svgStrokeTolerance: 8,
    pointerEvents: true,
    svgPointerEvents: 'all',
    shapePointerEvents: false,
    stencilPointerEvents: false,
    outline: false,
    visible: true,

    init: function (container) {

        var shape = this;

        if (shape.node || !container) {
            return;
        }

        var node = shape.create(container);

        if (node) {
            shape.node = node;
            container.appendChild(node);
        }

        return shape;
    },

    create: function (container) {

        return container && container.ownerSVGElement ?
            document.createElementNS(constants.NS_SVG, 'g') :
            null;
    },

    clear: function () {

        var shape = this;
        var node = shape.node;

        if (node && node.ownerDocument) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return shape;
    },

    getScreenOffset: function () {

    },

    reconfigure: function () {
        return this.redraw();
    },

    redraw: function () {

        var shape = this;
        var node = shape.node;

        shape.updateBoundsFromPoints();

        if (shape.visible && shape.checkBounds()) {
            node.style.visibility = 'visible';
            shape.clear()
                .redrawShape()
                .updateBoundingBox();
        } else {
            node.style.visibility = 'hidden';
            shape.boundingBox = null;
        }

        return shape;
    },

    redrawShape: function () {

        var shape = this;
        var canvas = shape.createCanvas();

        if (canvas !== null) {
            canvas.pointerEvents = shape.pointerEvents;

            shape.paint(canvas)
                .destroyCanvas(canvas);
        }

        return shape;
    },

    paint: function (/*canvas*/) {
        var shape = this;
        return shape;
    },

    updateBoundsFromPoints: function () {

        var shape = this;
        var bounds = null;

        each(shape.points || [], function (point) {

            if (!point) {
                return;
            }

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (bounds) {
                bounds.add(rect);
            } else {
                bounds = rect;
            }
        });

        shape.bounds = bounds;

        return shape;
    },

    checkBounds: function () {

        var bounds = this.bounds;

        return bounds && !isNaN(bounds.x) && !isNaN(bounds.y) && !isNaN(bounds.width) && !isNaN(bounds.height) &&
            bounds.width > 0 &&
            bounds.height > 0;
    },

    getLabelBounds: function (rect) {
        return rect;
    },

    getGradientBounds: function (c, x, y, w, h) {
        return new Rectangle(x, y, w, h);
    },

    createBoundingBox: function () {},

    updateBoundingBox: function () {},

    augmentBoundingBox: function () {},

    createCanvas: function () {

        var shape = this;
        var node = shape.node;
        var canvas = new Canvas2D(node, false);

        canvas.strokeTolerance = shape.pointerEvents ? shape.svgStrokeTolerance : 0;
        canvas.pointerEventsValue = shape.svgPointerEvents;
        canvas.blockImagePointerEvents = false;//mxClient.IS_FF;
        canvas.antiAlias = shape.antiAlias;

        var off = this.getSvgScreenOffset();

        if (off === 0) {
            node.removeAttribute('transform');
        } else {
            node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
        }

        if (shape.outline) {
            canvas.setStrokeWidth(this.strokewidth);
            canvas.setStrokeColor(this.stroke);

            if (this.isDashed !== null) {
                canvas.setDashed(this.isDashed);
            }

            canvas.setStrokeWidth = function () {};
            canvas.setStrokeColor = function () {};
            canvas.setFillColor = function () {};
            canvas.setGradient = function () {};
            canvas.setDashed = function () {};
        }

        return canvas;
    },

    configureCanvas: function () {},

    destroyCanvas: function () {

    },

    setCursor: function (cursor) {

        var shape = this;
        var node = shape.node;

        cursor = cursor || '';

        shape.cursor = cursor;

        if (node) {
            node.style.cursor = cursor;
        }

        return shape;
    },

    getCursor: function () {
        return this.cursor;
    },

    getRotation: function () {
        var rotation = this.rotation;
        return utils.isNullOrUndefined(rotation) ? 0 : rotation;
    },

    getTextRotation: function () {
        var shape = this;
        var rot = shape.getRotation();

        return rot;
    },

    getShapeRotation: function () {
        var shape = this;
        var rot = shape.getRotation();

        return rot;
    },

    destroy: function () {
    }
});

module.exports = Shape;
