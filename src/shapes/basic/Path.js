import Node from '../../cells/Node';


class Path extends Node {

    getStrokeAttr() {

        return this.attrs.path;
    }
}

Path.setDefaults({

    markup: '<g class="pane-rotatable"><g class="pane-scalable"><path/></g><text/></g>',

    size: {
        width: 60,
        height: 60
    },

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'path': {
            'fill': '#ffffff',
            'stroke': '#000000'
        },
        'text': {
            'font-size': 14,
            'text': '',
            'text-anchor': 'middle',
            'ref': 'path',
            'ref-x': .5,
            'ref-dy': 10,
            'fill': '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});


export default Path;
