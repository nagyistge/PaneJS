
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');

module.exports = Class.create({
    constructor: function mxStyleChange(model, cell, style) {
        this.model = model;
        this.cell = cell;
        this.style = style;
        this.previous = style;
    },

    execute: function () {
        this.style = this.previous;
        this.previous = this.model.styleForCellChanged(
            this.cell, this.previous);
    },
});


