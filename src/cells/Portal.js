import { uuid } from '../utils/string';
import { isObject } from '../utils/lang';
import { map, some, forEach } from '../utils/array';
import Node       from '../cells/Node';
import PortalView from '../views/PortalView';

class Portal extends Node {

    constructor(options) {

        super(options);

        this.inPorts  = map(this.metadata.inPorts, port => this.standardizePort(port));
        this.outPorts = map(this.metadata.outPorts, port => this.standardizePort(port));
        this.portById = {};

        forEach(this.inPorts, port => {
            this.portById[port.id] = port;
        });

        forEach(this.outPorts, port => {
            this.portById[port.id] = port;
        });
    }

    eachInPort(iterator, context) {

        forEach(this.inPorts, iterator, context);
    }

    eachOutPort(iterator, context) {

        forEach(this.outPorts, iterator, context);
    }

    getInPorts() {

        return this.inPorts;
    }

    getOutPorts() {

        return this.outPorts;
    }

    getPortById(id) {

        return this.portById[id] || null;
    }

    isInPort(port) {

        return some(this.inPorts, item => item.id === port.id);
    }

    isOutPort(port) {

        return some(this.outPorts, item => item.id === port.id);
    }

    standardizePort(port) {

        if (!isObject(port)) {
            port = { id: port };
        }

        if (!port.id) {
            port.id = uuid();
        }

        return port;
    }

    getPortMarkup() {

        return this.metadata.portMarkup;
    }
}


Portal.setDefaults({
    portMarkup: '',
    inPorts: [],
    outPorts: [],
    view: PortalView
});


// exports
// -------

export default Portal;
