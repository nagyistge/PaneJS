import Visual from './Visual';


class Link extends Visual {

    get isLink() {

        return true;
    }

    get connector() {

        return this.metadata.connector;
    }

    get sourceMarker() {

        return this.metadata.sourceMarker;
    }

    get targetMarker() {

        return this.metadata.targetMarker;
    }
}


Link.setDefaults({

    markup: ''
    + '<path class="connection"/>'
    + '<path class="connection-wrap"/>'
    + '<path class="source-marker"/>'
    + '<path class="target-marker"/>'
    + '<g class="labels"/>'
    + '<g class="marker-vertices"/>'
    + '<g class="marker-arrowheads"/>'
    + '<g class="link-tools"/>',

    classNames: 'pane-link',
    router: null,
    sourceMarker: 'classic',
    targetMarker: null,
    connector: 'sharp',
    attrs: {
        '.connection': {
            'fill': 'none',
            'stroke': '#000',
            'stroke-width': 1
        },
        '.source-marker': {
            d: 'M 0 3.50 L 7 0 L 5.25 3.50 L 7 7 z'
        },
        '.target-marker': {
            d: 'M 0 3.50 L 7 0 L 5.25 3.50 L 7 7 z'
        }
    }
});


// exports
// -------

export default Link;
