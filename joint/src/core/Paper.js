import Base from '../lib/Base';

Base.extend({

    options: {
        x: 0,
        y: 0,
        width: 800,
        height: 600
    },

    constructor: function Paper(options) {

    },

    configure: function (options) {
        // 应用 options 选项
    },


    // lift cycle
    // ----------

    init: function () {
        // 创建根节点等
    },

    setup: function () {
        // 事件绑定, 事件代理, 所有事件绑定到容器上
    },

    destroy: function () {},


    // transform
    // ---------

    resize: function (width, height) {

        var that = this;
        var options = that.options;

        width = options.width = width || options.width;
        height = options.height = height || options.height;

        V(that.svg).attr({width: width, height: height});

        that.trigger('paper:resize', width, height);

        return that;
    },

    translate: function (x, y, absolute) {

        var that = this;
        var options = that.options;

        x = options.x = x || options.x;
        y = options.y = y || options.y;

        V(that.viewport).translate(x, y, absolute);

        that.trigger('paper:translate', x, y);

        return that;
    },


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

    onPointerUp: function (e) {}
});