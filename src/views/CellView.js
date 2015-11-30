import Events from '../common/Events'
import vector from '../common/vector'


class CellView {

    constructor(paper, cell) {

        var that = this;

        that.cell = cell;
        that.paper = paper;
        that.invalid = true;

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

    render() { return this; }

    update() { return this; }

    find(selector) {
        return selector === '.' ? [this.vel] : this.vel.find(selector);
    }

    applyFilter(selector, filter) {

    }

    applyGradient(selector, attr, gradient) {}

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
