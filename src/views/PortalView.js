import * as utils from '../common/utils';
import     vector from '../common/vector';
import    Ellipse from '../geometry/Ellipse';
import   NodeView from '../views/NodeView';


class PortalView extends NodeView {

  renderMarkup() {

    super.renderMarkup();
    this.renderPorts();

    return this;
  }

  renderPorts() {

    let vel  = this.vel;
    let cell = this.getCell();

    let inPorts    = cell.getInPorts();
    let outPorts   = cell.getOutPorts();
    let portMarkup = cell.getPortMarkup();

    let inPortWrap  = vel.findOne(cell.getPortsWrapSelector(true));
    let outPortWrap = vel.findOne(cell.getPortsWrapSelector(false));

    if (inPortWrap) {

      inPortWrap.empty();

      utils.forEach(inPorts, function (port) {
        let html = this.compileMarkup(portMarkup, port);
        inPortWrap.append(vector(html));
      }, this);
    }

    if (outPortWrap) {

      outPortWrap.empty();

      utils.forEach(outPorts, function (port) {
        let html = this.compileMarkup(portMarkup, port);
        outPortWrap.append(vector(html));
      }, this);
    }


    return this;
  }

  getConnectionPointOnPort() {

    return null;
  }

  getPortBodyBBox(port) {

    let node   = this.getCell();
    let portId = utils.isObject(port) ? port.id : port;

    port = node.getPortById(portId);

    let selector = node.getPortSelector(port, node.isInPort(port));
    if (selector) {
      let vel  = this.findOne(selector);
      let body = vel && vel.findOne('.port-body');
      if (body) {
        return body.getBBox();
      }
    }

    return null;
  }

  getPortBodyGeom(port) {

    let node   = this.getCell();
    let portId = utils.isObject(port) ? port.id : port;

    port = node.getPortById(portId);

    let selector = node.getPortSelector(port, node.isInPort(port));
    if (selector) {
      let vel  = this.findOne(selector);
      let body = vel && vel.findOne('.port-body');
      let elem = body && body.node;

      if (elem) {

        let bbox   = body.getBBox(false, this.getPane());
        let center = bbox.getCenter();

        let result;

        if (utils.isNode(elem, 'circle')) {
          let r = utils.getComputedStyle(elem, 'r');

          r = utils.toFloat(r);

          if (r) {
            result = new Ellipse(center.x, center.y, r, r);
          }
        } else if (utils.isNode(elem, 'ellipse')) {
          let rx = utils.getComputedStyle(elem, 'rx');
          let ry = utils.getComputedStyle(elem, 'ry');

          rx = utils.toFloat(rx);
          ry = utils.toFloat(ry);

          if (rx && ry) {
            result = new Ellipse(center.x, center.y, rx, ry);
          }
        } else {
          result = bbox;
        }

        return result;
      }
    }

    return null;
  }

  findPortByElem(elem) {

    let that  = this;
    let vel   = that.vel;
    let cell  = that.cell;
    let vPort = vector(elem);

    let className = 'pane-port';

    if (!vPort.hasClass(className)) {
      vPort = vPort.findParent(className, vel.node);
    }

    if (vPort) {

      let vWrap = vPort.parent();
      if (vWrap) {

        let index = vPort.index();
        let type  = vWrap.hasClass('in')
          ? 'in' : vWrap.hasClass('out')
          ? 'out' : '';
        let ports = type === 'in'
          ? cell.inPorts : type === 'out'
          ? cell.outPorts
          : [];

        let selector = cell.getPortSelector(type, index);
        let result   = null;

        utils.some(ports, (port) => {

          if (port.selector === selector) {
            result = port;
            return true;
          }

          return false;

        });

        return result;
      }
    }

    return null;
  }
}


// exports
// -------

export default PortalView;
