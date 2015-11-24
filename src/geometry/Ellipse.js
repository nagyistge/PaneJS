import Rect  from './Rect';
import Point from './Point';

function Ellipse(x = 0, y = 0, a = 0, b = 0) {

    var that = this;

    that.x = x;
    that.y = y;
    that.a = a;
    that.b = b;
}

Ellipse.prototype = {

    constructor: Ellipse,

    getCenter: function () {
        return new Point(this.x, this.y);
    },

    getBBox: function () {
        var that = this;
        return new Rect(that.x - that.a, that.y - that.b, 2 * that.a, 2 * that.b);
    },

    // Find point on me where line from my center to
    // point p intersects my boundary.
    // @param {number} angle If angle is specified, intersection with rotated ellipse is computed.
    intersectionWithLineFromCenterToPoint: function (p, angle) {
        p = point(p);
        if (angle) {
            p.rotate(point(this.x, this.y), angle);
        }
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var result;
        if (dx === 0) {
            result = this.bbox().pointNearestToPoint(p);
            if (angle) {
                return result.rotate(point(this.x, this.y), -angle);
            }
            return result;
        }
        var m = dy / dx;
        var mSquared = m * m;
        var aSquared = this.a * this.a;
        var bSquared = this.b * this.b;
        var x = sqrt(1 / ((1 / aSquared) + (mSquared / bSquared)));

        x = dx < 0 ? -x : x;
        var y = m * x;
        result = point(this.x + x, this.y + y);
        if (angle) {
            return result.rotate(point(this.x, this.y), -angle);
        }
        return result;
    },

    equals: function (e) {

        return Ellipse.equals(this, e);
    },

    valueOf: function () {
        var that = this;
        return [that.x, that.y, that.a, that.b];
    },

    toString: function () {
        return this.valueOf().join(', ');
    },

    clone: function () {
        return Ellipse.fromEllipse(this);
    }
};


// statics
// -------

Ellipse.equals = function (e1, e2) {
    return e1 && e1
        && e1 instanceof Ellipse
        && e2 instanceof Ellipse
        && e1.x === e2.x
        && e1.y === e2.y
        && e1.a === e2.a
        && e1.b === e2.b;
};

Ellipse.fromEllipse = function (e) {
    return new Ellipse(e.x, e.y, e.a, e.b);
};


// exports
// -------
export default Ellipse;