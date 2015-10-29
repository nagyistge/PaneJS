
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Shape = require('./Shape');
var detector = require('../common/detector');
var utils = require('../common/utils');
var constants = require('../constants');
var RectangleShape = require('../shapes/RectangleShape');

var ImageShape = Shape.extend({
    constructor: function ImageShape(bounds, image, fill, stroke, strokewidth) {
        var that = this;
        Shape.call(that);
        that.bounds = bounds;
        that.image = image;
        that.fill = fill;
        that.stroke = stroke;
        that.strokewidth = (strokewidth !== null) ? strokewidth : 1;
        that.shadow = false;
    },
    preserveImageAspect: true,
    getSvgScreenOffset: function () {
        return (!detector.IS_IE) ? 0.5 : 0;
    },
    apply: function (/*state*/) {
        Shape.prototype.apply.apply(this, arguments);

        this.fill = null;
        this.stroke = null;
        this.gradient = null;

        if (this.style !== null) {
            this.preserveImageAspect = utils.getNumber(this.style, constants.STYLE_IMAGE_ASPECT, 1) === 1;

            // Legacy support for imageFlipH/V
            this.flipH = this.flipH || utils.getValue(this.style, 'imageFlipH', 0) === 1;
            this.flipV = this.flipV || utils.getValue(this.style, 'imageFlipV', 0) === 1;
        }
    },
    isHtmlAllowed: function () {
        return !this.preserveImageAspect;
    },
    createHtml: function () {
        var node = document.createElement('div');
        node.style.position = 'absolute';

        return node;
    },
    paintVertexShape: function (c, x, y, w, h) {
        if (this.image !== null) {
            var fill = utils.getValue(this.style, constants.STYLE_IMAGE_BACKGROUND, null);
            var stroke = utils.getValue(this.style, constants.STYLE_IMAGE_BORDER, null);

            if (fill !== null) {
                // Stroke rendering required for shadow
                c.setFillColor(fill);
                c.setStrokeColor(stroke);
                c.rect(x, y, w, h);
                c.fillAndStroke();
            }

            // FlipH/V are implicit via mxShape.updateTransform
            c.image(x, y, w, h, this.image, this.preserveImageAspect, false, false);

            //var stroke = utils.getValue(this.style, constants.STYLE_IMAGE_BORDER, null);

            if (stroke !== null) {
                c.setShadow(false);
                c.setStrokeColor(stroke);
                c.rect(x, y, w, h);
                c.stroke();
            }
        }
        else {
            RectangleShape.prototype.paintBackground.apply(this, arguments);
        }
    },
    redrawHtmlShape: function () {
        this.node.style.left = Math.round(this.bounds.x) + 'px';
        this.node.style.top = Math.round(this.bounds.y) + 'px';
        this.node.style.width = Math.max(0, Math.round(this.bounds.width)) + 'px';
        this.node.style.height = Math.max(0, Math.round(this.bounds.height)) + 'px';
        this.node.innerHTML = '';

        if (this.image !== null) {
            var fill = utils.getValue(this.style, constants.STYLE_IMAGE_BACKGROUND, '');
            var stroke = utils.getValue(this.style, constants.STYLE_IMAGE_BORDER, '');
            this.node.style.backgroundColor = fill;
            this.node.style.borderColor = stroke;

            var img = document.createElement('img');
            img.style.position = 'absolute';
            img.src = this.image;

            var filter = (this.opacity < 100) ? 'alpha(opacity=' + this.opacity + ')' : '';
            this.node.style.filter = filter;

            if (this.flipH && this.flipV) {
                filter += 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)';
            }
            else if (this.flipH) {
                filter += 'progid:DXImageTransform.Microsoft.BasicImage(mirror=1)';
            }
            else if (this.flipV) {
                filter += 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)';
            }

            if (img.style.filter !== filter) {
                img.style.filter = filter;
            }

            if (img.nodeName === 'image') {
                img.style.rotation = this.rotation;
            }
            else if (this.rotation !== 0) {
                // LATER: Add flipV/H support
                utils.setPrefixedStyle(img.style, 'transform', 'rotate(' + this.rotation + 'deg)');
            }
            else {
                utils.setPrefixedStyle(img.style, 'transform', '');
            }

            // Known problem: IE clips top line of image for certain angles
            img.style.width = this.node.style.width;
            img.style.height = this.node.style.height;

            this.node.style.backgroundImage = '';
            this.node.appendChild(img);
        }
        else {
            this.setTransparentBackgroundImage(this.node);
        }
    },
});

module.exports = ImageShape;

