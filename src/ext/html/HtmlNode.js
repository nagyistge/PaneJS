import   * as utils from '../../common/utils';
import       Portal from '../../cells/Portal';
import HTMLNodeView from './HTMLNodeView';


class HTMLNode extends Portal {

    getPortSelector(port, isInPort) {
        return this.getPortsWrapSelector(isInPort) + '>.pane-port[data-id="' + port.id + '"]';
    }

    getPortsWrapSelector(isInPort) {
        return '.pane-ports.' + (isInPort ? 'in' : 'out');
    }

}

HTMLNode.setDefaults({
    tagName: 'div',
    pane: 'HTMLDrawPane',
    view: HTMLNodeView,
});


// exports
// -------

export default HTMLNode;
