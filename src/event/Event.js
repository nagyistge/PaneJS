var utils = require('./utils');
var Class = require('../class');
var EventObject = require('./EventObject');

var keys = utils.keys;
var each = utils.each;
var eventSplitter = /\s+/;


module.exports = Class.create({

    eventListeners: null,
    eventEnabled: true,
    eventSource: null,

    constructor: function Events() {},

    isEventEnabled: function () {
        return this.eventEnabled;
    },

    setIsEventEnabled: function (enabled) {
        var that = this;
        that.eventEnabled = enabled;
        return that;
    },

    enableEvent: function () {
        return this.setIsEventEnabled(true);
    },

    disableEvent: function () {
        return this.setIsEventEnabled(false);
    },

    getEventSource: function () {
        return this.eventSource;
    },

    setEventSource: function (value) {
        var that = this;
        that.eventSource = value;
        return that;
    },

    on: function (events, callback, context) {

        var that = this;

        if (!callback) {
            return that;
        }

        var listeners = that.eventListeners || (that.eventListeners = {});

        events = events.split(eventSplitter);

        each(events, function (event) {
            var list = listeners[event] || (listeners[event] = []);
            list.push(callback, context);
        });

        return that;
    },

    once: function (events, callback, context) {

        var that = this;
        var cb = function () {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };

        return that.on(events, cb, context);
    },

    off: function (events, callback, context) {

        var that = this;
        var listeners = that.eventListeners;

        // No events.
        if (!listeners) {
            return that;
        }

        // removing *all* events.
        if (!(events || callback || context)) {
            delete that.eventListeners;
            return that;
        }

        events = events ? events.split(eventSplitter) : keys(listeners);

        each(events, function (event) {

            var list = listeners[event];

            if (!list) {
                return;
            }

            // remove all event.
            if (!(callback || context)) {
                delete listeners[event];
                return;
            }

            for (var i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback ||
                    context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        });

        return that;
    },

    emit: function (eventObj, sender) {
        var that = this;
        var returned = [];
        var listeners = that.eventListeners;

        // No events.
        if (!listeners || !that.isEventEnabled()) {
            return returned;
        }

        eventObj = eventObj || new EventObject();

        var eventName = eventObj.getName();

        if (!eventName) {
            return returned;
        }

        // fix sender
        sender = sender || that.getEventSource();
        sender = sender || that;


        var list = listeners[eventName];
        var length = list ? list.length : 0;
        var ret;

        for (var i = 0; i < length; i += 2) {
            ret = list[i].call(list[i + 1] || that, eventObj, sender);
            if (length > 2) {
                returned.push(ret); // result as array
            } else {
                returned = ret;
            }
        }

        return returned;
    }
});
