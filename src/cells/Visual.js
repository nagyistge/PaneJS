import * as utils from '../common/utils';
import Cell from './Cell';


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


    // props
    // -----

    get markup() {
        return this.constructor.markup;
    }

    get className() {

        let classNames = this.metadata.classNames;

        return isArray(classNames)
            ? classNames.join(' ')
            : classNames || '';

    }


    // static methods
    // --------------

    static configure(options) {

        let that = this;

        if (options) {

            utils.forIn(options, (val, key)=> {

                that[key] = key === 'defaults'
                    ? utils.merge({}, that.defaults, val)
                    : val;
            });
        }
    }
}


// exports
// -------

export default Visual;
