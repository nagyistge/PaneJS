// 全局基类

var Class = require('./common/class');
var utils = require('./common/utils');

module.exports = Class.create({
    constructor: function Base() {},

    getSuperclass: function () {
        return this.constructor.superclass;
    },

    destroy: function () {

        var that = this;

        that.destroyed = true;
    }
});
