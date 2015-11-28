import { merge } from '../../common/utils';
import DEFAULTS  from './defaults';
//import Generic   from './Generic';

class Rect {
    markup = '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>';
}

export default Rect;

//Generic.extend({
//
//    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
//
//    defaults: merge({
//
//        type: 'basic.Rect',
//        attrs: {
//            'rect': {
//                fill: '#ffffff',
//                stroke: '#000000',
//                width: 100,
//                height: 60
//            },
//            'text': {
//                fill: '#000000',
//                text: '',
//                'font-size': 14,
//                'ref-x': .5,
//                'ref-y': .5,
//                'text-anchor': 'middle',
//                'y-alignment': 'middle',
//                'font-family': 'Arial, helvetica, sans-serif'
//            }
//        }
//
//    }, Generic.prototype.defaults)
//});
