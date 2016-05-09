import Events from '../common/Events';


class Handler extends Events {

    constructor(paper, options = {}) {

        super();

        this.paper    = paper;
        this.disabled = false;

        this.init(options);
        this.trigger('handler:initalized');
    }

    init() {

        return this;
    }

    destroy() {

        this.trigger('destroy');
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

    executeIfEnabled(callback, context) {

        if (!this.isDisabled()) {
            callback.call(context);
        }

        return this;
    }
}


// exports
// -------

export default Handler;
