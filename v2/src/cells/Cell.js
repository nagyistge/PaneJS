define([
    '../common/utils',
    '../lib/Base'
], function (
    utils,
    Base
) {
    'use strict';

    var clone = utils.clone;
    var isNode = utils.isNode;
    var isFunction = utils.isFunction;
    var transients = ['id', 'value', 'parent', 'source', 'target', 'children', 'links'];

    return Base.extend({
        constructor: function Cell(value, geometry, style) {

            var that = this;

            that.value = value;
            that.geometry = geometry;
            that.style = style;
            that.visible = true;
        },

        removeFromParent: function () {
            var that = this;
            var parent = that.parent;

            parent && parent.remove(that);

            return that;
        },

        cloneValue: function () {
            var value = this.value;

            if (value) {
                if (value.clone && isFunction(value.clone)) {
                    return value.clone();
                }

                if (isNode(value)) {
                    return value.cloneNode(true);
                }
            }

            return value;
        },

        clone: function () {
            var that = this;
            var cloned = clone(that, transients);
            cloned.value = that.cloneValue();

            return cloned;
        }
    });
});