import { curveThroughPoints } from '../../geometry/bezier';

function smoothConnector(sourcePoint, targetPoint, vertices) {

    let pathArr;

    if (vertices && vertices.length) {
        pathArr = curveThroughPoints([sourcePoint].concat(vertices).concat([targetPoint]));
    } else {

        // if we have no vertices use a default cubic bezier curve, cubic
        // bezier requires two control points. The two control points are both
        // defined with X as mid way between the source and target points.
        // SourceControlPoint Y is equal to sourcePoint Y and targetControlPointY
        // being equal to targetPointY. Handle situation were sourcePointX is
        // greater or less then targetPointX.
        let controlPointX = sourcePoint.x < targetPoint.x
            ? targetPoint.x - (targetPoint.x - sourcePoint.x) / 2
            : sourcePoint.x - (sourcePoint.x - targetPoint.x) / 2;

        pathArr = [
            'M', sourcePoint.x, sourcePoint.y,
            'C', controlPointX, sourcePoint.y, controlPointX, targetPoint.y,
            targetPoint.x, targetPoint.y
        ];
    }

    return pathArr.join(' ');
}


export default smoothConnector;


