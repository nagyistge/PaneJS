import {
    map,
    forIn,
    forEach,
    isArray,
    toArray,
    isObject,
    isString,
    isUndefined,
} from '../commom/utils';

var Vector = (function (window) {

    const document = window.document;
    const SVG_SUPPORTED = typeof window === 'object' && !!(window.SVGAngle || document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'));

    if (!SVG_SUPPORTED) {
        return function () {};
    }

    // XML namespaces.
    const NS = {
        xmlns: 'http://www.w3.org/2000/svg',
        xlink: 'http://www.w3.org/1999/xlink'
    };
    // SVG version.
    const SVG_VERSION = '1.1';


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

    // Create an SVG document element.
    // If `content` is passed, it will be used as the SVG content of
    // the `<svg>` root element.
    function createSvgDocument(content) {
        var svg = `<svg xmlns="${NS.xmlns}" xmlns:xlink="${NS.xmlns}" version="${SVG_VERSION}">${content || ''}</svg>`;
        var xml = parseXML(svg, false);
        return xml.documentElement;
    }


    // Create SVG element.
    // -------------------

    function createElement(elem, attrs, children) {

        if (!elem) {
            return null;
        }

        // If `elem` is an object, it is probably a native SVG element.
        // Then wrap it to VElement.
        if (isObject(elem)) {
            return new VElement(elem);
        }

        // If `elem` is a `'svg'` or `'SVG'` string, create a new SVG canvas.
        if (elem.toLowerCase() === 'svg') {
            return new VElement(createSvgDocument());
        } else if (elem[0] === '<') {
            // Create element from an SVG string.
            // e.g. `document.appendChild(Vector('<rect></rect>').node)`.
            var svgDoc = createSvgDocument(elem);

            // Note that `createElement()` might also return an array should
            // the SVG string passed as the first argument contain more than
            // one root element.
            if (svgDoc.childNodes.length > 1) {
                // Map child nodes to `VElement`s.
                return map(svgDoc.childNodes, function (node) {
                    return new VElement(document.importNode(node, true));
                });
            }

            return new VElement(document.importNode(svgDoc.firstChild, true));
        }

        elem = document.createElementNS(NS.xmlns, elem);

        attrs && forIn(attrs, function (value, key) {
            setAttribute(elem, key, value);
        });

        children && forEach(toArray(children), function (child) {
            elem.appendChild(normalizeNode(child));
        });

        return new VElement(elem);
    }

    function setAttribute(elem, name, value) {

        if (name === 'id') {
            elem.id = value;
        } else {

            var combined = name.split(':');

            combined.length > 1
                // Attribute names can be namespaced. E.g. `image` elements
                // have a `xlink:href` attribute to set the source of the image.
                ? elem.setAttributeNS(NS[combined[0]], combined[1], value)
                : elem.setAttribute(name, value);
        }
    }

    function normalizeNode(elem) {
        return elem instanceof VElement ? elem.node : elem;
    }

    function parseTransformString(transform) {

        var scale;
        var rotate;
        var translate;

        if (transform) {

            var separator = /[ ,]+/;

            var translateMatch = transform.match(/translate\((.*)\)/);
            if (translateMatch) {
                translate = translateMatch[1].split(separator);
            }
            var rotateMatch = transform.match(/rotate\((.*)\)/);
            if (rotateMatch) {
                rotate = rotateMatch[1].split(separator);
            }
            var scaleMatch = transform.match(/scale\((.*)\)/);
            if (scaleMatch) {
                scale = scaleMatch[1].split(separator);
            }
        }

        var sx = (scale && scale[0]) ? parseFloat(scale[0]) : 1;

        return {
            translate: {
                tx: (translate && translate[0]) ? parseInt(translate[0], 10) : 0,
                ty: (translate && translate[1]) ? parseInt(translate[1], 10) : 0
            },
            rotate: {
                angle: (rotate && rotate[0]) ? parseInt(rotate[0], 10) : 0,
                cx: (rotate && rotate[1]) ? parseInt(rotate[1], 10) : undefined,
                cy: (rotate && rotate[2]) ? parseInt(rotate[2], 10) : undefined
            },
            scale: {
                sx: sx,
                sy: (scale && scale[1]) ? parseFloat(scale[1]) : sx
            }
        };
    }


    // Matrix decomposition.
    // ---------------------

    function deltaTransformPoint(matrix, point) {

        var dx = point.x * matrix.a + point.y * matrix.c + 0;
        var dy = point.x * matrix.b + point.y * matrix.d + 0;
        return {x: dx, y: dy};
    }

    function decomposeMatrix(matrix) {

        // @see https://gist.github.com/2052247

        // calculate delta transform point
        var px = deltaTransformPoint(matrix, {x: 0, y: 1});
        var py = deltaTransformPoint(matrix, {x: 1, y: 0});

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {

            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };
    }


    // VElement.
    // ---------

    function VElement(elem) {

        var that = this;

        if (elem instanceof VElement) {
            elem = elem.node;
        }

        that.node = elem;

        if (!this.node.id) {
            this.node.id = uniqueId();
        }
    }

    VElement.prototype = {

        constructor: VElement,

        translate: function (tx, ty, absolute) {

            var that = this;

            ty = ty || 0;

            var transformAttr = that.attr('transform') || '';
            var translate = parseTransformString(transformAttr).translate;

            // getter?
            if (isUndefined(tx)) {
                return translate;
            }

            // clear the old translates
            transformAttr = transformAttr.replace(/translate\([^\)]*\)/g, '').trim();

            var newTx = absolute ? tx : translate.tx + tx;
            var newTy = absolute ? ty : translate.ty + ty;
            var newTranslate = 'translate(' + newTx + ',' + newTy + ')';

            // Note that `translate()` is always the first transformation.
            // This is usually the desired case.
            that.attr('transform', (newTranslate + ' ' + transformAttr).trim());
            return that;
        },

        rotate: function (angle, cx, cy, absolute) {

            var that = this;
            var transformAttr = that.attr('transform') || '';
            var rotate = parseTransformString(transformAttr).rotate;

            // getter?
            if (isUndefined(angle)) {
                return rotate;
            }

            transformAttr = transformAttr.replace(/rotate\([^\)]*\)/g, '').trim();

            angle %= 360;

            var newAngle = absolute ? angle : rotate.angle + angle;
            var newOrigin = (cx !== undefined && cy !== undefined) ? ',' + cx + ',' + cy : '';
            var newRotate = 'rotate(' + newAngle + newOrigin + ')';

            that.attr('transform', (transformAttr + ' ' + newRotate).trim());
            return that;
        },

        // Note that `scale` as the only transformation does not combine with previous values.
        scale: function (sx, sy) {
            sy = (typeof sy === 'undefined') ? sx : sy;

            var transformAttr = this.attr('transform') || '';
            var scale = parseTransformString(transformAttr).scale;

            // Is it a getter?
            if (typeof sx === 'undefined') {
                return scale;
            }

            transformAttr = transformAttr.replace(/scale\([^\)]*\)/g, '').trim();

            var newScale = 'scale(' + sx + ',' + sy + ')';

            this.attr('transform', (transformAttr + ' ' + newScale).trim());
            return this;
        },

        bbox: function () {},

        text: function () {},

        attr: function (name, value) {

            var that = this;
            var node = that.node;

            // Return all attributes.
            if (isUndefined(name)) {
                var attributes = node.attributes;
                var attrs = {};
                for (var i = 0; i < attributes.length; i++) {
                    attrs[attributes[i].nodeName] = attributes[i].nodeValue;
                }
                return attrs;
            }

            if (isString(name) && isUndefined(value)) {
                return node.getAttribute(name);
            }

            if (typeof name === 'object') {
                forIn(name, function (attrValue, attrName) {
                    setAttribute(node, attrName, attrValue);
                });
            } else {
                setAttribute(node, name, value);
            }

            return that;
        },

        remove: function () {

            var that = this;
            var node = that.node;

            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }

            return that;
        },

        append: function (elem) {

            var that = this;

            elem && forEach(toArray(elem), function (item) {
                that.node.appendChild(normalizeNode(item));
            });

            return that;
        },

        prepend: function (elem) {

            var that = this;
            var node = that.node;

            elem && node.insertBefore(normalizeNode(elem), node.firstChild);

            return that;
        },

        svg: function () {
            var that = this;
            var node = that.node;

            return node instanceof window.SVGSVGElement ? that : new VElement(node.ownerSVGElement);
        },

        defs: function () {

            var defs = this.svg().node.getElementsByTagName('defs');

            return defs && defs.length ? new VElement(defs[0]) : null;
        },

        clone: function () {
            var cloned = new VElement(this.node.cloneNode(true));
            cloned.node.id = uniqueId();
            return cloned;
        },

        findOne: function (selector) {

            var found = this.node.querySelector(selector);
            return found ? new VElement(found) : null;
        },

        find: function (selector) {
            return map(this.node.querySelectorAll(selector), V);
        },

        index: function () {

            var index = 0;
            var node = this.node.previousSibling;

            while (node) {
                // nodeType 1 for ELEMENT_NODE
                if (node.nodeType === 1) {
                    index++;
                }
                node = node.previousSibling;
            }

            return index;
        },

        findParentByClass: function () {},

        toLocalPoint: function () {},

        translateCenterToPoint: function () {},

        translateAndAutoOrient: function () {},

        animateAlongPath: function () {},

        hasClass: function () {},

        addClass: function () {},

        removeClass: function () {},

        toggleClass: function () {},

        sample: function () {},

        convertToPath: function () {},

        convertToPathData: function () {},

        findIntersection: function () {}
    };


    function convertLineToPathData(line) {

        line = createElement(line);
        var d = [
            'M', line.attr('x1'), line.attr('y1'),
            'L', line.attr('x2'), line.attr('y2')
        ].join(' ');
        return d;
    }

    function convertPolygonToPathData(polygon) {

        polygon = createElement(polygon);
        var points = polygon.node.points;

        var d = [];
        var p;
        for (var i = 0; i < points.length; i++) {
            p = points[i];
            d.push(i === 0 ? 'M' : 'L', p.x, p.y);
        }
        d.push('Z');
        return d.join(' ');
    }

    function convertPolylineToPathData(polyline) {

        polyline = createElement(polyline);
        var points = polyline.node.points;

        var d = [];
        var p;
        for (var i = 0; i < points.length; i++) {
            p = points[i];
            d.push(i === 0 ? 'M' : 'L', p.x, p.y);
        }
        return d.join(' ');
    }

    var KAPPA = 0.5522847498307935;

    function convertCircleToPathData(circle) {

        circle = createElement(circle);
        var cx = parseFloat(circle.attr('cx')) || 0;
        var cy = parseFloat(circle.attr('cy')) || 0;
        var r = parseFloat(circle.attr('r'));
        var cd = r * KAPPA; // Control distance.

        var d = [
            'M', cx, cy - r,    // Move to the first point.
            'C', cx + cd, cy - r, cx + r, cy - cd, cx + r, cy, // I. Quadrant.
            'C', cx + r, cy + cd, cx + cd, cy + r, cx, cy + r, // II. Quadrant.
            'C', cx - cd, cy + r, cx - r, cy + cd, cx - r, cy, // III. Quadrant.
            'C', cx - r, cy - cd, cx - cd, cy - r, cx, cy - r, // IV. Quadrant.
            'Z'
        ].join(' ');
        return d;
    }

    function convertEllipseToPathData(ellipse) {

        ellipse = createElement(ellipse);
        var cx = parseFloat(ellipse.attr('cx')) || 0;
        var cy = parseFloat(ellipse.attr('cy')) || 0;
        var rx = parseFloat(ellipse.attr('rx'));
        var ry = parseFloat(ellipse.attr('ry')) || rx;
        var cdx = rx * KAPPA; // Control distance x.
        var cdy = ry * KAPPA; // Control distance y.

        var d = [
            'M', cx, cy - ry,    // Move to the first point.
            'C', cx + cdx, cy - ry, cx + rx, cy - cdy, cx + rx, cy, // I. Quadrant.
            'C', cx + rx, cy + cdy, cx + cdx, cy + ry, cx, cy + ry, // II. Quadrant.
            'C', cx - cdx, cy + ry, cx - rx, cy + cdy, cx - rx, cy, // III. Quadrant.
            'C', cx - rx, cy - cdy, cx - cdx, cy - ry, cx, cy - ry, // IV. Quadrant.
            'Z'
        ].join(' ');
        return d;
    }

    function convertRectToPathData(rect) {

        rect = createElement(rect);
        var x = parseFloat(rect.attr('x')) || 0;
        var y = parseFloat(rect.attr('y')) || 0;
        var width = parseFloat(rect.attr('width')) || 0;
        var height = parseFloat(rect.attr('height')) || 0;
        var rx = parseFloat(rect.attr('rx')) || 0;
        var ry = parseFloat(rect.attr('ry')) || 0;
        var bbox = g.rect(x, y, width, height);

        var d;

        if (!rx && !ry) {

            d = [
                'M', bbox.origin().x, bbox.origin().y,
                'H', bbox.corner().x,
                'V', bbox.corner().y,
                'H', bbox.origin().x,
                'V', bbox.origin().y,
                'Z'
            ].join(' ');

        } else {

            var r = x + width;
            var b = y + height;
            d = [
                'M', x + rx, y,
                'L', r - rx, y,
                'Q', r, y, r, y + ry,
                'L', r, y + height - ry,
                'Q', r, b, r - rx, b,
                'L', x + rx, b,
                'Q', x, b, x, b - rx,
                'L', x, y + ry,
                'Q', x, y, x + rx, y,
                'Z'
            ].join(' ');
        }
        return d;
    }

    // Convert a rectangle to SVG path commands. `r` is an object of the form:
    // `{ x: [number], y: [number], width: [number], height: [number], top-ry: [number], top-ry: [number], bottom-rx: [number], bottom-ry: [number] }`,
    // where `x, y, width, height` are the usual rectangle attributes and [top-/bottom-]rx/ry allows for
    // specifying radius of the rectangle for all its sides (as opposed to the built-in SVG rectangle
    // that has only `rx` and `ry` attributes).
    function rectToPath(r) {

        var topRx = r.rx || r['top-rx'] || 0;
        var bottomRx = r.rx || r['bottom-rx'] || 0;
        var topRy = r.ry || r['top-ry'] || 0;
        var bottomRy = r.ry || r['bottom-ry'] || 0;

        return [
            'M', r.x, r.y + topRy,
            'v', r.height - topRy - bottomRy,
            'a', bottomRx, bottomRy, 0, 0, 0, bottomRx, bottomRy,
            'h', r.width - 2 * bottomRx,
            'a', bottomRx, bottomRy, 0, 0, 0, bottomRx, -bottomRy,
            'v', -(r.height - bottomRy - topRy),
            'a', topRx, topRy, 0, 0, 0, -topRx, -topRy,
            'h', -(r.width - 2 * topRx),
            'a', topRx, topRy, 0, 0, 0, -topRx, topRy
        ].join(' ');
    }

    var V = createElement;

    V.isVElement = function (object) {
        return object instanceof VElement;
    };

    //V.decomposeMatrix = decomposeMatrix;
    //V.rectToPath = rectToPath;

    var svgDocument = V('svg').node;

    V.createSVGMatrix = function (m) {

        var svgMatrix = svgDocument.createSVGMatrix();
        for (var component in m) {
            svgMatrix[component] = m[component];
        }

        return svgMatrix;
    };

    V.createSVGTransform = function () {
        return svgDocument.createSVGTransform();
    };

    V.createSVGPoint = function (x, y) {

        var p = svgDocument.createSVGPoint();
        p.x = x;
        p.y = y;
        return p;
    };

    V.transformRect = function (r, matrix) {

        var p = svgDocument.createSVGPoint();

        p.x = r.x;
        p.y = r.y;
        var corner1 = p.matrixTransform(matrix);

        p.x = r.x + r.width;
        p.y = r.y;
        var corner2 = p.matrixTransform(matrix);

        p.x = r.x + r.width;
        p.y = r.y + r.height;
        var corner3 = p.matrixTransform(matrix);

        p.x = r.x;
        p.y = r.y + r.height;
        var corner4 = p.matrixTransform(matrix);

        var minX = Math.min(corner1.x, corner2.x, corner3.x, corner4.x);
        var maxX = Math.max(corner1.x, corner2.x, corner3.x, corner4.x);
        var minY = Math.min(corner1.y, corner2.y, corner3.y, corner4.y);
        var maxY = Math.max(corner1.y, corner2.y, corner3.y, corner4.y);

        return {x: minX, y: minY, width: maxX - minX, height: maxY - minY};
    };

    // Convert a style represented as string (e.g. `'fill="blue"; stroke="red"'`) to
    // an object (`{ fill: 'blue', stroke: 'red' }`).
    V.styleToObject = function (styleString) {
        var ret = {};
        var styles = styleString.split(';');
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            var pair = style.split('=');
            ret[pair[0].trim()] = pair[1].trim();
        }
        return ret;
    };

    // Inspired by d3.js https://github.com/mbostock/d3/blob/master/src/svg/arc.js
    V.createSlicePathData = function (innerRadius, outerRadius, startAngle, endAngle) {

        var svgArcMax = 2 * Math.PI - 1e-6;
        var r0 = innerRadius;
        var r1 = outerRadius;
        var a0 = startAngle;
        var a1 = endAngle;
        var da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0);
        var df = da < Math.PI ? '0' : '1';
        var c0 = Math.cos(a0);
        var s0 = Math.sin(a0);
        var c1 = Math.cos(a1);
        var s1 = Math.sin(a1);

        return (da >= svgArcMax)
            ? (r0
            ? 'M0,' + r1
        + 'A' + r1 + ',' + r1 + ' 0 1,1 0,' + (-r1)
        + 'A' + r1 + ',' + r1 + ' 0 1,1 0,' + r1
        + 'M0,' + r0
        + 'A' + r0 + ',' + r0 + ' 0 1,0 0,' + (-r0)
        + 'A' + r0 + ',' + r0 + ' 0 1,0 0,' + r0
        + 'Z'
            : 'M0,' + r1
        + 'A' + r1 + ',' + r1 + ' 0 1,1 0,' + (-r1)
        + 'A' + r1 + ',' + r1 + ' 0 1,1 0,' + r1
        + 'Z')
            : (r0
            ? 'M' + r1 * c0 + ',' + r1 * s0
        + 'A' + r1 + ',' + r1 + ' 0 ' + df + ',1 ' + r1 * c1 + ',' + r1 * s1
        + 'L' + r0 * c1 + ',' + r0 * s1
        + 'A' + r0 + ',' + r0 + ' 0 ' + df + ',0 ' + r0 * c0 + ',' + r0 * s0
        + 'Z'
            : 'M' + r1 * c0 + ',' + r1 * s0
        + 'A' + r1 + ',' + r1 + ' 0 ' + df + ',1 ' + r1 * c1 + ',' + r1 * s1
        + 'L0,0'
        + 'Z');
    };

    // Merge attributes from object `b` with attributes in object `a`.
    // Note that this modifies the object `a`.
    // Also important to note that attributes are merged but CSS classes are concatenated.
    V.mergeAttrs = function (a, b) {
        for (var attr in b) {
            if (attr === 'class') {
                // Concatenate classes.
                a[attr] = a[attr] ? a[attr] + ' ' + b[attr] : b[attr];
            } else if (attr === 'style') {
                // `style` attribute can be an object.
                if (isObject(a[attr]) && isObject(b[attr])) {
                    // `style` stored in `a` is an object.
                    a[attr] = V.mergeAttrs(a[attr], b[attr]);
                } else if (isObject(a[attr])) {
                    // `style` in `a` is an object but it's a string in `b`.
                    // Convert the style represented as a string to an object in `b`.
                    a[attr] = V.mergeAttrs(a[attr], V.styleToObject(b[attr]));
                } else if (isObject(b[attr])) {
                    // `style` in `a` is a string, in `b` it's an object.
                    a[attr] = V.mergeAttrs(V.styleToObject(a[attr]), b[attr]);
                } else {
                    // Both styles are strings.
                    a[attr] = V.mergeAttrs(V.styleToObject(a[attr]), V.styleToObject(b[attr]));
                }
            } else {
                a[attr] = b[attr];
            }
        }
        return a;
    };

    V.annotateString = function (t, annotations, opt) {

        annotations = annotations || [];
        opt = opt || {};
        offset = opt.offset || 0;
        var compacted = [];
        var batch;

        var ret = [];
        var item;
        var prev;

        for (var i = 0; i < t.length; i++) {

            item = ret[i] = t[i];

            for (var j = 0; j < annotations.length; j++) {
                var annotation = annotations[j];
                var start = annotation.start + offset;
                var end = annotation.end + offset;

                if (i >= start && i < end) {
                    // Annotation applies.
                    if (isObject(item)) {
                        // There is more than one annotation to be applied => Merge attributes.
                        item.attrs = V.mergeAttrs(V.mergeAttrs({}, item.attrs), annotation.attrs);
                    } else {
                        item = ret[i] = {t: t[i], attrs: annotation.attrs};
                    }
                    if (opt.includeAnnotationIndices) {
                        (item.annotations || (item.annotations = [])).push(j);
                    }
                }
            }

            prev = ret[i - 1];

            if (!prev) {

                batch = item;

            } else if (isObject(item) && isObject(prev)) {
                // Both previous item and the current one are annotations. If the attributes
                // didn't change, merge the text.
                if (JSON.stringify(item.attrs) === JSON.stringify(prev.attrs)) {
                    batch.t += item.t;
                } else {
                    compacted.push(batch);
                    batch = item;
                }

            } else if (isObject(item)) {
                // Previous item was a string, current item is an annotation.
                compacted.push(batch);
                batch = item;

            } else if (isObject(prev)) {
                // Previous item was an annotation, current item is a string.
                compacted.push(batch);
                batch = item;

            } else {
                // Both previous and current item are strings.
                batch = (batch || '') + item;
            }
        }

        if (batch) {
            compacted.push(batch);
        }

        return compacted;
    };

    V.findAnnotationsAtIndex = function (annotations, index) {

        if (!annotations) {
            return [];
        }

        var found = [];

        annotations.forEach(function (annotation) {

            if (annotation.start < index && index <= annotation.end) {
                found.push(annotation);
            }
        });
        return found;
    };

    V.findAnnotationsBetweenIndexes = function (annotations, start, end) {

        if (!annotations) {
            return [];
        }

        var found = [];

        annotations.forEach(function (annotation) {

            if ((start >= annotation.start && start < annotation.end) || (end > annotation.start && end <= annotation.end) || (annotation.start >= start && annotation.end < end)) {
                found.push(annotation);
            }
        });
        return found;
    };

    // Shift all the text annotations after character `index` by `offset` positions.
    V.shiftAnnotations = function (annotations, index, offset) {

        if (!annotations) {
            return annotations;
        }

        annotations.forEach(function (annotation) {

            if (annotation.start >= index) {
                annotation.start += offset;
                annotation.end += offset;
            }
        });

        return annotations;
    };

    V.sanitizeText = sanitizeText;

    return V;

})(window);

export default Vector;