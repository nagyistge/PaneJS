/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./class');

var Point = Klass.create({

    constructor: function Point(x, y) {
        this.x = x === null ? 0 : x;
        this.y = y === null ? 0 : y;
    },

    equals: function (point) {
        return point instanceof Point && point.x === this.x && point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

module.exports = Point;

