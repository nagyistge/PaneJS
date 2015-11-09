define(function(require, exports, module) {var Change = require('./Change');
var utils = require('../common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Change.extend({

    constructor: function TerminalChange(model, cell, terminal, source) {

        var that = this;

        TerminalChange.superclass.constructor.call(that, model);

        that.cell = cell;
        that.terminal = terminal;
        that.previous = terminal;
        that.source = source;

    },

    digest: function () {

        this.terminal = this.previous;
        this.previous = this.model.terminalForCellChanged(this.cell, this.previous, this.source);
    }
});
});