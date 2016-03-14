class ChangeCollection {

    constructor(model) {
        this.model = model;
    }

    hasChange() {

        let changes = this.changes;

        return changes && changes.length;
    }

    add(change) {

        let changes = this.changes;

        if (change) {

            if (!changes) {
                changes = this.changes = [];
            }

            changes.push(change);
        }

        return this;
    }

    clear() {

        this.changes = null;

        return this;
    }

    notify() {

        this.model.trigger('change', this.changes);

        return this;
    }
}


// exports
// -------

export default ChangeCollection;
