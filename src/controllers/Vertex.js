import vector from '../common/vector';
import * as utils from '../common/utils';
import Controller from './Controller';

const DEFAULT_OPTIONS = {
    boundsAttr: {
        fill: 'none',
        'stroke-dasharray': '3px, 3px',
        stroke: '#0f0',
    },
    rotaterOffset: -15,
    rotaterAttr: {
        rx: 5,
        ry: 5,
        fill: '#0f0',
        stroke: 'black',
        style: 'cursor:crosshair;'
    },
    resizerAttr: {
        height: 7,
        width: 7,
        fill: '#0f0',
        stroke: 'black',
    }
};

class VertexController extends Controller {
    init(options) {
        /*
         {
         cell: cell
         }
         */
        let that = this;

        that.options = utils.merge({}, DEFAULT_OPTIONS, options);

        let vel = vector('g', {
            'class': 'vertex-bounds'
        });
        that.vel = vel;
        that.elem = vel.node;
        that.paper.controlPane.appendChild(that.elem);

        let cell = options.cell;
        that.redraw(cell);

        return that;
    }

    redraw(cell) {
        let that = this;

        that.moveTo(cell.position)
            .rotate(cell.rotation)
            .setSize(cell.size)
            .drawBounds()
            .drawRotater()
            .drawResizers();

        return that;
    }

    moveTo(pos) {
        let that = this;

        that.vel.translate(pos.x, pos.y);

        return that;
    }

    setSize(size) {
        let that = this;

        that.size = size;

        return that;
    }

    rotate(angle) {
        let that = this;

        that.vel.rotate(angle);

        return that;
    }

    drawBounds() {
        let that = this;

        let attrs = utils.extend({}, that.options.boundsAttr, this.size);
        if (that.boundsVel) {
            that.boundsVel.attr(attrs);
        } else {
            that.boundsVel = vector('rect', attrs);
            that.vel.append(that.boundsVel);
        }

        return that;
    }

    drawRotater() {
        let that = this;
        let options = that.options;

        if (!that.rotaterVel) {
            that.rotaterVel = vector('ellipse', options.rotaterAttr);
            that.vel.append(that.rotaterVel);
        }
        that.rotaterVel.translate(that.size.width / 2, options.rotaterOffset);
        return that;
    }

    drawResizers() {
        let that = this;
        let options = that.options;

        if (!that.resizers) {
            that.resizers = {};
            utils.forEach([
                'nw-resize',
                'n-resize',
                'ne-resize',
                'w-resize',
                'e-resize',
                'sw-resize',
                's-resize',
                'se-resize',
            ], function (cursor) {
                that.createResizer(cursor);
            });
        }

        let resizers = that.resizers;
        let rx = options.resizerAttr.width / 2;
        let ry = options.resizerAttr.height / 2;
        let h = that.size.height;
        let w = that.size.width;
        resizers['nw-resize'].translate(-rx, -ry);
        resizers['n-resize'].translate(-rx + w / 2, -ry);
        resizers['ne-resize'].translate(-rx + w, -ry);
        resizers['w-resize'].translate(-rx, -ry + h / 2);
        resizers['e-resize'].translate(-rx + w, -ry + h / 2);
        resizers['sw-resize'].translate(-rx, -ry + h);
        resizers['s-resize'].translate(-rx + w / 2, -ry + h);
        resizers['se-resize'].translate(-rx + w, -ry + h);
        return that;
    }

    createResizer(cursor) {
        let that = this;

        let resizerVel = vector('rect', utils.extend({
            style: 'cursor:' + cursor + ';'
        }, that.options.resizerAttr));
        that.resizers[cursor] = resizerVel;
        that.vel.append(resizerVel);
        return that;
    }

    drawPreview() {
        let that = this;
        return that;
    }

    destroy() {
    }
}

export default VertexController;
