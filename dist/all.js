(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 全局基类

var Class = require('./common/class');
var utils = require('./common/utils');

module.exports = Class.create({
    constructor: function Base() {},

    toString: function () {},

    getValue: function () {},

    destroy: function () {

        var that = this;

        that.destroyed = true;
    }
});

},{"./common/class":23,"./common/utils":26}],2:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('./common/class');
var utils = require('./common/utils');
var constants = require('./constants');

var round = Math.round;
var each = utils.each;
var toFixed = utils.toFixed;
var ucFirst = utils.ucFirst;
var toRadians = utils.toRadians;
var isNullOrUndefined = utils.isNullOrUndefined;

var proto = {

    node: null,
    state: null,
    states: null,
    path: null,
    lastX: 0,
    lastY: 0,

    antiAlias: true,

    rotateHtml: true,
    matchHtmlAlignment: true,

    textEnabled: true,
    foEnabled: true,        // foreignObject
    foAltText: '[Object]',  // foreignObject 的替代文字
    strokeTolerance: 0,
    refCount: 0,
    blockImagePointerEvents: false,
    lineHeightCorrection: 1.05,
    pointerEventsValue: 'all',
    fontMetricsPadding: 10,
    pointerEvents: false,
    //moveOp: 'M',
    //lineOp: 'L',
    //quadOp: 'Q',   // 二次贝塞尔曲线
    //curveOp: 'C',  // 三次贝塞尔曲线
    //closeOp: 'Z',

    constructor: function Canvas2D(root, styleEnabled) {

        var canvas = this;

        canvas.root = root; // 根节点，即 shape 的根节点
        canvas.defs = null;
        canvas.gradients = [];
        canvas.styleEnabled = !isNullOrUndefined(styleEnabled) ? styleEnabled : false;

        canvas.reset();

        // 初始化 defs
        // ----------
        var svg = null;

        // 不在文档中
        if (root.ownerDocument !== document) {
            var node = root;

            while (node && node.nodeName !== 'svg') {
                node = node.parentNode;
            }

            svg = node;
        }

        if (svg) {

            var exists = svg.getElementsByTagName('defs');
            var defs = exists.length ? exists[0] : null;

            // Adds defs section if none exists
            if (!defs) {
                defs = canvas.createElement('defs');

                if (svg.firstChild) {
                    svg.insertBefore(defs, svg.firstChild);
                } else {
                    svg.appendChild(defs);
                }
            }

            // Adds stylesheet
            if (canvas.styleEnabled) {
                defs.appendChild(canvas.createStyle());
            }

            canvas.defs = defs;
        }
    },

    reset: function () {

        var canvas = this;

        canvas.state = canvas.createState();
        canvas.states = [];
        canvas.gradients = [];

        return canvas;
    },

    createState: function () {
        return {
            dx: 0,
            dy: 0,
            scale: 1,
            alpha: 1,
            fillColor: null,
            fillAlpha: 1,
            gradientColor: null,
            gradientAlpha: 1,
            gradientDirection: null,
            strokeColor: null,
            strokeWidth: 1,
            dashed: false,
            dashPattern: '3 3',
            lineCap: 'flat',
            lineJoin: 'miter',
            miterLimit: 10,
            fontColor: '#000000',
            fontBackgroundColor: null,
            fontBorderColor: null,
            fontSize: constants.DEFAULT_FONT_SIZE,
            fontFamily: constants.DEFAULT_FONT_FAMILY,
            fontStyle: 0,
            shadow: false,
            shadowColor: constants.SHADOW_COLOR,
            shadowAlpha: constants.SHADOW_OPACITY,
            shadowDx: constants.SHADOW_OFFSET_X,
            shadowDy: constants.SHADOW_OFFSET_Y,
            rotation: 0,
            rotationCx: 0,
            rotationCy: 0
        };
    },

    save: function () {

        var canvas = this;
        var state = canvas.state;

        canvas.states.push(state);
        canvas.state = utils.clone(state);

        return canvas;
    },

    restore: function () {

        var canvas = this;

        canvas.state = canvas.states.pop();

        return canvas;
    },

    format: function (value) {

        return this.antiAlias ?
            toFixed(value, 2) :
            Math.round(parseFloat(value));
    },

    rotatePoint: function (x, y, theta, cx, cy) {
        var rad = toRadians(theta);

        //return Point.getRotatedPoint(new Point(x, y), Math.cos(rad),
        //    Math.sin(rad), new Point(cx, cy));
    },

    scale: function (value) {
        var canvas = this;
        var state = canvas.state;

        state.scale *= value;
        state.strokeWidth *= value;

        return canvas;
    },

    translate: function (dx, dy) {
        var canvas = this;
        var state = canvas.state;

        state.dx += dx;
        state.dy += dy;

        return canvas;
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


    // Draw
    // ----

    // 开始一个新路径
    begin: function () {

        var canvas = this;

        canvas.lastX = 0;
        canvas.lastY = 0;
        canvas.path = [];
        canvas.node = canvas.createElement('path');

        return canvas;
    },

    addOp: function () {

        var canvas = this;
        var path = canvas.path;
        var state = canvas.state;
        var scale = state.scale;
        var format = canvas.format;
        var length = arguments.length;

        if (path) {
            path.push(arguments[0]);

            if (length > 2) {
                for (var i = 2; i < length; i += 2) {
                    canvas.lastX = arguments[i - 1];
                    canvas.lastY = arguments[i];

                    path.push(format((canvas.lastX + state.dx) * scale));
                    path.push(format((canvas.lastY + state.dy) * scale));
                }
            }
        }

        return canvas;
    },

    moveTo: function (x, y) {
        return this.addOp('M', x, y);
    },

    lineTo: function (x, y) {
        return this.addOp('L', x, y);
    },

    // 二次贝塞尔曲线
    quadTo: function (x1, y1, x2, y2) {
        return this.addOp('Q', x1, y1, x2, y2);
    },

    // 三次贝塞尔曲线
    curveTo: function (x1, y1, x2, y2, x3, y3) {
        return this.addOp('C', x1, y1, x2, y2, x3, y3);
    },

    // 圆弧
    arcTo: function (/*rx, ry, angle, largeArcFlag, sweepFlag, x, y*/) {

    },

    close: function () {
        return this.addOp('Z');
    },

    rect: function (x, y, w, h, dx, dy) {

        var canvas = this;
        var state = canvas.state;
        var scale = state.scale;
        var format = canvas.format;
        var rect = canvas.createElement('rect');

        rect.setAttribute('x', format((x + state.dx) * scale));
        rect.setAttribute('y', format((y + state.dy) * scale));
        rect.setAttribute('width', format(w * scale));
        rect.setAttribute('height', format(h * scale));

        if (dx > 0) {
            rect.setAttribute('rx', format(dx * scale));
        }

        if (dy > 0) {
            rect.setAttribute('ry', format(dy * scale));
        }

        canvas.node = rect;

        return canvas;
    },

    ellipse: function (x, y, w, h) {

        var canvas = this;
        var state = canvas.state;
        var scale = state.scale;

        var ellipse = canvas.createElement('ellipse');

        ellipse.setAttribute('cx', Math.round((x + w / 2 + state.dx) * scale));
        ellipse.setAttribute('cy', Math.round((y + h / 2 + state.dy) * scale));
        ellipse.setAttribute('rx', w / 2 * scale);
        ellipse.setAttribute('ry', h / 2 * scale);

        canvas.node = ellipse;

        return canvas;

    },

    image: function (x, y, w, h, src, aspect, flipH, flipV) {
        src = this.converter.convert(src);

        // LATER: Add option for embedding images as base64.
        aspect = (aspect != null) ? aspect : true;
        flipH = (flipH != null) ? flipH : false;
        flipV = (flipV != null) ? flipV : false;

        var s = this.state;
        x += s.dx;
        y += s.dy;

        var node = this.createElement('image');
        node.setAttribute('x', this.format(x * s.scale));
        node.setAttribute('y', this.format(y * s.scale));
        node.setAttribute('width', this.format(w * s.scale));
        node.setAttribute('height', this.format(h * s.scale));

        // Workaround for missing namespace support
        if (node.setAttributeNS == null) {
            node.setAttribute('xlink:href', src);
        }
        else {
            node.setAttributeNS(constants.NS_XLINK, 'xlink:href', src);
        }

        if (!aspect) {
            node.setAttribute('preserveAspectRatio', 'none');
        }

        if (s.alpha < 1) {
            node.setAttribute('opacity', s.alpha);
        }

        var tr = this.state.transform || '';

        if (flipH || flipV) {
            var sx = 1;
            var sy = 1;
            var dx = 0;
            var dy = 0;

            if (flipH) {
                sx = -1;
                dx = -w - 2 * x;
            }

            if (flipV) {
                sy = -1;
                dy = -h - 2 * y;
            }

            // Adds image tansformation to existing transform
            tr += 'scale(' + sx + ',' + sy + ')translate(' + (dx * s.scale) + ',' + (dy * s.scale) + ')';
        }

        if (tr.length > 0) {
            node.setAttribute('transform', tr);
        }

        if (!this.pointerEvents) {
            node.setAttribute('pointer-events', 'none');
        }

        this.root.appendChild(node);

        // Disables control-clicks on images in Firefox to open in new tab
        // by putting a rect in the foreground that absorbs all events and
        // disabling all pointer-events on the original image tag.
        if (this.blockImagePointerEvents) {
            node.setAttribute('style', 'pointer-events:none');

            node = this.createElement('rect');
            node.setAttribute('visibility', 'hidden');
            node.setAttribute('pointer-events', 'fill');
            node.setAttribute('x', this.format(x * s.scale));
            node.setAttribute('y', this.format(y * s.scale));
            node.setAttribute('width', this.format(w * s.scale));
            node.setAttribute('height', this.format(h * s.scale));
            this.root.appendChild(node);
        }
    },

    createDiv: function () {},

    text: function (x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation) {

        var canvas = this;

        if (canvas.textEnabled && !isNullOrUndefined(str)) {
            rotation = !isNullOrUndefined(rotation) ? rotation : 0;

            var state = canvas.state;
            x += state.dx;
            y += state.dy;

            if (canvas.foEnabled && format === 'html') {
                var style = 'vertical-align:top;';

                if (clip) {
                    style += 'overflow:hidden;max-height:' + round(h) + 'px;max-width:' + round(w) + 'px;';
                } else if (overflow === 'fill') {
                    style += 'width:' + round(w) + 'px;height:' + round(h) + 'px;';
                } else if (overflow === 'width') {
                    style += 'width:' + round(w) + 'px;';

                    if (h > 0) {
                        style += 'max-height:' + round(h) + 'px;';
                    }
                }

                if (wrap && w > 0) {
                    style += 'width:' + round(w) + 'px;white-space:normal;';
                } else {
                    style += 'white-space:nowrap;';
                }

                // Uses outer group for opacity and transforms to
                // fix rendering order in Chrome
                var group = canvas.createElement('g');

                if (state.alpha < 1) {
                    group.setAttribute('opacity', state.alpha);
                }

                var fo = canvas.createElement('foreignObject');
                fo.setAttribute('pointer-events', 'all');

                var div = this.createDiv(str, align, valign, style, overflow);

                // Ignores invalid XHTML labels
                if (div == null) {
                    return;
                }

                group.appendChild(fo);
                this.root.appendChild(group);

                // Code that depends on the size which is computed after
                // the element was added to the DOM.
                var ow = 0;
                var oh = 0;

                // Padding avoids clipping on border and wrapping for differing font metrics on platforms
                var padX = 2;
                var padY = 2;

                // NOTE: IE is always export as it does not support foreign objects
                if (mxClient.IS_IE && (document.documentMode == 9 || !mxClient.IS_SVG)) {
                    // Handles non-standard namespace for getting size in IE
                    var clone = document.createElement('div');

                    clone.style.cssText = div.getAttribute('style');
                    clone.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
                    clone.style.position = 'absolute';
                    clone.style.visibility = 'hidden';

                    // Inner DIV is needed for text measuring
                    var div2 = document.createElement('div');
                    div2.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
                    div2.innerHTML = (mxUtils.isNode(str)) ? str.outerHTML : str;
                    clone.appendChild(div2);

                    document.body.appendChild(clone);

                    // Workaround for different box models
                    if (document.documentMode != 8 && document.documentMode != 9 && state.fontBorderColor != null) {
                        padX += 2;
                        padY += 2;
                    }

                    if (wrap && w > 0) {
                        var tmp = div2.offsetWidth;

                        // Workaround for adding padding twice in IE8/IE9 standards mode if label is wrapped
                        var padDx = 0;

                        // For export, if no wrapping occurs, we add a large padding to make
                        // sure there is no wrapping even if the text metrics are different.
                        // This adds support for text metrics on different operating systems.
                        if (!clip && this.root.ownerDocument != document) {
                            var ws = clone.style.whiteSpace;
                            clone.style.whiteSpace = 'nowrap';

                            // Checks if wrapped width is equal to non-wrapped width (ie no wrapping)
                            if (tmp == div2.offsetWidth) {
                                padX += this.fontMetricsPadding;
                            }
                            else if (document.documentMode == 8 || document.documentMode == 9) {
                                padDx = -2;
                            }

                            // Restores the previous white space
                            // This is expensive!
                            clone.style.whiteSpace = ws;
                        }

                        // Required to update the height of the text box after wrapping width is known
                        tmp = tmp + padX;

                        if (clip) {
                            tmp = Math.min(tmp, w);
                        }

                        clone.style.width = tmp + 'px';

                        // Padding avoids clipping on border
                        ow = div2.offsetWidth + padX + padDx;
                        oh = div2.offsetHeight + padY;

                        // Overrides the width of the DIV via XML DOM by using the
                        // clone DOM style, getting the CSS text for that and
                        // then setting that on the DIV via setAttribute
                        clone.style.display = 'inline-block';
                        clone.style.position = '';
                        clone.style.visibility = '';
                        clone.style.width = ow + 'px';

                        div.setAttribute('style', clone.style.cssText);
                    }
                    else {
                        // Padding avoids clipping on border
                        ow = div2.offsetWidth + padX;
                        oh = div2.offsetHeight + padY;
                    }

                    clone.parentNode.removeChild(clone);
                    fo.appendChild(div);
                }
                else {
                    // Workaround for export and Firefox where sizes are not reported or updated correctly
                    // when inside a foreignObject (Opera has same bug but it cannot be fixed for all cases
                    // using this workaround so foreignObject is disabled).
                    if (this.root.ownerDocument != document || mxClient.IS_FF) {
                        // Getting size via local document for export
                        div.style.visibility = 'hidden';
                        document.body.appendChild(div);
                    }
                    else {
                        fo.appendChild(div);
                    }

                    var sizeDiv = div;

                    if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                        sizeDiv = sizeDiv.firstChild;
                    }

                    var tmp = sizeDiv.offsetWidth;

                    // For export, if no wrapping occurs, we add a large padding to make
                    // sure there is no wrapping even if the text metrics are different.
                    if (!clip && wrap && w > 0 && this.root.ownerDocument != document) {
                        var ws = div.style.whiteSpace;
                        div.style.whiteSpace = 'nowrap';

                        if (tmp == sizeDiv.offsetWidth) {
                            padX += this.fontMetricsPadding;
                        }

                        div.style.whiteSpace = ws;
                    }

                    ow = tmp + padX;

                    // Recomputes the height of the element for wrapped width
                    if (wrap) {
                        if (clip) {
                            ow = Math.min(ow, w);
                        }

                        div.style.width = ow + 'px';
                    }

                    ow = sizeDiv.offsetWidth + padX;
                    oh = sizeDiv.offsetHeight + 2;

                    if (div.parentNode != fo) {
                        fo.appendChild(div);
                        div.style.visibility = '';
                    }
                }

                if (clip) {
                    oh = Math.min(oh, h);
                    ow = Math.min(ow, w);
                }

                if (overflow == 'fill') {
                    w = Math.max(w, ow);
                    h = Math.max(h, oh);
                }
                else if (overflow == 'width') {
                    w = Math.max(w, ow);
                    h = oh;
                }
                else {
                    w = ow;
                    h = oh;
                }

                if (state.alpha < 1) {
                    group.setAttribute('opacity', state.alpha);
                }

                var dx = 0;
                var dy = 0;

                if (align == constants.ALIGN_CENTER) {
                    dx -= w / 2;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    dx -= w;
                }

                x += dx;

                // FIXME: LINE_HEIGHT not ideal for all text sizes, fix for export
                if (valign == constants.ALIGN_MIDDLE) {
                    dy -= h / 2 - 1;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    dy -= h - 2;
                }

                y += dy;

                var tr = (state.scale != 1) ? 'scale(' + state.scale + ')' : '';

                if (state.rotation != 0 && this.rotateHtml) {
                    tr += 'rotate(' + (state.rotation) + ',' + (w / 2) + ',' + (h / 2) + ')';
                    var pt = this.rotatePoint((x + w / 2) * state.scale, (y + h / 2) * state.scale,
                        state.rotation, state.rotationCx, state.rotationCy);
                    x = pt.x - w * state.scale / 2;
                    y = pt.y - h * state.scale / 2;
                }
                else {
                    x *= state.scale;
                    y *= state.scale;
                }

                if (rotation != 0) {
                    tr += 'rotate(' + (rotation) + ',' + (-dx) + ',' + (-dy) + ')';
                }

                group.setAttribute('transform', 'translate(' + Math.round(x) + ',' + Math.round(y) + ')' + tr);
                fo.setAttribute('width', Math.round(Math.max(1, w)));
                fo.setAttribute('height', Math.round(Math.max(1, h)));

                // Adds alternate content if foreignObject not supported in viewer
                if (this.root.ownerDocument != document) {
                    var alt = this.createAlternateContent(fo, x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation);

                    if (alt != null) {
                        fo.setAttribute('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility');
                        var sw = this.createElement('switch');
                        sw.appendChild(fo);
                        sw.appendChild(alt);
                        group.appendChild(sw);
                    }
                }
            }
            else {
                canvas.plainText(x, y, w, h, str, align, valign, wrap, overflow, clip, rotation);
            }
        }
    },

    plainText: function (x, y, w, h, str, align, valign, wrap, overflow, clip, rotation) {
        rotation = (rotation != null) ? rotation : 0;
        var s = this.state;
        var size = Math.round(s.fontSize);
        var node = this.createElement('g');
        var tr = s.transform || '';
        this.updateFont(node);

        // Non-rotated text
        if (rotation != 0) {
            tr += 'rotate(' + rotation + ',' + this.format(x * s.scale) + ',' + this.format(y * s.scale) + ')';
        }

        if (clip && w > 0 && h > 0) {
            var cx = x;
            var cy = y;

            if (align == constants.ALIGN_CENTER) {
                cx -= w / 2;
            }
            else if (align == constants.ALIGN_RIGHT) {
                cx -= w;
            }

            if (overflow != 'fill') {
                if (valign == constants.ALIGN_MIDDLE) {
                    cy -= h / 2;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    cy -= h;
                }
            }

            // LATER: Remove spacing from clip rectangle
            var c = this.createClip(cx * s.scale - 2, cy * s.scale - 2, w * s.scale + 4, h * s.scale + 4);

            if (this.defs != null) {
                this.defs.appendChild(c);
            }
            else {
                // Makes sure clip is removed with referencing node
                this.root.appendChild(c);
            }

            if (!mxClient.IS_IE && this.root.ownerDocument == document) {
                // Workaround for potential base tag
                var base = this.getBaseUrl().replace(/([\(\)])/g, '\\$1');
                node.setAttribute('clip-path', 'url(' + base + '#' + c.getAttribute('id') + ')');
            }
            else {
                node.setAttribute('clip-path', 'url(#' + c.getAttribute('id') + ')');
            }
        }

        // Default is left
        var anchor = (align == constants.ALIGN_RIGHT) ? 'end' :
            (align == constants.ALIGN_CENTER) ? 'middle' :
                'start';

        // Text-anchor start is default in SVG
        if (anchor != 'start') {
            node.setAttribute('text-anchor', anchor);
        }

        if (!this.styleEnabled || size != constants.DEFAULT_FONTSIZE) {
            node.setAttribute('font-size', Math.round(size * s.scale) + 'px');
        }

        if (tr.length > 0) {
            node.setAttribute('transform', tr);
        }

        if (s.alpha < 1) {
            node.setAttribute('opacity', s.alpha);
        }

        var lines = str.split('\n');
        var lh = Math.round(size * constants.LINE_HEIGHT);
        var textHeight = size + (lines.length - 1) * lh;

        var cy = y + size - 1;

        if (valign == constants.ALIGN_MIDDLE) {
            if (overflow == 'fill') {
                cy -= h / 2;
            }
            else {
                var dy = ((this.matchHtmlAlignment && clip && h > 0) ? Math.min(textHeight, h) : textHeight) / 2;
                cy -= dy + 1;
            }
        }
        else if (valign == constants.ALIGN_BOTTOM) {
            if (overflow == 'fill') {
                cy -= h;
            }
            else {
                var dy = (this.matchHtmlAlignment && clip && h > 0) ? Math.min(textHeight, h) : textHeight;
                cy -= dy + 2;
            }
        }

        for (var i = 0; i < lines.length; i++) {
            // Workaround for bounding box of empty lines and spaces
            if (lines[i].length > 0 && utils.trim(lines[i]).length > 0) {
                var text = this.createElement('text');
                // LATER: Match horizontal HTML alignment
                text.setAttribute('x', this.format(x * s.scale));
                text.setAttribute('y', this.format(cy * s.scale));

                utils.write(text, lines[i]);
                node.appendChild(text);
            }

            cy += lh;
        }

        this.root.appendChild(node);
        this.addTextBackground(node, str, x, y, w, (overflow == 'fill') ? h : textHeight, align, valign, overflow);
    },

    createClip: function (x, y, w, h) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);

        var id = 'mx-clip-' + x + '-' + y + '-' + w + '-' + h;

        var counter = 0;
        var tmp = id + '-' + counter;

        // Resolves ID conflicts
        while (document.getElementById(tmp) != null) {
            tmp = id + '-' + (++counter);
        }

        clip = this.createElement('clipPath');
        clip.setAttribute('id', tmp);

        var rect = this.createElement('rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);

        clip.appendChild(rect);

        return clip;
    },

    updateFont: function (node) {

        var canvas = this;
        var state = canvas.state;

        node.setAttribute('fill', state.fontColor);

        if (!canvas.styleEnabled || state.fontFamily !== constants.DEFAULT_FONTFAMILY) {
            node.setAttribute('font-family', state.fontFamily);
        }

        if ((state.fontStyle & constants.FONT_BOLD) === constants.FONT_BOLD) {
            node.setAttribute('font-weight', 'bold');
        }

        if ((state.fontStyle & constants.FONT_ITALIC) === constants.FONT_ITALIC) {
            node.setAttribute('font-style', 'italic');
        }

        if ((state.fontStyle & constants.FONT_UNDERLINE) === constants.FONT_UNDERLINE) {
            node.setAttribute('text-decoration', 'underline');
        }
    },

    addTextBackground: function (node, str, x, y, w, h, align, valign, overflow) {
        var s = this.state;

        if (s.fontBackgroundColor != null || s.fontBorderColor != null) {
            var bbox = null;

            if (overflow == 'fill' || overflow == 'width') {
                if (align == constants.ALIGN_CENTER) {
                    x -= w / 2;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    x -= w;
                }

                if (valign == constants.ALIGN_MIDDLE) {
                    y -= h / 2;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    y -= h;
                }

                bbox = new mxRectangle((x + 1) * s.scale, y * s.scale, (w - 2) * s.scale, (h + 2) * s.scale);
            }
            else if (node.getBBox != null && this.root.ownerDocument == document) {
                // Uses getBBox only if inside document for correct size
                try {
                    bbox = node.getBBox();
                    var ie = mxClient.IS_IE && mxClient.IS_SVG;
                    bbox = new mxRectangle(bbox.x, bbox.y + ((ie) ? 0 : 1), bbox.width, bbox.height + ((ie) ? 1 : 0));
                }
                catch (e) {
                    // Ignores NS_ERROR_FAILURE in FF if container display is none.
                }
            }
            else {
                // Computes size if not in document or no getBBox available
                var div = document.createElement('div');

                // Wrapping and clipping can be ignored here
                div.style.lineHeight = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(s.fontSize * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
                div.style.fontSize = Math.round(s.fontSize) + 'px';
                div.style.fontFamily = s.fontFamily;
                div.style.whiteSpace = 'nowrap';
                div.style.position = 'absolute';
                div.style.visibility = 'hidden';
                div.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
                div.style.zoom = '1';

                if ((s.fontStyle & constants.FONT_BOLD) == constants.FONT_BOLD) {
                    div.style.fontWeight = 'bold';
                }

                if ((s.fontStyle & constants.FONT_ITALIC) == constants.FONT_ITALIC) {
                    div.style.fontStyle = 'italic';
                }

                str = mxUtils.htmlEntities(str, false);
                div.innerHTML = str.replace(/\n/g, '<br/>');

                document.body.appendChild(div);
                var w = div.offsetWidth;
                var h = div.offsetHeight;
                div.parentNode.removeChild(div);

                if (align == constants.ALIGN_CENTER) {
                    x -= w / 2;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    x -= w;
                }

                if (valign == constants.ALIGN_MIDDLE) {
                    y -= h / 2;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    y -= h;
                }

                bbox = new mxRectangle((x + 1) * s.scale, (y + 2) * s.scale, w * s.scale, (h + 1) * s.scale);
            }

            if (bbox != null) {
                var n = this.createElement('rect');
                n.setAttribute('fill', s.fontBackgroundColor || 'none');
                n.setAttribute('stroke', s.fontBorderColor || 'none');
                n.setAttribute('x', Math.floor(bbox.x - 1));
                n.setAttribute('y', Math.floor(bbox.y - 1));
                n.setAttribute('width', Math.ceil(bbox.width + 2));
                n.setAttribute('height', Math.ceil(bbox.height));

                var sw = (s.fontBorderColor != null) ? Math.max(1, this.format(s.scale)) : 0;
                n.setAttribute('stroke-width', sw);

                // Workaround for crisp rendering - only required if not exporting
                if (this.root.ownerDocument == document && mxUtils.mod(sw, 2) == 1) {
                    n.setAttribute('transform', 'translate(0.5, 0.5)');
                }

                node.insertBefore(n, node.firstChild);
            }
        }
    },

    stroke: function () {
        this.addNode(false, true);
    },

    fill: function () {
        this.addNode(true, false);
    },

    fillAndStroke: function () {
        this.addNode(true, true);
    },

    createStyle: function () {
        var style = this.createElement('style');
        style.setAttribute('type', 'text/css');
        utils.write(style, 'svg{font-family:' + constants.DEFAULT_FONTFAMILY +
            ';font-size:' + constants.DEFAULT_FONTSIZE +
            ';fill:none;stroke-miterlimit:10}');

        return style;
    },

    createElement: function (tagName, namespace) {

        var ownerDocument = this.root.ownerDocument;

        if (ownerDocument.createElementNS) {
            return ownerDocument.createElementNS(namespace || constants.NS_SVG, tagName);
        } else {
            var ele = ownerDocument.createElement(tagName);

            if (namespace) {
                ele.setAttribute('xmlns', namespace);
            }

            return ele;
        }
    },

    createAlternateContent: function (fo, x, y, w, h) {
        if (this.foAltText) {
            var state = this.state;
            var alt = this.createElement('text');
            alt.setAttribute('x', Math.round(w / 2));
            alt.setAttribute('y', Math.round((h + state.fontSize) / 2));
            alt.setAttribute('fill', state.fontColor || 'black');
            alt.setAttribute('text-anchor', 'middle');
            alt.setAttribute('font-size', Math.round(state.fontSize) + 'px');
            alt.setAttribute('font-family', state.fontFamily);

            if ((state.fontStyle & constants.FONT_BOLD) === constants.FONT_BOLD) {
                alt.setAttribute('font-weight', 'bold');
            }

            if ((state.fontStyle & constants.FONT_ITALIC) === constants.FONT_ITALIC) {
                alt.setAttribute('font-style', 'italic');
            }

            if ((state.fontStyle & constants.FONT_UNDERLINE) === constants.FONT_UNDERLINE) {
                alt.setAttribute('text-decoration', 'underline');
            }

            utils.write(alt, this.foAltText);

            return alt;
        }
        else {
            return null;
        }
    },

    createGradientId: function (start, end, alpha1, alpha2, direction) {
        // Removes illegal characters from gradient ID
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

        // Wrong gradient directions possible?
        var dir = null;

        if (!direction || direction === constants.DIRECTION_SOUTH) {
            dir = 's';
        }
        else if (direction === constants.DIRECTION_EAST) {
            dir = 'e';
        } else {
            var tmp = start;
            start = end;
            end = tmp;

            if (direction === constants.DIRECTION_NORTH) {
                dir = 's';
            }
            else if (direction === constants.DIRECTION_WEST) {
                dir = 'e';
            }
        }

        return 'gradient-' + start + '-' + end + '-' + dir;
    },

    getSvgGradient: function (start, end, alpha1, alpha2, direction) {
        var id = this.createGradientId(start, end, alpha1, alpha2, direction);
        var gradient = this.gradients[id];

        if (!gradient) {
            var svg = this.root.ownerSVGElement;

            var counter = 0;
            var tmpId = id + '-' + counter;

            if (svg) {
                gradient = svg.ownerDocument.getElementById(tmpId);

                while (gradient && gradient.ownerSVGElement !== svg) {
                    tmpId = id + '-' + counter++;
                    gradient = svg.ownerDocument.getElementById(tmpId);
                }
            } else {
                // Uses shorter IDs for export
                tmpId = 'id' + (++this.refCount);
            }

            if (gradient == null) {
                gradient = this.createSvgGradient(start, end, alpha1, alpha2, direction);
                gradient.setAttribute('id', tmpId);

                if (this.defs != null) {
                    this.defs.appendChild(gradient);
                } else {
                    svg.appendChild(gradient);
                }
            }

            this.gradients[id] = gradient;
        }

        return gradient.getAttribute('id');
    },

    createSvgGradient: function (start, end, alpha1, alpha2, direction) {
        var gradient = this.createElement('linearGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '0%');

        if (!direction || direction === constants.DIRECTION_SOUTH) {
            gradient.setAttribute('y2', '100%');
        }
        else if (direction === constants.DIRECTION_EAST) {
            gradient.setAttribute('x2', '100%');
        }
        else if (direction === constants.DIRECTION_NORTH) {
            gradient.setAttribute('y1', '100%');
        }
        else if (direction === constants.DIRECTION_WEST) {
            gradient.setAttribute('x1', '100%');
        }

        var op = (alpha1 < 1) ? ';stop-opacity:' + alpha1 : '';

        var stop = this.createElement('stop');
        stop.setAttribute('offset', '0%');
        stop.setAttribute('style', 'stop-color:' + start + op);
        gradient.appendChild(stop);

        op = (alpha2 < 1) ? ';stop-opacity:' + alpha2 : '';

        stop = this.createElement('stop');
        stop.setAttribute('offset', '100%');
        stop.setAttribute('style', 'stop-color:' + end + op);
        gradient.appendChild(stop);

        return gradient;
    },

    addNode: function (filled, stroked) {

        var that = this;
        var root = that.root;
        var node = that.node;
        var state = that.state;

        if (!node) {
            return that;
        }


        if (node.nodeName === 'path') {

            var path = that.path;
            if (path && path.length) {
                node.setAttribute('d', path.join(' '));
            } else {
                return that;
            }
        }

        //
        if (filled && state.fillColor) {
            that.updateFill();
        } else if (!that.styleEnabled) {
            node.setAttribute('fill', 'none');
            // Sets the actual filled state for stroke tolerance
            filled = false;
        }

        if (stroked && state.strokeColor) {
            that.updateStroke();
        } else if (!that.styleEnabled) {
            node.setAttribute('stroke', 'none');
        }

        if (state.transform && state.transform.length > 0) {
            node.setAttribute('transform', state.transform);
        }

        if (state.shadow) {
            root.appendChild(that.createShadow(node));
        }

        // Adds stroke tolerance
        if (that.strokeTolerance > 0 && !filled) {
            root.appendChild(that.createTolerance(node));
        }

        // Adds pointer events
        if (that.pointerEvents && (node.nodeName != 'path' ||
            this.path[this.path.length - 1] == this.closeOp)) {
            node.setAttribute('pointer-events', this.pointerEventsValue);
        }
        // Enables clicks for nodes inside a link element
        else if (!that.pointerEvents && that.originalRoot === null) {
            node.setAttribute('pointer-events', 'none');
        }

        root.appendChild(node);

        return that;
    },

    updateFill: function () {
        var s = this.state;

        if (s.alpha < 1) {
            this.node.setAttribute('fill-opacity', s.alpha);
        }

        if (s.fillColor !== null) {
            if (s.gradientColor !== null) {
                var id = this.getSvgGradient(s.fillColor, s.gradientColor, s.fillAlpha, s.gradientAlpha, s.gradientDirection);

                if (!mxClient.IS_IE && this.root.ownerDocument == document) {
                    // Workaround for potential base tag and brackets must be escaped
                    var base = this.getBaseUrl().replace(/([\(\)])/g, '\\$1');
                    this.node.setAttribute('fill', 'url(' + base + '#' + id + ')');
                }
                else {
                    this.node.setAttribute('fill', 'url(#' + id + ')');
                }
            }
            else {
                this.node.setAttribute('fill', s.fillColor.toLowerCase());
            }
        }
    },

    getCurrentStrokeWidth: function () {
        return Math.max(1, this.format(this.state.strokeWidth * this.state.scale));
    },

    updateStroke: function () {
        var s = this.state;

        this.node.setAttribute('stroke', s.strokeColor.toLowerCase());

        if (s.alpha < 1) {
            this.node.setAttribute('stroke-opacity', s.alpha);
        }

        var sw = this.getCurrentStrokeWidth();

        if (sw != 1) {
            this.node.setAttribute('stroke-width', sw);
        }

        if (this.node.nodeName == 'path') {
            // 更新端点、连接点样式
            this.updateStrokeAttributes();
        }

        if (s.dashed) {
            this.node.setAttribute('stroke-dasharray', this.createDashPattern(s.strokeWidth * s.scale));
        }
    },

    updateStrokeAttributes: function () {
        var s = this.state;

        // Linejoin miter is default in SVG
        if (s.lineJoin != null && s.lineJoin != 'miter') {
            this.node.setAttribute('stroke-linejoin', s.lineJoin);
        }

        if (s.lineCap != null) {
            // flat is called butt in SVG
            var value = s.lineCap;

            if (value == 'flat') {
                value = 'butt';
            }

            // Linecap butt is default in SVG
            if (value != 'butt') {
                this.node.setAttribute('stroke-linecap', value);
            }
        }

        // Miterlimit 10 is default in our document
        if (s.miterLimit != null && (!this.styleEnabled || s.miterLimit != 10)) {
            this.node.setAttribute('stroke-miterlimit', s.miterLimit);
        }
    },

    createDashPattern: function (scale) {
        var pat = [];

        if (typeof(this.state.dashPattern) === 'string') {
            var dash = this.state.dashPattern.split(' ');

            if (dash.length > 0) {
                for (var i = 0; i < dash.length; i++) {
                    pat[i] = Number(dash[i]) * scale;
                }
            }
        }

        return pat.join(' ');
    },

    createTolerance: function (node) {
        var tol = node.cloneNode(true);
        var sw = parseFloat(tol.getAttribute('stroke-width') || 1) + this.strokeTolerance;
        tol.setAttribute('pointer-events', 'stroke');
        tol.setAttribute('visibility', 'hidden');
        tol.removeAttribute('stroke-dasharray');
        tol.setAttribute('stroke-width', sw);
        tol.setAttribute('fill', 'none');

        // Workaround for Opera ignoring the visiblity attribute above while
        // other browsers need a stroke color to perform the hit-detection but
        // do not ignore the visibility attribute. Side-effect is that Opera's
        // hit detection for horizontal/vertical edges seems to ignore the tol.

        //tol.setAttribute('stroke', (mxClient.IS_OP) ? 'none' : 'white');
        tol.setAttribute('stroke', 'white');

        return tol;
    },

    createShadow: function (node) {
        var shadow = node.cloneNode(true);
        var s = this.state;

        if (shadow.getAttribute('fill') != 'none') {
            shadow.setAttribute('fill', s.shadowColor);
        }

        if (shadow.getAttribute('stroke') != 'none') {
            shadow.setAttribute('stroke', s.shadowColor);
        }

        shadow.setAttribute('transform', 'translate(' + this.format(s.shadowDx * s.scale) +
            ',' + this.format(s.shadowDy * s.scale) + ')' + (s.transform || ''));
        shadow.setAttribute('opacity', s.shadowAlpha);

        return shadow;
    },

    setLink: function (link) {
        if (link == null) {
            this.root = this.originalRoot;
        }
        else {
            this.originalRoot = this.root;

            var node = this.createElement('a');

            // Workaround for implicit namespace handling in HTML5 export, IE adds NS1 namespace so use code below
            // in all IE versions except quirks mode. KNOWN: Adds xlink namespace to each image tag in output.
            if (node.setAttributeNS == null || (this.root.ownerDocument != document && document.documentMode == null)) {
                node.setAttribute('xlink:href', link);
            } else {
                node.setAttributeNS(constants.NS_XLINK, 'xlink:href', link);
            }

            this.root.appendChild(node);
            this.root = node;
        }
    },

    setFillColor: function (value) {
        var canvas = this;
        var state = canvas.state;

        if (value == constants.NONE) {
            value = null;
        }

        if (state) {
            state.fillColor = value;
            state.gradientColor = null;
        }

        return canvas;
    },

    setGradient: function () {},

    setFontStyle: function (value) {
        var canvas = this;
        var state = canvas.state;

        if (isNullOrUndefined(value)) {
            value = 0;
        }

        if (state) {
            state.fontStyle = value;
        }
        return canvas;
    },

    setShadowOffset: function (dx, dy) {
        var canvas = this;
        var state = canvas.state;

        if (state) {
            state.shadowDx = dx;
            state.shadowDy = dy;
        }

        return canvas;
    }
};

each([
    'alpha',
    'strokeWidth',
    'dashed',
    'dashPattern',
    'lineCap',
    'lineJoin',
    'miterLimit',
    'fontSize',
    'fontFamily',
    'shadow',
    'shadowAlpha'
], function (attr) {
    proto['set' + ucFirst(attr)] = function (value) {

        var canvas = this;
        var state = canvas.state;

        if (state) {
            state[attr] = value;
        }

        return canvas;
    };
});

each([
    'strokeColor',
    'fontColor',
    'fontBackgroundColor',
    'fontBorderColor',
    'setShadowColor'
], function (attr) {
    proto['set' + ucFirst(attr)] = function (value) {

        var canvas = this;
        var state = canvas.state;

        if (value === constants.NONE) {
            value = null;
        }

        if (state) {
            state[attr] = value;
        }

        return canvas;
    };
});


module.exports = Class.create(proto);

},{"./common/class":23,"./common/utils":26,"./constants":27}],3:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */
/*jshint -W030 */

// TODO: cell 可以细分为 连线和节点 两种，这里放在同一个类中有点生硬

var Class = require('./common/class');
var utils = require('./common/utils');
var constants = require('./constants');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function Cell(value, geometry, style) {

        var cell = this;

        cell.value = value;
        cell.setGeometry(geometry);
        cell.setStyle(style);

        cell.onInit && cell.onInit();
    },

    id: null,
    value: null,
    geometry: null,
    style: null,

    vertex: false,
    edge: false,
    connectable: true,
    visible: true,
    collapsed: false,

    source: null,
    target: null,

    parent: null,
    children: null,
    edges: null,

    // getter, setter
    // --------------
    getId: function () {
        return this.id;
    },

    setId: function (id) {
        this.id = id;
    },

    getValue: function () {
        return this.value;
    },

    setValue: function (value) {
        this.value = value;
    },

    getGeometry: function () {
        return this.geometry;
    },

    setGeometry: function (geometry) {
        this.geometry = geometry;
    },

    getStyle: function () {
        return this.style;
    },

    setStyle: function (style) {
        this.style = style;
    },

    isVertex: function () {
        return this.vertex;
    },

    setVertex: function (vertex) {
        this.vertex = vertex;
    },

    isEdge: function () {
        return this.edge;
    },

    setEdge: function (edge) {
        this.edge = edge;
    },

    isConnectable: function () {
        return this.connectable;
    },

    setConnectable: function (connectable) {
        this.connectable = connectable;
    },

    isVisible: function () {
        return this.visible;
    },

    setVisible: function (visible) {
        this.visible = visible;
    },

    isCollapsed: function () {
        return this.collapsed;
    },

    setCollapsed: function (collapsed) {
        this.collapsed = collapsed;
    },

    getParent: function () {
        return this.parent;
    },

    setParent: function (parent) {
        this.parent = parent;
    },

    getTerminal: function (source) {
        return (source) ? this.source : this.target;
    },

    setTerminal: function (terminal, isSource) {
        if (isSource) {
            this.source = terminal;
        }
        else {
            this.target = terminal;
        }

        return terminal;
    },

    getChildCount: function () {
        return this.children ? this.children.length : 0;
    },

    getIndex: function (child) {
        return utils.indexOf(this.children, child);
    },

    getChildAt: function (index) {
        return this.children ? this.children[index] : null;
    },

    insert: function (child, index) {
        if (child) {
            if (isNullOrUndefined(index)) {
                index = this.getChildCount();

                if (child.getParent() === this) {
                    index--;
                }
            }

            child.removeFromParent();
            child.setParent(this);

            if (!this.children) {
                this.children = [];
                this.children.push(child);
            } else {
                this.children.splice(index, 0, child);
            }
        }

        return child;
    },

    remove: function (index) {
        var child = null;

        if (this.children !== null && index >= 0) {
            child = this.getChildAt(index);

            if (child !== null) {
                this.children.splice(index, 1);
                child.setParent(null);
            }
        }

        return child;
    },

    removeFromParent: function () {
        if (this.parent !== null) {
            var index = this.parent.getIndex(this);
            this.parent.remove(index);
        }
    },

    getEdgeCount: function () {
        return (this.edges === null) ? 0 : this.edges.length;
    },

    getEdgeIndex: function (edge) {
        return utils.indexOf(this.edges, edge);
    },

    getEdgeAt: function (index) {
        return (this.edges === null) ? null : this.edges[index];
    },

    insertEdge: function (edge, isOutgoing) {
        if (edge !== null) {
            edge.removeFromTerminal(isOutgoing);
            edge.setTerminal(this, isOutgoing);

            if (this.edges === null ||
                edge.getTerminal(!isOutgoing) !== this ||
                utils.indexOf(this.edges, edge) < 0) {
                if (this.edges === null) {
                    this.edges = [];
                }

                this.edges.push(edge);
            }
        }

        return edge;
    },

    removeEdge: function (edge, isOutgoing) {
        if (edge) {
            if (edge.getTerminal(!isOutgoing) !== this && this.edges) {
                var index = this.getEdgeIndex(edge);

                if (index >= 0) {
                    this.edges.splice(index, 1);
                }
            }

            edge.setTerminal(null, isOutgoing);
        }

        return edge;
    },

    removeFromTerminal: function (isSource) {
        var terminal = this.getTerminal(isSource);

        if (terminal) {
            terminal.removeEdge(this, isSource);
        }
    },

    getAttribute: function (name, defaultValue) {
        var userObject = this.getValue();

        var val = (userObject !== null &&
        userObject.nodeType === constants.NODETYPE_ELEMENT) ?
            userObject.getAttribute(name) : null;

        return val || defaultValue;
    },

    setAttribute: function (name, value) {
        var userObject = this.getValue();

        if (userObject !== null &&
            userObject.nodeType === constants.NODETYPE_ELEMENT) {
            userObject.setAttribute(name, value);
        }
    },

    clone: function () {
        var clone = utils.clone(this, this.mxTransient);
        clone.setValue(this.cloneValue());

        return clone;
    },

    cloneValue: function () {
        var value = this.getValue();

        if (value !== null) {
            if (typeof(value.clone) === 'function') {
                value = value.clone();
            }
            else if (!isNaN(value.nodeType)) {
                value = value.cloneNode(true);
            }
        }

        return value;
    },

    valueChanged: function (newValue) {
        var previous = this.getValue();
        this.setValue(newValue);

        return previous;
    }
});

},{"./common/class":23,"./common/utils":26,"./constants":27}],4:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');
var detector = require('./common/detector');

var Dictionary = require('./common/Dictionary');
var Rectangle = require('./Rectangle');
var Point = require('./Point');
var constants = require('./constants');

var Shape = require('./shapes/Shape');
var RectangleShape = require('./shapes/RectangleShape');
var Text = require('./shapes/Text');
var Connector = require('./shapes/Connector');

var MouseEvent = require('./events/MouseEvent');
var domEvent = require('./events/domEvent');
var eventNames = require('./events/eventNames');

var isNullOrUndefined = utils.isNullOrUndefined;
var getValue = utils.getValue;

var CellRenderer = Class.create({
    // 静态属性和方法
    Statics: {
        shapes: {},
        getShape: function (name) {
            return CellRenderer.shapes[name];
        },
        registerShape: function (key, shape) {
            CellRenderer.shapes[key] = shape;
        }
    },

    // 属性
    defaultEdgeShape: Connector,
    defaultVertexShape: RectangleShape,
    defaultTextShape: Text,
    legacyControlPosition: true,
    legacySpacing: true,
    antiAlias: true,

    constructor: function CellRenderer() {},

    // 应用 state 中的样式，并创建 g 根节点，然后放入 drawPane 中
    initializeShape: function (state) {
        this.configureShape(state);
        state.shape.init(state.view.getDrawPane());
    },

    // 创建 state 之后，调用该方法初始化 state 的 shape
    createShape: function (state) {
        if (state.style != null) {
            // 模板
            // Checks if there is a stencil for the name and creates
            // a shape instance for the stencil if one exists
            //var stencil = mxStencilRegistry.getStencil(state.style[constants.STYLE_SHAPE]);

            //if (stencil != null) {
            //    state.shape = new mxShape(stencil);
            //}
            //else {
            var Ctor = this.getShapeConstructor(state);
            state.shape = new Ctor();
            //}

            state.shape.antiAlias = this.antiAlias;
        }
    },

    createIndicatorShape: function (state) {
        state.shape.indicatorShape = this.getShape(state.view.graph.getIndicatorShape(state));
    },

    // 获取构造函数
    getShape: function (name) {
        return this.constructor.shapes[name];
    },

    // 获取构造函数
    getShapeConstructor: function (state) {
        var Ctor = this.getShape(state.style[constants.STYLE_SHAPE]);

        if (Ctor == null) {
            Ctor = (state.view.graph.getModel().isEdge(state.cell))
                ? this.defaultEdgeShape
                : this.defaultVertexShape;
        }

        return Ctor;
    },

    // 应用样式
    configureShape: function (state) {
        state.shape.apply(state);
        state.shape.image = state.view.graph.getImage(state);
        state.shape.indicatorColor = state.view.graph.getIndicatorColor(state);
        state.shape.indicatorStrokeColor = state.style[constants.STYLE_INDICATOR_STROKECOLOR];
        state.shape.indicatorGradientColor = state.view.graph.getIndicatorGradientColor(state);
        state.shape.indicatorDirection = state.style[constants.STYLE_INDICATOR_DIRECTION];
        state.shape.indicatorImage = state.view.graph.getIndicatorImage(state);

        this.postConfigureShape(state);
    },

    postConfigureShape: function (state) {
        if (state.shape) {
            this.resolveColor(state, 'indicatorColor', constants.STYLE_FILLCOLOR);
            this.resolveColor(state, 'indicatorGradientColor', constants.STYLE_GRADIENTCOLOR);
            this.resolveColor(state, 'fill', constants.STYLE_FILLCOLOR);
            this.resolveColor(state, 'stroke', constants.STYLE_STROKECOLOR);
            this.resolveColor(state, 'gradient', constants.STYLE_GRADIENTCOLOR);
        }
    },

    resolveColor: function (state, field, key) {
        var value = state.shape[field];
        var graph = state.view.graph;
        var referenced = null;

        if (value == 'inherit') {
            referenced = graph.model.getParent(state.cell);
        } else if (value == 'swimlane') {
            if (graph.model.getTerminal(state.cell, false) != null) {
                referenced = graph.model.getTerminal(state.cell, false);
            } else {
                referenced = state.cell;
            }

            referenced = graph.getSwimlane(referenced);
            key = graph.swimlaneIndicatorColorAttribute;
        } else if (value == 'indicated') {
            state.shape[field] = state.shape.indicatorColor;
        }

        if (referenced != null) {
            var rstate = graph.getView().getState(referenced);
            state.shape[field] = null;

            if (rstate != null) {
                if (rstate.shape != null && field != 'indicatorColor') {
                    state.shape[field] = rstate.shape[field];
                } else {
                    state.shape[field] = rstate.style[key];
                }
            }
        }
    },

    getLabelValue: function (state) {
        return state.view.graph.getLabel(state.cell);
    },

    createLabel: function (state, value) {
        var graph = state.view.graph;
        var isEdge = graph.getModel().isEdge(state.cell);

        if (state.style[constants.STYLE_FONTSIZE] > 0 || state.style[constants.STYLE_FONTSIZE] == null) {
            // Avoids using DOM node for empty labels
            var isForceHtml = (graph.isHtmlLabel(state.cell) || (value != null && utils.isNode(value)));

            state.text = new this.defaultTextShape(value, new Rectangle(),
                (state.style[constants.STYLE_ALIGN] || constants.ALIGN_CENTER),
                graph.getVerticalAlign(state),
                state.style[constants.STYLE_FONTCOLOR],
                state.style[constants.STYLE_FONTFAMILY],
                state.style[constants.STYLE_FONTSIZE],
                state.style[constants.STYLE_FONTSTYLE],
                state.style[constants.STYLE_SPACING],
                state.style[constants.STYLE_SPACING_TOP],
                state.style[constants.STYLE_SPACING_RIGHT],
                state.style[constants.STYLE_SPACING_BOTTOM],
                state.style[constants.STYLE_SPACING_LEFT],
                state.style[constants.STYLE_HORIZONTAL],
                state.style[constants.STYLE_LABEL_BACKGROUNDCOLOR],
                state.style[constants.STYLE_LABEL_BORDERCOLOR],
                graph.isWrapping(state.cell) && graph.isHtmlLabel(state.cell),
                graph.isLabelClipped(state.cell),
                state.style[constants.STYLE_OVERFLOW],
                state.style[constants.STYLE_LABEL_PADDING]);

            state.text.opacity = utils.getValue(state.style, constants.STYLE_TEXT_OPACITY, 100);
            //state.text.dialect = (isForceHtml) ? constants.DIALECT_STRICTHTML : state.view.graph.dialect;
            state.text.style = state.style;
            state.text.state = state;
            this.initializeLabel(state);

            // TODO return
            // --------------
            return;

            // Workaround for touch devices routing all events for a mouse gesture
            // (down, move, up) via the initial DOM node. IE additionally redirects
            // the event via the initial DOM node but the event source is the node
            // under the mouse, so we need to check if this is the case and force
            // getCellAt for the subsequent mouseMoves and the final mouseUp.
            var forceGetCell = false;

            var getState = function (evt) {
                var result = state;

                if (mxClient.IS_TOUCH || forceGetCell) {
                    var x = mxEvent.getClientX(evt);
                    var y = mxEvent.getClientY(evt);

                    // Dispatches the drop event to the graph which
                    // consumes and executes the source function
                    var pt = Point.convertPoint(graph.container, x, y);
                    result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
                }

                return result;
            };

            // TODO: Add handling for special touch device gestures
            mxEvent.addGestureListeners(state.text.node,
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                        forceGetCell = graph.dialect != constants.DIALECT_SVG &&
                            mxEvent.getSource(evt).nodeName == 'IMG';
                    }
                }),
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt, getState(evt)));
                    }
                }),
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt, getState(evt)));
                        forceGetCell = false;
                    }
                })
            );

            // Uses double click timeout in mxGraph for quirks mode
            if (graph.nativeDblClickEnabled) {
                mxEvent.addListener(state.text.node, 'dblclick',
                    mxUtils.bind(this, function (evt) {
                        if (this.isLabelEvent(state, evt)) {
                            graph.dblClick(evt, state.cell);
                            mxEvent.consume(evt);
                        }
                    })
                );
            }
        }
    },

    initializeLabel: function (state) {
        //if (mxClient.IS_SVG && mxClient.NO_FO && state.text.dialect != constants.DIALECT_SVG) {
        //    state.text.init(state.view.graph.container);
        //}
        //else {
        state.text.init(state.view.getDrawPane());
        //}
    },

    createCellOverlays: function (state) {
        var graph = state.view.graph;
        var overlays = graph.getCellOverlays(state.cell);
        var dict = null;

        if (overlays != null) {
            dict = new Dictionary();

            for (var i = 0; i < overlays.length; i++) {
                var shape = (state.overlays != null) ? state.overlays.remove(overlays[i]) : null;

                if (shape == null) {
                    var tmp = new ImageShape(new Rectangle(), overlays[i].image.src);
                    tmp.dialect = state.view.graph.dialect;
                    tmp.preserveImageAspect = false;
                    tmp.overlay = overlays[i];
                    this.initializeOverlay(state, tmp);
                    this.installCellOverlayListeners(state, overlays[i], tmp);

                    if (overlays[i].cursor != null) {
                        tmp.node.style.cursor = overlays[i].cursor;
                    }

                    dict.put(overlays[i], tmp);
                }
                else {
                    dict.put(overlays[i], shape);
                }
            }
        }

        // Removes unused
        if (state.overlays != null) {
            state.overlays.visit(function (id, shape) {
                shape.destroy();
            });
        }

        state.overlays = dict;
    },

    initializeOverlay: function (state, overlay) {
        overlay.init(state.view.getOverlayPane());
    },

    installCellOverlayListeners: function (state, overlay, shape) {
        var graph = state.view.graph;

        // TODO return
        //
        return

        mxEvent.addListener(shape.node, 'click', function (evt) {
            if (graph.isEditing()) {
                graph.stopEditing(!graph.isInvokesStopCellEditing());
            }

            overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
                'event', evt, 'cell', state.cell));
        });

        mxEvent.addGestureListeners(shape.node,
            function (evt) {
                mxEvent.consume(evt);
            },
            function (evt) {
                graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
                    new mxMouseEvent(evt, state));
            });

        if (mxClient.IS_TOUCH) {
            mxEvent.addListener(shape.node, 'touchend', function (evt) {
                overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
                    'event', evt, 'cell', state.cell));
            });
        }
    },

    // 创建展开/折叠按钮
    createControl: function (state) {
        var graph = state.view.graph;
        var image = graph.getFoldingImage(state);

        if (graph.foldingEnabled && image != null) {
            if (state.control == null) {
                var b = new Rectangle(0, 0, image.width, image.height);
                state.control = new ImageShape(b, image.src);
                state.control.preserveImageAspect = false;
                state.control.dialect = graph.dialect;

                this.initControl(state, state.control, true, function (evt) {
                    if (graph.isEnabled()) {
                        var collapse = !graph.isCellCollapsed(state.cell);
                        graph.foldCells(collapse, false, [state.cell]);
                        mxEvent.consume(evt);
                    }
                });
            }
        }
        else if (state.control != null) {
            state.control.destroy();
            state.control = null;
        }
    },

    initControl: function (state, control, handleEvents, clickHandler) {
        var graph = state.view.graph;

        // In the special case where the label is in HTML and the display is SVG the image
        // should go into the graph container directly in order to be clickable. Otherwise
        // it is obscured by the HTML label that overlaps the cell.
        var isForceHtml = graph.isHtmlLabel(state.cell) && mxClient.NO_FO &&
            graph.dialect == constants.DIALECT_SVG;

        if (isForceHtml) {
            control.dialect = constants.DIALECT_PREFERHTML;
            control.init(graph.container);
            control.node.style.zIndex = 1;
        }
        else {
            control.init(state.view.getOverlayPane());
        }

        var node = control.innerNode || control.node;

        if (clickHandler) {
            if (graph.isEnabled()) {
                node.style.cursor = 'pointer';
            }

            mxEvent.addListener(node, 'click', clickHandler);
        }

        if (handleEvents) {
            mxEvent.addGestureListeners(node,
                function (evt) {
                    graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                    mxEvent.consume(evt);
                },
                function (evt) {
                    graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt, state));
                });
        }

        return node;
    },

    isShapeEvent: function (state, evt) {
        return true;
    },

    isLabelEvent: function (state, evt) {
        return true;
    },

    // 监听 DOM 事件
    installListeners: function (state) {
        var that = this;
        var graph = state.view.graph;

        // Workaround for touch devices routing all events for a mouse
        // gesture (down, move, up) via the initial DOM node. Same for
        // HTML images in all IE versions (VML images are working).
        function getState(evt) {
            var result = state;

            if (detector.IS_TOUCH) {
                var x = domEvent.getClientX(evt);
                var y = domEvent.getClientY(evt);

                // Dispatches the drop event to the graph which
                // consumes and executes the source function
                var pt = Point.convertPoint(graph.container, x, y);
                result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
            }

            return result;
        }

        domEvent.onGesture(state.shape.node,
            function (evt) {
                if (that.isShapeEvent(state, evt)) {
                    state = state.shape && domEvent.getSource(evt) === state.shape.content ? null : state;
                    graph.fireMouseEvent(eventNames.MOUSE_DOWN, new MouseEvent(evt, state));
                }
            },
            function (evt) {
                if (that.isShapeEvent(state, evt)) {
                    state = state.shape && domEvent.getSource(evt) === state.shape.content ? null : getState(evt);
                    graph.fireMouseEvent(eventNames.MOUSE_MOVE, new MouseEvent(evt, state));
                }
            },
            function (evt) {
                if (that.isShapeEvent(state, evt)) {
                    state = state.shape && domEvent.getSource(evt) === state.shape.content ? null : getState(evt);
                    graph.fireMouseEvent(eventNames.MOUSE_UP, new MouseEvent(evt, state));
                }
            }
        );


        // Uses double click timeout in mxGraph for quirks mode
        if (graph.nativeDblClickEnabled) {
            domEvent.on(state.shape.node, 'dblclick', function (evt) {
                    if (that.isLabelEvent(state, evt)) {
                        graph.dblClick(evt, state.cell);
                        domEvent.consume(evt);
                    }
                }
            );
        }
    },

    redrawLabel: function (state, forced) {
        var value = this.getLabelValue(state);

        if (state.text == null && value != null && (utils.isNode(value) || value.length > 0)) {
            this.createLabel(state, value);
        }
        else if (state.text != null && (value == null || value.length == 0)) {
            state.text.destroy();
            state.text = null;
        }

        if (state.text != null) {
            var graph = state.view.graph;
            var wrapping = graph.isWrapping(state.cell);
            var clipping = graph.isLabelClipped(state.cell);
            var bounds = this.getLabelBounds(state);

            var isForceHtml = (state.view.graph.isHtmlLabel(state.cell) || (value != null && utils.isNode(value)));
            var dialect = (isForceHtml) ? constants.DIALECT_STRICTHTML : state.view.graph.dialect;

            // Text is a special case where change of dialect is possible at runtime
            if (forced || state.text.value != value || state.text.isWrapping != wrapping ||
                state.text.isClipping != clipping || state.text.scale != state.view.scale ||
                state.text.dialect != dialect || !state.text.bounds.equals(bounds)) {
                state.text.dialect = dialect;
                state.text.value = value;
                state.text.bounds = bounds;
                state.text.scale = this.getTextScale(state);
                state.text.isWrapping = wrapping;
                state.text.isClipping = clipping;

                state.text.redraw();
            }
        }
    },

    getTextScale: function (state) {
        return state.view.scale;
    },

    getLabelBounds: function (state) {
        var graph = state.view.graph;
        var scale = state.view.scale;
        var isEdge = graph.getModel().isEdge(state.cell);
        var bounds = new Rectangle(state.absoluteOffset.x, state.absoluteOffset.y);

        if (isEdge) {
            var spacing = state.text.getSpacing();
            bounds.x += spacing.x * scale;
            bounds.y += spacing.y * scale;

            var geo = graph.getCellGeometry(state.cell);

            if (geo != null) {
                bounds.width = Math.max(0, geo.width * scale);
                bounds.height = Math.max(0, geo.height * scale);
            }
        }
        else {
            // Inverts label position
            if (state.text.isPaintBoundsInverted()) {
                var tmp = bounds.x;
                bounds.x = bounds.y;
                bounds.y = tmp;
            }

            bounds.x += state.x;
            bounds.y += state.y;

            // Minimum of 1 fixes alignment bug in HTML labels
            bounds.width = Math.max(1, state.width);
            bounds.height = Math.max(1, state.height);

            var sc = getValue(state.style, constants.STYLE_STROKECOLOR, constants.NONE);

            if (sc != constants.NONE && sc != '') {
                var s = parseFloat(getValue(state.style, constants.STYLE_STROKEWIDTH, 1)) * scale / 2;
                var s2 = 2 * s + 0.5;

                bounds.x += s;
                bounds.y += s;
                bounds.width -= s2;
                bounds.height -= s2;
            }
        }

        if (state.text.isPaintBoundsInverted()) {
            // Rotates around center of state
            var t = (state.width - state.height) / 2;
            bounds.x += t;
            bounds.y -= t;
            var tmp = bounds.width;
            bounds.width = bounds.height;
            bounds.height = tmp;
        }

        // Shape can modify its label bounds
        if (state.shape != null) {
            bounds = state.shape.getLabelBounds(bounds);
        }

        // Label width style overrides actual label width
        var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

        if (lw != null) {
            bounds.width = parseFloat(lw) * scale;
        }

        if (!isEdge) {
            this.rotateLabelBounds(state, bounds);
        }

        return bounds;
    },

    rotateLabelBounds: function (state, bounds) {
        bounds.x -= state.text.margin.x * bounds.width;
        bounds.y -= state.text.margin.y * bounds.height;

        if (!this.legacySpacing || (state.style[constants.STYLE_OVERFLOW] != 'fill' && state.style[constants.STYLE_OVERFLOW] != 'width')) {
            var s = state.view.scale;
            var spacing = state.text.getSpacing();
            bounds.x += spacing.x * s;
            bounds.y += spacing.y * s;

            var hpos = getValue(state.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER);
            var vpos = getValue(state.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE);
            var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

            bounds.width = Math.max(0, bounds.width - ((hpos == constants.ALIGN_CENTER && lw == null) ? (state.text.spacingLeft * s + state.text.spacingRight * s) : 0));
            bounds.height = Math.max(0, bounds.height - ((vpos == constants.ALIGN_MIDDLE) ? (state.text.spacingTop * s + state.text.spacingBottom * s) : 0));
        }

        var theta = state.text.getTextRotation();

        // Only needed if rotated around another center
        if (theta != 0 && state != null && state.view.graph.model.isVertex(state.cell)) {
            var cx = state.getCenterX();
            var cy = state.getCenterY();

            if (bounds.x != cx || bounds.y != cy) {
                var rad = theta * (Math.PI / 180);
                var pt = Point.getRotatedPoint(new Point(bounds.x, bounds.y),
                    Math.cos(rad), Math.sin(rad), new Point(cx, cy));

                bounds.x = pt.x;
                bounds.y = pt.y;
            }
        }
    },

    redrawCellOverlays: function (state, forced) {
        this.createCellOverlays(state);

        if (state.overlays != null) {
            var rot = mxUtils.mod(mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0), 90);
            var rad = mxUtils.toRadians(rot);
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            state.overlays.visit(function (id, shape) {
                var bounds = shape.overlay.getBounds(state);

                if (!state.view.graph.getModel().isEdge(state.cell)) {
                    if (state.shape != null && rot != 0) {
                        var cx = bounds.getCenterX();
                        var cy = bounds.getCenterY();

                        var point = Point.getRotatedPoint(new mxPoint(cx, cy), cos, sin,
                            new mxPoint(state.getCenterX(), state.getCenterY()));

                        cx = point.x;
                        cy = point.y;
                        bounds.x = Math.round(cx - bounds.width / 2);
                        bounds.y = Math.round(cy - bounds.height / 2);
                    }
                }

                if (forced || shape.bounds == null || shape.scale != state.view.scale || !shape.bounds.equals(bounds)) {
                    shape.bounds = bounds;
                    shape.scale = state.view.scale;
                    shape.redraw();
                }
            });
        }
    },

    redrawControl: function (state, forced) {
        var image = state.view.graph.getFoldingImage(state);

        if (state.control != null && image != null) {
            var bounds = this.getControlBounds(state, image.width, image.height);
            var r = (this.legacyControlPosition) ?
                mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0) :
                state.shape.getTextRotation();
            var s = state.view.scale;

            if (forced || state.control.scale != s || !state.control.bounds.equals(bounds) ||
                state.control.rotation != r) {
                state.control.rotation = r;
                state.control.bounds = bounds;
                state.control.scale = s;

                state.control.redraw();
            }
        }
    },

    getControlBounds: function (state, w, h) {
        if (state.control != null) {
            var s = state.view.scale;
            var cx = state.getCenterX();
            var cy = state.getCenterY();

            if (!state.view.graph.getModel().isEdge(state.cell)) {
                cx = state.x + w * s;
                cy = state.y + h * s;

                if (state.shape != null) {
                    // TODO: Factor out common code
                    var rot = state.shape.getShapeRotation();

                    if (this.legacyControlPosition) {
                        rot = mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0);
                    }
                    else {
                        if (state.shape.isPaintBoundsInverted()) {
                            var t = (state.width - state.height) / 2;
                            cx += t;
                            cy -= t;
                        }
                    }

                    if (rot != 0) {
                        var rad = mxUtils.toRadians(rot);
                        var cos = Math.cos(rad);
                        var sin = Math.sin(rad);

                        var point = Point.getRotatedPoint(new mxPoint(cx, cy), cos, sin,
                            new mxPoint(state.getCenterX(), state.getCenterY()));
                        cx = point.x;
                        cy = point.y;
                    }
                }
            }

            return (state.view.graph.getModel().isEdge(state.cell)) ?
                new mxRectangle(Math.round(cx - w / 2 * s), Math.round(cy - h / 2 * s), Math.round(w * s), Math.round(h * s))
                : new mxRectangle(Math.round(cx - w / 2 * s), Math.round(cy - h / 2 * s), Math.round(w * s), Math.round(h * s));
        }

        return null;
    },

    insertStateAfter: function (state, node, htmlNode) {
        var shapes = this.getShapesForState(state);

        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i] != null) {
                var html = shapes[i].node.parentNode != state.view.getDrawPane();
                var temp = (html) ? htmlNode : node;

                if (temp != null && temp.nextSibling != shapes[i].node) {
                    if (temp.nextSibling == null) {
                        temp.parentNode.appendChild(shapes[i].node);
                    }
                    else {
                        temp.parentNode.insertBefore(shapes[i].node, temp.nextSibling);
                    }
                }
                else if (temp == null) {
                    // Special case: First HTML node should be first sibling after canvas
                    if (shapes[i].node.parentNode == state.view.graph.container) {
                        var canvas = state.view.canvas;

                        while (canvas != null && canvas.parentNode != state.view.graph.container) {
                            canvas = canvas.parentNode;
                        }

                        if (canvas != null && canvas.nextSibling != null && canvas.nextSibling != shapes[i].node) {
                            shapes[i].node.parentNode.insertBefore(shapes[i].node, canvas.nextSibling);
                        }
                        else {
                            shapes[i].node.parentNode.appendChild(shapes[i].node);
                        }
                    }
                    else if (shapes[i].node.parentNode.firstChild != null && shapes[i].node.parentNode.firstChild != shapes[i].node) {
                        // Inserts the node as the first child of the parent to implement the order
                        shapes[i].node.parentNode.insertBefore(shapes[i].node, shapes[i].node.parentNode.firstChild);
                    }
                }

                if (html) {
                    htmlNode = shapes[i].node;
                }
                else {
                    node = shapes[i].node;
                }
            }
        }

        return [node, htmlNode];
    },

    getShapesForState: function (state) {
        return [state.shape, state.text];
    },

    redraw: function (state, force, rendering) {
        var shapeChanged = this.redrawShape(state, force, rendering);

        if (state.shape != null && (rendering == null || rendering)) {
            this.redrawLabel(state, shapeChanged);
            this.redrawCellOverlays(state, shapeChanged);
            this.redrawControl(state, shapeChanged);
        }
    },

    redrawShape: function (state, force, rendering) {
        var shapeChanged = false;

        if (state.shape) {
            // Lazy initialization
            if (!state.shape.node) {
                this.createIndicatorShape(state);
                // 应用 state 中的样式，创建 shape 的根节点，并加入到 drawPane 中
                this.initializeShape(state);
                this.createCellOverlays(state);
                // DOM 事件
                this.installListeners(state);
            }

            // Handles changes of the collapse icon
            this.createControl(state);

            // 检查样式是否有更新
            //if (!mxUtils.equalEntries(state.shape.style, state.style)) {
            //    this.configureShape(state);
            //    force = true;
            //}

            // Redraws the cell if required, ignores changes to bounds if points are
            // defined as the bounds are updated for the given points inside the shape
            if (force || !state.shape.bounds || state.shape.scale != state.view.scale ||
                (state.absolutePoints == null && !state.shape.bounds.equals(state)) ||
                (state.absolutePoints != null && !Point.equalPoints(state.shape.points, state.absolutePoints))) {
                if (state.absolutePoints) {
                    state.shape.points = state.absolutePoints.slice();
                    state.shape.bounds = null;
                } else {
                    state.shape.points = null;
                    state.shape.bounds = new Rectangle(state.x, state.y, state.width, state.height);
                }

                state.shape.scale = state.view.scale;

                if (isNullOrUndefined(rendering) || rendering) {
                    state.shape.redraw();
                } else {
                    state.shape.updateBoundingBox();
                }

                shapeChanged = true;
            }
        }

        return shapeChanged;
    },

    destroy: function (state) {
        if (state.shape != null) {
            if (state.text != null) {
                state.text.destroy();
                state.text = null;
            }

            if (state.overlays != null) {
                state.overlays.visit(function (id, shape) {
                    shape.destroy();
                });

                state.overlays = null;
            }

            if (state.control != null) {
                state.control.destroy();
                state.control = null;
            }

            state.shape.destroy();
            state.shape = null;
        }
    }
});


var registerShape = CellRenderer.registerShape;

registerShape(constants.SHAPE_RECTANGLE, RectangleShape);
//registerShape(constants.SHAPE_ELLIPSE, mxEllipse);
//registerShape(constants.SHAPE_RHOMBUS, mxRhombus);
//registerShape(constants.SHAPE_CYLINDER, mxCylinder);
//registerShape(constants.SHAPE_CONNECTOR, mxConnector);
//registerShape(constants.SHAPE_ACTOR, mxActor);
//registerShape(constants.SHAPE_TRIANGLE, mxTriangle);
//registerShape(constants.SHAPE_HEXAGON, mxHexagon);
//registerShape(constants.SHAPE_CLOUD, mxCloud);
//registerShape(constants.SHAPE_LINE, mxLine);
//registerShape(constants.SHAPE_ARROW, mxArrow);
//registerShape(constants.SHAPE_DOUBLE_ELLIPSE, mxDoubleEllipse);
//registerShape(constants.SHAPE_SWIMLANE, mxSwimlane);
//registerShape(constants.SHAPE_IMAGE, mxImageShape);
//registerShape(constants.SHAPE_LABEL, mxLabel);


module.exports = CellRenderer;


},{"./Point":10,"./Rectangle":11,"./common/Dictionary":22,"./common/class":23,"./common/detector":24,"./common/utils":26,"./constants":27,"./events/MouseEvent":32,"./events/domEvent":33,"./events/eventNames":34,"./shapes/Connector":42,"./shapes/RectangleShape":45,"./shapes/Shape":46,"./shapes/Text":47}],5:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Point = require('./Point');
var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    view: null,
    cell: null,
    style: null,    // cellStyle
    shape: null,    // 图形
    text: null,     // 文本
    invalid: true,  // 默认为无效，需要重绘
    origin: null,
    absolutePoints: null, // 连线的关键点
    absoluteOffset: null, // 对于连线，表示连线上 label 的绝对位置
                          // 对于节点，表示节点中 label 相对于节点左上角的位置

    segments: null,       // 连线每个片段的长度
    //length: 0, // FIXME: length 导致 isArrayLike 判断出错，用下面的 edgeLength 代替
    edgeLength: 0,        // 连线的长度
    terminalDistance: 0,  // 连线起点和终点之间的直线距离
    visibleSourceState: null,
    visibleTargetState: null,

    // 构造函数
    constructor: function CellState(view, cell, style) {

        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    getPerimeterBounds: function (border, bounds) {

        var that = this;
        var shape = that.shape;

        border = border || 0;
        bounds = bounds ? bounds : new Rectangle(that.x, that.y, that.width, that.height);


        if (shape && shape.stencil) {
            var aspect = shape.stencil.computeAspect(that.style, bounds.x, bounds.y, bounds.width, bounds.height);

            bounds.x = aspect.x;
            bounds.y = aspect.y;
            bounds.width = shape.stencil.w0 * aspect.width;
            bounds.height = shape.stencil.h0 * aspect.height;
        }

        border && bounds.grow(border);

        return bounds;
    },

    // 设置连线起点或终点的位置
    setAbsoluteTerminalPoint: function (point, isSource) {

        var that = this;
        var points = that.absolutePoints;

        if (!points) {
            points = that.absolutePoints = [];
        }

        var length = points.length;

        if (isSource) {
            length
                ? points[0] = point
                : points.push(point);
        } else {
            if (length === 0) {
                points.push(null);
                points.push(point);
            } else if (length === 1) {
                points.push(point);
            } else {
                points[length - 1] = point;
            }
        }

        return that;
    },

    setCursor: function (cursor) {

        var that = this;
        var shape = that.shape;
        var text = that.text;

        shape && shape.setCursor(cursor);
        text && text.setCursor(cursor);

        return that;
    },

    getVisibleTerminal: function (isSource) {
        var state = this.getVisibleTerminalState(isSource);

        return state ? state.cell : null;
    },

    getVisibleTerminalState: function (isSource) {
        return isSource ? this.visibleSourceState : this.visibleTargetState;
    },

    setVisibleTerminalState: function (terminalState, isSource) {
        if (isSource) {
            this.visibleSourceState = terminalState;
        } else {
            this.visibleTargetState = terminalState;
        }
    },

    getCellBounds: function () {
        return this.cellBounds;
    },

    getPaintBounds: function () {
        return this.paintBounds;
    },

    updateCachedBounds: function () {

        var that = this;
        var view = that.view;
        var shape = that.shape;
        var ts = view.translate;
        var scale = view.scale;

        // 计算 translate 和 scale 之前的 bound
        that.cellBounds = new Rectangle(that.x / scale - ts.x, that.y / scale - ts.y, that.width / scale, that.height / scale);
        that.paintBounds = Rectangle.fromRectangle(that.cellBounds);

        if (shape && shape.isPaintBoundsInverted()) {
            that.paintBounds.rotate90();
        }
    },

    clone: function () {

    },

    destroy: function () {
        this.view.graph.cellRenderer.destroy(this);
    }
});


},{"./Point":10,"./Rectangle":11}],6:[function(require,module,exports){
function ConnectionConstraint(point, perimeter) {
    this.point = point;
    this.perimeter = (perimeter != null) ? perimeter : true;
}

module.exports = ConnectionConstraint;

},{}],7:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    TRANSLATE_CONTROL_POINTS: true,
    alternateBounds: null,
    sourcePoint: null,
    targetPoint: null,
    points: null,
    offset: null,
    relative: false,

    constructor: function Geometry(x, y, width, height) {
        Geometry.superclass.constructor.call(this, x, y, width, height);
    },

    swap: function () {

        var that = this;
        var alternateBounds = that.alternateBounds;

        if (alternateBounds) {
            var old = new Rectangle(that.x, that.y, that.width, that.height);

            that.x = alternateBounds.x;
            that.y = alternateBounds.y;
            that.width = alternateBounds.width;
            that.height = alternateBounds.height;

            that.alternateBounds = old;
        }

        return that;
    },

    getTerminalPoint: function (isSource) {
        return isSource ? this.sourcePoint : this.targetPoint;
    },

    setTerminalPoint: function (point, isSource) {
        var that = this;
        if (isSource) {
            that.sourcePoint = point;
        } else {
            that.targetPoint = point;
        }

        return point;
    },

    rotate: function (angle, cx) {

        var that = this;

        var rad = utils.toRadians(angle);
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);

        // Rotates the geometry
        if (!this.relative) {
            var ct = new Point(this.getCenterX(), this.getCenterY());
            var pt = Point.getRotatedPoint(ct, cos, sin, cx);

            this.x = Math.round(pt.x - this.width / 2);
            this.y = Math.round(pt.y - this.height / 2);
        }

        // Rotates the source point
        if (this.sourcePoint) {
            var pt = Point.getRotatedPoint(this.sourcePoint, cos, sin, cx);
            this.sourcePoint.x = Math.round(pt.x);
            this.sourcePoint.y = Math.round(pt.y);
        }

        // Translates the target point
        if (this.targetPoint) {
            var pt = Point.getRotatedPoint(this.targetPoint, cos, sin, cx);
            this.targetPoint.x = Math.round(pt.x);
            this.targetPoint.y = Math.round(pt.y);
        }

        // Translate the control points
        if (this.points != null) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    var pt = Point.getRotatedPoint(this.points[i], cos, sin, cx);
                    this.points[i].x = Math.round(pt.x);
                    this.points[i].y = Math.round(pt.y);
                }
            }
        }
    },
    translate: function (dx, dy) {
        dx = parseFloat(dx);
        dy = parseFloat(dy);

        // Translates the geometry
        if (!this.relative) {
            this.x = parseFloat(this.x) + dx;
            this.y = parseFloat(this.y) + dy;
        }

        // Translates the source point
        if (this.sourcePoint != null) {
            this.sourcePoint.x = parseFloat(this.sourcePoint.x) + dx;
            this.sourcePoint.y = parseFloat(this.sourcePoint.y) + dy;
        }

        // Translates the target point
        if (this.targetPoint != null) {
            this.targetPoint.x = parseFloat(this.targetPoint.x) + dx;
            this.targetPoint.y = parseFloat(this.targetPoint.y) + dy;
        }

        // Translate the control points
        if (this.TRANSLATE_CONTROL_POINTS && this.points != null) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    this.points[i].x = parseFloat(this.points[i].x) + dx;
                    this.points[i].y = parseFloat(this.points[i].y) + dy;
                }
            }
        }
    },
    scale: function (sx, sy, fixedAspect) {
        sx = parseFloat(sx);
        sy = parseFloat(sy);

        // Translates the source point
        if (this.sourcePoint != null) {
            this.sourcePoint.x = parseFloat(this.sourcePoint.x) * sx;
            this.sourcePoint.y = parseFloat(this.sourcePoint.y) * sy;
        }

        // Translates the target point
        if (this.targetPoint != null) {
            this.targetPoint.x = parseFloat(this.targetPoint.x) * sx;
            this.targetPoint.y = parseFloat(this.targetPoint.y) * sy;
        }

        // Translate the control points
        if (this.points != null) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] != null) {
                    this.points[i].x = parseFloat(this.points[i].x) * sx;
                    this.points[i].y = parseFloat(this.points[i].y) * sy;
                }
            }
        }

        // Translates the geometry
        if (!this.relative) {
            this.x = parseFloat(this.x) * sx;
            this.y = parseFloat(this.y) * sy;

            if (fixedAspect) {
                sy = sx = Math.min(sx, sy);
            }

            this.width = parseFloat(this.width) * sx;
            this.height = parseFloat(this.height) * sy;
        }
    },

    equals: function (/*obj*/) {

    }
});

},{"./Rectangle":11}],8:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Cell = require('./Cell');
var CellRenderer = require('./CellRenderer');
var ChildChange = require('./changes/ChildChange');
var Class = require('./common/class');
var ConnectionConstraint = require('./ConnectionConstraint');
var ConnectionHandler = require('./handler/ConnectionHandler');
var Event = require('./events/Event');
var EventObject = require('./events/EventObject');
var Geometry = require('./Geometry');
var GeometryChange = require('./changes/GeometryChange');
var Model = require('./Model');
var Point = require('./Point');
var Rectangle = require('./Rectangle');
var RootChange = require('./changes/RootChange');
var Stylesheet = require('./Stylesheet');
var TerminalChange = require('./changes/TerminalChange');
var View = require('./View');
var constants = require('./constants');
var edgeStyle = require('./edgeStyle');
var eventNames = require('./events/eventNames');
var utils = require('./common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;
var getValue = utils.getValue;

module.exports = Class.create({
    Implements: Event,

    EMPTY_ARRAY: [],
    mouseListeners: null,
    isMouseDown: false,
    model: null,
    view: null,
    stylesheet: null,
    selectionModel: null,
    cellEditor: null,
    cellRenderer: null,
    multiplicities: null,

    gridSize: 10,
    gridEnabled: true,
    portsEnabled: true,
    nativeDblClickEnabled: true,
    doubleTapEnabled: true,
    doubleTapTimeout: 500,
    doubleTapTolerance: 25,
    lastTouchX: 0,
    lastTouchY: 0,
    lastTouchTime: 0,
    tapAndHoldEnabled: true,
    tapAndHoldDelay: 500,
    tapAndHoldInProgress: false,
    tapAndHoldValid: false,
    initialTouchX: 0,
    initialTouchY: 0,
    tolerance: 0,
    defaultOverlap: 0.5,
    defaultParent: null,
    alternateEdgeStyle: null,
    backgroundImage: null,
    pageVisible: false,
    pageBreaksVisible: false,
    pageBreakColor: 'gray',
    pageBreakDashed: true,
    minPageBreakDist: 20,
    preferPageSize: false,
    pageFormat: null,// constants.PAGE_FORMAT_A4_PORTRAIT;
    pageScale: 1.5,
    enabled: true,

    escapeEnabled: true,
    invokesStopCellEditing: true,
    enterStopsCellEditing: false,
    useScrollbarsForPanning: true,
    exportEnabled: true,
    importEnabled: true,
    cellsLocked: false,
    cellsCloneable: true,
    foldingEnabled: true,
    cellsEditable: true,
    cellsDeletable: true,
    cellsMovable: true,
    edgeLabelsMovable: true,
    vertexLabelsMovable: false,
    dropEnabled: false,
    splitEnabled: true,
    cellsResizable: true,
    cellsBendable: true,
    cellsSelectable: true,
    cellsDisconnectable: true,
    autoSizeCells: false,
    autoSizeCellsOnAdd: false,
    autoScroll: true,
    timerAutoScroll: false,
    allowAutoPanning: false,
    ignoreScrollbars: false,
    autoExtend: true,
    maximumGraphBounds: null,
    minimumGraphSize: null,
    minimumContainerSize: null,
    maximumContainerSize: null,
    resizeContainer: false,
    border: 0,
    keepEdgesInForeground: false,
    keepEdgesInBackground: false,
    allowNegativeCoordinates: true,
    constrainChildren: true,
    constrainChildrenOnResize: false,
    extendParents: true,
    extendParentsOnAdd: true,
    extendParentsOnMove: false,
    recursiveResize: false,
    collapseToPreferredSize: true,
    zoomFactor: 1.2,
    keepSelectionVisibleOnZoom: false,
    centerZoom: true,
    resetViewOnRootChange: true,
    resetEdgesOnResize: false,
    resetEdgesOnMove: false,
    resetEdgesOnConnect: true,
    allowLoops: false,
    //defaultLoopStyle: mxEdgeStyle.Loop, // TODO
    multigraph: true,
    connectableEdges: false,
    allowDanglingEdges: true,
    cloneInvalidEdges: false,
    disconnectOnMove: true,
    labelsVisible: true,
    htmlLabels: false,
    swimlaneSelectionEnabled: true,
    swimlaneNesting: true,
    swimlaneIndicatorColorAttribute: constants.STYLE_FILLCOLOR,
    imageBundles: null,
    minFitScale: 0.1,
    maxFitScale: 8,
    panDx: 0,
    panDy: 0,

    collapsedImage: null,
    expandedImage: null,
    warningImage: null,
    alreadyConnectedResource: null,
    containsValidationErrorsResource: null,
    collapseExpandResource: null,

    constructor: function Graph(container, model, stylesheet) {

        var that = this;

        that.mouseListeners = null;
        that.model = model ? model : new Model();
        that.multiplicities = [];
        that.imageBundles = [];
        that.cellRenderer = that.createCellRenderer();
        that.setSelectionModel(that.createSelectionModel());
        that.setStylesheet(stylesheet ? stylesheet : that.createStylesheet());
        that.view = that.createView();

        that.model.on('change', function (evt) {
            that.graphModelChanged(evt.getData('edit').changes);
        });

        that.createHandlers(); // create handlers

        if (container) {
            that.init(container);
        }

        that.view.revalidate();
    },

    init: function (container) {

        var that = this;

        that.container = container;

        // Initializes the in-place editor
        this.cellEditor = this.createCellEditor();

        // Initializes the container using the view
        that.view.init();

        // Updates the size of the container for the current graph
        that.sizeDidChange();

        // Hides tooltips and resets tooltip timer if mouse leaves container
        //mxEvent.addListener(container, 'mouseleave', utils.bind(this, function () {
        //    if (this.tooltipHandler != null) {
        //        this.tooltipHandler.hide();
        //    }
        //}));
    },


    createHandlers: function () {
        var that = this;
        that.connectionHandler = that.createConnectionHandler();
        that.connectionHandler.setEnabled(false);
    },

    createConnectionHandler: function () {
        return new ConnectionHandler(this);
    },

    createSelectionModel: function () {},
    createStylesheet: function () {
        return new Stylesheet();
    },
    createView: function () {
        return new View(this);
    },
    createCellRenderer: function () {
        return new CellRenderer();
    },
    createCellEditor: function () {},
    getModel: function () {
        return this.model;
    },
    getView: function () {
        return this.view;
    },

    getStylesheet: function () {
        return this.stylesheet;
    },
    setStylesheet: function (stylesheet) {
        this.stylesheet = stylesheet;
    },
    getSelectionModel: function () {
        return this.selectionModel;
    },
    setSelectionModel: function (selectionModel) {
        this.selectionModel = selectionModel;
    },
    getSelectionCellsForChanges: function () {},
    graphModelChanged: function (changes) {
        console.log(changes);
        for (var i = 0; i < changes.length; i++) {
            this.processChange(changes[i]);
        }

        this.removeSelectionCells(this.getRemovedCellsForChanges(changes));

        this.view.validate();
        this.sizeDidChange();
    },
    processChange: function (change) {
        if (change instanceof RootChange) {

        } else if (change instanceof ChildChange) {
            var newParent = this.model.getParent(change.child);
            this.view.invalidate(change.child, true, true);

            if (!newParent || this.isCellCollapsed(newParent)) {
                this.view.invalidate(change.child, true, true);
                this.removeStateForCell(change.child);

                // Handles special case of current root of view being removed
                if (this.view.currentRoot === change.child) {
                    this.home();
                }
            }

            if (newParent !== change.previous) {
                // Refreshes the collapse/expand icons on the parents
                if (newParent) {
                    this.view.invalidate(newParent, false, false);
                }

                if (change.previous != null) {
                    this.view.invalidate(change.previous, false, false);
                }
            }
        } else if (change instanceof TerminalChange || change instanceof GeometryChange) {
            if (change instanceof TerminalChange || ((change.previous == null && change.geometry != null) ||
                (change.previous != null && !change.previous.equals(change.geometry)))) {
                this.view.invalidate(change.cell);
            }
        }

    },
    getRemovedCellsForChanges: function () {},
    removeStateForCell: function (cell) {
        var childCount = this.model.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            this.removeStateForCell(this.model.getChildAt(cell, i));
        }

        this.view.invalidate(cell, false, true);
        this.view.removeState(cell);
    },


    // Overlays
    // ---------
    addCellOverlay: function (cell, overlay) {},
    getCellOverlays: function (cell) {
        return cell.overlays;
    },
    removeCellOverlay: function (cell, overlay) {},
    removeCellOverlays: function (cell) {},
    clearCellOverlays: function (cell) {},
    setCellWarning: function () {},


    // In-place editing
    // ----------------
    startEditing: function (evt) {},
    startEditingAtCell: function (cell, evt) {},
    getEditingValue: function (cell, evt) {},
    stopEditing: function (cancel) {},
    labelChanged: function (cell, value, evt) {},
    cellLabelChanged: function (cell, value, autoSize) {},


    // Event processing
    // ----------------
    escape: function (evt) {},
    click: function (me) {},
    dblClick: function (evt, cell) {},
    tapAndHold: function (me) {},

    scrollPointToVisible: function (x, y, extend, border) {},
    createPanningManager: function () {},
    getBorderSizes: function () {},
    getPreferredPageSize: function (bounds, width, height) {},
    sizeDidChange: function () {
        var bounds = this.getGraphBounds();

        if (this.container) {
            var border = this.getBorder();

            var width = Math.max(0, bounds.x + bounds.width + 1 + border);
            var height = Math.max(0, bounds.y + bounds.height + 1 + border);

            if (this.minimumContainerSize) {
                width = Math.max(width, this.minimumContainerSize.width);
                height = Math.max(height, this.minimumContainerSize.height);
            }

            if (this.resizeContainer) {
                this.doResizeContainer(width, height);
            }

            //if (this.preferPageSize || (!mxClient.IS_IE && this.pageVisible)) {
            if (this.preferPageSize || this.pageVisible) {
                var size = this.getPreferredPageSize(bounds, width, height);

                if (size != null) {
                    width = size.width;
                    height = size.height;
                }
            }

            if (this.minimumGraphSize != null) {
                width = Math.max(width, this.minimumGraphSize.width * this.view.scale);
                height = Math.max(height, this.minimumGraphSize.height * this.view.scale);
            }

            width = Math.ceil(width - 1);
            height = Math.ceil(height - 1);

            //if (this.dialect == mxConstants.DIALECT_SVG) {
            var root = this.view.getDrawPane().ownerSVGElement;

            root.style.minWidth = Math.max(1, width) + 'px';
            root.style.minHeight = Math.max(1, height) + 'px';
            root.style.width = '100%';
            root.style.height = '100%';
            //}
            //else {
            //    if (mxClient.IS_QUIRKS) {
            // Quirks mode has no minWidth/minHeight support
            //this.view.updateHtmlCanvasSize(Math.max(1, width), Math.max(1, height));
            //}
            //else {
            //    this.view.canvas.style.minWidth = Math.max(1, width) + 'px';
            //    this.view.canvas.style.minHeight = Math.max(1, height) + 'px';
            //}
            //}

            return;

            this.updatePageBreaks(this.pageBreaksVisible, width - 1, height - 1);
        }

        //this.fireEvent(new mxEventObject(mxEvent.SIZE, 'bounds', bounds));
    },
    doResizeContainer: function (width, height) {
        // Fixes container size for different box models
        //if (mxClient.IS_IE) {
        //    if (mxClient.IS_QUIRKS) {
        //        var borders = this.getBorderSizes();
        //
        //        // max(2, ...) required for native IE8 in quirks mode
        //        width += Math.max(2, borders.x + borders.width + 1);
        //        height += Math.max(2, borders.y + borders.height + 1);
        //    }
        //    else if (document.documentMode >= 9) {
        //        width += 3;
        //        height += 5;
        //    }
        //    else {
        //        width += 1;
        //        height += 1;
        //    }
        //}
        //else {
        height += 1;
        //}

        if (this.maximumContainerSize != null) {
            width = Math.min(this.maximumContainerSize.width, width);
            height = Math.min(this.maximumContainerSize.height, height);
        }

        this.container.style.width = Math.ceil(width) + 'px';
        this.container.style.height = Math.ceil(height) + 'px';
    },
    updatePageBreaks: function (visible, width, height) {
        var scale = this.view.scale;
        var tr = this.view.translate;
        var fmt = this.pageFormat;
        var ps = scale * this.pageScale;
        var bounds = new Rectangle(scale * tr.x, scale * tr.y, fmt.width * ps, fmt.height * ps);

        // Does not show page breaks if the scale is too small
        visible = visible && Math.min(bounds.width, bounds.height) > this.minPageBreakDist;

        // Draws page breaks independent of translate. To ignore
        // the translate set bounds.x/y = 0. Note that modulo
        // in JavaScript has a bug, so use utils instead.
        bounds.x = utils.mod(bounds.x, bounds.width);
        bounds.y = utils.mod(bounds.y, bounds.height);

        var horizontalCount = (visible) ? Math.ceil((width - bounds.x) / bounds.width) : 0;
        var verticalCount = (visible) ? Math.ceil((height - bounds.y) / bounds.height) : 0;
        var right = width;
        var bottom = height;

        if (this.horizontalPageBreaks == null && horizontalCount > 0) {
            this.horizontalPageBreaks = [];
        }

        if (this.horizontalPageBreaks != null) {
            for (var i = 0; i <= horizontalCount; i++) {
                var pts = [new mxPoint(bounds.x + i * bounds.width, 1),
                    new mxPoint(bounds.x + i * bounds.width, bottom)];

                if (this.horizontalPageBreaks[i] != null) {
                    this.horizontalPageBreaks[i].points = pts;
                    this.horizontalPageBreaks[i].redraw();
                }
                else {
                    var pageBreak = new mxPolyline(pts, this.pageBreakColor);
                    pageBreak.dialect = this.dialect;
                    pageBreak.pointerEvents = false;
                    pageBreak.isDashed = this.pageBreakDashed;
                    pageBreak.init(this.view.backgroundPane);
                    pageBreak.redraw();

                    this.horizontalPageBreaks[i] = pageBreak;
                }
            }

            for (var i = horizontalCount; i < this.horizontalPageBreaks.length; i++) {
                this.horizontalPageBreaks[i].destroy();
            }

            this.horizontalPageBreaks.splice(horizontalCount, this.horizontalPageBreaks.length - horizontalCount);
        }

        if (this.verticalPageBreaks == null && verticalCount > 0) {
            this.verticalPageBreaks = [];
        }

        if (this.verticalPageBreaks != null) {
            for (var i = 0; i <= verticalCount; i++) {
                var pts = [new Point(1, bounds.y + i * bounds.height),
                    new Point(right, bounds.y + i * bounds.height)];

                if (this.verticalPageBreaks[i] != null) {
                    this.verticalPageBreaks[i].points = pts;
                    this.verticalPageBreaks[i].redraw();
                }
                else {
                    var pageBreak = new mxPolyline(pts, this.pageBreakColor);
                    pageBreak.dialect = this.dialect;
                    pageBreak.pointerEvents = false;
                    pageBreak.isDashed = this.pageBreakDashed;
                    pageBreak.init(this.view.backgroundPane);
                    pageBreak.redraw();

                    this.verticalPageBreaks[i] = pageBreak;
                }
            }

            for (var i = verticalCount; i < this.verticalPageBreaks.length; i++) {
                this.verticalPageBreaks[i].destroy();
            }

            this.verticalPageBreaks.splice(verticalCount, this.verticalPageBreaks.length - verticalCount);
        }
    },


    // Cell styles
    // -----------
    getCellStyle: function (cell) {
        var stylename = this.model.getStyle(cell);
        var style = null;

        // Gets the default style for the cell
        if (this.model.isEdge(cell)) {
            style = this.stylesheet.getDefaultEdgeStyle();
        }
        else {
            style = this.stylesheet.getDefaultVertexStyle();
        }

        // Resolves the stylename using the above as the default
        if (stylename != null) {
            style = this.postProcessCellStyle(this.stylesheet.getCellStyle(stylename, style));
        }

        // Returns a non-null value if no style can be found
        if (style == null) {
            style = [];//mxGraph.prototype.EMPTY_ARRAY;
        }

        return style;
    },
    postProcessCellStyle: function (style) {
        if (style != null) {
            var key = style[constants.STYLE_IMAGE];
            var image = this.getImageFromBundles(key);

            if (image != null) {
                style[constants.STYLE_IMAGE] = image;
            }
            else {
                image = key;
            }

            // Converts short data uris to normal data uris
            if (image != null && image.substring(0, 11) == 'data:image/') {
                if (image.substring(0, 20) == 'data:image/svg+xml,<') {
                    // Required for FF and IE11
                    image = image.substring(0, 19) + encodeURIComponent(image.substring(19));
                }
                else if (image.substring(0, 22) != 'data:image/svg+xml,%3C') {
                    var comma = image.indexOf(',');

                    if (comma > 0) {
                        image = image.substring(0, comma) + ';base64,'
                            + image.substring(comma + 1);
                    }
                }

                style[constants.STYLE_IMAGE] = image;
            }
        }
        return style;
    },
    setCellStyle: function (style, cells) {
        cells = cells || this.getSelectionCells();

        if (cells) {
            this.model.beginUpdate();
            try {
                for (var i = 0; i < cells.length; i++) {
                    this.model.setStyle(cells[i], style);
                }
            }
            finally {
                this.model.endUpdate();
            }
        }
    },
    setCellStyles: function (key, value, cells) {
        cells = cells || this.getSelectionCells();
        utils.setCellStyles(this.model, cells, key, value);
    },
    toggleCellStyle: function (key, defaultValue, cell) {},
    toggleCellStyles: function (key, defaultValue, cells) {},
    toggleCellStyleFlags: function (key, flag, cells) {},
    setCellStyleFlags: function (key, flag, value, cells) {},


    // Cell alignment and orientation
    // ------------------------------
    alignCells: function (align, cells, param) {},
    flipEdge: function (edge) {},
    addImageBundle: function (bundle) {},
    removeImageBundle: function (bundle) {},
    getImageFromBundles: function (key) {},


    // Order
    // -----
    orderCells: function (back, cells) {},
    cellsOrdered: function (cells, back) {},


    // Grouping
    // --------
    groupCells: function (group, border, cells) {},
    getCellsForGroup: function (cells) {},
    getBoundsForGroup: function (group, children, border) {},
    createGroupCell: function (cells) {},
    ungroupCells: function (cells) {},
    removeCellsFromParent: function (cells) {},
    updateGroupBounds: function (cells, border, moveGroup, topBorder, rightBorder, bottomBorder, leftBorder) {},


    // Cell cloning, insertion and removal
    // -----------------------------------
    cloneCells: function (cells, allowInvalidEdges) {},
    insertVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var graph = this;
        var vertex = graph.createVertex(parent, id, value, x, y, width, height, style, relative);
        return graph.addCell(vertex, parent);
    },
    createVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height);
        geometry.relative = !isNullOrUndefined(relative) ? relative : false;

        // Creates the vertex
        var vertex = new Cell(value, geometry, style);
        vertex.setId(id);
        vertex.setVertex(true);
        vertex.setConnectable(true);

        return vertex;
    },
    insertEdge: function (parent, id, value, source, target, style) {
        var edge = this.createEdge(parent, id, value, source, target, style);

        return this.addEdge(edge, parent, source, target);
    },
    createEdge: function (parent, id, value, source, target, style) {
        var geometry = new Geometry();
        geometry.relative = true;

        var edge = new Cell(value, geometry, style);
        edge.setId(id);
        edge.setEdge(true);

        return edge;
    },
    addEdge: function (edge, parent, source, target, index) {
        return this.addCell(edge, parent, index, source, target);
    },
    addCell: function (cell, parent, index, source, target) {
        return this.addCells([cell], parent, index, source, target)[0];
    },
    addCells: function (cells, parent, index, source, target) {
        parent = parent || this.getDefaultParent();
        index = !isNullOrUndefined(index) ? index : this.model.getChildCount(parent);

        this.model.beginUpdate();
        try {
            this.cellsAdded(cells, parent, index, source, target, false, true);

            //this.fireEvent(new mxEventObject(mxEvent.ADD_CELLS, 'cells', cells,
            //    'parent', parent, 'index', index, 'source', source, 'target', target));

            this.emit(new EventObject('addCells', {
                cells: cells,
                parent: parent,
                index: index,
                source: source,
                target: target
            }));
        }
        finally {
            this.model.endUpdate();
        }

        return cells;
    },
    cellsAdded: function (cells, parent, index, source, target, absolute, constrain) {
        if (cells && parent && !isNullOrUndefined(index)) {
            this.model.beginUpdate();
            try {
                var parentState = absolute ? this.view.getState(parent) : null;
                var o1 = parentState ? parentState.origin : null;
                var zero = new Point(0, 0);

                for (var i = 0; i < cells.length; i++) {
                    if (!cells[i]) {
                        index--;
                    } else {
                        var previous = this.model.getParent(cells[i]);

                        // Keeps the cell at its absolute location
                        if (o1 && cells[i] !== parent && parent !== previous) {
                            var oldState = this.view.getState(previous);
                            var o2 = oldState ? oldState.origin : zero;
                            var geo = this.model.getGeometry(cells[i]);

                            if (geo) {
                                var dx = o2.x - o1.x;
                                var dy = o2.y - o1.y;

                                // FIXME: Cells should always be inserted first before any other edit
                                // to avoid forward references in sessions.
                                geo = geo.clone();
                                geo.translate(dx, dy);

                                if (!geo.relative && this.model.isVertex(cells[i]) && !this.isAllowNegativeCoordinates()) {
                                    geo.x = Math.max(0, geo.x);
                                    geo.y = Math.max(0, geo.y);
                                }

                                this.model.setGeometry(cells[i], geo);
                            }
                        }

                        // Decrements all following indices
                        // if cell is already in parent
                        if (parent === previous && index + i > this.model.getChildCount(parent)) {
                            index--;
                        }

                        this.model.add(parent, cells[i], index + i);

                        if (this.autoSizeCellsOnAdd) {
                            this.autoSizeCell(cells[i], true);
                        }

                        // Extends the parent or constrains the child
                        if (this.isExtendParentsOnAdd() && this.isExtendParent(cells[i])) {
                            this.extendParent(cells[i]);
                        }

                        // Additionally constrains the child after extending the parent
                        if (constrain == null || constrain) {
                            this.constrainChild(cells[i]);
                        }

                        // Sets the source terminal
                        if (source != null) {
                            this.cellConnected(cells[i], source, true);
                        }

                        // Sets the target terminal
                        if (target != null) {
                            this.cellConnected(cells[i], target, false);
                        }
                    }
                }

                //this.fireEvent(new mxEventObject(mxEvent.CELLS_ADDED, 'cells', cells,
                //    'parent', parent, 'index', index, 'source', source, 'target', target,
                //    'absolute', absolute));

                this.emit(new EventObject('cellsAdded', {
                    cells: cells,
                    parent: parent,
                    index: index,
                    source: source,
                    target: target,
                    absolute: absolute
                }));
            }
            finally {
                this.model.endUpdate();
            }
        }
    },
    autoSizeCell: function (cell, recurse) {},
    removeCells: function (cells, includeEdges) {},
    cellsRemoved: function (cells) {},
    splitEdge: function (edge, cells, newEdge, dx, dy) {},


    // Cell visibility
    // ---------------
    toggleCells: function (show, cells, includeEdges) {},
    cellsToggled: function (cells, show) {},


    // Folding
    // -------
    foldCells: function () {},
    cellsFolded: function () {},
    swapBounds: function () {},
    updateAlternateBounds: function () {},
    addAllEdges: function () {},
    getAllEdges: function () {},


    // Cell sizing
    // -----------
    updateCellSize: function () {},
    cellSizeUpdated: function () {},
    getPreferredSizeForCell: function () {},
    resizeCell: function () {},
    resizeCells: function () {},
    cellsResized: function () {},
    cellResized: function () {},
    resizeChildCells: function () {},
    constrainChildCells: function () {},
    scaleCell: function () {},
    extendParent: function () {},


    // Cell moving
    // -----------
    importCells: function () {},
    moveCells: function () {},
    cellsMoved: function () {},
    translateCell: function () {},
    getCellContainmentArea: function () {},
    getMaximumGraphBounds: function () {},
    constrainChild: function () {},
    resetEdges: function () {},
    resetEdge: function (edge) {
        var geo = this.model.getGeometry(edge);

        // Resets the control points
        if (geo != null && geo.points != null && geo.points.length > 0) {
            geo = geo.clone();
            geo.points = [];
            this.model.setGeometry(edge, geo);
        }

        return edge;
    },


    // Cell connecting and connection constraints
    // ------------------------------------------
    getOutlineConstraint: function () {},
    getAllConnectionConstraints: function () {},

    getConnectionConstraint: function (linkState, terminalState, isSource) {
        var point = null;
        var x = linkState.style[(isSource) ? constants.STYLE_EXIT_X : constants.STYLE_ENTRY_X];

        if (x != null) {
            var y = linkState.style[(isSource) ? constants.STYLE_EXIT_Y : constants.STYLE_ENTRY_Y];

            if (y != null) {
                point = new Point(parseFloat(x), parseFloat(y));
            }
        }

        var perimeter = false;

        if (point != null) {
            perimeter = getValue(linkState.style, (isSource)
                ? constants.STYLE_EXIT_PERIMETER
                : constants.STYLE_ENTRY_PERIMETER, true);
        }

        return new ConnectionConstraint(point, perimeter);
    },
    setConnectionConstraint: function (edge, terminal, source, constraint) {
        if (constraint) {
            this.model.beginUpdate();

            try {
                if (constraint == null || constraint.point == null) {
                    this.setCellStyles((source) ? constants.STYLE_EXIT_X :
                        constants.STYLE_ENTRY_X, null, [edge]);
                    this.setCellStyles((source) ? constants.STYLE_EXIT_Y :
                        constants.STYLE_ENTRY_Y, null, [edge]);
                    this.setCellStyles((source) ? constants.STYLE_EXIT_PERIMETER :
                        constants.STYLE_ENTRY_PERIMETER, null, [edge]);
                }
                else if (constraint.point != null) {
                    this.setCellStyles((source) ? constants.STYLE_EXIT_X :
                        constants.STYLE_ENTRY_X, constraint.point.x, [edge]);
                    this.setCellStyles((source) ? constants.STYLE_EXIT_Y :
                        constants.STYLE_ENTRY_Y, constraint.point.y, [edge]);

                    // Only writes 0 since 1 is default
                    if (!constraint.perimeter) {
                        this.setCellStyles((source) ? constants.STYLE_EXIT_PERIMETER :
                            constants.STYLE_ENTRY_PERIMETER, '0', [edge]);
                    }
                    else {
                        this.setCellStyles((source) ? constants.STYLE_EXIT_PERIMETER :
                            constants.STYLE_ENTRY_PERIMETER, null, [edge]);
                    }
                }
            }
            finally {
                this.model.endUpdate();
            }
        }
    },
    getConnectionPoint: function (vertex, constraint) {
        var point = null;

        if (vertex != null && constraint.point != null) {
            var bounds = this.view.getPerimeterBounds(vertex);
            var cx = new Point(bounds.getCenterX(), bounds.getCenterY());
            var direction = vertex.style[constants.STYLE_DIRECTION];
            var r1 = 0;

            // Bounds need to be rotated by 90 degrees for further computation
            if (direction != null) {
                if (direction == mxConstants.DIRECTION_NORTH) {
                    r1 += 270;
                }
                else if (direction == mxConstants.DIRECTION_WEST) {
                    r1 += 180;
                }
                else if (direction == mxConstants.DIRECTION_SOUTH) {
                    r1 += 90;
                }

                // Bounds need to be rotated by 90 degrees for further computation
                if (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH) {
                    bounds.rotate90();
                }
            }

            if (constraint.point != null) {
                var sx = 1;
                var sy = 1;
                var dx = 0;
                var dy = 0;

                // LATER: Add flipping support for image shapes
                if (this.getModel().isVertex(vertex.cell)) {
                    var flipH = vertex.style[mxConstants.STYLE_FLIPH];
                    var flipV = vertex.style[mxConstants.STYLE_FLIPV];

                    // Legacy support for stencilFlipH/V
                    if (vertex.shape != null && vertex.shape.stencil != null) {
                        flipH = utils.getValue(vertex.style, 'stencilFlipH', 0) == 1 || flipH;
                        flipV = utils.getValue(vertex.style, 'stencilFlipV', 0) == 1 || flipV;
                    }

                    if (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH) {
                        var tmp = flipH;
                        flipH = flipV;
                        flipV = tmp;
                    }

                    if (flipH) {
                        sx = -1;
                        dx = -bounds.width;
                    }

                    if (flipV) {
                        sy = -1;
                        dy = -bounds.height;
                    }
                }

                point = new mxPoint(bounds.x + constraint.point.x * bounds.width * sx - dx,
                    bounds.y + constraint.point.y * bounds.height * sy - dy);
            }

            // Rotation for direction before projection on perimeter
            var r2 = vertex.style[mxConstants.STYLE_ROTATION] || 0;

            if (constraint.perimeter) {
                if (r1 != 0 && point != null) {
                    // Only 90 degrees steps possible here so no trig needed
                    var cos = 0;
                    var sin = 0;

                    if (r1 == 90) {
                        sin = 1;
                    }
                    else if (r1 == 180) {
                        cos = -1;
                    }
                    else if (r1 == 270) {
                        sin = -1;
                    }

                    point = Point.getRotatedPoint(point, cos, sin, cx);
                }

                if (point != null && constraint.perimeter) {
                    point = this.view.getPerimeterPoint(vertex, point, false);
                }
            }
            else {
                r2 += r1;
            }

            // Generic rotation after projection on perimeter
            if (r2 != 0 && point != null) {
                var rad = utils.toRadians(r2);
                var cos = Math.cos(rad);
                var sin = Math.sin(rad);

                point = Point.getRotatedPoint(point, cos, sin, cx);
            }
        }

        if (point != null) {
            point.x = Math.round(point.x);
            point.y = Math.round(point.y);
        }

        return point;
    },
    connectCell: function () {},
    cellConnected: function (edge, terminal, source, constraint) {
        if (edge) {
            this.model.beginUpdate();
            try {
                var previous = this.model.getTerminal(edge, source);

                // Updates the constraint
                this.setConnectionConstraint(edge, terminal, source, constraint);

                // Checks if the new terminal is a port, uses the ID of the port in the
                // style and the parent of the port as the actual terminal of the edge.
                if (this.isPortsEnabled()) {
                    var id = null;

                    if (this.isPort(terminal)) {
                        id = terminal.getId();
                        terminal = this.getTerminalForPort(terminal, source);
                    }

                    // Sets or resets all previous information for connecting to a child port
                    var key = source ? constants.STYLE_SOURCE_PORT : constants.STYLE_TARGET_PORT;
                    this.setCellStyles(key, id, [edge]);
                }

                this.model.setTerminal(edge, terminal, source);

                if (this.resetEdgesOnConnect) {
                    this.resetEdge(edge);
                }

                //this.fireEvent(new mxEventObject(mxEvent.CELL_CONNECTED,
                //    'edge', edge, 'terminal', terminal, 'source', source,
                //    'previous', previous));
            }
            finally {
                this.model.endUpdate();
            }
        }
    },
    disconnectGraph: function () {},


    // Drilldown
    // ---------
    getCurrentRoot: function () {
        return this.view.currentRoot;
    },
    getTranslateForRoot: function () {},
    isPort: function (cell) {
        return false;
    },
    getTerminalForPort: function (cell, source) {
        return this.model.getParent(cell);
    },
    getChildOffsetForCell: function (cell) {
        return null;
    },
    enterGroup: function () {},
    exitGroup: function () {},
    home: function () {},
    isValidRoot: function () {},


    // Graph display
    // -------------
    getGraphBounds: function () {
        return this.view.getGraphBounds();
    },
    getCellBounds: function () {},
    getBoundingBoxFromGeometry: function () {},
    refresh: function () {},
    snap: function () {},
    panGraph: function () {},
    zoomIn: function () {},
    zoomOut: function () {},
    zoomActual: function () {},
    zoomTo: function () {},
    center: function () {},
    zoom: function () {},
    zoomToRect: function () {},
    fit: function () {},
    scrollCellToVisible: function () {},
    scrollRectToVisible: function () {},
    getCellGeometry: function (cell) {
        return this.model.getGeometry(cell);
    },
    isCellVisible: function (cell) {
        return this.model.isVisible(cell);
    },
    isCellCollapsed: function (cell) {
        return this.model.isCollapsed(cell);
    },
    isCellConnectable: function () {},

    isOrthogonal: function (edge) {
        var orthogonal = edge.style[constants.STYLE_ORTHOGONAL];

        if (orthogonal != null) {
            return orthogonal;
        }

        var tmp = this.view.getEdgeStyle(edge);

        return tmp == edgeStyle.SegmentConnector ||
            tmp == edgeStyle.ElbowConnector ||
            tmp == edgeStyle.SideToSide ||
            tmp == edgeStyle.TopToBottom ||
            tmp == edgeStyle.EntityRelation ||
            tmp == edgeStyle.OrthConnector;
    },
    isLoop: function () {},
    isCloneEvent: function () {},
    isToggleEvent: function () {},
    isGridEnabledEvent: function () {},
    isConstrainedEvent: function () {},


    // Validation
    // ----------

    validationAlert: function () {},
    isEdgeValid: function () {},
    getEdgeValidationError: function () {},
    validateEdge: function () {},
    validateGraph: function () {},
    getCellValidationError: function () {},
    validateCell: function () {},


    // Graph appearance
    // ----------------
    getBackgroundImage: function () {},
    setBackgroundImage: function () {},
    getFoldingImage: function () {},
    convertValueToString: function (cell) {
        var value = this.model.getValue(cell);

        if (value) {
            if (utils.isNode(value)) {
                return value.nodeName;
            } else if (utils.isFunction(value.toString)) {
                return value.toString();
            }
        }

        return '';
    },
    getLabel: function (cell) {
        var result = '';

        if (this.labelsVisible && cell) {
            var state = this.view.getState(cell);
            var style = (state) ? state.style : this.getCellStyle(cell);

            if (!utils.getValue(style, constants.STYLE_NOLABEL, false)) {
                result = this.convertValueToString(cell);
            }
        }

        return result;
    },
    isHtmlLabel: function () {
        return this.isHtmlLabels();
    },
    isHtmlLabels: function () {
        return this.htmlLabels;
    },
    setHtmlLabels: function () {},
    isWrapping: function (cell) {
        var state = this.view.getState(cell);
        var style = (state) ? state.style : this.getCellStyle(cell);

        return (style) ? style[constants.STYLE_WHITE_SPACE] == 'wrap' : false;
    },
    isLabelClipped: function (cell) {
        var state = this.view.getState(cell);
        var style = (state) ? state.style : this.getCellStyle(cell);

        return (style) ? style[constants.STYLE_OVERFLOW] == 'hidden' : false;
    },
    getTooltip: function () {},
    getTooltipForCell: function () {},
    getCursorForMouseEvent: function () {},
    getCursorForCell: function () {},
    getStartSize: function () {},
    getImage: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_IMAGE] : null;
    },
    getVerticalAlign: function (state) {
        return state && state.style
            ? (state.style[constants.STYLE_VERTICAL_ALIGN] || constants.ALIGN_MIDDLE ) :
            null;
    },
    getIndicatorColor: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_COLOR] : null;
    },
    getIndicatorGradientColor: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_GRADIENTCOLOR] : null;
    },
    getIndicatorShape: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_SHAPE] : null;

    },
    getIndicatorImage: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_IMAGE] : null;
    },
    getBorder: function () {
        return this.border;
    },
    setBorder: function () {},
    isSwimlane: function () {},


    // Graph behaviour
    // ---------------
    isResizeContainer: function () {},
    setResizeContainer: function () {},
    isEnabled: function () {},
    setEnabled: function () {},
    isEscapeEnabled: function () {},
    setEscapeEnabled: function () {},
    isInvokesStopCellEditing: function () {},
    setInvokesStopCellEditing: function () {},
    isEnterStopsCellEditing: function () {},
    setEnterStopsCellEditing: function () {},
    isCellLocked: function () {},
    isCellsLocked: function () {},
    setCellsLocked: function () {},
    getCloneableCells: function () {},
    isCellCloneable: function () {},
    isCellsCloneable: function () {},
    setCellsCloneable: function () {},
    getExportableCells: function () {},
    canExportCell: function () {},
    getImportableCells: function () {},
    canImportCell: function () {},
    isCellSelectable: function () {},
    isCellsSelectable: function () {},
    setCellsSelectable: function () {},
    getDeletableCells: function () {},
    isCellDeletable: function () {},
    isCellsDeletable: function () {},
    setCellsDeletable: function () {},
    isLabelMovable: function () {},
    isCellRotatable: function () {},
    getMovableCells: function () {},
    isCellMovable: function () {},
    isCellsMovable: function () {},
    setCellsMovable: function () {},
    isGridEnabled: function () {},
    setGridEnabled: function () {},
    isPortsEnabled: function () {
        return this.portsEnabled;
    },
    setPortsEnabled: function (value) {
        this.portsEnabled = value;
    },
    getGridSize: function () {},
    setGridSize: function () {},
    getTolerance: function () {},
    setTolerance: function () {},
    isVertexLabelsMovable: function () {},
    setVertexLabelsMovable: function () {},
    isEdgeLabelsMovable: function () {},
    setEdgeLabelsMovable: function () {},
    isSwimlaneNesting: function () {},
    setSwimlaneNesting: function () {},
    isSwimlaneSelectionEnabled: function () {},
    setSwimlaneSelectionEnabled: function () {},
    isMultigraph: function () {},
    setMultigraph: function () {},
    isAllowLoops: function () {},
    setAllowDanglingEdges: function () {},
    isAllowDanglingEdges: function () {},
    setConnectableEdges: function () {},
    isConnectableEdges: function () {},
    setCloneInvalidEdges: function () {},
    isCloneInvalidEdges: function () {},
    setAllowLoops: function () {},
    isDisconnectOnMove: function () {},
    setDisconnectOnMove: function () {},
    isDropEnabled: function () {},
    setDropEnabled: function () {},
    isSplitEnabled: function () {},
    setSplitEnabled: function () {},
    isCellResizable: function () {},
    isCellsResizable: function () {},
    setCellsResizable: function () {},
    isTerminalPointMovable: function () {},
    isCellBendable: function () {},
    isCellsBendable: function () {},
    setCellsBendable: function () {},
    isCellEditable: function () {},
    isCellsEditable: function () {},
    setCellsEditable: function () {},
    isCellDisconnectable: function () {},
    isCellsDisconnectable: function () {},
    setCellsDisconnectable: function () {},
    isValidSource: function () {},
    isValidTarget: function () {},
    isValidConnection: function () {},
    setConnectable: function (connectable) {
        this.connectionHandler.setEnabled(connectable);
    },
    isConnectable: function () {
        return this.connectionHandler.isEnabled();
    },
    setTooltips: function () {},
    setPanning: function () {},
    isEditing: function () {},
    isAutoSizeCell: function () {},
    isAutoSizeCells: function () {},
    setAutoSizeCells: function () {},
    isExtendParent: function () {},
    isExtendParents: function () {},
    setExtendParents: function () {},
    isExtendParentsOnAdd: function () {},
    setExtendParentsOnAdd: function () {},
    isExtendParentsOnMove: function () {},
    setExtendParentsOnMove: function () {},
    isRecursiveResize: function () {},
    setRecursiveResize: function () {},
    isConstrainChild: function () {},
    isConstrainChildren: function () {},
    setConstrainChildren: function () {},
    setConstrainChildrenOnResize: function () {},
    isConstrainChildrenOnResize: function () {},
    isAllowNegativeCoordinates: function () {},
    setAllowNegativeCoordinates: function () {},
    getOverlap: function () {},
    isAllowOverlapParent: function () {},
    getFoldableCells: function () {},
    isCellFoldable: function () {},
    isValidDropTarget: function () {},
    isSplitTarget: function () {},
    getDropTarget: function () {},


    // Cell retrieval
    // ---------------
    getDefaultParent: function () {
        var parent = this.getCurrentRoot() || this.defaultParent;

        if (!parent) {
            var root = this.model.getRoot();
            parent = this.model.getChildAt(root, 0);
        }

        return parent;
    },
    setDefaultParent: function () {},
    getSwimlane: function () {},
    getSwimlaneAt: function () {},
    getCellAt: function (x, y, parent, vertices, edges) {
        vertices = (vertices != null) ? vertices : true;
        edges = (edges != null) ? edges : true;

        if (parent == null) {
            parent = this.getCurrentRoot();

            if (parent == null) {
                parent = this.getModel().getRoot();
            }
        }

        if (parent != null) {
            var childCount = this.model.getChildCount(parent);

            for (var i = childCount - 1; i >= 0; i--) {
                var cell = this.model.getChildAt(parent, i);
                var result = this.getCellAt(x, y, cell, vertices, edges);

                if (result != null) {
                    return result;
                }
                else if (this.isCellVisible(cell) && (edges && this.model.isEdge(cell) ||
                    vertices && this.model.isVertex(cell))) {
                    var state = this.view.getState(cell);

                    if (this.intersects(state, x, y)) {
                        return cell;
                    }
                }
            }
        }

        return null;
    },
    intersects: function () {},
    hitsSwimlaneContent: function () {},
    getChildVertices: function () {},
    getChildEdges: function () {},
    getChildCells: function () {},
    getConnections: function () {},
    getIncomingEdges: function () {},
    getOutgoingEdges: function () {},
    getEdges: function () {},
    isValidAncestor: function () {},
    getOpposites: function () {},
    getEdgesBetween: function () {},
    getPointForEvent: function () {},
    getCells: function () {},
    getCellsBeyond: function () {},
    findTreeRoots: function () {},
    traverse: function () {},


    // Selection
    // ---------
    isCellSelected: function () {},
    isSelectionEmpty: function () {},
    clearSelection: function () {},
    getSelectionCount: function () {},
    getSelectionCell: function () {},
    getSelectionCells: function () {},
    setSelectionCell: function () {},
    setSelectionCells: function () {},
    addSelectionCell: function () {},
    addSelectionCells: function () {},
    removeSelectionCell: function () {},
    removeSelectionCells: function () {},
    selectRegion: function () {},
    selectNextCell: function () {},
    selectPreviousCell: function () {},
    selectParentCell: function () {},
    selectChildCell: function () {},
    selectCell: function () {},
    selectAll: function () {},
    selectVertices: function () {},
    selectEdges: function () {},
    selectCells: function () {},
    selectCellForEvent: function () {},
    selectCellsForEvent: function () {},

    // Selection state
    // ---------------
    createHandler: function () {},
    createVertexHandler: function () {},
    createEdgeHandler: function () {},
    createEdgeSegmentHandler: function () {},
    createElbowEdgeHandler: function () {},


    // Graph events
    // ------------
    addMouseListener: function () {},
    removeMouseListener: function () {},
    updateMouseEvent: function (me) {
        if (me.graphX == null || me.graphY == null) {
            //var pt = Point.convertPoint(this.container, me.getX(), me.getY());

            //me.graphX = pt.x - this.panDx;
            //me.graphY = pt.y - this.panDy;
        }

        return me;
    },
    getStateForTouchEvent: function () {},
    isEventIgnored: function () {},
    isSyntheticEventIgnored: function () {},
    isEventSourceIgnored: function (evtName, me) {
        var source = me.getSource();
        var name = (source.nodeName != null) ? source.nodeName.toLowerCase() : '';
        var candidate = !domEvent.isMouseEvent(me.getEvent()) || domEvent.isLeftMouseButton(me.getEvent());

        return evtName == mxEvent.MOUSE_DOWN && candidate && (name == 'select' || name == 'option' ||
            (name == 'input' && source.type != 'checkbox' && source.type != 'radio' &&
            source.type != 'button' && source.type != 'submit' && source.type != 'file'));
    },

    fireMouseEvent: function (evtName, me, sender) {
    },

    consumeMouseEvent: function () {},

    fireGestureEvent: function (evt, cell) {
        // Resets double tap event handling when gestures take place
        this.lastTouchTime = 0;
        this.emit(new EventObject(eventNames.GESTURE, {
            event: evt,
            cell: cell
        }));
    },

    destroy: function () {}
});


},{"./Cell":3,"./CellRenderer":4,"./ConnectionConstraint":6,"./Geometry":7,"./Model":9,"./Point":10,"./Rectangle":11,"./Stylesheet":12,"./View":14,"./changes/ChildChange":17,"./changes/GeometryChange":18,"./changes/RootChange":19,"./changes/TerminalChange":21,"./common/class":23,"./common/utils":26,"./constants":27,"./edgeStyle":28,"./events/Event":29,"./events/EventObject":30,"./events/eventNames":34,"./handler/ConnectionHandler":37}],9:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Cell = require('./Cell');
var ChildChange = require('./changes/ChildChange');
var Class = require('./common/class');
var Event = require('./events/Event');
var EventObject = require('./events/EventObject');
var RootChange = require('./changes/RootChange');
var StyleChange = require('./changes/StyleChange');
var TerminalChange = require('./changes/TerminalChange');
var UndoableEdit = require('./UndoableEdit');
var utils = require('./common/utils');
var Point = require('./Point');
var cellPath = require('./cellPath');

var each = utils.each;
var isNumeric = utils.isNumeric;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    Implements: Event,
    root: null,
    cells: null,
    maintainEdgeParent: true,
    createIds: true,
    prefix: '',
    postfix: '',
    nextId: 0,
    currentEdit: null,
    updateLevel: 0,
    endingUpdate: false,

    constructor: function Model(root) {

        var model = this;

        this.currentEdit = model.createUndoableEdit();

        if (root) {
            model.setRoot(root);
        } else {
            model.clear();
        }
    },

    // 清理并创建一个默认的 root
    clear: function () {

        var model = this;
        var root = model.createRoot();

        model.setRoot(root);

        return model;
    },

    createRoot: function () {

        var cell = new Cell();

        cell.insert(new Cell());

        return cell;
    },

    setRoot: function (root) {

        var model = this;

        model.execute(new RootChange(model, root));

        return model;
    },

    // 获取 cell 所在的 root
    getRoot: function (cell) {

        var model = this;
        var root = cell || model.root;

        while (cell) {
            root = cell;
            cell = model.getParent(cell);
        }

        return root;
    },

    getCell: function (id) {
        var cells = this.cells;
        return cells ? cells[id] : null;
    },

    filterCells: function (cells, filter) {
        var result = [];

        if (cells !== null) {
            for (var i = 0; i < cells.length; i++) {
                if (filter(cells[i])) {
                    result.push(cells[i]);
                }
            }
        }

        return result;
    },

    getDescendants: function (parent) {
        return this.filterDescendants(null, parent);
    },

    filterDescendants: function (filter, parent) {

        var model = this;
        var result = [];

        parent = parent || model.getRoot();

        if (isNullOrUndefined(filter) || filter(parent)) {
            result.push(parent);
        }

        // Visits the children of the cell
        var childCount = this.getChildCount(parent);

        for (var i = 0; i < childCount; i++) {
            var child = this.getChildAt(parent, i);
            result = result.concat(this.filterDescendants(filter, child));
        }

        return result;
    },

    rootChanged: function (root) {

        var model = this;
        var oldRoot = model.root;

        model.root = root;
        model.nextId = 0;
        model.cells = null;
        model.cellAdded(root);

        return oldRoot;
    },

    isRoot: function (cell) {
        return cell && this.root === cell;
    },

    isLayer: function (cell) {
        var model = this;
        var parent = model.getParent(cell);

        return model.isRoot(parent);
    },

    isAncestor: function (parent, child) {
        while (child && child !== parent) {
            child = this.getParent(child);
        }

        return child === parent;
    },

    isCreateIds: function () {
        return this.createIds;
    },

    setCreateIds: function (value) {
        this.createIds = value;
    },

    contains: function (cell) {
        return this.isAncestor(this.root, cell);
    },

    getParent: function (cell) {
        return cell ? cell.getParent() : null;
    },

    add: function (parent, child, index) {
        if (parent && child && child !== parent) {
            if (isNullOrUndefined(index)) {
                index = this.getChildCount(parent);
            }

            var parentChanged = parent !== this.getParent(child);
            this.execute(new ChildChange(this, parent, child, index));

            // Maintains the edges parents by moving the edges
            // into the nearest common ancestor of its
            // terminals
            if (this.maintainEdgeParent && parentChanged) {
                this.updateEdgeParents(child);
            }
        }

        return child;
    },

    // 维护 id，和 cells，FIXME：不要利用外部传入 ID 的机制，在内部自己维护一套唯一 ID
    // 机制（如自增），这样更直观方便，或许也可以直接使用 objectIdentity
    cellAdded: function (cell) {
        if (!cell) {
            return;
        }

        // id 不存在时就创建
        if (!cell.getId() && this.createIds) {
            cell.setId(this.createId());
        }

        if (cell.getId()) {
            var exists = this.getCell(cell.getId());

            if (exists !== cell) {
                // 避免 ID 冲突
                while (exists) {
                    cell.setId(this.createId(cell));
                    exists = this.getCell(cell.getId());
                }

                if (!this.cells) {
                    this.cells = {};
                }

                this.cells[cell.getId()] = cell;
            }
        }

        // Makes sure IDs of deleted cells are not reused
        if (isNumeric(cell.getId())) {
            this.nextId = Math.max(this.nextId, cell.getId());
        }

        // Recursively processes child cells
        var childCount = this.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            this.cellAdded(this.getChildAt(cell, i));
        }
    },

    createId: function () {
        var model = this;
        var id = model.nextId;

        model.nextId++;

        return model.prefix + id + model.postfix;
    },

    //
    updateEdgeParents: function (cell, root) {
        // Gets the topmost node of the hierarchy
        root = root || this.getRoot(cell);

        // Updates edges on children first
        var childCount = this.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            var child = this.getChildAt(cell, i);
            this.updateEdgeParents(child, root);
        }

        // Updates the parents of all connected edges
        var edgeCount = this.getEdgeCount(cell);
        var edges = [];

        for (var j = 0; j < edgeCount; j++) {
            edges.push(this.getEdgeAt(cell, j));
        }

        for (var k = 0; k < edges.length; k++) {
            var edge = edges[k];

            // Updates edge parent if edge and child have
            // a common root node (does not need to be the
            // model root node)
            if (this.isAncestor(root, edge)) {
                this.updateEdgeParent(edge, root);
            }
        }
    },

    updateEdgeParent: function (edge, root) {
        var sourceNode = this.getTerminal(edge, true);
        var targetNode = this.getTerminal(edge, false);
        var cell = null;

        // Uses the first non-relative descendants of the source terminal
        while (sourceNode && !this.isEdge(sourceNode) &&
        sourceNode.geometry && sourceNode.geometry.relative) {
            sourceNode = this.getParent(sourceNode);
        }

        // Uses the first non-relative descendants of the target terminal
        while (targetNode && !this.isEdge(targetNode) &&
        targetNode.geometry && targetNode.geometry.relative) {
            targetNode = this.getParent(targetNode);
        }

        if (this.isAncestor(root, sourceNode) && this.isAncestor(root, targetNode)) {
            if (sourceNode === targetNode) {
                cell = this.getParent(sourceNode);
            }
            else {
                //cell = this.getNearestCommonAncestor(sourceNode, targetNode);
            }

            if (cell !== null && (this.getParent(cell) !== this.root ||
                this.isAncestor(cell, edge)) && this.getParent(edge) !== cell) {
                var geo = this.getGeometry(edge);

                if (geo !== null) {
                    var origin1 = this.getOrigin(this.getParent(edge));
                    var origin2 = this.getOrigin(cell);

                    var dx = origin2.x - origin1.x;
                    var dy = origin2.y - origin1.y;

                    geo = geo.clone();
                    geo.translate(-dx, -dy);
                    this.setGeometry(edge, geo);
                }

                this.add(cell, edge, this.getChildCount(cell));
            }
        }
    },

    getOrigin: function (cell) {
        var that = this;
        var result = null;

        if (cell) {
            result = that.getOrigin(that.getParent(cell));

            if (!that.isEdge(cell)) {
                var geo = that.getGeometry(cell);

                if (geo) {
                    result.x += geo.x;
                    result.y += geo.y;
                }
            }
        } else {
            result = new Point();
        }

        return result;
    },

    // 获取最近的共同父节点
    getNearestCommonAncestor: function (cell1, cell2) {
        if (cell1 && cell2) {
            // Creates the cell path for the second cell
            var path = cellPath.create(cell2);

            if (path && path.length > 0) {
                // Bubbles through the ancestors of the first
                // cell to find the nearest common ancestor.
                var cell = cell1;
                var current = cellPath.create(cell);

                // Inverts arguments
                if (path.length < current.length) {
                    cell = cell2;
                    var tmp = current;
                    current = path;
                    path = tmp;
                }

                while (cell !== null) {
                    var parent = this.getParent(cell);

                    // Checks if the cell path is equal to the beginning of the given cell path
                    if (path.indexOf(current + cellPath.PATH_SEPARATOR) === 0 && parent !== null) {
                        return cell;
                    }

                    current = cellPath.getParentPath(current);
                    cell = parent;
                }
            }
        }

        return null;
    },

    remove: function (cell) {

        var model = this;

        if (cell === model.root) {
            model.setRoot(null);
        } else if (model.getParent(cell)) {
            model.execute(new ChildChange(this, null, cell));
        }

        return cell;
    },

    cellRemoved: function (cell) {
        if (cell && this.cells) {
            // Recursively processes child cells
            var childCount = this.getChildCount(cell);

            for (var i = childCount - 1; i >= 0; i--) {
                this.cellRemoved(this.getChildAt(cell, i));
            }

            // Removes the dictionary entry for the cell
            if (this.cells && cell.getId()) {
                delete this.cells[cell.getId()];
            }
        }
    },

    // 更新 cell 的 parent
    parentForCellChanged: function (cell, parent, index) {
        var previous = this.getParent(cell);

        if (parent) {
            if (parent !== previous || previous.getIndex(cell) !== index) {
                parent.insert(cell, index);
            }
        } else if (previous) { // remove from parent
            var oldIndex = previous.getIndex(cell);
            previous.remove(oldIndex);
        }

        // Checks if the previous parent was already in the
        // model and avoids calling cellAdded if it was.
        if (!this.contains(previous) && parent) {
            this.cellAdded(cell);
        } else if (parent === null) {
            this.cellRemoved(cell);
        }

        return previous;
    },

    getChildCount: function (cell) {
        return cell ? cell.getChildCount() : 0;
    },
    getChildAt: function (cell, index) {
        return cell ? cell.getChildAt(index) : null;
    },
    getChildren: function (cell) {
        return cell ? cell.children : null;
    },
    eachChildren: function (cell, iterator) {
        each(cell ? cell.children : [], iterator);
    },
    getChildVertices: function (parent) {
        return this.getChildCells(parent, true, false);
    },
    getChildEdges: function (parent) {
        return this.getChildCells(parent, false, true);
    },
    getChildCells: function (parent, isVertice, isEdge) {
        isVertice = !isNullOrUndefined(isVertice) ? isVertice : false;
        isEdge = !isNullOrUndefined(isEdge) ? isEdge : false;

        var childCount = this.getChildCount(parent);
        var result = [];

        for (var i = 0; i < childCount; i++) {
            var child = this.getChildAt(parent, i);

            if ((!isEdge && !isVertice) || (isEdge && this.isEdge(child)) ||
                (isVertice && this.isVertex(child))) {
                result.push(child);
            }
        }

        return result;
    },

    getTerminal: function (edge, isSource) {
        return edge ? edge.getTerminal(isSource) : null;
    },
    setTerminal: function (edge, terminal, isSource) {
        var terminalChanged = terminal !== this.getTerminal(edge, isSource);
        this.execute(new TerminalChange(this, edge, terminal, isSource));

        if (this.maintainEdgeParent && terminalChanged) {
            this.updateEdgeParent(edge, this.getRoot());
        }

        return terminal;
    },
    setTerminals: function (edge, source, target) {
        // 设置连线的源和目标
        this.beginUpdate();
        try {
            this.setTerminal(edge, source, true);
            this.setTerminal(edge, target, false);
        }
        finally {
            this.endUpdate();
        }
    },

    // 连线的起点节点或终点节点改变后
    terminalForCellChanged: function (edge, cell, isSource) {
        var previous = this.getTerminal(edge, isSource);

        if (cell) {
            cell.insertEdge(edge, isSource);
        } else if (previous) {
            previous.removeEdge(edge, isSource);
        }

        return previous;
    },

    getEdgeCount: function (cell) {
        return cell ? cell.getEdgeCount() : 0;
    },

    getEdgeAt: function (cell, index) {
        return cell ? cell.getEdgeAt(index) : null;
    },

    // 获取直接连接的连线的数量
    getDirectedEdgeCount: function (cell, outgoing, ignoredEdge) {
        var count = 0;
        var edgeCount = this.getEdgeCount(cell);

        for (var i = 0; i < edgeCount; i++) {
            var edge = this.getEdgeAt(cell, i);

            if (edge !== ignoredEdge && this.getTerminal(edge, outgoing) === cell) {
                count++;
            }
        }

        return count;
    },

    getConnections: function (cell) {},

    getIncomingEdges: function (cell) {},

    getOutgoingEdges: function (cell) {},

    getEdges: function (cell, incoming, outgoing, includeLoops) {},

    getEdgesBetween: function (source, target, directed) {},

    getOpposites: function (edges, terminal, sources, targets) {},

    getTopmostCells: function (cells) {},

    isVertex: function (cell) {
        return cell ? cell.isVertex() : false;
    },

    isEdge: function (cell) {
        return cell ? cell.isEdge() : false;
    },

    isConnectable: function (cell) {
        return cell ? cell.isConnectable() : false;
    },

    getValue: function (cell) {
        return cell ? cell.getValue() : null;
    },

    setValue: function (cell, value) {
        this.execute(new ValueChange(this, cell, value));
        return value;
    },

    valueForCellChanged: function (cell, value) {},

    getGeometry: function (cell) {
        return cell ? cell.getGeometry() : null;
    },

    setGeometry: function (cell, geometry) {
        if (geometry !== this.getGeometry(cell)) {
            this.execute(new GeometryChange(this, cell, geometry));
        }

        return geometry;
    },

    geometryForCellChanged: function (cell, geometry) {},

    getStyle: function (cell) {
        return cell ? cell.getStyle() : null;
    },

    setStyle: function (cell, style) {
        if (style !== this.getStyle(cell)) {
            this.execute(new StyleChange(this, cell, style));
        }

        return style;
    },

    styleForCellChanged: function (cell, style) {
        var previous = this.getStyle(cell);
        cell.setStyle(style);
        return previous;
    },

    isCollapsed: function (cell) {},

    setCollapsed: function (cell, collapsed) {},

    collapsedStateForCellChanged: function (cell, collapsed) {},

    isVisible: function (cell) {
        return cell ? cell.isVisible() : false;
    },

    setVisible: function (cell, visible) {},

    visibleStateForCellChanged: function (cell, visible) {},

    execute: function (change) {

        change.digest();

        this.beginUpdate();

        this.currentEdit.add(change);
        //this.fireEvent(new mxEventObject(mxEvent.EXECUTE, 'change', change));
        this.emit(new EventObject('execute', {change: change}));
        // New global executed event
        //this.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', change));
        this.emit(new EventObject('executed', {change: change}));

        this.endUpdate();

    },

    beginUpdate: function () {
        this.updateLevel++;
        //this.fireEvent(new mxEventObject(mxEvent.BEGIN_UPDATE));
        this.emit(new EventObject('beginUpdate'));

        if (this.updateLevel === 1) {
            //this.fireEvent(new mxEventObject(mxEvent.START_EDIT));
            this.emit(new EventObject('startEdit'));
        }
    },

    endUpdate: function () {
        this.updateLevel--;

        if (this.updateLevel === 0) {
            //this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
            this.emit(new EventObject('endEdit'));
        }

        if (!this.endingUpdate) {
            this.endingUpdate = this.updateLevel === 0;
            //this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));
            this.emit(new EventObject('endUpdate', {edit: this.currentEdit}));

            try {
                if (this.endingUpdate && !this.currentEdit.isEmpty()) {
                    //this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
                    this.emit(new EventObject('beforeUndo', {edit: this.currentEdit}));
                    var tmp = this.currentEdit;
                    this.currentEdit = this.createUndoableEdit();
                    tmp.notify();
                    //this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', tmp));
                    this.emit(new EventObject('undo', {edit: tmp}));
                }
            }
            finally {
                this.endingUpdate = false;
            }
        }
    },

    createUndoableEdit: function () {
        var edit = new UndoableEdit(this, true);

        edit.notify = function () {
            var model = edit.source;

            model.emit(new EventObject('change', {
                edit: edit,
                changes: edit.changes
            }));
            model.emit(new EventObject('notify', {
                edit: edit,
                changes: edit.changes
            }));

            // LATER: Remove changes property (deprecated)
            //edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
            //    'edit', edit, 'changes', edit.changes));
            //edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
            //    'edit', edit, 'changes', edit.changes));
        };

        return edit;
    },

    mergeChildren: function (from, to, cloneAllEdges) {},

    mergeChildrenImpl: function (from, to, cloneAllEdges, mapping) {},

    getParents: function (cell) {},

    cloneCell: function (cell) {},

    cloneCells: function (cell, includeChildren) {},

    cloneCellImpl: function (cell, mapping, includeChildren) {},

    cellCloned: function (cell) {},

    restoreClone: function (clone, cell, mapping) {},

    destroy: function () {}
});


},{"./Cell":3,"./Point":10,"./UndoableEdit":13,"./cellPath":15,"./changes/ChildChange":17,"./changes/RootChange":19,"./changes/StyleChange":20,"./changes/TerminalChange":21,"./common/class":23,"./common/utils":26,"./events/Event":29,"./events/EventObject":30}],10:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');

var Point = Class.create({

    constructor: function Point(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    },


    Statics: {
        equalPoints: function (points1, points2) {
            if ((!points1 && points2) || (points1 && !points2) ||
                (points1 && points2 && points1.length !== points2.length)) {
                return false;
            } else if (points1 && points2) {
                for (var i = 0; i < points1.length; i++) {
                    var p1 = points1[i];
                    var p2 = points2[i];

                    if ((!p1 && p2) || (p1 && !p2) || (p1 && p2 && !p1.equal(p2))) {
                        return false;
                    }
                }
            }

            return true;
        },
        convertPoint: function (container, x, y) {
            var origin = utils.getScrollOrigin(container);
            var offset = utils.getOffset(container);

            offset.left -= origin.left;
            offset.top -= origin.top;

            return {
                left: x - offset.left,
                top: y - offset.top
            };
        },
        getRotatedPoint: function (pt, cos, sin, c) {
            c = (c !== null) ? c : new Point();
            var x = pt.x - c.x;
            var y = pt.y - c.y;

            var x1 = x * cos - y * sin;
            var y1 = y * cos + x * sin;

            return new Point(x1 + c.x, y1 + c.y);
        },
    },

    equals: function (point) {
        return point &&
            point instanceof Point &&
            point.x === this.x &&
            point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

module.exports = Point;


},{"./common/class":23,"./common/utils":26}],11:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./common/class');
var Point = require('./Point');
var utils = require('./common/utils');
var constants = require('./constants');

var Rectangle = Klass.create({

    Extends: Point,

    Statics: {
        fromRectangle: function (rect) {
            return new Rectangle(rect.x, rect.y, rect.width, rect.height);
        },

        intersectsHotspot: function (state, x, y, hotspot, min, max) {
            hotspot = (hotspot !== null) ? hotspot : 1;
            min = (min !== null) ? min : 0;
            max = (max !== null) ? max : 0;

            if (hotspot > 0) {
                var cx = state.getCenterX();
                var cy = state.getCenterY();
                var w = state.width;
                var h = state.height;

                var start = utils.getValue(state.style, constants.STYLE_STARTSIZE) * state.view.scale;

                if (start > 0) {
                    if (utils.getValue(state.style, constants.STYLE_HORIZONTAL, true)) {
                        cy = state.y + start / 2;
                        h = start;
                    }
                    else {
                        cx = state.x + start / 2;
                        w = start;
                    }
                }

                w = Math.max(min, w * hotspot);
                h = Math.max(min, h * hotspot);

                if (max > 0) {
                    w = Math.min(w, max);
                    h = Math.min(h, max);
                }

                var rect = new Rectangle(cx - w / 2, cy - h / 2, w, h);
                var alpha = utils.toRadians(utils.getValue(state.style, constants.STYLE_ROTATION) || 0);

                if (alpha !== 0) {
                    var cos = Math.cos(-alpha);
                    var sin = Math.sin(-alpha);
                    var cx1 = new Point(state.getCenterX(), state.getCenterY());
                    var pt = Point.getRotatedPoint(new Point(x, y), cos, sin, cx1);
                    x = pt.x;
                    y = pt.y;
                }

                return utils.contains(rect, x, y);
            }

            return true;
        },

    },

    constructor: function Rectangle(x, y, width, height) {

        var rect = this;

        Rectangle.superclass.constructor.call(rect, x, y);

        rect.width = width ? width : 0;
        rect.height = height ? height : 0;
    },

    setRect: function (x, y, width, height) {

        var rect = this;

        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;

        return rect;
    },

    getCenterX: function () {
        return this.x + this.width / 2;
    },

    getCenterY: function () {
        return this.y + this.height / 2;
    },

    getCenter: function () {
        return new Point(this.getCenterX(), this.getCenterY());
    },

    add: function (rect) {

        if (!rect) {
            return;
        }

        var that = this;
        var minX = Math.min(that.x, rect.x);
        var minY = Math.min(that.y, rect.y);
        var maxX = Math.max(that.x + that.width, rect.x + rect.width);
        var maxY = Math.max(that.y + that.height, rect.y + rect.height);

        that.x = minX;
        that.y = minY;
        that.width = maxX - minX;
        that.height = maxY - minY;

        return that;
    },


    grow: function (amount) {

        var rect = this;

        rect.x -= amount;
        rect.y -= amount;
        rect.width += 2 * amount;
        rect.height += 2 * amount;

        return rect;
    },

    rotate90: function () {

        var rect = this;
        var w = rect.width;
        var h = rect.height;
        var t = (w - h) / 2;

        rect.x += t;
        rect.y -= t;
        rect.width = h;
        rect.height = w;

        return rect;
    },

    equals: function (rect) {

        var that = this;

        return Rectangle.superclass.equals.call(that, rect) &&
            rect instanceof Rectangle &&
            rect.width === that.width &&
            rect.height === that.height;
    },

    clone: function () {
        var rect = this;
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
});

utils.extend(constants, {
    PAGE_FORMAT_A4_PORTRAIT: new Rectangle(0, 0, 826, 1169),
    PAGE_FORMAT_A4_LANDSCAPE: new Rectangle(0, 0, 1169, 826),
    PAGE_FORMAT_LETTER_PORTRAIT: new Rectangle(0, 0, 850, 1100),
    PAGE_FORMAT_LETTER_LANDSCAPE: new Rectangle(0, 0, 1100, 850),
});

module.exports = Rectangle;


},{"./Point":10,"./common/class":23,"./common/utils":26,"./constants":27}],12:[function(require,module,exports){
'use strict';

var Class = require('./common/class');
var utils = require('./common/utils');
var constants = require('./constants');
var perimeter = require('./perimeter');


module.exports = Class.create({


    constructor: function Stylesheet() {
        this.styles = {};

        this.putDefaultVertexStyle(this.createDefaultVertexStyle());
        this.putDefaultEdgeStyle(this.createDefaultEdgeStyle());
    },

    createDefaultVertexStyle: function () {
        var style = {};

        style[constants.STYLE_SHAPE] = constants.SHAPE_RECTANGLE;
        style[constants.STYLE_PERIMETER] = perimeter.RectanglePerimeter;
        style[constants.STYLE_VERTICAL_ALIGN] = constants.ALIGN_MIDDLE;
        style[constants.STYLE_ALIGN] = constants.ALIGN_CENTER;
        style[constants.STYLE_FILLCOLOR] = '#e3f4ff';
        style[constants.STYLE_STROKECOLOR] = '#289de9';
        style[constants.STYLE_FONTCOLOR] = '#774400';

        return style;
    },

    createDefaultEdgeStyle: function () {
        var style = {};

        style[constants.STYLE_SHAPE] = constants.SHAPE_CONNECTOR;
        style[constants.STYLE_ENDARROW] = constants.ARROW_CLASSIC;
        style[constants.STYLE_VERTICAL_ALIGN] = constants.ALIGN_MIDDLE;
        style[constants.STYLE_ALIGN] = constants.ALIGN_CENTER;
        style[constants.STYLE_STROKECOLOR] = '#289de9';
        style[constants.STYLE_FONTCOLOR] = '#446299';

        return style;
    },

    putDefaultVertexStyle: function (style) {
        this.putCellStyle('defaultVertex', style);
    },

    putDefaultEdgeStyle: function (style) {
        this.putCellStyle('defaultEdge', style);
    },

    getDefaultVertexStyle: function () {
        return this.styles['defaultVertex'];
    },

    getDefaultEdgeStyle: function () {
        return this.styles['defaultEdge'];
    },

    putCellStyle: function (name, style) {
        this.styles[name] = style;
    },

    getCellStyle: function (name, defaultStyle) {
        var style = defaultStyle;

        if (name != null && name.length > 0) {
            var pairs = name.split(';');

            if (style && name.charAt(0) != ';') {
                style = utils.clone(style);
            }
            else {
                style = {};
            }

            // Parses each key, value pair into the existing style
            for (var i = 0; i < pairs.length; i++) {
                var tmp = pairs[i];
                var pos = tmp.indexOf('=');

                if (pos >= 0) {
                    var key = tmp.substring(0, pos);
                    var value = tmp.substring(pos + 1);

                    if (value == constants.NONE) {
                        delete style[key];
                    }
                    else if (utils.isNumeric(value)) {
                        style[key] = parseFloat(value);
                    }
                    else {
                        style[key] = value;
                    }
                }
                else {
                    // Merges the entries from a named style
                    var tmpStyle = this.styles[tmp];

                    if (tmpStyle != null) {
                        for (var key in tmpStyle) {
                            style[key] = tmpStyle[key];
                        }
                    }
                }
            }
        }

        return style;
    }
});

},{"./common/class":23,"./common/utils":26,"./constants":27,"./perimeter":41}],13:[function(require,module,exports){
var Class = require('./common/class');
var utils = require('./common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function UndoableEdit(source, significant) {

        var that = this;

        that.source = source;
        that.changes = [];
        that.significant = !isNullOrUndefined(significant) ? significant : true;
        that.undone = false;
        that.redone = false;

    },

    isEmpty: function () {
        return this.changes.length === 0;
    },

    isSignificant: function () {
        return this.significant;
    },

    add: function (change) {
        this.changes.push(change);
    },

    notify: function () {},
    die: function () {},
    undo: function () {},
    redo: function () {}
});

},{"./common/class":23,"./common/utils":26}],14:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: false */
/* global document */

'use strict';

var Class = require('./common/class');
var Event = require('./events/Event');
var Dictionary = require('./common/Dictionary');
var utils = require('./common/utils');
var detector = require('./common/detector');
var constants = require('./constants');
var Point = require('./Point');
var Rectangle = require('./Rectangle');
var CellState = require('./CellState');
var MouseEvent = require('./events/MouseEvent');
var domEvent = require('./events/domEvent');
var eventNames = require('./events/eventNames');

var each = utils.each;
var isNullOrUndefined = utils.isNullOrUndefined;
var getValue = utils.getValue;

module.exports = Class.create({

    Implements: Event,

    // 属性
    // ----

    graph: null,

    EMPTY_POINT: new Point(),
    // 国际化
    doneResource: '',
    updatingDocumentResource: '',

    allowEval: true,
    captureDocumentGesture: true,
    optimizeVmlReflows: true,

    rendering: true,
    currentRoot: null,
    graphBounds: null,
    scale: 1,
    translate: null,
    updateStyle: false,
    lastNode: null,
    lastHtmlNode: null,
    lastForegroundNode: null,
    lastForegroundHtmlNode: null,

    constructor: function View(graph) {

        var that = this;

        that.graph = graph || null;
        that.translate = new Point();
        that.graphBounds = new Rectangle();
        that.states = new Dictionary();
    },

    init: function () {
        return this.installListeners().createSvg();
    },

    getGraphBounds: function () {
        return this.graphBounds;
    },

    setGraphBounds: function (value) {
        this.graphBounds = value;
    },

    getBounds: function (cells) {

        var that = this;
        var result = null;

        if (!cells || !cells.length) {
            return result;
        }

        var model = that.graph.getModel();

        each(cells, function (cell) {

            if (model.isVertex(cell) || model.isEdge(cell)) {

                var state = that.getState(cell);

                if (state) {

                    var rect = new Rectangle(state.x, state.y, state.width, state.height);

                    if (result) {
                        result.add(rect);
                    } else {
                        result = rect;
                    }
                }
            }
        });

        return result;
    },

    setCurrentRoot: function (root) {
        if (this.currentRoot !== root) {
            var change = new CurrentRootChange(this, root);
            change.execute();
            var edit = new mxUndoableEdit(this, false);
            edit.add(change);
            this.fireEvent(new EventObject(mxEvent.UNDO, 'edit', edit));
            this.graph.sizeDidChange();
        }

        return root;
    },

    scaleAndTranslate: function (scale, dx, dy) {

        var that = this;
        var ts = that.translate;
        var previousScale = that.scale;
        var previousTranslate = new Point(ts.x, ts.y);

        if (previousScale !== scale || ts.x !== dx || ts.y !== dy) {

            that.scale = scale;

            that.translate.x = dx;
            that.translate.y = dy;

            if (that.isEventEnabled()) {
                that.revalidate();
                that.graph.sizeDidChange();
            }
        }

        that.fireEvent(new EventObject(mxEvent.SCALE_AND_TRANSLATE,
            'scale', scale, 'previousScale', previousScale,
            'translate', that.translate, 'previousTranslate', previousTranslate));
    },

    getScale: function () {
        return this.scale;
    },

    setScale: function (scale) {

        var that = this;
        var previousScale = that.scale;

        if (previousScale !== scale) {
            that.scale = scale;

            if (that.isEventEnabled()) {
                that.revalidate();
                that.graph.sizeDidChange();
            }
        }

        //that.fireEvent(new EventObject('scale',
        //    'scale', scale, 'previousScale', previousScale));
    },

    getTranslate: function () {
        return this.translate;
    },

    setTranslate: function (dx, dy) {

        var that = this;
        var translate = that.translate;
        var previousTranslate = new Point(translate.x, translate.y);

        if (translate.x !== dx || translate.y !== dy) {
            translate.x = dx;
            translate.y = dy;

            if (that.isEventEnabled()) {
                that.revalidate();
                that.graph.sizeDidChange();
            }
        }

        //that.fireEvent(new EventObject(mxEvent.TRANSLATE,
        //    'translate', translate, 'previousTranslate', previousTranslate));
    },

    refresh: function () {

        var that = this;

        if (that.currentRoot) {
            that.clear();
        }

        that.revalidate();

        return that;
    },

    revalidate: function () {

        var that = this;

        that.invalidate();
        that.validate();

        return that;
    },

    clear: function (cell, force, recurse) {

        var that = this;
        var model = that.graph.getModel();

        cell = cell || model.getRoot();
        force = !isNullOrUndefined(force) ? force : false;
        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        that.removeState(cell);

        if (recurse && (force || cell !== that.currentRoot)) {

            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                that.clear(model.getChildAt(cell, i), force);
            }
        } else {
            that.invalidate(cell);
        }
    },

    invalidate: function (cell, recurse, includeEdges) {

        var that = this;
        var model = that.graph.getModel();

        cell = cell || model.getRoot();
        recurse = !isNullOrUndefined(recurse) ? recurse : true;
        includeEdges = !isNullOrUndefined(includeEdges) ? includeEdges : true;

        var state = that.getState(cell);

        if (state) {
            state.invalid = true;
        }

        // Avoids infinite loops for invalid graphs
        if (!cell.invalidating) {
            cell.invalidating = true;

            if (recurse) {
                var childCount = model.getChildCount(cell);

                for (var i = 0; i < childCount; i++) {
                    var child = model.getChildAt(cell, i);
                    that.invalidate(child, recurse, includeEdges);
                }
            }

            if (includeEdges) {
                var edgeCount = model.getEdgeCount(cell);

                for (var i = 0; i < edgeCount; i++) {
                    that.invalidate(model.getEdgeAt(cell, i), recurse, includeEdges);
                }
            }

            delete cell.invalidating;
        }
    },

    //
    validate: function (cell) {

        var that = this;

        if (!cell) {
            cell = that.currentRoot || that.graph.getModel().getRoot();
        }

        that.resetValidationState();

        that.validateCell(cell);
        var state = that.validateCellState(cell);
        var graphBounds = that.getBoundingBox(state);

        that.setGraphBounds(graphBounds || that.getEmptyBounds());
        that.validateBackground();
        that.resetValidationState();
    },

    // 创建或移除 cell 对应的 state
    validateCell: function (cell, visible) {

        var that = this;

        if (!cell) {
            return cell;
        }

        visible = !isNullOrUndefined(visible) ? visible : true;
        visible = visible && that.graph.isCellVisible(cell);

        var state = that.getState(cell, visible);

        if (state && !visible) {
            that.removeState(cell);
        } else {

            var model = that.graph.getModel();
            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                this.validateCell(model.getChildAt(cell, i), visible &&
                    (!this.isCellCollapsed(cell) || cell == this.currentRoot));
            }
        }

        return cell;
    },

    validateCellState: function (cell, recurse) {

        var view = this;
        var state = null;

        if (!cell) {
            return state;
        }

        state = view.getState(cell);

        if (!state) {
            return state;
        }

        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        var model = view.graph.getModel();

        if (state.invalid) {
            state.invalid = false;

            if (cell !== this.currentRoot) {
                this.validateCellState(model.getParent(cell), false);
            }

            // 连线
            var source = this.getVisibleTerminal(cell, true);
            var target = this.getVisibleTerminal(cell, false);
            var sourceState = this.validateCellState(source, false);
            var targetState = this.validateCellState(target, false);
            state.setVisibleTerminalState(sourceState, true);
            state.setVisibleTerminalState(targetState, false);

            // 关键代码，更新 state 的大小、位置信息
            this.updateCellState(state);

            // Repaint happens immediately after the cell is validated
            if (cell !== this.currentRoot) {
                this.graph.cellRenderer.redraw(state, false, this.isRendering());
            }
        }

        if (recurse) {
            state.updateCachedBounds();

            // Updates order in DOM if recursively traversing
            if (state.shape) {
                this.stateValidated(state);
            }

            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                this.validateCellState(model.getChildAt(cell, i));
            }
        }

        return state;
    },

    getBoundingBox: function (state, recurse) {

        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        var bbox = null;

        if (isNullOrUndefined(state)) {
            return bbox;
        }

        if (state.shape && state.shape.boundingBox) {
            bbox = state.shape.boundingBox.clone();
        }

        // Adds label bounding box to graph bounds
        if (state.text && state.text.boundingBox) {
            if (bbox) {
                bbox.add(state.text.boundingBox);
            } else {
                bbox = state.text.boundingBox.clone();
            }
        }

        if (recurse) {
            var model = this.graph.getModel();
            var childCount = model.getChildCount(state.cell);

            for (var i = 0; i < childCount; i++) {
                var bounds = this.getBoundingBox(this.getState(model.getChildAt(state.cell, i)));

                if (bounds != null) {
                    if (bbox == null) {
                        bbox = bounds;
                    }
                    else {
                        bbox.add(bounds);
                    }
                }
            }
        }

        return bbox;
    },

    getEmptyBounds: function () {
        var view = this;
        var translate = view.translate;
        var scale = view.scale;

        return new Rectangle(translate.x * scale, translate.y * scale);
    },

    // BackgroundPage
    // ---------------
    createBackgroundPageShape: function (bounds) {
        return new RectangleShape(bounds, 'white', 'black');
    },

    validateBackground: function () {
        this.validateBackgroundImage();
        this.validateBackgroundPage();
    },

    validateBackgroundImage: function () {
        var bg = this.graph.getBackgroundImage();

        if (bg) {
            if (this.backgroundImage == null || this.backgroundImage.image != bg.src) {
                if (this.backgroundImage) {
                    this.backgroundImage.destroy();
                }

                var bounds = new Rectangle(0, 0, 1, 1);

                this.backgroundImage = new ImageShape(bounds, bg.src);
                this.backgroundImage.dialect = this.graph.dialect;
                this.backgroundImage.init(this.backgroundPane);
                this.backgroundImage.redraw();

                // Workaround for ignored event on background in IE8 standards mode
                if (document.documentMode == 8 && !mxClient.IS_EM) {
                    mxEvent.addGestureListeners(this.backgroundImage.node,
                        utils.bind(this, function (evt) {
                            this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
                        }),
                        utils.bind(this, function (evt) {
                            this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
                        }),
                        utils.bind(this, function (evt) {
                            this.graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
                        })
                    );
                }
            }

            this.redrawBackgroundImage(this.backgroundImage, bg);
        }
        else if (this.backgroundImage != null) {
            this.backgroundImage.destroy();
            this.backgroundImage = null;
        }
    },

    validateBackgroundPage: function () {},

    getBackgroundPageBounds: function () {
        var view = this;
        var scale = view.scale;
        var translate = view.translate;
        var fmt = view.graph.pageFormat;
        var ps = scale * view.graph.pageScale;

        return new Rectangle(scale * translate.x, scale * translate.y, fmt.width * ps, fmt.height * ps);
    },

    redrawBackgroundImage: function (backgroundImage, bg) {
        backgroundImage.scale = this.scale;
        backgroundImage.bounds.x = this.scale * this.translate.x;
        backgroundImage.bounds.y = this.scale * this.translate.y;
        backgroundImage.bounds.width = this.scale * bg.width;
        backgroundImage.bounds.height = this.scale * bg.height;

        backgroundImage.redraw();
    },


    // update cell state
    // -----------------
    updateCellState: function (state) {
        state.absoluteOffset.x = 0;
        state.absoluteOffset.y = 0;
        state.origin.x = 0;
        state.origin.y = 0;
        state.length = 0;

        if (state.cell !== this.currentRoot) {
            var model = this.graph.getModel();
            var pState = this.getState(model.getParent(state.cell));

            if (pState != null && pState.cell != this.currentRoot) {
                state.origin.x += pState.origin.x;
                state.origin.y += pState.origin.y;
            }

            var offset = this.graph.getChildOffsetForCell(state.cell);

            if (offset != null) {
                state.origin.x += offset.x;
                state.origin.y += offset.y;
            }

            var geo = this.graph.getCellGeometry(state.cell);

            if (geo) {
                if (!model.isEdge(state.cell)) {
                    offset = geo.offset || this.EMPTY_POINT;

                    if (geo.relative && pState != null) {
                        if (model.isEdge(pState.cell)) {
                            var origin = this.getPoint(pState, geo);

                            if (origin != null) {
                                state.origin.x += (origin.x / this.scale) - pState.origin.x - this.translate.x;
                                state.origin.y += (origin.y / this.scale) - pState.origin.y - this.translate.y;
                            }
                        }
                        else {
                            state.origin.x += geo.x * pState.width / this.scale + offset.x;
                            state.origin.y += geo.y * pState.height / this.scale + offset.y;
                        }
                    }
                    else {
                        state.absoluteOffset.x = this.scale * offset.x;
                        state.absoluteOffset.y = this.scale * offset.y;
                        state.origin.x += geo.x;
                        state.origin.y += geo.y;
                    }
                }

                // 设置 scale 和 translate 之后的 x, y, w, h
                state.x = this.scale * (this.translate.x + state.origin.x);
                state.y = this.scale * (this.translate.y + state.origin.y);
                state.width = this.scale * geo.width;
                state.height = this.scale * geo.height;

                if (model.isVertex(state.cell)) {
                    this.updateVertexState(state, geo);
                }

                if (model.isEdge(state.cell)) {
                    this.updateEdgeState(state, geo);
                }
            }
        }
    },

    isCellCollapsed: function (cell) {
        return this.graph.isCellCollapsed(cell);
    },

    updateVertexState: function (state, geo) {
        var model = this.graph.getModel();
        var pState = this.getState(model.getParent(state.cell));

        if (geo.relative && pState && !model.isEdge(pState.cell)) {
            var alpha = utils.toRadians(pState.style[constants.STYLE_ROTATION] || '0');

            if (alpha != 0) {
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);

                var ct = new Point(state.getCenterX(), state.getCenterY());
                var cx = new Point(pState.getCenterX(), pState.getCenterY());
                var pt = Point.getRotatedPoint(ct, cos, sin, cx);
                state.x = pt.x - state.width / 2;
                state.y = pt.y - state.height / 2;
            }
        }

        this.updateVertexLabelOffset(state);
    },

    updateEdgeState: function (linkState, geo) {
        var sourceState = linkState.getVisibleTerminalState(true);
        var targetState = linkState.getVisibleTerminalState(false);

        // This will remove edges with no terminals and no terminal points
        // as such edges are invalid and produce NPEs in the edge styles.
        // Also removes connected edges that have no visible terminals.
        if ((this.graph.model.getTerminal(linkState.cell, true) && sourceState == null) ||
            (sourceState == null && geo.getTerminalPoint(true) == null) ||
            (this.graph.model.getTerminal(linkState.cell, false) && targetState == null) ||
            (targetState == null && geo.getTerminalPoint(false) == null)) {
            this.clear(linkState.cell, true);
        }
        else {
            this.updateFixedTerminalPoints(linkState, sourceState, targetState);
            this.updatePoints(linkState, geo.points, sourceState, targetState);
            this.updateFloatingTerminalPoints(linkState, sourceState, targetState);

            var pts = linkState.absolutePoints;

            if (linkState.cell != this.currentRoot && (pts == null || pts.length < 2 ||
                pts[0] == null || pts[pts.length - 1] == null)) {
                // This will remove edges with invalid points from the list of states in the view.
                // Happens if the one of the terminals and the corresponding terminal point is null.
                this.clear(linkState.cell, true);
            }
            else {
                this.updateEdgeBounds(linkState);
                this.updateEdgeLabelOffset(linkState);
            }
        }
    },

    // 更新 state.absoluteOffset
    updateVertexLabelOffset: function (state) {
        var h = getValue(state.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER);

        if (h == constants.ALIGN_LEFT) {
            var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

            if (lw != null) {
                lw *= this.scale;
            }
            else {
                lw = state.width;
            }

            state.absoluteOffset.x -= lw;
        }
        else if (h == constants.ALIGN_RIGHT) {
            state.absoluteOffset.x += state.width;
        }
        else if (h == constants.ALIGN_CENTER) {
            var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

            if (lw != null) {
                // Aligns text block with given width inside the vertex width
                var align = getValue(state.style, constants.STYLE_ALIGN, constants.ALIGN_CENTER);
                var dx = 0;

                if (align == constants.ALIGN_CENTER) {
                    dx = 0.5;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    dx = 1;
                }

                if (dx != 0) {
                    state.absoluteOffset.x -= (lw * this.scale - state.width) * dx;
                }
            }
        }

        var v = getValue(state.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE);

        if (v == constants.ALIGN_TOP) {
            state.absoluteOffset.y -= state.height;
        }
        else if (v == constants.ALIGN_BOTTOM) {
            state.absoluteOffset.y += state.height;
        }
    },

    resetValidationState: function () {
        this.lastNode = null;
        this.lastHtmlNode = null;
        this.lastForegroundNode = null;
        this.lastForegroundHtmlNode = null;
    },

    stateValidated: function (state) {

    },

    updateFixedTerminalPoints: function (linkState, sourceState, targetState) {
        this.updateFixedTerminalPoint(linkState, sourceState, true, this.graph.getConnectionConstraint(linkState, sourceState, true));
        this.updateFixedTerminalPoint(linkState, targetState, false, this.graph.getConnectionConstraint(linkState, targetState, false));
    },

    updateFixedTerminalPoint: function (linkState, terminalState, isSource, constraint) {
        var pt = null;

        if (constraint) {
            pt = this.graph.getConnectionPoint(terminalState, constraint);
        }

        if (pt == null && terminalState == null) {
            var origin = linkState.origin;
            var scale = this.scale;
            var translate = this.translate;
            var geo = this.graph.getCellGeometry(linkState.cell);
            pt = geo.getTerminalPoint(isSource);

            if (pt != null) {
                pt = new Point(scale * (translate.x + pt.x + origin.x),
                    scale * (translate.y + pt.y + origin.y));
            }
        }

        linkState.setAbsoluteTerminalPoint(pt, isSource);
    },

    updatePoints: function (linkState, points, sourceState, targetState) {
        if (linkState != null) {
            var pts = [];
            pts.push(linkState.absolutePoints[0]);
            var edgeStyle = this.getEdgeStyle(linkState, points, sourceState, targetState);

            if (edgeStyle != null) {
                var src = this.getTerminalPort(linkState, sourceState, true);
                var trg = this.getTerminalPort(linkState, targetState, false);

                edgeStyle(linkState, src, trg, points, pts);
            }
            else if (points != null) {
                for (var i = 0; i < points.length; i++) {
                    if (points[i] != null) {
                        var pt = utils.clone(points[i]);
                        pts.push(this.transformControlPoint(linkState, pt));
                    }
                }
            }

            var tmp = linkState.absolutePoints;
            pts.push(tmp[tmp.length - 1]);

            linkState.absolutePoints = pts;
        }
    },

    transformControlPoint: function (state, pt) {},

    getEdgeStyle: function (linkState, points, sourceState, targetState) {
        var edgeStyle = (sourceState && sourceState === targetState)
            ? getValue(linkState.style, constants.STYLE_LOOP, this.graph.defaultLoopStyle)
            : (!getValue(linkState.style, constants.STYLE_NOEDGESTYLE, false) ? linkState.style[constants.STYLE_EDGE] : null);

        // Converts string values to objects
        if (typeof(edgeStyle) == "string") {
            var tmp = mxStyleRegistry.getValue(edgeStyle);

            if (tmp == null && this.isAllowEval()) {
                tmp = utils.eval(edgeStyle);
            }

            edgeStyle = tmp;
        }

        if (typeof(edgeStyle) == "function") {
            return edgeStyle;
        }

        return null;
    },

    updateFloatingTerminalPoints: function (linkState, sourceState, targetState) {
        var pts = linkState.absolutePoints;
        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        if (pe == null && targetState != null) {
            this.updateFloatingTerminalPoint(linkState, targetState, sourceState, false);
        }

        if (p0 == null && sourceState != null) {
            this.updateFloatingTerminalPoint(linkState, sourceState, targetState, true);
        }
    },

    // 获取连线与节点的连接点
    updateFloatingTerminalPoint: function (linkState, start, end, isSource) {
        start = this.getTerminalPort(linkState, start, isSource);
        var next = this.getNextPoint(linkState, end, isSource);

        var orth = this.graph.isOrthogonal(linkState);
        var alpha = utils.toRadians(Number(start.style[constants.STYLE_ROTATION] || '0'));
        var center = new Point(start.getCenterX(), start.getCenterY());

        if (alpha != 0) {
            var cos = Math.cos(-alpha);
            var sin = Math.sin(-alpha);
            next = Point.getRotatedPoint(next, cos, sin, center);
        }

        var border = parseFloat(linkState.style[constants.STYLE_PERIMETER_SPACING] || 0);
        border += parseFloat(linkState.style[(isSource) ?
                constants.STYLE_SOURCE_PERIMETER_SPACING :
                constants.STYLE_TARGET_PERIMETER_SPACING] || 0);
        var pt = this.getPerimeterPoint(start, next, alpha == 0 && orth, border);

        if (alpha != 0) {
            var cos = Math.cos(alpha);
            var sin = Math.sin(alpha);
            pt = Point.getRotatedPoint(pt, cos, sin, center);
        }

        linkState.setAbsoluteTerminalPoint(pt, isSource);
    },

    getTerminalPort: function (linkState, terminalState, isSource) {
        var key = (isSource) ? constants.STYLE_SOURCE_PORT : constants.STYLE_TARGET_PORT;
        var id = getValue(linkState.style, key);

        if (id != null) {
            var tmp = this.getState(this.graph.getModel().getCell(id));

            // Only uses ports where a cell state exists
            if (tmp != null) {
                terminalState = tmp;
            }
        }

        return terminalState;
    },

    // 获取周长路径上的点
    getPerimeterPoint: function (terminal, next, orthogonal, border) {
        var point = null;

        if (terminal != null) {
            var perimeter = this.getPerimeterFunction(terminal);

            if (perimeter != null && next != null) {
                var bounds = this.getPerimeterBounds(terminal, border);

                if (bounds.width > 0 || bounds.height > 0) {
                    point = perimeter(bounds, terminal, next, orthogonal);

                    if (point != null) {
                        point.x = Math.round(point.x);
                        point.y = Math.round(point.y);
                    }
                }
            }

            if (point == null) {
                point = this.getPoint(terminal);
            }
        }

        return point;
    },

    getRoutingCenterX: function (state) {
        var f = (state.style != null) ? parseFloat(state.style
            [mxConstants.STYLE_ROUTING_CENTER_X]) || 0 : 0;

        return state.getCenterX() + f * state.width;
    },

    getRoutingCenterY: function (state) {
        var f = (state.style != null) ? parseFloat(state.style
            [mxConstants.STYLE_ROUTING_CENTER_Y]) || 0 : 0;

        return state.getCenterY() + f * state.height;
    },

    getPerimeterBounds: function (terminal, border) {
        border = (border != null) ? border : 0;

        if (terminal != null) {
            border += parseFloat(terminal.style[constants.STYLE_PERIMETER_SPACING] || 0);
        }

        return terminal.getPerimeterBounds(border * this.scale);

    },

    getPerimeterFunction: function (state) {
        var perimeter = state.style[constants.STYLE_PERIMETER];

        // Converts string values to objects
        if (typeof(perimeter) == "string") {
            var tmp = mxStyleRegistry.getValue(perimeter);

            if (tmp == null && this.isAllowEval()) {
                tmp = utils.eval(perimeter);
            }

            perimeter = tmp;
        }

        if (typeof(perimeter) == "function") {
            return perimeter;
        }

        return null;
    },

    getNextPoint: function (edge, opposite, source) {
        var pts = edge.absolutePoints;
        var point = null;

        if (pts != null && pts.length >= 2) {
            var count = pts.length;
            point = pts[(source) ? Math.min(1, count - 1) : Math.max(0, count - 2)];
        }

        if (point == null && opposite != null) {
            point = new Point(opposite.getCenterX(), opposite.getCenterY());
        }

        return point;
    },
    getVisibleTerminal: function (edge, source) {
        var model = this.graph.getModel();
        var result = model.getTerminal(edge, source);
        var best = result;

        while (result && result != this.currentRoot) {
            if (!this.graph.isCellVisible(best) || this.isCellCollapsed(result)) {
                best = result;
            }

            result = model.getParent(result);
        }

        // Checks if the result is not a layer
        if (model.getParent(best) == model.getRoot()) {
            best = null;
        }

        return best;
    },
    updateEdgeBounds: function (state) {
        var points = state.absolutePoints;
        var p0 = points[0];
        var pe = points[points.length - 1];

        if (p0.x != pe.x || p0.y != pe.y) {
            var dx = pe.x - p0.x;
            var dy = pe.y - p0.y;
            state.terminalDistance = Math.sqrt(dx * dx + dy * dy);
        }
        else {
            state.terminalDistance = 0;
        }

        var length = 0;
        var segments = [];
        var pt = p0;

        if (pt != null) {
            var minX = pt.x;
            var minY = pt.y;
            var maxX = minX;
            var maxY = minY;

            for (var i = 1; i < points.length; i++) {
                var tmp = points[i];

                if (tmp != null) {
                    var dx = pt.x - tmp.x;
                    var dy = pt.y - tmp.y;

                    var segment = Math.sqrt(dx * dx + dy * dy);
                    segments.push(segment);
                    length += segment;

                    pt = tmp;

                    minX = Math.min(pt.x, minX);
                    minY = Math.min(pt.y, minY);
                    maxX = Math.max(pt.x, maxX);
                    maxY = Math.max(pt.y, maxY);
                }
            }

            state.length = length;
            state.segments = segments;

            var markerSize = 1; // TODO: include marker size

            state.x = minX;
            state.y = minY;
            state.width = Math.max(markerSize, maxX - minX);
            state.height = Math.max(markerSize, maxY - minY);
        }
    },
    getPoint: function (state, geometry) {
        var x = state.getCenterX();
        var y = state.getCenterY();

        if (state.segments != null && (geometry == null || geometry.relative)) {
            var gx = (geometry != null) ? geometry.x / 2 : 0;
            var pointCount = state.absolutePoints.length;
            var dist = (gx + 0.5) * state.length;
            var segment = state.segments[0];
            var length = 0;
            var index = 1;

            while (dist > length + segment && index < pointCount - 1) {
                length += segment;
                segment = state.segments[index++];
            }

            var factor = (segment == 0) ? 0 : (dist - length) / segment;
            var p0 = state.absolutePoints[index - 1];
            var pe = state.absolutePoints[index];

            if (p0 != null && pe != null) {
                var gy = 0;
                var offsetX = 0;
                var offsetY = 0;

                if (geometry != null) {
                    gy = geometry.y;
                    var offset = geometry.offset;

                    if (offset != null) {
                        offsetX = offset.x;
                        offsetY = offset.y;
                    }
                }

                var dx = pe.x - p0.x;
                var dy = pe.y - p0.y;
                var nx = (segment == 0) ? 0 : dy / segment;
                var ny = (segment == 0) ? 0 : dx / segment;

                x = p0.x + dx * factor + (nx * gy + offsetX) * this.scale;
                y = p0.y + dy * factor - (ny * gy - offsetY) * this.scale;
            }
        }
        else if (geometry != null) {
            var offset = geometry.offset;

            if (offset != null) {
                x += offset.x;
                y += offset.y;
            }
        }

        return new Point(x, y);
    },
    getRelativePoint: function (edgeState, x, y) {
        var model = this.graph.getModel();
        var geometry = model.getGeometry(edgeState.cell);

        if (geometry != null) {
            var pointCount = edgeState.absolutePoints.length;

            if (geometry.relative && pointCount > 1) {
                var totalLength = edgeState.length;
                var segments = edgeState.segments;

                // Works which line segment the point of the label is closest to
                var p0 = edgeState.absolutePoints[0];
                var pe = edgeState.absolutePoints[1];
                var minDist = utils.ptSegDistSq(p0.x, p0.y, pe.x, pe.y, x, y);

                var index = 0;
                var tmp = 0;
                var length = 0;

                for (var i = 2; i < pointCount; i++) {
                    tmp += segments[i - 2];
                    pe = edgeState.absolutePoints[i];
                    var dist = utils.ptSegDistSq(p0.x, p0.y, pe.x, pe.y, x, y);

                    if (dist <= minDist) {
                        minDist = dist;
                        index = i - 1;
                        length = tmp;
                    }

                    p0 = pe;
                }

                var seg = segments[index];
                p0 = edgeState.absolutePoints[index];
                pe = edgeState.absolutePoints[index + 1];

                var x2 = p0.x;
                var y2 = p0.y;

                var x1 = pe.x;
                var y1 = pe.y;

                var px = x;
                var py = y;

                var xSegment = x2 - x1;
                var ySegment = y2 - y1;

                px -= x1;
                py -= y1;
                var projlenSq = 0;

                px = xSegment - px;
                py = ySegment - py;
                var dotprod = px * xSegment + py * ySegment;

                if (dotprod <= 0.0) {
                    projlenSq = 0;
                }
                else {
                    projlenSq = dotprod * dotprod
                        / (xSegment * xSegment + ySegment * ySegment);
                }

                var projlen = Math.sqrt(projlenSq);

                if (projlen > seg) {
                    projlen = seg;
                }

                var yDistance = Math.sqrt(utils.ptSegDistSq(p0.x, p0.y, pe
                    .x, pe.y, x, y));
                var direction = utils.relativeCcw(p0.x, p0.y, pe.x, pe.y, x, y);

                if (direction == -1) {
                    yDistance = -yDistance;
                }

                // Constructs the relative point for the label
                return new Point(((totalLength / 2 - length - projlen) / totalLength) * -2,
                    yDistance / this.scale);
            }
        }

        return new Point();
    },
    updateEdgeLabelOffset: function (state) {
        var points = state.absolutePoints;

        state.absoluteOffset.x = state.getCenterX();
        state.absoluteOffset.y = state.getCenterY();

        if (points != null && points.length > 0 && state.segments != null) {
            var geometry = this.graph.getCellGeometry(state.cell);

            if (geometry.relative) {
                var offset = this.getPoint(state, geometry);

                if (offset != null) {
                    state.absoluteOffset = offset;
                }
            }
            else {
                var p0 = points[0];
                var pe = points[points.length - 1];

                if (p0 != null && pe != null) {
                    var dx = pe.x - p0.x;
                    var dy = pe.y - p0.y;
                    var x0 = 0;
                    var y0 = 0;

                    var off = geometry.offset;

                    if (off != null) {
                        x0 = off.x;
                        y0 = off.y;
                    }

                    var x = p0.x + dx / 2 + x0 * this.scale;
                    var y = p0.y + dy / 2 + y0 * this.scale;

                    state.absoluteOffset.x = x;
                    state.absoluteOffset.y = y;
                }
            }
        }
    },

    getState: function (cell, create) {

        var that = this;
        var state = null;

        if (!cell) {
            return state;
        }

        create = create || false;

        state = that.states.get(cell);

        if (create && (!state || that.updateStyle) && that.graph.isCellVisible(cell)) {
            if (!state) {
                state = that.createState(cell);
                that.states.set(cell, state);
            } else { // updateStyle
                state.style = that.graph.getCellStyle(cell);
            }
        }

        return state;
    },

    createState: function (cell) {
        var state = new CellState(this, cell, this.graph.getCellStyle(cell));
        var model = this.graph.getModel();

        if (state.view.graph.container != null && state.cell != state.view.currentRoot &&
            (model.isVertex(state.cell) || model.isEdge(state.cell))) {
            // 根据 state 中的样式，初始化 state 对应的 shape
            this.graph.cellRenderer.createShape(state);
        }

        return state;
    },

    isRendering: function () {
        return this.rendering;
    },

    setRendering: function (value) {
        this.rendering = value;
    },

    isAllowEval: function () {
        return this.allowEval;
    },

    setAllowEval: function (value) {
        this.allowEval = value;
    },

    getStates: function () {
        return this.states;
    },

    setStates: function (value) {
        this.states = value;
    },

    getCellStates: function (cells) {
        if (isNullOrUndefined(cells)) {
            return this.states;
        } else {
            var result = [];

            for (var i = 0; i < cells.length; i++) {
                var state = this.getState(cells[i]);

                if (state != null) {
                    result.push(state);
                }
            }

            return result;
        }
    },

    removeState: function (cell) {

        var state = null;

        if (cell != null) {
            state = this.states.remove(cell);

            if (state != null) {
                this.graph.cellRenderer.destroy(state);
                state.destroy();
            }
        }

        return state;
    },

    getCanvas: function () {
        return this.canvas;
    },

    getBackgroundPane: function () {
        return this.backgroundPane;
    },

    getDrawPane: function () {
        return this.drawPane;
    },

    getOverlayPane: function () {
        return this.overlayPane;
    },

    getDecoratorPane: function () {
        return this.decoratorPane;
    },

    isScrollEvent: function (evt) {
        var that = this;
        var container = that.graph.container;

        var offset = utils.getOffset(container);
        var pt = new Point(evt.clientX - offset.left, evt.clientY - offset.top);

        var outWidth = container.offsetWidth;
        var inWidth = container.clientWidth;

        if (outWidth > inWidth && pt.x > inWidth + 2 && pt.x <= outWidth) {
            return true;
        }

        var outHeight = container.offsetHeight;
        var inHeight = container.clientHeight;

        return outHeight > inHeight && pt.y > inHeight + 2 && pt.y <= outHeight;
    },

    isContainerEvent: function (evt) {
        var that = this;
        var source = domEvent.getSource(evt);

        return (source === that.graph.container ||
        source.parentNode == that.backgroundPane ||
        (source.parentNode && source.parentNode.parentNode === that.backgroundPane) ||
        source === that.canvas.parentNode ||
        source === that.canvas ||
        source === that.backgroundPane ||
        source === that.drawPane ||
        source === that.overlayPane ||
        source === that.decoratorPane);
    },

    installListeners: function () {

        var that = this;
        var graph = that.graph;
        var container = graph.container;

        if (container) {

            // Support for touch device gestures (eg. pinch to zoom)
            // Double-tap handling is implemented in graph.fireMouseEvent
            if (detector.IS_TOUCH) {

                var handler = function (evt) {
                    graph.fireGestureEvent(evt);
                    domEvent.consume(evt);
                };

                domEvent.on(container, 'gesturestart', handler);
                domEvent.on(container, 'gesturechange', handler);
                domEvent.on(container, 'gestureend', handler);
            }

            domEvent.onGesture(container,
                function (evt) {
                    // Condition to avoid scrollbar events starting a rubberband selection
                    if (that.isContainerEvent(evt) &&
                        ((!detector.IS_IE && !detector.IS_IE11 && !detector.IS_GC && !detector.IS_OP && !detector.IS_SF) || !that.isScrollEvent(evt))) {
                        graph.fireMouseEvent(eventNames.MOUSE_DOWN, new MouseEvent(evt));
                    }
                },
                function (evt) {
                    that.isContainerEvent(evt) && graph.fireMouseEvent(eventNames.MOUSE_MOVE, new MouseEvent(evt));
                },
                function (evt) {
                    that.isContainerEvent(evt) && graph.fireMouseEvent(eventNames.MOUSE_UP, new MouseEvent(evt));
                });

            // double click
            domEvent.on(container, 'dblclick', function (evt) {
                if (that.isContainerEvent(evt)) {
                    graph.dblClick(evt);
                }
            });


        }


        return that;
    },

    createSvg: function () {

        var view = this;

        view.canvas = document.createElementNS(constants.NS_SVG, 'g');

        view.backgroundPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.backgroundPane);

        view.drawPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.drawPane);

        view.overlayPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.overlayPane);

        view.decoratorPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.decoratorPane);

        var root = document.createElementNS(constants.NS_SVG, 'svg');
        root.style.width = '100%';
        root.style.height = '100%';

        // NOTE: In standards mode, the SVG must have block layout
        // in order for the container DIV to not show scrollbars.
        root.style.display = 'block';
        root.appendChild(view.canvas);


        var container = view.graph.container;

        if (container !== null) {
            container.appendChild(root);
            view.updateContainerStyle(container);
        }

        return this;
    },

    // 更新容器的样式
    updateContainerStyle: function (container) {},

    destroy: function () {}
});


},{"./CellState":5,"./Point":10,"./Rectangle":11,"./common/Dictionary":22,"./common/class":23,"./common/detector":24,"./common/utils":26,"./constants":27,"./events/Event":29,"./events/MouseEvent":32,"./events/domEvent":33,"./events/eventNames":34}],15:[function(require,module,exports){

var cellPath = {

    PATH_SEPARATOR: '.',

    create: function (cell) {
        var result = '';

        if (cell !== null) {
            var parent = cell.getParent();

            while (parent !== null) {
                var index = parent.getIndex(cell);
                result = index + mxCellPath.PATH_SEPARATOR + result;

                cell = parent;
                parent = cell.getParent();
            }
        }

        // Removes trailing separator
        var n = result.length;

        if (n > 1) {
            result = result.substring(0, n - 1);
        }

        return result;
    },

    getParentPath: function (path) {
        if (path !== null) {
            var index = path.lastIndexOf(mxCellPath.PATH_SEPARATOR);

            if (index >= 0) {
                return path.substring(0, index);
            }
            else if (path.length > 0) {
                return '';
            }
        }

        return null;
    },

    resolve: function (root, path) {
        var parent = root;

        if (path !== null) {
            var tokens = path.split(mxCellPath.PATH_SEPARATOR);

            for (var i = 0; i < tokens.length; i++) {
                parent = parent.getChildAt(parseInt(tokens[i]));
            }
        }

        return parent;
    },

    compare: function (p1, p2) {
        var min = Math.min(p1.length, p2.length);
        var comp = 0;

        for (var i = 0; i < min; i++) {
            if (p1[i] !== p2[i]) {
                if (p1[i].length === 0 ||
                    p2[i].length === 0) {
                    comp = (p1[i] === p2[i]) ? 0 : ((p1[i] > p2[i]) ? 1 : -1);
                }
                else {
                    var t1 = parseInt(p1[i]);
                    var t2 = parseInt(p2[i]);

                    comp = (t1 === t2) ? 0 : ((t1 > t2) ? 1 : -1);
                }

                break;
            }
        }

        // Compares path length if both paths are equal to this point
        if (comp === 0) {
            var t11 = p1.length;
            var t21 = p2.length;

            if (t11 !== t21) {
                comp = (t11 > t21) ? 1 : -1;
            }
        }

        return comp;
    }
};

module.exports = cellPath;


},{}],16:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');

module.exports = Class.create({

    constructor: function Change(model) {
        this.model = model;
    },

    digest: function () { }
});


},{"../common/class":23}],17:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Change = require('./Change');
var utils = require('../common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Change.extend({

    constructor: function ChildChange(model, parent, child, index) {

        var change = this;

        ChildChange.superclass.constructor.call(change, model);

        change.parent = parent;
        change.child = child;
        change.index = index;
        change.previous = parent;
        change.previousIndex = index;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var child = change.child;
        var previous = change.previous;
        var previousIndex = change.previousIndex;

        var oldParent = model.getParent(child);
        var oldIndex = oldParent ? oldParent.getIndex(child) : 0;

        if (previous) {
            change.connect(child, false);
        }

        oldParent = model.parentForCellChanged(child, previous, previousIndex);

        if (previous) {
            change.connect(child, true);
        }

        change.parent = previous;
        change.index = previousIndex;
        change.previous = oldParent;
        change.previousIndex = oldIndex;

        return change;
    },

    connect: function (cell, isConnect) {

        var change = this;
        var model = change.model;

        isConnect = isNullOrUndefined(isConnect) ? true : isConnect;

        var source = cell.getTerminal(true);
        var target = cell.getTerminal(false);

        if (source) {
            if (isConnect) {
                model.terminalForCellChanged(cell, source, true);
            }
            else {
                model.terminalForCellChanged(cell, null, true);
            }
        }

        if (target) {
            if (isConnect) {
                model.terminalForCellChanged(cell, target, false);
            }
            else {
                model.terminalForCellChanged(cell, null, false);
            }
        }

        cell.setTerminal(source, true);
        cell.setTerminal(target, false);

        var childCount = model.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            change.connect(model.getChildAt(cell, i), isConnect);
        }

        return change;
    }
});

},{"../common/utils":26,"./Change":16}],18:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Change = require('./Change');

module.exports = Change.extend({

    constructor: function RootChange(model, cell, geometry) {
        var change = this;

        Change.call(change, model);

        change.cell = cell;
        change.geometry = geometry;
        change.previous = geometry;
    },

    digest: function () {
        var change = this;
        change.geometry = change.previous;
        change.previous = change.model.geometryForCellChanged(
            change.cell, change.previous);
        return change;
    }
});


},{"./Change":16}],19:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Change = require('./Change');

module.exports = Change.extend({

    constructor: function RootChange(model, root) {

        var change = this;

        Change.call(change, model);

        change.root = root;
        change.previous = root;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var previous = change.previous;

        change.root = previous;
        change.previous = model.rootChanged(previous);

        return change;
    }
});


},{"./Change":16}],20:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');

module.exports = Class.create({
    constructor: function StyleChange(model, cell, style) {
        this.model = model;
        this.cell = cell;
        this.style = style;
        this.previous = style;
    },

    digest: function () {
        this.style = this.previous;
        this.previous = this.model.styleForCellChanged(
            this.cell, this.previous);
    },
});



},{"../common/class":23}],21:[function(require,module,exports){
var Change = require('./Change');
var utils = require('../common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Change.extend({

    constructor: function TerminalChange(model, cell, terminal, source) {

        var that = this;

        TerminalChange.superclass.constructor.call(that, model);

        that.cell = cell;
        that.terminal = terminal;
        that.previous = terminal;
        that.source = source;

    },

    digest: function () {

        this.terminal = this.previous;
        this.previous = this.model.terminalForCellChanged(this.cell, this.previous, this.source);
    }
});

},{"../common/utils":26,"./Change":16}],22:[function(require,module,exports){
'use strict';

var Class = require('./class');
var utils = require('./utils');
var objectIdentity = require('./objectIdentity');

var isObject = utils.isObject;
var keys = utils.keys;
var each = utils.each;

function getId(key) {

    if (isObject(key)) {
        return objectIdentity.get(key);
    }

    return '' + key;
}

module.exports = Class.create({

    constructor: function Dictionary() {
        return this.clear();
    },

    clear: function () {
        var dic = this;

        dic.map = {};

        return dic;
    },

    get: function (key) {
        var id = getId(key);
        return this.map[id];
    },

    set: function (key, value) {

        var map = this.map;
        var id = getId(key);
        var previous = map[id];

        map[id] = value;

        return previous;
    },

    remove: function (key) {

        var map = this.map;
        var id = getId(key);
        var previous = map[id];

        delete map[id];

        return previous;
    },

    getKeys: function () {
        return keys(this.map);
    },

    getValues: function () {

        var result = [];

        each(this.map, function (value) {
            result.push(value);
        });

        return result;
    },

    visit: function (visitor) {

        var dic = this;

        each(dic.map, visitor);

        return dic;
    }
});

},{"./class":23,"./objectIdentity":25,"./utils":26}],23:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
// ref: https://github.com/aralejs/class
/*jshint -W030 */

var utils = require('./utils');

var each = utils.each;
var hasKey = utils.hasKey;
var isArray = utils.isArray;
var isFunction = utils.isFunction;

function Class(o) {
    // Convert existed function to Class.
    if (!(this instanceof Class) && isFunction(o)) {
        return classify(o);
    }
}

Class.create = function (parent, properties) {
    if (!isFunction(parent)) {
        properties = parent;
        parent = null;
    }

    properties || (properties = {});
    parent || (parent = properties.Extends || Class);
    properties.Extends = parent;

    // The created class constructor.
    //function SubClass() {
    //    // Call the parent constructor.
    //    parent.apply(this, arguments);
    //
    //    // Only call initialize in self constructor.
    //    if (this.constructor === SubClass && this.initialize) {
    //        this.initialize.apply(this, arguments);
    //    }
    //}

    var SubClass = properties.constructor;
    // unspecified constructor
    if (SubClass === Object.prototype.constructor) {
        SubClass = function Class() {};
    }

    // Inherit class (static) properties from parent.
    if (parent !== Class) {
        mix(SubClass, parent, parent.StaticsWhiteList);
    }

    // Add instance properties to the subclass.
    implement.call(SubClass, properties);

    // Make subclass extendable.
    return classify(SubClass);
};

// Create a sub Class based on `Class`.
Class.extend = function (properties) {
    properties || (properties = {});
    properties.Extends = this;

    return Class.create(properties);
};

// define special properties.
Class.Mutators = {

    'Extends': function (parent) {
        var existed = this.prototype;
        var parentProto = parent.prototype;
        var proto = createProto(parentProto);

        // Keep existed properties.
        mix(proto, existed);

        // Enforce the constructor to be what we expect.
        proto.constructor = this;

        // Set the prototype chain to inherit from `parent`.
        this.prototype = proto;

        // Set a convenience property in case the parent's prototype is
        // needed later.
        this.superclass = parentProto;
    },

    'Implements': function (items) {

        if (!isArray(items)) {
            items = [items];
        }

        var proto = this.prototype;
        var item;

        while (item = items.shift()) {
            mix(proto, item.prototype || item);
        }
    },

    'Statics': function (staticProperties) {
        mix(this, staticProperties);
    }
};

function classify(cls) {
    cls.extend = Class.extend;
    cls.implement = implement;
    return cls;
}

function implement(properties) {

    var that = this;
    var mutators = Class.Mutators;

    each(properties, function (value, key) {
        if (hasKey(mutators, key)) {
            mutators[key].call(that, value);
        } else {
            that.prototype[key] = value;
        }
    });
}


// Helpers
// -------

var createProto = Object.__proto__ ?
    function (proto) {
        return {__proto__: proto};
    } :
    function (proto) {
        function Ctor() {}

        Ctor.prototype = proto;
        return new Ctor();
    };

function mix(receiver, supplier, whiteList) {

    each(supplier, function (value, key) {
        if (whiteList && indexOf(whiteList, key) === -1) {
            return;
        }

        receiver[key] = value;
    });
}

module.exports = Class;


},{"./utils":26}],24:[function(require,module,exports){

var ua = navigator.userAgent;
var av = navigator.appVersion;

module.exports = {
    // IE
    IS_IE: ua.indexOf('MSIE') >= 0,

    IS_QUIRKS: navigator.userAgent.indexOf('MSIE') >= 0 && (document.documentMode === null || document.documentMode === 5),

    IS_IE11: !!ua.match(/Trident\/7\./),

    // Netscape
    IS_NS: ua.indexOf('Mozilla/') >= 0 && ua.indexOf('MSIE') < 0,

    // Firefox
    IS_FF: ua.indexOf('Firefox/') >= 0,

    // Chrome
    IS_GC: ua.indexOf('Chrome/') >= 0,

    // Safari
    IS_SF: ua.indexOf('AppleWebKit/') >= 0 && ua.indexOf('Chrome/') < 0,

    // Opera
    IS_OP: ua.indexOf('Opera/') >= 0,

    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),

    IS_WIN: av.indexOf('Win') > 0,

    IS_MAC: av.indexOf('Mac') > 0,

    IS_TOUCH: 'ontouchstart' in document.documentElement,

    IS_POINTER: window.navigator.msPointerEnabled || false,

    IS_OT: navigator.userAgent.indexOf('Presto/2.4.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.3.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.2.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.1.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.0.') < 0 &&
    navigator.userAgent.indexOf('Presto/1.') < 0,

    /**
     * Variable: IS_MT
     *
     * True if -moz-transform is available as a CSS style. This is the case
     * for all Firefox-based browsers newer than or equal 3, such as Camino,
     * Iceweasel, Seamonkey and Iceape.
     */
    IS_MT: (navigator.userAgent.indexOf('Firefox/') >= 0 &&
    navigator.userAgent.indexOf('Firefox/1.') < 0 &&
    navigator.userAgent.indexOf('Firefox/2.') < 0) ||
    (navigator.userAgent.indexOf('Iceweasel/') >= 0 &&
    navigator.userAgent.indexOf('Iceweasel/1.') < 0 &&
    navigator.userAgent.indexOf('Iceweasel/2.') < 0) ||
    (navigator.userAgent.indexOf('SeaMonkey/') >= 0 &&
    navigator.userAgent.indexOf('SeaMonkey/1.') < 0) ||
    (navigator.userAgent.indexOf('Iceape/') >= 0 &&
    navigator.userAgent.indexOf('Iceape/1.') < 0),

};


},{}],25:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global window */

var utils = require('./utils');

var isObject = utils.isObject;
var isNullOrUndefined = utils.isNullOrUndefined;
var getFunctionName = utils.getFunctionName;

// TODO: constants
var FIELD_NAME = 'objectId';
var counter = 0;


exports.get = function (obj) {

    var isObj = isObject(obj);

    if (isObj && isNullOrUndefined(obj[FIELD_NAME])) {
        var ctorName = getFunctionName(obj.constructor);
        obj[FIELD_NAME] = ctorName + '#' + counter++;
    }

    return isObj ? obj[FIELD_NAME] : '' + obj;
};

exports.clear = function (obj) {
    if (isObject(obj)) {
        delete obj[FIELD_NAME];
    }
};

},{"./utils":26}],26:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global window, document */

var detector = require('./detector');

var utils = {};

var arrProto = Array.prototype;
var objProto = Object.prototype;
var slice = arrProto.slice;
var toString = objProto.toString;
var hasOwn = objProto.hasOwnProperty;

//var Point = require('../Point');
//var Rectangle = require('../Rectangle');
//var constants = require('../constants');


// Lang
// ----

function isType(obj, type) {
    return toString.call(obj) === '[object ' + type + ']';
}

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

function isFunction(obj) {
    return isType(obj, 'Function');
}

function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return typeof obj === 'undefined';
}

function isNullOrUndefined(obj) {
    return isUndefined(obj) || isNull(obj);
}

function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

var isArray = Array.isArray || function (obj) {
        return isType(obj, 'Array');
    };

function isArrayLike(obj) {
    if (isArray(obj)) {
        return true;
    }

    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    var length = !!obj && 'length' in obj && obj.length;

    return length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isNumeric(obj) {
    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}

utils.isType = isType;
utils.isNull = isNull;
utils.isArray = isArray;
utils.isObject = isObject;
utils.isWindow = isWindow;
utils.isNumeric = isNumeric;
utils.isFunction = isFunction;
utils.isUndefined = isUndefined;
utils.isArrayLike = isArrayLike;
utils.isNullOrUndefined = isNullOrUndefined;

// String
// ------

utils.toString = function (str) {
    return '' + str;
};

utils.lcFirst = function (str) {
    str = str + '';
    return str.charAt(0).toLowerCase() + str.substr(1);
};

utils.ucFirst = function (str) {
    str = str + '';
    return str.charAt(0).toUpperCase() + str.substr(1);
};

utils.ltrim = function (str, chars) {
    chars = chars || "\\s";

    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
};

utils.rtrim = function (str, chars) {
    chars = chars || "\\s";

    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
};

utils.trim = function (str, chars) {
    return utils.ltrim(utils.rtrim(str, chars), chars);
};

// Number
// ------
utils.toFixed = function (value, precision) {
    var power = Math.pow(10, precision);
    return (Math.round(value * power) / power).toFixed(precision);
};

utils.mod = function (n, m) {
    return ((n % m) + m) % m;
};


// Object
// ------

function hasKey(obj, key) {
    return obj !== null && hasOwn.call(obj, key);
}

function clone(obj, transients, shallow) {

    shallow = (shallow !== null) ? shallow : false;
    var cloned = null;

    if (obj && isFunction(obj.constructor)) {
        cloned = new obj.constructor();

        for (var i in obj) {
            //if (i !== mxObjectIdentity.FIELD_NAME && (!transients || indexOf(transients, i) < 0)) {
            if (i !== 'objectId' && (!transients || utils.indexOf(transients, i) < 0)) {
                if (!shallow && typeof(obj[i]) === 'object') {
                    cloned[i] = clone(obj[i]);
                } else {
                    cloned[i] = obj[i];
                }
            }
        }
    }

    return cloned;
}

utils.keys = Object.keys || function (obj) {

        if (!isObject(obj)) {
            return [];
        }

        var keys = [];
        for (var key in obj) {
            if (hasKey(obj, key)) {
                keys.push(key);
            }
        }

        // ie < 9 不考虑
    };

utils.hasKey = hasKey;
utils.clone = clone;

utils.getValue = function (obj, key, defaultValue) {
    var value = obj ? obj[key] : null;

    if (isNullOrUndefined(value)) {
        value = defaultValue;
    }

    return value;
};

utils.getNumber = function (obj, key, defaultValue) {
    var value = obj ? obj[key] : null;

    if (isNullOrUndefined(value)) {
        value = defaultValue || 0;
    }

    return Number(value);
};

utils.extend = function (dist) {
    each(slice.call(arguments, 1), function (source) {
        if (source) {
            for (var prop in source) {
                dist[prop] = source[prop];
            }
        }
    });
    return dist;
};

utils.equalEntries = function (a, b) {
    if ((a === null && b !== null) || (a !== null && b === null) ||
        (a !== null && b !== null && a.length !== b.length)) {
        return false;
    }
    else if (a && b) {
        for (var key in a) {
            if ((!isNaN(a[key]) || !isNaN(b[key])) && a[key] !== b[key]) {
                return false;
            }
        }
    }

    return true;
};

// Array
// -----

utils.indexOf = arrProto.indexOf ?
    function (arr, item) {
        return arr.indexOf(item);
    } :
    function (arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

// TODO: 改为 forIn 和 each 两个方法
var each = utils.each = function (list, iteratee, context) {
    var i;

    if (isArrayLike(list)) {
        var length = list.length;
        for (i = 0; i < length; i++) {
            iteratee.call(context, list[i], i, list);
        }
    } else {
        for (i in list) {
            if (hasKey(list, i)) {
                iteratee.call(context, list[i], i, list);
            }
        }
    }

    return list;
};

utils.toArray = function (obj) {
    return isArrayLike(obj) ? slice.call(obj) : [];
};


// Function
// --------

utils.invoke = function (method, args, context) {
    if (!method || !isFunction(method)) {
        return;
    }

    args = isArray(args) ? args : args ? [args] : [];

    var ret;
    var a1 = args[0];
    var a2 = args[1];
    var a3 = args[2];

    // call is faster than apply, optimize less than 3 argu
    // http://blog.csdn.net/zhengyinhui100/article/details/7837127
    switch (args.length) {
        case 0:
            ret = method.call(context);
            break;
        case 1:
            ret = method.call(context, a1);
            break;
        case 2:
            ret = method.call(context, a1, a2);
            break;
        case 3:
            ret = method.call(context, a1, a2, a3);
            break;
        default:
            ret = method.apply(context, args);
            break;
    }

    return ret;
};

utils.getFunctionName = function (fn) {
    var str = '';

    if (!isNullOrUndefined(fn)) {
        if (!isNullOrUndefined(fn.name)) {
            str = fn.name;
        } else {

            var tmp = fn.toString();
            var idx1 = 9;

            while (tmp.charAt(idx1) === ' ') {
                idx1++;
            }

            var idx2 = tmp.indexOf('(', idx1);
            str = tmp.substring(idx1, idx2);
        }
    }

    return str;
};

/**
 * Function: bind
 *
 * Returns a wrapper function that locks the execution scope of the given
 * function to the specified scope. Inside funct, the "this" keyword
 * becomes a reference to that scope.
 */
utils.bind = function(scope, funct) {
    return function () {
        return funct.apply(scope, arguments);
    };
};

// BOW
// ---
utils.isNode = function (node, nodeName, attributeName, attributeValue) {

    var ret = node && !isNaN(node.nodeType);

    if (ret) {
        ret = isNullOrUndefined(nodeName) || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }

    if (ret) {
        ret = isNullOrUndefined(attributeName) || node.getAttribute(attributeName) === attributeValue;
    }

    return ret;
};

utils.getOffset = function (container, scrollOffset) {
    var offsetLeft = 0;
    var offsetTop = 0;

    if (scrollOffset !== null && scrollOffset) {
        var offset = utils.getDocumentScrollOrigin(container.ownerDocument);
        offsetLeft += offset.left;
        offsetTop += offset.top;
    }

    while (container.offsetParent) {
        offsetLeft += container.offsetLeft;
        offsetTop += container.offsetTop;

        container = container.offsetParent;
    }

    return {
        left: offsetLeft,
        top: offsetTop
    };
};

utils.getDocumentScrollOrigin = function (doc) {
    var wnd = doc.defaultView || doc.parentWindow;

    var x = (wnd && window.pageXOffset !== undefined) ?
        window.pageXOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollLeft;

    var y = (wnd && window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollTop;

    return {
        left: x,
        top: y
    };
};

utils.getScrollOrigin = function (node) {
    var b = document.body;
    var d = document.documentElement;
    var result = utils.getDocumentScrollOrigin(node ? node.ownerDocument : document);

    while (node && node !== b && node !== d) {
        if (!isNaN(node.scrollLeft) && !isNaN(node.scrollTop)) {
            result.left += node.scrollLeft;
            result.top += node.scrollTop;
        }

        node = node.parentNode;
    }

    return result;
};

utils.createSvgGroup = function () {};

utils.write = function (parent, text) {

    var node = null;

    if (parent) {
        var doc = parent.ownerDocument;

        node = doc.createTextNode(text);
        parent.appendChild(node);
    }

    return node;
};

//
utils.getBaseUrl = function () {
    var href = window.location.href;
    var hash = href.lastIndexOf('#');

    if (hash > 0) {
        href = href.substring(0, hash);
    }

    return href;
};

utils.toRadians = function (deg) {
    return Math.PI * deg / 180;
};

utils.setCellStyles = function (model, cells, key, value) {
    if (cells && cells.length) {
        model.beginUpdate();
        try {
            for (var i = 0; i < cells.length; i++) {
                if (cells[i] !== null) {
                    var style = utils.setStyle(model.getStyle(cells[i]), key, value);
                    model.setStyle(cells[i], style);
                }
            }
        }
        finally {
            model.endUpdate();
        }
    }
};

utils.setStyle = function (style, key, value) {
    var isValue = value != null && (typeof(value.length) == 'undefined' || value.length > 0);

    if (style == null || style.length == 0) {
        if (isValue) {
            style = key + '=' + value;
        }
    }
    else {
        var index = style.indexOf(key + '=');

        if (index < 0) {
            if (isValue) {
                var sep = (style.charAt(style.length - 1) === ';') ? '' : ';';
                style = style + sep + key + '=' + value;
            }
        }
        else {
            var tmp = (isValue) ? (key + '=' + value) : '';
            var cont = style.indexOf(';', index);

            if (!isValue) {
                cont++;
            }

            style = style.substring(0, index) + tmp +
                ((cont > index) ? style.substring(cont) : '');
        }
    }

    return style;
};

utils.setPrefixedStyle = function () {
    var prefix = null;

    if (detector.IS_OP && detector.IS_OT) {
        prefix = 'O';
    }
    else if (detector.IS_SF || detector.IS_GC) {
        prefix = 'Webkit';
    }
    else if (detector.IS_MT) {
        prefix = 'Moz';
    }
    else if (detector.IS_IE && document.documentMode >= 9 && document.documentMode < 10) {
        prefix = 'ms';
    }

    return function (style, name, value) {
        style[name] = value;

        if (prefix !== null && name.length > 0) {
            name = prefix + name.substring(0, 1).toUpperCase() + name.substring(1);
            style[name] = value;
        }
    };
}();

module.exports = utils;


},{"./detector":24}],27:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
//var Rectangle = require('./Rectangle');

module.exports = {
    //----------------------
    EVENT_SPLITTER: /\s+/,
    OBJECT_ID: 'objectId',
    //----------------------


    DEFAULT_HOTSPOT: 0.3,
    MIN_HOTSPOT_SIZE: 8,
    MAX_HOTSPOT_SIZE: 0,

    RENDERING_HINT_EXACT: 'exact',
    RENDERING_HINT_FASTER: 'faster',
    RENDERING_HINT_FASTEST: 'fastest',

    DIALECT_SVG: 'svg',
    DIALECT_VML: 'vml',
    DIALECT_MIXEDHTML: 'mixedHtml',
    DIALECT_PREFERHTML: 'preferHtml',
    DIALECT_STRICTHTML: 'strictHtml',

    NS_SVG: 'http://www.w3.org/2000/svg',
    NS_XHTML: 'http://www.w3.org/1999/xhtml',
    NS_XLINK: 'http://www.w3.org/1999/xlink',

    SHADOW_COLOR: 'gray',
    SHADOWCOLOR: 'gray',
    SHADOW_OFFSET_X: 2,
    SHADOW_OFFSET_Y: 3,
    SHADOW_OPACITY: 1,

    NODETYPE_ELEMENT: 1,
    NODETYPE_ATTRIBUTE: 2,
    NODETYPE_TEXT: 3,
    NODETYPE_CDATA: 4,
    NODETYPE_ENTITY_REFERENCE: 5,
    NODETYPE_ENTITY: 6,
    NODETYPE_PROCESSING_INSTRUCTION: 7,
    NODETYPE_COMMENT: 8,
    NODETYPE_DOCUMENT: 9,
    NODETYPE_DOCUMENTTYPE: 10,
    NODETYPE_DOCUMENT_FRAGMENT: 11,
    NODETYPE_NOTATION: 12,

    TOOLTIP_VERTICAL_OFFSET: 16,

    DEFAULT_VALID_COLOR: '#00FF00',
    DEFAULT_INVALID_COLOR: '#FF0000',
    OUTLINE_HIGHLIGHT_COLOR: '#00FF00',
    OUTLINE_HIGHLIGHT_STROKEWIDTH: 5,
    HIGHLIGHT_STROKEWIDTH: 3,

    CURSOR_MOVABLE_VERTEX: 'move',
    CURSOR_MOVABLE_EDGE: 'move',
    CURSOR_LABEL_HANDLE: 'default',
    CURSOR_TERMINAL_HANDLE: 'pointer',
    CURSOR_BEND_HANDLE: 'crosshair',
    CURSOR_VIRTUAL_BEND_HANDLE: 'crosshair',
    CURSOR_CONNECT: 'pointer',

    HIGHLIGHT_COLOR: '#00FF00',
    CONNECT_TARGET_COLOR: '#0000FF',
    INVALID_CONNECT_TARGET_COLOR: '#FF0000',
    DROP_TARGET_COLOR: '#0000FF',
    VALID_COLOR: '#00FF00',
    INVALID_COLOR: '#FF0000',
    EDGE_SELECTION_COLOR: '#00FF00',
    VERTEX_SELECTION_COLOR: '#00FF00',

    VERTEX_SELECTION_STROKEWIDTH: 1,
    EDGE_SELECTION_STROKEWIDTH: 1,
    VERTEX_SELECTION_DASHED: true,
    EDGE_SELECTION_DASHED: true,
    GUIDE_COLOR: '#FF0000',
    GUIDE_STROKEWIDTH: 1,
    OUTLINE_COLOR: '#0099FF',
    OUTLINE_STROKEWIDTH: 3,//(mxClient.IS_IE) ? 2 : 3,
    HANDLE_SIZE: 7,
    LABEL_HANDLE_SIZE: 4,
    HANDLE_FILLCOLOR: '#00FF00',
    HANDLE_STROKECOLOR: 'black',
    LABEL_HANDLE_FILLCOLOR: 'yellow',
    CONNECT_HANDLE_FILLCOLOR: '#0000FF',
    LOCKED_HANDLE_FILLCOLOR: '#FF0000',
    OUTLINE_HANDLE_FILLCOLOR: '#00FFFF',
    OUTLINE_HANDLE_STROKECOLOR: '#0033FF',

    //--------------------------------------
    DEFAULT_FONT_FAMILY: 'Arial,Helvetica',
    DEFAULT_FONTFAMILY: 'Arial,Helvetica',
    DEFAULT_FONT_SIZE: 11,
    DEFAULT_FONTSIZE: 11,
    //--------------------------------------

    LINE_HEIGHT: 1.2,
    ABSOLUTE_LINE_HEIGHT: false,
    DEFAULT_FONTSTYLE: 0,
    DEFAULT_STARTSIZE: 40,
    DEFAULT_MARKERSIZE: 6,
    DEFAULT_IMAGESIZE: 24,
    ENTITY_SEGMENT: 30,
    RECTANGLE_ROUNDING_FACTOR: 0.15,
    LINE_ARCSIZE: 20,
    ARROW_SPACING: 10,
    ARROW_WIDTH: 30,
    ARROW_SIZE: 30,

    NONE: 'none',


    STYLE_PERIMETER: 'perimeter',
    STYLE_SOURCE_PORT: 'sourcePort',
    STYLE_TARGET_PORT: 'targetPort',
    STYLE_PORT_CONSTRAINT: 'portConstraint',
    STYLE_PORT_CONSTRAINT_ROTATION: 'portConstraintRotation',
    STYLE_OPACITY: 'opacity',
    STYLE_TEXT_OPACITY: 'textOpacity',
    STYLE_OVERFLOW: 'overflow',
    STYLE_ORTHOGONAL: 'orthogonal',
    STYLE_EXIT_X: 'exitX',
    STYLE_EXIT_Y: 'exitY',
    STYLE_EXIT_PERIMETER: 'exitPerimeter',
    STYLE_ENTRY_X: 'entryX',
    STYLE_ENTRY_Y: 'entryY',
    STYLE_ENTRY_PERIMETER: 'entryPerimeter',
    STYLE_WHITE_SPACE: 'whiteSpace',
    STYLE_ROTATION: 'rotation',
    STYLE_FILLCOLOR: 'fillColor',
    STYLE_SWIMLANE_FILLCOLOR: 'swimlaneFillColor',
    STYLE_MARGIN: 'margin',
    STYLE_GRADIENTCOLOR: 'gradientColor',
    STYLE_GRADIENT_DIRECTION: 'gradientDirection',
    STYLE_STROKECOLOR: 'strokeColor',
    STYLE_SEPARATORCOLOR: 'separatorColor',
    STYLE_STROKEWIDTH: 'strokeWidth',
    STYLE_ALIGN: 'align',
    STYLE_VERTICAL_ALIGN: 'verticalAlign',
    STYLE_LABEL_WIDTH: 'labelWidth',
    STYLE_LABEL_POSITION: 'labelPosition',
    STYLE_VERTICAL_LABEL_POSITION: 'verticalLabelPosition',
    STYLE_IMAGE_ASPECT: 'imageAspect',
    STYLE_IMAGE_ALIGN: 'imageAlign',
    STYLE_IMAGE_VERTICAL_ALIGN: 'imageVerticalAlign',
    STYLE_GLASS: 'glass',
    STYLE_IMAGE: 'image',
    STYLE_IMAGE_WIDTH: 'imageWidth',
    STYLE_IMAGE_HEIGHT: 'imageHeight',
    STYLE_IMAGE_BACKGROUND: 'imageBackground',
    STYLE_IMAGE_BORDER: 'imageBorder',
    STYLE_FLIPH: 'flipH',
    STYLE_FLIPV: 'flipV',
    STYLE_NOLABEL: 'noLabel',
    STYLE_NOEDGESTYLE: 'noEdgeStyle',
    STYLE_LABEL_BACKGROUNDCOLOR: 'labelBackgroundColor',
    STYLE_LABEL_BORDERCOLOR: 'labelBorderColor',
    STYLE_LABEL_PADDING: 'labelPadding',
    STYLE_INDICATOR_SHAPE: 'indicatorShape',
    STYLE_INDICATOR_IMAGE: 'indicatorImage',
    STYLE_INDICATOR_COLOR: 'indicatorColor',
    STYLE_INDICATOR_STROKECOLOR: 'indicatorStrokeColor',
    STYLE_INDICATOR_GRADIENTCOLOR: 'indicatorGradientColor',
    STYLE_INDICATOR_SPACING: 'indicatorSpacing',
    STYLE_INDICATOR_WIDTH: 'indicatorWidth',
    STYLE_INDICATOR_HEIGHT: 'indicatorHeight',
    STYLE_INDICATOR_DIRECTION: 'indicatorDirection',
    STYLE_SHADOW: 'shadow',
    STYLE_SEGMENT: 'segment',
    STYLE_ENDARROW: 'endArrow',
    STYLE_STARTARROW: 'startArrow',
    STYLE_ENDSIZE: 'endSize',
    STYLE_STARTSIZE: 'startSize',
    STYLE_SWIMLANE_LINE: 'swimlaneLine',
    STYLE_ENDFILL: 'endFill',
    STYLE_STARTFILL: 'startFill',
    STYLE_DASHED: 'dashed',
    STYLE_DASH_PATTERN: 'dashPattern',
    STYLE_ROUNDED: 'rounded',
    STYLE_CURVED: 'curved',
    STYLE_ARCSIZE: 'arcSize',
    STYLE_SMOOTH: 'smooth',
    STYLE_SOURCE_PERIMETER_SPACING: 'sourcePerimeterSpacing',
    STYLE_TARGET_PERIMETER_SPACING: 'targetPerimeterSpacing',
    STYLE_PERIMETER_SPACING: 'perimeterSpacing',
    STYLE_SPACING: 'spacing',
    STYLE_SPACING_TOP: 'spacingTop',
    STYLE_SPACING_LEFT: 'spacingLeft',
    STYLE_SPACING_BOTTOM: 'spacingBottom',
    STYLE_SPACING_RIGHT: 'spacingRight',
    STYLE_HORIZONTAL: 'horizontal',
    STYLE_DIRECTION: 'direction',
    STYLE_ELBOW: 'elbow',
    STYLE_FONTCOLOR: 'fontColor',
    STYLE_FONTFAMILY: 'fontFamily',
    STYLE_FONTSIZE: 'fontSize',
    STYLE_FONTSTYLE: 'fontStyle',
    STYLE_ASPECT: 'aspect',
    STYLE_AUTOSIZE: 'autosize',
    STYLE_FOLDABLE: 'foldable',
    STYLE_EDITABLE: 'editable',
    STYLE_BENDABLE: 'bendable',
    STYLE_MOVABLE: 'movable',
    STYLE_RESIZABLE: 'resizable',
    STYLE_ROTATABLE: 'rotatable',
    STYLE_CLONEABLE: 'cloneable',
    STYLE_DELETABLE: 'deletable',
    STYLE_SHAPE: 'shape',
    STYLE_EDGE: 'edgeStyle',
    STYLE_LOOP: 'loopStyle',
    STYLE_ROUTING_CENTER_X: 'routingCenterX',
    STYLE_ROUTING_CENTER_Y: 'routingCenterY',

    FONT_BOLD: 1,
    FONT_ITALIC: 2,
    FONT_UNDERLINE: 4,
    FONT_SHADOW: 8,

    SHAPE_RECTANGLE: 'rectangle',
    SHAPE_ELLIPSE: 'ellipse',
    SHAPE_DOUBLE_ELLIPSE: 'doubleEllipse',
    SHAPE_RHOMBUS: 'rhombus',
    SHAPE_LINE: 'line',
    SHAPE_IMAGE: 'image',
    SHAPE_ARROW: 'arrow',
    SHAPE_LABEL: 'label',
    SHAPE_CYLINDER: 'cylinder',
    SHAPE_SWIMLANE: 'swimlane',
    SHAPE_CONNECTOR: 'connector',
    SHAPE_ACTOR: 'actor',
    SHAPE_CLOUD: 'cloud',
    SHAPE_TRIANGLE: 'triangle',
    SHAPE_HEXAGON: 'hexagon',

    ARROW_CLASSIC: 'classic',
    ARROW_BLOCK: 'block',
    ARROW_OPEN: 'open',
    ARROW_OVAL: 'oval',
    ARROW_DIAMOND: 'diamond',
    ARROW_DIAMOND_THIN: 'diamondThin',

    ALIGN_LEFT: 'left',
    ALIGN_CENTER: 'center',
    ALIGN_RIGHT: 'right',
    ALIGN_TOP: 'top',
    ALIGN_MIDDLE: 'middle',
    ALIGN_BOTTOM: 'bottom',

    DIRECTION_NORTH: 'north',
    DIRECTION_SOUTH: 'south',
    DIRECTION_EAST: 'east',
    DIRECTION_WEST: 'west',

    DIRECTION_MASK_NONE: 0,
    DIRECTION_MASK_WEST: 1,
    DIRECTION_MASK_NORTH: 2,
    DIRECTION_MASK_SOUTH: 4,
    DIRECTION_MASK_EAST: 8,
    DIRECTION_MASK_ALL: 15,

    ELBOW_VERTICAL: 'vertical',
    ELBOW_HORIZONTAL: 'horizontal',

    EDGESTYLE_ELBOW: 'elbowEdgeStyle',
    EDGESTYLE_ENTITY_RELATION: 'entityRelationEdgeStyle',
    EDGESTYLE_LOOP: 'loopEdgeStyle',
    EDGESTYLE_SIDETOSIDE: 'sideToSideEdgeStyle',
    EDGESTYLE_TOPTOBOTTOM: 'topToBottomEdgeStyle',
    EDGESTYLE_ORTHOGONAL: 'orthogonalEdgeStyle',
    EDGESTYLE_SEGMENT: 'segmentEdgeStyle',
    PERIMETER_ELLIPSE: 'ellipsePerimeter',
    PERIMETER_RECTANGLE: 'rectanglePerimeter',
    PERIMETER_RHOMBUS: 'rhombusPerimeter',
    PERIMETER_HEXAGON: 'hexagonPerimeter',
    PERIMETER_TRIANGLE: 'trianglePerimeter'
};


},{}],28:[function(require,module,exports){
var edgeStyle = {
    EntityRelation: function (state, source, target, points, result) {
        var view = state.view;
        var graph = view.graph;
        var segment = mxUtils.getValue(state.style,
                mxConstants.STYLE_SEGMENT,
                mxConstants.ENTITY_SEGMENT) * view.scale;

        var pts = state.absolutePoints;
        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        var isSourceLeft = false;

        if (p0 != null) {
            source = new mxCellState();
            source.x = p0.x;
            source.y = p0.y;
        }
        else if (source != null) {
            var constraint = mxUtils.getPortConstraints(source, state, true, mxConstants.DIRECTION_MASK_NONE);

            if (constraint != mxConstants.DIRECTION_MASK_NONE) {
                isSourceLeft = constraint == mxConstants.DIRECTION_MASK_WEST;
            }
            else {
                var sourceGeometry = graph.getCellGeometry(source.cell);

                if (sourceGeometry.relative) {
                    isSourceLeft = sourceGeometry.x <= 0.5;
                }
                else if (target != null) {
                    isSourceLeft = target.x + target.width < source.x;
                }
            }
        }
        else {
            return;
        }

        var isTargetLeft = true;

        if (pe != null) {
            target = new mxCellState();
            target.x = pe.x;
            target.y = pe.y;
        }
        else if (target != null) {
            var constraint = mxUtils.getPortConstraints(target, state, false, mxConstants.DIRECTION_MASK_NONE);

            if (constraint != mxConstants.DIRECTION_MASK_NONE) {
                isTargetLeft = constraint == mxConstants.DIRECTION_MASK_WEST;
            }
            else {
                var targetGeometry = graph.getCellGeometry(target.cell);

                if (targetGeometry.relative) {
                    isTargetLeft = targetGeometry.x <= 0.5;
                }
                else if (source != null) {
                    isTargetLeft = source.x + source.width < target.x;
                }
            }
        }

        if (source != null && target != null) {
            var x0 = (isSourceLeft) ? source.x : source.x + source.width;
            var y0 = view.getRoutingCenterY(source);

            var xe = (isTargetLeft) ? target.x : target.x + target.width;
            var ye = view.getRoutingCenterY(target);

            var seg = segment;

            var dx = (isSourceLeft) ? -seg : seg;
            var dep = new mxPoint(x0 + dx, y0);

            dx = (isTargetLeft) ? -seg : seg;
            var arr = new mxPoint(xe + dx, ye);

            // Adds intermediate points if both go out on same side
            if (isSourceLeft == isTargetLeft) {
                var x = (isSourceLeft) ?
                Math.min(x0, xe) - segment :
                Math.max(x0, xe) + segment;

                result.push(new mxPoint(x, y0));
                result.push(new mxPoint(x, ye));
            }
            else if ((dep.x < arr.x) == isSourceLeft) {
                var midY = y0 + (ye - y0) / 2;

                result.push(dep);
                result.push(new mxPoint(dep.x, midY));
                result.push(new mxPoint(arr.x, midY));
                result.push(arr);
            }
            else {
                result.push(dep);
                result.push(arr);
            }
        }
    },
    Loop: function (state, source, target, points, result) {
        var pts = state.absolutePoints;

        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        if (p0 != null && pe != null) {
            // TODO: Implement loop routing for different edge styles
            /*var edgeStyle = !mxUtils.getValue(state.style,
             mxConstants.STYLE_NOEDGESTYLE, false) ?
             state.style[mxConstants.STYLE_EDGE] :
             null;

             if (edgeStyle != null && edgeStyle != '')
             {

             }
             else */
            if (points != null && points.length > 0) {
                for (var i = 0; i < points.length; i++) {
                    var pt = points[i];
                    pt = state.view.transformControlPoint(state, pt);
                    result.push(new mxPoint(pt.x, pt.y));
                }
            }

            return;
        }

        if (source != null) {
            var view = state.view;
            var graph = view.graph;
            var pt = (points != null && points.length > 0) ? points[0] : null;

            if (pt != null) {
                pt = view.transformControlPoint(state, pt);

                if (mxUtils.contains(source, pt.x, pt.y)) {
                    pt = null;
                }
            }

            var x = 0;
            var dx = 0;
            var y = 0;
            var dy = 0;

            var seg = mxUtils.getValue(state.style, mxConstants.STYLE_SEGMENT,
                    graph.gridSize) * view.scale;
            var dir = mxUtils.getValue(state.style, mxConstants.STYLE_DIRECTION,
                mxConstants.DIRECTION_WEST);

            if (dir == mxConstants.DIRECTION_NORTH ||
                dir == mxConstants.DIRECTION_SOUTH) {
                x = view.getRoutingCenterX(source);
                dx = seg;
            }
            else {
                y = view.getRoutingCenterY(source);
                dy = seg;
            }

            if (pt == null ||
                pt.x < source.x ||
                pt.x > source.x + source.width) {
                if (pt != null) {
                    x = pt.x;
                    dy = Math.max(Math.abs(y - pt.y), dy);
                }
                else {
                    if (dir == mxConstants.DIRECTION_NORTH) {
                        y = source.y - 2 * dx;
                    }
                    else if (dir == mxConstants.DIRECTION_SOUTH) {
                        y = source.y + source.height + 2 * dx;
                    }
                    else if (dir == mxConstants.DIRECTION_EAST) {
                        x = source.x - 2 * dy;
                    }
                    else {
                        x = source.x + source.width + 2 * dy;
                    }
                }
            }
            else if (pt != null) {
                x = view.getRoutingCenterX(source);
                dx = Math.max(Math.abs(x - pt.x), dy);
                y = pt.y;
                dy = 0;
            }

            result.push(new mxPoint(x - dx, y - dy));
            result.push(new mxPoint(x + dx, y + dy));
        }
    },
    ElbowConnector: function (state, source, target, points, result) {
        var pt = (points != null && points.length > 0) ? points[0] : null;

        var vertical = false;
        var horizontal = false;

        if (source != null && target != null) {
            if (pt != null) {
                var left = Math.min(source.x, target.x);
                var right = Math.max(source.x + source.width,
                    target.x + target.width);

                var top = Math.min(source.y, target.y);
                var bottom = Math.max(source.y + source.height,
                    target.y + target.height);

                pt = state.view.transformControlPoint(state, pt);

                vertical = pt.y < top || pt.y > bottom;
                horizontal = pt.x < left || pt.x > right;
            }
            else {
                var left = Math.max(source.x, target.x);
                var right = Math.min(source.x + source.width,
                    target.x + target.width);

                vertical = left == right;

                if (!vertical) {
                    var top = Math.max(source.y, target.y);
                    var bottom = Math.min(source.y + source.height,
                        target.y + target.height);

                    horizontal = top == bottom;
                }
            }
        }

        if (!horizontal && (vertical ||
            state.style[mxConstants.STYLE_ELBOW] == mxConstants.ELBOW_VERTICAL)) {
            mxEdgeStyle.TopToBottom(state, source, target, points, result);
        }
        else {
            mxEdgeStyle.SideToSide(state, source, target, points, result);
        }
    },
    SideToSide: function (state, source, target, points, result) {
        var view = state.view;
        var pt = (points != null && points.length > 0) ? points[0] : null;
        var pts = state.absolutePoints;
        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        if (pt != null) {
            pt = view.transformControlPoint(state, pt);
        }

        if (p0 != null) {
            source = new mxCellState();
            source.x = p0.x;
            source.y = p0.y;
        }

        if (pe != null) {
            target = new mxCellState();
            target.x = pe.x;
            target.y = pe.y;
        }

        if (source != null && target != null) {
            var l = Math.max(source.x, target.x);
            var r = Math.min(source.x + source.width,
                target.x + target.width);

            var x = (pt != null) ? pt.x : r + (l - r) / 2;

            var y1 = view.getRoutingCenterY(source);
            var y2 = view.getRoutingCenterY(target);

            if (pt != null) {
                if (pt.y >= source.y && pt.y <= source.y + source.height) {
                    y1 = pt.y;
                }

                if (pt.y >= target.y && pt.y <= target.y + target.height) {
                    y2 = pt.y;
                }
            }

            if (!mxUtils.contains(target, x, y1) && !mxUtils.contains(source, x, y1)) {
                result.push(new mxPoint(x, y1));
            }

            if (!mxUtils.contains(target, x, y2) && !mxUtils.contains(source, x, y2)) {
                result.push(new mxPoint(x, y2));
            }

            if (result.length == 1) {
                if (pt != null) {
                    if (!mxUtils.contains(target, x, pt.y) && !mxUtils.contains(source, x, pt.y)) {
                        result.push(new mxPoint(x, pt.y));
                    }
                }
                else {
                    var t = Math.max(source.y, target.y);
                    var b = Math.min(source.y + source.height,
                        target.y + target.height);

                    result.push(new mxPoint(x, t + (b - t) / 2));
                }
            }
        }
    },
    TopToBottom: function (state, source, target, points, result) {
        var view = state.view;
        var pt = (points != null && points.length > 0) ? points[0] : null;
        var pts = state.absolutePoints;
        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        if (pt != null) {
            pt = view.transformControlPoint(state, pt);
        }

        if (p0 != null) {
            source = new mxCellState();
            source.x = p0.x;
            source.y = p0.y;
        }

        if (pe != null) {
            target = new mxCellState();
            target.x = pe.x;
            target.y = pe.y;
        }

        if (source != null && target != null) {
            var t = Math.max(source.y, target.y);
            var b = Math.min(source.y + source.height,
                target.y + target.height);

            var x = view.getRoutingCenterX(source);

            if (pt != null &&
                pt.x >= source.x &&
                pt.x <= source.x + source.width) {
                x = pt.x;
            }

            var y = (pt != null) ? pt.y : b + (t - b) / 2;

            if (!mxUtils.contains(target, x, y) && !mxUtils.contains(source, x, y)) {
                result.push(new mxPoint(x, y));
            }

            if (pt != null &&
                pt.x >= target.x &&
                pt.x <= target.x + target.width) {
                x = pt.x;
            }
            else {
                x = view.getRoutingCenterX(target);
            }

            if (!mxUtils.contains(target, x, y) && !mxUtils.contains(source, x, y)) {
                result.push(new mxPoint(x, y));
            }

            if (result.length == 1) {
                if (pt != null && result.length == 1) {
                    if (!mxUtils.contains(target, pt.x, y) && !mxUtils.contains(source, pt.x, y)) {
                        result.push(new mxPoint(pt.x, y));
                    }
                }
                else {
                    var l = Math.max(source.x, target.x);
                    var r = Math.min(source.x + source.width,
                        target.x + target.width);

                    result.push(new mxPoint(l + (r - l) / 2, y));
                }
            }
        }
    },
    SegmentConnector: function (state, source, target, hints, result) {
        // Creates array of all way- and terminalpoints
        var pts = state.absolutePoints;
        var tol = Math.max(1, 2 * state.view.scale);
        // Whether the first segment outgoing from the source end is horizontal
        var lastPushed = (result.length > 0) ? result[0] : null;
        var horizontal = true;
        var hint = null;

        // Adds waypoints only if outside of tolerance
        function pushPoint(pt) {
            if (lastPushed == null || Math.abs(lastPushed.x - pt.x) > tol || Math.abs(lastPushed.y - pt.y) > tol) {
                result.push(pt);
                lastPushed = pt;
            }

            return lastPushed;
        };

        // Adds the first point
        var pt = pts[0];

        if (pt == null && source != null) {
            pt = new mxPoint(state.view.getRoutingCenterX(source), state.view.getRoutingCenterY(source));
        }
        else if (pt != null) {
            pt = pt.clone();
        }

        pt.x = Math.round(pt.x);
        pt.y = Math.round(pt.y);

        var lastInx = pts.length - 1;

        // Adds the waypoints
        if (hints != null && hints.length > 0) {
            // Converts all hints
            var newHints = [];

            for (var i = 0; i < hints.length; i++) {
                newHints[i] = state.view.transformControlPoint(state, hints[i]);
                newHints[i].x = Math.round(newHints[i].x);
                newHints[i].y = Math.round(newHints[i].y);
            }

            hints = newHints;

            // Aligns source and target hint to fixed points
            if (pt != null && hints[0] != null) {
                if (Math.abs(hints[0].x - pt.x) <= tol) {
                    hints[0].x = pt.x;
                }

                if (Math.abs(hints[0].y - pt.y) <= tol) {
                    hints[0].y = pt.y;
                }
            }

            var pe = pts[lastInx];

            if (pe != null && hints[hints.length - 1] != null) {
                if (Math.abs(hints[hints.length - 1].x - pe.x) <= tol) {
                    hints[hints.length - 1].x = pe.x;
                }

                if (Math.abs(hints[hints.length - 1].y - pe.y) <= tol) {
                    hints[hints.length - 1].y = pe.y;
                }
            }

            hint = hints[0];

            var currentTerm = source;
            var currentPt = pts[0];
            var hozChan = false;
            var vertChan = false;
            var currentHint = hint;

            if (currentPt != null) {
                currentPt.x = Math.round(currentPt.x);
                currentPt.y = Math.round(currentPt.y);
                currentTerm = null;
            }

            // Check for alignment with fixed points and with channels
            // at source and target segments only
            for (var i = 0; i < 2; i++) {
                var fixedVertAlign = currentPt != null && currentPt.x == currentHint.x;
                var fixedHozAlign = currentPt != null && currentPt.y == currentHint.y;

                var inHozChan = currentTerm != null && (currentHint.y >= currentTerm.y &&
                    currentHint.y <= currentTerm.y + currentTerm.height);
                var inVertChan = currentTerm != null && (currentHint.x >= currentTerm.x &&
                    currentHint.x <= currentTerm.x + currentTerm.width);

                hozChan = fixedHozAlign || (currentPt == null && inHozChan);
                vertChan = fixedVertAlign || (currentPt == null && inVertChan);

                // If the current hint falls in both the hor and vert channels in the case
                // of a floating port, or if the hint is exactly co-incident with a
                // fixed point, ignore the source and try to work out the orientation
                // from the target end
                if (i == 0 && ((hozChan && vertChan) || (fixedVertAlign && fixedHozAlign))) {
                }
                else {
                    if (currentPt != null && (!fixedHozAlign && !fixedVertAlign) && (inHozChan || inVertChan)) {
                        horizontal = inHozChan ? false : true;
                        break;
                    }

                    if (vertChan || hozChan) {
                        horizontal = hozChan;

                        if (i == 1) {
                            // Work back from target end
                            horizontal = hints.length % 2 == 0 ? hozChan : vertChan;
                        }

                        break;
                    }
                }

                currentTerm = target;
                currentPt = pts[lastInx];

                if (currentPt != null) {
                    currentPt.x = Math.round(currentPt.x);
                    currentPt.y = Math.round(currentPt.y);
                    currentTerm = null;
                }

                currentHint = hints[hints.length - 1];

                if (fixedVertAlign && fixedHozAlign) {
                    hints = hints.slice(1);
                }
            }

            if (horizontal && ((pts[0] != null && pts[0].y != hint.y) ||
                (pts[0] == null && source != null &&
                (hint.y < source.y || hint.y > source.y + source.height)))) {
                pushPoint(new mxPoint(pt.x, hint.y));
            }
            else if (!horizontal && ((pts[0] != null && pts[0].x != hint.x) ||
                (pts[0] == null && source != null &&
                (hint.x < source.x || hint.x > source.x + source.width)))) {
                pushPoint(new mxPoint(hint.x, pt.y));
            }

            if (horizontal) {
                pt.y = hint.y;
            }
            else {
                pt.x = hint.x;
            }

            for (var i = 0; i < hints.length; i++) {
                horizontal = !horizontal;
                hint = hints[i];

                //				mxLog.show();
                //				mxLog.debug('hint', i, hint.x, hint.y);

                if (horizontal) {
                    pt.y = hint.y;
                }
                else {
                    pt.x = hint.x;
                }

                pushPoint(pt.clone());
            }
        }
        else {
            hint = pt;
            // FIXME: First click in connect preview toggles orientation
            horizontal = true;
        }

        // Adds the last point
        pt = pts[lastInx];

        if (pt == null && target != null) {
            pt = new mxPoint(state.view.getRoutingCenterX(target), state.view.getRoutingCenterY(target));
        }

        if (pt != null) {
            pt.x = Math.round(pt.x);
            pt.y = Math.round(pt.y);

            if (hint != null) {
                if (horizontal && ((pts[lastInx] != null && pts[lastInx].y != hint.y) ||
                    (pts[lastInx] == null && target != null &&
                    (hint.y < target.y || hint.y > target.y + target.height)))) {
                    pushPoint(new mxPoint(pt.x, hint.y));
                }
                else if (!horizontal && ((pts[lastInx] != null && pts[lastInx].x != hint.x) ||
                    (pts[lastInx] == null && target != null &&
                    (hint.x < target.x || hint.x > target.x + target.width)))) {
                    pushPoint(new mxPoint(hint.x, pt.y));
                }
            }
        }

        // Removes bends inside the source terminal for floating ports
        if (pts[0] == null && source != null) {
            while (result.length > 1 && result[1] != null &&
            mxUtils.contains(source, result[1].x, result[1].y)) {
                result.splice(1, 1);
            }
        }

        // Removes bends inside the target terminal
        if (pts[lastInx] == null && target != null) {
            while (result.length > 1 && result[result.length - 1] != null &&
            mxUtils.contains(target, result[result.length - 1].x, result[result.length - 1].y)) {
                result.splice(result.length - 1, 1);
            }
        }

        // Removes last point if inside tolerance with end point
        if (pe != null && result[result.length - 1] != null &&
            Math.abs(pe.x - result[result.length - 1].x) <= tol &&
            Math.abs(pe.y - result[result.length - 1].y) <= tol) {
            result.splice(result.length - 1, 1);

            // Lines up second last point in result with end point
            if (result[result.length - 1] != null) {
                if (Math.abs(result[result.length - 1].x - pe.x) <= tol) {
                    result[result.length - 1].x = pe.x;
                }

                if (Math.abs(result[result.length - 1].y - pe.y) <= tol) {
                    result[result.length - 1].y = pe.y;
                }
            }
        }

        return result;
    },

    orthBuffer: 10,

    orthPointsFallback: true,

    dirVectors: [[-1, 0],
        [0, -1], [1, 0], [0, 1], [-1, 0], [0, -1], [1, 0]],

    wayPoints1: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
        [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],

    routePatterns: [
        [[513, 2308, 2081, 2562], [513, 1090, 514, 2184, 2114, 2561],
            [513, 1090, 514, 2564, 2184, 2562],
            [513, 2308, 2561, 1090, 514, 2568, 2308]],
        [[514, 1057, 513, 2308, 2081, 2562], [514, 2184, 2114, 2561],
            [514, 2184, 2562, 1057, 513, 2564, 2184],
            [514, 1057, 513, 2568, 2308, 2561]],
        [[1090, 514, 1057, 513, 2308, 2081, 2562], [2114, 2561],
            [1090, 2562, 1057, 513, 2564, 2184],
            [1090, 514, 1057, 513, 2308, 2561, 2568]],
        [[2081, 2562], [1057, 513, 1090, 514, 2184, 2114, 2561],
            [1057, 513, 1090, 514, 2184, 2562, 2564],
            [1057, 2561, 1090, 514, 2568, 2308]]],

    inlineRoutePatterns: [
        [null, [2114, 2568], null, null],
        [null, [514, 2081, 2114, 2568], null, null],
        [null, [2114, 2561], null, null],
        [[2081, 2562], [1057, 2114, 2568],
            [2184, 2562],
            null]],
    vertexSeperations: [],

    limits: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]],

    LEFT_MASK: 32,

    TOP_MASK: 64,

    RIGHT_MASK: 128,

    BOTTOM_MASK: 256,

    LEFT: 1,

    TOP: 2,

    RIGHT: 4,

    BOTTOM: 8,

    // TODO remove magic numbers
    SIDE_MASK: 480,
    //mxEdgeStyle.LEFT_MASK | mxEdgeStyle.TOP_MASK | mxEdgeStyle.RIGHT_MASK
    //| mxEdgeStyle.BOTTOM_MASK,

    CENTER_MASK: 512,

    SOURCE_MASK: 1024,

    TARGET_MASK: 2048,

    VERTEX_MASK: 3072,
    // mxEdgeStyle.SOURCE_MASK | mxEdgeStyle.TARGET_MASK,

    OrthConnector: function (state, source, target, points, result) {
        var graph = state.view.graph;
        var sourceEdge = source == null ? false : graph.getModel().isEdge(source.cell);
        var targetEdge = target == null ? false : graph.getModel().isEdge(target.cell);

        if (mxEdgeStyle.orthPointsFallback && (points != null && points.length > 0) || (sourceEdge) || (targetEdge)) {
            mxEdgeStyle.SegmentConnector(state, source, target, points, result);

            return;
        }

        var pts = state.absolutePoints;
        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        var sourceX = source != null ? source.x : p0.x;
        var sourceY = source != null ? source.y : p0.y;
        var sourceWidth = source != null ? source.width : 0;
        var sourceHeight = source != null ? source.height : 0;

        var targetX = target != null ? target.x : pe.x;
        var targetY = target != null ? target.y : pe.y;
        var targetWidth = target != null ? target.width : 0;
        var targetHeight = target != null ? target.height : 0;

        var scaledOrthBuffer = state.view.scale * mxEdgeStyle.orthBuffer;
        // Determine the side(s) of the source and target vertices
        // that the edge may connect to
        // portConstraint [source, target]
        var portConstraint = [mxConstants.DIRECTION_MASK_ALL, mxConstants.DIRECTION_MASK_ALL];
        var rotation = 0;

        if (source != null) {
            portConstraint[0] = mxUtils.getPortConstraints(source, state, true,
                mxConstants.DIRECTION_MASK_ALL);
            rotation = mxUtils.getValue(source.style, mxConstants.STYLE_ROTATION, 0);

            if (rotation != 0) {
                var newRect = mxUtils.getBoundingBox(new mxRectangle(sourceX, sourceY, sourceWidth, sourceHeight), rotation);
                sourceX = newRect.x;
                sourceY = newRect.y;
                sourceWidth = newRect.width;
                sourceHeight = newRect.height;
            }
        }

        if (target != null) {
            portConstraint[1] = mxUtils.getPortConstraints(target, state, false,
                mxConstants.DIRECTION_MASK_ALL);
            rotation = mxUtils.getValue(target.style, mxConstants.STYLE_ROTATION, 0);

            if (rotation != 0) {
                var newRect = mxUtils.getBoundingBox(new mxRectangle(targetX, targetY, targetWidth, targetHeight), rotation);
                targetX = newRect.x;
                targetY = newRect.y;
                targetWidth = newRect.width;
                targetHeight = newRect.height;
            }
        }

        var dir = [0, 0];

        // Work out which faces of the vertices present against each other
        // in a way that would allow a 3-segment connection if port constraints
        // permitted.
        // geo -> [source, target] [x, y, width, height]
        var geo = [[sourceX, sourceY, sourceWidth, sourceHeight],
            [targetX, targetY, targetWidth, targetHeight]];

        for (var i = 0; i < 2; i++) {
            mxEdgeStyle.limits[i][1] = geo[i][0] - scaledOrthBuffer;
            mxEdgeStyle.limits[i][2] = geo[i][1] - scaledOrthBuffer;
            mxEdgeStyle.limits[i][4] = geo[i][0] + geo[i][2] + scaledOrthBuffer;
            mxEdgeStyle.limits[i][8] = geo[i][1] + geo[i][3] + scaledOrthBuffer;
        }

        // Work out which quad the target is in
        var sourceCenX = geo[0][0] + geo[0][2] / 2.0;
        var sourceCenY = geo[0][1] + geo[0][3] / 2.0;
        var targetCenX = geo[1][0] + geo[1][2] / 2.0;
        var targetCenY = geo[1][1] + geo[1][3] / 2.0;

        var dx = sourceCenX - targetCenX;
        var dy = sourceCenY - targetCenY;

        var quad = 0;

        if (dx < 0) {
            if (dy < 0) {
                quad = 2;
            }
            else {
                quad = 1;
            }
        }
        else {
            if (dy <= 0) {
                quad = 3;

                // Special case on x = 0 and negative y
                if (dx == 0) {
                    quad = 2;
                }
            }
        }

        // Check for connection constraints
        var currentTerm = null;

        if (source != null) {
            currentTerm = p0;
        }

        var constraint = [[0.5, 0.5], [0.5, 0.5]];

        for (var i = 0; i < 2; i++) {
            if (currentTerm != null) {
                constraint[i][0] = (currentTerm.x - geo[i][0]) / geo[i][2];

                if (constraint[i][0] < 0.01) {
                    dir[i] = mxConstants.DIRECTION_MASK_WEST;
                }
                else if (constraint[i][0] > 0.99) {
                    dir[i] = mxConstants.DIRECTION_MASK_EAST;
                }

                constraint[i][1] = (currentTerm.y - geo[i][1]) / geo[i][3];

                if (constraint[i][1] < 0.01) {
                    dir[i] = mxConstants.DIRECTION_MASK_NORTH;
                }
                else if (constraint[i][1] > 0.99) {
                    dir[i] = mxConstants.DIRECTION_MASK_SOUTH;
                }
            }

            currentTerm = null;

            if (target != null) {
                currentTerm = pe;
            }
        }

        var sourceTopDist = geo[0][1] - (geo[1][1] + geo[1][3]);
        var sourceLeftDist = geo[0][0] - (geo[1][0] + geo[1][2]);
        var sourceBottomDist = geo[1][1] - (geo[0][1] + geo[0][3]);
        var sourceRightDist = geo[1][0] - (geo[0][0] + geo[0][2]);

        mxEdgeStyle.vertexSeperations[1] = Math.max(
            sourceLeftDist - 2 * scaledOrthBuffer, 0);
        mxEdgeStyle.vertexSeperations[2] = Math.max(sourceTopDist - 2 * scaledOrthBuffer,
            0);
        mxEdgeStyle.vertexSeperations[4] = Math.max(sourceBottomDist - 2
            * scaledOrthBuffer, 0);
        mxEdgeStyle.vertexSeperations[3] = Math.max(sourceRightDist - 2
            * scaledOrthBuffer, 0);

        //==============================================================
        // Start of source and target direction determination

        // Work through the preferred orientations by relative positioning
        // of the vertices and list them in preferred and available order

        var dirPref = [];
        var horPref = [];
        var vertPref = [];

        horPref[0] = (sourceLeftDist >= sourceRightDist) ? mxConstants.DIRECTION_MASK_WEST
            : mxConstants.DIRECTION_MASK_EAST;
        vertPref[0] = (sourceTopDist >= sourceBottomDist) ? mxConstants.DIRECTION_MASK_NORTH
            : mxConstants.DIRECTION_MASK_SOUTH;

        horPref[1] = mxUtils.reversePortConstraints(horPref[0]);
        vertPref[1] = mxUtils.reversePortConstraints(vertPref[0]);

        var preferredHorizDist = sourceLeftDist >= sourceRightDist ? sourceLeftDist
            : sourceRightDist;
        var preferredVertDist = sourceTopDist >= sourceBottomDist ? sourceTopDist
            : sourceBottomDist;

        var prefOrdering = [[0, 0], [0, 0]];
        var preferredOrderSet = false;

        // If the preferred port isn't available, switch it
        for (var i = 0; i < 2; i++) {
            if (dir[i] != 0x0) {
                continue;
            }

            if ((horPref[i] & portConstraint[i]) == 0) {
                horPref[i] = mxUtils.reversePortConstraints(horPref[i]);
            }

            if ((vertPref[i] & portConstraint[i]) == 0) {
                vertPref[i] = mxUtils
                    .reversePortConstraints(vertPref[i]);
            }

            prefOrdering[i][0] = vertPref[i];
            prefOrdering[i][1] = horPref[i];
        }

        if (preferredVertDist > scaledOrthBuffer * 2
            && preferredHorizDist > scaledOrthBuffer * 2) {
            // Possibility of two segment edge connection
            if (((horPref[0] & portConstraint[0]) > 0)
                && ((vertPref[1] & portConstraint[1]) > 0)) {
                prefOrdering[0][0] = horPref[0];
                prefOrdering[0][1] = vertPref[0];
                prefOrdering[1][0] = vertPref[1];
                prefOrdering[1][1] = horPref[1];
                preferredOrderSet = true;
            }
            else if (((vertPref[0] & portConstraint[0]) > 0)
                && ((horPref[1] & portConstraint[1]) > 0)) {
                prefOrdering[0][0] = vertPref[0];
                prefOrdering[0][1] = horPref[0];
                prefOrdering[1][0] = horPref[1];
                prefOrdering[1][1] = vertPref[1];
                preferredOrderSet = true;
            }
        }
        if (preferredVertDist > scaledOrthBuffer * 2 && !preferredOrderSet) {
            prefOrdering[0][0] = vertPref[0];
            prefOrdering[0][1] = horPref[0];
            prefOrdering[1][0] = vertPref[1];
            prefOrdering[1][1] = horPref[1];
            preferredOrderSet = true;

        }
        if (preferredHorizDist > scaledOrthBuffer * 2 && !preferredOrderSet) {
            prefOrdering[0][0] = horPref[0];
            prefOrdering[0][1] = vertPref[0];
            prefOrdering[1][0] = horPref[1];
            prefOrdering[1][1] = vertPref[1];
            preferredOrderSet = true;
        }

        // The source and target prefs are now an ordered list of
        // the preferred port selections
        // It the list can contain gaps, compact it

        for (var i = 0; i < 2; i++) {
            if (dir[i] != 0x0) {
                continue;
            }

            if ((prefOrdering[i][0] & portConstraint[i]) == 0) {
                prefOrdering[i][0] = prefOrdering[i][1];
            }

            dirPref[i] = prefOrdering[i][0] & portConstraint[i];
            dirPref[i] |= (prefOrdering[i][1] & portConstraint[i]) << 8;
            dirPref[i] |= (prefOrdering[1 - i][i] & portConstraint[i]) << 16;
            dirPref[i] |= (prefOrdering[1 - i][1 - i] & portConstraint[i]) << 24;

            if ((dirPref[i] & 0xF) == 0) {
                dirPref[i] = dirPref[i] << 8;
            }
            if ((dirPref[i] & 0xF00) == 0) {
                dirPref[i] = (dirPref[i] & 0xF) | dirPref[i] >> 8;
            }
            if ((dirPref[i] & 0xF0000) == 0) {
                dirPref[i] = (dirPref[i] & 0xFFFF)
                    | ((dirPref[i] & 0xF000000) >> 8);
            }

            dir[i] = dirPref[i] & 0xF;

            if (portConstraint[i] == mxConstants.DIRECTION_MASK_WEST
                || portConstraint[i] == mxConstants.DIRECTION_MASK_NORTH
                || portConstraint[i] == mxConstants.DIRECTION_MASK_EAST
                || portConstraint[i] == mxConstants.DIRECTION_MASK_SOUTH) {
                dir[i] = portConstraint[i];
            }
        }

        //==============================================================
        // End of source and target direction determination

        var sourceIndex = dir[0] == mxConstants.DIRECTION_MASK_EAST ? 3
            : dir[0];
        var targetIndex = dir[1] == mxConstants.DIRECTION_MASK_EAST ? 3
            : dir[1];

        sourceIndex -= quad;
        targetIndex -= quad;

        if (sourceIndex < 1) {
            sourceIndex += 4;
        }
        if (targetIndex < 1) {
            targetIndex += 4;
        }

        var routePattern = mxEdgeStyle.routePatterns[sourceIndex - 1][targetIndex - 1];

        mxEdgeStyle.wayPoints1[0][0] = geo[0][0];
        mxEdgeStyle.wayPoints1[0][1] = geo[0][1];

        switch (dir[0]) {
            case mxConstants.DIRECTION_MASK_WEST:
                mxEdgeStyle.wayPoints1[0][0] -= scaledOrthBuffer;
                mxEdgeStyle.wayPoints1[0][1] += constraint[0][1] * geo[0][3];
                break;
            case mxConstants.DIRECTION_MASK_SOUTH:
                mxEdgeStyle.wayPoints1[0][0] += constraint[0][0] * geo[0][2];
                mxEdgeStyle.wayPoints1[0][1] += geo[0][3] + scaledOrthBuffer;
                break;
            case mxConstants.DIRECTION_MASK_EAST:
                mxEdgeStyle.wayPoints1[0][0] += geo[0][2] + scaledOrthBuffer;
                mxEdgeStyle.wayPoints1[0][1] += constraint[0][1] * geo[0][3];
                break;
            case mxConstants.DIRECTION_MASK_NORTH:
                mxEdgeStyle.wayPoints1[0][0] += constraint[0][0] * geo[0][2];
                mxEdgeStyle.wayPoints1[0][1] -= scaledOrthBuffer;
                break;
        }

        var currentIndex = 0;

        // Orientation, 0 horizontal, 1 vertical
        var lastOrientation = (dir[0] & (mxConstants.DIRECTION_MASK_EAST | mxConstants.DIRECTION_MASK_WEST)) > 0 ? 0
            : 1;
        var initialOrientation = lastOrientation;
        var currentOrientation = 0;

        for (var i = 0; i < routePattern.length; i++) {
            var nextDirection = routePattern[i] & 0xF;

            // Rotate the index of this direction by the quad
            // to get the real direction
            var directionIndex = nextDirection == mxConstants.DIRECTION_MASK_EAST ? 3
                : nextDirection;

            directionIndex += quad;

            if (directionIndex > 4) {
                directionIndex -= 4;
            }

            var direction = mxEdgeStyle.dirVectors[directionIndex - 1];

            currentOrientation = (directionIndex % 2 > 0) ? 0 : 1;
            // Only update the current index if the point moved
            // in the direction of the current segment move,
            // otherwise the same point is moved until there is
            // a segment direction change
            if (currentOrientation != lastOrientation) {
                currentIndex++;
                // Copy the previous way point into the new one
                // We can't base the new position on index - 1
                // because sometime elbows turn out not to exist,
                // then we'd have to rewind.
                mxEdgeStyle.wayPoints1[currentIndex][0] = mxEdgeStyle.wayPoints1[currentIndex - 1][0];
                mxEdgeStyle.wayPoints1[currentIndex][1] = mxEdgeStyle.wayPoints1[currentIndex - 1][1];
            }

            var tar = (routePattern[i] & mxEdgeStyle.TARGET_MASK) > 0;
            var sou = (routePattern[i] & mxEdgeStyle.SOURCE_MASK) > 0;
            var side = (routePattern[i] & mxEdgeStyle.SIDE_MASK) >> 5;
            side = side << quad;

            if (side > 0xF) {
                side = side >> 4;
            }

            var center = (routePattern[i] & mxEdgeStyle.CENTER_MASK) > 0;

            if ((sou || tar) && side < 9) {
                var limit = 0;
                var souTar = sou ? 0 : 1;

                if (center && currentOrientation == 0) {
                    limit = geo[souTar][0] + constraint[souTar][0] * geo[souTar][2];
                }
                else if (center) {
                    limit = geo[souTar][1] + constraint[souTar][1] * geo[souTar][3];
                }
                else {
                    limit = mxEdgeStyle.limits[souTar][side];
                }

                if (currentOrientation == 0) {
                    var lastX = mxEdgeStyle.wayPoints1[currentIndex][0];
                    var deltaX = (limit - lastX) * direction[0];

                    if (deltaX > 0) {
                        mxEdgeStyle.wayPoints1[currentIndex][0] += direction[0]
                            * deltaX;
                    }
                }
                else {
                    var lastY = mxEdgeStyle.wayPoints1[currentIndex][1];
                    var deltaY = (limit - lastY) * direction[1];

                    if (deltaY > 0) {
                        mxEdgeStyle.wayPoints1[currentIndex][1] += direction[1]
                            * deltaY;
                    }
                }
            }

            else if (center) {
                // Which center we're travelling to depend on the current direction
                mxEdgeStyle.wayPoints1[currentIndex][0] += direction[0]
                    * Math.abs(mxEdgeStyle.vertexSeperations[directionIndex] / 2);
                mxEdgeStyle.wayPoints1[currentIndex][1] += direction[1]
                    * Math.abs(mxEdgeStyle.vertexSeperations[directionIndex] / 2);
            }

            if (currentIndex > 0
                && mxEdgeStyle.wayPoints1[currentIndex][currentOrientation] == mxEdgeStyle.wayPoints1[currentIndex - 1][currentOrientation]) {
                currentIndex--;
            }
            else {
                lastOrientation = currentOrientation;
            }
        }

        for (var i = 0; i <= currentIndex; i++) {
            if (i == currentIndex) {
                // Last point can cause last segment to be in
                // same direction as jetty/approach. If so,
                // check the number of points is consistent
                // with the relative orientation of source and target
                // jettys. Same orientation requires an even
                // number of turns (points), different requires
                // odd.
                var targetOrientation = (dir[1] & (mxConstants.DIRECTION_MASK_EAST | mxConstants.DIRECTION_MASK_WEST)) > 0 ? 0
                    : 1;
                var sameOrient = targetOrientation == initialOrientation ? 0 : 1;

                // (currentIndex + 1) % 2 is 0 for even number of points,
                // 1 for odd
                if (sameOrient != (currentIndex + 1) % 2) {
                    // The last point isn't required
                    break;
                }
            }

            result.push(new mxPoint(Math.round(mxEdgeStyle.wayPoints1[i][0]), Math.round(mxEdgeStyle.wayPoints1[i][1])));
        }
    },

    getRoutePattern: function (dir, quad, dx, dy) {
        var sourceIndex = dir[0] == mxConstants.DIRECTION_MASK_EAST ? 3
            : dir[0];
        var targetIndex = dir[1] == mxConstants.DIRECTION_MASK_EAST ? 3
            : dir[1];

        sourceIndex -= quad;
        targetIndex -= quad;

        if (sourceIndex < 1) {
            sourceIndex += 4;
        }
        if (targetIndex < 1) {
            targetIndex += 4;
        }

        var result = routePatterns[sourceIndex - 1][targetIndex - 1];

        if (dx == 0 || dy == 0) {
            if (inlineRoutePatterns[sourceIndex - 1][targetIndex - 1] != null) {
                result = inlineRoutePatterns[sourceIndex - 1][targetIndex - 1];
            }
        }

        return result;
    }
};

module.exports = edgeStyle;

},{}],29:[function(require,module,exports){
var utils = require('../common/utils');
var Class = require('../common/class');
var EventObject = require('./EventObject');

var keys = utils.keys;
var each = utils.each;
// TODO: constants
var eventSplitter = /\s+/;


module.exports = Class.create({
    eventListeners: null,
    eventEnabled: true,
    eventSource: null,

    constructor: function Events() {},

    isEventEnabled: function () {
        return this.eventEnabled;
    },

    setIsEventEnabled: function (enabled) {
        var that = this;
        that.eventEnabled = enabled;
        return that;
    },

    enableEvent: function () {
        return this.setIsEventEnabled(true);
    },

    disableEvent: function () {
        return this.setIsEventEnabled(false);
    },

    getEventSource: function () {
        return this.eventSource;
    },

    setEventSource: function (value) {
        var that = this;
        that.eventSource = value;
        return that;
    },

    on: function (events, callback, context) {

        var that = this;

        if (!callback) {
            return that;
        }

        var listeners = that.eventListeners || (that.eventListeners = {});

        events = events.split(eventSplitter);

        each(events, function (event) {
            var list = listeners[event] || (listeners[event] = []);
            list.push(callback, context);
        });

        return that;
    },

    once: function (events, callback, context) {

        var that = this;
        var cb = function () {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };

        return that.on(events, cb, context);
    },

    off: function (events, callback, context) {

        var that = this;
        var listeners = that.eventListeners;

        // No events.
        if (!listeners) {
            return that;
        }

        // removing *all* events.
        if (!(events || callback || context)) {
            delete that.eventListeners;
            return that;
        }

        events = events ? events.split(eventSplitter) : keys(listeners);

        each(events, function (event) {

            var list = listeners[event];

            if (!list) {
                return;
            }

            // remove all event.
            if (!(callback || context)) {
                delete listeners[event];
                return;
            }

            for (var i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback ||
                    context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        });

        return that;
    },

    emit: function (eventObj, sender) {
        var that = this;
        var returned = [];
        var listeners = that.eventListeners;

        // No events.
        if (!listeners || !that.isEventEnabled()) {
            return returned;
        }

        eventObj = eventObj || new EventObject();

        var eventName = eventObj.getName();

        if (!eventName) {
            return returned;
        }

        // fix sender
        sender = sender || that.getEventSource();
        sender = sender || that;


        var list = listeners[eventName];
        var length = list ? list.length : 0;
        var ret;

        for (var i = 0; i < length; i += 2) {
            ret = list[i].call(list[i + 1] || that, eventObj, sender);
            if (length > 2) {
                returned.push(ret); // result as array
            } else {
                returned = ret;
            }
        }

        return returned;
    },
});

},{"../common/class":23,"../common/utils":26,"./EventObject":30}],30:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
var utils = require('../common/utils');

var isObject = utils.isObject;
var extend = utils.extend;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function EventObject(name, eventData) {

        var that = this;
        var data = that.data = {};

        that.name = name;
        that.consumed = false;

        isObject(eventData) && extend(data, eventData);
    },

    getName: function () {
        return this.name;
    },

    addData: function (key, value) {

        var evtObj = this;
        var data = evtObj.data;

        if (isObject(key)) {
            extend(data, key);
        } else {
            data[key] = value;
        }

        return evtObj;
    },

    getData: function (key) {
        var data = this.data;
        return isNullOrUndefined(key) ? data : data[key];
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function () {
        this.consumed = true;
    }
});

},{"../common/class":23,"../common/utils":26}],31:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
//var utils = require('../common/utils');
var EventObject = require('./EventObject');

var EventSource = Class.create({
    constructor: function EventSource(eventSource) {
        this.setEventSource(eventSource);
    },
    /**
     * Variable: eventListeners
     *
     * Holds the event names and associated listeners in an array. The array
     * contains the event name followed by the respective listener for each
     * registered listener.
     */
    eventListeners: null,

    /**
     * Variable: eventsEnabled
     *
     * Specifies if events can be fired. Default is true.
     */
    eventsEnabled: true,

    /**
     * Variable: eventSource
     *
     * Optional source for events. Default is null.
     */
    eventSource: null,

    /**
     * Function: isEventsEnabled
     *
     * Returns <eventsEnabled>.
     */
    isEventsEnabled: function () {
        return this.eventsEnabled;
    },

    /**
     * Function: setEventsEnabled
     *
     * Sets <eventsEnabled>.
     */
    setEventsEnabled: function (value) {
        this.eventsEnabled = value;
    },

    /**
     * Function: getEventSource
     *
     * Returns <eventSource>.
     */
    getEventSource: function () {
        return this.eventSource;
    },

    /**
     * Function: setEventSource
     *
     * Sets <eventSource>.
     */
    setEventSource: function (value) {
        this.eventSource = value;
    },

    /**
     * Function: addListener
     *
     * Binds the specified function to the given event name. If no event name
     * is given, then the listener is registered for all events.
     *
     * The parameters of the listener are the sender and an <mxEventObject>.
     */
    addListener: function (name, funct) {
        if (this.eventListeners === null) {
            this.eventListeners = [];
        }

        this.eventListeners.push(name);
        this.eventListeners.push(funct);
    },

    /**
     * Function: removeListener
     *
     * Removes all occurrences of the given listener from <eventListeners>.
     */
    removeListener: function (funct) {
        if (this.eventListeners !== null) {
            var i = 0;

            while (i < this.eventListeners.length) {
                if (this.eventListeners[i + 1] == funct) {
                    this.eventListeners.splice(i, 2);
                } else {
                    i += 2;
                }
            }
        }
    },

    /**
     * Function: fireEvent
     *
     * Dispatches the given event to the listeners which are registered for
     * the event. The sender argument is optional. The current execution scope
     * ("this") is used for the listener invocation (see <mxUtils.bind>).
     *
     * Example:
     *
     * (code)
     * fireEvent(new mxEventObject("eventName", key1, val1, .., keyN, valN))
     * (end)
     *
     * Parameters:
     *
     * evt - <mxEventObject> that represents the event.
     * sender - Optional sender to be passed to the listener. Default value is
     * the return value of <getEventSource>.
     */
    fireEvent: function (evt, sender) {
        if (this.eventListeners !== null && this.isEventsEnabled()) {
            if (evt === null) {
                evt = new EventObject();
            }

            if (sender === null) {
                sender = this.getEventSource();
            }

            if (sender === null) {
                sender = this;
            }

            var args = [sender, evt];

            for (var i = 0; i < this.eventListeners.length; i += 2) {
                var listen = this.eventListeners[i];

                if (listen === null || listen == evt.getName()) {
                    this.eventListeners[i + 1].apply(this, args);
                }
            }
        }
    },
});

module.exports = EventSource;


},{"../common/class":23,"./EventObject":30}],32:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
var detector = require('../common/detector');

module.exports = Class.create({
    constructor: function MouseEvent(evt, state) {
        var that = this;

        that.evt = evt;
        that.state = state;

    },

    consumed: false,
    graphX: null,
    graphY: null,

    getEvent:function(){
        return this.evt;
    },

    getGraphX: function () {
        return this.graphX;
    },

    getGraphY: function () {
        return this.graphY;
    },

    getState: function () {
        return this.state;
    },

    getCell: function () {
        var state = this.getState();

        if (state !== null) {
            return state.cell;
        }

        return null;
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function (preventDefault) {
        preventDefault = (preventDefault !== null) ? preventDefault : true;

        if (preventDefault && this.evt.preventDefault) {
            this.evt.preventDefault();
        }

        // Workaround for images being dragged in IE
        // Does not change returnValue in Opera
        if (detector.IS_IE) {
            this.evt.returnValue = true;
        }

        // Sets local consumed state
        this.consumed = true;
    },
});


},{"../common/class":23,"../common/detector":24}],33:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document, window */

var utils = require('../common/utils');
var detector = require('../common/detector');
var MouseEvent = require('./MouseEvent');

var each = utils.each;
var indexOf = utils.indexOf;

var IS_TOUCH = detector.IS_TOUCH;
var IS_POINTER = detector.IS_POINTER;

var domEvent = {
    ACTIVATE: 'activate',
    ADD: 'add',
    ADD_CELLS: 'addCells',
    ADD_OVERLAY: 'addOverlay',
    ADD_VERTEX: 'addVertex',
    AFTER_ADD_VERTEX: 'afterAddVertex',
    ALIGN_CELLS: 'alignCells',
    BEFORE_ADD_VERTEX: 'beforeAddVertex',
    BEFORE_UNDO: 'beforeUndo',
    BEGIN_UPDATE: 'beginUpdate',
    CELLS_ADDED: 'cellsAdded',
    CELLS_FOLDED: 'cellsFolded',
    CELLS_MOVED: 'cellsMoved',
    CELLS_ORDERED: 'cellsOrdered',
    CELLS_REMOVED: 'cellsRemoved',
    CELLS_RESIZED: 'cellsResized',
    CELLS_TOGGLED: 'cellsToggled',
    CELL_CONNECTED: 'cellConnected',
    CHANGE: 'change',
    CLEAR: 'clear',
    CLICK: 'click',
    CLOSE: 'close',
    CONNECT: 'connect',
    CONNECT_CELL: 'connectCell',
    CUSTOM_HANDLE: -100,
    DESTROY: 'destroy',
    DISCONNECT: 'disconnect',
    DONE: 'done',
    DOUBLE_CLICK: 'doubleClick',
    DOWN: 'down',
    EDITING_STARTED: 'editingStarted',
    EDITING_STOPPED: 'editingStopped',
    END_EDIT: 'endEdit',
    END_UPDATE: 'endUpdate',
    ESCAPE: 'escape',
    EXECUTE: 'execute',
    EXECUTED: 'executed',
    FIRED: 'fired',
    FIRE_MOUSE_EVENT: 'fireMouseEvent',
    FLIP_EDGE: 'flipEdge',
    FOLD_CELLS: 'foldCells',
    GESTURE: 'gesture',
    GET: 'get',
    GROUP_CELLS: 'groupCells',
    HIDE: 'hide',
    LABEL_CHANGED: 'labelChanged',
    LABEL_HANDLE: -1,
    LAYOUT_CELLS: 'layoutCells',
    MARK: 'mark',
    MAXIMIZE: 'maximize',
    MINIMIZE: 'minimize',
    MOUSE_DOWN: 'mouseDown',
    MOUSE_MOVE: 'mouseMove',
    MOUSE_UP: 'mouseUp',
    MOVE: 'move',
    MOVE_CELLS: 'moveCells',
    MOVE_END: 'moveEnd',
    MOVE_START: 'moveStart',
    NORMALIZE: 'normalize',
    NOTIFY: 'notify',
    ORDER_CELLS: 'orderCells',
    PAN: 'pan',
    PAN_END: 'panEnd',
    PAN_START: 'panStart',
    POST: 'post',
    RECEIVE: 'receive',
    REDO: 'redo',
    REFRESH: 'refresh',
    REMOVE: 'remove',
    REMOVE_CELLS: 'removeCells',
    REMOVE_CELLS_FROM_PARENT: 'removeCellsFromParent',
    REMOVE_OVERLAY: 'removeOverlay',
    RESET: 'reset',
    RESIZE: 'resize',
    RESIZE_CELLS: 'resizeCells',
    RESIZE_END: 'resizeEnd',
    RESIZE_START: 'resizeStart',
    RESUME: 'resume',
    ROOT: 'root',
    ROTATION_HANDLE: -2,
    SAVE: 'save',
    SCALE: 'scale',
    SCALE_AND_TRANSLATE: 'scaleAndTranslate',
    SELECT: 'select',
    SHOW: 'show',
    SIZE: 'size',
    SPLIT_EDGE: 'splitEdge',
    START: 'start',
    START_EDIT: 'startEdit',
    START_EDITING: 'startEditing',
    SUSPEND: 'suspend',
    TAP_AND_HOLD: 'tapAndHold',
    TOGGLE_CELLS: 'toggleCells',
    TRANSLATE: 'translate',
    UNDO: 'undo',
    UNGROUP_CELLS: 'ungroupCells',
    UP: 'up',
    UPDATE_CELL_SIZE: 'updateCellSize',


    // 保存已经绑定事件的元素
    cache: [],

    on: function () {

        var update = function (element, eventName, callback) {

            var list = element.eventListeners;

            if (!list) {
                list = element.eventListeners = [];
                domEvent.cache.push(element);
            }

            list.push({
                eventName: eventName,
                callback: callback
            });
        };

        if (window.addEventListener) {
            return function (element, eventName, callback) {
                element.addEventListener(eventName, callback, false);
                update(element, eventName, callback);
            };
        } else {
            return function (element, eventName, callback) {
                element.attachEvent('on' + eventName, callback);
                update(element, eventName, callback);
            };
        }
    }(),

    off: function () {
        var updateListener = function (element, eventName, callback) {

            var list = element.eventListeners;

            if (list) {
                for (var i = list.length - 1; i >= 0; i--) {
                    var entry = list[i];

                    if (entry.eventName === eventName && entry.callback === callback) {
                        list.splice(i, 1);
                    }
                }

                if (list.length === 0) {
                    delete element.eventListeners;

                    var idx = indexOf(domEvent.cache, element);
                    if (idx >= 0) {
                        domEvent.cache.splice(idx, 1);
                    }
                }
            }
        };

        if (window.removeEventListener) {
            return function (element, eventName, callback) {
                element.removeEventListener(eventName, callback, false);
                updateListener(element, eventName, callback);
            };
        }
        else {
            return function (element, eventName, callback) {
                element.detachEvent('on' + eventName, callback);
                updateListener(element, eventName, callback);
            };
        }
    }(),

    clear: function (element) {

        var list = element.eventListeners;

        if (list) {
            each(list, function (entry) {
                domEvent.off(element, entry.eventName, entry.callback);
            });
        }
    },

    release: function (element) {
        if (element) {
            domEvent.clear(element);

            var children = element.childNodes;

            if (children) {
                for (var i = 0, l = children.length; i < l; i += 1) {
                    domEvent.release(children[i]);
                }
            }
        }
    },

    onGesture: function (element, startListener, moveListener, endListener) {
        if (startListener) {
            domEvent.on(element, IS_POINTER ? 'MSPointerDown' : 'mousedown', startListener);
        }

        if (moveListener) {
            domEvent.on(element, IS_POINTER ? 'MSPointerMove' : 'mousemove', moveListener);
        }

        if (endListener) {
            domEvent.on(element, IS_POINTER ? 'MSPointerUp' : 'mouseup', endListener);
        }

        if (IS_TOUCH && !IS_POINTER) {
            if (startListener) {
                domEvent.on(element, 'touchstart', startListener);
            }

            if (moveListener) {
                domEvent.on(element, 'touchmove', moveListener);
            }

            if (endListener) {
                domEvent.on(element, 'touchend', endListener);
            }
        }
    },

    offGesture: function (element, startListener, moveListener, endListener) {
        if (startListener) {
            domEvent.off(element, (IS_POINTER) ? 'MSPointerDown' : 'mousedown', startListener);
        }

        if (moveListener) {
            domEvent.off(element, (IS_POINTER) ? 'MSPointerMove' : 'mousemove', moveListener);
        }

        if (endListener) {
            domEvent.off(element, (IS_POINTER) ? 'MSPointerUp' : 'mouseup', endListener);
        }

        if (IS_TOUCH && !IS_POINTER) {
            if (startListener) {
                domEvent.off(element, 'touchstart', startListener);
            }

            if (moveListener) {
                domEvent.off(element, 'touchmove', moveListener);
            }

            if (endListener) {
                domEvent.off(element, 'touchend', endListener);
            }
        }
    },

    redirectMouseEvents: function (node, graph, state, down, move, up, dblClick) {
        var getState = function (evt) {
            return (typeof(state) == 'function') ? state(evt) : state;
        };

        domEvent.onGesture(node,
            function (evt) {
                if (down !== null) {
                    down(evt);
                } else if (!domEvent.isConsumed(evt)) {
                    graph.fireMouseEvent(domEvent.MOUSE_DOWN, new MouseEvent(evt, getState(evt)));
                }
            },
            function (evt) {
                if (move !== null) {
                    move(evt);
                } else if (!domEvent.isConsumed(evt)) {
                    graph.fireMouseEvent(domEvent.MOUSE_MOVE, new MouseEvent(evt, getState(evt)));
                }
            },
            function (evt) {
                if (up !== null) {
                    up(evt);
                } else if (!domEvent.isConsumed(evt)) {
                    graph.fireMouseEvent(domEvent.MOUSE_UP, new MouseEvent(evt, getState(evt)));
                }
            });

        domEvent.on(node, 'dblclick', function (evt) {
            if (dblClick !== null) {
                dblClick(evt);
            } else if (!domEvent.isConsumed(evt)) {
                var tmp = getState(evt);
                graph.dblClick(evt, (tmp !== null) ? tmp.cell : null);
            }
        });
    },

    onMouseWheel: function (callback) {
        if (!callback) {
            return;
        }

        var wheelHandler = function (evt) {

            // IE does not give an event object but the
            // global event object is the mousewheel event
            // at this point in time.
            evt = evt || window.event;

            var delta = 0;

            if (detector.IS_FF) {
                delta = -evt.detail / 2;
            } else {
                delta = evt.wheelDelta / 120;
            }

            // Handles the event using the given function
            if (delta !== 0) {
                callback(evt, delta > 0);
            }
        };

        // Webkit has NS event API, but IE event name and details
        if (detector.IS_NS && !document.documentMode) {
            var eventName = (detector.IS_SF || detector.IS_GC) ? 'mousewheel' : 'DOMMouseScroll';
            domEvent.on(window, eventName, wheelHandler);
        } else {
            domEvent.on(document, 'mousewheel', wheelHandler);
        }

    },

    getSource: function (evt) {
        return evt.srcElement || evt.target;
    },

    getMainEvent: function (e) {
        if ((e.type === 'touchstart' || e.type === 'touchmove') && e.touches && e.touches[0]) {
            e = e.touches[0];
        } else if (e.type === 'touchend' && e.changedTouches && e.changedTouches[0]) {
            e = e.changedTouches[0];
        }

        return e;
    },

    getClientX: function (e) {
        return domEvent.getMainEvent(e).clientX;
    },

    /**
     * Function: getClientY
     *
     * Returns true if the meta key is pressed for the given event.
     */
    getClientY: function (e) {
        return domEvent.getMainEvent(e).clientY;
    },

    consume: function (evt, preventDefault, stopPropagation) {
        preventDefault = preventDefault ? preventDefault : true;
        stopPropagation = stopPropagation ? stopPropagation : true;

        if (preventDefault) {
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        }

        if (stopPropagation) {
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
        }

        evt.consumed = true;
    },

    isTouchEvent: function (evt) {
        return evt.pointerType ?
            (evt.pointerType === 'touch' || evt.pointerType === evt.MSPOINTER_TYPE_TOUCH) :
            (evt.mozInputSource ? evt.mozInputSource === 5 : evt.type.indexOf('touch') === 0);
    },

    isMultiTouchEvent: function (evt) {
        return evt.type &&
            evt.type.indexOf('touch') === 0 &&
            evt.touches &&
            evt.touches.length > 1;
    },

    isMouseEvent: function (evt) {
        return evt.pointerType ?
            (evt.pointerType === 'mouse' || evt.pointerType === evt.MSPOINTER_TYPE_MOUSE) :
            (evt.mozInputSource ? evt.mozInputSource === 1 : evt.type.indexOf('mouse') === 0);
    },

    isLeftMouseButton: function (evt) {
        return evt.button === ((detector.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) ? 1 : 0);
    },

    isMiddleMouseButton: function (evt) {
        return evt.button === ((
            detector.IS_IE && (
                typeof(document.documentMode) === 'undefined' ||
                document.documentMode < 9
            )) ? 4 : 1);
    },

    isRightMouseButton: function (evt) {
        return evt.button === 2;
    },

    isPopupTrigger: function (evt) {
        return domEvent.isRightMouseButton(evt) || (
            detector.IS_MAC &&
            domEvent.isControlDown(evt) &&
            !domEvent.isShiftDown(evt) &&
            !domEvent.isMetaDown(evt) &&
            !domEvent.isAltDown(evt)
        );
    },

    isShiftDown: function (evt) {
        return evt ? evt.shiftKey : false;
    },

    isAltDown: function (evt) {
        return evt ? evt.altKey : false;
    },

    isControlDown: function (evt) {
        return evt ? evt.ctrlKey : false;
    },

    isMetaDown: function (evt) {
        return evt ? evt.metaKey : false;
    },

    isConsumed: function (evt) {
        return evt.isConsumed !== null && evt.isConsumed;
    },
};

module.exports = domEvent;

},{"../common/detector":24,"../common/utils":26,"./MouseEvent":32}],34:[function(require,module,exports){
module.exports = {

    MOUSE_DOWN: 'mouseDown',
    MOUSE_MOVE: 'mouseMove',
    MOUSE_UP: 'mouseUp',
    GESTURE: 'gesture',

};

},{}],35:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Class = require('../common/class');
var utils = require('../common/utils');
var domEvent = require('../events/domEvent');
var constants = require('../constants');
var Shape = require('../shapes/Shape');
var Rectangle = require('../Rectangle');

var CellHighlight = Class.create({
    constructor: function CellHighlight(graph, highlightColor, strokeWidth, dashed) {
        if (graph !== null) {
            this.graph = graph;
            this.highlightColor = (highlightColor !== null) ? highlightColor : constants.DEFAULT_VALID_COLOR;
            this.strokeWidth = (strokeWidth !== null) ? strokeWidth : constants.HIGHLIGHT_STROKEWIDTH;
            this.dashed = (dashed !== null) ? dashed : false;

            // Updates the marker if the graph changes
            this.repaintHandler = utils.bind(this, function () {
                // Updates reference to state
                if (this.state !== null) {
                    var tmp = this.graph.view.getState(this.state.cell);

                    if (tmp === null) {
                        this.hide();
                    }
                    else {
                        this.state = tmp;
                        this.repaint();
                    }
                }
            });

            this.graph.getView().on(domEvent.SCALE, this.repaintHandler);
            this.graph.getView().on(domEvent.TRANSLATE, this.repaintHandler);
            this.graph.getView().on(domEvent.SCALE_AND_TRANSLATE, this.repaintHandler);
            this.graph.getModel().on(domEvent.CHANGE, this.repaintHandler);

            // Hides the marker if the current root changes
            this.resetHandler = utils.bind(this, function () {
                this.hide();
            });

            this.graph.getView().on(domEvent.DOWN, this.resetHandler);
            this.graph.getView().on(domEvent.UP, this.resetHandler);
        }
    },

    keepOnTop: false,

    graph: true,

    state: null,

    spacing: 2,

    resetHandler: null,

    setHighlightColor: function (color) {
        this.highlightColor = color;

        if (this.shape !== null) {
            this.shape.stroke = color;
        }
    },

    drawHighlight: function () {
        this.shape = this.createShape();
        this.repaint();

        if (!this.keepOnTop && this.shape.node.parentNode.firstChild !== this.shape.node) {
            this.shape.node.parentNode.insertBefore(this.shape.node, this.shape.node.parentNode.firstChild);
        }
    },

    createShape: function () {
        var key = this.state.style[constants.STYLE_SHAPE];
        var stencil = mxStencilRegistry.getStencil(key);
        var shape = null;

        if (stencil !== null) {
            shape = new Shape(stencil);
        }
        else {
            shape = new this.state.shape.constructor();
        }

        shape.scale = this.state.view.scale;
        shape.outline = true;
        shape.points = this.state.absolutePoints;
        shape.apply(this.state);
        shape.strokewidth = this.strokeWidth / this.state.view.scale / this.state.view.scale;
        shape.arrowStrokewidth = this.strokeWidth;
        shape.stroke = this.highlightColor;
        shape.isDashed = this.dashed;
        shape.isShadow = false;

        shape.dialect = (this.graph.dialect !== constants.DIALECT_SVG) ? constants.DIALECT_VML : constants.DIALECT_SVG;
        shape.init(this.graph.getView().getOverlayPane());
        domEvent.redirectMouseEvents(shape.node, this.graph, this.state);

        if (this.graph.dialect !== constants.DIALECT_SVG) {
            shape.pointerEvents = false;
        }
        else {
            shape.svgPointerEvents = 'stroke';
        }

        return shape;
    },


    repaint: function () {
        if (this.state !== null && this.shape !== null) {
            if (this.graph.model.isEdge(this.state.cell)) {
                this.shape.points = this.state.absolutePoints;
            }
            else {
                this.shape.bounds = new Rectangle(this.state.x - this.spacing, this.state.y - this.spacing,
                    this.state.width + 2 * this.spacing, this.state.height + 2 * this.spacing);
                this.shape.rotation = Number(this.state.style[constants.STYLE_ROTATION] || '0');
            }

            // Uses cursor from shape in highlight
            if (this.state.shape !== null) {
                this.shape.setCursor(this.state.shape.getCursor());
            }

            this.shape.redraw();
        }
    },

    hide: function () {
        this.highlight(null);
    },

    highlight: function (state) {
        if (this.state !== state) {
            if (this.shape !== null) {
                this.shape.destroy();
                this.shape = null;
            }

            this.state = state;

            if (this.state !== null) {
                this.drawHighlight();
            }
        }
    },

    destroy: function () {
        this.graph.getView().removeListener(this.resetHandler);
        this.graph.getView().removeListener(this.repaintHandler);
        this.graph.getModel().removeListener(this.repaintHandler);

        if (this.shape !== null) {
            this.shape.destroy();
            this.shape = null;
        }
    },

});

module.exports = CellHighlight;



},{"../Rectangle":11,"../common/class":23,"../common/utils":26,"../constants":27,"../events/domEvent":33,"../shapes/Shape":46}],36:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var EventObject = require('../events/EventObject');
var EventSource = require('../events/EventSource');
var domEvent = require('../events/domEvent');
var constants = require('../constants');
var CellHighlight = require('./CellHighlight');
var EventSource = require('../events/EventSource');
//var utils = require('../common/utils');
var Rectangle = require('../Rectangle');

var CellMarker = EventSource.extend({
    constructor: function CellMarker(graph, validColor, invalidColor, hotspot) {
        EventSource.call(this);

        if (graph !== null) {
            this.graph = graph;
            this.validColor = (validColor !== null) ? validColor : constants.DEFAULT_VALID_COLOR;
            this.invalidColor = (validColor !== null) ? invalidColor : constants.DEFAULT_INVALID_COLOR;
            this.hotspot = (hotspot !== null) ? hotspot : constants.DEFAULT_HOTSPOT;

            this.highlight = new CellHighlight(graph);
        }
    },

    currentColor   : null,
    enabled        : true,
    graph          : null,
    invalidColor   : null,
    markedState    : null,
    validColor     : null,
    validState     : null,
    hotspotEnabled : false,
    hotspot        : constants.DEFAULT_HOTSPOT,

    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    isEnabled: function () {
        return this.enabled;
    },

    setHotspot: function (hotspot) {
        this.hotspot = hotspot;
    },

    getHotspot: function () {
        return this.hotspot;
    },

    setHotspotEnabled: function (enabled) {
        this.hotspotEnabled = enabled;
    },

    isHotspotEnabled: function () {
        return this.hotspotEnabled;
    },

    hasValidState: function () {
        return this.validState !== null;
    },

    getValidState: function () {
        return this.validState;
    },

    getMarkedState: function () {
        return this.markedState;
    },

    reset: function () {
        this.validState = null;

        if (this.markedState !== null) {
            this.markedState = null;
            this.unmark();
        }
    },

    process: function (me) {
        var state = null;

        if (this.isEnabled()) {
            state = this.getState(me);
            this.setCurrentState(state, me);
        }

        return state;
    },

    setCurrentState: function (state, me, color) {
        var isValid = (state !== null) ? this.isValidState(state) : false;
        color = (color !== null) ? color : this.getMarkerColor(me.getEvent(), state, isValid);

        if (isValid) {
            this.validState = state;
        }
        else {
            this.validState = null;
        }

        if (state !== this.markedState || color !== this.currentColor) {
            this.currentColor = color;

            if (state !== null && this.currentColor !== null) {
                this.markedState = state;
                this.mark();
            }
            else if (this.markedState !== null) {
                this.markedState = null;
                this.unmark();
            }
        }
    },

    markCell: function (cell, color) {
        var state = this.graph.getView().getState(cell);

        if (state !== null) {
            this.currentColor = (color !== null) ? color : this.validColor;
            this.markedState = state;
            this.mark();
        }
    },

    mark: function () {
        this.highlight.setHighlightColor(this.currentColor);
        this.highlight.highlight(this.markedState);
        this.fireEvent(new EventObject(domEvent.MARK, 'state', this.markedState));
    },

    unmark: function () {
        this.mark();
    },

    isValidState: function (/*state*/) {
        return true;
    },

    getMarkerColor: function (evt, state, isValid) {
        return (isValid) ? this.validColor : this.invalidColor;
    },

    getState: function (me) {
        var view = this.graph.getView();
        var cell = this.getCell(me);
        var state = this.getStateToMark(view.getState(cell));

        return (state !== null && this.intersects(state, me)) ? state : null;
    },

    getCell: function (me) {
        return me.getCell();
    },

    getStateToMark: function (state) {
        return state;
    },

    intersects: function (state, me) {
        if (this.hotspotEnabled) {
            return Rectangle.intersectsHotspot(state, me.getGraphX(), me.getGraphY(),
                this.hotspot, constants.MIN_HOTSPOT_SIZE,
                constants.MAX_HOTSPOT_SIZE);
        }

        return true;
    },

    destroy: function () {
        this.graph.getView().removeListener(this.resetHandler);
        this.graph.getModel().removeListener(this.resetHandler);
        this.highlight.destroy();
    },
});

module.exports = CellMarker;



},{"../Rectangle":11,"../constants":27,"../events/EventObject":30,"../events/EventSource":31,"../events/domEvent":33,"./CellHighlight":35}],37:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

//var Class = require('./common/class');
var Cell = require('../Cell');
var CellMarker = require('./CellMarker');
var ConstraintHandler = require('./ConstraintHandler');
var EventObject = require('../events/EventObject');
var EventSource = require('../events/EventSource');
var Geometry = require('../Geometry');
var ImageShape = require('../shapes/ImageShape');
var MouseEvent = require('../events/MouseEvent');
var Point = require('../Point');
var Polyline = require('../shapes/Polyline');
var Rectangle = require('../Rectangle');
var constants = require('../constants');
var domEvent = require('../events/domEvent');
var utils = require('../common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

var ConnectionHandler = EventSource.extend({
    constructor: function ConnectionHandler(graph, factoryMethod) {
        var that = this;
        EventSource.call(that);
        if (graph != null) {
            this.graph = graph;
            this.factoryMethod = factoryMethod;
            this.init();

            // Handles escape keystrokes
            this.escapeHandler = utils.bind(that, function (/*sender, evt*/) {
                this.reset();
            });
            this.graph.on(domEvent.ESCAPE, this.escapeHandler);
        }
    },

    graph: null,

    factoryMethod: true,

    moveIconFront: false,

    moveIconBack: false,

    connectImage: null,

    targetConnectImage: false,

    enabled: true,

    select: true,

    createTarget: false,

    marker: null,

    constraintHandler: null,

    error: null,

    waypointsEnabled: false,

    ignoreMouseDown: false,

    first: null,

    connectIconOffset: new Point(0, constants.TOOLTIP_VERTICAL_OFFSET),

    edgeState: null,

    changeHandler: null,

    drillHandler: null,

    mouseDownCounter: 0,

    outlineConnect: false,

    isEnabled: function () {
        return this.enabled;
    },

    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    isCreateTarget: function () {
        return this.createTarget;
    },

    setCreateTarget: function (value) {
        this.createTarget = value;
    },

    createShape: function () {
        // Creates the edge preview
        var shape = new Polyline([], constants.INVALID_COLOR);
        shape.dialect = (this.graph.dialect != constants.DIALECT_SVG) ?
            constants.DIALECT_VML : constants.DIALECT_SVG;
        shape.pointerEvents = false;
        shape.isDashed = true;
        shape.init(this.graph.getView().getOverlayPane());
        domEvent.redirectMouseEvents(shape.node, this.graph, null);

        return shape;
    },

    init: function () {
        this.graph.addMouseListener(this);
        this.marker = this.createMarker();
        this.constraintHandler = new ConstraintHandler(this.graph);

        // Redraws the icons if the graph changes
        this.changeHandler = utils.bind(this, function (/*sender*/) {
            if (!isNullOrUndefined(this.iconState)) {
                this.iconState = this.graph.getView().getState(this.iconState.cell);
            }

            if (!isNullOrUndefined(this.iconState)) {
                this.redrawIcons(this.icons, this.iconState);
                this.constraintHandler.reset();
            }
            else {
                this.reset();
            }
        });

        this.graph.getModel().on(domEvent.CHANGE, this.changeHandler);
        this.graph.getView().on(domEvent.SCALE, this.changeHandler);
        this.graph.getView().on(domEvent.TRANSLATE, this.changeHandler);
        this.graph.getView().on(domEvent.SCALE_AND_TRANSLATE, this.changeHandler);

        // Removes the icon if we step into/up or start editing
        this.drillHandler = utils.bind(this, function (/*sender*/) {
            this.reset();
        });

        this.graph.on(domEvent.START_EDITING, this.drillHandler);
        this.graph.getView().on(domEvent.DOWN, this.drillHandler);
        this.graph.getView().on(domEvent.UP, this.drillHandler);
    },

    isConnectableCell: function (/*cell*/) {
        return true;
    },

    createMarker: function () {
        var marker = new CellMarker(this.graph);
        marker.hotspotEnabled = true;

        // Overrides to return cell at location only if valid (so that
        // there is no highlight for invalid cells)
        marker.getCell = utils.bind(this, function (me, cell) {
            cell = CellMarker.prototype.getCell.apply(marker, arguments);
            var scale = this.graph.view.scale;
            var point = new Point(this.graph.snap(me.getGraphX() / scale) * scale,
                this.graph.snap(me.getGraphY() / scale) * scale);
            this.error = null;

            // Checks for cell under mouse
            if (cell === null) {
                cell = this.getCellAt(point.x, point.y);
            }

            if ((this.graph.isSwimlane(cell) && this.graph.hitsSwimlaneContent(cell, point.x, point.y)) || !this.isConnectableCell(cell)) {
                cell = null;
            }

            if (cell != null) {
                if (this.isConnecting()) {
                    if (this.previous != null) {
                        this.error = this.validateConnection(this.previous.cell, cell);

                        if (this.error != null && this.error.length === 0) {
                            cell = null;

                            // Enables create target inside groups
                            if (this.isCreateTarget()) {
                                this.error = null;
                            }
                        }
                    }
                }
                else if (!this.isValidSource(cell, me)) {
                    cell = null;
                }
            }
            else if (this.isConnecting() && !this.isCreateTarget() && !this.graph.allowDanglingEdges) {
                this.error = '';
            }

            return cell;
        });

        // Sets the highlight color according to validateConnection
        marker.isValidState = utils.bind(this, function (/*state*/) {
            if (this.isConnecting()) {
                return this.error === null;
            }
            else {
                return CellMarker.prototype.isValidState.apply(marker, arguments);
            }
        });

        // Overrides to use marker color only in highlight mode or for
        // target selection
        marker.getMarkerColor = utils.bind(this, function (/*evt, state, isValid*/) {
            return (this.connectImage === null || this.isConnecting()) ?
                CellMarker.prototype.getMarkerColor.apply(marker, arguments) :
                null;
        });

        // Overrides to use hotspot only for source selection otherwise
        // intersects always returns true when over a cell
        marker.intersects = utils.bind(this, function (/*state, evt*/) {
            if (this.connectImage != null || this.isConnecting()) {
                return true;
            }

            return CellMarker.prototype.intersects.apply(marker, arguments);
        });

        return marker;
    },

    start: function (state, x, y, edgeState) {
        this.previous = state;
        this.first = new Point(x, y);
        this.edgeState = (edgeState != null) ? edgeState : this.createEdgeState(null);

        // Marks the source state
        this.marker.currentColor = this.marker.validColor;
        this.marker.markedState = state;
        this.marker.mark();

        this.fireEvent(new EventObject(domEvent.START, 'state', this.previous));
    },

    getCellAt: function (x, y) {
        return (!this.outlineConnect) ? this.graph.getCellAt(x, y) : null;
    },

    isConnecting: function () {
        return this.first != null && this.shape != null;
    },

    isValidSource: function (cell/*, me*/) {
        return this.graph.isValidSource(cell);
    },

    isValidTarget: function (/*cell*/) {
        return true;
    },

    validateConnection: function (source, target) {
        if (!this.isValidTarget(target)) {
            return '';
        }

        return this.graph.getEdgeValidationError(null, source, target);
    },

    getConnectImage: function (/*state*/) {
        return this.connectImage;
    },

    isMoveIconToFrontForState: function (state) {
        if (state.text != null && state.text.node.parentNode === this.graph.container) {
            return true;
        }

        return this.moveIconFront;
    },

    createIcons: function (state) {
        var image = this.getConnectImage(state);

        if (image != null && state != null) {
            this.iconState = state;
            var icons = [];

            // Cannot use HTML for the connect icons because the icon receives all
            // mouse move events in IE, must use VML and SVG instead even if the
            // connect-icon appears behind the selection border and the selection
            // border consumes the events before the icon gets a chance
            var bounds = new Rectangle(0, 0, image.width, image.height);
            var icon = new ImageShape(bounds, image.src, null, null, 0);
            icon.preserveImageAspect = false;

            if (this.isMoveIconToFrontForState(state)) {
                icon.dialect = constants.DIALECT_STRICTHTML;
                icon.init(this.graph.container);
            }
            else {
                icon.dialect = (this.graph.dialect === constants.DIALECT_SVG) ?
                    constants.DIALECT_SVG : constants.DIALECT_VML;
                icon.init(this.graph.getView().getOverlayPane());

                // Move the icon back in the overlay pane
                if (this.moveIconBack && icon.node.previousSibling != null) {
                    icon.node.parentNode.insertBefore(icon.node, icon.node.parentNode.firstChild);
                }
            }

            icon.node.style.cursor = constants.CURSOR_CONNECT;

            // Events transparency
            var getState = utils.bind(this, function () {
                return (this.currentState != null) ? this.currentState : state;
            });

            // Updates the local icon before firing the mouse down event.
            var mouseDown = utils.bind(this, function (evt) {
                if (!domEvent.isConsumed(evt)) {
                    this.icon = icon;
                    this.graph.fireMouseEvent(domEvent.MOUSE_DOWN,
                        new MouseEvent(evt, getState()));
                }
            });

            domEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);

            icons.push(icon);
            this.redrawIcons(icons, this.iconState);

            return icons;
        }

        return null;
    },

    redrawIcons: function (icons, state) {
        if (icons != null && icons[0] != null && state != null) {
            var pos = this.getIconPosition(icons[0], state);
            icons[0].bounds.x = pos.x;
            icons[0].bounds.y = pos.y;
            icons[0].redraw();
        }
    },

    getIconPosition: function (icon, state) {
        var scale = this.graph.getView().scale;
        var cx = state.getCenterX();
        var cy = state.getCenterY();

        if (this.graph.isSwimlane(state.cell)) {
            var size = this.graph.getStartSize(state.cell);

            cx = (size.width != 0) ? state.x + size.width * scale / 2 : cx;
            cy = (size.height != 0) ? state.y + size.height * scale / 2 : cy;

            var alpha = utils.toRadians(utils.getValue(state.style, constants.STYLE_ROTATION) || 0);

            if (alpha != 0) {
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);
                var ct = new Point(state.getCenterX(), state.getCenterY());
                var pt = Point.getRotatedPoint(new Point(cx, cy), cos, sin, ct);
                cx = pt.x;
                cy = pt.y;
            }
        }

        return new Point(cx - icon.bounds.width / 2,
            cy - icon.bounds.height / 2);
    },

    destroyIcons: function () {
        if (this.icons != null) {
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].destroy();
            }

            this.icons = null;
            this.icon = null;
            this.selectedIcon = null;
            this.iconState = null;
        }
    },

    isStartEvent: function (/*me*/) {
        return ((this.constraintHandler.currentFocus != null && this.constraintHandler.currentConstraint != null) ||
        (this.previous != null && this.error === null && (this.icons === null || (this.icons != null &&
        this.icon != null))));
    },

    mouseDown: function (sender, me) {
        this.mouseDownCounter++;

        if (this.isEnabled() && this.graph.isEnabled() && !me.isConsumed() && !this.isConnecting() && this.isStartEvent(me)) {
            if (this.constraintHandler.currentConstraint != null &&
                this.constraintHandler.currentFocus != null &&
                this.constraintHandler.currentPoint != null) {
                this.sourceConstraint = this.constraintHandler.currentConstraint;
                this.previous = this.constraintHandler.currentFocus;
                this.first = this.constraintHandler.currentPoint.clone();
            }
            else {
                // Stores the location of the initial mousedown
                this.first = new Point(me.getGraphX(), me.getGraphY());
            }

            this.edgeState = this.createEdgeState(me);
            this.mouseDownCounter = 1;

            if (this.waypointsEnabled && this.shape === null) {
                this.waypoints = null;
                this.shape = this.createShape();

                if (this.edgeState != null) {
                    this.shape.apply(this.edgeState);
                }
            }

            // Stores the starting point in the geometry of the preview
            if (this.previous === null && this.edgeState != null) {
                var pt = this.graph.getPointForEvent(me.getEvent());
                this.edgeState.cell.geometry.setTerminalPoint(pt, true);
            }

            this.fireEvent(new EventObject(domEvent.START, 'state', this.previous));

            me.consume();
        }

        this.selectedIcon = this.icon;
        this.icon = null;
    },

    isImmediateConnectSource: function (state) {
        return !this.graph.isCellMovable(state.cell);
    },

    createEdgeState: function () {
        return null;
    },

    isOutlineConnectEvent: function (me) {
        return this.outlineConnect && !domEvent.isShiftDown(me.getEvent()) &&
            (me.isSource(this.marker.highlight.shape) || domEvent.isAltDown(me.getEvent()));
    },

    updateCurrentState: function (me, point) {
        this.constraintHandler.update(me, this.first === null);

        if (this.constraintHandler.currentFocus != null && this.constraintHandler.currentConstraint != null) {
            this.marker.reset();

            // Updates validation state
            if (this.previous != null) {
                this.error = this.validateConnection(this.previous.cell, this.constraintHandler.currentFocus.cell);

                if (this.error === null) {
                    this.currentState = this.constraintHandler.currentFocus;
                }
                else {
                    this.constraintHandler.reset();
                }
            }
        }
        else {
            this.marker.process(me);
            this.currentState = this.marker.getValidState();

            if (this.currentState != null && this.isOutlineConnectEvent(me)) {
                var constraint = this.graph.getOutlineConstraint(point, this.currentState, me);
                this.constraintHandler.currentConstraint = constraint;
                this.constraintHandler.currentFocus = this.currentState;
                this.constraintHandler.currentPoint = point;
            }
        }

        if (this.outlineConnect) {
            if (this.marker.highlight != null && this.marker.highlight.shape != null) {
                if (this.constraintHandler.currentConstraint != null &&
                    this.constraintHandler.currentFocus != null) {
                    this.marker.highlight.shape.stroke = constants.OUTLINE_HIGHLIGHT_COLOR;
                    this.marker.highlight.shape.strokewidth = constants.OUTLINE_HIGHLIGHT_STROKEWIDTH / this.graph.view.scale / this.graph.view.scale;
                    this.marker.highlight.repaint();
                }
                else if (this.marker.hasValidState()) {
                    this.marker.highlight.shape.stroke = constants.DEFAULT_VALID_COLOR;
                    this.marker.highlight.shape.strokewidth = constants.HIGHLIGHT_STROKEWIDTH / this.graph.view.scale / this.graph.view.scale;
                    this.marker.highlight.repaint();
                }
            }
        }
    },

    convertWaypoint: function (point) {
        var scale = this.graph.getView().getScale();
        var tr = this.graph.getView().getTranslate();

        point.x = point.x / scale - tr.x;
        point.y = point.y / scale - tr.y;
    },

    mouseMove: function (sender, me) {
        if (!me.isConsumed() && (this.ignoreMouseDown || this.first != null || !this.graph.isMouseDown)) {
            // Handles special case when handler is disabled during highlight
            if (!this.isEnabled() && this.currentState != null) {
                this.destroyIcons();
                this.currentState = null;
            }

            var view = this.graph.getView();
            var scale = view.scale;
            var tr = view.translate;
            var point = new Point(me.getGraphX(), me.getGraphY());
            this.error = null;

            if (this.graph.isGridEnabledEvent(me.getEvent())) {
                point = new Point((this.graph.snap(point.x / scale - tr.x) + tr.x) * scale,
                    (this.graph.snap(point.y / scale - tr.y) + tr.y) * scale);
            }

            this.currentPoint = point;

            if (this.first != null || (this.isEnabled() && this.graph.isEnabled())) {
                this.updateCurrentState(me, point);
            }

            if (this.first != null) {
                var constraint = null;
                var current = point;

                // Uses the current point from the constraint handler if available
                if (this.constraintHandler.currentConstraint != null &&
                    this.constraintHandler.currentFocus != null &&
                    this.constraintHandler.currentPoint != null) {
                    constraint = this.constraintHandler.currentConstraint;
                    current = this.constraintHandler.currentPoint.clone();
                }
                else if (this.previous != null && domEvent.isShiftDown(me.getEvent())) {
                    if (Math.abs(this.previous.getCenterX() - point.x) < Math.abs(this.previous.getCenterY() - point.y)) {
                        point.x = this.previous.getCenterX();
                    }
                    else {
                        point.y = this.previous.getCenterY();
                    }
                }

                var pt2 = this.first;

                // Moves the connect icon with the mouse
                if (this.selectedIcon != null) {
                    var w = this.selectedIcon.bounds.width;
                    var h = this.selectedIcon.bounds.height;

                    if (this.currentState != null && this.targetConnectImage) {
                        var pos = this.getIconPosition(this.selectedIcon, this.currentState);
                        this.selectedIcon.bounds.x = pos.x;
                        this.selectedIcon.bounds.y = pos.y;
                    }
                    else {
                        var bounds = new Rectangle(me.getGraphX() + this.connectIconOffset.x,
                            me.getGraphY() + this.connectIconOffset.y, w, h);
                        this.selectedIcon.bounds = bounds;
                    }

                    this.selectedIcon.redraw();
                }

                // Uses edge state to compute the terminal points
                if (this.edgeState != null) {
                    this.edgeState.absolutePoints = [null, (this.currentState != null) ? null : current];
                    this.graph.view.updateFixedTerminalPoint(this.edgeState, this.previous, true, this.sourceConstraint);

                    if (this.currentState != null) {
                        if (constraint === null) {
                            constraint = this.graph.getConnectionConstraint(this.edgeState, this.previous, false);
                        }

                        this.edgeState.setAbsoluteTerminalPoint(null, false);
                        this.graph.view.updateFixedTerminalPoint(this.edgeState, this.currentState, false, constraint);
                    }

                    // Scales and translates the waypoints to the model
                    var realPoints = null;

                    if (this.waypoints != null) {
                        realPoints = [];

                        for (var i = 0; i < this.waypoints.length; i++) {
                            var pt = this.waypoints[i].clone();
                            this.convertWaypoint(pt);
                            realPoints[i] = pt;
                        }
                    }

                    this.graph.view.updatePoints(this.edgeState, realPoints, this.previous, this.currentState);
                    this.graph.view.updateFloatingTerminalPoints(this.edgeState, this.previous, this.currentState);
                    current = this.edgeState.absolutePoints[this.edgeState.absolutePoints.length - 1];
                    pt2 = this.edgeState.absolutePoints[0];
                }
                else {
                    if (this.currentState != null) {
                        if (this.constraintHandler.currentConstraint === null) {
                            var tmp = this.getTargetPerimeterPoint(this.currentState, me);

                            if (tmp != null) {
                                current = tmp;
                            }
                        }
                    }

                    // Computes the source perimeter point
                    if (this.sourceConstraint === null && this.previous != null) {
                        var next = (this.waypoints != null && this.waypoints.length > 0) ?
                            this.waypoints[0] : current;
                        var _tmp = this.getSourcePerimeterPoint(this.previous, next, me);

                        if (_tmp != null) {
                            pt2 = _tmp;
                        }
                    }
                }

                // Makes sure the cell under the mousepointer can be detected
                // by moving the preview shape away from the mouse. This
                // makes sure the preview shape does not prevent the detection
                // of the cell under the mousepointer even for slow gestures.
                if (this.currentState === null && this.movePreviewAway) {
                    var tmp1 = pt2;

                    if (this.edgeState != null && this.edgeState.absolutePoints.length > 2) {
                        var tmp2 = this.edgeState.absolutePoints[this.edgeState.absolutePoints.length - 2];

                        if (tmp2 != null) {
                            tmp1 = tmp2;
                        }
                    }

                    var dx = current.x - tmp1.x;
                    var dy = current.y - tmp1.y;

                    var len = Math.sqrt(dx * dx + dy * dy);

                    if (len === 0) {
                        return;
                    }

                    current.x -= dx * 4 / len;
                    current.y -= dy * 4 / len;
                }

                // Creates the preview shape (lazy)
                if (this.shape === null) {
                    var _dx = Math.abs(point.x - this.first.x);
                    var _dy = Math.abs(point.y - this.first.y);

                    if (_dx > this.graph.tolerance || _dy > this.graph.tolerance) {
                        this.shape = this.createShape();

                        if (this.edgeState != null) {
                            this.shape.apply(this.edgeState);
                        }

                        // Revalidates current connection
                        this.updateCurrentState(me, point);
                    }
                }

                // Updates the points in the preview edge
                if (this.shape != null) {
                    if (this.edgeState != null) {
                        this.shape.points = this.edgeState.absolutePoints;
                    }
                    else {
                        var pts = [pt2];

                        if (this.waypoints != null) {
                            pts = pts.concat(this.waypoints);
                        }

                        pts.push(current);
                        this.shape.points = pts;
                    }

                    this.drawPreview();
                }

                domEvent.consume(me.getEvent());
                me.consume();
            }
            else if (!this.isEnabled() || !this.graph.isEnabled()) {
                this.constraintHandler.reset();
            }
            else if (this.previous != this.currentState && this.edgeState === null) {
                this.destroyIcons();

                // Sets the cursor on the current shape
                if (this.currentState != null && this.error === null && this.constraintHandler.currentConstraint === null) {
                    this.icons = this.createIcons(this.currentState);

                    if (this.icons === null) {
                        this.currentState.setCursor(constants.CURSOR_CONNECT);
                        me.consume();
                    }
                }

                this.previous = this.currentState;
            }
            else if (this.previous === this.currentState && this.currentState != null && this.icons === null && !this.graph.isMouseDown) {
                // Makes sure that no cursors are changed
                me.consume();
            }

            if (!this.graph.isMouseDown && this.currentState != null && this.icons != null) {
                var hitsIcon = false;
                var target = me.getSource();

                for (var j = 0; j < this.icons.length && !hitsIcon; j++) {
                    hitsIcon = target === this.icons[j].node || target.parentNode === this.icons[j].node;
                }

                if (!hitsIcon) {
                    this.updateIcons(this.currentState, this.icons, me);
                }
            }
        }
        else {
            this.constraintHandler.reset();
        }
    },

    getTargetPerimeterPoint: function (state/*, me*/) {
        var result = null;
        var view = state.view;
        var targetPerimeter = view.getPerimeterFunction(state);

        if (targetPerimeter != null) {
            var next = (this.waypoints != null && this.waypoints.length > 0) ?
                this.waypoints[this.waypoints.length - 1] :
                new Point(this.previous.getCenterX(), this.previous.getCenterY());
            var tmp = targetPerimeter(view.getPerimeterBounds(state),
                this.edgeState, next, false);

            if (tmp != null) {
                result = tmp;
            }
        }
        else {
            result = new Point(state.getCenterX(), state.getCenterY());
        }

        return result;
    },

    getSourcePerimeterPoint: function (state, next/*, me*/) {
        var result = null;
        var view = state.view;
        var sourcePerimeter = view.getPerimeterFunction(state);
        var c = new Point(state.getCenterX(), state.getCenterY());

        if (sourcePerimeter != null) {
            var theta = utils.getValue(state.style, constants.STYLE_ROTATION, 0);
            var rad = -theta * (Math.PI / 180);

            if (theta != 0) {
                next = Point.getRotatedPoint(new Point(next.x, next.y), Math.cos(rad), Math.sin(rad), c);
            }

            var tmp = sourcePerimeter(view.getPerimeterBounds(state), state, next, false);

            if (tmp != null) {
                if (theta != 0) {
                    tmp = Point.getRotatedPoint(new Point(tmp.x, tmp.y), Math.cos(-rad), Math.sin(-rad), c);
                }

                result = tmp;
            }
        }
        else {
            result = c;
        }

        return result;
    },


    updateIcons: function (/*state, icons, me*/) {
        // empty
    },

    isStopEvent: function (me) {
        return me.getState() != null;
    },

    addWaypointForEvent: function (me) {
        var point = Point.convertPoint(this.graph.container, me.getX(), me.getY());
        var dx = Math.abs(point.x - this.first.x);
        var dy = Math.abs(point.y - this.first.y);
        var addPoint = this.waypoints != null || (this.mouseDownCounter > 1 &&
            (dx > this.graph.tolerance || dy > this.graph.tolerance));

        if (addPoint) {
            if (this.waypoints === null) {
                this.waypoints = [];
            }

            var scale = this.graph.view.scale;
            point = new Point(this.graph.snap(me.getGraphX() / scale) * scale,
                this.graph.snap(me.getGraphY() / scale) * scale);
            this.waypoints.push(point);
        }
    },

    mouseUp: function (sender, me) {
        if (!me.isConsumed() && this.isConnecting()) {
            if (this.waypointsEnabled && !this.isStopEvent(me)) {
                this.addWaypointForEvent(me);
                me.consume();

                return;
            }

            // Inserts the edge if no validation error exists
            if (this.error === null) {
                var source = (this.previous != null) ? this.previous.cell : null;
                var target = null;

                if (this.constraintHandler.currentConstraint != null &&
                    this.constraintHandler.currentFocus != null) {
                    target = this.constraintHandler.currentFocus.cell;
                }

                if (target === null && this.marker.hasValidState()) {
                    target = this.marker.validState.cell;
                }

                this.connect(source, target, me.getEvent(), me.getCell());
            }
            else {
                // Selects the source terminal for self-references
                if (this.previous != null && this.marker.validState != null &&
                    this.previous.cell === this.marker.validState.cell) {
                    this.graph.selectCellForEvent(this.marker.source/*, evt*/);
                }

                // Displays the error message if it is not an empty string,
                // for empty error messages, the event is silently dropped
                if (this.error.length > 0) {
                    this.graph.validationAlert(this.error);
                }
            }

            // Redraws the connect icons and resets the handler state
            this.destroyIcons();
            me.consume();
        }

        if (this.first != null) {
            this.reset();
        }
    },

    /**
     * Function: reset
     *
     * Resets the state of this handler.
     */
    reset: function () {
        if (!isNullOrUndefined(this.shape)) {
            this.shape.destroy();
            this.shape = null;
        }

        this.destroyIcons();
        this.marker.reset();
        this.constraintHandler.reset();
        this.edgeState = null;
        this.previous = null;
        this.error = null;
        this.sourceConstraint = null;
        this.mouseDownCounter = 0;
        this.first = null;

        this.fireEvent(new EventObject(domEvent.RESET));
    },

    /**
     * Function: drawPreview
     *
     * Redraws the preview edge using the color and width returned by
     * <getEdgeColor> and <getEdgeWidth>.
     */
    drawPreview: function () {
        var valid = this.error === null;
        this.shape.strokewidth = this.getEdgeWidth(valid);
        var color = this.getEdgeColor(valid);
        this.shape.stroke = color;
        this.shape.redraw();
    },

    /**
     * Function: getEdgeColor
     *
     * Returns the color used to draw the preview edge. This returns green if
     * there is no edge validation error and red otherwise.
     *
     * Parameters:
     *
     * valid - Boolean indicating if the color for a valid edge should be
     * returned.
     */
    getEdgeColor: function (valid) {
        return (valid) ? constants.VALID_COLOR : constants.INVALID_COLOR;
    },

    /**
     * Function: getEdgeWidth
     *
     * Returns the width used to draw the preview edge. This returns 3 if
     * there is no edge validation error and 1 otherwise.
     *
     * Parameters:
     *
     * valid - Boolean indicating if the width for a valid edge should be
     * returned.
     */
    getEdgeWidth: function (valid) {
        return (valid) ? 3 : 1;
    },

    /**
     * Function: connect
     *
     * Connects the given source and target using a new edge. This
     * implementation uses <createEdge> to create the edge.
     *
     * Parameters:
     *
     * source - <mxCell> that represents the source terminal.
     * target - <mxCell> that represents the target terminal.
     * evt - Mousedown event of the connect gesture.
     * dropTarget - <mxCell> that represents the cell under the mouse when it was
     * released.
     */
    connect: function (source, target, evt, dropTarget) {
        if (target != null || this.isCreateTarget() || this.graph.allowDanglingEdges) {
            // Uses the common parent of source and target or
            // the default parent to insert the edge
            var model = this.graph.getModel();
            var terminalInserted = false;
            var edge = null;

            model.beginUpdate();
            try {
                if (source != null && target === null && this.isCreateTarget()) {
                    target = this.createTargetVertex(evt, source);

                    if (target != null) {
                        dropTarget = this.graph.getDropTarget([target], evt, dropTarget);
                        terminalInserted = true;

                        // Disables edges as drop targets if the target cell was created
                        // FIXME: Should not shift if vertex was aligned (same in Java)
                        if (dropTarget === null || !this.graph.getModel().isEdge(dropTarget)) {
                            var pstate = this.graph.getView().getState(dropTarget);

                            if (pstate != null) {
                                var tmp = model.getGeometry(target);
                                tmp.x -= pstate.origin.x;
                                tmp.y -= pstate.origin.y;
                            }
                        }
                        else {
                            dropTarget = this.graph.getDefaultParent();
                        }

                        this.graph.addCell(target, dropTarget);
                    }
                }

                var parent = this.graph.getDefaultParent();

                if (source != null && target != null &&
                    model.getParent(source) === model.getParent(target) &&
                    model.getParent(model.getParent(source)) != model.getRoot()) {
                    parent = model.getParent(source);

                    if ((source.geometry != null && source.geometry.relative) &&
                        (target.geometry != null && target.geometry.relative)) {
                        parent = model.getParent(parent);
                    }
                }

                // Uses the value of the preview edge state for inserting
                // the new edge into the graph
                var value = null;
                var style = null;

                if (this.edgeState != null) {
                    value = this.edgeState.cell.value;
                    style = this.edgeState.cell.style;
                }

                edge = this.insertEdge(parent, null, value, source, target, style);

                if (edge != null) {
                    // Updates the connection constraints
                    this.graph.setConnectionConstraint(edge, source, true, this.sourceConstraint);
                    this.graph.setConnectionConstraint(edge, target, false, this.constraintHandler.currentConstraint);

                    // Uses geometry of the preview edge state
                    if (this.edgeState != null) {
                        model.setGeometry(edge, this.edgeState.cell.geometry);
                    }

                    // Makes sure the edge has a non-null, relative geometry
                    var geo = model.getGeometry(edge);

                    if (geo === null) {
                        geo = new Geometry();
                        geo.relative = true;

                        model.setGeometry(edge, geo);
                    }

                    // Uses scaled waypoints in geometry
                    if (this.waypoints != null && this.waypoints.length > 0) {
                        var s = this.graph.view.scale;
                        var tr = this.graph.view.translate;
                        geo.points = [];

                        for (var i = 0; i < this.waypoints.length; i++) {
                            var pt = this.waypoints[i];
                            geo.points.push(new Point(pt.x / s - tr.x, pt.y / s - tr.y));
                        }
                    }

                    if (target === null) {
                        var t = this.graph.view.translate;
                        var sr = this.graph.view.scale;
                        var p = new Point(this.currentPoint.x / sr - t.x, this.currentPoint.y / sr - t.y);
                        p.x -= this.graph.panDx / this.graph.view.scale;
                        p.y -= this.graph.panDy / this.graph.view.scale;
                        geo.setTerminalPoint(p, false);
                    }

                    this.fireEvent(new EventObject(domEvent.CONNECT, 'cell', edge, 'terminal', target,
                        'event', evt, 'target', dropTarget, 'terminalInserted', terminalInserted));
                }
            }
            catch (e) {
                console.log(e.message);
            }
            finally {
                model.endUpdate();
            }

            if (this.select) {
                this.selectCells(edge, (terminalInserted) ? target : null);
            }
        }
    },

    selectCells: function (edge/*, target*/) {
        this.graph.setSelectionCell(edge);
    },

    insertEdge: function (parent, id, value, source, target, style) {
        if (this.factoryMethod === null) {
            return this.graph.insertEdge(parent, id, value, source, target, style);
        }
        else {
            var edge = this.createEdge(value, source, target, style);
            edge = this.graph.addEdge(edge, parent, source, target);

            return edge;
        }
    },

    createTargetVertex: function (evt, source) {
        // Uses the first non-relative source
        var geo = this.graph.getCellGeometry(source);

        while (geo != null && geo.relative) {
            source = this.graph.getModel().getParent(source);
            geo = this.graph.getCellGeometry(source);
        }

        var clone = this.graph.cloneCells([source])[0];
        geo = this.graph.getModel().getGeometry(clone);

        if (geo != null) {
            var t = this.graph.view.translate;
            var s = this.graph.view.scale;
            var point = new Point(this.currentPoint.x / s - t.x, this.currentPoint.y / s - t.y);
            geo.x = point.x - geo.width / 2 - this.graph.panDx / s;
            geo.y = point.y - geo.height / 2 - this.graph.panDy / s;

            // Aligns with source if within certain tolerance
            var tol = this.getAlignmentTolerance();

            if (tol > 0) {
                var sourceState = this.graph.view.getState(source);

                if (sourceState != null) {
                    var x = sourceState.x / s - t.x;
                    var y = sourceState.y / s - t.y;

                    if (Math.abs(x - geo.x) <= tol) {
                        geo.x = x;
                    }

                    if (Math.abs(y - geo.y) <= tol) {
                        geo.y = y;
                    }
                }
            }
        }

        return clone;
    },

    getAlignmentTolerance: function (/*evt*/) {
        return (this.graph.isGridEnabled()) ? this.graph.gridSize / 2 : this.graph.tolerance;
    },

    createEdge: function (value, source, target, style) {
        var edge = null;

        // Creates a new edge using the factoryMethod
        if (this.factoryMethod != null) {
            edge = this.factoryMethod(source, target, style);
        }

        if (edge === null) {
            edge = new Cell(value || '');
            edge.setEdge(true);
            edge.setStyle(style);

            var geo = new Geometry();
            geo.relative = true;
            edge.setGeometry(geo);
        }

        return edge;
    },

    destroy: function () {
        this.graph.removeMouseListener(this);

        if (this.shape != null) {
            this.shape.destroy();
            this.shape = null;
        }

        if (this.marker != null) {
            this.marker.destroy();
            this.marker = null;
        }

        if (this.constraintHandler != null) {
            this.constraintHandler.destroy();
            this.constraintHandler = null;
        }

        if (this.changeHandler != null) {
            this.graph.getModel().removeListener(this.changeHandler);
            this.graph.getView().removeListener(this.changeHandler);
            this.changeHandler = null;
        }

        if (this.drillHandler != null) {
            this.graph.removeListener(this.drillHandler);
            this.graph.getView().removeListener(this.drillHandler);
            this.drillHandler = null;
        }

        if (this.escapeHandler != null) {
            this.graph.removeListener(this.escapeHandler);
            this.escapeHandler = null;
        }
    },
});

module.exports = ConnectionHandler;


},{"../Cell":3,"../Geometry":7,"../Point":10,"../Rectangle":11,"../common/utils":26,"../constants":27,"../events/EventObject":30,"../events/EventSource":31,"../events/MouseEvent":32,"../events/domEvent":33,"../shapes/ImageShape":43,"../shapes/Polyline":44,"./CellMarker":36,"./ConstraintHandler":38}],38:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('../common/class');
//var Image = require('../Image');
var constants = require('../constants');
var domEvent = require('../events/domEvent');
var Rectangle = require('../Rectangle');
var RectangleShape = require('../shapes/RectangleShape');
var ImageShape = require('../shapes/ImageShape');
var utils = require('../common/utils');
var detector = require('../common/detector');

var ConstraintHandler = Class.create({
    constructor: function ConstraintHandler(graph) {
        this.graph = graph;
    },

    enabled        : true,
    graph          : null,
    highlightColor : constants.DEFAULT_VALID_COLOR,
    //pointImage     : new Image(mxClient.imageBasePath + '/point.gif', 5, 5),

    isEnabled: function () {
        return this.enabled;
    },

    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    reset: function () {
        if (this.focusIcons != null) {
            for (var i = 0; i < this.focusIcons.length; i++) {
                this.focusIcons[i].destroy();
            }

            this.focusIcons = null;
        }

        if (this.focusHighlight != null) {
            this.focusHighlight.destroy();
            this.focusHighlight = null;
        }

        this.currentConstraint = null;
        this.currentFocusArea = null;
        this.currentPoint = null;
        this.currentFocus = null;
        this.focusPoints = null;
    },

    getTolerance: function (/*me*/) {
        return this.graph.getTolerance();
    },

    getImageForConstraint: function (/*state, constraint, point*/) {
        return this.pointImage;
    },

    isEventIgnored: function (/*me, source*/) {
        return false;
    },

    isStateIgnored: function (/*state, source*/) {
        return false;
    },

    destroyIcons: function () {
        if (this.focusIcons != null) {
            for (var i = 0; i < this.focusIcons.length; i++) {
                this.focusIcons[i].destroy();
            }

            this.focusIcons = null;
            this.focusPoints = null;
        }
    },

    destroyFocusHighlight: function () {
        if (this.focusHighlight != null) {
            this.focusHighlight.destroy();
            this.focusHighlight = null;
        }
    },

    isKeepFocusEvent: function (me) {
        return domEvent.isShiftDown(me.getEvent());
    },

    update: function (me, source) {
        if (this.isEnabled() && !this.isEventIgnored(me)) {
            var tol = this.getTolerance(me);
            var mouse = new Rectangle(me.getGraphX() - tol, me.getGraphY() - tol, 2 * tol, 2 * tol);
            var cst = (me.getState() != null && !this.isStateIgnored(me.getState(), source)) ?
                this.graph.getAllConnectionConstraints(me.getState(), source) : null;

            // Keeps focus icons visible while over vertex bounds and no other cell under mouse or shift is pressed
            if (!this.isKeepFocusEvent(me) && (this.currentFocusArea === null || this.currentFocus === null ||
                (me.getState() != null && cst != null) || !this.graph.getModel().isVertex(this.currentFocus.cell) || !utils.intersects(this.currentFocusArea, mouse)) && (me.getState() != this.currentFocus &&
                (me.getCell() === null || this.graph.isCellConnectable(me.getCell())))) {
                this.currentFocusArea = null;
                this.currentFocus = null;
                this.constraints = cst;

                // Only uses cells which have constraints
                if (this.constraints != null) {
                    this.currentFocus = me.getState();
                    this.currentFocusArea = new Rectangle(me.getState().x, me.getState().y, me.getState().width, me.getState().height);

                    if (this.focusIcons != null) {
                        for (var i = 0; i < this.focusIcons.length; i++) {
                            this.focusIcons[i].destroy();
                        }

                        this.focusIcons = null;
                        this.focusPoints = null;
                    }

                    this.focusIcons = [];
                    this.focusPoints = [];

                    for (var j = 0; j < this.constraints.length; j++) {
                        var cp = this.graph.getConnectionPoint(me.getState(), this.constraints[j]);
                        var img = this.getImageForConstraint(me.getState(), this.constraints[j], cp);

                        var src = img.src;
                        var bounds = new Rectangle(cp.x - img.width / 2,
                            cp.y - img.height / 2, img.width, img.height);
                        var icon = new ImageShape(bounds, src);
                        icon.dialect = (this.graph.dialect != constants.DIALECT_SVG) ?
                            constants.DIALECT_MIXEDHTML : constants.DIALECT_SVG;
                        icon.preserveImageAspect = false;
                        icon.init(this.graph.getView().getDecoratorPane());

                        // Fixes lost event tracking for images in quirks / IE8 standards
                        if (detector.IS_QUIRKS || document.documentMode === 8) {
                            domEvent.on(icon.node, 'dragstart', function (evt) {
                                domEvent.consume(evt);

                                return false;
                            });
                        }

                        // Move the icon behind all other overlays
                        if (icon.node.previousSibling != null) {
                            icon.node.parentNode.insertBefore(icon.node, icon.node.parentNode.firstChild);
                        }

                        var getState = utils.bind(this, function () {
                            return (this.currentFocus != null) ? this.currentFocus : me.getState();
                        });

                        icon.redraw();

                        domEvent.redirectMouseEvents(icon.node, this.graph, getState);
                        this.currentFocusArea.add(icon.bounds);
                        this.focusIcons.push(icon);
                        this.focusPoints.push(cp);
                    }

                    this.currentFocusArea.grow(tol);
                }
                else {
                    this.destroyIcons();
                    this.destroyFocusHighlight();
                }
            }

            this.currentConstraint = null;
            this.currentPoint = null;
            var minDistSq = null;

            if (this.focusIcons != null && this.constraints != null &&
                (me.getState() === null || this.currentFocus === me.getState())) {
                for (var k = 0; k < this.focusIcons.length; k++) {
                    var dx = me.getGraphX() - this.focusIcons[k].bounds.getCenterX();
                    var dy = me.getGraphY() - this.focusIcons[k].bounds.getCenterY();
                    var tmp = dx * dx + dy * dy;

                    if (utils.intersects(this.focusIcons[k].bounds, mouse) && (minDistSq === null || tmp < minDistSq)) {
                        this.currentConstraint = this.constraints[k];
                        this.currentPoint = this.focusPoints[k];
                        minDistSq = tmp;

                        tmp = this.focusIcons[k].bounds.clone();
                        tmp.grow((detector.IS_IE) ? 3 : 2);

                        if (detector.IS_IE) {
                            tmp.width -= 1;
                            tmp.height -= 1;
                        }

                        if (this.focusHighlight === null) {
                            var hl = new RectangleShape(tmp, null, this.highlightColor, 3);
                            hl.pointerEvents = false;

                            hl.dialect = (this.graph.dialect === constants.DIALECT_SVG) ?
                                constants.DIALECT_SVG : constants.DIALECT_VML;
                            hl.init(this.graph.getView().getOverlayPane());
                            this.focusHighlight = hl;

                            var getState1 = utils.bind(this, function () {
                                return (this.currentFocus != null) ? this.currentFocus : me.getState();
                            });

                            domEvent.redirectMouseEvents(hl.node, this.graph, getState1);
                        }
                        else {
                            this.focusHighlight.bounds = tmp;
                            this.focusHighlight.redraw();
                        }
                    }
                }
            }

            if (this.currentConstraint === null) {
                this.destroyFocusHighlight();
            }
        }
        else {
            this.currentConstraint = null;
            this.currentFocus = null;
            this.currentPoint = null;
        }
    },

    destroy: function () {
        this.reset();
    },

});

module.exports = ConstraintHandler;


},{"../Rectangle":11,"../common/class":23,"../common/detector":24,"../common/utils":26,"../constants":27,"../events/domEvent":33,"../shapes/ImageShape":43,"../shapes/RectangleShape":45}],39:[function(require,module,exports){
window.zGraph = module.exports = {
    Canvas2D: require('./Canvas2D'),
    Cell: require('./Cell'),
    CellRenderer: require('./CellRenderer'),
    CellState: require('./CellState'),
    EventObject: require('./events/EventObject'),
    Geometry: require('./Geometry'),
    Graph: require('./Graph'),
    Model: require('./Model'),
    Point: require('./Point'),
    Rectangle: require('./Rectangle'),
    Shape: require('./shapes/Shape'),
    View: require('./View'),
    constants: require('./constants')
};

},{"./Canvas2D":2,"./Cell":3,"./CellRenderer":4,"./CellState":5,"./Geometry":7,"./Graph":8,"./Model":9,"./Point":10,"./Rectangle":11,"./View":14,"./constants":27,"./events/EventObject":30,"./shapes/Shape":46}],40:[function(require,module,exports){
var constants = require('./constants');

var marker = {
    markers: [],
    addMarker: function (type, fn) {
        marker.markers[type] = fn;
    },
    createMarker: function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
        var fn = marker.markers[type];

        return fn ? fn(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) : null;
    }
};

function arrow(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    // The angle of the forward facing arrow sides against the x axis is
    // 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
    // only half the strokewidth is processed ).
    var endOffsetX = unitX * sw * 1.118;
    var endOffsetY = unitY * sw * 1.118;

    unitX = unitX * (size + sw);
    unitY = unitY * (size + sw);

    var pt = pe.clone();
    pt.x -= endOffsetX;
    pt.y -= endOffsetY;

    var f = (type != constants.ARROW_CLASSIC) ? 1 : 3 / 4;
    pe.x += -unitX * f - endOffsetX;
    pe.y += -unitY * f - endOffsetY;

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x, pt.y);
        canvas.lineTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);

        if (type == constants.ARROW_CLASSIC) {
            canvas.lineTo(pt.x - unitX * 3 / 4, pt.y - unitY * 3 / 4);
        }

        canvas.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
        canvas.close();

        if (filled) {
            canvas.fillAndStroke();
        }
        else {
            canvas.stroke();
        }
    };
}

marker.addMarker('classic', arrow);
marker.addMarker('block', arrow);

marker.addMarker('open', function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    // The angle of the forward facing arrow sides against the x axis is
    // 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
    // only half the strokewidth is processed ).
    var endOffsetX = unitX * sw * 1.118;
    var endOffsetY = unitY * sw * 1.118;

    unitX = unitX * (size + sw);
    unitY = unitY * (size + sw);

    var pt = pe.clone();
    pt.x -= endOffsetX;
    pt.y -= endOffsetY;

    pe.x += -endOffsetX * 2;
    pe.y += -endOffsetY * 2;

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);
        canvas.lineTo(pt.x, pt.y);
        canvas.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
        canvas.stroke();
    };
});

marker.addMarker('oval', function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    var a = size / 2;

    var pt = pe.clone();
    pe.x -= unitX * a;
    pe.y -= unitY * a;

    return function () {
        canvas.ellipse(pt.x - a, pt.y - a, size, size);

        if (filled) {
            canvas.fillAndStroke();
        }
        else {
            canvas.stroke();
        }
    };
});

function diamond(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    // The angle of the forward facing arrow sides against the x axis is
    // 45 degrees, 1/sin(45) = 1.4142 / 2 = 0.7071 ( / 2 allows for
    // only half the strokewidth is processed ). Or 0.9862 for thin diamond.
    // Note these values and the tk variable below are dependent, update
    // both together (saves trig hard coding it).
    var swFactor = (type == constants.ARROW_DIAMOND) ? 0.7071 : 0.9862;
    var endOffsetX = unitX * sw * swFactor;
    var endOffsetY = unitY * sw * swFactor;

    unitX = unitX * (size + sw);
    unitY = unitY * (size + sw);

    var pt = pe.clone();
    pt.x -= endOffsetX;
    pt.y -= endOffsetY;

    pe.x += -unitX - endOffsetX;
    pe.y += -unitY - endOffsetY;

    // thickness factor for diamond
    var tk = ((type == constants.ARROW_DIAMOND) ? 2 : 3.4);

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x, pt.y);
        canvas.lineTo(pt.x - unitX / 2 - unitY / tk, pt.y + unitX / tk - unitY / 2);
        canvas.lineTo(pt.x - unitX, pt.y - unitY);
        canvas.lineTo(pt.x - unitX / 2 + unitY / tk, pt.y - unitY / 2 - unitX / tk);
        canvas.close();

        if (filled) {
            canvas.fillAndStroke();
        }
        else {
            canvas.stroke();
        }
    };
}

marker.addMarker('diamond', diamond);
marker.addMarker('diamondThin', diamond);


module.exports = marker;

},{"./constants":27}],41:[function(require,module,exports){
var Point = require('./Point');

module.exports =
{
    RectanglePerimeter: function (bounds, vertex, next, orthogonal) {
        var cx = bounds.getCenterX();
        var cy = bounds.getCenterY();
        var dx = next.x - cx;
        var dy = next.y - cy;
        var alpha = Math.atan2(dy, dx);
        var p = new Point(0, 0);
        var pi = Math.PI;
        var pi2 = Math.PI / 2;
        var beta = pi2 - alpha;
        var t = Math.atan2(bounds.height, bounds.width);

        if (alpha < -pi + t || alpha > pi - t) {
            // Left edge
            p.x = bounds.x;
            p.y = cy - bounds.width * Math.tan(alpha) / 2;
        }
        else if (alpha < -t) {
            // Top Edge
            p.y = bounds.y;
            p.x = cx - bounds.height * Math.tan(beta) / 2;
        }
        else if (alpha < t) {
            // Right Edge
            p.x = bounds.x + bounds.width;
            p.y = cy + bounds.width * Math.tan(alpha) / 2;
        }
        else {
            // Bottom Edge
            p.y = bounds.y + bounds.height;
            p.x = cx + bounds.height * Math.tan(beta) / 2;
        }

        if (orthogonal) {
            if (next.x >= bounds.x &&
                next.x <= bounds.x + bounds.width) {
                p.x = next.x;
            }
            else if (next.y >= bounds.y &&
                next.y <= bounds.y + bounds.height) {
                p.y = next.y;
            }
            if (next.x < bounds.x) {
                p.x = bounds.x;
            }
            else if (next.x > bounds.x + bounds.width) {
                p.x = bounds.x + bounds.width;
            }
            if (next.y < bounds.y) {
                p.y = bounds.y;
            }
            else if (next.y > bounds.y + bounds.height) {
                p.y = bounds.y + bounds.height;
            }
        }

        return p;
    },
    EllipsePerimeter: function (bounds, vertex, next, orthogonal) {
        var x = bounds.x;
        var y = bounds.y;
        var a = bounds.width / 2;
        var b = bounds.height / 2;
        var cx = x + a;
        var cy = y + b;
        var px = next.x;
        var py = next.y;

        // Calculates straight line equation through
        // point and ellipse center y = d * x + h
        var dx = parseInt(px - cx);
        var dy = parseInt(py - cy);

        if (dx == 0 && dy != 0) {
            return new mxPoint(cx, cy + b * dy / Math.abs(dy));
        }
        else if (dx == 0 && dy == 0) {
            return new mxPoint(px, py);
        }

        if (orthogonal) {
            if (py >= y && py <= y + bounds.height) {
                var ty = py - cy;
                var tx = Math.sqrt(a * a * (1 - (ty * ty) / (b * b))) || 0;

                if (px <= x) {
                    tx = -tx;
                }

                return new mxPoint(cx + tx, py);
            }

            if (px >= x && px <= x + bounds.width) {
                var tx = px - cx;
                var ty = Math.sqrt(b * b * (1 - (tx * tx) / (a * a))) || 0;

                if (py <= y) {
                    ty = -ty;
                }

                return new mxPoint(px, cy + ty);
            }
        }

        // Calculates intersection
        var d = dy / dx;
        var h = cy - d * cx;
        var e = a * a * d * d + b * b;
        var f = -2 * cx * e;
        var g = a * a * d * d * cx * cx +
            b * b * cx * cx -
            a * a * b * b;
        var det = Math.sqrt(f * f - 4 * e * g);

        // Two solutions (perimeter points)
        var xout1 = (-f + det) / (2 * e);
        var xout2 = (-f - det) / (2 * e);
        var yout1 = d * xout1 + h;
        var yout2 = d * xout2 + h;
        var dist1 = Math.sqrt(Math.pow((xout1 - px), 2)
            + Math.pow((yout1 - py), 2));
        var dist2 = Math.sqrt(Math.pow((xout2 - px), 2)
            + Math.pow((yout2 - py), 2));

        // Correct solution
        var xout = 0;
        var yout = 0;

        if (dist1 < dist2) {
            xout = xout1;
            yout = yout1;
        }
        else {
            xout = xout2;
            yout = yout2;
        }

        return new mxPoint(xout, yout);
    },
    RhombusPerimeter: function (bounds, vertex, next, orthogonal) {
        var x = bounds.x;
        var y = bounds.y;
        var w = bounds.width;
        var h = bounds.height;

        var cx = x + w / 2;
        var cy = y + h / 2;

        var px = next.x;
        var py = next.y;

        // Special case for intersecting the diamond's corners
        if (cx == px) {
            if (cy > py) {
                return new mxPoint(cx, y); // top
            }
            else {
                return new mxPoint(cx, y + h); // bottom
            }
        }
        else if (cy == py) {
            if (cx > px) {
                return new mxPoint(x, cy); // left
            }
            else {
                return new mxPoint(x + w, cy); // right
            }
        }

        var tx = cx;
        var ty = cy;

        if (orthogonal) {
            if (px >= x && px <= x + w) {
                tx = px;
            }
            else if (py >= y && py <= y + h) {
                ty = py;
            }
        }

        // In which quadrant will the intersection be?
        // set the slope and offset of the border line accordingly
        if (px < cx) {
            if (py < cy) {
                return mxUtils.intersection(px, py, tx, ty, cx, y, x, cy);
            }
            else {
                return mxUtils.intersection(px, py, tx, ty, cx, y + h, x, cy);
            }
        }
        else if (py < cy) {
            return mxUtils.intersection(px, py, tx, ty, cx, y, x + w, cy);
        }
        else {
            return mxUtils.intersection(px, py, tx, ty, cx, y + h, x + w, cy);
        }
    },
    TrianglePerimeter: function (bounds, vertex, next, orthogonal) {
        var direction = (vertex != null) ?
            vertex.style[mxConstants.STYLE_DIRECTION] : null;
        var vertical = direction == mxConstants.DIRECTION_NORTH ||
            direction == mxConstants.DIRECTION_SOUTH;

        var x = bounds.x;
        var y = bounds.y;
        var w = bounds.width;
        var h = bounds.height;

        var cx = x + w / 2;
        var cy = y + h / 2;

        var start = new mxPoint(x, y);
        var corner = new mxPoint(x + w, cy);
        var end = new mxPoint(x, y + h);

        if (direction == mxConstants.DIRECTION_NORTH) {
            start = end;
            corner = new mxPoint(cx, y);
            end = new mxPoint(x + w, y + h);
        }
        else if (direction == mxConstants.DIRECTION_SOUTH) {
            corner = new mxPoint(cx, y + h);
            end = new mxPoint(x + w, y);
        }
        else if (direction == mxConstants.DIRECTION_WEST) {
            start = new mxPoint(x + w, y);
            corner = new mxPoint(x, cy);
            end = new mxPoint(x + w, y + h);
        }

        var dx = next.x - cx;
        var dy = next.y - cy;

        var alpha = (vertical) ? Math.atan2(dx, dy) : Math.atan2(dy, dx);
        var t = (vertical) ? Math.atan2(w, h) : Math.atan2(h, w);

        var base = false;

        if (direction == mxConstants.DIRECTION_NORTH ||
            direction == mxConstants.DIRECTION_WEST) {
            base = alpha > -t && alpha < t;
        }
        else {
            base = alpha < -Math.PI + t || alpha > Math.PI - t;
        }

        var result = null;

        if (base) {
            if (orthogonal && ((vertical && next.x >= start.x && next.x <= end.x) ||
                (!vertical && next.y >= start.y && next.y <= end.y))) {
                if (vertical) {
                    result = new mxPoint(next.x, start.y);
                }
                else {
                    result = new mxPoint(start.x, next.y);
                }
            }
            else {
                if (direction == mxConstants.DIRECTION_NORTH) {
                    result = new mxPoint(x + w / 2 + h * Math.tan(alpha) / 2,
                        y + h);
                }
                else if (direction == mxConstants.DIRECTION_SOUTH) {
                    result = new mxPoint(x + w / 2 - h * Math.tan(alpha) / 2,
                        y);
                }
                else if (direction == mxConstants.DIRECTION_WEST) {
                    result = new mxPoint(x + w, y + h / 2 +
                        w * Math.tan(alpha) / 2);
                }
                else {
                    result = new mxPoint(x, y + h / 2 -
                        w * Math.tan(alpha) / 2);
                }
            }
        }
        else {
            if (orthogonal) {
                var pt = new mxPoint(cx, cy);

                if (next.y >= y && next.y <= y + h) {
                    pt.x = (vertical) ? cx : (
                        (direction == mxConstants.DIRECTION_WEST) ?
                        x + w : x);
                    pt.y = next.y;
                }
                else if (next.x >= x && next.x <= x + w) {
                    pt.x = next.x;
                    pt.y = (!vertical) ? cy : (
                        (direction == mxConstants.DIRECTION_NORTH) ?
                        y + h : y);
                }

                // Compute angle
                dx = next.x - pt.x;
                dy = next.y - pt.y;

                cx = pt.x;
                cy = pt.y;
            }

            if ((vertical && next.x <= x + w / 2) ||
                (!vertical && next.y <= y + h / 2)) {
                result = mxUtils.intersection(next.x, next.y, cx, cy,
                    start.x, start.y, corner.x, corner.y);
            }
            else {
                result = mxUtils.intersection(next.x, next.y, cx, cy,
                    corner.x, corner.y, end.x, end.y);
            }
        }

        if (result == null) {
            result = new mxPoint(cx, cy);
        }

        return result;
    },
    HexagonPerimeter: function (bounds, vertex, next, orthogonal) {
        var x = bounds.x;
        var y = bounds.y;
        var w = bounds.width;
        var h = bounds.height;

        var cx = bounds.getCenterX();
        var cy = bounds.getCenterY();
        var px = next.x;
        var py = next.y;
        var dx = px - cx;
        var dy = py - cy;
        var alpha = -Math.atan2(dy, dx);
        var pi = Math.PI;
        var pi2 = Math.PI / 2;

        var result = new mxPoint(cx, cy);

        var direction = (vertex != null) ? mxUtils.getValue(
            vertex.style, mxConstants.STYLE_DIRECTION,
            mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
        var vertical = direction == mxConstants.DIRECTION_NORTH
            || direction == mxConstants.DIRECTION_SOUTH;
        var a = new mxPoint();
        var b = new mxPoint();

        //Only consider corrects quadrants for the orthogonal case.
        if ((px < x) && (py < y) || (px < x) && (py > y + h)
            || (px > x + w) && (py < y) || (px > x + w) && (py > y + h)) {
            orthogonal = false;
        }

        if (orthogonal) {
            if (vertical) {
                //Special cases where intersects with hexagon corners
                if (px == cx) {
                    if (py <= y) {
                        return new mxPoint(cx, y);
                    }
                    else if (py >= y + h) {
                        return new mxPoint(cx, y + h);
                    }
                }
                else if (px < x) {
                    if (py == y + h / 4) {
                        return new mxPoint(x, y + h / 4);
                    }
                    else if (py == y + 3 * h / 4) {
                        return new mxPoint(x, y + 3 * h / 4);
                    }
                }
                else if (px > x + w) {
                    if (py == y + h / 4) {
                        return new mxPoint(x + w, y + h / 4);
                    }
                    else if (py == y + 3 * h / 4) {
                        return new mxPoint(x + w, y + 3 * h / 4);
                    }
                }
                else if (px == x) {
                    if (py < cy) {
                        return new mxPoint(x, y + h / 4);
                    }
                    else if (py > cy) {
                        return new mxPoint(x, y + 3 * h / 4);
                    }
                }
                else if (px == x + w) {
                    if (py < cy) {
                        return new mxPoint(x + w, y + h / 4);
                    }
                    else if (py > cy) {
                        return new mxPoint(x + w, y + 3 * h / 4);
                    }
                }
                if (py == y) {
                    return new mxPoint(cx, y);
                }
                else if (py == y + h) {
                    return new mxPoint(cx, y + h);
                }

                if (px < cx) {
                    if ((py > y + h / 4) && (py < y + 3 * h / 4)) {
                        a = new mxPoint(x, y);
                        b = new mxPoint(x, y + h);
                    }
                    else if (py < y + h / 4) {
                        a = new mxPoint(x - Math.floor(0.5 * w), y
                            + Math.floor(0.5 * h));
                        b = new mxPoint(x + w, y - Math.floor(0.25 * h));
                    }
                    else if (py > y + 3 * h / 4) {
                        a = new mxPoint(x - Math.floor(0.5 * w), y
                            + Math.floor(0.5 * h));
                        b = new mxPoint(x + w, y + Math.floor(1.25 * h));
                    }
                }
                else if (px > cx) {
                    if ((py > y + h / 4) && (py < y + 3 * h / 4)) {
                        a = new mxPoint(x + w, y);
                        b = new mxPoint(x + w, y + h);
                    }
                    else if (py < y + h / 4) {
                        a = new mxPoint(x, y - Math.floor(0.25 * h));
                        b = new mxPoint(x + Math.floor(1.5 * w), y
                            + Math.floor(0.5 * h));
                    }
                    else if (py > y + 3 * h / 4) {
                        a = new mxPoint(x + Math.floor(1.5 * w), y
                            + Math.floor(0.5 * h));
                        b = new mxPoint(x, y + Math.floor(1.25 * h));
                    }
                }

            }
            else {
                //Special cases where intersects with hexagon corners
                if (py == cy) {
                    if (px <= x) {
                        return new mxPoint(x, y + h / 2);
                    }
                    else if (px >= x + w) {
                        return new mxPoint(x + w, y + h / 2);
                    }
                }
                else if (py < y) {
                    if (px == x + w / 4) {
                        return new mxPoint(x + w / 4, y);
                    }
                    else if (px == x + 3 * w / 4) {
                        return new mxPoint(x + 3 * w / 4, y);
                    }
                }
                else if (py > y + h) {
                    if (px == x + w / 4) {
                        return new mxPoint(x + w / 4, y + h);
                    }
                    else if (px == x + 3 * w / 4) {
                        return new mxPoint(x + 3 * w / 4, y + h);
                    }
                }
                else if (py == y) {
                    if (px < cx) {
                        return new mxPoint(x + w / 4, y);
                    }
                    else if (px > cx) {
                        return new mxPoint(x + 3 * w / 4, y);
                    }
                }
                else if (py == y + h) {
                    if (px < cx) {
                        return new mxPoint(x + w / 4, y + h);
                    }
                    else if (py > cy) {
                        return new mxPoint(x + 3 * w / 4, y + h);
                    }
                }
                if (px == x) {
                    return new mxPoint(x, cy);
                }
                else if (px == x + w) {
                    return new mxPoint(x + w, cy);
                }

                if (py < cy) {
                    if ((px > x + w / 4) && (px < x + 3 * w / 4)) {
                        a = new mxPoint(x, y);
                        b = new mxPoint(x + w, y);
                    }
                    else if (px < x + w / 4) {
                        a = new mxPoint(x - Math.floor(0.25 * w), y + h);
                        b = new mxPoint(x + Math.floor(0.5 * w), y
                            - Math.floor(0.5 * h));
                    }
                    else if (px > x + 3 * w / 4) {
                        a = new mxPoint(x + Math.floor(0.5 * w), y
                            - Math.floor(0.5 * h));
                        b = new mxPoint(x + Math.floor(1.25 * w), y + h);
                    }
                }
                else if (py > cy) {
                    if ((px > x + w / 4) && (px < x + 3 * w / 4)) {
                        a = new mxPoint(x, y + h);
                        b = new mxPoint(x + w, y + h);
                    }
                    else if (px < x + w / 4) {
                        a = new mxPoint(x - Math.floor(0.25 * w), y);
                        b = new mxPoint(x + Math.floor(0.5 * w), y
                            + Math.floor(1.5 * h));
                    }
                    else if (px > x + 3 * w / 4) {
                        a = new mxPoint(x + Math.floor(0.5 * w), y
                            + Math.floor(1.5 * h));
                        b = new mxPoint(x + Math.floor(1.25 * w), y);
                    }
                }
            }

            var tx = cx;
            var ty = cy;

            if (px >= x && px <= x + w) {
                tx = px;

                if (py < cy) {
                    ty = y + h;
                }
                else {
                    ty = y;
                }
            }
            else if (py >= y && py <= y + h) {
                ty = py;

                if (px < cx) {
                    tx = x + w;
                }
                else {
                    tx = x;
                }
            }

            result = mxUtils.intersection(tx, ty, next.x, next.y, a.x, a.y, b.x, b.y);
        }
        else {
            if (vertical) {
                var beta = Math.atan2(h / 4, w / 2);

                //Special cases where intersects with hexagon corners
                if (alpha == beta) {
                    return new mxPoint(x + w, y + Math.floor(0.25 * h));
                }
                else if (alpha == pi2) {
                    return new mxPoint(x + Math.floor(0.5 * w), y);
                }
                else if (alpha == (pi - beta)) {
                    return new mxPoint(x, y + Math.floor(0.25 * h));
                }
                else if (alpha == -beta) {
                    return new mxPoint(x + w, y + Math.floor(0.75 * h));
                }
                else if (alpha == (-pi2)) {
                    return new mxPoint(x + Math.floor(0.5 * w), y + h);
                }
                else if (alpha == (-pi + beta)) {
                    return new mxPoint(x, y + Math.floor(0.75 * h));
                }

                if ((alpha < beta) && (alpha > -beta)) {
                    a = new mxPoint(x + w, y);
                    b = new mxPoint(x + w, y + h);
                }
                else if ((alpha > beta) && (alpha < pi2)) {
                    a = new mxPoint(x, y - Math.floor(0.25 * h));
                    b = new mxPoint(x + Math.floor(1.5 * w), y
                        + Math.floor(0.5 * h));
                }
                else if ((alpha > pi2) && (alpha < (pi - beta))) {
                    a = new mxPoint(x - Math.floor(0.5 * w), y
                        + Math.floor(0.5 * h));
                    b = new mxPoint(x + w, y - Math.floor(0.25 * h));
                }
                else if (((alpha > (pi - beta)) && (alpha <= pi))
                    || ((alpha < (-pi + beta)) && (alpha >= -pi))) {
                    a = new mxPoint(x, y);
                    b = new mxPoint(x, y + h);
                }
                else if ((alpha < -beta) && (alpha > -pi2)) {
                    a = new mxPoint(x + Math.floor(1.5 * w), y
                        + Math.floor(0.5 * h));
                    b = new mxPoint(x, y + Math.floor(1.25 * h));
                }
                else if ((alpha < -pi2) && (alpha > (-pi + beta))) {
                    a = new mxPoint(x - Math.floor(0.5 * w), y
                        + Math.floor(0.5 * h));
                    b = new mxPoint(x + w, y + Math.floor(1.25 * h));
                }
            }
            else {
                var beta = Math.atan2(h / 2, w / 4);

                //Special cases where intersects with hexagon corners
                if (alpha == beta) {
                    return new mxPoint(x + Math.floor(0.75 * w), y);
                }
                else if (alpha == (pi - beta)) {
                    return new mxPoint(x + Math.floor(0.25 * w), y);
                }
                else if ((alpha == pi) || (alpha == -pi)) {
                    return new mxPoint(x, y + Math.floor(0.5 * h));
                }
                else if (alpha == 0) {
                    return new mxPoint(x + w, y + Math.floor(0.5 * h));
                }
                else if (alpha == -beta) {
                    return new mxPoint(x + Math.floor(0.75 * w), y + h);
                }
                else if (alpha == (-pi + beta)) {
                    return new mxPoint(x + Math.floor(0.25 * w), y + h);
                }

                if ((alpha > 0) && (alpha < beta)) {
                    a = new mxPoint(x + Math.floor(0.5 * w), y
                        - Math.floor(0.5 * h));
                    b = new mxPoint(x + Math.floor(1.25 * w), y + h);
                }
                else if ((alpha > beta) && (alpha < (pi - beta))) {
                    a = new mxPoint(x, y);
                    b = new mxPoint(x + w, y);
                }
                else if ((alpha > (pi - beta)) && (alpha < pi)) {
                    a = new mxPoint(x - Math.floor(0.25 * w), y + h);
                    b = new mxPoint(x + Math.floor(0.5 * w), y
                        - Math.floor(0.5 * h));
                }
                else if ((alpha < 0) && (alpha > -beta)) {
                    a = new mxPoint(x + Math.floor(0.5 * w), y
                        + Math.floor(1.5 * h));
                    b = new mxPoint(x + Math.floor(1.25 * w), y);
                }
                else if ((alpha < -beta) && (alpha > (-pi + beta))) {
                    a = new mxPoint(x, y + h);
                    b = new mxPoint(x + w, y + h);
                }
                else if ((alpha < (-pi + beta)) && (alpha > -pi)) {
                    a = new mxPoint(x - Math.floor(0.25 * w), y);
                    b = new mxPoint(x + Math.floor(0.5 * w), y
                        + Math.floor(1.5 * h));
                }
            }

            result = mxUtils.intersection(cx, cy, next.x, next.y, a.x, a.y, b.x, b.y);
        }

        if (result == null) {
            return new mxPoint(cx, cy);
        }

        return result;
    }
};


},{"./Point":10}],42:[function(require,module,exports){
var utils = require('../common/utils');
var marker = require('../marker');
var Polyline = require('./Polyline');
var constants = require('../constants');

var getValue = utils.getValue;
var getNumber = utils.getNumber;
var isNullOrUndefined = utils.isNullOrUndefined;

var Connector = module.exports = Polyline.extend({
    constructor: function Connector(points, stroke, strokewidth) {
        Connector.superclass.constructor.call(this, points, stroke, strokewidth);
    },

    paintEdgeShape: function (c, pts) {
        var sourceMarker = this.createMarker(c, pts, true);
        var targetMarker = this.createMarker(c, pts, false);

        Connector.superclass.paintEdgeShape.apply(this, arguments);

        // Disables shadows, dashed styles and fixes fill color for markers
        c.setFillColor(this.stroke);
        c.setShadow(false);
        c.setDashed(false);

        if (sourceMarker != null) {
            sourceMarker();
        }

        if (targetMarker != null) {
            targetMarker();
        }
    },

    createMarker: function (c, pts, isSource) {
        var result = null;
        var n = pts.length;
        var type = getValue(this.style, isSource ? constants.STYLE_STARTARROW : constants.STYLE_ENDARROW);
        var p0 = isSource ? pts[1] : pts[n - 2];
        var pe = isSource ? pts[0] : pts[n - 1];

        if (type && p0 && pe) {
            var count = 1;

            // Uses next non-overlapping point
            while (count < n - 1 && Math.round(p0.x - pe.x) == 0 && Math.round(p0.y - pe.y) == 0) {
                p0 = (isSource) ? pts[1 + count] : pts[n - 2 - count];
                count++;
            }

            // Computes the norm and the inverse norm
            var dx = pe.x - p0.x;
            var dy = pe.y - p0.y;

            var dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));

            var unitX = dx / dist;
            var unitY = dy / dist;

            var size = getNumber(this.style, (isSource) ? constants.STYLE_STARTSIZE : constants.STYLE_ENDSIZE, constants.DEFAULT_MARKERSIZE);

            // Allow for stroke width in the end point used and the
            // orthogonal vectors describing the direction of the marker
            var filled = this.style[(isSource) ? constants.STYLE_STARTFILL : constants.STYLE_ENDFILL] != 0;

            result = marker.createMarker(c, this, type, pe, unitX, unitY, size, isSource, this.arrowStrokewidth, filled);
        }

        return result;
    },

    augmentBoundingBox: function (bbox) {
        Connector.superclass.augmentBoundingBox.apply(this, arguments);

        // Adds marker sizes
        var size = 0;

        if (getValue(this.style, constants.STYLE_STARTARROW, constants.NONE) !== constants.NONE) {
            size = getNumber(this.style, constants.STYLE_STARTSIZE, constants.DEFAULT_MARKERSIZE) + 1;
        }

        if (getValue(this.style, constants.STYLE_ENDARROW, constants.NONE) !== constants.NONE) {
            size = Math.max(size, getNumber(this.style, constants.STYLE_ENDSIZE, constants.DEFAULT_MARKERSIZE)) + 1;
        }

        bbox.grow(Math.ceil(size * this.scale));
    }
});

},{"../common/utils":26,"../constants":27,"../marker":40,"./Polyline":44}],43:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Shape = require('./Shape');
var detector = require('../common/detector');
var utils = require('../common/utils');
var constants = require('../constants');
var RectangleShape = require('../shapes/RectangleShape');

var ImageShape = Shape.extend({
    constructor: function ImageShape(bounds, image, fill, stroke, strokewidth) {
        var that = this;
        Shape.call(that);
        that.bounds = bounds;
        that.image = image;
        that.fill = fill;
        that.stroke = stroke;
        that.strokewidth = (strokewidth !== null) ? strokewidth : 1;
        that.shadow = false;
    },
    preserveImageAspect: true,
    getSvgScreenOffset: function () {
        return (!detector.IS_IE) ? 0.5 : 0;
    },
    apply: function (/*state*/) {
        Shape.prototype.apply.apply(this, arguments);

        this.fill = null;
        this.stroke = null;
        this.gradient = null;

        if (this.style !== null) {
            this.preserveImageAspect = utils.getNumber(this.style, constants.STYLE_IMAGE_ASPECT, 1) === 1;

            // Legacy support for imageFlipH/V
            this.flipH = this.flipH || utils.getValue(this.style, 'imageFlipH', 0) === 1;
            this.flipV = this.flipV || utils.getValue(this.style, 'imageFlipV', 0) === 1;
        }
    },
    isHtmlAllowed: function () {
        return !this.preserveImageAspect;
    },
    createHtml: function () {
        var node = document.createElement('div');
        node.style.position = 'absolute';

        return node;
    },
    paintVertexShape: function (c, x, y, w, h) {
        if (this.image !== null) {
            var fill = utils.getValue(this.style, constants.STYLE_IMAGE_BACKGROUND, null);
            var stroke = utils.getValue(this.style, constants.STYLE_IMAGE_BORDER, null);

            if (fill !== null) {
                // Stroke rendering required for shadow
                c.setFillColor(fill);
                c.setStrokeColor(stroke);
                c.rect(x, y, w, h);
                c.fillAndStroke();
            }

            // FlipH/V are implicit via mxShape.updateTransform
            c.image(x, y, w, h, this.image, this.preserveImageAspect, false, false);

            //var stroke = utils.getValue(this.style, constants.STYLE_IMAGE_BORDER, null);

            if (stroke !== null) {
                c.setShadow(false);
                c.setStrokeColor(stroke);
                c.rect(x, y, w, h);
                c.stroke();
            }
        }
        else {
            RectangleShape.prototype.paintBackground.apply(this, arguments);
        }
    },
    redrawHtmlShape: function () {
        this.node.style.left = Math.round(this.bounds.x) + 'px';
        this.node.style.top = Math.round(this.bounds.y) + 'px';
        this.node.style.width = Math.max(0, Math.round(this.bounds.width)) + 'px';
        this.node.style.height = Math.max(0, Math.round(this.bounds.height)) + 'px';
        this.node.innerHTML = '';

        if (this.image !== null) {
            var fill = utils.getValue(this.style, constants.STYLE_IMAGE_BACKGROUND, '');
            var stroke = utils.getValue(this.style, constants.STYLE_IMAGE_BORDER, '');
            this.node.style.backgroundColor = fill;
            this.node.style.borderColor = stroke;

            var img = document.createElement('img');
            img.style.position = 'absolute';
            img.src = this.image;

            var filter = (this.opacity < 100) ? 'alpha(opacity=' + this.opacity + ')' : '';
            this.node.style.filter = filter;

            if (this.flipH && this.flipV) {
                filter += 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)';
            }
            else if (this.flipH) {
                filter += 'progid:DXImageTransform.Microsoft.BasicImage(mirror=1)';
            }
            else if (this.flipV) {
                filter += 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)';
            }

            if (img.style.filter !== filter) {
                img.style.filter = filter;
            }

            if (img.nodeName === 'image') {
                img.style.rotation = this.rotation;
            }
            else if (this.rotation !== 0) {
                // LATER: Add flipV/H support
                utils.setPrefixedStyle(img.style, 'transform', 'rotate(' + this.rotation + 'deg)');
            }
            else {
                utils.setPrefixedStyle(img.style, 'transform', '');
            }

            // Known problem: IE clips top line of image for certain angles
            img.style.width = this.node.style.width;
            img.style.height = this.node.style.height;

            this.node.style.backgroundImage = '';
            this.node.appendChild(img);
        }
        else {
            this.setTransparentBackgroundImage(this.node);
        }
    },
});

module.exports = ImageShape;


},{"../common/detector":24,"../common/utils":26,"../constants":27,"../shapes/RectangleShape":45,"./Shape":46}],44:[function(require,module,exports){
var utils = require('../common/utils');
var Shape = require('./Shape');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({
    constructor: function Polyline(points, stroke, strokewidth) {

        var shape = this;

        Polyline.superclass.constructor.call(shape);

        shape.points = points;
        shape.stroke = stroke;
        shape.strokewidth = !isNullOrUndefined(strokewidth) ? strokewidth : 1;
    },

    getRotation: function () { return 0; },
    getShapeRotation: function () { return 0; },
    isPaintBoundsInverted: function () {
        return false;
    },

    paintEdgeShape: function (canvas, pts) {

        if (this.style || this.style[constants.STYLE_CURVED] != 1) {
            this.paintLine(canvas, pts, this.isRounded);
        }
        else {
            this.paintCurvedLine(canvas, pts);
        }
    },

    paintLine: function (canvas, pts, rounded) {

        var arcSize = getValue(this.style, constants.STYLE_ARCSIZE, constants.LINE_ARCSIZE) / 2;
        canvas.begin();
        this.addPoints(canvas, pts, rounded, arcSize, false);
        canvas.stroke();
    },

    paintCurvedLine: function (canvas, pts) {
        canvas.begin();

        var pt = pts[0];
        var n = pts.length;

        canvas.moveTo(pt.x, pt.y);

        for (var i = 1; i < n - 2; i++) {
            var p0 = pts[i];
            var p1 = pts[i + 1];
            var ix = (p0.x + p1.x) / 2;
            var iy = (p0.y + p1.y) / 2;

            canvas.quadTo(p0.x, p0.y, ix, iy);
        }

        var p0 = pts[n - 2];
        var p1 = pts[n - 1];

        canvas.quadTo(p0.x, p0.y, p1.x, p1.y);
        canvas.stroke();
    }
});


},{"../common/utils":26,"../constants":27,"./Shape":46}],45:[function(require,module,exports){
var utils = require('../common/utils');
var Shape = require('./Shape');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({
    constructor: function RectangleShape(bounds, fill, stroke, strokeWidth) {

        var shape = this;

        Shape.call(shape);

        shape.bounds = bounds;
        shape.fill = fill;
        shape.stroke = stroke;
        shape.strokewidth = !isNullOrUndefined(strokeWidth) ? strokeWidth : 1;
    },

    isHtmlAllowed: function () {
        var shape = this;
        return !shape.isRounded && !shape.glass && shape.rotation === 0;
    },

    paintBackground: function (canvas, x, y, w, h) {

        var shape = this;

        if (shape.isRounded) {
            var f = getValue(shape.style, constants.STYLE_ARCSIZE, mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
            var r = Math.min(w * f, h * f);
            canvas.rect(x, y, w, h, r, r);
        } else {
            canvas.rect(x, y, w, h);
        }

        canvas.fillAndStroke();

        return shape;
    },

    paintForeground: function (c, x, y, w, h) {

        var shape = this;

        if (shape.glass && !shape.outline) {
            shape.paintGlassEffect(c, x, y, w, h, shape.getArcSize(w + shape.strokewidth, h + shape.strokewidth));
        }

        return shape;
    }
});

},{"../common/utils":26,"./Shape":46}],46:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Base = require('../Base');
var utils = require('../common/utils');
var constants = require('../constants');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var Canvas2D = require('../Canvas2D');


var each = utils.each;
var getValue = utils.getValue;
var getNumber = utils.getNumber;
var isNullOrUndefined = utils.isNullOrUndefined;

// style 的属性：style[constants.STYLE_SHAPE]

var Shape = Base.extend({

    node: null,         // 图形的根节点，通常是 g 元素
    state: null,        // cellState
    style: null,        // cellStyle
    bounds: null,       // Rectangle 表示该图形的区域范围
    boundingBox: null,  // 图形的边框
    stencil: null,
    scale: 1,
    points: null,
    antiAlias: true,    // 抗锯齿，平滑处理
    pointerEvents: true,
    svgPointerEvents: 'all',
    svgStrokeTolerance: 8,
    shapePointerEvents: false,
    stencilPointerEvents: false,

    outline: false,
    visible: true,      // 默认可见

    constructor: function Shape(stencil) {

        var that = this;

        that.stencil = stencil; // 模板
        that.strokewidth = 1;
        that.rotation = 0;
        that.opacity = 100;
        that.flipH = false;    // 水平翻转
        that.flipV = false;    // 垂直翻转
    },

    // 根据 state.style 初始化该图形的样式属性
    apply: function (state) {

        var that = this;

        that.state = state;
        that.style = state.style;

        if (that.style) {
            that.fill = getValue(that.style, constants.STYLE_FILLCOLOR, that.fill);
            that.gradient = getValue(that.style, constants.STYLE_GRADIENTCOLOR, that.gradient);
            that.gradientDirection = getValue(that.style, constants.STYLE_GRADIENT_DIRECTION, that.gradientDirection);
            that.opacity = getValue(that.style, constants.STYLE_OPACITY, that.opacity);
            that.stroke = getValue(that.style, constants.STYLE_STROKECOLOR, that.stroke);
            that.strokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokewidth);
            // Arrow stroke width is used to compute the arrow heads size in mxConnector
            that.arrowStrokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokewidth);
            that.spacing = getValue(that.style, constants.STYLE_SPACING, that.spacing);
            that.startSize = getNumber(that.style, constants.STYLE_STARTSIZE, that.startSize);
            that.endSize = getNumber(that.style, constants.STYLE_ENDSIZE, that.endSize);
            that.startArrow = getValue(that.style, constants.STYLE_STARTARROW, that.startArrow);
            that.endArrow = getValue(that.style, constants.STYLE_ENDARROW, that.endArrow);
            that.rotation = getValue(that.style, constants.STYLE_ROTATION, that.rotation);
            that.direction = getValue(that.style, constants.STYLE_DIRECTION, that.direction);
            that.flipH = getValue(that.style, constants.STYLE_FLIPH, 0) === 1;
            that.flipV = getValue(that.style, constants.STYLE_FLIPV, 0) === 1;

            // Legacy support for stencilFlipH/V
            if (that.stencil) {
                that.flipH = getValue(that.style, 'stencilFlipH', 0) === 1 || that.flipH;
                that.flipV = getValue(that.style, 'stencilFlipV', 0) === 1 || that.flipV;
            }

            if (that.direction === constants.DIRECTION_NORTH || that.direction === constants.DIRECTION_SOUTH) {
                var tmp = that.flipH;
                that.flipH = that.flipV;
                that.flipV = tmp;
            }

            that.isShadow = getValue(that.style, constants.STYLE_SHADOW, that.isShadow) === 1;
            that.isDashed = getValue(that.style, constants.STYLE_DASHED, that.isDashed) === 1;
            that.isRounded = getValue(that.style, constants.STYLE_ROUNDED, that.isRounded) === 1;
            that.glass = getValue(that.style, constants.STYLE_GLASS, that.glass) === 1;

            if (that.fill === constants.NONE) {
                that.fill = null;
            }

            if (that.gradient === constants.NONE) {
                that.gradient = null;
            }

            if (that.stroke === constants.NONE) {
                that.stroke = null;
            }
        }

        return that;
    },

    // 创建该图形的根节点
    init: function (container) {

        var that = this;
        var node = that.node || that.create(container);

        if (node && container) {
            that.node = node;
            container.appendChild(node);
        }

        return that;
    },

    create: function (container) {

        return container && container.ownerSVGElement ?
            document.createElementNS(constants.NS_SVG, 'g') :
            null;
    },

    // 删除根节点下所有的子元素
    clear: function () {

        var that = this;
        var node = that.node;

        if (node && node.ownerDocument) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return that;
    },

    getScreenOffset: function () {

        var that = this;
        var strokeWidth = that.stencil && that.stencil.strokewidth !== 'inherit'
            ? that.stencil.strokewidth
            : that.strokewidth;

        return (utils.mod(Math.max(1, Math.round(strokeWidth * that.scale)), 2) === 1) ? 0.5 : 0;
    },

    reconfigure: function () {
        return this.redraw();
    },

    redraw: function () {

        var that = this;
        var node = that.node;

        that.updateBoundsFromPoints();

        if (that.visible && that.checkBounds()) {
            node.style.visibility = 'visible';
            // 删除根节点下的所有子元素
            that.clear();
            //
            that.redrawShape();
            that.updateBoundingBox();
        } else {
            node.style.visibility = 'hidden';
            that.boundingBox = null;
        }

        return that;
    },

    redrawShape: function () {

        var that = this;
        var canvas = that.createCanvas();

        if (canvas) {
            canvas.pointerEvents = that.pointerEvents;

            that.paint(canvas);
            that.destroyCanvas(canvas);
        }

        return that;
    },

    paint: function (canvas) {

        var that = this;
        var bounds = that.bounds;

        // Scale is passed-through to canvas
        var scale = that.scale;
        var x = bounds.x / scale;
        var y = bounds.y / scale;
        var w = bounds.width / scale;
        var h = bounds.height / scale;

        if (that.isPaintBoundsInverted()) {

            var t = (w - h) / 2;
            x += t;
            y -= t;

            var tmp = w;
            w = h;
            h = tmp;
        }

        that.updateTransform(canvas, x, y, w, h);
        that.configureCanvas(canvas, x, y, w, h);

        // Adds background rectangle to capture events
        var bg = null;

        if ((!that.stencil && !that.points && that.shapePointerEvents) ||
            (that.stencil && that.stencilPointerEvents)) {

            var bb = that.createBoundingBox();

            bg = that.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
            that.node.appendChild(bg);
        }


        if (that.stencil) {
            that.stencil.drawShape(canvas, that, x, y, w, h);
        } else {
            // Stencils have separate strokeWidth
            canvas.setStrokeWidth(that.strokewidth);

            if (that.points) {
                // Paints edge shape
                var pts = [];

                for (var i = 0; i < that.points.length; i++) {
                    if (that.points[i]) {
                        pts.push(new Point(that.points[i].x / scale, that.points[i].y / scale));
                    }
                }

                that.paintEdgeShape(canvas, pts);
            } else {
                // Paints vertex shape
                that.paintVertexShape(canvas, x, y, w, h);
            }
        }

        if (bg && canvas.state && canvas.state.transform) {
            bg.setAttribute('transform', canvas.state.transform);
        }
    },

    paintVertexShape: function (c, x, y, w, h) {
        this.paintBackground(c, x, y, w, h);
        c.setShadow(false);
        this.paintForeground(c, x, y, w, h);
    },

    paintBackground: function (c, x, y, w, h) { },

    paintForeground: function (c, x, y, w, h) { },

    paintEdgeShape: function (c, pts) {},

    paintGlassEffect: function (c, x, y, w, h, arc) {
        var sw = Math.ceil(this.strokewidth / 2);
        var size = 0.4;

        c.setGradient('#ffffff', '#ffffff', x, y, w, h * 0.6, 'south', 0.9, 0.1);
        c.begin();
        arc += 2 * sw;

        if (this.isRounded) {
            c.moveTo(x - sw + arc, y - sw);
            c.quadTo(x - sw, y - sw, x - sw, y - sw + arc);
            c.lineTo(x - sw, y + h * size);
            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            c.lineTo(x + w + sw, y - sw + arc);
            c.quadTo(x + w + sw, y - sw, x + w + sw - arc, y - sw);
        }
        else {
            c.moveTo(x - sw, y - sw);
            c.lineTo(x - sw, y + h * size);
            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            c.lineTo(x + w + sw, y - sw);
        }

        c.close();
        c.fill();
    },

    addPoints: function (c, pts, rounded, arcSize, close) {
        var pe = pts[pts.length - 1];

        // Adds virtual waypoint in the center between start and end point
        if (close && rounded) {
            pts = pts.slice();
            var p0 = pts[0];
            var wp = new Point(pe.x + (p0.x - pe.x) / 2, pe.y + (p0.y - pe.y) / 2);
            pts.splice(0, 0, wp);
        }

        var pt = pts[0];
        var i = 1;

        // Draws the line segments
        c.moveTo(pt.x, pt.y);

        while (i < ((close) ? pts.length : pts.length - 1)) {
            var tmp = pts[mxUtils.mod(i, pts.length)];
            var dx = pt.x - tmp.x;
            var dy = pt.y - tmp.y;

            if (rounded && (dx != 0 || dy != 0)) {
                // Draws a line from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the last point
                var dist = Math.sqrt(dx * dx + dy * dy);
                var nx1 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny1 = dy * Math.min(arcSize, dist / 2) / dist;

                var x1 = tmp.x + nx1;
                var y1 = tmp.y + ny1;
                c.lineTo(x1, y1);

                // Draws a curve from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the next point
                var next = pts[mxUtils.mod(i + 1, pts.length)];

                // Uses next non-overlapping point
                while (i < pts.length - 2 && Math.round(next.x - tmp.x) == 0 && Math.round(next.y - tmp.y) == 0) {
                    next = pts[mxUtils.mod(i + 2, pts.length)];
                    i++;
                }

                dx = next.x - tmp.x;
                dy = next.y - tmp.y;

                dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
                var nx2 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny2 = dy * Math.min(arcSize, dist / 2) / dist;

                var x2 = tmp.x + nx2;
                var y2 = tmp.y + ny2;

                c.quadTo(tmp.x, tmp.y, x2, y2);
                tmp = new Point(x2, y2);
            }
            else {
                c.lineTo(tmp.x, tmp.y);
            }

            pt = tmp;
            i++;
        }

        if (close) {
            c.close();
        }
        else {
            c.lineTo(pe.x, pe.y);
        }
    },

    updateBoundsFromPoints: function () {

        var that = this;
        var bounds;

        each(that.points || [], function (point, index) {

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (index === 0) {
                that.bounds = bounds = rect;
            } else {
                bounds.add(rect);
            }
        });

        return that;
    },

    checkBounds: function () {

        var bounds = this.bounds;

        return bounds && !isNaN(bounds.x) && !isNaN(bounds.y) && !isNaN(bounds.width) && !isNaN(bounds.height) &&
            bounds.width > 0 &&
            bounds.height > 0;
    },

    getLabelBounds: function (rect) {
        return rect;
    },

    getGradientBounds: function (c, x, y, w, h) {
        return new Rectangle(x, y, w, h);
    },

    getArcSize: function (w, h) {
        var f = getValue(this.style, constants.STYLE_ARCSIZE,
                constants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
        return Math.min(w * f, h * f);
    },

    createBoundingBox: function () {

        var bb = this.bounds.clone();

        if ((this.stencil && (this.direction === constants.DIRECTION_NORTH ||
            this.direction === constants.DIRECTION_SOUTH)) || this.isPaintBoundsInverted()) {
            bb.rotate90();
        }

        return bb;
    },

    updateBoundingBox: function () {
        if (this.bounds != null) {
            var bbox = this.createBoundingBox();

            if (bbox != null) {
                this.augmentBoundingBox(bbox);
                var rot = this.getShapeRotation();

                if (rot != 0) {
                    bbox = mxUtils.getBoundingBox(bbox, rot);
                }
            }

            this.boundingBox = bbox;
        }
    },

    augmentBoundingBox: function (bbox) {
        if (this.isShadow) {
            bbox.width += Math.ceil(constants.SHADOW_OFFSET_X * this.scale);
            bbox.height += Math.ceil(constants.SHADOW_OFFSET_Y * this.scale);
        }

        // Adds strokeWidth
        bbox.grow(this.strokewidth * this.scale / 2);
    },

    updateTransform: function (canvas, x, y, w, h) {

        var shape = this;

        canvas.scale(shape.scale);
        canvas.rotate(shape.getShapeRotation(), shape.flipH, shape.flipV, x + w / 2, y + h / 2);

        return shape;
    },

    createCanvas: function () {

        var that = this;
        var node = that.node;
        var canvas = new Canvas2D(node, false);

        canvas.strokeTolerance = that.pointerEvents ? that.svgStrokeTolerance : 0;
        canvas.pointerEventsValue = that.svgPointerEvents;
        canvas.blockImagePointerEvents = false;//mxClient.IS_FF;
        canvas.antiAlias = that.antiAlias; // 抗锯齿

        var off = that.getScreenOffset();

        if (off === 0) {
            node.removeAttribute('transform');
        } else {
            node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
        }

        if (that.outline) {
            canvas.setStrokeWidth(this.strokewidth);
            canvas.setStrokeColor(this.stroke);

            if (this.isDashed !== null) {
                canvas.setDashed(this.isDashed);
            }

            canvas.setStrokeWidth = function () {};
            canvas.setStrokeColor = function () {};
            canvas.setFillColor = function () {};
            canvas.setGradient = function () {};
            canvas.setDashed = function () {};
        }

        return canvas;
    },

    configureCanvas: function (canvas, x, y, w, h) {
        var dash;

        if (this.style) {
            dash = this.style['dashPattern'];
        }

        canvas.setAlpha(this.opacity / 100);

        // Sets alpha, colors and gradients
        if (this.isShadow != null) {
            canvas.setShadow(this.isShadow);
        }

        // Dash pattern
        if (this.isDashed != null) {
            canvas.setDashed(this.isDashed);
        }

        if (dash != null) {
            canvas.setDashPattern(dash);
        }

        if (this.fill != null && this.fill != constants.NONE && this.gradient && this.gradient != constants.NONE) {
            var b = this.getGradientBounds(canvas, x, y, w, h);
            canvas.setGradient(this.fill, this.gradient, b.x, b.y, b.width, b.height, this.gradientDirection);
        }
        else {
            canvas.setFillColor(this.fill);
        }

        canvas.setStrokeColor(this.stroke);
    },

    destroyCanvas: function (canvas) {

        each(canvas.gradients, function (gradient) {
            gradient.mxRefCount = (gradient.mxRefCount || 0) + 1;
        });
        this.releaseSvgGradients(this.oldGradients);
        this.oldGradients = canvas.gradients;
    },

    setCursor: function (cursor) {

        var shape = this;
        var node = shape.node;

        cursor = cursor || '';

        shape.cursor = cursor;

        if (node) {
            node.style.cursor = cursor;
        }

        return shape;
    },

    getCursor: function () {
        return this.cursor;
    },

    getRotation: function () {
        var rotation = this.rotation;
        return isNullOrUndefined(rotation) ? 0 : rotation;
    },

    getTextRotation: function () {
        var rot = this.getRotation();

        if (getValue(this.style, constants.STYLE_HORIZONTAL, 1) !== 1) {
            //rot += mxText.prototype.verticalTextRotation;
            rot += -90;
        }

        return rot;
    },

    getShapeRotation: function () {
        var rot = this.getRotation();

        if (this.direction) {
            if (this.direction === constants.DIRECTION_NORTH) {
                rot += 270;
            }
            else if (this.direction === constants.DIRECTION_WEST) {
                rot += 180;
            }
            else if (this.direction === constants.DIRECTION_SOUTH) {
                rot += 90;
            }
        }

        return rot;
    },

    createTransparentSvgRectangle: function (x, y, w, h) {
        var rect = document.createElementNS(constants.NS_SVG, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', 'none');
        rect.setAttribute('pointer-events', 'all');

        return rect;
    },

    setTransparentBackgroundImage: function (node) {
        node.style.backgroundImage = 'url(\'' + mxClient.imageBasePath + '/transparent.gif\')';
    },

    releaseSvgGradients: function (grads) {
        if (grads != null) {
            for (var key in grads) {
                var gradient = grads[key];
                gradient.mxRefCount = (gradient.mxRefCount || 0) - 1;

                if (gradient.mxRefCount == 0 && gradient.parentNode != null) {
                    gradient.parentNode.removeChild(gradient);
                }
            }
        }
    },

    isPaintBoundsInverted: function () {
        return !this.stencil && (this.direction === constants.DIRECTION_NORTH ||
            this.direction === constants.DIRECTION_SOUTH);
    },

    destroy: function () {
        if (this.node) {
            mxEvent.release(this.node);

            if (this.node.parentNode) {
                this.node.parentNode.removeChild(this.node);
            }

            this.node = null;
        }

        // Decrements refCount and removes unused
        this.releaseSvgGradients(this.oldGradients);
        this.oldGradients = null;
    }
});

module.exports = Shape;

},{"../Base":1,"../Canvas2D":2,"../Point":10,"../Rectangle":11,"../common/utils":26,"../constants":27}],47:[function(require,module,exports){
var utils = require('../common/utils');
var Shape = require('./Shape');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({

    baseSpacingTop: 0,
    baseSpacingBottom: 0,
    baseSpacingLeft: 0,
    baseSpacingRight: 0,
    replaceLinefeeds: true,
    verticalTextRotation: -90,
    ignoreClippedStringSize: true,
    ignoreStringSize: false,
    textWidthPadding: 3,


    constructor: function Text(
        value, bounds, align, valign, color,
        family, size, fontStyle, spacing, spacingTop, spacingRight,
        spacingBottom, spacingLeft, horizontal, background, border,
        wrap, clipped, overflow, labelPadding
    ) {

        this.constructor.superclass.constructor.call(this);

        this.value = value;
        this.bounds = bounds;
        this.color = (color != null) ? color : 'black';
        this.align = (align != null) ? align : '';
        this.valign = (valign != null) ? valign : '';
        this.family = (family != null) ? family : constants.DEFAULT_FONTFAMILY;
        this.size = (size != null) ? size : constants.DEFAULT_FONTSIZE;
        this.fontStyle = (fontStyle != null) ? fontStyle : constants.DEFAULT_FONTSTYLE;
        this.spacing = parseInt(spacing || 2);
        this.spacingTop = this.spacing + parseInt(spacingTop || 0);
        this.spacingRight = this.spacing + parseInt(spacingRight || 0);
        this.spacingBottom = this.spacing + parseInt(spacingBottom || 0);
        this.spacingLeft = this.spacing + parseInt(spacingLeft || 0);
        this.horizontal = (horizontal != null) ? horizontal : true;
        this.background = background;
        this.border = border;
        this.wrap = (wrap != null) ? wrap : false;
        this.clipped = (clipped != null) ? clipped : false;
        this.overflow = (overflow != null) ? overflow : 'visible';
        this.labelPadding = (labelPadding != null) ? labelPadding : 0;
        this.rotation = 0;
        this.updateMargin();
    },

    isParseVml: function () {return false},

    isHtmlAllowed: function () {return true},

    getSvgScreenOffset: function () {return 0},

    checkBounds: function () {
        return (this.bounds && !isNaN(this.bounds.x) && !isNaN(this.bounds.y) && !isNaN(this.bounds.width) && !isNaN(this.bounds.height));
    },

    apply: function (state) {
        this.constructor.superclass.apply.apply(this, arguments);

        if (this.style != null) {
            this.fontStyle = mxUtils.getValue(this.style, constants.STYLE_FONTSTYLE, this.fontStyle);
            this.family = mxUtils.getValue(this.style, constants.STYLE_FONTFAMILY, this.family);
            this.size = mxUtils.getValue(this.style, constants.STYLE_FONTSIZE, this.size);
            this.color = mxUtils.getValue(this.style, constants.STYLE_FONTCOLOR, this.color);
            this.align = mxUtils.getValue(this.style, constants.STYLE_ALIGN, this.align);
            this.valign = mxUtils.getValue(this.style, constants.STYLE_VERTICAL_ALIGN, this.valign);
            this.spacingTop = mxUtils.getValue(this.style, constants.STYLE_SPACING_TOP, this.spacingTop);
            this.spacingRight = mxUtils.getValue(this.style, constants.STYLE_SPACING_RIGHT, this.spacingRight);
            this.spacingBottom = mxUtils.getValue(this.style, constants.STYLE_SPACING_BOTTOM, this.spacingBottom);
            this.spacingLeft = mxUtils.getValue(this.style, constants.STYLE_SPACING_LEFT, this.spacingLeft);
            this.horizontal = mxUtils.getValue(this.style, constants.STYLE_HORIZONTAL, this.horizontal);
            this.background = mxUtils.getValue(this.style, constants.STYLE_LABEL_BACKGROUNDCOLOR, this.background);
            this.border = mxUtils.getValue(this.style, constants.STYLE_LABEL_BORDERCOLOR, this.border);
            this.updateMargin();
        }
    },

    updateBoundingBox: function () {
        var node = this.node;
        this.boundingBox = this.bounds.clone();
        var rot = this.getTextRotation();

        var h = (this.style) ? getValue(this.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER) : null;
        var v = (this.style) ? getValue(this.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE) : null;

        if (!this.ignoreStringSize && node && this.overflow != 'fill' && (!this.clipped || !this.ignoreClippedStringSize || h != constants.ALIGN_CENTER || v != constants.ALIGN_MIDDLE)) {
            var ow = null;
            var oh = null;

            if (node.ownerSVGElement != null) {
                if (node.firstChild != null && node.firstChild.firstChild != null &&
                    node.firstChild.firstChild.nodeName == 'foreignObject') {
                    node = node.firstChild.firstChild;
                    ow = parseInt(node.getAttribute('width')) * this.scale;
                    oh = parseInt(node.getAttribute('height')) * this.scale;
                }
                else {
                    try {
                        var b = node.getBBox();

                        // Workaround for bounding box of empty string
                        if (typeof(this.value) == 'string' && mxUtils.trim(this.value) == 0) {
                            return;
                        }

                        if (b.width == 0 && b.height == 0) {
                            return;
                        }

                        this.boundingBox = new Rectangle(b.x, b.y, b.width, b.height);
                        rot = 0;
                    }
                    catch (e) {
                        // Ignores NS_ERROR_FAILURE in FF if container display is none.
                    }
                }
            }
            else {
                var td = (this.state != null) ? this.state.view.textDiv : null;

                // Use cached offset size
                if (this.offsetWidth != null && this.offsetHeight != null) {
                    ow = this.offsetWidth * this.scale;
                    oh = this.offsetHeight * this.scale;
                }
                else {
                    // Cannot get node size while container hidden so a
                    // shared temporary DIV is used for text measuring
                    if (td != null) {
                        this.updateFont(td);
                        this.updateSize(td, false);
                        this.updateInnerHtml(td);

                        node = td;
                    }

                    var sizeDiv = node;

                    if (document.documentMode == 8 && !mxClient.IS_EM) {
                        var w = Math.round(this.bounds.width / this.scale);

                        if (this.wrap && w > 0) {
                            node.whiteSpace = 'normal';

                            // Innermost DIV is used for measuring text
                            var divs = sizeDiv.getElementsByTagName('div');

                            if (divs.length > 0) {
                                sizeDiv = divs[divs.length - 1];
                            }

                            ow = sizeDiv.offsetWidth + 2;
                            divs = this.node.getElementsByTagName('div');

                            if (this.clipped) {
                                ow = Math.min(w, ow);
                            }

                            // Second last DIV width must be updated in DOM tree
                            if (divs.length > 1) {
                                divs[divs.length - 2].style.width = ow + 'px';
                            }
                        }
                        else {
                            node.whiteSpace = 'nowrap';
                        }
                    }
                    else if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                        sizeDiv = sizeDiv.firstChild;
                    }

                    ow = (sizeDiv.offsetWidth + this.textWidthPadding) * this.scale;
                    oh = sizeDiv.offsetHeight * this.scale;
                }
            }

            if (ow != null && oh != null) {
                var x0 = this.bounds.x + this.margin.x * ow;
                var y0 = this.bounds.y + this.margin.y * oh;

                this.boundingBox = new Rectangle(x0, y0, ow, oh);
            }
        }
        else {
            this.boundingBox.x += this.margin.x * this.boundingBox.width;
            this.boundingBox.y += this.margin.y * this.boundingBox.height;
        }

        if (this.boundingBox) {
            if (rot != 0) {
                var bbox = mxUtils.getBoundingBox(this.boundingBox, rot);

                this.boundingBox.x = bbox.x;
                this.boundingBox.y = bbox.y;

                if (!mxClient.IS_QUIRKS) {
                    this.boundingBox.width = bbox.width;
                    this.boundingBox.height = bbox.height;
                }
            }
        }
    },

    getShapeRotation: function () {
        return 0;
    },

    getTextRotation: function () {
        return (this.state != null && this.state.shape != null) ? this.state.shape.getTextRotation() : 0;
    },

    isPaintBoundsInverted: function () {
        return !this.horizontal && this.state != null && this.state.view.graph.model.isVertex(this.state.cell);
    },

    configureCanvas: function (c, x, y, w, h) {
        this.constructor.superclass.configureCanvas.apply(this, arguments);

        c.setFontColor(this.color);
        c.setFontBackgroundColor(this.background);
        c.setFontBorderColor(this.border);
        c.setFontFamily(this.family);
        c.setFontSize(this.size);
        c.setFontStyle(this.fontStyle);
    },

    updateVmlContainer: function () {
        this.node.style.left = Math.round(this.bounds.x) + 'px';
        this.node.style.top = Math.round(this.bounds.y) + 'px';
        this.node.style.width = '1px';
        this.node.style.height = '1px';
        this.node.style.overflow = 'visible';
    },

    paint: function (c) {
        // Scale is passed-through to canvas
        var s = this.scale;
        var x = this.bounds.x / s;
        var y = this.bounds.y / s;
        var w = this.bounds.width / s;
        var h = this.bounds.height / s;

        this.updateTransform(c, x, y, w, h);
        this.configureCanvas(c, x, y, w, h);

        // Checks if text contains HTML markup
        var realHtml = utils.isNode(this.value) || this.dialect == constants.DIALECT_STRICTHTML;

        // Always renders labels as HTML in VML
        //var fmt = (realHtml || c instanceof mxVmlCanvas2D) ? 'html' : '';
        var fmt = '';
        var val = this.value;

        if (!realHtml && fmt == 'html') {
            val = mxUtils.htmlEntities(val, false);
        }

        val = (!utils.isNode(this.value) && this.replaceLinefeeds && fmt == 'html') ?
            val.replace(/\n/g, '<br/>') : val;

        c.text(x, y, w, h, val, this.align, this.valign, this.wrap, fmt, this.overflow,
            this.clipped, this.getTextRotation());
    },

    redrawHtmlShape: function () { },

    updateHtmlTransform: function () { },

    updateInnerHtml: function (elt) {

        if (mxUtils.isNode(this.value)) {
            elt.innerHTML = this.value.outerHTML;
        }
        else {
            var val = this.value;

            if (this.dialect != constants.DIALECT_STRICTHTML) {
                // LATER: Can be cached in updateValue
                val = mxUtils.htmlEntities(val, false);
            }

            val = (this.replaceLinefeeds) ? val.replace(/\n/g, '<br/>') : val;
            val = '<div style="display:inline-block;_display:inline;">' + val + '</div>';

            elt.innerHTML = val;
        }
    },

    updateHtmlFilter: function () {
        var style = this.node.style;
        var dx = this.margin.x;
        var dy = this.margin.y;
        var s = this.scale;

        // Resets filter before getting offsetWidth
        mxUtils.setOpacity(this.node, this.opacity);

        // Adds 1 to match table height in 1.x
        var ow = 0;
        var oh = 0;
        var td = (this.state != null) ? this.state.view.textDiv : null;
        var sizeDiv = this.node;

        // Fallback for hidden text rendering in IE quirks mode
        if (td != null) {
            td.style.overflow = '';
            td.style.height = '';
            td.style.width = '';

            this.updateFont(td);
            this.updateSize(td, false);
            this.updateInnerHtml(td);

            var w = Math.round(this.bounds.width / this.scale);

            if (this.wrap && w > 0) {
                td.whiteSpace = 'normal';
                ow = w;

                if (this.clipped) {
                    ow = Math.min(ow, this.bounds.width);
                }

                td.style.width = ow + 'px';
            }
            else {
                td.whiteSpace = 'nowrap';
            }

            sizeDiv = td;

            if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                sizeDiv = sizeDiv.firstChild;
            }

            // Required to update the height of the text box after wrapping width is known
            if (!this.clipped && this.wrap && w > 0) {
                ow = sizeDiv.offsetWidth + this.textWidthPadding;
                td.style.width = ow + 'px';
            }

            oh = sizeDiv.offsetHeight + 2;

            if (mxClient.IS_QUIRKS && this.border != null && this.border != constants.NONE) {
                oh += 3;
            }
        }
        else if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
            sizeDiv = sizeDiv.firstChild;

            oh = sizeDiv.offsetHeight;
        }

        ow = sizeDiv.offsetWidth + this.textWidthPadding;

        if (this.clipped) {
            oh = Math.min(oh, this.bounds.height);
        }

        // Stores for later use
        this.offsetWidth = ow;
        this.offsetHeight = oh;

        var w = this.bounds.width / s;
        var h = this.bounds.height / s;

        // Simulates max-height CSS in quirks mode
        if (mxClient.IS_QUIRKS && (this.clipped || (this.overflow == 'width' && h > 0))) {
            h = Math.min(h, oh);
            style.height = Math.round(h) + 'px';
        }
        else {
            h = oh;
        }

        if (this.overflow != 'fill' && this.overflow != 'width') {
            if (this.clipped) {
                ow = Math.min(w, ow);
            }

            w = ow;

            // Simulates max-width CSS in quirks mode
            if ((mxClient.IS_QUIRKS && this.clipped) || this.wrap) {
                style.width = Math.round(w) + 'px';
            }
        }

        h *= s;
        w *= s;

        // Rotation case is handled via VML canvas
        var rad = this.getTextRotation() * (Math.PI / 180);

        // Precalculate cos and sin for the rotation
        var real_cos = parseFloat(parseFloat(Math.cos(rad)).toFixed(8));
        var real_sin = parseFloat(parseFloat(Math.sin(-rad)).toFixed(8));

        rad %= 2 * Math.PI;

        if (rad < 0) {
            rad += 2 * Math.PI;
        }

        rad %= Math.PI;

        if (rad > Math.PI / 2) {
            rad = Math.PI - rad;
        }

        var cos = Math.cos(rad);
        var sin = Math.sin(-rad);

        var tx = w * -(dx + 0.5);
        var ty = h * -(dy + 0.5);

        var top_fix = (h - h * cos + w * sin) / 2 + real_sin * tx - real_cos * ty;
        var left_fix = (w - w * cos + h * sin) / 2 - real_cos * tx - real_sin * ty;

        if (rad != 0) {
            var f = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + real_cos + ', M12=' +
                real_sin + ', M21=' + (-real_sin) + ', M22=' + real_cos + ', sizingMethod=\'auto expand\')';

            if (style.filter != null && style.filter.length > 0) {
                style.filter += ' ' + f;
            }
            else {
                style.filter = f;
            }
        }

        style.zoom = s;
        style.left = Math.round(this.bounds.x + left_fix - w / 2) + 'px';
        style.top = Math.round(this.bounds.y + top_fix - h / 2) + 'px';
    },

    updateValue: function () {
        if (mxUtils.isNode(this.value)) {
            this.node.innerHTML = '';
            this.node.appendChild(this.value);
        }
        else {
            var val = this.value;

            if (this.dialect != constants.DIALECT_STRICTHTML) {
                val = mxUtils.htmlEntities(val, false);
            }

            val = (this.replaceLinefeeds) ? val.replace(/\n/g, '<br/>') : val;
            var bg = (this.background != null && this.background != constants.NONE) ? this.background : null;
            var bd = (this.border != null && this.border != constants.NONE) ? this.border : null;

            if (this.overflow == 'fill' || this.overflow == 'width') {
                if (bg != null) {
                    this.node.style.backgroundColor = bg;
                }

                if (bd != null) {
                    this.node.style.border = '1px solid ' + bd;
                }
            }
            else {
                var css = '';

                if (bg != null) {
                    css += 'background-color:' + bg + ';';
                }

                if (bd != null) {
                    css += 'border:1px solid ' + bd + ';';
                }

                // Wrapper DIV for background, zoom needed for inline in quirks
                // and to measure wrapped font sizes in all browsers
                // FIXME: Background size in quirks mode for wrapped text
                var lh = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(this.size * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
                val = '<div style="zoom:1;' + css + 'display:inline-block;_display:inline;text-decoration:inherit;' +
                    'padding-bottom:1px;padding-right:1px;line-height:' + lh + '">' + val + '</div>';
            }

            this.node.innerHTML = val;
        }
    },

    updateFont: function (node) {
        var style = node.style;

        style.lineHeight = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(this.size * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
        style.fontSize = Math.round(this.size) + 'px';
        style.fontFamily = this.family;
        style.verticalAlign = 'top';
        style.color = this.color;

        if ((this.fontStyle & constants.FONT_BOLD) == constants.FONT_BOLD) {
            style.fontWeight = 'bold';
        }
        else {
            style.fontWeight = '';
        }

        if ((this.fontStyle & constants.FONT_ITALIC) == constants.FONT_ITALIC) {
            style.fontStyle = 'italic';
        }
        else {
            style.fontStyle = '';
        }

        if ((this.fontStyle & constants.FONT_UNDERLINE) == constants.FONT_UNDERLINE) {
            style.textDecoration = 'underline';
        }
        else {
            style.textDecoration = '';
        }

        if (this.align == constants.ALIGN_CENTER) {
            style.textAlign = 'center';
        }
        else if (this.align == constants.ALIGN_RIGHT) {
            style.textAlign = 'right';
        }
        else {
            style.textAlign = 'left';
        }
    },

    updateSize: function (node, enableWrap) {
        var w = Math.round(this.bounds.width / this.scale);
        var h = Math.round(this.bounds.height / this.scale);
        var style = node.style;

        // NOTE: Do not use maxWidth here because wrapping will
        // go wrong if the cell is outside of the viewable area
        if (this.clipped) {
            style.overflow = 'hidden';

            if (!mxClient.IS_QUIRKS) {
                style.maxHeight = h + 'px';
                style.maxWidth = w + 'px';
            }
            else {
                style.width = w + 'px';
            }
        }
        else if (this.overflow == 'fill') {
            style.width = w + 'px';
            style.height = h + 'px';
        }
        else if (this.overflow == 'width') {
            style.width = w + 'px';
            style.maxHeight = h + 'px';
        }

        if (this.wrap && w > 0) {
            style.whiteSpace = 'normal';
            style.width = w + 'px';

            if (enableWrap) {
                var sizeDiv = node;

                if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                    sizeDiv = sizeDiv.firstChild;
                }

                var tmp = sizeDiv.offsetWidth + 3;

                if (this.clipped) {
                    tmp = Math.min(tmp, w);
                }

                style.width = tmp + 'px';
            }
        }
        else {
            style.whiteSpace = 'nowrap';
        }
    },


    // 根据对齐方式，返回一个代表对齐方式的 point
    updateMargin: function () {
        this.margin = this.getAlignmentAsPoint(this.align, this.valign);
    },

    getAlignmentAsPoint: function (align, valign) {
        var dx = 0; // left
        var dy = 0; // top

        // Horizontal alignment
        if (align == constants.ALIGN_CENTER) {
            dx = -0.5;
        }
        else if (align == constants.ALIGN_RIGHT) {
            dx = -1;
        }

        // Vertical alignment
        if (valign == constants.ALIGN_MIDDLE) {
            dy = -0.5;
        }
        else if (valign == constants.ALIGN_BOTTOM) {
            dy = -1;
        }

        return new Point(dx, dy);
    },

    getSpacing: function () {
        var dx = 0;
        var dy = 0;

        if (this.align == constants.ALIGN_CENTER) {
            dx = (this.spacingLeft - this.spacingRight) / 2;
        }
        else if (this.align == constants.ALIGN_RIGHT) {
            dx = -this.spacingRight - this.baseSpacingRight;
        }
        else {
            dx = this.spacingLeft + this.baseSpacingLeft;
        }

        if (this.valign == constants.ALIGN_MIDDLE) {
            dy = (this.spacingTop - this.spacingBottom) / 2;
        }
        else if (this.valign == constants.ALIGN_BOTTOM) {
            dy = -this.spacingBottom - this.baseSpacingBottom;
        }
        else {
            dy = this.spacingTop + this.baseSpacingTop;
        }

        return new Point(dx, dy);
    }
});


},{"../Point":10,"../Rectangle":11,"../common/utils":26,"../constants":27,"./Shape":46}]},{},[39]);
