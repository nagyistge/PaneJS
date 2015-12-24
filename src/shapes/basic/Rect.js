import Node from '../../cells/Node';

class Rect extends Node {}

Rect.setDefaults({
    markup: '<g class="pane-rotatable"><g class="pane-scalable"><rect/></g><text/></g>',
    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'rect': {
            'fill': '#ffffff',
            'stroke': '#000000',
            'stroke-width': '1',
            'width': 100,
            'height': 40
        },
        'text': {
            fill: '#000000',
            text: '',
            'font-size': 14,
            'ref-x': .5,
            'ref-y': .5,
            'text-anchor': 'middle',
            'y-alignment': 'middle',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});


export default Rect;
