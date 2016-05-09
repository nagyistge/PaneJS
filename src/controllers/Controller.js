import Events from '../common/Events';


class Controller extends Events {

    constructor(paper, options = {}) {

        super();

        this.paper = paper;
        this.model = paper.model;

        this.init(options);
        this.on('controller:initalized');
    }

    init() {
        return this;
    }

    destroy() { }
}


// exports
// -------

export default Controller;
