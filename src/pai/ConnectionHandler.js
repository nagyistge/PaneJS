import * as utils from '../common/utils';
import     vector from '../common/vector';
import    Handler from '../handlers/Handler';
import       Rect from '../geometry/Rect';
import       Link from '../cells/Link';
import   LinkView from '../pai/LinkView';
import  quadratic from '../pai/quadratic';


class ConnectionHandler extends Handler {

    init() {

        this.clean();

        this.mouseOverHandler = this.onCellMouseOver.bind(this);
        this.mouseOutHandler  = this.onCellMouseOut.bind(this);

        this.getPaper()
            //.on('cell:mouseOver', this.onCellMouseOver.bind(this))
            //.on('cell:mouseOut', this.onCellMouseOut.bind(this))
            .on('cell:pointerDown', this.onCellMouseDown.bind(this))
            .on('cell:pointerMove', this.onCellMouseMove.bind(this))
            .on('cell:pointerUp', this.onCellMouseUp.bind(this));

        return this;
    }

    clean() {

        this.sourceNode = null;
        this.sourcePort = null;
        this.sourceView = null;
        this.connecting = false;

        this.targetNode = null;
        this.targetView = null;
        this.targetPort = null;
        this.hasTarget  = false;

        return this;
    }

    getEventData() {

        return {
            sourceNode: this.sourceNode,
            sourceView: this.sourceView,
            sourcePort: this.sourcePort,
            targetNode: this.targetNode,
            targetView: this.targetView,
            targetPort: this.targetPort
        };
    }

    onCellMouseDown(cell, view, e) {

        if (this.isDisabled() || !cell.isNode() || !view.isOutPortElem(e.target)) {
            return;
        }

        this.sourceNode = cell;
        this.sourceView = view;
        this.sourcePort = view.findPortByElem(e.target);
    }

    onCellMouseMove(cell, view, e, localX, localY) {

        if (this.isDisabled() || !this.sourcePort) {
            return;
        }

        let paper = this.getPaper();
        let model = this.getModel();

        model.beginUpdate();

        if (!this.connecting) {

            this.getPaper()
                .on('cell:mouseOver', this.mouseOverHandler)
                .on('cell:mouseOut', this.mouseOutHandler);

            this.link = new Link({
                view: LinkView,
                pane: 'decoratePane',
                connector: quadratic,
                sourceMarker: null,
                targetMarker: 'block',
                attrs: null
            });

            model.addLink(this.link, {
                node: cell,
                port: this.sourcePort.id
            });

            this.connecting = true;
        }

        if (this.link) {
            this.link.setTerminal({ x: localX, y: localY }, false);
        }

        model.endUpdate();

        paper.trigger('cell:connecting', this.getEventData());
    }

    onCellMouseUp(cell, view, e) {

        if (this.isDisabled() || !this.connecting) {
            return;
        }

        let paper = this.getPaper();
        let model = this.getModel();

        paper
            .off('cell:mouseOver', this.mouseOverHandler)
            .off('cell:mouseOut', this.mouseOutHandler);

        model.beginUpdate();

        //this.link.removeFromParent();

        paper.trigger('cell:connected', this.getEventData());
        model.endUpdate();

        this.clean();
    }

    onCellMouseOver(cell, view, e) {

        if (this.isDisabled() || !cell.isNode() || cell === this.sourceCell || !this.connecting) {
            return;
        }

        this.hasTarget  = true;
        this.targetNode = cell;
        this.targetView = view;
        this.targetPort = view.findPortByElem(e.target);


        this.getPaper().trigger('cell:connectingMouseOver', this.getEventData());
    }

    onCellMouseOut(cell) {

        if (this.isDisabled() || !cell.isNode() || !this.hasTarget || !this.connecting) {
            return;
        }

        this.getPaper().trigger('cell:connectingMouseOut', this.getEventData());

        this.hasTarget  = false;
        this.targetNode = null;
        this.targetView = null;
        this.targetPort = null;
    }
}

export default ConnectionHandler;
