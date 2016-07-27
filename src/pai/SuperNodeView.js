import * as utils from '../common/utils';
import vector     from '../common/vector';
import Rect       from '../geometry/Rect';
import CellView   from '../views/CellView';


class HTMLNodeView extends CellView {

    render() {

        this.renderMarkup();

        this.scalableNode = this.findOne('.pane-scalable');

        this.resize()
            .translate();

        return this;
    }

    ensureElement() {

        this.vel  = vector(this.cell.getTagName(), {
            'class': this.cell.getClassName()
        });
        this.elem = this.vel.node;

        // attach cell's id to elem
        this.elem.cellId = this.cell.id;

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

    find(selector) {

        return selector === '.' ? [this.vel] : this.vel.find(selector);
    }

    findOne(selector) {

        return selector === '.' ? this.vel : this.vel.findOne(selector);
    }

    resize() {

        let scalableNode = this.scalableNode;
        if (!scalableNode) {
            return this;
        }

        // get bbox without transform
        let bbox = scalableNode.getBBox(true);
        let size = this.cell.getSize();

        let sx = size.width / (bbox.width || 1);
        let sy = size.height / (bbox.height || 1);

        sx = utils.toFixed(sx, 2);
        sy = utils.toFixed(sy, 2);

        scalableNode.scale(sx, sy);

        return this;
    }

    translate() {

        let position = this.cell.getPosition();

        this.vel.translate(position.x, position.y);

        return this;
    }

    setPortConnected(port, isSourcePort, isConnected) {

        let elem = this.getPortElem(port, isSourcePort);
        if (elem) {
            utils.toggleClass(elem, 'is-connected', isConnected);
        }
    }

    setPortConnecting(port, isSourcePort, isConnecting) {

        let elem = this.getPortElem(port, isSourcePort);
        if (elem) {
            utils.toggleClass(elem, 'is-connecting', isConnecting);
        }
    }

    setPortHighlight(port, isSourcePort, isHighlighted) {

        let elem = this.getPortElem(port, isSourcePort);
        if (elem) {
            utils.toggleClass(elem, 'is-connectable', isHighlighted);
        }

        let container = this.findOne('.pane-node-content');
        if (container) {
            utils.toggleClass(container, 'is-connectable', isHighlighted);
        }
    }

    setPortAdsorbed(port, isSourcePort, isAdsorbed) {

        let elem = this.getPortElem(port, isSourcePort);

        elem = elem && elem.querySelector('.port-magnet');
        elem && utils.toggleClass(elem, 'is-adsorbed', isAdsorbed);
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
        let contentElem = this.findOne('.pane-node-content');

        if (contentElem) {
            borderWidth = utils.getComputedStyle(contentElem, 'border-width') - 1;
        }

        return borderWidth ? bbox.grow(borderWidth / 2) : bbox;
    }

    getPortBodyBBox(port, isSourcePort) {

        let elem = this.getPortElem(port, isSourcePort);
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

    getPortElem(port, isSourcePort) {

        let node = this.getCell();

        if (!utils.isObject(port)) {
            port = node.getPortById(port);
        }

        let selector = node.getPortSelector(port, !isSourcePort);
        if (selector) {
            return this.findOne(selector);
        }
    }

    findPortElem(elem) {

        while (elem && elem !== this.elem) {
            if (utils.hasClass(elem, 'pane-port')) {
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
            if (utils.hasClass(elem, 'pane-ports out')) {
                return true;
            }
            elem = elem.parentNode;
        }

        return false;
    }

    isInPortElem(elem) {

        elem = this.findPortElem(elem);

        while (elem && elem !== this.elem) {
            if (utils.hasClass(elem, 'pane-ports in')) {
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
