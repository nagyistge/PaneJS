import Class       from './common/class';
import EventSource from './events/EventSource';
import Stylesheet  from './styles/Stylesheet';
import View        from './View';
import Model       from './Model';
import Node        from './cells/Node';
import Link        from './cells/Link';
import Geometry    from './lib/Geometry';

export default Class.create({

    Extends: EventSource,

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

    insertNode: function (parent, id, value, x, y, width, height, style, relative) {

        var that = this;
        var node = that.createNode(id, value, x, y, width, height, style, relative);

        return that.addCell(node, parent);
    },

    createNode: function (id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height, relative);
        return new Node(id, value, geometry, style)
    },

    insertLink: function () {},

    createLink: function () {},

    addCell: function (cell, parent) {},

    getModel: function () {
        return this.model;
    },

    getView: function () {
        return this.view;
    },

    getCellStyle: function (cell) {

    },

    getCurrentRoot: function () {
        return this.view.currentRoot;
    },

    getDefaultParent: function () {

        var that = this;

        return that.getCurrentRoot()
            || that.defaultParent
            || that.model.getRoot().getChildAt(0);

    }
});
