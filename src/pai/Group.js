import Node      from '../cells/Node';
import GroupView from './GroupView';


class Group extends Node {

    isNode() {

        return false;
    }

    isGroup() {
        return true;
    }
}

Group.setDefaults({
    tagName: 'g',
    pane: 'backgroundPane',
    classNames: 'pane-group',
    view: GroupView,
});


// exports
// -------

export default Group;
