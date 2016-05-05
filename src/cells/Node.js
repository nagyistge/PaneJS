import * as utils from '../common/utils';
import     Visual from '../cells/Visual';


class Node extends Visual {

    // static
    // ------

    static isNode(node) {
        return node && node instanceof Node;
    }


    // props
    // -----

    isNode() {
        return true;
    }


    // methods
    // -------

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
    classNames: 'pane-node',
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
