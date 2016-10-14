import Change from './Change';

export default class SizeChange extends Change {

  constructor(model, cell, size) {

    super();

    this.model    = model;
    this.cell     = cell;
    this.size     = size;
    this.previous = size;
  }

  digest() {

    this.size     = this.previous;
    this.previous = this.model.sizeChanged(this.cell, this.previous);

    return this;
  }
}
