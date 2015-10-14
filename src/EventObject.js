var Class = require('./class');
var utils = require('./utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function EventObject(name) {
        var evt = this;

        evt.name = name;
        evt.properties = {};
        evt.consumed = false;

        for (var i = 1, l = arguments.length; i < l; i += 2) {
            evt.properties[arguments[i]] = arguments[i + 1];
        }
    },

    getName: function () {
        return this.name;
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
