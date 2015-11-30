import vector   from '../common/vector';
import CellView from './CellView';

class NodeView extends CellView {

    update() {

        var that = this;

        return that;
    }

    render() {

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
    }

    renderMarkup() {

        var that = this;
        var cell = that.cell;
        var markup = cell.markup;

        if (markup) {
            that.vel.append(vector(markup));
        } else {
            throw new Error('invalid markup');
        }

        return that;
    }

    scale() {

        var that = this;

        return that;
    }

    resize() {

        var that = this;

        return that;
    }

    rotate() {

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
    }

    translate() {

        var that = this;

        return that;
    }

    getBBox() {}
}


export default NodeView;
