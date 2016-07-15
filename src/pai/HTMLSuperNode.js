import * as utils        from '../common/utils';
import Node              from '../cells/Node';
import HTMLSuperNodeView from './HTMLSuperNodeView';


class HTMLSuperNode extends Node {

    isSuperNode() {
        return true;
    }

}

HTMLSuperNode.setDefaults({
    tagName: 'div',
    pane: 'htmlPane',
    view: HTMLSuperNodeView,
});


// exports
// -------

export default HTMLSuperNode;
