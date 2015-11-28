import Class from '../common/Class';

export default Class.create({
    constructor: function ChangeCollection(graph) {

        var that = this;
        that.graph = graph;
    },

    hasChange: function () {
        var changes = this.changes;
        return changes && changes.length;
    },

    add: function (change) {

        var that = this;
        var changes = that.changes;

        if (change) {
            if (!changes) {
                changes = that.changes = [];
            }

            changes.push(change);
        }

        return change;
    },

    clear: function () {
        this.changes = null;
        return this;
    },

    notify: function () {

        var that = this;

        that.graph.trigger('change', that.changes);

        return that;
    }
});
