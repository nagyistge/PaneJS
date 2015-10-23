define([
    './lib/Base',
    './Model',
    './View'
], function (
    Base,
    Model,
    View
) {
    'use strict';

    return Base.extend({
        constructor: function Graph(container, model, stylesheet) {

            var that = this;

            that.model = model || new Model();
            that.view = new View(that);
            that.stylesheet = stylesheet || new Stylesheet();

            if (container) {
                that.init(container);
            }

            that.view.revalidate();
        },

        init: function (container) {

            var that = this;

            that.container = container;
            that.view.init();
        },


        insertNode: function () {},

        createNode: function () {},

        insertLink: function () {},

        createLink: function () {}
    });
});
