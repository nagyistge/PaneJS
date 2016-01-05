import * as utils from '../common/utils';
import Visual from './Visual';


class Node extends Visual {

    // props
    // -----

    get isNode() {
        return true;
    }


    // methods
    // -------

    translate() {

    }

    resize(width, height) {}

    rotate() { }

    getBBox() {
        return false;
    }

    getStrokeWidth() {

        let attr = this.getStrokeAttr();
        let strokeWidth = attr['stroke-width'] || 0;

        return utils.toFloat(strokeWidth) || 0;
    }

    getStrokeAttr() {

        return null;
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
