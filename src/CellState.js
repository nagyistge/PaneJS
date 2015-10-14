
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Point = require('./Point');
var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({
    constructor: function CellState(view, cell, style) {
        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    view: null,
    cell: null,
    style: null,
    invalid: true,
    origin: null,
    absolutePoints: null,
    absoluteOffset: null,
    visibleSourceState: null,
    visibleTargetState: null,
    terminalDistance: 0,
    length: 0,
    segments: null,
    shape: null,
    text: null,

    getPerimeterBounds: function (/*border, bounds*/) {
    },

    setAbsoluteTerminalPoint: function (/*point, isSource*/) {
    },

    setCursor: function (cursor) {
        if (this.shape !== null) {
            this.shape.setCursor(cursor);
        }

        if (this.text !== null) {
            this.text.setCursor(cursor);
        }
    },

    getVisibleTerminal: function (/*source*/) {
    },
    getVisibleTerminalState: function (/*source*/) {
    },
    setVisibleTerminalState: function (/*terminalState, source*/) {
    },

    getCellBounds: function () {
    },
    getPaintBounds: function () {
    },
    updateCachedBounds: function () {
    },

    clone: function () {
    },

    destroy: function () {
    }
});

