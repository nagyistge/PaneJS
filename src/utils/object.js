import { forEach } from './array'
import { isArray, isPlainObject } from './lang';

function hasKey(obj, key) {
    return obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}

function keys(obj) {
    return obj ? Object.keys(obj) : [];
}

function forIn(obj, iterator, context) {
    forEach(keys(obj), function (key) {
        iterator.call(context, obj[key], key);
    });
}

function extend(target) {

    if (!target) {
        target = {};
    }

    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];

        if (source) {
            for (var key in source) {
                target[key] = source[key];
            }
        }
    }

    return target;
}

function merge(target) {

    if (!target) {
        target = {};
    }

    for (var i = 1, l = arguments.length; i < l; i++) {

        var source = arguments[i];
        if (source) {
            for (var name in source) {

                var src = target[name];
                var copy = source[name];
                var copyIsArray = isArray(copy);

                if (copyIsArray || isPlainObject(copy)) {

                    var clone;
                    if (copyIsArray) {
                        clone = src && isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    target[name] = merge(clone, copy);

                } else {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}

export {
    hasKey,
    keys,
    forIn,
    merge,
    extend
};
