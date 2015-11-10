import {
    forIn,
    getFunctionName
} from '../common/utils';

import Class from '../common/class';

export default Class.create({

    constructor: function Base() {},

    toString() {
        return '[Class ' + getFunctionName(this.constructor) + ']';
    },

    getValue() {
        return this.toString();
    },

    destroy() {

        var that = this;

        forIn(that, function (val, key) {
            delete that[key];
        });

        that.destroyed = true;
    }
});
