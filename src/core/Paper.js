import Class  from '../common/Class';
import Events from '../common/Events';
import vector from '../common/vector';
import Graph  from './Graph';

export default Class.create({

    Extends: Events,

    options: {
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
        gridSize: 1,
    },

    constructor: function Paper(container, model, options) {

        var that = this;

        //that.model = model || new Graph();

        that.configure(options);

        if (container) {
            that.init(container)
                .setup()
                .resize()
                .translate();
        }
    },

    configure: function (options) {
        // 应用 options 选项

        var that = this;

        that.trigger('paper:config', options);

        return that;

    },


    // lift cycle
    // ----------

    init: function (container) {
        // 创建根节点等

        var that = this;

        if (container) {

            var svg = vector('svg');
            var root = vector('g');
            var backgroundPane = vector('g');
            var drawPane = vector('g');

            root.append([backgroundPane, drawPane]);
            svg.append(root);
            container.appendChild(svg.node);

            that.container = container;
            that.svg = svg.node;
            that.root = root.node;
            that.backgroundPane = backgroundPane.node;
            that.drawPane = drawPane.node;

            //that.root=
            that.trigger('paper:render', container);
        }

        return that;
    },

    setup: function () {
        // 事件绑定, 事件代理, 所有事件绑定到容器上

        var that = this;

        that.trigger('paper:setup');

        return that;
    },

    destroy: function () {
        var that = this;

        that.trigger('paper:destroy');

        return that;
    },


    // transform
    // ---------

    resize: function (width, height) {

        var that = this;
        var options = that.options;

        width = options.width = width || options.width;
        height = options.height = height || options.height;

        vector(that.svg).attr({width: width, height: height});

        that.trigger('paper:resize', width, height);

        return that;
    },

    translate: function (x, y, absolute) {

        var that = this;
        var options = that.options;

        x = options.x = x || options.x;
        y = options.y = y || options.y;

        vector(that.root).translate(x, y, absolute);

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