define([
    './common/utils',
    './common/detector',
    './lib/Base',
    './cells/Root',
    './cells/Layer',
    './cells/Group',
    './cells/Node',
    './cells/Link'
], function (
    utils,
    detector,
    Base,
    Root,
    Layer,
    Group,
    Node,
    Link
) {
    'use strict';

    return Base.extend({
        constructor: function View(graph) {
            this.graph = graph;
            this.translate = new Point();
            this.graphBounds = new Rectangle();
            this.states = new mxDictionary();
        },

        init: function () {

            var that = this;
            var root = document.createElementNS(mxConstants.NS_SVG, 'svg');
            var canvas = document.createElementNS(mxConstants.NS_SVG, 'g');
            var backgroundPane = document.createElementNS(mxConstants.NS_SVG, 'g');
            var drawPane = document.createElementNS(mxConstants.NS_SVG, 'g');
            var overlayPane = document.createElementNS(mxConstants.NS_SVG, 'g');
            var decoratorPane = document.createElementNS(mxConstants.NS_SVG, 'g');

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
                that.updateContainerStyle(container);
            }

            that.installListeners();
        },

        installListeners: function () {},

        updateContainerStyle: function (container) {
            var style = utils.getCurrentStyle(container);

            if (style.position === 'static') {
                container.style.position = 'relative';
            }

            // 禁用默认的平移和缩放
            // Disables built-in pan and zoom in IE10 and later
            if (detector.IS_POINTER) {
                container.style.msTouchAction = 'none';
            }
        }

    });

});
