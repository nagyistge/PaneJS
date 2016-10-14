import Change from './Change';

export default class CollapseChange extends Change {

  constructor(model, cell, collapsed) {

    super();

    this.model     = model;
    this.cell      = cell;
    this.collapsed = collapsed;
    this.previous  = collapsed;
  }

  digest() {

    this.collapsed = this.previous;
    this.previous  = this.model.collapseChanged(this.cell, this.previous);

    return this;
  }
}
