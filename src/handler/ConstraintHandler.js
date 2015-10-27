
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('../common/class');
//var Image = require('../Image');
var constants = require('../constants');
var domEvent = require('../events/domEvent');
var Rectangle = require('../Rectangle');
var RectangleShape = require('../shapes/RectangleShape');
var ImageShape = require('../shapes/ImageShape');
var utils = require('../common/utils');
var detector = require('../common/detector');

var ConstraintHandler = Class.create({
    constructor: function ConstraintHandler(graph) {
        this.graph = graph;
    },

    enabled        : true,
    graph          : null,
    highlightColor : constants.DEFAULT_VALID_COLOR,
    //pointImage     : new Image(mxClient.imageBasePath + '/point.gif', 5, 5),

    isEnabled: function () {
        return this.enabled;
    },

    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    reset: function () {
        if (this.focusIcons !== null) {
            for (var i = 0; i < this.focusIcons.length; i++) {
                this.focusIcons[i].destroy();
            }

            this.focusIcons = null;
        }

        if (this.focusHighlight !== null) {
            this.focusHighlight.destroy();
            this.focusHighlight = null;
        }

        this.currentConstraint = null;
        this.currentFocusArea = null;
        this.currentPoint = null;
        this.currentFocus = null;
        this.focusPoints = null;
    },

    getTolerance: function (/*me*/) {
        return this.graph.getTolerance();
    },

    getImageForConstraint: function (/*state, constraint, point*/) {
        return this.pointImage;
    },

    isEventIgnored: function (/*me, source*/) {
        return false;
    },

    isStateIgnored: function (/*state, source*/) {
        return false;
    },

    destroyIcons: function () {
        if (this.focusIcons !== null) {
            for (var i = 0; i < this.focusIcons.length; i++) {
                this.focusIcons[i].destroy();
            }

            this.focusIcons = null;
            this.focusPoints = null;
        }
    },

    destroyFocusHighlight: function () {
        if (this.focusHighlight !== null) {
            this.focusHighlight.destroy();
            this.focusHighlight = null;
        }
    },

    isKeepFocusEvent: function (me) {
        return domEvent.isShiftDown(me.getEvent());
    },

    update: function (me, source) {
        if (this.isEnabled() && !this.isEventIgnored(me)) {
            var tol = this.getTolerance(me);
            var mouse = new Rectangle(me.getGraphX() - tol, me.getGraphY() - tol, 2 * tol, 2 * tol);
            var cst = (me.getState() !== null && !this.isStateIgnored(me.getState(), source)) ?
                this.graph.getAllConnectionConstraints(me.getState(), source) : null;

            // Keeps focus icons visible while over vertex bounds and no other cell under mouse or shift is pressed
            if (!this.isKeepFocusEvent(me) && (this.currentFocusArea === null || this.currentFocus === null ||
                (me.getState() !== null && cst !== null) || !this.graph.getModel().isVertex(this.currentFocus.cell) || !utils.intersects(this.currentFocusArea, mouse)) && (me.getState() !== this.currentFocus &&
                (me.getCell() === null || this.graph.isCellConnectable(me.getCell())))) {
                this.currentFocusArea = null;
                this.currentFocus = null;
                this.constraints = cst;

                // Only uses cells which have constraints
                if (this.constraints !== null) {
                    this.currentFocus = me.getState();
                    this.currentFocusArea = new Rectangle(me.getState().x, me.getState().y, me.getState().width, me.getState().height);

                    if (this.focusIcons !== null) {
                        for (var i = 0; i < this.focusIcons.length; i++) {
                            this.focusIcons[i].destroy();
                        }

                        this.focusIcons = null;
                        this.focusPoints = null;
                    }

                    this.focusIcons = [];
                    this.focusPoints = [];

                    for (var j = 0; j < this.constraints.length; j++) {
                        var cp = this.graph.getConnectionPoint(me.getState(), this.constraints[j]);
                        var img = this.getImageForConstraint(me.getState(), this.constraints[j], cp);

                        var src = img.src;
                        var bounds = new Rectangle(cp.x - img.width / 2,
                            cp.y - img.height / 2, img.width, img.height);
                        var icon = new ImageShape(bounds, src);
                        icon.dialect = (this.graph.dialect !== constants.DIALECT_SVG) ?
                            constants.DIALECT_MIXEDHTML : constants.DIALECT_SVG;
                        icon.preserveImageAspect = false;
                        icon.init(this.graph.getView().getDecoratorPane());

                        // Fixes lost event tracking for images in quirks / IE8 standards
                        if (detector.IS_QUIRKS || document.documentMode === 8) {
                            domEvent.on(icon.node, 'dragstart', function (evt) {
                                domEvent.consume(evt);

                                return false;
                            });
                        }

                        // Move the icon behind all other overlays
                        if (icon.node.previousSibling !== null) {
                            icon.node.parentNode.insertBefore(icon.node, icon.node.parentNode.firstChild);
                        }

                        var getState = utils.bind(this, function () {
                            return (this.currentFocus !== null) ? this.currentFocus : me.getState();
                        });

                        icon.redraw();

                        domEvent.redirectMouseEvents(icon.node, this.graph, getState);
                        this.currentFocusArea.add(icon.bounds);
                        this.focusIcons.push(icon);
                        this.focusPoints.push(cp);
                    }

                    this.currentFocusArea.grow(tol);
                }
                else {
                    this.destroyIcons();
                    this.destroyFocusHighlight();
                }
            }

            this.currentConstraint = null;
            this.currentPoint = null;
            var minDistSq = null;

            if (this.focusIcons !== null && this.constraints !== null &&
                (me.getState() === null || this.currentFocus === me.getState())) {
                for (var k = 0; k < this.focusIcons.length; k++) {
                    var dx = me.getGraphX() - this.focusIcons[k].bounds.getCenterX();
                    var dy = me.getGraphY() - this.focusIcons[k].bounds.getCenterY();
                    var tmp = dx * dx + dy * dy;

                    if (utils.intersects(this.focusIcons[k].bounds, mouse) && (minDistSq === null || tmp < minDistSq)) {
                        this.currentConstraint = this.constraints[k];
                        this.currentPoint = this.focusPoints[k];
                        minDistSq = tmp;

                        tmp = this.focusIcons[k].bounds.clone();
                        tmp.grow((detector.IS_IE) ? 3 : 2);

                        if (detector.IS_IE) {
                            tmp.width -= 1;
                            tmp.height -= 1;
                        }

                        if (this.focusHighlight === null) {
                            var hl = new RectangleShape(tmp, null, this.highlightColor, 3);
                            hl.pointerEvents = false;

                            hl.dialect = (this.graph.dialect === constants.DIALECT_SVG) ?
                                constants.DIALECT_SVG : constants.DIALECT_VML;
                            hl.init(this.graph.getView().getOverlayPane());
                            this.focusHighlight = hl;

                            var getState1 = utils.bind(this, function () {
                                return (this.currentFocus !== null) ? this.currentFocus : me.getState();
                            });

                            domEvent.redirectMouseEvents(hl.node, this.graph, getState1);
                        }
                        else {
                            this.focusHighlight.bounds = tmp;
                            this.focusHighlight.redraw();
                        }
                    }
                }
            }

            if (this.currentConstraint === null) {
                this.destroyFocusHighlight();
            }
        }
        else {
            this.currentConstraint = null;
            this.currentFocus = null;
            this.currentPoint = null;
        }
    },

    destroy: function () {
        this.reset();
    },

});

module.exports = ConstraintHandler;

