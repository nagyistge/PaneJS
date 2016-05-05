import  Rect from './Rect';
import Point from './Point';

class Ellipse {

    constructor(x = 0, y = 0, a = 0, b = 0) {

        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
    }


    // statics
    // -------

    static equals(e1, e2) {

        return this.isEllipse(e1)
            && this.isEllipse(e2)
            && e1.x === e2.x
            && e1.y === e2.y
            && e1.a === e2.a
            && e1.b === e2.b;
    }

    static fromEllipse(e) {

        return new Ellipse(e.x, e.y, e.a, e.b);
    }

    static isEllipse(e) {

        return e && e instanceof Ellipse;
    }


    // methods
    // -------

    getCenter() {

        return new Point(this.x, this.y);
    }

    getBBox() {

        return new Rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
    }

    grow(amount) {

        this.a += amount;
        this.b += amount;

        return this;
    }

    intersectionWithLineFromCenterToPoint(point, angle) {

        // Find point on me where line from my center to `point` intersects with
        // my boundary.
        // If angle is specified, intersection with rotated ellipse is computed.

        let result;
        let center = this.getCenter();

        if (angle) {
            point.rotate(center, angle);
        }

        let dx = point.x - this.x;
        let dy = point.y - this.y;
        if (dx === 0) {

            result = this.getBBox().getNearestPointToPoint(point);

            if (angle) {
                return result.rotate(center, -angle);
            }

            return result;
        }

        let m  = dy / dx;
        let mm = m * m;
        let aa = this.a * this.a;
        let bb = this.b * this.b;
        let x  = Math.sqrt(1 / ((1 / aa) + (mm / bb)));

        x = dx < 0 ? -x : x;

        let y = m * x;

        result = new Point(this.x + x, this.y + y);

        if (angle) {
            return result.rotate(center, -angle);
        }

        return result;
    }


    // common
    // ------

    equals(ellipse) {

        return Ellipse.equals(this, ellipse);
    }

    valueOf() {

        return [this.x, this.y, this.a, this.b];
    }

    toString() {

        return this.valueOf().join(', ');
    }

    clone() {

        return Ellipse.fromEllipse(this);
    }
}


// exports
// -------

export default Ellipse;
