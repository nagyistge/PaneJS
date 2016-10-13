import { forEach } from './array';

export function lineToPathData(line) {

    return [
        'M', line.getAttribute('x1'), line.getAttribute('y1'),
        'L', line.getAttribute('x2'), line.getAttribute('y2')
    ].join(' ');
}

export function polygonToPathData(polygon) {

    let d = [];

    forEach(polygon.points, (p, i) => {
        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
    });

    d.push('Z');

    return d.join(' ');
}

export function polylineToPathData(polyline) {

    let d = [];

    forEach(polyline.points, (p, i) => {
        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
    });

    return d.join(' ');
}

export function rectToPathData(rect) {

    let x  = parseFloat(rect.getAttribute('x')) || 0;
    let y  = parseFloat(rect.getAttribute('y')) || 0;
    let w  = parseFloat(rect.getAttribute('width')) || 0;
    let h  = parseFloat(rect.getAttribute('height')) || 0;
    let rx = parseFloat(rect.getAttribute('rx')) || 0;
    let ry = parseFloat(rect.getAttribute('ry')) || 0;
    let r  = x + w;
    let b  = y + h;

    let d;

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

let KAPPA = 0.5522847498307935;

export function circleToPathData(circle) {

    let cx = parseFloat(circle.getAttribute('cx')) || 0;
    let cy = parseFloat(circle.getAttribute('cy')) || 0;
    let r  = parseFloat(circle.getAttribute('r'));
    let cd = r * KAPPA; // Control distance.

    return [
        'M', cx, cy - r,    // Move to the first point.
        'C', cx + cd, cy - r, cx + r, cy - cd, cx + r, cy, // I. Quadrant.
        'C', cx + r, cy + cd, cx + cd, cy + r, cx, cy + r, // II. Quadrant.
        'C', cx - cd, cy + r, cx - r, cy + cd, cx - r, cy, // III. Quadrant.
        'C', cx - r, cy - cd, cx - cd, cy - r, cx, cy - r, // IV. Quadrant.
        'Z'
    ].join(' ');
}

export function ellipseToPathData(ellipse) {

    let cx  = parseFloat(ellipse.getAttribute('cx')) || 0;
    let cy  = parseFloat(ellipse.getAttribute('cy')) || 0;
    let rx  = parseFloat(ellipse.getAttribute('rx'));
    let ry  = parseFloat(ellipse.getAttribute('ry')) || rx;
    let cdx = rx * KAPPA; // Control distance x.
    let cdy = ry * KAPPA; // Control distance y.

    return [
        'M', cx, cy - ry,    // Move to the first point.
        'C', cx + cdx, cy - ry, cx + rx, cy - cdy, cx + rx, cy, // I. Quadrant.
        'C', cx + rx, cy + cdy, cx + cdx, cy + ry, cx, cy + ry, // II. Quadrant.
        'C', cx - cdx, cy + ry, cx - rx, cy + cdy, cx - rx, cy, // III. Quadrant.
        'C', cx - rx, cy - cdy, cx - cdx, cy - ry, cx, cy - ry, // IV. Quadrant.
        'Z'
    ].join(' ');
}
