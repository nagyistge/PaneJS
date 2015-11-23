import {
    getValue,
    isNullOrUndefined
} from '../common/utils';

import PolyLine from './PolyLine';
import marker   from  './marker';

var Connector = PolyLine.extend({

    constructor: function Connector(state, style, points) {
        Connector.superclass.constructor.call(this, state, style, points)
    },

    drawLink: function (canvas, points) {

        var that = this;

        var sourceMarker = that.createMarker(canvas, points, true);
        var targetMarker = that.createMarker(canvas, points, false);

        Connector.superclass.drawLink.call(that, canvas, points);

        sourceMarker && sourceMarker();
        targetMarker && targetMarker();

        return that;
    },

    createMarker: function (canvas, points, isSource) {

        var that = this;
        var style = that.style;
        var result = null;
        var n = points.length;
        var type = isSource ? style.startArrow : style.endArrow;
        var p0 = isSource ? points[1] : points[n - 2];
        var pe = isSource ? points[0] : points[n - 1];

        if (type && p0 && pe) {
            var count = 1;

            // Uses next non-overlapping point
            while (count < n - 1 && Math.round(p0.x - pe.x) === 0 && Math.round(p0.y - pe.y) === 0) {
                p0 = (isSource) ? points[1 + count] : points[n - 2 - count];
                count++;
            }

            // Computes the norm and the inverse norm
            var dx = pe.x - p0.x;
            var dy = pe.y - p0.y;

            var dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));

            var unitX = dx / dist;
            var unitY = dy / dist;

            var size = 6;//mxUtils.getNumber(this.style, (isSource) ? mxConstants.STYLE_STARTSIZE : mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE);

            // Allow for stroke width in the end point used and the
            // orthogonal vectors describing the direction of the marker
            var filled = true;//this.style[(isSource) ? mxConstants.STYLE_STARTFILL : mxConstants.STYLE_ENDFILL] != 0;

            result = marker.createMarker(canvas, this, type, pe, unitX, unitY, size, isSource, 1, filled);
        }

        return result;
    },

    //augmentBoundingBox: function (bbox) {
    //
    //}
});

export default Connector;
