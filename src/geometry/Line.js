import Point from './Point';

var sqrt = math.sqrt;


function Line(p1, p2) {

    var that = this;

    that.start = new Point(p1);
    that.end = new Point(p2);
}

Line.prototype = {

    constructor: Line,

    length: function () {
        return sqrt(this.squaredLength());
    },

    squaredLength: function () {

        // Return the line's length without sqrt.
        // Note that for applications where the exact length
        // is not necessary (e.g. compare only)

        var that = this;

        var x0 = that.start.x;
        var y0 = that.start.y;
        var x1 = that.end.x;
        var y1 = that.end.y;

        return (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
    },

    midPoint: function () {

        var that = this;

        var x = (that.start.x + that.end.x) / 2;
        var y = (that.start.y + that.end.y) / 2;

        return new Point(x, y);
    },

    pointAt: function (t) {

        // get point at `t` (0~1).

        var that = this;

        var x = (1 - t) * that.start.x + t * that.end.x;
        var y = (1 - t) * that.start.y + t * that.end.y;

        return new Point(x, y);
    },

    // @return {point} Point where I'm intersecting l.
    // @see Squeak Smalltalk, LineSegment>>intersectionWith:
    intersection: function (l) {
        var pt1Dir = point(this.end.x - this.start.x, this.end.y - this.start.y);
        var pt2Dir = point(l.end.x - l.start.x, l.end.y - l.start.y);
        var det = (pt1Dir.x * pt2Dir.y) - (pt1Dir.y * pt2Dir.x);
        var deltaPt = point(l.start.x - this.start.x, l.start.y - this.start.y);
        var alpha = (deltaPt.x * pt2Dir.y) - (deltaPt.y * pt2Dir.x);
        var beta = (deltaPt.x * pt1Dir.y) - (deltaPt.y * pt1Dir.x);

        if (det === 0 ||
            alpha * det < 0 ||
            beta * det < 0) {
            // No intersection found.
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

        return point(this.start.x + (alpha * pt1Dir.x / det),
            this.start.y + (alpha * pt1Dir.y / det));
    },

    // @return the bearing (cardinal direction) of the line. For example N, W, or SE.
    // @returns {String} One of the following bearings : NE, E, SE, S, SW, W, NW, N.
    bearing: function () {

        var lat1 = toRad(this.start.y);
        var lat2 = toRad(this.end.y);
        var lon1 = this.start.x;
        var lon2 = this.end.x;
        var dLon = toRad(lon2 - lon1);
        var y = sin(dLon) * cos(lat2);
        var x = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dLon);
        var brng = toDeg(atan2(y, x));

        var bearings = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

        var index = brng - 22.5;
        if (index < 0) {
            index += 360;
        }
        index = parseInt(index / 45);

        return bearings[index];
    },


    pointOffset: function (p) {

        // get the offset of the point `p` from the line.
        // + if the point `p` is on the right side of the line,
        // - if on the left and `0` if on the line.

        var that = this;
        var start = that.start;
        var end = that.end;

        // Find the sign of the determinant of vectors (start,end), where p is the query point.
        return ((end.x - start.x) * (p.y - start.y) - (end.y - start.y) * (p.x - start.x)) / 2;
    },


    valueOf: function () {
        return [this.satrt.x, this.start.y, this.end.x, this.end.y];
    },

    toString: function () {
        return this.start.toString() + ' ' + this.end.toString();
    },

    equals: function (line) {
        return line instanceof Line
            && line.start && line.start.equals(this.start)
            && line.end && line.end.equals(this.end);
    },

    clone: function () {
        return new Line(this.start, this.end);
    }
};

export default Line;