import { isArray, isArrayLike } from './lang';

var proto = Array.prototype;

function toArray(obj) {
    return isArray(obj)
        ? obj : isArrayLike(obj)
        ? proto.slice.call(obj)
        : [obj];
}

function indexOf(arr, item) {
    return arr ? proto.indexOf.call(arr, item) : -1;
}

function lastIndexOf(arr, item) {
    return arr ? proto.lastIndexOf.call(arr, item) : -1;
}

function every(arr, iterator, context) {
    return arr ? proto.every.call(arr, iterator, context) : false;
}

function some(arr, iterator, context) {
    return arr ? proto.some.call(arr, iterator, context) : false;
}

function forEach(arr, iterator, context) {
    arr && proto.forEach.call(arr, iterator, context);
}

function map(arr, iterator, context) {
    return arr ? proto.map.call(arr, iterator, context) : [];
}

function filter(arr, iterator, context) {
    return arr ? proto.filter.call(arr, iterator, context) : [];
}

function reduce(arr, iterator, initialValue) {
    return arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
}

function reduceRight(arr, iterator, initialValue) {
    return arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;
}

function contains(arr, item) {
    return arr && indexOf(arr, item) >= 0;
}

export {
    map,
    some,
    every,
    filter,
    reduce,
    forEach,
    toArray,
    indexOf,
    reduceRight,
    lastIndexOf,
    contains,
};
