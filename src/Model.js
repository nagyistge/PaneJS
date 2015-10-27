import Class from './common/Class';
// cells
import Node from './cells/Node';
// events
import eventNames from './events/eventNames';
import EventSource from './events/EventSource';
// changes
import RootChange from './changes/RootChange';
import ChangeCollection from './changes/ChangeCollection';


export default Class.create({

    Extends: EventSource,

    constructor: function Model(root) {

        var that = this;

        that.changes = new ChangeCollection(that);
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

    isAncestor: function (parent, child) {
        while (child && child !== parent) {
            child = child.parent;
        }

        return child === parent;
    },

    contains: function (cell) {
        return this.isAncestor(this.root, cell);
    },


    // Root
    // ----

    isRoot: function (cell) {
        return cell && this.root === cell;
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


    // Layers
    // ------
    isLayer: function (cell) {
        return cell && this.isRoot(cell.parent);
    },

    getLayers: function () {

    },

    eachLayer: function (iterator, context) {},


    // Changes
    // -------


    //
    //

    add: function (parent, child, index) {

    },

    cellAdded: function () {},

    digest: function (change) {

        var that = this;

        that.emit(eventNames.BEFORE_DIGEST, {change: change});
        change.digest();
        that.emit(eventNames.AFTER_DIGEST, {change: change});

        that.beginUpdate();
        that.changes.add(change);
        that.endUpdate();

    },

    beginUpdate: function () {

        var that = this;
        that.updateLevel++;
        that.emit(eventNames.BEGIN_UPDATE);

        if (that.updateLevel === 1) {
            that.emit(eventNames.START_EDIT);
        }
    },

    endUpdate: function () {

        var that = this;

        that.updateLevel--;

        if (that.updateLevel === 0) {
            that.emit(eventNames.END_EDIT);
        }

        if (!that.endingUpdate) {

            var changes = that.changes;

            that.endingUpdate = that.updateLevel === 0;
            that.emit(eventNames.END_UPDATE, {changes: changes.changes});

            try {
                if (that.endingUpdate && changes.hasChange()) {
                    changes.notify().clear();
                }
            } finally {
                that.endingUpdate = false;
            }
        }
    },

});
