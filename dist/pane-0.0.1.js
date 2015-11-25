(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pane"] = factory();
	else
		root["pane"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pane = {
	    geom: {
	        Point: __webpack_require__(1)
	    },
	    utils: __webpack_require__(2),
	    Class: __webpack_require__(11),
	    Events: __webpack_require__(13),
	    Graph: __webpack_require__(12),
	    Paper: __webpack_require__(15)
	};
	
	module.exports = pane;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _commonUtils = __webpack_require__(2);
	
	var math = Math;
	var PI = math.PI;
	var abs = math.abs;
	var cos = math.cos;
	var sin = math.sin;
	var mmin = math.min;
	var mmax = math.max;
	var sqrt = math.sqrt;
	var atan2 = math.atan2;
	var _round = math.round;
	var floor = math.floor;
	var random = math.random;
	
	function Point() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	    var that = this;
	
	    that.x = x;
	    that.y = y;
	}
	
	Point.prototype = {
	
	    constructor: Point,
	
	    update: function update() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        var that = this;
	
	        that.x = x;
	        that.y = y;
	
	        return that;
	    },
	
	    translate: function translate() {
	        var dx = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var dy = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        var that = this;
	
	        that.x += dx;
	        that.y += dy;
	
	        return that;
	    },
	
	    round: function round(precision) {
	
	        var that = this;
	
	        that.x = precision ? (0, _commonUtils.toFixed)(that.x, precision) : _round(that.x);
	        that.y = precision ? (0, _commonUtils.toFixed)(that.y, precision) : _round(that.y);
	
	        return that;
	    },
	
	    diff: function diff(p) {
	        return new Point(this.x - p.x, this.y - p.y);
	    },
	
	    adhereToRect: function adhereToRect(rect) {
	
	        // If point lies outside rectangle `rect`, return the nearest point on
	        // the boundary of rect `rect`, otherwise return point itself.
	
	        var that = this;
	        if (rect.containsPoint(that)) {
	            return that;
	        }
	
	        that.x = mmin(mmax(that.x, rect.x), rect.x + rect.width);
	        that.y = mmin(mmax(that.y, rect.y), rect.y + rect.height);
	
	        return that;
	    },
	
	    theta: function theta(p) {
	
	        // Compute the angle between me and `p` and the x axis.
	        // (cartesian-to-polar coordinates conversion)
	        // Return theta angle in degrees.
	
	        // Invert the y-axis.
	        var y = -(p.y - this.y);
	        var x = p.x - this.x;
	        // Makes sure that the comparison with zero takes rounding errors into account.
	        var PRECISION = 10;
	        // Note that `atan2` is not defined for `x`, `y` both equal zero.
	        var rad = (0, _commonUtils.toFixed)(y, PRECISION) === 0 && (0, _commonUtils.toFixed)(x, PRECISION) === 0 ? 0 : atan2(y, x);
	
	        // Correction for III. and IV. quadrant.
	        if (rad < 0) {
	            rad = 2 * PI + rad;
	        }
	
	        return (0, _commonUtils.toDeg)(rad);
	    },
	
	    distance: function distance(p) {
	
	        // Returns distance between me and point `p`.
	
	        var dx = p.x - this.x;
	        var dy = p.y - this.y;
	        return sqrt(dx * dx + dy * dy);
	    },
	
	    manhattanDistance: function manhattanDistance(p) {
	
	        // Returns a manhattan (taxi-cab) distance between me and point `p`.
	
	        return abs(p.x - this.x) + abs(p.y - this.y);
	    },
	
	    normalize: function normalize(len) {
	
	        // Scale the line segment between (0,0) and me to have a length of len.
	
	        var that = this;
	        var x = that.x;
	        var y = that.y;
	
	        if (x === 0 && y === 0) {
	            return that;
	        }
	
	        var l = len || 1;
	        var s;
	
	        if (x === 0) {
	            s = l / y;
	        } else if (y === 0) {
	            s = l / x;
	        } else {
	            s = l / that.distance(new Point());
	        }
	
	        that.x = s * x;
	        that.y = s * y;
	
	        return that;
	    },
	
	    toPolar: function toPolar(o) {
	
	        // Converts rectangular to polar coordinates.
	        // An origin can be specified, otherwise it's `0 0`.
	
	        o = o && new Point(o) || new Point(0, 0);
	
	        var that = this;
	        var x = that.x;
	        var y = that.y;
	
	        that.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y)); // r
	        that.y = toRad(o.theta(point(x, y)));
	
	        return that;
	    },
	
	    rotate: function rotate(o, angle) {
	
	        // Rotate point by angle around origin o.
	
	        angle = (angle + 360) % 360;
	
	        var that = this;
	
	        that.toPolar(o);
	        that.y += toRad(angle);
	
	        var p = Point.fromPolar(that.x, that.y, o);
	
	        that.x = p.x;
	        that.y = p.y;
	        return that;
	    },
	
	    move: function move(ref, distance) {
	
	        // Move point on line starting from ref
	        // ending at me by distance distance.
	        var that = this;
	        var rad = toRad(ref.theta(that));
	        return that.translate(cos(rad) * distance, -sin(rad) * distance);
	    },
	
	    reflect: function reflect(ref) {
	
	        // Returns a point that is the reflection of me with
	        // the center of inversion in ref point.
	
	        return ref.move(this, this.distance(ref));
	    },
	
	    changeInAngle: function changeInAngle(dx, dy, ref) {
	        // Returns change in angle from my previous position (-dx, -dy) to
	        // my new position relative to ref point.
	
	        // Revert the translation and measure the change in angle around x-axis.
	        return this.translate(-dx, -dy).theta(ref) - this.theta(ref);
	    },
	
	    snapToGrid: function snapToGrid(gx, gy) {
	
	        var that = this;
	
	        that.x = (0, _commonUtils.snapToGrid)(that.x, gx);
	        that.y = (0, _commonUtils.snapToGrid)(that.y, gy || gx);
	
	        return that;
	    },
	
	    valueOf: function valueOf() {
	        return [this.x, this.y];
	    },
	
	    toString: function toString() {
	        return this.valueOf().join(', ');
	    },
	
	    equals: function equals(p) {
	        return Point.equals(this, p);
	    },
	
	    clone: function clone() {
	        return Point.fromPoint(this);
	    }
	};
	
	// statics
	// -------
	
	Point.equals = function (p1, p2) {
	    return p1 && p2 && p1 instanceof Point && p2 instanceof Point && p1.x === p2.x && p1.y === p2.y;
	};
	
	Point.fromPoint = function (p) {
	    return new Point(p.x, p.y);
	};
	
	Point.fromString = function (str) {
	    var arr = str.split(str.indexOf('@') === -1 ? ' ' : '@');
	    return new Point((0, _commonUtils.toFloat)(arr[0]), (0, _commonUtils.toFloat)(arr[1]));
	};
	
	Point.fromPolar = function (r, angle, o) {
	
	    // Alternative constructor, from polar coordinates.
	    // @param {number} r Distance.
	    // @param {number} angle Angle in radians.
	    // @param {point} [optional] o Origin.
	
	    o = o && point(o) || point(0, 0);
	    var x = abs(r * cos(angle));
	    var y = abs(r * sin(angle));
	    var deg = normalizeAngle((0, _commonUtils.toDeg)(angle));
	
	    if (deg < 90) {
	        y = -y;
	    } else if (deg < 180) {
	        x = -x;
	        y = -y;
	    } else if (deg < 270) {
	        x = -x;
	    }
	
	    return point(o.x + x, o.y + y);
	};
	
	Point.random = function (x1, x2, y1, y2) {
	    // Create a point with random coordinates that fall
	    // into the range `[x1, x2]` and `[y1, y2]`.
	
	    var x = floor(random() * (x2 - x1 + 1) + x1);
	    var y = floor(random() * (y2 - y1 + 1) + y1);
	
	    return new Point(x, y);
	};
	
	// exports
	// -------
	exports['default'] = Point;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	var _utilsLang = __webpack_require__(3);
	
	_defaults(exports, _interopExportWildcard(_utilsLang, _defaults));
	
	var _utilsString = __webpack_require__(4);
	
	_defaults(exports, _interopExportWildcard(_utilsString, _defaults));
	
	var _utilsNumber = __webpack_require__(5);
	
	_defaults(exports, _interopExportWildcard(_utilsNumber, _defaults));
	
	var _utilsObject = __webpack_require__(6);
	
	_defaults(exports, _interopExportWildcard(_utilsObject, _defaults));
	
	var _utilsArray = __webpack_require__(7);
	
	_defaults(exports, _interopExportWildcard(_utilsArray, _defaults));
	
	var _utilsFunction = __webpack_require__(8);
	
	_defaults(exports, _interopExportWildcard(_utilsFunction, _defaults));
	
	var _utilsDom = __webpack_require__(9);
	
	_defaults(exports, _interopExportWildcard(_utilsDom, _defaults));
	
	var _utilsGeom = __webpack_require__(10);
	
	_defaults(exports, _interopExportWildcard(_utilsGeom, _defaults));

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function isNull(obj) {
	    return obj === null;
	}
	
	function isUndefined(obj) {
	    return typeof obj === 'undefined';
	}
	
	function isString(obj) {
	    return typeof obj === 'string';
	}
	
	function isBoolean(obj) {
	    return typeof obj === 'boolean';
	}
	
	function isNullOrUndefined(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	
	function isType(obj, type) {
	    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	}
	
	function isObject(obj) {
	    if (!obj) {
	        return false;
	    }
	
	    var type = typeof obj;
	
	    return type === 'function' || type === 'object';
	}
	
	function isFunction(obj) {
	    return isType(obj, 'Function');
	}
	
	function isWindow(obj) {
	    return obj && obj === obj.window;
	}
	
	function isArray(obj) {
	    return Array.isArray(obj);
	}
	
	function isArrayLike(obj) {
	    if (isArray(obj)) {
	        return true;
	    }
	
	    if (isFunction(obj) || isWindow(obj)) {
	        return false;
	    }
	
	    var length = !!obj && 'length' in obj && obj.length;
	
	    return length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
	}
	
	function isNumeric(obj) {
	    return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
	}
	
	exports.isNull = isNull;
	exports.isType = isType;
	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.isString = isString;
	exports.isWindow = isWindow;
	exports.isBoolean = isBoolean;
	exports.isNumeric = isNumeric;
	exports.isFunction = isFunction;
	exports.isArrayLike = isArrayLike;
	exports.isUndefined = isUndefined;
	exports.isNullOrUndefined = isNullOrUndefined;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var proto = String.prototype;
	
	function toString(str) {
	    return '' + str;
	}
	
	function sanitizeText(text) {
	
	    // Replace all spaces with the Unicode No-break space.
	    // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
	    // IE would otherwise collapse all spaces into one. This is useful
	    // e.g. in tests when you want to compare the actual DOM text content
	    // without having to add the unicode character in the place of all spaces.
	
	    return (text || '').replace(/ /g, ' ');
	}
	
	function trim(str) {
	    return proto.trim.call(str);
	}
	
	exports.trim = trim;
	exports.toString = toString;
	exports.sanitizeText = sanitizeText;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function toInt(value) {
	    return parseInt(value, 10);
	}
	
	function toFloat(value) {
	    return parseFloat(value);
	}
	
	function toFixed(value, precision) {
	    var power = Math.pow(10, precision);
	    return toFloat((Math.round(value * power) / power).toFixed(precision));
	}
	
	exports.toInt = toInt;
	exports.toFloat = toFloat;
	exports.toFixed = toFixed;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _array = __webpack_require__(7);
	
	function hasKey(obj, key) {
	    return obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
	}
	
	function keys(obj) {
	    return obj ? Object.keys(obj) : [];
	}
	
	function forIn(obj, iterator, context) {
	    (0, _array.forEach)(keys(obj), function (key) {
	        iterator.call(context, obj[key], key);
	    });
	}
	
	function extend(dist) {
	
	    if (!dist) {
	        dist = {};
	    }
	
	    for (var i = 1, length = arguments.length; i < length; i++) {
	        var source = arguments[i];
	        source && forIn(source, function (value, key) {
	            dist[key] = value;
	        });
	    }
	
	    return dist;
	}
	
	exports.hasKey = hasKey;
	exports.keys = keys;
	exports.forIn = forIn;
	exports.extend = extend;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(3);
	
	var proto = Array.prototype;
	
	function toArray(obj) {
	    return (0, _lang.isArray)(obj) ? obj : (0, _lang.isArrayLike)(obj) ? proto.slice.call(obj) : [obj];
	}
	
	function indexOf(arr, item) {
	    return arr ? proto.indexOf.call(arr, item) : -1;
	}
	
	function lastIndexOf(arr, item) {
	    return arr ? proto.lastIndexOf.call(arr, item) : -1;
	}
	
	function every(arr, iterator, context) {
	    return arr ? proto.every.call(arr, iterator, context) : false;
	}
	
	function some(arr, iterator, context) {
	    return arr ? proto.some.call(arr, iterator, context) : false;
	}
	
	function forEach(arr, iterator, context) {
	    arr && proto.forEach.call(arr, iterator, context);
	}
	
	function map(arr, iterator, context) {
	    return arr ? proto.map.call(arr, iterator, context) : [];
	}
	
	function filter(arr, iterator, context) {
	    return arr ? proto.filter.call(arr, iterator, context) : [];
	}
	
	function reduce(arr, iterator, initialValue) {
	    return arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
	}
	
	function reduceRight(arr, iterator, initialValue) {
	    return arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;
	}
	
	exports.toArray = toArray;
	exports.indexOf = indexOf;
	exports.lastIndexOf = lastIndexOf;
	exports.every = every;
	exports.some = some;
	exports.forEach = forEach;
	exports.map = map;
	exports.filter = filter;
	exports.reduce = reduce;
	exports.reduceRight = reduceRight;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(3);
	
	function invoke(fn, args, context) {
	    if (!fn || !(0, _lang.isFunction)(fn)) {
	        return;
	    }
	
	    var ret;
	    var a1 = args[0];
	    var a2 = args[1];
	    var a3 = args[2];
	
	    switch (args.length) {
	        case 0:
	            ret = fn.call(context);
	            break;
	        case 1:
	            ret = fn.call(context, a1);
	            break;
	        case 2:
	            ret = fn.call(context, a1, a2);
	            break;
	        case 3:
	            ret = fn.call(context, a1, a2, a3);
	            break;
	        default:
	            ret = fn.apply(context, args);
	            break;
	    }
	
	    return ret;
	}
	
	function bind(fn, context /* [,arg1[,arg2[,argN]]] */) {
	    return (0, _lang.isFunction)(fn) ? Function.prototype.bind.apply(arguments) : fn;
	}
	
	exports.bind = bind;
	exports.invoke = invoke;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(3);
	
	var _array = __webpack_require__(7);
	
	// xml namespaces.
	var ns = {
	    xmlns: 'http://www.w3.org/2000/svg',
	    xlink: 'http://www.w3.org/1999/xlink'
	};
	// svg version.
	var svgVersion = '1.1';
	
	function isNode() {}
	
	function getClassName(elem) {
	    return elem.getAttribute && elem.getAttribute('class') || '';
	}
	
	function parseXML(str, async) {
	
	    var xml;
	
	    try {
	        var parser = new DOMParser();
	
	        if (!(0, _lang.isUndefined)(async)) {
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
	        ? elem.setAttributeNS(ns[combined[0]], combined[1], value) : elem.setAttribute(name, value);
	    }
	}
	
	// parse transform
	// ---------------
	
	function parseTranslate(transform) {
	
	    var translate = { tx: 0, ty: 0 };
	
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
	
	    var scale = { sx: 1, sy: 1 };
	
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
	
	    var rotate = { angle: 0 };
	
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
	    return ['M', line.getAttribute('x1'), line.getAttribute('y1'), 'L', line.getAttribute('x2'), line.getAttribute('y2')].join(' ');
	}
	
	function polygonToPathData(polygon) {
	
	    var d = [];
	
	    (0, _array.forEach)(polygon.points, function (p, i) {
	        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
	    });
	
	    d.push('Z');
	
	    return d.join(' ');
	}
	
	function polylineToPathData(polyline) {
	
	    var d = [];
	
	    (0, _array.forEach)(polyline.points, function (p, i) {
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
	
	        d = ['M', x, y, 'H', r, 'V', b, 'H', x, 'V', y, 'Z'];
	    } else {
	
	        d = ['M', x + rx, y, 'L', r - rx, y, 'Q', r, y, r, y + ry, 'L', r, y + h - ry, 'Q', r, b, r - rx, b, 'L', x + rx, b, 'Q', x, b, x, b - rx, 'L', x, y + ry, 'Q', x, y, x + rx, y, 'Z'];
	    }
	    return d.join(' ');
	}
	
	var KAPPA = 0.5522847498307935;
	
	function circleToPathData(circle) {
	
	    var cx = parseFloat(circle.getAttribute('cx')) || 0;
	    var cy = parseFloat(circle.getAttribute('cy')) || 0;
	    var r = parseFloat(circle.getAttribute('r'));
	    var cd = r * KAPPA; // Control distance.
	
	    return ['M', cx, cy - r, // Move to the first point.
	    'C', cx + cd, cy - r, cx + r, cy - cd, cx + r, cy, // I. Quadrant.
	    'C', cx + r, cy + cd, cx + cd, cy + r, cx, cy + r, // II. Quadrant.
	    'C', cx - cd, cy + r, cx - r, cy + cd, cx - r, cy, // III. Quadrant.
	    'C', cx - r, cy - cd, cx - cd, cy - r, cx, cy - r, // IV. Quadrant.
	    'Z'].join(' ');
	}
	
	function ellipseToPathData(ellipse) {
	
	    var cx = parseFloat(ellipse.getAttribute('cx')) || 0;
	    var cy = parseFloat(ellipse.getAttribute('cy')) || 0;
	    var rx = parseFloat(ellipse.getAttribute('rx'));
	    var ry = parseFloat(ellipse.getAttribute('ry')) || rx;
	    var cdx = rx * KAPPA; // Control distance x.
	    var cdy = ry * KAPPA; // Control distance y.
	
	    return ['M', cx, cy - ry, // Move to the first point.
	    'C', cx + cdx, cy - ry, cx + rx, cy - cdy, cx + rx, cy, // I. Quadrant.
	    'C', cx + rx, cy + cdy, cx + cdx, cy + ry, cx, cy + ry, // II. Quadrant.
	    'C', cx - cdx, cy + ry, cx - rx, cy + cdy, cx - rx, cy, // III. Quadrant.
	    'C', cx - rx, cy - cdy, cx - cdx, cy - ry, cx, cy - ry, // IV. Quadrant.
	    'Z'].join(' ');
	}
	
	exports.createSvgDocument = createSvgDocument;
	exports.createSvgElement = createSvgElement;
	exports.setAttribute = setAttribute;
	exports.getClassName = getClassName;
	exports.parseScale = parseScale;
	exports.parseRotate = parseRotate;
	exports.parseTransform = parseTransform;
	exports.parseTranslate = parseTranslate;
	exports.lineToPathData = lineToPathData;
	exports.rectToPathData = rectToPathData;
	exports.circleToPathData = circleToPathData;
	exports.ellipseToPathData = ellipseToPathData;
	exports.polygonToPathData = polygonToPathData;
	exports.polylineToPathData = polylineToPathData;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var math = Math;
	var PI = math.PI;
	var round = math.round;
	
	function toDeg(rad) {
	    return 180 * rad / PI % 360;
	}
	
	function toRad(deg, over360) {
	    deg = over360 ? deg : deg % 360;
	    return deg * PI / 180;
	}
	
	function snapToGrid(val, gridSize) {
	    return gridSize * round(val / gridSize);
	}
	
	function normalizeAngle(angle) {
	    return angle % 360 + (angle < 0 ? 360 : 0);
	}
	
	exports.toDeg = toDeg;
	exports.toRad = toRad;
	exports.snapToGrid = snapToGrid;
	exports.normalizeAngle = normalizeAngle;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	function Class(fn) {
	    if (!(this instanceof Class) && (0, _utils.isFunction)(fn)) {
	        return classify(fn);
	    }
	}
	
	Class.create = function (parent, properties) {
	
	    if (!(0, _utils.isFunction)(parent)) {
	        properties = parent;
	        parent = null;
	    }
	
	    properties || (properties = {});
	    parent || (parent = properties.Extends || Class);
	    properties.Extends = parent;
	
	    var SubClass = properties.constructor;
	    if (SubClass === Object.prototype.constructor) {
	        SubClass = function Superclass() {};
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
	
	Class.extend = function (properties) {
	
	    // Create a sub Class based on `Class`.
	
	    properties || (properties = {});
	    properties.Extends = this;
	
	    return Class.create(properties);
	};
	
	Class.Mutators = {
	    // define special properties.
	
	    'Extends': function Extends(parent) {
	        var that = this;
	        var existed = that.prototype;
	        var parentProto = parent.prototype;
	        var proto = createProto(parentProto);
	
	        // Keep existed properties.
	        mix(proto, existed);
	
	        // Enforce the constructor to be what we expect.
	        proto.constructor = that;
	
	        that.prototype = proto;
	        that.superclass = parentProto;
	    },
	
	    'Implements': function Implements(items) {
	
	        var proto = this.prototype;
	        var list = (0, _utils.isArray)(items) ? items : [items];
	
	        (0, _utils.forEach)(list, function (item) {
	            mix(proto, item.prototype || item);
	        });
	    },
	
	    'Statics': function Statics(staticProperties) {
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
	
	    (0, _utils.forIn)(properties, function (value, key) {
	        if ((0, _utils.hasKey)(mutators, key)) {
	            mutators[key].call(that, value);
	        } else {
	            that.prototype[key] = value;
	        }
	    });
	}
	
	// Helpers
	// -------
	
	var createProto = Object.__proto__ ? function (proto) {
	    return { __proto__: proto };
	} : function (proto) {
	    function Ctor() {}
	
	    Ctor.prototype = proto;
	    return new Ctor();
	};
	
	function mix(receiver, supplier, whiteList) {
	
	    (0, _utils.forIn)(supplier, function (value, key) {
	        if (whiteList && (0, _utils.indexOf)(whiteList, key) === -1) {
	            return;
	        }
	
	        receiver[key] = value;
	    });
	}
	
	// export
	// ------
	
	exports['default'] = Class;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _commonEvents = __webpack_require__(13);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var _cellsCell = __webpack_require__(19);
	
	var _cellsCell2 = _interopRequireDefault(_cellsCell);
	
	var _changesRootChange = __webpack_require__(20);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	var _changesChangeCollection = __webpack_require__(18);
	
	var _changesChangeCollection2 = _interopRequireDefault(_changesChangeCollection);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _commonEvents2['default'],
	
	    constructor: function Graph(root) {
	
	        var that = this;
	
	        that.nextId = 0;
	        that.updateLevel = 0;
	        that.endingUpdate = false;
	        that.changes = new _changesChangeCollection2['default'](that);
	
	        if (root) {
	            that.setRoot(root);
	        } else {
	            that.clear();
	        }
	    },
	
	    clear: function clear() {
	        return this.setRoot(this.createRoot());
	    },
	
	    isAncestor: function isAncestor(parent, child) {
	
	        if (!parent || !child) {
	            return false;
	        }
	
	        while (child && child !== parent) {
	            child = child.parent;
	        }
	
	        return child === parent;
	    },
	
	    contains: function contains(cell) {
	        return this.isAncestor(this.root, cell);
	    },
	
	    getCellById: function getCellById(id) {
	        return this.cells ? this.cells[id] : null;
	    },
	
	    createCellId: function createCellId() {
	        var that = this;
	        var id = that.nextId;
	
	        that.nextId += 1;
	
	        return 'cell-' + id;
	    },
	
	    getAncestors: function getAncestors(child) {
	
	        var that = this;
	        var result = [];
	        var parent = child ? child.parent : null;
	
	        if (parent) {
	            result.push(parent);
	            result = result.concat(that.getAncestors(parent));
	        }
	
	        return result;
	    },
	
	    getDescendants: function getDescendants(parent) {
	
	        var that = this;
	        var result = [];
	
	        parent = parent || that.getRoot();
	        parent.eachChild(function (child) {
	            result.push(child);
	            result = result.concat(that.getDescendants(child));
	        });
	
	        return result;
	    },
	
	    getParents: function getParents(cells) {
	
	        var parents = [];
	
	        if (cells) {
	
	            var hash = {};
	
	            each(cells, function (cell) {
	                var parent = cell.parent;
	
	                if (parent) {
	                    var id = cellRoute.create(parent);
	
	                    if (!hash[id]) {
	                        hash[id] = parent;
	                        parents.push(parent);
	                    }
	                }
	            });
	        }
	
	        return parents;
	    },
	
	    // root
	    // ----
	
	    isRoot: function isRoot(cell) {
	        return cell && this.root === cell;
	    },
	
	    createRoot: function createRoot() {
	        var root = new _cellsCell2['default']();
	
	        root.insertChild(new _cellsCell2['default']());
	
	        return root;
	    },
	
	    getRoot: function getRoot(cell) {
	
	        var root = cell || this.root;
	
	        if (cell) {
	            while (cell) {
	                root = cell;
	                cell = cell.parent;
	            }
	        }
	
	        return root;
	    },
	
	    setRoot: function setRoot(root) {
	        return this.digest(new _changesRootChange2['default'](this, root));
	    },
	
	    rootChanged: function rootChanged(newRoot) {
	
	        var that = this;
	        var oldRoot = that.root;
	
	        that.root = newRoot;
	        that.cells = null;
	        that.nextId = 0;
	        that.cellAdded(newRoot);
	
	        return oldRoot;
	    },
	
	    // Layers
	    // ------
	
	    isLayer: function isLayer(cell) {
	        return cell && this.isRoot(cell.parent);
	    },
	
	    getLayers: function getLayers() {
	        return this.getRoot().children || [];
	    },
	
	    // child
	    // -----
	
	    getParent: function getParent(cell) {
	        return cell ? cell.parent : null;
	    },
	
	    add: function add(parent, child, index) {
	
	        var that = this;
	
	        if (parent && child && parent !== child) {
	
	            if (isNullOrUndefined(index)) {
	                index = parent.getChildCount();
	            }
	
	            var parentChanged = parent !== child.parent;
	
	            that.digest(new ChildChange(that, parent, child, index));
	
	            // move the links into the nearest common ancestor of its terminals
	            if (that.maintainEdgeParent && parentChanged) {
	                that.updateLinkParents(child);
	            }
	        }
	
	        return that;
	    },
	
	    cellAdded: function cellAdded(cell) {
	
	        var that = this;
	
	        if (cell) {
	
	            var id = cell.id || that.createCellId(cell);
	
	            if (id) {
	
	                // distinct
	                var collision = that.getCellById(id);
	
	                if (collision !== cell) {
	                    while (collision) {
	                        id = that.createCellId(cell);
	                        collision = that.getCellById(id);
	                    }
	
	                    // as lazy as possible
	                    if (!that.cells) {
	                        that.cells = {};
	                    }
	
	                    cell.id = id;
	                    that.cells[id] = cell;
	                }
	            }
	
	            // fix nextId
	            if ((0, _commonUtils.isNumeric)(id)) {
	                that.nextId = Math.max(that.nextId, id);
	            }
	
	            cell.eachChild(that.cellAdded, that);
	        }
	    },
	
	    updateLinkParents: function updateLinkParents(cell, root) {
	
	        var that = this;
	
	        root = root || that.getRoot(cell);
	
	        // update links on children first
	        cell.eachChild(function (child) {
	            that.updateLinkParents(child, root);
	        });
	
	        // update the parents of all connected links
	        cell.eachLink(function (link) {
	            // update edge parent if edge and child have
	            // a common root node (does not need to be the
	            // model root node)
	            if (that.isAncestor(root, link)) {
	                that.updateLinkParent(link, root);
	            }
	        });
	    },
	
	    updateLinkParent: function updateLinkParent(link, root) {
	
	        var that = this;
	        var cell = null;
	        var source = link.getTerminal(true);
	        var target = link.getTerminal(false);
	
	        // use the first non-relative descendants of the source terminal
	        while (source && !source.isLink && source.geometry && source.geometry.relative) {
	            source = source.parent;
	        }
	
	        // use the first non-relative descendants of the target terminal
	        while (target && !target.isLink && target.geometry && target.geometry.relative) {
	            target = target.parent;
	        }
	
	        if (that.isAncestor(root, source) && that.isAncestor(root, target)) {
	
	            if (source === target) {
	                cell = source.parent;
	            } else {
	                cell = that.getNearestCommonAncestor(source, target);
	            }
	
	            if (cell && (cell.parent !== that.root || that.isAncestor(cell, link)) && link.parent !== cell) {
	
	                var geo = link.geometry;
	
	                if (geo) {
	                    var origin1 = that.getOrigin(link.parent);
	                    var origin2 = that.getOrigin(cell);
	
	                    var dx = origin2.x - origin1.x;
	                    var dy = origin2.y - origin1.y;
	
	                    geo = geo.clone();
	                    geo.translate(-dx, -dy);
	                    that.setGeometry(link, geo);
	                }
	
	                that.add(cell, link);
	            }
	        }
	    },
	
	    getNearestCommonAncestor: function getNearestCommonAncestor(cell1, cell2) {
	
	        if (cell1 && cell2) {
	
	            var route1 = cellRoute.create(cell1);
	            var route2 = cellRoute.create(cell2);
	
	            if (route1 && route2) {
	
	                var cell = cell1;
	                var route = route2;
	                var current = route1;
	
	                if (route1.length > route2.length) {
	                    cell = cell2;
	                    route = route1;
	                    current = route2;
	                }
	
	                while (cell) {
	                    var parent = cell.parent;
	
	                    // check if the cell path is equal to the beginning of the given cell path
	                    if (route.indexOf(current + cellRoute.separator) === 0 && parent) {
	                        return cell;
	                    }
	
	                    cell = parent;
	                    current = cellRoute.getParentRoute(current);
	                }
	            }
	        }
	
	        return null;
	    },
	
	    // get the absolute, accumulated origin for the children
	    // inside the given parent as an `Point`.
	    getOrigin: function getOrigin(cell) {
	
	        var that = this;
	        var result = null;
	
	        if (cell) {
	            result = that.getOrigin(cell.parent);
	
	            if (!cell.isLink) {
	                var geo = cell.geometry;
	
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
	
	    remove: function remove(cell) {
	
	        var that = this;
	
	        if (cell) {
	            if (cell === that.root) {
	                that.setRoot(null);
	            } else if (cell.parent) {
	                that.digest(new ChildChange(that, null, cell));
	            }
	        }
	
	        return cell;
	    },
	
	    cellRemoved: function cellRemoved(cell) {
	
	        var that = this;
	
	        if (cell) {
	
	            cell.eachChild(function (child) {
	                that.cellRemoved(child);
	            });
	
	            var id = cell.id;
	            var cells = that.cells;
	            if (cells && id) {
	                delete cells[id];
	            }
	        }
	    },
	
	    childChanged: function childChanged(cell, newParent, newIndex) {
	
	        var that = this;
	        var oldParent = cell.parent;
	
	        if (newParent) {
	            if (newParent !== oldParent || oldParent.getChildIndex(cell) !== newIndex) {
	                newParent.insertChild(cell, newIndex);
	            }
	        } else if (oldParent) {
	            oldParent.removeChild(cell);
	        }
	
	        // check if the previous parent was already in the
	        // model and avoids calling cellAdded if it was.
	        if (newParent && !that.contains(oldParent)) {
	            that.cellAdded(cell);
	        } else if (!newParent) {
	            that.cellRemoved(cell);
	        }
	
	        return oldParent;
	    },
	
	    linkChanged: function linkChanged(link, newNode, isSource) {
	        var oldNode = link.getNode(isSource);
	
	        if (newNode) {
	            newNode.insertLink(link, isSource);
	        } else if (oldNode) {
	            oldNode.removeLink(link, isSource);
	        }
	
	        return oldNode;
	    },
	
	    getChildNodes: function getChildNodes(parent) {
	        return this.getChildCells(parent, true, false);
	    },
	
	    getChildLinks: function getChildLinks(parent) {
	        return this.getChildCells(parent, false, true);
	    },
	
	    getChildCells: function getChildCells(parent, isNode, isLink) {
	        return parent ? parent.filterChild(function (child) {
	            return isNode && child.isNode || isLink && child.isLink;
	        }) : [];
	    },
	
	    // update
	    // ------
	
	    digest: function digest(change) {
	
	        var that = this;
	
	        change.digest();
	
	        that.beginUpdate();
	        that.changes.add(change);
	        that.endUpdate();
	
	        return that;
	    },
	
	    beginUpdate: function beginUpdate() {
	
	        var that = this;
	
	        that.updateLevel += 1;
	        that.trigger('beginUpdate');
	
	        if (that.updateLevel === 1) {
	            that.trigger('startEdit');
	        }
	    },
	
	    endUpdate: function endUpdate() {
	
	        var that = this;
	
	        that.updateLevel -= 1;
	
	        if (that.updateLevel === 0) {
	            that.trigger('endEdit');
	        }
	
	        if (!that.endingUpdate) {
	
	            var changeCollection = that.changes;
	
	            that.endingUpdate = that.updateLevel === 0;
	            that.trigger('endUpdate', changeCollection.changes);
	
	            // 触发重绘
	            if (that.endingUpdate && changeCollection.hasChange()) {
	                changeCollection.notify().clear();
	            }
	
	            that.endingUpdate = false;
	        }
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var splitter = /\s+/;
	
	function triggerEvents(callbacks, args, context) {
	    var result = true;
	
	    for (var i = 0, l = callbacks.length; i < l; i += 2) {
	        result = (0, _commonUtils.invoke)(callbacks[i], args, callbacks[i + 1] || context) && result;
	    }
	
	    return result;
	}
	
	exports['default'] = _commonClass2['default'].create({
	
	    constructor: function Events() {},
	
	    on: function on(events, callback, context) {
	        var that = this;
	
	        if (!callback) {
	            return that;
	        }
	
	        var listeners = that.__events || (that.__events = {});
	
	        events = events.split(splitter);
	
	        (0, _commonUtils.forEach)(events, function (event) {
	            var list = listeners[event] || (listeners[event] = []);
	            list.push(callback, context);
	        });
	
	        return that;
	    },
	
	    once: function once(events, callback, context) {
	
	        var that = this;
	        var cb = function cb() {
	            that.off(events, cb);
	            callback.apply(context || that, arguments);
	        };
	
	        return that.on(events, cb, context);
	    },
	
	    off: function off(events, callback, context) {
	
	        var that = this;
	        var listeners = that.__events;
	
	        // No events.
	        if (!listeners) {
	            return that;
	        }
	
	        // removing *all* events.
	        if (!(events || callback || context)) {
	            delete that.__events;
	            return that;
	        }
	
	        events = events ? events.split(splitter) : (0, _commonUtils.keys)(listeners);
	
	        (0, _commonUtils.forEach)(events, function (event) {
	
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
	                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
	                    list.splice(i, 2);
	                }
	            }
	        });
	
	        return that;
	    },
	
	    trigger: function trigger(eventName) {
	
	        var that = this;
	        var listeners = that.__events;
	
	        // No events.
	        if (!listeners || !eventName) {
	            return null;
	        }
	
	        var args = [];
	        for (var i = 1, l = arguments.length; i < l; i++) {
	            args[i - 1] = arguments[i];
	        }
	
	        var result = true;
	        var commonCallbacks = listeners['*'];
	
	        (0, _commonUtils.forEach)(eventName.split(splitter), function (event) {
	
	            var callbacks;
	
	            if (event !== '*') {
	                callbacks = listeners[event];
	                if (callbacks) {
	                    triggerEvents(callbacks, args, that);
	                }
	            }
	
	            if (commonCallbacks) {
	                triggerEvents(commonCallbacks, [event].concat(args), that);
	            }
	        });
	
	        return result;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _commonEvents = __webpack_require__(13);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var _commonVector = __webpack_require__(17);
	
	var _commonVector2 = _interopRequireDefault(_commonVector);
	
	var _viewsLinkView = __webpack_require__(22);
	
	var _viewsLinkView2 = _interopRequireDefault(_viewsLinkView);
	
	var _viewsNodeView = __webpack_require__(23);
	
	var _viewsNodeView2 = _interopRequireDefault(_viewsNodeView);
	
	var _Graph = __webpack_require__(12);
	
	var _Graph2 = _interopRequireDefault(_Graph);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _commonEvents2['default'],
	
	    options: {
	        x: 0,
	        y: 0,
	        width: '100%',
	        height: '100%',
	        gridSize: 1,
	        viewportClassName: 'pane-viewport',
	        linkClassName: '',
	        nodeClassName: '',
	        getCellClassName: function getCellClassName(cell) {},
	        getCellView: function getCellView(cell) {}
	    },
	
	    // events
	    //  - paper:configure
	    //  - paper:init
	    //  - paper:setup
	    //  - paper:destroy
	    //  - paper:resize
	
	    constructor: function Paper(container, graph, options) {
	
	        var that = this;
	
	        that.graph = graph || new _Graph2['default']();
	
	        that.configure(options);
	
	        if (container) {
	            that.init(container).setup().resize().translate();
	        }
	    },
	
	    configure: function configure(options) {
	
	        var that = this;
	
	        that.trigger('paper:configure', options);
	
	        return that;
	    },
	
	    // lift cycle
	    // ----------
	
	    init: function init(container) {
	
	        // create svg
	
	        var that = this;
	
	        if (container) {
	
	            var svg = (0, _commonVector2['default'])('svg');
	            var root = (0, _commonVector2['default'])('g');
	            var drawPane = (0, _commonVector2['default'])('g');
	
	            root.append(drawPane);
	            svg.append(root);
	            container.appendChild(svg.node);
	
	            that.container = container;
	            that.svg = svg.node;
	            that.root = root.node;
	            that.drawPane = drawPane.node;
	
	            that.trigger('paper:init', container);
	        }
	
	        return that;
	    },
	
	    setup: function setup() {
	
	        // install event listeners.
	
	        var that = this;
	
	        that.graph.on('change', that.processChanges, that);
	
	        that.trigger('paper:setup');
	
	        return that;
	    },
	
	    remove: function remove() {},
	
	    destroy: function destroy() {
	        var that = this;
	
	        that.trigger('paper:destroy');
	
	        return that;
	    },
	
	    revalidate: function revalidate() {
	        return this.invalidate().validate();
	    },
	
	    clear: function clear(cell) {
	        var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	        var recurse = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	        var that = this;
	        var model = that.graph.model;
	
	        cell = cell || model.getRoot();
	
	        that.removeState(cell);
	
	        if (recurse && (force || cell !== that.currentRoot)) {
	            cell.eachChild(function (child) {
	                that.clear(child, force, recurse);
	            });
	        } else {
	            that.invalidate(cell, true, true);
	        }
	
	        return that;
	    },
	
	    invalidate: function invalidate(cell) {
	        var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	        var includeLink = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	        var that = this;
	        var graph = that.graph;
	
	        cell = cell || graph.getRoot();
	
	        var view = that.getCellView(cell);
	
	        if (view) {
	            view.invalid = true;
	        }
	
	        if (!cell.invalidating) {
	
	            cell.invalidating = true;
	
	            if (recurse) {
	                cell.eachChild(function (child) {
	                    that.invalidate(child, recurse, includeLink);
	                });
	            }
	
	            if (includeLink) {
	                cell.eachLink(function (link) {
	                    that.invalidate(link, recurse, includeLink);
	                });
	            }
	
	            cell.invalidating = false;
	        }
	
	        return that;
	    },
	
	    validate: function validate(cell) {
	
	        var that = this;
	
	        cell = cell || that.graph.getRoot();
	
	        that.validateCell(cell).validateCellView(cell);
	
	        return that;
	    },
	
	    validateCell: function validateCell(cell) {
	        var visible = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	        // create or remove view for cell
	
	        var that = this;
	
	        if (!cell) {
	            return cell;
	        }
	
	        visible = visible && cell.isVisible();
	
	        var view = that.getCellView(cell, visible);
	
	        if (view && !visible) {
	            // remove the cell view, or wo can just hide it?
	            that.removeCellView(cell);
	        }
	
	        cell.eachChild(function (child) {
	            that.validateCell(child, visible);
	        });
	
	        return that;
	    },
	
	    validateCellView: function validateCellView(cell) {
	        var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	        var that = this;
	        var view = that.getCellView(cell);
	
	        if (view) {
	            if (view.invalid) {
	                view.invalid = false;
	
	                // render
	            }
	        }
	
	        if (recurse) {
	            cell.eachChild(function (child) {
	                that.validateCellView(child, recurse);
	            });
	        }
	
	        var state = that.getState(cell);
	
	        if (state) {
	            if (state.invalid) {
	                state.invalid = false;
	
	                if (cell !== that.currentRoot) {
	                    that.validateCellState(cell.parent, false);
	                }
	
	                if (cell.isLink) {
	                    var sourceNode = that.getVisibleTerminal(cell, true);
	                    var targetNode = that.getVisibleTerminal(cell, false);
	                    var sourceState = that.validateCellState(sourceNode, false);
	                    var targetState = that.validateCellState(targetNode, false);
	                    state.setVisibleTerminalState(sourceState, true);
	                    state.setVisibleTerminalState(targetState, false);
	                }
	
	                that.updateCellState(state);
	
	                if (cell !== that.currentRoot) {
	                    that.renderer.redraw(state, false, that.rendering);
	                }
	            }
	
	            if (recurse) {
	                // update `state.cellBounds` and `state.paintBounds`
	                state.updateCachedBounds();
	
	                // update order in DOM if recursively traversing
	                if (state.shape) {
	                    // TODO: stateValidated
	                    //that.stateValidated(state);
	                }
	
	                cell.eachChild(function (child) {
	                    that.validateCellState(child, true);
	                });
	            }
	        }
	
	        return state;
	    },
	
	    // transform
	    // ---------
	
	    resize: function resize(width, height) {
	
	        var that = this;
	        var options = that.options;
	
	        width = options.width = width || options.width;
	        height = options.height = height || options.height;
	
	        (0, _commonVector2['default'])(that.svg).attr({ width: width, height: height });
	
	        that.trigger('paper:resize', width, height);
	
	        return that;
	    },
	
	    translate: function translate(x, y, absolute) {
	
	        var that = this;
	        var options = that.options;
	
	        x = options.x = x || options.x;
	        y = options.y = y || options.y;
	
	        (0, _commonVector2['default'])(that.root).translate(x, y, absolute);
	
	        that.trigger('paper:translate', x, y);
	
	        return that;
	    },
	
	    translateTo: function translateTo(x, y) {
	        return this.translate(x, y, true);
	    },
	
	    scale: function scale(sx, sy) {
	        var ox = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var oy = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	    },
	
	    rotate: function rotate(deg) {
	        var ox = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var oy = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    },
	
	    // view
	    // ----
	
	    getCellView: function getCellView(cell, create) {
	
	        var that = this;
	        var views = that.views;
	
	        if (cell) {
	            var view = views ? views[cell.id] : null;
	
	            if (!view && create && cell.visible) {
	                view = that.createCellView(cell);
	            }
	
	            return view;
	        }
	    },
	
	    createCellView: function createCellView(cell) {
	
	        var that = this;
	        var options = that.options;
	
	        // get view constructor from options.
	        var ViewClass = options.getCellView.call(that, cell);
	
	        // get default view constructor.
	        if (!ViewClass) {
	            ViewClass = cell.isLink() ? _viewsLinkView2['default'] : cell.isNode() ? _viewsNodeView2['default'] : null;
	        }
	
	        if (ViewClass) {
	
	            var view = new ViewClass(cell);
	            var views = that.views;
	
	            if (!views) {
	                views = that.views = {};
	            }
	
	            views[cell.id] = view;
	
	            return view;
	        }
	    },
	
	    removeCellView: function removeCellView(cell) {},
	
	    renderCellView: function renderCellView(cell) {},
	
	    // changes
	    // -------
	
	    processChanges: function processChanges(changes) {
	
	        var that = this;
	
	        console.log(changes);
	
	        (0, _commonUtils.forEach)(changes, function (change) {
	            that.distributeChange(change);
	        });
	
	        return that;
	    },
	
	    distributeChange: function distributeChange(change) {
	
	        var that = this;
	
	        if (change instanceof RootChange) {
	            that.onRootChanged(change);
	        } else if (change instanceof ChildChange) {
	            that.onChildChanged(change);
	        }
	    },
	
	    onRootChanged: function onRootChanged(rootChange) {},
	
	    onChildChanged: function onChildChanged(childChange) {},
	
	    // event handlers
	    // --------------
	
	    onPointerDown: function onPointerDown(e) {},
	
	    onPointerMove: function onPointerMove(e) {},
	
	    onPointerUp: function onPointerUp(e) {}
	});
	module.exports = exports['default'];

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.VElement = VElement;
	
	var _commonUtils = __webpack_require__(2);
	
	var rclass = /[\t\r\n\f]/g;
	var rnotwhite = /\S+/g;
	
	function VElement(elem) {
	
	    if (elem instanceof VElement) {
	        elem = elem.node;
	    }
	
	    this.node = elem;
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
	
	    if ((0, _commonUtils.isObject)(elem)) {
	        return vectorize(elem);
	    }
	
	    if (elem.toLowerCase() === 'svg') {
	        return vectorize((0, _commonUtils.createSvgDocument)());
	    } else if (elem[0] === '<') {
	        var svgDoc = (0, _commonUtils.createSvgDocument)(elem);
	        if (svgDoc.childNodes.length > 1) {
	            return (0, _commonUtils.map)(svgDoc.childNodes, function (childNode) {
	                return vectorize(document.importNode(childNode, true));
	            });
	        }
	
	        return vectorize(document.importNode(svgDoc.firstChild, true));
	    }
	
	    // create svg node by tagName.
	    elem = (0, _commonUtils.createSvgElement)(elem);
	
	    // set attributes.
	    attrs && (0, _commonUtils.forIn)(attrs, function (attr, value) {
	        (0, _commonUtils.setAttribute)(elem, attr, value);
	    });
	
	    // append children.
	    if (children) {
	        children = (0, _commonUtils.isArray)(children) ? children : [children];
	
	        (0, _commonUtils.forEach)(children, function (child) {
	            elem.appendChild(child instanceof VElement ? child.node : child);
	        });
	    }
	
	    return vectorize(elem);
	}
	
	VElement.prototype = {
	
	    constructor: VElement,
	
	    attr: function attr(name, value) {
	
	        var that = this;
	        var node = that.node;
	        var length = arguments.length;
	
	        // Return all attributes.
	        if (!length) {
	            var attrs = {};
	            (0, _commonUtils.forEach)(node.attributes, function (attr) {
	                attrs[attr.nodeName] = attr.nodeValue;
	            });
	            return attrs;
	        }
	
	        if (length === 1) {
	            if ((0, _commonUtils.isObject)(name)) {
	                (0, _commonUtils.forIn)(name, function (attrValue, attrName) {
	                    (0, _commonUtils.setAttribute)(node, attrName, attrValue);
	                });
	            } else {
	                return node.getAttribute(name);
	            }
	        } else {
	            (0, _commonUtils.setAttribute)(node, name, value);
	        }
	
	        return that;
	    },
	
	    text: function text() {},
	
	    hasClass: function hasClass(selector) {
	
	        var that = this;
	        var node = that.node;
	        var className = ' ' + selector + ' ';
	
	        if (node.nodeType === 1) {
	            return (' ' + (0, _commonUtils.getClassName)(node) + ' ').replace(rclass, ' ').indexOf(className) > -1;
	        }
	        return false;
	    },
	
	    addClass: function addClass(value) {
	
	        var that = this;
	        var node = that.node;
	
	        if ((0, _commonUtils.isFunction)(value)) {
	            return that.addClass(value.call(node, (0, _commonUtils.getClassName)(node)));
	        }
	
	        if (value && (0, _commonUtils.isString)(value) && node.nodeType === 1) {
	
	            var classes = value.match(rnotwhite) || [];
	            var oldValue = (' ' + (0, _commonUtils.getClassName)(node) + ' ').replace(rclass, ' ');
	            var newValue = (0, _commonUtils.reduce)(classes, function (ret, cls) {
	                if (ret.indexOf(' ' + cls + ' ') < 0) {
	                    ret += cls + ' ';
	                }
	                return ret;
	            }, oldValue);
	
	            newValue = (0, _commonUtils.trim)(newValue);
	            if (oldValue !== newValue) {
	                node.setAttribute('class', newValue);
	            }
	        }
	
	        return that;
	    },
	
	    removeClass: function removeClass(value) {
	
	        var that = this;
	        var node = that.node;
	
	        if ((0, _commonUtils.isFunction)(value)) {
	            return that.removeClass(value.call(node, (0, _commonUtils.getClassName)(node)));
	        }
	
	        if ((!value || (0, _commonUtils.isString)(value)) && node.nodeType === 1) {
	
	            var classes = (value || '').match(rnotwhite) || [];
	            var oldValue = (' ' + (0, _commonUtils.getClassName)(node) + ' ').replace(rclass, ' ');
	            var newValue = (0, _commonUtils.reduce)(classes, function (ret, cls) {
	                if (ret.indexOf(' ' + cls + ' ') > -1) {
	                    ret = ret.replace(' ' + cls + ' ', ' ');
	                }
	                return ret;
	            }, oldValue);
	
	            newValue = value ? (0, _commonUtils.trim)(newValue) : '';
	            if (oldValue !== newValue) {
	                node.setAttribute('class', newValue);
	            }
	        }
	
	        return that;
	    },
	
	    toggleClass: function toggleClass(value, stateVal) {
	
	        var that = this;
	        var node = that.node;
	
	        if ((0, _commonUtils.isBoolean)(stateVal) && (0, _commonUtils.isString)(value)) {
	            return stateVal ? that.addClass(value) : that.removeClass(value);
	        }
	
	        if ((0, _commonUtils.isFunction)(value)) {
	            return that.toggleClass(value.call(node, (0, _commonUtils.getClassName)(node), stateVal), stateVal);
	        }
	
	        if (value && (0, _commonUtils.isString)(value)) {
	            var classes = value.match(rnotwhite) || [];
	            (0, _commonUtils.forEach)(classes, function (cls) {
	                that.hasClass(cls) ? that.removeClass(cls) : that.addClass(cls);
	            });
	        }
	
	        return that;
	    },
	
	    remove: function remove() {
	
	        var that = this;
	        var node = that.node;
	
	        if (node && node.parentNode) {
	            node.parentNode.removeChild(node);
	        }
	
	        return that;
	    },
	
	    append: function append(elem) {
	
	        var that = this;
	
	        elem && (0, _commonUtils.forEach)((0, _commonUtils.toArray)(elem), function (item) {
	            that.node.appendChild(normalize(item));
	        });
	
	        return that;
	    },
	
	    prepend: function prepend(elem) {
	
	        var that = this;
	        var node = that.node;
	
	        elem && node.insertBefore(normalize(elem), node.firstChild);
	
	        return that;
	    },
	
	    appendTo: function appendTo(elem) {
	        //elem.appendChild(this.node);
	        //return this;
	    },
	
	    prependTo: function prependTo(elem) {},
	
	    before: function before(elem) {},
	
	    after: function after(elem) {},
	
	    getSVGElement: function getSVGElement() {
	        var that = this;
	        var node = that.node;
	
	        return node instanceof window.SVGSVGElement ? that : vectorize(node.ownerSVGElement);
	    },
	
	    getDefs: function getDefs() {
	        var defs = this.svg().node.getElementsByTagName('defs');
	        return defs && defs.length ? vectorize(defs[0]) : null;
	    },
	
	    clone: function clone() {
	        var node = this.node;
	
	        var cloned = vectorize(node.cloneNode(true));
	
	        if (node.id) {
	            cloned.node.removeAttribute('id');
	        }
	        return cloned;
	    },
	
	    find: function find(selector) {
	        return (0, _commonUtils.map)(this.node.querySelectorAll(selector), vectorize);
	    },
	
	    findOne: function findOne(selector) {
	        var found = this.node.querySelector(selector);
	        return found ? vectorize(found) : null;
	    },
	
	    findParent: function findParent(className, terminator) {
	
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
	
	    index: function index() {
	
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
	
	    translate: function translate(tx, ty, relative) {
	
	        var that = this;
	        var transformAttr = that.attr('transform') || '';
	        var translate = (0, _commonUtils.parseTranslate)(transformAttr);
	
	        if (!arguments.length) {
	            return translate;
	        }
	
	        transformAttr = (0, _commonUtils.trim)(transformAttr.replace(/translate\([^\)]*\)/g, ''));
	
	        var dx = relative ? translate.tx + tx : tx;
	        var dy = relative ? translate.ty + ty : ty;
	
	        var newTranslate = 'translate(' + dx + ',' + dy + ')';
	
	        return that.attr('transform', newTranslate + ' ' + transformAttr);
	    },
	
	    rotate: function rotate(angle, cx, cy, relative) {
	
	        var transformAttr = that.attr('transform') || '';
	        var rotate = (0, _commonUtils.parseRotate)(transformAttr);
	
	        if (!arguments.length) {
	            return rotate;
	        }
	
	        transformAttr = (0, _commonUtils.trim)(transformAttr.replace(/rotate\([^\)]*\)/g, ''));
	
	        angle %= 360;
	
	        var newAngle = relative ? rotate.angle + angle : angle;
	        var newOrigin = (0, _commonUtils.isUndefined)(cx) || (0, _commonUtils.isUndefined)(cy) ? '' : ',' + cx + ',' + cy;
	        var newRotate = 'rotate(' + newAngle + newOrigin + ')';
	
	        return this.attr('transform', transformAttr + ' ' + newRotate);
	    },
	
	    scale: function scale(sx, sy, relative) {
	
	        var transformAttr = this.attr('transform') || '';
	        var scale = (0, _commonUtils.parseScale)(transformAttr);
	        var length = arguments.length;
	
	        if (!length) {
	            return scale;
	        }
	
	        transformAttr = (0, _commonUtils.trim)(transformAttr.replace(/scale\([^\)]*\)/g, ''));
	
	        if (length === 1) {
	            sy = sx;
	        } else if (length === 2) {
	            if ((0, _commonUtils.isBoolean)(sy)) {
	                relative = sy;
	                sy = sx;
	            }
	        }
	
	        sx = relative ? scale.sx * sx : sx;
	        sy = relative ? scale.sy * sy : sy;
	
	        var newScale = 'scale(' + sx + ',' + sy + ')';
	
	        return this.attr('transform', transformAttr + ' ' + newScale);
	    },
	
	    bbox: function bbox(withoutTransformations, target) {
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
	
	    toLocalPoint: function toLocalPoint(x, y) {
	        // Convert global point into the coordinate space of this element.
	
	    },
	
	    translateCenterToPoint: function translateCenterToPoint() {},
	
	    translateAndAutoOrient: function translateAndAutoOrient() {},
	
	    animateAlongPath: function animateAlongPath() {},
	
	    sample: function sample(interval) {
	
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
	            samples.push({ x: sample.x, y: sample.y, distance: distance });
	            distance += interval;
	        }
	
	        return samples;
	    },
	
	    toPath: function toPath() {
	
	        var that = this;
	        var path = vectorize((0, _commonUtils.createSvgElement)('path'));
	        var d = that.toPathData();
	
	        path.attr(that.attr());
	
	        d && path.attr('d', d);
	
	        return path;
	    },
	
	    toPathData: function toPathData() {
	
	        var that = this;
	        var node = that.node;
	        var tagName = node.tagName.toUpperCase();
	
	        switch (tagName) {
	            case 'PATH':
	                return that.attr('d');
	            case 'LINE':
	                return (0, _commonUtils.lineToPathData)(node);
	            case 'POLYGON':
	                return (0, _commonUtils.polygonToPathData)(node);
	            case 'POLYLINE':
	                return (0, _commonUtils.polylineToPathData)(node);
	            case 'ELLIPSE':
	                return (0, _commonUtils.ellipseToPathData)(node);
	            case 'CIRCLE':
	                return (0, _commonUtils.circleToPathData)(node);
	            case 'RECT':
	                return (0, _commonUtils.rectToPathData)(node);
	        }
	
	        throw new Error(tagName + ' cannot be converted to PATH.');
	    },
	
	    findIntersection: function findIntersection(ref, target) {
	
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
	
	            var gRect = g.rect(parseFloat(this.attr('x') || 0), parseFloat(this.attr('y') || 0), parseFloat(this.attr('width')), parseFloat(this.attr('height')));
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
	        } else if (tagName === 'PATH' || tagName === 'POLYGON' || tagName === 'POLYLINE' || tagName === 'CIRCLE' || tagName === 'ELLIPSE') {
	
	            var pathNode = tagName === 'PATH' ? that : that.toPath();
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
	
	// vector
	// ------
	
	var vector = VElement.createElement = createElement;
	
	vector.isVElement = function (obj) {
	    return obj instanceof VElement;
	};
	
	// exports
	// -------
	
	exports['default'] = vector;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	exports['default'] = _commonClass2['default'].create({
	    constructor: function ChangeCollection(graph) {
	
	        var that = this;
	        that.graph = graph;
	    },
	
	    hasChange: function hasChange() {
	        var changes = this.changes;
	        return changes && changes.length;
	    },
	
	    add: function add(change) {
	
	        var that = this;
	        var changes = that.changes;
	
	        if (change) {
	            if (!changes) {
	                changes = that.changes = [];
	            }
	
	            changes.push(change);
	        }
	
	        return change;
	    },
	
	    clear: function clear() {
	        this.changes = null;
	        return this;
	    },
	
	    notify: function notify() {
	
	        var that = this;
	
	        that.graph.trigger('change', that.changes);
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _commonEvents = __webpack_require__(13);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	exports['default'] = _commonClass2['default'].create({
	
	    constructor: function Cell(options) {
	
	        var that = this;
	    },
	
	    isVisible: function isVisible() {
	        return true;
	    },
	
	    isNode: function isNode() {
	        return false;
	    },
	
	    isLink: function isLink() {
	        return false;
	    },
	
	    // link
	    // ----
	
	    getTerminal: function getTerminal(isSource) {
	        return isSource ? this.source : this.target;
	    },
	
	    setTerminal: function setTerminal(node, isSource) {
	        if (isSource) {
	            this.source = node;
	        } else {
	            this.target = node;
	        }
	
	        return node;
	    },
	
	    removeFromTerminal: function removeFromTerminal(isSource) {
	
	        // remove link from node
	
	        var that = this;
	
	        var node = that.getTerminal(isSource);
	
	        if (node) {
	            node.removeLink(that, isSource);
	        }
	
	        return that;
	    },
	
	    // children
	    // --------
	
	    getChildCount: function getChildCount() {
	        var children = this.children;
	        return children ? children.length : 0;
	    },
	
	    getChildIndex: function getChildIndex(child) {
	        return (0, _commonUtils.indexOf)(this.children || [], child);
	    },
	
	    getChildAt: function getChildAt(index) {
	        var children = this.children;
	        return children ? children[index] : null;
	    },
	
	    eachChild: function eachChild(iterator, context) {
	
	        var that = this;
	        var children = that.children;
	
	        children && (0, _commonUtils.forEach)(children, iterator, context);
	
	        return that;
	    },
	
	    filterChild: function filterChild(iterator, context) {
	        var children = this.children;
	        return children ? (0, _commonUtils.filter)(children, iterator, context) : [];
	    },
	
	    insertChild: function insertChild(child, index) {
	        var that = this;
	
	        if (child) {
	
	            // fix index
	            if ((0, _commonUtils.isNullOrUndefined)(index)) {
	                index = that.getChildCount();
	
	                if (child.parent === that) {
	                    index--;
	                }
	            }
	
	            child.removeFromParent();
	            child.parent = that;
	
	            var children = that.children;
	
	            if (children) {
	                children.splice(index, 0, child);
	            } else {
	                children = that.children = [];
	                children.push(child);
	            }
	        }
	
	        return that;
	    },
	
	    removeChild: function removeChild(child) {
	        return this.removeChildAt(this.getChildIndex(child));
	    },
	
	    removeChildAt: function removeChildAt(index) {
	        var that = this;
	        var child = null;
	        var children = that.children;
	
	        if (children && index >= 0) {
	            child = that.getChildAt(index);
	
	            if (child) {
	                children.splice(index, 1);
	                child.parent = null;
	            }
	        }
	
	        return child;
	    },
	
	    // node
	    // -----
	
	    getLinkCount: function getLinkCount() {
	        var links = this.links;
	        return links ? links.length : 0;
	    },
	
	    getLinkIndex: function getLinkIndex(link) {
	        return (0, _commonUtils.indexOf)(this.links || [], link);
	    },
	
	    getLinkAt: function getLinkAt(index) {
	        var links = this.links;
	        return links ? links[index] : null;
	    },
	
	    eachLink: function eachLink(iterator, context) {
	
	        var that = this;
	        var links = that.links;
	
	        links && (0, _commonUtils.forEach)(links, iterator, context);
	
	        return that;
	    },
	
	    filterLink: function filterLink(iterator, context) {
	        var links = this.links;
	        return links ? (0, _commonUtils.filter)(links, iterator, context) : [];
	    },
	
	    insertLink: function insertLink(link, outgoing) {
	
	        var that = this;
	
	        if (link) {
	            link.removeFromTerminal(outgoing);
	            link.setTerminal(that, outgoing);
	
	            var links = that.links;
	
	            // 连线的起点和终点是同一个节点时，说明连线已经和节点关联，则不需要添加
	            if (!links || that.getLinkIndex(link) < 0 || link.getTerminal(!outgoing) !== that) {
	
	                if (!links) {
	                    links = that.links = [];
	                }
	
	                links.push(link);
	            }
	        }
	
	        return link;
	    },
	
	    removeLink: function removeLink(link, outgoing) {
	
	        var that = this;
	        var links = that.links;
	
	        if (link) {
	
	            // 连线的起点和终点是同一个节点时不需要移除
	            if (links && link.getTerminal(!outgoing) !== that) {
	                var index = that.getLinkIndex(link);
	
	                if (index >= 0) {
	                    links.splice(index, 1);
	                }
	            }
	
	            link.setTerminal(null, outgoing);
	        }
	
	        return link;
	    },
	
	    // parent
	    // ------
	
	    getParent: function getParent() {
	        return this.parent;
	    },
	
	    removeFromParent: function removeFromParent() {
	
	        var that = this;
	        var parent = that.parent;
	
	        if (parent) {
	            parent.removeChild(that);
	        }
	
	        return that;
	    },
	
	    // common
	    // ------
	
	    valueOf: function valueOf() {},
	
	    toString: function toString() {},
	
	    clone: function clone() {},
	
	    destroy: function destroy() {}
	});
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Change = __webpack_require__(21);
	
	var _Change2 = _interopRequireDefault(_Change);
	
	exports['default'] = _Change2['default'].extend({
	
	    constructor: function RootChange(graph, root) {
	
	        var that = this;
	
	        that.graph = graph;
	        that.root = root;
	        that.previous = root;
	    },
	
	    digest: function digest() {
	
	        var that = this;
	        var graph = that.graph;
	        var previous = that.previous;
	
	        that.root = previous;
	        that.previous = graph.rootChanged(previous);
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	exports['default'] = _commonClass2['default'].create({
	
	    constructor: function Change() {},
	
	    digest: function digest() {
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane-0.0.1.js.map