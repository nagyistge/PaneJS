import * as utils from '../common/utils';
import      Point from '../geometry/Point';
// import Line  from '../geometry/Line';

function curveThroughPoints(points) {

    let controlPoints = getCurveControlPoints(points);
    let path = ['M', points[0].x, points[0].y];

    utils.forEach(controlPoints[0], function () {

    });

    for (let i = 0; i < controlPoints[0].length; i++) {
        path.push('C',
            controlPoints[0][i].x,
            controlPoints[0][i].y,
            controlPoints[1][i].x,
            controlPoints[1][i].y,
            points[i + 1].x,
            points[i + 1].y
        );
    }
    return path;
}

function getCurveControlPoints(knots) {

    let firstControlPoints = [];
    let secondControlPoints = [];
    let n = knots.length - 1;

    // Special case: Bezier curve should be a straight line.
    if (n === 1) {

        // 3P1 = 2P0 + P3
        firstControlPoints[0] = new Point((2 * knots[0].x + knots[1].x) / 3, (2 * knots[0].y + knots[1].y) / 3);
        // P2 = 2P1 – P0
        secondControlPoints[0] = new Point(2 * firstControlPoints[0].x - knots[0].x, 2 * firstControlPoints[0].y - knots[0].y);

        return [firstControlPoints, secondControlPoints];
    }

    // Calculate first Bezier control points.
    // Right hand side vector.
    let rhs = [];

    // Set right hand side X values.
    for (let i = 1; i < n - 1; i++) {
        rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
    }
    rhs[0] = knots[0].x + 2 * knots[1].x;
    rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2.0;

    // Get first control points X-values.
    let x = getFirstControlPoints(rhs);


    // Set right hand side Y values.
    for (let i = 1; i < n - 1; ++i) {
        rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
    }
    rhs[0] = knots[0].y + 2 * knots[1].y;
    rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2.0;

    // Get first control points Y-values.
    let y = getFirstControlPoints(rhs);

    // Fill output arrays.
    for (let i = 0; i < n; i++) {
        // First control point.
        firstControlPoints.push(new Point(x[i], y[i]));
        // Second control point.
        if (i < n - 1) {
            secondControlPoints.push(new Point(
                2 * knots[i + 1].x - x[i + 1],
                2 * knots[i + 1].y - y[i + 1]));
        } else {
            secondControlPoints.push(new Point(
                (knots[n].x + x[n - 1]) / 2,
                (knots[n].y + y[n - 1]) / 2));
        }
    }

    return [firstControlPoints, secondControlPoints];
}

function getFirstControlPoints(rhs) {

    let n = rhs.length;
    // `x` is a solution vector.
    let x = [];
    let tmp = [];
    let b = 2.0;

    x[0] = rhs[0] / b;

    // Decomposition and forward substitution.
    for (let i = 1; i < n; i++) {
        tmp[i] = 1 / b;
        b = (i < n - 1 ? 4.0 : 3.5) - tmp[i];
        x[i] = (rhs[i] - x[i - 1]) / b;
    }

    for (let i = 1; i < n; i++) {
        // back substitution.
        x[n - i - 1] -= tmp[n - i] * x[n - i];
    }

    return x;
}

/* FIXME not used
function getInversionSolver(p0, p1, p2, p3) {
    let pts = arguments;

    function l(i, j) {
        // calculates a determinant 3x3
        // [p.x  p.y  1]
        // [pi.x pi.y 1]
        // [pj.x pj.y 1]
        let pi = pts[i];
        let pj = pts[j];
        return function (p) {
            let w = (i % 3 ? 3 : 1) * (j % 3 ? 3 : 1);
            let lij = p.x * (pi.y - pj.y) + p.y * (pj.x - pi.x) + pi.x * pj.y - pi.y * pj.x;
            return w * lij;
        };
    }

    return function solveInversion(p) {
        let ct = 3 * l(2, 3)(p1);
        let c1 = l(1, 3)(p0) / ct;
        let c2 = -l(2, 3)(p0) / ct;
        let la = c1 * l(3, 1)(p) + c2 * (l(3, 0)(p) + l(2, 1)(p)) + l(2, 0)(p);
        let lb = c1 * l(3, 0)(p) + c2 * l(2, 0)(p) + l(1, 0)(p);
        return lb / (lb - la);
    };
}
*/

/*
function getCurveDivider(p0, p1, p2, p3) {

    // Divide a Bezier curve into two at point defined by value 't' <0,1>.
    // Using deCasteljau algorithm. http://math.stackexchange.com/a/317867
    // @param control points (start, control start, control end, end)
    // @return a function accepts t and returns 2 curves each defined by 4 control points.

    return function divideCurve(t) {
        let l = new Line(p0, p1).pointAt(t);
        let m = new Line(p1, p2).pointAt(t);
        let n = new Line(p2, p3).pointAt(t);
        let p = new Line(l, m).pointAt(t);
        let q = new Line(m, n).pointAt(t);
        let r = new Line(p, q).pointAt(t);

        return [{
            p0,
            p1: l,
            p2: p,
            p3: r
        }, {
            p0: r,
            p1: q,
            p2: n,
            p3
        }];
    };
}
*/


// exports
// -------

export {
    getCurveControlPoints,
    curveThroughPoints
};
