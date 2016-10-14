import Handler   from '../handlers/Handler';
import Link      from '../cells/Link';
import LinkView  from '../pai/LinkView';
import quadratic from '../pai/quadratic';


class ConnectionHandler extends Handler {

  init() {

    this.clean();

    this.mouseEnterHandler = this.onCellMouseEnter.bind(this);
    this.mouseLeaveHandler = this.onCellMouseLeave.bind(this);

    this.getPaper()
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

  onCellMouseMove(cell, view, e) {

    if (this.isDisabled() || !this.sourcePort) {
      return;
    }

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
      this.targetPort = this.targetView.findPortByElem(e.target);
    }

    paper.trigger('cell:connecting', this.getEventData());
  }

  onCellMouseUp() {

    if (this.isDisabled() || !this.connecting) {
      return;
    }

    const paper = this.getPaper();
    const model = this.getModel();

    paper
      .off('cell:mouseenter', this.mouseEnterHandler)
      .off('cell:mouseleave', this.mouseLeaveHandler);

    model.beginUpdate();

    this.link.removeFromParent();

    paper.trigger('cell:connected', this.getEventData());
    model.endUpdate();

    this.clean();
  }

  onCellMouseEnter(cell, view, e) {

    if (this.isDisabled()
      || !cell.isNode()
      || cell === this.sourceCell
      || !this.connecting) {

      return;
    }

    this.hasTarget  = true;
    this.targetNode = cell;
    this.targetView = view;
    this.targetPort = view.findPortByElem(e.target);
  }

  onCellMouseLeave(cell) {

    if (this.isDisabled()
      || !cell.isNode()
      || !this.hasTarget
      || !this.connecting) {

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
