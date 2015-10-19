


define('PaneJS/common/utils',['require','exports','module'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global window */

var utils = {};

var arrProto = Array.prototype;
var objProto = Object.prototype;
var slice = arrProto.slice;
var toString = objProto.toString;
var hasOwn = objProto.hasOwnProperty;


// Lang
// ----

function isType(obj, type) {
    return toString.call(obj) === '[object ' + type + ']';
}

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

function isFunction(obj) {
    return isType(obj, 'Function');
}

function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return typeof obj === 'undefined';
}

function isNullOrUndefined(obj) {
    return isUndefined(obj) || isNull(obj);
}

function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

var isArray = Array.isArray || function (obj) {
        return isType(obj, 'Array');
    };

function isArrayLike(obj) {
    if (isArray(obj)) {
        return true;
    }

    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    var length = !!obj && 'length' in obj && obj.length;

    return length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isNumeric(obj) {
    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}

utils.isType = isType;
utils.isNull = isNull;
utils.isArray = isArray;
utils.isObject = isObject;
utils.isWindow = isWindow;
utils.isNumeric = isNumeric;
utils.isFunction = isFunction;
utils.isUndefined = isUndefined;
utils.isArrayLike = isArrayLike;
utils.isNullOrUndefined = isNullOrUndefined;

// String
// ------

utils.toString = function (str) {
    return '' + str;
};

utils.lcFirst = function (str) {
    str = str + '';
    return str.charAt(0).toLowerCase() + str.substr(1);
};

utils.ucFirst = function (str) {
    str = str + '';
    return str.charAt(0).toUpperCase() + str.substr(1);
};

utils.ltrim = function (str, chars) {
    chars = chars || "\\s";

    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
};

utils.rtrim = function (str, chars) {
    chars = chars || "\\s";

    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
};

utils.trim = function (str, chars) {
    return utils.ltrim(utils.rtrim(str, chars), chars);
};

// Number
// ------
utils.toFixed = function (value, precision) {
    var power = Math.pow(10, precision);
    return (Math.round(value * power) / power).toFixed(precision);
};

utils.mod = function (n, m) {
    return ((n % m) + m) % m;
};


// Object
// ------

function hasKey(obj, key) {
    return obj !== null && hasOwn.call(obj, key);
}

function clone(obj, transients, shallow) {

    shallow = (shallow != null) ? shallow : false;
    var cloned = null;

    if (obj && isFunction(obj.constructor)) {
        cloned = new obj.constructor();

        for (var i in obj) {
            //if (i != mxObjectIdentity.FIELD_NAME && (!transients || indexOf(transients, i) < 0)) {
            if (i !== 'objectId' && (!transients || indexOf(transients, i) < 0)) {
                if (!shallow && typeof(obj[i]) == 'object') {
                    cloned[i] = clone(obj[i]);
                } else {
                    cloned[i] = obj[i];
                }
            }
        }
    }

    return cloned;
}

utils.keys = Object.keys || function (obj) {

        if (!isObject(obj)) {
            return [];
        }

        var keys = [];
        for (var key in obj) {
            if (hasKey(obj, key)) {
                keys.push(key);
            }
        }

        // ie < 9 不考虑
    };

utils.hasKey = hasKey;
utils.clone = clone;

utils.getValue = function (obj, key, defaultValue) {
    var value = obj ? obj[key] : null;

    if (isNullOrUndefined(value)) {
        value = defaultValue;
    }

    return value;
};

utils.getNumber = function (obj, key, defaultValue) {
    var value = obj ? obj[key] : null;

    if (isNullOrUndefined(value)) {
        value = defaultValue || 0;
    }

    return Number(value);
};

utils.extend = function (dist) {
    each(slice.call(arguments, 1), function (source) {
        if (source) {
            for (var prop in source) {
                dist[prop] = source[prop];
            }
        }
    });
    return dist;
};

utils.equalEntries = function (a, b) {
    if ((a == null && b != null) || (a != null && b == null) ||
        (a != null && b != null && a.length != b.length)) {
        return false;
    }
    else if (a && b) {
        for (var key in a) {
            if ((!isNaN(a[key]) || !isNaN(b[key])) && a[key] != b[key]) {
                return false;
            }
        }
    }

    return true;
};

utils.equalPoints = function (points1, points2) {
    if ((!points1 && points2) || (points1 && !points2) ||
        (points1 && points2 && points1.length !== points2.length)) {
        return false;
    } else if (points1 && points2) {
        for (var i = 0; i < points1.length; i++) {
            var p1 = points1[i];
            var p2 = points2[i];

            if ((!p1 && p2) || (p1 && !p2) || (p1 && p2 && !p1.equal(p2))) {
                return false;
            }
        }
    }

    return true;
};

// Array
// -----

utils.indexOf = arrProto.indexOf ?
    function (arr, item) {
        return arr.indexOf(item);
    } :
    function (arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

var each = utils.each = function (list, iteratee, context) {
    var i;

    if (isArrayLike(list)) {
        var length = list.length;
        for (i = 0; i < length; i++) {
            iteratee.call(context, list[i], i, list);
        }
    } else {
        for (i in list) {
            if (hasKey(list, i)) {
                iteratee.call(context, list[i], i, list);
            }
        }
    }

    return list;
};

utils.toArray = function (obj) {
    return isArrayLike(obj) ? slice.call(obj) : [];
};


// Function
// --------

utils.invoke = function (method, args, context) {
    if (!method || !isFunction(method)) {
        return;
    }

    args = isArray(args) ? args : args ? [args] : [];

    var ret;
    var a1 = args[0];
    var a2 = args[1];
    var a3 = args[2];

    // call is faster than apply, optimize less than 3 argu
    // http://blog.csdn.net/zhengyinhui100/article/details/7837127
    switch (args.length) {
        case 0:
            ret = method.call(context);
            break;
        case 1:
            ret = method.call(context, a1);
            break;
        case 2:
            ret = method.call(context, a1, a2);
            break;
        case 3:
            ret = method.call(context, a1, a2, a3);
            break;
        default:
            ret = method.apply(context, args);
            break;
    }

    return ret;
};

utils.getFunctionName = function (fn) {
    var str = '';

    if (!isNullOrUndefined(fn)) {
        if (!isNullOrUndefined(fn.name)) {
            str = fn.name;
        } else {

            var tmp = fn.toString();
            var idx1 = 9;

            while (tmp.charAt(idx1) === ' ') {
                idx1++;
            }

            var idx2 = tmp.indexOf('(', idx1);
            str = tmp.substring(idx1, idx2);
        }
    }

    return str;
};

// BOW
// ---
utils.isNode = function (node, nodeName, attributeName, attributeValue) {

    var ret = node && !isNaN(node.nodeType);

    if (ret) {
        ret = isNullOrUndefined(nodeName) || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }

    if (ret) {
        ret = isNullOrUndefined(attributeName) || node.getAttribute(attributeName) === attributeValue;
    }

    return ret;
};

utils.createSvgGroup = function () {};

utils.write = function (parent, text) {

    var node = null;

    if (parent) {
        var doc = parent.ownerDocument;

        node = doc.createTextNode(text);
        parent.appendChild(node);
    }

    return node;
};

//
utils.getBaseUrl = function () {
    var href = window.location.href;
    var hash = href.lastIndexOf('#');

    if (hash > 0) {
        href = href.substring(0, hash);
    }

    return href;
};

utils.toRadians = function (deg) {
    return Math.PI * deg / 180;
};

module.exports = utils;


});



define('PaneJS/enums/align',['require','exports','module'],function (require, exports, module) {module.exports = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom'
};

});
define('PaneJS/enums/arrow',['require','exports','module'],function (require, exports, module) {module.exports = {
    CLASSIC: 'classic',
    BLOCK: 'block',
    OPEN: 'open',
    OVAL: 'oval',
    DIAMOND: 'diamond',
    DIAMOND_THIN: 'diamondThin'
};

});

