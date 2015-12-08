import {
    map,
    some,
    trim,
    toInt,
    forIn,
    reduce,
    forEach,
    isArray,
    toArray,
    isObject,
    isString,
    isBoolean,
    isFunction,
    isUndefined,
    parseScale,
    parseRotate,
    parseTranslate,
    lineToPathData,
    rectToPathData,
    circleToPathData,
    ellipseToPathData,
    polygonToPathData,
    polylineToPathData,
    createSvgDocument,
    createSvgElement,
    setAttribute,
    getClassName,
    isNode,
    sanitizeText,
} from '../common/utils'


var rclass = /[\t\r\n\f]/g;
var rnotwhite = (/\S+/g);

var pathCount = 0;
function createPathId() {

    var id;

    do {
        pathCount += 1;
        id = 'pane-path-' + pathCount;
    } while (document.getElementById(id));

    return id;
}

export class VElement {

    constructor(elem) {
        if (elem instanceof VElement) {
            elem = elem.node;
        }

        this.node = elem;
    }

    attr(name, value) {

        var that = this;
        var node = that.node;
        var length = arguments.length;

        // return all attributes
        if (!length) {
            var attrs = {};
            forEach(node.attributes, function (attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });
            return attrs;
        }

        if (length === 1) {
            if (isObject(name)) {
                forIn(name, function (attrValue, attrName) {
                    setAttribute(node, attrName, attrValue);
                });
            } else {
                return node.getAttribute(name);
            }
        } else {
            setAttribute(node, name, value);
        }

        return that;
    }

    removeAttr(name) {

        var that = this;
        var node = that.node;

        if (node && name) {
            node.removeAttribute(name);
        }

        return that;
    }

    css(style) {

    }

