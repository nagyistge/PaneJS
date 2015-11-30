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
        var oldIndex = oldParent ? oldParent.getChildIndex(child) : 0;

        // 移除连线时，需要移除连线和节点的关联关系
        if (!newParent) {
            that.connect(child, false);
        }

        oldParent = model.childChanged(child, newParent, newIndex);

        // 更新连线的父节点时，同时更新连线的关联节点
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

        if (cell.isLink()) {

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


export default ChildChange;
