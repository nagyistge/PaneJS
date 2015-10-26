/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Base = require('../Base');
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

var Shape = Base.extend({

    node: null,         // 图形的根节点，通常是 g 元素
    state: null,        // cellState
    style: null,        // cellStyle
    bounds: null,       // Rectangle 表示该图形的区域范围
    boundingBox: null,  // 图形的边框
    stencil: null,
    scale: 1,
    points: null,
    antiAlias: true,    // 抗锯齿，平滑处理
    pointerEvents: true,
    svgPointerEvents: 'all',
    svgStrokeTolerance: 8,
    shapePointerEvents: false,
    stencilPointerEvents: false,

    outline: false,
    visible: true,      // 默认可见

    constructor: function Shape(stencil) {

        var that = this;

        that.stencil = stencil; // 模板
        that.strokewidth = 1;
        that.rotation = 0;
        that.opacity = 100;
        that.flipH = false;    // 水平翻转
        that.flipV = false;    // 垂直翻转
    },

    // 根据 state.style 初始化该图形的样式属性
    apply: function (state) {

        var that = this;

        that.state = state;
        that.style = state.style;

        if (that.style) {
            that.fill = getValue(that.style, constants.STYLE_FILLCOLOR, that.fill);
            that.gradient = getValue(that.style, constants.STYLE_GRADIENTCOLOR, that.gradient);
            that.gradientDirection = getValue(that.style, constants.STYLE_GRADIENT_DIRECTION, that.gradientDirection);
            that.opacity = getValue(that.style, constants.STYLE_OPACITY, that.opacity);
            that.stroke = getValue(that.style, constants.STYLE_STROKECOLOR, that.stroke);
            that.strokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokewidth);
            // Arrow stroke width is used to compute the arrow heads size in mxConnector
            that.arrowStrokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokewidth);
            that.spacing = getValue(that.style, constants.STYLE_SPACING, that.spacing);
            that.startSize = getNumber(that.style, constants.STYLE_STARTSIZE, that.startSize);
            that.endSize = getNumber(that.style, constants.STYLE_ENDSIZE, that.endSize);
            that.startArrow = getValue(that.style, constants.STYLE_STARTARROW, that.startArrow);
            that.endArrow = getValue(that.style, constants.STYLE_ENDARROW, that.endArrow);
            that.rotation = getValue(that.style, constants.STYLE_ROTATION, that.rotation);
            that.direction = getValue(that.style, constants.STYLE_DIRECTION, that.direction);
            that.flipH = getValue(that.style, constants.STYLE_FLIPH, 0) === 1;
            that.flipV = getValue(that.style, constants.STYLE_FLIPV, 0) === 1;

            // Legacy support for stencilFlipH/V
            if (that.stencil) {
                that.flipH = getValue(that.style, 'stencilFlipH', 0) === 1 || that.flipH;
                that.flipV = getValue(that.style, 'stencilFlipV', 0) === 1 || that.flipV;
            }

            if (that.direction === constants.DIRECTION_NORTH || that.direction === constants.DIRECTION_SOUTH) {
                var tmp = that.flipH;
                that.flipH = that.flipV;
                that.flipV = tmp;
            }

            that.isShadow = getValue(that.style, constants.STYLE_SHADOW, that.isShadow) === 1;
            that.isDashed = getValue(that.style, constants.STYLE_DASHED, that.isDashed) === 1;
            that.isRounded = getValue(that.style, constants.STYLE_ROUNDED, that.isRounded) === 1;
            that.glass = getValue(that.style, constants.STYLE_GLASS, that.glass) === 1;

            if (that.fill === constants.NONE) {
                that.fill = null;
            }

            if (that.gradient === constants.NONE) {
                that.gradient = null;
            }

            if (that.stroke === constants.NONE) {
                that.stroke = null;
            }
        }

        return that;
    },

    // 创建该图形的根节点
    init: function (container) {

        var that = this;
        var node = that.node || that.create(container);

        if (node && container) {
            that.node = node;
            container.appendChild(node);
        }

        return that;
    },

    create: function (container) {

        return container && container.ownerSVGElement ?
            document.createElementNS(constants.NS_SVG, 'g') :
            null;
    },

    // 删除根节点下所有的子元素
    clear: function () {

        var that = this;
        var node = that.node;

        if (node && node.ownerDocument) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return that;
    },

    getScreenOffset: function () {

        var that = this;
        var strokeWidth = that.stencil && that.stencil.strokewidth !== 'inherit'
            ? that.stencil.strokewidth
            : that.strokewidth;

        return (utils.mod(Math.max(1, Math.round(strokeWidth * that.scale)), 2) === 1) ? 0.5 : 0;
    },

    reconfigure: function () {
        return this.redraw();
    },

    redraw: function () {

        var that = this;
        var node = that.node;

        that.updateBoundsFromPoints();

        if (that.visible && that.checkBounds()) {
            node.style.visibility = 'visible';
            // 删除根节点下的所有子元素
            that.clear();
            //
            that.redrawShape();
            that.updateBoundingBox();
        } else {
            node.style.visibility = 'hidden';
            that.boundingBox = null;
        }

        return that;
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

        var that = this;
        var bounds = that.bounds;

        // Scale is passed-through to canvas
        var scale = that.scale;
        var x = bounds.x / scale;
        var y = bounds.y / scale;
        var w = bounds.width / scale;
        var h = bounds.height / scale;

        if (that.isPaintBoundsInverted()) {

            var t = (w - h) / 2;
            x += t;
            y -= t;

            var tmp = w;
            w = h;
            h = tmp;
        }

        that.updateTransform(canvas, x, y, w, h);
        that.configureCanvas(canvas, x, y, w, h);

        // Adds background rectangle to capture events
        var bg = null;

        if ((!that.stencil && !that.points && that.shapePointerEvents) ||
            (that.stencil && that.stencilPointerEvents)) {

            var bb = that.createBoundingBox();

            bg = that.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
            that.node.appendChild(bg);
        }


        if (that.stencil) {
            that.stencil.drawShape(canvas, that, x, y, w, h);
        } else {
            // Stencils have separate strokeWidth
            canvas.setStrokeWidth(that.strokewidth);

            if (that.points) {
                // Paints edge shape
                var pts = [];

                for (var i = 0; i < that.points.length; i++) {
                    if (that.points[i]) {
                        pts.push(new Point(that.points[i].x / scale, that.points[i].y / scale));
                    }
                }

                that.paintEdgeShape(canvas, pts);
            } else {
                // Paints vertex shape
                that.paintVertexShape(canvas, x, y, w, h);
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

    paintBackground: function (c, x, y, w, h) { },

    paintForeground: function (c, x, y, w, h) { },

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

        var that = this;
        var bounds;

        each(that.points || [], function (point, index) {

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (index === 0) {
                that.bounds = bounds = rect;
            } else {
                bounds.add(rect);
            }
        });

        return that;
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
            //rot += mxText.prototype.verticalTextRotation;
            rot += -90;
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
