define([
    '../common/class',
    '../common/utils'
], function (
    Class,
    utils
) {
    'use strict';

    var forin = utils.forin;
    var getFunctionName = utils.getFuncName;

    return Class.create({
        constructor: function Base() {},

        toString: function () {
            return '[Class ' + getFunctionName(this.constructor) + ']';
        },

        getValue: function () {
            return this.toString();
        },

        destroy: function () {

            var that = this;

            forin(that, function (val, key) {
                delete that[key];
            });

            that.destroyed = true;
        }
    });
});
