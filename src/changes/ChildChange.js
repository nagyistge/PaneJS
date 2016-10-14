import Change from './Change';

export default class ChildChange extends Change {

  constructor(model, child, parent, index) {

    super();

    this.model  = model;
    this.child  = child;
    this.parent = parent;
    this.index  = index;

    this.previous      = parent;
    this.previousIndex = index;
  }

  digest() {

    let model = this.model;
    let child = this.child;

    let newParent = this.previous;
    let newIndex  = this.previousIndex;

    let oldParent = child.parent;
    let oldIndex  = oldParent ? oldParent.indexOfChild(child) : 0;

    // the new parent is null, then the child(and link) will be removed
    if (!newParent) {
      this.disConnect(child, false);
    }

    oldParent = model.childChanged(child, newParent, newIndex);

    this.parent        = newParent;
    this.index         = newIndex;
    this.previous      = oldParent;
    this.previousIndex = oldIndex;

    return this;
  }

  disConnect(cell) {

    if (cell.isLink()) {

      let source = cell.getTerminal(true);
      let target = cell.getTerminal(false);

      if (source) {
        this.model.terminalChanged(cell, null, true);
      }

      if (target) {
        this.model.terminalChanged(cell, null, false);
      }
    }

    cell.eachChild(function (child) {
      this.disConnect(child);
    }, this);

    return this;
  }
}
