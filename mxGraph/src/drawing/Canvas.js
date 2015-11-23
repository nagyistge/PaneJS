import {
    map,
    each,
    clone,
    ucFirst,
    toFixed,
    write,
    createSvgElement
} from '../common/utils'

import detector from '../common/detector';
import Base     from '../lib/Base';
import Path     from './Path';
import Pen      from './Pen';
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

    createElement: function (tagName, namespace) {
        return createSvgElement(tagName, this.root.ownerDocument, namespace);
    },


    // Draw
    // ----

    drawRect: function (x, y, w, h, rx, ry) {

        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format;
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

    drawCircle: function (x, y, w, h) {

        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format;
        var node = that.createElement('circle');

        node.setAttribute('cx', format((x + w / 2 + style.dx) * scale));
        node.setAttribute('cy', format((y + h / 2 + style.dy) * scale));
        node.setAttribute('r', format(Math.min(w, h) / 2 * scale));

        that.node = node;

        return that;

    },

    drawEllipse: function (x, y, w, h) {

        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format;
        var node = that.createElement('ellipse');

        node.setAttribute('cx', format((x + w / 2 + style.dx) * scale));
        node.setAttribute('cy', format((y + h / 2 + style.dy) * scale));
        node.setAttribute('rx', format(w / 2 * scale));
        node.setAttribute('ry', format(h / 2 * scale));

        that.node = node;

        return that;
    },

    drawLine: function (x1, y1, x2, y2) {

        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format;
        var node = that.createElement('line');

        node.setAttribute('x1', format((x1 + style.dx) * scale));
        node.setAttribute('y1', format((y1 + style.dy) * scale));
        node.setAttribute('x2', format((x2 + style.dx) * scale));
        node.setAttribute('y2', format((y2 + style.dy) * scale));

        that.node = node;

        return that;
    },

    drawPolyline: function (points) {

        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format;
        var node = that.createElement('polyline');

        var arr = map(points || [], function (p) {
            return format((p.x + style.dx) * scale) + ',' + format((p.y + style.dx) * scale);
        });

        node.setAttribute('points', arr.join(' '));
        that.node = node;

        return that;
    },

    drawPolygon: function (points) {
        var that = this;
        var style = that.style;
        var scale = style.scale;
        var format = that.format;
        var node = that.createElement('polygon');

        var arr = map(points || [], function (p) {
            return format((p.x + style.dx) * scale) + ',' + format((p.y + style.dx) * scale);
        });

        node.setAttribute('points', arr.join(' '));
        that.node = node;

        return that;
    },

    drawPath: function () {

        var that = this;
        var path = new Path(that);

        that.node = that.createElement('path');
        that.path = path;

        return path;
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


    // apply styles
    // ------------

    addNode: function (filled, stroked) {

        var that = this;
        var root = that.root;
        var node = that.node;
        var style = that.style;

        if (node) {

            // set path attr
            var path = that.path;
            if (path) {
                if (!path.isEmpty()) {
                    path.flush();
                } else {
                    return;
                }
            }

            // fill
            if (style.gradient) {
                filled = new LinearGradientBrush(that).fill(filled);
            } else {
                filled = new SolidBrush(that).fill(filled);
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

        var dx = that.format(style.shadowDx * style.scale);
        var dy = that.format(style.shadowDy * style.scale);

        shadow.setAttribute('transform', 'translate(' + dx + ',' + dy + ')' + (style.transform || ''));

        if (style.shadowOpacity < 1) {
            shadow.setAttribute('opacity', style.shadowOpacity);
        }

        return shadow;
    },

    createTolerance: function (node) {

        var elem = node.cloneNode(true);
        var sw = parseFloat(elem.getAttribute('stroke-width') || 1) + this.strokeTolerance;

        elem.setAttribute('pointer-events', 'stroke');
        elem.setAttribute('visibility', 'hidden');
        elem.setAttribute('stroke-width', sw);
        elem.setAttribute('fill', 'none');
        elem.setAttribute('stroke', detector.IS_OP ? 'none' : 'white');

        // remove dashed attr
        elem.removeAttribute('stroke-dasharray');
        elem.removeAttribute('stroke-dashoffset');
        elem.removeAttribute('stroke-miterlimit');


        return elem;
    }
});
