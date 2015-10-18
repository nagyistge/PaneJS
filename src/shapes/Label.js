var utils = require('../common/utils');
var RectangleShape = require('./RectangleShape');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = RectangleShape.extend({

    imageSize: constants.DEFAULT_IMAGESIZE,
    spacing: 2,
    indicatorSize: 10,
    indicatorSpacing: 2,


    constructor: function Label(bounds, fill, stroke, strokeWidth) {
        this.constructor.superclass.constructor.call(this, bounds, fill, stroke, strokeWidth);
    },

    init: function (container) {
        this.constructor.superclass.prototype.init.apply(this, arguments);

        if (this.indicatorShape) {
            this.indicator = new this.indicatorShape();
            this.indicator.dialect = this.dialect;
            this.indicator.init(this.node);
        }
    },

    redraw: function () {
        if (this.indicator) {
            this.indicator.fill = this.indicatorColor;
            this.indicator.stroke = this.indicatorStrokeColor;
            this.indicator.gradient = this.indicatorGradientColor;
            this.indicator.direction = this.indicatorDirection;
        }

        this.constructor.superclass.prototype.redraw.apply(this, arguments);
    },

    isHtmlAllowed: function () {

        return this.constructor.superclass.prototype.isHtmlAllowed.apply(this, arguments) &&
            this.indicatorColor == null && this.indicatorShape == null;
    },

    paintForeground: function (c, x, y, w, h) {

        this.paintImage(c, x, y, w, h);
        this.paintIndicator(c, x, y, w, h);

        this.constructor.superclass.prototype.paintForeground.apply(this, arguments);
    },

    paintImage: function (c, x, y, w, h) {
        if (this.image != null) {
            var bounds = this.getImageBounds(x, y, w, h);
            c.image(bounds.x, bounds.y, bounds.width, bounds.height, this.image, false, false, false);
        }
    },

    getImageBounds: function (x, y, w, h) {
        var align = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_ALIGN, mxConstants.ALIGN_LEFT);
        var valign = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
        var width = mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_WIDTH, mxConstants.DEFAULT_IMAGESIZE);
        var height = mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_HEIGHT, mxConstants.DEFAULT_IMAGESIZE);
        var spacing = mxUtils.getNumber(this.style, mxConstants.STYLE_SPACING, this.spacing) + 5;

        if (align == mxConstants.ALIGN_CENTER) {
            x += (w - width) / 2;
        }
        else if (align == mxConstants.ALIGN_RIGHT) {
            x += w - width - spacing;
        }
        else // default is left
        {
            x += spacing;
        }

        if (valign == mxConstants.ALIGN_TOP) {
            y += spacing;
        }
        else if (valign == mxConstants.ALIGN_BOTTOM) {
            y += h - height - spacing;
        }
        else // default is middle
        {
            y += (h - height) / 2;
        }

        return new mxRectangle(x, y, width, height);
    },

    paintIndicator: function (c, x, y, w, h) {
        if (this.indicator != null) {
            this.indicator.bounds = this.getIndicatorBounds(x, y, w, h);
            this.indicator.paint(c);
        }
        else if (this.indicatorImage != null) {
            var bounds = this.getIndicatorBounds(x, y, w, h);
            c.image(bounds.x, bounds.y, bounds.width, bounds.height, this.indicatorImage, false, false, false);
        }
    },

    getIndicatorBounds: function (x, y, w, h) {
        var align = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_ALIGN, mxConstants.ALIGN_LEFT);
        var valign = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
        var width = mxUtils.getNumber(this.style, mxConstants.STYLE_INDICATOR_WIDTH, this.indicatorSize);
        var height = mxUtils.getNumber(this.style, mxConstants.STYLE_INDICATOR_HEIGHT, this.indicatorSize);
        var spacing = this.spacing + 5;

        if (align == mxConstants.ALIGN_RIGHT) {
            x += w - width - spacing;
        }
        else if (align == mxConstants.ALIGN_CENTER) {
            x += (w - width) / 2;
        }
        else // default is left
        {
            x += spacing;
        }

        if (valign == mxConstants.ALIGN_BOTTOM) {
            y += h - height - spacing;
        }
        else if (valign == mxConstants.ALIGN_TOP) {
            y += spacing;
        }
        else // default is middle
        {
            y += (h - height) / 2;
        }

        return new mxRectangle(x, y, width, height);
    },

    redrawHtmlShape: function () {
        mxRectangleShape.prototype.redrawHtmlShape.apply(this, arguments);

        // Removes all children
        while (this.node.hasChildNodes()) {
            this.node.removeChild(this.node.lastChild);
        }

        if (this.image != null) {
            var node = document.createElement('img');
            node.style.position = 'relative';
            node.setAttribute('border', '0');

            var bounds = this.getImageBounds(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            bounds.x -= this.bounds.x;
            bounds.y -= this.bounds.y;

            node.style.left = Math.round(bounds.x) + 'px';
            node.style.top = Math.round(bounds.y) + 'px';
            node.style.width = Math.round(bounds.width) + 'px';
            node.style.height = Math.round(bounds.height) + 'px';

            node.src = this.image;

            this.node.appendChild(node);
        }
    }
});

