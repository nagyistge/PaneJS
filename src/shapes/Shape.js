/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('../common/class');
var utils = require('../common/utils');
var constants = require('../constants');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var Canvas2D = require('../Canvas2D');


var each = utils.each;
var getValue = utils.getValue;
var getNumber = utils.getNumber;
var isNullOrUndefined = utils.isNullOrUndefined;

// style 的属性：style[constants.STYLE_SHAPE]

var Shape = Class.create({

    node: null,     // 图形的根节点，通常是 g 元素
    state: null,    // cellState
    style: null,    // cellStyle
    bounds: null,   // Rectangle 表示该图形的区域范围
    boundingBox: null, // 图形的边框
    stencil: null,
    scale: 1,
    points: null,
    svgStrokeTolerance: 8,
    antiAlias: true, // 抗锯齿，平滑处理
    pointerEvents: true,
    svgPointerEvents: 'all',
    shapePointerEvents: false,
    stencilPointerEvents: false,
    outline: false,
    visible: true,

    constructor: function Shape(stencil) {
        var shape = this;

        shape.stencil = stencil; // 模板
        shape.strokewidth = 1;
        shape.rotation = 0;
        shape.opacity = 100;
        shape.flipH = false; // 水平翻转
        shape.flipV = false; // 垂直翻转
    },

    // 根据 state.style 初始化该图形的样式属性
    apply: function (state) {

        var shape = this;

        shape.state = state;
        shape.style = state.style;

        if (shape.style) {
            shape.fill = getValue(shape.style, constants.STYLE_FILLCOLOR, shape.fill);
            shape.gradient = getValue(shape.style, constants.STYLE_GRADIENTCOLOR, shape.gradient);
            shape.gradientDirection = getValue(shape.style, constants.STYLE_GRADIENT_DIRECTION, shape.gradientDirection);
            shape.opacity = getValue(shape.style, constants.STYLE_OPACITY, shape.opacity);
            shape.stroke = getValue(shape.style, constants.STYLE_STROKECOLOR, shape.stroke);
            shape.strokewidth = getNumber(shape.style, constants.STYLE_STROKEWIDTH, shape.strokewidth);
            // Arrow stroke width is used to compute the arrow heads size in mxConnector
            shape.arrowStrokewidth = getNumber(shape.style, constants.STYLE_STROKEWIDTH, shape.strokewidth);
            shape.spacing = getValue(shape.style, constants.STYLE_SPACING, shape.spacing);
            shape.startSize = getNumber(shape.style, constants.STYLE_STARTSIZE, shape.startSize);
            shape.endSize = getNumber(shape.style, constants.STYLE_ENDSIZE, shape.endSize);
            shape.startArrow = getValue(shape.style, constants.STYLE_STARTARROW, shape.startArrow);
            shape.endArrow = getValue(shape.style, constants.STYLE_ENDARROW, shape.endArrow);
            shape.rotation = getValue(shape.style, constants.STYLE_ROTATION, shape.rotation);
            shape.direction = getValue(shape.style, constants.STYLE_DIRECTION, shape.direction);
            shape.flipH = getValue(shape.style, constants.STYLE_FLIPH, 0) === 1;
            shape.flipV = getValue(shape.style, constants.STYLE_FLIPV, 0) === 1;

            // Legacy support for stencilFlipH/V
            if (shape.stencil) {
                shape.flipH = getValue(shape.style, 'stencilFlipH', 0) === 1 || shape.flipH;
                shape.flipV = getValue(shape.style, 'stencilFlipV', 0) === 1 || shape.flipV;
            }

            if (shape.direction === constants.DIRECTION_NORTH || shape.direction === constants.DIRECTION_SOUTH) {
                var tmp = shape.flipH;
                shape.flipH = shape.flipV;
                shape.flipV = tmp;
            }

            shape.isShadow = getValue(shape.style, constants.STYLE_SHADOW, shape.isShadow) === 1;
            shape.isDashed = getValue(shape.style, constants.STYLE_DASHED, shape.isDashed) === 1;
            shape.isRounded = getValue(shape.style, constants.STYLE_ROUNDED, shape.isRounded) === 1;
            shape.glass = getValue(shape.style, constants.STYLE_GLASS, shape.glass) === 1;

            if (shape.fill === constants.NONE) {
                shape.fill = null;
            }

            if (shape.gradient === constants.NONE) {
                shape.gradient = null;
            }

            if (shape.stroke === constants.NONE) {
                shape.stroke = null;
            }
        }

        return shape;
    },

    // 创建该图形的根节点
    init: function (container) {

        var shape = this;
        var node = shape.node || shape.create(container);

        if (node && container) {
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

    // 删除根节点下所有的子元素
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

        var shape = this;
        var strokeWidth = shape.stencil && shape.stencil.strokewidth !== 'inherit'
            ? shape.stencil.strokewidth
            : shape.strokewidth;

        return (utils.mod(Math.max(1, Math.round(strokeWidth * shape.scale)), 2) === 1) ? 0.5 : 0;
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

        var that = this;
        var canvas = that.createCanvas();

        if (canvas) {
            canvas.pointerEvents = that.pointerEvents;

            that.paint(canvas);
            that.destroyCanvas(canvas);
        }

        return that;
    },

    paint: function (canvas) {

        var shape = this;
        var bounds = shape.bounds;

        // Scale is passed-through to canvas
        var scale = shape.scale;
        var x = bounds.x / scale;
        var y = bounds.y / scale;
        var w = bounds.width / scale;
        var h = bounds.height / scale;

        if (shape.isPaintBoundsInverted()) {

            var t = (w - h) / 2;
            x += t;
            y -= t;

            var tmp = w;
            w = h;
            h = tmp;
        }

        shape.updateTransform(canvas, x, y, w, h);
        shape.configureCanvas(canvas, x, y, w, h);

        // Adds background rectangle to capture events
        var bg = null;

        if ((!shape.stencil && !shape.points && shape.shapePointerEvents) ||
            (shape.stencil && shape.stencilPointerEvents)) {

            var bb = shape.createBoundingBox();

            bg = shape.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
            shape.node.appendChild(bg);
        }


        if (shape.stencil) {
            shape.stencil.drawShape(canvas, shape, x, y, w, h);
        } else {
            // Stencils have separate strokewidth
            canvas.setStrokeWidth(shape.strokewidth);

            if (shape.points) {
                // Paints edge shape
                var pts = [];

                for (var i = 0; i < shape.points.length; i++) {
                    if (shape.points[i]) {
                        pts.push(new Point(shape.points[i].x / scale, shape.points[i].y / scale));
                    }
                }

                shape.paintEdgeShape(canvas, pts);
            } else {
                // Paints vertex shape
                shape.paintVertexShape(canvas, x, y, w, h);
            }
        }

        if (bg && canvas.state && canvas.state.transform) {
            bg.setAttribute('transform', canvas.state.transform);
        }
    },

    paintVertexShape: function (c, x, y, w, h) {
        this.paintBackground(c, x, y, w, h);
        c.setShadow(false);
        this.paintForeground(c, x, y, w, h);
    },

    paintBackground: function (c, x, y, w, h) {

    },

    paintForeground: function (c, x, y, w, h) {

    },

    paintEdgeShape: function (c, pts) {},

    paintGlassEffect: function (c, x, y, w, h, arc) {
        var sw = Math.ceil(this.strokewidth / 2);
        var size = 0.4;

        c.setGradient('#ffffff', '#ffffff', x, y, w, h * 0.6, 'south', 0.9, 0.1);
        c.begin();
        arc += 2 * sw;

        if (this.isRounded) {
            c.moveTo(x - sw + arc, y - sw);
            c.quadTo(x - sw, y - sw, x - sw, y - sw + arc);
            c.lineTo(x - sw, y + h * size);
            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            c.lineTo(x + w + sw, y - sw + arc);
            c.quadTo(x + w + sw, y - sw, x + w + sw - arc, y - sw);
        }
        else {
            c.moveTo(x - sw, y - sw);
            c.lineTo(x - sw, y + h * size);
            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            c.lineTo(x + w + sw, y - sw);
        }

        c.close();
        c.fill();
    },

    addPoints: function (c, pts, rounded, arcSize, close) {
        var pe = pts[pts.length - 1];

        // Adds virtual waypoint in the center between start and end point
        if (close && rounded) {
            pts = pts.slice();
            var p0 = pts[0];
            var wp = new Point(pe.x + (p0.x - pe.x) / 2, pe.y + (p0.y - pe.y) / 2);
            pts.splice(0, 0, wp);
        }

        var pt = pts[0];
        var i = 1;

        // Draws the line segments
        c.moveTo(pt.x, pt.y);

        while (i < ((close) ? pts.length : pts.length - 1)) {
            var tmp = pts[mxUtils.mod(i, pts.length)];
            var dx = pt.x - tmp.x;
            var dy = pt.y - tmp.y;

            if (rounded && (dx != 0 || dy != 0)) {
                // Draws a line from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the last point
                var dist = Math.sqrt(dx * dx + dy * dy);
                var nx1 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny1 = dy * Math.min(arcSize, dist / 2) / dist;

                var x1 = tmp.x + nx1;
                var y1 = tmp.y + ny1;
                c.lineTo(x1, y1);

                // Draws a curve from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the next point
                var next = pts[mxUtils.mod(i + 1, pts.length)];

                // Uses next non-overlapping point
                while (i < pts.length - 2 && Math.round(next.x - tmp.x) == 0 && Math.round(next.y - tmp.y) == 0) {
                    next = pts[mxUtils.mod(i + 2, pts.length)];
                    i++;
                }

                dx = next.x - tmp.x;
                dy = next.y - tmp.y;

                dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
                var nx2 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny2 = dy * Math.min(arcSize, dist / 2) / dist;

                var x2 = tmp.x + nx2;
                var y2 = tmp.y + ny2;

                c.quadTo(tmp.x, tmp.y, x2, y2);
                tmp = new Point(x2, y2);
            }
            else {
                c.lineTo(tmp.x, tmp.y);
            }

            pt = tmp;
            i++;
        }

        if (close) {
            c.close();
        }
        else {
            c.lineTo(pe.x, pe.y);
        }
    },

    updateBoundsFromPoints: function () {

        var shape = this;
        var bounds;

        each(shape.points || [], function (point, index) {

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (index === 0) {
                shape.bounds = bounds = rect;
            } else {
                bounds.add(rect);
            }
        });

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

    getArcSize: function (w, h) {
        var f = getValue(this.style, constants.STYLE_ARCSIZE,
                constants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
        return Math.min(w * f, h * f);
    },

    createBoundingBox: function () {

        var bb = this.bounds.clone();

        if ((this.stencil && (this.direction === constants.DIRECTION_NORTH ||
            this.direction === constants.DIRECTION_SOUTH)) || this.isPaintBoundsInverted()) {
            bb.rotate90();
        }

        return bb;
    },

    updateBoundingBox: function () {
        if (this.bounds != null) {
            var bbox = this.createBoundingBox();

            if (bbox != null) {
                this.augmentBoundingBox(bbox);
                var rot = this.getShapeRotation();

                if (rot != 0) {
                    bbox = mxUtils.getBoundingBox(bbox, rot);
                }
            }

            this.boundingBox = bbox;
        }
    },

    augmentBoundingBox: function (bbox) {
        if (this.isShadow) {
            bbox.width += Math.ceil(constants.SHADOW_OFFSET_X * this.scale);
            bbox.height += Math.ceil(constants.SHADOW_OFFSET_Y * this.scale);
        }

        // Adds strokeWidth
        bbox.grow(this.strokewidth * this.scale / 2);
    },

    updateTransform: function (canvas, x, y, w, h) {

        var shape = this;

        canvas.scale(shape.scale);
        canvas.rotate(shape.getShapeRotation(), shape.flipH, shape.flipV, x + w / 2, y + h / 2);

        return shape;
    },

    createCanvas: function () {

        var that = this;
        var node = that.node;
        var canvas = new Canvas2D(node, false);

        canvas.strokeTolerance = that.pointerEvents ? that.svgStrokeTolerance : 0;
        canvas.pointerEventsValue = that.svgPointerEvents;
        canvas.blockImagePointerEvents = false;//mxClient.IS_FF;
        canvas.antiAlias = that.antiAlias; // 抗锯齿

        var off = that.getScreenOffset();

        if (off === 0) {
            node.removeAttribute('transform');
        } else {
            node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
        }

        if (that.outline) {
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

    configureCanvas: function (canvas, x, y, w, h) {
        var dash;

        if (this.style) {
            dash = this.style['dashPattern'];
        }

        canvas.setAlpha(this.opacity / 100);

        // Sets alpha, colors and gradients
        if (this.isShadow != null) {
            canvas.setShadow(this.isShadow);
        }

        // Dash pattern
        if (this.isDashed != null) {
            canvas.setDashed(this.isDashed);
        }

        if (dash != null) {
            canvas.setDashPattern(dash);
        }

        if (this.fill != null && this.fill != constants.NONE && this.gradient && this.gradient != constants.NONE) {
            var b = this.getGradientBounds(canvas, x, y, w, h);
            canvas.setGradient(this.fill, this.gradient, b.x, b.y, b.width, b.height, this.gradientDirection);
        }
        else {
            canvas.setFillColor(this.fill);
        }

        canvas.setStrokeColor(this.stroke);
    },

    destroyCanvas: function (canvas) {

        each(canvas.gradients, function (gradient) {
            gradient.mxRefCount = (gradient.mxRefCount || 0) + 1;
        });
        this.releaseSvgGradients(this.oldGradients);
        this.oldGradients = canvas.gradients;
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
        return isNullOrUndefined(rotation) ? 0 : rotation;
    },

    getTextRotation: function () {
        var rot = this.getRotation();

        if (getValue(this.style, constants.STYLE_HORIZONTAL, 1) !== 1) {
            rot += mxText.prototype.verticalTextRotation;
        }

        return rot;
    },

    getShapeRotation: function () {
        var rot = this.getRotation();

        if (this.direction) {
            if (this.direction === constants.DIRECTION_NORTH) {
                rot += 270;
            }
            else if (this.direction === constants.DIRECTION_WEST) {
                rot += 180;
            }
            else if (this.direction === constants.DIRECTION_SOUTH) {
                rot += 90;
            }
        }

        return rot;
    },

    createTransparentSvgRectangle: function (x, y, w, h) {
        var rect = document.createElementNS(constants.NS_SVG, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', 'none');
        rect.setAttribute('pointer-events', 'all');

        return rect;
    },

    setTransparentBackgroundImage: function (node) {
        node.style.backgroundImage = 'url(\'' + mxClient.imageBasePath + '/transparent.gif\')';
    },

    releaseSvgGradients: function (grads) {
        if (grads != null) {
            for (var key in grads) {
                var gradient = grads[key];
                gradient.mxRefCount = (gradient.mxRefCount || 0) - 1;

                if (gradient.mxRefCount == 0 && gradient.parentNode != null) {
                    gradient.parentNode.removeChild(gradient);
                }
            }
        }
    },

    isPaintBoundsInverted: function () {
        return !this.stencil && (this.direction === constants.DIRECTION_NORTH ||
            this.direction === constants.DIRECTION_SOUTH);
    },

    destroy: function () {
        if (this.node) {
            mxEvent.release(this.node);

            if (this.node.parentNode) {
                this.node.parentNode.removeChild(this.node);
            }

            this.node = null;
        }

        // Decrements refCount and removes unused
        this.releaseSvgGradients(this.oldGradients);
        this.oldGradients = null;
    }
});

module.exports = Shape;
