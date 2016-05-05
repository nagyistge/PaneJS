import * as utils from '../common/utils';
import      Point from './Point';


class Line {

    constructor(start, end) {

        if (!start) {
            throw new Error('The start point of line must be specified');
        }

        if (!end) {
            throw new Error('The end point of line must be specified');
        }

        this.start = start;
        this.end   = end;
    }


    // statics
    // -------

    static equals(line1, line2) {

        return this.isLine(line1)
            && this.isLine(line2)
            && ((line1.start && line1.start.equals(line2.start)) || (!line1.start && !line2.start))
            && ((line1.end && line1.end.equals(line2.end)) || (!line1.end && !line2.end));
    }

    static fromLine(line) {

        return new Line(line.start.clone(), line.end.clone());
    }

    static isLine(line) {

        return line && line instanceof Line;
    }


    // methods
    // -------

    getLength() {

        return Math.sqrt(this.getSquaredLength());
    }

    getSquaredLength() {

        // Return the line's length without sqrt.
        // Note that for applications where the exact length
        // is not necessary (e.g. compare only)

        let dx = this.end.x - this.start.x;
        let dy = this.end.y - this.end.x;

        return dx * dx + dy * dy;
    }

    getMidpoint() {

        let x = (this.start.x + this.end.x) / 2;
        let y = (this.start.y + this.end.y) / 2;

        return new Point(x, y);
    }

    getPointAt(percent) {

        // get point at `percent` (0~1).

        let x = (1 - percent) * this.start.x + percent * this.end.x;
        let y = (1 - percent) * this.start.y + percent * this.end.y;

        return new Point(x, y);
    }

    intersection(line) {

        let start1 = this.start;
        let end1   = this.end;

        let start2 = line.start;
        let end2   = line.end;

        let point1 = new Point(end1.x - start1.x, end1.y - start1.y);
        let point2 = new Point(end2.x - start2.x, end2.y - start2.y);

        let det     = point1.x * point2.y - point1.y * point2.x;
        let deltaPt = new Point(start2.x - start1.x, start2.y - start1.y);
        let alpha   = deltaPt.x * point2.y - deltaPt.y * point2.x;
        let beta    = deltaPt.x * point1.y - deltaPt.y * point1.x;

        // no intersection found
        if (det === 0 || alpha * det < 0 || beta * det < 0) {
            return null;
        }

        if (det > 0) {
            if (alpha > det || beta > det) {
                return null;
            }
        } else {
            if (alpha < det || beta < det) {
                return null;
            }
        }

        return new Point(start1.x + (alpha * point1.x / det), start1.y + (alpha * point1.y / det));
    }

    getDirection() {

        // get cardinal direction of the line.
        // One of the following bearings : NE, E, SE, S, SW, W, NW, N.

        let start = this.start;
        let end   = this.end;

        let lat1 = utils.toRad(start.y);
        let lat2 = utils.toRad(end.y);
        let lon1 = start.x;
        let lon2 = end.x;
        let dLon = utils.toRad(lon2 - lon1);

        let y = Math.sin(dLon) * Math.cos(lat2);
        let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

        let bearings = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        let brng     = utils.toDeg(Math.atan2(y, x));
        let index    = brng - 22.5;

        if (index < 0) {
            index += 360;
        }

        index = utils.toInt(index / 45);

        return bearings[index];
    }

    getOffset(point) {

        // get the offset of the `point` from the line.
        // + if the `point` is on the right side of the line,
        // - if on the left and `0` if on the line.

        let start = this.start;
        let end   = this.end;

        // Find the sign of the determinant of vectors (start,end), where p is the query point.
        return ((end.x - start.x) * (point.y - start.y) - (end.y - start.y) * (point.x - start.x)) / 2;
    }


    // common
    // ------

    valueOf() {

        return [this.satrt.valueOf(), this.end.valueOf()];
    }

    toString() {

        return this.start.toString() + ' ' + this.end.toString();
    }

    equals(line) {

        return Line.equals(this, line);
    }

    clone() {

        return Line.fromLine(this);
    }
}


// exports
// -------

export default Line;
