/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    constructor: function Geometry(x, y, width, height) {
        Geometry.superclass.constructor.call(this, x, y, width, height);
    },

    TRANSLATE_CONTROL_POINTS: true,
    alternateBounds: null,
    sourcePoint: null,
    targetPoint: null,
    points: null,
    offset: null,
    relative: false,


    swap: function () {

        var geom = this;
        var alternateBounds = geom.alternateBounds;

        if (alternateBounds) {
            var old = new Rectangle(geom.x, geom.y, geom.width, geom.height);

            geom.x = alternateBounds.x;
            geom.y = alternateBounds.y;
            geom.width = alternateBounds.width;
            geom.height = alternateBounds.height;

            geom.alternateBounds = old;
        }

        return geom;
    },

    getTerminalPoint: function (isSource) {
        var geom = this;
        return isSource ? geom.sourcePoint : geom.targetPoint;
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
