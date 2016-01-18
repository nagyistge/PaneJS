// import * as utils from '../common/utils';
import Events from '../common/Events';

class Handler extends Events {
    constructor(paper, options = {}) {
        super();

        let that = this;

        that.paper = paper;
        that.model = paper.model;
        that.disabled = false;

        that.init(options);
        that.on('handler:initalized');
    }

    // life cycle
    // ----------
    init() {
        return this;
    }

    destroy() {
    }

    disable() {
        let that = this;

        that.disabled = true;
        that.on('handler:disabled');

        return that;
    }

    enable() {
        let that = this;

        that.disabled = false;
        that.on('handler:enabled');

        return that;
    }

    executeIfEnabled(callback) {
        let that = this;

        if (!that.disabled) {
            callback();
        }

        return that;
    }
}

// exports
// -------

export default Handler;
