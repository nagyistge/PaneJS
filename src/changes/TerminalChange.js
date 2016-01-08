import Change from './Change';


class TerminalChange extends Change {

    constructor(model, link, node, isSource) {

        super();

        let that = this;

        that.model = model;
        that.link = link;
        that.terminal = node;
        that.previous = node;
        that.isSource = isSource;
    }

    digest() {

        let that = this;

        that.terminal = that.previous;
        that.previous = that.model.terminalChanged(that.link, that.previous, that.isSource);

        return that;
    }
}


// exports
// -------

export default TerminalChange;
