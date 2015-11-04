import {
    extend,
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

    constructor: function Renderer() {},

    getShape: function (shapeName) {
        return shapeName ? Renderer.getShape(shapeName) : null;
    },

    getLabelBounds: function (state) {
        var that = this;
        var graph = state.view.graph;
        var scale = state.view.scale;
        var style = state.style;
        var isLink = state.cell.isLink;
        var bounds = new Rectangle(state.absoluteOffset.x, state.absoluteOffset.y);
        var inverted = false;// state.label.isPaintBoundsInverted();

        if (isLink) {

        } else {
            if (inverted) {
                var temp = bounds.x;
                bounds.x = bounds.y;
                bounds.y = temp;
            }

            bounds.x += state.x;
            bounds.y += state.y;
            bounds.width = Math.max(1, state.width);
            bounds.height = Math.max(1, state.height);

            // border
            if (style.strokeColor) {

            }
        }

        if (inverted) {
            // Rotates around center of state
            var t = (state.width - state.height) / 2;
            bounds.x += t;
            bounds.y -= t;
            var tmp = bounds.width;
            bounds.width = bounds.height;
            bounds.height = tmp;
        }

        // shape can modify its label bounds
        if (state.shape) {
            bounds = state.shape.getLabelBounds(bounds);
        }

        // label width style overrides actual label width
        var labelWidth = style.labelWidth;
        if (labelWidth) {
            bounds.width = labelWidth * scale;
        }

        if (!isLink) {
            that.rotateLabelBounds(state, bounds);
        }

        return bounds;
    },

    rotateLabelBounds: function (state, bounds) {

    },

    // try to create state's shape after the state be created
    createShape: function (state) {

        var that = this;

        if (state.style) {

            var Constructor = that.getShape(state.style.shape);

            if (!Constructor) {
                Constructor = state.cell.isLink
                    ? that.defaultLinkShape : state.cell.isNode
                    ? that.defaultNodeShape
                    : null;
            }

            if (Constructor) {
                state.shape = new Constructor(state, state.style);
            }
        }

        return that;
    },

    createLabel: function (state, bounds) {

        var that = this;
        var style = extend({}, state.style, state.style.label);

        delete style.label;


        if (style) {
            var Constructor = that.getShape(style.shape) || that.defaultLabelShape;

            state.label = new Constructor(state, style, bounds);

            that.appendLabel(state);
        }
    },

    createIndicator: function (state) {

        var that = this;
        var shapeName = state.view.graph.getIndicatorShape(state);

        state.shape.indicatorShape = that.getShape(shapeName);

        return that;
    },

    createOverlays: function () {},

    createControl: function () {},

    appendShape: function (state) {
        state.shape.init(state.view.drawPane);
        return this;
    },

    appendLabel: function (state) {
        state.label.init(state.view.drawPane);
        return this;
    },

    redraw: function (state, force, rendering) {

        var that = this;
        // 处理 force, 检查样式是否更新，因为下面就更新样式了
        var shapeChanged = that.redrawShape(state, force, rendering);

        if (state.shape && rendering) {
            that.redrawLabel(state, shapeChanged);
            that.redrawOverlays(state, shapeChanged);
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
                that.appendShape(state);
                that.createOverlays(state);
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
                (!state.absolutePoints && !state.equalToBounds(shape.bounds)) ||
                (state.absolutePoints && !utils.equalPoints(state.shape.points, state.absolutePoints))) {

                if (state.absolutePoints) {
                    // 绘制连线
                    shape.points = state.absolutePoints.slice();
                    shape.bounds = null;
                } else {
                    // 绘制节点
                    shape.points = null;
                    // 初始化节点的 bounds
                    shape.bounds = new Rectangle(state.x, state.y, state.width, state.height);
                }

                //shape.scale = state.view.scale;

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
        var bounds = that.getLabelBounds(state);

        if (!state.label && text) {
            that.createLabel(state, bounds);
        } else if (state.label && !text) {
            state.label.destroy();
            state.label = null;
        }

        if (state.label) {

            var label = state.label;

            if (forced || label.text !== text) {
                label.text = text;
                label.redraw();
            }
        }
    },

    redrawOverlays: function () {},

    redrawControl: function () {},

    installListeners: function () {}
});

// 注册图形
var registerShape = Renderer.registerShape;

registerShape('rectangle', Rect);
registerShape('label', Label);

export default Renderer;
