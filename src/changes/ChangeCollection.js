import Base from '../lib/Base';

export default Base.extend({
    constructor: function ChangeCollection(model) {

        var that = this;
        that.model = model;
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

        that.model.emit('change', {changes: that.changes});

        return that;
    }
});
