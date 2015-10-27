import Point     from '../lib/Point';
import Rectangle from '../lib/Rectangle';

var State = Rectangle.extend({
    constructor: function State(view, cell, style) {

        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.invalid = true; // 默认为无效，需要重绘
        that.shape = null;
        that.text = null;
        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    getPerimeterBounds: function (border, bounds) {

        var that = this;

        border = border || 0;
        bounds = bounds ? bounds : new Rectangle(that.x, that.y, that.width, that.height);

        if (border) {
            bounds.grow(border);
        }

        return bounds;
    },

    updateCachedBounds: function () {

        var that = this;
        var view = that.view;
        var shape = that.shape;
        var ts = view.translate;
        var scale = view.scale;

        // 计算 translate 和 scale 之前的 bound
        that.cellBounds = new Rectangle(that.x / scale - ts.x, that.y / scale - ts.y, that.width / scale, that.height / scale);
        that.paintBounds = Rectangle.fromRectangle(that.cellBounds);

        if (shape && shape.isPaintBoundsInverted()) {
            that.paintBounds.rotate90();
        }
    },

    getCellBounds: function () {
        return this.cellBounds;
    },

    getPaintBounds: function () {
        return this.paintBounds;
    },

    setCursor: function (cursor) {

        var that = this;

        that.shape && that.shape.setCursor(cursor);
        that.text && that.text.setCursor(cursor);

        return that;
    },


    clone: function () {

    }
});
