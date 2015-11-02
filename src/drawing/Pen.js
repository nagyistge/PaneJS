import { map } from '../common/utils';
import Base    from '../lib/Base';

export default Base.extend({

    // 创建一个描边画笔的实例
    constructor: function Pen(canvas) {
        this.canvas = canvas;
    },

    stroke: function (stroked) {

        var that = this;
        var canvas = that.canvas;
        var state = canvas.state;
        var node = canvas.node;

        if (stroked && state.strokeColor) {

            node.setAttribute('stroke', state.strokeColor.toLowerCase());

            if (state.alpha < 1) {
                node.setAttribute('stroke-opacity', state.alpha);
            }

            var strokeWidth = state.strokeWidth * state.scale;
            var fixedStrokeWidth = Math.max(1, strokeWidth);

            if (fixedStrokeWidth !== 1) {
                node.setAttribute('stroke-width', fixedStrokeWidth);
            }

            // 更新路径样式
            if (node.nodeName.toLowerCase() === 'path') {

                // lineJoin
                var lineJoin = state.lineJoin;
                // 'miter' is default in SVG
                if (lineJoin && lineJoin !== 'miter') {
                    node.setAttribute('stroke-linejoin', lineJoin);
                }

                // lineCap
                var lineCap = state.lineCap;
                // 'butt' is default in SVG
                if (lineCap && lineCap !== 'butt') {
                    node.setAttribute('stroke-linecap', lineCap);
                }

                // miterLimit
                var miterLimit = state.miterLimit;
                // 10 is default in our document
                if (miterLimit && miterLimit !== 10) {
                    this.node.setAttribute('stroke-miterlimit', miterLimit);
                }

            }


            if (state.dashed) {

                // dashPattern
                var dashPattern = state.dashPattern;
                var dash = ('' + dashPattern).split(' ');
                var pattern = map(dash, function (pat) {
                    return pat * strokeWidth;
                });

                node.setAttribute('stroke-dasharray', pattern.join(' '));

                // dashOffset
                var dashOffset = state.dashOffset;
                if (dashOffset) {
                    node.setAttribute('stroke-dashoffset', dashOffset);
                }

            }
        } else {
            node.setAttribute('stroke', 'none');
        }

        return that;
    }
});
