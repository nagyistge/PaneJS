import Change from './Change';

export default Change.extend({
    constructor: function TerminalChange(model, cell, terminal, isSource) {

        var that = this;

        that.model = model;
        that.cell = cell;
        that.terminal = terminal;
        that.previous = terminal;
        that.isSource = isSource;
    },

    digest: function () {

        var that = this;

        that.terminal = that.previous;
        that.previous = that.model.terminalForCellChanged(that.cell, that.previous, that.isSource);

        return that;
    }
});
