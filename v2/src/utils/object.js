define([
    './lang',
    './array'
], function (
    lang,
    array
) {
    'use strict';

    var isFunction = lang.isFunction;
    var isUndefined = lang.isUndefined;
    var indexOf = array.indexOf;
    var hasOwn = Object.prototype.hasOwnProperty;
    var slice = Array.prototype.slice;

    var hasKey = exports.hasKey = function hasKey(obj, key) {
        return obj !== null && hasOwn.call(obj, key);
    };

    var keys = exports.keys = Object.keys || function (obj) {
            // ie < 9 不考虑

            var keys = [];

            if (isObject(obj)) {
                for (var key in obj) {
                    if (hasKey(obj, key)) {
                        keys.push(key);
                    }
                }
            }

            return keys;
        };

    function forIn(list, iterator, context, deep) {
        for (var key in list) {
            if (deep || hasKey(list, key)) {
                iterator.call(context, list[key], key, list);
            }
        }
    }

    function clone(obj, transients, shallow) {
        shallow = !!shallow;

        var cloned = null;

        if (obj && isFunction(obj.constructor)) {
            cloned = new obj.constructor();

            for (var key in obj) {
                if (key !== mxObjectIdentity.FIELD_NAME && (!transients || indexOf(transients, key) < 0)) {
                    if (!shallow && typeof obj[key] === 'object') {
                        cloned[key] = clone(obj[key]);
                    } else {
                        cloned[key] = obj[key];
                    }
                }
            }
        }

        return cloned;
    }

    function extend(dist) {

        if (!dist) {
            dist = {};
        }

        var sources = slice.call(arguments, 1);

        for (var i = 0, length = sources.length; i < length; i++) {
            var source = sources[i];

            forIn(source, function () {
                dist[key] = source[key];
            });
        }

        return dist;
    }

    function getValue(obj, key, defaultValue) {
        var value = obj[key];

        if (isUndefined(value)) {
            value = defaultValue;
        }

        return value;
    }

    function getNumber(obj, key, defaultValue) {
        var value = obj ? obj[key] : null;

        if (isUndefined(value)) {
            value = defaultValue || 0;
        }

        return Number(value);
    }

    return {
        hasKey: hasKey,
        keys: keys,
        forIn: forIn,
        clone: clone,
        extend: extend,
        getValue: getValue,
        getNumber: getNumber
    };
});
