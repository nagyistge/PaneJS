import {
    merge,
    isArray
} from '../common/utils';

import Visual from './Visual';


class Node extends Visual {

    // readolny props
    // --------------

    get markup() {
        return this.constructor.markup;
    }

    get className() {

        let classNames = this.metadata.classNames;

        return isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';

    }

    get isNode() {
        return true;
    }


    translate() {

    }

    resize(width, height) {}

    rotate() { }

    getBBox() {
        return false;
    }
}


// static props
// ------------

Node.defaults = {
    classNames: ['pane-node'], // `String` or `Array`
    view: null,  // set `null` to use the default view
    attrs: {},
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
};


// exports
// -------

export default Node;
