import Shape from './Shape';

export default Shape.extend({
    constructor: function Ellipse(state) {

        var that = this;

        Ellipse.superclass.constructor.call(that, state);
    },

    drawNodeBackground: function (canvas, x, y, w, h) {
        canvas.drawEllipse(x, y, w, h);
        canvas.addNode(true, true);

        return this;
    },

    drawNodeForeground: function (c, x, y, w, h) {

        var that = this;

        if (that.glass && !that.outline) {
            that.paintGlassEffect(c, x, y, w, h, that.getArcSize(w + that.strokewidth, h + that.strokewidth));
        }

        return that;
    }
});
