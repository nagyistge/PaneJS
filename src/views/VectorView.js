import * as utils from '../common/utils';
import     vector from '../common/vector';
import    filters from '../common/filters';
import   CellView from '../views/CellView';


class VectorView extends CellView {

  ensureElement() {

    this.vel = vector(this.cell.getTagName(), {
      class: this.cell.getClassName()
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

  renderMarkup() {

    // `markup` is rendered by default. Set the `markup` on model
    // if the default markup is not desirable.

    let markup = this.compileMarkup(this.cell.getMarkup(), this.cell.getRenderData());
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
      utils.forEach(this.find(selector), (vel) => {
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

    if (!filter) {
      return this;
    }

    let name   = filter.name || '';
    let args   = filter.args || {};
    let attrs  = filter.attrs;
    let render = filters[name];

    if (!name || !render) {
      throw new Error('Invalided filter: "' + name + '"');
    }

    let vels = utils.isString(selector) ? this.find(selector) : selector;
    if (!vels.length) {
      return this;
    }


    let svg  = this.paper.svg;
    let hash = utils.hashCode(JSON.stringify(filter));
    let id   = name + '-' + this.paper.id + '-' + hash;

    // define filter
    if (!svg.getElementById(id)) {

      let vFilter = vector(render(args));
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

      vFilter.node.id = id;

      vector(svg).getDefs().append(vFilter);
    }

    // apply filter
    utils.forEach(vels, (vel) => {
      vel.attr('filter', 'url(#' + id + ')');
    });

    return this;
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

    if (!attrName || !gradient) {
      return this;
    }

    let type  = gradient.type;
    let stops = gradient.stops;
    let attrs = gradient.attrs;

    if (!type || !stops || !stops.length) {
      return this;
    }

    let vels = utils.isString(selector) ? this.find(selector) : selector;
    if (!vels.length) {
      return this;
    }

    let svg = this.paper.svg;
    let id  = type + '-' + this.paper.id + '-' + utils.hashCode(JSON.stringify(gradient));

    // define gradient
    if (!svg.getElementById(id)) {

      let gradientStr = [
        '<' + type + '>',
        utils.map(stops, stop =>
          '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + (utils.isFinite(stop.opacity) ? stop.opacity : 1) + '" />'
        ).join(''),
        '</' + type + '>'
      ].join('');

      let vGradient = vector(gradientStr);

      if (attrs) {
        vGradient.attr(attrs);
      }

      vGradient.node.id = id;
      vector(svg).getDefs().append(vGradient);
    }

    // apply gradient
    utils.forEach(vels, (vel) => {
      vel.attr(attrName, 'url(#' + id + ')');
    });

    return this;
  }
}


// exports
// -------

export default VectorView;
