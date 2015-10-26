import Base from './lib/Base';
import Node from './cells/Node';
import RootChange from './changes/RootChange';

export default Base.extend({
    constructor: function Model(root) {

        var that = this;

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

    createLayer: function (value) {
        var layer = new Node(value);
    },

    getRoot: function () {

    },

    setRoot: function (root) {
        this.execute(new RootChange(this, root));

        return root;
    },

    changeRoot: function (root) {

    }
});
