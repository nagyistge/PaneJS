// import * as utils from '../common/utils';
import Events from '../common/Events';

class Controller extends Events {
    constructor(paper, options = {}) {
        super();

        let that = this;

        that.paper = paper;
        that.model = paper.model;

        that.init(options);
        that.on('controller:initalized');
    }

    // life cycle
    // ----------
    init() {
        return this;
    }

    destroy() {
    }
}

// exports
// -------

export default Controller;
