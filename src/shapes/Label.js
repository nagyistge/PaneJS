import {
    isNode,
    getCurrentStyle,
    setPrefixedStyle,
    getAlignmentAsPoint
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({

    constructor: function Label(state, style, bounds) {

        var that = this;

        Label.superclass.constructor.call(that, state, style, bounds);

        that.align = style.align || 'center';
        that.verticalAlign = style.verticalAlign || 'middle';
        that.overflow = style.overflow;
        that.vertical = style.vertical || false;

        that.parent = state.shape;
        that.margin = getAlignmentAsPoint(that.align, that.verticalAlign);
        that.init(state.view.foreignPane);
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
            content.style.cssText = 'position:relative; border:1px solid red;';

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

    redraw: function () {

        var that = this;
        var node = that.node;
        var visible = that.parent.style.visible;

        if (visible && that.checkBounds()) {
            node.style.visibility = 'visible';
            that.clear();
            that.redrawShape();
            that.updateBoundingBox();
        } else {
            node.style.visibility = 'hidden';
            that.boundingBox = null;
        }

        return that;
    },

    redrawShape: function () {
        return this.draw();
    },

    draw: function () {
        var that = this;
        var node = that.node;
        var style = node.style;

        // resets CSS styles
        style.position = 'absolute';
        style.whiteSpace = 'normal';
        style.overflow = '';
        style.width = '';
        style.height = '';

        return that.updateValue()
            .updateSize()
            .updateTransform();

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
        //var contentNode = that.contentNode;
        //var backgroundNode = that.backgroundNode;
        //
        //var contentStyle = getCurrentStyle(that.contentNode);
        //
        //backgroundNode.style.width = contentStyle.width;
        //backgroundNode.style.height = contentStyle.height;

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
        var style = that.node.style;
        var scale = that.parent.style.scale;
        var dx = that.margin.x;
        var dy = that.margin.y;
        var bounds = that.bounds;

        if (theta != 0) {
            setPrefixedStyle(style, 'transformOrigin', (-dx * 100) + '%' + ' ' + (-dy * 100) + '%');
            setPrefixedStyle(style, 'transform', 'translate(' + (dx * 100) + '%' + ',' + (dy * 100) + '%)' +
                'scale(' + scale + ') rotate(' + theta + 'deg)');
        }
        else {
            setPrefixedStyle(style, 'transformOrigin', '0% 0%');
            setPrefixedStyle(style, 'transform', 'scale(' + scale + ')' +
                'translate(' + (dx * 100) + '%' + ',' + (dy * 100) + '%)');
        }

        style.left = Math.round(bounds.x) + 'px';
        style.top = Math.round(bounds.y) + 'px';

        return that;
    },

    isPaintBoundsInverted: function () {
        return this.vertical;
    },

    getSpacing: function () {

        var that = this;

        var dx = 0;
        var dy = 0;
        var style = that.style;
        var align = that.align;
        var vAlign = that.verticalAlign;

        if (align === 'center') {

        } else if (align === 'right') {

        } else {

        }

        if (vAlign === 'middle') {

        } else if (vAlign === 'top') {

        } else {

        }

    },

    getScale: function () {
        return this.parent.style.scale;
    },

    getRotation: function () {

        var rot = this.parent.style.rotation || 0;

        if (this.vertical) {
            rot += this.style.verticalRotation;
        }

        return rot;
    }

});
