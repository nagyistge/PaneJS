/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    TRANSLATE_CONTROL_POINTS: true,
    alternateBounds: null,
    sourcePoint: null,
    targetPoint: null,
    points: null,
    offset: null,
    relative: false,

    constructor: function Geometry(x, y, width, height) {
        Geometry.superclass.constructor.call(this, x, y, width, height);
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
        var geom = this;
        if (isSource) {
            geom.sourcePoint = point;
        } else {
            geom.targetPoint = point;
        }

        return point;
    },

    rotate: function (/*angle, cx*/) {
    },
    translate: function (/*dx, dy*/) {
    },
    scale: function (/*sx, sy, fixedAspect*/) {
    },

    equals: function (/*obj*/) {
    }
});
