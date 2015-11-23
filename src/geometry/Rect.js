function Rect(x, y, w, h) {
    if (!(this instanceof Rect)) {
        return new Rect(x, y, w, h);
    }
    if (y === undefined) {
        y = x.y;
        w = x.width;
        h = x.height;
        x = x.x;
    }
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

Rect.prototype = {

    toString: function () {
        return this.origin().toString() + ' ' + this.corner().toString();
    },

    // @return {boolean} true if rectangles are equal.
    equals: function (r) {
        var mr = g.rect(this).normalize();
        var nr = g.rect(r).normalize();
        return mr.x === nr.x && mr.y === nr.y && mr.width === nr.width && mr.height === nr.height;
    },

    center: function () {
        return point(this.x + this.width / 2, this.y + this.height / 2);
    },

    origin: function () {
        return point(this.x, this.y);
    },

    corner: function () {
        return point(this.x + this.width, this.y + this.height);
    },

    topRight: function () {
        return point(this.x + this.width, this.y);
    },

    bottomLeft: function () {
        return point(this.x, this.y + this.height);
    },


    // @return {rect} if rectangles intersect, {null} if not.
    intersect: function (r) {
        var myOrigin = this.origin();
        var myCorner = this.corner();
        var rOrigin = r.origin();
        var rCorner = r.corner();

        // No intersection found
        if (rCorner.x <= myOrigin.x ||
            rCorner.y <= myOrigin.y ||
            rOrigin.x >= myCorner.x ||
            rOrigin.y >= myCorner.y) {
            return null;
        }

        var x = Math.max(myOrigin.x, rOrigin.x);
        var y = Math.max(myOrigin.y, rOrigin.y);

        return Rect(x, y, Math.min(myCorner.x, rCorner.x) - x, Math.min(myCorner.y, rCorner.y) - y);
    },

    // @return {string} (left|right|top|bottom) side which is nearest to point
    // @see Squeak Smalltalk, Rectangle>>sideNearestTo:
    sideNearestToPoint: function (p) {
        p = point(p);
        var distToLeft = p.x - this.x;
        var distToRight = (this.x + this.width) - p.x;
        var distToTop = p.y - this.y;
        var distToBottom = (this.y + this.height) - p.y;
        var closest = distToLeft;
        var side = 'left';

        if (distToRight < closest) {
            closest = distToRight;
            side = 'right';
        }
        if (distToTop < closest) {
            closest = distToTop;
            side = 'top';
        }
        if (distToBottom < closest) {
            closest = distToBottom;
            side = 'bottom';
        }
        return side;
    },
    // @return {bool} true if point p is insight me
    containsPoint: function (p) {
        p = point(p);
        if (p.x >= this.x && p.x <= this.x + this.width &&
            p.y >= this.y && p.y <= this.y + this.height) {
            return true;
        }
        return false;
    },
    // Algorithm ported from java.awt.Rectangle from OpenJDK.
    // @return {bool} true if rectangle `r` is inside me.
    containsRect: function (r) {
        var nr = Rect(r).normalize();
        var W = nr.width;
        var H = nr.height;
        var X = nr.x;
        var Y = nr.y;
        var w = this.width;
        var h = this.height;
        if ((w | h | W | H) < 0) {
            // At least one of the dimensions is negative...
            return false;
        }
        // Note: if any dimension is zero, tests below must return false...
        var x = this.x;
        var y = this.y;
        if (X < x || Y < y) {
            return false;
        }
        w += x;
        W += X;
        if (W <= X) {
            // X+W overflowed or W was zero, return false if...
            // either original w or W was zero or
            // x+w did not overflow or
            // the overflowed x+w is smaller than the overflowed X+W
            if (w >= x || W > w) {
                return false;
            }
        } else {
            // X+W did not overflow and W was not zero, return false if...
            // original w was zero or
            // x+w did not overflow and x+w is smaller than X+W
            if (w >= x && W > w) {
                return false;
            }
        }
        h += y;
        H += Y;
        if (H <= Y) {
            if (h >= y || H > h) {
                return false;
            }
        } else {
            if (h >= y && H > h) {
                return false;
            }
        }
        return true;
    },
    // @return {point} a point on my boundary nearest to p
    // @see Squeak Smalltalk, Rectangle>>pointNearestTo:
    pointNearestToPoint: function (p) {
        p = point(p);
        if (this.containsPoint(p)) {
            var side = this.sideNearestToPoint(p);
            switch (side) {
                case 'right':
                    return point(this.x + this.width, p.y);
                case 'left':
                    return point(this.x, p.y);
                case 'bottom':
                    return point(p.x, this.y + this.height);
                case 'top':
                    return point(p.x, this.y);
            }
        }
        return p.adhereToRect(this);
    },
    // Find point on my boundary where line starting
    // from my center ending in point p intersects me.
    // @param {number} angle If angle is specified, intersection with rotated rectangle is computed.
    intersectionWithLineFromCenterToPoint: function (p, angle) {
        p = point(p);
        var center = point(this.x + this.width / 2, this.y + this.height / 2);
        var result;
        if (angle) {
            p.rotate(center, angle);
        }

        // (clockwise, starting from the top side)
        var sides = [
            line(this.origin(), this.topRight()),
            line(this.topRight(), this.corner()),
            line(this.corner(), this.bottomLeft()),
            line(this.bottomLeft(), this.origin())
        ];
        var connector = line(center, p);

        for (var i = sides.length - 1; i >= 0; --i) {
            var intersection = sides[i].intersection(connector);
            if (intersection !== null) {
                result = intersection;
                break;
            }
        }
        if (result && angle) {
            result.rotate(center, -angle);
        }
        return result;
    },
    // Move and expand me.
    // @param r {rectangle} representing deltas
    moveAndExpand: function (r) {
        this.x += r.x || 0;
        this.y += r.y || 0;
        this.width += r.width || 0;
        this.height += r.height || 0;
        return this;
    },
    round: function (decimals) {
        this.x = decimals ? this.x.toFixed(decimals) : round(this.x);
        this.y = decimals ? this.y.toFixed(decimals) : round(this.y);
        this.width = decimals ? this.width.toFixed(decimals) : round(this.width);
        this.height = decimals ? this.height.toFixed(decimals) : round(this.height);
        return this;
    },

    // Normalize the rectangle; i.e., make it so that it has a non-negative width and height.
    // If width < 0 the function swaps the left and right corners,
    // and it swaps the top and bottom corners if height < 0
    // like in http://qt-project.org/doc/qt-4.8/qrectf.html#normalized
    normalize: function () {
        var newx = this.x;
        var newy = this.y;
        var newwidth = this.width;
        var newheight = this.height;
        if (this.width < 0) {
            newx = this.x + this.width;
            newwidth = -this.width;
        }
        if (this.height < 0) {
            newy = this.y + this.height;
            newheight = -this.height;
        }
        this.x = newx;
        this.y = newy;
        this.width = newwidth;
        this.height = newheight;
        return this;
    },
    // Find my bounding box when I'm rotated with the center of rotation in the center of me.
    // @return r {rectangle} representing a bounding box
    bbox: function (angle) {
        var theta = toRad(angle || 0);
        var st = abs(sin(theta));
        var ct = abs(cos(theta));
        var w = this.width * ct + this.height * st;
        var h = this.width * st + this.height * ct;
        return Rect(this.x + (this.width - w) / 2, this.y + (this.height - h) / 2, w, h);
    },
    snapToGrid: function (gx, gy) {
        var origin = this.origin().snapToGrid(gx, gy);
        var corner = this.corner().snapToGrid(gx, gy);
        this.x = origin.x;
        this.y = origin.y;
        this.width = corner.x - origin.x;
        this.height = corner.y - origin.y;
        return this;
    },
    clone: function () {
        return Rect(this);
    }
};

export default Rect;