import { isString, isNil } from './lang';

function isFinite(value) {

    return window.isFinite(value) && !window.isNaN(parseFloat(value));
}

function isPercentage(str) {

    return isString(str) && str.slice(-1) === '%';
}

function toInt(value) {

    return parseInt(value, 10);
}

function toFloat(value, percentage) {

    let v = parseFloat(value);
    return percentage ? v / 100 : v;
}

function toFixed(value, precision = 2) {

    let power = Math.pow(10, precision);

    return toFloat((Math.round(value * power) / power).toFixed(precision));
}

function fixNumber(num, percentage, defaultValue) {

    let ret = toFloat(num, percentage);

    return isNaN(ret) ? defaultValue : ret;
}

function fixIndex(index, max) {

    if (isNil(index)) {
        return max;
    }

    while (index < 0) {
        index += max;
    }

    return Math.min(index, max);
}

function clamp(value, min, max) {

    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value);
}


// exports
// -------

export {
    toInt,
    toFloat,
    toFixed,

    isFinite,
    isPercentage,

    fixIndex,
    fixNumber,

    clamp
};
