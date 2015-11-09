define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    TRANSLATE_CONTROL_POINTS: true,
    alternateBounds: null,
    sourcePoint: null,
    targetPoint: null,
    points: null,
    offset: null,
    relative: false,

    constructor: function Geometry(x, y, width, height) {
        Geometry.superclass.constructor.call(this, x, y, width, height);
    },

    swap: function () {

        var that = this;
        var alternateBounds = that.alternateBounds;

        if (alternateBounds) {
            var old = new Rectangle(that.x, that.y, that.width, that.height);

            that.x = alternateBounds.x;
            that.y = alternateBounds.y;
            that.width = alternateBounds.width;
            that.height = alternateBounds.height;

            that.alternateBounds = old;
        }

        return that;
    },

    getTerminalPoint: function (isSource) {
        return isSource ? this.sourcePoint : this.targetPoint;
    },

    setTerminalPoint: function (point, isSource) {
        var that = this;
        if (isSource) {
            that.sourcePoint = point;
        } else {
            that.targetPoint = point;
        }

        return point;
    },

    rotate: function (angle, cx) {

        var that = this;

        var rad = utils.toRadians(angle);
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);

        // Rotates the geometry
        if (!this.relative) {
            var ct = new Point(this.getCenterX(), this.getCenterY());
            var pt = Point.getRotatedPoint(ct, cos, sin, cx);

            this.x = Math.round(pt.x - this.width / 2);
            this.y = Math.round(pt.y - this.height / 2);
        }

        // Rotates the source point
        if (this.sourcePoint) {
            var pt = Point.getRotatedPoint(this.sourcePoint, cos, sin, cx);
            this.sourcePoint.x = Math.round(pt.x);
            this.sourcePoint.y = Math.round(pt.y);
        }

        // Translates the target point
        if (this.targetPoint) {
            var pt = Point.getRotatedPoint(this.targetPoint, cos, sin, cx);
            this.targetPoint.x = Math.round(pt.x);
            this.targetPoint.y = Math.round(pt.y);
        }

        // Translate the control points
        if (this.points != null) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    var pt = Point.getRotatedPoint(this.points[i], cos, sin, cx);
                    this.points[i].x = Math.round(pt.x);
                    this.points[i].y = Math.round(pt.y);
                }
            }
        }
    },
    translate: function (dx, dy) {
        dx = parseFloat(dx);
        dy = parseFloat(dy);

        // Translates the geometry
        if (!this.relative) {
            this.x = parseFloat(this.x) + dx;
            this.y = parseFloat(this.y) + dy;
        }

        // Translates the source point
        if (this.sourcePoint != null) {
            this.sourcePoint.x = parseFloat(this.sourcePoint.x) + dx;
            this.sourcePoint.y = parseFloat(this.sourcePoint.y) + dy;
        }

        // Translates the target point
        if (this.targetPoint != null) {
            this.targetPoint.x = parseFloat(this.targetPoint.x) + dx;
            this.targetPoint.y = parseFloat(this.targetPoint.y) + dy;
        }

        // Translate the control points
        if (this.TRANSLATE_CONTROL_POINTS && this.points != null) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    this.points[i].x = parseFloat(this.points[i].x) + dx;
                    this.points[i].y = parseFloat(this.points[i].y) + dy;
                }
            }
        }
    },
    scale: function (sx, sy, fixedAspect) {
        sx = parseFloat(sx);
        sy = parseFloat(sy);

        // Translates the source point
        if (this.sourcePoint != null) {
            this.sourcePoint.x = parseFloat(this.sourcePoint.x) * sx;
            this.sourcePoint.y = parseFloat(this.sourcePoint.y) * sy;
        }

        // Translates the target point
        if (this.targetPoint != null) {
            this.targetPoint.x = parseFloat(this.targetPoint.x) * sx;
            this.targetPoint.y = parseFloat(this.targetPoint.y) * sy;
        }

        // Translate the control points
        if (this.points != null) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    this.points[i].x = parseFloat(this.points[i].x) * sx;
                    this.points[i].y = parseFloat(this.points[i].y) * sy;
                }
            }
        }

        // Translates the geometry
        if (!this.relative) {
            this.x = parseFloat(this.x) * sx;
            this.y = parseFloat(this.y) * sy;

            if (fixedAspect) {
                sy = sx = Math.min(sx, sy);
            }

            this.width = parseFloat(this.width) * sx;
            this.height = parseFloat(this.height) * sy;
        }
    },

    equals: function (/*obj*/) {

    }
});
});