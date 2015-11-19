import { isArray, isArrayLike } from './lang';

function toArray(obj) {
    return isArray(obj)
        ? obj : isArrayLike(obj)
        ? Array.prototype.slice.call(obj)
        : [obj];
}

function indexOf(arr, item) {
    return arr ? arr.indexOf(item) : -1;
}

function lastIndexOf(arr, item) {
    return arr ? arr.lastIndexOf(item) : -1;
}

function every(arr, iterator, context) {
    return arr ? arr.every(iterator, context) : false;
}

function some(arr, iterator, context) {
    return arr ? arr.some(iterator, context) : false;
}

function forEach(arr, iterator, context) {
    arr && arr.forEach(iterator, context);
}

function map(arr, iterator, context) {
    return arr ? arr.map(iterator, context) : [];
}

function filter(arr, iterator, context) {
    return arr ? arr.filter(iterator, context) : [];
}

function reduce(arr, iterator, initialValue) {
    return arr ? arr.reduce(iterator, initialValue) : initialValue;
}

function reduceRight(arr, iterator, initialValue) {
    return arr ? arr.reduceRight(iterator, initialValue) : initialValue;
}


export {
    toArray,
    indexOf,
    lastIndexOf,
    every,
    some,
    forEach,
    map,
    filter,
    reduce,
    reduceRight
};