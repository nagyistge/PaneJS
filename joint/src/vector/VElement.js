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

function normalise(elem) {
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
            that.node.appendChild(normalise(item));
        });

        return that;
    },

    prepend: function (elem) {

        var that = this;
        var node = that.node;

        elem && node.insertBefore(normalise(elem), node.firstChild);

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

    sample: function () {},

    convertToPath: function () {

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

    findIntersection: function () {}
};