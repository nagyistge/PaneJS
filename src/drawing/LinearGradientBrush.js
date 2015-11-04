import {
    getBaseUrl,
    createSvgElement
} from '../common/utils';

import Brush      from './Brush';
import directions from '../enums/directions';


var LinearGradientBrush = Brush.extend({

    gradients: {},

    constructor: function LinearGradientBrush(canvas) {
        LinearGradientBrush.superclass.constructor.call(this, canvas);
    },

    createGradientId: function (start, end, alpha1, alpha2, direction) {

        if (start.charAt(0) === '#') {
            start = start.substring(1);
        }

        if (end.charAt(0) === '#') {
            end = end.substring(1);
        }

        // Workaround for gradient IDs not working in Safari 5 / Chrome 6
        // if they contain uppercase characters
        start = start.toLowerCase() + '-' + alpha1;
        end = end.toLowerCase() + '-' + alpha2;

        var dir = '';

        if (!direction || direction === directions.south) {
            dir = 's';     // 从上到下
        } else if (direction === directions.east) {
            dir = 'e';     // 从左到右
        } else {
            var tmp = start;
            start = end;
            end = tmp;

            if (direction === directions.north) {
                dir = 's'; // 从下到上
            }
            else if (direction === directions.west) {
                dir = 'e'; // 从右到左
            }
        }

        return 'gradient-' + start + '-' + end + '-' + dir;
    },

    createGradient: function (start, end, alpha1, alpha2, direction) {

        var root = this.canvas.root;
        var gradient = createSvgElement('linearGradient', root);

        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '0%');

        if (!direction || direction === directions.south) {
            gradient.setAttribute('y2', '100%');
        } else if (direction === directions.east) {
            gradient.setAttribute('x2', '100%');
        } else if (direction === directions.north) {
            gradient.setAttribute('y1', '100%');
        } else if (direction === directions.west) {
            gradient.setAttribute('x1', '100%');
        }

        var op = (alpha1 < 1) ? ';stop-opacity:' + alpha1 : '';

        var stop = createSvgElement('stop', root);
        stop.setAttribute('offset', '0%');
        stop.setAttribute('style', 'stop-color:' + start + op);
        gradient.appendChild(stop);

        op = (alpha2 < 1) ? ';stop-opacity:' + alpha2 : '';

        stop = createSvgElement('stop', root);
        stop.setAttribute('offset', '100%');
        stop.setAttribute('style', 'stop-color:' + end + op);
        gradient.appendChild(stop);

        return gradient;
    },

    getGradient: function (start, end, alpha1, alpha2, direction) {

        var that = this;
        var id = that.createGradientId(start, end, alpha1, alpha2, direction);
        var gradients = LinearGradientBrush.gradients;
        var gradient = gradients[id];

        if (!gradient) {

            var root = that.canvas.root;
            var svg = root.ownerSVGElement;
            var doc = svg.ownerDocument;

            var counter = 0;
            var tmpId = id + '-' + counter;


            gradient = doc.getElementById(tmpId);
            while (gradient && gradient.ownerSVGElement !== svg) {
                tmpId = id + '-' + counter++;
                gradient = doc.getElementById(tmpId);
            }

            if (!gradient) {
                gradient = that.createGradient(start, end, alpha1, alpha2, direction);
                gradient.setAttribute('id', tmpId);

                svg.appendChild(gradient);
            }

            gradients[id] = gradient;
        }


        return gradient.getAttribute('id');
    },

    doFill: function () {

        var that = this;
        var canvas = that.canvas;
        var style = canvas.style;
        var node = canvas.node;
        var fillColor = style.fillColor;
        var gradientColor = style.gradientColor;

        if (fillColor && gradientColor) {
            var id = that.getGradient(fillColor, gradientColor, style.fillAlpha, style.gradientAlpha, style.gradientDirection);
            var base = getBaseUrl().replace(/([\(\)])/g, '\\$1');

            node.setAttribute('fill', 'url(' + base + '#' + id + ')');
        }

        return that;
    }
});


export default LinearGradientBrush;
