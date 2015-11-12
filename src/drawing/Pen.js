import { map } from '../common/utils';
import Base    from '../lib/Base';

export default Base.extend({

    constructor: function Pen(canvas) {
        this.canvas = canvas;
    },

    stroke(stroked) {

        var that = this;
        var canvas = that.canvas;
        var style = canvas.style;
        var node = canvas.node;

        if (stroked && style.strokeColor) {

            node.setAttribute('stroke', style.strokeColor.toLowerCase());

            var sw = Math.max(1, canvas.format(style.strokeWidth * style.scale));
            node.setAttribute('stroke-width', sw);


            if (style.strokeOpacity < 1) {
                node.setAttribute('stroke-opacity', style.strokeOpacity);
            }

            if (style.fillRule) {
                node.setAttribute('fill-rule', style.fillRule);
            }

            if (node.nodeName.toLowerCase() === 'path') {
                var lineJoin = style.lineJoin;
                if (lineJoin && lineJoin !== 'miter') { // 'miter' is default in SVG
                    node.setAttribute('stroke-linejoin', lineJoin);
                }

                var lineCap = style.lineCap;
                if (lineCap && lineCap !== 'butt') { // 'butt' is default in SVG
                    node.setAttribute('stroke-linecap', lineCap);
                }
            }

            if (style.dashed) {

                var dashPattern = style.dashPattern;
                var dash = ('' + dashPattern).split(' ');
                var pattern = map(dash, function (pat) {
                    return pat * sw;
                });

                node.setAttribute('stroke-dasharray', pattern.join(' '));

                var dashOffset = '' + style.dashOffset;
                if (dashOffset) {
                    node.setAttribute('stroke-dashoffset', dashOffset);
                }

                var miterLimit = '' + style.miterLimit;
                if (miterLimit) {
                    node.setAttribute('stroke-miterlimit', miterLimit);
                }
            }

            return true;
        }

        node.setAttribute('stroke', 'none');

        return false;
    }
});
