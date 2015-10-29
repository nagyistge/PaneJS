define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global window */

var utils = require('./utils');

var isObject = utils.isObject;
var isNullOrUndefined = utils.isNullOrUndefined;
var getFunctionName = utils.getFunctionName;

// TODO: constants
var FIELD_NAME = 'objectId';
var counter = 0;


exports.get = function (obj) {

    var isObj = isObject(obj);

    if (isObj && isNullOrUndefined(obj[FIELD_NAME])) {
        var ctorName = getFunctionName(obj.constructor);
        obj[FIELD_NAME] = ctorName + '#' + counter++;
    }

    return isObj ? obj[FIELD_NAME] : '' + obj;
};

exports.clear = function (obj) {
    if (isObject(obj)) {
        delete obj[FIELD_NAME];
    }
};
});