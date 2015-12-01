import Node from '../../cells/Node';

class Generic extends Node {}

Generic.configure({
    defaults: {
        attrs: {
            '.': {fill: '#ffffff', stroke: 'none'}
        }
    }
});

export default Generic;
