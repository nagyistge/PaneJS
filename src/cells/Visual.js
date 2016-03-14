import * as utils from '../common/utils';
import       Cell from './Cell';


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

    getClassName() {

        let classNames = this.metadata.classNames;

        return utils.isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';
    }

    getMarkup() {

        return this.metadata.markup;
    }

    // static methods
    // --------------

    static setDefaults(options) {

        // update global options
        this.defaults = utils.merge({}, this.defaults, options);
    }
}


// static props
// ------------

Visual.defaults = {
    markup: '',
    attrs : {},   // styles
    data  : null, // cached data(for business logic)
    pane  : null, // specify the container of the view
    view  : null  // specify the view's Constructor
};


// exports
// -------

export default Visual;