    text(content, options) {

        var that = this;
        var textNode = that.node;

        content = sanitizeText(content);
        options = options || {};

        // `alignment-baseline` does not work in Firefox.
        // Setting `dominant-baseline` on the `<text>` element doesn't work in IE9.
        // In order to have the 0,0 coordinate of the `<text>` element (or the first `<tspan>`)
        // in the top left corner we translate the `<text>` element by `0.8em`.
        // See `http://www.w3.org/Graphics/SVG/WG/wiki/How_to_determine_dominant_baseline`.
        // See also `http://apike.ca/prog_svg_text_style.html`.
        var y = that.attr('y');
        if (!y) {
            that.attr('y', '0.8em');
        }

        // An empty text gets rendered into the DOM in webkit-based browsers.
        // In order to unify this behaviour across all browsers
        // we rather hide the text element when it's empty.
        that.attr('display', content ? null : 'none');

        // Preserve spaces. In other words, we do not want consecutive spaces to get collapsed to one.
        textNode.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');

        // clear all `<tspan>` children
        textNode.textContent = '';

        var textPathOptions = options.textPath;
        if (textPathOptions) {

            // Wrap the text in the SVG <textPath> element that points to a path
            // defined by `options.textPath` inside the internal `<defs>` element.
            var defs = that.find('defs');
            if (!defs.length) {
                defs = createElement('defs');
                that.append(defs);
            }

            // If `opt.textPath` is a plain string, consider it to be directly
            // the SVG path data for the text to go along (this is a shortcut).
            // Otherwise if it is an object and contains the `d` property,
            // then this is our path.
            var isTextPathObject = isObject(textPathOptions);
            var d = isTextPathObject ? textPathOptions.d : textPathOptions;
            var vPath;

            if (d) {
                vPath = createElement('path', {d: d, id: createPathId()});
                defs.append(vPath);
            }

            var vTextPath = createElement('textPath');

            // Set attributes on the `<textPath>`. The most important one
            // is the `xlink:href` that points to our newly created `<path/>` element in `<defs/>`.
            // Note that we also allow the following construct:
            // `t.text('my text', {textPath: {'xlink:href': '#my-other-path'}})`.
            // In other words, one can completely skip the auto-creation of the path
            // and use any other arbitrary path that is in the document.
            if (isTextPathObject) {

                if (!textPathOptions['xlink:href'] && vPath) {
                    vTextPath.attr('xlink:href', '#' + vPath.node.id);
                }

                vTextPath.attr(textPathOptions);
            }

            that.append(vTextPath);
            textNode = vTextPath.node;
        }


        var offset = 0;
        var lines = content.split('\n');
        var lineHeight = options.lineHeight;
        var annotations = options.annotations;
        var includeAnnotationIndices = options.includeAnnotationIndices;

        if (annotations) {
            annotations = isArray(annotations) ? annotations : [annotations];
        }

        lineHeight = lineHeight === 'auto' ? '1.5em' : lineHeight || '1em';


        forEach(lines, function (line, i) {

            var vLine = createElement('tspan', {
                dy: i ? lineHeight : '0',
                x: that.attr('x') || 0
            });

            vLine.addClass('pane-text-line');

            if (line) {

                if (annotations) {
                    // Get the line height based on the biggest font size
                    // in the annotations for this line.
                    var maxFontSize = 0;

                    // Find the *compacted* annotations for this line.
                    var lineAnnotations = vector.annotateString(line, annotations, {
                        offset: -offset,
                        includeAnnotationIndices: includeAnnotationIndices
                    });

                    forEach(lineAnnotations, function (annotation) {

                        if (isObject(annotation)) {

                            var fontSize = toInt(annotation.attrs['font-size']);
                            if (fontSize && fontSize > maxFontSize) {
                                maxFontSize = fontSize;
                            }

                            var tspan = createElement('tspan', annotation.attrs);
                            if (includeAnnotationIndices) {
                                // If `includeAnnotationIndices` is `true`,
                                // set the list of indices of all the applied annotations
                                // in the `annotations` attribute. This list is a comma
                                // separated list of indices.
                                tspan.attr('annotations', annotation.annotations);
                            }

                            if (annotation.attrs.class) {
                                tspan.addClass(annotation.attrs.class);
                            }

                            tspan.node.textContent = annotation.t;

                        } else {
                            tspan = document.createTextNode(annotation || ' ');
                        }
                        vLine.append(tspan);
                    });

                    if (options.lineHeight === 'auto' && maxFontSize && i !== 0) {
                        vLine.attr('dy', (maxFontSize * 1.2) + 'px');
                    }
                } else {
                    vLine.node.textContent = line;
                }

            } else {

                // Make sure the textContent is never empty.
                // If it is, add a dummy character and make it invisible,
                // making the following lines correctly relatively positioned.
                // `dy=1em` won't work with empty lines otherwise.
                vLine.addClass('pane-text-empty');
                vLine.node.style.opacity = 0;
                vLine.node.textContent = '-';
            }

            textNode.appendChild(vLine.node);

            offset += line.length + 1;      // + 1 = newline character.
        });

        return that;
    }

    hasClass(selector) {

        var that = this;
        var node = that.node;
        var className = ' ' + selector + ' ';

        if (node.nodeType === 1) {
            return (' ' + getClassName(node) + ' ').replace(rclass, ' ').indexOf(className) > -1;

        }
        return false;
    }

    addClass(value) {

        var that = this;
        var node = that.node;

        if (isFunction(value)) {
            return that.addClass(value.call(node, getClassName(node)));
        }

        if (value && isString(value) && node.nodeType === 1) {

            var classes = value.match(rnotwhite) || [];
            var oldValue = (' ' + getClassName(node) + ' ').replace(rclass, ' ');
            var newValue = reduce(classes, function (ret, cls) {
                if (ret.indexOf(' ' + cls + ' ') < 0) {
                    ret += cls + ' ';
                }
                return ret;
            }, oldValue);

            newValue = trim(newValue);
            if (oldValue !== newValue) {
                node.setAttribute('class', newValue);
            }
        }

        return that;
    }

