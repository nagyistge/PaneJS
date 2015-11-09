import {
    mod,
    each,
    getValue,
    getNumber,
    createSvgElement,
    rotatePoint,
    isNullOrUndefined
} from '../common/utils';

import Base       from '../lib/Base';
import Canvas     from '../drawing/Canvas';
import Point      from '../lib/Point';
import Rectangle  from '../lib/Rectangle';
import detector   from '../common/detector';
import styleNames from '../enums/styleNames';
import directions from '../enums/directions';

var Shape = Base.extend({

    pointerEvents: true,
    svgPointerEvents: 'all',
    svgStrokeTolerance: 8,
    shapePointerEvents: false,
    stencilPointerEvents: false,

    constructor: function Shape(state, style, bounds) {

        var that = this;
        that.state = state;
        that.style = style;
        that.bounds = bounds;

        // props
        // -----
        // that.node = null;        // 图形的根节点，通常是 g 元素
        // that.points = null;      // 绘制连线需要的点
        // that.bounds = null;      // 表示该图形的区域范围
        // that.boundingBox = null; // 图形的边框
    },

    init: function (container) {

        var that = this;
        var node = that.node || that.create(container);

        if (node && container) {
            that.node = node;
            container.appendChild(node);
        }

        return that;
    },

    // create the root node
    create: function (container) {
        if (container && container.ownerSVGElement) {
            return createSvgElement('g');
        }
    },

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

    //getScreenOffset: function () {
    //
    //    var style = this.style;
    //    var strokeWidth = style.strokeWidth * style.scale;
    //
    //    strokeWidth = Math.max(1, Math.round(strokeWidth));
    //
    //    return mod(strokeWidth, 2) === 1 ? 0.5 : 0;
    //},

    redraw: function () {

        var that = this;
        var node = that.node;
        var style = that.style;

        that.updateLinkBounds();

        if (style.visible && that.checkBounds()) {
            node.style.visibility = 'visible';
            that.clear();
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

            that.draw(canvas);
            that.destroyCanvas(canvas);
        }

        return that;
    },


    draw: function (canvas) {

        var that = this;
        var bounds = that.bounds;
        var scale = that.style.scale;
        var x = bounds.x / scale;
        var y = bounds.y / scale;
        var w = bounds.width / scale;
        var h = bounds.height / scale;

        if (that.isPaintBoundsInverted()) {

            var t = (w - h) / 2;
            x += t;
            y -= t;

            t = w;
            w = h;
            h = t;
        }

        //that.updateTransform(canvas, x, y, w, h);
        //that.configureCanvas(canvas, x, y, w, h);

        // Adds background rectangle to capture events
        var bg = null;

        if (!that.points && that.shapePointerEvents) {

            var bb = that.createBoundingBox();

            bg = that.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
            that.node.appendChild(bg);
        }

        if (that.points) {

            var pts = [];
            for (var i = 0; i < that.points.length; i++) {
                if (that.points[i]) {
                    pts.push(new Point(that.points[i].x / scale, that.points[i].y / scale));
                }
            }

            // 绘制连线
            that.drawLink(canvas, pts);
        } else {
            // 绘制节点
            that.drawNode(canvas, x, y, w, h);
        }

        if (bg && canvas.state && canvas.state.transform) {
            bg.setAttribute('transform', canvas.state.transform);
        }
    },

    drawNode: function (canvas, x, y, w, h) {
        this.drawNodeBackground(canvas, x, y, w, h);
        canvas.style.shadow = false;
        this.drawNodeForeground(canvas, x, y, w, h);
    },

    // 绘制 node 背景
    drawNodeBackground: function (canvas, x, y, w, h) { },

    // 绘制 node 前景
    drawNodeForeground: function (canvas, x, y, w, h) { },

    drawLink: function (canvas, points) {},

    paintGlassEffect: function (canvas, x, y, w, h, arc) {
        var sw = Math.ceil(this.strokeWidth / 2);
        var size = 0.4;

        canvas.setGradient('#ffffff', '#ffffff', x, y, w, h * 0.6, 'south', 0.9, 0.1);
        canvas.begin();
        arc += 2 * sw;

        if (this.isRounded) {
            canvas.moveTo(x - sw + arc, y - sw);
            canvas.quadTo(x - sw, y - sw, x - sw, y - sw + arc);
            canvas.lineTo(x - sw, y + h * size);
            canvas.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            canvas.lineTo(x + w + sw, y - sw + arc);
            canvas.quadTo(x + w + sw, y - sw, x + w + sw - arc, y - sw);
        }
        else {
            canvas.moveTo(x - sw, y - sw);
            canvas.lineTo(x - sw, y + h * size);
            canvas.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            canvas.lineTo(x + w + sw, y - sw);
        }

        canvas.close();
        canvas.fill();
    },

    addPoints: function (canvas, pts, rounded, arcSize, close) {

        var lastPoint = pts[pts.length - 1];

        // Adds virtual waypoint in the center between start and end point
        if (close && rounded) {
            pts = pts.slice();
            var p0 = pts[0];
            var wp = new Point(lastPoint.x + (p0.x - lastPoint.x) / 2, lastPoint.y + (p0.y - lastPoint.y) / 2);
            pts.splice(0, 0, wp);
        }

        var firstPoint = pts[0];
        var i = 1;

        // Draws the line segments
        canvas.moveTo(firstPoint.x, firstPoint.y);

        while (i < ((close) ? pts.length : pts.length - 1)) {
            var tmp = pts[mod(i, pts.length)];
            var dx = firstPoint.x - tmp.x;
            var dy = firstPoint.y - tmp.y;

            if (rounded && (dx != 0 || dy != 0)) {
                // Draws a line from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the last point
                var dist = Math.sqrt(dx * dx + dy * dy);
                var nx1 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny1 = dy * Math.min(arcSize, dist / 2) / dist;

                var x1 = tmp.x + nx1;
                var y1 = tmp.y + ny1;
                canvas.lineTo(x1, y1);

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

                canvas.quadTo(tmp.x, tmp.y, x2, y2);
                tmp = new Point(x2, y2);
            }
            else {
                canvas.lineTo(tmp.x, tmp.y);
            }

            firstPoint = tmp;
            i++;
        }

        if (close) {
            canvas.close();
        } else {
            canvas.lineTo(lastPoint.x, lastPoint.y);
        }
    },

    checkBounds: function () {

        var bounds = this.bounds;

        return bounds
            && !isNaN(bounds.x)
            && !isNaN(bounds.y)
            && !isNaN(bounds.width)
            && !isNaN(bounds.height)
            && bounds.width > 0
            && bounds.height > 0;
    },

    updateLinkBounds: function () {

        var that = this;
        var points = that.points;
        var bounds;

        points && each(points, function (point, index) {

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (bounds) {
                bounds.add(rect);
            } else {
                that.bounds = bounds = rect;
            }
        });

        return that;
    },

    // 可以更改内部 label 的 bounds
    getLabelBounds: function (rect) {
        return rect;
    },

    getGradientBounds: function (canvas, x, y, w, h) {
        return new Rectangle(x, y, w, h);
    },

    // 圆弧尺寸
    getArcSize: function (w, h) {
        var f = getValue(this.style, constants.STYLE_ARCSIZE,
                constants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
        return Math.min(w * f, h * f);
    },

    createBoundingBox: function () {

        var that = this;
        var bbox = that.bounds.clone();

        if (that.isPaintBoundsInverted()) {
            bbox.rotate90();
        }

        return bbox;
    },

    updateBoundingBox: function () {

        var that = this;

        if (that.bounds) {
            var boundingBox = that.createBoundingBox();

            if (boundingBox) {
                that.augmentBoundingBox(boundingBox)
                    .rotateBoundingBox(boundingBox, that.getRotation());
            }

            that.boundingBox = boundingBox;
        }
    },

    augmentBoundingBox: function (bbox) {

        var that = this;
        var style = that.style;
        var scale = style.scale;

        if (style.shadow) {
            bbox.width += Math.ceil(style.shadowDx * scale);
            bbox.height += Math.ceil(style.shadowDY * scale);
        }

        // Adds strokeWidth
        bbox.grow(style.strokeWidth * scale / 2);

        return that;
    },

    rotateBoundingBox: function (bbox, degree, center) {

        if (bbox && degree) {

            center = center || bbox.getCenter();

            var p1 = new Point(bbox.x, bbox.y);
            var p2 = new Point(bbox.x + bbox.width, bbox.y);
            var p3 = new Point(p2.x, bbox.y + bbox.height);
            var p4 = new Point(bbox.x, p3.y);

            p1 = rotatePoint(p1, degree, center);
            p2 = rotatePoint(p2, degree, center);
            p3 = rotatePoint(p3, degree, center);
            p4 = rotatePoint(p4, degree, center);

            var result = new Rectangle(p1.x, p1.y, 0, 0);
            result.add(new Rectangle(p2.x, p2.y, 0, 0));
            result.add(new Rectangle(p3.x, p3.y, 0, 0));
            result.add(new Rectangle(p4.x, p4.y, 0, 0));

            bbox.setRect(result.x, result.y, result.width, result.height);
        }

        return this;
    },

    updateTransform: function (canvas, x, y, w, h) {

        var shape = this;

        canvas.scale(shape.scale);
        canvas.rotate(shape.getShapeRotation(), shape.flipH, shape.flipV, x + w / 2, y + h / 2);

        return shape;
    },

    createCanvas: function () {

        var that = this;
        var canvas = new Canvas(that.node, that.style);

        canvas.strokeTolerance = that.pointerEvents ? that.svgStrokeTolerance : 0;
        canvas.pointerEventsValue = that.svgPointerEvents;
        canvas.blockImagePointerEvents = detector.IS_FF;
        //canvas.antiAlias = that.antiAlias; // renderer.antiAlias -> shape.antiAlias -> canvas.antiAlias

        //var off = that.getScreenOffset();
        //
        //if (off === 0) {
        //    node.removeAttribute('transform');
        //} else {
        //    node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
        //}

        //if (that.outline) {
        //    canvas.setStrokeWidth(this.strokeWidth);
        //    canvas.setStrokeColor(this.stroke);
        //
        //    if (this.isDashed !== null) {
        //        canvas.setDashed(this.isDashed);
        //    }
        //
        //    canvas.setStrokeWidth = function () {};
        //    canvas.setStrokeColor = function () {};
        //    canvas.setFillColor = function () {};
        //    canvas.setGradient = function () {};
        //    canvas.setDashed = function () {};
        //}

        return canvas;
    },

    configureCanvas: function (canvas, x, y, w, h) {

        return;

        canvas.state = this.style;

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

        //each(canvas.gradients, function (gradient) {
        //    gradient.mxRefCount = (gradient.mxRefCount || 0) + 1;
        //});
        //this.releaseSvgGradients(this.oldGradients);
        //this.oldGradients = canvas.gradients;
    },

    setCursor: function (cursor) {

        var that = this;
        var node = that.node;

        cursor = cursor || '';

        that.cursor = cursor;

        if (node) {
            node.style.cursor = cursor;
        }

        return that;
    },

    getRotation: function () {

        var style = this.style;
        var rot = style.rotation || 0;
        var direction = style.direction;

        if (direction) {
            if (direction === 'north') {
                rot += 270;
            }
            else if (direction === 'west') {
                rot += 180;
            }
            else if (direction === 'south') {
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
        var direction = this.style.direction;
        return direction === 'north' || direction === 'south';
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

export default Shape;
