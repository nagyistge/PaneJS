class ChangeCollection {

    constructor(model) {
        this.model = model;
    }

    hasChange() {
        var changes = this.changes;
        return changes && changes.length;
    }

    add(change) {

        var that = this;
        var changes = that.changes;

        if (change) {

            if (!changes) {
                changes = that.changes = [];
            }

            changes.push(change);
        }

        return change;
    }

    clear() {
        this.changes = null;
        return this;
    }

    notify() {

        var that = this;

        that.model.trigger('change', that.changes);

        return that;
    }
}


// exports
// -------

export default ChangeCollection;
