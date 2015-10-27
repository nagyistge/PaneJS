import {
    each,
    getCurrentStyle,
    createSvgElement
} from './common/utils';

import detector from './common/detector';
import Base from './lib/Base';
import Point from './lib/Point';
import Rectangle from './lib/Rectangle';

export default Base.extend({
    constructor: function View(graph) {

        var that = this;
        that.graph = graph;
        that.translate = new Point();
        that.graphBounds = new Rectangle();
        //that.states = new mxDictionary();
    },

    init: function () {

        var that = this;
        var root = createSvgElement('svg');
        var canvas = createSvgElement('g');
        var backgroundPane = createSvgElement('g');
        var drawPane = createSvgElement('g');
        var overlayPane = createSvgElement('g');
        var decoratorPane = createSvgElement('g');

        canvas.appendChild(backgroundPane);
        canvas.appendChild(drawPane);
        canvas.appendChild(overlayPane);
        canvas.appendChild(decoratorPane);
        root.appendChild(canvas);

        root.style.width = '100%';
        root.style.height = '100%';
        root.style.display = 'block';

        that.canvas = canvas;
        that.backgroundPane = backgroundPane;
        that.drawPane = drawPane;
        that.overlayPane = overlayPane;
        that.decoratorPane = decoratorPane;

        var container = that.graph.container;
        if (container) {
            container.appendChild(root);

            // update container style
            var style = getCurrentStyle(container);
            if (style.position === 'static') {
                container.style.position = 'relative';
            }

            // Disables built-in pan and zoom in IE10 and later
            if (detector.IS_POINTER) {
                container.style.msTouchAction = 'none';
            }
        }

        that.installListeners();
    },

    installListeners: function () {

    }
});
