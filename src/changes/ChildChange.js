import Change from './Change';


class ChildChange extends Change {

    constructor(model, parent, child, index) {

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
            this.connect(child, false);
        }

        oldParent = model.childChanged(child, newParent, newIndex);

        if (newParent) {
            this.connect(child, true);
        }

        this.parent        = newParent;
        this.index         = newIndex;
        this.previous      = oldParent;
        this.previousIndex = oldIndex;

        return this;
    }

    connect(cell, connected) {

        if (cell.isLink()) {

            let source = cell.getTerminal(true);
            let target = cell.getTerminal(false);

            if (source) {
                this.model.linkChanged(cell, connected ? source : null, true);
            }

            if (target) {
                this.model.linkChanged(cell, connected ? target : null, false);
            }

            cell.setTerminal(source, true);
            cell.setTerminal(target, false);
        }

        cell.eachChild(function (child) {
            this.connect(child, connected);
        }, this);

        return this;
    }
}


// exports
// -------

export default ChildChange;
