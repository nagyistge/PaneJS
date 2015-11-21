import {
    toFloat,
    toFixed,
    isString,
    isObject,
    isUndefined,
} from '../commom/utils';

var math = Math;
var PI = math.PI;
var abs = math.abs;
var cos = math.cos;
var sin = math.sin;
var mmin = math.min;
var mmax = math.max;
var sqrt = math.sqrt;
var atan2 = math.atan2;
var round = math.round;
var floor = math.floor;
var random = math.random;


function Point(x, y) {

    // Point is the most basic object consisting of x/y coordinate,.

    // Possible instantiations are:
    //   `Point(10, 20)`
    //   `new Point(10, 20)`
    //   `Point('10 20')`
    //   `Point(Point(10, 20))`

    var that = this;

    if (!(that instanceof Point)) {
        return new Point(x, y);
    }

    var xy;

    if (isUndefined(y) && isString(x)) {
        xy = x.split(x.indexOf('@') === -1 ? ' ' : '@');
        that.x = toFloat(xy[0]);
        that.y = toFloat(xy[1]);
    } else if (isObject(x)) {
        that.x = x.x;
        that.y = x.y;
    } else {
        that.x = x;
        that.y = y;
    }
}

Point.prototype = {

    constructor: Point,

    update: function (x, y) {

        var that = this;

        that.x = x || 0;
        that.y = y || 0;

        return that;
    },

    offset: function (dx, dy) {

        // Offset me by the specified amount.

        var that = this;

        that.x += dx || 0;
        that.y += dy || 0;

        return that;
    },

    round: function (precision) {

        var that = this;

        that.x = precision ? toFixed(that.x, precision) : round(that.x);
        that.y = precision ? toFixed(that.y, precision) : round(that.y);

        return that;
    },

    difference: function (p) {
        return new Point(this.x - p.x, this.y - p.y);
    },

    adhereToRect: function (rect) {

        // If point lies outside rectangle `rect`, return the nearest point on
        // the boundary of rect `rect`, otherwise return point itself.
        // (see Squeak Smalltalk, Point>>adhereTo:)

        var that = this;
        if (rect.containsPoint(that)) {
            return that;
        }

        that.x = mmin(mmax(that.x, rect.x), rect.x + rect.width);
        that.y = mmin(mmax(that.y, rect.y), rect.y + rect.height);

        return that;
    },

    theta: function (p) {

        // Compute the angle between me and `p` and the x axis.
        // (cartesian-to-polar coordinates conversion)
        // Return theta angle in degrees.

        p = new Point(p);
        // Invert the y-axis.
        var y = -(p.y - this.y);
        var x = p.x - this.x;
        // Makes sure that the comparison with zero takes rounding errors into account.
        var PRECISION = 10;
        // Note that `atan2` is not defined for `x`, `y` both equal zero.
        var rad = (toFixed(y, PRECISION) === 0 && toFixed(x, PRECISION) === 0) ? 0 : atan2(y, x);

        // Correction for III. and IV. quadrant.
        if (rad < 0) {
            rad = 2 * PI + rad;
        }

        return 180 * rad / PI;
    },

    distance: function (p) {

        // Returns distance between me and point `p`.

        var dx = p.x - this.x;
        var dy = p.y - this.y;
        return sqrt(dx * dx + dy * dy);
    },

    manhattanDistance: function (p) {

        // Returns a manhattan (taxi-cab) distance between me and point `p`.

        return abs(p.x - this.x) + abs(p.y - this.y);
    },

    magnitude: function () {
        return sqrt((this.x * this.x) + (this.y * this.y)) || 0.0001;
    },

    normalize: function (len) {

        // Scale the line segment between (0,0) and me to have a length of len.

        // 可以通过 x 和 y 的比例来求?

        var that = this;
        var s = (len || 1) / that.magnitude();

        that.x = s * that.x;
        that.y = s * that.y;

        return that;
    },


    // Return the bearing between me and point `p`.
    bearing: function (p) {
        return line(this, p).bearing();
    },


    toPolar: function (o) {

        // Converts rectangular to polar coordinates.
        // An origin can be specified, otherwise it's `0 0`.


        o = o && new Point(o) || new Point(0, 0);

        var that = this;
        var x = that.x;
        var y = that.y;

        that.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y)); // r
        that.y = toRad(o.theta(point(x, y)));

        return that;
    },

    rotate: function (o, angle) {

        // Rotate point by angle around origin o.

        angle = (angle + 360) % 360;

        var that = this;

        that.toPolar(o);
        that.y += toRad(angle);

        var p = Point.fromPolar(that.x, that.y, o);

        that.x = p.x;
        that.y = p.y;
        return that;
    },


    move: function (ref, distance) {

        // Move point on line starting from ref
        // ending at me by distance distance.

        var theta = toRad(point(ref).theta(this));
        return this.offset(cos(theta) * distance, -sin(theta) * distance);
    },

    // Returns change in angle from my previous position (-dx, -dy) to my new position
    // relative to ref point.
    changeInAngle: function (dx, dy, ref) {
        // Revert the translation and measure the change in angle around x-axis.
        return point(this).offset(-dx, -dy).theta(ref) - this.theta(ref);
    },


    snapToGrid: function (gx, gy) {
        this.x = snapToGrid(this.x, gx);
        this.y = snapToGrid(this.y, gy || gx);
        return this;
    },

    // Returns a point that is the reflection of me with
    // the center of inversion in ref point.
    reflection: function (ref) {
        return point(ref).move(this, this.distance(ref));
    },

    valueOf: function () {
        return [this.x, this.y];
    },

    toString: function () {
        return this.valueOf().join('@');
    },

    equals: function (p) {
        return this.x === p.x && this.y === p.y;
    },

    clone: function () {
        return new Point(this);
    }
};


Point.fromPolar = function (r, angle, o) {

    // Alternative constructor, from polar coordinates.
    // @param {number} r Distance.
    // @param {number} angle Angle in radians.
    // @param {point} [optional] o Origin.

    o = (o && point(o)) || point(0, 0);
    var x = abs(r * cos(angle));
    var y = abs(r * sin(angle));
    var deg = normalizeAngle(toDeg(angle));

    if (deg < 90) {
        y = -y;
    } else if (deg < 180) {
        x = -x;
        y = -y;
    } else if (deg < 270) {
        x = -x;
    }

    return point(o.x + x, o.y + y);
};

Point.random = function (x1, x2, y1, y2) {
    // Create a point with random coordinates that fall
    // into the range `[x1, x2]` and `[y1, y2]`.
    return new Point(floor(random() * (x2 - x1 + 1) + x1), floor(random() * (y2 - y1 + 1) + y1));
};


export default Point;