import {
    each,
    clone,
    ucFirst,
    toFixed,
    createSvgElement
} from '../common/utils'
import Base  from '../lib/Base';
import Path  from './Path';
import Pen   from './Pen';
import SolidBrush          from './SolidBrush';
import LinearGradientBrush from './LinearGradientBrush';

// 属性访问器
var accessor = {};
each([
    'alpha',

    'fillColor',
    'fillAlpha',
    'gradientColor',
    'gradientAlpha',
    'gradientDirection',

    'strokeWidth',
    'strokeColor',
    'dashed',
    'dashPattern',
    'dashOffset',
    'lineCap',
    'lineJoin',
    'miterLimit',

    'fontColor',
    'fontBackgroundColor',
    'fontBorderColor',
    'fontSize',
    'fontStyle',
    'fontFamily',

    'shadow',
    'shadowColor',
    'shadowAlpha',
    'shadowDx',
    'shadowDy'
], function (attr) {
    accessor['set' + ucFirst(attr)] = function (value) {

        var that = this;
        var state = that.state;

        if (state) {
            state[attr] = value;
        }

        return that;
    };
});

export default Base.extend({

    //antiAlias: true,

    //Implements: accessor,

    constructor: function Canvas(root) {

        var that = this;

        that.root = root;
        that.reset();
    },

    reset: function () {

        var that = this;

        that.state = {};
        that.states = [];
        that.gradients = [];

        return that;
    },

    save: function () {

        var that = this;
        var state = that.state;

        that.states.push(state);
        that.state = clone(state);

        return that;
    },

    restore: function () {

        var that = this;

        that.state = that.states.pop();

        return that;
    },

    scale: function (value) {
        var that = this;
        var state = that.state;

        state.scale *= value;
        state.strokeWidth *= value;

        return that;
    },

    translate: function (dx, dy) {
        var that = this;
        var state = that.state;

        state.dx += dx;
        state.dy += dy;

        return that;
    },

    rotate: function (theta, flipH, flipV, cx, cy) {

        var canvas = this;
        var format = canvas.format;

        if (theta !== 0 || flipH || flipV) {

            var state = canvas.state;

            cx += state.dx;
            cy += state.dy;

            cx *= state.scale;
            cy *= state.scale;

            state.transform = state.transform || '';

            // This implementation uses custom scale/translate and built-in rotation
            // Rotation state is part of the AffineTransform in state.transform
            if (flipH && flipV) {
                theta += 180;
            } else if (flipH !== flipV) {
                var tx = (flipH) ? cx : 0;
                var sx = (flipH) ? -1 : 1;

                var ty = (flipV) ? cy : 0;
                var sy = (flipV) ? -1 : 1;

                state.transform += 'translate(' + format(tx) + ',' + format(ty) + ')' +
                    'scale(' + format(sx) + ',' + format(sy) + ')' +
                    'translate(' + format(-tx) + ',' + format(-ty) + ')';
            }

            if (flipH ? !flipV : flipV) {
                theta *= -1;
            }

            if (theta !== 0) {
                state.transform += 'rotate(' + format(theta) + ',' + format(cx) + ',' + format(cy) + ')';
            }

            state.rotation = state.rotation + theta;
            state.rotationCx = cx;
            state.rotationCy = cy;
        }
    },

    format: function (value) {
        return this.state.antiAlias
            ? toFixed(value, 2)
            : Math.round(parseFloat(value));
    },


    // Draw
    // ----

    createElement: function (tagName, namespace) {
        return createSvgElement(tagName, this.root.ownerDocument, namespace);
    },

    drawPath: function () {

        var that = this;
        var path = new Path(that);

        that.node = that.createElement('path');
        that.path = path;

        return path;
    },

    drawRect: function (x, y, w, h, dx, dy) {

        var that = this;
        var state = that.state;
        var format = that.format.bind(that);
        var scale = state.scale;
        var node = that.createElement('rect');

        node.setAttribute('x', format((x + state.dx) * scale));
        node.setAttribute('y', format((y + state.dy) * scale));
        node.setAttribute('width', format(w * scale));
        node.setAttribute('height', format(h * scale));

        if (dx > 0) {
            node.setAttribute('rx', format(dx * scale));
        }

        if (dy > 0) {
            node.setAttribute('ry', format(dy * scale));
        }

        that.node = node;

        return that;
    },

    drawEllipse: function (x, y, w, h) {

        var canvas = this;
        var state = canvas.state;
        var scale = state.scale;

        var node = canvas.createElement('ellipse');

        node.setAttribute('cx', Math.round((x + w / 2 + state.dx) * scale));
        node.setAttribute('cy', Math.round((y + h / 2 + state.dy) * scale));
        node.setAttribute('rx', w / 2 * scale);
        node.setAttribute('ry', h / 2 * scale);

        canvas.node = node;

        return canvas;
    },

    drawImage: function () {},

    drawString: function () {},

    addNode: function (filled, stroked) {

        var that = this;
        var root = that.root;
        var node = that.node;
        var state = that.state;

        if (node) {

            var path = that.path;
            if (path) {

            }

            // fill
            if (state.fillColor && state.gradientColor) {
                new LinearGradientBrush(that).fill(filled);
            } else {
                new SolidBrush(that).fill(filled);
            }

            // stroke
            new Pen(that).stroke(stroked);

            // transform
            var transform = state.transform;
            if (transform && transform.length > 0) {
                node.setAttribute('transform', transform);
            }

            // shadow
            if (state.shadow) {
                root.appendChild(that.createShadow(node));
            }

            // strokeTolerance
            filled = filled && state.fillColor ? true : false;
            if (that.strokeTolerance > 0 && !filled) {
                root.appendChild(that.createTolerance(node));
            }

            // pointer events
            if (that.pointerEvents && (!path || path.closed)) {
                node.setAttribute('pointer-events', that.pointerEventsValue);
            } else if (!that.pointerEvents && !that.originalRoot) {
                node.setAttribute('pointer-events', 'none');
            }

            root.appendChild(node);
        }

        return that;
    },

    createShadow: function (node) {

        var that = this;
        var state = that.state;
        var shadow = node.cloneNode(true);

        if (shadow.getAttribute('fill') !== 'none') {
            shadow.setAttribute('fill', state.shadowColor);
        }

        if (shadow.getAttribute('stroke') !== 'none') {
            shadow.setAttribute('stroke', state.shadowColor);
        }

        shadow.setAttribute('transform', 'translate(' + that.format(state.shadowDx * state.scale) +
            ',' + this.format(state.shadowDy * state.scale) + ')' + (state.transform || ''));
        shadow.setAttribute('opacity', state.shadowAlpha);

        return shadow;
    },

    createTolerance: function (node) {

        var ele = node.cloneNode(true);
        var sw = parseFloat(ele.getAttribute('stroke-width') || 1) + this.strokeTolerance;
        ele.setAttribute('pointer-events', 'stroke');
        ele.setAttribute('visibility', 'hidden');
        ele.setAttribute('stroke-width', sw);
        ele.setAttribute('fill', 'none');
        ele.setAttribute('stroke', 'white');
        ele.removeAttribute('stroke-dasharray');


        return ele;
    }
});
