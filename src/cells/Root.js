define([
    './Vessel'
], function (
    Vessel
) {
    'use strict';

    return Vessel.extend({
        constructor: function Root(value) {

            var that = this;

            Root.super.constructor.call(that, value);

            that.isRoot = true;
            that.connectAble = false;
        }
    });
});

