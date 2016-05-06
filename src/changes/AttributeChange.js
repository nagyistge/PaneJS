import Change from './Change';


class AttributeChange extends Change {

    constructor(model, cell, attrs) {

        super();

        this.model    = model;
        this.cell     = cell;
        this.attrs    = attrs;
        this.previous = attrs;
    }

    digest() {

        this.attrs    = this.previous;
        this.previous = this.model.attributeChanged(this.cell, this.previous);

        return this;
    }
}


// exports
// -------

export default AttributeChange;
