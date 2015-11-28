import Events from '../common/Events'
import vector from '../common/vector'


class CellView {

    constructor(paper, cell) {

        var that = this;

        that.cell = cell;
        that.paper = paper;

        that.ensureElement();
    }

    ensureElement() {

        var that = this;

        var vel = vector('g');

        that.el = vel.node;
        that.vel = vel;

        that.paper.drawPane.appendChild(that.el);

        return that;
    }

    find(selector) {

    }

    onDblClick() {}

    onClick() {}

    onPointerDown() {}

    onPointerMove() {}

    onPointerUp() {}

    onMouseOver() {}

    onMouseOut() {}

    onContextMenu() {}
}

export default CellView;
