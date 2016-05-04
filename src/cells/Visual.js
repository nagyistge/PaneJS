import * as utils from '../common/utils';
import       Cell from './Cell';


class Visual extends Cell {

    // static
    // ------

    static setDefaults(options) {

        // update global options
        this.defaults = utils.merge({}, this.defaults, options);
    }


    constructor(options) {

        super();

        let metadata = utils.merge({}, this.constructor.defaults, options);

        this.data     = metadata.data;
        this.attrs    = metadata.attrs;
        this.visible  = metadata.visible !== false;
        this.metadata = metadata;
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

    getRoot() {

        return this.metadata.root || 'g';
    }
}


// static props
// ------------

Visual.defaults = {
    markup: '',
    root: 'g',   // root node
    attrs: {},   // styles
    data: null,  // cached data(for business logic)
    pane: null,  // specify the container of the view
    view: null   // specify the constructor of the view
};


// exports
// -------

export default Visual;
