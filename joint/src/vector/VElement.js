import {
    map,
    trim,
    forIn,
    reduce,
    forEach,
    isObject,
    isString,
    isBoolean,
    isFunction,
    isUndefined,
    parseScale,
    parseRotate,
    parseTranslate,
    setAttribute,
    createSvgElement,
    lineToPathData,
    rectToPathData,
    circleToPathData,
    ellipseToPathData,
    polygonToPathData,
    polylineToPathData,
} from '../commom/utils'

var counter = 0;

function uniqueId() {
    var id = ++counter + '';
    return 'v-' + id;
}

var rclass = /[\t\r\n\f]/g;
var rnotwhite = (/\S+/g);

function getClassName(elem) {
    return elem.getAttribute && elem.getAttribute('class') || '';
}

function VElement(elem) {

    if (elem instanceof VElement) {
        elem = elem.node;
    }

    if (!elem.id) {
        elem.id = uniqueId();
    }

    this.node = elem;
}

function vectorize(node) {
    return new VElement(node);
}

function normalize(elem) {
    return elem instanceof VElement ? elem.node : elem;
}

VElement.prototype = {

    constructor: VElement,

    attr: function (name, value) {

        var that = this;
        var node = that.node;
        var length = arguments.length;

        // Return all attributes.
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
    },

    text: function () {},

    hasClass: function (selector) {

        var that = this;
        var node = that.node;
        var className = ' ' + selector + ' ';

        if (node.nodeType === 1) {
            return (' ' + getClassName(node) + ' ').replace(rclass, ' ').indexOf(className) > -1;

        }
        return false;
    },

    addClass: function (value) {

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
    },

    removeClass: function (value) {

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
    },

    toggleClass: function (value, stateVal) {

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
            that.node.appendChild(normalize(item));
        });

        return that;
    },

    prepend: function (elem) {

        var that = this;
        var node = that.node;

        elem && node.insertBefore(normalize(elem), node.firstChild);

        return that;
    },

    svg: function () {
        var that = this;
        var node = that.node;

        return node instanceof window.SVGSVGElement ? that : vectorize(node.ownerSVGElement);
    },

    defs: function () {
        var defs = this.svg().node.getElementsByTagName('defs');
        return defs && defs.length ? vectorize(defs[0]) : null;
    },

    clone: function () {
        var cloned = vectorize(this.node.cloneNode(true));
        cloned.node.id = uniqueId();
        return cloned;
    },

    findOne: function (selector) {
        var found = this.node.querySelector(selector);
        return found ? vectorize(found) : null;
    },

    find: function (selector) {
        return map(this.node.querySelectorAll(selector), vectorize);
    },

    findParent: function (className, terminator) {

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

    translate: function (tx, ty, relative) {

        var transformAttr = that.attr('transform') || '';
        var translate = parseTranslate(transformAttr);

        if (!arguments.length) {
            return translate;
        }

        transformAttr = trim(transformAttr.replace(/translate\([^\)]*\)/g, ''));

        var dx = relative ? translate.tx + tx : tx;
        var dy = relative ? translate.ty + ty : ty;

        var newTranslate = 'translate(' + dx + ',' + dy + ')';

        return this.attr('transform', newTranslate + ' ' + transformAttr);
    },

    rotate: function (angle, cx, cy, relative) {

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
    },

    scale: function (sx, sy, relative) {

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
    },

    bbox: function (withoutTransformations, target) {
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
            // We are creating a new object as the standard says that you can't
            // modify the attributes of a bbox.
            box = {
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height
            };
        } catch (e) {
            // Fallback for IE.
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

        return V.transformRect(box, matrix);

    },

    toLocalPoint: function (x, y) {
        // Convert global point into the coordinate space of this element.


    },

    translateCenterToPoint: function () {},

    translateAndAutoOrient: function () {},

    animateAlongPath: function () {},

    sample: function (interval) {

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
    },

    toPath: function () {

        var that = this;
        var path = vectorize(createSvgElement('path'));
        var d = that.toPathData();

        path.attr(that.attr());

        d && path.attr('d', d);

        return path;
    },

    toPathData: function () {

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
    },

    findIntersection: function (ref, target) {

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
        var center = bbox.center();
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
};