define('PaneJS/enums/cursor',['require','exports','module'],function (require, exports, module) {module.exports = {
    MOVABLE_VERTEX: 'move',
    MOVABLE_EDGE: 'move',
    LABEL_HANDLE: 'default',
    TERMINAL_HANDLE: 'pointer',
    BEND_HANDLE: 'crosshair',
    VIRTUAL_BEND_HANDLE: 'crosshair',
    CONNECT: 'pointer'
};

});
define('PaneJS/enums/direction',['require','exports','module'],function (require, exports, module) {module.exports = {
    NORTH: 'north',
    SOUTH: 'south',
    EAST: 'east',
    WEST: 'west'
};

});
define('PaneJS/enums/directionMask',['require','exports','module'],function (require, exports, module) {module.exports = {
    NONE: 0,
    WEST: 1,
    NORTH: 2,
    SOUTH: 4,
    EAST: 8,
    ALL: 15
};

});
define('PaneJS/enums/fontStyle',['require','exports','module'],function (require, exports, module) {module.exports = {
    BOLD: 1,
    ITALIC: 2,
    UNDERLINE: 4,
    SHADOW: 8
};

});
define('PaneJS/enums/nodeType',['require','exports','module'],function (require, exports, module) {module.exports = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENTTYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};

});
define('PaneJS/enums/shapeNames',['require','exports','module'],function (require, exports, module) {module.exports = {
    RECTANGLE: 'rectangle',
    ELLIPSE: 'ellipse',
    DOUBLE_ELLIPSE: 'doubleEllipse',
    RHOMBUS: 'rhombus',
    LINE: 'line',
    IMAGE: 'image',
    ARROW: 'arrow',
    LABEL: 'label',
    CYLINDER: 'cylinder',
    SWIMLANE: 'swimlane',
    CONNECTOR: 'connector',
    ACTOR: 'actor',
    CLOUD: 'cloud',
    TRIANGLE: 'triangle',
    HEXAGON: 'hexagon'
};

});
define('PaneJS/enums/styleNames',['require','exports','module'],function (require, exports, module) {module.exports = {
    SHAPE: 'shape',
    PERIMETER: 'perimeter',

    SOURCE_PORT: 'sourcePort',
    TARGET_PORT: 'targetPort',
    PORT_CONSTRAINT: 'portConstraint',
    PORT_CONSTRAINT_ROTATION: 'portConstraintRotation',

    OPACITY: 'opacity',
    TEXT_OPACITY: 'textOpacity',
    OVERFLOW: 'overflow',
    ORTHOGONAL: 'orthogonal',
    EXIT_X: 'exitX',
    EXIT_Y: 'exitY',
    EXIT_PERIMETER: 'exitPerimeter',
    ENTRY_X: 'entryX',
    ENTRY_Y: 'entryY',
    ENTRY_PERIMETER: 'entryPerimeter',
    WHITE_SPACE: 'whiteSpace',
    ROTATION: 'rotation',
    FILL_COLOR: 'fillColor',
    SWIMLANE_FILL_COLOR: 'swimlaneFillColor',
    MARGIN: 'margin',
    GRADIENT_COLOR: 'gradientColor',
    GRADIENT_DIRECTION: 'gradientDirection',
    STROKE_COLOR: 'strokeColor',
    SEPARATOR_COLOR: 'separatorColor',
    STROKE_WIDTH: 'strokeWidth',
    ALIGN: 'align',
    VERTICAL_ALIGN: 'verticalAlign',
    LABEL_WIDTH: 'labelWidth',
    LABEL_POSITION: 'labelPosition',
    VERTICAL_LABEL_POSITION: 'verticalLabelPosition',
    IMAGE_ASPECT: 'imageAspect',
    IMAGE_ALIGN: 'imageAlign',
    IMAGE_VERTICAL_ALIGN: 'imageVerticalAlign',
    GLASS: 'glass',
    IMAGE: 'image',
    IMAGE_WIDTH: 'imageWidth',
    IMAGE_HEIGHT: 'imageHeight',
    IMAGE_BACKGROUND: 'imageBackground',
    IMAGE_BORDER: 'imageBorder',
    FLIPH: 'flipH',
    FLIPV: 'flipV',
    NO_LABEL: 'noLabel',
    NO_EDGE_STYLE: 'noEdgeStyle',

    LABEL_BACKGROUND_COLOR: 'labelBackgroundColor',
    LABEL_BORDER_COLOR: 'labelBorderColor',
    LABEL_PADDING: 'labelPadding',

    INDICATOR_SHAPE: 'indicatorShape',
    INDICATOR_IMAGE: 'indicatorImage',
    INDICATOR_COLOR: 'indicatorColor',
    INDICATOR_STROKE_COLOR: 'indicatorStrokeColor',
    INDICATOR_GRADIENT_COLOR: 'indicatorGradientColor',
    INDICATOR_SPACING: 'indicatorSpacing',
    INDICATOR_WIDTH: 'indicatorWidth',
    INDICATOR_HEIGHT: 'indicatorHeight',
    INDICATOR_DIRECTION: 'indicatorDirection',

    SHADOW: 'shadow',
    SEGMENT: 'segment',
    END_ARROW: 'endArrow',
    START_ARROW: 'startArrow',
    END_SIZE: 'endSize',
    START_SIZE: 'startSize',
    SWIMLANE_LINE: 'swimlaneLine',
    END_FILL: 'endFill',
    START_FILL: 'startFill',
    DASHED: 'dashed',
    DASH_PATTERN: 'dashPattern',
    ROUNDED: 'rounded',
    CURVED: 'curved',
    ARCSIZE: 'arcSize',
    SMOOTH: 'smooth',
    SOURCE_PERIMETER_SPACING: 'sourcePerimeterSpacing',
    TARGET_PERIMETER_SPACING: 'targetPerimeterSpacing',
    PERIMETER_SPACING: 'perimeterSpacing',
    SPACING: 'spacing',
    SPACING_TOP: 'spacingTop',
    SPACING_LEFT: 'spacingLeft',
    SPACING_BOTTOM: 'spacingBottom',
    SPACING_RIGHT: 'spacingRight',
    HORIZONTAL: 'horizontal',
    DIRECTION: 'direction',
    ELBOW: 'elbow',
    FONTCOLOR: 'fontColor',
    FONTFAMILY: 'fontFamily',
    FONTSIZE: 'fontSize',
    FONTSTYLE: 'fontStyle',
    ASPECT: 'aspect',
    AUTOSIZE: 'autosize',
    FOLDABLE: 'foldable',
    EDITABLE: 'editable',
    BENDABLE: 'bendable',
    MOVABLE: 'movable',
    RESIZABLE: 'resizable',
    ROTATABLE: 'rotatable',
    CLONEABLE: 'cloneable',
    DELETABLE: 'deletable',
    EDGE: 'edgeStyle',
    LOOP: 'loopStyle',
    ROUTING_CENTER_X: 'routingCenterX',
    ROUTING_CENTER_Y: 'routingCenterY'
};

});
define('PaneJS/perimeter',['require','exports','module'],function (require, exports, module) {module.exports =
{
    RectanglePerimeter: function (bounds, vertex, next, orthogonal) {
        var cx = bounds.getCenterX();
        var cy = bounds.getCenterY();
        var dx = next.x - cx;
        var dy = next.y - cy;
        var alpha = Math.atan2(dy, dx);
        var p = new mxPoint(0, 0);
        var pi = Math.PI;
        var pi2 = Math.PI / 2;
        var beta = pi2 - alpha;
        var t = Math.atan2(bounds.height, bounds.width);

        if (alpha < -pi + t || alpha > pi - t) {
            // Left edge
            p.x = bounds.x;
            p.y = cy - bounds.width * Math.tan(alpha) / 2;
        }
        else if (alpha < -t) {
            // Top Edge
            p.y = bounds.y;
            p.x = cx - bounds.height * Math.tan(beta) / 2;
        }
        else if (alpha < t) {
            // Right Edge
            p.x = bounds.x + bounds.width;
            p.y = cy + bounds.width * Math.tan(alpha) / 2;
        }
        else {
            // Bottom Edge
            p.y = bounds.y + bounds.height;
            p.x = cx + bounds.height * Math.tan(beta) / 2;
        }

        if (orthogonal) {
            if (next.x >= bounds.x &&
                next.x <= bounds.x + bounds.width) {
                p.x = next.x;
            }
            else if (next.y >= bounds.y &&
                next.y <= bounds.y + bounds.height) {
                p.y = next.y;
            }
            if (next.x < bounds.x) {
                p.x = bounds.x;
            }
            else if (next.x > bounds.x + bounds.width) {
                p.x = bounds.x + bounds.width;
            }
            if (next.y < bounds.y) {
                p.y = bounds.y;
            }
            else if (next.y > bounds.y + bounds.height) {
                p.y = bounds.y + bounds.height;
            }
        }

        return p;
    },
    EllipsePerimeter: function (bounds, vertex, next, orthogonal) {
        var x = bounds.x;
        var y = bounds.y;
        var a = bounds.width / 2;
        var b = bounds.height / 2;
        var cx = x + a;
        var cy = y + b;
        var px = next.x;
        var py = next.y;

        // Calculates straight line equation through
        // point and ellipse center y = d * x + h
        var dx = parseInt(px - cx);
        var dy = parseInt(py - cy);

        if (dx == 0 && dy != 0) {
            return new mxPoint(cx, cy + b * dy / Math.abs(dy));
        }
        else if (dx == 0 && dy == 0) {
            return new mxPoint(px, py);
        }

        if (orthogonal) {
            if (py >= y && py <= y + bounds.height) {
                var ty = py - cy;
                var tx = Math.sqrt(a * a * (1 - (ty * ty) / (b * b))) || 0;

                if (px <= x) {
                    tx = -tx;
                }

                return new mxPoint(cx + tx, py);
            }

            if (px >= x && px <= x + bounds.width) {
                var tx = px - cx;
                var ty = Math.sqrt(b * b * (1 - (tx * tx) / (a * a))) || 0;

                if (py <= y) {
                    ty = -ty;
                }

                return new mxPoint(px, cy + ty);
            }
        }

        // Calculates intersection
        var d = dy / dx;
        var h = cy - d * cx;
        var e = a * a * d * d + b * b;
        var f = -2 * cx * e;
        var g = a * a * d * d * cx * cx +
            b * b * cx * cx -
            a * a * b * b;
        var det = Math.sqrt(f * f - 4 * e * g);

        // Two solutions (perimeter points)
        var xout1 = (-f + det) / (2 * e);
        var xout2 = (-f - det) / (2 * e);
        var yout1 = d * xout1 + h;
        var yout2 = d * xout2 + h;
        var dist1 = Math.sqrt(Math.pow((xout1 - px), 2)
            + Math.pow((yout1 - py), 2));
        var dist2 = Math.sqrt(Math.pow((xout2 - px), 2)
            + Math.pow((yout2 - py), 2));

        // Correct solution
        var xout = 0;
        var yout = 0;

        if (dist1 < dist2) {
            xout = xout1;
            yout = yout1;
        }
        else {
            xout = xout2;
            yout = yout2;
        }

        return new mxPoint(xout, yout);
    },
    RhombusPerimeter: function (bounds, vertex, next, orthogonal) {
        var x = bounds.x;
        var y = bounds.y;
        var w = bounds.width;
        var h = bounds.height;

        var cx = x + w / 2;
        var cy = y + h / 2;

        var px = next.x;
        var py = next.y;

        // Special case for intersecting the diamond's corners
        if (cx == px) {
            if (cy > py) {
                return new mxPoint(cx, y); // top
            }
            else {
                return new mxPoint(cx, y + h); // bottom
            }
        }
        else if (cy == py) {
            if (cx > px) {
                return new mxPoint(x, cy); // left
            }
            else {
                return new mxPoint(x + w, cy); // right
            }
        }

        var tx = cx;
        var ty = cy;

        if (orthogonal) {
            if (px >= x && px <= x + w) {
                tx = px;
            }
            else if (py >= y && py <= y + h) {
                ty = py;
            }
        }

        // In which quadrant will the intersection be?
        // set the slope and offset of the border line accordingly
        if (px < cx) {
            if (py < cy) {
                return mxUtils.intersection(px, py, tx, ty, cx, y, x, cy);
            }
            else {
                return mxUtils.intersection(px, py, tx, ty, cx, y + h, x, cy);
            }
        }
        else if (py < cy) {
            return mxUtils.intersection(px, py, tx, ty, cx, y, x + w, cy);
        }
        else {
            return mxUtils.intersection(px, py, tx, ty, cx, y + h, x + w, cy);
        }
    },
    TrianglePerimeter: function (bounds, vertex, next, orthogonal) {
        var direction = (vertex != null) ?
            vertex.style[mxConstants.STYLE_DIRECTION] : null;
        var vertical = direction == mxConstants.DIRECTION_NORTH ||
            direction == mxConstants.DIRECTION_SOUTH;

        var x = bounds.x;
        var y = bounds.y;
        var w = bounds.width;
        var h = bounds.height;

        var cx = x + w / 2;
        var cy = y + h / 2;

        var start = new mxPoint(x, y);
        var corner = new mxPoint(x + w, cy);
        var end = new mxPoint(x, y + h);

        if (direction == mxConstants.DIRECTION_NORTH) {
            start = end;
            corner = new mxPoint(cx, y);
            end = new mxPoint(x + w, y + h);
        }
        else if (direction == mxConstants.DIRECTION_SOUTH) {
            corner = new mxPoint(cx, y + h);
            end = new mxPoint(x + w, y);
        }
        else if (direction == mxConstants.DIRECTION_WEST) {
            start = new mxPoint(x + w, y);
            corner = new mxPoint(x, cy);
            end = new mxPoint(x + w, y + h);
        }

        var dx = next.x - cx;
        var dy = next.y - cy;

        var alpha = (vertical) ? Math.atan2(dx, dy) : Math.atan2(dy, dx);
        var t = (vertical) ? Math.atan2(w, h) : Math.atan2(h, w);

        var base = false;

        if (direction == mxConstants.DIRECTION_NORTH ||
            direction == mxConstants.DIRECTION_WEST) {
            base = alpha > -t && alpha < t;
        }
        else {
            base = alpha < -Math.PI + t || alpha > Math.PI - t;
        }

        var result = null;

        if (base) {
            if (orthogonal && ((vertical && next.x >= start.x && next.x <= end.x) ||
                (!vertical && next.y >= start.y && next.y <= end.y))) {
                if (vertical) {
                    result = new mxPoint(next.x, start.y);
                }
                else {
                    result = new mxPoint(start.x, next.y);
                }
            }
            else {
                if (direction == mxConstants.DIRECTION_NORTH) {
                    result = new mxPoint(x + w / 2 + h * Math.tan(alpha) / 2,
                        y + h);
                }
                else if (direction == mxConstants.DIRECTION_SOUTH) {
                    result = new mxPoint(x + w / 2 - h * Math.tan(alpha) / 2,
                        y);
                }
                else if (direction == mxConstants.DIRECTION_WEST) {
                    result = new mxPoint(x + w, y + h / 2 +
                        w * Math.tan(alpha) / 2);
                }
                else {
                    result = new mxPoint(x, y + h / 2 -
                        w * Math.tan(alpha) / 2);
                }
            }
        }
        else {
            if (orthogonal) {
                var pt = new mxPoint(cx, cy);

                if (next.y >= y && next.y <= y + h) {
                    pt.x = (vertical) ? cx : (
                        (direction == mxConstants.DIRECTION_WEST) ?
                        x + w : x);
                    pt.y = next.y;
                }
                else if (next.x >= x && next.x <= x + w) {
                    pt.x = next.x;
                    pt.y = (!vertical) ? cy : (
                        (direction == mxConstants.DIRECTION_NORTH) ?
                        y + h : y);
                }

                // Compute angle
                dx = next.x - pt.x;
                dy = next.y - pt.y;

                cx = pt.x;
                cy = pt.y;
            }

            if ((vertical && next.x <= x + w / 2) ||
                (!vertical && next.y <= y + h / 2)) {
                result = mxUtils.intersection(next.x, next.y, cx, cy,
                    start.x, start.y, corner.x, corner.y);
            }
            else {
                result = mxUtils.intersection(next.x, next.y, cx, cy,
                    corner.x, corner.y, end.x, end.y);
            }
        }

        if (result == null) {
            result = new mxPoint(cx, cy);
        }

        return result;
    },
    HexagonPerimeter: function (bounds, vertex, next, orthogonal) {
        var x = bounds.x;
        var y = bounds.y;
        var w = bounds.width;
        var h = bounds.height;

        var cx = bounds.getCenterX();
        var cy = bounds.getCenterY();
        var px = next.x;
        var py = next.y;
        var dx = px - cx;
        var dy = py - cy;
        var alpha = -Math.atan2(dy, dx);
        var pi = Math.PI;
        var pi2 = Math.PI / 2;

        var result = new mxPoint(cx, cy);

        var direction = (vertex != null) ? mxUtils.getValue(
            vertex.style, mxConstants.STYLE_DIRECTION,
            mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
        var vertical = direction == mxConstants.DIRECTION_NORTH
            || direction == mxConstants.DIRECTION_SOUTH;
        var a = new mxPoint();
        var b = new mxPoint();

        //Only consider corrects quadrants for the orthogonal case.
        if ((px < x) && (py < y) || (px < x) && (py > y + h)
            || (px > x + w) && (py < y) || (px > x + w) && (py > y + h)) {
            orthogonal = false;
        }

        if (orthogonal) {
            if (vertical) {
                //Special cases where intersects with hexagon corners
                if (px == cx) {
                    if (py <= y) {
                        return new mxPoint(cx, y);
                    }
                    else if (py >= y + h) {
                        return new mxPoint(cx, y + h);
                    }
                }
                else if (px < x) {
                    if (py == y + h / 4) {
                        return new mxPoint(x, y + h / 4);
                    }
                    else if (py == y + 3 * h / 4) {
                        return new mxPoint(x, y + 3 * h / 4);
                    }
                }
                else if (px > x + w) {
                    if (py == y + h / 4) {
                        return new mxPoint(x + w, y + h / 4);
                    }
                    else if (py == y + 3 * h / 4) {
                        return new mxPoint(x + w, y + 3 * h / 4);
                    }
                }
                else if (px == x) {
                    if (py < cy) {
                        return new mxPoint(x, y + h / 4);
                    }
                    else if (py > cy) {
                        return new mxPoint(x, y + 3 * h / 4);
                    }
                }
                else if (px == x + w) {
                    if (py < cy) {
                        return new mxPoint(x + w, y + h / 4);
                    }
                    else if (py > cy) {
                        return new mxPoint(x + w, y + 3 * h / 4);
                    }
                }
                if (py == y) {
                    return new mxPoint(cx, y);
                }
                else if (py == y + h) {
                    return new mxPoint(cx, y + h);
                }

                if (px < cx) {
                    if ((py > y + h / 4) && (py < y + 3 * h / 4)) {
                        a = new mxPoint(x, y);
                        b = new mxPoint(x, y + h);
                    }
                    else if (py < y + h / 4) {
                        a = new mxPoint(x - Math.floor(0.5 * w), y
                            + Math.floor(0.5 * h));
                        b = new mxPoint(x + w, y - Math.floor(0.25 * h));
                    }
                    else if (py > y + 3 * h / 4) {
                        a = new mxPoint(x - Math.floor(0.5 * w), y
                            + Math.floor(0.5 * h));
                        b = new mxPoint(x + w, y + Math.floor(1.25 * h));
                    }
                }
                else if (px > cx) {
                    if ((py > y + h / 4) && (py < y + 3 * h / 4)) {
                        a = new mxPoint(x + w, y);
                        b = new mxPoint(x + w, y + h);
                    }
                    else if (py < y + h / 4) {
                        a = new mxPoint(x, y - Math.floor(0.25 * h));
                        b = new mxPoint(x + Math.floor(1.5 * w), y
                            + Math.floor(0.5 * h));
                    }
                    else if (py > y + 3 * h / 4) {
                        a = new mxPoint(x + Math.floor(1.5 * w), y
                            + Math.floor(0.5 * h));
                        b = new mxPoint(x, y + Math.floor(1.25 * h));
                    }
                }

            }
            else {
                //Special cases where intersects with hexagon corners
                if (py == cy) {
                    if (px <= x) {
                        return new mxPoint(x, y + h / 2);
                    }
                    else if (px >= x + w) {
                        return new mxPoint(x + w, y + h / 2);
                    }
                }
                else if (py < y) {
                    if (px == x + w / 4) {
                        return new mxPoint(x + w / 4, y);
                    }
                    else if (px == x + 3 * w / 4) {
                        return new mxPoint(x + 3 * w / 4, y);
                    }
                }
                else if (py > y + h) {
                    if (px == x + w / 4) {
                        return new mxPoint(x + w / 4, y + h);
                    }
                    else if (px == x + 3 * w / 4) {
                        return new mxPoint(x + 3 * w / 4, y + h);
                    }
                }
                else if (py == y) {
                    if (px < cx) {
                        return new mxPoint(x + w / 4, y);
                    }
                    else if (px > cx) {
                        return new mxPoint(x + 3 * w / 4, y);
                    }
                }
                else if (py == y + h) {
                    if (px < cx) {
                        return new mxPoint(x + w / 4, y + h);
                    }
                    else if (py > cy) {
                        return new mxPoint(x + 3 * w / 4, y + h);
                    }
                }
                if (px == x) {
                    return new mxPoint(x, cy);
                }
                else if (px == x + w) {
                    return new mxPoint(x + w, cy);
                }

                if (py < cy) {
                    if ((px > x + w / 4) && (px < x + 3 * w / 4)) {
                        a = new mxPoint(x, y);
                        b = new mxPoint(x + w, y);
                    }
                    else if (px < x + w / 4) {
                        a = new mxPoint(x - Math.floor(0.25 * w), y + h);
                        b = new mxPoint(x + Math.floor(0.5 * w), y
                            - Math.floor(0.5 * h));
                    }
                    else if (px > x + 3 * w / 4) {
                        a = new mxPoint(x + Math.floor(0.5 * w), y
                            - Math.floor(0.5 * h));
                        b = new mxPoint(x + Math.floor(1.25 * w), y + h);
                    }
                }
                else if (py > cy) {
                    if ((px > x + w / 4) && (px < x + 3 * w / 4)) {
                        a = new mxPoint(x, y + h);
                        b = new mxPoint(x + w, y + h);
                    }
                    else if (px < x + w / 4) {
                        a = new mxPoint(x - Math.floor(0.25 * w), y);
                        b = new mxPoint(x + Math.floor(0.5 * w), y
                            + Math.floor(1.5 * h));
                    }
                    else if (px > x + 3 * w / 4) {
                        a = new mxPoint(x + Math.floor(0.5 * w), y
                            + Math.floor(1.5 * h));
                        b = new mxPoint(x + Math.floor(1.25 * w), y);
                    }
                }
            }

            var tx = cx;
            var ty = cy;

            if (px >= x && px <= x + w) {
                tx = px;

                if (py < cy) {
                    ty = y + h;
                }
                else {
                    ty = y;
                }
            }
            else if (py >= y && py <= y + h) {
                ty = py;

                if (px < cx) {
                    tx = x + w;
                }
                else {
                    tx = x;
                }
            }

            result = mxUtils.intersection(tx, ty, next.x, next.y, a.x, a.y, b.x, b.y);
        }
        else {
            if (vertical) {
                var beta = Math.atan2(h / 4, w / 2);

                //Special cases where intersects with hexagon corners
                if (alpha == beta) {
                    return new mxPoint(x + w, y + Math.floor(0.25 * h));
                }
                else if (alpha == pi2) {
                    return new mxPoint(x + Math.floor(0.5 * w), y);
                }
                else if (alpha == (pi - beta)) {
                    return new mxPoint(x, y + Math.floor(0.25 * h));
                }
                else if (alpha == -beta) {
                    return new mxPoint(x + w, y + Math.floor(0.75 * h));
                }
                else if (alpha == (-pi2)) {
                    return new mxPoint(x + Math.floor(0.5 * w), y + h);
                }
                else if (alpha == (-pi + beta)) {
                    return new mxPoint(x, y + Math.floor(0.75 * h));
                }

                if ((alpha < beta) && (alpha > -beta)) {
                    a = new mxPoint(x + w, y);
                    b = new mxPoint(x + w, y + h);
                }
                else if ((alpha > beta) && (alpha < pi2)) {
                    a = new mxPoint(x, y - Math.floor(0.25 * h));
                    b = new mxPoint(x + Math.floor(1.5 * w), y
                        + Math.floor(0.5 * h));
                }
                else if ((alpha > pi2) && (alpha < (pi - beta))) {
                    a = new mxPoint(x - Math.floor(0.5 * w), y
                        + Math.floor(0.5 * h));
                    b = new mxPoint(x + w, y - Math.floor(0.25 * h));
                }
                else if (((alpha > (pi - beta)) && (alpha <= pi))
                    || ((alpha < (-pi + beta)) && (alpha >= -pi))) {
                    a = new mxPoint(x, y);
                    b = new mxPoint(x, y + h);
                }
                else if ((alpha < -beta) && (alpha > -pi2)) {
                    a = new mxPoint(x + Math.floor(1.5 * w), y
                        + Math.floor(0.5 * h));
                    b = new mxPoint(x, y + Math.floor(1.25 * h));
                }
                else if ((alpha < -pi2) && (alpha > (-pi + beta))) {
                    a = new mxPoint(x - Math.floor(0.5 * w), y
                        + Math.floor(0.5 * h));
                    b = new mxPoint(x + w, y + Math.floor(1.25 * h));
                }
            }
            else {
                var beta = Math.atan2(h / 2, w / 4);

                //Special cases where intersects with hexagon corners
                if (alpha == beta) {
                    return new mxPoint(x + Math.floor(0.75 * w), y);
                }
                else if (alpha == (pi - beta)) {
                    return new mxPoint(x + Math.floor(0.25 * w), y);
                }
                else if ((alpha == pi) || (alpha == -pi)) {
                    return new mxPoint(x, y + Math.floor(0.5 * h));
                }
                else if (alpha == 0) {
                    return new mxPoint(x + w, y + Math.floor(0.5 * h));
                }
                else if (alpha == -beta) {
                    return new mxPoint(x + Math.floor(0.75 * w), y + h);
                }
                else if (alpha == (-pi + beta)) {
                    return new mxPoint(x + Math.floor(0.25 * w), y + h);
                }

                if ((alpha > 0) && (alpha < beta)) {
                    a = new mxPoint(x + Math.floor(0.5 * w), y
                        - Math.floor(0.5 * h));
                    b = new mxPoint(x + Math.floor(1.25 * w), y + h);
                }
                else if ((alpha > beta) && (alpha < (pi - beta))) {
                    a = new mxPoint(x, y);
                    b = new mxPoint(x + w, y);
                }
                else if ((alpha > (pi - beta)) && (alpha < pi)) {
                    a = new mxPoint(x - Math.floor(0.25 * w), y + h);
                    b = new mxPoint(x + Math.floor(0.5 * w), y
                        - Math.floor(0.5 * h));
                }
                else if ((alpha < 0) && (alpha > -beta)) {
                    a = new mxPoint(x + Math.floor(0.5 * w), y
                        + Math.floor(1.5 * h));
                    b = new mxPoint(x + Math.floor(1.25 * w), y);
                }
                else if ((alpha < -beta) && (alpha > (-pi + beta))) {
                    a = new mxPoint(x, y + h);
                    b = new mxPoint(x + w, y + h);
                }
                else if ((alpha < (-pi + beta)) && (alpha > -pi)) {
                    a = new mxPoint(x - Math.floor(0.25 * w), y);
                    b = new mxPoint(x + Math.floor(0.5 * w), y
                        + Math.floor(1.5 * h));
                }
            }

            result = mxUtils.intersection(cx, cy, next.x, next.y, a.x, a.y, b.x, b.y);
        }

        if (result == null) {
            return new mxPoint(cx, cy);
        }

        return result;
    }
};


});





define('PaneJS/utils/lang',['require','exports','module'],function (require, exports, module) {var arrProto = Array.prototype;
var objProto = Object.prototype;
var slice = arrProto.slice;
var toString = objProto.toString;


var isType = exports.isType = function (obj, type) {
    return toString.call(obj) === '[object ' + type + ']';
};

exports.isObject = function (obj) {

    if (!obj) {
        return false;
    }

    var type = typeof obj;

    return type === 'function' || type === 'object';
};

exports.isFunction = function (obj) {
    return isType(obj, 'Function');
};

var isNull = exports.isNull = function (obj) {
    return obj === null;
};

var isUndefined = exports.isUndefined = function (obj) {
    return typeof obj === 'undefined';
};

exports.isNullOrUndefined = function (obj) {
    return isUndefined(obj) || isNull(obj);
};

exports.isWindow = function (obj) {
    return obj && obj === obj.window;
};

var isArray = exports.isArray = Array.isArray || function (obj) {
        return isType(obj, 'Array');
    };

exports.isArrayLike = function (obj) {
    if (isArray(obj)) {
        return true;
    }

    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    var length = !!obj && 'length' in obj && obj.length;

    return length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
};

exports.isNumeric = function (obj) {
    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
};

});


define('PaneJS/common/class',['require','exports','module','./utils'],function (require, exports, module) {
/* jshint node: true, loopfunc: true, undef: true, unused: true */
// ref: https://github.com/aralejs/class
/*jshint -W030 */

var utils = require('./utils');

var each = utils.each;
var hasKey = utils.hasKey;
var isArray = utils.isArray;
var isFunction = utils.isFunction;

function Class(o) {
    // Convert existed function to Class.
    if (!(this instanceof Class) && isFunction(o)) {
        return classify(o);
    }
}

Class.create = function (parent, properties) {
    if (!isFunction(parent)) {
        properties = parent;
        parent = null;
    }

    properties || (properties = {});
    parent || (parent = properties.Extends || Class);
    properties.Extends = parent;

    // The created class constructor.
    //function SubClass() {
    //    // Call the parent constructor.
    //    parent.apply(this, arguments);
    //
    //    // Only call initialize in self constructor.
    //    if (this.constructor === SubClass && this.initialize) {
    //        this.initialize.apply(this, arguments);
    //    }
    //}

    var SubClass = properties.constructor;
    // unspecified constructor
    if (SubClass === Object.prototype.constructor) {
        SubClass = function Class() {};
    }

    // Inherit class (static) properties from parent.
    if (parent !== Class) {
        mix(SubClass, parent, parent.StaticsWhiteList);
    }

    // Add instance properties to the subclass.
    implement.call(SubClass, properties);

    // Make subclass extendable.
    return classify(SubClass);
};

// Create a sub Class based on `Class`.
Class.extend = function (properties) {
    properties || (properties = {});
    properties.Extends = this;

    return Class.create(properties);
};

// define special properties.
Class.Mutators = {

    'Extends': function (parent) {
        var existed = this.prototype;
        var parentProto = parent.prototype;
        var proto = createProto(parentProto);

        // Keep existed properties.
        mix(proto, existed);

        // Enforce the constructor to be what we expect.
        proto.constructor = this;

        // Set the prototype chain to inherit from `parent`.
        this.prototype = proto;

        // Set a convenience property in case the parent's prototype is
        // needed later.
        this.superclass = parentProto;
    },

    'Implements': function (items) {

        if (!isArray(items)) {
            items = [items];
        }

        var proto = this.prototype;
        var item;

        while (item = items.shift()) {
            mix(proto, item.prototype || item);
        }
    },

    'Statics': function (staticProperties) {
        mix(this, staticProperties);
    }
};

function classify(cls) {
    cls.extend = Class.extend;
    cls.implement = implement;
    return cls;
}

function implement(properties) {

    var that = this;
    var mutators = Class.Mutators;

    each(properties, function (value, key) {
        if (hasKey(mutators, key)) {
            mutators[key].call(that, value);
        } else {
            that.prototype[key] = value;
        }
    });
}


// Helpers
// -------

var createProto = Object.__proto__ ?
    function (proto) {
        return {__proto__: proto};
    } :
    function (proto) {
        function Ctor() {}

        Ctor.prototype = proto;
        return new Ctor();
    };

function mix(receiver, supplier, whiteList) {

    each(supplier, function (value, key) {
        if (whiteList && indexOf(whiteList, key) === -1) {
            return;
        }

        receiver[key] = value;
    });
}

module.exports = Class;


});
define('PaneJS/common/objectIdentity',['require','exports','module','./utils'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global window */

var utils = require('./utils');

var isObject = utils.isObject;
var isNullOrUndefined = utils.isNullOrUndefined;
var getFunctionName = utils.getFunctionName;

// TODO: constants
var FIELD_NAME = 'objectId';
var counter = 0;


exports.get = function (obj) {

    var isObj = isObject(obj);

    if (isObj && isNullOrUndefined(obj[FIELD_NAME])) {
        var ctorName = getFunctionName(obj.constructor);
        obj[FIELD_NAME] = ctorName + '#' + counter++;
    }

    return isObj ? obj[FIELD_NAME] : '' + obj;
};

exports.clear = function (obj) {
    if (isObject(obj)) {
        delete obj[FIELD_NAME];
    }
};

});
define('PaneJS/events/aspect',['require','exports','module','../common/utils'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var utils = require('../common/utils');

var isFunction = utils.isFunction;
var each = utils.each;
var invoke = utils.invoke;
var toArray = utils.toArray;
// TODO: constants
var eventSplitter = /\s+/;


function weave(when, methodName, callback, context) {
    var that = this;
    var names = methodName.split(eventSplitter);

    each(names, function (name) {
        var method = that[name];

        if (!method || !isFunction(method)) {
            throw new Error('Event handler must be function, event name: ' + name);
        }

        if (!method.__isAspected) {
            wrap.call(that, name);
        }

        that.on(when + ':' + name, callback, context);
    });

    return that;
}

function wrap(methodName) {
    var that = this;
    var originMethod = that[methodName];

    that[methodName] = function () {
        var that = this;
        var args = toArray(arguments);
        var beforeArgs = ['before:' + methodName].concat(args);

        // prevent if trigger return false
        if (invoke(that.trigger, beforeArgs, that) === false) {
            return;
        }

        // call the origin method.
        var ret = originMethod.apply(this, arguments);
        var afterArgs = ['after:' + methodName, ret].concat(args);
        invoke(that.trigger, afterArgs, that);

        return ret;
    };

    that[methodName].__isAspected = true;
}

exports.before = function (methodName, callback, context) {
    return weave.call(this, 'before', methodName, callback, context);
};

exports.after = function (methodName, callback, context) {
    return weave.call(this, 'after', methodName, callback, context);
};

exports.around = function (methodName, callback, context) {
    weave.call(this, 'before', methodName, callback, context);
    weave.call(this, 'after', methodName, callback, context);
    return this;
};


});
define('PaneJS/Base',['require','exports','module','PaneJS/common/class','PaneJS/common/utils'],function (require, exports, module) {// 全局基类

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');

module.exports = Class.create({
    constructor: function Base() {},

    getSuperclass: function () {
        return this.constructor.superclass;
    },

    destroy: function () {

        var that = this;

        that.destroyed = true;
    }
});

});
define('PaneJS/Point',['require','exports','module','PaneJS/common/class','PaneJS/common/utils'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

var Point = Class.create({

    constructor: function Point(x, y) {
        this.x = !isNullOrUndefined(x) ? x : 0;
        this.y = !isNullOrUndefined(y) ? y : 0;
    },

    equals: function (point) {
        return point &&
            point instanceof Point &&
            point.x === this.x &&
            point.y === this.y;
    },

    clone: function () {
        return new Point(this.x, this.y);
    }
});

module.exports = Point;


});
define('PaneJS/UndoableEdit',['require','exports','module','PaneJS/common/class','PaneJS/common/utils'],function (require, exports, module) {var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function UndoableEdit(source, significant) {

        var that = this;

        that.source = source;
        that.changes = [];
        that.significant = !isNullOrUndefined(significant) ? significant : true;
        that.undone = false;
        that.redone = false;

    },

    isEmpty: function () {
        return this.changes.length === 0;
    },

    isSignificant: function () {
        return this.significant;
    },

    add: function (change) {
        this.changes.push(change);
    },

    notify: function () {},
    die: function () {},
    undo: function () {},
    redo: function () {}
});

});
define('PaneJS/changes/Change',['require','exports','module','../common/class'],function (require, exports, module) {'use strict';

var Class = require('../common/class');

module.exports = Class.create({

    constructor: function Change(model) {
        this.model = model;
    },

    digest: function () { }
});


});
define('PaneJS/common/Dictionary',['require','exports','module','./class','./utils','./objectIdentity'],function (require, exports, module) {'use strict';

var Class = require('./class');
var utils = require('./utils');
var objectIdentity = require('./objectIdentity');

var isObject = utils.isObject;
var keys = utils.keys;
var each = utils.each;

function getId(key) {

    if (isObject(key)) {
        return objectIdentity.get(key);
    }

    return '' + key;
}

module.exports = Class.create({

    constructor: function Dictionary() {
        return this.clear();
    },

    clear: function () {
        var dic = this;

        dic.map = {};

        return dic;
    },

    get: function (key) {
        var id = getId(key);
        return this.map[id];
    },

    set: function (key, value) {

        var map = this.map;
        var id = getId(key);
        var previous = map[id];

        map[id] = value;

        return previous;
    },

    remove: function (key) {

        var map = this.map;
        var id = getId(key);
        var previous = map[id];

        delete map[id];

        return previous;
    },

    getKeys: function () {
        return keys(this.map);
    },

    getValues: function () {

        var result = [];

        each(this.map, function (value) {
            result.push(value);
        });

        return result;
    },

    visit: function (visitor) {

        var dic = this;

        each(dic.map, visitor);

        return dic;
    }
});

});
define('PaneJS/events/EventObject',['require','exports','module','../common/class','../common/utils'],function (require, exports, module) {var Class = require('../common/class');
var utils = require('../common/utils');

var isObject = utils.isObject;
var extend = utils.extend;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function EventObject(name, eventData) {
        var evtObj = this;
        var data = evtObj.data = {};

        evtObj.name = name;
        evtObj.consumed = false;

        isObject(eventData) && extend(data, eventData);
    },

    getName: function () {
        return this.name;
    },

    addData: function (key, value) {

        var evtObj = this;
        var data = evtObj.data;

        if (isObject(key)) {
            extend(data, key);
        } else {
            data[key] = value;
        }

        return evtObj;
    },

    getData: function (key) {
        var data = this.data;
        return isNullOrUndefined(key) ? data : data[key];
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function () {
        this.consumed = true;
    }
});

});
define('PaneJS/Rectangle',['require','exports','module','PaneJS/common/class','PaneJS/Point'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Klass = require('PaneJS/common/class');
var Point = require('PaneJS/Point');

var Rectangle = Klass.create({

    Extends: Point,

    Statics: {
        fromRectangle: function (rect) {
            return new Rectangle(rect.x, rect.y, rect.width, rect.height);
        }
    },

    constructor: function Rectangle(x, y, width, height) {

        var rect = this;

        Rectangle.superclass.constructor.call(rect, x, y);

        rect.width = width ? width : 0;
        rect.height = height ? height : 0;
    },

    setRect: function (x, y, width, height) {

        var rect = this;

        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;

        return rect;
    },

    getCenterX: function () {
        return this.x + this.width / 2;
    },

    getCenterY: function () {
        return this.y + this.height / 2;
    },

    getCenter: function () {
        return new Point(this.getCenterX(), this.getCenterY());
    },

    add: function (rect) {

        if (!rect) {
            return;
        }

        var that = this;
        var minX = Math.min(that.x, rect.x);
        var minY = Math.min(that.y, rect.y);
        var maxX = Math.max(that.x + that.width, rect.x + rect.width);
        var maxY = Math.max(that.y + that.height, rect.y + rect.height);

        that.x = minX;
        that.y = minY;
        that.width = maxX - minX;
        that.height = maxY - minY;

        return that;
    },


    grow: function (amount) {

        var rect = this;

        rect.x -= amount;
        rect.y -= amount;
        rect.width += 2 * amount;
        rect.height += 2 * amount;

        return rect;
    },

    rotate90: function () {

        var rect = this;
        var w = rect.width;
        var h = rect.height;
        var t = (w - h) / 2;

        rect.x += t;
        rect.y -= t;
        rect.width = h;
        rect.height = w;

        return rect;
    },

    equals: function (rect) {

        var that = this;

        return Rectangle.superclass.equals.call(that, rect) &&
            rect instanceof Rectangle &&
            rect.width === that.width &&
            rect.height === that.height;
    },

    clone: function () {
        var rect = this;
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
});

module.exports = Rectangle;


});
define('PaneJS/changes/ChildChange',['require','exports','module','./Change','../common/utils'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Change = require('./Change');
var utils = require('../common/utils');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Change.extend({

    constructor: function ChildChange(model, parent, child, index) {

        var change = this;

        ChildChange.superclass.constructor.call(change, model);

        change.parent = parent;
        change.child = child;
        change.index = index;
        change.previous = parent;
        change.previousIndex = index;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var child = change.child;
        var previous = change.previous;
        var previousIndex = change.previousIndex;

        var oldParent = model.getParent(child);
        var oldIndex = oldParent ? oldParent.getIndex(child) : 0;

        if (previous) {
            change.connect(child, false);
        }

        oldParent = model.parentForCellChanged(child, previous, previousIndex);

        if (previous) {
            change.connect(child, true);
        }

        change.parent = previous;
        change.index = previousIndex;
        change.previous = oldParent;
        change.previousIndex = oldIndex;

        return change;
    },

    connect: function (cell, isConnect) {

        var change = this;
        var model = change.model;

        isConnect = isNullOrUndefined(isConnect) ? true : isConnect;

        var source = cell.getTerminal(true);
        var target = cell.getTerminal(false);

        if (source) {
            if (isConnect) {
                model.terminalForCellChanged(cell, source, true);
            }
            else {
                model.terminalForCellChanged(cell, null, true);
            }
        }

        if (target) {
            if (isConnect) {
                model.terminalForCellChanged(cell, target, false);
            }
            else {
                model.terminalForCellChanged(cell, null, false);
            }
        }

        cell.setTerminal(source, true);
        cell.setTerminal(target, false);

        var childCount = model.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            change.connect(model.getChildAt(cell, i), isConnect);
        }

        return change;
    }
});

});
define('PaneJS/changes/CurrentRootChange',['require','exports','module','./Change'],function (require, exports, module) {'use strict';
var Change = require('./Change');

module.exports = Change.extend({

    constructor: function CurrentRootChange(model, root) {

        var change = this;

        RootChange.superclass.constructor.call(change, model);

        change.root = root;
        change.previous = root;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var previous = change.previous;

        change.root = previous;
        change.previous = model.rootChanged(previous);

        return change;
    }
});


});
define('PaneJS/changes/RootChange',['require','exports','module','./Change'],function (require, exports, module) {'use strict';

var Change = require('./Change');

module.exports = Change.extend({

    constructor: function RootChange(model, root) {

        var change = this;

        RootChange.superclass.constructor.call(change, model);

        change.root = root;
        change.previous = root;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var previous = change.previous;

        change.root = previous;
        change.previous = model.rootChanged(previous);

        return change;
    }
});


});
define('PaneJS/events/Event',['require','exports','module','../common/utils','../common/class','./EventObject'],function (require, exports, module) {var utils = require('../common/utils');
var Class = require('../common/class');
var EventObject = require('./EventObject');

var keys = utils.keys;
var each = utils.each;
// TODO: constants
var eventSplitter = /\s+/;


module.exports = Class.create({

    eventListeners: null,
    eventEnabled: true,
    eventSource: null,

    constructor: function Events() {},

    isEventEnabled: function () {
        return this.eventEnabled;
    },

    setIsEventEnabled: function (enabled) {
        var that = this;
        that.eventEnabled = enabled;
        return that;
    },

    enableEvent: function () {
        return this.setIsEventEnabled(true);
    },

    disableEvent: function () {
        return this.setIsEventEnabled(false);
    },

    getEventSource: function () {
        return this.eventSource;
    },

    setEventSource: function (value) {
        var that = this;
        that.eventSource = value;
        return that;
    },

    on: function (events, callback, context) {

        var that = this;

        if (!callback) {
            return that;
        }

        var listeners = that.eventListeners || (that.eventListeners = {});

        events = events.split(eventSplitter);

        each(events, function (event) {
            var list = listeners[event] || (listeners[event] = []);
            list.push(callback, context);
        });

        return that;
    },

    once: function (events, callback, context) {

        var that = this;
        var cb = function () {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };

        return that.on(events, cb, context);
    },

    off: function (events, callback, context) {

        var that = this;
        var listeners = that.eventListeners;

        // No events.
        if (!listeners) {
            return that;
        }

        // removing *all* events.
        if (!(events || callback || context)) {
            delete that.eventListeners;
            return that;
        }

        events = events ? events.split(eventSplitter) : keys(listeners);

        each(events, function (event) {

            var list = listeners[event];

            if (!list) {
                return;
            }

            // remove all event.
            if (!(callback || context)) {
                delete listeners[event];
                return;
            }

            for (var i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback ||
                    context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        });

        return that;
    },

    emit: function (eventObj, sender) {
        var that = this;
        var returned = [];
        var listeners = that.eventListeners;

        // No events.
        if (!listeners || !that.isEventEnabled()) {
            return returned;
        }

        eventObj = eventObj || new EventObject();

        var eventName = eventObj.getName();

        if (!eventName) {
            return returned;
        }

        // fix sender
        sender = sender || that.getEventSource();
        sender = sender || that;


        var list = listeners[eventName];
        var length = list ? list.length : 0;
        var ret;

        for (var i = 0; i < length; i += 2) {
            ret = list[i].call(list[i + 1] || that, eventObj, sender);
            if (length > 2) {
                returned.push(ret); // result as array
            } else {
                returned = ret;
            }
        }

        return returned;
    }
});

});
define('PaneJS/CellState',['require','exports','module','PaneJS/Point','PaneJS/Rectangle'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Point = require('PaneJS/Point');
var Rectangle = require('PaneJS/Rectangle');

module.exports = Rectangle.extend({

    view: null,
    cell: null,
    style: null,    // cellStyle
    shape: null,    // 图形
    text: null,     // 文本
    invalid: true,  // 默认为无效，需要重绘
    origin: null,
    absolutePoints: null, // 连线的关键点
    absoluteOffset: null, // 对于连线，表示连线上 label 的绝对位置
                          // 对于节点，表示节点中 label 相对于节点左上角的位置

    segments: null,       // 连线每个片段的长度
    //length: 0, // FIXME: length 导致 isArrayLike 判断出错，用下面的 edgeLength 代替
    edgeLength: 0,        // 连线的长度
    terminalDistance: 0,  // 连线起点和终点之间的直线距离
    visibleSourceState: null,
    visibleTargetState: null,

    // 构造函数
    constructor: function CellState(view, cell, style) {

        var that = this;

        that.view = view;
        that.cell = cell;
        that.style = style;

        that.origin = new Point();
        that.absoluteOffset = new Point();
    },

    getPerimeterBounds: function (border, bounds) {

        var that = this;
        var shape = that.shape;

        border = border || 0;
        bounds = bounds ? bounds : new Rectangle(that.x, that.y, that.width, that.height);


        if (shape && shape.stencil) {
            var aspect = shape.stencil.computeAspect(that.style, bounds.x, bounds.y, bounds.width, bounds.height);

            bounds.x = aspect.x;
            bounds.y = aspect.y;
            bounds.width = shape.stencil.w0 * aspect.width;
            bounds.height = shape.stencil.h0 * aspect.height;
        }

        border && bounds.grow(border);

        return bounds;
    },

    setAbsoluteTerminalPoint: function (point, isSource) {

        var that = this;
        var points = that.absolutePoints;

        if (!points) {
            points = that.absolutePoints = [];
        }

        var length = points.length;

        if (isSource) {
            length
                ? points[0] = point
                : points.push(point);
        } else {
            if (length === 0) {
                points.push(null);
                points.push(point);
            } else if (length === 1) {
                points.push(point);
            } else {
                points[length - 1] = point;
            }
        }

        return that;
    },

    setCursor: function (cursor) {

        var that = this;
        var shape = that.shape;
        var text = that.text;

        shape && shape.setCursor(cursor);
        text && text.setCursor(cursor);

        return that;
    },

    getVisibleTerminal: function (isSource) {
        var state = this.getVisibleTerminalState(isSource);

        return state ? state.cell : null;
    },

    getVisibleTerminalState: function (isSource) {
        return isSource ? this.visibleSourceState : this.visibleTargetState;
    },

    setVisibleTerminalState: function (terminalState, isSource) {
        if (isSource) {
            this.visibleSourceState = terminalState;
        } else {
            this.visibleTargetState = terminalState;
        }
    },

    getCellBounds: function () {
        return this.cellBounds;
    },

    getPaintBounds: function () {
        return this.paintBounds;
    },

    updateCachedBounds: function () {

        var that = this;
        var view = that.view;
        var shape = that.shape;
        var ts = view.translate;
        var scale = view.scale;

        // 计算 translate 和 scale 之前的 bound
        that.cellBounds = new Rectangle(that.x / scale - ts.x, that.y / scale - ts.y, that.width / scale, that.height / scale);
        that.paintBounds = Rectangle.fromRectangle(that.cellBounds);

        if (shape && shape.isPaintBoundsInverted()) {
            that.paintBounds.rotate90();
        }
    },

    clone: function () {

    },

    destroy: function () {
        this.view.graph.cellRenderer.destroy(this);
    }
});


});
define('PaneJS/Geometry',['require','exports','module','PaneJS/Rectangle'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Rectangle = require('PaneJS/Rectangle');

module.exports = Rectangle.extend({

    TRANSLATE_CONTROL_POINTS: true,
    alternateBounds: null,
    sourcePoint: null,
    targetPoint: null,
    points: null,
    offset: null,
    relative: false,

    constructor: function Geometry(x, y, width, height) {
        Geometry.superclass.constructor.call(this, x, y, width, height);
    },

    swap: function () {

        var that = this;
        var alternateBounds = that.alternateBounds;

        if (alternateBounds) {
            var old = new Rectangle(that.x, that.y, that.width, that.height);

            that.x = alternateBounds.x;
            that.y = alternateBounds.y;
            that.width = alternateBounds.width;
            that.height = alternateBounds.height;

            that.alternateBounds = old;
        }

        return that;
    },

    getTerminalPoint: function (isSource) {
        return isSource ? this.sourcePoint : this.targetPoint;
    },

    setTerminalPoint: function (point, isSource) {
        var geom = this;
        if (isSource) {
            geom.sourcePoint = point;
        } else {
            geom.targetPoint = point;
        }

        return point;
    },

    rotate: function (/*angle, cx*/) {
    },
    translate: function (/*dx, dy*/) {
    },
    scale: function (/*sx, sy, fixedAspect*/) {
    },

    equals: function (/*obj*/) {
    }
});

});
define('PaneJS/constants',['require','exports','module','PaneJS/Rectangle'],function (require, exports, module) {var Rectangle = require('PaneJS/Rectangle');

module.exports = {
    //----------------------
    EVENT_SPLITTER: /\s+/,
    OBJECT_ID: 'objectId',
    //----------------------


    DEFAULT_HOTSPOT: 0.3,
    MIN_HOTSPOT_SIZE: 8,
    MAX_HOTSPOT_SIZE: 0,

    RENDERING_HINT_EXACT: 'exact',
    RENDERING_HINT_FASTER: 'faster',
    RENDERING_HINT_FASTEST: 'fastest',

    DIALECT_SVG: 'svg',
    DIALECT_VML: 'vml',
    DIALECT_MIXEDHTML: 'mixedHtml',
    DIALECT_PREFERHTML: 'preferHtml',
    DIALECT_STRICTHTML: 'strictHtml',

    NS_SVG: 'http://www.w3.org/2000/svg',
    NS_XHTML: 'http://www.w3.org/1999/xhtml',
    NS_XLINK: 'http://www.w3.org/1999/xlink',

    SHADOW_COLOR: 'gray',
    SHADOWCOLOR: 'gray',
    SHADOW_OFFSET_X: 2,
    SHADOW_OFFSET_Y: 3,
    SHADOW_OPACITY: 1,

    NODETYPE_ELEMENT: 1,
    NODETYPE_ATTRIBUTE: 2,
    NODETYPE_TEXT: 3,
    NODETYPE_CDATA: 4,
    NODETYPE_ENTITY_REFERENCE: 5,
    NODETYPE_ENTITY: 6,
    NODETYPE_PROCESSING_INSTRUCTION: 7,
    NODETYPE_COMMENT: 8,
    NODETYPE_DOCUMENT: 9,
    NODETYPE_DOCUMENTTYPE: 10,
    NODETYPE_DOCUMENT_FRAGMENT: 11,
    NODETYPE_NOTATION: 12,

    TOOLTIP_VERTICAL_OFFSET: 16,

    DEFAULT_VALID_COLOR: '#00FF00',
    DEFAULT_INVALID_COLOR: '#FF0000',
    OUTLINE_HIGHLIGHT_COLOR: '#00FF00',
    OUTLINE_HIGHLIGHT_STROKEWIDTH: 5,
    HIGHLIGHT_STROKEWIDTH: 3,

    CURSOR_MOVABLE_VERTEX: 'move',
    CURSOR_MOVABLE_EDGE: 'move',
    CURSOR_LABEL_HANDLE: 'default',
    CURSOR_TERMINAL_HANDLE: 'pointer',
    CURSOR_BEND_HANDLE: 'crosshair',
    CURSOR_VIRTUAL_BEND_HANDLE: 'crosshair',
    CURSOR_CONNECT: 'pointer',

    HIGHLIGHT_COLOR: '#00FF00',
    CONNECT_TARGET_COLOR: '#0000FF',
    INVALID_CONNECT_TARGET_COLOR: '#FF0000',
    DROP_TARGET_COLOR: '#0000FF',
    VALID_COLOR: '#00FF00',
    INVALID_COLOR: '#FF0000',
    EDGE_SELECTION_COLOR: '#00FF00',
    VERTEX_SELECTION_COLOR: '#00FF00',

    VERTEX_SELECTION_STROKEWIDTH: 1,
    EDGE_SELECTION_STROKEWIDTH: 1,
    VERTEX_SELECTION_DASHED: true,
    EDGE_SELECTION_DASHED: true,
    GUIDE_COLOR: '#FF0000',
    GUIDE_STROKEWIDTH: 1,
    OUTLINE_COLOR: '#0099FF',
    OUTLINE_STROKEWIDTH: 3,//(mxClient.IS_IE) ? 2 : 3,
    HANDLE_SIZE: 7,
    LABEL_HANDLE_SIZE: 4,
    HANDLE_FILLCOLOR: '#00FF00',
    HANDLE_STROKECOLOR: 'black',
    LABEL_HANDLE_FILLCOLOR: 'yellow',
    CONNECT_HANDLE_FILLCOLOR: '#0000FF',
    LOCKED_HANDLE_FILLCOLOR: '#FF0000',
    OUTLINE_HANDLE_FILLCOLOR: '#00FFFF',
    OUTLINE_HANDLE_STROKECOLOR: '#0033FF',

    //--------------------------------------
    DEFAULT_FONT_FAMILY: 'Arial,Helvetica',
    DEFAULT_FONTFAMILY: 'Arial,Helvetica',
    DEFAULT_FONT_SIZE: 11,
    DEFAULT_FONTSIZE: 11,
    //--------------------------------------

    LINE_HEIGHT: 1.2,
    ABSOLUTE_LINE_HEIGHT: false,
    DEFAULT_FONTSTYLE: 0,
    DEFAULT_STARTSIZE: 40,
    DEFAULT_MARKERSIZE: 6,
    DEFAULT_IMAGESIZE: 24,
    ENTITY_SEGMENT: 30,
    RECTANGLE_ROUNDING_FACTOR: 0.15,
    LINE_ARCSIZE: 20,
    ARROW_SPACING: 10,
    ARROW_WIDTH: 30,
    ARROW_SIZE: 30,

    PAGE_FORMAT_A4_PORTRAIT: new Rectangle(0, 0, 826, 1169),
    PAGE_FORMAT_A4_LANDSCAPE: new Rectangle(0, 0, 1169, 826),
    PAGE_FORMAT_LETTER_PORTRAIT: new Rectangle(0, 0, 850, 1100),
    PAGE_FORMAT_LETTER_LANDSCAPE: new Rectangle(0, 0, 1100, 850),

    NONE: 'none',


    STYLE_PERIMETER: 'perimeter',
    STYLE_SOURCE_PORT: 'sourcePort',
    STYLE_TARGET_PORT: 'targetPort',
    STYLE_PORT_CONSTRAINT: 'portConstraint',
    STYLE_PORT_CONSTRAINT_ROTATION: 'portConstraintRotation',
    STYLE_OPACITY: 'opacity',
    STYLE_TEXT_OPACITY: 'textOpacity',
    STYLE_OVERFLOW: 'overflow',
    STYLE_ORTHOGONAL: 'orthogonal',
    STYLE_EXIT_X: 'exitX',
    STYLE_EXIT_Y: 'exitY',
    STYLE_EXIT_PERIMETER: 'exitPerimeter',
    STYLE_ENTRY_X: 'entryX',
    STYLE_ENTRY_Y: 'entryY',
    STYLE_ENTRY_PERIMETER: 'entryPerimeter',
    STYLE_WHITE_SPACE: 'whiteSpace',
    STYLE_ROTATION: 'rotation',
    STYLE_FILLCOLOR: 'fillColor',
    STYLE_SWIMLANE_FILLCOLOR: 'swimlaneFillColor',
    STYLE_MARGIN: 'margin',
    STYLE_GRADIENTCOLOR: 'gradientColor',
    STYLE_GRADIENT_DIRECTION: 'gradientDirection',
    STYLE_STROKECOLOR: 'strokeColor',
    STYLE_SEPARATORCOLOR: 'separatorColor',
    STYLE_STROKEWIDTH: 'strokeWidth',
    STYLE_ALIGN: 'align',
    STYLE_VERTICAL_ALIGN: 'verticalAlign',
    STYLE_LABEL_WIDTH: 'labelWidth',
    STYLE_LABEL_POSITION: 'labelPosition',
    STYLE_VERTICAL_LABEL_POSITION: 'verticalLabelPosition',
    STYLE_IMAGE_ASPECT: 'imageAspect',
    STYLE_IMAGE_ALIGN: 'imageAlign',
    STYLE_IMAGE_VERTICAL_ALIGN: 'imageVerticalAlign',
    STYLE_GLASS: 'glass',
    STYLE_IMAGE: 'image',
    STYLE_IMAGE_WIDTH: 'imageWidth',
    STYLE_IMAGE_HEIGHT: 'imageHeight',
    STYLE_IMAGE_BACKGROUND: 'imageBackground',
    STYLE_IMAGE_BORDER: 'imageBorder',
    STYLE_FLIPH: 'flipH',
    STYLE_FLIPV: 'flipV',
    STYLE_NOLABEL: 'noLabel',
    STYLE_NOEDGESTYLE: 'noEdgeStyle',
    STYLE_LABEL_BACKGROUNDCOLOR: 'labelBackgroundColor',
    STYLE_LABEL_BORDERCOLOR: 'labelBorderColor',
    STYLE_LABEL_PADDING: 'labelPadding',
    STYLE_INDICATOR_SHAPE: 'indicatorShape',
    STYLE_INDICATOR_IMAGE: 'indicatorImage',
    STYLE_INDICATOR_COLOR: 'indicatorColor',
    STYLE_INDICATOR_STROKECOLOR: 'indicatorStrokeColor',
    STYLE_INDICATOR_GRADIENTCOLOR: 'indicatorGradientColor',
    STYLE_INDICATOR_SPACING: 'indicatorSpacing',
    STYLE_INDICATOR_WIDTH: 'indicatorWidth',
    STYLE_INDICATOR_HEIGHT: 'indicatorHeight',
    STYLE_INDICATOR_DIRECTION: 'indicatorDirection',
    STYLE_SHADOW: 'shadow',
    STYLE_SEGMENT: 'segment',
    STYLE_ENDARROW: 'endArrow',
    STYLE_STARTARROW: 'startArrow',
    STYLE_ENDSIZE: 'endSize',
    STYLE_STARTSIZE: 'startSize',
    STYLE_SWIMLANE_LINE: 'swimlaneLine',
    STYLE_ENDFILL: 'endFill',
    STYLE_STARTFILL: 'startFill',
    STYLE_DASHED: 'dashed',
    STYLE_DASH_PATTERN: 'dashPattern',
    STYLE_ROUNDED: 'rounded',
    STYLE_CURVED: 'curved',
    STYLE_ARCSIZE: 'arcSize',
    STYLE_SMOOTH: 'smooth',
    STYLE_SOURCE_PERIMETER_SPACING: 'sourcePerimeterSpacing',
    STYLE_TARGET_PERIMETER_SPACING: 'targetPerimeterSpacing',
    STYLE_PERIMETER_SPACING: 'perimeterSpacing',
    STYLE_SPACING: 'spacing',
    STYLE_SPACING_TOP: 'spacingTop',
    STYLE_SPACING_LEFT: 'spacingLeft',
    STYLE_SPACING_BOTTOM: 'spacingBottom',
    STYLE_SPACING_RIGHT: 'spacingRight',
    STYLE_HORIZONTAL: 'horizontal',
    STYLE_DIRECTION: 'direction',
    STYLE_ELBOW: 'elbow',
    STYLE_FONTCOLOR: 'fontColor',
    STYLE_FONTFAMILY: 'fontFamily',
    STYLE_FONTSIZE: 'fontSize',
    STYLE_FONTSTYLE: 'fontStyle',
    STYLE_ASPECT: 'aspect',
    STYLE_AUTOSIZE: 'autosize',
    STYLE_FOLDABLE: 'foldable',
    STYLE_EDITABLE: 'editable',
    STYLE_BENDABLE: 'bendable',
    STYLE_MOVABLE: 'movable',
    STYLE_RESIZABLE: 'resizable',
    STYLE_ROTATABLE: 'rotatable',
    STYLE_CLONEABLE: 'cloneable',
    STYLE_DELETABLE: 'deletable',
    STYLE_SHAPE: 'shape',
    STYLE_EDGE: 'edgeStyle',
    STYLE_LOOP: 'loopStyle',
    STYLE_ROUTING_CENTER_X: 'routingCenterX',
    STYLE_ROUTING_CENTER_Y: 'routingCenterY',

    FONT_BOLD: 1,
    FONT_ITALIC: 2,
    FONT_UNDERLINE: 4,
    FONT_SHADOW: 8,

    SHAPE_RECTANGLE: 'rectangle',
    SHAPE_ELLIPSE: 'ellipse',
    SHAPE_DOUBLE_ELLIPSE: 'doubleEllipse',
    SHAPE_RHOMBUS: 'rhombus',
    SHAPE_LINE: 'line',
    SHAPE_IMAGE: 'image',
    SHAPE_ARROW: 'arrow',
    SHAPE_LABEL: 'label',
    SHAPE_CYLINDER: 'cylinder',
    SHAPE_SWIMLANE: 'swimlane',
    SHAPE_CONNECTOR: 'connector',
    SHAPE_ACTOR: 'actor',
    SHAPE_CLOUD: 'cloud',
    SHAPE_TRIANGLE: 'triangle',
    SHAPE_HEXAGON: 'hexagon',

    ARROW_CLASSIC: 'classic',
    ARROW_BLOCK: 'block',
    ARROW_OPEN: 'open',
    ARROW_OVAL: 'oval',
    ARROW_DIAMOND: 'diamond',
    ARROW_DIAMOND_THIN: 'diamondThin',

    ALIGN_LEFT: 'left',
    ALIGN_CENTER: 'center',
    ALIGN_RIGHT: 'right',
    ALIGN_TOP: 'top',
    ALIGN_MIDDLE: 'middle',
    ALIGN_BOTTOM: 'bottom',

    DIRECTION_NORTH: 'north',
    DIRECTION_SOUTH: 'south',
    DIRECTION_EAST: 'east',
    DIRECTION_WEST: 'west',

    DIRECTION_MASK_NONE: 0,
    DIRECTION_MASK_WEST: 1,
    DIRECTION_MASK_NORTH: 2,
    DIRECTION_MASK_SOUTH: 4,
    DIRECTION_MASK_EAST: 8,
    DIRECTION_MASK_ALL: 15,

    ELBOW_VERTICAL: 'vertical',
    ELBOW_HORIZONTAL: 'horizontal',

    EDGESTYLE_ELBOW: 'elbowEdgeStyle',
    EDGESTYLE_ENTITY_RELATION: 'entityRelationEdgeStyle',
    EDGESTYLE_LOOP: 'loopEdgeStyle',
    EDGESTYLE_SIDETOSIDE: 'sideToSideEdgeStyle',
    EDGESTYLE_TOPTOBOTTOM: 'topToBottomEdgeStyle',
    EDGESTYLE_ORTHOGONAL: 'orthogonalEdgeStyle',
    EDGESTYLE_SEGMENT: 'segmentEdgeStyle',
    PERIMETER_ELLIPSE: 'ellipsePerimeter',
    PERIMETER_RECTANGLE: 'rectanglePerimeter',
    PERIMETER_RHOMBUS: 'rhombusPerimeter',
    PERIMETER_HEXAGON: 'hexagonPerimeter',
    PERIMETER_TRIANGLE: 'trianglePerimeter'
};


});
define('PaneJS/Canvas2D',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/constants'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var constants = require('PaneJS/constants');

var round = Math.round;
var each = utils.each;
var toFixed = utils.toFixed;
var ucFirst = utils.ucFirst;
var toRadians = utils.toRadians;
var isNullOrUndefined = utils.isNullOrUndefined;

var proto = {

    node: null,
    state: null,
    states: null,
    path: null,
    lastX: 0,
    lastY: 0,

    antiAlias: true,

    rotateHtml: true,
    matchHtmlAlignment: true,

    textEnabled: true,
    foEnabled: true,        // foreignObject
    foAltText: '[Object]',  // foreignObject 的替代文字
    strokeTolerance: 0,
    refCount: 0,
    blockImagePointerEvents: false,
    lineHeightCorrection: 1.05,
    pointerEventsValue: 'all',
    fontMetricsPadding: 10,
    pointerEvents: false,
    //moveOp: 'M',
    //lineOp: 'L',
    //quadOp: 'Q',   // 二次贝塞尔曲线
    //curveOp: 'C',  // 三次贝塞尔曲线
    //closeOp: 'Z',

    constructor: function Canvas2D(root, styleEnabled) {

        var canvas = this;

        canvas.root = root;
        canvas.defs = null;
        canvas.gradients = [];
        canvas.styleEnabled = !isNullOrUndefined(styleEnabled) ? styleEnabled : false;

        canvas.reset();


        // defs
        // ----

        var svg = null;

        // 不在文档中
        if (root.ownerDocument !== document) {
            var node = root;

            while (node && node.nodeName !== 'svg') {
                node = node.parentNode;
            }

            svg = node;
        }

        if (svg) {

            var exists = svg.getElementsByTagName('defs');
            var defs = exists.length ? exists[0] : null;

            // Adds defs section if none exists
            if (!defs) {
                defs = canvas.createElement('defs');

                if (svg.firstChild) {
                    svg.insertBefore(defs, svg.firstChild);
                } else {
                    svg.appendChild(defs);
                }
            }

            // Adds stylesheet
            if (canvas.styleEnabled) {
                defs.appendChild(canvas.createStyle());
            }

            canvas.defs = defs;
        }
    },

    reset: function () {

        var canvas = this;

        canvas.state = canvas.createState();
        canvas.states = [];
        canvas.gradients = [];

        return canvas;
    },

    createState: function () {
        return {
            dx: 0,
            dy: 0,
            scale: 1,
            alpha: 1,
            fillColor: null,
            fillAlpha: 1,
            gradientColor: null,
            gradientAlpha: 1,
            gradientDirection: null,
            strokeColor: null,
            strokeWidth: 1,
            dashed: false,
            dashPattern: '3 3',
            lineCap: 'flat',
            lineJoin: 'miter',
            miterLimit: 10,
            fontColor: '#000000',
            fontBackgroundColor: null,
            fontBorderColor: null,
            fontSize: constants.DEFAULT_FONT_SIZE,
            fontFamily: constants.DEFAULT_FONT_FAMILY,
            fontStyle: 0,
            shadow: false,
            shadowColor: constants.SHADOW_COLOR,
            shadowAlpha: constants.SHADOW_OPACITY,
            shadowDx: constants.SHADOW_OFFSET_X,
            shadowDy: constants.SHADOW_OFFSET_Y,
            rotation: 0,
            rotationCx: 0,
            rotationCy: 0
        };
    },

    save: function () {

        var canvas = this;
        var state = canvas.state;

        canvas.states.push(state);
        canvas.state = utils.clone(state);

        return canvas;
    },

    restore: function () {

        var canvas = this;

        canvas.state = canvas.states.pop();

        return canvas;
    },

    format: function (value) {

        return this.antiAlias ?
            toFixed(value, 2) :
            Math.round(parseFloat(value));
    },

    rotatePoint: function (x, y, theta, cx, cy) {
        var rad = toRadians(theta);

        //return mxUtils.getRotatedPoint(new Point(x, y), Math.cos(rad),
        //    Math.sin(rad), new Point(cx, cy));
    },

    scale: function (value) {
        var canvas = this;
        var state = canvas.state;

        state.scale *= value;
        state.strokeWidth *= value;

        return canvas;
    },

    translate: function (dx, dy) {
        var canvas = this;
        var state = canvas.state;

        state.dx += dx;
        state.dy += dy;

        return canvas;
    },

    rotate: function (theta, flipH, flipV, cx, cy) {

        var canvas = this;
        var format = canvas.format;

        if (theta !== 0 || flipH || flipV) {

            var state = canvas.state;

            cx += state.dx;
            cy += state.dy;

            cx *= state.scale;
            cy *= state.scale;

            state.transform = state.transform || '';

            // This implementation uses custom scale/translate and built-in rotation
            // Rotation state is part of the AffineTransform in state.transform
            if (flipH && flipV) {
                theta += 180;
            } else if (flipH !== flipV) {
                var tx = (flipH) ? cx : 0;
                var sx = (flipH) ? -1 : 1;

                var ty = (flipV) ? cy : 0;
                var sy = (flipV) ? -1 : 1;

                state.transform += 'translate(' + format(tx) + ',' + format(ty) + ')' +
                    'scale(' + format(sx) + ',' + format(sy) + ')' +
                    'translate(' + format(-tx) + ',' + format(-ty) + ')';
            }

            if (flipH ? !flipV : flipV) {
                theta *= -1;
            }

            if (theta !== 0) {
                state.transform += 'rotate(' + format(theta) + ',' + format(cx) + ',' + format(cy) + ')';
            }

            state.rotation = state.rotation + theta;
            state.rotationCx = cx;
            state.rotationCy = cy;
        }
    },


    // Draw
    // ----

    // 开始一个新路径
    begin: function () {

        var canvas = this;

        canvas.lastX = 0;
        canvas.lastY = 0;
        canvas.path = [];
        canvas.node = canvas.createElement('path');

        return canvas;
    },

    addOp: function () {

        var canvas = this;
        var path = canvas.path;
        var state = canvas.state;
        var scale = state.scale;
        var format = canvas.format;
        var length = arguments.length;

        if (path) {
            path.push(arguments[0]);

            if (length > 2) {
                for (var i = 2; i < length; i += 2) {
                    canvas.lastX = arguments[i - 1];
                    canvas.lastY = arguments[i];

                    path.push(format((canvas.lastX + state.dx) * scale));
                    path.push(format((canvas.lastY + state.dy) * scale));
                }
            }
        }

        return canvas;
    },

    moveTo: function (x, y) {
        return this.addOp('M', x, y);
    },

    lineTo: function (x, y) {
        return this.addOp('L', x, y);
    },

    // 二次贝塞尔曲线
    quadTo: function (x1, y1, x2, y2) {
        return this.addOp('Q', x1, y1, x2, y2);
    },

    // 三次贝塞尔曲线
    curveTo: function (x1, y1, x2, y2, x3, y3) {
        return this.addOp('C', x1, y1, x2, y2, x3, y3);
    },

    // 圆弧
    arcTo: function (/*rx, ry, angle, largeArcFlag, sweepFlag, x, y*/) {

    },

    close: function () {
        return this.addOp('Z');
    },

    rect: function (x, y, w, h, dx, dy) {

        var canvas = this;
        var state = canvas.state;
        var scale = state.scale;
        var format = canvas.format;
        var rect = canvas.createElement('rect');

        rect.setAttribute('x', format((x + state.dx) * scale));
        rect.setAttribute('y', format((y + state.dy) * scale));
        rect.setAttribute('width', format(w * scale));
        rect.setAttribute('height', format(h * scale));

        if (dx > 0) {
            rect.setAttribute('rx', format(dx * scale));
        }

        if (dy > 0) {
            rect.setAttribute('ry', format(dy * scale));
        }

        canvas.node = rect;

        return canvas;
    },

    ellipse: function (x, y, w, h) {

        var canvas = this;
        var state = canvas.state;
        var scale = state.scale;

        var ellipse = canvas.createElement('ellipse');

        ellipse.setAttribute('cx', Math.round((x + w / 2 + state.dx) * scale));
        ellipse.setAttribute('cy', Math.round((y + h / 2 + state.dy) * scale));
        ellipse.setAttribute('rx', w / 2 * scale);
        ellipse.setAttribute('ry', h / 2 * scale);

        canvas.node = ellipse;

        return canvas;

    },

    image: function (x, y, w, h, src, aspect, flipH, flipV) {
        src = this.converter.convert(src);

        // LATER: Add option for embedding images as base64.
        aspect = (aspect != null) ? aspect : true;
        flipH = (flipH != null) ? flipH : false;
        flipV = (flipV != null) ? flipV : false;

        var s = this.state;
        x += s.dx;
        y += s.dy;

        var node = this.createElement('image');
        node.setAttribute('x', this.format(x * s.scale));
        node.setAttribute('y', this.format(y * s.scale));
        node.setAttribute('width', this.format(w * s.scale));
        node.setAttribute('height', this.format(h * s.scale));

        // Workaround for missing namespace support
        if (node.setAttributeNS == null) {
            node.setAttribute('xlink:href', src);
        }
        else {
            node.setAttributeNS(constants.NS_XLINK, 'xlink:href', src);
        }

        if (!aspect) {
            node.setAttribute('preserveAspectRatio', 'none');
        }

        if (s.alpha < 1) {
            node.setAttribute('opacity', s.alpha);
        }

        var tr = this.state.transform || '';

        if (flipH || flipV) {
            var sx = 1;
            var sy = 1;
            var dx = 0;
            var dy = 0;

            if (flipH) {
                sx = -1;
                dx = -w - 2 * x;
            }

            if (flipV) {
                sy = -1;
                dy = -h - 2 * y;
            }

            // Adds image tansformation to existing transform
            tr += 'scale(' + sx + ',' + sy + ')translate(' + (dx * s.scale) + ',' + (dy * s.scale) + ')';
        }

        if (tr.length > 0) {
            node.setAttribute('transform', tr);
        }

        if (!this.pointerEvents) {
            node.setAttribute('pointer-events', 'none');
        }

        this.root.appendChild(node);

        // Disables control-clicks on images in Firefox to open in new tab
        // by putting a rect in the foreground that absorbs all events and
        // disabling all pointer-events on the original image tag.
        if (this.blockImagePointerEvents) {
            node.setAttribute('style', 'pointer-events:none');

            node = this.createElement('rect');
            node.setAttribute('visibility', 'hidden');
            node.setAttribute('pointer-events', 'fill');
            node.setAttribute('x', this.format(x * s.scale));
            node.setAttribute('y', this.format(y * s.scale));
            node.setAttribute('width', this.format(w * s.scale));
            node.setAttribute('height', this.format(h * s.scale));
            this.root.appendChild(node);
        }
    },

    createDiv: function () {},

    text: function (x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation) {

        var canvas = this;

        if (canvas.textEnabled && !isNullOrUndefined(str)) {
            rotation = !isNullOrUndefined(rotation) ? rotation : 0;

            var state = canvas.state;
            x += state.dx;
            y += state.dy;

            if (canvas.foEnabled && format === 'html') {
                var style = 'vertical-align:top;';

                if (clip) {
                    style += 'overflow:hidden;max-height:' + round(h) + 'px;max-width:' + round(w) + 'px;';
                } else if (overflow === 'fill') {
                    style += 'width:' + round(w) + 'px;height:' + round(h) + 'px;';
                } else if (overflow === 'width') {
                    style += 'width:' + round(w) + 'px;';

                    if (h > 0) {
                        style += 'max-height:' + round(h) + 'px;';
                    }
                }

                if (wrap && w > 0) {
                    style += 'width:' + round(w) + 'px;white-space:normal;';
                } else {
                    style += 'white-space:nowrap;';
                }

                // Uses outer group for opacity and transforms to
                // fix rendering order in Chrome
                var group = canvas.createElement('g');

                if (state.alpha < 1) {
                    group.setAttribute('opacity', state.alpha);
                }

                var fo = canvas.createElement('foreignObject');
                fo.setAttribute('pointer-events', 'all');

                var div = this.createDiv(str, align, valign, style, overflow);

                // Ignores invalid XHTML labels
                if (div == null) {
                    return;
                }

                group.appendChild(fo);
                this.root.appendChild(group);

                // Code that depends on the size which is computed after
                // the element was added to the DOM.
                var ow = 0;
                var oh = 0;

                // Padding avoids clipping on border and wrapping for differing font metrics on platforms
                var padX = 2;
                var padY = 2;

                // NOTE: IE is always export as it does not support foreign objects
                if (mxClient.IS_IE && (document.documentMode == 9 || !mxClient.IS_SVG)) {
                    // Handles non-standard namespace for getting size in IE
                    var clone = document.createElement('div');

                    clone.style.cssText = div.getAttribute('style');
                    clone.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
                    clone.style.position = 'absolute';
                    clone.style.visibility = 'hidden';

                    // Inner DIV is needed for text measuring
                    var div2 = document.createElement('div');
                    div2.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
                    div2.innerHTML = (mxUtils.isNode(str)) ? str.outerHTML : str;
                    clone.appendChild(div2);

                    document.body.appendChild(clone);

                    // Workaround for different box models
                    if (document.documentMode != 8 && document.documentMode != 9 && state.fontBorderColor != null) {
                        padX += 2;
                        padY += 2;
                    }

                    if (wrap && w > 0) {
                        var tmp = div2.offsetWidth;

                        // Workaround for adding padding twice in IE8/IE9 standards mode if label is wrapped
                        var padDx = 0;

                        // For export, if no wrapping occurs, we add a large padding to make
                        // sure there is no wrapping even if the text metrics are different.
                        // This adds support for text metrics on different operating systems.
                        if (!clip && this.root.ownerDocument != document) {
                            var ws = clone.style.whiteSpace;
                            clone.style.whiteSpace = 'nowrap';

                            // Checks if wrapped width is equal to non-wrapped width (ie no wrapping)
                            if (tmp == div2.offsetWidth) {
                                padX += this.fontMetricsPadding;
                            }
                            else if (document.documentMode == 8 || document.documentMode == 9) {
                                padDx = -2;
                            }

                            // Restores the previous white space
                            // This is expensive!
                            clone.style.whiteSpace = ws;
                        }

                        // Required to update the height of the text box after wrapping width is known
                        tmp = tmp + padX;

                        if (clip) {
                            tmp = Math.min(tmp, w);
                        }

                        clone.style.width = tmp + 'px';

                        // Padding avoids clipping on border
                        ow = div2.offsetWidth + padX + padDx;
                        oh = div2.offsetHeight + padY;

                        // Overrides the width of the DIV via XML DOM by using the
                        // clone DOM style, getting the CSS text for that and
                        // then setting that on the DIV via setAttribute
                        clone.style.display = 'inline-block';
                        clone.style.position = '';
                        clone.style.visibility = '';
                        clone.style.width = ow + 'px';

                        div.setAttribute('style', clone.style.cssText);
                    }
                    else {
                        // Padding avoids clipping on border
                        ow = div2.offsetWidth + padX;
                        oh = div2.offsetHeight + padY;
                    }

                    clone.parentNode.removeChild(clone);
                    fo.appendChild(div);
                }
                else {
                    // Workaround for export and Firefox where sizes are not reported or updated correctly
                    // when inside a foreignObject (Opera has same bug but it cannot be fixed for all cases
                    // using this workaround so foreignObject is disabled).
                    if (this.root.ownerDocument != document || mxClient.IS_FF) {
                        // Getting size via local document for export
                        div.style.visibility = 'hidden';
                        document.body.appendChild(div);
                    }
                    else {
                        fo.appendChild(div);
                    }

                    var sizeDiv = div;

                    if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                        sizeDiv = sizeDiv.firstChild;
                    }

                    var tmp = sizeDiv.offsetWidth;

                    // For export, if no wrapping occurs, we add a large padding to make
                    // sure there is no wrapping even if the text metrics are different.
                    if (!clip && wrap && w > 0 && this.root.ownerDocument != document) {
                        var ws = div.style.whiteSpace;
                        div.style.whiteSpace = 'nowrap';

                        if (tmp == sizeDiv.offsetWidth) {
                            padX += this.fontMetricsPadding;
                        }

                        div.style.whiteSpace = ws;
                    }

                    ow = tmp + padX;

                    // Recomputes the height of the element for wrapped width
                    if (wrap) {
                        if (clip) {
                            ow = Math.min(ow, w);
                        }

                        div.style.width = ow + 'px';
                    }

                    ow = sizeDiv.offsetWidth + padX;
                    oh = sizeDiv.offsetHeight + 2;

                    if (div.parentNode != fo) {
                        fo.appendChild(div);
                        div.style.visibility = '';
                    }
                }

                if (clip) {
                    oh = Math.min(oh, h);
                    ow = Math.min(ow, w);
                }

                if (overflow == 'fill') {
                    w = Math.max(w, ow);
                    h = Math.max(h, oh);
                }
                else if (overflow == 'width') {
                    w = Math.max(w, ow);
                    h = oh;
                }
                else {
                    w = ow;
                    h = oh;
                }

                if (state.alpha < 1) {
                    group.setAttribute('opacity', state.alpha);
                }

                var dx = 0;
                var dy = 0;

                if (align == constants.ALIGN_CENTER) {
                    dx -= w / 2;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    dx -= w;
                }

                x += dx;

                // FIXME: LINE_HEIGHT not ideal for all text sizes, fix for export
                if (valign == constants.ALIGN_MIDDLE) {
                    dy -= h / 2 - 1;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    dy -= h - 2;
                }

                y += dy;

                var tr = (state.scale != 1) ? 'scale(' + state.scale + ')' : '';

                if (state.rotation != 0 && this.rotateHtml) {
                    tr += 'rotate(' + (state.rotation) + ',' + (w / 2) + ',' + (h / 2) + ')';
                    var pt = this.rotatePoint((x + w / 2) * state.scale, (y + h / 2) * state.scale,
                        state.rotation, state.rotationCx, state.rotationCy);
                    x = pt.x - w * state.scale / 2;
                    y = pt.y - h * state.scale / 2;
                }
                else {
                    x *= state.scale;
                    y *= state.scale;
                }

                if (rotation != 0) {
                    tr += 'rotate(' + (rotation) + ',' + (-dx) + ',' + (-dy) + ')';
                }

                group.setAttribute('transform', 'translate(' + Math.round(x) + ',' + Math.round(y) + ')' + tr);
                fo.setAttribute('width', Math.round(Math.max(1, w)));
                fo.setAttribute('height', Math.round(Math.max(1, h)));

                // Adds alternate content if foreignObject not supported in viewer
                if (this.root.ownerDocument != document) {
                    var alt = this.createAlternateContent(fo, x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation);

                    if (alt != null) {
                        fo.setAttribute('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility');
                        var sw = this.createElement('switch');
                        sw.appendChild(fo);
                        sw.appendChild(alt);
                        group.appendChild(sw);
                    }
                }
            }
            else {
                canvas.plainText(x, y, w, h, str, align, valign, wrap, overflow, clip, rotation);
            }
        }
    },

    plainText: function (x, y, w, h, str, align, valign, wrap, overflow, clip, rotation) {
        rotation = (rotation != null) ? rotation : 0;
        var s = this.state;
        var size = Math.round(s.fontSize);
        var node = this.createElement('g');
        var tr = s.transform || '';
        this.updateFont(node);

        // Non-rotated text
        if (rotation != 0) {
            tr += 'rotate(' + rotation + ',' + this.format(x * s.scale) + ',' + this.format(y * s.scale) + ')';
        }

        if (clip && w > 0 && h > 0) {
            var cx = x;
            var cy = y;

            if (align == constants.ALIGN_CENTER) {
                cx -= w / 2;
            }
            else if (align == constants.ALIGN_RIGHT) {
                cx -= w;
            }

            if (overflow != 'fill') {
                if (valign == constants.ALIGN_MIDDLE) {
                    cy -= h / 2;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    cy -= h;
                }
            }

            // LATER: Remove spacing from clip rectangle
            var c = this.createClip(cx * s.scale - 2, cy * s.scale - 2, w * s.scale + 4, h * s.scale + 4);

            if (this.defs != null) {
                this.defs.appendChild(c);
            }
            else {
                // Makes sure clip is removed with referencing node
                this.root.appendChild(c);
            }

            if (!mxClient.IS_IE && this.root.ownerDocument == document) {
                // Workaround for potential base tag
                var base = this.getBaseUrl().replace(/([\(\)])/g, '\\$1');
                node.setAttribute('clip-path', 'url(' + base + '#' + c.getAttribute('id') + ')');
            }
            else {
                node.setAttribute('clip-path', 'url(#' + c.getAttribute('id') + ')');
            }
        }

        // Default is left
        var anchor = (align == constants.ALIGN_RIGHT) ? 'end' :
            (align == constants.ALIGN_CENTER) ? 'middle' :
                'start';

        // Text-anchor start is default in SVG
        if (anchor != 'start') {
            node.setAttribute('text-anchor', anchor);
        }

        if (!this.styleEnabled || size != constants.DEFAULT_FONTSIZE) {
            node.setAttribute('font-size', Math.round(size * s.scale) + 'px');
        }

        if (tr.length > 0) {
            node.setAttribute('transform', tr);
        }

        if (s.alpha < 1) {
            node.setAttribute('opacity', s.alpha);
        }

        var lines = str.split('\n');
        var lh = Math.round(size * constants.LINE_HEIGHT);
        var textHeight = size + (lines.length - 1) * lh;

        var cy = y + size - 1;

        if (valign == constants.ALIGN_MIDDLE) {
            if (overflow == 'fill') {
                cy -= h / 2;
            }
            else {
                var dy = ((this.matchHtmlAlignment && clip && h > 0) ? Math.min(textHeight, h) : textHeight) / 2;
                cy -= dy + 1;
            }
        }
        else if (valign == constants.ALIGN_BOTTOM) {
            if (overflow == 'fill') {
                cy -= h;
            }
            else {
                var dy = (this.matchHtmlAlignment && clip && h > 0) ? Math.min(textHeight, h) : textHeight;
                cy -= dy + 2;
            }
        }

        for (var i = 0; i < lines.length; i++) {
            // Workaround for bounding box of empty lines and spaces
            if (lines[i].length > 0 && utils.trim(lines[i]).length > 0) {
                var text = this.createElement('text');
                // LATER: Match horizontal HTML alignment
                text.setAttribute('x', this.format(x * s.scale));
                text.setAttribute('y', this.format(cy * s.scale));

                utils.write(text, lines[i]);
                node.appendChild(text);
            }

            cy += lh;
        }

        this.root.appendChild(node);
        this.addTextBackground(node, str, x, y, w, (overflow == 'fill') ? h : textHeight, align, valign, overflow);
    },

    createClip: function (x, y, w, h) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);

        var id = 'mx-clip-' + x + '-' + y + '-' + w + '-' + h;

        var counter = 0;
        var tmp = id + '-' + counter;

        // Resolves ID conflicts
        while (document.getElementById(tmp) != null) {
            tmp = id + '-' + (++counter);
        }

        clip = this.createElement('clipPath');
        clip.setAttribute('id', tmp);

        var rect = this.createElement('rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);

        clip.appendChild(rect);

        return clip;
    },

    updateFont: function (node) {

        var canvas = this;
        var state = canvas.state;

        node.setAttribute('fill', state.fontColor);

        if (!canvas.styleEnabled || state.fontFamily !== constants.DEFAULT_FONTFAMILY) {
            node.setAttribute('font-family', state.fontFamily);
        }

        if ((state.fontStyle & constants.FONT_BOLD) === constants.FONT_BOLD) {
            node.setAttribute('font-weight', 'bold');
        }

        if ((state.fontStyle & constants.FONT_ITALIC) === constants.FONT_ITALIC) {
            node.setAttribute('font-style', 'italic');
        }

        if ((state.fontStyle & constants.FONT_UNDERLINE) === constants.FONT_UNDERLINE) {
            node.setAttribute('text-decoration', 'underline');
        }
    },

    addTextBackground: function (node, str, x, y, w, h, align, valign, overflow) {
        var s = this.state;

        if (s.fontBackgroundColor != null || s.fontBorderColor != null) {
            var bbox = null;

            if (overflow == 'fill' || overflow == 'width') {
                if (align == constants.ALIGN_CENTER) {
                    x -= w / 2;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    x -= w;
                }

                if (valign == constants.ALIGN_MIDDLE) {
                    y -= h / 2;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    y -= h;
                }

                bbox = new mxRectangle((x + 1) * s.scale, y * s.scale, (w - 2) * s.scale, (h + 2) * s.scale);
            }
            else if (node.getBBox != null && this.root.ownerDocument == document) {
                // Uses getBBox only if inside document for correct size
                try {
                    bbox = node.getBBox();
                    var ie = mxClient.IS_IE && mxClient.IS_SVG;
                    bbox = new mxRectangle(bbox.x, bbox.y + ((ie) ? 0 : 1), bbox.width, bbox.height + ((ie) ? 1 : 0));
                }
                catch (e) {
                    // Ignores NS_ERROR_FAILURE in FF if container display is none.
                }
            }
            else {
                // Computes size if not in document or no getBBox available
                var div = document.createElement('div');

                // Wrapping and clipping can be ignored here
                div.style.lineHeight = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(s.fontSize * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
                div.style.fontSize = Math.round(s.fontSize) + 'px';
                div.style.fontFamily = s.fontFamily;
                div.style.whiteSpace = 'nowrap';
                div.style.position = 'absolute';
                div.style.visibility = 'hidden';
                div.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
                div.style.zoom = '1';

                if ((s.fontStyle & constants.FONT_BOLD) == constants.FONT_BOLD) {
                    div.style.fontWeight = 'bold';
                }

                if ((s.fontStyle & constants.FONT_ITALIC) == constants.FONT_ITALIC) {
                    div.style.fontStyle = 'italic';
                }

                str = mxUtils.htmlEntities(str, false);
                div.innerHTML = str.replace(/\n/g, '<br/>');

                document.body.appendChild(div);
                var w = div.offsetWidth;
                var h = div.offsetHeight;
                div.parentNode.removeChild(div);

                if (align == constants.ALIGN_CENTER) {
                    x -= w / 2;
                }
                else if (align == constants.ALIGN_RIGHT) {
                    x -= w;
                }

                if (valign == constants.ALIGN_MIDDLE) {
                    y -= h / 2;
                }
                else if (valign == constants.ALIGN_BOTTOM) {
                    y -= h;
                }

                bbox = new mxRectangle((x + 1) * s.scale, (y + 2) * s.scale, w * s.scale, (h + 1) * s.scale);
            }

            if (bbox != null) {
                var n = this.createElement('rect');
                n.setAttribute('fill', s.fontBackgroundColor || 'none');
                n.setAttribute('stroke', s.fontBorderColor || 'none');
                n.setAttribute('x', Math.floor(bbox.x - 1));
                n.setAttribute('y', Math.floor(bbox.y - 1));
                n.setAttribute('width', Math.ceil(bbox.width + 2));
                n.setAttribute('height', Math.ceil(bbox.height));

                var sw = (s.fontBorderColor != null) ? Math.max(1, this.format(s.scale)) : 0;
                n.setAttribute('stroke-width', sw);

                // Workaround for crisp rendering - only required if not exporting
                if (this.root.ownerDocument == document && mxUtils.mod(sw, 2) == 1) {
                    n.setAttribute('transform', 'translate(0.5, 0.5)');
                }

                node.insertBefore(n, node.firstChild);
            }
        }
    },

    stroke: function () {
        this.addNode(false, false);
    },

    fill: function () {
        this.addNode(true, false);
    },

    fillAndStroke: function () {
        this.addNode(true, true);
    },

    createStyle: function () {
        var style = this.createElement('style');
        style.setAttribute('type', 'text/css');
        utils.write(style, 'svg{font-family:' + constants.DEFAULT_FONTFAMILY +
            ';font-size:' + constants.DEFAULT_FONTSIZE +
            ';fill:none;stroke-miterlimit:10}');

        return style;
    },

    createElement: function (tagName, namespace) {

        var ownerDocument = this.root.ownerDocument;

        if (ownerDocument.createElementNS) {
            return ownerDocument.createElementNS(namespace || constants.NS_SVG, tagName);
        } else {
            var ele = ownerDocument.createElement(tagName);

            if (namespace) {
                ele.setAttribute('xmlns', namespace);
            }

            return ele;
        }
    },

    createAlternateContent: function (fo, x, y, w, h) {
        if (this.foAltText) {
            var state = this.state;
            var alt = this.createElement('text');
            alt.setAttribute('x', Math.round(w / 2));
            alt.setAttribute('y', Math.round((h + state.fontSize) / 2));
            alt.setAttribute('fill', state.fontColor || 'black');
            alt.setAttribute('text-anchor', 'middle');
            alt.setAttribute('font-size', Math.round(state.fontSize) + 'px');
            alt.setAttribute('font-family', state.fontFamily);

            if ((state.fontStyle & constants.FONT_BOLD) === constants.FONT_BOLD) {
                alt.setAttribute('font-weight', 'bold');
            }

            if ((state.fontStyle & constants.FONT_ITALIC) === constants.FONT_ITALIC) {
                alt.setAttribute('font-style', 'italic');
            }

            if ((state.fontStyle & constants.FONT_UNDERLINE) === constants.FONT_UNDERLINE) {
                alt.setAttribute('text-decoration', 'underline');
            }

            utils.write(alt, this.foAltText);

            return alt;
        }
        else {
            return null;
        }
    },

    createGradientId: function (start, end, alpha1, alpha2, direction) {
        // Removes illegal characters from gradient ID
        if (start.charAt(0) === '#') {
            start = start.substring(1);
        }

        if (end.charAt(0) === '#') {
            end = end.substring(1);
        }

        // Workaround for gradient IDs not working in Safari 5 / Chrome 6
        // if they contain uppercase characters
        start = start.toLowerCase() + '-' + alpha1;
        end = end.toLowerCase() + '-' + alpha2;

        // Wrong gradient directions possible?
        var dir = null;

        if (!direction || direction === constants.DIRECTION_SOUTH) {
            dir = 's';
        }
        else if (direction === constants.DIRECTION_EAST) {
            dir = 'e';
        } else {
            var tmp = start;
            start = end;
            end = tmp;

            if (direction === constants.DIRECTION_NORTH) {
                dir = 's';
            }
            else if (direction === constants.DIRECTION_WEST) {
                dir = 'e';
            }
        }

        return 'gradient-' + start + '-' + end + '-' + dir;
    },

    getSvgGradient: function (start, end, alpha1, alpha2, direction) {
        var id = this.createGradientId(start, end, alpha1, alpha2, direction);
        var gradient = this.gradients[id];

        if (!gradient) {
            var svg = this.root.ownerSVGElement;

            var counter = 0;
            var tmpId = id + '-' + counter;

            if (svg) {
                gradient = svg.ownerDocument.getElementById(tmpId);

                while (gradient && gradient.ownerSVGElement !== svg) {
                    tmpId = id + '-' + counter++;
                    gradient = svg.ownerDocument.getElementById(tmpId);
                }
            } else {
                // Uses shorter IDs for export
                tmpId = 'id' + (++this.refCount);
            }

            if (gradient == null) {
                gradient = this.createSvgGradient(start, end, alpha1, alpha2, direction);
                gradient.setAttribute('id', tmpId);

                if (this.defs != null) {
                    this.defs.appendChild(gradient);
                } else {
                    svg.appendChild(gradient);
                }
            }

            this.gradients[id] = gradient;
        }

        return gradient.getAttribute('id');
    },

    createSvgGradient: function (start, end, alpha1, alpha2, direction) {
        var gradient = this.createElement('linearGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '0%');

        if (!direction || direction === constants.DIRECTION_SOUTH) {
            gradient.setAttribute('y2', '100%');
        }
        else if (direction === constants.DIRECTION_EAST) {
            gradient.setAttribute('x2', '100%');
        }
        else if (direction === constants.DIRECTION_NORTH) {
            gradient.setAttribute('y1', '100%');
        }
        else if (direction === constants.DIRECTION_WEST) {
            gradient.setAttribute('x1', '100%');
        }

        var op = (alpha1 < 1) ? ';stop-opacity:' + alpha1 : '';

        var stop = this.createElement('stop');
        stop.setAttribute('offset', '0%');
        stop.setAttribute('style', 'stop-color:' + start + op);
        gradient.appendChild(stop);

        op = (alpha2 < 1) ? ';stop-opacity:' + alpha2 : '';

        stop = this.createElement('stop');
        stop.setAttribute('offset', '100%');
        stop.setAttribute('style', 'stop-color:' + end + op);
        gradient.appendChild(stop);

        return gradient;
    },

    addNode: function (filled, stroked) {

        var that = this;
        var root = that.root;
        var node = that.node;
        var state = that.state;

        if (!node) {
            return that;
        }


        if (node.nodeName === 'path') {

            var path = that.path;
            if (path && path.length) {
                node.setAttribute('d', path.join(' '));
            } else {
                return that;
            }
        }

        //
        if (filled && state.fillColor) {
            that.updateFill();
        } else if (!that.styleEnabled) {
            node.setAttribute('fill', 'none');
            // Sets the actual filled state for stroke tolerance
            filled = false;
        }

        if (stroked && state.strokeColor) {
            that.updateStroke();
        } else if (!that.styleEnabled) {
            node.setAttribute('stroke', 'none');
        }

        if (state.transform && state.transform.length > 0) {
            node.setAttribute('transform', state.transform);
        }

        if (state.shadow) {
            root.appendChild(that.createShadow(node));
        }

        // Adds stroke tolerance
        if (that.strokeTolerance > 0 && !filled) {
            root.appendChild(that.createTolerance(node));
        }

        // Adds pointer events
        if (that.pointerEvents && (node.nodeName != 'path' ||
            this.path[this.path.length - 1] == this.closeOp)) {
            node.setAttribute('pointer-events', this.pointerEventsValue);
        }
        // Enables clicks for nodes inside a link element
        else if (!that.pointerEvents && that.originalRoot === null) {
            node.setAttribute('pointer-events', 'none');
        }

        root.appendChild(node);

        return that;
    },

    updateFill: function () {
        var s = this.state;

        if (s.alpha < 1) {
            this.node.setAttribute('fill-opacity', s.alpha);
        }

        if (s.fillColor !== null) {
            if (s.gradientColor !== null) {
                var id = this.getSvgGradient(s.fillColor, s.gradientColor, s.fillAlpha, s.gradientAlpha, s.gradientDirection);

                if (!mxClient.IS_IE && this.root.ownerDocument == document) {
                    // Workaround for potential base tag and brackets must be escaped
                    var base = this.getBaseUrl().replace(/([\(\)])/g, '\\$1');
                    this.node.setAttribute('fill', 'url(' + base + '#' + id + ')');
                }
                else {
                    this.node.setAttribute('fill', 'url(#' + id + ')');
                }
            }
            else {
                this.node.setAttribute('fill', s.fillColor.toLowerCase());
            }
        }
    },

    getCurrentStrokeWidth: function () {
        return Math.max(1, this.format(this.state.strokeWidth * this.state.scale));
    },

    updateStroke: function () {
        var s = this.state;

        this.node.setAttribute('stroke', s.strokeColor.toLowerCase());

        if (s.alpha < 1) {
            this.node.setAttribute('stroke-opacity', s.alpha);
        }

        var sw = this.getCurrentStrokeWidth();

        if (sw != 1) {
            this.node.setAttribute('stroke-width', sw);
        }

        if (this.node.nodeName == 'path') {
            // 更新端点、连接点样式
            this.updateStrokeAttributes();
        }

        if (s.dashed) {
            this.node.setAttribute('stroke-dasharray', this.createDashPattern(s.strokeWidth * s.scale));
        }
    },

    updateStrokeAttributes: function () {
        var s = this.state;

        // Linejoin miter is default in SVG
        if (s.lineJoin != null && s.lineJoin != 'miter') {
            this.node.setAttribute('stroke-linejoin', s.lineJoin);
        }

        if (s.lineCap != null) {
            // flat is called butt in SVG
            var value = s.lineCap;

            if (value == 'flat') {
                value = 'butt';
            }

            // Linecap butt is default in SVG
            if (value != 'butt') {
                this.node.setAttribute('stroke-linecap', value);
            }
        }

        // Miterlimit 10 is default in our document
        if (s.miterLimit != null && (!this.styleEnabled || s.miterLimit != 10)) {
            this.node.setAttribute('stroke-miterlimit', s.miterLimit);
        }
    },

    createDashPattern: function (scale) {
        var pat = [];

        if (typeof(this.state.dashPattern) === 'string') {
            var dash = this.state.dashPattern.split(' ');

            if (dash.length > 0) {
                for (var i = 0; i < dash.length; i++) {
                    pat[i] = Number(dash[i]) * scale;
                }
            }
        }

        return pat.join(' ');
    },

    createTolerance: function (node) {
        var tol = node.cloneNode(true);
        var sw = parseFloat(tol.getAttribute('stroke-width') || 1) + this.strokeTolerance;
        tol.setAttribute('pointer-events', 'stroke');
        tol.setAttribute('visibility', 'hidden');
        tol.removeAttribute('stroke-dasharray');
        tol.setAttribute('stroke-width', sw);
        tol.setAttribute('fill', 'none');

        // Workaround for Opera ignoring the visiblity attribute above while
        // other browsers need a stroke color to perform the hit-detection but
        // do not ignore the visibility attribute. Side-effect is that Opera's
        // hit detection for horizontal/vertical edges seems to ignore the tol.

        //tol.setAttribute('stroke', (mxClient.IS_OP) ? 'none' : 'white');
        tol.setAttribute('stroke', 'white');

        return tol;
    },

    createShadow: function (node) {
        var shadow = node.cloneNode(true);
        var s = this.state;

        if (shadow.getAttribute('fill') != 'none') {
            shadow.setAttribute('fill', s.shadowColor);
        }

        if (shadow.getAttribute('stroke') != 'none') {
            shadow.setAttribute('stroke', s.shadowColor);
        }

        shadow.setAttribute('transform', 'translate(' + this.format(s.shadowDx * s.scale) +
            ',' + this.format(s.shadowDy * s.scale) + ')' + (s.transform || ''));
        shadow.setAttribute('opacity', s.shadowAlpha);

        return shadow;
    },

    setLink: function (link) {
        if (link == null) {
            this.root = this.originalRoot;
        }
        else {
            this.originalRoot = this.root;

            var node = this.createElement('a');

            // Workaround for implicit namespace handling in HTML5 export, IE adds NS1 namespace so use code below
            // in all IE versions except quirks mode. KNOWN: Adds xlink namespace to each image tag in output.
            if (node.setAttributeNS == null || (this.root.ownerDocument != document && document.documentMode == null)) {
                node.setAttribute('xlink:href', link);
            } else {
                node.setAttributeNS(constants.NS_XLINK, 'xlink:href', link);
            }

            this.root.appendChild(node);
            this.root = node;
        }
    },

    setFillColor: function (value) {
        var canvas = this;
        var state = canvas.state;

        if (value == constants.NONE) {
            value = null;
        }

        if (state) {
            state.fillColor = value;
            state.gradientColor = null;
        }

        return canvas;
    },

    setGradient: function () {},

    setFontStyle: function (value) {
        var canvas = this;
        var state = canvas.state;

        if (isNullOrUndefined(value)) {
            value = 0;
        }

        if (state) {
            state.fontStyle = value;
        }
        return canvas;
    },

    setShadowOffset: function (dx, dy) {
        var canvas = this;
        var state = canvas.state;

        if (state) {
            state.shadowDx = dx;
            state.shadowDy = dy;
        }

        return canvas;
    }
};

each([
    'alpha',
    'strokeWidth',
    'dashed',
    'dashPattern',
    'lineCap',
    'lineJoin',
    'miterLimit',
    'fontSize',
    'fontFamily',
    'shadow',
    'shadowAlpha'
], function (attr) {
    proto['set' + ucFirst(attr)] = function (value) {

        var canvas = this;
        var state = canvas.state;

        if (state) {
            state[attr] = value;
        }

        return canvas;
    };
});

each([
    'strokeColor',
    'fontColor',
    'fontBackgroundColor',
    'fontBorderColor',
    'setShadowColor'
], function (attr) {
    proto['set' + ucFirst(attr)] = function (value) {

        var canvas = this;
        var state = canvas.state;

        if (value === constants.NONE) {
            value = null;
        }

        if (state) {
            state[attr] = value;
        }

        return canvas;
    };
});


module.exports = Class.create(proto);

});
define('PaneJS/Cell',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/constants'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */
/*jshint -W030 */

// TODO: cell 可以细分为 连线和节点 两种，这里放在同一个类中有点生硬

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var constants = require('PaneJS/constants');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function Cell(value, geometry, style) {

        var cell = this;

        cell.value = value;
        cell.setGeometry(geometry);
        cell.setStyle(style);

        cell.onInit && cell.onInit();
    },

    id: null,
    value: null,
    geometry: null,
    style: null,

    vertex: false,
    edge: false,
    connectable: true,
    visible: true,
    collapsed: false,

    source: null,
    target: null,

    parent: null,
    children: null,
    edges: null,

    // getter, setter
    // --------------
    getId: function () {
        return this.id;
    },

    setId: function (id) {
        this.id = id;
    },

    getValue: function () {
        return this.value;
    },

    setValue: function (value) {
        this.value = value;
    },

    getGeometry: function () {
        return this.geometry;
    },

    setGeometry: function (geometry) {
        this.geometry = geometry;
    },

    getStyle: function () {
        return this.style;
    },

    setStyle: function (style) {
        this.style = style;
    },

    isVertex: function () {
        return this.vertex;
    },

    setVertex: function (vertex) {
        this.vertex = vertex;
    },

    isEdge: function () {
        return this.edge;
    },

    setEdge: function (edge) {
        this.edge = edge;
    },

    isConnectable: function () {
        return this.connectable;
    },

    setConnectable: function (connectable) {
        this.connectable = connectable;
    },

    isVisible: function () {
        return this.visible;
    },

    setVisible: function (visible) {
        this.visible = visible;
    },

    isCollapsed: function () {
        return this.collapsed;
    },

    setCollapsed: function (collapsed) {
        this.collapsed = collapsed;
    },

    getParent: function () {
        return this.parent;
    },

    setParent: function (parent) {
        this.parent = parent;
    },

    getTerminal: function (source) {
        return (source) ? this.source : this.target;
    },

    setTerminal: function (terminal, isSource) {
        if (isSource) {
            this.source = terminal;
        }
        else {
            this.target = terminal;
        }

        return terminal;
    },

    getChildCount: function () {
        return this.children ? this.children.length : 0;
    },

    getIndex: function (child) {
        return utils.indexOf(this.children, child);
    },

    getChildAt: function (index) {
        return this.children ? this.children[index] : null;
    },

    insert: function (child, index) {
        if (child) {
            if (isNullOrUndefined(index)) {
                index = this.getChildCount();

                if (child.getParent() === this) {
                    index--;
                }
            }

            child.removeFromParent();
            child.setParent(this);

            if (!this.children) {
                this.children = [];
                this.children.push(child);
            } else {
                this.children.splice(index, 0, child);
            }
        }

        return child;
    },

    remove: function (index) {
        var child = null;

        if (this.children !== null && index >= 0) {
            child = this.getChildAt(index);

            if (child !== null) {
                this.children.splice(index, 1);
                child.setParent(null);
            }
        }

        return child;
    },

    removeFromParent: function () {
        if (this.parent !== null) {
            var index = this.parent.getIndex(this);
            this.parent.remove(index);
        }
    },

    getEdgeCount: function () {
        return (this.edges === null) ? 0 : this.edges.length;
    },

    getEdgeIndex: function (edge) {
        return utils.indexOf(this.edges, edge);
    },

    getEdgeAt: function (index) {
        return (this.edges === null) ? null : this.edges[index];
    },

    insertEdge: function (edge, isOutgoing) {
        if (edge !== null) {
            edge.removeFromTerminal(isOutgoing);
            edge.setTerminal(this, isOutgoing);

            if (this.edges === null ||
                edge.getTerminal(!isOutgoing) !== this ||
                utils.indexOf(this.edges, edge) < 0) {
                if (this.edges === null) {
                    this.edges = [];
                }

                this.edges.push(edge);
            }
        }

        return edge;
    },

    removeEdge: function (edge, isOutgoing) {
        if (edge !== null) {
            if (edge.getTerminal(!isOutgoing) !== this &&
                this.edges !== null) {
                var index = this.getEdgeIndex(edge);

                if (index >= 0) {
                    this.edges.splice(index, 1);
                }
            }

            edge.setTerminal(null, isOutgoing);
        }

        return edge;
    },

    removeFromTerminal: function (isSource) {
        var terminal = this.getTerminal(isSource);

        if (terminal !== null) {
            terminal.removeEdge(this, isSource);
        }
    },

    getAttribute: function (name, defaultValue) {
        var userObject = this.getValue();

        var val = (userObject !== null &&
        userObject.nodeType === constants.NODETYPE_ELEMENT) ?
            userObject.getAttribute(name) : null;

        return val || defaultValue;
    },

    setAttribute: function (name, value) {
        var userObject = this.getValue();

        if (userObject !== null &&
            userObject.nodeType === constants.NODETYPE_ELEMENT) {
            userObject.setAttribute(name, value);
        }
    },

    clone: function () {
        var clone = utils.clone(this, this.mxTransient);
        clone.setValue(this.cloneValue());

        return clone;
    },

    cloneValue: function () {
        var value = this.getValue();

        if (value !== null) {
            if (typeof(value.clone) === 'function') {
                value = value.clone();
            }
            else if (!isNaN(value.nodeType)) {
                value = value.cloneNode(true);
            }
        }

        return value;
    },

    valueChanged: function (newValue) {
        var previous = this.getValue();
        this.setValue(newValue);

        return previous;
    }
});

});
define('PaneJS/Stylesheet',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/constants','PaneJS/perimeter'],function (require, exports, module) {'use strict';

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var constants = require('PaneJS/constants');
var perimeter = require('PaneJS/perimeter');


module.exports = Class.create({


    constructor: function Stylesheet() {
        this.styles = {};

        this.putDefaultVertexStyle(this.createDefaultVertexStyle());
        this.putDefaultEdgeStyle(this.createDefaultEdgeStyle());
    },

    createDefaultVertexStyle: function () {
        var style = {};

        style[constants.STYLE_SHAPE] = constants.SHAPE_RECTANGLE;
        style[constants.STYLE_PERIMETER] = perimeter.RectanglePerimeter;
        style[constants.STYLE_VERTICAL_ALIGN] = constants.ALIGN_MIDDLE;
        style[constants.STYLE_ALIGN] = constants.ALIGN_CENTER;
        style[constants.STYLE_FILLCOLOR] = '#C3D9FF';
        style[constants.STYLE_STROKECOLOR] = '#6482B9';
        style[constants.STYLE_FONTCOLOR] = '#774400';

        return style;
    },

    createDefaultEdgeStyle: function () {
        var style = {};

        style[constants.STYLE_SHAPE] = constants.SHAPE_CONNECTOR;
        style[constants.STYLE_ENDARROW] = constants.ARROW_CLASSIC;
        style[constants.STYLE_VERTICAL_ALIGN] = constants.ALIGN_MIDDLE;
        style[constants.STYLE_ALIGN] = constants.ALIGN_CENTER;
        style[constants.STYLE_STROKECOLOR] = '#6482B9';
        style[constants.STYLE_FONTCOLOR] = '#446299';

        return style;
    },

    putDefaultVertexStyle: function (style) {
        this.putCellStyle('defaultVertex', style);
    },

    putDefaultEdgeStyle: function (style) {
        this.putCellStyle('defaultEdge', style);
    },

    getDefaultVertexStyle: function () {
        return this.styles['defaultVertex'];
    },

    getDefaultEdgeStyle: function () {
        return this.styles['defaultEdge'];
    },

    putCellStyle: function (name, style) {
        this.styles[name] = style;
    },

    getCellStyle: function (name, defaultStyle) {
        var style = defaultStyle;

        if (name != null && name.length > 0) {
            var pairs = name.split(';');

            if (style && name.charAt(0) != ';') {
                style = mxUtils.clone(style);
            }
            else {
                style = {};
            }

            // Parses each key, value pair into the existing style
            for (var i = 0; i < pairs.length; i++) {
                var tmp = pairs[i];
                var pos = tmp.indexOf('=');

                if (pos >= 0) {
                    var key = tmp.substring(0, pos);
                    var value = tmp.substring(pos + 1);

                    if (value == constants.NONE) {
                        delete style[key];
                    }
                    else if (utils.isNumeric(value)) {
                        style[key] = parseFloat(value);
                    }
                    else {
                        style[key] = value;
                    }
                }
                else {
                    // Merges the entries from a named style
                    var tmpStyle = this.styles[tmp];

                    if (tmpStyle != null) {
                        for (var key in tmpStyle) {
                            style[key] = tmpStyle[key];
                        }
                    }
                }
            }
        }

        return style;
    }
});

});
define('PaneJS/View',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/events/Event','PaneJS/common/Dictionary','PaneJS/constants','PaneJS/Point','PaneJS/Rectangle','PaneJS/CellState'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: false */
/* global document */

'use strict';

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var Event = require('PaneJS/events/Event');
var Dictionary = require('PaneJS/common/Dictionary');
var constants = require('PaneJS/constants');
var Point = require('PaneJS/Point');
var Rectangle = require('PaneJS/Rectangle');
var CellState = require('PaneJS/CellState');

var each = utils.each;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({

    Implements: Event,

    // 属性
    // ----

    graph: null,

    EMPTY_POINT: new Point(),
    // 国际化
    doneResource: '',
    updatingDocumentResource: '',

    allowEval: true,
    captureDocumentGesture: true,
    optimizeVmlReflows: true,
    rendering: true,
    currentRoot: null,
    graphBounds: null,
    scale: 1,
    translate: null,
    updateStyle: false,
    lastNode: null,
    lastHtmlNode: null,
    lastForegroundNode: null,
    lastForegroundHtmlNode: null,

    constructor: function View(graph) {

        var that = this;

        that.graph = graph || null;
        that.translate = new Point();
        that.graphBounds = new Rectangle();
        that.states = new Dictionary();
    },

    init: function () {
        return this.installListeners().createSvg();
    },

    getGraphBounds: function () {
        return this.graphBounds;
    },

    setGraphBounds: function (value) {
        this.graphBounds = value;
    },

    getBounds: function (cells) {

        var that = this;
        var result = null;

        if (!cells || !cells.length) {
            return result;
        }

        var model = that.graph.getModel();

        each(cells, function (cell) {

            if (model.isVertex(cell) || model.isEdge(cell)) {

                var state = that.getState(cell);

                if (state) {

                    var rect = new Rectangle(state.x, state.y, state.width, state.height);

                    if (result) {
                        result.add(rect);
                    } else {
                        result = rect;
                    }
                }
            }
        });

        return result;
    },

    setCurrentRoot: function (root) {
        if (this.currentRoot !== root) {
            var change = new CurrentRootChange(this, root);
            change.execute();
            var edit = new mxUndoableEdit(this, false);
            edit.add(change);
            this.fireEvent(new EventObject(mxEvent.UNDO, 'edit', edit));
            this.graph.sizeDidChange();
        }

        return root;
    },

    scaleAndTranslate: function (scale, dx, dy) {

        var that = this;
        var ts = that.translate;
        var previousScale = that.scale;
        var previousTranslate = new Point(ts.x, ts.y);

        if (previousScale !== scale || ts.x !== dx || ts.y !== dy) {

            that.scale = scale;

            that.translate.x = dx;
            that.translate.y = dy;

            if (that.isEventEnabled()) {
                that.revalidate();
                that.graph.sizeDidChange();
            }
        }

        that.fireEvent(new EventObject(mxEvent.SCALE_AND_TRANSLATE,
            'scale', scale, 'previousScale', previousScale,
            'translate', that.translate, 'previousTranslate', previousTranslate));
    },

    getScale: function () {
        return this.scale;
    },

    setScale: function (scale) {

        var that = this;
        var previousScale = that.scale;

        if (previousScale !== scale) {
            that.scale = scale;

            if (that.isEventEnabled()) {
                that.revalidate();
                that.graph.sizeDidChange();
            }
        }

        //that.fireEvent(new EventObject('scale',
        //    'scale', scale, 'previousScale', previousScale));
    },

    getTranslate: function () {
        return this.translate;
    },

    setTranslate: function (dx, dy) {

        var that = this;
        var translate = that.translate;
        var previousTranslate = new Point(translate.x, translate.y);

        if (translate.x !== dx || translate.y !== dy) {
            translate.x = dx;
            translate.y = dy;

            if (that.isEventEnabled()) {
                that.revalidate();
                that.graph.sizeDidChange();
            }
        }

        //that.fireEvent(new EventObject(mxEvent.TRANSLATE,
        //    'translate', translate, 'previousTranslate', previousTranslate));
    },

    refresh: function () {

        var that = this;

        if (that.currentRoot) {
            that.clear();
        }

        that.revalidate();

        return that;
    },

    revalidate: function () {

        var that = this;

        that.invalidate();
        that.validate();

        return that;
    },

    clear: function (cell, force, recurse) {

        var that = this;
        var model = that.graph.getModel();

        cell = cell || model.getRoot();
        force = !isNullOrUndefined(force) ? force : false;
        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        that.removeState(cell);

        if (recurse && (force || cell !== that.currentRoot)) {

            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                that.clear(model.getChildAt(cell, i), force);
            }
        } else {
            that.invalidate(cell);
        }
    },

    invalidate: function (cell, recurse, includeEdges) {

        var that = this;
        var model = that.graph.getModel();

        cell = cell || model.getRoot();
        recurse = !isNullOrUndefined(recurse) ? recurse : true;
        includeEdges = !isNullOrUndefined(includeEdges) ? includeEdges : true;

        var state = that.getState(cell);

        if (state) {
            state.invalid = true;
        }

        // Avoids infinite loops for invalid graphs
        if (!cell.invalidating) {
            cell.invalidating = true;

            if (recurse) {
                var childCount = model.getChildCount(cell);

                for (var i = 0; i < childCount; i++) {
                    var child = model.getChildAt(cell, i);
                    that.invalidate(child, recurse, includeEdges);
                }
            }

            if (includeEdges) {
                var edgeCount = model.getEdgeCount(cell);

                for (var i = 0; i < edgeCount; i++) {
                    that.invalidate(model.getEdgeAt(cell, i), recurse, includeEdges);
                }
            }

            delete cell.invalidating;
        }
    },

    //
    validate: function (cell) {

        var that = this;

        if (!cell) {
            cell = that.currentRoot || that.graph.getModel().getRoot();
        }

        that.resetValidationState();

        that.validateCell(cell);
        that.validateCellState(cell);
        var graphBounds = that.getBoundingBox(cell);

        that.setGraphBounds(graphBounds || that.getEmptyBounds());
        that.validateBackground();
        that.resetValidationState();
    },

    // 创建或移除 cell 对应的 state
    validateCell: function (cell, visible) {

        var that = this;

        if (!cell) {
            return cell;
        }

        visible = !isNullOrUndefined(visible) ? visible : true;
        visible = visible && that.graph.isCellVisible(cell);

        var state = that.getState(cell, visible);

        if (state && !visible) {
            that.removeState(cell);
        } else {

            var model = that.graph.getModel();
            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                this.validateCell(model.getChildAt(cell, i), visible &&
                    (!this.isCellCollapsed(cell) || cell == this.currentRoot));
            }
        }

        return cell;
    },

    validateCellState: function (cell, recurse) {

        var view = this;
        var state = null;

        if (!cell) {
            return state;
        }

        state = view.getState(cell);

        if (!state) {
            return state;
        }

        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        var model = view.graph.getModel();

        if (state.invalid) {
            state.invalid = false;

            if (cell !== this.currentRoot) {
                this.validateCellState(model.getParent(cell), false);
            }

            state.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(cell, true), false), true);
            state.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(cell, false), false), false);

            this.updateCellState(state);

            // Repaint happens immediately after the cell is validated
            if (cell !== this.currentRoot) {
                this.graph.cellRenderer.redraw(state, false, this.isRendering());
            }
        }

        if (recurse) {
            state.updateCachedBounds();

            // Updates order in DOM if recursively traversing
            if (state.shape) {
                this.stateValidated(state);
            }

            var childCount = model.getChildCount(cell);

            for (var i = 0; i < childCount; i++) {
                this.validateCellState(model.getChildAt(cell, i));
            }
        }

        return state;
    },

    getBoundingBox: function (state, recurse) {

        recurse = !isNullOrUndefined(recurse) ? recurse : true;

        var bbox = null;

        if (isNullOrUndefined(state)) {
            return bbox;
        }

        if (state.shape && state.shape.boundingBox) {
            bbox = state.shape.boundingBox.clone();
        }

        // Adds label bounding box to graph bounds
        if (state.text && state.text.boundingBox) {
            if (bbox) {
                bbox.add(state.text.boundingBox);
            } else {
                bbox = state.text.boundingBox.clone();
            }
        }

        if (recurse) {
            var model = this.graph.getModel();
            var childCount = model.getChildCount(state.cell);

            for (var i = 0; i < childCount; i++) {
                var bounds = this.getBoundingBox(this.getState(model.getChildAt(state.cell, i)));

                if (bounds != null) {
                    if (bbox == null) {
                        bbox = bounds;
                    }
                    else {
                        bbox.add(bounds);
                    }
                }
            }
        }

        return bbox;
    },

    getEmptyBounds: function () {
        var view = this;
        var translate = view.translate;
        var scale = view.scale;

        return new Rectangle(translate.x * scale, translate.y * scale);
    },

    createBackgroundPageShape: function (bounds) {

    },

    validateBackground: function () {
        this.validateBackgroundImage();
        this.validateBackgroundPage();
    },

    validateBackgroundImage: function () {},

    validateBackgroundPage: function () {},

    getBackgroundPageBounds: function () {
        var view = this;
        var scale = view.scale;
        var translate = view.translate;
        var fmt = view.graph.pageFormat;
        var ps = scale * view.graph.pageScale;

        return new Rectangle(scale * translate.x, scale * translate.y, fmt.width * ps, fmt.height * ps);
    },

    redrawBackgroundImage: function (backgroundImage, bg) {
        backgroundImage.scale = this.scale;
        backgroundImage.bounds.x = this.scale * this.translate.x;
        backgroundImage.bounds.y = this.scale * this.translate.y;
        backgroundImage.bounds.width = this.scale * bg.width;
        backgroundImage.bounds.height = this.scale * bg.height;

        backgroundImage.redraw();
    },

    updateCellState: function (state) {
        state.absoluteOffset.x = 0;
        state.absoluteOffset.y = 0;
        state.origin.x = 0;
        state.origin.y = 0;
        state.length = 0;

        if (state.cell != this.currentRoot) {
            var model = this.graph.getModel();
            var pState = this.getState(model.getParent(state.cell));

            if (pState != null && pState.cell != this.currentRoot) {
                state.origin.x += pState.origin.x;
                state.origin.y += pState.origin.y;
            }

            var offset = this.graph.getChildOffsetForCell(state.cell);

            if (offset != null) {
                state.origin.x += offset.x;
                state.origin.y += offset.y;
            }

            var geo = this.graph.getCellGeometry(state.cell);

            if (geo) {
                if (!model.isEdge(state.cell)) {
                    offset = geo.offset || this.EMPTY_POINT;

                    if (geo.relative && pState != null) {
                        if (model.isEdge(pState.cell)) {
                            var origin = this.getPoint(pState, geo);

                            if (origin != null) {
                                state.origin.x += (origin.x / this.scale) - pState.origin.x - this.translate.x;
                                state.origin.y += (origin.y / this.scale) - pState.origin.y - this.translate.y;
                            }
                        }
                        else {
                            state.origin.x += geo.x * pState.width / this.scale + offset.x;
                            state.origin.y += geo.y * pState.height / this.scale + offset.y;
                        }
                    }
                    else {
                        state.absoluteOffset.x = this.scale * offset.x;
                        state.absoluteOffset.y = this.scale * offset.y;
                        state.origin.x += geo.x;
                        state.origin.y += geo.y;
                    }
                }

                state.x = this.scale * (this.translate.x + state.origin.x);
                state.y = this.scale * (this.translate.y + state.origin.y);
                state.width = this.scale * geo.width;
                state.height = this.scale * geo.height;

                if (model.isVertex(state.cell)) {
                    this.updateVertexState(state, geo);
                }

                if (model.isEdge(state.cell)) {
                    this.updateEdgeState(state, geo);
                }
            }
        }
    },

    isCellCollapsed: function (cell) {
        return this.graph.isCellCollapsed(cell);
    },

    updateVertexState: function (state, geo) {
        var model = this.graph.getModel();
        var pState = this.getState(model.getParent(state.cell));

        if (geo.relative && pState && !model.isEdge(pState.cell)) {
            var alpha = mxUtils.toRadians(pState.style[constants.STYLE_ROTATION] || '0');

            if (alpha != 0) {
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);

                var ct = new Point(state.getCenterX(), state.getCenterY());
                var cx = new Point(pState.getCenterX(), pState.getCenterY());
                var pt = utils.getRotatedPoint(ct, cos, sin, cx);
                state.x = pt.x - state.width / 2;
                state.y = pt.y - state.height / 2;
            }
        }

        this.updateVertexLabelOffset(state);
    },

    updateEdgeState: function (state, geo) {},

    updateVertexLabelOffset: function (state) {},

    resetValidationState: function () {
        this.lastNode = null;
        this.lastHtmlNode = null;
        this.lastForegroundNode = null;
        this.lastForegroundHtmlNode = null;
    },

    stateValidated: function (state) {},

    updateFixedTerminalPoints: function (edge, source, target) {},

    updateFixedTerminalPoint: function (edge, terminal, source, constraint) {},
    updatePoints: function (edge, points, source, target) {},
    transformControlPoint: function (state, pt) {},
    getEdgeStyle: function (edge, points, source, target) {},
    updateFloatingTerminalPoints: function (state, source, target) {},
    updateFloatingTerminalPoint: function (edge, start, end, source) {},
    getTerminalPort: function (state, terminal, source) {},
    getPerimeterPoint: function (terminal, next, orthogonal, border) {},
    getRoutingCenterX: function (state) {},
    getRoutingCenterY: function (state) {},
    getPerimeterBounds: function (terminal, border) {},
    getPerimeterFunction: function (state) {},
    getNextPoint: function (edge, opposite, source) {},
    getVisibleTerminal: function (edge, source) {},
    updateEdgeBounds: function (state) {},
    getPoint: function (state, geometry) {},
    getRelativePoint: function (edgeState, x, y) {},
    updateEdgeLabelOffset: function (state) {},

    getState: function (cell, create) {

        var that = this;
        var state = null;

        if (!cell) {
            return state;
        }

        create = create || false;

        state = that.states.get(cell);

        if (create && (!state || that.updateStyle) && that.graph.isCellVisible(cell)) {
            if (!state) {
                state = that.createState(cell);
                that.states.set(cell, state);
            } else { // updateStyle
                state.style = that.graph.getCellStyle(cell);
            }
        }

        return state;
    },

    createState: function (cell) {
        var state = new CellState(this, cell, this.graph.getCellStyle(cell));
        var model = this.graph.getModel();

        if (state.view.graph.container != null && state.cell != state.view.currentRoot &&
            (model.isVertex(state.cell) || model.isEdge(state.cell))) {
            // 根据 state 中的样式，初始化 state 对应的 shape
            this.graph.cellRenderer.createShape(state);
        }

        return state;
    },

    isRendering: function () {
        return this.rendering;
    },

    setRendering: function (value) {
        this.rendering = value;
    },

    isAllowEval: function () {
        return this.allowEval;
    },

    setAllowEval: function (value) {
        this.allowEval = value;
    },

    getStates: function () {
        return this.states;
    },

    setStates: function (value) {
        this.states = value;
    },

    getCellStates: function (cells) {
        if (isNullOrUndefined(cells)) {
            return this.states;
        } else {
            var result = [];

            for (var i = 0; i < cells.length; i++) {
                var state = this.getState(cells[i]);

                if (state != null) {
                    result.push(state);
                }
            }

            return result;
        }
    },

    removeState: function (cell) {

        var state = null;

        if (cell != null) {
            state = this.states.remove(cell);

            if (state != null) {
                this.graph.cellRenderer.destroy(state);
                state.destroy();
            }
        }

        return state;
    },

    getCanvas: function () {
        return this.canvas;
    },
    getBackgroundPane: function () {
        return this.backgroundPane;
    },
    getDrawPane: function () {
        return this.drawPane;
    },
    getOverlayPane: function () {
        return this.overlayPane;
    },
    getDecoratorPane: function () {
        return this.decoratorPane;
    },
    isContainerEvent: function (evt) {},

    isScrollEvent: function (evt) {},

    installListeners: function () {
        return this;
    },

    createSvg: function () {

        var view = this;

        view.canvas = document.createElementNS(constants.NS_SVG, 'g');

        view.backgroundPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.backgroundPane);

        view.drawPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.drawPane);

        view.overlayPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.overlayPane);

        view.decoratorPane = document.createElementNS(constants.NS_SVG, 'g');
        view.canvas.appendChild(view.decoratorPane);

        var root = document.createElementNS(constants.NS_SVG, 'svg');
        root.style.width = '100%';
        root.style.height = '100%';

        // NOTE: In standards mode, the SVG must have block layout
        // in order for the container DIV to not show scrollbars.
        root.style.display = 'block';
        root.appendChild(view.canvas);


        var container = view.graph.container;

        if (container !== null) {
            container.appendChild(root);
            view.updateContainerStyle(container);
        }

        return this;
    },

    // 更新容器的样式
    updateContainerStyle: function (container) {},

    destroy: function () {}
});


});
define('PaneJS/Model',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/events/Event','PaneJS/events/EventObject','PaneJS/changes/RootChange','PaneJS/changes/ChildChange','PaneJS/Cell','PaneJS/UndoableEdit'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var Event = require('PaneJS/events/Event');
var EventObject = require('PaneJS/events/EventObject');
var RootChange = require('PaneJS/changes/RootChange');
var ChildChange = require('PaneJS/changes/ChildChange');
var Cell = require('PaneJS/Cell');
var UndoableEdit = require('PaneJS/UndoableEdit');

var each = utils.each;
var isNumeric = utils.isNumeric;
var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    Implements: Event,
    root: null,
    cells: null,
    maintainEdgeParent: true,
    createIds: true,
    prefix: '',
    postfix: '',
    nextId: 0,
    currentEdit: null,
    updateLevel: 0,
    endingUpdate: false,

    constructor: function Model(root) {

        var model = this;

        this.currentEdit = model.createUndoableEdit();

        root ? model.setRoot(root) : model.clear();
    },

    clear: function () {

        var model = this;
        var root = model.createRoot();

        model.setRoot(root);

        return model;
    },

    createRoot: function () {

        var cell = new Cell();

        cell.insert(new Cell());

        return cell;
    },

    setRoot: function (root) {

        var model = this;

        model.execute(new RootChange(model, root));

        return model;
    },

    getRoot: function (cell) {

        var model = this;
        var root = cell || model.root;

        while (cell) {
            root = cell;
            cell = model.getParent(cell);
        }

        return root;
    },

    getCell: function (id) {
        var cells = this.cells;
        return cells ? cells[id] : null;
    },

    filterCells: function (cells, filter) {
        var result = [];

        if (cells != null) {
            for (var i = 0; i < cells.length; i++) {
                if (filter(cells[i])) {
                    result.push(cells[i]);
                }
            }
        }

        return result;
    },

    getDescendants: function (parent) {
        return this.filterDescendants(null, parent);
    },

    filterDescendants: function (filter, parent) {

        var model = this;
        var result = [];

        parent = parent || model.getRoot();

        if (isNullOrUndefined(filter) || filter(parent)) {
            result.push(parent);
        }

        // Visits the children of the cell
        var childCount = this.getChildCount(parent);

        for (var i = 0; i < childCount; i++) {
            var child = this.getChildAt(parent, i);
            result = result.concat(this.filterDescendants(filter, child));
        }

        return result;
    },

    rootChanged: function (root) {

        var model = this;
        var oldRoot = model.root;

        model.root = root;
        model.nextId = 0;
        model.cells = null;
        model.cellAdded(root);

        return oldRoot;
    },

    isRoot: function (cell) {
        return cell && this.root === cell;
    },

    isLayer: function (cell) {
        var model = this;
        var parent = model.getParent(cell);

        return model.isRoot(parent);
    },

    isAncestor: function (parent, child) {
        while (child && child !== parent) {
            child = this.getParent(child);
        }

        return child === parent;
    },

    isCreateIds: function () {
        return this.createIds;
    },

    setCreateIds: function (value) {
        this.createIds = value;
    },

    contains: function (cell) {
        return this.isAncestor(this.root, cell);
    },

    getParent: function (cell) {
        return cell ? cell.getParent() : null;
    },

    add: function (parent, child, index) {
        if (parent && child && child !== parent) {
            if (isNullOrUndefined(index)) {
                index = this.getChildCount(parent);
            }

            var parentChanged = parent !== this.getParent(child);
            this.execute(new ChildChange(this, parent, child, index));

            // Maintains the edges parents by moving the edges
            // into the nearest common ancestor of its
            // terminals
            if (this.maintainEdgeParent && parentChanged) {
                this.updateEdgeParents(child);
            }
        }

        return child;
    },

    cellAdded: function (cell) {
        if (!cell) {
            return;
        }

        // Creates an Id for the cell if not Id exists
        if (!cell.getId() && this.createIds) {
            cell.setId(this.createId());
        }

        if (cell.getId()) {
            var exists = this.getCell(cell.getId());

            if (exists !== cell) {
                // 避免 ID 冲突
                while (exists) {
                    cell.setId(this.createId(cell));
                    exists = this.getCell(cell.getId());
                }

                if (!this.cells) {
                    this.cells = {};
                }

                this.cells[cell.getId()] = cell;
            }
        }

        // Makes sure IDs of deleted cells are not reused
        if (isNumeric(cell.getId())) {
            this.nextId = Math.max(this.nextId, cell.getId());
        }

        // Recursively processes child cells
        var childCount = this.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            this.cellAdded(this.getChildAt(cell, i));
        }
    },

    createId: function () {
        var model = this;
        var id = model.nextId;

        model.nextId++;

        return model.prefix + id + model.postfix;
    },

    updateEdgeParents: function (cell, root) {},

    updateEdgeParent: function (cell, root) {},

    getOrigin: function (cell) {
        var model = this;
        var result = null;

        if (cell) {
            result = model.getOrigin(model.getParent(cell));

            if (!model.isEdge(cell)) {
                var geo = model.getGeometry(cell);

                if (geo) {
                    result.x += geo.x;
                    result.y += geo.y;
                }
            }
        } else {
            result = new Point();
        }

        return result;
    },

    // 获取最近的共同父节点
    getNearestCommonAncestor: function (cell1, cell2) {},

    remove: function (cell) {

        var model = this;

        if (cell === model.root) {
            model.setRoot(null);
        } else if (model.getParent(cell)) {
            model.execute(new ChildChange(this, null, cell));
        }

        return cell;
    },

    cellRemoved: function (cell) {
        if (cell && this.cells) {
            // Recursively processes child cells
            var childCount = this.getChildCount(cell);

            for (var i = childCount - 1; i >= 0; i--) {
                this.cellRemoved(this.getChildAt(cell, i));
            }

            // Removes the dictionary entry for the cell
            if (this.cells && cell.getId()) {
                delete this.cells[cell.getId()];
            }
        }
    },

    // 更新 cell 的 parent
    parentForCellChanged: function (cell, parent, index) {
        var previous = this.getParent(cell);

        if (parent) {
            if (parent !== previous || previous.getIndex(cell) !== index) {
                parent.insert(cell, index);
            }
        } else if (previous != null) { // remove from parent
            var oldIndex = previous.getIndex(cell);
            previous.remove(oldIndex);
        }

        // Checks if the previous parent was already in the
        // model and avoids calling cellAdded if it was.
        if (!this.contains(previous) && parent) {
            this.cellAdded(cell);
        } else if (parent == null) {
            this.cellRemoved(cell);
        }

        return previous;
    },

    getChildCount: function (cell) {
        return cell ? cell.getChildCount() : 0;
    },
    getChildAt: function (cell, index) {
        return cell ? cell.getChildAt(index) : null;
    },
    getChildren: function (cell) {
        return cell ? cell.children : null;
    },
    eachChildren: function (cell, iterator) {
        each(cell ? cell.children : [], iterator);
    },
    getChildVertices: function (parent) {
        return this.getChildCells(parent, true, false);
    },
    getChildEdges: function (parent) {
        return this.getChildCells(parent, false, true);
    },
    getChildCells: function (parent, isVertice, isEdge) {
        isVertice = !isNullOrUndefined(isVertice) ? isVertice : false;
        isEdge = !isNullOrUndefined(isEdge) ? isEdge : false;

        var childCount = this.getChildCount(parent);
        var result = [];

        for (var i = 0; i < childCount; i++) {
            var child = this.getChildAt(parent, i);

            if ((!isEdge && !isVertice) || (isEdge && this.isEdge(child)) ||
                (isVertice && this.isVertex(child))) {
                result.push(child);
            }
        }

        return result;
    },

    getTerminal: function (edge, isSource) {
        return edge ? edge.getTerminal(isSource) : null;
    },
    setTerminal: function (edge, terminal, isSource) {
        var terminalChanged = terminal != this.getTerminal(edge, isSource);
        this.execute(new TerminalChange(this, edge, terminal, isSource));

        if (this.maintainEdgeParent && terminalChanged) {
            this.updateEdgeParent(edge, this.getRoot());
        }

        return terminal;
    },
    setTerminals: function (edge, source, target) {
        // 设置连线的源和目标
        this.beginUpdate();
        try {
            this.setTerminal(edge, source, true);
            this.setTerminal(edge, target, false);
        }
        finally {
            this.endUpdate();
        }
    },
    terminalForCellChanged: function (edge, cell, isSource) {
        var previous = this.getTerminal(edge, isSource);

        if (cell != null) {
            cell.insertEdge(edge, isSource);
        }
        else if (previous != null) {
            previous.removeEdge(edge, isSource);
        }

        return previous;
    },

    getEdgeCount: function (cell) {
        return cell ? cell.getEdgeCount() : 0;
    },
    getEdgeAt: function (cell, index) {
        return cell ? cell.getEdgeAt(index) : null;
    },
    getDirectedEdgeCount: function (cell, outgoing, ignoredEdge) {

    },
    getConnections: function (cell) {},
    getIncomingEdges: function (cell) {},
    getOutgoingEdges: function (cell) {},
    getEdges: function (cell, incoming, outgoing, includeLoops) {},
    getEdgesBetween: function (source, target, directed) {},
    getOpposites: function (edges, terminal, sources, targets) {},
    getTopmostCells: function (cells) {},

    isVertex: function (cell) {
        return cell ? cell.isVertex() : false;
    },
    isEdge: function (cell) {
        return cell ? cell.isEdge() : false;
    },
    isConnectable: function (cell) {
        return cell ? cell.isConnectable() : false;
    },
    getValue: function (cell) {
        return cell ? cell.getValue() : null;
    },
    setValue: function (cell, value) {
        this.execute(new ValueChange(this, cell, value));
        return value;
    },
    valueForCellChanged: function (cell, value) {},

    getGeometry: function (cell) {
        return cell ? cell.getGeometry() : null;
    },
    setGeometry: function (cell, geometry) {},
    geometryForCellChanged: function (cell, geometry) {},

    getStyle: function (cell) {
        return cell ? cell.getStyle() : null;
    },
    setStyle: function (cell, style) {},
    styleForCellChanged: function (cell, style) {},

    isCollapsed: function (cell) {},
    setCollapsed: function (cell, collapsed) {},
    collapsedStateForCellChanged: function (cell, collapsed) {},

    isVisible: function (cell) {
        return cell ? cell.isVisible() : false;
    },
    setVisible: function (cell, visible) {},
    visibleStateForCellChanged: function (cell, visible) {},

    execute: function (change) {

        change.digest();

        this.beginUpdate();

        this.currentEdit.add(change);
        //this.fireEvent(new mxEventObject(mxEvent.EXECUTE, 'change', change));
        this.emit(new EventObject('execute', {change: change}));
        // New global executed event
        //this.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', change));
        this.emit(new EventObject('executed', {change: change}));

        this.endUpdate();

    },

    beginUpdate: function () {
        this.updateLevel++;
        //this.fireEvent(new mxEventObject(mxEvent.BEGIN_UPDATE));
        this.emit(new EventObject('beginUpdate'));

        if (this.updateLevel == 1) {
            //this.fireEvent(new mxEventObject(mxEvent.START_EDIT));
            this.emit(new EventObject('startEdit'));
        }
    },

    endUpdate: function () {
        this.updateLevel--;

        if (this.updateLevel == 0) {
            //this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
            this.emit(new EventObject('endEdit'));
        }

        if (!this.endingUpdate) {
            this.endingUpdate = this.updateLevel == 0;
            //this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));
            this.emit(new EventObject('endUpdate', {edit: this.currentEdit}));

            try {
                if (this.endingUpdate && !this.currentEdit.isEmpty()) {
                    //this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
                    this.emit(new EventObject('beforeUndo', {edit: this.currentEdit}));
                    var tmp = this.currentEdit;
                    this.currentEdit = this.createUndoableEdit();
                    tmp.notify();
                    //this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', tmp));
                    this.emit(new EventObject('undo', {edit: tmp}));
                }
            }
            finally {
                this.endingUpdate = false;
            }
        }
    },

    createUndoableEdit: function () {
        var edit = new UndoableEdit(this, true);

        edit.notify = function () {
            var model = edit.source;

            model.emit(new EventObject('change', {
                edit: edit,
                changes: edit.changes
            }));
            model.emit(new EventObject('notify', {
                edit: edit,
                changes: edit.changes
            }));

            // LATER: Remove changes property (deprecated)
            //edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
            //    'edit', edit, 'changes', edit.changes));
            //edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
            //    'edit', edit, 'changes', edit.changes));
        };

        return edit;
    },

    mergeChildren: function (from, to, cloneAllEdges) {},

    mergeChildrenImpl: function (from, to, cloneAllEdges, mapping) {},

    getParents: function (cell) {},

    cloneCell: function (cell) {},

    cloneCells: function (cell, includeChildren) {},

    cloneCellImpl: function (cell, mapping, includeChildren) {},

    cellCloned: function (cell) {},

    restoreClone: function (clone, cell, mapping) {},

    destroy: function () {}
});


});
define('PaneJS/shapes/Shape',['require','exports','module','../Base','../common/utils','../constants','../Point','../Rectangle','../Canvas2D'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Base = require('../Base');
var utils = require('../common/utils');
var constants = require('../constants');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var Canvas2D = require('../Canvas2D');


var each = utils.each;
var getValue = utils.getValue;
var getNumber = utils.getNumber;
var isNullOrUndefined = utils.isNullOrUndefined;

// style 的属性：style[constants.STYLE_SHAPE]

var Shape = Base.extend({

    node: null,         // 图形的根节点，通常是 g 元素
    state: null,        // cellState
    style: null,        // cellStyle
    bounds: null,       // Rectangle 表示该图形的区域范围
    boundingBox: null,  // 图形的边框
    stencil: null,
    scale: 1,
    points: null,
    antiAlias: true,    // 抗锯齿，平滑处理
    pointerEvents: true,
    svgPointerEvents: 'all',
    svgStrokeTolerance: 8,
    shapePointerEvents: false,
    stencilPointerEvents: false,

    outline: false,
    visible: true,      // 默认可见

    constructor: function Shape(stencil) {

        var that = this;

        that.stencil = stencil; // 模板
        that.strokewidth = 1;
        that.rotation = 0;
        that.opacity = 100;
        that.flipH = false;    // 水平翻转
        that.flipV = false;    // 垂直翻转
    },

    // 根据 state.style 初始化该图形的样式属性
    apply: function (state) {

        var that = this;

        that.state = state;
        that.style = state.style;

        if (that.style) {
            that.fill = getValue(that.style, constants.STYLE_FILLCOLOR, that.fill);
            that.gradient = getValue(that.style, constants.STYLE_GRADIENTCOLOR, that.gradient);
            that.gradientDirection = getValue(that.style, constants.STYLE_GRADIENT_DIRECTION, that.gradientDirection);
            that.opacity = getValue(that.style, constants.STYLE_OPACITY, that.opacity);
            that.stroke = getValue(that.style, constants.STYLE_STROKECOLOR, that.stroke);
            that.strokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokewidth);
            // Arrow stroke width is used to compute the arrow heads size in mxConnector
            that.arrowStrokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokewidth);
            that.spacing = getValue(that.style, constants.STYLE_SPACING, that.spacing);
            that.startSize = getNumber(that.style, constants.STYLE_STARTSIZE, that.startSize);
            that.endSize = getNumber(that.style, constants.STYLE_ENDSIZE, that.endSize);
            that.startArrow = getValue(that.style, constants.STYLE_STARTARROW, that.startArrow);
            that.endArrow = getValue(that.style, constants.STYLE_ENDARROW, that.endArrow);
            that.rotation = getValue(that.style, constants.STYLE_ROTATION, that.rotation);
            that.direction = getValue(that.style, constants.STYLE_DIRECTION, that.direction);
            that.flipH = getValue(that.style, constants.STYLE_FLIPH, 0) === 1;
            that.flipV = getValue(that.style, constants.STYLE_FLIPV, 0) === 1;

            // Legacy support for stencilFlipH/V
            if (that.stencil) {
                that.flipH = getValue(that.style, 'stencilFlipH', 0) === 1 || that.flipH;
                that.flipV = getValue(that.style, 'stencilFlipV', 0) === 1 || that.flipV;
            }

            if (that.direction === constants.DIRECTION_NORTH || that.direction === constants.DIRECTION_SOUTH) {
                var tmp = that.flipH;
                that.flipH = that.flipV;
                that.flipV = tmp;
            }

            that.isShadow = getValue(that.style, constants.STYLE_SHADOW, that.isShadow) === 1;
            that.isDashed = getValue(that.style, constants.STYLE_DASHED, that.isDashed) === 1;
            that.isRounded = getValue(that.style, constants.STYLE_ROUNDED, that.isRounded) === 1;
            that.glass = getValue(that.style, constants.STYLE_GLASS, that.glass) === 1;

            if (that.fill === constants.NONE) {
                that.fill = null;
            }

            if (that.gradient === constants.NONE) {
                that.gradient = null;
            }

            if (that.stroke === constants.NONE) {
                that.stroke = null;
            }
        }

        return that;
    },

    // 创建该图形的根节点
    init: function (container) {

        var that = this;
        var node = that.node || that.create(container);

        if (node && container) {
            that.node = node;
            container.appendChild(node);
        }

        return that;
    },

    create: function (container) {

        return container && container.ownerSVGElement ?
            document.createElementNS(constants.NS_SVG, 'g') :
            null;
    },

    // 删除根节点下所有的子元素
    clear: function () {

        var that = this;
        var node = that.node;

        if (node && node.ownerDocument) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return that;
    },

    getScreenOffset: function () {

        var that = this;
        var strokeWidth = that.stencil && that.stencil.strokewidth !== 'inherit'
            ? that.stencil.strokewidth
            : that.strokewidth;

        return (utils.mod(Math.max(1, Math.round(strokeWidth * that.scale)), 2) === 1) ? 0.5 : 0;
    },

    reconfigure: function () {
        return this.redraw();
    },

    redraw: function () {

        var that = this;
        var node = that.node;

        that.updateBoundsFromPoints();

        if (that.visible && that.checkBounds()) {
            node.style.visibility = 'visible';
            // 删除根节点下的所有子元素
            that.clear();
            //
            that.redrawShape();
            that.updateBoundingBox();
        } else {
            node.style.visibility = 'hidden';
            that.boundingBox = null;
        }

        return that;
    },

    redrawShape: function () {

        var that = this;
        var canvas = that.createCanvas();

        if (canvas) {
            canvas.pointerEvents = that.pointerEvents;

            that.paint(canvas);
            that.destroyCanvas(canvas);
        }

        return that;
    },

    paint: function (canvas) {

        var shape = this;
        var bounds = shape.bounds;

        // Scale is passed-through to canvas
        var scale = shape.scale;
        var x = bounds.x / scale;
        var y = bounds.y / scale;
        var w = bounds.width / scale;
        var h = bounds.height / scale;

        if (shape.isPaintBoundsInverted()) {

            var t = (w - h) / 2;
            x += t;
            y -= t;

            var tmp = w;
            w = h;
            h = tmp;
        }

        shape.updateTransform(canvas, x, y, w, h);
        shape.configureCanvas(canvas, x, y, w, h);

        // Adds background rectangle to capture events
        var bg = null;

        if ((!shape.stencil && !shape.points && shape.shapePointerEvents) ||
            (shape.stencil && shape.stencilPointerEvents)) {

            var bb = shape.createBoundingBox();

            bg = shape.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
            shape.node.appendChild(bg);
        }


        if (shape.stencil) {
            shape.stencil.drawShape(canvas, shape, x, y, w, h);
        } else {
            // Stencils have separate strokeWidth
            canvas.setStrokeWidth(shape.strokewidth);

            if (shape.points) {
                // Paints edge shape
                var pts = [];

                for (var i = 0; i < shape.points.length; i++) {
                    if (shape.points[i]) {
                        pts.push(new Point(shape.points[i].x / scale, shape.points[i].y / scale));
                    }
                }

                shape.paintEdgeShape(canvas, pts);
            } else {
                // Paints vertex shape
                shape.paintVertexShape(canvas, x, y, w, h);
            }
        }

        if (bg && canvas.state && canvas.state.transform) {
            bg.setAttribute('transform', canvas.state.transform);
        }
    },

    paintVertexShape: function (c, x, y, w, h) {
        this.paintBackground(c, x, y, w, h);
        c.setShadow(false);
        this.paintForeground(c, x, y, w, h);
    },

    paintBackground: function (c, x, y, w, h) { },

    paintForeground: function (c, x, y, w, h) { },

    paintEdgeShape: function (c, pts) {},

    paintGlassEffect: function (c, x, y, w, h, arc) {
        var sw = Math.ceil(this.strokewidth / 2);
        var size = 0.4;

        c.setGradient('#ffffff', '#ffffff', x, y, w, h * 0.6, 'south', 0.9, 0.1);
        c.begin();
        arc += 2 * sw;

        if (this.isRounded) {
            c.moveTo(x - sw + arc, y - sw);
            c.quadTo(x - sw, y - sw, x - sw, y - sw + arc);
            c.lineTo(x - sw, y + h * size);
            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            c.lineTo(x + w + sw, y - sw + arc);
            c.quadTo(x + w + sw, y - sw, x + w + sw - arc, y - sw);
        }
        else {
            c.moveTo(x - sw, y - sw);
            c.lineTo(x - sw, y + h * size);
            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
            c.lineTo(x + w + sw, y - sw);
        }

        c.close();
        c.fill();
    },

    addPoints: function (c, pts, rounded, arcSize, close) {
        var pe = pts[pts.length - 1];

        // Adds virtual waypoint in the center between start and end point
        if (close && rounded) {
            pts = pts.slice();
            var p0 = pts[0];
            var wp = new Point(pe.x + (p0.x - pe.x) / 2, pe.y + (p0.y - pe.y) / 2);
            pts.splice(0, 0, wp);
        }

        var pt = pts[0];
        var i = 1;

        // Draws the line segments
        c.moveTo(pt.x, pt.y);

        while (i < ((close) ? pts.length : pts.length - 1)) {
            var tmp = pts[mxUtils.mod(i, pts.length)];
            var dx = pt.x - tmp.x;
            var dy = pt.y - tmp.y;

            if (rounded && (dx != 0 || dy != 0)) {
                // Draws a line from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the last point
                var dist = Math.sqrt(dx * dx + dy * dy);
                var nx1 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny1 = dy * Math.min(arcSize, dist / 2) / dist;

                var x1 = tmp.x + nx1;
                var y1 = tmp.y + ny1;
                c.lineTo(x1, y1);

                // Draws a curve from the last point to the current
                // point with a spacing of size off the current point
                // into direction of the next point
                var next = pts[mxUtils.mod(i + 1, pts.length)];

                // Uses next non-overlapping point
                while (i < pts.length - 2 && Math.round(next.x - tmp.x) == 0 && Math.round(next.y - tmp.y) == 0) {
                    next = pts[mxUtils.mod(i + 2, pts.length)];
                    i++;
                }

                dx = next.x - tmp.x;
                dy = next.y - tmp.y;

                dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
                var nx2 = dx * Math.min(arcSize, dist / 2) / dist;
                var ny2 = dy * Math.min(arcSize, dist / 2) / dist;

                var x2 = tmp.x + nx2;
                var y2 = tmp.y + ny2;

                c.quadTo(tmp.x, tmp.y, x2, y2);
                tmp = new Point(x2, y2);
            }
            else {
                c.lineTo(tmp.x, tmp.y);
            }

            pt = tmp;
            i++;
        }

        if (close) {
            c.close();
        }
        else {
            c.lineTo(pe.x, pe.y);
        }
    },

    updateBoundsFromPoints: function () {

        var shape = this;
        var bounds;

        each(shape.points || [], function (point, index) {

            var rect = new Rectangle(point.x, point.y, 1, 1);

            if (index === 0) {
                shape.bounds = bounds = rect;
            } else {
                bounds.add(rect);
            }
        });

        return shape;
    },

    checkBounds: function () {

        var bounds = this.bounds;

        return bounds && !isNaN(bounds.x) && !isNaN(bounds.y) && !isNaN(bounds.width) && !isNaN(bounds.height) &&
            bounds.width > 0 &&
            bounds.height > 0;
    },

    getLabelBounds: function (rect) {
        return rect;
    },

    getGradientBounds: function (c, x, y, w, h) {
        return new Rectangle(x, y, w, h);
    },

    getArcSize: function (w, h) {
        var f = getValue(this.style, constants.STYLE_ARCSIZE,
                constants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
        return Math.min(w * f, h * f);
    },

    createBoundingBox: function () {

        var bb = this.bounds.clone();

        if ((this.stencil && (this.direction === constants.DIRECTION_NORTH ||
            this.direction === constants.DIRECTION_SOUTH)) || this.isPaintBoundsInverted()) {
            bb.rotate90();
        }

        return bb;
    },

    updateBoundingBox: function () {
        if (this.bounds != null) {
            var bbox = this.createBoundingBox();

            if (bbox != null) {
                this.augmentBoundingBox(bbox);
                var rot = this.getShapeRotation();

                if (rot != 0) {
                    bbox = mxUtils.getBoundingBox(bbox, rot);
                }
            }

            this.boundingBox = bbox;
        }
    },

    augmentBoundingBox: function (bbox) {
        if (this.isShadow) {
            bbox.width += Math.ceil(constants.SHADOW_OFFSET_X * this.scale);
            bbox.height += Math.ceil(constants.SHADOW_OFFSET_Y * this.scale);
        }

        // Adds strokeWidth
        bbox.grow(this.strokewidth * this.scale / 2);
    },

    updateTransform: function (canvas, x, y, w, h) {

        var shape = this;

        canvas.scale(shape.scale);
        canvas.rotate(shape.getShapeRotation(), shape.flipH, shape.flipV, x + w / 2, y + h / 2);

        return shape;
    },

    createCanvas: function () {

        var that = this;
        var node = that.node;
        var canvas = new Canvas2D(node, false);

        canvas.strokeTolerance = that.pointerEvents ? that.svgStrokeTolerance : 0;
        canvas.pointerEventsValue = that.svgPointerEvents;
        canvas.blockImagePointerEvents = false;//mxClient.IS_FF;
        canvas.antiAlias = that.antiAlias; // 抗锯齿

        var off = that.getScreenOffset();

        if (off === 0) {
            node.removeAttribute('transform');
        } else {
            node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
        }

        if (that.outline) {
            canvas.setStrokeWidth(this.strokewidth);
            canvas.setStrokeColor(this.stroke);

            if (this.isDashed !== null) {
                canvas.setDashed(this.isDashed);
            }

            canvas.setStrokeWidth = function () {};
            canvas.setStrokeColor = function () {};
            canvas.setFillColor = function () {};
            canvas.setGradient = function () {};
            canvas.setDashed = function () {};
        }

        return canvas;
    },

    configureCanvas: function (canvas, x, y, w, h) {
        var dash;

        if (this.style) {
            dash = this.style['dashPattern'];
        }

        canvas.setAlpha(this.opacity / 100);

        // Sets alpha, colors and gradients
        if (this.isShadow != null) {
            canvas.setShadow(this.isShadow);
        }

        // Dash pattern
        if (this.isDashed != null) {
            canvas.setDashed(this.isDashed);
        }

        if (dash != null) {
            canvas.setDashPattern(dash);
        }

        if (this.fill != null && this.fill != constants.NONE && this.gradient && this.gradient != constants.NONE) {
            var b = this.getGradientBounds(canvas, x, y, w, h);
            canvas.setGradient(this.fill, this.gradient, b.x, b.y, b.width, b.height, this.gradientDirection);
        }
        else {
            canvas.setFillColor(this.fill);
        }

        canvas.setStrokeColor(this.stroke);
    },

    destroyCanvas: function (canvas) {

        each(canvas.gradients, function (gradient) {
            gradient.mxRefCount = (gradient.mxRefCount || 0) + 1;
        });
        this.releaseSvgGradients(this.oldGradients);
        this.oldGradients = canvas.gradients;
    },

    setCursor: function (cursor) {

        var shape = this;
        var node = shape.node;

        cursor = cursor || '';

        shape.cursor = cursor;

        if (node) {
            node.style.cursor = cursor;
        }

        return shape;
    },

    getCursor: function () {
        return this.cursor;
    },

    getRotation: function () {
        var rotation = this.rotation;
        return isNullOrUndefined(rotation) ? 0 : rotation;
    },

    getTextRotation: function () {
        var rot = this.getRotation();

        if (getValue(this.style, constants.STYLE_HORIZONTAL, 1) !== 1) {
            //rot += mxText.prototype.verticalTextRotation;
            rot += -90;
        }

        return rot;
    },

    getShapeRotation: function () {
        var rot = this.getRotation();

        if (this.direction) {
            if (this.direction === constants.DIRECTION_NORTH) {
                rot += 270;
            }
            else if (this.direction === constants.DIRECTION_WEST) {
                rot += 180;
            }
            else if (this.direction === constants.DIRECTION_SOUTH) {
                rot += 90;
            }
        }

        return rot;
    },

    createTransparentSvgRectangle: function (x, y, w, h) {
        var rect = document.createElementNS(constants.NS_SVG, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', 'none');
        rect.setAttribute('pointer-events', 'all');

        return rect;
    },

    setTransparentBackgroundImage: function (node) {
        node.style.backgroundImage = 'url(\'' + mxClient.imageBasePath + '/transparent.gif\')';
    },

    releaseSvgGradients: function (grads) {
        if (grads != null) {
            for (var key in grads) {
                var gradient = grads[key];
                gradient.mxRefCount = (gradient.mxRefCount || 0) - 1;

                if (gradient.mxRefCount == 0 && gradient.parentNode != null) {
                    gradient.parentNode.removeChild(gradient);
                }
            }
        }
    },

    isPaintBoundsInverted: function () {
        return !this.stencil && (this.direction === constants.DIRECTION_NORTH ||
            this.direction === constants.DIRECTION_SOUTH);
    },

    destroy: function () {
        if (this.node) {
            mxEvent.release(this.node);

            if (this.node.parentNode) {
                this.node.parentNode.removeChild(this.node);
            }

            this.node = null;
        }

        // Decrements refCount and removes unused
        this.releaseSvgGradients(this.oldGradients);
        this.oldGradients = null;
    }
});

module.exports = Shape;

});
define('PaneJS/shapes/RectangleShape',['require','exports','module','../common/utils','./Shape'],function (require, exports, module) {var utils = require('../common/utils');
var Shape = require('./Shape');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({
    constructor: function RectangleShape(bounds, fill, stroke, strokeWidth) {

        var shape = this;

        shape.constructor.superclass.constructor.call(shape);

        shape.bounds = bounds;
        shape.fill = fill;
        shape.stroke = stroke;
        shape.strokewidth = !isNullOrUndefined(strokeWidth) ? strokeWidth : 1;
    },

    isHtmlAllowed: function () {
        var shape = this;
        return !shape.isRounded && !shape.glass && shape.rotation === 0;
    },

    paintBackground: function (canvas, x, y, w, h) {

        var shape = this;

        if (shape.isRounded) {
            var f = getValue(shape.style, constants.STYLE_ARCSIZE, mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
            var r = Math.min(w * f, h * f);
            canvas.rect(x, y, w, h, r, r);
        } else {
            canvas.rect(x, y, w, h);
        }

        canvas.fillAndStroke();

        return shape;
    },

    paintForeground: function (c, x, y, w, h) {

        var shape = this;

        if (shape.glass && !shape.outline) {
            shape.paintGlassEffect(c, x, y, w, h, shape.getArcSize(w + shape.strokewidth, h + shape.strokewidth));
        }

        return shape;
    }
});

});
define('PaneJS/shapes/Text',['require','exports','module','../common/utils','./Shape','../Point','../constants'],function (require, exports, module) {var utils = require('../common/utils');
var Shape = require('./Shape');
var Point = require('../Point');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = Shape.extend({

    baseSpacingTop: 0,
    baseSpacingBottom: 0,
    baseSpacingLeft: 0,
    baseSpacingRight: 0,
    replaceLinefeeds: true,
    verticalTextRotation: -90,
    ignoreClippedStringSize: true,
    ignoreStringSize: false,
    textWidthPadding: 3,


    constructor: function Text(
        value, bounds, align, valign, color,
        family, size, fontStyle, spacing, spacingTop, spacingRight,
        spacingBottom, spacingLeft, horizontal, background, border,
        wrap, clipped, overflow, labelPadding
    ) {

        this.constructor.superclass.constructor.call(this);

        this.value = value;
        this.bounds = bounds;
        this.color = (color != null) ? color : 'black';
        this.align = (align != null) ? align : '';
        this.valign = (valign != null) ? valign : '';
        this.family = (family != null) ? family : constants.DEFAULT_FONTFAMILY;
        this.size = (size != null) ? size : constants.DEFAULT_FONTSIZE;
        this.fontStyle = (fontStyle != null) ? fontStyle : constants.DEFAULT_FONTSTYLE;
        this.spacing = parseInt(spacing || 2);
        this.spacingTop = this.spacing + parseInt(spacingTop || 0);
        this.spacingRight = this.spacing + parseInt(spacingRight || 0);
        this.spacingBottom = this.spacing + parseInt(spacingBottom || 0);
        this.spacingLeft = this.spacing + parseInt(spacingLeft || 0);
        this.horizontal = (horizontal != null) ? horizontal : true;
        this.background = background;
        this.border = border;
        this.wrap = (wrap != null) ? wrap : false;
        this.clipped = (clipped != null) ? clipped : false;
        this.overflow = (overflow != null) ? overflow : 'visible';
        this.labelPadding = (labelPadding != null) ? labelPadding : 0;
        this.rotation = 0;
        this.updateMargin();
    },

    isParseVml: function () {return false},
    isHtmlAllowed: function () {return true},
    getSvgScreenOffset: function () {return 0},

    checkBounds: function () {
        return (this.bounds && !isNaN(this.bounds.x) && !isNaN(this.bounds.y) && !isNaN(this.bounds.width) && !isNaN(this.bounds.height));
    },

    apply: function (state) {
        this.constructor.superclass.apply.apply(this, arguments);

        if (this.style != null) {
            this.fontStyle = mxUtils.getValue(this.style, constants.STYLE_FONTSTYLE, this.fontStyle);
            this.family = mxUtils.getValue(this.style, constants.STYLE_FONTFAMILY, this.family);
            this.size = mxUtils.getValue(this.style, constants.STYLE_FONTSIZE, this.size);
            this.color = mxUtils.getValue(this.style, constants.STYLE_FONTCOLOR, this.color);
            this.align = mxUtils.getValue(this.style, constants.STYLE_ALIGN, this.align);
            this.valign = mxUtils.getValue(this.style, constants.STYLE_VERTICAL_ALIGN, this.valign);
            this.spacingTop = mxUtils.getValue(this.style, constants.STYLE_SPACING_TOP, this.spacingTop);
            this.spacingRight = mxUtils.getValue(this.style, constants.STYLE_SPACING_RIGHT, this.spacingRight);
            this.spacingBottom = mxUtils.getValue(this.style, constants.STYLE_SPACING_BOTTOM, this.spacingBottom);
            this.spacingLeft = mxUtils.getValue(this.style, constants.STYLE_SPACING_LEFT, this.spacingLeft);
            this.horizontal = mxUtils.getValue(this.style, constants.STYLE_HORIZONTAL, this.horizontal);
            this.background = mxUtils.getValue(this.style, constants.STYLE_LABEL_BACKGROUNDCOLOR, this.background);
            this.border = mxUtils.getValue(this.style, constants.STYLE_LABEL_BORDERCOLOR, this.border);
            this.updateMargin();
        }
    },

    updateBoundingBox: function () {
        var node = this.node;
        this.boundingBox = this.bounds.clone();
        var rot = this.getTextRotation();

        var h = (this.style != null) ? mxUtils.getValue(this.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER) : null;
        var v = (this.style != null) ? mxUtils.getValue(this.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE) : null;

        if (!this.ignoreStringSize && node != null && this.overflow != 'fill' && (!this.clipped || !this.ignoreClippedStringSize || h != constants.ALIGN_CENTER || v != constants.ALIGN_MIDDLE)) {
            var ow = null;
            var oh = null;

            if (node.ownerSVGElement != null) {
                if (node.firstChild != null && node.firstChild.firstChild != null &&
                    node.firstChild.firstChild.nodeName == 'foreignObject') {
                    node = node.firstChild.firstChild;
                    ow = parseInt(node.getAttribute('width')) * this.scale;
                    oh = parseInt(node.getAttribute('height')) * this.scale;
                }
                else {
                    try {
                        var b = node.getBBox();

                        // Workaround for bounding box of empty string
                        if (typeof(this.value) == 'string' && mxUtils.trim(this.value) == 0) {
                            return;
                        }

                        if (b.width == 0 && b.height == 0) {
                            return;
                        }

                        this.boundingBox = new mxRectangle(b.x, b.y, b.width, b.height);
                        rot = 0;
                    }
                    catch (e) {
                        // Ignores NS_ERROR_FAILURE in FF if container display is none.
                    }
                }
            }
            else {
                var td = (this.state != null) ? this.state.view.textDiv : null;

                // Use cached offset size
                if (this.offsetWidth != null && this.offsetHeight != null) {
                    ow = this.offsetWidth * this.scale;
                    oh = this.offsetHeight * this.scale;
                }
                else {
                    // Cannot get node size while container hidden so a
                    // shared temporary DIV is used for text measuring
                    if (td != null) {
                        this.updateFont(td);
                        this.updateSize(td, false);
                        this.updateInnerHtml(td);

                        node = td;
                    }

                    var sizeDiv = node;

                    if (document.documentMode == 8 && !mxClient.IS_EM) {
                        var w = Math.round(this.bounds.width / this.scale);

                        if (this.wrap && w > 0) {
                            node.whiteSpace = 'normal';

                            // Innermost DIV is used for measuring text
                            var divs = sizeDiv.getElementsByTagName('div');

                            if (divs.length > 0) {
                                sizeDiv = divs[divs.length - 1];
                            }

                            ow = sizeDiv.offsetWidth + 2;
                            divs = this.node.getElementsByTagName('div');

                            if (this.clipped) {
                                ow = Math.min(w, ow);
                            }

                            // Second last DIV width must be updated in DOM tree
                            if (divs.length > 1) {
                                divs[divs.length - 2].style.width = ow + 'px';
                            }
                        }
                        else {
                            node.whiteSpace = 'nowrap';
                        }
                    }
                    else if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                        sizeDiv = sizeDiv.firstChild;
                    }

                    ow = (sizeDiv.offsetWidth + this.textWidthPadding) * this.scale;
                    oh = sizeDiv.offsetHeight * this.scale;
                }
            }

            if (ow != null && oh != null) {
                var x0 = this.bounds.x + this.margin.x * ow;
                var y0 = this.bounds.y + this.margin.y * oh;

                this.boundingBox = new mxRectangle(x0, y0, ow, oh);
            }
        }
        else {
            this.boundingBox.x += this.margin.x * this.boundingBox.width;
            this.boundingBox.y += this.margin.y * this.boundingBox.height;
        }

        if (this.boundingBox != null) {
            if (rot != 0) {
                var bbox = mxUtils.getBoundingBox(this.boundingBox, rot);

                this.boundingBox.x = bbox.x;
                this.boundingBox.y = bbox.y;

                if (!mxClient.IS_QUIRKS) {
                    this.boundingBox.width = bbox.width;
                    this.boundingBox.height = bbox.height;
                }
            }
        }
    },

    getShapeRotation: function () {
        return 0;
    },

    getTextRotation: function () {
        return (this.state != null && this.state.shape != null) ? this.state.shape.getTextRotation() : 0;
    },

    isPaintBoundsInverted: function () {
        return !this.horizontal && this.state != null && this.state.view.graph.model.isVertex(this.state.cell);
    },

    configureCanvas: function (c, x, y, w, h) {
        this.constructor.superclass.configureCanvas.apply(this, arguments);

        c.setFontColor(this.color);
        c.setFontBackgroundColor(this.background);
        c.setFontBorderColor(this.border);
        c.setFontFamily(this.family);
        c.setFontSize(this.size);
        c.setFontStyle(this.fontStyle);
    },

    updateVmlContainer: function () {
        this.node.style.left = Math.round(this.bounds.x) + 'px';
        this.node.style.top = Math.round(this.bounds.y) + 'px';
        this.node.style.width = '1px';
        this.node.style.height = '1px';
        this.node.style.overflow = 'visible';
    },

    paint: function (c) {
        // Scale is passed-through to canvas
        var s = this.scale;
        var x = this.bounds.x / s;
        var y = this.bounds.y / s;
        var w = this.bounds.width / s;
        var h = this.bounds.height / s;

        this.updateTransform(c, x, y, w, h);
        this.configureCanvas(c, x, y, w, h);

        // Checks if text contains HTML markup
        var realHtml = utils.isNode(this.value) || this.dialect == constants.DIALECT_STRICTHTML;

        // Always renders labels as HTML in VML
        //var fmt = (realHtml || c instanceof mxVmlCanvas2D) ? 'html' : '';
        var fmt =  '';
        var val = this.value;

        if (!realHtml && fmt == 'html') {
            val = mxUtils.htmlEntities(val, false);
        }

        val = (!utils.isNode(this.value) && this.replaceLinefeeds && fmt == 'html') ?
            val.replace(/\n/g, '<br/>') : val;

        c.text(x, y, w, h, val, this.align, this.valign, this.wrap, fmt, this.overflow,
            this.clipped, this.getTextRotation());
    },

    redrawHtmlShape: function () { },

    updateHtmlTransform: function () { },

    updateInnerHtml: function (elt) {

        if (mxUtils.isNode(this.value)) {
            elt.innerHTML = this.value.outerHTML;
        }
        else {
            var val = this.value;

            if (this.dialect != constants.DIALECT_STRICTHTML) {
                // LATER: Can be cached in updateValue
                val = mxUtils.htmlEntities(val, false);
            }

            val = (this.replaceLinefeeds) ? val.replace(/\n/g, '<br/>') : val;
            val = '<div style="display:inline-block;_display:inline;">' + val + '</div>';

            elt.innerHTML = val;
        }
    },

    updateHtmlFilter: function () {
        var style = this.node.style;
        var dx = this.margin.x;
        var dy = this.margin.y;
        var s = this.scale;

        // Resets filter before getting offsetWidth
        mxUtils.setOpacity(this.node, this.opacity);

        // Adds 1 to match table height in 1.x
        var ow = 0;
        var oh = 0;
        var td = (this.state != null) ? this.state.view.textDiv : null;
        var sizeDiv = this.node;

        // Fallback for hidden text rendering in IE quirks mode
        if (td != null) {
            td.style.overflow = '';
            td.style.height = '';
            td.style.width = '';

            this.updateFont(td);
            this.updateSize(td, false);
            this.updateInnerHtml(td);

            var w = Math.round(this.bounds.width / this.scale);

            if (this.wrap && w > 0) {
                td.whiteSpace = 'normal';
                ow = w;

                if (this.clipped) {
                    ow = Math.min(ow, this.bounds.width);
                }

                td.style.width = ow + 'px';
            }
            else {
                td.whiteSpace = 'nowrap';
            }

            sizeDiv = td;

            if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                sizeDiv = sizeDiv.firstChild;
            }

            // Required to update the height of the text box after wrapping width is known
            if (!this.clipped && this.wrap && w > 0) {
                ow = sizeDiv.offsetWidth + this.textWidthPadding;
                td.style.width = ow + 'px';
            }

            oh = sizeDiv.offsetHeight + 2;

            if (mxClient.IS_QUIRKS && this.border != null && this.border != constants.NONE) {
                oh += 3;
            }
        }
        else if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
            sizeDiv = sizeDiv.firstChild;

            oh = sizeDiv.offsetHeight;
        }

        ow = sizeDiv.offsetWidth + this.textWidthPadding;

        if (this.clipped) {
            oh = Math.min(oh, this.bounds.height);
        }

        // Stores for later use
        this.offsetWidth = ow;
        this.offsetHeight = oh;

        var w = this.bounds.width / s;
        var h = this.bounds.height / s;

        // Simulates max-height CSS in quirks mode
        if (mxClient.IS_QUIRKS && (this.clipped || (this.overflow == 'width' && h > 0))) {
            h = Math.min(h, oh);
            style.height = Math.round(h) + 'px';
        }
        else {
            h = oh;
        }

        if (this.overflow != 'fill' && this.overflow != 'width') {
            if (this.clipped) {
                ow = Math.min(w, ow);
            }

            w = ow;

            // Simulates max-width CSS in quirks mode
            if ((mxClient.IS_QUIRKS && this.clipped) || this.wrap) {
                style.width = Math.round(w) + 'px';
            }
        }

        h *= s;
        w *= s;

        // Rotation case is handled via VML canvas
        var rad = this.getTextRotation() * (Math.PI / 180);

        // Precalculate cos and sin for the rotation
        var real_cos = parseFloat(parseFloat(Math.cos(rad)).toFixed(8));
        var real_sin = parseFloat(parseFloat(Math.sin(-rad)).toFixed(8));

        rad %= 2 * Math.PI;

        if (rad < 0) {
            rad += 2 * Math.PI;
        }

        rad %= Math.PI;

        if (rad > Math.PI / 2) {
            rad = Math.PI - rad;
        }

        var cos = Math.cos(rad);
        var sin = Math.sin(-rad);

        var tx = w * -(dx + 0.5);
        var ty = h * -(dy + 0.5);

        var top_fix = (h - h * cos + w * sin) / 2 + real_sin * tx - real_cos * ty;
        var left_fix = (w - w * cos + h * sin) / 2 - real_cos * tx - real_sin * ty;

        if (rad != 0) {
            var f = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + real_cos + ', M12=' +
                real_sin + ', M21=' + (-real_sin) + ', M22=' + real_cos + ', sizingMethod=\'auto expand\')';

            if (style.filter != null && style.filter.length > 0) {
                style.filter += ' ' + f;
            }
            else {
                style.filter = f;
            }
        }

        style.zoom = s;
        style.left = Math.round(this.bounds.x + left_fix - w / 2) + 'px';
        style.top = Math.round(this.bounds.y + top_fix - h / 2) + 'px';
    },

    updateValue: function () {
        if (mxUtils.isNode(this.value)) {
            this.node.innerHTML = '';
            this.node.appendChild(this.value);
        }
        else {
            var val = this.value;

            if (this.dialect != constants.DIALECT_STRICTHTML) {
                val = mxUtils.htmlEntities(val, false);
            }

            val = (this.replaceLinefeeds) ? val.replace(/\n/g, '<br/>') : val;
            var bg = (this.background != null && this.background != constants.NONE) ? this.background : null;
            var bd = (this.border != null && this.border != constants.NONE) ? this.border : null;

            if (this.overflow == 'fill' || this.overflow == 'width') {
                if (bg != null) {
                    this.node.style.backgroundColor = bg;
                }

                if (bd != null) {
                    this.node.style.border = '1px solid ' + bd;
                }
            }
            else {
                var css = '';

                if (bg != null) {
                    css += 'background-color:' + bg + ';';
                }

                if (bd != null) {
                    css += 'border:1px solid ' + bd + ';';
                }

                // Wrapper DIV for background, zoom needed for inline in quirks
                // and to measure wrapped font sizes in all browsers
                // FIXME: Background size in quirks mode for wrapped text
                var lh = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(this.size * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
                val = '<div style="zoom:1;' + css + 'display:inline-block;_display:inline;text-decoration:inherit;' +
                    'padding-bottom:1px;padding-right:1px;line-height:' + lh + '">' + val + '</div>';
            }

            this.node.innerHTML = val;
        }
    },

    updateFont: function (node) {
        var style = node.style;

        style.lineHeight = (constants.ABSOLUTE_LINE_HEIGHT) ? Math.round(this.size * constants.LINE_HEIGHT) + 'px' : constants.LINE_HEIGHT;
        style.fontSize = Math.round(this.size) + 'px';
        style.fontFamily = this.family;
        style.verticalAlign = 'top';
        style.color = this.color;

        if ((this.fontStyle & constants.FONT_BOLD) == constants.FONT_BOLD) {
            style.fontWeight = 'bold';
        }
        else {
            style.fontWeight = '';
        }

        if ((this.fontStyle & constants.FONT_ITALIC) == constants.FONT_ITALIC) {
            style.fontStyle = 'italic';
        }
        else {
            style.fontStyle = '';
        }

        if ((this.fontStyle & constants.FONT_UNDERLINE) == constants.FONT_UNDERLINE) {
            style.textDecoration = 'underline';
        }
        else {
            style.textDecoration = '';
        }

        if (this.align == constants.ALIGN_CENTER) {
            style.textAlign = 'center';
        }
        else if (this.align == constants.ALIGN_RIGHT) {
            style.textAlign = 'right';
        }
        else {
            style.textAlign = 'left';
        }
    },

    updateSize: function (node, enableWrap) {
        var w = Math.round(this.bounds.width / this.scale);
        var h = Math.round(this.bounds.height / this.scale);
        var style = node.style;

        // NOTE: Do not use maxWidth here because wrapping will
        // go wrong if the cell is outside of the viewable area
        if (this.clipped) {
            style.overflow = 'hidden';

            if (!mxClient.IS_QUIRKS) {
                style.maxHeight = h + 'px';
                style.maxWidth = w + 'px';
            }
            else {
                style.width = w + 'px';
            }
        }
        else if (this.overflow == 'fill') {
            style.width = w + 'px';
            style.height = h + 'px';
        }
        else if (this.overflow == 'width') {
            style.width = w + 'px';
            style.maxHeight = h + 'px';
        }

        if (this.wrap && w > 0) {
            style.whiteSpace = 'normal';
            style.width = w + 'px';

            if (enableWrap) {
                var sizeDiv = node;

                if (sizeDiv.firstChild != null && sizeDiv.firstChild.nodeName == 'DIV') {
                    sizeDiv = sizeDiv.firstChild;
                }

                var tmp = sizeDiv.offsetWidth + 3;

                if (this.clipped) {
                    tmp = Math.min(tmp, w);
                }

                style.width = tmp + 'px';
            }
        }
        else {
            style.whiteSpace = 'nowrap';
        }
    },

    updateMargin: function () {
        this.margin = this.getAlignmentAsPoint(this.align, this.valign);
    },

    getAlignmentAsPoint: function (align, valign) {
        var dx = 0; // left
        var dy = 0; // top

        // Horizontal alignment
        if (align == constants.ALIGN_CENTER) {
            dx = -0.5;
        }
        else if (align == constants.ALIGN_RIGHT) {
            dx = -1;
        }

        // Vertical alignment
        if (valign == constants.ALIGN_MIDDLE) {
            dy = -0.5;
        }
        else if (valign == constants.ALIGN_BOTTOM) {
            dy = -1;
        }

        return new Point(dx, dy);
    },

    getSpacing: function () {
        var dx = 0;
        var dy = 0;

        if (this.align == constants.ALIGN_CENTER) {
            dx = (this.spacingLeft - this.spacingRight) / 2;
        }
        else if (this.align == constants.ALIGN_RIGHT) {
            dx = -this.spacingRight - this.baseSpacingRight;
        }
        else {
            dx = this.spacingLeft + this.baseSpacingLeft;
        }

        if (this.valign == constants.ALIGN_MIDDLE) {
            dy = (this.spacingTop - this.spacingBottom) / 2;
        }
        else if (this.valign == constants.ALIGN_BOTTOM) {
            dy = -this.spacingBottom - this.baseSpacingBottom;
        }
        else {
            dy = this.spacingTop + this.baseSpacingTop;
        }

        return new Point(dx, dy);
    }
});


});
define('PaneJS/CellRenderer',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/common/Dictionary','PaneJS/Rectangle','PaneJS/Point','PaneJS/constants','PaneJS/shapes/Shape','PaneJS/shapes/RectangleShape','PaneJS/shapes/Text'],function (require, exports, module) {'use strict';

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var Dictionary = require('PaneJS/common/Dictionary');
var Rectangle = require('PaneJS/Rectangle');
var Point = require('PaneJS/Point');
var constants = require('PaneJS/constants');

var Shape = require('PaneJS/shapes/Shape');
var RectangleShape = require('PaneJS/shapes/RectangleShape');
var Text = require('PaneJS/shapes/Text');


var isNullOrUndefined = utils.isNullOrUndefined;
var getValue = utils.getValue;

var CellRenderer = Class.create({
    // 静态属性和方法
    Statics: {
        shapes: {},
        getShape: function (name) {
            return CellRenderer.shapes[name];
        },
        registerShape: function (key, shape) {
            CellRenderer.shapes[key] = shape;
        }
    },

    defaultEdgeShape: null,
    defaultVertexShape: RectangleShape,
    defaultTextShape: Text,
    legacyControlPosition: true,
    legacySpacing: true,
    antiAlias: true,

    constructor: function CellRenderer() {},

    // 应用 state 中的样式，并创建 g 根节点，然后放入 drawPane 中
    initializeShape: function (state) {
        this.configureShape(state);
        state.shape.init(state.view.getDrawPane());
    },

    // 创建 state 之后，调用该方法初始化 state 的 shape
    createShape: function (state) {
        if (state.style != null) {
            // 模板
            // Checks if there is a stencil for the name and creates
            // a shape instance for the stencil if one exists
            //var stencil = mxStencilRegistry.getStencil(state.style[constants.STYLE_SHAPE]);

            //if (stencil != null) {
            //    state.shape = new mxShape(stencil);
            //}
            //else {
            var Ctor = this.getShapeConstructor(state);
            state.shape = new Ctor();
            //}

            state.shape.antiAlias = this.antiAlias;
        }
    },

    createIndicatorShape: function (state) {
        state.shape.indicatorShape = this.getShape(state.view.graph.getIndicatorShape(state));
    },

    // 获取构造函数
    getShape: function (name) {
        return this.constructor.shapes[name];
    },

    // 获取构造函数
    getShapeConstructor: function (state) {
        var Ctor = this.getShape(state.style[constants.STYLE_SHAPE]);

        if (Ctor == null) {
            Ctor = (state.view.graph.getModel().isEdge(state.cell))
                ? this.defaultEdgeShape
                : this.defaultVertexShape;
        }

        return Ctor;
    },

    // 应用样式
    configureShape: function (state) {
        state.shape.apply(state);
        state.shape.image = state.view.graph.getImage(state);
        state.shape.indicatorColor = state.view.graph.getIndicatorColor(state);
        state.shape.indicatorStrokeColor = state.style[constants.STYLE_INDICATOR_STROKECOLOR];
        state.shape.indicatorGradientColor = state.view.graph.getIndicatorGradientColor(state);
        state.shape.indicatorDirection = state.style[constants.STYLE_INDICATOR_DIRECTION];
        state.shape.indicatorImage = state.view.graph.getIndicatorImage(state);

        this.postConfigureShape(state);
    },

    postConfigureShape: function (state) {
        if (state.shape) {
            this.resolveColor(state, 'indicatorColor', constants.STYLE_FILLCOLOR);
            this.resolveColor(state, 'indicatorGradientColor', constants.STYLE_GRADIENTCOLOR);
            this.resolveColor(state, 'fill', constants.STYLE_FILLCOLOR);
            this.resolveColor(state, 'stroke', constants.STYLE_STROKECOLOR);
            this.resolveColor(state, 'gradient', constants.STYLE_GRADIENTCOLOR);
        }
    },

    resolveColor: function (state, field, key) {
        var value = state.shape[field];
        var graph = state.view.graph;
        var referenced = null;

        if (value == 'inherit') {
            referenced = graph.model.getParent(state.cell);
        } else if (value == 'swimlane') {
            if (graph.model.getTerminal(state.cell, false) != null) {
                referenced = graph.model.getTerminal(state.cell, false);
            } else {
                referenced = state.cell;
            }

            referenced = graph.getSwimlane(referenced);
            key = graph.swimlaneIndicatorColorAttribute;
        } else if (value == 'indicated') {
            state.shape[field] = state.shape.indicatorColor;
        }

        if (referenced != null) {
            var rstate = graph.getView().getState(referenced);
            state.shape[field] = null;

            if (rstate != null) {
                if (rstate.shape != null && field != 'indicatorColor') {
                    state.shape[field] = rstate.shape[field];
                } else {
                    state.shape[field] = rstate.style[key];
                }
            }
        }
    },

    getLabelValue: function (state) {
        return state.view.graph.getLabel(state.cell);
    },

    createLabel: function (state, value) {
        var graph = state.view.graph;
        var isEdge = graph.getModel().isEdge(state.cell);

        if (state.style[constants.STYLE_FONTSIZE] > 0 || state.style[constants.STYLE_FONTSIZE] == null) {
            // Avoids using DOM node for empty labels
            var isForceHtml = (graph.isHtmlLabel(state.cell) || (value != null && utils.isNode(value)));

            state.text = new this.defaultTextShape(value, new Rectangle(),
                (state.style[constants.STYLE_ALIGN] || constants.ALIGN_CENTER),
                graph.getVerticalAlign(state),
                state.style[constants.STYLE_FONTCOLOR],
                state.style[constants.STYLE_FONTFAMILY],
                state.style[constants.STYLE_FONTSIZE],
                state.style[constants.STYLE_FONTSTYLE],
                state.style[constants.STYLE_SPACING],
                state.style[constants.STYLE_SPACING_TOP],
                state.style[constants.STYLE_SPACING_RIGHT],
                state.style[constants.STYLE_SPACING_BOTTOM],
                state.style[constants.STYLE_SPACING_LEFT],
                state.style[constants.STYLE_HORIZONTAL],
                state.style[constants.STYLE_LABEL_BACKGROUNDCOLOR],
                state.style[constants.STYLE_LABEL_BORDERCOLOR],
                graph.isWrapping(state.cell) && graph.isHtmlLabel(state.cell),
                graph.isLabelClipped(state.cell),
                state.style[constants.STYLE_OVERFLOW],
                state.style[constants.STYLE_LABEL_PADDING]);

            state.text.opacity = utils.getValue(state.style, constants.STYLE_TEXT_OPACITY, 100);
            //state.text.dialect = (isForceHtml) ? constants.DIALECT_STRICTHTML : state.view.graph.dialect;
            state.text.style = state.style;
            state.text.state = state;
            this.initializeLabel(state);

            // TODO return
            // --------------
            return;

            // Workaround for touch devices routing all events for a mouse gesture
            // (down, move, up) via the initial DOM node. IE additionally redirects
            // the event via the initial DOM node but the event source is the node
            // under the mouse, so we need to check if this is the case and force
            // getCellAt for the subsequent mouseMoves and the final mouseUp.
            var forceGetCell = false;

            var getState = function (evt) {
                var result = state;

                if (mxClient.IS_TOUCH || forceGetCell) {
                    var x = mxEvent.getClientX(evt);
                    var y = mxEvent.getClientY(evt);

                    // Dispatches the drop event to the graph which
                    // consumes and executes the source function
                    var pt = mxUtils.convertPoint(graph.container, x, y);
                    result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
                }

                return result;
            };

            // TODO: Add handling for special touch device gestures
            mxEvent.addGestureListeners(state.text.node,
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                        forceGetCell = graph.dialect != constants.DIALECT_SVG &&
                            mxEvent.getSource(evt).nodeName == 'IMG';
                    }
                }),
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt, getState(evt)));
                    }
                }),
                mxUtils.bind(this, function (evt) {
                    if (this.isLabelEvent(state, evt)) {
                        graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt, getState(evt)));
                        forceGetCell = false;
                    }
                })
            );

            // Uses double click timeout in mxGraph for quirks mode
            if (graph.nativeDblClickEnabled) {
                mxEvent.addListener(state.text.node, 'dblclick',
                    mxUtils.bind(this, function (evt) {
                        if (this.isLabelEvent(state, evt)) {
                            graph.dblClick(evt, state.cell);
                            mxEvent.consume(evt);
                        }
                    })
                );
            }
        }
    },

    initializeLabel: function (state) {
        //if (mxClient.IS_SVG && mxClient.NO_FO && state.text.dialect != constants.DIALECT_SVG) {
        //    state.text.init(state.view.graph.container);
        //}
        //else {
        state.text.init(state.view.getDrawPane());
        //}
    },

    createCellOverlays: function (state) {
        var graph = state.view.graph;
        var overlays = graph.getCellOverlays(state.cell);
        var dict = null;

        if (overlays != null) {
            dict = new Dictionary();

            for (var i = 0; i < overlays.length; i++) {
                var shape = (state.overlays != null) ? state.overlays.remove(overlays[i]) : null;

                if (shape == null) {
                    var tmp = new ImageShape(new Rectangle(), overlays[i].image.src);
                    tmp.dialect = state.view.graph.dialect;
                    tmp.preserveImageAspect = false;
                    tmp.overlay = overlays[i];
                    this.initializeOverlay(state, tmp);
                    this.installCellOverlayListeners(state, overlays[i], tmp);

                    if (overlays[i].cursor != null) {
                        tmp.node.style.cursor = overlays[i].cursor;
                    }

                    dict.put(overlays[i], tmp);
                }
                else {
                    dict.put(overlays[i], shape);
                }
            }
        }

        // Removes unused
        if (state.overlays != null) {
            state.overlays.visit(function (id, shape) {
                shape.destroy();
            });
        }

        state.overlays = dict;
    },

    initializeOverlay: function (state, overlay) {
        overlay.init(state.view.getOverlayPane());
    },

    installCellOverlayListeners: function (state, overlay, shape) {
        var graph = state.view.graph;

        // TODO return
        //
        return

        mxEvent.addListener(shape.node, 'click', function (evt) {
            if (graph.isEditing()) {
                graph.stopEditing(!graph.isInvokesStopCellEditing());
            }

            overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
                'event', evt, 'cell', state.cell));
        });

        mxEvent.addGestureListeners(shape.node,
            function (evt) {
                mxEvent.consume(evt);
            },
            function (evt) {
                graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
                    new mxMouseEvent(evt, state));
            });

        if (mxClient.IS_TOUCH) {
            mxEvent.addListener(shape.node, 'touchend', function (evt) {
                overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
                    'event', evt, 'cell', state.cell));
            });
        }
    },

    // 创建展开/折叠按钮
    createControl: function (state) {
        var graph = state.view.graph;
        var image = graph.getFoldingImage(state);

        if (graph.foldingEnabled && image != null) {
            if (state.control == null) {
                var b = new Rectangle(0, 0, image.width, image.height);
                state.control = new ImageShape(b, image.src);
                state.control.preserveImageAspect = false;
                state.control.dialect = graph.dialect;

                this.initControl(state, state.control, true, function (evt) {
                    if (graph.isEnabled()) {
                        var collapse = !graph.isCellCollapsed(state.cell);
                        graph.foldCells(collapse, false, [state.cell]);
                        mxEvent.consume(evt);
                    }
                });
            }
        }
        else if (state.control != null) {
            state.control.destroy();
            state.control = null;
        }
    },

    initControl: function (state, control, handleEvents, clickHandler) {
        var graph = state.view.graph;

        // In the special case where the label is in HTML and the display is SVG the image
        // should go into the graph container directly in order to be clickable. Otherwise
        // it is obscured by the HTML label that overlaps the cell.
        var isForceHtml = graph.isHtmlLabel(state.cell) && mxClient.NO_FO &&
            graph.dialect == constants.DIALECT_SVG;

        if (isForceHtml) {
            control.dialect = constants.DIALECT_PREFERHTML;
            control.init(graph.container);
            control.node.style.zIndex = 1;
        }
        else {
            control.init(state.view.getOverlayPane());
        }

        var node = control.innerNode || control.node;

        if (clickHandler) {
            if (graph.isEnabled()) {
                node.style.cursor = 'pointer';
            }

            mxEvent.addListener(node, 'click', clickHandler);
        }

        if (handleEvents) {
            mxEvent.addGestureListeners(node,
                function (evt) {
                    graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, state));
                    mxEvent.consume(evt);
                },
                function (evt) {
                    graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt, state));
                });
        }

        return node;
    },

    isShapeEvent: function (state, evt) {
        return true;
    },

    isLabelEvent: function (state, evt) {
        return true;
    },

    // 监听 DOM 事件
    installListeners: function (state) {
        var graph = state.view.graph;

        // TODO: event
        return;

        // Workaround for touch devices routing all events for a mouse
        // gesture (down, move, up) via the initial DOM node. Same for
        // HTML images in all IE versions (VML images are working).
        var getState = function (evt) {
            var result = state;

            if ((graph.dialect != constants.DIALECT_SVG && mxEvent.getSource(evt).nodeName == 'IMG') || mxClient.IS_TOUCH) {
                var x = mxEvent.getClientX(evt);
                var y = mxEvent.getClientY(evt);

                // Dispatches the drop event to the graph which
                // consumes and executes the source function
                var pt = mxUtils.convertPoint(graph.container, x, y);
                result = graph.view.getState(graph.getCellAt(pt.x, pt.y));
            }

            return result;
        };

        mxEvent.addGestureListeners(state.shape.node,
            mxUtils.bind(this, function (evt) {
                if (this.isShapeEvent(state, evt)) {
                    // Redirects events from the "event-transparent" region of a
                    // swimlane to the graph. This is only required in HTML, SVG
                    // and VML do not fire mouse events on transparent backgrounds.
                    graph.fireMouseEvent(mxEvent.MOUSE_DOWN,
                        new mxMouseEvent(evt, (state.shape != null &&
                        mxEvent.getSource(evt) == state.shape.content) ?
                            null : state));
                }
            }),
            mxUtils.bind(this, function (evt) {
                if (this.isShapeEvent(state, evt)) {
                    graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
                        new mxMouseEvent(evt, (state.shape != null &&
                        mxEvent.getSource(evt) == state.shape.content) ?
                            null : getState(evt)));
                }
            }),
            mxUtils.bind(this, function (evt) {
                if (this.isShapeEvent(state, evt)) {
                    graph.fireMouseEvent(mxEvent.MOUSE_UP,
                        new mxMouseEvent(evt, (state.shape != null &&
                        mxEvent.getSource(evt) == state.shape.content) ?
                            null : getState(evt)));
                }
            })
        );

        // Uses double click timeout in mxGraph for quirks mode
        if (graph.nativeDblClickEnabled) {
            mxEvent.addListener(state.shape.node, 'dblclick',
                mxUtils.bind(this, function (evt) {
                    if (this.isShapeEvent(state, evt)) {
                        graph.dblClick(evt, state.cell);
                        mxEvent.consume(evt);
                    }
                })
            );
        }
    },

    redrawLabel: function (state, forced) {
        var value = this.getLabelValue(state);

        if (state.text == null && value != null && (utils.isNode(value) || value.length > 0)) {
            this.createLabel(state, value);
        }
        else if (state.text != null && (value == null || value.length == 0)) {
            state.text.destroy();
            state.text = null;
        }

        if (state.text != null) {
            var graph = state.view.graph;
            var wrapping = graph.isWrapping(state.cell);
            var clipping = graph.isLabelClipped(state.cell);
            var bounds = this.getLabelBounds(state);

            var isForceHtml = (state.view.graph.isHtmlLabel(state.cell) || (value != null && utils.isNode(value)));
            var dialect = (isForceHtml) ? constants.DIALECT_STRICTHTML : state.view.graph.dialect;

            // Text is a special case where change of dialect is possible at runtime
            if (forced || state.text.value != value || state.text.isWrapping != wrapping ||
                state.text.isClipping != clipping || state.text.scale != state.view.scale ||
                state.text.dialect != dialect || !state.text.bounds.equals(bounds)) {
                state.text.dialect = dialect;
                state.text.value = value;
                state.text.bounds = bounds;
                state.text.scale = this.getTextScale(state);
                state.text.isWrapping = wrapping;
                state.text.isClipping = clipping;

                state.text.redraw();
            }
        }
    },

    getTextScale: function (state) {
        return state.view.scale;
    },

    getLabelBounds: function (state) {
        var graph = state.view.graph;
        var scale = state.view.scale;
        var isEdge = graph.getModel().isEdge(state.cell);
        var bounds = new Rectangle(state.absoluteOffset.x, state.absoluteOffset.y);

        if (isEdge) {
            var spacing = state.text.getSpacing();
            bounds.x += spacing.x * scale;
            bounds.y += spacing.y * scale;

            var geo = graph.getCellGeometry(state.cell);

            if (geo != null) {
                bounds.width = Math.max(0, geo.width * scale);
                bounds.height = Math.max(0, geo.height * scale);
            }
        }
        else {
            // Inverts label position
            if (state.text.isPaintBoundsInverted()) {
                var tmp = bounds.x;
                bounds.x = bounds.y;
                bounds.y = tmp;
            }

            bounds.x += state.x;
            bounds.y += state.y;

            // Minimum of 1 fixes alignment bug in HTML labels
            bounds.width = Math.max(1, state.width);
            bounds.height = Math.max(1, state.height);

            var sc = getValue(state.style, constants.STYLE_STROKECOLOR, constants.NONE);

            if (sc != constants.NONE && sc != '') {
                var s = parseFloat(getValue(state.style, constants.STYLE_STROKEWIDTH, 1)) * scale / 2;
                var s2 = 2 * s + 0.5;

                bounds.x += s;
                bounds.y += s;
                bounds.width -= s2;
                bounds.height -= s2;
            }
        }

        if (state.text.isPaintBoundsInverted()) {
            // Rotates around center of state
            var t = (state.width - state.height) / 2;
            bounds.x += t;
            bounds.y -= t;
            var tmp = bounds.width;
            bounds.width = bounds.height;
            bounds.height = tmp;
        }

        // Shape can modify its label bounds
        if (state.shape != null) {
            bounds = state.shape.getLabelBounds(bounds);
        }

        // Label width style overrides actual label width
        var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

        if (lw != null) {
            bounds.width = parseFloat(lw) * scale;
        }

        if (!isEdge) {
            this.rotateLabelBounds(state, bounds);
        }

        return bounds;
    },

    rotateLabelBounds: function (state, bounds) {
        bounds.x -= state.text.margin.x * bounds.width;
        bounds.y -= state.text.margin.y * bounds.height;

        if (!this.legacySpacing || (state.style[constants.STYLE_OVERFLOW] != 'fill' && state.style[constants.STYLE_OVERFLOW] != 'width')) {
            var s = state.view.scale;
            var spacing = state.text.getSpacing();
            bounds.x += spacing.x * s;
            bounds.y += spacing.y * s;

            var hpos = getValue(state.style, constants.STYLE_LABEL_POSITION, constants.ALIGN_CENTER);
            var vpos = getValue(state.style, constants.STYLE_VERTICAL_LABEL_POSITION, constants.ALIGN_MIDDLE);
            var lw = getValue(state.style, constants.STYLE_LABEL_WIDTH, null);

            bounds.width = Math.max(0, bounds.width - ((hpos == constants.ALIGN_CENTER && lw == null) ? (state.text.spacingLeft * s + state.text.spacingRight * s) : 0));
            bounds.height = Math.max(0, bounds.height - ((vpos == constants.ALIGN_MIDDLE) ? (state.text.spacingTop * s + state.text.spacingBottom * s) : 0));
        }

        var theta = state.text.getTextRotation();

        // Only needed if rotated around another center
        if (theta != 0 && state != null && state.view.graph.model.isVertex(state.cell)) {
            var cx = state.getCenterX();
            var cy = state.getCenterY();

            if (bounds.x != cx || bounds.y != cy) {
                var rad = theta * (Math.PI / 180);
                var pt = mxUtils.getRotatedPoint(new Point(bounds.x, bounds.y),
                    Math.cos(rad), Math.sin(rad), new Point(cx, cy));

                bounds.x = pt.x;
                bounds.y = pt.y;
            }
        }
    },

    redrawCellOverlays: function (state, forced) {
        this.createCellOverlays(state);

        if (state.overlays != null) {
            var rot = mxUtils.mod(mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0), 90);
            var rad = mxUtils.toRadians(rot);
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            state.overlays.visit(function (id, shape) {
                var bounds = shape.overlay.getBounds(state);

                if (!state.view.graph.getModel().isEdge(state.cell)) {
                    if (state.shape != null && rot != 0) {
                        var cx = bounds.getCenterX();
                        var cy = bounds.getCenterY();

                        var point = mxUtils.getRotatedPoint(new mxPoint(cx, cy), cos, sin,
                            new mxPoint(state.getCenterX(), state.getCenterY()));

                        cx = point.x;
                        cy = point.y;
                        bounds.x = Math.round(cx - bounds.width / 2);
                        bounds.y = Math.round(cy - bounds.height / 2);
                    }
                }

                if (forced || shape.bounds == null || shape.scale != state.view.scale || !shape.bounds.equals(bounds)) {
                    shape.bounds = bounds;
                    shape.scale = state.view.scale;
                    shape.redraw();
                }
            });
        }
    },

    redrawControl: function (state, forced) {
        var image = state.view.graph.getFoldingImage(state);

        if (state.control != null && image != null) {
            var bounds = this.getControlBounds(state, image.width, image.height);
            var r = (this.legacyControlPosition) ?
                mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0) :
                state.shape.getTextRotation();
            var s = state.view.scale;

            if (forced || state.control.scale != s || !state.control.bounds.equals(bounds) ||
                state.control.rotation != r) {
                state.control.rotation = r;
                state.control.bounds = bounds;
                state.control.scale = s;

                state.control.redraw();
            }
        }
    },

    getControlBounds: function (state, w, h) {
        if (state.control != null) {
            var s = state.view.scale;
            var cx = state.getCenterX();
            var cy = state.getCenterY();

            if (!state.view.graph.getModel().isEdge(state.cell)) {
                cx = state.x + w * s;
                cy = state.y + h * s;

                if (state.shape != null) {
                    // TODO: Factor out common code
                    var rot = state.shape.getShapeRotation();

                    if (this.legacyControlPosition) {
                        rot = mxUtils.getValue(state.style, constants.STYLE_ROTATION, 0);
                    }
                    else {
                        if (state.shape.isPaintBoundsInverted()) {
                            var t = (state.width - state.height) / 2;
                            cx += t;
                            cy -= t;
                        }
                    }

                    if (rot != 0) {
                        var rad = mxUtils.toRadians(rot);
                        var cos = Math.cos(rad);
                        var sin = Math.sin(rad);

                        var point = mxUtils.getRotatedPoint(new mxPoint(cx, cy), cos, sin,
                            new mxPoint(state.getCenterX(), state.getCenterY()));
                        cx = point.x;
                        cy = point.y;
                    }
                }
            }

            return (state.view.graph.getModel().isEdge(state.cell)) ?
                new mxRectangle(Math.round(cx - w / 2 * s), Math.round(cy - h / 2 * s), Math.round(w * s), Math.round(h * s))
                : new mxRectangle(Math.round(cx - w / 2 * s), Math.round(cy - h / 2 * s), Math.round(w * s), Math.round(h * s));
        }

        return null;
    },

    insertStateAfter: function (state, node, htmlNode) {
        var shapes = this.getShapesForState(state);

        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i] != null) {
                var html = shapes[i].node.parentNode != state.view.getDrawPane();
                var temp = (html) ? htmlNode : node;

                if (temp != null && temp.nextSibling != shapes[i].node) {
                    if (temp.nextSibling == null) {
                        temp.parentNode.appendChild(shapes[i].node);
                    }
                    else {
                        temp.parentNode.insertBefore(shapes[i].node, temp.nextSibling);
                    }
                }
                else if (temp == null) {
                    // Special case: First HTML node should be first sibling after canvas
                    if (shapes[i].node.parentNode == state.view.graph.container) {
                        var canvas = state.view.canvas;

                        while (canvas != null && canvas.parentNode != state.view.graph.container) {
                            canvas = canvas.parentNode;
                        }

                        if (canvas != null && canvas.nextSibling != null && canvas.nextSibling != shapes[i].node) {
                            shapes[i].node.parentNode.insertBefore(shapes[i].node, canvas.nextSibling);
                        }
                        else {
                            shapes[i].node.parentNode.appendChild(shapes[i].node);
                        }
                    }
                    else if (shapes[i].node.parentNode.firstChild != null && shapes[i].node.parentNode.firstChild != shapes[i].node) {
                        // Inserts the node as the first child of the parent to implement the order
                        shapes[i].node.parentNode.insertBefore(shapes[i].node, shapes[i].node.parentNode.firstChild);
                    }
                }

                if (html) {
                    htmlNode = shapes[i].node;
                }
                else {
                    node = shapes[i].node;
                }
            }
        }

        return [node, htmlNode];
    },

    getShapesForState: function (state) {
        return [state.shape, state.text];
    },

    redraw: function (state, force, rendering) {
        var shapeChanged = this.redrawShape(state, force, rendering);

        if (state.shape != null && (rendering == null || rendering)) {
            this.redrawLabel(state, shapeChanged);
            this.redrawCellOverlays(state, shapeChanged);
            this.redrawControl(state, shapeChanged);
        }
    },

    redrawShape: function (state, force, rendering) {
        var shapeChanged = false;

        if (state.shape) {
            // Lazy initialization
            if (!state.shape.node) {
                this.createIndicatorShape(state);
                // 应用 state 中的样式，创建 shape 的根节点，并加入到 drawPane 中
                this.initializeShape(state);
                this.createCellOverlays(state);
                // DOM 事件
                this.installListeners(state);
            }

            // Handles changes of the collapse icon
            this.createControl(state);

            // 检查样式是否有更新
            //if (!mxUtils.equalEntries(state.shape.style, state.style)) {
            //    this.configureShape(state);
            //    force = true;
            //}

            // Redraws the cell if required, ignores changes to bounds if points are
            // defined as the bounds are updated for the given points inside the shape
            if (force || !state.shape.bounds || state.shape.scale != state.view.scale ||
                (state.absolutePoints == null && !state.shape.bounds.equals(state)) ||
                (state.absolutePoints != null && !utils.equalPoints(state.shape.points, state.absolutePoints))) {
                if (state.absolutePoints) {
                    state.shape.points = state.absolutePoints.slice();
                    state.shape.bounds = null;
                } else {
                    state.shape.points = null;
                    state.shape.bounds = new Rectangle(state.x, state.y, state.width, state.height);
                }

                state.shape.scale = state.view.scale;

                if (isNullOrUndefined(rendering) || rendering) {
                    state.shape.redraw();
                } else {
                    state.shape.updateBoundingBox();
                }

                shapeChanged = true;
            }
        }

        return shapeChanged;
    },

    destroy: function (state) {
        if (state.shape != null) {
            if (state.text != null) {
                state.text.destroy();
                state.text = null;
            }

            if (state.overlays != null) {
                state.overlays.visit(function (id, shape) {
                    shape.destroy();
                });

                state.overlays = null;
            }

            if (state.control != null) {
                state.control.destroy();
                state.control = null;
            }

            state.shape.destroy();
            state.shape = null;
        }
    }
});


