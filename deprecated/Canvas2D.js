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

            // 填充
            fillColor: null,
            fillAlpha: 1,
            gradientColor: null,
            gradientAlpha: 1,
            gradientDirection: null,

            // 边框
            strokeWidth: 1,
            strokeColor: null,
            dashed: false,
            dashPattern: '3 3',
            lineCap: 'flat',
            lineJoin: 'miter',
            miterLimit: 10,

            // 字体
            fontColor: '#000000',
            fontBackgroundColor: null,
            fontBorderColor: null,
            fontSize: constants.DEFAULT_FONT_SIZE,
            fontFamily: constants.DEFAULT_FONT_FAMILY,
            fontStyle: 0,

            // 阴影
            shadow: false,
            shadowColor: constants.SHADOW_COLOR,
            shadowAlpha: constants.SHADOW_OPACITY,
            shadowDx: constants.SHADOW_OFFSET_X,
            shadowDy: constants.SHADOW_OFFSET_Y,

            // 旋转
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

        //return mxUtils.getRotatedPoint(new Point(x, y), Math.cos(rad),
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

    // stroke
    // ------
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


    //

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
    'shadowColor'
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
