import * as utils from '../common/utils';


const defaults = {
  paperScroll: null,
  distance: 0,
};


class Navigator {

  constructor(options) {

    if (options) {
      this.install(options);
    }
  }

  destroy() {

    if (!this.destroyed) {
      utils.removeElement(this.container);
      utils.destroy(this);
    }
  }

  install(options) {

    this.options     = utils.merge({}, defaults, options);
    this.paperScroll = this.options.paperScroll;
    this.paper       = this.paperScroll.paper;

    this.ensureElement();

    return this;
  }

  ensureElement() {

    this.container = utils.createElement('div');

    this.paper.wrap.appendChild(this.container);

    utils.addClass(this.container, 'pane-navigator');

    return this;
  }
}


// exports
// -------

export default Navigator;
