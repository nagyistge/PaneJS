import { isArrayLike } from './lang';

var arrProto = Array.prototype;
var slice = arrProto.slice;

function toArray(obj) {
    return isArrayLike(obj) ? slice.call(obj) : [];
}

var indexOf = arrProto.indexOf ?
    function (arr, item) {
        return arr.indexOf(item);
    } :
    function (arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

var lastIndexOf = arrProto.lastIndexOf ?
    function (arr, item) {
        return arr.lastIndexOf(item);
    } :
    function (arr, item) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

var each = arrProto.forEach ?
    function (arr, iterator, context) {
        arr.forEach(iterator, context);
    } :
    function (arr, iterator, context) {
        for (var i = 0, l = arr.length; i < l; i++) {
            iterator.call(context, arr[i], i, arr);
        }
    };

var forEach = each;

var map = arrProto.map ?
    function (arr, iterator, context) {
        return arr.map(iterator, context);
    } :
    function (arr, iterator, context) {
        var res = [];
        each(arr, function (value, index) {
            res.push(iterator.call(context, value, index, arr));
        });
        return res;
    };

var filter = arrProto.filter ?
    function (arr, iterator, context) {
        return arr.filter(iterator, context);
    } :
    function (arr, iterator, context) {
        var res = [];
        each(arr, function (value, index) {
            if (iterator.call(context, value, index, arr)) {
                res.push(value);
            }
        });
        return res;
    };

var some = arrProto.some ?
    function (arr, iterator, context) {
        return arr.some(iterator, context);
    } :
    function (arr, iterator, context) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (iterator.call(context, arr[i], i, arr)) {
                return true;
            }
        }
        return false;
    };

var every = arrProto.every ?
    function (arr, iterator, context) {
        return arr.every(iterator, context);
    } :
    function (arr, iterator, context) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (!iterator.call(context, arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    };

var reduce = arrProto.reduce ?
    function (arr, iterator, context) {

    } :
    function (arr, iterator, context) {

    };

var reduceRight = arrProto.reduceRight ?
    function (arr, iterator, context) {


    } :
    function (arr, iterator, context) {

    };


export {
    toArray,
    indexOf,
    lastIndexOf,
    forEach,
    each,
    map,
    filter,
    some,
    every,
    reduce,
    reduceRight
};


