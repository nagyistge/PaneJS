/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./common/class');
var Point = require('./Point');

var Rectangle = Klass.create({

    Extends: Point,

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

    fromRect: function (rect) {
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    },

    clone: function () {

        var rect = this;
        return rect.fromRect(rect);
    }
});

module.exports = Rectangle;

