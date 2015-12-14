import Cell from './Cell';

class Node extends Cell {

    getPosition(relative) {

    }

    setPosition(x, y, relative) {

    }

    translate() {

    }

    resize(width, height) {}

    rotate() { }

    isNode() {
        return true;
    }

    getBBox() {
        return false;
    }
}

Node.defaults = {
    // set `null` to use the default view
    view: null,
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
        relative: false
    },
    attrs: {}
};


// exports
// -------

export default Node;
