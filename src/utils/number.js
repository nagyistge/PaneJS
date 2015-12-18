import { isString } from './lang';

function isFinite(value) {
    return window.isFinite(value) && !window.isNaN(parseFloat(value));
}

function isPercentage(str) {
    return isString(str) && str.slice(-1) === '%';
}

function toInt(value) {
    return parseInt(value, 10);
}

function toFloat(value, isPercentage) {
    var v = parseFloat(value);
    return isPercentage ? v / 100 : v;
}

function toFixed(value, precision) {
    var power = Math.pow(10, precision);
    return toFloat((Math.round(value * power) / power).toFixed(precision));
}

function fixNumber(num, isPercentage, defaultValue) {
    var ret = toFloat(num, isPercentage);

    return isNaN(ret) ? defaultValue : ret;
}

export {
    toInt,
    toFloat,
    toFixed,
    isFinite,
    isPercentage,
    fixNumber
};
