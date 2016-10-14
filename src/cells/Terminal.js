import * as utils from '../common/utils';
import Point from '../geometry/Point';


function scheduleSetTerminal(scheduled) {

  this.setTerminal.scheduled = scheduled;

  return this;
}

function isSetTerminalScheduled() {

  return this.setTerminal.scheduled === true;
}


class Terminal {

  constructor(terminal) {

    if (terminal instanceof Terminal) {
      return terminal;
    }

    if (terminal) {

      if (terminal.isNode && terminal.isNode()) {

        this.node = terminal;

      } else if (Point.isPointLike(terminal)) {

        this.point = Point.fromPoint(terminal);

      } else if (utils.isObject(terminal)) {
        
        this.node  = terminal.node;
        this.port  = terminal.port;
        this.point = Point.isPointLike(terminal.point)
          ? Point.fromPoint(terminal.point)
          : null;
      }
    }
  }

  addLink(link, isSource = true, options = {}) {

    if (link) {

      scheduleSetTerminal.call(link, false);

      if (!options.silent) {
        let model = link.getModel() || this.getModel();
        if (model) {
          model.setTerminal(link, this, isSource);
          scheduleSetTerminal.call(link, true);
        }
      }

      if (!isSetTerminalScheduled.call(link)) {

        if (this.node) {
          this.node.addLink(link, isSource, { silent: true });
        }

        link.setTerminal(this, isSource, { silent: true });
      }
    }

    return this;
  }

  removeLink(link, isSource = true, options = {}) {

    if (link) {

      scheduleSetTerminal.call(link, false);

      if (!options.silent) {
        let model = link.getModel() || this.getModel();
        if (model) {
          model.setTerminal(link, null, isSource);
          scheduleSetTerminal.call(link, true);
        }
      }

      if (!isSetTerminalScheduled.call(link)) {

        if (this.node) {
          this.node.removeLink(link, isSource, { silent: true });
        }

        link.setTerminal(null, isSource, { silent: true });
      }
    }

    return this;
  }

  duplicate(terminal) {

    let cloned = new Terminal(terminal);

    // copy the missing properties
    utils.forEach(['node', 'port', 'point'], function (key) {
      if (this[key] && !cloned[key]) {
        cloned[key] = this[key];
      }
    }, this);

    return cloned;
  }

  getModel() {

    return this.node && this.node.getModel();
  }
}


// exports
// -------

export default Terminal;
