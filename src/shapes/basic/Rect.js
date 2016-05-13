import Node from '../../cells/Node';

class Rect extends Node {}

Rect.setDefaults({
    markup: '<g class="pane-rotatable"><g class="pane-scalable"><rect/></g><text/></g>',
    attrs: {
        '.': {
            'fill': '#fff',
            'stroke': 'none'
        },
        'rect': {
            'fill': '#fff',
            'stroke': '#000',
            'stroke-width': '1',
            'width': 80,
            'height': 30
        },
        'text': {
            'fill': '#000',
            'font-size': 12,
            'ref-x': .5,
            'ref-y': .5,
            'text-anchor': 'middle',
            'y-alignment': 'middle',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});


// exports
// -------

export default Rect;
