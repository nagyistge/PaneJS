import {
    each,
    clone,
    toFloat,
    toRadians,
    scalePoint,
    rotatePointEx,
    translatePoint,
    isEqualEntity,
    isEqualEntities
} from  '../common/utils'

import Rectangle from '../lib/Rectangle';

var Geometry = Rectangle.extend({

    TRANSLATE_CONTROL_POINTS: true, // 是否平移控制点，默认为 true

    constructor: function Geometry(x, y, width, height, relative) {

        var that = this;

        Geometry.superclass.constructor.call(that, x, y, width, height);

        // relative 为 true 时，即相对定位，x 和 y 是相对父节点 w 和 h 上的百分比；
        // 绝对定位时，x 和 y 是相对于父节点左上角的坐标
        that.relative = !!relative;


        // props
        // -----
        // that.alternateBounds = null; //
        // that.sourcePoint = null;     // 连线的起点坐标。如果一个连线没有对应的起点
        //                              // 节点，用该点来指定该连线的起点；否则，就忽
        //                              // 略该点，连线的起点坐标将自动计算得到。
        // that.targetPoint = null;     // 连线的终点坐标。
        // that.points = null;          // 连线中的控制点坐标，这些点不包含连线的起点和终点的坐标。
        // that.offset = null;          // 对于连线，是相对于 x 和 y 的偏移量
        //                              // 对于节点，

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

    // 根据给定的旋转中心旋转给定的角度
    rotate: function (angle, center) {

        var that = this;

        var rad = toRadians(angle);
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);

        // 只有绝对定位时才旋转 x 和 y
        if (!that.relative) {
            // 按照几何中心旋转
            var geoCenter = rotatePointEx(that.getCenter(), cos, sin, center);

            that.x = Math.round(geoCenter.x - that.width / 2);
            that.y = Math.round(geoCenter.y - that.height / 2);
        }

        that.sourcePoint && rotatePointEx(that.sourcePoint, cos, sin, center, true);
        that.targetPoint && rotatePointEx(that.targetPoint, cos, sin, center, true);

        that.points && each(that.points, function (point) {
            rotatePointEx(point, cos, sin, center, true);
        });
    },

    // 平移
    translate: function (dx, dy) {

        var that = this;

        dx = toFloat(dx);
        dy = toFloat(dy);

        if (!that.relative) {
            that.x = toFloat(that.x) + dx;
            that.y = toFloat(that.y) + dy;
        }

        that.sourcePoint && translatePoint(that.sourcePoint, dx, dy);
        that.targetPoint && translatePoint(that.targetPoint, dx, dy);

        if (that.TRANSLATE_CONTROL_POINTS && that.points) {
            each(that.points, function (point) {
                translatePoint(point, dx, dy);
            });
        }

        return that;
    },

    // 缩放
    scale: function (sx, sy, sameRatio) {

        var that = this;

        sx = toFloat(sx);
        sy = toFloat(sy);

        that.sourcePoint && scalePoint(that.sourcePoint, sx, sy);
        that.targetPoint && scalePoint(that.targetPoint, sx, sy);

        that.points && each(that.points, function (point) {
            scalePoint(point, sx, sy);
        });

        if (!that.relative) {
            that.x = toFloat(that.x) * sx;
            that.y = toFloat(that.y) * sy;

            // 长宽按固定比例缩放
            if (sameRatio) {
                sy = sx = Math.min(sx, sy);
            }

            that.width = toFloat(that.width) * sx;
            that.height = toFloat(that.height) * sy;
        }

        return that;
    },

    equals: function (geom) {

        var that = this;

        return Geometry.superclass.equals.call(that, geo) &&
            that.relative === geo.relative &&
            isEqualEntity(that.sourcePoint, geom.sourcePoint) &&
            isEqualEntity(that.targetPoint, geom.targetPoint) &&
            isEqualEntity(that.offset, geom.offset) &&
            isEqualEntities(that.points, geom.points) &&
            isEqualEntity(that.alternateBounds, geom.alternateBounds);
    },

    clone: function () {
        return clone(this);
    }
});

export default Geometry;
