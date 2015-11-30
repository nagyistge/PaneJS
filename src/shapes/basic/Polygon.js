import { merge } from '../../common/utils';
import Generic   from './Generic';

class Polygon extends Generic {}

Polygon.markup = '<g class="pane-rotatable"><g class="pane-scalable"><polygon/></g><text/></g>';
Polygon.defaults = merge({}, Generic.defaults, {
    type: 'basic.Polygon',
    size: { width: 60, height: 40 },
    attrs: {
        'polygon': {
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

export default Polygon;
