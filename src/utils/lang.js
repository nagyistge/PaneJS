let objProto = Object.prototype;
let toString = objProto.toString;
let hasOwn   = objProto.hasOwnProperty;


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

function isNullOrUndefined(obj) {

    return isUndefined(obj) || isNull(obj);
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

function isPlainObject(obj) {

    // Not plain objects:
    //  - Any object or value whose internal [[Class]] property is not "[object Object]"
    //  - DOM nodes
    //  - window
    if (!isObject(obj) || obj.nodeType || isWindow(obj)) {
        return false;
    }

    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
}

function isEmptyObject(obj) {

    /* eslint guard-for-in: 0 */
    /* eslint no-unused-vars: 0 */
    for (let name in obj) {
        return false;
    }

    return true;
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
    isPlainObject,
    isEmptyObject,
    isNullOrUndefined,
};
