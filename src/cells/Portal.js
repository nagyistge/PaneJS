import * as utils from '../common/utils';
import Node       from '../cells/Node';
import PortalView from '../views/PortalView';

class Portal extends Node {

    constructor(options) {

        super(options);

        this.portById = {};

        this.inPorts  = utils.map(this.metadata.inPorts, function (port) {

            let ret = this.standardizePort(port);

            this.portById[ret.id] = ret;

            return ret;

        }, this);
        this.outPorts = utils.map(this.metadata.outPorts, function (port) {

            let ret = this.standardizePort(port);

            this.portById[ret.id] = ret;

            return ret;

        }, this);
    }

    eachInPort(iterator, context) {

        utils.forEach(this.inPorts, iterator, context);
    }

    eachOutPort(iterator, context) {

        utils.forEach(this.outPorts, iterator, context);
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

        return utils.some(this.inPorts, function (item) {
            return item.id === port.id;
        });
    }

    isOutPort(port) {

        return utils.some(this.outPorts, function (item) {
            return item.id === port.id;
        });
    }

    standardizePort(port) {

        if (!utils.isObject(port)) {
            port = { id: port };
        }

        if (!port.id) {
            port.id = utils.uuid();
        }

        return port;
    }

    getPortMarkup() {

        return this.metadata.portMarkup;
    }
}


Portal.setDefaults({
    portMarkup: '',
    view: PortalView,

    inPorts: [],
    outPorts: []
});


// exports
// -------

export default Portal;
