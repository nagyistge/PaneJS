class ChangeCollection {

    constructor(model) {
        this.model = model;
    }

    hasChange() {
        let changes = this.changes;
        return changes && changes.length;
    }

    add(change) {

        let that = this;
        let changes = that.changes;

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

        let that = this;

        that.model.trigger('change', that.changes);

        return that;
    }
}


// exports
// -------

export default ChangeCollection;
