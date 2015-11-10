import Base  from './Base';
import Point from './Point';

var Rectangle = Base.extend({

    constructor: function Rectangle(x = 0, y = 0, width = 0, height = 0) {

        var that = this;

        that.x = x;
        that.y = y;
        that.width = width;
        that.height = height;
    },

    setRect(x, y, width, height) {

        var that = this;

        that.x = x;
        that.y = y;
        that.width = width;
        that.height = height;

        return that;
    },

    getCenterX() {
        return this.x + this.width / 2;
    },

    getCenterY() {
        return this.y + this.height / 2;
    },

    getCenter() {
        return new Point(this.getCenterX(), this.getCenterY());
    },

    add(rect) {

        var that = this;

        if (rect) {
            var minX = Math.min(that.x, rect.x);
            var minY = Math.min(that.y, rect.y);
            var maxX = Math.max(that.x + that.width, rect.x + rect.width);
            var maxY = Math.max(that.y + that.height, rect.y + rect.height);

            that.x = minX;
            that.y = minY;
            that.width = maxX - minX;
            that.height = maxY - minY;
        }

        return that;
    },

    grow(amount) {

        var that = this;

        that.x -= amount;
        that.y -= amount;
        that.width += 2 * amount;
        that.height += 2 * amount;

        return that;
    },

    rotate90() {

        var that = this;
        var w = that.width;
        var h = that.height;
        var t = (w - h) / 2;

        that.x += t;
        that.y -= t;
        that.width = h;
        that.height = w;

        return that;
    },

    equals(rect) {

        var that = this;

        return rect instanceof Rectangle &&
            rect.x === that.x &&
            rect.y === that.y &&
            rect.width === that.width &&
            rect.height === that.height;
    },

    clone() {
        var rect = this;
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
});

export default Rectangle;
