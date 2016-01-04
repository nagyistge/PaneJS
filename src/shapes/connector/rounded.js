import * as utils from '../../common/utils';
import Point from '../../geometry/Point';

function rounded(sourcePoint, targetPoint, vertices, options = {}) {

    let offset = options.radius || 10;

    let d1;
    let d2;

    let d = ['M', sourcePoint.x, sourcePoint.y];

    utils.forEach(vertices, function (vertex, index) {

        // the closest vertices
        let prev = vertices[index - 1] || sourcePoint;
        let next = vertices[index + 1] || targetPoint;
        let cur = Point.fromPoint(vertex);

        // a half distance to the closest vertex
        d1 = d2 || cur.distance(prev) / 2;
        d2 = cur.distance(next) / 2;

        // control points
        let c1 = Point.fromPoint(vertex).move(prev, -Math.min(offset, d1)).smooth();
        let c2 = Point.fromPoint(vertex).move(next, -Math.min(offset, d2)).smooth();

        d.push(c1.x, c1.y, 'S', vertex.x, vertex.y, c2.x, c2.y, 'L');
    });

    d.push(targetPoint.x, targetPoint.y);

    return d.join(' ');
}


export default rounded;
