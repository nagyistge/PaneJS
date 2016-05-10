import   * as utils from '../../common/utils';
import         Node from '../../cells/Node';
import HTMLNodeView from './HTMLNodeView';


class HTMLNode extends Node {}

HTMLNode.setDefaults({
    tagName: 'div',
    pane: 'HTMLDrawPane',
    view: HTMLNodeView,
});


// exports
// -------

export default HTMLNode;
