import * as bezier from '../../geometry/bezier';
import       Point from '../../geometry/Point';


function fixMarker(view, isSource, reference) {

    let cache = view.cache;

    let renderedMarker = isSource
        ? cache.renderedSourceMarker
        : cache.renderedTargetMarker;

    let markerVel = isSource
        ? cache.sourceMarkerVel
        : cache.targetMarkerVel;

    if (renderedMarker && markerVel) {

        // get connection point of the marker connecting to the terminal
        let position = isSource
            ? cache.sourcePointOnTerminal || cache.staticSourcePoint
            : cache.targetPointOnTerminal || cache.staticTargetPoint;

        if (position) {
            markerVel.translateAndAutoOrient(position, reference, view.getPane());
            // fix the connection point on the marker
            view.updateConnectionPointOnMarker(isSource);
        }
    }
}

function getConnectionPoint(view, isSource) {

    let cache = view.cache;

    if (isSource) {
        return cache.sourcePointOnMarker
            || cache.sourcePointOnTerminal
            || cache.staticSourcePoint;
    }

    return cache.targetPointOnMarker ||
        cache.targetPointOnTerminal ||
        cache.staticTargetPoint;

}

function smoothConnector(sourcePoint, targetPoint, vertices) {

    let view = this;
    let pathArr;
    let sourceReference;
    let targetReference;

    if (vertices && vertices.length) {

        let knots         = [sourcePoint].concat(vertices).concat([targetPoint]);
        let controlPoints = bezier.getCurveControlPoints(knots);
        let length        = controlPoints[0].length;

        sourceReference = Point.fromPoint(controlPoints[0][0]);
        targetReference = Point.fromPoint(controlPoints[1][length - 1]);

        fixMarker(view, true, sourceReference);
        fixMarker(view, false, targetReference);

        knots[0]                = getConnectionPoint(view, true);
        knots[knots.length - 1] = getConnectionPoint(view, false);

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

        // let controlPointX = sourcePoint.x < targetPoint.x
        //    ? targetPoint.x - (targetPoint.x - sourcePoint.x) / 2
        //    : sourcePoint.x - (sourcePoint.x - targetPoint.x) / 2;
        //
        // sourceReference = new Point(controlPointX, sourcePoint.y);
        // targetReference = new Point(controlPointX, targetPoint.y);

        let controlPointY = (sourcePoint.y + targetPoint.y) / 2;

        // sourceReference = new Point(sourcePoint.x, controlPointY);
        // targetReference = new Point(targetPoint.x, controlPointY);
        //
        // fixMarker(view, true, sourceReference);
        // fixMarker(view, false, targetReference);
        //
        // sourcePoint = getConnectionPoint(view, true);
        // targetPoint = getConnectionPoint(view, false);

        pathArr = [
            'M', sourcePoint.x, sourcePoint.y,
            'C', sourcePoint.x, controlPointY,
            targetPoint.x, controlPointY,
            targetPoint.x, targetPoint.y
        ];
    }

    return pathArr.join(' ');
}


// exports
// -------

export default smoothConnector;
