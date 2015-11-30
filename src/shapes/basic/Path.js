import { merge } from '../../common/utils';
import Generic   from './Generic';

class Path extends Generic {}

Path.markup = '<g class="pane-rotatable"><g class="pane-scalable"><path/></g><text/></g>';
Path.defaults = merge({}, Generic.defaults, {
    type: 'basic.Path',
    size: { width: 60, height: 60 },
    attrs: {
        'path': {
            fill: '#ffffff',
            stroke: '#000000'
        },
        'text': {
            'font-size': 14,
            text: '',
            'text-anchor': 'middle',
            'ref': 'path',
            'ref-x': .5,
            'ref-dy': 10,
            fill: '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});

export default Path;
