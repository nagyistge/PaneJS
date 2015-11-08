import {
    each,
    isUndefined,
    isNullOrUndefined,
    getCurrentStyle,
    createSvgElement,
    getValue,
    rotatePoint
} from '../common/utils';

import detector    from '../common/detector';
import Base        from '../lib/Base';
import Point       from '../lib/Point';
import Rectangle   from '../lib/Rectangle';
import Dictionary  from '../lib/Dictionary';
import styleNames  from '../enums/styleNames';
import alignments  from '../enums/alignments';
import State       from '../cell/State';
import Renderer    from '../cell/Renderer';

export default Base.extend({

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

    getBounds: function () {},

    setCurrentRoot: function () {},

    scaleAndTranslate: function () {},

    setScale: function () {

    },

    setTranslate: function () {},

    refresh: function () {},

    revalidate: function () {
        return this
            .invalidate(null, true, true)
            .validate(null);
    },

    clear: function (cell, force, recurse) {

        var that = this;
        var model = that.graph.model;

        cell = cell || model.getRoot();
        force = force ? force : false;
        //recurse = !isNullOrUndefined(recurse) ? recurse : true;

        that.removeState(cell);

        if (recurse && (force || cell !== that.currentRoot)) {
            cell.eachChild(function (child) {
                that.clear(child, false, true);
            });
        } else {
            that.invalidate(cell, true, true);
        }

        return that;
    },

    invalidate: function (cell, recurse, includeLink) {

        var that = this;
        var model = that.graph.model;

        cell = cell || model.getRoot();
        //recurse = !isNullOrUndefined(recurse) ? recurse : true;
        //includeLink = !isNullOrUndefined(includeLink) ? includeLink : true;

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

    validate: function (cell) {
        var that = this;

        cell = cell || that.currentRoot || that.graph.model.getRoot();

        that.resetValidationState();

        that.validateCell(cell, true);
        that.validateCellState(cell, true);

        that.graphBounds = that.getBoundingBox(cell) || that.getEmptyBounds();

        that.validateBackground();
        that.resetValidationState();
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
                        mxUtils.bind(this, function (evt) {
                            this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
                        }),
                        mxUtils.bind(this, function (evt) {
                            this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
                        }),
                        mxUtils.bind(this, function (evt) {
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

    getEmptyBounds: function () {
        var that = this;
        var translate = that.translate;
        var scale = that.scale;
        return new Rectangle(translate.x * scale, translate.y * scale);
    },

    getBoundingBox: function (cell, recurse) {

        var that = this;
        var state = that.getState(cell);
        var boundingBox = null;

        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        if (state) {

            var shapeBoundingBox = state.shape && state.shape.boundingBox;
            if (shapeBoundingBox) {
                boundingBox = shapeBoundingBox.clone();
            }

            var textBoundingBox = state.text && state.text.boundingBox;
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

    // 创建或移除 cell 对应的 state
    validateCell: function (cell, visible) {
        var that = this;

        if (!cell) {
            return cell;
        }

        //visible = !isNullOrUndefined(visible) ? visible : true;
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

    validateCellState: function (cell, recurse) {

        var that = this;
        var state = null;

        if (!cell) {
            return state;
        }

        state = that.getState(cell);

        if (!state) {
            return state;
        }

        //recurse = !isNullOrUndefined(recurse) ? recurse : true;

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

            // 更新 state 的大小、位置信息
            that.updateCellState(state);

            if (cell !== that.currentRoot) {
                that.renderer.redraw(state, false, that.rendering);
            }
        }

        if (recurse) {
            // 更新 state.cellBounds 和 state.paintBounds
            state.updateCachedBounds();

            // 更新 DOM 的层级顺序
            if (state.shape) {
                that.stateValidated(state);
            }

            cell.eachChild(function (child) {
                that.validateCellState(child, true);
            });
        }

        return state;
    },

    updateCellState: function (state) {

        var that = this;
        var cell = state.cell;
        var currentRoot = that.currentRoot;
        var stateOrigin = state.origin;
        var stateAbsoluteOffset = state.absoluteOffset;

        // 重置
        stateAbsoluteOffset.x = 0;
        stateAbsoluteOffset.y = 0;
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
                        stateAbsoluteOffset.x = scale * geoOffset.x;
                        stateAbsoluteOffset.y = scale * geoOffset.y;
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
            that.updateFixedTerminalPoints(state, visibleSourceState, visibleTargetState);
            that.updatePoints(state, geo.points, visibleSourceState, visibleTargetState);
            that.updateFloatingTerminalPoints(state, visibleSourceState, visibleTargetState);

            var absolutePoints = state.absolutePoints;
            // 检查是否能够绘制连线
            var canDrawLink = absolutePoints
                && absolutePoints.length >= 2
                && absolutePoints[0]
                && absolutePoints[absolutePoints.length - 1];

            if (cell !== that.currentRoot && canDrawLink) {
                that.clear(state.cell, true, true);
            } else {
                that.updateEdgeBounds(state);
                that.updateEdgeLabelOffset(state);
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

    resetValidationState: function () {
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

    updateFixedTerminalPoints: function () {},

    updateFixedTerminalPoint: function () {},

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

            if (that.model.isLayer(best)) {
                best = null;
            }
        }

        return best;
    },

    updateEdgeBounds: function (state) {},

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

    updateEdgeLabelOffset: function (state) {},

    // State
    // -----
    getState: function (cell, create) {

        if (!cell) {
            return;
        }

        var that = this;
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
    },

    createState: function (cell) {

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

    removeState: function (cell) {

        var that = this;
        var state = null;

        if (cell) {
            state = that.states.remove(cell);

            if (state) {
                that.graph.cellRenderer.destroy(state);
                state.destroy();
            }
        }

        return state;
    },

    isContainerEvent: function (evt) {},

    isScrollEvent: function (evt) {},

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

        that.installListeners();
    },

    installListeners: function () { },

    destroy: function () { }
});
