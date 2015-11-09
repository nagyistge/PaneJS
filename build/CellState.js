define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Point = require('./Point');
var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    view: null,
    cell: null,
    style: null,    // cellStyle
    shape: null,    // 图形
    text: null,     // 文本
    invalid: true,  // 默认为无效，需要重绘
    origin: null,
    absolutePoints: null, // 连线的关键点
    absoluteOffset: null, // 对于连线，表示连线上 label 的绝对位置
                          // 对于节点，表示节点中 label 相对于节点左上角的位置

    segments: null,       // 连线每个片段的长度
    //length: 0, // FIXME: length 导致 isArrayLike 判断出错，用下面的 edgeLength 代替
    edgeLength: 0,        // 连线的长度
    terminalDistance: 0,  // 连线起点和终点之间的直线距离
    visibleSourceState: null,
    visibleTargetState: null,

    // 构造函数
    constructor: function CellState(view, cell, style) {

        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    getPerimeterBounds: function (border, bounds) {

        var that = this;
        var shape = that.shape;

        border = border || 0;
        bounds = bounds ? bounds : new Rectangle(that.x, that.y, that.width, that.height);


        if (shape && shape.stencil) {
            var aspect = shape.stencil.computeAspect(that.style, bounds.x, bounds.y, bounds.width, bounds.height);

            bounds.x = aspect.x;
            bounds.y = aspect.y;
            bounds.width = shape.stencil.w0 * aspect.width;
            bounds.height = shape.stencil.h0 * aspect.height;
        }

        border && bounds.grow(border);

        return bounds;
    },

    // 设置连线起点或终点的位置
    setAbsoluteTerminalPoint: function (point, isSource) {

        var that = this;
        var points = that.absolutePoints;

        if (!points) {
            points = that.absolutePoints = [];
        }

        var length = points.length;

        if (isSource) {
            length
                ? points[0] = point
                : points.push(point);
        } else {
            if (length === 0) {
                points.push(null);
                points.push(point);
            } else if (length === 1) {
                points.push(point);
            } else {
                points[length - 1] = point;
            }
        }

        return that;
    },

    setCursor: function (cursor) {

        var that = this;
        var shape = that.shape;
        var text = that.text;

        shape && shape.setCursor(cursor);
        text && text.setCursor(cursor);

        return that;
    },

    getVisibleTerminal: function (isSource) {
        var state = this.getVisibleTerminalState(isSource);

        return state ? state.cell : null;
    },

    getVisibleTerminalState: function (isSource) {
        return isSource ? this.visibleSourceState : this.visibleTargetState;
    },

    setVisibleTerminalState: function (terminalState, isSource) {
        if (isSource) {
            this.visibleSourceState = terminalState;
        } else {
            this.visibleTargetState = terminalState;
        }
    },

    getCellBounds: function () {
        return this.cellBounds;
    },

    getPaintBounds: function () {
        return this.paintBounds;
    },

    updateCachedBounds: function () {

        var that = this;
        var view = that.view;
        var shape = that.shape;
        var ts = view.translate;
        var scale = view.scale;

        // 计算 translate 和 scale 之前的 bound
        that.cellBounds = new Rectangle(that.x / scale - ts.x, that.y / scale - ts.y, that.width / scale, that.height / scale);
        that.paintBounds = Rectangle.fromRectangle(that.cellBounds);

        if (shape && shape.isPaintBoundsInverted()) {
            that.paintBounds.rotate90();
        }
    },

    clone: function () {

    },

    destroy: function () {
        this.view.graph.cellRenderer.destroy(this);
    }
});

});