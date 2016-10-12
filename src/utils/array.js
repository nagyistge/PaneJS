import { isArrayLike } from './lang';

const proto = Array.prototype;

export const toArray = arr => isArrayLike(arr) ? proto.slice.call(arr) : [arr];

export const slice       = (arr, start, end) => arr ? proto.slice.call(arr, start, end) : [];
export const indexOf     = (arr, item) => arr ? proto.indexOf.call(arr, item) : -1;
export const lastIndexOf = (arr, item) => arr ? proto.lastIndexOf.call(arr, item) : -1;
export const contains    = (arr, item) => arr && indexOf(arr, item) >= 0;

export const map     = (arr, iterator, context) => arr ? proto.map.call(arr, iterator, context) : [];
export const some    = (arr, iterator, context) => arr ? proto.some.call(arr, iterator, context) : false;
export const every   = (arr, iterator, context) => arr ? proto.every.call(arr, iterator, context) : false;
export const filter  = (arr, iterator, context) => arr ? proto.filter.call(arr, iterator, context) : [];
export const forEach = (arr, iterator, context) => { arr && proto.forEach.call(arr, iterator, context); };

export const reduce      = (arr, iterator, initialValue) => arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
export const reduceRight = (arr, iterator, initialValue) => arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;
