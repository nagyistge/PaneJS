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
    targetMarker: 'cloven',
    connector: 'sharp',
    attrs: {
        '.connection': {
            'fill': 'none',
            'stroke': '#000',
            'stroke-width': 1
        }
    }
});


// exports
// -------

export default Link;
