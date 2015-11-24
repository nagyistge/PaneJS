import Class  from '../common/Class';
import Events from '../common/Events';

export default Class.create({

    Extends: Events,

    constructor: function Graph(root) {

        var that = this;

        //that.changeCollection = new ChangeCollection(that);

        if (root) {
            that.setRoot(root);
        } else {
            that.clear();
        }
    },

    clear: function () {
        return this.setRoot(this.createRoot());
    },


    // root
    // ----

    isRoot: function (cell) {
        return cell && this.root === cell;
    },

    createRoot: function () {
        var root = new Cell();

        root.insertChild(new Cell());

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
        return this.digest(new RootChange(this, root));
    },

});