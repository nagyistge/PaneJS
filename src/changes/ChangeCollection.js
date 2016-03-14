class ChangeCollection {

    constructor(model) {
        this.model   = model;
        this.changes = [];
    }

    hasChange() {

        return !!this.changes.length;
    }

    getChanges() {

        return this.changes;
    }

    add(change) {

        if (change) {
            this.changes.push(change);
        }

        return this;
    }

    clear() {

        this.changes = [];

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
