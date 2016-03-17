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

    insertPort(port, index, type = 'in') {

        let that = this;
        let ports = type === 'in' ? that.inPorts : that.outPorts;

        index = utils.fixIndex(index, ports.length);
        port = that.checkPort(port, index, type);

        ports.splice(index, 0, port);

        return that;
    }

    insertInPort(port) {

        return this.insertPort(port, 'in');
    }

    insertOutPort(port) {

        return this.insertPort(port, 'out');
    }

    removePort(port, type = 'in') {

        let that = this;
        let ports = type === 'in' ? that.inPorts : that.outPorts;
        let index = utils.indexOf(ports, port);

        if (index >= 0) {
            ports.splice(index, 1);
            that.afterRemovePort(port);
        }

        return that;
    }

    removeInPort(port) {

        return this.removePort(port, 'in');
    }

    removeOutPort(port) {

        return this.removePort(port, 'out');
    }

    removePortAt(index, type = 'in') {

        let that = this;
        let ports = type === 'in' ? that.inPorts : that.outPorts;
        let port = ports[index];

        if (port) {
            ports.splice(index, 1);
            that.afterRemovePort(port);
        }

        return port;
    }

    afterRemovePort(port) {

        let that = this;
        let attrs = that.attrs;

        utils.forEach(port.selectors, function (selector) {
            delete attrs[selector];
        });

        return that;
    }

    updatePortsAttrs() {

        let that = this;
        let attrs = {};

        utils.forEach(this.inPorts, function (port, index) {
            let specials = that.getPortAttrs(port, index, 'in');
            port.selectors = utils.keys(specials);
            utils.merge(attrs, specials);
        });

        utils.forEach(this.outPorts, function (port, index) {
            let specials = that.getPortAttrs(port, index, 'out');
            port.selectors = utils.keys(specials);
            utils.merge(attrs, specials);
        });

        utils.merge(that.attrs, attrs);

        return that;
    }

    // check over the `port.name` and `port.id`
    checkPort(port, index, type) {

        let id = type + '-port-' + index;

        if (utils.isFunction(port)) {
            port = port.call(this);
        }

        if (!utils.isObject(port)) {
            port = {
                name: port || id
            };
        }

        if (!port.id) {
            port.id = id;
        }

        // which node belong to
        port.node = this;

        return port;
    }

    // get the attrs for every port, so we can customize
    // the port's position, color, etc
    getPortAttrs(port, index, type) {

        let attrs = {};
        let ports = type === 'in' ? this.inPorts : this.outPorts;
        let root = '.' + type + '>g:nth-child(' + (index + 1) + ')';
        let label = root + '>.port-label';

        attrs[label] = { text: port.name };
        attrs[root] = {
            'ref': '.node-body',
            'ref-y': (index + 0.5) * (1 / ports.length)
        };

        if (type === 'out') {
            attrs[root]['ref-dx'] = 0;
        }

        return attrs;
    }
}


Ports.setDefaults({

    view: PortsView,
    inPorts: [],
    outPorts: [],
    size: {
        width: 80,
        height: 100
    },

    markup: '' +

    '<g class="pane-rotatable">' +
    '  <g class="pane-scalable">' +
    '    <rect class="node-body"/>' +
    '  </g>' +
    '  <text class="node-label"/>' +
    '  <g class="pane-ports in" />' +
    '  <g class="pane-ports out" />' +
    '</g>',

    portMarkup: '' +

    '<g class="pane-port">' +
    '  <circle class="port-body"/>' +
    '  <text class="port-label"/>' +
    '</g>',


    attrs: {
        '.node-label': {
            'text': 'port',
            'ref-x': 0.5,
            'ref-y': 0.5,
            'y-alignment': 'middle',
            'text-anchor': 'middle'
        },
        '.in .port-label': {
            x: -15,
            dy: 4
        },
        '.out .port-label': {
            x: 15,
            dy: 4
        }
    }
});


// exports
// -------

export default Ports;
