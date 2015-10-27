import Class from './common/class';
import EventSource from './events/EventSource';
import View from './View';
import Model from './Model';

export default Class.create({

    Extends: EventSource,

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

    createLink: function () {},

    getCellStyle: function (cell) {

    }
});
