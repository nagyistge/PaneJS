import CellView from './CellView';
import vector from '../common/vector';


export  default CellView.extend({

    constructor: function NodeView() {},

    update: function () {

        var that = this;

        return that;
    },

    render: function () {

        var that = this;
        var vel = that.vel;

        vel.empty();

        that.renderMarkup();

        that.scalableNode = vel.findOne('.pane-scalable');
        that.rotatableNode = vel.findOne('.pane-rotatable');

        return that.update()
            .resize()
            .rotate()
            .translate();
    },

    renderMarkup: function () {

        var that = this;
        var cell = that.cell;
        var markup = cell.get('markup') || cell.markup;

        if (markup) {
            that.vel.append(vector(markup));
        } else {
            throw new Error('invalid markup');
        }

        return that;
    },

    scale: function () {

        var that = this;

        return that;
    },

    resize: function () {

        var that = this;

        return that;
    },

    rotate: function () {

        var that = this;
        var node = that.rotatableNode;

        if (node) {

            var cell = that.cell;
            var angle = cell.get('angle');

            if (angle) {

                var size = cell.get('size') || {width: 1, height: 1};
                var ox = size.width / 2;
                var oy = size.height / 2;

                node.attr('transform', 'rotate(' + angle + ',' + ox + ',' + oy + ')');
            } else {
                node.removeAttr('transform');
            }
        }

        return that;
    },

    translate: function () {

        var that = this;

        return that;
    },

    getBBox: function () {},
});