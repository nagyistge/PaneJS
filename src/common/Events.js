import * as utils from '../common/utils';


function triggerEvents(callbacks, args, context) {

    let pass = true;

    for (let i = 0, l = callbacks.length; i < l; i += 2) {
        pass = utils.invoke(callbacks[i], args, callbacks[i + 1] || context) !== false && pass;
    }

    return pass;
}


class Events {

    on(events, callback, context) {

        let that = this;

        if (!callback) {
            return that;
        }

        let listeners = that.__events || (that.__events = {});

        utils.forEach(utils.split(events), function (event) {
            let list = listeners[event] || (listeners[event] = []);
            list.push(callback, context);
        });

        return that;
    }

    once(events, callback, context) {

        let that = this;
        let cb = function () {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };

        return that.on(events, cb, context);
    }

    off(events, callback, context) {

        let that = this;
        let listeners = that.__events;

        // No events.
        if (!listeners) {
            return that;
        }

        // removing *all* events.
        if (!(events || callback || context)) {
            delete that.__events;
            return that;
        }

        events = events ? utils.split(events) : utils.keys(listeners);

        utils.forEach(events, function (event) {

            let list = listeners[event];

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

        let that = this;
        let listeners = that.__events;

        // No events.
        if (!listeners || !eventName) {
            return null;
        }

        let pass = true;
        let all = listeners['*'];

        utils.forEach(utils.split(eventName), function (event) {

            let callbacks;

            if (event !== '*') {
                callbacks = listeners[event];
                if (callbacks) {
                    pass = triggerEvents(callbacks, args, that) && pass;
                }
            }

            if (all) {
                pass = triggerEvents(all, [event].concat(args), that) && pass;
            }
        });

        return pass;
    }
}


// exports
// -------

export default Events;
