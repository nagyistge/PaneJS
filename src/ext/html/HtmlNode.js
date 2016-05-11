import   * as utils from '../../common/utils';
import         Node from '../../cells/Node';
import HTMLNodeView from './HTMLNodeView';


class HTMLNode extends Node {

    getPortMarkup() {

        return this.metadata.portMarkup;
    }

    getPorts(isIn) {

        let metadata = this.metadata;

        if (isIn === true) {
            return metadata && metadata.inPorts || [];
        } else if (isIn === false) {
            return metadata && metadata.outPorts || [];
        }

        return this.getInPorts().concat(this.getOutPorts());
    }

    getInPorts() {

        return this.getPorts(true);
    }

    getOutPorts() {

        return this.getPorts(false);
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
