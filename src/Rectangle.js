
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('./class');
var Point = require('./point');

var Rect = Klass.create({
    Extends: Point,
    constructor: function Rectangle(x, y, width, height) {
        //
        Rect.superclass.constructor.call(this, x, y);

        this.width = width === null ? 0 : width;
        this.height = height === null ? 0 : height;
    },

    fromRect: function (rect) {
        return new Rect(rect.x, rect.y, rect.width, rect.height);
    },

    setRect: function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

        var minX = Math.min(this.x, rect.x);
        var minY = Math.min(this.y, rect.y);
        var maxX = Math.max(this.x + this.width, rect.x + rect.width);
        var maxY = Math.max(this.y + this.height, rect.y + rect.height);

        this.x = minX;
        this.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
    },

    grow: function (amount) {
        this.x -= amount;
        this.y -= amount;
        this.width += 2 * amount;
        this.height += 2 * amount;
    },

    rotate90: function () {
        var t = (this.width - this.height) / 2;
        this.x += t;
        this.y -= t;
        var tmp = this.width;
        this.width = this.height;
        this.height = tmp;
    },


    equals: function (rect) {
        return Rect.superclass.equals.call(this, rect) &&
            rect instanceof Rect &&
            rect.width == this.width &&
            rect.height == this.height;
    },

    clone: function () {
        return this.fromRect(this);
    }
});

module.exports = Rect;

