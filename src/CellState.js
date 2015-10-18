/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Point = require('./Point');
var Rectangle = require('./Rectangle');

module.exports = Rectangle.extend({
    constructor: function CellState(view, cell, style) {
        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    view: null,
    cell: null,
    style: null,    // cellStyle
    shape: null,
    text: null,
    invalid: true,  // 某个 cell 是否无效，true 表示需要重绘
    origin: null,
    absolutePoints: null,
    absoluteOffset: null,
    visibleSourceState: null,
    visibleTargetState: null,
    terminalDistance: 0,
    //length: 0, // FIXME: length 导致 isArrayLike 判断出错
    segments: null,

    getPerimeterBounds: function (border, bounds) {
        border = border || 0;
        bounds = (bounds) ? bounds : new Rectangle(this.x, this.y, this.width, this.height);

        if (this.shape != null && this.shape.stencil != null) {
            var aspect = this.shape.stencil.computeAspect(this.style, bounds.x, bounds.y, bounds.width, bounds.height);

            bounds.x = aspect.x;
            bounds.y = aspect.y;
            bounds.width = this.shape.stencil.w0 * aspect.width;
            bounds.height = this.shape.stencil.h0 * aspect.height;
        }

        if (border != 0) {
            bounds.grow(border);
        }

        return bounds;
    },

    setAbsoluteTerminalPoint: function (point, isSource) {
        if (this.absolutePoints == null) {
            this.absolutePoints = [];
        }

        if (isSource) {
            this.absolutePoints.length === 0
                ? this.absolutePoints.push(point)
                : this.absolutePoints[0] = point;
        } else {
            if (this.absolutePoints.length === 0) {
                this.absolutePoints.push(null);
                this.absolutePoints.push(point);
            } else if (this.absolutePoints.length == 1) {
                this.absolutePoints.push(point);
            } else {
                this.absolutePoints[this.absolutePoints.length - 1] = point;
            }
        }
    },

    setCursor: function (cursor) {
        if (this.shape !== null) {
            this.shape.setCursor(cursor);
        }

        if (this.text !== null) {
            this.text.setCursor(cursor);
        }
    },

    getVisibleTerminal: function (isSource) {
        var tmp = this.getVisibleTerminalState(isSource);

        return (tmp != null) ? tmp.cell : null;
    },

    getVisibleTerminalState: function (isSource) {
        return isSource ? this.visibleSourceState : this.visibleTargetState;
    },

    setVisibleTerminalState: function (terminalState, isSource) {
        if (isSource) {
            this.visibleSourceState = terminalState;
        } else {
            this.visibleTargetState = terminalState;
        }
    },

    getCellBounds: function () {
        return this.cellBounds;
    },

    getPaintBounds: function () {
        return this.paintBounds;
    },

    updateCachedBounds: function () {
        var tr = this.view.translate;
        var s = this.view.scale;
        // 计算 translate 和 scale 之前的 bound
        this.cellBounds = new Rectangle(this.x / s - tr.x, this.y / s - tr.y, this.width / s, this.height / s);
        this.paintBounds = Rectangle.fromRectangle(this.cellBounds);

        if (this.shape != null && this.shape.isPaintBoundsInverted()) {
            this.paintBounds.rotate90();
        }
    },

    clone: function () {

    },

    destroy: function () {
        this.view.graph.cellRenderer.destroy(this);
    }
});

