import * as utils from '../common/utils';
import      Point from './Point';
import      Line  from './Line';


class Rect {

    constructor(x = 0, y = 0, width = 0, height = 0) {

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
    }


    // statics
    // -------

    static equals(rect1, rect2) {

        let result = this.isRect(rect1) && this.isRect(rect2);
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
        let cx            = (v1.x + v2.x) / 2;
        let cy            = (v1.y + v2.y) / 2;
        let distance      = new Point(v1.x, v1.y).distance(new Point(v2.x, v2.y));
        let verticesAngle = Math.atan(Math.abs((v2.y - v1.y) / (v1.x - v2.x))) * 180 / Math.PI;
        let width         = Math.abs(distance * Math.sin((90 - rotation + verticesAngle) / 180 * Math.PI));
        let height        = Math.abs(distance * Math.cos((90 - rotation + verticesAngle) / 180 * Math.PI));
        let x             = cx - width / 2;
        let y             = cy - height / 2;
        let rect          = new Rect(x, y, width, height);
        rect.cx           = cx;
        rect.cy           = cy;
        rect.rotation     = rotation;
        return rect;
    }

    static isRect(rect) {

        return rect && rect instanceof Rect;
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

        let distToLeft   = point.x - this.x;
        let distToTop    = point.y - this.y;
        let distToRight  = (this.x + this.width) - point.x;
        let distToBottom = (this.y + this.height) - point.y;

        let closest = distToLeft;
        let side    = 'left';

        if (distToRight < closest) {

            closest = distToRight;
            side    = 'right';
        }

        if (distToTop < closest) {

            closest = distToTop;
            side    = 'top';
        }

        if (distToBottom < closest) {

            // closest = distToBottom;
            side = 'bottom';
        }

        return side;
    }

    getNearestPointToPoint(point) {

        // get a point on my boundary nearest to `point`

        if (this.containsPoint(point)) {

            let side = this.getNearestSideToPoint(point);

            if (side === 'right') {

                return new Point(this.x + this.width, point.y);

            } else if (side === 'left') {

                return new Point(this.x, point.y);

            } else if (side === 'bottom') {

                return new Point(point.x, this.y + this.height);

            } else if (side === 'top') {

                return new Point(point.x, this.y);
            }
        }

        return point.adhereToRect(this);
    }

    containsPoint(point) {
        return point.x >= this.x
            && point.x <= this.x + this.width
            && point.y >= this.y
            && point.y <= this.y + this.height;
    }

    containsRect(rect) {

        this.normalize();
        rect.normalize();

        let x2 = rect.x;
        let y2 = rect.y;
        let w2 = rect.width;
        let h2 = rect.height;

        let x1 = this.x;
        let y1 = this.y;
        let w1 = this.width;
        let h1 = this.height;

        return x2 >= x1
            && y2 >= y1
            && (x2 + w2) <= (x1 + w1)
            && (y2 + h2) <= (y1 + h1);
    }

    intersect(rect) {

        let origin1 = this.getOrigin();
        let corner1 = this.getCorner();
        let origin2 = rect.getOrigin();
        let corner2 = rect.getCorner();

        // no intersection found
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

    union(rect) {

        let origin1 = this.getOrigin();
        let corner1 = this.getCorner();
        let origin2 = rect.getOrigin();
        let corner2 = rect.getCorner();

        let originX = Math.min(origin1.x, origin2.x);
        let originY = Math.min(origin1.y, origin2.y);
        let cornerX = Math.max(corner1.x, corner2.x);
        let cornerY = Math.max(corner1.y, corner2.y);

        return rect(originX, originY, cornerX - originX, cornerY - originY);
    }

    intersectionWithLineFromCenterToPoint(point, angle) {

        // Find point on my boundary where line starting from my center ending
        // in point p intersects me. If angle is specified, intersection with
        // rotated rectangle is computed.

        let result;
        let center = this.getCenter();

        if (angle) {
            point.rotate(center, angle);
        }

        // clockwise, starting from the top side
        let sides = [
            new Line(this.getOrigin(), this.getTopRight()),
            new Line(this.getTopRight(), this.getCorner()),
            new Line(this.getCorner(), this.getBottomLeft()),
            new Line(this.getBottomLeft(), this.getOrigin())
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

        this.x += rect.x || 0;
        this.y += rect.y || 0;
        this.width += rect.width || 0;
        this.height += rect.height || 0;

        return this;
    }

    grow(amount) {

        this.x -= amount;
        this.y -= amount;
        this.width += 2 * amount;
        this.height += 2 * amount;

        return this;
    }

    round(precision) {

        this.x      = precision ? utils.toFixed(this.x, precision) : Math.round(this.x);
        this.y      = precision ? utils.toFixed(this.y, precision) : Math.round(this.y);
        this.width  = precision ? utils.toFixed(this.width, precision) : Math.round(this.width);
        this.height = precision ? utils.toFixed(this.height, precision) : Math.round(this.height);

        return this;
    }

    normalize() {

        // Normalize the rectangle.
        // i.e., make it so that it has a non-negative width and height.
        // If width < 0 the function swaps the left and right corners,
        // and it swaps the top and bottom corners if height < 0

        let x = this.x;
        let y = this.y;
        let w = this.width;
        let h = this.height;

        if (w < 0) {
            x = x + w;
            w = -w;
        }

        if (h < 0) {
            y = y + h;
            h = -h;
        }

        this.x      = x;
        this.y      = y;
        this.width  = w;
        this.height = h;

        return this;
    }

    getBBox(angle) {

        let rad = utils.toRad(angle || 0);
        let sin = Math.abs(Math.sin(rad));
        let cos = Math.abs(Math.cos(rad));
        let w   = this.width * cos + this.height * sin;
        let h   = this.width * sin + this.height * cos;

        return new Rect(this.x + (this.width - w) / 2, this.y + (this.height - h) / 2, w, h);
    }

    snapToGrid(gx, gy) {

        let that   = this;
        let origin = that.getOrigin();
        let corner = that.getCorner();

        origin = origin.snapToGrid(gx, gy);
        corner = corner.snapToGrid(gx, gy);

        that.x      = origin.x;
        that.y      = origin.y;
        that.width  = corner.x - origin.x;
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
