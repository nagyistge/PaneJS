import Rect       from '../geometry/Rect';
import Node       from '../cells/Node';
import RemarkView from './RemarkView';


class Remark extends Node {

    isRemark() {

        return true;
    }

    getRemark() {

        return this.data.name || '';
    }

    getBBox() {

        const size     = this.getSize();
        const position = this.getPosition();

        return new Rect(position.x, position.y, size.width, size.height);
    }

    getMaxSize() {

        return {
            width: 180,
            height: 96
        };
    }

    getSize() {

        return this.metadata.size || this.getMaxSize();
    }

    getPosition() {

        return this.metadata.position;
    }
}

Remark.setDefaults({
    tagName: 'g',
    pane: 'decoratePane',
    classNames: 'pane-remark',
    view: RemarkView,
});


// exports
// -------

export default Remark;
