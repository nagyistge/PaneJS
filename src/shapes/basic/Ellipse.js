import Node from '../../cells/Node';


class Ellipse extends Node {}


Ellipse.setDefaults({

  markup: '<g class="pane-rotatable"><g class="pane-scalable"><ellipse/></g><text/></g>',

  size: {
    width: 60,
    height: 40
  },

  attrs: {
    '.': {
      fill: '#ffffff',
      stroke: 'none'
    },
    'ellipse': {
      fill: '#ffffff',
      stroke: '#000000',
      rx: 30,
      ry: 20,
      cx: 30,
      cy: 20
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


export default Ellipse;
