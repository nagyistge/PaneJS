import * as utils from '../common/utils';
import Rect       from '../geometry/Rect';
import BaseView   from '../views/NodeView';


const selectors = {
    content: '.pane-node-content',
    name: '.name',
    portList: '.pane-port-list',
    inPortList: '.pane-port-list.in',
    outPortList: '.pane-port-list.out',
    portWrap: '.pane-port-wrap',
    portItem: '.pane-port',
    portMagnet: '.port-magnet',
    portAdsorb: '.is-adsorbed'
};

const classNames = {
    portItem: 'pane-port',
    inPortList: 'pane-port-list in',
    outPortList: 'pane-port-list out',
    connected: 'is-connected',
    connecting: 'is-connecting',
    connectable: 'is-connectable',
    adsorbed: 'is-adsorbed',
};


class NodeView extends BaseView {

    renderMarkup() {

        super.renderMarkup();
        this.renderPorts(true);
        this.renderPorts(false);

        return this;
    }

    renderPorts(isInPort) {

        let node  = this.getCell();
        let ports = node.getVisiblePorts(isInPort);
        let count = ports.length;

        if (count) {

            let portListVel = this.getPortListVel(isInPort);
            if (portListVel) {

                let markup  = node.getPortMarkup();
                let content = utils.map(ports, function (port) {
                    return this.compileMarkup(markup, port);
                }, this).join('');

                portListVel.html(content);

                utils.forEach(portListVel.find(selectors.portWrap), function (vel) {
                    vel.css({ 'width': utils.toPercentage(1 / (count + 1), 2) });
                });

                utils.forEach(ports, function (port) {
                    this.setPortConnected(port, isInPort, port.connected === true);
                }, this);
            }
        }

        return this;
    }

    resize() {

        if (!this.scalableNode) {
            return this;
        }


        let cell   = this.cell;
        let width  = cell.size.width;
        let height = cell.size.height;

        this.scalableNode
            .findOne('foreignobject')
            .attr({
                width,
                height
            });

        utils.forEach(this.scalableNode.find('.pane-port-list'), function (vel) {
            vel.css({
                width: width + 'px'
            });
        });

        return super.resize();
    }

    setNodeName(name) {

        let node = this.getCell();

        if (node.data) {
            node.data.name = name;
        }

        let elem = this.findOne(selectors.name);
        if (elem) {
            utils.emptyElement(elem);
            elem.appendChild(document.createTextNode(name));
        }

        return this;
    }

    setPortConnected(port, isInPort, isConnected) {

        let vel = this.getPortVel(port, isInPort);
        if (vel) {
            vel.toggleClass(classNames.connected, isConnected);
        }
    }

    setPortConnecting(port, isInPort, isConnecting) {

        let vel = this.getPortVel(port, isInPort);
        if (vel) {
            vel.toggleClass(classNames.connecting, isConnecting);
        }
    }

    setPortHighlight(port, isInPort, isHighlighted) {

        let vel = this.getPortVel(port, isInPort);
        if (vel) {
            vel.toggleClass(classNames.connectable, isHighlighted);
        }

        let containerVel = this.findOne(selectors.content);
        if (containerVel) {
            containerVel.toggleClass(classNames.connectable, isHighlighted);
        }

        if (port.connected === true) {
            if (isHighlighted && port.connected) {
                this.setPortConnected(port, isInPort, false);
            } else {
                this.setPortConnected(port, isInPort, true);
            }
        }
    }

    setPortAdsorbed(port, isInPort, isAdsorbed) {

        let vel = this.getPortVel(port, isInPort);
        if (vel) {

            let magnet = vel.findOne(selectors.portMagnet);
            if (magnet) {
                magnet.toggleClass(classNames.adsorbed, isAdsorbed);
            }

            if (isAdsorbed) {

                let selector = this.getPortSelector(isInPort) + ' ' + selectors.portAdsorb;

                utils.forEach(this.find(selector), function (item) {
                    if (!magnet || item.node !== magnet.node) {
                        item.removeClass(classNames.adsorbed);
                    }
                });
            }
        }
    }

    getBBox() {

        let bounds = utils.getBounds(this.elem);
        if (bounds) {
            return new Rect(bounds.left, bounds.top, bounds.width, bounds.height);
        }
    }

    getStrokedBBox() {

        let bbox        = this.cell.getBBox();
        let borderWidth = 0;
        let contentVel  = this.findOne(selectors.content);
        if (contentVel) {
            borderWidth = utils.getComputedStyle(contentVel.node, 'border-width') - 1;
        }

        return borderWidth ? bbox.grow(borderWidth / 2) : bbox;
    }

    getPortBodyBBox(port, isInPort) {

        let elem = this.getPortElem(port, isInPort);
        if (elem) {
            let bounds = utils.getBounds(elem);
            return this.getPaper().toLocalRect({
                x: bounds.left,
                y: bounds.top,
                width: bounds.width,
                height: bounds.height
            });
        }
    }

    getPortSelector(isInPort, port) {

        let selector = this.getPortListSelector(isInPort) + ' ' + selectors.portItem;

        if (port) {
            selector += '[data-id="' + port.id + '"]';
        }

        return selector;
    }

    getPortListSelector(isInPort) {

        return isInPort ? selectors.inPortList : selectors.outPortList;
    }

    getPortListVel(isInPort) {

        return this.findOne(this.getPortListSelector(isInPort));
    }

    getPortsVel(isInPort) {

        return this.find(this.getPortSelector(isInPort));
    }

    getPortVel(port, isInPort) {

        let node = this.getCell();

        if (!utils.isObject(port)) {
            port = node.getPortById(port);
        }

        let selector = this.getPortSelector(isInPort, port);
        if (selector) {
            return this.findOne(selector);
        }
    }

    getPortElem(port, isInPort) {

        const portVel = this.getPortVel(port, isInPort);
        return portVel ? portVel.node : null;
    }

    findPortElem(elem) {

        while (elem && elem !== this.elem) {
            if (utils.hasClass(elem, classNames.portItem)) {
                return elem;
            }
            elem = elem.parentNode;
        }

        return null;
    }

    isPortElem(elem) {

        return this.findPortElem(elem) ? true : false;
    }

    isOutPortElem(elem) {

        elem = this.findPortElem(elem);

        while (elem && elem !== this.elem) {
            if (utils.hasClass(elem, classNames.outPortList)) {
                return true;
            }
            elem = elem.parentNode;
        }

        return false;
    }

    isInPortElem(elem) {

        elem = this.findPortElem(elem);

        while (elem && elem !== this.elem) {
            if (utils.hasClass(elem, classNames.inPortList)) {
                return true;
            }
            elem = elem.parentNode;
        }

        return false;
    }

    findPortByElem(elem) {

        let result   = null;
        let portElem = elem && this.findPortElem(elem);

        if (portElem) {
            let collection = this.isOutPortElem(portElem)
                ? this.cell.getOutPorts()
                : this.cell.getInPorts();

            let portId = portElem.getAttribute('data-id');

            utils.some(collection, function (port) {
                if (utils.toString(port.id) === portId) {
                    result = port;
                    return true;
                }
            });
        }

        return result;
    }
}


// exports
// -------

export default NodeView;