    removeClass(value) {

        var that = this;
        var node = that.node;

        if (isFunction(value)) {
            return that.removeClass(value.call(node, getClassName(node)));
        }

        if ((!value || isString(value)) && node.nodeType === 1) {

            var classes = (value || '').match(rnotwhite) || [];
            var oldValue = (' ' + getClassName(node) + ' ').replace(rclass, ' ');
            var newValue = reduce(classes, function (ret, cls) {
                if (ret.indexOf(' ' + cls + ' ') > -1) {
                    ret = ret.replace(' ' + cls + ' ', ' ');
                }
                return ret;
            }, oldValue);

            newValue = value ? trim(newValue) : '';
            if (oldValue !== newValue) {
                node.setAttribute('class', newValue);
            }
        }

        return that;
    }

    toggleClass(value, stateVal) {

        var that = this;
        var node = that.node;

        if (isBoolean(stateVal) && isString(value)) {
            return stateVal ? that.addClass(value) : that.removeClass(value);
        }

        if (isFunction(value)) {
            return that.toggleClass(value.call(node, getClassName(node), stateVal), stateVal);
        }

        if (value && isString(value)) {
            var classes = value.match(rnotwhite) || [];
            forEach(classes, function (cls) {
                that.hasClass(cls) ? that.removeClass(cls) : that.addClass(cls);
            });
        }

        return that;
    }

    remove() {

        var that = this;
        var node = that.node;

        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }

