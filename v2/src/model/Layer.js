define([
    './Vessel'
], function (
    Vessel
) {
    'use strict';

    return Vessel.extend({
        constructor: function Layer(value) {

            var that = this;

            Layer.super.constructor.call(that, value);

            that.isLayer = true;
            that.connectAble = false;
        }
    });
});
