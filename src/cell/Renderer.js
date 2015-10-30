import {
    isNullOrUndefined
} from '../common/utils';

import Base       from '../lib/Base';
import styleNames from '../enums/styleNames'

import Rect from '../shapes/Rect';

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
    defaultTextShape: null,
    antiAlias: true,

    constructor: function Renderer() {},

    getShape: function (shapeName) {
        return shapeName ? Renderer.getShape(shapeName) : null;
    },

    // 在 view.createState() 方法中调用
    createShape: function (state) {

        var that = this;

        if (state.style) {

            var shapeName = state.style[styleNames.shape];
            var Constructor = that.getShape(shapeName);

            if (!Constructor) {
                Constructor = state.cell.isLink ? that.defaultLinkShape : that.defaultNodeShape;
            }

            state.shape = new Constructor();
            state.shape.antiAlias = that.antiAlias;
        }

        return that;
    },

    createIndicatorShape: function (state) {

        var that = this;
        var shapeName = state.view.graph.getIndicatorShape(state);

        state.shape.indicatorShape = that.getShape(shapeName);

        return that;
    },

    initShape: function (state) {

        var that = this;

        that.configureShape(state);
        state.shape.init(state.view.drawPane);

        return that;
    },

    configureShape: function (state) {

        var that = this;
        var graph = state.view.graph;
        var shape = state.shape;
        var style = state.style;

        shape.apply(state);
        shape.image = graph.getImage(state);
        shape.indicatorColor = graph.getIndicatorColor(state);
        shape.indicatorStrokeColor = style[mxConstants.STYLE_INDICATOR_STROKECOLOR];
        shape.indicatorGradientColor = graph.getIndicatorGradientColor(state);
        shape.indicatorDirection = style[mxConstants.STYLE_INDICATOR_DIRECTION];
        shape.indicatorImage = graph.getIndicatorImage(state);

        that.postConfigureShape(state);

        return that;
    },

    redraw: function (state, force, rendering) {

        var that = this;

        rendering = !isNullOrUndefined(rendering) ? rendering : true;

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
                that.createIndicatorShape(state);
                that.initShape(state);
                that.createCellOverlays(state);
                that.installListeners(state);
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
                (state.absolutePoints != null && !utils.equalPoints(state.shape.points, state.absolutePoints))) {
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
    }
});

// 注册图形
var registerShape = Renderer.registerShape;

registerShape('rectangle', Rect);

export default Renderer;
