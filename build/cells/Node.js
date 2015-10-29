define(function(require, exports, module) {var Cell = require('./Cell');

module.exports = Cell.extend({

    isNode: true,

    constructor: function Node(value, geometry, style) {
        this.getSupclass().constructor.call(this, value, geometry, style);
    }
});
});