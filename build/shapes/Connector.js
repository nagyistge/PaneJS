define(function(require, exports, module) {var utils = require('../common/utils');
var marker = require('../marker');
var Polyline = require('./Polyline');
var constants = require('../constants');

var getValue = utils.getValue;
var getNumber = utils.getNumber;
var isNullOrUndefined = utils.isNullOrUndefined;

var Connector = module.exports = Polyline.extend({
    constructor: function Connector(points, stroke, strokewidth) {
        Connector.superclass.constructor.call(this, points, stroke, strokewidth);
    },

    paintEdgeShape: function (c, pts) {
        var sourceMarker = this.createMarker(c, pts, true);
        var targetMarker = this.createMarker(c, pts, false);

        Connector.superclass.paintEdgeShape.apply(this, arguments);

        // Disables shadows, dashed styles and fixes fill color for markers
        c.setFillColor(this.stroke);
        c.setShadow(false);
        c.setDashed(false);

        if (sourceMarker != null) {
            sourceMarker();
        }

        if (targetMarker != null) {
            targetMarker();
        }
    },

    createMarker: function (c, pts, isSource) {
        var result = null;
        var n = pts.length;
        var type = getValue(this.style, isSource ? constants.STYLE_STARTARROW : constants.STYLE_ENDARROW);
        var p0 = isSource ? pts[1] : pts[n - 2];
        var pe = isSource ? pts[0] : pts[n - 1];

        if (type && p0 && pe) {
            var count = 1;

            // Uses next non-overlapping point
            while (count < n - 1 && Math.round(p0.x - pe.x) == 0 && Math.round(p0.y - pe.y) == 0) {
                p0 = (isSource) ? pts[1 + count] : pts[n - 2 - count];
                count++;
            }

            // Computes the norm and the inverse norm
            var dx = pe.x - p0.x;
            var dy = pe.y - p0.y;

            var dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));

            var unitX = dx / dist;
            var unitY = dy / dist;

            var size = getNumber(this.style, (isSource) ? constants.STYLE_STARTSIZE : constants.STYLE_ENDSIZE, constants.DEFAULT_MARKERSIZE);

            // Allow for stroke width in the end point used and the
            // orthogonal vectors describing the direction of the marker
            var filled = this.style[(isSource) ? constants.STYLE_STARTFILL : constants.STYLE_ENDFILL] != 0;

            result = marker.createMarker(c, this, type, pe, unitX, unitY, size, isSource, this.arrowStrokewidth, filled);
        }

        return result;
    },

    augmentBoundingBox: function (bbox) {
        Connector.superclass.augmentBoundingBox.apply(this, arguments);

        // Adds marker sizes
        var size = 0;

        if (getValue(this.style, constants.STYLE_STARTARROW, constants.NONE) !== constants.NONE) {
            size = getNumber(this.style, constants.STYLE_STARTSIZE, constants.DEFAULT_MARKERSIZE) + 1;
        }

        if (getValue(this.style, constants.STYLE_ENDARROW, constants.NONE) !== constants.NONE) {
            size = Math.max(size, getNumber(this.style, constants.STYLE_ENDSIZE, constants.DEFAULT_MARKERSIZE)) + 1;
        }

        bbox.grow(Math.ceil(size * this.scale));
    }
});
});