        return that;
    }

    empty() {

        var that = this;
        var node = that.node;

        if (node) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return that;
    }

    append(elem) {

        var that = this;

        elem && forEach(toArray(elem), function (item) {
            that.node.appendChild(normalize(item));
        });

        return that;
    }

    prepend(elem) {

        var that = this;
        var node = that.node;

        elem && node.insertBefore(normalize(elem), node.firstChild);

        return that;
    }

    appendTo(elem) {
        //elem.appendChild(this.node);
        //return this;
    }

    prependTo(elem) {

    }

    before(elem) {

    }

    after(elem) {

    }

    getSVG() {
        var that = this;
        var node = that.node;

        return node instanceof window.SVGSVGElement ? that : vectorize(node.ownerSVGElement);
    }

    getDefs() {

        var defs = null;
        var svg = this.getSVG();

        some(svg.node.childNodes, function (node) {
            if (isNode(node, 'defs')) {
                defs = vectorize(node);
                return true;
            }
        });

        if (!defs) {
            defs = createElement('defs');
            svg.append(defs);
        }

        return defs;
    }

    clone() {
        var node = this.node;

        var cloned = vectorize(node.cloneNode(true));

        if (node.id) {
            cloned.node.removeAttribute('id');
        }
        return cloned;
    }

    find(selector) {
        return map(this.node.querySelectorAll(selector), vectorize);
    }

    findOne(selector) {
        var found = this.node.querySelector(selector);
        return found ? vectorize(found) : null;
    }

    findParent(className, terminator) {

        var node = this.node;
        var stop = terminator || node.ownerSVGElement;

        node = node.parentNode;

        while (node && node !== stop) {
            var vElem = vectorize(node);
            if (vElem.hasClass(className)) {
                return vElem;
            }

            node = node.parentNode;
        }

        return null;
    }

    index() {

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
    }

    translate(tx, ty, relative) {

        var that = this;
        var transformAttr = that.attr('transform') || '';
        var translate = parseTranslate(transformAttr);

        if (!arguments.length) {
            return translate;
        }

        transformAttr = trim(transformAttr.replace(/translate\([^\)]*\)/g, ''));

        var dx = relative ? translate.tx + tx : tx;
        var dy = relative ? translate.ty + ty : ty;
        var newTranslate = 'translate(' + dx + ',' + dy + ')' + ' ' + transformAttr;

        that.attr('transform', newTranslate);

        return that;
    }

    rotate(angle, cx, cy, relative) {

        var transformAttr = that.attr('transform') || '';
        var rotate = parseRotate(transformAttr);

        if (!arguments.length) {
            return rotate;
        }

        transformAttr = trim(transformAttr.replace(/rotate\([^\)]*\)/g, ''));

        angle %= 360;

        var newAngle = relative ? rotate.angle + angle : angle;
        var newOrigin = isUndefined(cx) || isUndefined(cy) ? '' : ',' + cx + ',' + cy;
        var newRotate = 'rotate(' + newAngle + newOrigin + ')';

        return this.attr('transform', transformAttr + ' ' + newRotate);
    }

    scale(sx, sy, relative) {

        var transformAttr = this.attr('transform') || '';
        var scale = parseScale(transformAttr);
        var length = arguments.length;

        if (!length) {
            return scale;
        }

        transformAttr = trim(transformAttr.replace(/scale\([^\)]*\)/g, ''));

        if (length === 1) {
            sy = sx;
        } else if (length === 2) {
            if (isBoolean(sy)) {
                relative = sy;
                sy = sx;
            }
        }

        sx = relative ? scale.sx * sx : sx;
        sy = relative ? scale.sy * sy : sy;

        var newScale = 'scale(' + sx + ',' + sy + ')';

        return this.attr('transform', transformAttr + ' ' + newScale);
    }

    bbox(withoutTransformations, target) {

        // Get SVGRect that contains coordinates and dimension of the real
        // bounding box, i.e. after transformations are applied.
        // If `target` is specified, bounding box will be computed
        // relatively to `target` element.

        var that = this;
        var node = that.node;

        // If the element is not in the live DOM, it does not have a bounding
        // box defined and so fall back to 'zero' dimension element.
        if (!node.ownerSVGElement) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }


        var box;
        try {
            box = node.getBBox();
            // We are creating a new object as the standard says that
            // you can't modify the attributes of a bbox.
            box = {
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height
            };
        } catch (e) {
            // fallback for IE
            box = {
                x: node.clientLeft,
                y: node.clientTop,
                width: node.clientWidth,
                height: node.clientHeight
            };
        }

        if (withoutTransformations) {
            return box;
        }

        var matrix = node.getTransformToElement(target || node.ownerSVGElement);

        return vector.transformRect(box, matrix);

    }

    toLocalPoint(x, y) {

        // Convert global point into the coordinate space of this element.

        var that = this;
        var svg = that.getSVG().node;
        var point = svg.createSVGPoint();

        point.x = x;
        point.y = y;

        try {
            // ref: https://msdn.microsoft.com/zh-cn/library/hh535760(v=vs.85).aspx
            var globalPoint = point.matrixTransform(svg.getScreenCTM().inverse());
            var globalToLocalMatrix = that.node.getTransformToElement(svg).inverse();
            return globalPoint.matrixTransform(globalToLocalMatrix);

        } catch (e) {
            // IE9 throws an exception in odd cases.
            // (`Unexpected call to method or property access`)
            // We have to make do with the original coordianates.
            return point;
        }
    }

    translateCenterToPoint() {}

    translateAndAutoOrient() {}

    animateAlongPath() {}

    sample(interval) {

        // Interpolate path by discrete points.
        // The precision of the sampling is controlled by `interval`.
        // In other words, `sample()` will generate a point on the path
        // starting at the beginning of the path going to the end every
        // `interval` pixels.
        // The sampler can be very useful. E.g. finding intersection between
        // two paths (finding the two closest points from two samples).


        // `path.getTotalLength()`
        // Returns the computed value for the total length of the path using
        // the browser's distance-along-a-path algorithm, as a distance in the
        // current user coordinate system.

        // `path.getPointAtLength(distance)`
        // Returns the (x,y) coordinate in user space which is distance units
        // along the path, utilizing the browser's distance-along-a-path algorithm.

        interval = interval || 1;

        var node = this.node;
        var length = node.getTotalLength();
        var distance = 0;
        var samples = [];
        var sample;

        while (distance < length) {
            sample = node.getPointAtLength(distance);
            samples.push({x: sample.x, y: sample.y, distance: distance});
            distance += interval;
        }

        return samples;
    }

    toPath() {

        var that = this;
        var path = vectorize(createSvgElement('path'));
        var d = that.toPathData();

        path.attr(that.attr());

        d && path.attr('d', d);

        return path;
    }

    toPathData() {

        var that = this;
        var node = that.node;
        var tagName = node.tagName.toUpperCase();

        switch (tagName) {
            case 'PATH':
                return that.attr('d');
            case 'LINE':
                return lineToPathData(node);
            case 'POLYGON':
                return polygonToPathData(node);
            case 'POLYLINE':
                return polylineToPathData(node);
            case 'ELLIPSE':
                return ellipseToPathData(node);
            case 'CIRCLE':
                return circleToPathData(node);
            case 'RECT':
                return rectToPathData(node);
        }

        throw new Error(tagName + ' cannot be converted to PATH.');
    }

    findIntersection(ref, target) {

        // Find the intersection of a line starting in the center
        // of the SVG `node` ending in the point `ref`.
        // `target` is an SVG element to which `node`s transformations are relative to.
        // In JointJS, `target` is the `paper.viewport` SVG group element.
        // Note that `ref` point must be in the coordinate system of the `target` for this function to work properly.
        // Returns a point in the `target` coordinate system (the same system as `ref` is in) if
        // an intersection is found. Returns `undefined` otherwise.

        var that = this;
        var svg = that.svg().node;

        target = target || svg;

        var bbox = g.rect(this.bbox(false, target));
        var center = bbox.getCenter();
        var spot = bbox.intersectionWithLineFromCenterToPoint(ref);

        if (!spot) {
            return undefined;
        }

        var tagName = this.node.localName.toUpperCase();

        // Little speed up optimalization for `<rect>` element. We do not do conversion
        // to path element and sampling but directly calculate the intersection through
        // a transformed geometrical rectangle.
        if (tagName === 'RECT') {

            var gRect = g.rect(
                parseFloat(this.attr('x') || 0),
                parseFloat(this.attr('y') || 0),
                parseFloat(this.attr('width')),
                parseFloat(this.attr('height'))
            );
            // Get the rect transformation matrix with regards to the SVG document.
            var rectMatrix = this.node.getTransformToElement(target);
            // Decompose the matrix to find the rotation angle.
            var rectMatrixComponents = V.decomposeMatrix(rectMatrix);
            // Now we want to rotate the rectangle back so that we
            // can use `intersectionWithLineFromCenterToPoint()` passing the angle as the second argument.
            var resetRotation = svg.createSVGTransform();
            resetRotation.setRotate(-rectMatrixComponents.rotation, center.x, center.y);
            var rect = V.transformRect(gRect, resetRotation.matrix.multiply(rectMatrix));
            spot = g.rect(rect).intersectionWithLineFromCenterToPoint(ref, rectMatrixComponents.rotation);

        } else if (tagName === 'PATH'
            || tagName === 'POLYGON'
            || tagName === 'POLYLINE'
            || tagName === 'CIRCLE'
            || tagName === 'ELLIPSE') {

            var pathNode = (tagName === 'PATH') ? that : that.toPath();
            var samples = pathNode.sample();
            var minDistance = Infinity;
            var closestSamples = [];

            for (var i = 0, len = samples.length; i < len; i++) {

                var sample = samples[i];
                // Convert the sample point in the local coordinate system to the global coordinate system.
                var gp = V.createSVGPoint(sample.x, sample.y);
                gp = gp.matrixTransform(this.node.getTransformToElement(target));
                sample = g.point(gp);
                var centerDistance = sample.distance(center);
                // Penalize a higher distance to the reference point by 10%.
                // This gives better results. This is due to
                // inaccuracies introduced by rounding errors and getPointAtLength() returns.
                var refDistance = sample.distance(ref) * 1.1;
                var distance = centerDistance + refDistance;
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSamples = [{
                        sample: sample,
                        refDistance: refDistance
                    }];
                } else if (distance < minDistance + 1) {
                    closestSamples.push({
                        sample: sample,
                        refDistance: refDistance
                    });
                }
            }

            closestSamples.sort(function (a, b) {
                return a.refDistance - b.refDistance;
            });
            spot = closestSamples[0].sample;
        }

        return spot;
    }
}


