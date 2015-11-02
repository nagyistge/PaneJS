import Base from '../lib/Base';

export default Base.extend({
    constructor: function Path(canvas) {

        var that = this;
        that.canvas = canvas;
        that.lastX = 0;
        that.lastY = 0;
        that.paths = [];
    },

    addOp: function () {

        var that = this;
        var canvas = that.canvas;
        var paths = that.paths;
        var format = canvas.format;
        var state = canvas.state;
        var scale = state.scale;
        var length = arguments.length;

        if (paths) {
            paths.push(arguments[0]);

            if (length > 2) {
                for (var i = 2; i < length; i += 2) {
                    that.lastX = arguments[i - 1];
                    that.lastY = arguments[i];

                    paths.push(format((that.lastX + state.dx) * scale));
                    paths.push(format((that.lastY + state.dy) * scale));
                }
            }
        }

        return that;
    },

    moveTo: function (x, y) {
        return this.addOp('M', x, y);
    },

    lineTo: function (x, y) {
        return this.addOp('L', x, y);
    },

    // 二次贝塞尔曲线
    quadTo: function (x1, y1, x2, y2) {
        return this.addOp('Q', x1, y1, x2, y2);
    },

    // 三次贝塞尔曲线
    curveTo: function (x1, y1, x2, y2, x3, y3) {
        return this.addOp('C', x1, y1, x2, y2, x3, y3);
    },

    // 圆弧
    arcTo: function (/*rx, ry, angle, largeArcFlag, sweepFlag, x, y*/) {

    },

    close: function () {

        var that = this;
        var paths = that.paths;

        that.addOp('Z');
        that.canvas.node.setAttribute('d', paths.join(' '));

        return that.canvas; // 链式调用
    }
});
