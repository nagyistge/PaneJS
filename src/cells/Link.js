import * as utils from '../common/utils';
import     Visual from '../cells/Visual';


class Link extends Visual {

    get isLink() {

        return true;
    }

    getRouter() {

        let router = this.metadata.router || {};

        if (!utils.isObject(router)) {

            router = { name: router };
        }

        return router;
    }

    getConnector() {

        let connector = this.metadata.connector || {};
        let selector = '.connector';

        if (!utils.isObject(connector)) {

            connector = { name: connector };
        }

        connector.selector = selector;

        return connector;
    }

    getMarker(isSource) {

        let that = this;
        let metadata = that.metadata;
        let marker = isSource ? metadata.sourceMarker : metadata.targetMarker;
        let selector = isSource ? '.source-marker' : '.target-marker';

        if (!utils.isObject(marker)) {

            marker = { name: marker };
        }

        marker.selector = selector;

        if (!utils.isObject(marker.options)) {
            marker.options = {};
        }

        marker.options.markerStrokeWidth = that.getStrokeWidth(selector);
        marker.options.connectorStrokeWidth = that.getStrokeWidth('.connector');


        return marker;
    }

    getStrokeWidth(selector) {

        let attr = this.attrs[selector];

        return attr && utils.toFloat(attr['stroke-width']) || 0;
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
