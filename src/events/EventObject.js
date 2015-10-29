
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
var utils = require('../common/utils');

var isObject = utils.isObject;
var extend = utils.extend;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function EventObject(name, eventData) {

        var that = this;
        var data = that.data = {};

        that.name = name;
        that.consumed = false;

        isObject(eventData) && extend(data, eventData);
    },

    getName: function () {
        return this.name;
    },

    addData: function (key, value) {

        var evtObj = this;
        var data = evtObj.data;

        if (isObject(key)) {
            extend(data, key);
        } else {
            data[key] = value;
        }

        return evtObj;
    },

    getData: function (key) {
        var data = this.data;
        return isNullOrUndefined(key) ? data : data[key];
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function () {
        this.consumed = true;
    }
});
