import * as utils from '../common/utils';
import     vector from '../common/vector';
import       Rect from '../geometry/Rect';
import       Link from '../cells/Link';
import    Handler from './Handler';


class ConnectionHandler extends Handler {

  init(options = {}) {

    let that  = this;
    let paper = this.getPaper();
    let model = this.getModel();

    this.name = options.name || 'connection';

    this.sourceCellView = null;
    this.targetCellView = null;
    this.sourcePort     = null;
    this.targetPort     = null;

    this.connecting     = false;
    this.previewingLink = null;

    paper.on('cell:mouseOver', (cell, view) => {
      if (that.sourceCellView !== view) {
        if (that.connecting) {
          // 加校验
          that.setTargetCellView(view);
        } else {
          // 加校验
          that.setSourceCellView(view);
        }
      }
    });

    paper.on('cell:mouseOut', (cell, view, e) => {
      if (that.connecting) {
        if (that.targetCellView === view && that._isOut(view, e.toElement)) {
          that.setTargetCellView(null);
        }
      } else {
        if (that.sourceCellView === view && that._isOut(view, e.toElement)) {
          that.setSourceCellView(null);
        }
      }
    });

    utils.addEventListener(paper.decoratePane, 'mouseout', '.port-decorator.out', (e) => {
      if (!that.connecting && !utils.hasClass(e.toElement, 'port-decorator-layer')) {
        that.setSourceCellView(null);
      }
    });

    utils.addEventListener(paper.decoratePane, 'mousedown', '.port-decorator.out', (e) => {
      that.connecting   = true;
      let decoratorNode = e.delegateTarget;
      that.sourcePort   = decoratorNode.cellView.findPortByElem(decoratorNode.portBody);
      that._drawInPortDecorators();
    });

    utils.addEventListener(paper.container, 'mousemove', (e) => {
      if (that.connecting) {
        if (that.previewingLink) {
          model.setTerminal(that.previewingLink, paper.toLocalPoint({
            x: e.x,
            y: e.y
          }), false);
        } else {
          that.previewingLink = new Link({
            sourceMarker: 'block',
            targetMarker: 'block'
          });
          model.addLink(that.previewingLink, {
            node: that.sourceCellView.cell,
            port: that.sourcePort,
          }, paper.toLocalPoint({
            x: e.x,
            y: e.y
          }));
        }
      }
    });

    paper.on('cell:pointerUp', (/* cell, view, e, x, y */) => {
      // console.log('cell:mouseup');
      // if (that.connecting) {
      // } else {
      // }
      that.connecting = false;
      that.setSourceCellView(null);
      that._clearInPortDecorators();
    });
    paper.on('blank:pointerUp', (/* cell, view, e, x, y */) => {
      // console.log('blank:mouseup');
      // if (that.connecting) {
      // } else {
      // }
      that.connecting = false;
      that.setSourceCellView(null);
      that._clearInPortDecorators();
    });

    return this;
  }

  _isOut(view, elem) {
    return !utils.containsElement(view.elem, elem) && !utils.hasClass(elem, 'port-decorator-layer');
  }

  setSourceCellView(view) {

    let that  = this;
    let paper = this.getPaper();
    if (this.sourceCellView) {
      utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.out'), (decorator) => {
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
    utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.in'), (decorator) => {
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

    utils.forEach(portBodies, (portBody) => {
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
