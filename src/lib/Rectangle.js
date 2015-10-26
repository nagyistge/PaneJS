import { isNullOrUndefined } from '../common/utils';
import Base from './Base';

var Rectangle = Base.extend({

    constructor: function Rectangle(x, y, width, height) {

        var that = this;

        that.x = !isNullOrUndefined(x) ? x : 0;
        that.y = !isNullOrUndefined(y) ? y : 0;
        that.width = width ? width : 0;
        that.height = height ? height : 0;
    },

    setRect: function (x, y, width, height) {

        var that = this;

        that.x = x;
        that.y = y;
        that.width = width;
        that.height = height;

        return that;
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

    equals: function (rect) {

        var that = this;

        return rect instanceof Rectangle &&
            rect.x === that.x &&
            rect.y === that.y &&
            rect.width === that.width &&
            rect.height === that.height;
    },

    clone: function () {
        var rect = this;
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
});


console.log(new Rectangle(1, 2, 3, 4));

export default Rectangle;
