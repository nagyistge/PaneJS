define(function(require, exports, module) {var Class = require('./common/class');
var utils = require('./common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function UndoableEdit(source, significant) {

        var that = this;

        that.source = source;
        that.changes = [];
        that.significant = !isNullOrUndefined(significant) ? significant : true;
        that.undone = false;
        that.redone = false;

    },

    isEmpty: function () {
        return this.changes.length === 0;
    },

    isSignificant: function () {
        return this.significant;
    },

    add: function (change) {
        this.changes.push(change);
    },

    notify: function () {},
    die: function () {},
    undo: function () {},
    redo: function () {}
});
});