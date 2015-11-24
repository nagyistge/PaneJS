import { isUndefined } from './lang';
import { forEach     } from './array';

// xml namespaces.
var ns = {
    xmlns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink'
};
// svg version.
var svgVersion = '1.1';

function isNode() {

}

function getClassName(elem) {
    return elem.getAttribute && elem.getAttribute('class') || '';
}

function parseXML(str, async) {

    var xml;

    try {
        var parser = new DOMParser();

        if (!isUndefined(async)) {
            parser.async = async;
        }

        xml = parser.parseFromString(str, 'text/xml');
    } catch (error) {
        xml = null;
    }

    if (!xml || xml.getElementsByTagName('parsererror').length) {
        throw new Error('Invalid XML: ' + str);
    }

    return xml;
}

function createSvgDocument(content) {
    // Create an SVG document element.
    // If `content` is passed, it will be used as the SVG content of
    // the `<svg>` root element.

    var svg = '<svg xmlns="' + ns.xmlns + '" xmlns:xlink="' + ns.xmlns + '" version="' + svgVersion + '">' + (content || '') + '</svg>';
    var xml = parseXML(svg, false);
    return xml.documentElement;
}

function createSvgElement(tagName, doc) {
    return (doc || document).createElementNS(ns.xmlns, tagName);
}

function setAttribute(elem, name, value) {

    if (name === 'id') {
        elem.id = value;
    } else {

        var combined = name.split(':');

        combined.length > 1
            // Attribute names can be namespaced. E.g. `image` elements
            // have a `xlink:href` attribute to set the source of the image.
            ? elem.setAttributeNS(ns[combined[0]], combined[1], value)
            : elem.setAttribute(name, value);
    }
}


// parse transform
// ---------------

function parseTranslate(transform) {

    var translate = {tx: 0, ty: 0};

    if (transform) {

        var separator = /[ ,]+/;

        var match = transform.match(/translate\((.*)\)/);
        if (match) {
            var arr = match[1].split(separator);

            if (arr[0]) {
                translate.tx += parseFloat(arr[0]);
            }

            if (arr[1]) {
                translate.ty += parseFloat(arr[1]);
            }
        }
    }

    return translate;
}

function parseScale(transform) {

    var scale = {sx: 1, sy: 1};

    if (transform) {

        var separator = /[ ,]+/;

        var match = transform.match(/scale\((.*)\)/);
        if (match) {
            var arr = match[1].split(separator);

            if (arr[0]) {
                scale.sx *= parseFloat(arr[0]);
            }

            if (arr[1] || arr[0]) {
                scale.sy *= parseFloat(arr[1] || arr[0]);
            }
        }
    }

    return scale;
}

function parseRotate(transform) {

    var rotate = {angle: 0};

    if (transform) {

        var separator = /[ ,]+/;

        var match = transform.match(/rotate\((.*)\)/);
        if (match) {
            var arr = match[1].split(separator);

            if (arr[0]) {
                rotate.angle += parseFloat(arr[0]);
            }

            if (arr[1] && arr[2]) {
                rotate.cx = parseFloat(arr[1]);
                rotate.cy = parseFloat(arr[2]);
            }
        }
    }

    return rotate;
}

function parseTransform(transform) {
    return {
        translate: parseTranslate(transform),
        rotate: parseRotate(transform),
        scale: parseScale(transform)
    };
}


// path data
// ---------

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
    createSvgDocument,
    createSvgElement,
    setAttribute,
    getClassName,
    parseScale,
    parseRotate,
    parseTransform,
    parseTranslate,
    lineToPathData,
    rectToPathData,
    circleToPathData,
    ellipseToPathData,
    polygonToPathData,
    polylineToPathData,
}