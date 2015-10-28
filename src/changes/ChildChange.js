import Change from './Change';

export default Change.extend({

    constructor: function ChildChange(model, parent, child, index) {

        var that = this;

        that.model = model;
        that.child = child;
        that.parent = parent;
        that.index = index;
        that.previous = parent;
        that.previousIndex = index;
    },

    digest: function () {

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

        // 更新连线的父节点时，需要同时更新连线的关联节点
        // TODO: 检查一下这段代码是否真的有必要？
        if (newParent) {
            that.connect(child, true);
        }

        that.parent = newParent;
        that.index = newIndex;
        that.previous = oldParent;
        that.previousIndex = oldIndex;

        return that;
    },

    connect: function (cell, isConnected) {

        var that = this;
        var model = that.model;

        if (cell.isLink) {
            var sourceNode = cell.getNode(true);
            var targetNode = cell.getNode(false);

            if (sourceNode) {
                model.linkChanged(cell, isConnected ? sourceNode : null, true);
            }

            if (targetNode) {
                model.linkChanged(cell, isConnected ? targetNode : null, false);
            }

            cell.setNode(sourceNode, true);
            cell.setNode(targetNode, false);
        }

        cell.eachChild(function (child) {
            that.connect(child, isConnected);
        });

        return that;
    }
});
