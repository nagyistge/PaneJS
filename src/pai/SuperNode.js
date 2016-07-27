import Node          from '../cells/Node';
import SuperNodeView from './SuperNodeView';


class HTMLSuperNode extends Node {

    isSuperNode() {
        return true;
    }
}

HTMLSuperNode.setDefaults({
    tagName: 'g',
    pane   : 'backgroundPane',
    view   : SuperNodeView,
});


// exports
// -------

export default HTMLSuperNode;
