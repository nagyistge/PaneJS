import {
    filter,
    forEach,
    indexOf,
    isNullOrUndefined
} from '../common/utils';

import Class  from '../common/Class';
import Events from '../common/Events';

export default Class.create({

    constructor: function Cell(options) {

    },

    clear: function () {

    },

    isNode: function () {
        return false;
    },

    isLink: function () {
        return false;
    },


    // children
    // --------

    getChildCount() {
        var children = this.children;
        return children ? children.length : 0;
    },

    getChildIndex(child) {
        return indexOf(this.children || [], child);
    },

    getChildAt(index) {
        var children = this.children;
        return children ? children[index] : null;
    },

    eachChild(iterator, context) {

        var that = this;
        var children = that.children;

        children && forEach(children, iterator, context);

        return that;
    },

    filterChild(iterator, context) {
        var children = this.children;
        return children ? filter(children, iterator, context) : [];
    },

    insertChild(child, index) {
        var that = this;

        if (child) {

            // fix index
            if (isNullOrUndefined(index)) {
                index = that.getChildCount();

                if (child.parent === that) {
                    index--;
                }
            }


            child.removeFromParent();
            child.parent = that;


            var children = that.children;

            if (children) {
                children.splice(index, 0, child);
            } else {
                children = that.children = [];
                children.push(child);
            }
        }

        return that;
    },

    removeChild(child) {
        return this.removeChildAt(this.getChildIndex(child));
    },

    removeChildAt(index) {
        var that = this;
        var child = null;
        var children = that.children;

        if (children && index >= 0) {
            child = that.getChildAt(index);

            if (child) {
                children.splice(index, 1);
                child.parent = null;
            }
        }

        return child;
    },


    // common
    // ------

    removeFromParent() {

        var that = this;
        var parent = that.parent;

        if (parent) {
            parent.removeChild(that);
        }

        return that;
    },

    valueOf: function () {

    },

    toString: function () {

    },

    clone: function () {

    },

    destroy: function () {

    }
});