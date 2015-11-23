import Rect  from './Rect';
import Point from './Point';

function Ellipse(x, y, a, b) {

    var that = this;

    that.x = x;
    that.y = y;
    that.a = a;
    that.b = b;
}

Ellipse.prototype = {

    center: function () {
        return new Point(this.x, this.y);
    },

    bbox: function () {
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

        var that = this;

        return e instanceof Ellipse
            && e.x === that.x
            && e.y === that.y
            && e.a === that.a
            && e.b === that.b
    },

    valueOf: function () {
        var that = this;
        return [that.x, that.y, that.a, that.b];
    },

    toString: function () {
        return this.valueOf().join(' ');
    },

    clone: function () {
        var that = this;
        return new Ellipse(that.x, that.y, that.a, that.b);
    }
};

export default Ellipse;