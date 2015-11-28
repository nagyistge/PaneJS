import {
    isNode,
    isArray,
    getCurrentStyle,
    setPrefixedStyle,
    getAlignments
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({

    constructor: function Label(state, style, bounds) {

        var that = this;

        Label.superclass.constructor.call(that, state, style, bounds);

        // set visible from shape
        style.visible = state.shape.style.visible;

        that.parent = state.shape;
        that.position = style.position || 'center';
        that.align = style.align || 'center';
        that.verticalAlign = style.verticalAlign || 'middle';
        that.vertical = style.vertical || false;
        that.overflow = style.overflow;

        var spacing = style.spacing;

        if (isArray(spacing)) {

            spacing = spacing.slice();

            spacing[0] = !isNaN(spacing[0]) ? Math.round(spacing[0]) : 0;
            spacing[1] = !isNaN(spacing[1]) ? Math.round(spacing[1]) : 0;
            spacing[2] = !isNaN(spacing[2]) ? Math.round(spacing[2]) : 0;
            spacing[3] = !isNaN(spacing[3]) ? Math.round(spacing[3]) : 0;

            that.spacing = spacing;
        } else {
            spacing = !isNaN(spacing) ? Math.round(spacing) : 0;
            that.spacing = [spacing, spacing, spacing, spacing];
        }

        that.updateAlignments()
            .init(state.view.foreignPane);
    },

    create: function (container) {

        var that = this;
        var doc = container && container.ownerDocument;
        if (doc) {

            var node = doc.createElement('div');
            var bg = doc.createElement('div');
            var content = doc.createElement('div');

            node.className = 'pane-label';
            bg.className = 'pane-label-bg';
            content.className = 'pane-label-content';

            node.appendChild(bg);
            node.appendChild(content);

            that.backgroundNode = bg;
            that.contentNode = content;

            bg.style.cssText = 'position:absolute; top:0; left:0; right:0; bottom:0;';
            content.style.cssText = 'position:relative;';

            return node;
        }
    },

    clear: function () {

        var that = this;
        var node = that.contentNode;

        if (node && node.ownerDocument) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return that;
    },

    redrawShape: function () {
        return this.draw();
    },

    draw: function () {
        var that = this;
        var node = that.node;

        // resets CSS styles
        node.style.cssText = 'position:absolute; whiteSpace:normal;';

        return that.updateValue()
            .updateSize()
            .updateTransform();

    },

    updateBoundingBox: function () {

        var that = this;
        var style = that.style;
        var alignments = that.alignments;
        var boundingBox = that.bounds.clone();

        if (style.overflow !== 'fill') {

            var scale = that.getScale();
            var contentNode = that.contentNode;

            var w = contentNode.offsetWidth * scale || 1;
            var h = contentNode.offsetHeight * scale || 1;

            boundingBox.x += alignments.x * w;
            boundingBox.y += alignments.y * h;
            boundingBox.width = w;
            boundingBox.height = h;
        } else {
            boundingBox.x += that.alignments.x * boundingBox.width;
            boundingBox.y += that.alignments.y * boundingBox.height;
        }

        that.rotateBoundingBox(boundingBox, that.getRotation());
        that.boundingBox = boundingBox;

        return that;
    },

    updateValue: function () {

        var that = this;
        var content = that.content;
        var contentNode = that.contentNode;

        if (isNode(content)) {
            contentNode.innerHTML = '';
            contentNode.appendChild(content);
        } else {
            contentNode.innerHTML = content;
        }

        return that;
    },

    updateSize: function () {

        var that = this;
        var scale = that.getScale();
        var w = Math.round(that.bounds.width / scale) + 'px';
        var h = Math.round(that.bounds.height / scale) + 'px';

        var style = that.node.style;
        var overflow = that.overflow;

        if (overflow === 'hidden') {
            style.maxHeight = h;
            style.maxWidth = w;
        } else if (overflow === 'fill') {
            style.width = w;
            style.height = h;
        } else if (overflow === 'width') {
            style.width = w;
            style.maxHeight = h;
        } else {

        }

        return that;

    },

    updateTransform: function () {

        var that = this;
        var theta = that.getRotation();
        var scale = that.parent.style.scale;
        var style = that.node.style;
        var bounds = that.bounds;
        var dx = that.alignments.x * 100;
        var dy = that.alignments.y * 100;

        if (theta) {
            setPrefixedStyle(style, 'transformOrigin', (-dx) + '%' + ' ' + (-dy) + '%');
            setPrefixedStyle(style, 'transform', 'translate(' + dx + '%' + ',' + dy + '%)' +
                'scale(' + scale + ') rotate(' + theta + 'deg)');
        } else {
            setPrefixedStyle(style, 'transformOrigin', '0% 0%');
            setPrefixedStyle(style, 'transform', 'scale(' + scale + ')' +
                'translate(' + dx + '%' + ',' + dy + '%)');
        }

        style.left = Math.round(bounds.x) + 'px';
        style.top = Math.round(bounds.y) + 'px';

        return that;
    },

    updateAlignments: function () {
        var that = this;
        that.alignments = getAlignments(that.align, that.verticalAlign);
        return that;
    },

    isPaintBoundsInverted: function () {
        return this.vertical;
    },

    getSpacing: function () {

        var that = this;

        var dx = 0;
        var dy = 0;
        var align = that.align;
        var vAlign = that.verticalAlign;
        var spacing = that.spacing;


        if (align === 'center') {
            dx = (spacing[1] - spacing[3]) / 2;
        } else if (align === 'right') {
            dx = -spacing[1];
        } else {
            dx = spacing[3];
        }

        if (vAlign === 'middle') {
            dy = (spacing[0] - spacing[2]) / 2;
        } else if (vAlign === 'top') {
            dy = -spacing[0];
        } else {
            dy = spacing[2];
        }

        return {
            x: dx,
            y: dy
        };
    },

    getScale: function () {
        return this.parent.style.scale;
    },

    getRotation: function () {

        var that = this;
        var rot = that.parent.style.rotation || 0;

        if (that.vertical) {
            rot += that.style.verticalRotation;
        }

        return rot;
    }

});
