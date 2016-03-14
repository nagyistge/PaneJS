import Change from './Change';


class ChildChange extends Change {

    constructor(model, parent, child, index) {

        super();

        let that = this;

        that.model         = model;
        that.child         = child;
        that.parent        = parent;
        that.index         = index;
        that.previous      = parent;
        that.previousIndex = index;
    }

    digest() {

        let that      = this;
        let model     = that.model;
        let child     = that.child;
        let newParent = that.previous;
        let newIndex  = that.previousIndex;
        let oldParent = child.parent;
        let oldIndex  = oldParent ? oldParent.indexOfChild(child) : 0;

        // the new parent is null, then the child(link) will be removed
        if (!newParent) {
            that.modifyConnect(child, false);
        }

        oldParent = model.childChanged(child, newParent, newIndex);

        if (newParent) {
            that.modifyConnect(child, true);
        }

        that.parent        = newParent;
        that.index         = newIndex;
        that.previous      = oldParent;
        that.previousIndex = oldIndex;

        return that;
    }

    modifyConnect(cell, connected) {

        let that  = this;
        let model = that.model;

        if (cell.isLink) {

            let source = cell.getTerminal(true);
            let target = cell.getTerminal(false);

            if (source) {
                model.linkChanged(cell, connected ? source : null, true);
            }

            if (target) {
                model.linkChanged(cell, connected ? target : null, false);
            }

            cell.setTerminal(source, true);
            cell.setTerminal(target, false);
        }

        cell.eachChild(function (child) {
            that.modifyConnect(child, connected);
        });

        return that;
    }
}


// exports
// -------

export default ChildChange;
