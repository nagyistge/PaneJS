import * as utils from '../common/utils';
import     Events from '../common/Events';


class Handler extends Events {

    constructor(paper, options = {}) {

        super();

        this.paper    = paper;
        this.disabled = false;

        this.configure(options)
            .init();
    }

    configure() { return this; }

    init() { return this; }

    destroy() {

        utils.destroy(this);
    }

    getPaper() {

        return this.paper;
    }

    getModel() {

        return this.paper && this.paper.model;
    }

    isDisabled() {

        return this.disabled === true;
    }

    isEnabled() {

        return this.disabled === false;

    }

    disable() {

        this.disabled = true;
        this.trigger('handler:disabled');

        return this;
    }

    enable() {

        this.disabled = false;
        this.trigger('handler:enabled');

        return this;
    }

    invoke(callback, context) {

        if (!this.isDisabled()) {
            callback.call(context);
        }

        return this;
    }
}


// exports
// -------

export default Handler;
