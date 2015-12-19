import {
    merge,
    isArray
} from '../common/utils';

import Cell from './Cell';


class Node extends Cell {

    get isNode() {
        return true;
    }

    get markup() {
        return this.constructor.markup;
    }

    get className() {

        let classNames = this.metadata.classNames;

        return isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';

    }


    constructor(options) {

        super();

        let that = this;
        let metadata = merge({}, that.constructor.defaults, options);

        that.data = metadata.data;
        that.attrs = metadata.attrs;
        that.visible = metadata.visible !== false;
        that.metadata = metadata;
    }

    isNode() {
        return true;
    }

    isRelativeSize() {}

    isRelativePosition() {}

    getClassName() {

        let classNames = this.raw.classNames;

        return isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';
    }

    getMarkup() {
        return this.constructor.markup;
    }

    getPosition(relative) {

    }

    setPosition(x, y, relative) {

    }

    translate() {

    }

    resize(width, height) {}

    rotate() { }


    getBBox() {
        return false;
    }
}

Node.defaults = {

    classNames: ['pane-node'], // `String` or `Array`
    view: null,  // set `null` to use the default view
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
    },
    attrs: {}
};


// exports
// -------

export default Node;
