import {
    getValue,
    isNullOrUndefined
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({
    constructor: function Rect(state) {

        var that = this;

        Rect.superclass.constructor.call(that, state);

        //that.bounds = bounds;
        //that.fill = fill;
        //that.stroke = stroke;
        //that.strokeWidth = !isNullOrUndefined(strokeWidth) ? strokeWidth : 1;
    },

    isHtmlAllowed: function () {
        var shape = this;
        return !shape.isRounded && !shape.glass && shape.rotation === 0;
    },

    drawNodeBackground: function (canvas, x, y, w, h) {

        var that = this;
        var style = that.style;

        if (style.round) {
            var r = Math.min(w, h) * style.round;
            canvas.drawRect(x, y, w, h, r, r);
        } else {
            canvas.drawRect(x, y, w, h);
        }

        canvas.addNode(true, true);

        return that;
    },

    drawNodeForeground: function (c, x, y, w, h) {

        var that = this;

        if (that.glass && !that.outline) {
            that.paintGlassEffect(c, x, y, w, h, that.getArcSize(w + that.strokewidth, h + that.strokewidth));
        }

        return that;
    }
});
