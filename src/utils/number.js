import { isString, isNil } from './lang';

export function isFinite(value) {

  return window.isFinite(value) && !window.isNaN(parseFloat(value));
}

export function isPercentage(str) {

  return isString(str) && str.slice(-1) === '%';
}

export function toInt(value) {

  return parseInt(value, 10);
}

export function toFloat(value, percentage) {

  let v = parseFloat(value);
  return percentage ? v / 100 : v;
}

export function toPercentage(value, precision = 2) {

  return toFixed(value * 100, precision) + '%';
}

export function toFixed(value, precision = 2) {

  let power = Math.pow(10, precision);

  return toFloat((Math.round(value * power) / power).toFixed(precision));
}

export function fixNumber(num, percentage, defaultValue) {

  let ret = toFloat(num, percentage);

  return isNaN(ret) ? defaultValue : ret;
}

export function fixIndex(index, max) {

  if (isNil(index)) {
    return max;
  }

  while (index < 0) {
    index += max;
  }

  return Math.min(index, max);
}

export function clamp(value, min, max) {

  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
}

export function isWithin(value, min, max) {

  return min < max
    ? (value >= min && value <= max)
    : (value >= max && value <= min);
}
