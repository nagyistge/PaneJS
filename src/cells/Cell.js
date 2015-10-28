import {
    clone,
    isNode,
    isFunction,
    ucFirst
} from '../common/utils';

import Base from '../lib/Base';

export default Base.extend({

    // 属性访问器
    //Accessors: [
    //    'id',
    //    'value',
    //    'style',
    //    'parent',
    //    'visible',
    //    'geometry'
    //],

    // 原型链上的属性
    visible: true,

    constructor: function Cell(id, value, geometry, style) {

        var that = this;

        that.id = id;
        that.value = value;
        that.geometry = geometry;
        that.style = style;
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
        var cloned = clone(that, that.transients);
        cloned.value = that.cloneValue();

        return cloned;
    }
});
