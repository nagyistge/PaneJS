import Brush from './Brush';

export default Brush.extend({

    constructor: function SolidBrush(canvas) {
        SolidBrush.superclass.constructor.call(this, canvas);
    },

    doFill: function () {

        var that = this;
        var canvas = that.canvas;
        var style = canvas.style;
        var node = canvas.node;

        var fillColor = style.fillColor;

        if (fillColor) {
            node.setAttribute('fill', fillColor.toLowerCase());
        }

        return that;
    }
});

