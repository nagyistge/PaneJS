/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

var Point = Class.create({

    constructor: function Point(x, y) {
        this.x = !isNullOrUndefined(x) ? x : 0;
        this.y = !isNullOrUndefined(y) ? y : 0;
    },

    equals: function (point) {
        return point &&
            point instanceof Point &&
            point.x === this.x &&
            point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

module.exports = Point;

