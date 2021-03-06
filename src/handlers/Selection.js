import       * as utils from '../common/utils';
import           vector from '../common/vector';
import          Handler from './Handler';
import VertexController from '../controllers/Vertex';

class SelectHandler extends Handler {

  init(options = {}) {

    let that = this;

    this.name = options.name || 'select';

    let paper = this.getPaper();
    let model = this.getModel();

    this.previewVel  = vector('rect', {
      'fill': 'none',
      'stroke-dasharray': '3px, 3px',
      'stroke': 'black'
    });
    this.previewRect = this.previewVel.node;

    paper.controlPane.appendChild(this.previewRect);

    this.hidePreview();

    paper.selection = [];

    this.origin = {
      x: 0,
      y: 0
    };

    paper.on('cell:pointerDown', (cell, view, e) => {

      that.invoke(() => {
        that.origin = {
          x: e.x,
          y: e.y
        };
        that.selectCell(cell, utils.hasModifierKey(e));
      });
    });

    paper.on('cell:pointerMove', (cell, view, e) => {
      that.invoke(() => {
        that.showPreview()
          .redrawPreview(e);
      });
    });

    paper.on('cell:pointerUp', (cell, view, e) => {
      that.invoke(() => {
        let previousPosition = that.origin;
        if (e.x !== previousPosition.x || e.y !== previousPosition.y) {

          model.beginUpdate();

          utils.forEach(paper.selection, (c) => {
            let position = c.metadata.position;
            model.setGeometry(c, {
              position: {
                x: position.x + (e.x - previousPosition.x),
                y: position.y + (e.y - previousPosition.y),
                relative: position.relative
              }
            });
          });

          model.endUpdate();

          utils.forEach(paper.selection, (c) => {
            c.vertexController.redraw();
          });
        }
        that.hidePreview();
      });
    });

    paper.on('blank:pointerDown', (e) => {
      that.invoke(() => {
        if (!utils.hasModifierKey(e)) {
          that.clearSelection();
        }
      });
    });

    return this;
  }

  hidePreview() {

    this.previewVel.hide();

    return this;
  }

  showPreview() {

    this.previewVel.show();
    return this;
  }

  redrawPreview(position) {

    let paper      = this.getPaper();
    let previewVel = this.previewVel;
    let selection  = paper.selection;

    if (selection.length) {

      let minP = {
        x: Number.MAX_VALUE,
        y: Number.MAX_VALUE
      };
      let maxP = {
        x: 0,
        y: 0
      };

      utils.forEach(selection, (cell) => {
        let view = paper.getView(cell);
        let bbox = view.vel.getBBox();
        if (bbox.x < minP.x) {
          minP.x = bbox.x;
        }
        if (bbox.y < minP.y) {
          minP.y = bbox.y;
        }
        if (bbox.x + bbox.width > maxP.x) {
          maxP.x = bbox.x + bbox.width;
        }
        if (bbox.y + bbox.height > maxP.y) {
          maxP.y = bbox.y + bbox.height;
        }
      });

      let previousPosition = this.origin;

      previewVel.attr({
        x: minP.x + (position.x - previousPosition.x),
        y: minP.y + (position.y - previousPosition.y),
        width: maxP.x - minP.x,
        height: maxP.y - minP.y
      });
    }

    return this;
  }

  _selectCell(cell) {

    let paper = this.getPaper();

    cell.vertexController = new VertexController(paper, {
      cell
    });
    cell.selected         = true;
    paper.selection.push(cell);
    return this;
  }

  _unselectCell(cell) {

    let paper     = this.getPaper();
    let selection = paper.selection;

    if (utils.contains(selection, cell)) {
      paper.selection.splice(utils.indexOf(selection, cell), 1);
    }

    cell.vertexController.destroy();
    cell.selected = false;

    return this;
  }

  selectCell(cell, multi) {

    if (!multi) {
      this.clearSelection();
    } else {
      return cell.selected
        ? this._unselectCell(cell)
        : this._selectCell(cell);
    }

    if (cell.selected) {
      return this;
    }

    this.clearSelection();
    this._selectCell(cell);

    return this;
  }

  clearSelection() {

    utils.forEach(this.paper.selection, (cell) => {
      cell.vertexController.destroy();
      cell.selected = false;
    });

    this.paper.selection = [];

    return this;
  }
}


// exports
// -------

export default SelectHandler;
