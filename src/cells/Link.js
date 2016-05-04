import * as utils from '../common/utils';
import     Visual from '../cells/Visual';


class Link extends Visual {

    // static
    // ------

    static isLink(link) {
        return link && link instanceof Link;
    }


    // props
    // -----

    get isLink() {

        return true;
    }


    // methods
    // -------

    insertVertice(points, index) {

        if (!this.vertices) {
            this.vertices = [];
        }

        let length = this.vertices.length;

        index = utils.fixIndex(index, length);

        if (!utils.isArray(points)) {
            points = [points];
        }

        if (index === length) {
            Array.prototype.push.apply(this.vertices, points);
        } else {
            this.vertices.splice(index, 0, points);
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

        if (this.vertices && this.vertices.length) {
            vertice = this.vertices[index];

            if (vertice) {
                this.vertices.splice(index, 1);
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

    getMarker(isSource) {

        let marker = isSource
            ? this.metadata.sourceMarker
            : this.metadata.targetMarker;

        if (!utils.isObject(marker)) {
            marker = { name: marker };
        }

        marker.selector = isSource
            ? '.source-marker'
            : '.target-marker';

        return marker;
    }

    getConnector() {

        let connector = this.metadata.connector || {};

        if (!utils.isObject(connector)) {
            connector = { name: connector };
        }

        connector.selector = '.connector';

        return connector;
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
