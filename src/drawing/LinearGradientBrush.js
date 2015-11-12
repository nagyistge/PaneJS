import {
    getBaseUrl,
    createSvgElement
} from '../common/utils';

import Brush      from './Brush';
import directions from '../enums/directions';


var LinearGradientBrush = Brush.extend({

    Statics: {
        gradients: {}
    },

    constructor: function LinearGradientBrush(canvas) {
        LinearGradientBrush.superclass.constructor.call(this, canvas);
    },

    createGradientId(color1, color2, opacity1, opacity2, direction) {

        if (color1.charAt(0) === '#') {
            color1 = color1.substring(1);
        }

        if (color2.charAt(0) === '#') {
            color2 = color2.substring(1);
        }

        color1 = color1.toLowerCase() + '-' + opacity1;
        color2 = color2.toLowerCase() + '-' + opacity2;

        var dir = '';

        if (!direction || direction === 'south') {
            dir = 's';
        } else if (direction === 'east') {
            dir = 'e';
        } else {
            var tmp = color1;
            color1 = color2;
            color2 = tmp;

            if (direction === 'north') {
                dir = 's';
            } else if (direction === 'west') {
                dir = 'e';
            }
        }

        return 'gradient-' + color1 + '-' + color2 + '-' + dir;
    },

    createGradient(color1, color2, opacity1, opacity2, direction) {

        var doc = this.canvas.root.ownerDocument;
        var gradient = createSvgElement('linearGradient', doc);

        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '0%');

        if (!direction || direction === 'south') {
            gradient.setAttribute('y2', '100%');
        } else if (direction === 'east') {
            gradient.setAttribute('x2', '100%');
        } else if (direction === 'north') {
            gradient.setAttribute('y1', '100%');
        } else if (direction === 'west') {
            gradient.setAttribute('x1', '100%');
        }

        var op = (opacity1 < 1) ? ';stop-opacity:' + opacity1 : '';

        var stop = createSvgElement('stop', doc);
        stop.setAttribute('offset', '0%');
        stop.setAttribute('style', 'stop-color:' + color1 + op);
        gradient.appendChild(stop);

        op = (opacity2 < 1) ? ';stop-opacity:' + opacity2 : '';

        stop = createSvgElement('stop', doc);
        stop.setAttribute('offset', '100%');
        stop.setAttribute('style', 'stop-color:' + color2 + op);
        gradient.appendChild(stop);

        return gradient;
    },

    getGradient(color1, color2, opacity1, opacity2, direction) {

        var that = this;
        var id = that.createGradientId(color1, color2, opacity1, opacity2, direction);
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
                gradient = that.createGradient(color1, color2, opacity1, opacity2, direction);
                gradient.setAttribute('id', tmpId);

                svg.appendChild(gradient);
            }

            gradients[id] = gradient;
        }

        return gradient.getAttribute('id');
    },

    doFill() {

        var that = this;
        var canvas = that.canvas;
        var style = canvas.style;
        var node = canvas.node;
        var color1 = style.gradientColor1;
        var color2 = style.gradientColor2;

        if (style.gradient && color1 && color2) {
            var id = that.getGradient(color1, color2, style.gradientOpacity1, style.gradientOpacity2, style.gradientDirection);
            var base = getBaseUrl().replace(/([\(\)])/g, '\\$1');

            node.setAttribute('fill', 'url(' + base + '#' + id + ')');
        }

        return that;
    }
});


export default LinearGradientBrush;
