function Ellipse(c, a, b) {
    if (!(this instanceof Ellipse)) {
        return new Ellipse(c, a, b);
    }
    c = point(c);
    this.x = c.x;
    this.y = c.y;
    this.a = a;
    this.b = b;
}

Ellipse.prototype = {
    toString: function () {
        return point(this.x, this.y).toString() + ' ' + this.a + ' ' + this.b;
    },
    bbox: function () {
        return rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
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
    clone: function () {
        return Ellipse(this);
    }
};

export default Ellipse;