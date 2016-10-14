import * as utils from '../common/utils';
import Handler    from '../handlers/Handler';


// const
// -----
const win = window;
const doc = win.document;

const defaults = {
  minWidth: 120,
  maxWidth: 300
};

class SizeHandler extends Handler {

  configure(options) {

    this.options = utils.merge({}, defaults, options);

    return this;
  }

  init() {

    let temp = utils.createElement('div');

    temp.innerHTML = '' +
      '<div class="pane-resize">' +
      '  <div class="pane-resize-w">' +
      '    <div class="pane-resize-dot"></div>' +
      '  </div>' +
      '  <div class="pane-resize-e">' +
      '    <div class="pane-resize-dot"></div>' +
      '  </div>' +
      '</div>';

    this.handleBar = temp.querySelector('.pane-resize');

    this.setup();

    return this;
  }

  setup() {

    this.getPaper()
      .on('paper:focus', this.onFocusChanged.bind(this))
      .on('cell:focus', this.onFocusChanged.bind(this))
      .on('cells:updatePosition', this.onNodesPositionChanged.bind(this));

    utils.addEventListener(this.handleBar, 'mousedown', '.pane-resize-w', (e) => {

      this.onMousedown(e, 'w');

      e.stopPropagation();
    });

    utils.addEventListener(this.handleBar, 'mousedown', '.pane-resize-e', (e) => {


      this.onMousedown(e, 'e');

      e.stopPropagation();
    });

    utils.addEventListener(this.handleBar, 'mousedown', (e) => {

      e.stopPropagation();

      if (this.direction) {
        return;
      }

      this.getPaper()
        .triggerPointDown(e, this.getCurrentCell(), this.getCurrentView());
    });
  }

  onMousedown(e, direction) {


    let local = this.getLocalPoint(e);

    this.startX = local.x;
    this.startY = local.y;

    this.direction     = direction;
    this.directionElem = this.handleBar.querySelector('.pane-resize-' + direction);

    this.originBounds = {
      x: this.bounds.x,
      y: this.bounds.y,
      width: this.bounds.width,
      height: this.bounds.height
    };

    utils.addClass(this.directionElem, 'hovered');

    this.onMouseMoveHandler = this.onMouseMoveHandler || this.onMousemove.bind(this);
    this.onMouseUpHandler   = this.onMouseUpHandler || this.onMouseup.bind(this);

    utils.addEventListener(doc, 'mousemove', this.onMouseMoveHandler);
    utils.addEventListener(doc, 'mouseup', this.onMouseUpHandler);
  }

  onMousemove(e) {

    let local = this.getLocalPoint(e);

    let dx = local.x - this.startX;
    // let dy = local.y - this.startY;

    let originBounds  = this.originBounds;
    let currentBounds = this.bounds;

    let minWidth = this.options.minWidth;
    let maxWidth = this.options.maxWidth;

    if (dx !== 0) {

      if (this.direction === 'w') {

        let width = utils.clamp(originBounds.width - dx, minWidth, maxWidth);

        dx = originBounds.width - width;

        currentBounds.x     = originBounds.x + dx;
        currentBounds.width = width;

        this.updateHandleBar();

      } else if (this.direction === 'e') {

        currentBounds.width = utils.clamp(originBounds.width + dx, minWidth, maxWidth);

        this.updateHandleBar();
      }
    }
  }

  onMouseup() {


    utils.removeClass(this.directionElem, 'hovered');


    let paper  = this.getPaper();
    let model  = this.getModel();
    let cell   = this.currentCell;
    let bounds = this.bounds;

    model.beginUpdate();

    cell.setPosition({
      x: bounds.x,
      y: bounds.y,
      relative: false
    });

    cell.setSize({
      width: bounds.width,
      height: bounds.height,
      relative: false
    });

    model.endUpdate();

    if (bounds.x !== this.originBounds.x || bounds.y !== this.originBounds.y) {
      paper.trigger('cells:updatePosition', [cell]);
    }

    paper.trigger('cell:sizeChanged', cell);


    this.direction     = null;
    this.directionElem = null;
    this.originBounds  = null;


    utils.removeEventListener(doc, 'mousemove', this.onMouseMoveHandler);
    utils.removeEventListener(doc, 'mouseup', this.onMouseUpHandler);
  }

  onFocusChanged(cell) {

    if (this.canResize(cell)) {
      this.currentCell = cell;
      this.showHandleBar();
      this.resetHandleBar();
    } else {
      this.currentCell = null;
      this.hideHandleBar();
    }
  }

  onNodesPositionChanged(nodes) {

    let cell = this.getCurrentCell();

    utils.some(nodes, (node) => {

      if (cell === node) {
        this.resetHandleBar();
        return true;
      }

      return false;
    });
  }

  getCurrentCell() {

    return this.currentCell;
  }

  getCurrentView() {

    let paper = this.getPaper();
    let cell  = this.getCurrentCell();

    return paper.getView(cell);
  }

  getLocalPoint(e) {

    return this.getPaper().snapToGrid({
      x: e.clientX,
      y: e.clientY
    });
  }

  canResize(cell) {

    return cell && cell.data.canResize;
  }

  showHandleBar() {

    let cell = this.getCurrentCell();
    if (cell) {
      if (this.canResize(cell)) {

        let paper = this.getPaper();

        if (paper && paper.rawPane) {
          paper.rawPane.appendChild(this.handleBar);
        }
      }
    }
  }

  hideHandleBar() {

    this.bounds = null;

    utils.removeElement(this.handleBar);
    utils.setStyle(this.handleBar, {
      width: 0,
      height: 0
    });
  }

  resetHandleBar() {

    let cell = this.getCurrentCell();
    if (cell) {
      this.bounds = cell.getBBox();
      this.updateHandleBar();
    }
  }

  updateHandleBar() {

    let bounds = this.bounds;
    if (bounds) {

      let paper = this.getPaper();
      let elem  = this.handleBar;

      let x = Math.round(bounds.x * paper.sx + paper.tx);
      let y = Math.round(bounds.y * paper.sy + paper.ty);

      utils.setTranslate(elem, x, y);

      let width  = Math.round(bounds.width * paper.sx);
      let height = Math.round(bounds.height * paper.sy);

      utils.setStyle(elem, {
        width: width + 'px',
        height: height + 'px'
      });
    }
  }
}


// exports
// -------

export default SizeHandler;
