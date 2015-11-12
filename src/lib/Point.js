import Base from './Base';

const Point = Base.extend({

    constructor: function Point(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    },

    equals(point) {
        return point &&
            point instanceof Point &&
            point.x === this.x &&
            point.y === this.y;
    },

    clone() {
        return new Point(this.x, this.y);
    }
});

export default Point;
