function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return typeof obj === 'undefined';
}

function isString(obj) {
    return typeof obj === 'string';
}

function isBoolean(obj) {
    return typeof obj === 'boolean';
}

function isNullOrUndefined(obj) {
    return isUndefined(obj) || isNull(obj);
}

function isType(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

function isObject(obj) {
    if (!obj) {
        return false;
    }

    var type = typeof obj;

    return type === 'function' || type === 'object';
}

function isFunction(obj) {
    return isType(obj, 'Function');
}

function isWindow(obj) {
    return obj && obj === obj.window;
}

function isArray(obj) {
    return Array.isArray(obj);
}

function isArrayLike(obj) {
    if (isArray(obj)) {
        return true;
    }

    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    var length = !!obj && 'length' in obj && obj.length;

    return length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isNumeric(obj) {
    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}

export {
    isNull,
    isType,
    isArray,
    isObject,
    isString,
    isWindow,
    isBoolean,
    isNumeric,
    isFunction,
    isArrayLike,
    isUndefined,
    isNullOrUndefined,
};