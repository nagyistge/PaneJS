/* jshint node: true, loopfunc: true, undef: true, unused: true */

//var Class = require('./common/class');
var Cell = require('../Cell');
var CellMarker = require('./CellMarker');
var ConstraintHandler = require('./ConstraintHandler');
var EventObject = require('../events/EventObject');
var EventSource = require('../events/EventSource');
var Geometry = require('../Geometry');
var ImageShape = require('../shapes/ImageShape');
var MouseEvent = require('../events/MouseEvent');
var Point = require('../Point');
var Polyline = require('../shapes/Polyline');
var Rectangle = require('../Rectangle');
var constants = require('../constants');
var domEvent = require('../events/domEvent');
var utils = require('../common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

var ConnectionHandler = EventSource.extend({
    constructor: function ConnectionHandler(graph, factoryMethod) {
        var that = this;
        EventSource.call(that);
        if (graph != null) {
            this.graph = graph;
            this.factoryMethod = factoryMethod;
            this.init();

            // Handles escape keystrokes
            this.escapeHandler = utils.bind(that, function (/*sender, evt*/) {
                this.reset();
            });
            this.graph.on(domEvent.ESCAPE, this.escapeHandler);
        }
    },

    graph: null,

    factoryMethod: true,

    moveIconFront: false,

    moveIconBack: false,

    connectImage: null,

    targetConnectImage: false,

    enabled: true,

    select: true,

    createTarget: false,

    marker: null,

    constraintHandler: null,

    error: null,

    waypointsEnabled: false,

    ignoreMouseDown: false,

    first: null,

    connectIconOffset: new Point(0, constants.TOOLTIP_VERTICAL_OFFSET),

    edgeState: null,

    changeHandler: null,

    drillHandler: null,

    mouseDownCounter: 0,

    outlineConnect: false,

    isEnabled: function () {
        return this.enabled;
    },

    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    isCreateTarget: function () {
        return this.createTarget;
    },

    setCreateTarget: function (value) {
        this.createTarget = value;
    },

    createShape: function () {
        // Creates the edge preview
        var shape = new Polyline([], constants.INVALID_COLOR);
        shape.dialect = (this.graph.dialect != constants.DIALECT_SVG) ?
            constants.DIALECT_VML : constants.DIALECT_SVG;
        shape.pointerEvents = false;
        shape.isDashed = true;
        shape.init(this.graph.getView().getOverlayPane());
        domEvent.redirectMouseEvents(shape.node, this.graph, null);

        return shape;
    },

    init: function () {
        this.graph.addMouseListener(this);
        this.marker = this.createMarker();
        this.constraintHandler = new ConstraintHandler(this.graph);

        // Redraws the icons if the graph changes
        this.changeHandler = utils.bind(this, function (/*sender*/) {
            if (!isNullOrUndefined(this.iconState)) {
                this.iconState = this.graph.getView().getState(this.iconState.cell);
            }

            if (!isNullOrUndefined(this.iconState)) {
                this.redrawIcons(this.icons, this.iconState);
                this.constraintHandler.reset();
            }
            else {
                this.reset();
            }
        });

        this.graph.getModel().on(domEvent.CHANGE, this.changeHandler);
        this.graph.getView().on(domEvent.SCALE, this.changeHandler);
        this.graph.getView().on(domEvent.TRANSLATE, this.changeHandler);
        this.graph.getView().on(domEvent.SCALE_AND_TRANSLATE, this.changeHandler);

        // Removes the icon if we step into/up or start editing
        this.drillHandler = utils.bind(this, function (/*sender*/) {
            this.reset();
        });

        this.graph.on(domEvent.START_EDITING, this.drillHandler);
        this.graph.getView().on(domEvent.DOWN, this.drillHandler);
        this.graph.getView().on(domEvent.UP, this.drillHandler);
    },

    isConnectableCell: function (/*cell*/) {
        return true;
    },

    createMarker: function () {
        var marker = new CellMarker(this.graph);
        marker.hotspotEnabled = true;

        // Overrides to return cell at location only if valid (so that
        // there is no highlight for invalid cells)
        marker.getCell = utils.bind(this, function (me, cell) {
            cell = CellMarker.prototype.getCell.apply(marker, arguments);
            var scale = this.graph.view.scale;
            var point = new Point(this.graph.snap(me.getGraphX() / scale) * scale,
                this.graph.snap(me.getGraphY() / scale) * scale);
            this.error = null;

            // Checks for cell under mouse
            if (cell === null) {
                cell = this.getCellAt(point.x, point.y);
            }

            if ((this.graph.isSwimlane(cell) && this.graph.hitsSwimlaneContent(cell, point.x, point.y)) || !this.isConnectableCell(cell)) {
                cell = null;
            }

            if (cell != null) {
                if (this.isConnecting()) {
                    if (this.previous != null) {
                        this.error = this.validateConnection(this.previous.cell, cell);

                        if (this.error != null && this.error.length === 0) {
                            cell = null;

                            // Enables create target inside groups
                            if (this.isCreateTarget()) {
                                this.error = null;
                            }
                        }
                    }
                }
                else if (!this.isValidSource(cell, me)) {
                    cell = null;
                }
            }
            else if (this.isConnecting() && !this.isCreateTarget() && !this.graph.allowDanglingEdges) {
                this.error = '';
            }

            return cell;
        });

        // Sets the highlight color according to validateConnection
        marker.isValidState = utils.bind(this, function (/*state*/) {
            if (this.isConnecting()) {
                return this.error === null;
            }
            else {
                return CellMarker.prototype.isValidState.apply(marker, arguments);
            }
        });

        // Overrides to use marker color only in highlight mode or for
        // target selection
        marker.getMarkerColor = utils.bind(this, function (/*evt, state, isValid*/) {
            return (this.connectImage === null || this.isConnecting()) ?
                CellMarker.prototype.getMarkerColor.apply(marker, arguments) :
                null;
        });

        // Overrides to use hotspot only for source selection otherwise
        // intersects always returns true when over a cell
        marker.intersects = utils.bind(this, function (/*state, evt*/) {
            if (this.connectImage != null || this.isConnecting()) {
                return true;
            }

            return CellMarker.prototype.intersects.apply(marker, arguments);
        });

        return marker;
    },

    start: function (state, x, y, edgeState) {
        this.previous = state;
        this.first = new Point(x, y);
        this.edgeState = (edgeState != null) ? edgeState : this.createEdgeState(null);

        // Marks the source state
        this.marker.currentColor = this.marker.validColor;
        this.marker.markedState = state;
        this.marker.mark();

        this.fireEvent(new EventObject(domEvent.START, 'state', this.previous));
    },

    getCellAt: function (x, y) {
        return (!this.outlineConnect) ? this.graph.getCellAt(x, y) : null;
    },

    isConnecting: function () {
        return this.first != null && this.shape != null;
    },

    isValidSource: function (cell/*, me*/) {
        return this.graph.isValidSource(cell);
    },

    isValidTarget: function (/*cell*/) {
        return true;
    },

    validateConnection: function (source, target) {
        if (!this.isValidTarget(target)) {
            return '';
        }

        return this.graph.getEdgeValidationError(null, source, target);
    },

    getConnectImage: function (/*state*/) {
        return this.connectImage;
    },

    isMoveIconToFrontForState: function (state) {
        if (state.text != null && state.text.node.parentNode === this.graph.container) {
            return true;
        }

        return this.moveIconFront;
    },

    createIcons: function (state) {
        var image = this.getConnectImage(state);

        if (image != null && state != null) {
            this.iconState = state;
            var icons = [];

            // Cannot use HTML for the connect icons because the icon receives all
            // mouse move events in IE, must use VML and SVG instead even if the
            // connect-icon appears behind the selection border and the selection
            // border consumes the events before the icon gets a chance
            var bounds = new Rectangle(0, 0, image.width, image.height);
            var icon = new ImageShape(bounds, image.src, null, null, 0);
            icon.preserveImageAspect = false;

            if (this.isMoveIconToFrontForState(state)) {
                icon.dialect = constants.DIALECT_STRICTHTML;
                icon.init(this.graph.container);
            }
            else {
                icon.dialect = (this.graph.dialect === constants.DIALECT_SVG) ?
                    constants.DIALECT_SVG : constants.DIALECT_VML;
                icon.init(this.graph.getView().getOverlayPane());

                // Move the icon back in the overlay pane
                if (this.moveIconBack && icon.node.previousSibling != null) {
                    icon.node.parentNode.insertBefore(icon.node, icon.node.parentNode.firstChild);
                }
            }

            icon.node.style.cursor = constants.CURSOR_CONNECT;

            // Events transparency
            var getState = utils.bind(this, function () {
                return (this.currentState != null) ? this.currentState : state;
            });

            // Updates the local icon before firing the mouse down event.
            var mouseDown = utils.bind(this, function (evt) {
                if (!domEvent.isConsumed(evt)) {
                    this.icon = icon;
                    this.graph.fireMouseEvent(domEvent.MOUSE_DOWN,
                        new MouseEvent(evt, getState()));
                }
            });

            domEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);

            icons.push(icon);
            this.redrawIcons(icons, this.iconState);

            return icons;
        }

        return null;
    },

    redrawIcons: function (icons, state) {
        if (icons != null && icons[0] != null && state != null) {
            var pos = this.getIconPosition(icons[0], state);
            icons[0].bounds.x = pos.x;
            icons[0].bounds.y = pos.y;
            icons[0].redraw();
        }
    },

    getIconPosition: function (icon, state) {
        var scale = this.graph.getView().scale;
        var cx = state.getCenterX();
        var cy = state.getCenterY();

        if (this.graph.isSwimlane(state.cell)) {
            var size = this.graph.getStartSize(state.cell);

            cx = (size.width != 0) ? state.x + size.width * scale / 2 : cx;
            cy = (size.height != 0) ? state.y + size.height * scale / 2 : cy;

            var alpha = utils.toRadians(utils.getValue(state.style, constants.STYLE_ROTATION) || 0);

            if (alpha != 0) {
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);
                var ct = new Point(state.getCenterX(), state.getCenterY());
                var pt = Point.getRotatedPoint(new Point(cx, cy), cos, sin, ct);
                cx = pt.x;
                cy = pt.y;
            }
        }

        return new Point(cx - icon.bounds.width / 2,
            cy - icon.bounds.height / 2);
    },

    destroyIcons: function () {
        if (this.icons != null) {
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].destroy();
            }

            this.icons = null;
            this.icon = null;
            this.selectedIcon = null;
            this.iconState = null;
        }
    },

    isStartEvent: function (/*me*/) {
        return ((this.constraintHandler.currentFocus != null && this.constraintHandler.currentConstraint != null) ||
        (this.previous != null && this.error === null && (this.icons === null || (this.icons != null &&
        this.icon != null))));
    },

    mouseDown: function (sender, me) {
        this.mouseDownCounter++;

        if (this.isEnabled() && this.graph.isEnabled() && !me.isConsumed() && !this.isConnecting() && this.isStartEvent(me)) {
            if (this.constraintHandler.currentConstraint != null &&
                this.constraintHandler.currentFocus != null &&
                this.constraintHandler.currentPoint != null) {
                this.sourceConstraint = this.constraintHandler.currentConstraint;
                this.previous = this.constraintHandler.currentFocus;
                this.first = this.constraintHandler.currentPoint.clone();
            }
            else {
                // Stores the location of the initial mousedown
                this.first = new Point(me.getGraphX(), me.getGraphY());
            }

            this.edgeState = this.createEdgeState(me);
            this.mouseDownCounter = 1;

            if (this.waypointsEnabled && this.shape === null) {
                this.waypoints = null;
                this.shape = this.createShape();

                if (this.edgeState != null) {
                    this.shape.apply(this.edgeState);
                }
            }

            // Stores the starting point in the geometry of the preview
            if (this.previous === null && this.edgeState != null) {
                var pt = this.graph.getPointForEvent(me.getEvent());
                this.edgeState.cell.geometry.setTerminalPoint(pt, true);
            }

            this.fireEvent(new EventObject(domEvent.START, 'state', this.previous));

            me.consume();
        }

        this.selectedIcon = this.icon;
        this.icon = null;
    },

    isImmediateConnectSource: function (state) {
        return !this.graph.isCellMovable(state.cell);
    },

    createEdgeState: function () {
        return null;
    },

    isOutlineConnectEvent: function (me) {
        return this.outlineConnect && !domEvent.isShiftDown(me.getEvent()) &&
            (me.isSource(this.marker.highlight.shape) || domEvent.isAltDown(me.getEvent()));
    },

    updateCurrentState: function (me, point) {
        this.constraintHandler.update(me, this.first === null);

        if (this.constraintHandler.currentFocus != null && this.constraintHandler.currentConstraint != null) {
            this.marker.reset();

            // Updates validation state
            if (this.previous != null) {
                this.error = this.validateConnection(this.previous.cell, this.constraintHandler.currentFocus.cell);

                if (this.error === null) {
                    this.currentState = this.constraintHandler.currentFocus;
                }
                else {
                    this.constraintHandler.reset();
                }
            }
        }
        else {
            this.marker.process(me);
            this.currentState = this.marker.getValidState();

            if (this.currentState != null && this.isOutlineConnectEvent(me)) {
                var constraint = this.graph.getOutlineConstraint(point, this.currentState, me);
                this.constraintHandler.currentConstraint = constraint;
                this.constraintHandler.currentFocus = this.currentState;
                this.constraintHandler.currentPoint = point;
            }
        }

        if (this.outlineConnect) {
            if (this.marker.highlight != null && this.marker.highlight.shape != null) {
                if (this.constraintHandler.currentConstraint != null &&
                    this.constraintHandler.currentFocus != null) {
                    this.marker.highlight.shape.stroke = constants.OUTLINE_HIGHLIGHT_COLOR;
                    this.marker.highlight.shape.strokewidth = constants.OUTLINE_HIGHLIGHT_STROKEWIDTH / this.graph.view.scale / this.graph.view.scale;
                    this.marker.highlight.repaint();
                }
                else if (this.marker.hasValidState()) {
                    this.marker.highlight.shape.stroke = constants.DEFAULT_VALID_COLOR;
                    this.marker.highlight.shape.strokewidth = constants.HIGHLIGHT_STROKEWIDTH / this.graph.view.scale / this.graph.view.scale;
                    this.marker.highlight.repaint();
                }
            }
        }
    },

    convertWaypoint: function (point) {
        var scale = this.graph.getView().getScale();
        var tr = this.graph.getView().getTranslate();

        point.x = point.x / scale - tr.x;
        point.y = point.y / scale - tr.y;
    },

    mouseMove: function (sender, me) {
        if (!me.isConsumed() && (this.ignoreMouseDown || this.first != null || !this.graph.isMouseDown)) {
            // Handles special case when handler is disabled during highlight
            if (!this.isEnabled() && this.currentState != null) {
                this.destroyIcons();
                this.currentState = null;
            }

            var view = this.graph.getView();
            var scale = view.scale;
            var tr = view.translate;
            var point = new Point(me.getGraphX(), me.getGraphY());
            this.error = null;

            if (this.graph.isGridEnabledEvent(me.getEvent())) {
                point = new Point((this.graph.snap(point.x / scale - tr.x) + tr.x) * scale,
                    (this.graph.snap(point.y / scale - tr.y) + tr.y) * scale);
            }

            this.currentPoint = point;

            if (this.first != null || (this.isEnabled() && this.graph.isEnabled())) {
                this.updateCurrentState(me, point);
            }

            if (this.first != null) {
                var constraint = null;
                var current = point;

                // Uses the current point from the constraint handler if available
                if (this.constraintHandler.currentConstraint != null &&
                    this.constraintHandler.currentFocus != null &&
                    this.constraintHandler.currentPoint != null) {
                    constraint = this.constraintHandler.currentConstraint;
                    current = this.constraintHandler.currentPoint.clone();
                }
                else if (this.previous != null && domEvent.isShiftDown(me.getEvent())) {
                    if (Math.abs(this.previous.getCenterX() - point.x) < Math.abs(this.previous.getCenterY() - point.y)) {
                        point.x = this.previous.getCenterX();
                    }
                    else {
                        point.y = this.previous.getCenterY();
                    }
                }

                var pt2 = this.first;

                // Moves the connect icon with the mouse
                if (this.selectedIcon != null) {
                    var w = this.selectedIcon.bounds.width;
                    var h = this.selectedIcon.bounds.height;

                    if (this.currentState != null && this.targetConnectImage) {
                        var pos = this.getIconPosition(this.selectedIcon, this.currentState);
                        this.selectedIcon.bounds.x = pos.x;
                        this.selectedIcon.bounds.y = pos.y;
                    }
                    else {
                        var bounds = new Rectangle(me.getGraphX() + this.connectIconOffset.x,
                            me.getGraphY() + this.connectIconOffset.y, w, h);
                        this.selectedIcon.bounds = bounds;
                    }

                    this.selectedIcon.redraw();
                }

                // Uses edge state to compute the terminal points
                if (this.edgeState != null) {
                    this.edgeState.absolutePoints = [null, (this.currentState != null) ? null : current];
                    this.graph.view.updateFixedTerminalPoint(this.edgeState, this.previous, true, this.sourceConstraint);

                    if (this.currentState != null) {
                        if (constraint === null) {
                            constraint = this.graph.getConnectionConstraint(this.edgeState, this.previous, false);
                        }

                        this.edgeState.setAbsoluteTerminalPoint(null, false);
                        this.graph.view.updateFixedTerminalPoint(this.edgeState, this.currentState, false, constraint);
                    }

                    // Scales and translates the waypoints to the model
                    var realPoints = null;

                    if (this.waypoints != null) {
                        realPoints = [];

                        for (var i = 0; i < this.waypoints.length; i++) {
                            var pt = this.waypoints[i].clone();
                            this.convertWaypoint(pt);
                            realPoints[i] = pt;
                        }
                    }

                    this.graph.view.updatePoints(this.edgeState, realPoints, this.previous, this.currentState);
                    this.graph.view.updateFloatingTerminalPoints(this.edgeState, this.previous, this.currentState);
                    current = this.edgeState.absolutePoints[this.edgeState.absolutePoints.length - 1];
                    pt2 = this.edgeState.absolutePoints[0];
                }
                else {
                    if (this.currentState != null) {
                        if (this.constraintHandler.currentConstraint === null) {
                            var tmp = this.getTargetPerimeterPoint(this.currentState, me);

                            if (tmp != null) {
                                current = tmp;
                            }
                        }
                    }

                    // Computes the source perimeter point
                    if (this.sourceConstraint === null && this.previous != null) {
                        var next = (this.waypoints != null && this.waypoints.length > 0) ?
                            this.waypoints[0] : current;
                        var _tmp = this.getSourcePerimeterPoint(this.previous, next, me);

                        if (_tmp != null) {
                            pt2 = _tmp;
                        }
                    }
                }

                // Makes sure the cell under the mousepointer can be detected
                // by moving the preview shape away from the mouse. This
                // makes sure the preview shape does not prevent the detection
                // of the cell under the mousepointer even for slow gestures.
                if (this.currentState === null && this.movePreviewAway) {
                    var tmp1 = pt2;

                    if (this.edgeState != null && this.edgeState.absolutePoints.length > 2) {
                        var tmp2 = this.edgeState.absolutePoints[this.edgeState.absolutePoints.length - 2];

                        if (tmp2 != null) {
                            tmp1 = tmp2;
                        }
                    }

                    var dx = current.x - tmp1.x;
                    var dy = current.y - tmp1.y;

                    var len = Math.sqrt(dx * dx + dy * dy);

                    if (len === 0) {
                        return;
                    }

                    current.x -= dx * 4 / len;
                    current.y -= dy * 4 / len;
                }

                // Creates the preview shape (lazy)
                if (this.shape === null) {
                    var _dx = Math.abs(point.x - this.first.x);
                    var _dy = Math.abs(point.y - this.first.y);

                    if (_dx > this.graph.tolerance || _dy > this.graph.tolerance) {
                        this.shape = this.createShape();

                        if (this.edgeState != null) {
                            this.shape.apply(this.edgeState);
                        }

                        // Revalidates current connection
                        this.updateCurrentState(me, point);
                    }
                }

                // Updates the points in the preview edge
                if (this.shape != null) {
                    if (this.edgeState != null) {
                        this.shape.points = this.edgeState.absolutePoints;
                    }
                    else {
                        var pts = [pt2];

                        if (this.waypoints != null) {
                            pts = pts.concat(this.waypoints);
                        }

                        pts.push(current);
                        this.shape.points = pts;
                    }

                    this.drawPreview();
                }

                domEvent.consume(me.getEvent());
                me.consume();
            }
            else if (!this.isEnabled() || !this.graph.isEnabled()) {
                this.constraintHandler.reset();
            }
            else if (this.previous != this.currentState && this.edgeState === null) {
                this.destroyIcons();

                // Sets the cursor on the current shape
                if (this.currentState != null && this.error === null && this.constraintHandler.currentConstraint === null) {
                    this.icons = this.createIcons(this.currentState);

                    if (this.icons === null) {
                        this.currentState.setCursor(constants.CURSOR_CONNECT);
                        me.consume();
                    }
                }

                this.previous = this.currentState;
            }
            else if (this.previous === this.currentState && this.currentState != null && this.icons === null && !this.graph.isMouseDown) {
                // Makes sure that no cursors are changed
                me.consume();
            }

            if (!this.graph.isMouseDown && this.currentState != null && this.icons != null) {
                var hitsIcon = false;
                var target = me.getSource();

                for (var j = 0; j < this.icons.length && !hitsIcon; j++) {
                    hitsIcon = target === this.icons[j].node || target.parentNode === this.icons[j].node;
                }

                if (!hitsIcon) {
                    this.updateIcons(this.currentState, this.icons, me);
                }
            }
        }
        else {
            this.constraintHandler.reset();
        }
    },

    getTargetPerimeterPoint: function (state/*, me*/) {
        var result = null;
        var view = state.view;
        var targetPerimeter = view.getPerimeterFunction(state);

        if (targetPerimeter != null) {
            var next = (this.waypoints != null && this.waypoints.length > 0) ?
                this.waypoints[this.waypoints.length - 1] :
                new Point(this.previous.getCenterX(), this.previous.getCenterY());
            var tmp = targetPerimeter(view.getPerimeterBounds(state),
                this.edgeState, next, false);

            if (tmp != null) {
                result = tmp;
            }
        }
        else {
            result = new Point(state.getCenterX(), state.getCenterY());
        }

        return result;
    },

    getSourcePerimeterPoint: function (state, next/*, me*/) {
        var result = null;
        var view = state.view;
        var sourcePerimeter = view.getPerimeterFunction(state);
        var c = new Point(state.getCenterX(), state.getCenterY());

        if (sourcePerimeter != null) {
            var theta = utils.getValue(state.style, constants.STYLE_ROTATION, 0);
            var rad = -theta * (Math.PI / 180);

            if (theta != 0) {
                next = Point.getRotatedPoint(new Point(next.x, next.y), Math.cos(rad), Math.sin(rad), c);
            }

            var tmp = sourcePerimeter(view.getPerimeterBounds(state), state, next, false);

            if (tmp != null) {
                if (theta != 0) {
                    tmp = Point.getRotatedPoint(new Point(tmp.x, tmp.y), Math.cos(-rad), Math.sin(-rad), c);
                }

                result = tmp;
            }
        }
        else {
            result = c;
        }

        return result;
    },


    updateIcons: function (/*state, icons, me*/) {
        // empty
    },

    isStopEvent: function (me) {
        return me.getState() != null;
    },

    addWaypointForEvent: function (me) {
        var point = Point.convertPoint(this.graph.container, me.getX(), me.getY());
        var dx = Math.abs(point.x - this.first.x);
        var dy = Math.abs(point.y - this.first.y);
        var addPoint = this.waypoints != null || (this.mouseDownCounter > 1 &&
            (dx > this.graph.tolerance || dy > this.graph.tolerance));

        if (addPoint) {
            if (this.waypoints === null) {
                this.waypoints = [];
            }

            var scale = this.graph.view.scale;
            point = new Point(this.graph.snap(me.getGraphX() / scale) * scale,
                this.graph.snap(me.getGraphY() / scale) * scale);
            this.waypoints.push(point);
        }
    },

    mouseUp: function (sender, me) {
        if (!me.isConsumed() && this.isConnecting()) {
            if (this.waypointsEnabled && !this.isStopEvent(me)) {
                this.addWaypointForEvent(me);
                me.consume();

                return;
            }

            // Inserts the edge if no validation error exists
            if (this.error === null) {
                var source = (this.previous != null) ? this.previous.cell : null;
                var target = null;

                if (this.constraintHandler.currentConstraint != null &&
                    this.constraintHandler.currentFocus != null) {
                    target = this.constraintHandler.currentFocus.cell;
                }

                if (target === null && this.marker.hasValidState()) {
                    target = this.marker.validState.cell;
                }

                this.connect(source, target, me.getEvent(), me.getCell());
            }
            else {
                // Selects the source terminal for self-references
                if (this.previous != null && this.marker.validState != null &&
                    this.previous.cell === this.marker.validState.cell) {
                    this.graph.selectCellForEvent(this.marker.source/*, evt*/);
                }

                // Displays the error message if it is not an empty string,
                // for empty error messages, the event is silently dropped
                if (this.error.length > 0) {
                    this.graph.validationAlert(this.error);
                }
            }

            // Redraws the connect icons and resets the handler state
            this.destroyIcons();
            me.consume();
        }

        if (this.first != null) {
            this.reset();
        }
    },

    /**
     * Function: reset
     *
     * Resets the state of this handler.
     */
    reset: function () {
        if (!isNullOrUndefined(this.shape)) {
            this.shape.destroy();
            this.shape = null;
        }

        this.destroyIcons();
        this.marker.reset();
        this.constraintHandler.reset();
        this.edgeState = null;
        this.previous = null;
        this.error = null;
        this.sourceConstraint = null;
        this.mouseDownCounter = 0;
        this.first = null;

        this.fireEvent(new EventObject(domEvent.RESET));
    },

    /**
     * Function: drawPreview
     *
     * Redraws the preview edge using the color and width returned by
     * <getEdgeColor> and <getEdgeWidth>.
     */
    drawPreview: function () {
        var valid = this.error === null;
        this.shape.strokewidth = this.getEdgeWidth(valid);
        var color = this.getEdgeColor(valid);
        this.shape.stroke = color;
        this.shape.redraw();
    },

    /**
     * Function: getEdgeColor
     *
     * Returns the color used to draw the preview edge. This returns green if
     * there is no edge validation error and red otherwise.
     *
     * Parameters:
     *
     * valid - Boolean indicating if the color for a valid edge should be
     * returned.
     */
    getEdgeColor: function (valid) {
        return (valid) ? constants.VALID_COLOR : constants.INVALID_COLOR;
    },

    /**
     * Function: getEdgeWidth
     *
     * Returns the width used to draw the preview edge. This returns 3 if
     * there is no edge validation error and 1 otherwise.
     *
     * Parameters:
     *
     * valid - Boolean indicating if the width for a valid edge should be
     * returned.
     */
    getEdgeWidth: function (valid) {
        return (valid) ? 3 : 1;
    },

    /**
     * Function: connect
     *
     * Connects the given source and target using a new edge. This
     * implementation uses <createEdge> to create the edge.
     *
     * Parameters:
     *
     * source - <mxCell> that represents the source terminal.
     * target - <mxCell> that represents the target terminal.
     * evt - Mousedown event of the connect gesture.
     * dropTarget - <mxCell> that represents the cell under the mouse when it was
     * released.
     */
    connect: function (source, target, evt, dropTarget) {
        if (target != null || this.isCreateTarget() || this.graph.allowDanglingEdges) {
            // Uses the common parent of source and target or
            // the default parent to insert the edge
            var model = this.graph.getModel();
            var terminalInserted = false;
            var edge = null;

            model.beginUpdate();
            try {
                if (source != null && target === null && this.isCreateTarget()) {
                    target = this.createTargetVertex(evt, source);

                    if (target != null) {
                        dropTarget = this.graph.getDropTarget([target], evt, dropTarget);
                        terminalInserted = true;

                        // Disables edges as drop targets if the target cell was created
                        // FIXME: Should not shift if vertex was aligned (same in Java)
                        if (dropTarget === null || !this.graph.getModel().isEdge(dropTarget)) {
                            var pstate = this.graph.getView().getState(dropTarget);

                            if (pstate != null) {
                                var tmp = model.getGeometry(target);
                                tmp.x -= pstate.origin.x;
                                tmp.y -= pstate.origin.y;
                            }
                        }
                        else {
                            dropTarget = this.graph.getDefaultParent();
                        }

                        this.graph.addCell(target, dropTarget);
                    }
                }

                var parent = this.graph.getDefaultParent();

                if (source != null && target != null &&
                    model.getParent(source) === model.getParent(target) &&
                    model.getParent(model.getParent(source)) != model.getRoot()) {
                    parent = model.getParent(source);

                    if ((source.geometry != null && source.geometry.relative) &&
                        (target.geometry != null && target.geometry.relative)) {
                        parent = model.getParent(parent);
                    }
                }

                // Uses the value of the preview edge state for inserting
                // the new edge into the graph
                var value = null;
                var style = null;

                if (this.edgeState != null) {
                    value = this.edgeState.cell.value;
                    style = this.edgeState.cell.style;
                }

                edge = this.insertEdge(parent, null, value, source, target, style);

                if (edge != null) {
                    // Updates the connection constraints
                    this.graph.setConnectionConstraint(edge, source, true, this.sourceConstraint);
                    this.graph.setConnectionConstraint(edge, target, false, this.constraintHandler.currentConstraint);

                    // Uses geometry of the preview edge state
                    if (this.edgeState != null) {
                        model.setGeometry(edge, this.edgeState.cell.geometry);
                    }

                    // Makes sure the edge has a non-null, relative geometry
                    var geo = model.getGeometry(edge);

                    if (geo === null) {
                        geo = new Geometry();
                        geo.relative = true;

                        model.setGeometry(edge, geo);
                    }

                    // Uses scaled waypoints in geometry
                    if (this.waypoints != null && this.waypoints.length > 0) {
                        var s = this.graph.view.scale;
                        var tr = this.graph.view.translate;
                        geo.points = [];

                        for (var i = 0; i < this.waypoints.length; i++) {
                            var pt = this.waypoints[i];
                            geo.points.push(new Point(pt.x / s - tr.x, pt.y / s - tr.y));
                        }
                    }

                    if (target === null) {
                        var t = this.graph.view.translate;
                        var sr = this.graph.view.scale;
                        var p = new Point(this.currentPoint.x / sr - t.x, this.currentPoint.y / sr - t.y);
                        p.x -= this.graph.panDx / this.graph.view.scale;
                        p.y -= this.graph.panDy / this.graph.view.scale;
                        geo.setTerminalPoint(p, false);
                    }

                    this.fireEvent(new EventObject(domEvent.CONNECT, 'cell', edge, 'terminal', target,
                        'event', evt, 'target', dropTarget, 'terminalInserted', terminalInserted));
                }
            }
            catch (e) {
                console.log(e.message);
            }
            finally {
                model.endUpdate();
            }

            if (this.select) {
                this.selectCells(edge, (terminalInserted) ? target : null);
            }
        }
    },

    selectCells: function (edge/*, target*/) {
        this.graph.setSelectionCell(edge);
    },

    insertEdge: function (parent, id, value, source, target, style) {
        if (this.factoryMethod === null) {
            return this.graph.insertEdge(parent, id, value, source, target, style);
        }
        else {
            var edge = this.createEdge(value, source, target, style);
            edge = this.graph.addEdge(edge, parent, source, target);

            return edge;
        }
    },

    createTargetVertex: function (evt, source) {
        // Uses the first non-relative source
        var geo = this.graph.getCellGeometry(source);

        while (geo != null && geo.relative) {
            source = this.graph.getModel().getParent(source);
            geo = this.graph.getCellGeometry(source);
        }

        var clone = this.graph.cloneCells([source])[0];
        geo = this.graph.getModel().getGeometry(clone);

        if (geo != null) {
            var t = this.graph.view.translate;
            var s = this.graph.view.scale;
            var point = new Point(this.currentPoint.x / s - t.x, this.currentPoint.y / s - t.y);
            geo.x = point.x - geo.width / 2 - this.graph.panDx / s;
            geo.y = point.y - geo.height / 2 - this.graph.panDy / s;

            // Aligns with source if within certain tolerance
            var tol = this.getAlignmentTolerance();

            if (tol > 0) {
                var sourceState = this.graph.view.getState(source);

                if (sourceState != null) {
                    var x = sourceState.x / s - t.x;
                    var y = sourceState.y / s - t.y;

                    if (Math.abs(x - geo.x) <= tol) {
                        geo.x = x;
                    }

                    if (Math.abs(y - geo.y) <= tol) {
                        geo.y = y;
                    }
                }
            }
        }

        return clone;
    },

    getAlignmentTolerance: function (/*evt*/) {
        return (this.graph.isGridEnabled()) ? this.graph.gridSize / 2 : this.graph.tolerance;
    },

    createEdge: function (value, source, target, style) {
        var edge = null;

        // Creates a new edge using the factoryMethod
        if (this.factoryMethod != null) {
            edge = this.factoryMethod(source, target, style);
        }

        if (edge === null) {
            edge = new Cell(value || '');
            edge.setEdge(true);
            edge.setStyle(style);

            var geo = new Geometry();
            geo.relative = true;
            edge.setGeometry(geo);
        }

        return edge;
    },

    destroy: function () {
        this.graph.removeMouseListener(this);

        if (this.shape != null) {
            this.shape.destroy();
            this.shape = null;
        }

        if (this.marker != null) {
            this.marker.destroy();
            this.marker = null;
        }

        if (this.constraintHandler != null) {
            this.constraintHandler.destroy();
            this.constraintHandler = null;
        }

        if (this.changeHandler != null) {
            this.graph.getModel().removeListener(this.changeHandler);
            this.graph.getView().removeListener(this.changeHandler);
            this.changeHandler = null;
        }

        if (this.drillHandler != null) {
            this.graph.removeListener(this.drillHandler);
            this.graph.getView().removeListener(this.drillHandler);
            this.drillHandler = null;
        }

        if (this.escapeHandler != null) {
            this.graph.removeListener(this.escapeHandler);
            this.escapeHandler = null;
        }
    },
});

module.exports = ConnectionHandler;

