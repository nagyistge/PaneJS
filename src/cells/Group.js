define([
    '../common/utils',
    './Vessel'
], function (
    utils,
    Vessel
) {
    'use strict';

    var indexOf = utils.indexOf;

    var Group = Vessel.extend({
        constructor: function Group(value, geometry, style) {

            var that = this;

            Group.super.constructor.call(that, value, geometry, style);

            that.isGroup = true;
            that.collapsed = false;
        },

        cloneValue: function () {},

        clone: function () {}
    });
});


