
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var utils = require('./utils');

var isFunction = utils.isFunction;
var invoke = utils.invoke;
var keys = utils.keys;
var each = utils.each;
var eventSplitter = /\s+/;

function Events() {}

Events.prototype.on = function (events, callback, context) {

    var that = this;

    if (!callback) {
        return that;
    }

    var cache = this.__events || (this.__events = {});

    events = events.split(eventSplitter);

    each(events, function (event) {
        var list = cache[event] || (cache[event] = []);
        list.push(callback, context);
    });

    return that;
};

Events.prototype.once = function (events, callback, context) {

    var that = this;
    var cb = function () {
        that.off(events, cb);
        callback.apply(context || that, arguments);
    };

    return that.on(events, cb, context);
};

Events.prototype.off = function (events, callback, context) {

    var that = this;
    var cache = that.__events;

    // No events.
    if (!cache) {
        return that;
    }

    // removing *all* events.
    if (!(events || callback || context)) {
        delete that.__events;
        return that;
    }

    events = events ? events.split(eventSplitter) : keys(cache);

    each(events, function (event) {

        var list = cache[event];

        if (!list) {
            return;
        }

        // remove all event.
        if (!(callback || context)) {
            delete cache[event];
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
};

Events.prototype.trigger = function (events) {

    var that = this;
    var cache = that.__events;

    // No events.
    if (!cache) {
        return that;
    }

    events = events.split(eventSplitter);

    var returned = true;
    var args;

    each(arguments, function (arg, index) {
        if (index > 0) {
            args[index - 1] = arg;
        }
    });

    each(events, function (event) {
        var all = cache['*'];
        var list = cache[event];

        // Copy callback lists to prevent modification.
        all = all && all.slice();
        list = list && list.slice();

        // Execute event callbacks except one named '*'
        if (event !== '*') {
            returned = triggerEvents(list, args, this) && returned;
        }

        // Execute '*' callbacks.
        returned = triggerEvents(all, [event].concat(args), this) && returned;
    });

    return returned;
};

Events.prototype.emit = Events.prototype.trigger;

Events.mixTo = function (receiver) {
    var proto = Events.prototype;

    if (isFunction(receiver)) {
        each(proto, function (value, key) {
            receiver.prototype[key] = value;
        });
    } else {
        var event = new Events();
        each(proto, function (value, key) {
            receiver[key] = function () {
                invoke(value, arguments, event);
            };
        });
    }
};

function triggerEvents(list, args, context) {
    var ret = true;

    if (list) {
        for (var i = 0, l = list.length; i < l; i += 2) {
            ret = invoke(list[i], args, list[i + 1] || context) !== false && ret;
        }
    }
    // trigger will return false if one of the callbacks return false
    return ret;
}

module.exports = Events;

