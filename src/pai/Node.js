import * as utils from '../common/utils';
import Portal     from '../cells/Portal';
import NodeView   from './NodeView';


class Node extends Portal {

  isPortVisible(port) {

    return port.displayType !== 'hide';
  }

  getVisiblePorts(isInPort) {

    const ports = isInPort ? this.getInPorts() : this.getOutPorts();

    return utils.filter(ports, function (port) {
      return this.isPortVisible(port);
    }, this);
  }
}


Node.setDefaults({
  tagName: 'g',
  pane: 'drawPane',
  view: NodeView,
  size: {
    width: 180,
    height: 30
  }
});


// exports
// -------

export default Node;
