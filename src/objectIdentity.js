
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global window */

var utils = require('./utils');

var isObject = utils.isObject;
var isNullOrUndefined = utils.isNullOrUndefined;
var getFunctionName = utils.getFunctionName;

var FIELD_NAME = 'zObjectId';
var counter = 0;


exports.get = function (obj) {
    if (isObject(obj) && isNullOrUndefined(obj[FIELD_NAME])) {
        var ctor = getFunctionName(obj.constructor);
        obj[FIELD_NAME] = ctor + '#' + counter++;
    }

    return obj[FIELD_NAME];
};

exports.clear = function (obj) {
    if (isObject(obj)) {
        delete obj[FIELD_NAME];
    }
};
