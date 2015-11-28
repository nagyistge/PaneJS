import {
    each,
    extend,
    getCurrentStyle,
    rotatePoint,
    isNullOrUndefined
} from '../common/utils';

import Base       from '../lib/Base';
import Rectangle  from '../lib/Rectangle';
import Dictionary from '../lib/Dictionary';

// shapes
import Rect      from '../shapes/Rect';
import Label     from '../shapes/Label';
import Connector from '../shapes/Connector';

// DOM event
import domEvent   from '../events/domEvent';
import MouseEvent from '../events/MouseEvent';
import detector   from '../common/detector';

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

    // default shapes
    defaultNodeShape: Rect,
    defaultLinkShape: Connector,
    defaultLabelShape: Label,

    constructor: function Renderer() {},

    // get shape's Constructor by shape name
    getShape(shapeName) {
        return shapeName ? Renderer.getShape(shapeName) : null;
    },


    // label
    // -----

    getLabelValue: function (state) {
        return state.view.graph.getLabelValue(state.cell);
    },

    getLabelBounds: function (state) {

        var that = this;
        var graph = state.view.graph;
        var scale = state.view.scale;
        var style = state.style;
        var isLink = state.cell.isLink;
        var bounds = new Rectangle(state.absoluteOffset.x, state.absoluteOffset.y);
        var inverted = state.label.isPaintBoundsInverted();

        if (isLink) {
            var spacing = state.label.getSpacing();
            bounds.x += spacing.x * scale;
            bounds.y += spacing.y * scale;

            var geo = graph.getCellGeometry(state.cell);

            if (geo) {
                bounds.width = Math.max(0, geo.width * scale);
                bounds.height = Math.max(0, geo.height * scale);
            }
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

            // 减去外边框
            var strokeWidth = getCurrentStyle(state.shape.node).strokeWidth;
            strokeWidth = strokeWidth ? parseFloat(strokeWidth) : 0;
            if (strokeWidth) {
                bounds.grow(Math.max(strokeWidth, 1) * scale);
            }
        }

        if (inverted) {
            // Rotates around center of state
            var t = (state.width - state.height) / 2;
            var w = bounds.width;
            var h = bounds.height;

            bounds.x += t;
            bounds.y -= t;
            bounds.width = h;
            bounds.height = w;
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

        var label = state.label;
        var overflow = label.overflow;

        bounds.x -= label.alignments.x * bounds.width;
        bounds.y -= label.alignments.y * bounds.height;

        if (overflow !== 'fill' && overflow !== 'width') {
            var scale = state.view.scale;
            var spacing = label.getSpacing();

            bounds.x += spacing.x * scale;
            bounds.y += spacing.y * scale;

            if (label.position === 'center') {
                spacing = label.spacing;

                bounds.width = Math.max(0, bounds.width - (spacing[1] + spacing[3]) * scale);
                bounds.height = Math.max(0, bounds.height - (spacing[0] + spacing[2]) * scale);
            }
        }

        var theta = state.label.getRotation();

        // Only needed if rotated around another center
        if (theta && state && state.cell.isNode) {
            var center = state.getCenter();
            if (bounds.x !== center.x || bounds.y !== center.y) {
                var p = rotatePoint(new Point(bounds.x, bounds.y), theta, center);
                bounds.x = p.x;
                bounds.y = p.y;
            }
        }
    },

    createLabel: function (state, bounds) {

        var that = this;
        var style = state.style.label;

        if (style) {
            var Constructor = that.getShape(style.shape) || that.defaultLabelShape;
            state.label = new Constructor(state, style, bounds);
        }

        return that;
    },

    initLabel: function (state) {

    },

    setupLabel: function (state) {

        var that = this;
        var graph = state.view.graph;
        var forceGetCell = false;

        var getState = function (evt) {
            var result = state;

            if (detector.IS_TOUCH || forceGetCell) {
                var x = mxEvent.getClientX(evt);
                var y = mxEvent.getClientY(evt);

                // Dispatches the drop event to the graph which
                // consumes and executes the source function
                var pt = mxUtils.convertPoint(graph.container, x, y);
                result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
            }

            return result;
        };

        domEvent.addGestureListeners(state.label.node,
            function (e) {
                if (that.isLabelEvent(state, e)) {
                    graph.fireMouseEvent('mouseDown', new MouseEvent(e, state));
                    forceGetCell = graph.dialect != mxConstants.DIALECT_SVG &&
                        mxEvent.getSource(e).nodeName == 'IMG';
                }
            },
            function (e) {
                if (that.isLabelEvent(state, e)) {
                    graph.fireMouseEvent('mouseMove', new MouseEvent(e, getState(e)));
                }
            },
            function (e) {
                if (that.isLabelEvent(state, e)) {
                    graph.fireMouseEvent('mouseUp', new MouseEvent(e, getState(e)));
                    forceGetCell = false;
                }
            }
        );

        // Uses double click timeout in mxGraph for quirks mode
        if (graph.nativeDblClickEnabled) {
            domEvent.addListener(state.text.node, 'dblclick', function (e) {
                if (that.isLabelEvent(state, e)) {
                    graph.dblClick(e, state.cell);
                    domEvent.consume(e);
                }
            });
        }
    },

    redrawLabel: function (state, forced) {

        var that = this;
        var content = that.getLabelValue(state);


        if (!state.label && content) {
            that.createLabel(state, bounds);
            var bounds = that.getLabelBounds(state);
            state.label.bounds = bounds;
        } else if (state.label && !content) {
            state.label.destroy();
            state.label = null;
        }

        if (state.label) {

            var label = state.label;

            if (forced || label.content !== content) {
                label.content = content;
                label.redraw();
            }
        }

        return that;
    },

    destroyLabel: function (state) {

        if (state.label) {
            state.label.destroy();
            state.label = null;
        }

        return this;
    },

    // indicator
    // ---------

    createIndicator: function (state) {

        var that = this;
        var shapeName = state.view.graph.getIndicatorShape(state);

        state.shape.indicatorShape = that.getShape(shapeName);

        return that;
    },


    // overlays
    // --------

    createOverlays: function (state) {

        var that = this;
        var cellOverlays = state.cell.overlays;// graph.getCellOverlays(state.cell);
        var stateOverlays = state.overlays;
        var dict = null;

        if (cellOverlays) {

            dict = new Dictionary();

            each(cellOverlays, function (overlay) {

                var shape = stateOverlays ? stateOverlays.remove(overlay) : null;

                if (shape) {
                    var temp = new ImageShape(new Rectangle(), overlay.image.src);
                    temp.preserveImageAspect = false;
                    temp.overlay = overlay;
                    that.initOverlay(state, temp);
                    that.setupOverlay(state, overlay, temp);

                    if (overlay.cursor) {
                        temp.node.style.cursor = overlay.cursor;
                    }

                    dict.put(cellOverlays[i], temp);
                } else {
                    dict.put(overlay, shape);
                }
            });
        }

        // remove unused
        if (stateOverlays) {
            stateOverlays.each(function (shape) {
                shape.destroy();
            });
        }

        state.overlays = dict;

        return that;
    },

    initOverlay: function (state, overlay) {
        overlay.init(state.view.overlayPane);
        return this;
    },

    setupOverlay: function (state, overlay, shape) {

    },

    redrawOverlays: function (state, forced) {},

    destroyOverlays: function (state) {

        if (state.overlays) {
            state.overlays.each(function (shape) {
                shape.destroy();
            });

            state.overlays = null;
        }

        return this;
    },

    // control
    // -------

    getControlBounds: function (state, w, h) {

    },

    createControl: function (state) {
        var graph = state.view.graph;
        var image = graph.getFoldingImage(state);

        if (graph.foldingEnabled && image) {
            if (!state.control) {
                var b = new Rectangle(0, 0, image.width, image.height);
                state.control = new ImageShape(b, image.src);
                state.control.preserveImageAspect = false;

                this.initControl(state, state.control, true, function (evt) {
                    if (graph.isEnabled()) {
                        var collapse = !graph.isCellCollapsed(state.cell);
                        graph.foldCells(collapse, false, [state.cell]);
                        mxEvent.consume(evt);
                    }
                });
            }
        } else {
            this.destroyControl(state);
        }
    },

    initControl: function (state, control, handleEvents, clickHandler) {

    },

    setupControl: function () {},

    redrawControl: function (state, forced) {
        var graph = state.view.graph;
        var image = graph.getFoldingImage(state);

        if (graph.foldingEnabled && image) {
            if (!state.control) {
                var b = new Rectangle(0, 0, image.width, image.height);
                state.control = new ImageShape(b, image.src);
                state.control.preserveImageAspect = false;

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

    destroyControl: function (state) {
        if (state.control) {
            state.control.destroy();
            state.control = null;
        }

        return this;
    },

    // shape
    // -----

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

    // try to create state's shape after the state be created
    createShape(state) {

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

    initShape: function (state) {
        state.shape.init(state.view.drawPane);
        return this;
    },

    redrawShape: function (state, force, rendering) {

        var that = this;
        var shape = state.shape;
        var shapeChanged = false;

        if (shape) {
            if (!shape.node) {
                that.createIndicator(state);
                that.createOverlays(state);
                that.initShape(state);
                that.setupShape(state);
            }

            // handle changes of the collapse icon
            that.createControl(state);

            // 检查样式是否有更新
            //if (!mxUtils.equalEntries(state.shape.style, state.style)) {
            //    this.configureShape(state);
            //    force = true;
            //}

            // redraw the cell if required, ignores changes to bounds if points are
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

    setupShape: function (state) {

        var that = this;
        var graph = state.view.graph;
        var shape = state.shape;

        function getState(evt) {
            var result = state;

            if (detector.IS_TOUCH) {
                var x = domEvent.getClientX(evt);
                var y = domEvent.getClientY(evt);

                // Dispatches the drop event to the graph which
                // consumes and executes the source function
                var pt = mxUtils.convertPoint(graph.container, x, y);
                result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
            }

            return result;
        }

        domEvent.addGestureListeners(shape.node,
            function (e) {
                if (that.isShapeEvent(e, state)) {

                    var s = shape && domEvent.getSource(e) === shape.content
                        ? null
                        : state;

                    graph.fireMouseEvent('mouseDown', e, s);
                }
            },
            function (e) {
                if (that.isShapeEvent(e, state)) {

                    var s = shape && domEvent.getSource(e) === shape.content
                        ? null
                        : getState(e);

                    graph.fireMouseEvent('mouseMove', e, s);
                }
            },
            function (e) {
                if (that.isShapeEvent(e, state)) {

                    var s = shape && domEvent.getSource(e) === shape.content
                        ? null
                        : getState(e);

                    graph.fireMouseEvent('mouseUp', e, s);
                }
            });

        if (graph.nativeDblClickEnabled) {
            domEvent.addListener(shape.node, 'dblclick', function (e) {
                if (that.isShapeEvent(e, state)) {
                    graph.dblClick(e, state.cell);
                    domEvent.consume(e);
                }
            });
        }
    },

    destroyShape: function (state) {
        if (state.shape) {
            state.shape.destroy();
            state.shape = null;
        }

        return this;
    },

    //

    isShapeEvent: function (e, state) {
        return true;
    },

    isLabelEvent: function (e, state) {
        return true;
    },

    insertShapesAfter: function () {},

    destroy: function (state) {
        if (state.shape) {
            this.destroyLabel(state)
                .destroyOverlays(state)
                .destroyControl(state)
                .destroyShape(state);
        }

        return this;
    }
});

// 注册图形
var registerShape = Renderer.registerShape;

registerShape('rectangle', Rect);
registerShape('connector', Connector);
registerShape('label', Label);

export default Renderer;
