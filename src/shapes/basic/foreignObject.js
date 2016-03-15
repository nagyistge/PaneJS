import Node from '../../cells/Node';

class ForeignObject extends Node {}

ForeignObject.setDefaults({
    markup: [
        '<g class="pane-rotatable">' +
        '  <g class="pane-scalable">' +
        '    <rect/>' +
        '    ' +
        '  </g>' +
        '<switch>',

        // if foreignObject supported

        '<foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" class="fobj">',
        '<div/>',
        '</foreignObject>',

        // else foreignObject is not supported (fallback for IE)
        '<text class="content"/>',

        '</switch>' +
        '</g>'
    ].join(''),

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        rect: {
            fill: '#ffffff',
            stroke: '#000000',
            width: 80,
            height: 100
        },
        text: {
            fill: '#000000',
            'font-size': 14,
            'font-family': 'Arial, helvetica, sans-serif'
        },
        '.content': {
            text: '',
            ref: 'rect',
            'ref-x': .5,
            'ref-y': .5,
            'y-alignment': 'middle',
            'x-alignment': 'middle'
        }
    },

    content: ''
});

export default ForeignObject;
