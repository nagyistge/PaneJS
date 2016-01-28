import * as utils from '../common/utils';
import Point from './Point';
import Line  from './Line';


class Rect {

    constructor(x = 0, y = 0, width = 0, height = 0) {

        let that = this;

        that.x = x;
        that.y = y;
        that.width = width;
        that.height = height;
    }


    // static methods
    // --------------

    static equals(rect1, rect2) {

        let result = rect1 && rect2 && rect1 instanceof Rect && rect2 instanceof Rect;

        if (result) {

            rect1.normalize();
            rect2.normalize();

            result = rect1.x === rect2.x
                && rect1.y === rect2.y
                && rect1.width === rect2.width
                && rect1.height === rect2.height;
        }

        return result;
    }

    static fromRect(rect) {

        return new Rect(rect.x, rect.y, rect.width, rect.height);
    }

    static fromVerticesAndRotation(v1, v2, rotation = 0) {
        let cx = (v1.x + v2.x) / 2;
        let cy = (v1.y + v2.y) / 2;
        let distance = new Point(v1.x, v1.y).distance(new Point(v2.x, v2.y));
        let verticesAngle = Math.atan(Math.abs((v2.y - v1.y) / (v1.x - v2.x))) * 180 / Math.PI;
        let width = Math.abs(distance * Math.sin((90 - rotation + verticesAngle) / 180 * Math.PI));
        let height = Math.abs(distance * Math.cos((90 - rotation + verticesAngle) / 180 * Math.PI));
        let x = cx - width / 2;
        let y = cy - height / 2;
        let rect = new Rect(x, y, width, height);
        rect.cx = cx;
        rect.cy = cy;
        rect.rotation = rotation;
        return rect;
    }


    // methods
    // -------

    getOrigin() {

        return new Point(this.x, this.y);
    }

