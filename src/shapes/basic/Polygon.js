import Node from '../../cells/Node';

class Polygon extends Node {}

Polygon.setDefaults({

    markup: '<g class="pane-rotatable"><g class="pane-scalable"><polygon/></g><text/></g>',

    size: {
        width: 60,
        height: 40
    },

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'polygon': {
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


export default Polygon;
