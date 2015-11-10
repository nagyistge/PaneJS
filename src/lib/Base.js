import {
    forIn,
    getFunctionName
} from '../common/utils';

import Class from '../common/class';

export default Class.create({

    constructor: function Base() {},

    toString: function () {
        return '[Class ' + getFunctionName(this.constructor) + ']';
    },

    getValue: function () {
        return this.toString();
    },

    destroy: function () {

        var that = this;

        forIn(that, function (val, key) {
            delete that[key];
        });

        that.destroyed = true;
    }
});
