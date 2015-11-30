import { merge } from '../../common/utils';
import Generic   from './Generic';

class Polyline extends Generic {}

Polyline.markup = '<g class="pane-rotatable"><g class="pane-scalable"><polyline/></g><text/></g>';
Polyline.defaults = merge({}, Generic.defaults, {
    type: 'basic.Polyline',
    size: { width: 60, height: 40 },
    attrs: {
        'polyline': {
            fill: '#ffffff',
            stroke: '#000000'
        },
        'text': {
            'font-size': 14,
            text: '',
            'text-anchor': 'middle',
            'ref-x': .5,
            'ref-dy': 20,
            'y-alignment': 'middle',
            fill: '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});

export default Polyline;
