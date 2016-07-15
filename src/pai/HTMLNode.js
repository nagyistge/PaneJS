import * as utils   from '../common/utils';
import Portal       from '../cells/Portal';
import HTMLNodeView from './HTMLNodeView';


class HTMLNode extends Portal {

    isPortVisible(port) {

        return port.displayType !== 'hide';
    }

    getVisiblePorts(isInPort) {

        let ports = isInPort ? this.getInPorts() : this.getOutPorts();

        return utils.filter(ports, function (port) {
            return this.isPortVisible(port);
        }, this);
    }

    getPortSelector(port, isInPort) {
        return this.getPortsWrapSelector(isInPort) + '>.pane-port[data-id="' + port.id + '"]';
    }

    getPortsWrapSelector(isInPort) {
        return '.pane-ports.' + (isInPort ? 'in' : 'out');
    }
}

HTMLNode.setDefaults({
    tagName: 'div',
    pane: 'htmlPane',
    view: HTMLNodeView,
});


// exports
// -------

export default HTMLNode;