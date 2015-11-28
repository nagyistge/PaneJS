import {
    getValue,
    isNullOrUndefined
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({

    constructor: function Rect(state, style, bounds) {
        Rect.superclass.constructor.call(this, state, style, bounds);
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
