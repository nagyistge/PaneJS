import { merge } from '../../common/utils';
import Node      from '../../cells/Node';

class Generic extends Node {

}

export default Node.extend({
    defaults: merge({
        attrs: {
            '.': {
                fill: '#fff',
                stroke: 'none'
            }
        }
    }, Node.prototype.defaults)
});