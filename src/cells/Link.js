import * as utils from '../common/utils';
import     Visual from '../cells/Visual';


class Link extends Visual {

    // static
    // ------

    static isLink(link) {
        return link && link instanceof Link;
    }

    get isLink() {

        return true;
    }

    insertVertice(points, index) {

        let vertices = this.vertices;

        if (!vertices) {
            vertices = this.vertices = [];
        }

        let length = vertices.length;

        index = utils.fixIndex(index, length);

        if (!utils.isArray(points)) {
            points = [points];
        }

        if (index === length) {
            Array.prototype.push.apply(vertices, points);
        } else {
            vertices.splice(index, 0, points);
        }

        return this;
    }

    removeVertice(point) {

        if (point) {

            let index = -1;
            utils.some(this.vertices, function (vertice, i) {
                if (point.x === vertice.x && point.y === vertice.y) {
                    index = i;
                    return true;
                }
            });

            if (index >= 0) {
                this.removeVerticeAt(index);
            }

        }

        return this;
    }

    removeVerticeAt(index) {

        let vertice;
        let vertices = this.vertices;

        if (vertices && vertices.length) {
            vertice = vertices[index];

            if (vertice) {
                vertices.splice(index, 1);
            }
        }

        return vertice;
    }

    clearVertices() {

        this.vertices = [];

        return this;
    }

    getRouter() {

        let router = this.metadata.router || {};

        if (!utils.isObject(router)) {
            router = { name: router };
        }

        return router;
    }

    getConnector() {

        let selector  = '.connector';
        let connector = this.metadata.connector || {};

        if (!utils.isObject(connector)) {
            connector = { name: connector };
        }

        connector.selector = selector;

        return connector;
    }

    getMarker(isSource) {

        let that     = this;
        let meta     = that.metadata;
        let marker   = isSource ? meta.sourceMarker : meta.targetMarker;
        let selector = isSource ? '.source-marker' : '.target-marker';

        if (!utils.isObject(marker)) {
            marker = { name: marker };
        }

        marker.selector = selector;

        return marker;
    }
}


Link.setDefaults({

    markup: ''
    + '<path class="connector"/>'
    + '<path class="source-marker"/>'
    + '<path class="target-marker"/>',

    classNames: 'pane-link',
    pane: 'linkPane',
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
