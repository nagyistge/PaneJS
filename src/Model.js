define([
    './lib/Base',
    './cells/Root',
    './cells/Layer',
    './cells/Group',
    './cells/Node',
    './cells/Link'
], function (
    Base,
    Root,
    Layer,
    Group,
    Node,
    Link
) {
    'use strict';

    return Base.extend({
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
            var root = new Root();

            root.insert(new Layer());

            return root;
        },

        getRoot: function () {

        },

        setRoot: function (root) {
            this.execute(new RootChange(this, root));

            return root;
        },

        changeRoot: function (root) {

        },
    });
});
