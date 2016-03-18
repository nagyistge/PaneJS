import * as utils from '../../common/utils';
import       Node from '../../cells/Node';
import  PortsView from '../basic/PortsView';


class Ports extends Node {

    constructor(options) {

        super(options);

        let that = this;

        that.inPorts = utils.map(that.metadata.inPorts, function (port, index) {
            return that.normalize(port, index, 'in');
        });

        that.outPorts = utils.map(that.metadata.outPorts, function (port, index) {
            return that.normalize(port, index, 'out');
        });

        that.updatePortsAttrs();
    }

    insertPort(port, index, type = 'in') {

        let that  = this;
        let ports = type === 'in' ? that.inPorts : that.outPorts;

        index = utils.fixIndex(index, ports.length);
        port  = that.normalize(port, index, type);

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

        let that  = this;
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

        let that  = this;
        let ports = type === 'in' ? that.inPorts : that.outPorts;
        let port  = ports[index];

        if (port) {
            ports.splice(index, 1);
            that.afterRemovePort(port);
        }

        return port;
    }

    getPortAt(index, type = 'in') {

        let ports = type === 'in' ? this.inPorts : this.outPorts;

        return ports[index];
    }

    queryPort(filter) {

        if (filter) {

            let type  = filter.type;
            let ports = type === 'in'
                ? this.inPorts : type === 'out'
                ? this.outPorts
                : this.inPorts.concat(this.outPorts);

            let keys = utils.keys(filter);

            return utils.filter(ports, function (item) {
                return utils.every(keys, function (key) {
                    return item[key] === filter[key];
                });
            });
        }

        return [];
    }

    afterRemovePort(port) {

        let that  = this;
        let attrs = that.attrs;

        utils.forEach(port.selectors, function (selector) {
            delete attrs[selector];
        });

        return that;
    }

    updatePortsAttrs() {

        let that  = this;
        let attrs = {};

        utils.forEach(this.inPorts, function (port, index) {
            let specials   = that.getPortAttrs(port, index, 'in');
            port.selectors = utils.keys(specials);
            utils.merge(attrs, specials);
        });

        utils.forEach(this.outPorts, function (port, index) {
            let specials   = that.getPortAttrs(port, index, 'out');
            port.selectors = utils.keys(specials);
            utils.merge(attrs, specials);
        });

        utils.merge(that.attrs, attrs);

        return that;
    }

    normalize(port, index, type) {

        let id  = type + '-port-' + index;

        if (!utils.isObject(port)) {
            port = {
                name: port || id
            };
        } else {
            port = utils.merge({}, port);

        }

        if (!port.id) {
            port.id = id;
        }

        // the port selector
        port.selector = this.getPortSelector(type, index);

        // which node belong to
        port.node = this;


        return port;
    }

    // get the attrs for every port, so we can customize
    // the port's position, color, etc
    getPortAttrs(port, index, type) {

        let attrs = {};
        let ports = type === 'in' ? this.inPorts : this.outPorts;

        let rootSelector  = this.getPortSelector(type, index);
        let labelSelector = rootSelector + '>.port-label';

        attrs[labelSelector] = { text: port.name };
        attrs[rootSelector]  = {
            'ref': '.node-body',
            'ref-y': (index + 0.5) * (1 / ports.length)
        };

        if (type === 'out') {
            attrs[rootSelector]['ref-dx'] = 0;
        }

        return attrs;
    }

    getPortSelector(type, index) {

        return '.' + type + '>g:nth-child(' + (index + 1) + ')';
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
