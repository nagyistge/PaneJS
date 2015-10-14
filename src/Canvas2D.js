/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('./common/class');
var utils = require('./common/utils');
var constants = require('./constants');


var each = utils.each;
var ucFirst = utils.ucFirst;
var isNullOrUndefined = utils.isNullOrUndefined;

var proto = {
    constructor: function Canvas(root, styleEnabled) {

        var canvas = this;

        canvas.root = root;
        canvas.defs = null;
        canvas.gradients = [];
        canvas.styleEnabled = !isNullOrUndefined(styleEnabled) ? styleEnabled : false;

        this.reset();
    },

    node: null,
    state: null,
    states: null,
    path: null,
    rotateHtml: true,
    lastX: 0,
    lastY: 0,

    antiAlias: true,
    matchHtmlAlignment: true,
    textEnabled: true,
    foEnabled: true,// foreignObject
    foAltText: '[Object]',
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
        var states = canvas.states;

        if (states && state) {
            states.push(state);
        }

        canvas.state = utils.clone(state);

        return canvas;
    },

    restore: function () {

        var canvas = this;
        var states = canvas.states;

        if (states && states.length) {
            canvas.state = states.pop();
        }

        return canvas;
    },

    format: function (value) {
        return this.antiAlias ?
            utils.toFixed(value, 2) :
            Math.round(parseFloat(value));
    },


    rotatePoint: function () {},

    scale: function (value) {
        var canvas = this;
        var state = canvas.state;

        if (state) {
            state.scale *= value;
            state.strokeWidth *= value;
        }

        return canvas;
    },

    translate: function (dx, dy) {
        var canvas = this;
        var state = canvas.state;

        if (state) {
            state.dx += dx;
            state.dy += dy;
        }

        return canvas;
    },

    rotate: function (/*theta, flipH, flipV, cx, cy*/) {},


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
        var length = arguments.length;

        if (path) {
            path.push(arguments[0]);

            if (length > 2) {
                for (var i = 2; i < length; i += 2) {
                    canvas.lastX = arguments[i - 1];
                    canvas.lastY = arguments[i];

                    path.push(canvas.format((canvas.lastX + state.dx) * state.scale));
                    path.push(canvas.format((canvas.lastY + state.dy) * state.scale));
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
        var format = canvas.format;
        var state = canvas.state;
        var scale = state.scale;
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

    image: function (/*x, y, w, h*/) {},

    createDiv: function () {},

    text: function () {},

    createClip: function () {},

    plainText: function () {},

    updateFont: function () {},

    addTextBackground: function () {},


    stroke: function () {
        this.addNode(false, false);
    },
    fill: function () {
        this.addNode(true, false);
    },
    fillAndStroke: function () {
        this.addNode(true, true);
    },


    createStyle: function () {},

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

    createAlternateContent: function () {},

    createGradientId: function () {},

    getSvgGradient: function () {},

    createSvgGradient: function () {},

    addNode: function (filled, stroked) {

        var canvas = this;
        var root = canvas.root;
        var node = canvas.node;
        var state = canvas.state;

        if (!node) {
            return canvas;
        }


        if (node.nodeName === 'path') {

            var path = canvas.path;
            if (path && path.length) {
                node.setAttribute('d', path.join(' '));
            } else {
                return canvas;
            }
        }

        //
        if (filled && state.fillColor) {
            canvas.updateFill();
        } else if (!canvas.styleEnabled) {
            node.setAttribute('fill', 'none');
            // Sets the actual filled state for stroke tolerance
            filled = false;
        }

        if (stroked && state.strokeColor) {
            state.updateStroke();
        } else if (!canvas.styleEnabled) {
            node.setAttribute('stroke', 'none');
        }

        if (state.transform && state.transform.length > 0) {
            node.setAttribute('transform', state.transform);
        }

        if (state.shadow) {
            root.appendChild(canvas.createShadow(node));
        }

        // Adds stroke tolerance
        if (canvas.strokeTolerance > 0 && !filled) {
            root.appendChild(canvas.createTolerance(node));
        }

        // Adds pointer events
        if (canvas.pointerEvents && (node.nodeName != 'path' ||
            this.path[this.path.length - 1] == this.closeOp)) {
            node.setAttribute('pointer-events', this.pointerEventsValue);
        }
        // Enables clicks for nodes inside a link element
        else if (!canvas.pointerEvents && canvas.originalRoot === null) {
            node.setAttribute('pointer-events', 'none');
        }

        root.appendChild(node);

        return canvas;
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

    updateStrokeAttributes: function () {},

    createDashPattern: function () {},
    createTolerance: function () {},

    createShadow: function () {},

    setLink: function () {},

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


// Exports
// -------

module.exports = Class.create(proto);
