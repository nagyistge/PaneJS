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
            'width': 100,
            'height': 40
        },
        'text': {
            'fill': '#000',
            'font-size': 14,
            'ref-x': .5,
            'ref-y': .5,
            'text-anchor': 'middle',
            'y-alignment': 'middle'
        }
    }
});


export default Rect;
