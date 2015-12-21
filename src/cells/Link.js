import {
    merge,
    isArray
} from '../common/utils';


import Cell from './Cell';


class Link extends Cell {

    constructor(options) {

        super();

        let that = this;
        let metadata = merge({}, that.constructor.defaults, options);

        that.data = metadata.data;
        that.attrs = metadata.attrs;
        that.visible = metadata.visible !== false;
        that.metadata = metadata;
    }

    get className() {

        let classNames = this.metadata.classNames;

        return isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';

    }

    get isLink() {
        return true;
    }
}


// static props
// ------------

Link.defaults = {
    classNames: ['pane-link'], // `String` or `Array`
    view: null,  // set `null` to use the default view
    attrs: {},
    source: null,
    target: null
};


// exports
// -------

export default Link;
