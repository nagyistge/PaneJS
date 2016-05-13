import * as utils from '../../common/utils';
import     vector from '../../common/vector';
import       Rect from '../../geometry/Rect';
import       Link from '../../cells/Link';
import    Handler from '../../handlers/Handler';


class ConnectionHandler extends Handler {

    init() {

        let paper = this.getPaper();
        let model = this.getModel();

        this.sourceView = null;
        this.targetView = null;
        this.sourcePort = null;
        this.targetPort = null;

        this.connecting     = false;
        this.previewingLink = null;

        paper
            .on('cell:pointerDown', this.onCellMouseDown.bind(this))
            .on('cell:pointerMove', this.onCellMouseMove.bind(this))
            .on('cell:pointerUp', this.onCellMouseUp.bind(this));

        return this;
    }

    onCellMouseDown(cell, view, e) {

        if (this.isDisabled() || !view.isOutPort(e.target)) {
            return;
        }

        let portElem = view.getPortElem(e.target);
        let portId   = utils.toInt(portElem.getAttribute('data-id'));

        utils.some(cell.getOutPorts(), function (port) {
            if (port.id === portId) {
                this.sourcePort = port;
            }
        }, this);

        this.sourceNode = cell;

        console.log(this.sourcePort);
    }

    onCellMouseMove(cell, view, e, localX, localY) {

        if (this.isDisabled() || !this.sourceNode || !this.sourcePort) {
            return;
        }

        if (!this.connecting) {

            this.link = new Link({
                pane: 'decoratePane',
                connector: 'smooth',
                targetMarker: 'block',
                attrs: null
            });

            let model = this.getModel();

            model.addLink(this.link, {
                node: this.sourceNode,
                port: this.sourcePort.id
            });

            this.connecting = true;
        }

        if (this.link) {
            this.link.setTerminal({ x: localX, y: localY }, false);
        }
    }

    onCellMouseUp(cell, view, e) {

        if (this.isDisabled()) {
            return;
        }

        this.connecting = false;
    }

    _isOut(view, elem) {
        return !utils.containsElement(view.elem, elem) && !utils.hasClass(elem, 'port-decorator-layer');
    }

    setSourceCellView(view) {

        let that  = this;
        let paper = this.getPaper();
        if (this.sourceCellView) {
            utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.out'), function (decorator) {
                vector(decorator).remove();
            });
        }

        that.sourceCellView = view;

        if (view) {
            that._drawPortDecorators(view, 'out');
        }

        return this;
    }

    _drawInPortDecorators() {
        let that = this;
        // let sourceView = that.sourceCellView;
        return that;
    }

    _clearInPortDecorators() {
        let that  = this;
        let paper = that.paper;
        utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.in'), function (decorator) {
            vector(decorator).remove();
        });
        return that;
    }

    _drawPortDecorators(view, inOrOut) {

        let decoratorMarkup = [
            '<g class="port-decorator ${className}">',
            '<circle class="back port-decorator-layer" r="8" cx="${x}" cy="${y}"></circle>',
            '<circle class="front port-decorator-layer" r="3" cx="${x}" cy="${y}"></circle>',
            '</g>'
        ].join('');

        let portBodies   = view.elem.querySelectorAll('.pane-ports.' + inOrOut + ' .pane-port .port-body');
        let paper        = this.getPaper();
        let decoratePane = paper.decoratePane;

        utils.forEach(portBodies, function (portBody) {
            let bbox      = Rect.fromRect(vector(portBody).getBBox(false));
            let center    = bbox.getCenter();
            let decorator = vector(utils.format(decoratorMarkup, utils.extend({
                className: inOrOut
            }, center)));
            decoratePane.appendChild(decorator.node);
            decorator.node.cellView = view;
            decorator.node.portBody = portBody;
            // TODO decorator.node.portMeta = portMeta
        });
    }

    setTargetCellView(/* view */) {
        let that = this;
        return that;
    }
}

export default ConnectionHandler;
