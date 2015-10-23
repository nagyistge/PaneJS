define([
    '../lib/Base',
    './Layer'
], function (
    Base,
    Layer
) {
    'use strict';

    return Base.extend({
        constructor: function Model(root) {

            var that = this;

            if (root) {

            } else {

            }
        },

        createRoot: function () {
            var root = new Layer();

            root.insert(new Layer());

            return root;
        },
    });
});
