import {
    toRadians
} from  '../common/utils'

import Rectangle from './Rectangle';

export default Rectangle.extend({

    //TRANSLATE_CONTROL_POINTS: true,

    constructor: function Geometry(x, y, width, height, relative) {

        var that = this;

        Geometry.superclass.constructor.call(that, x, y, width, height);

        that.relative = !!relative;

        // props
        // -----
        // that.alternateBounds = null; //
        // that.sourcePoint = null;     // 连线的起点坐标。如果一个连线没有对应的起点
        //                              // 节点，用该点来指定该连线的起点；否则，就忽
        //                              // 略该点，连线的起点坐标将自动计算得到。
        // that.targetPoint = null;     // 连线的终点坐标。
        // that.points = null;          // 连线中的控制点坐标，这些点不包含连线的起点和终点的坐标。
        // that.offset = null;          //

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

        return that;
    },

    // 根据给定的旋转中心旋转给定的角度。
    //
    rotate: function (angle, cx) {

        var that = this;

        var rad = toRadians(angle);
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);

        // 只有绝对定位时才旋转 x 和 y
        if (!that.relative) {
            var ct = new Point(this.getCenterX(), this.getCenterY());
            var pt = utils.getRotatedPoint(ct, cos, sin, cx);

            this.x = Math.round(pt.x - this.width / 2);
            this.y = Math.round(pt.y - this.height / 2);
        }

        if (that.sourcePoint) {
            var pt = utils.getRotatedPoint(this.sourcePoint, cos, sin, cx);
            this.sourcePoint.x = Math.round(pt.x);
            this.sourcePoint.y = Math.round(pt.y);
        }

        if (that.targetPoint) {
            var pt = utils.getRotatedPoint(this.targetPoint, cos, sin, cx);
            this.targetPoint.x = Math.round(pt.x);
            this.targetPoint.y = Math.round(pt.y);
        }

        // Translate the control points
        if (that.points) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    var pt = utils.getRotatedPoint(this.points[i], cos, sin, cx);
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

    equals: function () {

    }
});
