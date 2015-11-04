import Base    from '../lib/Base';

export default Base.extend({

    constructor: function Brush(canvas) {
        this.canvas = canvas;
    },

    fill: function (filled) {

        var that = this;
        var canvas = that.canvas;
        var style = canvas.style;
        var node = canvas.node;

        if (filled) {

            if (style.alpha < 1) {
                node.setAttribute('fill-opacity', style.alpha);
            }

            that.doFill();

        } else {
            node.setAttribute('fill', 'none');
        }

        return that;
    },

    doFill: function () {
        return this;
    }
});
