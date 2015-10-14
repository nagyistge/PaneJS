(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var zeroZgraph = require('../src/index.js');

var assert = chai.assert;

// NOTICE:
// you should start a static server in the root of this project
// then run this test

describe('zero-zgraph', function () {
    it('exists', function () {
        assert.typeOf(zeroZgraph, 'object');
    });
});


},{"../src/index.js":22}],2:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('./class');
var constants = require('./constants');
var utils = require('./utils');


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

},{"./class":19,"./constants":20,"./utils":25}],3:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */
/*jshint -W030 */

// TODO: cell 可以细分为 连线和节点 两种，这里放在同一个类中有点生硬

var klass = require('./class');
var constants = require('./constants');
var utils = require('./utils');


klass.create({
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
        if (child !== null) {
            if (index === null) {
                index = this.getChildCount();

                if (child.getParent() === this) {
                    index--;
                }
            }

            child.removeFromParent();
            child.setParent(this);

            if (this.children === null) {
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
        if (edge !== null) {
            if (edge.getTerminal(!isOutgoing) !== this &&
                this.edges !== null) {
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

        if (terminal !== null) {
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

},{"./class":19,"./constants":20,"./utils":25}],4:[function(require,module,exports){
'use strict';

var Class = require('./class');

var CellRenderer = Class.create({
    // 静态属性和方法
    Statics: {
        shapes: {},
        registerShape: function (key, shape) {
            CellRenderer.shapes[key] = shape;
        }
    },
    constructor: function CellRenderer() {},

    defaultEdgeShape: null,
    defaultVertexShape: null,
    defaultTextShape: null,
    legacyControlPosition: true,
    legacySpacing: true,
    antiAlias: true,

    createShape: function (state) {

    },

    getShape: function (name) {
        return CellRenderer.shapes[name];
    },

    getShapeConstructor: function (state) {

    }

});

},{"./class":19}],5:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Point = require('./Point');
var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({
    constructor: function CellState(view, cell, style) {
        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    view: null,
    cell: null,
    style: null,
    invalid: true,
    origin: null,
    absolutePoints: null,
    absoluteOffset: null,
    visibleSourceState: null,
    visibleTargetState: null,
    terminalDistance: 0,
    length: 0,
    segments: null,
    shape: null,
    text: null,

    getPerimeterBounds: function (/*border, bounds*/) {
    },

    setAbsoluteTerminalPoint: function (/*point, isSource*/) {
    },

    setCursor: function (cursor) {
        if (this.shape !== null) {
            this.shape.setCursor(cursor);
        }

        if (this.text !== null) {
            this.text.setCursor(cursor);
        }
    },

    getVisibleTerminal: function (/*source*/) {
    },
    getVisibleTerminalState: function (/*source*/) {
    },
    setVisibleTerminalState: function (/*terminalState, source*/) {
    },

    getCellBounds: function () {
    },
    getPaintBounds: function () {
    },
    updateCachedBounds: function () {
    },

    clone: function () {
    },

    destroy: function () {
    }
});


},{"./Point":11,"./Rectangle":12}],6:[function(require,module,exports){
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

},{"./class":19,"./objectIdentity":23,"./utils":25}],7:[function(require,module,exports){
var Class = require('./class');
var utils = require('./utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function EventObject(name) {
        var evt = this;

        evt.name = name;
        evt.properties = {};
        evt.consumed = false;

        for (var i = 1, l = arguments.length; i < l; i += 2) {
            evt.properties[arguments[i]] = arguments[i + 1];
        }
    },

    getName: function () {
        return this.name;
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

},{"./class":19,"./utils":25}],8:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({

    constructor: function Geometry(x, y, width, height) {
        Geometry.superclass.constructor.call(this, x, y, width, height);
    },

    TRANSLATE_CONTROL_POINTS: true,
    alternateBounds: null,
    sourcePoint: null,
    targetPoint: null,
    points: null,
    offset: null,
    relative: false,


    swap: function () {

        var geom = this;
        var alternateBounds = geom.alternateBounds;

        if (alternateBounds) {
            var old = new Rectangle(geom.x, geom.y, geom.width, geom.height);

            geom.x = alternateBounds.x;
            geom.y = alternateBounds.y;
            geom.width = alternateBounds.width;
            geom.height = alternateBounds.height;

            geom.alternateBounds = old;
        }

        return geom;
    },

    getTerminalPoint: function (isSource) {
        var geom = this;
        return isSource ? geom.sourcePoint : geom.targetPoint;
    },

    setTerminalPoint: function (point, isSource) {
        var geom = this;
        if (isSource) {
            geom.sourcePoint = point;
        } else {
            geom.targetPoint = point;
        }

        return point;
    },

    rotate: function (/*angle, cx*/) {
    },
    translate: function (/*dx, dy*/) {
    },
    scale: function (/*sx, sy, fixedAspect*/) {
    },

    equals: function (/*obj*/) {
    }
});

},{"./Rectangle":12}],9:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var klass = require('./class');
var constants = require('./constants');
var View = require('./View');
var Model = require('./Model');
var Events = require('./events');
//var utils = require('./utils');

var isNUllOrUndefined = utils.isNUllOrUndefined;

module.exports = klass.create({
    Implements: Events,
    constructor: function Graph(container, model/*, stylesheet*/) {

        var graph = this;

        graph.mouseListeners = null;
        graph.model = model ? model : graph.createModel();
        graph.multiplicities = [];
        graph.imageBundles = [];
        //graph.cellRenderer = graph.createCellRenderer();
        //graph.setSelectionModel(graph.createSelectionModel());
        //graph.setStylesheet(stylesheet ? stylesheet : graph.createStylesheet());
        graph.view = graph.createView();

        if (container) {
            graph.init(container);
        }

        graph.view.revalidate();
    },

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

    init: function (container) {

        var graph = this;

        graph.container = container;

        // Initializes the in-place editor
        //this.cellEditor = this.createCellEditor();

        // Initializes the container using the view
        graph.view.init();

        // Updates the size of the container for the current graph
        graph.sizeDidChange();

        // Hides tooltips and resets tooltip timer if mouse leaves container
        //mxEvent.addListener(container, 'mouseleave', mxUtils.bind(this, function () {
        //    if (this.tooltipHandler != null) {
        //        this.tooltipHandler.hide();
        //    }
        //}));
    },

    createModel: function () {
        return new Model(this);
    },

    createView: function () {
        return new View(this);
    },

    getModel: function () {
        return this.model;
    },

    getView: function () {
        return this.view;
    },


    insertVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var graph = this;
        var vertex = graph.createVertex(parent, id, value, x, y, width, height, style, relative);
        return graph.addCell(vertex, parent);
    },

    createVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height);
        geometry.relative = !isNUllOrUndefined(relative) ? relative : false;

        // Creates the vertex
        var vertex = new Cell(value, geometry, style);
        vertex.setId(id);
        vertex.setVertex(true);
        vertex.setConnectable(true);

        return vertex;
    },

    insertEdge: function (parent, id, value, source, target, style) {

    },

    createEdge: function (parent, id, value, source, target, style) {
        var geometry = new Geometry();
        geometry.relative = true;

        var edge = new Cell(value, geometry, style);
        edge.setId(id);
        edge.setEdge(true);

        return edge;
    },

});


},{"./Model":10,"./View":14,"./class":19,"./constants":20,"./events":21}],10:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var klass = require('./class');
var Events = require('./events');
var utils = require('./utils');
var Cell = require('./Cell');
var RootChange = require('./changes/RootChange');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = klass.create({
    Implements: Events,
    constructor: function Model(root) {

        var model = this;

        //this.currentEdit = this.createUndoableEdit();

        root ? model.setRoot(root) : model.clear();
    },

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

    clear: function () {

        var model = this;
        model.setRoot(model.createRoot());
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

    getRoot: function (cell) {
        var root = cell || this.root;

        if (cell != null) {
            while (cell != null) {
                root = cell;
                cell = this.getParent(cell);
            }
        }

        return root;
    },


    getCell: function (id) {
        var cells = this.cells;
        return cells ? cells[id] : null;
    },

    filterCells: function (cells, filter) {
        var result = [];

        if (cells != null) {
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
        var result = [];

        parent = parent || this.getRoot();

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
        var oldRoot = this.root;
        this.root = root;

        this.nextId = 0;
        this.cells = null;
        this.cellAdded(root);

        return oldRoot;
    },

    isRoot: function (cell) {
        return cell && this.root === cell;
    },

    isLayer: function (cell) {
        return this.isRoot(this.getParent(cell));
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
        if (child !== parent && parent && child) {
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

    cellAdded: function (cell) {
        if (!cell) {
            return;
        }

        // Creates an Id for the cell if not Id exists
        if (!cell.getId() && this.createIds) {
            cell.setId(this.createId());
        }

        if (cell.getId()) {
            var collision = this.getCell(cell.getId());

            if (collision != cell) {
                // Creates new Id for the cell
                // as long as there is a collision
                while (collision != null) {
                    cell.setId(this.createId(cell));
                    collision = this.getCell(cell.getId());
                }

                // Lazily creates the cells dictionary
                if (this.cells == null) {
                    this.cells = {};
                }

                this.cells[cell.getId()] = cell;
            }
        }

        // Makes sure IDs of deleted cells are not reused
        if (mxUtils.isNumeric(cell.getId())) {
            this.nextId = Math.max(this.nextId, cell.getId());
        }

        // Recursively processes child cells
        var childCount = this.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            this.cellAdded(this.getChildAt(cell, i));
        }
    },

    createId: function () {
        var id = this.nextId;
        this.nextId++;

        return this.prefix + id + this.postfix;
    },
    updateEdgeParents: function (cell, root) {},
    updateEdgeParent: function (cell, root) {},
    getOrigin: function (cell) {
        var result = null;

        if (cell) {
            result = this.getOrigin(this.getParent(cell));

            if (!this.isEdge(cell)) {
                var geo = this.getGeometry(cell);

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
    getNearestCommonAncestor: function (cell1, cell2) {},

    remove: function (cell) {
        if (cell === this.root) {
            this.setRoot(null);
        } else if (this.getParent(cell)) {
            this.execute(new ChildChange(this, null, cell));
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

    parentForCellChanged: function (cell, parent, index) {},

    getChildCount: function (cell) {
        return cell ? cell.getChildCount() : 0;
    },
    getChildAt: function (cell, index) {
        return cell ? cell.getChildAt(index) : null;
    },
    getChildren: function (cell) {
        return cell ? cell.children : null;
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
        var terminalChanged = terminal != this.getTerminal(edge, isSource);
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
    terminalForCellChanged: function (edge, cell, isSource) {
        var previous = this.getTerminal(edge, isSource);

        if (cell != null) {
            cell.insertEdge(edge, isSource);
        }
        else if (previous != null) {
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
    getDirectedEdgeCount: function (cell, outgoing, ignoredEdge) {

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

    getGeometry: function (cell) {},
    setGeometry: function (cell, geometry) {},
    geometryForCellChanged: function (cell, geometry) {},

    getStyle: function (cell) {},
    setStyle: function (cell, style) {},
    styleForCellChanged: function (cell, style) {},

    isCollapsed: function (cell) {},
    setCollapsed: function (cell, collapsed) {},
    collapsedStateForCellChanged: function (cell, collapsed) {},

    isVisible: function (cell) {},
    setVisible: function (cell, visible) {},
    visibleStateForCellChanged: function (cell, visible) {},

    execute: function (change) {

        change.digest();

        this.beginUpdate();

        //this.currentEdit.add(change);
        this.fireEvent(new mxEventObject(mxEvent.EXECUTE, 'change', change));
        // New global executed event
        this.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', change));

        this.endUpdate();

    },

    beginUpdate: function () {
        this.updateLevel++;
        this.fireEvent(new mxEventObject(mxEvent.BEGIN_UPDATE));

        if (this.updateLevel == 1) {
            this.fireEvent(new mxEventObject(mxEvent.START_EDIT));
        }
    },

    endUpdate: function () {
        this.updateLevel--;

        if (this.updateLevel == 0) {
            this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
        }

        if (!this.endingUpdate) {
            this.endingUpdate = this.updateLevel == 0;
            this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));

            try {
                if (this.endingUpdate && !this.currentEdit.isEmpty()) {
                    this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
                    var tmp = this.currentEdit;
                    this.currentEdit = this.createUndoableEdit();
                    tmp.notify();
                    this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', tmp));
                }
            }
            finally {
                this.endingUpdate = false;
            }
        }
    },

    createUndoableEdit: function () {},
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


},{"./Cell":3,"./changes/RootChange":18,"./class":19,"./events":21,"./utils":25}],11:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./class');

var Point = Klass.create({

    constructor: function Point(x, y) {
        this.x = x === null ? 0 : x;
        this.y = y === null ? 0 : y;
    },

    equals: function (point) {
        return point instanceof Point && point.x === this.x && point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

module.exports = Point;


},{"./class":19}],12:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./class');
var Point = require('./point');

var Rect = Klass.create({
    Extends: Point,
    constructor: function Rectangle(x, y, width, height) {
        //
        Rect.superclass.constructor.call(this, x, y);

        this.width = width === null ? 0 : width;
        this.height = height === null ? 0 : height;
    },

    fromRect: function (rect) {
        return new Rect(rect.x, rect.y, rect.width, rect.height);
    },

    setRect: function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

        var minX = Math.min(this.x, rect.x);
        var minY = Math.min(this.y, rect.y);
        var maxX = Math.max(this.x + this.width, rect.x + rect.width);
        var maxY = Math.max(this.y + this.height, rect.y + rect.height);

        this.x = minX;
        this.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
    },

    grow: function (amount) {
        this.x -= amount;
        this.y -= amount;
        this.width += 2 * amount;
        this.height += 2 * amount;
    },

    rotate90: function () {
        var t = (this.width - this.height) / 2;
        this.x += t;
        this.y -= t;
        var tmp = this.width;
        this.width = this.height;
        this.height = tmp;
    },


    equals: function (rect) {
        return Rect.superclass.equals.call(this, rect) &&
            rect instanceof Rect &&
            rect.width == this.width &&
            rect.height == this.height;
    },

    clone: function () {
        return this.fromRect(this);
    }
});

module.exports = Rect;


},{"./class":19,"./point":24}],13:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Klass = require('./class');
var utils = require('./utils');
var constants = require('./constants');
//var Point = require('./Point');
var Rectangle = require('./Rectangle');
var Canvas2D = require('./Canvas2D');

var each = utils.each;

var Shape = Klass.create({
    constructor: function Shape() {
        var shape = this;

        shape.strokewidth = 1;
        shape.rotation = 0;
        shape.opacity = 100;
        shape.flipH = false; // 水平翻转
        shape.flipV = false; // 垂直翻转
    },

    scale: 1,
    antiAlias: true, // 抗锯齿，平滑处理
    bounds: null,
    points: null,
    node: null,     // 形状的根节点
    state: null,    // cellState
    style: null,    // cellStyle
    boundingBox: null,
    stencil: null,
    svgStrokeTolerance: 8,
    pointerEvents: true,
    svgPointerEvents: 'all',
    shapePointerEvents: false,
    stencilPointerEvents: false,
    outline: false,
    visible: true,

    init: function (container) {

        var shape = this;

        if (shape.node || !container) {
            return;
        }

        var node = shape.create(container);

        if (node) {
            shape.node = node;
            container.appendChild(node);
        }

        return shape;
    },

    create: function (container) {

        return container && container.ownerSVGElement ?
            document.createElementNS(constants.NS_SVG, 'g') :
            null;
    },

    clear: function () {

        var shape = this;
        var node = shape.node;

        if (node && node.ownerDocument) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return shape;
    },

    getScreenOffset: function () {

    },

    reconfigure: function () {
        return this.redraw();
    },

    redraw: function () {

        var shape = this;
        var node = shape.node;

        shape.updateBoundsFromPoints();

        if (shape.visible && shape.checkBounds()) {
            node.style.visibility = 'visible';
            shape.clear()
                .redrawShape()
                .updateBoundingBox();
        } else {
            node.style.visibility = 'hidden';
            shape.boundingBox = null;
        }

        return shape;
    },

    redrawShape: function () {

        var shape = this;
        var canvas = shape.createCanvas();

        if (canvas !== null) {
            canvas.pointerEvents = shape.pointerEvents;

            shape.paint(canvas)
                .destroyCanvas(canvas);
        }

        return shape;
    },

    paint: function (/*canvas*/) {
        var shape = this;
        return shape;
    },

    updateBoundsFromPoints: function () {

        var shape = this;
        var bounds = null;

        each(shape.points || [], function (point) {

            if (!point) {
                return;
            }

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (bounds) {
                bounds.add(rect);
            } else {
                bounds = rect;
            }
        });

        shape.bounds = bounds;

        return shape;
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

    createBoundingBox: function () {},

    updateBoundingBox: function () {},

    augmentBoundingBox: function () {},

    createCanvas: function () {

        var shape = this;
        var node = shape.node;
        var canvas = new Canvas2D(node, false);

        canvas.strokeTolerance = shape.pointerEvents ? shape.svgStrokeTolerance : 0;
        canvas.pointerEventsValue = shape.svgPointerEvents;
        canvas.blockImagePointerEvents = false;//mxClient.IS_FF;
        canvas.antiAlias = shape.antiAlias;

        var off = this.getSvgScreenOffset();

        if (off === 0) {
            node.removeAttribute('transform');
        } else {
            node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
        }

        if (shape.outline) {
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

    configureCanvas: function () {},

    destroyCanvas: function () {

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
        return utils.isNullOrUndefined(rotation) ? 0 : rotation;
    },

    getTextRotation: function () {
        var shape = this;
        var rot = shape.getRotation();

        return rot;
    },

    getShapeRotation: function () {
        var shape = this;
        var rot = shape.getRotation();

        return rot;
    },

    destroy: function () {
    }
});

module.exports = Shape;

},{"./Canvas2D":2,"./Rectangle":12,"./class":19,"./constants":20,"./utils":25}],14:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: false */
/* global document */

'use strict';

var Class = require('./class');
var constants = require('./constants');
var Events = require('./events');
var Point = require('./Point');
var Rectangle = require('./Rectangle');
var Dictionary = require('./Dictionary');
var utils = require('./utils');

var each = utils.each;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    Implements: Events,
    constructor: function View(graph) {

        var view = this;

        view.graph = graph;
        view.translate = new Point();
        view.graphBounds = new Rectangle();
        view.states = new Dictionary();
    },

    EMPTY_POINT: new Point(),
    doneResource: '',
    updatingDocumentResource: '',
    allowEval: true,
    captureDocumentGesture: true,
    optimizeVmlReflows: true,
    rendering: true,
    graph: null,
    currentRoot: null,
    graphBounds: null,
    scale: 1,
    translate: null,
    updateStyle: null,
    lastNode: null,
    lastHtmlNode: null,
    lastForegroundNode: null,
    lastForegroundHtmlNode: null,

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

        var view = this;
        var result = null;

        if (cells && cells.length) {

            var model = view.graph.getModel();

            each(cells, function (cell) {

                if (model.isVertex(cell) || model.isEdge(cell)) {

                    var state = view.getState(cell);

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
        }

        return result;
    },

    setCurrentRoot: function (root) {
        if (this.currentRoot !== root) {
            var change = new mxCurrentRootChange(this, root);
            change.execute();
            var edit = new mxUndoableEdit(this, false);
            edit.add(change);
            this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
            this.graph.sizeDidChange();
        }

        return root;
    },

    scaleAndTranslate: function (scale, dx, dy) {
        var view = this;
        var ts = view.translate;
        var previousScale = view.scale;
        var previousTranslate = new Point(ts.x, ts.y);

        if (previousScale !== scale || ts.x !== dx || ts.y !== dy) {

            view.scale = scale;

            view.translate.x = dx;
            view.translate.y = dy;

            if (view.isEventsEnabled()) {
                view.revalidate();
                view.graph.sizeDidChange();
            }
        }

        view.fireEvent(new EventObject(mxEvent.SCALE_AND_TRANSLATE,
            'scale', scale, 'previousScale', previousScale,
            'translate', view.translate, 'previousTranslate', previousTranslate));
    },

    getScale: function () {
        return this.scale;
    },

    setScale: function (value) {
        var view = this;
        var previousScale = view.scale;

        if (previousScale !== value) {
            view.scale = value;

            if (view.isEventsEnabled()) {
                view.revalidate();
                view.graph.sizeDidChange();
            }
        }

        view.fireEvent(new EventObject(mxEvent.SCALE,
            'scale', value, 'previousScale', previousScale));
    },

    getTranslate: function () {
        return this.translate;
    },

    setTranslate: function (dx, dy) {
        var view = this;
        var translate = view.translate;
        var previousTranslate = new Point(translate.x, translate.y);

        if (translate.x !== dx || translate.y !== dy) {
            translate.x = dx;
            translate.y = dy;

            if (view.isEventsEnabled()) {
                view.revalidate();
                view.graph.sizeDidChange();
            }
        }

        view.fireEvent(new EventObject(mxEvent.TRANSLATE,
            'translate', translate, 'previousTranslate', previousTranslate));
    },

    refresh: function () {
        if (this.currentRoot != null) {
            this.clear();
        }

        this.revalidate();
    },

    revalidate: function () {
        this.invalidate();
        this.validate();
    },

    clear: function (cell, force, recurse) {
        var view = this;
        var model = view.graph.getModel();

        cell = cell || model.getRoot();
        force = !isNullOrUndefined(force) ? force : false;
        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        view.removeState(cell);

        if (recurse && (force || cell !== this.currentRoot)) {

            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                view.clear(model.getChildAt(cell, i), force);
            }
        } else {
            view.invalidate(cell);
        }
    },

    invalidate: function (cell, recurse, includeEdges) {
        var view = this;
        var model = view.graph.getModel();

        cell = cell || model.getRoot();
        recurse = !isNullOrUndefined(recurse) ? recurse : true;
        includeEdges = !isNullOrUndefined(includeEdges) ? includeEdges : true;

        var state = view.getState(cell);

        if (state) {
            state.invalid = true;
        }

        // Avoids infinite loops for invalid graphs
        if (!cell.invalidating) {
            cell.invalidating = true;

            // Recursively invalidates all descendants
            if (recurse) {
                var childCount = model.getChildCount(cell);

                for (var i = 0; i < childCount; i++) {
                    var child = model.getChildAt(cell, i);
                    view.invalidate(child, recurse, includeEdges);
                }
            }

            // Propagates invalidation to all connected edges
            if (includeEdges) {
                var edgeCount = model.getEdgeCount(cell);

                for (var i = 0; i < edgeCount; i++) {
                    view.invalidate(model.getEdgeAt(cell, i), recurse, includeEdges);
                }
            }

            delete cell.invalidating;
        }
    },

    validate: function (cell) {
        this.resetValidationState();

        var graphBounds = this.getBoundingBox(this.validateCellState(
            this.validateCell(cell || ((this.currentRoot != null) ?
                    this.currentRoot : this.graph.getModel().getRoot()))));

        this.setGraphBounds((graphBounds != null) ? graphBounds : this.getEmptyBounds());

        this.validateBackground();

        this.resetValidationState();
    },

    getEmptyBounds: function () {
        var view = this;
        var translate = view.translate;
        var scale = view.scale;

        return new Rectangle(translate.x * scale, translate.y * scale);
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

    createBackgroundPageShape: function (bounds) {

    },

    validateBackground: function () {
        this.validateBackgroundImage();
        this.validateBackgroundPage();
    },

    validateBackgroundImage: function () {},

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

    validateCell: function (cell, visible) {

        var view = this;

        if (!cell) {
            return cell;
        }

        visible = !isNullOrUndefined(visible) ? visible : true;
        visible = visible && view.graph.isCellVisible(cell);

        var state = view.getState(cell, visible);

        if (state && !visible) {
            view.removeState(cell);
        } else {

            var model = view.graph.getModel();
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

        if (isNullOrUndefined(cell)) {
            return state;
        }

        state = view.getState(cell);

        if (isNullOrUndefined(state)) {
            return state;
        }

        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        var model = view.graph.getModel();

        if (state.invalid) {
            state.invalid = false;

            if (cell != this.currentRoot) {
                this.validateCellState(model.getParent(cell), false);
            }

            state.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(cell, true), false), true);
            state.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(cell, false), false), false);

            this.updateCellState(state);

            // Repaint happens immediately after the cell is validated
            if (cell != this.currentRoot) {
                this.graph.cellRenderer.redraw(state, false, this.isRendering());
            }
        }

        if (recurse) {
            state.updateCachedBounds();

            // Updates order in DOM if recursively traversing
            if (state.shape != null) {
                this.stateValidated(state);
            }

            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                this.validateCellState(model.getChildAt(cell, i));
            }
        }

        return state;
    },

    updateCellState: function (state) {

    },

    isCellCollapsed: function (cell) {
        return this.graph.isCellCollapsed(cell);
    },

    updateVertexState: function (state, geo) {},

    updateEdgeState: function (state, geo) {},

    updateVertexLabelOffset: function (state) {},

    resetValidationState: function () {
        this.lastNode = null;
        this.lastHtmlNode = null;
        this.lastForegroundNode = null;
        this.lastForegroundHtmlNode = null;
    },

    stateValidated: function (state) {},

    updateFixedTerminalPoints: function (edge, source, target) {},

    updateFixedTerminalPoint: function (edge, terminal, source, constraint) {},
    updatePoints: function (edge, points, source, target) {},
    transformControlPoint: function (state, pt) {},
    getEdgeStyle: function (edge, points, source, target) {},
    updateFloatingTerminalPoints: function (state, source, target) {},
    updateFloatingTerminalPoint: function (edge, start, end, source) {},
    getTerminalPort: function (state, terminal, source) {},
    getPerimeterPoint: function (terminal, next, orthogonal, border) {},
    getRoutingCenterX: function (state) {},
    getRoutingCenterY: function (state) {},
    getPerimeterBounds: function (terminal, border) {},
    getPerimeterFunction: function (state) {},
    getNextPoint: function (edge, opposite, source) {},
    getVisibleTerminal: function (edge, source) {},
    updateEdgeBounds: function (state) {},
    getPoint: function (state, geometry) {},
    getRelativePoint: function (edgeState, x, y) {},
    updateEdgeLabelOffset: function (state) {},

    getState: function (cell, create) {

        var view = this;
        var state = null;

        if (!cell) {
            return state;
        }

        create = create || false;

        state = view.states.get(cell);

        if (create && (state === null || view.updateStyle) && view.graph.isCellVisible(cell)) {
            if (state === null) {
                state = view.createState(cell);
                view.states.put(cell, state);
            } else {
                state.style = view.graph.getCellStyle(cell);
            }
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
    createState: function (cell) {
        var state = new CellState(this, cell, this.graph.getCellStyle(cell));
        var model = this.graph.getModel();

        if (state.view.graph.container != null && state.cell != state.view.currentRoot &&
            (model.isVertex(state.cell) || model.isEdge(state.cell))) {
            this.graph.cellRenderer.createShape(state);
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
    isContainerEvent: function (evt) {},

    isScrollEvent: function (evt) {},

    installListeners: function () {
        return this;
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


},{"./Dictionary":6,"./Point":11,"./Rectangle":12,"./class":19,"./constants":20,"./events":21,"./utils":25}],15:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var utils = require('./utils');

var isFunction = utils.isFunction;
var each = utils.each;
var invoke = utils.invoke;
var toArray = utils.toArray;
var eventSplitter = /\s+/;


function weave(when, methodName, callback, context) {
    var that = this;
    var names = methodName.split(eventSplitter);

    each(names, function (name) {
        var method = that[name];

        if (!method || !isFunction(method)) {
            throw new Error('Invalid method name: ' + name);
        }

        if (!method.__isAspected) {
            wrap.call(that, name);
        }

        that.on(when + ':' + name, callback, context);
    });

    return that;
}

function wrap(methodName) {
    var that = this;
    var old = that[methodName];

    that[methodName] = function () {
        var that = this;
        var args = toArray(arguments);
        var beforeArgs = ['before:' + methodName].concat(args);

        // prevent if trigger return false
        if (invoke(that.trigger, beforeArgs, that) === false) {
            return;
        }

        // call the origin method.
        var ret = old.apply(this, arguments);
        var afterArgs = ['after:' + methodName, ret].concat(args);
        invoke(that.trigger, afterArgs, that);

        return ret;
    };

    that[methodName].__isAspected = true;
}

module.exports = {
    before: function (methodName, callback, context) {
        return weave.call(this, 'before', methodName, callback, context);
    },
    after: function (methodName, callback, context) {
        return weave.call(this, 'after', methodName, callback, context);
    },
    around: function (methodName, callback, context) {
        weave.call(this, 'before', methodName, callback, context);
        weave.call(this, 'after', methodName, callback, context);
        return this;
    }
};


},{"./utils":25}],16:[function(require,module,exports){
'use strict';

var klass = require('../class');

module.exports = klass.create({

    constructor: function Change(model) {
        this.model = model;
    },

    digest: function () { }
});


},{"../class":19}],17:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Change = require('./Change');
var utils = require('../utils');

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

        isConnect = utils.isNullOrUndefined(isConnect) ? true : isConnect;

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

},{"../utils":25,"./Change":16}],18:[function(require,module,exports){
'use strict';

var Change = require('./Change');
var utils = require('../utils');

module.exports = Change.extend({

    constructor: function RootChange(model, root) {

        var change = this;

        RootChange.superclass.constructor.call(change, model);

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


},{"../utils":25,"./Change":16}],19:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
// ref: https://github.com/aralejs/class
/*jshint -W030 */

var utils = require('./utils');

var isArray = utils.isArray;
var isFunction = utils.isFunction;
var hasKey = utils.hasKey;
var each = utils.each;

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

    // By: bubkoo
    var SubClass = properties.constructor;
    // unspecified constructor
    if (SubClass === Object.prototype.constructor) {
        SubClass = function SubClass() {};
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

        if (isArray(items)) {
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


},{"./utils":25}],20:[function(require,module,exports){

var Rectangle = require('./Rectangle');

module.exports = {
    NONE: 'none',
    NS_SVG: 'http://www.w3.org/2000/svg',

    SHADOW_COLOR: 'gray',
    SHADOW_OFFSET_X: 2,
    SHADOW_OFFSET_Y: 3,
    SHADOW_OPACITY: 1,

    DEFAULT_FONT_SIZE: 11,
    DEFAULT_FONT_FAMILY: 'Arial,Helvetica',

    NODETYPE_ELEMENT: 1,

    PAGE_FORMAT_A4_PORTRAIT: new Rectangle(0, 0, 826, 1169),
    PAGE_FORMAT_A4_LANDSCAPE: new Rectangle(0, 0, 1169, 826),
    PAGE_FORMAT_LETTER_PORTRAIT: new Rectangle(0, 0, 850, 1100),
    PAGE_FORMAT_LETTER_LANDSCAPE: new Rectangle(0, 0, 1100, 850),

    STYLE_FILLCOLOR: 'fillColor',

};


},{"./Rectangle":12}],21:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */

var utils = require('./utils');

var isFunction = utils.isFunction;
var invoke = utils.invoke;
var keys = utils.keys;
var each = utils.each;
var eventSplitter = /\s+/;

function Events() {}

Events.prototype.on = function (events, callback, context) {

    var that = this;

    if (!callback) {
        return that;
    }

    var cache = this.__events || (this.__events = {});

    events = events.split(eventSplitter);

    each(events, function (event) {
        var list = cache[event] || (cache[event] = []);
        list.push(callback, context);
    });

    return that;
};

Events.prototype.once = function (events, callback, context) {

    var that = this;
    var cb = function () {
        that.off(events, cb);
        callback.apply(context || that, arguments);
    };

    return that.on(events, cb, context);
};

Events.prototype.off = function (events, callback, context) {

    var that = this;
    var cache = that.__events;

    // No events.
    if (!cache) {
        return that;
    }

    // removing *all* events.
    if (!(events || callback || context)) {
        delete that.__events;
        return that;
    }

    events = events ? events.split(eventSplitter) : keys(cache);

    each(events, function (event) {

        var list = cache[event];

        if (!list) {
            return;
        }

        // remove all event.
        if (!(callback || context)) {
            delete cache[event];
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
};

Events.prototype.trigger = function (events) {

    var that = this;
    var cache = that.__events;

    // No events.
    if (!cache) {
        return that;
    }

    events = events.split(eventSplitter);

    var returned = true;
    var args;

    each(arguments, function (arg, index) {
        if (index > 0) {
            args[index - 1] = arg;
        }
    });

    each(events, function (event) {
        var all = cache['*'];
        var list = cache[event];

        // Copy callback lists to prevent modification.
        all = all && all.slice();
        list = list && list.slice();

        // Execute event callbacks except one named '*'
        if (event !== '*') {
            returned = triggerEvents(list, args, this) && returned;
        }

        // Execute '*' callbacks.
        returned = triggerEvents(all, [event].concat(args), this) && returned;
    });

    return returned;
};

Events.prototype.emit = Events.prototype.trigger;

Events.mixTo = function (receiver) {
    var proto = Events.prototype;

    if (isFunction(receiver)) {
        each(proto, function (value, key) {
            receiver.prototype[key] = value;
        });
    } else {
        var event = new Events();
        each(proto, function (value, key) {
            receiver[key] = function () {
                invoke(value, arguments, event);
            };
        });
    }
};

function triggerEvents(list, args, context) {
    var ret = true;

    if (list) {
        for (var i = 0, l = list.length; i < l; i += 2) {
            ret = invoke(list[i], args, list[i + 1] || context) !== false && ret;
        }
    }
    // trigger will return false if one of the callbacks return false
    return ret;
}

module.exports = Events;


},{"./utils":25}],22:[function(require,module,exports){

module.exports = {
    Canvas2D: require('./Canvas2D'),
    Cell: require('./EventObject'),
    CellRenderer: require('./CellRenderer'),
    CellState: require('./CellState'),
    Dictionary: require('./Dictionary'),
    EventObject: require('./EventObject'),
    Geometry: require('./Geometry'),
    Graph: require('./Graph'),
    Model: require('./Model'),
    Point: require('./Point'),
    Rectangle: require('./Rectangle'),
    Shape: require('./Shape'),
    View: require('./View'),
    aspect: require('./aspect'),
    class: require('./class'),
    constants: require('./constants'),
    events: require('./events'),
    objectIdentity: require('./objectIdentity'),
    utils: require('./utils'),
    // changes
    Change: require('./changes/Change'),
    ChildChange: require('./changes/ChildChange'),
    RootChange: require('./changes/RootChange'),
};


},{"./Canvas2D":2,"./CellRenderer":4,"./CellState":5,"./Dictionary":6,"./EventObject":7,"./Geometry":8,"./Graph":9,"./Model":10,"./Point":11,"./Rectangle":12,"./Shape":13,"./View":14,"./aspect":15,"./changes/Change":16,"./changes/ChildChange":17,"./changes/RootChange":18,"./class":19,"./constants":20,"./events":21,"./objectIdentity":23,"./utils":25}],23:[function(require,module,exports){

/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global window */

var utils = require('./utils');

var isObject = utils.isObject;
var isNullOrUndefined = utils.isNullOrUndefined;
var getFunctionName = utils.getFunctionName;

var FIELD_NAME = 'zObjectId';
var counter = 0;


exports.get = function (obj) {
    if (isObject(obj) && isNullOrUndefined(obj[FIELD_NAME])) {
        var ctor = getFunctionName(obj.constructor);
        obj[FIELD_NAME] = ctor + '#' + counter++;
    }

    return obj[FIELD_NAME];
};

exports.clear = function (obj) {
    if (isObject(obj)) {
        delete obj[FIELD_NAME];
    }
};

},{"./utils":25}],24:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./class":19,"dup":11}],25:[function(require,module,exports){
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global window */

var utils = {};

var arrProto = Array.prototype;
var objProto = Object.prototype;
var slice = arrProto.slice;
var toString = objProto.toString;
var hasOwn = objProto.hasOwnProperty;


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
    return isNull(obj) || isUndefined(obj);
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
        typeof length === 'number' && length > 0 && ( length - 1 ) in obj;
}

utils.isType = isType;
utils.isNull = isNull;
utils.isArray = isArray;
utils.isWindow = isWindow;
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

// Number
// ------
utils.toFixed = function (value, precision) {
    var power = Math.pow(10, precision);
    return (Math.round(value * power) / power).toFixed(precision);
};


// Object
// ------

function hasKey(obj, key) {
    return obj !== null && hasOwn.call(obj, key);
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
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

        // FIXME: ie < 9
    };
utils.hasKey = hasKey;
utils.clone = clone;

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

utils.each = function (list, iteratee, context) {
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

module.exports = utils;


},{}]},{},[1]);
