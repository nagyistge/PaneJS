// import * as utils from '../common/utils';
import Events from '../common/Events';

class Handler extends Events {
    constructor(paper, options = {}) {
        super();

        let that = this;

        that.paper = paper;
        that.disabled = false;

        that.init(options)
            .on('handler:initalized');
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
}

// exports
// -------

export default Handler;
