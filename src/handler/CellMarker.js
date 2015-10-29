
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var EventObject = require('../events/EventObject');
var EventSource = require('../events/EventSource');
var domEvent = require('../events/domEvent');
var constants = require('../constants');
var CellHighlight = require('./CellHighlight');
var EventSource = require('../events/EventSource');
//var utils = require('../common/utils');
var Rectangle = require('../Rectangle');

var CellMarker = EventSource.extend({
    constructor: function CellMarker(graph, validColor, invalidColor, hotspot) {
        EventSource.call(this);

        if (graph !== null) {
            this.graph = graph;
            this.validColor = (validColor !== null) ? validColor : constants.DEFAULT_VALID_COLOR;
            this.invalidColor = (validColor !== null) ? invalidColor : constants.DEFAULT_INVALID_COLOR;
            this.hotspot = (hotspot !== null) ? hotspot : constants.DEFAULT_HOTSPOT;

            this.highlight = new CellHighlight(graph);
        }
    },

    currentColor   : null,
    enabled        : true,
    graph          : null,
    invalidColor   : null,
    markedState    : null,
    validColor     : null,
    validState     : null,
    hotspotEnabled : false,
    hotspot        : constants.DEFAULT_HOTSPOT,

    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    isEnabled: function () {
        return this.enabled;
    },

    setHotspot: function (hotspot) {
        this.hotspot = hotspot;
    },

    getHotspot: function () {
        return this.hotspot;
    },

    setHotspotEnabled: function (enabled) {
        this.hotspotEnabled = enabled;
    },

    isHotspotEnabled: function () {
        return this.hotspotEnabled;
    },

    hasValidState: function () {
        return this.validState !== null;
    },

    getValidState: function () {
        return this.validState;
    },

    getMarkedState: function () {
        return this.markedState;
    },

    reset: function () {
        this.validState = null;

        if (this.markedState !== null) {
            this.markedState = null;
            this.unmark();
        }
    },

    process: function (me) {
        var state = null;

        if (this.isEnabled()) {
            state = this.getState(me);
            this.setCurrentState(state, me);
        }

        return state;
    },

    setCurrentState: function (state, me, color) {
        var isValid = (state !== null) ? this.isValidState(state) : false;
        color = (color !== null) ? color : this.getMarkerColor(me.getEvent(), state, isValid);

        if (isValid) {
            this.validState = state;
        }
        else {
            this.validState = null;
        }

        if (state !== this.markedState || color !== this.currentColor) {
            this.currentColor = color;

            if (state !== null && this.currentColor !== null) {
                this.markedState = state;
                this.mark();
            }
            else if (this.markedState !== null) {
                this.markedState = null;
                this.unmark();
            }
        }
    },

    markCell: function (cell, color) {
        var state = this.graph.getView().getState(cell);

        if (state !== null) {
            this.currentColor = (color !== null) ? color : this.validColor;
            this.markedState = state;
            this.mark();
        }
    },

    mark: function () {
        this.highlight.setHighlightColor(this.currentColor);
        this.highlight.highlight(this.markedState);
        this.fireEvent(new EventObject(domEvent.MARK, 'state', this.markedState));
    },

    unmark: function () {
        this.mark();
    },

    isValidState: function (/*state*/) {
        return true;
    },

    getMarkerColor: function (evt, state, isValid) {
        return (isValid) ? this.validColor : this.invalidColor;
    },

    getState: function (me) {
        var view = this.graph.getView();
        var cell = this.getCell(me);
        var state = this.getStateToMark(view.getState(cell));

        return (state !== null && this.intersects(state, me)) ? state : null;
    },

    getCell: function (me) {
        return me.getCell();
    },

    getStateToMark: function (state) {
        return state;
    },

    intersects: function (state, me) {
        if (this.hotspotEnabled) {
            return Rectangle.intersectsHotspot(state, me.getGraphX(), me.getGraphY(),
                this.hotspot, constants.MIN_HOTSPOT_SIZE,
                constants.MAX_HOTSPOT_SIZE);
        }

        return true;
    },

    destroy: function () {
        this.graph.getView().removeListener(this.resetHandler);
        this.graph.getModel().removeListener(this.resetHandler);
        this.highlight.destroy();
    },
});

module.exports = CellMarker;


