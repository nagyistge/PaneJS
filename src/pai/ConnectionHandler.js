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

        this.getPaper()
            .on('cell:mouseOver', this.onCellMouseOver.bind(this))
            .on('cell:mouseOut', this.onCellMouseOut.bind(this))
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

        paper.trigger('cell:connecting', {
            sourceNode: this.sourceNode,
            sourceView: this.sourceView,
            sourcePort: this.sourcePort
        });
    }

    onCellMouseUp(cell, view, e) {

        if (this.isDisabled() || !this.connecting) {
            return;
        }

        let paper = this.getPaper();
        let model = this.getModel();

        model.beginUpdate();

        this.link.removeFromParent();

        paper.trigger('cell:connected', {
            sourceNode: this.sourceNode,
            sourceView: this.sourceView,
            sourcePort: this.sourcePort,
            targetNode: this.targetNode,
            targetView: this.targetView,
            targetPort: this.targetPort
        });

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
    }

    onCellMouseOut(cell) {

        if (this.isDisabled() || !cell.isNode() || !this.hasTarget || !this.connecting) {
            return;
        }

        this.hasTarget  = false;
        this.targetNode = null;
        this.targetView = null;
        this.targetPort = null;
    }
}

export default ConnectionHandler;
