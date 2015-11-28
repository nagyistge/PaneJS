import {
    keys,
    invoke,
    forEach,
} from '../common/utils';

const splitter = /\s+/;

function triggerEvents(callbacks, args, context) {

    var result = true;

    for (let i = 0, l = callbacks.length; i < l; i += 2) {
        result = invoke(callbacks[i], args, callbacks[i + 1] || context) && result;
    }

    return result;
}

class Events {

    on(events, callback, context) {

        var that = this;

        if (!callback) {
            return that;
        }

        var listeners = that.__events || (that.__events = {});

        events = events.split(splitter);

        forEach(events, function (event) {
            var list = listeners[event] || (listeners[event] = []);
            list.push(callback, context);
        });

        return that;
    }

    once(events, callback, context) {

        var that = this;
        var cb = function () {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };

        return that.on(events, cb, context);
    }

    off(events, callback, context) {

        var that = this;
        var listeners = that.__events;

        // No events.
        if (!listeners) {
            return that;
        }

        // removing *all* events.
        if (!(events || callback || context)) {
            delete that.__events;
            return that;
        }

        events = events ? events.split(splitter) : keys(listeners);

        forEach(events, function (event) {

            var list = listeners[event];

            if (!list) {
                return;
            }

            // remove all event.
            if (!(callback || context)) {
                delete listeners[event];
                return;
            }

            for (let i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback ||
                    context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        });

        return that;
    }

    trigger(eventName, ...args) {

        var that = this;
        var listeners = that.__events;

        // No events.
        if (!listeners || !eventName) {
            return null;
        }

        var result = true;
        var commonCallbacks = listeners['*'];

        forEach(eventName.split(splitter), function (event) {

            var callbacks;

            if (event !== '*') {
                callbacks = listeners[event];
                if (callbacks) {
                    triggerEvents(callbacks, args, that);
                }
            }

            if (commonCallbacks) {
                triggerEvents(commonCallbacks, [event].concat(args), that);
            }
        });

        return result;
    }
}

export default Events;