function vectorize(node) {
    return new VElement(node);
}

function normalize(elem) {
    return elem instanceof VElement ? elem.node : elem;
}

function createElement(elem, attrs, children) {

    if (!elem) {
        return null;
    }

    if (isObject(elem)) {
        return vectorize(elem);
    }

    if (elem.toLowerCase() === 'svg') {
        return vectorize(createSvgDocument());
    } else if (elem[0] === '<') {
        var svgDoc = createSvgDocument(elem);
        if (svgDoc.childNodes.length > 1) {
            return map(svgDoc.childNodes, function (childNode) {
                return vectorize(document.importNode(childNode, true));
            });
        }

        return vectorize(document.importNode(svgDoc.firstChild, true));
    }


    // create svg node by tagName.
    elem = createSvgElement(elem);

    // set attributes.
    attrs && forIn(attrs, function (value, attr) {
        setAttribute(elem, attr, value);
    });

    // append children.
    if (children) {
        children = isArray(children) ? children : [children];

        forEach(children, function (child) {
            elem.appendChild(child instanceof VElement ? child.node : child);
        });
    }

    return vectorize(elem);
}


// vector
// ------

var vector = VElement.createElement = createElement;
var svgDocument = createElement('svg').node;

vector.isVElement = function (obj) {
    return obj instanceof VElement;
};

