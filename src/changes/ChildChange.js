import Change from './Change';


class ChildChange extends Change {

    constructor(model, parent, child, index) {

        super();

        var that = this;

        that.model = model;
        that.child = child;
        that.parent = parent;
        that.index = index;
        that.previous = parent;
        that.previousIndex = index;
    }

    digest() {

        var that = this;
        var model = that.model;
        var child = that.child;
        var newParent = that.previous;
        var newIndex = that.previousIndex;
        var oldParent = child.parent;
        var oldIndex = oldParent ? oldParent.indexOfChild(child) : 0;

        // the new parent is null, then the child(link) will be removed
        if (!newParent) {
            that.connect(child, false);
        }

        oldParent = model.childChanged(child, newParent, newIndex);

        if (newParent) {
            that.connect(child, true);
        }

        that.parent = newParent;
        that.index = newIndex;
        that.previous = oldParent;
        that.previousIndex = oldIndex;

        return that;
    }

    connect(cell, connected) {

        var that = this;
        var model = that.model;

        if (cell.isLink) {

            var source = cell.getTerminal(true);
            var target = cell.getTerminal(false);

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
            that.connect(child, connected);
        });

        return that;
    }
}


// exports
// -------

export default ChildChange;
