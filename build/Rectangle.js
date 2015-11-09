define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./common/class');
var Point = require('./Point');
var utils = require('./common/utils');
var constants = require('./constants');

var Rectangle = Klass.create({

    Extends: Point,

    Statics: {
        fromRectangle: function (rect) {
            return new Rectangle(rect.x, rect.y, rect.width, rect.height);
        },

        intersectsHotspot: function (state, x, y, hotspot, min, max) {
            hotspot = (hotspot !== null) ? hotspot : 1;
            min = (min !== null) ? min : 0;
            max = (max !== null) ? max : 0;

            if (hotspot > 0) {
                var cx = state.getCenterX();
                var cy = state.getCenterY();
                var w = state.width;
                var h = state.height;

                var start = utils.getValue(state.style, constants.STYLE_STARTSIZE) * state.view.scale;

                if (start > 0) {
                    if (utils.getValue(state.style, constants.STYLE_HORIZONTAL, true)) {
                        cy = state.y + start / 2;
                        h = start;
                    }
                    else {
                        cx = state.x + start / 2;
                        w = start;
                    }
                }

                w = Math.max(min, w * hotspot);
                h = Math.max(min, h * hotspot);

                if (max > 0) {
                    w = Math.min(w, max);
                    h = Math.min(h, max);
                }

                var rect = new Rectangle(cx - w / 2, cy - h / 2, w, h);
                var alpha = utils.toRadians(utils.getValue(state.style, constants.STYLE_ROTATION) || 0);

                if (alpha !== 0) {
                    var cos = Math.cos(-alpha);
                    var sin = Math.sin(-alpha);
                    var cx1 = new Point(state.getCenterX(), state.getCenterY());
                    var pt = Point.getRotatedPoint(new Point(x, y), cos, sin, cx1);
                    x = pt.x;
                    y = pt.y;
                }

                return utils.contains(rect, x, y);
            }

            return true;
        },

    },

    constructor: function Rectangle(x, y, width, height) {

        var rect = this;

        Rectangle.superclass.constructor.call(rect, x, y);

        rect.width = width ? width : 0;
        rect.height = height ? height : 0;
    },

    setRect: function (x, y, width, height) {

        var rect = this;

        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;

        return rect;
    },

    getCenterX: function () {
        return this.x + this.width / 2;
    },

    getCenterY: function () {
        return this.y + this.height / 2;
    },

    getCenter: function () {
        return new Point(this.getCenterX(), this.getCenterY());
    },

    add: function (rect) {

        if (!rect) {
            return;
        }

        var that = this;
        var minX = Math.min(that.x, rect.x);
        var minY = Math.min(that.y, rect.y);
        var maxX = Math.max(that.x + that.width, rect.x + rect.width);
        var maxY = Math.max(that.y + that.height, rect.y + rect.height);

        that.x = minX;
        that.y = minY;
        that.width = maxX - minX;
        that.height = maxY - minY;

        return that;
    },


    grow: function (amount) {

        var rect = this;

        rect.x -= amount;
        rect.y -= amount;
        rect.width += 2 * amount;
        rect.height += 2 * amount;

        return rect;
    },

    rotate90: function () {

        var rect = this;
        var w = rect.width;
        var h = rect.height;
        var t = (w - h) / 2;

        rect.x += t;
        rect.y -= t;
        rect.width = h;
        rect.height = w;

        return rect;
    },

    equals: function (rect) {

        var that = this;

        return Rectangle.superclass.equals.call(that, rect) &&
            rect instanceof Rectangle &&
            rect.width === that.width &&
            rect.height === that.height;
    },

    clone: function () {
        var rect = this;
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
});

utils.extend(constants, {
    PAGE_FORMAT_A4_PORTRAIT: new Rectangle(0, 0, 826, 1169),
    PAGE_FORMAT_A4_LANDSCAPE: new Rectangle(0, 0, 1169, 826),
    PAGE_FORMAT_LETTER_PORTRAIT: new Rectangle(0, 0, 850, 1100),
    PAGE_FORMAT_LETTER_LANDSCAPE: new Rectangle(0, 0, 1100, 850),
});

module.exports = Rectangle;

});