import {
    isNullOrUndefined
} from '../common/utils';

import Base       from '../lib/Base';
import styleNames from '../enums/styleNames';
import Rectangle  from '../lib/Rectangle';

import Rect from '../shapes/Rect';
import Label from '../shapes/Label';

var Renderer = Base.extend({

    Statics: {
        shapes: {},
        getShape: function (name) {
            return Renderer.shapes[name];
        },
        registerShape: function (key, shape) {
            Renderer.shapes[key] = shape;
        }
    },

    defaultNodeShape: Rect,
    defaultLinkShape: null,
    defaultLabelShape: Label,
    antiAlias: true,         // 是否绘制平滑的图形（抗锯齿）

    constructor: function Renderer() {},

    getShape: function (shapeName) {
        return shapeName ? Renderer.getShape(shapeName) : null;
    },

    getLabelBounds: function (state) {
        var graph = state.view.graph;
        var scale = state.view.scale;
        var isLink = state.cell.isLink;
        var bounds = new Rectangle(state.absoluteOffset.x, state.absoluteOffset.y);

        if (isLink) {

        } else {

        }

        return bounds;
    },

    // 在 view.createState() 方法中调用
    createShape: function (state) {

        var that = this;

        if (state.style) {

            var shapeName = state.style.shape;
            var Constructor = that.getShape(shapeName);

            if (!Constructor) {
                Constructor = state.cell.isLink ? that.defaultLinkShape : that.defaultNodeShape;
            }

            state.shape = new Constructor(state);
            state.shape.antiAlias = that.antiAlias;
        }

        return that;
    },

    createLabel: function (state, text) {

        var that = this;

        if (state.style) {
            var shapeName = state.style.labelShape;
            var Constructor = that.getShape(shapeName) || that.defaultLabelShape;

            state.label = new Constructor(state);
        }


        var graph = state.view.graph;
        var style = state.style;
        var isEdge = graph.getModel().isEdge(state.cell);

        if (state.style[mxConstants.STYLE_FONTSIZE] > 0 || state.style[mxConstants.STYLE_FONTSIZE] == null) {
            // Avoids using DOM node for empty labels
            var isForceHtml = (graph.isHtmlLabel(state.cell) || (text != null && mxUtils.isNode(text)));

            state.text = new this.defaultTextShape(text, new mxRectangle(),
                (state.style[mxConstants.STYLE_ALIGN] || mxConstants.ALIGN_CENTER),
                graph.getVerticalAlign(state),
                state.style[mxConstants.STYLE_FONTCOLOR],
                state.style[mxConstants.STYLE_FONTFAMILY],
                state.style[mxConstants.STYLE_FONTSIZE],
                state.style[mxConstants.STYLE_FONTSTYLE],
                state.style[mxConstants.STYLE_SPACING],
                state.style[mxConstants.STYLE_SPACING_TOP],
                state.style[mxConstants.STYLE_SPACING_RIGHT],
                state.style[mxConstants.STYLE_SPACING_BOTTOM],
                state.style[mxConstants.STYLE_SPACING_LEFT],
                state.style[mxConstants.STYLE_HORIZONTAL],
                state.style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR],
                state.style[mxConstants.STYLE_LABEL_BORDERCOLOR],
                graph.isWrapping(state.cell) && graph.isHtmlLabel(state.cell),
                graph.isLabelClipped(state.cell),
                state.style[mxConstants.STYLE_OVERFLOW],
                state.style[mxConstants.STYLE_LABEL_PADDING]);

            state.text.opacity = mxUtils.getValue(state.style, mxConstants.STYLE_TEXT_OPACITY, 100);
            state.text.dialect = (isForceHtml) ? mxConstants.DIALECT_STRICTHTML : state.view.graph.dialect;
            state.text.style = state.style;
            state.text.state = state;

            this.initLabel(state);

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
                    var pt = mxUtils.convertPoint(graph.container, x, y);
                    result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
                }

                return result;
            };

            // TODO: Add handling for special touch device gestures
            mxEvent.addGestureListeners(state.text.node,
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                        forceGetCell = graph.dialect != mxConstants.DIALECT_SVG &&
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

    createIndicator: function (state) {

        var that = this;
        var shapeName = state.view.graph.getIndicatorShape(state);

        state.shape.indicatorShape = that.getShape(shapeName);

        return that;
    },

    createCellOverlays: function () {},

    createControl: function () {},

    initShape: function (state) {

        var that = this;
        var shape = state.shape;


        //that.configureShape(state);
        shape.init(state.view.drawPane);
        shape.style = state.style;

        return that;
    },

    initLabel: function (state) {
        state.label.init(state.view.drawPane);
    },

    configureShape: function (state) {

        var that = this;
        var graph = state.view.graph;
        var shape = state.shape;
        var style = state.style;

        shape.style = style;

        shape.apply(state);
        //shape.image = graph.getImage(state);
        //shape.indicatorColor = graph.getIndicatorColor(state);
        //shape.indicatorStrokeColor = style[mxConstants.STYLE_INDICATOR_STROKECOLOR];
        //shape.indicatorGradientColor = graph.getIndicatorGradientColor(state);
        //shape.indicatorDirection = style[mxConstants.STYLE_INDICATOR_DIRECTION];
        //shape.indicatorImage = graph.getIndicatorImage(state);

        that.postConfigureShape(state);

        return that;
    },

    postConfigureShape: function () {},

    resolveColor: function () {},

    redraw: function (state, force, rendering) {

        var that = this;

        rendering = !isNullOrUndefined(rendering) ? rendering : true;

        // 处理 force, 检查样式是否更新，因为下面就更新样式了


        var shapeChanged = that.redrawShape(state, force, rendering);

        if (state.shape && rendering) {
            that.redrawLabel(state, shapeChanged);
            that.redrawCellOverlays(state, shapeChanged);
            that.redrawControl(state, shapeChanged);
        }
    },

    redrawShape: function (state, force, rendering) {

        var that = this;
        var shape = state.shape;
        var shapeChanged = false;

        if (shape) {
            if (!shape.node) {
                that.createIndicator(state);
                that.initShape(state);
                that.createCellOverlays(state);
                that.installListeners(state);
            }

            // Handles changes of the collapse icon
            that.createControl(state);

            // 检查样式是否有更新
            //if (!mxUtils.equalEntries(state.shape.style, state.style)) {
            //    this.configureShape(state);
            //    force = true;
            //}

            // Redraws the cell if required, ignores changes to bounds if points are
            // defined as the bounds are updated for the given points inside the shape
            if (force || !shape.bounds || shape.scale !== state.view.scale ||
                (state.absolutePoints == null && !state.shape.bounds.equals(state)) ||
                (state.absolutePoints != null && !utils.equalPoints(state.shape.points, state.absolutePoints))) {

                if (state.absolutePoints) {
                    // 绘制连线
                    state.shape.points = state.absolutePoints.slice();
                    state.shape.bounds = null;
                } else {
                    // 绘制节点
                    state.shape.points = null;
                    // 初始化节点的 bounds
                    state.shape.bounds = new Rectangle(state.x, state.y, state.width, state.height);
                }

                shape.scale = state.view.scale;

                if (rendering) {
                    shape.redraw();
                } else {
                    shape.updateBoundingBox();
                }

                shapeChanged = true;
            }
        }

        return shapeChanged;
    },

    redrawLabel: function (state, forced) {
        var that = this;
        var text = state.view.graph.getLabelText(state.cell);

        if (!state.label && text) {
            that.createLabel(state, text);
        } else if (state.label && !text) {
            state.label.destroy();
            state.label = null;
        }

        if (state.label) {

            var label = state.label;
            if (forced || label.text !== text) {

            }
        }
    },

    installListeners: function () {}
});

// 注册图形
var registerShape = Renderer.registerShape;

registerShape('rectangle', Rect);
registerShape('label', Label);

export default Renderer;
