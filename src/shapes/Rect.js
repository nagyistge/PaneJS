import {
    getValue,
    isNullOrUndefined
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({
    constructor: function Rect(bounds, fill, stroke, strokeWidth) {

        var that = this;

        Rect.superclass.constructor.call(that);

        that.bounds = bounds;
        that.fill = fill;
        that.stroke = stroke;
        that.strokewidth = !isNullOrUndefined(strokeWidth) ? strokeWidth : 1;
    },

    isHtmlAllowed: function () {
        var shape = this;
        return !shape.isRounded && !shape.glass && shape.rotation === 0;
    },

    paintBackground: function (canvas, x, y, w, h) {

        var shape = this;

        if (shape.isRounded) {
            var f = getValue(shape.style, constants.STYLE_ARCSIZE, mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
            var r = Math.min(w * f, h * f);
            canvas.rect(x, y, w, h, r, r);
        } else {
            canvas.rect(x, y, w, h);
        }

        canvas.fillAndStroke();

        return shape;
    },

    paintForeground: function (c, x, y, w, h) {

        var shape = this;

        if (shape.glass && !shape.outline) {
            shape.paintGlassEffect(c, x, y, w, h, shape.getArcSize(w + shape.strokewidth, h + shape.strokewidth));
        }

        return shape;
    }
});
