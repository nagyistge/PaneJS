import { isArrayLike } from './lang';

const proto = Array.prototype;

export function toArray(arr) {
  return isArrayLike(arr) ? proto.slice.call(arr) : [arr];
}

export function slice(arr, start, end) {
  return arr ? proto.slice.call(arr, start, end) : [];
}

export function indexOf(arr, item) {
  return arr ? proto.indexOf.call(arr, item) : -1;
}

export function contains(arr, item) {
  return arr ? indexOf(arr, item) >= 0 : false;
}

export function lastIndexOf(arr, item) {
  return arr ? proto.lastIndexOf.call(arr, item) : -1;
}

export function map(arr, iterator, context) {
  return arr ? proto.map.call(arr, iterator, context) : [];
}

export function some(arr, iterator, context) {
  return arr ? proto.some.call(arr, iterator, context) : false;
}

export function every(arr, iterator, context) {
  return arr ? proto.every.call(arr, iterator, context) : false;
}

export function filter(arr, iterator, context) {
  return arr ? proto.filter.call(arr, iterator, context) : [];
}

export function forEach(arr, iterator, context) {
  arr && proto.forEach.call(arr, iterator, context);
}

export function reduce(arr, iterator, initialValue) {
  return arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
}

export function reduceRight(arr, iterator, initialValue) {
  return arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;
}
