'use strict';

var Class = require('./common/class');
var utils = require('./common/utils');
var constants = require('./constants');
var perimeter = require('./perimeter');


module.exports = Class.create({


    constructor: function Stylesheet() {
        this.styles = {};

        this.putDefaultVertexStyle(this.createDefaultVertexStyle());
        this.putDefaultEdgeStyle(this.createDefaultEdgeStyle());
    },

    createDefaultVertexStyle: function () {
        var style = {};

        style[constants.STYLE_SHAPE] = constants.SHAPE_RECTANGLE;
        style[constants.STYLE_PERIMETER] = perimeter.RectanglePerimeter;
        style[constants.STYLE_VERTICAL_ALIGN] = constants.ALIGN_MIDDLE;
        style[constants.STYLE_ALIGN] = constants.ALIGN_CENTER;
        style[constants.STYLE_FILLCOLOR] = '#C3D9FF';
        style[constants.STYLE_STROKECOLOR] = '#6482B9';
        style[constants.STYLE_FONTCOLOR] = '#774400';

        return style;
    },

    createDefaultEdgeStyle: function () {
        var style = {};

        style[constants.STYLE_SHAPE] = constants.SHAPE_CONNECTOR;
        style[constants.STYLE_ENDARROW] = constants.ARROW_CLASSIC;
        style[constants.STYLE_VERTICAL_ALIGN] = constants.ALIGN_MIDDLE;
        style[constants.STYLE_ALIGN] = constants.ALIGN_CENTER;
        style[constants.STYLE_STROKECOLOR] = '#6482B9';
        style[constants.STYLE_FONTCOLOR] = '#446299';

        return style;
    },

    putDefaultVertexStyle: function (style) {
        this.putCellStyle('defaultVertex', style);
    },

    putDefaultEdgeStyle: function (style) {
        this.putCellStyle('defaultEdge', style);
    },

    getDefaultVertexStyle: function () {
        return this.styles['defaultVertex'];
    },

    getDefaultEdgeStyle: function () {
        return this.styles['defaultEdge'];
    },

    putCellStyle: function (name, style) {
        this.styles[name] = style;
    },

    getCellStyle: function (name, defaultStyle) {
        var style = defaultStyle;

        if (name != null && name.length > 0) {
            var pairs = name.split(';');

            if (style && name.charAt(0) != ';') {
                style = mxUtils.clone(style);
            }
            else {
                style = {};
            }

            // Parses each key, value pair into the existing style
            for (var i = 0; i < pairs.length; i++) {
                var tmp = pairs[i];
                var pos = tmp.indexOf('=');

                if (pos >= 0) {
                    var key = tmp.substring(0, pos);
                    var value = tmp.substring(pos + 1);

                    if (value == constants.NONE) {
                        delete style[key];
                    }
                    else if (utils.isNumeric(value)) {
                        style[key] = parseFloat(value);
                    }
                    else {
                        style[key] = value;
                    }
                }
                else {
                    // Merges the entries from a named style
                    var tmpStyle = this.styles[tmp];

                    if (tmpStyle != null) {
                        for (var key in tmpStyle) {
                            style[key] = tmpStyle[key];
                        }
                    }
                }
            }
        }

        return style;
    }
});
