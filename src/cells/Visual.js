import * as utils from '../common/utils';
import       Cell from './Cell';


class Visual extends Cell {

    constructor(options) {

        super();

        let that = this;
        let metadata = utils.merge({}, that.constructor.defaults, options);

        that.data = metadata.data;
        that.attrs = metadata.attrs;
        that.visible = metadata.visible !== false;
        that.metadata = metadata;
    }


    // static methods
    // --------------

    static setDefaults(options) {
        // update global options
        this.defaults = utils.merge({}, this.defaults, options);
    }


    // props
    // -----

    get markup() {

        return this.metadata.markup;
    }

    get paneName() {

        return this.metadata.pane;
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
    attrs: {},  // styles
    data: null, // cached data(business logic)
    view: null  // set `null` to use the default view
};


// exports
// -------

export default Visual;
