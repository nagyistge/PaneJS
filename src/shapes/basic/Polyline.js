import Node from '../../cells/Node';

class Polyline extends Node {}

Polyline.setDefaults({

    markup: '<g class="pane-rotatable"><g class="pane-scalable"><polyline/></g><text/></g>',

    size: {
        width: 60,
        height: 40
    },

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'polyline': {
            'fill': '#ffffff',
            'stroke': '#000000'
        },
        'text': {
            'font-size': 14,
            'text': '',
            'text-anchor': 'middle',
            'ref-x': .5,
            'ref-dy': 20,
            'y-alignment': 'middle',
            'fill': '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});


export default Polyline;
