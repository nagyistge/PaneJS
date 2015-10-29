define(function(require, exports, module) {
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Class = require('../common/class');
var ConnectionConstraint = require('../ConnectionConstraint');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var constants = require('../constants');
var resources = require('../resources');
var stencilRegistry = require('./stencilRegistry');
var utils = require('../common/utils');

var Stencil = Class.create({
    constructor: function Stencil(desc) {
        this.desc = desc;
        this.parseDescription();
        this.parseConstraints();
    },

    aspect      : null,
    bgNode      : null,
    constraints : null,
    desc        : null,
    fgNode      : null,
    h0          : null,
    strokewidth : null,
    w0          : null,

    parseDescription: function () {
        // LATER: Preprocess nodes for faster painting
        this.fgNode = this.desc.getElementsByTagName('foreground')[0];
        this.bgNode = this.desc.getElementsByTagName('background')[0];
        this.w0 = Number(this.desc.getAttribute('w') || 100);
        this.h0 = Number(this.desc.getAttribute('h') || 100);

        // Possible values for aspect are: variable and fixed where
        // variable means fill the available space and fixed means
        // use w0 and h0 to compute the aspect.
        var aspect = this.desc.getAttribute('aspect');
        this.aspect = (aspect !== null) ? aspect : 'variable';

        // Possible values for strokewidth are all numbers and "inherit"
        // where the inherit means take the value from the style (ie. the
        // user-defined stroke-width). Note that the strokewidth is scaled
        // by the minimum scaling that is used to draw the shape (sx, sy).
        var sw = this.desc.getAttribute('strokewidth');
        this.strokewidth = (sw !== null) ? sw : '1';
    },

    parseConstraints: function () {
        var conns = this.desc.getElementsByTagName('connections')[0];

        if (conns !== null) {
            var tmp = utils.getChildNodes(conns);

            if (tmp !== null && tmp.length > 0) {
                this.constraints = [];

                for (var i = 0; i < tmp.length; i++) {
                    this.constraints.push(this.parseConstraint(tmp[i]));
                }
            }
        }
    },

    parseConstraint: function (node) {
        var x = Number(node.getAttribute('x'));
        var y = Number(node.getAttribute('y'));
        var perimeter = node.getAttribute('perimeter') === '1';

        return new ConnectionConstraint(new Point(x, y), perimeter);
    },

    evaluateTextAttribute: function (node, attribute, state) {
        var result = this.evaluateAttribute(node, attribute, state);
        var loc = node.getAttribute('localized');

        if ((Stencil.defaultLocalized && loc === null) || loc === '1') {
            result = resources.get(result);
        }

        return result;
    },

    evaluateAttribute: function (node, attribute, shape) {
        var result = node.getAttribute(attribute);

        if (result === null) {
            var text = utils.getTextContent(node);

            if (text !== null && Stencil.allowEval) {
                var funct = utils.eval(text);

                if (typeof(funct) === 'function') {
                    result = funct(shape);
                }
            }
        }

        return result;
    },

    drawShape: function (canvas, shape, x, y, w, h) {
        // TODO: Internal structure (array of special structs?), relative and absolute
        // coordinates (eg. note shape, process vs star, actor etc.), text rendering
        // and non-proportional scaling, how to implement pluggable edge shapes
        // (start, segment, end blocks), pluggable markers, how to implement
        // swimlanes (title area) with this API, add icon, horizontal/vertical
        // label, indicator for all shapes, rotation
        this.drawChildren(canvas, shape, x, y, w, h, this.bgNode, false);
        this.drawChildren(canvas, shape, x, y, w, h, this.fgNode, true);
    },

    drawChildren: function (canvas, shape, x, y, w, h, node, disableShadow) {
        if (node !== null && w > 0 && h > 0) {
            var direction = utils.getValue(shape.style, constants.STYLE_DIRECTION, null);
            var aspect = this.computeAspect(shape.style, x, y, w, h, direction);
            var minScale = Math.min(aspect.width, aspect.height);
            var sw = (this.strokewidth === 'inherit') ?
                Number(utils.getNumber(shape.style, constants.STYLE_STROKEWIDTH, 1)) :
            Number(this.strokewidth) * minScale;
            canvas.setStrokeWidth(sw);

            var tmp = node.firstChild;

            while (tmp !== null) {
                if (tmp.nodeType === constants.NODETYPE_ELEMENT) {
                    this.drawNode(canvas, shape, tmp, aspect, disableShadow);
                }

                tmp = tmp.nextSibling;
            }
        }
    },

    computeAspect: function (shape, x, y, w, h, direction) {
        var x0 = x;
        var y0 = y;
        var sx = w / this.w0;
        var sy = h / this.h0;

        var inverse = (direction === constants.DIRECTION_NORTH || direction === constants.DIRECTION_SOUTH);

        if (inverse) {
            sy = w / this.h0;
            sx = h / this.w0;

            var delta = (w - h) / 2;

            x0 += delta;
            y0 -= delta;
        }

        if (this.aspect === 'fixed') {
            sy = Math.min(sx, sy);
            sx = sy;

            // Centers the shape inside the available space
            if (inverse) {
                x0 += (h - this.w0 * sx) / 2;
                y0 += (w - this.h0 * sy) / 2;
            }
            else {
                x0 += (w - this.w0 * sx) / 2;
                y0 += (h - this.h0 * sy) / 2;
            }
        }

        return new Rectangle(x0, y0, sx, sy);
    },

    drawNode: function (canvas, shape, node, aspect, disableShadow) {
        var name = node.nodeName;
        var x0 = aspect.x;
        var y0 = aspect.y;
        var sx = aspect.width;
        var sy = aspect.height;
        var minScale = Math.min(sx, sy);

        if (name === 'save') {
            canvas.save();
        }
        else if (name === 'restore') {
            canvas.restore();
        }
        else if (name === 'path') {
            canvas.begin();

            // Renders the elements inside the given path
            var childNode = node.firstChild;

            while (childNode !== null) {
                if (childNode.nodeType === constants.NODETYPE_ELEMENT) {
                    this.drawNode(canvas, shape, childNode, aspect, disableShadow);
                }

                childNode = childNode.nextSibling;
            }
        }
        else if (name === 'close') {
            canvas.close();
        }
        else if (name === 'move') {
            canvas.moveTo(x0 + Number(node.getAttribute('x')) * sx, y0 + Number(node.getAttribute('y')) * sy);
        }
        else if (name === 'line') {
            canvas.lineTo(x0 + Number(node.getAttribute('x')) * sx, y0 + Number(node.getAttribute('y')) * sy);
        }
        else if (name === 'quad') {
            canvas.quadTo(x0 + Number(node.getAttribute('x1')) * sx,
                y0 + Number(node.getAttribute('y1')) * sy,
                x0 + Number(node.getAttribute('x2')) * sx,
                y0 + Number(node.getAttribute('y2')) * sy);
        }
        else if (name === 'curve') {
            canvas.curveTo(x0 + Number(node.getAttribute('x1')) * sx,
                y0 + Number(node.getAttribute('y1')) * sy,
                x0 + Number(node.getAttribute('x2')) * sx,
                y0 + Number(node.getAttribute('y2')) * sy,
                x0 + Number(node.getAttribute('x3')) * sx,
                y0 + Number(node.getAttribute('y3')) * sy);
        }
        else if (name === 'arc') {
            canvas.arcTo(Number(node.getAttribute('rx')) * sx,
                Number(node.getAttribute('ry')) * sy,
                Number(node.getAttribute('x-axis-rotation')),
                Number(node.getAttribute('large-arc-flag')),
                Number(node.getAttribute('sweep-flag')),
                x0 + Number(node.getAttribute('x')) * sx,
                y0 + Number(node.getAttribute('y')) * sy);
        }
        else if (name === 'rect') {
            canvas.rect(x0 + Number(node.getAttribute('x')) * sx,
                y0 + Number(node.getAttribute('y')) * sy,
                Number(node.getAttribute('w')) * sx,
                Number(node.getAttribute('h')) * sy);
        }
        else if (name === 'roundrect') {
            var arcsize = Number(node.getAttribute('arcsize'));

            if (arcsize === 0) {
                arcsize = constants.RECTANGLE_ROUNDING_FACTOR * 100;
            }

            var w = Number(node.getAttribute('w')) * sx;
            var h = Number(node.getAttribute('h')) * sy;
            var factor = Number(arcsize) / 100;
            var r = Math.min(w * factor, h * factor);

            canvas.roundrect(x0 + Number(node.getAttribute('x')) * sx,
                y0 + Number(node.getAttribute('y')) * sy,
                w, h, r, r);
        }
        else if (name === 'ellipse') {
            canvas.ellipse(x0 + Number(node.getAttribute('x')) * sx,
                y0 + Number(node.getAttribute('y')) * sy,
                Number(node.getAttribute('w')) * sx,
                Number(node.getAttribute('h')) * sy);
        }
        else if (name === 'image') {
            if (!shape.outline) {
                var src = this.evaluateAttribute(node, 'src', shape);

                canvas.image(x0 + Number(node.getAttribute('x')) * sx,
                    y0 + Number(node.getAttribute('y')) * sy,
                    Number(node.getAttribute('w')) * sx,
                    Number(node.getAttribute('h')) * sy,
                    src, false, node.getAttribute('flipH') === '1',
                    node.getAttribute('flipV') === '1');
            }
        }
        else if (name === 'text') {
            if (!shape.outline) {
                var str = this.evaluateTextAttribute(node, 'str', shape);
                var rotation = node.getAttribute('vertical') === '1' ? -90 : 0;

                if (node.getAttribute('align-shape') === '0') {
                    var dr = shape.rotation;

                    // Depends on flipping
                    var flipH = utils.getValue(shape.style, constants.STYLE_FLIPH, 0) === 1;
                    var flipV = utils.getValue(shape.style, constants.STYLE_FLIPV, 0) === 1;

                    if (flipH && flipV) {
                        rotation -= dr;
                    }
                    else if (flipH || flipV) {
                        rotation += dr;
                    }
                    else {
                        rotation -= dr;
                    }
                }

                rotation -= node.getAttribute('rotation');

                canvas.text(x0 + Number(node.getAttribute('x')) * sx,
                    y0 + Number(node.getAttribute('y')) * sy,
                    0, 0, str, node.getAttribute('align') || 'left',
                    node.getAttribute('valign') || 'top', false, '',
                    null, false, rotation);
            }
        }
        else if (name === 'include-shape') {
            var stencil = stencilRegistry.getStencil(node.getAttribute('name'));

            if (stencil !== null) {
                var x = x0 + Number(node.getAttribute('x')) * sx;
                var y = y0 + Number(node.getAttribute('y')) * sy;
                var w1 = Number(node.getAttribute('w')) * sx;
                var h1 = Number(node.getAttribute('h')) * sy;

                stencil.drawShape(canvas, shape, x, y, w1, h1);
            }
        }
        else if (name === 'fillstroke') {
            canvas.fillAndStroke();
        }
        else if (name === 'fill') {
            canvas.fill();
        }
        else if (name === 'stroke') {
            canvas.stroke();
        }
        else if (name === 'strokewidth') {
            var s = (node.getAttribute('fixed') === '1') ? 1 : minScale;
            canvas.setStrokeWidth(Number(node.getAttribute('width')) * s);
        }
        else if (name === 'dashed') {
            canvas.setDashed(node.getAttribute('dashed') === '1');
        }
        else if (name === 'dashpattern') {
            var value = node.getAttribute('pattern');

            if (value !== null) {
                var tmp = value.split(' ');
                var pat = [];

                for (var i = 0; i < tmp.length; i++) {
                    if (tmp[i].length > 0) {
                        pat.push(Number(tmp[i]) * minScale);
                    }
                }

                value = pat.join(' ');
                canvas.setDashPattern(value);
            }
        }
        else if (name === 'strokecolor') {
            canvas.setStrokeColor(node.getAttribute('color'));
        }
        else if (name === 'linecap') {
            canvas.setLineCap(node.getAttribute('cap'));
        }
        else if (name === 'linejoin') {
            canvas.setLineJoin(node.getAttribute('join'));
        }
        else if (name === 'miterlimit') {
            canvas.setMiterLimit(Number(node.getAttribute('limit')));
        }
        else if (name === 'fillcolor') {
            canvas.setFillColor(node.getAttribute('color'));
        }
        else if (name === 'alpha') {
            canvas.setAlpha(node.getAttribute('alpha'));
        }
        else if (name === 'fontcolor') {
            canvas.setFontColor(node.getAttribute('color'));
        }
        else if (name === 'fontstyle') {
            canvas.setFontStyle(node.getAttribute('style'));
        }
        else if (name === 'fontfamily') {
            canvas.setFontFamily(node.getAttribute('family'));
        }
        else if (name === 'fontsize') {
            canvas.setFontSize(Number(node.getAttribute('size')) * minScale);
        }

        if (disableShadow && (name === 'fillstroke' || name === 'fill' || name === 'stroke')) {
            disableShadow = false;
            canvas.setShadow(false);
        }
    },

});

Stencil.allowEval = true;
Stencil.defaultLocalized = false;

module.exports = Stencil;

});