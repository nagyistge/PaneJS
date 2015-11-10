import {
    getValue,
    isNullOrUndefined
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({

    constructor: function PolyLine(state, style, points) {

        var that = this;

        that.state = state;
        that.style = style;
        that.points = points;
    },

    getRotation: function () {
        return 0;
    },

    isPaintBoundsInverted: function () {
        return false;
    },

    drawLink: function (canvas, points) {

        var that = this;
        var style = that.style;

        if (style && style.curved) {
            that.drawLine(canvas, points, this.isRounded);
        } else {
            that.drawCurve(canvas, points);
        }


        return that;
    },

    drawLine: function (c, pts, rounded) {

    },

    drawCurve: function (canvas, points) {

        var path = canvas.drawPath();
        var pt = points[0];
        var n = points.length;

        path.moveTo(pt.x, pt.y);

        for (var i = 1; i < n - 2; i++) {
            var p0 = points[i];
            var p1 = points[i + 1];
            var ix = (p0.x + p1.x) / 2;
            var iy = (p0.y + p1.y) / 2;

            path.quadTo(p0.x, p0.y, ix, iy);
        }

        var p0 = points[n - 2];
        var p1 = points[n - 1];

        path.quadTo(p0.x, p0.y, p1.x, p1.y);

        canvas.addNode(false, true);
    }
});

