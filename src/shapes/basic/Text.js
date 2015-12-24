import Node from '../../cells/Node';

class Text extends Node {}

Text.setDefaults({

    markup: '<g class="pane-rotatable"><g class="pane-scalable"><text/></g></g>',

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'text': {
            'font-size': 18,
            'fill': '#000000'
        }
    }
});


export default Text;
