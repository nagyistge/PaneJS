import {
    each,
    clone,
    ucFirst,
    toFixed,
    write,
    createSvgElement
} from '../common/utils'
import Base  from '../lib/Base';
import Path  from './Path';
import Pen   from './Pen';
import SolidBrush          from './SolidBrush';
import LinearGradientBrush from './LinearGradientBrush';

export default Base.extend({

    constructor: function Canvas(root, style) {

        var that = this;

        that.root = root;
        that.style = style;
        that.format = style.antiAlias ?
            function (value) {
                return toFixed(value, 2);
            } :
            function (value) {
                return Math.round(value);
            };
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

    drawRect: function (x, y, w, h, rx, ry) {

        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format.bind(that);
        var node = that.createElement('rect');

        node.setAttribute('x', format((x + style.dx) * scale));
        node.setAttribute('y', format((y + style.dy) * scale));
        node.setAttribute('width', format(w * scale));
        node.setAttribute('height', format(h * scale));

        if (rx > 0) {
            node.setAttribute('rx', format(rx * scale));
        }

        if (ry > 0) {
            node.setAttribute('ry', format(ry * scale));
        }

        that.node = node;

        return that;
    },

    drawEllipse: function (x, y, w, h) {

        var canvas = this;
        var style = canvas.style;
        var scale = style.scale;

        var node = canvas.createElement('ellipse');

        node.setAttribute('cx', Math.round((x + w / 2 + style.dx) * scale));
        node.setAttribute('cy', Math.round((y + h / 2 + style.dy) * scale));
        node.setAttribute('rx', w / 2 * scale);
        node.setAttribute('ry', h / 2 * scale);

        canvas.node = node;

        return canvas;
    },

    drawImage: function () {},

    drawString: function (x, y, w, h, text) {

        var that = this;
        var node = that.createElement('g');
        var style = that.style;
        var scale = style.scale;
        var align = style.align;
        var vAlign = style.verticalAlign;
        var fontSize = Math.round(style.fontSize);

        if (fontSize) {
            node.setAttribute('font-size', Math.round(fontSize * scale) + 'px');
        }

        if (style.fontColor) {
            node.setAttribute('fill', style.fontColor);
        }

        if (style.fontFamily) {
            node.setAttribute('font-family', style.fontFamily);
        }

        if (style.fontWeight) {
            node.setAttribute('font-weight', style.fontWeight);
        }

        if (style.italic) {
            node.setAttribute('font-style', 'italic');
        }

        if (style.textDecoration) {
            node.setAttribute('text-decoration', style.textDecoration);
        }

        var anchor = align === 'right'
            ? 'end' : align === 'center'
            ? 'middle'
            : 'start';

        if (anchor !== 'start') {
            node.setAttribute('text-anchor', anchor);
        }

        if (style.opacity < 1) {
            node.setAttribute('opacity', style.opacity);
        }

        //var lines = text.split('\n');
        //var lineHeight = Math.round(style.lineHeight * fontSize);
        //var totalHeight = lines.length * lineHeight;

        var textNode = that.createElement('text');
        textNode.setAttribute('x', 10);
        textNode.setAttribute('y', 10);

        write(textNode, text);
        node.appendChild(textNode);

        that.root.appendChild(node);
    },

    addNode: function (filled, stroked) {

        var that = this;
        var root = that.root;
        var node = that.node;
        var style = that.style;

        if (node) {

            var path = that.path;
            if (path) {
                path.flush();
            }

            // fill
            if (style.fillColor && style.gradientColor) {
                new LinearGradientBrush(that).fill(filled);
            } else {
                new SolidBrush(that).fill(filled);
            }

            // stroke
            new Pen(that).stroke(stroked);

            // transform
            var transform = style.transform;
            if (transform && transform.length > 0) {
                node.setAttribute('transform', transform);
            }

            // shadow
            if (style.shadow) {
                root.appendChild(that.createShadow(node));
            }

            // strokeTolerance
            filled = filled && style.fillColor ? true : false;
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
        var style = that.style;
        var shadow = node.cloneNode(true);

        if (shadow.getAttribute('fill') !== 'none') {
            shadow.setAttribute('fill', style.shadowColor);
        }

        if (shadow.getAttribute('stroke') !== 'none') {
            shadow.setAttribute('stroke', style.shadowColor);
        }

        shadow.setAttribute('transform', 'translate(' + that.format(style.shadowDx * style.scale) +
            ',' + this.format(style.shadowDy * style.scale) + ')' + (style.transform || ''));
        shadow.setAttribute('opacity', style.shadowAlpha);

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
