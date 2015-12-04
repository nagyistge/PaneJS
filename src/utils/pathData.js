import { forEach     } from './array';

function lineToPathData(line) {
    return [
        'M', line.getAttribute('x1'), line.getAttribute('y1'),
        'L', line.getAttribute('x2'), line.getAttribute('y2')
    ].join(' ');
}

function polygonToPathData(polygon) {

    var d = [];

    forEach(polygon.points, function (p, i) {
        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
    });

    d.push('Z');

    return d.join(' ');
}

function polylineToPathData(polyline) {

    var d = [];

    forEach(polyline.points, function (p, i) {
        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
    });

    return d.join(' ');
}

function rectToPathData(rect) {

    var x = parseFloat(rect.getAttribute('x')) || 0;
    var y = parseFloat(rect.getAttribute('y')) || 0;
    var w = parseFloat(rect.getAttribute('width')) || 0;
    var h = parseFloat(rect.getAttribute('height')) || 0;
    var rx = parseFloat(rect.getAttribute('rx')) || 0;
    var ry = parseFloat(rect.getAttribute('ry')) || 0;
    var r = x + w;
    var b = y + h;

    var d;

    if (!rx && !ry) {

        d = [
            'M', x, y,
            'H', r,
            'V', b,
            'H', x,
            'V', y,
            'Z'
        ];

    } else {

        d = [
            'M', x + rx, y,
            'L', r - rx, y,
            'Q', r, y, r, y + ry,
            'L', r, y + h - ry,
            'Q', r, b, r - rx, b,
            'L', x + rx, b,
            'Q', x, b, x, b - rx,
            'L', x, y + ry,
            'Q', x, y, x + rx, y,
            'Z'
        ];
    }
    return d.join(' ');
}

var KAPPA = 0.5522847498307935;

function circleToPathData(circle) {

    var cx = parseFloat(circle.getAttribute('cx')) || 0;
    var cy = parseFloat(circle.getAttribute('cy')) || 0;
    var r = parseFloat(circle.getAttribute('r'));
    var cd = r * KAPPA; // Control distance.

    return [
        'M', cx, cy - r,    // Move to the first point.
        'C', cx + cd, cy - r, cx + r, cy - cd, cx + r, cy, // I. Quadrant.
        'C', cx + r, cy + cd, cx + cd, cy + r, cx, cy + r, // II. Quadrant.
        'C', cx - cd, cy + r, cx - r, cy + cd, cx - r, cy, // III. Quadrant.
        'C', cx - r, cy - cd, cx - cd, cy - r, cx, cy - r, // IV. Quadrant.
        'Z'
    ].join(' ');
}

function ellipseToPathData(ellipse) {

    var cx = parseFloat(ellipse.getAttribute('cx')) || 0;
    var cy = parseFloat(ellipse.getAttribute('cy')) || 0;
    var rx = parseFloat(ellipse.getAttribute('rx'));
    var ry = parseFloat(ellipse.getAttribute('ry')) || rx;
    var cdx = rx * KAPPA; // Control distance x.
    var cdy = ry * KAPPA; // Control distance y.

    return [
        'M', cx, cy - ry,    // Move to the first point.
        'C', cx + cdx, cy - ry, cx + rx, cy - cdy, cx + rx, cy, // I. Quadrant.
        'C', cx + rx, cy + cdy, cx + cdx, cy + ry, cx, cy + ry, // II. Quadrant.
        'C', cx - cdx, cy + ry, cx - rx, cy + cdy, cx - rx, cy, // III. Quadrant.
        'C', cx - rx, cy - cdy, cx - cdx, cy - ry, cx, cy - ry, // IV. Quadrant.
        'Z'
    ].join(' ');
}

export {
    lineToPathData,
    rectToPathData,
    circleToPathData,
    ellipseToPathData,
    polygonToPathData,
    polylineToPathData,
}
