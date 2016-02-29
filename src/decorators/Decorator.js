// import * as utils from '../common/utils';
import Events from '../common/Events';

class Decorator extends Events {
    constructor(paper, options = {}) {
        super();

        let that = this;

        that.paper = paper;
        that.model = paper.model;

        that.init(options);
        that.on('decorator:initalized');
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

export default Decorator;
