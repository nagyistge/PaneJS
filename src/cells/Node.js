import * as utils from '../common/utils';
import       Cell from '../cells/Cell';


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

    translate(dx, dy, options = {}) {

        let position = this.metadata.position;

        if (options.relative) {
            position.x += dx;
            position.y += dy;
        } else {
            position.x = dx;
            position.y = dy;
        }

        return this;
    }

    translateTo(x, y) {

        return this.translate(x, y, { relative: true });
    }

    resize(/* width, height */) {}

    rotate() { }

    getBBox() {
        return false;
    }

    // FIXME: figure out a better way
    getStrokeWidth() {

        let attrs = this.attrs;
        let attr  = attrs.rect ||
            attrs.path ||
            attrs.circle ||
            attrs.ellipse ||
            attrs.polyline ||
            attrs.polygon;

        let strokeWidth = attr['stroke-width'] || 0;

        return utils.toFloat(strokeWidth) || 0;
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
