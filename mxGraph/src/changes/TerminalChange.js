import Change from './Change';

export default Change.extend({
    constructor: function TerminalChange(model, link, node, isSource) {

        var that = this;

        that.model = model;
        that.cell = link;
        that.terminal = node;
        that.previous = node;
        that.isSource = isSource;
    },

    digest() {

        var that = this;

        that.terminal = that.previous;
        that.previous = that.model.terminalChanged(that.cell, that.previous, that.isSource);

        return that;
    }
});