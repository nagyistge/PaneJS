import {
    isFunction,
    toArray,
    each,
    some,
    invoke
} from '../common/utils';

var eventSplitter = /\s+/;


function weave(when, methodName, callback, context) {

    var that = this;
    var names = methodName.split(eventSplitter);

    each(names, function (name) {
        var method = that[name];

        if (!method || !isFunction(method)) {
            throw new Error('Event handler must be function, event name: ' + name);
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
    var originMethod = that[methodName];

    that[methodName] = function () {
        var that = this;
        var args = toArray(arguments);
        var beforeArgs = ['before:' + methodName].concat(args);

        // 检查每个回调的返回值，如果任何一个结果为 false，则直接返回
        var results = invoke(that.emit, beforeArgs, that);
        var returned = some(results || [], function (result) {
            return result === false;
        });
        if (returned) {
            return;
        }

        // 调用原方法
        var ret = originMethod.apply(this, arguments);
        var afterArgs = ['after:' + methodName, ret].concat(args);
        //
        invoke(that.emit, afterArgs, that);

        return ret;
    };

    that[methodName].__isAspected = true;
}

function before(methodName, callback, context) {
    return weave.call(this, 'before', methodName, callback, context);
}

function after(methodName, callback, context) {
    return weave.call(this, 'after', methodName, callback, context);
}

function around(methodName, callback, context) {
    weave.call(this, 'before', methodName, callback, context);
    weave.call(this, 'after', methodName, callback, context);
    return this;
}

export {
    before,
    after,
    around
};
