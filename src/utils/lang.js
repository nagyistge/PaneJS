const toString = Object.prototype.toString;


export const isNull      = val => val === null;
export const isString    = val => typeof val === 'string';
export const isBoolean   = val => typeof val === 'boolean';
export const isUndefined = val => typeof val === 'undefined';

// is null or undefined
export const isNil = val => isUndefined(val) || isNull(val);

// function and object are truly
export const isObject = val => {

    if (!val) {
        return false;
    }

    return typeof val === 'function' || typeof val === 'object';
};

export const isType = (val, type) => {
    return toString.call(val) === '[object ' + type + ']';
};

export const isArray    = val => Array.isArray(val);
export const isWindow   = val => val && val === val.window;
export const isNumeric  = val => !isArray(val) && (val - parseFloat(val) + 1) >= 0;
export const isFunction = val => isType(val, 'Function');

export const isArrayLike = val => {

    if (isArray(val)) {
        return true;
    }

    if (isFunction(val) || isWindow(val)) {
        return false;
    }

    let len = !!val && 'length' in val && val.length;

    return len === 0 || typeof len === 'number' && len > 0 && (len - 1) in val;
};
