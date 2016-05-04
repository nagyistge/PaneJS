import * as utils from '../common/utils';
import     vector from '../common/vector';
import    filters from '../common/filters';


class CellView {

    constructor(paper, cell) {

        this.cell    = cell;
        this.paper   = paper;
        this.invalid = true;  // default need to be repainted

        this.ensureElement();
    }

    ensureElement() {

        this.vel  = vector(this.cell.getRoot(), {
            'class': this.cell.getClassName()
        });
        this.elem = this.vel.node;
        // attach cell's id to elem
        this.elem.cellId = this.cell.id;

        let pane = this.getPane();
        if (pane) {
            pane.appendChild(this.elem);
        }

        return this;
    }

    render() { return this; }

    update() { return this; }

    getPane() {

        let paper = this.paper;
        let pane  = this.cell.metadata.pane;
        let result;

        if (pane) {
            if (utils.isString(pane)) {
                result = paper[pane];
            } else if (utils.isNode(pane)) {
                result = pane;
            }
        }

        return result || paper.drawPane;
    }

    renderMarkup() {

        // `markup` is rendered by default. Set the `markup` on model
        // if the default markup is not desirable.

        let markup = this.cell.getMarkup();

        if (markup) {
            this.vel.append(vector(markup));
        } else {
            throw new Error('`markup` is missing while the default `render()` implementation is used.');
        }

        return this;
    }

    find(selector) {

        return selector === '.' ? [this.vel] : this.vel.find(selector);
    }

    findOne(selector) {

        return selector === '.' ? this.vel : this.vel.findOne(selector);
    }

    applyAttr(selector, attrs) {

        if (attrs) {
            utils.forEach(this.find(selector), function (vel) {
                vel.attr(attrs);
            });
        }

        return this;
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

        let elem = this.elem;

        if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }
}


// exports
// -------

export default CellView;
