import {
    map,
    forEach,
    hashCode,
    isString,
    isFinite
} from '../common/utils';

import * as utils from '../common/utils';
import Events     from '../common/Events';
import vector     from '../common/vector';
import filters    from '../common/filters';


class CellView {

    constructor(paper, cell) {

        let that = this;

        that.cell = cell;
        that.paper = paper;
        that.invalid = true;

        that.ensureElement();
    }

    ensureElement() {

        let that = this;
        let cell = that.cell;
        let vel = vector('g', {'class': cell.className});

        that.vel = vel;
        that.elem = vel.node;
        that.elem.cellId = cell.id; // attach cell's id to elem

        that.paper.drawPane.appendChild(that.elem);

        return that;
    }

    render() { return this; }

    update() { return this; }

    find(selector) {
        return selector === '.' ? [this.vel] : this.vel.find(selector);
    }

    applyFilter(selector, filter) {

        // `selector` is a CSS selector or `'.'`.
        // `filter` must be in the special filter format:
        // `{ name: <name of the filter>, args: { <arguments>, ... }`.
        // An example is: `{ filter: { name: 'blur', args: { radius: 5 } } }`.

        let that = this;

        filter = filter || {};

        let name = filter.name || '';
        let args = filter.args || {};
        let attrs = filter.attrs;
        let filterFn = filters[name];

        if (!name || !filterFn) {
            throw new Error('Non-existing filter: ' + name);
        }

        let vels = isString(selector) ? that.find(selector) : selector;

        if (!vels.length) {
            return that;
        }

        let paper = that.paper;
        let svg = paper.svg;
        let filterId = name + '-' + paper.id + '-' + hashCode(JSON.stringify(filter));


        if (!svg.getElementById(filterId)) {

            let vFilter = vector(filterFn(args));
            // Set the filter area to be 3x the bounding box of the cell
            // and center the filter around the cell.
            vFilter.attr({
                filterUnits: 'objectBoundingBox',
                x: -1,
                y: -1,
                width: 3,
                height: 3
            });

            if (attrs) {
                vFilter.attr(attrs);
            }

            vFilter.node.id = filterId;

            vector(svg).getDefs().append(vFilter);
        }

        forEach(vels, function (vel) {
            vel.attr(filter, 'url(#' + filterId + ')');
        });

        return that;
    }

    applyGradient(selector, attrName, gradient) {

        // `selector` is a CSS selector or `'.'`.
        // `attrName` is either a `'fill'` or `'stroke'`.
        // `gradient` must be in the special gradient format:
        // `{ type: <linearGradient|radialGradient>, stops: [ { offset: <offset>, color: <color> }, ... ]`.
        // An example is: `{ fill: { type: 'linearGradient', stops: [ { offset: '10%', color: 'green' }, { offset: '50%', color: 'blue' } ] } }`.

        let that = this;

        gradient = gradient || {};

        let type = gradient.type;
        let stops = gradient.stops;
        let attrs = gradient.attrs;

        if (!attrName || !type || !stops || !stops.length) {
            return that;
        }

        let vels = isString(selector) ? that.find(selector) : selector;

        if (!vels.length) {
            return that;
        }

        let paper = that.paper;
        let svg = paper.svg;
        let gradientId = type + '-' + paper.id + '-' + hashCode(JSON.stringify(gradient));

        if (!svg.getElementById(gradientId)) {

            let gradientString = [
                '<' + type + '>',
                map(stops, function (stop) {
                    return '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + (isFinite(stop.opacity) ? stop.opacity : 1) + '" />';
                }).join(''),
                '</' + type + '>'
            ].join('');

            let vGradient = vector(gradientString);

            if (attrs) {
                vGradient.attr(attrs);
            }

            vGradient.node.id = gradientId;

            vector(svg).getDefs().append(vGradient);
        }

        forEach(vels, function (vel) {
            vel.attr(attrName, 'url(#' + gradientId + ')');
        });

        return that;
    }


    onContextMenu() {}

    onDblClick() {}

    onClick() {}

    onPointerDown() {}

    onPointerMove() {}

    onPointerUp() {}

    onMouseOver() {}

    onMouseOut() {}



    destroy() {

        let that = this;
        let elem = that.elem;

        if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }

    }
}


// exports
// -------

export default CellView;
