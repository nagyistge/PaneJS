import * as utils from '../../common/utils';
import     Portal from '../../cells/Portal';


class Ports extends Portal {

  constructor(options) {

    super(options);

    this.updatePortsAttrs();
  }

  updatePortsAttrs() {

    let attrs = {};

    utils.forEach(this.inPorts, function (port, index) {
      utils.merge(attrs, this.getPortAttrs(port, index, true));
    }, this);

    utils.forEach(this.outPorts, function (port, index) {
      utils.merge(attrs, this.getPortAttrs(port, index, false));
    }, this);

    utils.merge(this.attrs, attrs);

    return this;
  }

  // get the attrs for every port, so we can customize
  // the port's position, color, etc
  getPortAttrs(port, index, isInPort) {

    let attrs = {};
    let ports = isInPort ? this.inPorts : this.outPorts;

    let rootSelector  = this.getPortSelector(port, isInPort);
    let labelSelector = rootSelector + '>.port-label';

    attrs[labelSelector] = { text: port.id };
    attrs[rootSelector]  = {
      'ref': '.node-body',
      'ref-y': (index + 0.5) * (1 / ports.length)
    };

    if (!isInPort) {
      attrs[rootSelector]['ref-dx'] = 0;
    }

    return attrs;
  }

  getPortSelector(port, isInPort) {

    return this.getPortsWrapSelector(isInPort) + '>.pane-port[data-id="' + port.id + '"]';
  }

  getPortsWrapSelector(isInPort) {

    return '.pane-ports.' + (isInPort ? 'in' : 'out');
  }
}


Ports.setDefaults({
  size: {
    width: 80,
    height: 100
  },

  markup: '' +
  '<g class="pane-rotatable">' +
  '  <g class="pane-scalable">' +
  '    <rect class="node-body"/>' +
  '  </g>' +
  '  <text class="node-label"/>' +
  '  <g class="pane-ports in" />' +
  '  <g class="pane-ports out" />' +
  '</g>',

  portMarkup: '' +
  '<g class="pane-port" data-id="${id}">' +
  '  <circle class="port-body"/>' +
  '  <text class="port-label"/>' +
  '</g>',

  attrs: {
    '.node-label': {
      'text': 'port',
      'ref-x': 0.5,
      'ref-y': 0.5,
      'y-alignment': 'middle',
      'text-anchor': 'middle'
    },
    '.in .port-label': {
      x: -15,
      dy: 4
    },
    '.out .port-label': {
      x: 15,
      dy: 4
    }
  }
});


// exports
// -------

export default Ports;
