import Generic from './Generic';

class Image extends Generic {}

Image.configure({
    markup: '<g class="pane-rotatable"><g class="pane-scalable"><image/></g><text/></g>',
    defaults: {
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
    }
});


export default Image;
