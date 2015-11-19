import Base from '../lib/Base';

Base.extend({

    constructor: function Paper(options) {

    },

    configure: function (options) {

    },

    init: function () {},

    destroy: function () {},

    setSize: function (w, h) {},

    setOrigin: function (x, y) {},

    // view
    // ----

    createView: function (cell) {},

    removeView: function (cell) {},

    renderView: function (cell) {},

    onCellAdded: function () {},

    scale: function () {},

    rotate: function () {},

    // event handlers
    // --------------

    onPointerDown: function (e) {},

    onPointerMove: function (e) {},

    onPointerUp: function (e) {},


});