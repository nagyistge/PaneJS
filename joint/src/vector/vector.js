function createElement(el, attrs, children) {

    var i, len;

    if (!el) {
        return null;
    }

    // If `el` is an object, it is probably a native SVG element. Wrap it to VElement.
    if (typeof el === 'object') {
        return new VElement(el);
    }
    attrs = attrs || {};

    // If `el` is a `'svg'` or `'SVG'` string, create a new SVG canvas.
    if (el.toLowerCase() === 'svg') {

        return new VElement(createSvgDocument());

    } else if (el[0] === '<') {
        // Create element from an SVG string.
        // Allows constructs of type: `document.appendChild(Vectorizer('<rect></rect>').node)`.

        var svgDoc = createSvgDocument(el);

        // Note that `createElement()` might also return an array should the SVG string passed as
        // the first argument contain more then one root element.
        if (svgDoc.childNodes.length > 1) {

            // Map child nodes to `VElement`s.
            var ret = [];
            for (i = 0, len = svgDoc.childNodes.length; i < len; i++) {

                var childNode = svgDoc.childNodes[i];
                ret.push(new VElement(document.importNode(childNode, true)));
            }
            return ret;
        }

        return new VElement(document.importNode(svgDoc.firstChild, true));
    }

    el = document.createElementNS(ns.xmlns, el);

    // Set attributes.
    for (var key in attrs) {

        setAttribute(el, key, attrs[key]);
    }

    // Normalize `children` array.
    if (Object.prototype.toString.call(children) != '[object Array]') {
        children = [children];
    }

    // Append children if they are specified.
    for (i = 0, len = (children[0] && children.length) || 0; i < len; i++) {
        var child = children[i];
        el.appendChild(child instanceof VElement ? child.node : child);
    }

    return new VElement(el);
}

var V = createElement;

V.isVElement = function (object) {
    return object instanceof VElement;
};

V.decomposeMatrix = decomposeMatrix;
V.rectToPath = rectToPath;

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

export default V;