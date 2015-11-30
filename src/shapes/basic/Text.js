import { merge } from '../../common/utils';
import Generic   from './Generic';

class Text extends Generic {}

Text.markup = '<g class="pane-rotatable"><g class="pane-scalable"><text/></g></g>';
Text.defaults = merge({}, Generic.defaults, {
    type: 'basic.Text',
    attrs: {
        'text': {
            'font-size': 18,
            fill: '#000000'
        }
    }
});

export default Text;
