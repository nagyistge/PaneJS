define(function(require, exports, module) {
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Class = require('../common/class');
var utils = require('../common/utils');
var domEvent = require('../events/domEvent');
var constants = require('../constants');
var Shape = require('../shapes/Shape');
var Rectangle = require('../Rectangle');

var CellHighlight = Class.create({
    constructor: function CellHighlight(graph, highlightColor, strokeWidth, dashed) {
        if (graph !== null) {
            this.graph = graph;
            this.highlightColor = (highlightColor !== null) ? highlightColor : constants.DEFAULT_VALID_COLOR;
            this.strokeWidth = (strokeWidth !== null) ? strokeWidth : constants.HIGHLIGHT_STROKEWIDTH;
            this.dashed = (dashed !== null) ? dashed : false;

            // Updates the marker if the graph changes
            this.repaintHandler = utils.bind(this, function () {
                // Updates reference to state
                if (this.state !== null) {
                    var tmp = this.graph.view.getState(this.state.cell);

                    if (tmp === null) {
                        this.hide();
                    }
                    else {
                        this.state = tmp;
                        this.repaint();
                    }
                }
            });

            this.graph.getView().on(domEvent.SCALE, this.repaintHandler);
            this.graph.getView().on(domEvent.TRANSLATE, this.repaintHandler);
            this.graph.getView().on(domEvent.SCALE_AND_TRANSLATE, this.repaintHandler);
            this.graph.getModel().on(domEvent.CHANGE, this.repaintHandler);

            // Hides the marker if the current root changes
            this.resetHandler = utils.bind(this, function () {
                this.hide();
            });

            this.graph.getView().on(domEvent.DOWN, this.resetHandler);
            this.graph.getView().on(domEvent.UP, this.resetHandler);
        }
    },

    keepOnTop: false,

    graph: true,

    state: null,

    spacing: 2,

    resetHandler: null,

    setHighlightColor: function (color) {
        this.highlightColor = color;

        if (this.shape !== null) {
            this.shape.stroke = color;
        }
    },

    drawHighlight: function () {
        this.shape = this.createShape();
        this.repaint();

        if (!this.keepOnTop && this.shape.node.parentNode.firstChild !== this.shape.node) {
            this.shape.node.parentNode.insertBefore(this.shape.node, this.shape.node.parentNode.firstChild);
        }
    },

    createShape: function () {
        var key = this.state.style[constants.STYLE_SHAPE];
        var stencil = mxStencilRegistry.getStencil(key);
        var shape = null;

        if (stencil !== null) {
            shape = new Shape(stencil);
        }
        else {
            shape = new this.state.shape.constructor();
        }

        shape.scale = this.state.view.scale;
        shape.outline = true;
        shape.points = this.state.absolutePoints;
        shape.apply(this.state);
        shape.strokewidth = this.strokeWidth / this.state.view.scale / this.state.view.scale;
        shape.arrowStrokewidth = this.strokeWidth;
        shape.stroke = this.highlightColor;
        shape.isDashed = this.dashed;
        shape.isShadow = false;

        shape.dialect = (this.graph.dialect !== constants.DIALECT_SVG) ? constants.DIALECT_VML : constants.DIALECT_SVG;
        shape.init(this.graph.getView().getOverlayPane());
        domEvent.redirectMouseEvents(shape.node, this.graph, this.state);

        if (this.graph.dialect !== constants.DIALECT_SVG) {
            shape.pointerEvents = false;
        }
        else {
            shape.svgPointerEvents = 'stroke';
        }

        return shape;
    },


    repaint: function () {
        if (this.state !== null && this.shape !== null) {
            if (this.graph.model.isEdge(this.state.cell)) {
                this.shape.points = this.state.absolutePoints;
            }
            else {
                this.shape.bounds = new Rectangle(this.state.x - this.spacing, this.state.y - this.spacing,
                    this.state.width + 2 * this.spacing, this.state.height + 2 * this.spacing);
                this.shape.rotation = Number(this.state.style[constants.STYLE_ROTATION] || '0');
            }

            // Uses cursor from shape in highlight
            if (this.state.shape !== null) {
                this.shape.setCursor(this.state.shape.getCursor());
            }

            this.shape.redraw();
        }
    },

    hide: function () {
        this.highlight(null);
    },

    highlight: function (state) {
        if (this.state !== state) {
            if (this.shape !== null) {
                this.shape.destroy();
                this.shape = null;
            }

            this.state = state;

            if (this.state !== null) {
                this.drawHighlight();
            }
        }
    },

    destroy: function () {
        this.graph.getView().removeListener(this.resetHandler);
        this.graph.getView().removeListener(this.repaintHandler);
        this.graph.getModel().removeListener(this.repaintHandler);

        if (this.shape !== null) {
            this.shape.destroy();
            this.shape = null;
        }
    },

});

module.exports = CellHighlight;


});