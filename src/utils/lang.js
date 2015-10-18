var arrProto = Array.prototype;
var objProto = Object.prototype;
var slice = arrProto.slice;
var toString = objProto.toString;


var isType = exports.isType = function (obj, type) {
    return toString.call(obj) === '[object ' + type + ']';
};

exports.isObject = function (obj) {

    if (!obj) {
        return false;
    }

    var type = typeof obj;

    return type === 'function' || type === 'object';
};

exports.isFunction = function (obj) {
    return isType(obj, 'Function');
};

var isNull = exports.isNull = function (obj) {
    return obj === null;
};

var isUndefined = exports.isUndefined = function (obj) {
    return typeof obj === 'undefined';
};

exports.isNullOrUndefined = function (obj) {
    return isUndefined(obj) || isNull(obj);
};

exports.isWindow = function (obj) {
    return obj && obj === obj.window;
};

var isArray = exports.isArray = Array.isArray || function (obj) {
        return isType(obj, 'Array');
    };

exports.isArrayLike = function (obj) {
    if (isArray(obj)) {
        return true;
    }

    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    var length = !!obj && 'length' in obj && obj.length;

    return length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
};

exports.isNumeric = function (obj) {
    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
};
