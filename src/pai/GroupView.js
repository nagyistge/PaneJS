import * as utils from '../common/utils';
import vector     from '../common/vector';
import CellView   from '../views/CellView';


class GroupView extends CellView {

  render() {

    this.renderMarkup();

    this.scalableNode = this.findOne('.pane-scalable');

    this.resize()
      .translate();

    return this;
  }

  ensureElement() {

    this.vel  = vector(this.cell.getTagName(), {
      class: this.cell.getClassName()
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

  setup() {

    utils.addEventListener(this.elem, 'mousedown', '.btn-toggle', (e) => {
      e.stopPropagation();
    });

    utils.addEventListener(this.elem, 'click', '.btn-toggle', (e) => {
      e.stopPropagation();
      this.cell.toggleCollapse();

      let paper = this.getPaper();
      if (paper) {
        paper.trigger('group:collapseChanged', this.cell);
      }
    });

    return this;
  }

  renderMarkup() {

    const group  = this.cell;
    const markup = this.compileMarkup(group.getMarkup(), group.getRenderData());

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

  setNodeName(name) {

    let group = this.getCell();

    if (group.data) {
      group.data.name = name;
    }

    let vName = this.findOne('.name');
    if (vName) {
      vName.empty();
      vName.append(document.createTextNode(name));
    }

    return this;
  }

  getStrokeWidth() {

    return 1;
  }

  getStrokedBBox() {

    let sw   = this.getStrokeWidth() - 1;
    let bbox = this.getCell().getBBox();

    return sw ? bbox.grow(sw / 2) : bbox;
  }
}


// exports
// -------

export default GroupView;
