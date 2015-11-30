import { merge } from '../../common/utils';
import Path      from './Path';

class Rhombus extends Path {}

Rhombus.defaults = merge({}, Path.defaults, {
    type: 'basic.Rhombus',
    attrs: {
        'path': {
            d: 'M 30 0 L 60 30 30 60 0 30 z'
        },
        'text': {
            'ref-y': 0.5,
            'y-alignment': 'middle'
        }
    }
});

export default Rhombus;
