import * as utils from '../common/utils';


class Point {

    constructor(x = 0, y = 0) {

        let that = this;

        that.x = x;
        that.y = y;
    }


    // static methods
    // --------------

    static equals(point1, point2) {

        return point1 && point2
            && point1 instanceof Point
            && point2 instanceof Point
            && point1.x === point2.x
            && point1.y === point2.y;
    }

    static random(x1, x2, y1, y2) {

        // Create a point with random coordinates that fall
        // into the range `[x1, x2]` and `[y1, y2]`.

        let x = Math.floor(Math.random() * (x2 - x1 + 1) + x1);
        let y = Math.floor(Math.random() * (y2 - y1 + 1) + y1);

        return new Point(x, y);
    }

    static fromPoint(point) {

        return new Point(point.x, point.y);
    }

    static fromPolar(r, angle, origin) {

        // @param {number} r Distance.
        // @param {number} angle Angle in radians.
        // @param {point} [optional] o Origin.

        origin = origin || new Point(0, 0);

        let x = Math.abs(r * Math.cos(angle));
        let y = Math.abs(r * Math.sin(angle));

        let deg = utils.normalizeAngle(utils.toDeg(angle));

        if (deg < 90) {
            y = -y;
        } else if (deg < 180) {
            x = -x;
            y = -y;
        } else if (deg < 270) {
            x = -x;
        }

        return new Point(origin.x + x, origin.y + y);
    }

    static fromString(str) {

        let arr = str.split(str.indexOf('@') === -1 ? ' ' : '@');

        return new Point(utils.toFloat(arr[0]), utils.toFloat(arr[1]));
    }


    // methods
    // -------

    update(x = 0, y = 0) {

        let that = this;

        that.x = x;
        that.y = y;

        return that;
    }

    rotate(origin, angle) {

        // Rotate point by angle around origin `origin`.

        angle = (angle + 360) % 360;

        let that = this;

        that.toPolar(origin);
        that.y += utils.toRad(angle);

        return Point.fromPolar(that.x, that.y, origin);
    }

    translate(dx = 0, dy = 0) {

        let that = this;

        that.x += dx;
        that.y += dy;

        return that;
    }

    move(ref, distance) {

        // Move point on the line from `ref` to me by `distance`.

        let that = this;
        let rad  = utils.toRad(ref.theta(that));

        return that.translate(Math.cos(rad) * distance, -Math.sin(rad) * distance);
    }

    reflect(ref) {

        // Returns a point that is the reflection of me with
        // the center of inversion in ref point.

        return ref.move(this, this.distance(ref));
    }

    round(precision) {

        let that = this;

        that.x = precision ? utils.toFixed(that.x, precision) : Math.round(that.x);
        that.y = precision ? utils.toFixed(that.y, precision) : Math.round(that.y);

        return that;
    }

    diff(point) {

        return new Point(this.x - point.x, this.y - point.y);
    }

    theta(point) {

        // Compute the angle between me and `point` and the x axis.
        // (cartesian-to-polar coordinates conversion)
        // Return theta angle in degrees.

        point = point || new Point();

        // invert the y-axis.
        let y = -(point.y - this.y);
        let x = point.x - this.x;

        let PRECISION = 10;
        // Note that `atan2` is not defined for `x`, `y` both equal zero.
        let rad = utils.toFixed(x, PRECISION) === 0 && utils.toFixed(y, PRECISION) === 0
            ? 0
            : Math.atan2(y, x);

        // Correction for III. and IV. quadrant.
        if (rad < 0) {
            rad = 2 * Math.PI + rad;
        }

        return utils.toDeg(rad);
    }

    distance(point) {

        // Returns distance between me and point `point`.

        point = point || new Point();

        let dx = point.x - this.x;
        let dy = point.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    manhattanDistance(point) {

        // Returns a manhattan (taxi-cab) distance between me and point `p`.

        point = point || new Point();

        return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
    }

    toPolar(origin) {

        // Converts rectangular to polar coordinates.
        // An origin can be specified, otherwise it's `0 0`.

        origin = origin || new Point();

        let that = this;

        let x = that.x;
        let y = that.y;

        that.x = Math.sqrt((x - origin.x) * (x - origin.x) + (y - origin.y) * (y - origin.y));
        that.y = utils.toRad(origin.theta(that));

        return that;
    }

    normalize(len = 1) {

        // Scale the line segment between (0,0) and me to have a length of len.

        let that = this;

        let x = that.x;
        let y = that.y;

        if (x === 0 && y === 0) {
            return that;
        }

        let scale;

        if (x === 0) {
            scale = len / y;
        } else if (y === 0) {
            scale = len / x;
        } else {
            scale = len / that.distance(new Point());
        }

        that.x = scale * x;
        that.y = scale * y;

        return that;
    }

    changeInAngle(dx, dy, ref) {

        // Returns change in angle from my previous position (-dx, -dy) to
        // my new position relative to ref point.

        // Revert the translation and measure the change in angle around x-axis.
        return this.translate(-dx, -dy).theta(ref) - this.theta(ref);
    }

    snapToGrid(gx, gy) {

        let that = this;

        that.x = utils.snapToGrid(that.x, gx);
        that.y = utils.snapToGrid(that.y, gy || gx);

        return that;
    }

    adhereToRect(rect) {

        // If point lies outside rectangle `rect`, return the nearest point on
        // the boundary of rect `rect`, otherwise return point itself.

        let that = this;

        if (rect.containsPoint(that)) {
            return that;
        }

        that.x = Math.min(Math.max(that.x, rect.x), rect.x + rect.width);
        that.y = Math.min(Math.max(that.y, rect.y), rect.y + rect.height);

        return that;
    }


    // common
    // ------

    valueOf() {
        return [this.x, this.y];
    }

    toString() {
        return this.valueOf().join(', ');
    }

    equals(p) {
        return Point.equals(this, p);
    }

    clone() {
        return Point.fromPoint(this);
    }
}


// exports
// -------

export default Point;
