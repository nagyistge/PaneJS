define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');

var Point = Class.create({

    constructor: function Point(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    },


    Statics: {
        equalPoints: function (points1, points2) {
            if ((!points1 && points2) || (points1 && !points2) ||
                (points1 && points2 && points1.length !== points2.length)) {
                return false;
            } else if (points1 && points2) {
                for (var i = 0; i < points1.length; i++) {
                    var p1 = points1[i];
                    var p2 = points2[i];

                    if ((!p1 && p2) || (p1 && !p2) || (p1 && p2 && !p1.equal(p2))) {
                        return false;
                    }
                }
            }

            return true;
        },
        convertPoint: function (container, x, y) {
            var origin = utils.getScrollOrigin(container);
            var offset = utils.getOffset(container);

            offset.left -= origin.left;
            offset.top -= origin.top;

            return {
                left: x - offset.left,
                top: y - offset.top
            };
        },
        getRotatedPoint: function (pt, cos, sin, c) {
            c = (c !== null) ? c : new Point();
            var x = pt.x - c.x;
            var y = pt.y - c.y;

            var x1 = x * cos - y * sin;
            var y1 = y * cos + x * sin;

            return new Point(x1 + c.x, y1 + c.y);
        },
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

});