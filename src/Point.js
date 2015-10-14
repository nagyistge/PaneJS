/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./common/class');

var Point = Klass.create({

    constructor: function Point(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    },

    equals: function (point) {
        return point instanceof Point && point.x === this.x && point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

module.exports = Point;

