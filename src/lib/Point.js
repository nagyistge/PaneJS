import { isNullOrUndefined } from '../common/utils';
import Base from './Base';


var Point = Base.extend({

    constructor: function Point(x, y) {
        this.x = !isNullOrUndefined(x) ? x : 0;
        this.y = !isNullOrUndefined(y) ? y : 0;
    },

    equals: function (point) {
        return point &&
            point instanceof Point &&
            point.x === this.x &&
            point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

export default Point;
