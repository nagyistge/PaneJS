import Point  from '../../geometry/Point';
import { getCurveControlPoints } from '../../geometry/bezier';


function fixMarker(view, isSource, reference) {

    let renderedMarker = isSource
        ? view.renderedSourceMarker
        : view.renderedTargetMarker;
    let vel = isSource
        ? view.sourceMarkerVel
        : view.targetMarkerVel;

    if (renderedMarker && vel) {

        let link = view.cell;
        // get connection point of the marker connecting to the terminal
        let position = isSource
            ? link.sourcePointOnTerminal
            : link.targetPointOnTerminal;

        vel.translateAndAutoOrient(position, reference, view.paper.drawPane);
        // fix the connection point on the marker
        view.updateConnectionPointOnMarker(isSource);
    }
}


function smoothConnector(sourcePoint, targetPoint, vertices) {

    let linkView = this;
    let link = linkView.cell;
    let pathArr;
    let sourceReference;
    let targetReference;

    if (vertices && vertices.length) {

        let knots = [sourcePoint].concat(vertices).concat([targetPoint]);
        let controlPoints = getCurveControlPoints(knots);
        let length = controlPoints[0].length;

        sourceReference = Point.fromPoint(controlPoints[0][0]);
        targetReference = Point.fromPoint(controlPoints[1][length - 1]);

        fixMarker(linkView, true, sourceReference);
        fixMarker(linkView, false, targetReference);

        knots[0] = link.sourcePoint;
        knots[knots.length - 1] = link.targetPoint;

        pathArr = ['M', knots[0].x, knots[0].y];

        for (let i = 0; i < length; i++) {
            pathArr.push('C',
                controlPoints[0][i].x,
                controlPoints[0][i].y,
                controlPoints[1][i].x,
                controlPoints[1][i].y,
                knots[i + 1].x,
                knots[i + 1].y
            );
        }
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

        sourceReference = new Point(controlPointX, sourcePoint.y);
        targetReference = new Point(controlPointX, targetPoint.y);

        fixMarker(linkView, true, sourceReference);
        fixMarker(linkView, false, targetReference);

        sourcePoint = link.sourcePoint;
        targetPoint = link.targetPoint;

        pathArr = [
            'M', sourcePoint.x, sourcePoint.y,
            'C', controlPointX, sourcePoint.y, controlPointX, targetPoint.y,
            targetPoint.x, targetPoint.y
        ];
    }

    return pathArr.join(' ');
}


// exports
// -------

export default smoothConnector;
