import Base from './Base';

class Point extends Base {

    constructor(x, y) {
        super('Point');
        this.x = x;
        this.y = y;
    }

    toString() {
        console.log(super.toString() + this.x + ' - ' + this.y);
    }
}

export default Point;