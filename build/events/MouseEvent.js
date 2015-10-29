define(function(require, exports, module) {
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
var detector = require('../common/detector');
var utils = require('../common/utils');
var domEvent = require('./domEvent');

module.exports = Class.create({
    constructor: function MouseEvent(evt, state) {
        var that = this;

        that.evt = evt;
        that.state = state;

    },

    consumed: false,
    graphX: null,
    graphY: null,

    getEvent:function(){
        return this.evt;
    },

    /**
     * Function: getSource
     *
     * Returns the target DOM element using <mxEvent.getSource> for <evt>.
     */
    getSource: function () {
        return domEvent.getSource(this.evt);
    },

    isSource: function (shape) {
        if (shape != null) {
            return utils.isAncestorNode(shape.node, this.getSource());
        }
        return false;
    },

    getX: function () {
        return domEvent.getClientX(this.getEvent());
    },

    getY: function () {
        return domEvent.getClientY(this.getEvent());
    },

    getGraphX: function () {
        return this.graphX;
    },

    getGraphY: function () {
        return this.graphY;
    },

    getState: function () {
        return this.state;
    },

    getCell: function () {
        var state = this.getState();

        if (state !== null) {
            return state.cell;
        }

        return null;
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function (preventDefault) {
        preventDefault = (preventDefault !== null) ? preventDefault : true;

        if (preventDefault && this.evt.preventDefault) {
            this.evt.preventDefault();
        }

        // Workaround for images being dragged in IE
        // Does not change returnValue in Opera
        if (detector.IS_IE) {
            this.evt.returnValue = true;
        }

        // Sets local consumed state
        this.consumed = true;
    },
});

});