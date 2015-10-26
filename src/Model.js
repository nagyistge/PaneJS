import Class from './common/Class';
import EventSource from './events/EventSource';
import Node from './cells/Node';
import RootChange from './changes/RootChange';

export default Class.create({

    Extends: EventSource,

    constructor: function Model(root) {

        var that = this;

        that.updateLevel = 0;
        that.endingUpdate = false;


        if (root) {
            that.setRoot(root);
        } else {
            that.clear();
        }
    },

    clear: function () {
        var that = this;
        that.setRoot(that.createRoot());
        return that;
    },

    createRoot: function () {
        var root = new Node();

        root.insertChild(new Node());

        return root;
    },

    getRoot: function (cell) {

        var root = cell || this.root;

        if (cell) {
            while (cell) {
                root = cell;
                cell = cell.parent;
            }
        }

        return root;
    },

    setRoot: function (root) {
        this.digest(new RootChange(this, root));

        return root;
    },

    changeRoot: function (root) {

    },

    isRoot: function (cell) {
        return cell && this.root === cell;
    },

    isLayer: function (cell) {
        return cell && this.isRoot(cell.parent);
    },

    isAncestor: function (parent, child) {
        while (child && child !== parent) {
            child = child.parent;
        }

        return child === parent;
    },

    contains: function (cell) {
        return this.isAncestor(this.root, cell);
    },

    add: function (parent, child, index) {

    },

    cellAdded: function () {},

    digest: function (change) {

        change.digest();

        var that = this;

        that.beginUpdate();
        that.emit();
        that.endUpdate();

    },

    beginUpdate: function () {

        var that = this;
        that.updateLevel++;
        that.emit(new mxEventObject(mxEvent.BEGIN_UPDATE));

        if (that.updateLevel === 1) {
            that.emit(new mxEventObject(mxEvent.START_EDIT));
        }
    },

    endUpdate: function () {

        var that = this;

        that.updateLevel--;

        if (that.updateLevel === 0) {
            this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
        }

        if (!that.endingUpdate) {
            that.endingUpdate = that.updateLevel === 0;
            this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));

            try {
                if (that.endingUpdate && !this.currentEdit.isEmpty()) {
                    this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
                    var tmp = this.currentEdit;
                    this.currentEdit = this.createUndoableEdit();
                    tmp.notify();
                    this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', tmp));
                }
            }
            finally {
                that.endingUpdate = false;
            }
        }
    },
});
