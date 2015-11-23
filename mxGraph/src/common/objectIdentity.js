import {
    isObject,
    isUndefined,
    getFunctionName
} from './utils';

// 用构造函数名作为计数器依据
var counterMap = {};

var objectIdentity = {

    fieldName: 'objectId',

    get: function (obj) {

        var fieldName = objectIdentity.fieldName;
        var isObj = isObject(obj);

        if (isObj && isUndefined(obj[fieldName])) {

            var ctorName = getFunctionName(obj.constructor);

            if (isUndefined(counterMap[ctorName])) {
                counterMap[ctorName] = 0;
            } else {
                counterMap[ctorName] += 1;
            }

            obj[fieldName] = ctorName + '#' + counterMap[ctorName];
        }

        return isObj ? obj[fieldName] : '' + obj;
    },

    clear: function (obj) {
        if (isObject(obj)) {
            delete obj[objectIdentity.fieldName];
        }
    }
};


export default objectIdentity;
