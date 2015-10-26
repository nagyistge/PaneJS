import { isArrayLike } from './lang';

var slice = Array.prototype.slice;

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

function each(list, iteratee, context) {
    for (var i = 0, l = list.length; i < l; i++) {
        iteratee.call(context, list[i], i, list);
    }

    return list;
}

function toArray(obj) {
    return isArrayLike(obj) ? slice.call(obj) : [];
}

export {
    indexOf,
    each,
    toArray
};


