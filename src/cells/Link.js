import {
    merge,
    isArray
} from '../common/utils';

import Visual from './Visual';


class Link extends Visual {

    get isLink() {
        return true;
    }
}


Link.setDefaults({

    markup: ''
    + '<path class="connection"/>'
    + '<path class="marker-source"/>'
    + '<path class="marker-target"/>'
    + '<path class="connection-wrap"/>'
    + '<g class="labels"/>'
    + '<g class="marker-vertices"/>'
    + '<g class="marker-arrowheads"/>'
    + '<g class="link-tools"/>',

    classNames: ['pane-link'], // `String` or `Array`
    connector: null, // set `null` to use the default connector
    attrs: {
        '.connection': {
            'fill': 'none',
            'stroke': '#000000',
            'stroke-width': 1
        },
        '.marker-source': {
            d: 'M 10 0 L 0 5 L 10 10 z'
        },
        '.marker-target': {
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});


// exports
// -------

export default Link;
