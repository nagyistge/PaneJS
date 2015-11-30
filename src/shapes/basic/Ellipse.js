import { merge } from '../../common/utils';
import Generic   from './Generic';

class Ellipse extends Generic {}

Ellipse.markup = '<g class="pane-rotatable"><g class="pane-scalable"><ellipse/></g><text/></g>';
Ellipse.defaults = merge({}, Generic.defaults, {
    type: 'basic.Ellipse',
    size: { width: 60, height: 40 },
    attrs: {
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
            text: '',
            'text-anchor': 'middle',
            'ref-x': .5,
            'ref-y': .5,
            'y-alignment': 'middle',
            fill: '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});

export default Ellipse;
