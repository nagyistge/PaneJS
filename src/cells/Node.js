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
        let raw = utils.merge({}, that.constructor.defaults, options);

        that.raw = raw;
        that.data = raw.data;
        that.attrs = raw.attrs;
        that.visible = raw.visible !== false;
        that.size = raw.size;
        that.position = raw.position;
        that.rotation = raw.rotation;
    }

    isNode() {
        return true;
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
    classNames: ['pane-node'],
    view: null, // set `null` to use the default view
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
        relative: false,
        inherited: true   // inherit the parent's rotation
    },
    attrs: {}
};


// exports
// -------

export default Node;
