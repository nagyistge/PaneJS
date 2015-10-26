import Base from './lib/Base';
import Model from './Model';
import View from './View';

export default Base.extend({
    constructor: function Graph(container, model, stylesheet) {

        var that = this;

        that.model = model || new Model();
        that.view = new View(that);
        //that.stylesheet = stylesheet || new Stylesheet();

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
