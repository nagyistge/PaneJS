import { each }  from '../common/utils';
import Point     from '../lib/Point';
import Rectangle from '../lib/Rectangle';

var State = Rectangle.extend({


    invalid: true, // 默认为无效，需要重绘

    constructor: function State(view, cell, style) {

        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        // cell 在画布上的原始（scale 和 translate）坐标，在 view.validateCellState() 过程中更新
        that.origin = new Point();
        // 对于连线来说，这是 label 的绝对位置，对于节点来说，这是 label 相对于节点左上角的位置
        that.absoluteOffset = new Point();


        // props
        // -----
        // that.shape = null;
        // that.text = null;
        // that.cellBounds = null;        // 缩放和平移之前的边界
        // that.paintBounds = null;       // 缩放和平移之前的绘图边界，cellBounds 或旋转 90° 之后的 cellBounds
        // that.absolutePoints = null;    // 连线关键点的坐标数组
        // that.visibleSourceState =null;
        // that.visibleTargetState =null;
        // that.terminalDistance = 0;     // 连线起点和终点之间的距离
        // that.segments = null;          // 连线每个片段的长度
        // that.length = 0;               // 连线的长度
    },

    getPerimeterBounds: function (border, bounds) {

        var that = this;

        border = border || 0;
        bounds = bounds ? bounds : new Rectangle(that.x, that.y, that.width, that.height);

        if (border) {
            bounds.grow(border);
        }

        return bounds;
    },

    // 设置连线起点或终点的坐标
    setAbsolutePoint: function (point, isSource) {
        var that = this;
        var absolutePoints = that.absolutePoints;

        if (!absolutePoints) {
            absolutePoints = that.absolutePoints = [];
        }

        var length = absolutePoints.length;

        if (isSource) {
            length
                ? absolutePoints[0] = point
                : absolutePoints.push(point);
        } else {
            if (length === 0) {
                absolutePoints.push(null);
                absolutePoints.push(point);
            } else if (length === 1) {
                absolutePoints.push(point);
            } else {
                absolutePoints[length - 1] = point;
            }
        }

        return that;
    },

    // 设置鼠标样式
    setCursor: function (cursor) {

        var that = this;

        that.shape && that.shape.setCursor(cursor);
        that.text && that.text.setCursor(cursor);

        return that;
    },

    // 获取连线连接的可见起点/终点节点
    getVisibleTerminal: function (isSource) {
        var state = this.getVisibleTerminalState(isSource);
        return state ? state.cell : null;
    },

    getVisibleTerminalState: function (isSource) {
        return isSource ? this.visibleSourceState : this.visibleTargetState;
    },

    setVisibleTerminalState: function (state, isSource) {

        var that = this;

        if (isSource) {
            that.visibleSourceState = state;
        } else {
            that.visibleTargetState = state;
        }

        return that;
    },

    updateCachedBounds: function () {

        var that = this;
        var view = that.view;
        var shape = that.shape;
        var scale = view.scale;
        var translate = view.translate;

        // 计算缩放和平移之前的边界
        var x = that.x / scale - translate.x;
        var y = that.y / scale - translate.y;
        var w = that.width / scale;
        var h = that.height / scale;

        that.cellBounds = new Rectangle(x, y, w, h);
        that.paintBounds = new Rectangle(x, y, w, h);

        // 如果需要旋转，则旋转绘图边界
        if (shape && shape.isPaintBoundsInverted()) {
            that.paintBounds.rotate90();
        }
    },

    destroy: function () {},

    clone: function () {

        var that = this;
        var cloned = new State(that.view, that.cell, that.style);

        if (that.absolutePoints) {
            cloned.absolutePoints = [];

            for (var i = 0, l = this.absolutePoints.length; i < l; i++) {
                cloned.absolutePoints[i] = this.absolutePoints[i].clone();
            }
        }

        if (that.origin) {
            cloned.origin = that.origin.clone();
        }

        if (that.absoluteOffset) {
            cloned.absoluteOffset = that.absoluteOffset.clone();
        }

        if (that.boundingBox) {
            cloned.boundingBox = that.boundingBox.clone();
        }

        cloned.terminalDistance = that.terminalDistance;
        cloned.segments = that.segments;
        cloned.length = that.length;
        cloned.x = that.x;
        cloned.y = that.y;
        cloned.width = that.width;
        cloned.height = that.height;

        return cloned;
    }
});


export default State;
