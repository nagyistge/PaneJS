import {
    toFixed,
} from '../commom/utils';
import Point from './Point';

var mmin = math.min;
var mmax = math.max;
var round = math.round;

function Rect(x, y, width, height) {
    if (y === undefined) {
        y = x.y;
        width = x.width;
        height = x.height;
        x = x.x;
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype = {

    constructor: Rect,

    origin: function () {
        var that = this;
        return new Point(that.x, that.y);
    },

    center: function () {
        var that = this;
        return new Point(that.x + that.width / 2, that.y + that.height / 2);
    },

    corner: function () {
        var that = this;
        return new Point(that.x + that.width, that.y + that.height);
    },

    topRight: function () {
        var that = this;
        return new Point(that.x + that.width, that.y);
    },

    bottomLeft: function () {
        var that = this;
        return new Point(that.x, that.y + that.height);
    },

    intersect: function (rect) {
        var that = this;
        var origin1 = that.origin();
        var corner1 = that.corner();
        var origin2 = rect.origin();
        var corner2 = rect.corner();

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

    sideNearestToPoint: function (p) {

        // get (left|right|top|bottom) side which is nearest to point

        var that = this;

        var distToLeft = p.x - that.x;
        var distToRight = (that.x + that.width) - p.x;
        var distToTop = p.y - that.y;
        var distToBottom = (that.y + that.height) - p.y;

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

    containsPoint: function (p) {

        var that = this;

        return p.x >= that.x
            && p.x <= that.x + that.width
            && p.y >= that.y
            && p.y <= that.y + that.height;
    },

    // Algorithm ported from java.awt.Rectangle from OpenJDK.
    // @return {bool} true if rectangle `r` is inside me.
    containsRect: function (rect) {

        var nr = Rect(rect).normalize();
        var W = nr.width;
        var H = nr.height;
        var X = nr.x;
        var Y = nr.y;
        var w = this.width;
        var h = this.height;
        if ((w | h | W | H) < 0) {
            // At least one of the dimensions is negative...
            return false;
        }
        // Note: if any dimension is zero, tests below must return false...
        var x = this.x;
        var y = this.y;
        if (X < x || Y < y) {
            return false;
        }
        w += x;
        W += X;
        if (W <= X) {
            // X+W overflowed or W was zero, return false if...
            // either original w or W was zero or
            // x+w did not overflow or
            // the overflowed x+w is smaller than the overflowed X+W
            if (w >= x || W > w) {
                return false;
            }
        } else {
            // X+W did not overflow and W was not zero, return false if...
            // original w was zero or
            // x+w did not overflow and x+w is smaller than X+W
            if (w >= x && W > w) {
                return false;
            }
        }
        h += y;
        H += Y;
        if (H <= Y) {
            if (h >= y || H > h) {
                return false;
            }
        } else {
            if (h >= y && H > h) {
                return false;
            }
        }

        return true;
    },

    pointNearestToPoint: function (p) {

        // get a point on my boundary nearest to `p`

        var that = this;

        if (that.containsPoint(p)) {
            var side = that.sideNearestToPoint(p);
            switch (side) {
                case 'right':
                    return new Point(that.x + that.width, p.y);
                case 'left':
                    return new Point(that.x, p.y);
                case 'bottom':
                    return new Point(p.x, that.y + that.height);
                case 'top':
                    return new Point(p.x, that.y);
            }
        }

        return p.adhereToRect(that);
    },

    // Find point on my boundary where line starting
    // from my center ending in point p intersects me.
    // @param {number} angle If angle is specified, intersection with rotated rectangle is computed.
    intersectionWithLineFromCenterToPoint: function (p, angle) {
        p = point(p);
        var center = point(this.x + this.width / 2, this.y + this.height / 2);
        var result;
        if (angle) {
            p.rotate(center, angle);
        }

        // (clockwise, starting from the top side)
        var sides = [
            line(this.origin(), this.topRight()),
            line(this.topRight(), this.corner()),
            line(this.corner(), this.bottomLeft()),
            line(this.bottomLeft(), this.origin())
        ];
        var connector = line(center, p);

        for (var i = sides.length - 1; i >= 0; --i) {
            var intersection = sides[i].intersection(connector);
            if (intersection !== null) {
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

    // Find my bounding box when I'm rotated with the center of rotation in the center of me.
    // @return r {rectangle} representing a bounding box
    bbox: function (angle) {
        var theta = toRad(angle || 0);
        var st = abs(sin(theta));
        var ct = abs(cos(theta));
        var w = this.width * ct + this.height * st;
        var h = this.width * st + this.height * ct;
        return Rect(this.x + (this.width - w) / 2, this.y + (this.height - h) / 2, w, h);
    },

    snapToGrid: function (gx, gy) {
        var origin = this.origin().snapToGrid(gx, gy);
        var corner = this.corner().snapToGrid(gx, gy);
        this.x = origin.x;
        this.y = origin.y;
        this.width = corner.x - origin.x;
        this.height = corner.y - origin.y;
        return this;
    },

    toString: function () {
        return this.origin().toString() + ' ' + this.corner().toString();
    },

    // @return {boolean} true if rectangles are equal.
    equals: function (r) {
        var mr = g.rect(this).normalize();
        var nr = g.rect(r).normalize();
        return mr.x === nr.x && mr.y === nr.y && mr.width === nr.width && mr.height === nr.height;
    },

    clone: function () {
        return Rect(this);
    }
};

export default Rect;