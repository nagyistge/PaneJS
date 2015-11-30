import { merge } from '../../common/utils';
import Node      from '../../cells/Node';

class Generic extends Node {}

Generic.defaults = merge({}, Node.defaults, {
    type: 'basic.Generic',
    attrs: {
        '.': {fill: '#ffffff', stroke: 'none'}
    }
});

export default Generic;
