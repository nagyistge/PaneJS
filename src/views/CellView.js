import * as utils from '../common/utils';
import     vector from '../common/vector';
import    filters from '../common/filters';


class CellView {

    constructor(paper, cell) {

        let that = this;

        that.cell    = cell;
        that.paper   = paper;
        that.invalid = true; // default need repaint

        that.ensureElement();
    }

    ensureElement() {

        let that = this;
        let cell = that.cell;
        let vel  = vector('g', { 'class': cell.className });

        that.vel  = vel;
        that.elem = vel.node;
        // attach cell's id to elem
        that.elem.cellId = cell.id;

        let pane = that.getPane();

        if (pane) {
            pane.appendChild(that.elem);
        }

        return that;
    }

    render() { return this; }

    update() { return this; }

    getPane() {

        let that     = this;
        let paper    = that.paper;
        let paneName = that.cell.paneName;

        return paneName && paper[paneName] || paper.drawPane;
    }

    renderMarkup() {

        // `markup` is rendered by default. Set the `markup` attribute
        // on the model if the default markup is not desirable.

        let that   = this;
        let markup = that.cell.markup;

        if (markup) {
            that.vel.append(vector(markup));
        } else {
            throw new Error('`markup` is missing while the default render() implementation is used.');
        }

        return that;
    }

    find(selector) {

        return selector === '.' ? [this.vel] : this.vel.find(selector);
    }

    findOne(selector) {

        return selector === '.' ? this.vel : this.vel.findOne(selector);
    }

    applyAttr(selector, attrs) {

        let that = this;

        if (attrs) {
            utils.forEach(that.find(selector), function (vel) {
                vel.attr(attrs);
            });
        }

        return that;
    }

    applyFilter(selector, filter) {

        // `selector` is a CSS selector or `'.'`.
        // `filter` must be in the special filter format:
        //   {
        //      name: <name of the filter>,
        //      args: { <arguments>, ... }
        //   }
        //
        // example:
        //   {
        //      name: 'blur',
        //      args: {
        //        radius: 5
        //      }
        //   }

        let that = this;

        if (!filter) {
            return that;
        }

        let name     = filter.name || '';
        let args     = filter.args || {};
        let attrs    = filter.attrs;
        let filterFn = filters[name];

        if (!name || !filterFn) {
            throw new Error('Invalided filter: "' + name + '"');
        }

        let vels = utils.isString(selector) ? that.find(selector) : selector;

        if (!vels.length) {
            return that;
        }


        let paper    = that.paper;
        let svg      = paper.svg;
        let hash     = utils.hashCode(JSON.stringify(filter));
        let filterId = name + '-' + paper.id + '-' + hash;

        // define filter
        if (!svg.getElementById(filterId)) {

            let vFilter = vector(filterFn(args));
            // Set the filter area to be 3x the bounding box of the cell
            // and center the filter around the cell.
            vFilter.attr({
                filterUnits: 'objectBoundingBox',

                x     : -1,
                y     : -1,
                width : 3,
                height: 3
            });

            if (attrs) {
                vFilter.attr(attrs);
            }

            vFilter.node.id = filterId;

            vector(svg).getDefs().append(vFilter);
        }

        // apply filter
        utils.forEach(vels, function (vel) {
            vel.attr('filter', 'url(#' + filterId + ')');
        });

        return that;
    }

    applyGradient(selector, attrName, gradient) {

        // `selector` is a CSS selector or `'.'`.
        // `attrName` is either a `'fill'` or `'stroke'`.
        // `gradient` must be in the special gradient format:
        //   {
        //     type: <linearGradient|radialGradient>,
        //     stops: [ { offset: <offset>, color: <color> }, ... ]
        //   }
        //
        // example:
        //   {
        //     type: 'linearGradient',
        //     stops: [
        //       {
        //          offset: '10%',
        //          color: 'green'
        //       }, {
        //          offset: '50%',
        //          color: 'blue'
        //       }
        //     ]
        //   }

        let that = this;

        if (!attrName || !gradient) {
            return that;
        }

        let type  = gradient.type;
        let stops = gradient.stops;
        let attrs = gradient.attrs;

        if (!type || !stops || !stops.length) {
            return that;
        }

        let vels = utils.isString(selector) ? that.find(selector) : selector;

        if (!vels.length) {
            return that;
        }

        let paper      = that.paper;
        let svg        = paper.svg;
        let gradientId = type + '-' + paper.id + '-' + utils.hashCode(JSON.stringify(gradient));

        // define gradient
        if (!svg.getElementById(gradientId)) {

            let gradientString = [
                '<' + type + '>',
                utils.map(stops, function (stop) {
                    return '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + (utils.isFinite(stop.opacity) ? stop.opacity : 1) + '" />';
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

        // apply gradient
        utils.forEach(vels, function (vel) {
            vel.attr(attrName, 'url(#' + gradientId + ')');
        });

        return that;
    }


    // events
    // ------

    // onContextMenu() {}

    // onDblClick() {}

    // onClick() {}

    // onPointerDown() {}

    // onPointerMove() {}

    // onPointerUp() {}

    // onMouseOver() {}

    // onMouseOut() {}

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
