define(function(require, exports, module) {var utils = require('../common/utils');
var Shape = require('./Shape');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({

    baseSpacingTop: 0,
    baseSpacingBottom: 0,
    baseSpacingLeft: 0,
    baseSpacingRight: 0,
    replaceLinefeeds: true,
    verticalTextRotation: -90,
    ignoreClippedStringSize: true,
    ignoreStringSize: false,
    textWidthPadding: 3,


    constructor: function Text(
        value, bounds, align, valign, color,
        family, size, fontStyle, spacing, spacingTop, spacingRight,
        spacingBottom, spacingLeft, horizontal, background, border,
        wrap, clipped, overflow, labelPadding
    ) {

        this.constructor.superclass.constructor.call(this);

        this.value = value;
        this.bounds = bounds;
        this.color = (color != null) ? color : 'black';
        this.align = (align != null) ? align : '';
        this.valign = (valign != null) ? valign : '';
        this.family = (family != null) ? family : constants.DEFAULT_FONTFAMILY;
        this.size = (size != null) ? size : constants.DEFAULT_FONTSIZE;
        this.fontStyle = (fontStyle != null) ? fontStyle : constants.DEFAULT_FONTSTYLE;
        this.spacing = parseInt(spacing || 2);
        this.spacingTop = this.spacing + parseInt(spacingTop || 0);
        this.spacingRight = this.spacing + parseInt(spacingRight || 0);
        this.spacingBottom = this.spacing + parseInt(spacingBottom || 0);
        this.spacingLeft = this.spacing + parseInt(spacingLeft || 0);
        this.horizontal = (horizontal != null) ? horizontal : true;
        this.background = background;
        this.border = border;
        this.wrap = (wrap != null) ? wrap : false;
        this.clipped = (clipped != null) ? clipped : false;
        this.overflow = (overflow != null) ? overflow : 'visible';
        this.labelPadding = (labelPadding != null) ? labelPadding : 0;
        this.rotation = 0;
        this.updateMargin();
    },

    isParseVml: function () {return false},

    isHtmlAllowed: function () {return true},

    getSvgScreenOffset: function () {return 0},

    checkBounds: function () {
        return (this.bounds && !isNaN(this.bounds.x) && !isNaN(this.bounds.y) && !isNaN(this.bounds.width) && !isNaN(this.bounds.height));
    },

    apply: function (state) {
        this.constructor.superclass.apply.apply(this, arguments);

        if (this.style != null) {
            this.fontStyle = mxUtils.getValue(this.style, constants.STYLE_FONTSTYLE, this.fontStyle);
            this.family = mxUtils.getValue(this.style, constants.STYLE_FONTFAMILY, this.family);
            this.size = mxUtils.getValue(this.style, constants.STYLE_FONTSIZE, this.size);
            this.color = mxUtils.getValue(this.style, constants.STYLE_FONTCOLOR, this.color);
            this.align = mxUtils.getValue(this.style, constants.STYLE_ALIGN, this.align);
            this.valign = mxUtils.getValue(this.style, constants.STYLE_VERTICAL_ALIGN, this.valign);
            this.spacingTop = mxUtils.getValue(this.style, constants.STYLE_SPACING_TOP, this.spacingTop);
            this.spacingRight = mxUtils.getValue(this.style, constants.STYLE_SPACING_RIGHT, this.spacingRight);
            this.spacingBottom = mxUtils.getValue(this.style, constants.STYLE_SPACING_BOTTOM, this.spacingBottom);
            this.spacingLeft = mxUtils.getValue(this.style, constants.STYLE_SPACING_LEFT, this.spacingLeft);
            this.horizontal = mxUtils.getValue(this.style, constants.STYLE_HORIZONTAL, this.horizontal);
            this.background = mxUtils.getValue(this.style, constants.STYLE_LABEL_BACKGROUNDCOLOR, this.background);
            this.border = mxUtils.getValue(this.style, constants.STYLE_LABEL_BORDERCOLOR, this.border);
            this.updateMargin();
        }
    },

    updateBoundingBox: function () {
        var node = this.node;
        this.boundingBox = this.bounds.clone();
        var rot = this.getTextRotation();

        var h = (this.style) ? getValue(this.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER) : null;
        var v = (this.style) ? getValue(this.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE) : null;

        if (!this.ignoreStringSize && node && this.overflow != 'fill' && (!this.clipped || !this.ignoreClippedStringSize || h != constants.ALIGN_CENTER || v != constants.ALIGN_MIDDLE)) {
            var ow = null;
            var oh = null;

            if (node.ownerSVGElement != null) {
                if (node.firstChild != null && node.firstChild.firstChild != null &&
                    node.firstChild.firstChild.nodeName == 'foreignObject') {
                    node = node.firstChild.firstChild;
                    ow = parseInt(node.getAttribute('width')) * this.scale;
                    oh = parseInt(node.getAttribute('height')) * this.scale;
                }
                else {
                    try {
                        var b = node.getBBox();

                        // Workaround for bounding box of empty string
                        if (typeof(this.value) == 'string' && mxUtils.trim(this.value) == 0) {
                            return;
                        }

                        if (b.width == 0 && b.height == 0) {
                            return;
                        }

                        this.boundingBox = new Rectangle(b.x, b.y, b.width, b.height);
                        rot = 0;
                    }
                    catch (e) {
                        // Ignores NS_ERROR_FAILURE in FF if container display is none.
                    }
                }
            }
            else {
                var td = (this.state != null) ? this.state.view.textDiv : null;

                // Use cached offset size
                if (this.offsetWidth != null && this.offsetHeight != null) {
                    ow = this.offsetWidth * this.scale;
                    oh = this.offsetHeight * this.scale;
                }
                else {
                    // Cannot get node size while container hidden so a
                    // shared temporary DIV is used for text measuring
                    if (td != null) {
                        this.updateFont(td);
                        this.updateSize(td, false);
                        this.updateInnerHtml(td);

                        node = td;
                    }

                    var sizeDiv = node;

                    if (document.documentMode == 8 && !mxClient.IS_EM) {
                        var w = Math.round(this.bounds.width / this.scale);

                        if (this.wrap && w > 0) {
                            node.whiteSpace = 'normal';

                            // Innermost DIV is used for measuring text
                            var divs = sizeDiv.getElementsByTagName('div');

                            if (divs.length > 0) {
                                sizeDiv = divs[divs.length - 1];
                            }

                            ow = sizeDiv.offsetWidth + 2;
                            divs = this.node.getElementsByTagName('div');

                            if (this.clipped) {
                                ow = Math.min(w, ow);
                            }

                            // Second last DIV width must be updated in DOM tree
                            if (divs.length > 1) {
                                divs[divs.length - 2].style.width = ow + 'px';
                            }
                        }
                        else {
                            node.whiteSpace = 'nowrap';
                        }
                    }
                    else if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                        sizeDiv = sizeDiv.firstChild;
                    }

                    ow = (sizeDiv.offsetWidth + this.textWidthPadding) * this.scale;
                    oh = sizeDiv.offsetHeight * this.scale;
                }
            }

            if (ow != null && oh != null) {
                var x0 = this.bounds.x + this.margin.x * ow;
                var y0 = this.bounds.y + this.margin.y * oh;

                this.boundingBox = new Rectangle(x0, y0, ow, oh);
            }
        }
        else {
            this.boundingBox.x += this.margin.x * this.boundingBox.width;
            this.boundingBox.y += this.margin.y * this.boundingBox.height;
        }

        if (this.boundingBox) {
            if (rot != 0) {
                var bbox = mxUtils.getBoundingBox(this.boundingBox, rot);

                this.boundingBox.x = bbox.x;
                this.boundingBox.y = bbox.y;

                if (!mxClient.IS_QUIRKS) {
                    this.boundingBox.width = bbox.width;
                    this.boundingBox.height = bbox.height;
                }
            }
        }
    },

    getShapeRotation: function () {
        return 0;
    },

    getTextRotation: function () {
        return (this.state != null && this.state.shape != null) ? this.state.shape.getTextRotation() : 0;
    },

    isPaintBoundsInverted: function () {
        return !this.horizontal && this.state != null && this.state.view.graph.model.isVertex(this.state.cell);
    },

    configureCanvas: function (c, x, y, w, h) {
        this.constructor.superclass.configureCanvas.apply(this, arguments);

        c.setFontColor(this.color);
        c.setFontBackgroundColor(this.background);
        c.setFontBorderColor(this.border);
        c.setFontFamily(this.family);
        c.setFontSize(this.size);
        c.setFontStyle(this.fontStyle);
    },

    updateVmlContainer: function () {
        this.node.style.left = Math.round(this.bounds.x) + 'px';
        this.node.style.top = Math.round(this.bounds.y) + 'px';
        this.node.style.width = '1px';
        this.node.style.height = '1px';
        this.node.style.overflow = 'visible';
    },

    paint: function (c) {
        // Scale is passed-through to canvas
        var s = this.scale;
        var x = this.bounds.x / s;
        var y = this.bounds.y / s;
        var w = this.bounds.width / s;
        var h = this.bounds.height / s;

        this.updateTransform(c, x, y, w, h);
        this.configureCanvas(c, x, y, w, h);

        // Checks if text contains HTML markup
        var realHtml = utils.isNode(this.value) || this.dialect == constants.DIALECT_STRICTHTML;

        // Always renders labels as HTML in VML
        //var fmt = (realHtml || c instanceof mxVmlCanvas2D) ? 'html' : '';
        var fmt = '';
        var val = this.value;

        if (!realHtml && fmt == 'html') {
            val = mxUtils.htmlEntities(val, false);
        }

        val = (!utils.isNode(this.value) && this.replaceLinefeeds && fmt == 'html') ?
            val.replace(/\n/g, '<br/>') : val;

        c.text(x, y, w, h, val, this.align, this.valign, this.wrap, fmt, this.overflow,
            this.clipped, this.getTextRotation());
    },

    redrawHtmlShape: function () { },

    updateHtmlTransform: function () { },

    updateInnerHtml: function (elt) {

        if (mxUtils.isNode(this.value)) {
            elt.innerHTML = this.value.outerHTML;
        }
        else {
            var val = this.value;

            if (this.dialect != constants.DIALECT_STRICTHTML) {
                // LATER: Can be cached in updateValue
                val = mxUtils.htmlEntities(val, false);
            }

            val = (this.replaceLinefeeds) ? val.replace(/\n/g, '<br/>') : val;
            val = '<div style="display:inline-block;_display:inline;">' + val + '</div>';

            elt.innerHTML = val;
        }
    },

    updateHtmlFilter: function () {
        var style = this.node.style;
        var dx = this.margin.x;
        var dy = this.margin.y;
        var s = this.scale;

        // Resets filter before getting offsetWidth
        mxUtils.setOpacity(this.node, this.opacity);

        // Adds 1 to match table height in 1.x
        var ow = 0;
        var oh = 0;
        var td = (this.state != null) ? this.state.view.textDiv : null;
        var sizeDiv = this.node;

        // Fallback for hidden text rendering in IE quirks mode
        if (td != null) {
            td.style.overflow = '';
            td.style.height = '';
            td.style.width = '';

            this.updateFont(td);
            this.updateSize(td, false);
            this.updateInnerHtml(td);

            var w = Math.round(this.bounds.width / this.scale);

            if (this.wrap && w > 0) {
                td.whiteSpace = 'normal';
                ow = w;

                if (this.clipped) {
                    ow = Math.min(ow, this.bounds.width);
                }

                td.style.width = ow + 'px';
            }
            else {
                td.whiteSpace = 'nowrap';
            }

            sizeDiv = td;

            if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                sizeDiv = sizeDiv.firstChild;
            }

            // Required to update the height of the text box after wrapping width is known
            if (!this.clipped && this.wrap && w > 0) {
                ow = sizeDiv.offsetWidth + this.textWidthPadding;
                td.style.width = ow + 'px';
            }

            oh = sizeDiv.offsetHeight + 2;

            if (mxClient.IS_QUIRKS && this.border != null && this.border != constants.NONE) {
                oh += 3;
            }
        }
        else if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
            sizeDiv = sizeDiv.firstChild;

            oh = sizeDiv.offsetHeight;
        }

        ow = sizeDiv.offsetWidth + this.textWidthPadding;

        if (this.clipped) {
            oh = Math.min(oh, this.bounds.height);
        }

        // Stores for later use
        this.offsetWidth = ow;
        this.offsetHeight = oh;

        var w = this.bounds.width / s;
        var h = this.bounds.height / s;

        // Simulates max-height CSS in quirks mode
        if (mxClient.IS_QUIRKS && (this.clipped || (this.overflow == 'width' && h > 0))) {
            h = Math.min(h, oh);
            style.height = Math.round(h) + 'px';
        }
        else {
            h = oh;
        }

        if (this.overflow != 'fill' && this.overflow != 'width') {
            if (this.clipped) {
                ow = Math.min(w, ow);
            }

            w = ow;

            // Simulates max-width CSS in quirks mode
            if ((mxClient.IS_QUIRKS && this.clipped) || this.wrap) {
                style.width = Math.round(w) + 'px';
            }
        }

        h *= s;
        w *= s;

        // Rotation case is handled via VML canvas
        var rad = this.getTextRotation() * (Math.PI / 180);

        // Precalculate cos and sin for the rotation
        var real_cos = parseFloat(parseFloat(Math.cos(rad)).toFixed(8));
        var real_sin = parseFloat(parseFloat(Math.sin(-rad)).toFixed(8));

        rad %= 2 * Math.PI;

        if (rad < 0) {
            rad += 2 * Math.PI;
        }

        rad %= Math.PI;

        if (rad > Math.PI / 2) {
            rad = Math.PI - rad;
        }

        var cos = Math.cos(rad);
        var sin = Math.sin(-rad);

        var tx = w * -(dx + 0.5);
        var ty = h * -(dy + 0.5);

        var top_fix = (h - h * cos + w * sin) / 2 + real_sin * tx - real_cos * ty;
        var left_fix = (w - w * cos + h * sin) / 2 - real_cos * tx - real_sin * ty;

        if (rad != 0) {
            var f = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + real_cos + ', M12=' +
                real_sin + ', M21=' + (-real_sin) + ', M22=' + real_cos + ', sizingMethod=\'auto expand\')';

            if (style.filter != null && style.filter.length > 0) {
                style.filter += ' ' + f;
            }
            else {
                style.filter = f;
            }
        }

        style.zoom = s;
        style.left = Math.round(this.bounds.x + left_fix - w / 2) + 'px';
        style.top = Math.round(this.bounds.y + top_fix - h / 2) + 'px';
    },

    updateValue: function () {
        if (mxUtils.isNode(this.value)) {
            this.node.innerHTML = '';
            this.node.appendChild(this.value);
        }
        else {
            var val = this.value;

            if (this.dialect != constants.DIALECT_STRICTHTML) {
                val = mxUtils.htmlEntities(val, false);
            }

            val = (this.replaceLinefeeds) ? val.replace(/\n/g, '<br/>') : val;
            var bg = (this.background != null && this.background != constants.NONE) ? this.background : null;
            var bd = (this.border != null && this.border != constants.NONE) ? this.border : null;

            if (this.overflow == 'fill' || this.overflow == 'width') {
                if (bg != null) {
                    this.node.style.backgroundColor = bg;
                }

                if (bd != null) {
                    this.node.style.border = '1px solid ' + bd;
                }
            }
            else {
                var css = '';

                if (bg != null) {
                    css += 'background-color:' + bg + ';';
                }

                if (bd != null) {
                    css += 'border:1px solid ' + bd + ';';
                }

                // Wrapper DIV for background, zoom needed for inline in quirks
                // and to measure wrapped font sizes in all browsers
                // FIXME: Background size in quirks mode for wrapped text
                var lh = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(this.size * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
                val = '<div style="zoom:1;' + css + 'display:inline-block;_display:inline;text-decoration:inherit;' +
                    'padding-bottom:1px;padding-right:1px;line-height:' + lh + '">' + val + '</div>';
            }

            this.node.innerHTML = val;
        }
    },

    updateFont: function (node) {
        var style = node.style;

        style.lineHeight = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(this.size * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
        style.fontSize = Math.round(this.size) + 'px';
        style.fontFamily = this.family;
        style.verticalAlign = 'top';
        style.color = this.color;

        if ((this.fontStyle & constants.FONT_BOLD) == constants.FONT_BOLD) {
            style.fontWeight = 'bold';
        }
        else {
            style.fontWeight = '';
        }

        if ((this.fontStyle & constants.FONT_ITALIC) == constants.FONT_ITALIC) {
            style.fontStyle = 'italic';
        }
        else {
            style.fontStyle = '';
        }

        if ((this.fontStyle & constants.FONT_UNDERLINE) == constants.FONT_UNDERLINE) {
            style.textDecoration = 'underline';
        }
        else {
            style.textDecoration = '';
        }

        if (this.align == constants.ALIGN_CENTER) {
            style.textAlign = 'center';
        }
        else if (this.align == constants.ALIGN_RIGHT) {
            style.textAlign = 'right';
        }
        else {
            style.textAlign = 'left';
        }
    },

    updateSize: function (node, enableWrap) {
        var w = Math.round(this.bounds.width / this.scale);
        var h = Math.round(this.bounds.height / this.scale);
        var style = node.style;

        // NOTE: Do not use maxWidth here because wrapping will
        // go wrong if the cell is outside of the viewable area
        if (this.clipped) {
            style.overflow = 'hidden';

            if (!mxClient.IS_QUIRKS) {
                style.maxHeight = h + 'px';
                style.maxWidth = w + 'px';
            }
            else {
                style.width = w + 'px';
            }
        }
        else if (this.overflow == 'fill') {
            style.width = w + 'px';
            style.height = h + 'px';
        }
        else if (this.overflow == 'width') {
            style.width = w + 'px';
            style.maxHeight = h + 'px';
        }

        if (this.wrap && w > 0) {
            style.whiteSpace = 'normal';
            style.width = w + 'px';

            if (enableWrap) {
                var sizeDiv = node;

                if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                    sizeDiv = sizeDiv.firstChild;
                }

                var tmp = sizeDiv.offsetWidth + 3;

                if (this.clipped) {
                    tmp = Math.min(tmp, w);
                }

                style.width = tmp + 'px';
            }
        }
        else {
            style.whiteSpace = 'nowrap';
        }
    },


    // 根据对齐方式，返回一个代表对齐方式的 point
    updateMargin: function () {
        this.margin = this.getAlignmentAsPoint(this.align, this.valign);
    },

    getAlignmentAsPoint: function (align, valign) {
        var dx = 0; // left
        var dy = 0; // top

        // Horizontal alignment
        if (align == constants.ALIGN_CENTER) {
            dx = -0.5;
        }
        else if (align == constants.ALIGN_RIGHT) {
            dx = -1;
        }

        // Vertical alignment
        if (valign == constants.ALIGN_MIDDLE) {
            dy = -0.5;
        }
        else if (valign == constants.ALIGN_BOTTOM) {
            dy = -1;
        }

        return new Point(dx, dy);
    },

    getSpacing: function () {
        var dx = 0;
        var dy = 0;

        if (this.align == constants.ALIGN_CENTER) {
            dx = (this.spacingLeft - this.spacingRight) / 2;
        }
        else if (this.align == constants.ALIGN_RIGHT) {
            dx = -this.spacingRight - this.baseSpacingRight;
        }
        else {
            dx = this.spacingLeft + this.baseSpacingLeft;
        }

        if (this.valign == constants.ALIGN_MIDDLE) {
            dy = (this.spacingTop - this.spacingBottom) / 2;
        }
        else if (this.valign == constants.ALIGN_BOTTOM) {
            dy = -this.spacingBottom - this.baseSpacingBottom;
        }
        else {
            dy = this.spacingTop + this.baseSpacingTop;
        }

        return new Point(dx, dy);
    }
});

});