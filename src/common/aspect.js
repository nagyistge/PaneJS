
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var utils = require('./utils');

var isFunction = utils.isFunction;
var each = utils.each;
var invoke = utils.invoke;
var toArray = utils.toArray;
var eventSplitter = /\s+/;


function weave(when, methodName, callback, context) {
    var that = this;
    var names = methodName.split(eventSplitter);

    each(names, function (name) {
        var method = that[name];

        if (!method || !isFunction(method)) {
            throw new Error('Invalid method name: ' + name);
        }

        if (!method.__isAspected) {
            wrap.call(that, name);
        }

        that.on(when + ':' + name, callback, context);
    });

    return that;
}

function wrap(methodName) {
    var that = this;
    var old = that[methodName];

    that[methodName] = function () {
        var that = this;
        var args = toArray(arguments);
        var beforeArgs = ['before:' + methodName].concat(args);

        // prevent if trigger return false
        if (invoke(that.trigger, beforeArgs, that) === false) {
            return;
        }

        // call the origin method.
        var ret = old.apply(this, arguments);
        var afterArgs = ['after:' + methodName, ret].concat(args);
        invoke(that.trigger, afterArgs, that);

        return ret;
    };

    that[methodName].__isAspected = true;
}

module.exports = {
    before: function (methodName, callback, context) {
        return weave.call(this, 'before', methodName, callback, context);
    },
    after: function (methodName, callback, context) {
        return weave.call(this, 'after', methodName, callback, context);
    },
    around: function (methodName, callback, context) {
        weave.call(this, 'before', methodName, callback, context);
        weave.call(this, 'after', methodName, callback, context);
        return this;
    }
};

