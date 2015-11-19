import {
    keys,
    each
} from '../common/utils';

import Base        from '../lib/Base';
import EventObject from  './EventObject';

var eventSplitter = /\s+/;

export default Base.extend({

    eventEnabled: true,

    constructor: function EventSource() {},

    enableEvent() {
        this.eventsEnabled = true;
        return this;
    },

    disableEvent() {
        this.eventsEnabled = false;
        return this;
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

    emit: function (eventName, data, sender) {

        var that = this;
        var listeners = that.eventListeners;

        // No events.
        if (!listeners || !eventName || !that.eventEnabled) {
            return null;
        }

        var returned = []; // 返回每个回调函数返回值组成的数组
        var eventObj = new EventObject(eventName, data);
        sender = sender || that;

        var list = listeners[eventName];
        var length = list ? list.length : 0;
        var ret;

        for (var i = 0; i < length; i += 2) {
            ret = list[i].call(list[i + 1] || that, eventObj, sender);
            returned.push(ret);
        }

        return returned;
    }
});