    getCenter() {

        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    getCorner() {

        return new Point(this.x + this.width, this.y + this.height);
    }

    getTopRight() {

        return new Point(this.x + this.width, this.y);
    }

    getBottomLeft() {

        return new Point(this.x, this.y + this.height);
    }

    getNearestSideToPoint(point) {

        // get (left|right|top|bottom) side which is nearest to point

        let that = this;

        let distToLeft = point.x - that.x;
        let distToTop = point.y - that.y;
        let distToRight = (that.x + that.width) - point.x;
        let distToBottom = (that.y + that.height) - point.y;

        let closest = distToLeft;
        let side = 'left';

        if (distToRight < closest) {

            closest = distToRight;
            side = 'right';
        }

        if (distToTop < closest) {

            closest = distToTop;
            side = 'top';
        }

        if (distToBottom < closest) {

            // closest = distToBottom;
            side = 'bottom';
        }

        return side;
    }

    getNearestPointToPoint(point) {

        // get a point on my boundary nearest to `point`

        let that = this;

        if (that.containsPoint(point)) {

            let side = that.getNearestSideToPoint(point);

            if (side === 'right') {

                return new Point(that.x + that.width, point.y);

            } else if (side === 'left') {

                return new Point(that.x, point.y);

            } else if (side === 'bottom') {

                return new Point(point.x, that.y + that.height);

            } else if (side === 'top') {

                return new Point(point.x, that.y);
            }
        }

        return point.adhereToRect(that);
    }

    containsPoint(point) {

        let that = this;

        return point.x >= that.x
            && point.x <= that.x + that.width
            && point.y >= that.y
            && point.y <= that.y + that.height;
    }

    containsRect(rect) {

        let that = this;

        that.normalize();
        rect.normalize();

        let x2 = rect.x;
        let y2 = rect.y;
        let w2 = rect.width;
        let h2 = rect.height;

        let x1 = that.x;
        let y1 = that.y;
        let w1 = that.width;
        let h1 = that.height;

        return x2 >= x1
            && y2 >= y1
            && (x2 + w2) <= (x1 + w1)
            && (y2 + h2) <= (y1 + h1);
    }

    intersect(rect) {

        let that = this;
        let origin1 = that.getOrigin();
        let corner1 = that.getCorner();
        let origin2 = rect.getOrigin();
        let corner2 = rect.getCorner();

        // No intersection found
        if (origin1.x >= corner2.x ||
            origin1.y >= corner2.y ||
            origin2.x >= corner1.x ||
            origin2.y >= corner1.y) {
            return null;
        }

        let x = Math.max(origin1.x, origin2.x);
        let y = Math.max(origin1.y, origin2.y);
        let w = Math.min(corner1.x, corner2.x) - x;
        let h = Math.min(corner1.y, corner2.y) - y;

        return new Rect(x, y, w, h);
    }

    intersectionWithLineFromCenterToPoint(point, angle) {

        // Find point on my boundary where line starting from my center ending
        // in point p intersects me. If angle is specified, intersection with
        // rotated rectangle is computed.

        let that = this;
        let result;
        let center = that.getCenter();

        if (angle) {
            point.rotate(center, angle);
        }

        // clockwise, starting from the top side
        let sides = [
            new Line(that.getOrigin(), that.getTopRight()),
            new Line(that.getTopRight(), that.getCorner()),
            new Line(that.getCorner(), that.getBottomLeft()),
            new Line(that.getBottomLeft(), that.getOrigin())
        ];

        let connector = new Line(center, point);

        for (let i = sides.length - 1; i >= 0; --i) {
            let intersection = sides[i].intersection(connector);
            if (intersection) {
                result = intersection;
                break;
            }
        }

        if (result && angle) {
            result.rotate(center, -angle);
        }

        return result;
    }

    moveAndExpand(rect) {

        let that = this;

        that.x += rect.x || 0;
        that.y += rect.y || 0;
        that.width += rect.width || 0;
        that.height += rect.height || 0;

        return that;
    }

    grow(amount) {

        let that = this;

        that.x -= amount;
        that.y -= amount;
        that.width += 2 * amount;
        that.height += 2 * amount;

        return that;
    }

    round(precision) {

        let that = this;

        let x = that.x;
        let y = that.y;
        let w = that.width;
        let h = that.height;

        that.x = precision ? utils.toFixed(x, precision) : Math.round(x);
        that.y = precision ? utils.toFixed(y, precision) : Math.round(y);
        that.width = precision ? utils.toFixed(w, precision) : Math.round(w);
        that.height = precision ? utils.toFixed(h, precision) : Math.round(h);

        return that;
    }

    normalize() {

        // Normalize the rectangle.
        // i.e., make it so that it has a non-negative width and height.
        // If width < 0 the function swaps the left and right corners,
        // and it swaps the top and bottom corners if height < 0

        let that = this;

        let x = that.x;
        let y = that.y;
        let w = that.width;
        let h = that.height;

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
    }

    getBBox(angle) {

        let that = this;

        let theta = utils.toRad(angle || 0);
        let st = Math.abs(Math.sin(theta));
        let ct = Math.abs(Math.cos(theta));
        let w = that.width * ct + that.height * st;
        let h = that.width * st + that.height * ct;

        return new Rect(that.x + (that.width - w) / 2, that.y + (that.height - h) / 2, w, h);
    }

    snapToGrid(gx, gy) {

        let that = this;
        let origin = that.getOrigin();
        let corner = that.getCorner();

        origin = origin.snapToGrid(gx, gy);
        corner = corner.snapToGrid(gx, gy);

        that.x = origin.x;
        that.y = origin.y;
        that.width = corner.x - origin.x;
        that.height = corner.y - origin.y;

        return that;
    }


    // common
    // ------

    equals(rect) {

        return Rect.equals(this, rect);
    }

    valueOf() {

        return [this.x, this.y, this.width, this.height];
    }

    toString() {

        return this.valueOf().join(', ');
    }

    clone() {

        return Rect.fromRect(this);
    }
}


// exports
// -------

export default Rect;
