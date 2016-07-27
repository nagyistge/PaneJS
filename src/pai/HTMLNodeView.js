import * as utils from '../common/utils';
import Rect       from '../geometry/Rect';
import CellView   from '../views/CellView';


const selectors = {
    scalable: '.pane-scalable',
    rotatable: '.pane-rotatable',
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

class HTMLNodeView extends CellView {

    static get specialAttributes() {

        return [
            'text',
            'html',
            'style'
        ];
    }

    render() {

        this.renderMarkup()
            .renderPorts();

        this.scalableNode  = this.findOne(selectors.scalable);
        this.rotatableNode = this.findOne(selectors.rotatable);

        this.update()
            .resize()
            .rotate()
            .translate();

        return this;
    }

    ensureElement() {

        this.elem = utils.createElement(this.cell.getTagName());

        // attach cell's id to elem
        this.elem.cellId = this.cell.id;

        let className = this.cell.getClassName();
        if (className) {
            utils.addClass(this.elem, className);
        }

        let pane = this.getPane();
        if (pane) {
            pane.appendChild(this.elem);
        }

        return this;
    }

    renderMarkup() {

        let markup = this.compileMarkup(this.cell.getMarkup(), this.cell.data);

        this.elem.innerHTML = markup;

        return this;
    }

    renderPorts() {

        let node     = this.getCell();
        let inPorts  = node.getVisiblePorts(true);
        let outPorts = node.getVisiblePorts(false);
        let markup   = node.getPortMarkup();

        if (inPorts.length) {

            let inPortsWrap = this.findOne(selectors.inPortList);
            let width       = 100 / (inPorts.length + 1);

            utils.forEach(inPorts, function (port, i) {

                let html = this.compileMarkup(markup, port);

                $(html)
                    .css({ left: utils.toFixed(width * (i + 1), 4) + '%' })
                    .appendTo(inPortsWrap);
            }, this);
        }

        if (outPorts.length) {

            let outPortsWrap = this.findOne(selectors.outPortList);
            let width        = 100 / (outPorts.length + 1);


            utils.forEach(outPorts, function (port, i) {

                let html = this.compileMarkup(markup, port);

                $(html)
                    .css({ left: utils.toFixed(width * (i + 1), 4) + '%' })
                    .appendTo(outPortsWrap);

            }, this);
        }

        return this;
    }

    find(selector) {

        return selector === '.' ? [this.elem] : this.elem.querySelectorAll(selector);
    }

    findOne(selector) {

        return selector === '.' ? this.elem : this.elem.querySelector(selector);
    }

    update(specifiedAttrs) {

        utils.forIn(specifiedAttrs || this.cell.attrs, function (attrs, selector) {

            let nodes = this.find(selector);
            if (!nodes.length) {
                return;
            }

            let specials = HTMLNodeView.specialAttributes.slice();
            let normal   = {};

            utils.forIn(attrs, function (value, key) {
                if (!utils.contains(specials, key)) {
                    normal[key] = value;
                }
            });

            // set regular attributes
            if (!utils.isEmptyObject(normal)) {
                utils.forEach(nodes, function (node) {
                    utils.forIn(normal, function (attrVal, attrName) {
                        utils.setAttribute(node, attrName, attrVal);
                    });
                });
            }

            if (!utils.isUndefined(attrs.style)) {

                if (utils.isString(attrs.style)) {
                    utils.forEach(nodes, function (node) {
                        utils.setAttribute(node, 'style', attrs.style);
                    });
                } else if (utils.isObject(attrs.style)) {
                    utils.forEach(nodes, function (node) {
                        utils.forIn(attrs.style, function (val, name) {
                            node.style[name] = val;
                        });
                    });
                }
            }

            if (!utils.isUndefined(attrs.html)) {
                utils.forEach(nodes, function (node) {
                    node.innerHTML = attrs.html || '';
                });
            }

            if (!utils.isUndefined(attrs.text)) {
                utils.forEach(nodes, function (node) {
                    utils.emptyElement(node);
                    node.appendChild(document.createTextNode(attrs.text || ''));
                });
            }

        }, this);

        return this;
    }

    resize() {

        let scalable = this.scalableNode;
        if (!scalable) {
            return this;
        }

        let width  = scalable.clientWidth || scalable.offsetWidth || 1;
        let height = scalable.clientHeight || scalable.offsetHeight || 1;

        let size = this.cell.getSize();

        let sx = size.width / width;
        let sy = size.height / height;

        sx = utils.toFixed(sx, 2);
        sy = utils.toFixed(sy, 2);

        utils.setScale(scalable, sx, sy);

        return this;
    }

    rotate() {

        if (this.rotatableNode) {

            let size = this.cell.getSize();
            let ox   = size.width / 2;
            let oy   = size.height / 2;

            utils.setRotation(this.rotatableNode, this.cell.getRotation(), ox, oy);
        }

        return this;
    }

    translate() {

        let position = this.cell.getPosition();

        utils.setTranslate(this.elem, position.x, position.y);

        return this;
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

        let elem = this.getPortElem(port, isInPort);
        if (elem) {
            utils.toggleClass(elem, classNames.connected, isConnected);
        }
    }

    setPortConnecting(port, isInPort, isConnecting) {

        let elem = this.getPortElem(port, isInPort);
        if (elem) {
            utils.toggleClass(elem, classNames.connecting, isConnecting);
        }
    }

    setPortHighlight(port, isInPort, isHighlighted) {

        let elem = this.getPortElem(port, isInPort);
        if (elem) {
            utils.toggleClass(elem, classNames.connectable, isHighlighted);
        }

        let container = this.findOne(selectors.content);
        if (container) {
            utils.toggleClass(container, classNames.connectable, isHighlighted);
        }
    }

    setPortAdsorbed(port, isInPort, isAdsorbed) {

        let elem = this.getPortElem(port, isInPort);

        elem = elem && elem.querySelector(selectors.portMagnet);
        elem && utils.toggleClass(elem, classNames.adsorbed, isAdsorbed);
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
        let contentElem = this.findOne(selectors.content);

        if (contentElem) {
            borderWidth = utils.getComputedStyle(contentElem, 'border-width') - 1;
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

    getPortElem(port, isInPort) {

        let node = this.getCell();

        if (!utils.isObject(port)) {
            port = node.getPortById(port);
        }

        let selector = this.getPortSelector(port, isInPort);
        if (selector) {
            return this.findOne(selector);
        }
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

            let portId = utils.toInt(portElem.getAttribute('data-id'));

            utils.some(collection, function (port) {
                if (port.id === portId) {
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

export default HTMLNodeView;
