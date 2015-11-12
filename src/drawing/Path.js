import Base from '../lib/Base';

export default Base.extend({
    constructor: function Path(canvas) {
        var that = this;
        that.canvas = canvas;
        that.cache = [];
        that.lastX = 0;
        that.lastY = 0;
    },

    isEmpty() {
        return this.cache.length === 0;
    },

    addOp() {
        var that = this;
        var cache = that.cache;
        var canvas = that.canvas;
        var style = canvas.style;
        var scale = style.scale;
        var format = canvas.format;
        var length = arguments.length;

        if (cache) {
            cache.push(arguments[0]);

            if (length > 2) {
                for (var i = 2; i < length; i += 2) {
                    that.lastX = arguments[i - 1];
                    that.lastY = arguments[i];

                    cache.push(format((that.lastX + style.dx) * scale));
                    cache.push(format((that.lastY + style.dy) * scale));
                }
            }
        }

        return that;
    },

    moveTo(x, y) {
        return this.addOp('M', x, y);
    },

    lineTo(x, y) {
        return this.addOp('L', x, y);
    },

    // quadratic bezier curve
    quadTo(x1, y1, x2, y2) {
        return this.addOp('Q', x1, y1, x2, y2);
    },

    // cubic bezeir curve
    curveTo(x1, y1, x2, y2, x3, y3) {
        return this.addOp('C', x1, y1, x2, y2, x3, y3);
    },

    arcTo(/*rx, ry, angle, largeArcFlag, sweepFlag, x, y*/) {

    },

    close() {

        var that = this;

        that.addOp('Z');
        that.closed = true;

        return that;
    },

    flush() {

        var that = this;

        that.canvas.node.setAttribute('d', that.cache.join(' '));

        return that;
    }
});
