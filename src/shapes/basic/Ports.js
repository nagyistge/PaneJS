import * as utils from '../../common/utils';
import       Node from '../../cells/Node';
import  PortsView from '../basic/PortsView';


class Ports extends Node {

    constructor(options) {

        super(options);

        let that = this;

        that.inPorts = utils.map(that.metadata.inPorts, function (port, index) {
            return that.checkPort(port, index, 'in');
        });

        that.outPorts = utils.map(that.metadata.outPorts, function (port, index) {
            return that.checkPort(port, index, 'out');
        });

        that.updatePortsAttrs();
    }

    insertPort(port, type = 'in') {

        let that  = this;
        let ports = type === 'in' ? that.inPorts : that.outPorts;
    }

    insertInPort(port, index) {

        return this.insertPort(port, 'in');
    }

    insertOutPort(port, index) {

        return this.insertPort(port, 'out');
    }

    removePort(port, type = 'in') {

        let that = this;
    }

    removeInPort(port) {

        return this.removePort(port, 'in');
    }

    removeOutPort(port) {

        return this.removePort(port, 'out');
    }

    updatePortsAttrs() {

        var that  = this;
        var attrs = {};

        utils.forEach(this.inPorts, function (port, index) {
            var specials   = that.getPortAttrs(port, index, 'in');
            port.selectors = utils.keys(specials);
            utils.merge(attrs, specials);
        });

        utils.forEach(this.outPorts, function (port, index) {
            var specials   = that.getPortAttrs(port, index, 'out');
            port.selectors = utils.keys(specials);
            utils.merge(attrs, specials);
        });

        utils.merge(that.attrs, attrs);

        return that;
    }

    checkPort(port, index, type) {

        var id = type + '-port-' + index;

        if (utils.isFunction(port)) {
            port = port.call(this);
        }

        if (!utils.isObject()) {
            port = {
                name: port || id
            };
        }

        if (!port.id) {
            port.id = id;
        }

        return port;
    }

    getPortAttrs(port, index, type) {

        var attrs    = {};
        let selector = '.' + type + '>g:nth-child(' + (index + 1) + ')';

        var bodySelector  = selector + '>.port-body';
        var labelSelector = selector + '>.port-label';

        attrs[labelSelector] = { text: port.name };
        attrs[bodySelector]  = {
            port: {
                id  : port.id,
                type: type
            }
        };

        attrs[selector] = {
            'ref'  : 'rect',
            'ref-y': (index + 0.5) * (1 / total)
        };

        if (type === '.out') {
            attrs[selector]['ref-dx'] = 0;
        }

        return attrs;
    }
}


Ports.setDefaults({

    view: PortsView,

    markup: '' +

    '<g class="pane-rotatable">' +
    '  <g class="pane-scalable">' +
    '    <rect/>' +
    '  </g>' +
    '  <text/>' +
    '  <g class="pane-ports in" />' +
    '  <g class="pane-ports out" />' +
    '</g>',

    portMarkup: '' +

    '<g class="pane-port">' +
    '  <circle class="port-body"/>' +
    '  <text class="port-label"/>' +
    '</g>',

    inPorts : [],
    outPorts: [],

    attrs: {
        '.': {
            'fill'  : '#fff',
            'stroke': 'none'
        },

        'rect': {
            'fill'        : '#fff',
            'stroke'      : '#000',
            'stroke-width': '1',
            'width'       : 80,
            'height'      : 30
        },

        'text': {
            'fill'       : '#000',
            'font-size'  : 12,
            'ref-x'      : 0.5,
            'ref-y'      : 0.5,
            'text-anchor': 'middle',
            'y-alignment': 'middle',
            'font-family': 'Arial, helvetica, sans-serif'
        },

        '.in .port-label': {
            x            : -15,
            dy           : 4,
            fill         : '#000000',
            'text-anchor': 'end'
        },

        '.out .port-label': {
            x   : 15,
            dy  : 4,
            fill: '#000000'
        },

        '.port-body': {
            r     : 5,
            stroke: '#000000'
        },

        'pane-port port-body' : {},
        'pane-port port-label': {}
    }
});


// exports
// -------

export default Ports;
