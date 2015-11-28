import Class  from '../common/Class';
import Events from '../common/Events';
import vector from '../common/vector';


export default Class.create({

    tagName: 'g',

    constructor: function CellView(paper, cell) {

        var that = this;

        that.cell = cell;
        that.paper = paper;

        that.ensureElement();
    },

    ensureElement: function () {

        var that = this;

        var vel = vector(that.tagName);

        that.el = vel.node;
        that.vel = vel;

        that.paper.drawPane.appendChild(that.el);

        return that;
    },

    find: function (selector) {

    },

    onDblClick: function () {},

    onClick: function () {},

    onPointerDown: function () {},

    onPointerMove: function () {},

    onPointerUp: function () {},

    onMouseOver: function () {},

    onMouseOut: function () {},

    onContextMenu: function () {}
});
