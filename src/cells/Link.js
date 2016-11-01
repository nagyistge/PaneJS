import * as utils from '../common/utils';
import Point      from '../geometry/Point';
import Cell       from '../cells/Cell';


class Link extends Cell {

  constructor(options) {

    super(options);

    this.vertices = this.metadata.vertices || [];
  }


  // static
  // ------

  static isLink(link) {
    return link && link instanceof Link;
  }


  // methods
  // -------

  isLink() {

    return true;
  }

  getRouter() {

    let router = this.metadata.router || {};

    if (utils.isFunction(router)) {
      router = { parse: router };
    } else if (!utils.isObject(router)) {
      router = { name: router };
    }

    return router;
  }

  getMarker(isSource) {

    let marker = isSource
      ? this.metadata.sourceMarker
      : this.metadata.targetMarker;

    if (utils.isFunction(marker)) {
      marker = { parse: marker };
    } else if (!utils.isObject(marker)) {
      marker = { name: marker };
    }

    marker.selector = isSource ? '.source-marker' : '.target-marker';

    return marker;
  }

  getConnector() {

    let connector = this.metadata.connector || {};

    if (utils.isFunction(connector)) {
      connector = { parse: connector };
    } else if (!utils.isObject(connector)) {
      connector = { name: connector };
    }

    connector.selector = '.connector';

    return connector;
  }


  // vertices
  // --------

  getVertices() {

    return this.vertices;
  }

  getVerticesCount() {

    return this.vertices ? this.vertices.length : 0;
  }

  getVerticeAt(index) {

    return this.vertices ? this.vertices[index] : null;
  }

  indexOfVertice(point) {

    if (point && Point.isPointLike(point)) {

      for (let i = 0, l = this.getVerticesCount(); i < l; i += 1) {

        let vertice = this.getVerticeAt(i);

        if (point.x === vertice.x && point.y === vertice.y) {
          return i;
        }
      }
    }

    return -1;
  }

  eachVertice(iterator, context) {

    return utils.forEach(this.vertices, iterator, context);
  }

  filterVertice(iterator, context) {

    return utils.filter(this.vertices, iterator, context);
  }

  insertVertice(points, index) {

    let length = this.getVerticesCount();

    index = utils.fixIndex(index, length);

    if (!utils.isArray(points)) {
      points = [points];
    }

    if (index === length) {
      this.vertices.push(...points);
    } else {
      this.vertices.splice(index, 0, points);
    }

    return this;
  }

  removeVertice(point) {

    let index = this.indexOfVertice(point);
    if (index >= 0) {
      this.removeVerticeAt(index);
    }

    return this;
  }

  removeVerticeAt(index) {

    let vertice = this.getVerticeAt(index);
    if (vertice) {
      this.vertices.splice(index, 1);
    }
    return vertice;
  }

  clearVertices() {

    this.vertices = [];

    return this;
  }


  // common
  // ------

  clone(options, withData) {

    let cloned = super.clone(options, withData);

    cloned.vertices = [];

    utils.forEach(this.vertices, (point) => {
      if (Point.isPointLike(point)) {
        cloned.vertices.push({ x: point.x, y: point.y });
      }
    });

    return cloned;
  }
}


Link.setDefaults({
  tagName: 'g',
  markup: '<path class="connector"/><path class="source-marker"/><path class="target-marker"/>',
  classNames: 'pane-cell pane-link', // pane-cell for event handler
  pane: 'linkPane',
  data: null,   // related data(for business logic)
  view: null,   // specify the constructor of the view
  router: null,
  connector: 'sharp',
  sourceMarker: null,
  targetMarker: null,
  attrs: {
    '.connector': {
      'fill': 'none',
      'stroke': '#000',
      'stroke-width': 1
    },
    '.source-marker': {
      'fill': '#000',
      'stroke': '#000',
      'stroke-width': 1
    },
    '.target-marker': {
      'fill': '#000',
      'stroke': '#000',
      'stroke-width': 1
    }
  }
});


// exports
// -------

export default Link;
