import Handler   from './Handler';
import Link      from '../cells/Link';
import LinkView  from '../pai/LinkView';
import quadratic from '../pai/quadratic';


class ConnectionHandler extends Handler {

    init() {

        this.clean();

        this.getPaper().on('cell:pointerDown', this.onCellMouseDown.bind(this));

        this.mouseUpHandler    = this.onCellMouseUp.bind(this);
        this.mouseMoveHandler  = this.onCellMouseMove.bind(this);
        this.mouseEnterHandler = this.onCellMouseEnter.bind(this);
        this.mouseLeaveHandler = this.onCellMouseLeave.bind(this);

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

        this.localX = null;
        this.localY = null;

        return this;
    }

    getEventData() {

        return {
            sourceNode: this.sourceNode,
            sourceView: this.sourceView,
            sourcePort: this.sourcePort,
            targetNode: this.targetNode,
            targetView: this.targetView,
            targetPort: this.targetPort,
            localX: this.localX,
            localY: this.localY
        };
    }

    onCellMouseDown(cell, view, e) {

        if (this.isDisabled() || this.isGroup(cell) || this.isRemark(cell) || !this.isNode(cell)) {
            return;
        }

        if (!view.isOutPortElem(e.target)) {
            return;
        }

        this.sourceNode = cell;
        this.sourceView = view;
        this.sourcePort = view.findPortByElem(e.target);

        if (this.sourcePort) {
            this.getPaper()
                .on('cell:pointerMove', this.mouseMoveHandler)
                .on('cell:pointerUp', this.mouseUpHandler);
        }
    }

    onCellMouseMove(cell, view, e, localX, localY) {

        const paper = this.getPaper();
        const model = this.getModel();

        model.beginUpdate();

        if (!this.connecting) {

            this.getPaper()
                .on('cell:mouseenter', this.mouseEnterHandler)
                .on('cell:mouseleave', this.mouseLeaveHandler);

            this.link = new Link({
                view: LinkView,
                pane: 'linkPane',
                // special className for ignore default event handler
                classNames: 'pane-link pane-link-connecting',
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
            // for smooth connecting, do not use the snapped local-point.
            this.link.setTerminal(paper.toLocalPoint({
                x: e.pageX,
                y: e.pageY
            }), false);
        }

        model.endUpdate();

        if (this.targetView) {
            this.localX     = localX;
            this.localY     = localY;
            this.targetPort = this.targetView.findPortByElem(e.target);
        } else {
            this.localX     = null;
            this.localY     = null;
            this.targetPort = null;
        }

        paper.trigger('cell:connecting', this.getEventData());
    }

    onCellMouseUp() {

        if (this.connecting) {

            const paper = this.getPaper();
            const model = this.getModel();

            paper
                .off('cell:pointerMove', this.mouseMoveHandler)
                .off('cell:pointerUp', this.mouseUpHandler)
                .off('cell:mouseenter', this.mouseEnterHandler)
                .off('cell:mouseleave', this.mouseLeaveHandler);

            model.beginUpdate();

            this.link.removeFromParent();

            paper.trigger('cell:connected', this.getEventData());
            model.endUpdate();

            this.clean();
        }
    }

    onCellMouseEnter(cell, view, e) {

        if (this.isGroup(cell) || !this.isNode(cell)) {
            return;
        }

        if (cell === this.sourceCell || !this.connecting) {
            return;
        }

        this.hasTarget  = true;
        this.targetNode = cell;
        this.targetView = view;
        this.targetPort = view.findPortByElem(e.target);
    }

    onCellMouseLeave(cell) {

        if (this.isGroup(cell) || !this.isNode(cell)) {
            return;
        }

        if (!this.hasTarget || !this.connecting) {
            return;
        }

        this.hasTarget  = false;
        this.targetNode = null;
        this.targetView = null;
        this.targetPort = null;
    }
}


// exports
// -------

export default ConnectionHandler;
