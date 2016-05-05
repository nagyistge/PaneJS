import * as utils from '../common/utils';

class Point {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }


    // statics
    // -------

    static equals(p1, p2) {

        return this.isPoint(p1)
            && this.isPoint(p2)
            && p1.x === p2.x
            && p1.y === p2.y;
    }

    static isPoint(p) {
        return p && p instanceof Point;
    }

    static isPointLike(p) {

        if (this.isPoint(p)) {
            return true;
        } else if (p) {
            return utils.hasOwn(p, 'x') && utils.hasOwn(p, 'y');
        }

        return false;
    }

    static fromPoint(p) {

        return new Point(p.x, p.y);
    }

    static fromPolar(r, angle, origin) {

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

    static random(x1, x2, y1, y2) {

        // Create a point with random coordinates that fall
        // into the range `[x1, x2]` and `[y1, y2]`.

        let x = Math.floor(Math.random() * (x2 - x1 + 1) + x1);
        let y = Math.floor(Math.random() * (y2 - y1 + 1) + y1);

        return new Point(x, y);
    }


    // methods
    // -------

    update(x = 0, y = 0) {

        this.x = x;
        this.y = y;

        return this;
    }

    translate(dx = 0, dy = 0) {

        this.x += dx;
        this.y += dy;

        return this;
    }

    rotate(origin, angle) {

        // Rotate point by angle around origin `origin`.

        angle = (angle + 360) % 360;

        this.toPolar(origin);
        this.y += utils.toRad(angle);

        let p = Point.fromPolar(this.x, this.y, origin);

        this.x = p.x;
        this.y = p.y;

        return this;
    }

    scale(sx, sy, origin) {

        origin = origin || new Point(0, 0);

        this.x = origin.x + sx * (this.x - origin.x);
        this.y = origin.y + sy * (this.y - origin.y);

        return this;
    }

    move(ref, distance) {

        // Move point on the line from `ref` to me by `distance`.

        let rad = utils.toRad(ref.theta(this));

        return this.translate(Math.cos(rad) * distance, -Math.sin(rad) * distance);
    }

    reflect(ref) {

        // Returns a point that is the reflection of me with
        // the center of inversion in ref point.

        return ref.move(this, this.distance(ref));
    }

    diff(point) {

        return new Point(this.x - point.x, this.y - point.y);
    }

    round(precision) {

        this.x = precision ? utils.toFixed(this.x, precision) : Math.round(this.x);
        this.y = precision ? utils.toFixed(this.y, precision) : Math.round(this.y);

        return this;
    }

    smooth() {

        return this.round(2);
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

        origin = origin || new Point(0, 0);

        let dx = this.x - origin.x;
        let dy = this.y - origin.y;

        this.y = utils.toRad(origin.theta(Point.fromPoint(this)));
        this.x = Math.sqrt(dx * dx + dy * dy);

        return this;
    }

    normalize(len = 1) {

        // Scale the line segment between (0,0)
        // and me to have a length of len.

        let x = this.x;
        let y = this.y;

        if (x === 0 && y === 0) {
            return this;
        }

        let scale;

        if (x === 0) {
            scale = len / y;
        } else if (y === 0) {
            scale = len / x;
        } else {
            scale = len / this.distance(new Point());
        }

        this.x = scale * x;
        this.y = scale * y;

        return this;
    }

    changeInAngle(dx, dy, ref) {

        // Returns change in angle from my previous position (-dx, -dy) to
        // my new position relative to ref point.

        // Revert the translation and measure the change in angle around x-axis.
        return Point.fromPoint(this).translate(-dx, -dy).theta(ref) - this.theta(ref);
    }

    snapToGrid(gx, gy) {

        this.x = utils.snapToGrid(this.x, gx);
        this.y = utils.snapToGrid(this.y, gy || gx);

        return this;
    }

    adhereToRect(rect) {

        // If point lies outside rectangle `rect`, return the nearest point on
        // the boundary of rect `rect`, otherwise return point itself.

        if (rect.containsPoint(this)) {
            return this;
        }

        this.x = Math.min(Math.max(this.x, rect.x), rect.x + rect.width);
        this.y = Math.min(Math.max(this.y, rect.y), rect.y + rect.height);

        return this;
    }

    magnitude() {

        return Math.sqrt((this.x * this.x) + (this.y * this.y)) || 0.01;
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
