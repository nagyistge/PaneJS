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

            state.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(cell, true), false), true);
            state.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(cell, false), false), false);

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

    updateCellState: function (state) {
        state.absoluteOffset.x = 0;
        state.absoluteOffset.y = 0;
        state.origin.x = 0;
        state.origin.y = 0;
        state.length = 0;

        if (state.cell != this.currentRoot) {
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
            var alpha = mxUtils.toRadians(pState.style[constants.STYLE_ROTATION] || '0');

            if (alpha != 0) {
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);

                var ct = new Point(state.getCenterX(), state.getCenterY());
                var cx = new Point(pState.getCenterX(), pState.getCenterY());
                var pt = utils.getRotatedPoint(ct, cos, sin, cx);
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

    stateValidated: function (state) {},

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
                        var pt = mxUtils.clone(points[i]);
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
                tmp = mxUtils.eval(edgeStyle);
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
            next = utils.getRotatedPoint(next, cos, sin, center);
        }

        var border = parseFloat(linkState.style[constants.STYLE_PERIMETER_SPACING] || 0);
        border += parseFloat(linkState.style[(isSource) ?
                constants.STYLE_SOURCE_PERIMETER_SPACING :
                constants.STYLE_TARGET_PERIMETER_SPACING] || 0);
        var pt = this.getPerimeterPoint(start, next, alpha == 0 && orth, border);

        if (alpha != 0) {
            var cos = Math.cos(alpha);
            var sin = Math.sin(alpha);
            pt = utils.getRotatedPoint(pt, cos, sin, center);
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

    getRoutingCenterX: function (state) {},

    getRoutingCenterY: function (state) {},

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
                tmp = mxUtils.eval(perimeter);
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
    getPoint: function (state, geometry) {},
    getRelativePoint: function (edgeState, x, y) {},
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

