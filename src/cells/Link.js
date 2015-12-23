import {
    merge,
    isArray
} from '../common/utils';

import Visual from './Visual';


class Link extends Visual {

    constructor(options) {

        super();

        let that = this;
        let metadata = merge({}, that.constructor.defaults, options);

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

    get isLink() {
        return true;
    }
}


Link.configure({
    markup: ''
    + '<path class="connection"/>'
    + '<path class="marker-source"/>'
    + '<path class="marker-target"/>'
    + '<path class="connection-wrap"/>'
    + '<g class="labels"/>'
    + '<g class="marker-vertices"/>'
    + '<g class="marker-arrowheads"/>'
    + '<g class="link-tools"/>',

    defaults: {
        classNames: ['pane-link'], // `String` or `Array`
        view: null,      // set `null` to use the default view
        connector: null, // set `null` to use the default connector
        attrs: {
            '.connection': {
                'fill': 'none',
                'stroke': '#000000',
                'stroke-width': 1
            }
        }
    }
});


// exports
// -------

export default Link;
