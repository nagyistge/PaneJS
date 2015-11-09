define(function(require, exports, module) {
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');

module.exports = Class.create({

    constructor: function Change(model) {
        this.model = model;
    },

    digest: function () { }
});

});