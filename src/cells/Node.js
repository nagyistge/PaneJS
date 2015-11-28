import Cell from './Cell';

class Node extends Cell {

    defaults = {
        position: {
            x: 0,
            y: 0,
            relative: false
        },
        size: {
            width: 1,
            height: 1,
            relative: false
        },
        rotation: {
            angle: 0,
            relative: false
        },
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        angle: 0
    };

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

export default Node;
