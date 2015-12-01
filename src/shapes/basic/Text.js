import Generic from './Generic';

class Text extends Generic {}

Text.configure({
    markup: '<g class="pane-rotatable"><g class="pane-scalable"><text/></g></g>',
    defaults: {
        attrs: {
            'text': {
                'font-size': 18,
                fill: '#000000'
            }
        }
    }
});


export default Text;
