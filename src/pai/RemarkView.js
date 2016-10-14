import * as utils from '../common/utils';
import vector     from '../common/vector';
import CellView   from '../views/CellView';


const selectors = {
  foreignobject: 'foreignobject',
  content: '.pane-remark-content',
  editor: '.pane-remark-editor'
};

const classNames = {
  editor: 'pane-remark-editor',
  float: 'pane-remark-float'
};

class RemarkView extends CellView {

  render() {

    this.renderMarkup();

    this.resize()
      .translate();

    return this;
  }

  renderMarkup() {

    const group  = this.cell;
    const markup = this.compileMarkup(group.getMarkup(), group.getRenderData());

    this.elem.innerHTML = markup;

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

    utils.addEventListener(this.elem, 'dblclick', selectors.content, (e) => {
      e.stopPropagation();
      this.editRemark();
    });

    utils.addEventListener(this.elem, 'mousedown', selectors.editor, (e) => {
      e.stopPropagation();
    });

    utils.addEventListener(this.elem, 'keydown', selectors.editor, (e) => {
      e.stopPropagation();
    });

    return this;
  }

  find(selector) {

    return selector === '.' ? [this.vel] : this.vel.find(selector);
  }

  findOne(selector) {

    return selector === '.' ? this.vel : this.vel.findOne(selector);
  }

  resize() {

    let size = this.detectContentSize();

    this.cell.size          = size;
    this.cell.metadata.size = size;

    this.setContentSize(size.width, size.height);

    return this;
  }

  translate() {

    let position = this.cell.getPosition();

    this.vel.translate(position.x, position.y);

    return this;
  }

  editRemark() {

    if (!this.editing) {

      this.editing = true;

      let content     = this.cell.getRemark();
      let contentElem = this.getContentElem();

      this.setContentSize(180, 72);

      if (contentElem) {
        contentElem.innerHTML = '<textarea class="' + classNames.editor + '">' + content + '</textarea>';

        let textarea = contentElem.querySelector(selectors.editor);
        if (textarea) {
          textarea.focus();
          textarea.select();
          utils.addEventListener(textarea, 'blur', (e) => {
            e.stopPropagation();
            this.saveRemark();
          });

          utils.addEventListener(textarea, 'keydown', (e) => {

            e.stopPropagation();

            let keyCode = e.keyCode;
            if (keyCode === 13) {
              this.saveRemark();
            } else if (keyCode === 27) {
              this.saveRemark(true);
            }
          });
        }
      }
    }
  }

  saveRemark(esc) {

    if (this.editing) {

      this.editing = false;

      let contentElem = this.getContentElem();
      if (contentElem) {

        let textarea = contentElem.querySelector(selectors.editor);
        if (textarea) {

          let oldVal = this.cell.getRemark();
          let newVal = textarea.value;

          if (esc) {
            newVal = oldVal;
          } else {
            if (newVal) {

              newVal = utils.escape(newVal);

              this.cell.data.name = newVal;
            } else {
              newVal = oldVal;
            }
          }

          utils.removeElement(textarea);
          contentElem.appendChild(document.createTextNode(newVal));

          if (!esc) {
            let paper   = this.getPaper();
            let oldSize = this.cell.getSize();
            let newSize = this.detectContentSize();

            this.cell.size          = newSize;
            this.cell.metadata.size = newSize;

            this.setContentSize(newSize.width, newSize.height);

            if (newVal !== oldVal) {
              if (paper) {
                paper.trigger('remark:updateName', this.cell, newVal);
              }
            }

            if (oldSize.width !== newSize.width || oldSize.height !== newSize.height) {

              let dx  = (oldSize.width - newSize.width) / 2;
              let dy  = (oldSize.height - newSize.height) / 2;
              let pos = this.cell.getPosition();

              pos.x += dx;
              pos.y += dy;

              this.cell.position = {
                x: pos.x,
                y: pos.y
              };

              this.translate();
              if (paper) {
                paper.trigger('cells:updatePosition', [this.cell]);
              }
            }
          }
        }
      }
    }
  }

  detectContentSize() {

    let max  = this.cell.getMaxSize();
    let size = this.cell.getSize();


    this.vel.addClass(classNames.float);
    this.setContentSize(max.width, max.height);

    let result = this.getContentSize();

    this.setContentSize(size.width, size.height);
    this.vel.removeClass(classNames.float);

    return result;
  }

  setContentSize(width, height) {

    this.findOne(selectors.foreignobject)
      .attr({
        width,
        height
      });
  }

  getContentSize() {

    let elem = this.getContentElem();

    return {
      width: elem.offsetWidth || elem.clientWidth,
      height: elem.offsetHeight || elem.clientHeight
    };
  }

  getContentElem() {

    return this.elem.querySelector(selectors.content);
  }
}


// exports
// -------

export default RemarkView;
