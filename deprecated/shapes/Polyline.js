var utils = require('../common/utils');
var Shape = require('./Shape');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({
    constructor: function Polyline(points, stroke, strokewidth) {

        var shape = this;

        Polyline.superclass.constructor.call(shape);

        shape.points = points;
        shape.stroke = stroke;
        shape.strokewidth = !isNullOrUndefined(strokewidth) ? strokewidth : 1;
    },

    getRotation: function () { return 0; },
    getShapeRotation: function () { return 0; },
    isPaintBoundsInverted: function () {
        return false;
    },

    paintEdgeShape: function (canvas, pts) {

        if (this.style || this.style[constants.STYLE_CURVED] != 1) {
            this.paintLine(canvas, pts, this.isRounded);
        }
        else {
            this.paintCurvedLine(canvas, pts);
        }
    },

    paintLine: function (canvas, pts, rounded) {

        var arcSize = getValue(this.style, constants.STYLE_ARCSIZE, constants.LINE_ARCSIZE) / 2;
        canvas.begin();
        this.addPoints(canvas, pts, rounded, arcSize, false);
        canvas.stroke();
    },

    paintCurvedLine: function (canvas, pts) {
        canvas.begin();

        var pt = pts[0];
        var n = pts.length;

        canvas.moveTo(pt.x, pt.y);

        for (var i = 1; i < n - 2; i++) {
            var p0 = pts[i];
            var p1 = pts[i + 1];
            var ix = (p0.x + p1.x) / 2;
            var iy = (p0.y + p1.y) / 2;

            canvas.quadTo(p0.x, p0.y, ix, iy);
        }

        var p0 = pts[n - 2];
        var p1 = pts[n - 1];

        canvas.quadTo(p0.x, p0.y, p1.x, p1.y);
        canvas.stroke();
    }
});

