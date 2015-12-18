import * as utils from '../common/utils';
import Cell       from './Cell';

class Node extends Cell {

    get markup() {
        return this.constructor.markup;
    }

    get className() {

        let classNames = this.raw.classNames;

        return utils.isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';

    }


    constructor(options) {

        super();

        let that = this;
        let metadata = utils.merge({}, that.constructor.defaults, options);

        that.raw = metadata;
        that.data = metadata.data;
        that.attrs = metadata.attrs;
        that.visible = metadata.visible !== false;

        that.size = metadata.size;
        that.position = metadata.position;
        that.rotation = metadata.rotation;
    }

    isNode() {
        return true;
    }

    isRelativeSize() {}

    isRelativePosition() {}

    getClassName() {

        let classNames = this.raw.classNames;

        return utils.isArray(classNames)
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
