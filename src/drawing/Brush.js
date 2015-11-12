import Base    from '../lib/Base';

export default Base.extend({

    constructor: function Brush(canvas) {
        this.canvas = canvas;
    },

    fill(filled) {

        var that = this;
        var canvas = that.canvas;
        var style = canvas.style;
        var node = canvas.node;

        if (filled) {

            if (style.fillOpacity < 1) {
                node.setAttribute('fill-opacity', style.fillOpacity);
            }

            if (style.fillRule) {
                node.setAttribute('fill-rule', style.fillRule);
            }

            that.doFill();

        } else {
            node.setAttribute('fill', 'none');
        }

        return that;
    },

    doFill() {
        return this;
    }
});
