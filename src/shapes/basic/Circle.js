import Node from '../../cells/Node';


class Circle extends Node {}


Circle.setDefaults({

    markup: '<g class="pane-rotatable"><g class="pane-scalable"><circle/></g><text/></g>',

    size: {
        width: 60,
        height: 60
    },

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'circle': {
            'fill': '#ffffff',
            'stroke': '#000000',
            'r': 30,
            'cx': 30,
            'cy': 30
        },
        'text': {
            'font-size': 14,
            'text': '',
            'text-anchor': 'middle',
            'ref-x': .5,
            'ref-y': .5,
            'y-alignment': 'middle',
            'fill': '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});


export default Circle;
