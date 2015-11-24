import { forEach } from './array'

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

function extend(dist) {

    if (!dist) {
        dist = {};
    }

    for (var i = 1, length = arguments.length; i < length; i++) {
        var source = arguments[i];
        source && forIn(source, function (value, key) {
            dist[key] = value;
        });
    }

    return dist;
}

export {
    hasKey,
    keys,
    forIn,
    extend
};
