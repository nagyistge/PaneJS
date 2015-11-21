function Line(p1, p2) {

    var that = this;

    if (!(that instanceof Line)) {
        return new Line(p1, p2);
    }

    that.start = point(p1);
    that.end = point(p2);
}

Line.prototype = {


    // @return {double} length of the line
    length: function () {
        return sqrt(this.squaredLength());
    },

    // @return {integer} length without sqrt
    // @note for applications where the exact length is not necessary (e.g. compare only)
    squaredLength: function () {
        var x0 = this.start.x;
        var y0 = this.start.y;
        var x1 = this.end.x;
        var y1 = this.end.y;
        return (x0 -= x1) * x0 + (y0 -= y1) * y0;
    },

    midpoint: function () {
        return point((this.start.x + this.end.x) / 2,
            (this.start.y + this.end.y) / 2);
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

    // @return {point} my point at 't' <0,1>
    pointAt: function (t) {
        var x = (1 - t) * this.start.x + t * this.end.x;
        var y = (1 - t) * this.start.y + t * this.end.y;
        return point(x, y);
    },

    // @return {number} the offset of the point `p` from the line.
    // + if the point `p` is on the right side of the line,
    // - if on the left and 0 if on the line.
    pointOffset: function (p) {
        // Find the sign of the determinant of vectors (start,end), where p is the query point.
        return ((this.end.x - this.start.x) * (p.y - this.start.y) - (this.end.y - this.start.y) * (p.x - this.start.x)) / 2;
    },


    valueOf: function () {
        return [this.satrt.x, this.start.y, this.end.x, this.end.y];
    },

    toString: function () {
        return this.start.toString() + ' ' + this.end.toString();
    },

    equals: function (l) {
        return this.x === l.x && this.y === l.y;
    },

    clone: function () {
        return new Line(this);
    }
};