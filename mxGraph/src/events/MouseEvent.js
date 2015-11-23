import {
    each,
    filter,
    indexOf,
    clone,
    isNode,
    isFunction,
    isNullOrUndefined
} from '../common/utils';

import Base from '../lib/Base';
import domEvent from './domEvent'

export default Base.extend({
    constructor: function Cell(evt, state) {

        var that = this;

        that.event = evt;
        that.state = state;
        that.consumed = false;
    },

    getEvent: function () {
        return this.event;
    },

    getState: function () {
        return this.state;
    },

    getCell: function () {
        return this.state ? this.state.cell : null;
    },

    getSource: function () {
        return domEvent.getSource(this.event);
    },

    isSource: function (shape) {

    },

    getClientX: function () {
        return domEvent.getClientX(this.event);
    },

    getClientY: function () {
        return domEvent.getClientY(this.event);
    },

    getGraphX: function () {
        return this.graphX;
    },

    getGraphY: function () {
        return this.graphY;
    },

    isPopupTrigger: function () {
        return domEvent.isPopupTrigger(this.event);
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function (preventDefault = true) {

        var that = this;

        if (preventDefault) {
            var e = that.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        }
        that.consumed = true;

        return that;
    }
});