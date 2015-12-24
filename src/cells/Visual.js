import * as utils from '../common/utils';
import Cell from './Cell';


class Visual extends Cell {

    constructor(options) {

        super();

        let that     = this;
        let metadata = utils.merge({}, that.constructor.defaults, options);

        that.data     = metadata.data;
        that.attrs    = metadata.attrs;
        that.visible  = metadata.visible !== false;
        that.metadata = metadata;
    }


    // static methods
    // --------------

    static setDefaults(options) {
        this.defaults = utils.merge({}, this.defaults, options);
    }


    // props
    // -----

    get markup() {

        return this.metadata.markup;
    }

    get className() {

        let classNames = this.metadata.classNames;

        return utils.isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';

    }
}


// static props
// ------------

Visual.defaults = {
    markup: '',
    data: null,  // attach data to the cell
    view: null,  // set `null` to use the default view
    attrs: {}    // styles
};


// exports
// -------

export default Visual;
