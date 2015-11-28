import {
    toRad,
    toFixed,
} from '../common/utils';

import Point from './Point';
import Line from './Line';

var math = Math;
var abs = math.abs;
var cos = math.cos;
var sin = math.sin;
var mmin = math.min;
var mmax = math.max;
var round = math.round;


function Rect(x = 0, y = 0, width = 0, height = 0) {

    var that = this;

    that.x = x;
    that.y = y;
    that.width = width;
    that.height = height;
}

Rect.prototype = {

    constructor: Rect,

    getOrigin: function () {
        return new Point(this.x, this.y);
    },

    getCenter: function () {
        var that = this;
        return new Point(that.x + that.width / 2, that.y + that.height / 2);
    },

    getCorner: function () {
        var that = this;
        return new Point(that.x + that.width, that.y + that.height);
    },

    getTopRight: function () {
        var that = this;
        return new Point(that.x + that.width, that.y);
    },

    getBottomLeft: function () {
        var that = this;
        return new Point(that.x, that.y + that.height);
    },

    getNearestSideToPoint: function (point) {

        // get (left|right|top|bottom) side which is nearest to point

        var that = this;

        var distToLeft = point.x - that.x;
        var distToRight = (that.x + that.width) - point.x;
        var distToTop = point.y - that.y;
        var distToBottom = (that.y + that.height) - point.y;

        var closest = distToLeft;
        var side = 'left';

        if (distToRight < closest) {
            closest = distToRight;
            side = 'right';
        }

        if (distToTop < closest) {
            closest = distToTop;
            side = 'top';
        }

        if (distToBottom < closest) {
            //closest = distToBottom;
            side = 'bottom';
        }

        return side;
    },

    getNearestPointToPoint: function (point) {

        // get a point on my boundary nearest to `point`

        var that = this;

        if (that.containsPoint(point)) {
            var side = that.getNearestSideToPoint(point);
            switch (side) {
                case 'right':
                    return new Point(that.x + that.width, point.y);
                case 'left':
                    return new Point(that.x, point.y);
                case 'bottom':
                    return new Point(point.x, that.y + that.height);
                case 'top':
                    return new Point(point.x, that.y);
            }
        }

        return point.adhereToRect(that);
    },

    containsPoint: function (p) {

        var that = this;

        return p.x >= that.x
            && p.x <= that.x + that.width
            && p.y >= that.y
            && p.y <= that.y + that.height;
    },

    containsRect: function (rect) {

        var that = this;

        that.normalize();
        rect.normalize();

        var x2 = rect.x;
        var y2 = rect.y;
        var w2 = rect.width;
        var h2 = rect.height;

        var x1 = that.x;
        var y1 = that.y;
        var w1 = that.width;
        var h1 = that.height;

        return x2 >= x1
            && y2 >= y1
            && (x2 + w2) <= (x1 + w1)
            && (y2 + h2) <= (y1 + h1);
    },

    intersect: function (rect) {
        var that = this;
        var origin1 = that.getOrigin();
        var corner1 = that.getCorner();
        var origin2 = rect.getOrigin();
        var corner2 = rect.getCorner();

        // No intersection found
        if (origin1.x >= corner2.x ||
            origin1.y >= corner2.y ||
            origin2.x >= corner1.x ||
            origin2.y >= corner1.y) {
            return null;
        }

        var x = mmax(origin1.x, origin2.x);
        var y = mmax(origin1.y, origin2.y);
        var w = mmin(corner1.x, corner2.x) - x;
        var h = mmin(corner1.y, corner2.y) - y;

        return new Rect(x, y, w, h);
    },

    intersectionWithLineFromCenterToPoint: function (p, angle) {

        // Find point on my boundary where line starting from my center
        // ending in point p intersects me. If angle is specified, intersection
        // with rotated rectangle is computed.

        var that = this;
        var result;
        var center = that.getCenter();

        if (angle) {
            p.rotate(center, angle);
        }

        // (clockwise, starting from the top side)
        var sides = [
            new Line(that.getOrigin(), that.getTopRight()),
            new Line(that.getTopRight(), that.getCorner()),
            new Line(that.getCorner(), that.getBottomLeft()),
            new Line(that.getBottomLeft(), that.getOrigin())
        ];

        var connector = new Line(center, p);

        for (var i = sides.length - 1; i >= 0; --i) {
            var intersection = sides[i].intersection(connector);
            if (intersection) {
                result = intersection;
                break;
            }
        }

        if (result && angle) {
            result.rotate(center, -angle);
        }

        return result;
    },

    moveAndExpand: function (rect) {

        var that = this;

        that.x += rect.x || 0;
        that.y += rect.y || 0;
        that.width += rect.width || 0;
        that.height += rect.height || 0;

        return that;
    },

    round: function (precision) {

        var that = this;

        var x = that.x;
        var y = that.y;
        var w = that.width;
        var h = that.height;

        that.x = precision ? toFixed(x, precision) : round(x);
        that.y = precision ? toFixed(y, precision) : round(y);
        that.width = precision ? toFixed(w, precision) : round(w);
        that.height = precision ? toFixed(h, precision) : round(h);

        return that;
    },

    normalize: function () {

        // Normalize the rectangle.
        // i.e., make it so that it has a non-negative width and height.
        // If width < 0 the function swaps the left and right corners,
        // and it swaps the top and bottom corners if height < 0

        var that = this;

        var x = that.x;
        var y = that.y;
        var w = that.width;
        var h = that.height;

        if (w < 0) {
            x = x + w;
            w = -w;
        }

        if (h < 0) {
            y = y + h;
            h = -h;
        }

        that.x = x;
        that.y = y;
        that.width = w;
        that.height = h;

        return that;
    },

    getBBox: function (angle) {

        var that = this;
        //var x = that.x;
        //var y = that.y;
        //var w = that.width;
        //var h = that.height;

        var theta = toRad(angle || 0);
        var st = abs(sin(theta));
        var ct = abs(cos(theta));
        var w = that.width * ct + that.height * st;
        var h = that.width * st + that.height * ct;
        return new Rect(that.x + (that.width - w) / 2, that.y + (that.height - h) / 2, w, h);
    },

    snapToGrid: function (gx, gy) {

        var that = this;
        var origin = that.getOrigin();
        var corner = that.getCorner();

        origin = origin.snapToGrid(gx, gy);
        corner = corner.snapToGrid(gx, gy);

        that.x = origin.x;
        that.y = origin.y;
        that.width = corner.x - origin.x;
        that.height = corner.y - origin.y;

        return that;
    },

    equals: function (rect) {
        return Rect.equals(this, rect);
    },

    valueOf: function () {
        var that = this;
        return [that.x, that.y, that.width, that.height];
    },

    toString: function () {
        return this.valueOf().join(', ');
    },

    clone: function () {
        return Rect.fromRect(this);
    }
};


// statics
// -------

Rect.equals = function (rect1, rect2) {
    var result = rect1 && rect2 && rect1 instanceof Rect && rect2 instanceof Rect;
    if (result) {
        rect1.normalize();
        rect2.normalize();
        result = rect1.x === rect2.x
            && rect1.y === rect2.y
            && rect1.width === rect2.width
            && rect1.height === rect2.height;
    }

    return result;
};

Rect.fromRect = function (rect) {
    return new Rect(rect.x, rect.y, rect.width, rect.height);
};


// exports
// -------
export default Rect;