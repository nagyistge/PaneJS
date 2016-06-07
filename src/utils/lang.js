let objProto = Object.prototype;
let toString = objProto.toString;


function isNull(obj) {

    return obj === null;
}

function isUndefined(obj) {

    return typeof obj === 'undefined';
}

function isNil(obj) {

    return isUndefined(obj) || isNull(obj);
}

function isString(obj) {

    return typeof obj === 'string';
}

function isBoolean(obj) {

    return typeof obj === 'boolean';
}

function isType(obj, type) {

    return toString.call(obj) === '[object ' + type + ']';
}

function isObject(obj) {

    if (!obj) {
        return false;
    }

    let type = typeof obj;

    return type === 'function' || type === 'object';
}

function isWindow(obj) {

    return obj && obj === obj.window;
}

function isFunction(obj) {

    return isType(obj, 'Function');
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

    let length = !!obj && 'length' in obj && obj.length;

    return length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isNumeric(obj) {

    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}


// exports
// -------

export {
    isNil,
    isNull,
    isType,
    isArray,
    isWindow,
    isObject,
    isString,
    isBoolean,
    isNumeric,
    isFunction,
    isArrayLike,
    isUndefined,
};