vector.createSVGMatrix = function (matrix) {
    var svgMatrix = svgDocument.createSVGMatrix();
    for (var key in matrix) {
        svgMatrix[key] = matrix[key];
    }

    return svgMatrix;
};

vector.createSVGTransform = function () {
    return svgDocument.createSVGTransform();
};

vector.createSVGPoint = function (x, y) {
    var point = svgDocument.createSVGPoint();
    point.x = x;
    point.y = y;
    return point;
};

vector.transformRect = function (rect, matrix) {

    var point = svgDocument.createSVGPoint();

    point.x = rect.x;
    point.y = rect.y;
    var corner1 = point.matrixTransform(matrix);

    point.x = rect.x + rect.width;
    point.y = rect.y;
    var corner2 = point.matrixTransform(matrix);

    point.x = rect.x + rect.width;
    point.y = rect.y + rect.height;
    var corner3 = point.matrixTransform(matrix);

    point.x = rect.x;
    point.y = rect.y + rect.height;
    var corner4 = point.matrixTransform(matrix);

    var minX = Math.min(corner1.x, corner2.x, corner3.x, corner4.x);
    var maxX = Math.max(corner1.x, corner2.x, corner3.x, corner4.x);
    var minY = Math.min(corner1.y, corner2.y, corner3.y, corner4.y);
    var maxY = Math.max(corner1.y, corner2.y, corner3.y, corner4.y);

    return {x: minX, y: minY, width: maxX - minX, height: maxY - minY};
};

vector.styleToObject = function (styleString) {
    var ret = {};
    forEach(styleString.split(';'), function (style) {
        var pair = style.split('=');
        ret[trim(pair[0])] = trim(pair[1]);
    });
    return ret;
};

// exports
// -------

export default vector;
