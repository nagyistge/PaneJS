import Rect from '../geometry/Rect';
import Cell from '../cells/Cell';


class Node extends Cell {

    // static
    // ------

    static isNode(node) {
        return node && node instanceof Node;
    }


    // methods
    // -------

    isNode() {
        return true;
    }

    getBBox() {

        let position = this.getPosition();
        let size     = this.getSize();

        return new Rect(position.x, position.y, size.width, size.height);
    }
}


Node.setDefaults({
    tagName: 'g',
    markup: '',
    classNames: 'pane-node',
    pane: null,   // specify the drawPane of the view
    view: null,   // specify the constructor of the view
    data: null,   // cached data(for business logic)
    attrs: null,  // styles

    size: {
        width: 1,
        height: 1,
        relative: false
    },
    position: {
        x: 0,
        y: 0,
        relative: false
    },
    rotation: {
        angle: 0,
        inherited: true // inherit the parent's rotation
    }
});


// exports
// -------

export default Node;
