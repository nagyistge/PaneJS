import {
    map,
    forEach,
    hashCode,
    isString,
    isFinite
} from '../common/utils';

import filters from  '../common/filters';
import Events  from '../common/Events';
import vector  from '../common/vector';


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

        // `selector` is a CSS selector or `'.'`.
        // `filter` must be in the special filter format:
        // `{ name: <name of the filter>, args: { <arguments>, ... }`.
        // An example is: `{ filter: { name: 'blur', args: { radius: 5 } } }`.

        var that = this;

        filter = filter || {};

        var name = filter.name || '';
        var args = filter.args || {};
        var attrs = filter.attrs;
        var filterFn = filters[name];

        if (!name || !filterFn) {
            throw new Error('Non-existing filter: ' + name);
        }

        var vElements = isString(selector) ? that.find(selector) : selector;

        if (!vElements.length) {
            return that;
        }

        var paper = that.paper;
        var svg = paper.svg;
        var filterId = name + '-' + paper.id + '-' + hashCode(JSON.stringify(filter));


        if (!svg.getElementById(filterId)) {

            var vFilter = vector(filterFn(args));
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

        forEach(vElements, function (vel) {
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

        var that = this;

        gradient = gradient || {};

        var type = gradient.type;
        var stops = gradient.stops;
        var attrs = gradient.attrs;

        if (!attrName || !type || !stops || !stops.length) {
            return that;
        }

        var vElements = isString(selector) ? that.find(selector) : selector;

        if (!vElements.length) {
            return that;
        }

        var paper = that.paper;
        var svg = paper.svg;
        var gradientId = type + '-' + paper.id + '-' + hashCode(JSON.stringify(gradient));

        if (!svg.getElementById(gradientId)) {

            var gradientString = [
                '<' + type + '>',
                map(stops, function (stop) {
                    return '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + (isFinite(stop.opacity) ? stop.opacity : 1) + '" />';
                }).join(''),
                '</' + type + '>'
            ].join('');

            var vGradient = vector(gradientString);

            if (attrs) {
                vGradient.attr(attrs);
            }

            vGradient.node.id = gradientId;

            vector(svg).getDefs().append(vGradient);
        }

        forEach(vElements, function (vel) {
            vel.attr(attrName, 'url(#' + gradientId + ')');
        });

        return that;
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
