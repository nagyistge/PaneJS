import { isString } from './lang';

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

export {
    toInt,
    toFloat,
    toFixed,
    isPercentage
};
