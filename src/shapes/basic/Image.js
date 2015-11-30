import { merge } from '../../common/utils';
import Generic   from './Generic';

class Image extends Generic {}

Image.markup = '<g class="pane-rotatable"><g class="pane-scalable"><image/></g><text/></g>';
Image.defaults = merge({}, Generic.defaults, {
    type: 'basic.Image',
    attrs: {
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

export default Image;
