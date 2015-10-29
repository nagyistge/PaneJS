/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');
var detector = require('./common/detector');

var Dictionary = require('./common/Dictionary');
var Rectangle = require('./Rectangle');
var Point = require('./Point');
var constants = require('./constants');

var Shape = require('./shapes/Shape');
var RectangleShape = require('./shapes/RectangleShape');
var Text = require('./shapes/Text');
var Connector = require('./shapes/Connector');

var MouseEvent = require('./events/MouseEvent');
var domEvent = require('./events/domEvent');
var eventNames = require('./events/eventNames');

var isNullOrUndefined = utils.isNullOrUndefined;
var getValue = utils.getValue;

var CellRenderer = Class.create({
    // 静态属性和方法
    Statics: {
        shapes: {},
        getShape: function (name) {
            return CellRenderer.shapes[name];
        },
        registerShape: function (key, shape) {
            CellRenderer.shapes[key] = shape;
        }
    },

    // 属性
    defaultEdgeShape: Connector,
    defaultVertexShape: RectangleShape,
    defaultTextShape: Text,
    legacyControlPosition: true,
    legacySpacing: true,
    antiAlias: true,

    constructor: function CellRenderer() {},

    // 应用 state 中的样式，并创建 g 根节点，然后放入 drawPane 中
    initializeShape: function (state) {
        this.configureShape(state);
        state.shape.init(state.view.getDrawPane());
    },

    // 创建 state 之后，调用该方法初始化 state 的 shape
    createShape: function (state) {
        if (state.style != null) {
            // 模板
            // Checks if there is a stencil for the name and creates
            // a shape instance for the stencil if one exists
            //var stencil = mxStencilRegistry.getStencil(state.style[constants.STYLE_SHAPE]);

            //if (stencil != null) {
            //    state.shape = new mxShape(stencil);
            //}
            //else {
            var Ctor = this.getShapeConstructor(state);
            state.shape = new Ctor();
            //}

            state.shape.antiAlias = this.antiAlias;
        }
    },

    createIndicatorShape: function (state) {
        state.shape.indicatorShape = this.getShape(state.view.graph.getIndicatorShape(state));
    },

    // 获取构造函数
    getShape: function (name) {
        return this.constructor.shapes[name];
    },

    // 获取构造函数
    getShapeConstructor: function (state) {
        var Ctor = this.getShape(state.style[constants.STYLE_SHAPE]);

        if (Ctor == null) {
            Ctor = (state.view.graph.getModel().isEdge(state.cell))
                ? this.defaultEdgeShape
                : this.defaultVertexShape;
        }

        return Ctor;
    },

    // 应用样式
    configureShape: function (state) {
        state.shape.apply(state);
        state.shape.image = state.view.graph.getImage(state);
        state.shape.indicatorColor = state.view.graph.getIndicatorColor(state);
        state.shape.indicatorStrokeColor = state.style[constants.STYLE_INDICATOR_STROKECOLOR];
        state.shape.indicatorGradientColor = state.view.graph.getIndicatorGradientColor(state);
        state.shape.indicatorDirection = state.style[constants.STYLE_INDICATOR_DIRECTION];
        state.shape.indicatorImage = state.view.graph.getIndicatorImage(state);

        this.postConfigureShape(state);
    },

    postConfigureShape: function (state) {
        if (state.shape) {
            this.resolveColor(state, 'indicatorColor', constants.STYLE_FILLCOLOR);
            this.resolveColor(state, 'indicatorGradientColor', constants.STYLE_GRADIENTCOLOR);
            this.resolveColor(state, 'fill', constants.STYLE_FILLCOLOR);
            this.resolveColor(state, 'stroke', constants.STYLE_STROKECOLOR);
            this.resolveColor(state, 'gradient', constants.STYLE_GRADIENTCOLOR);
        }
    },

    resolveColor: function (state, field, key) {
        var value = state.shape[field];
        var graph = state.view.graph;
        var referenced = null;

        if (value == 'inherit') {
            referenced = graph.model.getParent(state.cell);
        } else if (value == 'swimlane') {
            if (graph.model.getTerminal(state.cell, false) != null) {
                referenced = graph.model.getTerminal(state.cell, false);
            } else {
                referenced = state.cell;
            }

            referenced = graph.getSwimlane(referenced);
            key = graph.swimlaneIndicatorColorAttribute;
        } else if (value == 'indicated') {
            state.shape[field] = state.shape.indicatorColor;
        }

        if (referenced != null) {
            var rstate = graph.getView().getState(referenced);
            state.shape[field] = null;

            if (rstate != null) {
                if (rstate.shape != null && field != 'indicatorColor') {
                    state.shape[field] = rstate.shape[field];
                } else {
                    state.shape[field] = rstate.style[key];
                }
            }
        }
    },

    getLabelValue: function (state) {
        return state.view.graph.getLabel(state.cell);
    },

    createLabel: function (state, value) {
        var graph = state.view.graph;
        var isEdge = graph.getModel().isEdge(state.cell);

        if (state.style[constants.STYLE_FONTSIZE] > 0 || state.style[constants.STYLE_FONTSIZE] == null) {
            // Avoids using DOM node for empty labels
            var isForceHtml = (graph.isHtmlLabel(state.cell) || (value != null && utils.isNode(value)));

            state.text = new this.defaultTextShape(value, new Rectangle(),
                (state.style[constants.STYLE_ALIGN] || constants.ALIGN_CENTER),
                graph.getVerticalAlign(state),
                state.style[constants.STYLE_FONTCOLOR],
                state.style[constants.STYLE_FONTFAMILY],
                state.style[constants.STYLE_FONTSIZE],
                state.style[constants.STYLE_FONTSTYLE],
                state.style[constants.STYLE_SPACING],
                state.style[constants.STYLE_SPACING_TOP],
                state.style[constants.STYLE_SPACING_RIGHT],
                state.style[constants.STYLE_SPACING_BOTTOM],
                state.style[constants.STYLE_SPACING_LEFT],
                state.style[constants.STYLE_HORIZONTAL],
                state.style[constants.STYLE_LABEL_BACKGROUNDCOLOR],
                state.style[constants.STYLE_LABEL_BORDERCOLOR],
                graph.isWrapping(state.cell) && graph.isHtmlLabel(state.cell),
                graph.isLabelClipped(state.cell),
                state.style[constants.STYLE_OVERFLOW],
                state.style[constants.STYLE_LABEL_PADDING]);

            state.text.opacity = utils.getValue(state.style, constants.STYLE_TEXT_OPACITY, 100);
            //state.text.dialect = (isForceHtml) ? constants.DIALECT_STRICTHTML : state.view.graph.dialect;
            state.text.style = state.style;
            state.text.state = state;
            this.initializeLabel(state);

            // TODO return
            // --------------
            return;

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
                    var pt = Point.convertPoint(graph.container, x, y);
                    result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
                }

                return result;
            };

            // TODO: Add handling for special touch device gestures
            mxEvent.addGestureListeners(state.text.node,
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                        forceGetCell = graph.dialect != constants.DIALECT_SVG &&
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

    initializeLabel: function (state) {
        //if (mxClient.IS_SVG && mxClient.NO_FO && state.text.dialect != constants.DIALECT_SVG) {
        //    state.text.init(state.view.graph.container);
        //}
        //else {
        state.text.init(state.view.getDrawPane());
        //}
    },

    createCellOverlays: function (state) {
        var graph = state.view.graph;
        var overlays = graph.getCellOverlays(state.cell);
        var dict = null;

        if (overlays != null) {
            dict = new Dictionary();

            for (var i = 0; i < overlays.length; i++) {
                var shape = (state.overlays != null) ? state.overlays.remove(overlays[i]) : null;

                if (shape == null) {
                    var tmp = new ImageShape(new Rectangle(), overlays[i].image.src);
                    tmp.dialect = state.view.graph.dialect;
                    tmp.preserveImageAspect = false;
                    tmp.overlay = overlays[i];
                    this.initializeOverlay(state, tmp);
                    this.installCellOverlayListeners(state, overlays[i], tmp);

                    if (overlays[i].cursor != null) {
                        tmp.node.style.cursor = overlays[i].cursor;
                    }

                    dict.put(overlays[i], tmp);
                }
                else {
                    dict.put(overlays[i], shape);
                }
            }
        }

        // Removes unused
        if (state.overlays != null) {
            state.overlays.visit(function (id, shape) {
                shape.destroy();
            });
        }

        state.overlays = dict;
    },

    initializeOverlay: function (state, overlay) {
        overlay.init(state.view.getOverlayPane());
    },

    installCellOverlayListeners: function (state, overlay, shape) {
        var graph = state.view.graph;

        // TODO return
        //
        return

        mxEvent.addListener(shape.node, 'click', function (evt) {
            if (graph.isEditing()) {
                graph.stopEditing(!graph.isInvokesStopCellEditing());
            }

            overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
                'event', evt, 'cell', state.cell));
        });

        mxEvent.addGestureListeners(shape.node,
            function (evt) {
                mxEvent.consume(evt);
            },
            function (evt) {
                graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
                    new mxMouseEvent(evt, state));
            });

        if (mxClient.IS_TOUCH) {
            mxEvent.addListener(shape.node, 'touchend', function (evt) {
                overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
                    'event', evt, 'cell', state.cell));
            });
        }
    },

    // 创建展开/折叠按钮
    createControl: function (state) {
        var graph = state.view.graph;
        var image = graph.getFoldingImage(state);

        if (graph.foldingEnabled && image != null) {
            if (state.control == null) {
                var b = new Rectangle(0, 0, image.width, image.height);
                state.control = new ImageShape(b, image.src);
                state.control.preserveImageAspect = false;
                state.control.dialect = graph.dialect;

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

    initControl: function (state, control, handleEvents, clickHandler) {
        var graph = state.view.graph;

        // In the special case where the label is in HTML and the display is SVG the image
        // should go into the graph container directly in order to be clickable. Otherwise
        // it is obscured by the HTML label that overlaps the cell.
        var isForceHtml = graph.isHtmlLabel(state.cell) && mxClient.NO_FO &&
            graph.dialect == constants.DIALECT_SVG;

        if (isForceHtml) {
            control.dialect = constants.DIALECT_PREFERHTML;
            control.init(graph.container);
            control.node.style.zIndex = 1;
        }
        else {
            control.init(state.view.getOverlayPane());
        }

        var node = control.innerNode || control.node;

        if (clickHandler) {
            if (graph.isEnabled()) {
                node.style.cursor = 'pointer';
            }

            mxEvent.addListener(node, 'click', clickHandler);
        }

        if (handleEvents) {
            mxEvent.addGestureListeners(node,
                function (evt) {
                    graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                    mxEvent.consume(evt);
                },
                function (evt) {
                    graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt, state));
                });
        }

        return node;
    },

    isShapeEvent: function (state, evt) {
        return true;
    },

    isLabelEvent: function (state, evt) {
        return true;
    },

    // 监听 DOM 事件
    installListeners: function (state) {
        var that = this;
        var graph = state.view.graph;

        // Workaround for touch devices routing all events for a mouse
        // gesture (down, move, up) via the initial DOM node. Same for
        // HTML images in all IE versions (VML images are working).
        function getState(evt) {
            var result = state;

            if (detector.IS_TOUCH) {
                var x = domEvent.getClientX(evt);
                var y = domEvent.getClientY(evt);

                // Dispatches the drop event to the graph which
                // consumes and executes the source function
                var pt = Point.convertPoint(graph.container, x, y);
                result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
            }

            return result;
        }

        domEvent.onGesture(state.shape.node,
            function (evt) {
                if (that.isShapeEvent(state, evt)) {
                    state = state.shape && domEvent.getSource(evt) === state.shape.content ? null : state;
                    graph.fireMouseEvent(eventNames.MOUSE_DOWN, new MouseEvent(evt, state));
                }
            },
            function (evt) {
                if (that.isShapeEvent(state, evt)) {
                    state = state.shape && domEvent.getSource(evt) === state.shape.content ? null : getState(evt);
                    graph.fireMouseEvent(eventNames.MOUSE_MOVE, new MouseEvent(evt, state));
                }
            },
            function (evt) {
                if (that.isShapeEvent(state, evt)) {
                    state = state.shape && domEvent.getSource(evt) === state.shape.content ? null : getState(evt);
                    graph.fireMouseEvent(eventNames.MOUSE_UP, new MouseEvent(evt, state));
                }
            }
        );


        // Uses double click timeout in mxGraph for quirks mode
        if (graph.nativeDblClickEnabled) {
            domEvent.on(state.shape.node, 'dblclick', function (evt) {
                    if (that.isLabelEvent(state, evt)) {
                        graph.dblClick(evt, state.cell);
                        domEvent.consume(evt);
                    }
                }
            );
        }
    },

    redrawLabel: function (state, forced) {
        var value = this.getLabelValue(state);

        if (state.text == null && value != null && (utils.isNode(value) || value.length > 0)) {
            this.createLabel(state, value);
        }
        else if (state.text != null && (value == null || value.length == 0)) {
            state.text.destroy();
            state.text = null;
        }

        if (state.text != null) {
            var graph = state.view.graph;
            var wrapping = graph.isWrapping(state.cell);
            var clipping = graph.isLabelClipped(state.cell);
            var bounds = this.getLabelBounds(state);

            var isForceHtml = (state.view.graph.isHtmlLabel(state.cell) || (value != null && utils.isNode(value)));
            var dialect = (isForceHtml) ? constants.DIALECT_STRICTHTML : state.view.graph.dialect;

            // Text is a special case where change of dialect is possible at runtime
            if (forced || state.text.value != value || state.text.isWrapping != wrapping ||
                state.text.isClipping != clipping || state.text.scale != state.view.scale ||
                state.text.dialect != dialect || !state.text.bounds.equals(bounds)) {
                state.text.dialect = dialect;
                state.text.value = value;
                state.text.bounds = bounds;
                state.text.scale = this.getTextScale(state);
                state.text.isWrapping = wrapping;
                state.text.isClipping = clipping;

                state.text.redraw();
            }
        }
    },

    getTextScale: function (state) {
        return state.view.scale;
    },

    getLabelBounds: function (state) {
        var graph = state.view.graph;
        var scale = state.view.scale;
        var isEdge = graph.getModel().isEdge(state.cell);
        var bounds = new Rectangle(state.absoluteOffset.x, state.absoluteOffset.y);

        if (isEdge) {
            var spacing = state.text.getSpacing();
            bounds.x += spacing.x * scale;
            bounds.y += spacing.y * scale;

            var geo = graph.getCellGeometry(state.cell);

            if (geo != null) {
                bounds.width = Math.max(0, geo.width * scale);
                bounds.height = Math.max(0, geo.height * scale);
            }
        }
        else {
            // Inverts label position
            if (state.text.isPaintBoundsInverted()) {
                var tmp = bounds.x;
                bounds.x = bounds.y;
                bounds.y = tmp;
            }

            bounds.x += state.x;
            bounds.y += state.y;

            // Minimum of 1 fixes alignment bug in HTML labels
            bounds.width = Math.max(1, state.width);
            bounds.height = Math.max(1, state.height);

            var sc = getValue(state.style, constants.STYLE_STROKECOLOR, constants.NONE);

            if (sc != constants.NONE && sc != '') {
                var s = parseFloat(getValue(state.style, constants.STYLE_STROKEWIDTH, 1)) * scale / 2;
                var s2 = 2 * s + 0.5;

                bounds.x += s;
                bounds.y += s;
                bounds.width -= s2;
                bounds.height -= s2;
            }
        }

        if (state.text.isPaintBoundsInverted()) {
            // Rotates around center of state
            var t = (state.width - state.height) / 2;
            bounds.x += t;
            bounds.y -= t;
            var tmp = bounds.width;
            bounds.width = bounds.height;
            bounds.height = tmp;
        }

        // Shape can modify its label bounds
        if (state.shape != null) {
            bounds = state.shape.getLabelBounds(bounds);
        }

        // Label width style overrides actual label width
        var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

        if (lw != null) {
            bounds.width = parseFloat(lw) * scale;
        }

        if (!isEdge) {
            this.rotateLabelBounds(state, bounds);
        }

        return bounds;
    },

    rotateLabelBounds: function (state, bounds) {
        bounds.x -= state.text.margin.x * bounds.width;
        bounds.y -= state.text.margin.y * bounds.height;

        if (!this.legacySpacing || (state.style[constants.STYLE_OVERFLOW] != 'fill' && state.style[constants.STYLE_OVERFLOW] != 'width')) {
            var s = state.view.scale;
            var spacing = state.text.getSpacing();
            bounds.x += spacing.x * s;
            bounds.y += spacing.y * s;

            var hpos = getValue(state.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER);
            var vpos = getValue(state.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE);
            var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

            bounds.width = Math.max(0, bounds.width - ((hpos == constants.ALIGN_CENTER && lw == null) ? (state.text.spacingLeft * s + state.text.spacingRight * s) : 0));
            bounds.height = Math.max(0, bounds.height - ((vpos == constants.ALIGN_MIDDLE) ? (state.text.spacingTop * s + state.text.spacingBottom * s) : 0));
        }

        var theta = state.text.getTextRotation();

        // Only needed if rotated around another center
        if (theta != 0 && state != null && state.view.graph.model.isVertex(state.cell)) {
            var cx = state.getCenterX();
            var cy = state.getCenterY();

            if (bounds.x != cx || bounds.y != cy) {
                var rad = theta * (Math.PI / 180);
                var pt = Point.getRotatedPoint(new Point(bounds.x, bounds.y),
                    Math.cos(rad), Math.sin(rad), new Point(cx, cy));

                bounds.x = pt.x;
                bounds.y = pt.y;
            }
        }
    },

    redrawCellOverlays: function (state, forced) {
        this.createCellOverlays(state);

        if (state.overlays != null) {
            var rot = mxUtils.mod(mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0), 90);
            var rad = mxUtils.toRadians(rot);
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            state.overlays.visit(function (id, shape) {
                var bounds = shape.overlay.getBounds(state);

                if (!state.view.graph.getModel().isEdge(state.cell)) {
                    if (state.shape != null && rot != 0) {
                        var cx = bounds.getCenterX();
                        var cy = bounds.getCenterY();

                        var point = Point.getRotatedPoint(new mxPoint(cx, cy), cos, sin,
                            new mxPoint(state.getCenterX(), state.getCenterY()));

                        cx = point.x;
                        cy = point.y;
                        bounds.x = Math.round(cx - bounds.width / 2);
                        bounds.y = Math.round(cy - bounds.height / 2);
                    }
                }

                if (forced || shape.bounds == null || shape.scale != state.view.scale || !shape.bounds.equals(bounds)) {
                    shape.bounds = bounds;
                    shape.scale = state.view.scale;
                    shape.redraw();
                }
            });
        }
    },

    redrawControl: function (state, forced) {
        var image = state.view.graph.getFoldingImage(state);

        if (state.control != null && image != null) {
            var bounds = this.getControlBounds(state, image.width, image.height);
            var r = (this.legacyControlPosition) ?
                mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0) :
                state.shape.getTextRotation();
            var s = state.view.scale;

            if (forced || state.control.scale != s || !state.control.bounds.equals(bounds) ||
                state.control.rotation != r) {
                state.control.rotation = r;
                state.control.bounds = bounds;
                state.control.scale = s;

                state.control.redraw();
            }
        }
    },

    getControlBounds: function (state, w, h) {
        if (state.control != null) {
            var s = state.view.scale;
            var cx = state.getCenterX();
            var cy = state.getCenterY();

            if (!state.view.graph.getModel().isEdge(state.cell)) {
                cx = state.x + w * s;
                cy = state.y + h * s;

                if (state.shape != null) {
                    // TODO: Factor out common code
                    var rot = state.shape.getShapeRotation();

                    if (this.legacyControlPosition) {
                        rot = mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0);
                    }
                    else {
                        if (state.shape.isPaintBoundsInverted()) {
                            var t = (state.width - state.height) / 2;
                            cx += t;
                            cy -= t;
                        }
                    }

                    if (rot != 0) {
                        var rad = mxUtils.toRadians(rot);
                        var cos = Math.cos(rad);
                        var sin = Math.sin(rad);

                        var point = Point.getRotatedPoint(new mxPoint(cx, cy), cos, sin,
                            new mxPoint(state.getCenterX(), state.getCenterY()));
                        cx = point.x;
                        cy = point.y;
                    }
                }
            }

            return (state.view.graph.getModel().isEdge(state.cell)) ?
                new mxRectangle(Math.round(cx - w / 2 * s), Math.round(cy - h / 2 * s), Math.round(w * s), Math.round(h * s))
                : new mxRectangle(Math.round(cx - w / 2 * s), Math.round(cy - h / 2 * s), Math.round(w * s), Math.round(h * s));
        }

        return null;
    },

    insertStateAfter: function (state, node, htmlNode) {
        var shapes = this.getShapesForState(state);

        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i] != null) {
                var html = shapes[i].node.parentNode != state.view.getDrawPane();
                var temp = (html) ? htmlNode : node;

                if (temp != null && temp.nextSibling != shapes[i].node) {
                    if (temp.nextSibling == null) {
                        temp.parentNode.appendChild(shapes[i].node);
                    }
                    else {
                        temp.parentNode.insertBefore(shapes[i].node, temp.nextSibling);
                    }
                }
                else if (temp == null) {
                    // Special case: First HTML node should be first sibling after canvas
                    if (shapes[i].node.parentNode == state.view.graph.container) {
                        var canvas = state.view.canvas;

                        while (canvas != null && canvas.parentNode != state.view.graph.container) {
                            canvas = canvas.parentNode;
                        }

                        if (canvas != null && canvas.nextSibling != null && canvas.nextSibling != shapes[i].node) {
                            shapes[i].node.parentNode.insertBefore(shapes[i].node, canvas.nextSibling);
                        }
                        else {
                            shapes[i].node.parentNode.appendChild(shapes[i].node);
                        }
                    }
                    else if (shapes[i].node.parentNode.firstChild != null && shapes[i].node.parentNode.firstChild != shapes[i].node) {
                        // Inserts the node as the first child of the parent to implement the order
                        shapes[i].node.parentNode.insertBefore(shapes[i].node, shapes[i].node.parentNode.firstChild);
                    }
                }

                if (html) {
                    htmlNode = shapes[i].node;
                }
                else {
                    node = shapes[i].node;
                }
            }
        }

        return [node, htmlNode];
    },

    getShapesForState: function (state) {
        return [state.shape, state.text];
    },

    redraw: function (state, force, rendering) {
        var shapeChanged = this.redrawShape(state, force, rendering);

        if (state.shape != null && (rendering == null || rendering)) {
            this.redrawLabel(state, shapeChanged);
            this.redrawCellOverlays(state, shapeChanged);
            this.redrawControl(state, shapeChanged);
        }
    },

    redrawShape: function (state, force, rendering) {
        var shapeChanged = false;

        if (state.shape) {
            // Lazy initialization
            if (!state.shape.node) {
                this.createIndicatorShape(state);
                // 应用 state 中的样式，创建 shape 的根节点，并加入到 drawPane 中
                this.initializeShape(state);
                this.createCellOverlays(state);
                // DOM 事件
                this.installListeners(state);
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
                (state.absolutePoints != null && !Point.equalPoints(state.shape.points, state.absolutePoints))) {
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
    },

    destroy: function (state) {
        if (state.shape != null) {
            if (state.text != null) {
                state.text.destroy();
                state.text = null;
            }

            if (state.overlays != null) {
                state.overlays.visit(function (id, shape) {
                    shape.destroy();
                });

                state.overlays = null;
            }

            if (state.control != null) {
                state.control.destroy();
                state.control = null;
            }

            state.shape.destroy();
            state.shape = null;
        }
    }
});


var registerShape = CellRenderer.registerShape;

registerShape(constants.SHAPE_RECTANGLE, RectangleShape);
//registerShape(constants.SHAPE_ELLIPSE, mxEllipse);
//registerShape(constants.SHAPE_RHOMBUS, mxRhombus);
//registerShape(constants.SHAPE_CYLINDER, mxCylinder);
//registerShape(constants.SHAPE_CONNECTOR, mxConnector);
//registerShape(constants.SHAPE_ACTOR, mxActor);
//registerShape(constants.SHAPE_TRIANGLE, mxTriangle);
//registerShape(constants.SHAPE_HEXAGON, mxHexagon);
//registerShape(constants.SHAPE_CLOUD, mxCloud);
//registerShape(constants.SHAPE_LINE, mxLine);
//registerShape(constants.SHAPE_ARROW, mxArrow);
//registerShape(constants.SHAPE_DOUBLE_ELLIPSE, mxDoubleEllipse);
//registerShape(constants.SHAPE_SWIMLANE, mxSwimlane);
//registerShape(constants.SHAPE_IMAGE, mxImageShape);
//registerShape(constants.SHAPE_LABEL, mxLabel);


module.exports = CellRenderer;

