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

        var isLink = child.isLink;
        var newParent = that.previous;
        var newIndex = that.previousIndex;
        var previousParent = child.parent;
        var previousIndex = previousParent ? previousParent.getChildIndex(child) : 0;

        // 移除 link 上连接的 node
        if (isLink && !newParent) {
            that.connect(child, false);
        }

        previousParent = model.childChanged(child, newParent, newIndex);

        if (isLink && newParent) {
            that.connect(child, true);
        }

        that.parent = newParent;
        that.index = newIndex;
        that.previous = previousParent;
        that.previousIndex = previousIndex;

        return that;
    },

    connect: function (link, isConnected) {

        var that = this;
        var model = that.model;
        var sourceNode = link.getNode(true);
        var targetNode = link.getNode(false);

        if (sourceNode) {
            model.linkChanged(link, isConnected ? sourceNode : null, true);
        }

        if (targetNode) {
            model.linkChanged(link, isConnected ? targetNode : null, false);
        }

        link.setNode(sourceNode, true);
        link.setNode(targetNode, false);

        return that;
    }
});
