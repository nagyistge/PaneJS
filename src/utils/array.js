import { isArray, isArrayLike } from './lang';

const proto = Array.prototype;

const toArray = obj => isArray(obj)
    ? obj : isArrayLike(obj)
    ? proto.slice.call(obj)
    : [obj];

const slice       = (arr, start, end) => arr ? proto.slice.call(arr, start, end) : [];
const indexOf     = (arr, item) => arr ? proto.indexOf.call(arr, item) : -1;
const lastIndexOf = (arr, item) => arr ? proto.lastIndexOf.call(arr, item) : -1;
const contains    = (arr, item) => arr && indexOf(arr, item) >= 0;

const forEach     = (arr, iterator, context) => { arr && proto.forEach.call(arr, iterator, context); };
const map         = (arr, iterator, context) => arr ? proto.map.call(arr, iterator, context) : [];
const some        = (arr, iterator, context) => arr ? proto.some.call(arr, iterator, context) : false;
const every       = (arr, iterator, context) => arr ? proto.every.call(arr, iterator, context) : false;
const filter      = (arr, iterator, context) => arr ? proto.filter.call(arr, iterator, context) : [];
const reduce      = (arr, iterator, initialValue) => arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
const reduceRight = (arr, iterator, initialValue) => arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;


// exports
// -------

export {
    toArray,
    slice,
    indexOf,
    lastIndexOf,
    contains,

    forEach,
    map,
    some,
    every,
    filter,
    reduce,
    reduceRight,
};
