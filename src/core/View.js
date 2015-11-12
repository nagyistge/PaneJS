import {
    each,
    isUndefined,
    isNullOrUndefined,
    getCurrentStyle,
    createSvgElement,
    rotatePoint
} from '../common/utils';

import detector    from '../common/detector';
import Base        from '../lib/Base';
import Point       from '../lib/Point';
import Rectangle   from '../lib/Rectangle';
import Dictionary  from '../lib/Dictionary';
import State       from '../cell/State';
import Renderer    from '../cell/Renderer';
// events
import aspect      from '../events/aspect';
import EventSource from '../events/EventSource';

export default Base.extend({

    Extends: EventSource,
    Implements: aspect,


    currentRoot: null,
    graphBounds: null,
    rendering: true,    // 是否需要创建、更新或销毁图形
    updateStyle: false, // 重绘过程中是否需要更新样式，默认只会在创建 state 和 state.style 改变时才更新样式
    captureDocumentGesture: true,

    constructor: function View(graph) {

        var that = this;
        that.graph = graph;
        that.states = new Dictionary();
        that.renderer = new Renderer();
        that.graphBounds = new Rectangle();
        that.scale = 1;
        that.translate = new Point();

    },

    getBounds(cells) {

        var that = this;
        var result = null;

        if (cells && cells.length) {
            each(cells, function (cell) {
                if (cell.isNode || cell.isLink) {
                    var state = that.getState(cell);
                    if (state) {
                        if (result) {
                            result.add(state);
                        } else {
                            result = new Rectangle(state.x, state.y, state.width, state.height);
                        }
                    }
                }
            });
        }

        return result;
    },

    setCurrentRoot: function () {

    },

    scaleAndTranslateTo: function (scale, dx, dy) {

        var that = this;
        var translate = that.translate;
        var previousScale = that.scale;
        var previousTranslate = new Point(translate.x, translate.y);

        if (previousScale !== scale || translate.x !== dx || translate.y !== dy) {
            that.scale = scale;

            translate.x = dx;
            translate.y = dy;

            that.revalidate();
            that.graph.sizeDidChange();
        }

        that.emit('scaleAndTranslate', {
            scale: scale,
            translate: translate,
            previousScale: previousScale,
            previousTranslate: previousTranslate
        });

        return that;
    },

    scaleTo(value) {

        var that = this;
        var previous = that.scale;

        if (previous !== value) {
            that.scale = value;
            that.revalidate();
            that.graph.sizeDidChange();
        }

        that.emit('scale', {
            scale: value,
            previous: previous
        });

        return that;
    },

    translateTo(dx, dy) {

        var that = this;
        var translate = that.translate;
        var previous = new Point(translate.x, translate.y);

        if (translate.x !== dx || translate.y !== dy) {
            translate.x = dx;
            translate.y = dy;
            that.revalidate();
            that.graph.sizeDidChange();
        }

        that.emit('translate', {
            translate: translate,
            previous: previous
        });

        return that;
    },

    // clear the view if `currentRoot` is not null and revalidate.
    refresh() {
        var that = this;
        that.currentRoot && that.clear();
        return that.revalidate();
    },

    revalidate() {
        return this.invalidate().validate();
    },

    clear(cell, force = false, recurse = true) {

        var that = this;
        var model = that.graph.model;

        cell = cell || model.getRoot();

        that.removeState(cell);

        if (recurse && (force || cell !== that.currentRoot)) {
            cell.eachChild(function (child) {
                that.clear(child, force, recurse);
            });
        } else {
            that.invalidate(cell, true, true);
        }

        return that;
    },

    invalidate(cell, recurse = true, includeLink = true) {

        var that = this;
        var model = that.graph.model;

        cell = cell || model.getRoot();

        var state = that.getState(cell);

        if (state) {
            state.invalid = true;
        }

        if (!cell.invalidating) {
            cell.invalidating = true;

            if (recurse) {
                cell.eachChild(function (child) {
                    that.invalidate(child, recurse, includeLink);
                });
            }

            if (includeLink) {
                cell.eachLink(function (link) {
                    that.invalidate(link, recurse, includeLink);
                });
            }

            cell.invalidating = false;
        }

        return that;
    },

    validate(cell) {

        var that = this;

        cell = cell || that.currentRoot || that.graph.model.getRoot();

        that.resetValidationState()
            .validateCell(cell)
            .validateCellState(cell);

        that.graphBounds = that.getBoundingBox(cell) || that.getEmptyBounds();

        that.validateBackground()
            .resetValidationState();

        return that;
    },


    // Bounding
    // --------

    getEmptyBounds() {

        var that = this;
        var scale = that.scale;
        var translate = that.translate;
        return new Rectangle(translate.x * scale, translate.y * scale);
    },

    getBoundingBox(cell, recurse = true) {

        var that = this;
        var state = that.getState(cell);
        var boundingBox = null;

        if (state) {

            var shapeBoundingBox = state.shape && state.shape.boundingBox;
            if (shapeBoundingBox) {
                boundingBox = shapeBoundingBox.clone();
            }

            var textBoundingBox = state.label && state.label.boundingBox;
            if (textBoundingBox) {
                if (boundingBox) {
                    boundingBox.add(textBoundingBox);
                } else {
                    boundingBox = textBoundingBox.clone();
                }
            }

            if (recurse) {
                cell.eachChild(function (child) {
                    var childBoundingBox = that.getBoundingBox(child, recurse);
                    if (childBoundingBox) {
                        if (boundingBox) {
                            boundingBox.add(childBoundingBox);
                        } else {
                            boundingBox = childBoundingBox;
                        }
                    }
                });
            }
        }

        return boundingBox;
    },


    // BackgroundPage
    // ---------------

    createBackgroundPageShape: function (bounds) {
        return new RectangleShape(bounds, 'white', 'black');
    },

    validateBackground: function () {
        return this.validateBackgroundImage().validateBackgroundPage();
    },

    validateBackgroundImage: function () {

        var that = this;
        var backgroundImage = that.backgroundImage;
        var bg = that.graph.getBackgroundImage();

        if (bg) {

            if (!backgroundImage || backgroundImage.image !== bg.src) {

                if (backgroundImage) {
                    backgroundImage.destroy();
                }

                var bounds = new Rectangle(0, 0, 1, 1);

                backgroundImage = that.backgroundImage = new ImageShape(bounds, bg.src);
                backgroundImage.init(that.backgroundPane);
                backgroundImage.redraw();
            }

            that.redrawBackgroundImage(backgroundImage, bg);
        } else if (backgroundImage) {
            backgroundImage.destroy();
            that.backgroundImage = null;
        }

        return that;
    },

    validateBackgroundPage: function () {

        var that = this;
        var backgroundPageShape = that.backgroundPageShape;

        if (that.graph.pageVisible) {
            var bounds = that.getBackgroundPageBounds();

            if (!backgroundPageShape) {
                backgroundPageShape = that.backgroundPageShape = that.createBackgroundPageShape(bounds);
                backgroundPageShape.scale = this.scale;
                backgroundPageShape.isShadow = true;
                backgroundPageShape.init(that.backgroundPane);
                backgroundPageShape.redraw();

                // Adds listener for double click handling on background
                if (this.graph.nativeDblClickEnabled) {
                    mxEvent.addListener(backgroundPageShape.node, 'dblclick', mxUtils.bind(this, function (evt) {
                        this.graph.dblClick(evt);
                    }));
                }

                // Adds basic listeners for graph event dispatching outside of the
                // container and finishing the handling of a single gesture
                mxEvent.addGestureListeners(backgroundPageShape.node,
                    mxUtils.bind(this, function (evt) {
                        this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
                    }),
                    mxUtils.bind(this, function (evt) {
                        // Hides the tooltip if mouse is outside container
                        if (this.graph.tooltipHandler != null && this.graph.tooltipHandler.isHideOnHover()) {
                            this.graph.tooltipHandler.hide();
                        }

                        if (this.graph.isMouseDown && !mxEvent.isConsumed(evt)) {
                            this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
                        }
                    }),
                    mxUtils.bind(this, function (evt) {
                        this.graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
                    })
                );
            }
            else {
                this.backgroundPageShape.scale = this.scale;
                this.backgroundPageShape.bounds = bounds;
                this.backgroundPageShape.redraw();
            }
        } else if (backgroundPageShape) {
            backgroundPageShape.destroy();
            that.backgroundPageShape = null;
        }

        return that;
    },

    getBackgroundPageBounds: function () {

        var that = this;
        var scale = that.scale;
        var translate = that.translate;
        var fmt = that.graph.pageFormat;
        var ps = scale * that.graph.pageScale;

        return new Rectangle(scale * translate.x, scale * translate.y, fmt.width * ps, fmt.height * ps);
    },

    redrawBackgroundImage: function (backgroundImage, bg) {

        var that = this;
        var scale = that.scale;
        var translate = that.translate;

        backgroundImage.scale = scale;
        backgroundImage.bounds.x = scale * translate.x;
        backgroundImage.bounds.y = scale * translate.y;
        backgroundImage.bounds.width = scale * bg.width;
        backgroundImage.bounds.height = scale * bg.height;
        backgroundImage.redraw();

        return that;
    },


    // Validate
    // ---------

    // create or remove cell state
    validateCell(cell, visible = true) {
        var that = this;

        if (!cell) {
            return cell;
        }

        visible = visible && cell.visible;

        var state = that.getState(cell, visible);

        if (state && !visible) {
            that.removeState(cell);
        } else {
            cell.eachChild(function (child) {
                var childVisible = visible && (!cell.collapsed || cell === that.currentRoot);
                that.validateCell(child, childVisible);
            });
        }

        return that;
    },

    validateCellState(cell, recurse = true) {

        var that = this;
        var state = that.getState(cell);

        if (state) {
            if (state.invalid) {
                state.invalid = false;

                if (cell !== that.currentRoot) {
                    that.validateCellState(cell.parent, false);
                }

                if (cell.isLink) {
                    var sourceNode = that.getVisibleTerminal(cell, true);
                    var targetNode = that.getVisibleTerminal(cell, false);
                    var sourceState = that.validateCellState(sourceNode, false);
                    var targetState = that.validateCellState(targetNode, false);
                    state.setVisibleTerminalState(sourceState, true);
                    state.setVisibleTerminalState(targetState, false);
                }

                that.updateCellState(state);

                if (cell !== that.currentRoot) {
                    that.renderer.redraw(state, false, that.rendering);
                }
            }

            if (recurse) {
                // update `state.cellBounds` and `state.paintBounds`
                state.updateCachedBounds();

                // update order in DOM if recursively traversing
                if (state.shape) {
                    // TODO: stateValidated
                    //that.stateValidated(state);
                }

                cell.eachChild(function (child) {
                    that.validateCellState(child, true);
                });
            }
        }

        return state;
    },

    updateCellState: function (state) {

        var that = this;
        var cell = state.cell;
        var currentRoot = that.currentRoot;
        var stateOrigin = state.origin;
        var absoluteOffset = state.absoluteOffset;

        // 重置
        absoluteOffset.x = 0;
        absoluteOffset.y = 0;
        stateOrigin.x = 0;
        stateOrigin.y = 0;
        state.length = 0;

        if (cell !== currentRoot) {

            var graph = that.graph;
            var scale = that.scale;
            var translate = that.translate;
            var parent = cell.parent;
            var parentState = parent ? that.getState(parent) : null;

            // 父节点的 origin
            if (parentState && parent !== currentRoot) {
                stateOrigin.x += parentState.origin.x;
                stateOrigin.y += parentState.origin.y;
            }

            // 获取 cell 的 offset
            var cellOffset = graph.getChildOffsetForCell(cell);
            if (cellOffset) {
                stateOrigin.x += cellOffset.x;
                stateOrigin.y += cellOffset.y;
            }

            var geo = cell.geometry;
            if (geo) {
                if (!cell.isLink) {

                    var geoOffset = geo.offset || new Point();

                    // 相对定位
                    if (geo.relative && parentState) {
                        if (parent.isLink) {
                            var origin = that.getPoint(parentState, geo);

                            if (origin) {
                                stateOrigin.x += (origin.x / scale) - parentState.origin.x - translate.x;
                                stateOrigin.y += (origin.y / scale) - parentState.origin.y - translate.y;
                            }
                        } else {
                            // 相对定位时 geo.x 和 geo.y 是相对于父元素 w 和 h 的百分比
                            stateOrigin.x += geo.x * parentState.width / scale + geoOffset.x;
                            stateOrigin.y += geo.y * parentState.height / scale + geoOffset.y;
                        }
                    } else {
                        absoluteOffset.x = scale * geoOffset.x;
                        absoluteOffset.y = scale * geoOffset.y;
                        stateOrigin.x += geo.x;
                        stateOrigin.y += geo.y;
                    }
                }

                // 设置 scale 和 translate 之后的 x, y, w, h
                state.x = scale * (translate.x + stateOrigin.x);
                state.y = scale * (translate.y + stateOrigin.y);
                state.width = scale * geo.width;
                state.height = scale * geo.height;

                cell.isNode && that.updateNodeState(state);
                cell.isLink && that.updateLinkState(state);
            }
        }

        return that;
    },

    updateNodeState: function (state) {

        var that = this;
        var cell = state.cell;
        var geo = cell.geometry;
        var parent = cell.parent;
        var parentState = parent ? that.getState(parent) : null;

        if (geo.relative && parentState && !parent.isLink) {
            var deg = parentState.style.rotation || 0;

            // 绕父元素的中心旋转
            if (deg) {
                var origin = state.getCenter();
                var center = parentState.getCenter();
                var rotated = rotatePoint(origin, deg, center);
                state.x = rotated.x - state.width / 2;
                state.y = rotated.y - state.height / 2;
            }
        }

        return that.updateNodeLabelOffset(state);
    },

    updateLinkState: function (state) {

        var that = this;
        var cell = state.cell;
        var geo = cell.geometry;

        var sourceNode = cell.getTerminal(true);
        var targetNode = cell.getTerminal(false);
        var visibleSourceState = state.getVisibleTerminalState(true);
        var visibleTargetState = state.getVisibleTerminalState(false);
        var sourcePoint = geo.getTerminalPoint(true);
        var targetPoint = geo.getTerminalPoint(false);

        if ((sourceNode && !visibleSourceState) ||
            (!visibleSourceState && !sourcePoint) ||
            (targetNode && !visibleTargetState) ||
            (!visibleTargetState && !targetPoint)) {
            that.clear(cell, true, true);
        }
        else {
            // 获取绘制连点需要的起点/终点和关键点
            that.updateFixedTerminalPoints(state, visibleSourceState, visibleTargetState);
            that.updatePoints(state, geo.points, visibleSourceState, visibleTargetState);
            that.updateFloatingTerminalPoints(state, visibleSourceState, visibleTargetState);

            var absolutePoints = state.absolutePoints;
            // 检查是否能够绘制连线
            var canDrawLink = absolutePoints
                && absolutePoints.length >= 2
                && absolutePoints[0]
                && absolutePoints[absolutePoints.length - 1];

            if (cell !== that.currentRoot && !canDrawLink) {
                that.clear(state.cell, true, true);
            } else {
                // 根据关键点更新 bounds
                that.updateEdgeBounds(state);
                // 更新标签位置
                that.updateLinkLabelOffset(state);
            }
        }

        return that;
    },

    updateNodeLabelOffset: function (state) {

        var that = this;
        var scale = that.scale;
        var style = state.style.label;
        var stateWidth = state.width;
        var stateHeight = state.height;
        var labelOffset = state.absoluteOffset;
        var labelWidth = style.labelWidth || 0;
        var position = style.position || 'center';

        // label 在水平方向上的位置
        if (position === 'left') {          // 左外侧
            if (labelWidth) {
                labelWidth *= scale;
            } else {
                labelWidth = stateWidth;
            }
            labelOffset.x -= labelWidth;
        } else if (position === 'right') {  // 右外侧
            labelOffset.x += stateWidth;
        } else {
            // 水平居中时，还要根据 cell 的对齐方式来确定 label 的位置
            if (labelWidth) {
                var cellAlign = style.align || 'center';
                var dx = 0;

                if (cellAlign === 'center') {
                    dx = 0.5;
                } else if (cellAlign === 'right') {
                    dx = 1;
                }

                if (dx !== 0) {
                    labelOffset.x -= (labelWidth * scale - stateWidth) * dx;
                }
            }
        }

        // label 在垂直方向上的位置
        if (position === 'top') {
            labelOffset.y -= stateHeight;
        } else if (position === 'bottom') {
            labelOffset.y += stateHeight;
        }

        return that;
    },

    resetValidationState() {
        var that = this;
        that.lastNode = null;
        that.lastHtmlNode = null;
        that.lastForegroundNode = null;
        that.lastForegroundHtmlNode = null;
        return that;
    },

    stateValidated: function (state) {

        var that = this;
        var cell = state.cell;
        var graph = that.graph;

        var fg = (cell.isLink && graph.keepEdgesInForeground) || (cell.isNode && graph.keepEdgesInBackground);

        var htmlNode = fg ? that.lastForegroundHtmlNode || that.lastHtmlNode : that.lastHtmlNode;
        var node = fg ? that.lastForegroundNode || that.lastNode : that.lastNode;
        var result = graph.cellRenderer.insertStateAfter(state, node, htmlNode);

        if (fg) {
            that.lastForegroundHtmlNode = result[1];
            that.lastForegroundNode = result[0];
        } else {
            that.lastHtmlNode = result[1];
            that.lastNode = result[0];
        }

        return that;
    },

    updateFixedTerminalPoints: function (linkState, sourceState, targetState) {

        //var sourceConstraint = this.graph.getConnectionConstraint(linkState, sourceState, true);
        //var targetConstraint = this.graph.getConnectionConstraint(linkState, targetState, false);

        var sourceConstraint = null;
        var targetConstraint = null;

        this.updateFixedTerminalPoint(linkState, sourceState, true, sourceConstraint);
        this.updateFixedTerminalPoint(linkState, targetState, false, targetConstraint);
    },

    updateFixedTerminalPoint: function (linkState, terminalState, isSource, constraint) {
        var pt = null;

        if (constraint) {
            pt = this.graph.getConnectionPoint(terminalState, constraint);
        }

        if (pt && terminalState) {
            var s = this.scale;
            var tr = this.translate;
            var orig = linkState.origin;
            var geo = this.graph.getCellGeometry(linkState.cell);
            pt = geo.getTerminalPoint(isSource);

            if (pt) {
                pt = new mxPoint(s * (tr.x + pt.x + orig.x),
                    s * (tr.y + pt.y + orig.y));
            }
        }

        linkState.setAbsolutePoint(pt, isSource);
    },

    updatePoints: function (linkState, points, sourceState, targetState) {
        if (linkState) {
            var pts = [];
            pts.push(linkState.absolutePoints[0]);
            var edgeStyle = this.getEdgeStyle(linkState, points, sourceState, targetState);

            if (edgeStyle != null) {
                var src = this.getTerminalPort(linkState, sourceState, true);
                var trg = this.getTerminalPort(linkState, targetState, false);

                edgeStyle(linkState, src, trg, points, pts);
            } else if (points != null) {
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

    getEdgeStyle: function (edge, points, source, target) {},

    updateFloatingTerminalPoints: function (linkState, sourceState, targetState) {
        var pts = linkState.absolutePoints;
        var p0 = pts[0];
        var pe = pts[pts.length - 1];

        // 连线终点
        if (!pe && targetState) {
            this.updateFloatingTerminalPoint(linkState, targetState, sourceState, false);
        }

        // 连线起点
        if (!p0 && sourceState) {
            this.updateFloatingTerminalPoint(linkState, sourceState, targetState, true);
        }
    },

    updateFloatingTerminalPoint: function (linkState, startState, endState, isSource) {
        startState = this.getTerminalPort(linkState, startState, isSource);

        var nextPoint = this.getNextPoint(linkState, endState, isSource);
        var orth = this.graph.isOrthogonal(linkState);
        var alpha = startState.style.rotation || 0; // mxUtils.toRadians(Number(startState.style[mxConstants.STYLE_ROTATION] || '0'));
        var center = startState.getCenter();// new Point(startState.getCenterX(), startState.getCenterY());

        if (alpha) {
            var cos = Math.cos(-alpha);
            var sin = Math.sin(-alpha);
            nextPoint = mxUtils.getRotatedPoint(nextPoint, cos, sin, center);
        }

        var border = parseFloat(linkState.style.perimeterSpacing || 0);
        border += parseFloat(linkState.style[(isSource) ?
                'sourcePerimeterSpacing' :
                'targetPerimeterSpacing'] || 0);

        var pt = this.getPerimeterPoint(startState, nextPoint, alpha === 0 && orth, border);

        if (alpha) {
            var cos = Math.cos(alpha);
            var sin = Math.sin(alpha);
            pt = mxUtils.getRotatedPoint(pt, cos, sin, center);
        }

        linkState.setAbsolutePoint(pt, isSource);
    },

    getTerminalPort: function (linkState, terminal, isSource) {

        var key = isSource ? 'sourcePort' : 'targetPort';
        var id = linkState.style[key];

        if (id) {
            var tmp = this.getState(this.graph.getModel().getCell(id));

            // Only uses ports where a cell state exists
            if (tmp) {
                terminal = tmp;
            }
        }

        return terminal;
    },

    getPerimeterPoint: function (terminal, next, orthogonal, border) {
        var point = null;

        if (terminal) {
            var perimeter = this.getPerimeterFunction(terminal);

            if (perimeter && next) {
                var bounds = this.getPerimeterBounds(terminal, border);

                if (bounds.width > 0 || bounds.height > 0) {
                    point = perimeter(bounds, terminal, next, orthogonal);

                    if (point != null) {
                        point.x = Math.round(point.x);
                        point.y = Math.round(point.y);
                    }
                }
            }

            if (point === null) {
                point = this.getPoint(terminal);
            }
        }

        return point;
    },

    getRoutingCenterX: function (state) {},

    getRoutingCenterY: function (state) {},

    getPerimeterBounds: function (terminal, border) {
        border = (border != null) ? border : 0;

        if (terminal) {
            border += parseFloat(terminal.style.perimeterSpacing || 0);
        }

        return terminal.getPerimeterBounds(border * this.scale);
    },

    getPerimeterFunction: function (state) {
        var perimeter = state.style.perimeter;

        // Converts string values to objects
        if (typeof(perimeter) === "string") {
            var tmp = mxStyleRegistry.getValue(perimeter);

            if (tmp == null && this.isAllowEval()) {
                tmp = mxUtils.eval(perimeter);
            }

            perimeter = tmp;
        }

        if (typeof(perimeter) === "function") {
            return perimeter;
        }

        return null;
    },

    getNextPoint: function (linkState, opposite, isSource) {
        var pts = linkState.absolutePoints;
        var point = null;

        if (pts && pts.length >= 2) {
            var count = pts.length;
            point = pts[isSource ? Math.min(1, count - 1) : Math.max(0, count - 2)];
        }

        if (!point && opposite) {
            point = opposite.getCenter(); // new Point(opposite.getCenterX(), opposite.getCenterY());
        }

        return point;
    },

    getVisibleTerminal: function (link, isSource) {

        var that = this;
        var best = null;

        if (link) {
            var result = link.getTerminal(isSource);
            best = result;

            while (result && result !== this.currentRoot) {
                // 如果自己不可见或父节点处于折叠状态
                if (!best.visible || result.collapsed) {
                    best = result;
                }

                result = result.parent;
            }

            if (that.graph.model.isLayer(best)) {
                best = null;
            }
        }

        return best;
    },

    updateEdgeBounds: function (state) {

        var points = state.absolutePoints;
        var p0 = points[0];
        var pe = points[points.length - 1];

        var dx;
        var dy;

        if (p0.x !== pe.x || p0.y !== pe.y) {
            dx = pe.x - p0.x;
            dy = pe.y - p0.y;
            state.terminalDistance = Math.sqrt(dx * dx + dy * dy);
        } else {
            state.terminalDistance = 0;
        }

        var length = 0;
        var segments = [];
        var pt = p0;

        if (pt) {
            var minX = pt.x;
            var minY = pt.y;
            var maxX = minX;
            var maxY = minY;

            for (var i = 1; i < points.length; i++) {
                var tmp = points[i];

                if (tmp) {
                    dx = pt.x - tmp.x;
                    dy = pt.y - tmp.y;

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

    // 获取连线上的相对于 geometry 定位的点
    // TODO: 搞明白
    getPoint: function (state, geometry) {
        var x = state.getCenterX();
        var y = state.getCenterY();

        if (state.segments && (!geometry || geometry.relative)) {

            var gx = geometry ? geometry.x / 2 : 0;
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

        } else if (geometry) {

            var offset = geometry.offset;

            if (offset != null) {
                x += offset.x;
                y += offset.y;
            }
        }

        return new Point(x, y);
    },

    getRelativePoint: function (edgeState, x, y) {},

    updateLinkLabelOffset: function (state) {
        var points = state.absolutePoints;

        state.absoluteOffset = state.getCenter();
        //state.absoluteOffset.x = state.getCenterX();
        //state.absoluteOffset.y = state.getCenterY();

        if (points && points.length > 0 && state.segments) {
            var geometry = state.cell.geometry;// this.graph.getCellGeometry(state.cell);

            if (geometry.relative) {
                var offset = this.getPoint(state, geometry);

                if (offset) {
                    state.absoluteOffset = offset;
                }
            } else {
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


    // State
    // -----

    getState(cell, create) {
        var that = this;

        if (cell) {
            var states = that.states;
            var state = states.get(cell);

            // TODO: that.updateStyle
            if (create && (!state || that.updateStyle) && cell.visible) {

                if (!state) {
                    state = that.createState(cell);
                    states.put(cell, state);
                } else {
                    state.style = that.graph.getCellStyle(cell);
                }
            }

            return state;
        }
    },

    createState(cell) {

        var that = this;
        var graph = that.graph;
        var style = graph.getCellStyle(cell);

        // 使用 view 中的平移和缩放
        style.scale = that.scale;
        style.dx = that.translate.x;
        style.dy = that.translate.y;

        var state = new State(that, cell, style);

        // TODO: that.currentRoot
        if (graph.container && cell !== that.currentRoot && (cell.isNode || cell.isLink)) {
            that.renderer.createShape(state);
        }

        return state;
    },

    removeState(cell) {

        var that = this;

        if (cell) {
            var state = that.states.remove(cell);
            if (state) {
                that.graph.cellRenderer.destroy(state);
                state.destroy();
            }
        }

        return that;
    },


    // DOM event
    // ---------

    isContainerEvent: function (evt) {},

    isScrollEvent: function (evt) {},

    setupShape: function () { },

    // Life cycle
    // ----------

    init: function () {

        var that = this;
        var doc = window.document;
        var root = createSvgElement('svg');
        var canvas = createSvgElement('g');
        var backgroundPane = createSvgElement('g');
        var drawPane = createSvgElement('g');
        var overlayPane = createSvgElement('g');
        var decoratorPane = createSvgElement('g');
        var foreignPane = doc.createElement('div');


        canvas.appendChild(backgroundPane);
        canvas.appendChild(drawPane);
        canvas.appendChild(overlayPane);
        canvas.appendChild(decoratorPane);
        root.appendChild(canvas);

        that.canvas = canvas;
        that.backgroundPane = backgroundPane;
        that.drawPane = drawPane;
        that.overlayPane = overlayPane;
        that.decoratorPane = decoratorPane;
        that.foreignPane = foreignPane;

        var container = that.graph.container;

        if (container) {

            // update container style
            var style = getCurrentStyle(container);
            if (style.position === 'static') {
                container.style.position = 'relative';
            }

            // Disables built-in pan and zoom in IE10 and later
            if (detector.IS_POINTER) {
                container.style.msTouchAction = 'none';
            }

            root.style.cssText = 'width: 100%; height: 100%; display: block;';

            container.appendChild(root);
            container.appendChild(foreignPane);
        }

        that.setupShape();
    },

    destroy: function () {

        var that = this;
        var root = that.canvas ? that.canvas.ownerSVGElement : null;

        if (root == null) {
            root = this.canvas;
        }

        if (root && root.parentNode) {
            this.clear(this.currentRoot, true);
            mxEvent.removeGestureListeners(document, null, this.moveHandler, this.endHandler);
            mxEvent.release(this.graph.container);
            root.parentNode.removeChild(root);

            this.moveHandler = null;
            this.endHandler = null;
            this.canvas = null;
            this.backgroundPane = null;
            this.drawPane = null;
            this.overlayPane = null;
            this.decoratorPane = null;
            that.foreignPane = null;
        }
    }
});
