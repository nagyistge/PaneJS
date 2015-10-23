define([
    '../common/utils',
    './Node'
], function (
    utils,
    Node
) {
    'use strict';

    var each = utils.each;
    var indexOf = utils.indexOf;
    var isNullOrUndefined = utils.isNullOrUndefined;

    var Vessel = Node.extend({
        constructor: function Vessel(value, geometry, style) {

            var that = this;

            Vessel.super.constructor.call(that, value, geometry, style);

            that.parent = null;
            that.children = [];
        },

        each: function (iterator, context) {

            var that = this;

            each(that.children, iterator, context);

            return that;
        },

        indexOf: function (child) {
            return indexOf(this.children, child);
        },

        childAt: function (index) {
            return this.children[index];
        },

        insert: function (child, index) {
            var that = this;
            var children = that.children;

            if (child) {

                if (isNullOrUndefined(index)) {
                    index = children.length;

                    if (child.parent === that) {
                        index--;
                    }
                }

                // 从旧的 parent 移除
                child.removeFromParent();
                // 设置新的 parent
                child.parent = that;

                children.splice(index, 0, child);
            }

            return that;
        },

        remove: function (child) {
            return this.removeAt(this.indexOf(child));
        },

        removeAt: function (index) {
            var children = this.children;
            var child = index >= 0 ? children[index] : null;

            if (child) {
                children.splice(index, 1);
                child.parent = null;
            }

            return child;
        },

        cloneValue: function () {},

        clone: function () {}
    });
});