var registerShape = CellRenderer.registerShape;

registerShape(constants.SHAPE_RECTANGLE, RectangleShape);
//registerShape(constants.SHAPE_ELLIPSE, mxEllipse);
//registerShape(constants.SHAPE_RHOMBUS, mxRhombus);
//registerShape(constants.SHAPE_CYLINDER, mxCylinder);
//registerShape(constants.SHAPE_CONNECTOR, mxConnector);
//registerShape(constants.SHAPE_ACTOR, mxActor);
//registerShape(constants.SHAPE_TRIANGLE, mxTriangle);
//registerShape(constants.SHAPE_HEXAGON, mxHexagon);
//registerShape(constants.SHAPE_CLOUD, mxCloud);
//registerShape(constants.SHAPE_LINE, mxLine);
//registerShape(constants.SHAPE_ARROW, mxArrow);
//registerShape(constants.SHAPE_DOUBLE_ELLIPSE, mxDoubleEllipse);
//registerShape(constants.SHAPE_SWIMLANE, mxSwimlane);
//registerShape(constants.SHAPE_IMAGE, mxImageShape);
//registerShape(constants.SHAPE_LABEL, mxLabel);


module.exports = CellRenderer;


});
define('PaneJS/shapes/Label',['require','exports','module','../common/utils','./RectangleShape','../constants'],function (require, exports, module) {var utils = require('../common/utils');
var RectangleShape = require('./RectangleShape');
var constants = require('../constants');

var getValue = utils.getValue;
var isNullOrUndefined = utils.isNullOrUndefined;


module.exports = RectangleShape.extend({

    imageSize: constants.DEFAULT_IMAGESIZE,
    spacing: 2,
    indicatorSize: 10,
    indicatorSpacing: 2,


    constructor: function Label(bounds, fill, stroke, strokeWidth) {
        this.constructor.superclass.constructor.call(this, bounds, fill, stroke, strokeWidth);
    },

    init: function (container) {
        this.constructor.superclass.prototype.init.apply(this, arguments);

        if (this.indicatorShape) {
            this.indicator = new this.indicatorShape();
            this.indicator.dialect = this.dialect;
            this.indicator.init(this.node);
        }
    },

    redraw: function () {
        if (this.indicator) {
            this.indicator.fill = this.indicatorColor;
            this.indicator.stroke = this.indicatorStrokeColor;
            this.indicator.gradient = this.indicatorGradientColor;
            this.indicator.direction = this.indicatorDirection;
        }

        this.constructor.superclass.prototype.redraw.apply(this, arguments);
    },

    isHtmlAllowed: function () {

        return this.constructor.superclass.prototype.isHtmlAllowed.apply(this, arguments) &&
            this.indicatorColor == null && this.indicatorShape == null;
    },

    paintForeground: function (c, x, y, w, h) {

        this.paintImage(c, x, y, w, h);
        this.paintIndicator(c, x, y, w, h);

        this.constructor.superclass.prototype.paintForeground.apply(this, arguments);
    },

    paintImage: function (c, x, y, w, h) {
        if (this.image != null) {
            var bounds = this.getImageBounds(x, y, w, h);
            c.image(bounds.x, bounds.y, bounds.width, bounds.height, this.image, false, false, false);
        }
    },

    getImageBounds: function (x, y, w, h) {
        var align = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_ALIGN, mxConstants.ALIGN_LEFT);
        var valign = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
        var width = mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_WIDTH, mxConstants.DEFAULT_IMAGESIZE);
        var height = mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_HEIGHT, mxConstants.DEFAULT_IMAGESIZE);
        var spacing = mxUtils.getNumber(this.style, mxConstants.STYLE_SPACING, this.spacing) + 5;

        if (align == mxConstants.ALIGN_CENTER) {
            x += (w - width) / 2;
        }
        else if (align == mxConstants.ALIGN_RIGHT) {
            x += w - width - spacing;
        }
        else // default is left
        {
            x += spacing;
        }

        if (valign == mxConstants.ALIGN_TOP) {
            y += spacing;
        }
        else if (valign == mxConstants.ALIGN_BOTTOM) {
            y += h - height - spacing;
        }
        else // default is middle
        {
            y += (h - height) / 2;
        }

        return new mxRectangle(x, y, width, height);
    },

    paintIndicator: function (c, x, y, w, h) {
        if (this.indicator != null) {
            this.indicator.bounds = this.getIndicatorBounds(x, y, w, h);
            this.indicator.paint(c);
        }
        else if (this.indicatorImage != null) {
            var bounds = this.getIndicatorBounds(x, y, w, h);
            c.image(bounds.x, bounds.y, bounds.width, bounds.height, this.indicatorImage, false, false, false);
        }
    },

    getIndicatorBounds: function (x, y, w, h) {
        var align = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_ALIGN, mxConstants.ALIGN_LEFT);
        var valign = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
        var width = mxUtils.getNumber(this.style, mxConstants.STYLE_INDICATOR_WIDTH, this.indicatorSize);
        var height = mxUtils.getNumber(this.style, mxConstants.STYLE_INDICATOR_HEIGHT, this.indicatorSize);
        var spacing = this.spacing + 5;

        if (align == mxConstants.ALIGN_RIGHT) {
            x += w - width - spacing;
        }
        else if (align == mxConstants.ALIGN_CENTER) {
            x += (w - width) / 2;
        }
        else // default is left
        {
            x += spacing;
        }

        if (valign == mxConstants.ALIGN_BOTTOM) {
            y += h - height - spacing;
        }
        else if (valign == mxConstants.ALIGN_TOP) {
            y += spacing;
        }
        else // default is middle
        {
            y += (h - height) / 2;
        }

        return new mxRectangle(x, y, width, height);
    },

    redrawHtmlShape: function () {
        mxRectangleShape.prototype.redrawHtmlShape.apply(this, arguments);

        // Removes all children
        while (this.node.hasChildNodes()) {
            this.node.removeChild(this.node.lastChild);
        }

        if (this.image != null) {
            var node = document.createElement('img');
            node.style.position = 'relative';
            node.setAttribute('border', '0');

            var bounds = this.getImageBounds(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            bounds.x -= this.bounds.x;
            bounds.y -= this.bounds.y;

            node.style.left = Math.round(bounds.x) + 'px';
            node.style.top = Math.round(bounds.y) + 'px';
            node.style.width = Math.round(bounds.width) + 'px';
            node.style.height = Math.round(bounds.height) + 'px';

            node.src = this.image;

            this.node.appendChild(node);
        }
    }
});


});
define('PaneJS/Graph',['require','exports','module','PaneJS/common/class','PaneJS/common/utils','PaneJS/events/Event','PaneJS/events/EventObject','PaneJS/constants','PaneJS/View','PaneJS/Model','PaneJS/Cell','PaneJS/Geometry','PaneJS/Point','PaneJS/CellRenderer','PaneJS/Stylesheet','PaneJS/changes/RootChange','PaneJS/changes/ChildChange'],function (require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('PaneJS/common/class');
var utils = require('PaneJS/common/utils');
var Event = require('PaneJS/events/Event');
var EventObject = require('PaneJS/events/EventObject');
var constants = require('PaneJS/constants');
var View = require('PaneJS/View');
var Model = require('PaneJS/Model');
var Cell = require('PaneJS/Cell');
var Geometry = require('PaneJS/Geometry');
var Point = require('PaneJS/Point');
var CellRenderer = require('PaneJS/CellRenderer');
var Stylesheet = require('PaneJS/Stylesheet');
var RootChange = require('PaneJS/changes/RootChange');
var ChildChange = require('PaneJS/changes/ChildChange');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    Implements: Event,

    EMPTY_ARRAY: [],
    mouseListeners: null,
    isMouseDown: false,
    model: null,
    view: null,
    stylesheet: null,
    selectionModel: null,
    cellEditor: null,
    cellRenderer: null,
    multiplicities: null,

    gridSize: 10,
    gridEnabled: true,
    portsEnabled: true,
    nativeDblClickEnabled: true,
    doubleTapEnabled: true,
    doubleTapTimeout: 500,
    doubleTapTolerance: 25,
    lastTouchX: 0,
    lastTouchY: 0,
    lastTouchTime: 0,
    tapAndHoldEnabled: true,
    tapAndHoldDelay: 500,
    tapAndHoldInProgress: false,
    tapAndHoldValid: false,
    initialTouchX: 0,
    initialTouchY: 0,
    tolerance: 0,
    defaultOverlap: 0.5,
    defaultParent: null,
    alternateEdgeStyle: null,
    backgroundImage: null,
    pageVisible: false,
    pageBreaksVisible: false,
    pageBreakColor: 'gray',
    pageBreakDashed: true,
    minPageBreakDist: 20,
    preferPageSize: false,
    pageFormat: null,// constants.PAGE_FORMAT_A4_PORTRAIT;
    pageScale: 1.5,
    enabled: true,

    escapeEnabled: true,
    invokesStopCellEditing: true,
    enterStopsCellEditing: false,
    useScrollbarsForPanning: true,
    exportEnabled: true,
    importEnabled: true,
    cellsLocked: false,
    cellsCloneable: true,
    foldingEnabled: true,
    cellsEditable: true,
    cellsDeletable: true,
    cellsMovable: true,
    edgeLabelsMovable: true,
    vertexLabelsMovable: false,
    dropEnabled: false,
    splitEnabled: true,
    cellsResizable: true,
    cellsBendable: true,
    cellsSelectable: true,
    cellsDisconnectable: true,
    autoSizeCells: false,
    autoSizeCellsOnAdd: false,
    autoScroll: true,
    timerAutoScroll: false,
    allowAutoPanning: false,
    ignoreScrollbars: false,
    autoExtend: true,
    maximumGraphBounds: null,
    minimumGraphSize: null,
    minimumContainerSize: null,
    maximumContainerSize: null,
    resizeContainer: false,
    border: 0,
    keepEdgesInForeground: false,
    keepEdgesInBackground: false,
    allowNegativeCoordinates: true,
    constrainChildren: true,
    constrainChildrenOnResize: false,
    extendParents: true,
    extendParentsOnAdd: true,
    extendParentsOnMove: false,
    recursiveResize: false,
    collapseToPreferredSize: true,
    zoomFactor: 1.2,
    keepSelectionVisibleOnZoom: false,
    centerZoom: true,
    resetViewOnRootChange: true,
    resetEdgesOnResize: false,
    resetEdgesOnMove: false,
    resetEdgesOnConnect: true,
    allowLoops: false,
    //defaultLoopStyle: mxEdgeStyle.Loop, // TODO
    multigraph: true,
    connectableEdges: false,
    allowDanglingEdges: true,
    cloneInvalidEdges: false,
    disconnectOnMove: true,
    labelsVisible: true,
    htmlLabels: false,
    swimlaneSelectionEnabled: true,
    swimlaneNesting: true,
    swimlaneIndicatorColorAttribute: constants.STYLE_FILLCOLOR,
    imageBundles: null,
    minFitScale: 0.1,
    maxFitScale: 8,
    panDx: 0,
    panDy: 0,

    collapsedImage: null,
    expandedImage: null,
    warningImage: null,
    alreadyConnectedResource: null,
    containsValidationErrorsResource: null,
    collapseExpandResource: null,

    constructor: function Graph(container, model, stylesheet) {

        var graph = this;

        graph.mouseListeners = null;
        graph.model = model ? model : new Model();
        graph.multiplicities = [];
        graph.imageBundles = [];
        graph.cellRenderer = graph.createCellRenderer();
        graph.setSelectionModel(graph.createSelectionModel());
        graph.setStylesheet(stylesheet ? stylesheet : graph.createStylesheet());
        graph.view = graph.createView();

        graph.model.on('change', function (evt) {
            graph.graphModelChanged(evt.getData('edit').changes);
        });

        if (container) {
            graph.init(container);
        }

        graph.view.revalidate();
    },

    init: function (container) {

        var graph = this;

        graph.container = container;

        // Initializes the in-place editor
        this.cellEditor = this.createCellEditor();

        // Initializes the container using the view
        graph.view.init();

        // Updates the size of the container for the current graph
        graph.sizeDidChange();

        // Hides tooltips and resets tooltip timer if mouse leaves container
        //mxEvent.addListener(container, 'mouseleave', mxUtils.bind(this, function () {
        //    if (this.tooltipHandler != null) {
        //        this.tooltipHandler.hide();
        //    }
        //}));
    },


    createHandlers: function () {},
    //
    //
    createSelectionModel: function () {},
    createStylesheet: function () {
        return new Stylesheet();
    },
    createView: function () {
        return new View(this);
    },
    createCellRenderer: function () {
        return new CellRenderer();
    },
    createCellEditor: function () {},
    getModel: function () {
        return this.model;
    },
    getView: function () {
        return this.view;
    },

    getStylesheet: function () {
        return this.stylesheet;
    },
    setStylesheet: function (stylesheet) {
        this.stylesheet = stylesheet;
    },
    getSelectionModel: function () {
        return this.selectionModel;
    },
    setSelectionModel: function (selectionModel) {
        this.selectionModel = selectionModel;
    },
    getSelectionCellsForChanges: function () {},
    graphModelChanged: function (changes) {
        console.log(changes);
        for (var i = 0; i < changes.length; i++) {
            this.processChange(changes[i]);
        }

        this.removeSelectionCells(this.getRemovedCellsForChanges(changes));

        this.view.validate();
        this.sizeDidChange();
    },
    processChange: function (change) {
        if (change instanceof RootChange) {

        } else if (change instanceof ChildChange) {
            var newParent = this.model.getParent(change.child);
            this.view.invalidate(change.child, true, true);

            if (!newParent || this.isCellCollapsed(newParent)) {
                this.view.invalidate(change.child, true, true);
                this.removeStateForCell(change.child);

                // Handles special case of current root of view being removed
                if (this.view.currentRoot === change.child) {
                    this.home();
                }
            }

            if (newParent !== change.previous) {
                // Refreshes the collapse/expand icons on the parents
                if (newParent) {
                    this.view.invalidate(newParent, false, false);
                }

                if (change.previous != null) {
                    this.view.invalidate(change.previous, false, false);
                }
            }
        }

    },
    getRemovedCellsForChanges: function () {},
    removeStateForCell: function (cell) {
        var childCount = this.model.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            this.removeStateForCell(this.model.getChildAt(cell, i));
        }

        this.view.invalidate(cell, false, true);
        this.view.removeState(cell);
    },


    // Overlays
    // ---------
    addCellOverlay: function (cell, overlay) {},
    getCellOverlays: function (cell) {
        return cell.overlays;
    },
    removeCellOverlay: function (cell, overlay) {},
    removeCellOverlays: function (cell) {},
    clearCellOverlays: function (cell) {},
    setCellWarning: function () {},


    // In-place editing
    // ----------------
    startEditing: function (evt) {},
    startEditingAtCell: function (cell, evt) {},
    getEditingValue: function (cell, evt) {},
    stopEditing: function (cancel) {},
    labelChanged: function (cell, value, evt) {},
    cellLabelChanged: function (cell, value, autoSize) {},


    // Event processing
    // ----------------
    escape: function (evt) {},
    click: function (me) {},
    dblClick: function (evt, cell) {},
    tapAndHold: function (me) {},

    scrollPointToVisible: function (x, y, extend, border) {},
    createPanningManager: function () {},
    getBorderSizes: function () {},
    getPreferredPageSize: function (bounds, width, height) {},
    sizeDidChange: function () {},
    doResizeContainer: function (width, height) {},
    updatePageBreaks: function (visible, width, height) {},


    // Cell styles
    // -----------
    getCellStyle: function (cell) {
        var stylename = this.model.getStyle(cell);
        var style = null;

        // Gets the default style for the cell
        if (this.model.isEdge(cell)) {
            style = this.stylesheet.getDefaultEdgeStyle();
        }
        else {
            style = this.stylesheet.getDefaultVertexStyle();
        }

        // Resolves the stylename using the above as the default
        if (stylename != null) {
            style = this.postProcessCellStyle(this.stylesheet.getCellStyle(stylename, style));
        }

        // Returns a non-null value if no style can be found
        if (style == null) {
            style = [];//mxGraph.prototype.EMPTY_ARRAY;
        }

        return style;
    },
    postProcessCellStyle: function (style) {},
    setCellStyle: function (style, cells) {},
    setCellStyles: function (key, value, cells) {},
    toggleCellStyle: function (key, defaultValue, cell) {},
    toggleCellStyles: function (key, defaultValue, cells) {},
    toggleCellStyleFlags: function (key, flag, cells) {},
    setCellStyleFlags: function (key, flag, value, cells) {},


    // Cell alignment and orientation
    // ------------------------------
    alignCells: function (align, cells, param) {},
    flipEdge: function (edge) {},
    addImageBundle: function (bundle) {},
    removeImageBundle: function (bundle) {},
    getImageFromBundles: function (key) {},


    // Order
    // -----
    orderCells: function (back, cells) {},
    cellsOrdered: function (cells, back) {},


    // Grouping
    // --------
    groupCells: function (group, border, cells) {},
    getCellsForGroup: function (cells) {},
    getBoundsForGroup: function (group, children, border) {},
    createGroupCell: function (cells) {},
    ungroupCells: function (cells) {},
    removeCellsFromParent: function (cells) {},
    updateGroupBounds: function (cells, border, moveGroup, topBorder, rightBorder, bottomBorder, leftBorder) {},


    // Cell cloning, insertion and removal
    // -----------------------------------
    cloneCells: function (cells, allowInvalidEdges) {},
    insertVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var graph = this;
        var vertex = graph.createVertex(parent, id, value, x, y, width, height, style, relative);
        return graph.addCell(vertex, parent);
    },
    createVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height);
        geometry.relative = !isNullOrUndefined(relative) ? relative : false;

        // Creates the vertex
        var vertex = new Cell(value, geometry, style);
        vertex.setId(id);
        vertex.setVertex(true);
        vertex.setConnectable(true);

        return vertex;
    },
    insertEdge: function (parent, id, value, source, target, style) {

    },
    createEdge: function (parent, id, value, source, target, style) {
        var geometry = new Geometry();
        geometry.relative = true;

        var edge = new Cell(value, geometry, style);
        edge.setId(id);
        edge.setEdge(true);

        return edge;
    },
    addEdge: function (edge, parent, source, target, index) {},
    addCell: function (cell, parent, index, source, target) {
        return this.addCells([cell], parent, index, source, target)[0];
    },
    addCells: function (cells, parent, index, source, target) {
        parent = parent || this.getDefaultParent();
        index = !isNullOrUndefined(index) ? index : this.model.getChildCount(parent);

        this.model.beginUpdate();
        try {
            this.cellsAdded(cells, parent, index, source, target, false, true);

            //this.fireEvent(new mxEventObject(mxEvent.ADD_CELLS, 'cells', cells,
            //    'parent', parent, 'index', index, 'source', source, 'target', target));

            this.emit(new EventObject('addCells', {
                cells: cells,
                parent: parent,
                index: index,
                source: source,
                target: target
            }));
        }
        finally {
            this.model.endUpdate();
        }

        return cells;
    },
    cellsAdded: function (cells, parent, index, source, target, absolute, constrain) {
        if (cells && parent && !isNullOrUndefined(index)) {
            this.model.beginUpdate();
            try {
                var parentState = absolute ? this.view.getState(parent) : null;
                var o1 = parentState ? parentState.origin : null;
                var zero = new Point(0, 0);

                for (var i = 0; i < cells.length; i++) {
                    if (!cells[i]) {
                        index--;
                    } else {
                        var previous = this.model.getParent(cells[i]);

                        // Keeps the cell at its absolute location
                        if (o1 && cells[i] !== parent && parent !== previous) {
                            var oldState = this.view.getState(previous);
                            var o2 = oldState ? oldState.origin : zero;
                            var geo = this.model.getGeometry(cells[i]);

                            if (geo) {
                                var dx = o2.x - o1.x;
                                var dy = o2.y - o1.y;

                                // FIXME: Cells should always be inserted first before any other edit
                                // to avoid forward references in sessions.
                                geo = geo.clone();
                                geo.translate(dx, dy);

                                if (!geo.relative && this.model.isVertex(cells[i]) && !this.isAllowNegativeCoordinates()) {
                                    geo.x = Math.max(0, geo.x);
                                    geo.y = Math.max(0, geo.y);
                                }

                                this.model.setGeometry(cells[i], geo);
                            }
                        }

                        // Decrements all following indices
                        // if cell is already in parent
                        if (parent === previous && index + i > this.model.getChildCount(parent)) {
                            index--;
                        }

                        this.model.add(parent, cells[i], index + i);

                        if (this.autoSizeCellsOnAdd) {
                            this.autoSizeCell(cells[i], true);
                        }

                        // Extends the parent or constrains the child
                        if (this.isExtendParentsOnAdd() && this.isExtendParent(cells[i])) {
                            this.extendParent(cells[i]);
                        }

                        // Additionally constrains the child after extending the parent
                        if (constrain == null || constrain) {
                            this.constrainChild(cells[i]);
                        }

                        // Sets the source terminal
                        if (source != null) {
                            this.cellConnected(cells[i], source, true);
                        }

                        // Sets the target terminal
                        if (target != null) {
                            this.cellConnected(cells[i], target, false);
                        }
                    }
                }

                //this.fireEvent(new mxEventObject(mxEvent.CELLS_ADDED, 'cells', cells,
                //    'parent', parent, 'index', index, 'source', source, 'target', target,
                //    'absolute', absolute));

                this.emit(new EventObject('cellsAdded', {
                    cells: cells,
                    parent: parent,
                    index: index,
                    source: source,
                    target: target,
                    absolute: absolute
                }));
            }
            finally {
                this.model.endUpdate();
            }
        }
    },
    autoSizeCell: function (cell, recurse) {},
    removeCells: function (cells, includeEdges) {},
    cellsRemoved: function (cells) {},
    splitEdge: function (edge, cells, newEdge, dx, dy) {},


    // Cell visibility
    // ---------------
    toggleCells: function (show, cells, includeEdges) {},
    cellsToggled: function (cells, show) {},


    // Folding
    // -------
    foldCells: function () {},
    cellsFolded: function () {},
    swapBounds: function () {},
    updateAlternateBounds: function () {},
    addAllEdges: function () {},
    getAllEdges: function () {},


    // Cell sizing
    // -----------
    updateCellSize: function () {},
    cellSizeUpdated: function () {},
    getPreferredSizeForCell: function () {},
    resizeCell: function () {},
    resizeCells: function () {},
    cellsResized: function () {},
    cellResized: function () {},
    resizeChildCells: function () {},
    constrainChildCells: function () {},
    scaleCell: function () {},
    extendParent: function () {},


    // Cell moving
    // -----------
    importCells: function () {},
    moveCells: function () {},
    cellsMoved: function () {},
    translateCell: function () {},
    getCellContainmentArea: function () {},
    getMaximumGraphBounds: function () {},
    constrainChild: function () {},
    resetEdges: function () {},
    resetEdge: function () {},


    // Cell connecting and connection constraints
    // ------------------------------------------
    getOutlineConstraint: function () {},
    getAllConnectionConstraints: function () {},
    getConnectionConstraint: function () {},
    setConnectionConstraint: function () {},
    getConnectionPoint: function () {},
    connectCell: function () {},
    cellConnected: function () {},
    disconnectGraph: function () {},


    // Drilldown
    // ---------
    getCurrentRoot: function () {
        return this.view.currentRoot;
    },
    getTranslateForRoot: function () {},
    isPort: function () {},
    getTerminalForPort: function () {},
    getChildOffsetForCell: function (cell) {
        return null;
    },
    enterGroup: function () {},
    exitGroup: function () {},
    home: function () {},
    isValidRoot: function () {},


    // Graph display
    // -------------
    getGraphBounds: function () {},
    getCellBounds: function () {},
    getBoundingBoxFromGeometry: function () {},
    refresh: function () {},
    snap: function () {},
    panGraph: function () {},
    zoomIn: function () {},
    zoomOut: function () {},
    zoomActual: function () {},
    zoomTo: function () {},
    center: function () {},
    zoom: function () {},
    zoomToRect: function () {},
    fit: function () {},
    scrollCellToVisible: function () {},
    scrollRectToVisible: function () {},
    getCellGeometry: function (cell) {
        return this.model.getGeometry(cell);
    },
    isCellVisible: function (cell) {
        return this.model.isVisible(cell);
    },
    isCellCollapsed: function (cell) {
        return this.model.isCollapsed(cell);
    },
    isCellConnectable: function () {},
    isOrthogonal: function () {},
    isLoop: function () {},
    isCloneEvent: function () {},
    isToggleEvent: function () {},
    isGridEnabledEvent: function () {},
    isConstrainedEvent: function () {},


    // Validation
    // ----------

    validationAlert: function () {},
    isEdgeValid: function () {},
    getEdgeValidationError: function () {},
    validateEdge: function () {},
    validateGraph: function () {},
    getCellValidationError: function () {},
    validateCell: function () {},


    // Graph appearance
    // ----------------
    getBackgroundImage: function () {},
    setBackgroundImage: function () {},
    getFoldingImage: function () {},
    convertValueToString: function (cell) {
        var value = this.model.getValue(cell);

        if (value) {
            if (utils.isNode(value)) {
                return value.nodeName;
            } else if (utils.isFunction(value.toString)) {
                return value.toString();
            }
        }

        return '';
    },
    getLabel: function (cell) {
        var result = '';

        if (this.labelsVisible && cell) {
            var state = this.view.getState(cell);
            var style = (state) ? state.style : this.getCellStyle(cell);

            if (!utils.getValue(style, constants.STYLE_NOLABEL, false)) {
                result = this.convertValueToString(cell);
            }
        }

        return result;
    },
    isHtmlLabel: function () {
        return this.isHtmlLabels();
    },
    isHtmlLabels: function () {
        return this.htmlLabels;
    },
    setHtmlLabels: function () {},
    isWrapping: function (cell) {
        var state = this.view.getState(cell);
        var style = (state) ? state.style : this.getCellStyle(cell);

        return (style) ? style[constants.STYLE_WHITE_SPACE] == 'wrap' : false;
    },
    isLabelClipped: function (cell) {
        var state = this.view.getState(cell);
        var style = (state) ? state.style : this.getCellStyle(cell);

        return (style) ? style[constants.STYLE_OVERFLOW] == 'hidden' : false;
    },
    getTooltip: function () {},
    getTooltipForCell: function () {},
    getCursorForMouseEvent: function () {},
    getCursorForCell: function () {},
    getStartSize: function () {},
    getImage: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_IMAGE] : null;
    },
    getVerticalAlign: function () {},
    getIndicatorColor: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_COLOR] : null;
    },
    getIndicatorGradientColor: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_GRADIENTCOLOR] : null;
    },
    getIndicatorShape: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_SHAPE] : null;

    },
    getIndicatorImage: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_IMAGE] : null;
    },
    getBorder: function () {},
    setBorder: function () {},
    isSwimlane: function () {},


    // Graph behaviour
    // ---------------
    isResizeContainer: function () {},
    setResizeContainer: function () {},
    isEnabled: function () {},
    setEnabled: function () {},
    isEscapeEnabled: function () {},
    setEscapeEnabled: function () {},
    isInvokesStopCellEditing: function () {},
    setInvokesStopCellEditing: function () {},
    isEnterStopsCellEditing: function () {},
    setEnterStopsCellEditing: function () {},
    isCellLocked: function () {},
    isCellsLocked: function () {},
    setCellsLocked: function () {},
    getCloneableCells: function () {},
    isCellCloneable: function () {},
    isCellsCloneable: function () {},
    setCellsCloneable: function () {},
    getExportableCells: function () {},
    canExportCell: function () {},
    getImportableCells: function () {},
    canImportCell: function () {},
    isCellSelectable: function () {},
    isCellsSelectable: function () {},
    setCellsSelectable: function () {},
    getDeletableCells: function () {},
    isCellDeletable: function () {},
    isCellsDeletable: function () {},
    setCellsDeletable: function () {},
    isLabelMovable: function () {},
    isCellRotatable: function () {},
    getMovableCells: function () {},
    isCellMovable: function () {},
    isCellsMovable: function () {},
    setCellsMovable: function () {},
    isGridEnabled: function () {},
    setGridEnabled: function () {},
    isPortsEnabled: function () {},
    setPortsEnabled: function () {},
    getGridSize: function () {},
    setGridSize: function () {},
    getTolerance: function () {},
    setTolerance: function () {},
    isVertexLabelsMovable: function () {},
    setVertexLabelsMovable: function () {},
    isEdgeLabelsMovable: function () {},
    setEdgeLabelsMovable: function () {},
    isSwimlaneNesting: function () {},
    setSwimlaneNesting: function () {},
    isSwimlaneSelectionEnabled: function () {},
    setSwimlaneSelectionEnabled: function () {},
    isMultigraph: function () {},
    setMultigraph: function () {},
    isAllowLoops: function () {},
    setAllowDanglingEdges: function () {},
    isAllowDanglingEdges: function () {},
    setConnectableEdges: function () {},
    isConnectableEdges: function () {},
    setCloneInvalidEdges: function () {},
    isCloneInvalidEdges: function () {},
    setAllowLoops: function () {},
    isDisconnectOnMove: function () {},
    setDisconnectOnMove: function () {},
    isDropEnabled: function () {},
    setDropEnabled: function () {},
    isSplitEnabled: function () {},
    setSplitEnabled: function () {},
    isCellResizable: function () {},
    isCellsResizable: function () {},
    setCellsResizable: function () {},
    isTerminalPointMovable: function () {},
    isCellBendable: function () {},
    isCellsBendable: function () {},
    setCellsBendable: function () {},
    isCellEditable: function () {},
    isCellsEditable: function () {},
    setCellsEditable: function () {},
    isCellDisconnectable: function () {},
    isCellsDisconnectable: function () {},
    setCellsDisconnectable: function () {},
    isValidSource: function () {},
    isValidTarget: function () {},
    isValidConnection: function () {},
    setConnectable: function () {},
    isConnectable: function () {},
    setTooltips: function () {},
    setPanning: function () {},
    isEditing: function () {},
    isAutoSizeCell: function () {},
    isAutoSizeCells: function () {},
    setAutoSizeCells: function () {},
    isExtendParent: function () {},
    isExtendParents: function () {},
    setExtendParents: function () {},
    isExtendParentsOnAdd: function () {},
    setExtendParentsOnAdd: function () {},
    isExtendParentsOnMove: function () {},
    setExtendParentsOnMove: function () {},
    isRecursiveResize: function () {},
    setRecursiveResize: function () {},
    isConstrainChild: function () {},
    isConstrainChildren: function () {},
    setConstrainChildren: function () {},
    setConstrainChildrenOnResize: function () {},
    isConstrainChildrenOnResize: function () {},
    isAllowNegativeCoordinates: function () {},
    setAllowNegativeCoordinates: function () {},
    getOverlap: function () {},
    isAllowOverlapParent: function () {},
    getFoldableCells: function () {},
    isCellFoldable: function () {},
    isValidDropTarget: function () {},
    isSplitTarget: function () {},
    getDropTarget: function () {},


    // Cell retrieval
    // ---------------
    getDefaultParent: function () {
        var parent = this.getCurrentRoot() || this.defaultParent;

        if (!parent) {
            var root = this.model.getRoot();
            parent = this.model.getChildAt(root, 0);
        }

        return parent;
    },
    setDefaultParent: function () {},
    getSwimlane: function () {},
    getSwimlaneAt: function () {},
    getCellAt: function () {},
    intersects: function () {},
    hitsSwimlaneContent: function () {},
    getChildVertices: function () {},
    getChildEdges: function () {},
    getChildCells: function () {},
    getConnections: function () {},
    getIncomingEdges: function () {},
    getOutgoingEdges: function () {},
    getEdges: function () {},
    isValidAncestor: function () {},
    getOpposites: function () {},
    getEdgesBetween: function () {},
    getPointForEvent: function () {},
    getCells: function () {},
    getCellsBeyond: function () {},
    findTreeRoots: function () {},
    traverse: function () {},


    // Selection
    // ---------
    isCellSelected: function () {},
    isSelectionEmpty: function () {},
    clearSelection: function () {},
    getSelectionCount: function () {},
    getSelectionCell: function () {},
    getSelectionCells: function () {},
    setSelectionCell: function () {},
    setSelectionCells: function () {},
    addSelectionCell: function () {},
    addSelectionCells: function () {},
    removeSelectionCell: function () {},
    removeSelectionCells: function () {},
    selectRegion: function () {},
    selectNextCell: function () {},
    selectPreviousCell: function () {},
    selectParentCell: function () {},
    selectChildCell: function () {},
    selectCell: function () {},
    selectAll: function () {},
    selectVertices: function () {},
    selectEdges: function () {},
    selectCells: function () {},
    selectCellForEvent: function () {},
    selectCellsForEvent: function () {},

    // Selection state
    // ---------------
    createHandler: function () {},
    createVertexHandler: function () {},
    createEdgeHandler: function () {},
    createEdgeSegmentHandler: function () {},
    createElbowEdgeHandler: function () {},


    // Graph events
    // ------------
    addMouseListener: function () {},
    removeMouseListener: function () {},
    updateMouseEvent: function () {},
    getStateForTouchEvent: function () {},
    isEventIgnored: function () {},
    isSyntheticEventIgnored: function () {},
    isEventSourceIgnored: function () {},
    fireMouseEvent: function () {},
    consumeMouseEvent: function () {},
    fireGestureEvent: function () {},

    destroy: function () {}
});


});
