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
	    utils: __webpack_require__(1),
	    Graph: __webpack_require__(11),
	    Model: __webpack_require__(44),
	    View: __webpack_require__(29)
	};
	
	module.exports = pane;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	var _utilsLang = __webpack_require__(2);
	
	_defaults(exports, _interopExportWildcard(_utilsLang, _defaults));
	
	var _utilsString = __webpack_require__(3);
	
	_defaults(exports, _interopExportWildcard(_utilsString, _defaults));
	
	var _utilsNumber = __webpack_require__(4);
	
	_defaults(exports, _interopExportWildcard(_utilsNumber, _defaults));
	
	var _utilsObject = __webpack_require__(5);
	
	_defaults(exports, _interopExportWildcard(_utilsObject, _defaults));
	
	var _utilsArray = __webpack_require__(6);
	
	_defaults(exports, _interopExportWildcard(_utilsArray, _defaults));
	
	var _utilsFunction = __webpack_require__(7);
	
	_defaults(exports, _interopExportWildcard(_utilsFunction, _defaults));
	
	var _utilsBow = __webpack_require__(8);
	
	_defaults(exports, _interopExportWildcard(_utilsBow, _defaults));
	
	var _utilsGeom = __webpack_require__(10);
	
	_defaults(exports, _interopExportWildcard(_utilsGeom, _defaults));

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var toString = Object.prototype.toString;
	
	function isNull(obj) {
	    return obj === null;
	}
	
	function isUndefined(obj) {
	    return typeof obj === 'undefined';
	}
	
	function isNullOrUndefined(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	
	function isType(obj, type) {
	    return toString.call(obj) === '[object ' + type + ']';
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
	
	    return length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
	}
	
	function isNumeric(obj) {
	    return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
	}
	
	exports.isNull = isNull;
	exports.isUndefined = isUndefined;
	exports.isNullOrUndefined = isNullOrUndefined;
	exports.isType = isType;
	exports.isObject = isObject;
	exports.isFunction = isFunction;
	exports.isWindow = isWindow;
	exports.isArray = isArray;
	exports.isArrayLike = isArrayLike;
	exports.isNumeric = isNumeric;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function toString(str) {
	    return '' + str;
	}
	
	function lcFirst(str) {
	    str = str + '';
	    return str.charAt(0).toLowerCase() + str.substr(1);
	}
	
	function ucFirst(str) {
	    str = str + '';
	    return str.charAt(0).toUpperCase() + str.substr(1);
	}
	
	function ltrim(str, chars) {
	    chars = chars || '\\s';
	
	    return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
	}
	
	function rtrim(str, chars) {
	    chars = chars || '\\s';
	
	    return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
	}
	
	function trim(str, chars) {
	    return ltrim(rtrim(str, chars), chars);
	}
	
	exports.toString = toString;
	exports.lcFirst = lcFirst;
	exports.ucFirst = ucFirst;
	exports.ltrim = ltrim;
	exports.rtrim = rtrim;
	exports.trim = trim;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function toFixed(value, precision) {
	    var power = Math.pow(10, precision);
	    return (Math.round(value * power) / power).toFixed(precision);
	}
	
	function toFloat(value) {
	    return parseFloat(value);
	}
	
	function mod(n, m) {
	    return (n % m + m) % m;
	}
	
	exports.toFixed = toFixed;
	exports.toFloat = toFloat;
	exports.mod = mod;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(2);
	
	var _array = __webpack_require__(6);
	
	var hasOwn = Object.prototype.hasOwnProperty;
	
	var hasKey = exports.hasKey = function hasKey(obj, key) {
	    return obj !== null && hasOwn.call(obj, key);
	};
	
	var keys = exports.keys = Object.keys || function (obj) {
	    // ie < 9 不考虑
	
	    var keys = [];
	
	    if ((0, _lang.isObject)(obj)) {
	        for (var key in obj) {
	            if (hasKey(obj, key)) {
	                keys.push(key);
	            }
	        }
	    }
	
	    return keys;
	};
	
	function forIn(list, iterator, context, deep) {
	    for (var key in list) {
	        if (deep || hasKey(list, key)) {
	            iterator.call(context, list[key], key, list);
	        }
	    }
	}
	
	function clone(obj, transients, shallow) {
	    shallow = !!shallow;
	
	    var cloned = null;
	
	    if (obj && (0, _lang.isFunction)(obj.constructor)) {
	        cloned = new obj.constructor();
	
	        for (var key in obj) {
	            if (key !== mxObjectIdentity.fieldName && (!transients || (0, _array.indexOf)(transients, key) < 0)) {
	                if (!shallow && typeof obj[key] === 'object') {
	                    cloned[key] = clone(obj[key]);
	                } else {
	                    cloned[key] = obj[key];
	                }
	            }
	        }
	    }
	
	    return cloned;
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
	
	function getValue(obj, key, defaultValue) {
	    var value = obj[key];
	
	    if ((0, _lang.isUndefined)(value)) {
	        value = defaultValue;
	    }
	
	    return value;
	}
	
	function getNumber(obj, key, defaultValue) {
	    var value = obj ? obj[key] : null;
	
	    if ((0, _lang.isUndefined)(value)) {
	        value = defaultValue || 0;
	    }
	
	    return Number(value);
	}
	
	exports.hasKey = hasKey;
	exports.keys = keys;
	exports.forIn = forIn;
	exports.clone = clone;
	exports.extend = extend;
	exports.getValue = getValue;
	exports.getNumber = getNumber;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(2);
	
	var arrProto = Array.prototype;
	var slice = arrProto.slice;
	
	function toArray(obj) {
	    return (0, _lang.isArray)(obj) ? obj : (0, _lang.isArrayLike)(obj) ? slice.call(obj) : [];
	}
	
	var indexOf = arrProto.indexOf ? function (arr, item) {
	    return arr.indexOf(item);
	} : function (arr, item) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        if (arr[i] === item) {
	            return i;
	        }
	    }
	    return -1;
	};
	
	var lastIndexOf = arrProto.lastIndexOf ? function (arr, item) {
	    return arr.lastIndexOf(item);
	} : function (arr, item) {
	    for (var i = arr.length - 1; i >= 0; i--) {
	        if (arr[i] === item) {
	            return i;
	        }
	    }
	    return -1;
	};
	
	var each = arrProto.forEach ? function (arr, iterator, context) {
	    arr.forEach(iterator, context);
	} : function (arr, iterator, context) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	        iterator.call(context, arr[i], i, arr);
	    }
	};
	
	var map = arrProto.map ? function (arr, iterator, context) {
	    return arr.map(iterator, context);
	} : function (arr, iterator, context) {
	    var res = [];
	    each(arr, function (value, index) {
	        res.push(iterator.call(context, value, index, arr));
	    });
	    return res;
	};
	
	var filter = arrProto.filter ? function (arr, iterator, context) {
	    return arr.filter(iterator, context);
	} : function (arr, iterator, context) {
	    var res = [];
	    each(arr, function (value, index) {
	        if (iterator.call(context, value, index, arr)) {
	            res.push(value);
	        }
	    });
	    return res;
	};
	
	var some = arrProto.some ? function (arr, iterator, context) {
	    return arr.some(iterator, context);
	} : function (arr, iterator, context) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	        if (iterator.call(context, arr[i], i, arr)) {
	            return true;
	        }
	    }
	    return false;
	};
	
	var every = arrProto.every ? function (arr, iterator, context) {
	    return arr.every(iterator, context);
	} : function (arr, iterator, context) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	        if (!iterator.call(context, arr[i], i, arr)) {
	            return false;
	        }
	    }
	    return true;
	};
	
	//var reduce = arrProto.reduce ?
	//    function (arr, iterator, context) {
	//
	//    } :
	//    function (arr, iterator, context) {
	//
	//    };
	//
	//var reduceRight = arrProto.reduceRight ?
	//    function (arr, iterator, context) {
	//
	//
	//    } :
	//    function (arr, iterator, context) {
	//
	//    };
	
	exports.toArray = toArray;
	exports.indexOf = indexOf;
	exports.lastIndexOf = lastIndexOf;
	exports.each = each;
	exports.map = map;
	exports.filter = filter;
	exports.some = some;
	exports.every = every;
	
	//reduce,
	//reduceRight

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(2);
	
	function invoke(method, args, context) {
	    if (!method || !(0, _lang.isFunction)(method)) {
	        return;
	    }
	
	    args = (0, _lang.isArray)(args) ? args : args ? [args] : [];
	
	    var ret;
	    var a1 = args[0];
	    var a2 = args[1];
	    var a3 = args[2];
	
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
	}
	
	function getFunctionName(fn) {
	    var str = fn && fn.name || '';
	
	    if (!str && fn) {
	        var tmp = fn.toString();
	        var idx1 = 9;
	
	        while (tmp.charAt(idx1) === ' ') {
	            idx1++;
	        }
	
	        var idx2 = tmp.indexOf('(', idx1);
	        str = tmp.substring(idx1, idx2);
	    }
	
	    return str;
	}
	
	exports.invoke = invoke;
	exports.getFunctionName = getFunctionName;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonDetector = __webpack_require__(9);
	
	var _commonDetector2 = _interopRequireDefault(_commonDetector);
	
	var _lang = __webpack_require__(2);
	
	var NS_SVG = 'http://www.w3.org/2000/svg';
	
	function getBaseUrl() {
	    var href = window.location.href;
	    var hash = href.lastIndexOf('#');
	
	    if (hash > 0) {
	        href = href.substring(0, hash);
	    }
	
	    return href;
	}
	
	function isNode(node, nodeName, attributeName, attributeValue) {
	    var ret = node && !isNaN(node.nodeType);
	
	    if (ret) {
	        ret = (0, _lang.isNullOrUndefined)(nodeName) || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	    }
	
	    if (ret) {
	        ret = (0, _lang.isNullOrUndefined)(attributeName) || node.getAttribute(attributeName) === attributeValue;
	    }
	
	    return ret;
	}
	
	function getCurrentStyle(node) {
	    return node.currentStyle || window.getComputedStyle(node, null);
	}
	
	var setPrefixedStyle = (function () {
	    var prefix = null;
	
	    if (_commonDetector2['default'].IS_OP && _commonDetector2['default'].IS_OT) {
	        prefix = 'O';
	    } else if (_commonDetector2['default'].IS_SF || _commonDetector2['default'].IS_GC) {
	        prefix = 'Webkit';
	    } else if (_commonDetector2['default'].IS_MT) {
	        prefix = 'Moz';
	    } else if (_commonDetector2['default'].IS_IE && document.documentMode >= 9 && document.documentMode < 10) {
	        prefix = 'ms';
	    }
	
	    return function (style, name, value) {
	        style[name] = value;
	
	        if (prefix && name.length > 0) {
	            name = prefix + name.substring(0, 1).toUpperCase() + name.substring(1);
	            style[name] = value;
	        }
	    };
	})();
	
	function createSvgElement(tagName, ownerDocument, namespace) {
	
	    var doc = ownerDocument || document;
	    var ele = null;
	
	    if (tagName) {
	        if (doc.createElementNS) {
	            ele = doc.createElementNS(namespace || NS_SVG, tagName);
	        } else {
	            ele = doc.createElement(tagName);
	            namespace && ele.setAttribute('xmlns', namespace);
	        }
	    }
	
	    return ele;
	}
	
	function write(parent, text) {
	    var doc = parent.ownerDocument;
	    var node = doc.createTextNode(text);
	
	    if (parent) {
	        parent.appendChild(node);
	    }
	
	    return node;
	}
	
	exports.getBaseUrl = getBaseUrl;
	exports.isNode = isNode;
	exports.getCurrentStyle = getCurrentStyle;
	exports.createSvgElement = createSvgElement;
	exports.setPrefixedStyle = setPrefixedStyle;
	exports.write = write;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var ua = navigator.userAgent;
	var av = navigator.appVersion;
	
	module.exports = {
	    // IE
	    IS_IE: ua.indexOf('MSIE') >= 0,
	
	    IS_IE11: !!ua.match(/Trident\/7\./),
	
	    // Netscape
	    IS_NS: ua.indexOf('Mozilla/') >= 0 && ua.indexOf('MSIE') < 0,
	
	    // Firefox
	    IS_FF: ua.indexOf('Firefox/') >= 0,
	
	    // Chrome
	    IS_GC: ua.indexOf('Chrome/') >= 0,
	
	    // Safari
	    IS_SF: ua.indexOf('AppleWebKit/') >= 0 && ua.indexOf('Chrome/') < 0,
	
	    // Opera
	    IS_OP: ua.indexOf('Opera/') >= 0,
	
	    // True if -o-transform is available as a CSS style. This is the case
	    // for Opera browsers that use Presto/2.5 and later.
	    IS_OT: ua.indexOf('Presto/2.4.') < 0 && ua.indexOf('Presto/2.3.') < 0 && ua.indexOf('Presto/2.2.') < 0 && ua.indexOf('Presto/2.1.') < 0 && ua.indexOf('Presto/2.0.') < 0 && ua.indexOf('Presto/1.') < 0,
	
	    // True if -moz-transform is available as a CSS style. This is the case
	    // for all Firefox-based browsers newer than or equal 3, such as Camino,
	    // Iceweasel, Seamonkey and Iceape.
	    IS_MT: ua.indexOf('Firefox/') >= 0 && ua.indexOf('Firefox/1.') < 0 && ua.indexOf('Firefox/2.') < 0 || ua.indexOf('Iceweasel/') >= 0 && ua.indexOf('Iceweasel/1.') < 0 && ua.indexOf('Iceweasel/2.') < 0 || ua.indexOf('SeaMonkey/') >= 0 && ua.indexOf('SeaMonkey/1.') < 0 || ua.indexOf('Iceape/') >= 0 && ua.indexOf('Iceape/1.') < 0,
	
	    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),
	
	    IS_WIN: av.indexOf('Win') > 0,
	
	    IS_MAC: av.indexOf('Mac') > 0,
	
	    IS_TOUCH: 'ontouchstart' in document.documentElement,
	
	    IS_POINTER: window.navigator.msPointerEnabled || false
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _number = __webpack_require__(4);
	
	function toRadians(deg) {
	    return Math.PI * deg / 180;
	}
	
	function roundPoint(point) {
	    point.x = Math.round(point.x);
	    point.y = Math.round(point.y);
	    return point;
	}
	
	function rotatePoint(point, deg, center, rounded) {
	    var rad = toRadians(deg);
	    var cos = Math.cos(rad);
	    var sin = Math.sin(rad);
	
	    return rotatePointEx(point, cos, sin, center, rounded);
	}
	
	function rotatePointEx(point, cos, sin, center, rounded) {
	    var centerX = center ? center.x : 0;
	    var centerY = center ? center.y : 0;
	    var dx = point.x - centerX;
	    var dy = point.y - centerY;
	
	    var x1 = dx * cos - dy * sin;
	    var y1 = dy * cos + dx * sin;
	
	    point.x = x1 + centerX;
	    point.y = y1 + centerY;
	
	    return rounded ? roundPoint(point) : point;
	}
	
	function translatePoint(point, dx, dy) {
	    point.x = (0, _number.toFloat)(point.x) + dx;
	    point.y = (0, _number.toFloat)(point.y) + dy;
	    return point;
	}
	
	function scalePoint(point, sx, sy) {
	    point.x = (0, _number.toFloat)(point.x) * sx;
	    point.y = (0, _number.toFloat)(point.y) * sy;
	    return point;
	}
	
	function isEqualEntity(o1, o2) {
	    return !o1 && !o2 || o1 && o1.equals(o2);
	}
	
	function isEqualEntities(arr1, arr2) {
	    if (!arr1 && arr2 || !arr2 && arr1 || !arr1 && !arr2 && arr1.length != arr2.length) {
	        return false;
	    } else if (arr1 && arr2) {
	        for (var i = 0, l = arr1.length; i < l; i++) {
	            if (!isEqualEntity(arr1[i], arr2[i])) {
	                return false;
	            }
	        }
	    }
	
	    return true;
	}
	
	function getAlignments(align, valign) {
	    var dx = 0;
	    var dy = 0;
	
	    // Horizontal alignment
	    if (align === 'center') {
	        dx = -0.5;
	    } else if (align === 'right') {
	        dx = -1;
	    }
	
	    // Vertical alignment
	    if (valign === 'middle') {
	        dy = -0.5;
	    } else if (valign === 'bottom') {
	        dy = -1;
	    }
	
	    return {
	        x: dx,
	        y: dy
	    };
	}
	
	exports.toRadians = toRadians;
	exports.roundPoint = roundPoint;
	exports.scalePoint = scalePoint;
	exports.rotatePoint = rotatePoint;
	exports.rotatePointEx = rotatePointEx;
	exports.translatePoint = translatePoint;
	exports.isEqualEntity = isEqualEntity;
	exports.isEqualEntities = isEqualEntities;
	exports.getAlignments = getAlignments;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonClass = __webpack_require__(12);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _eventsEventSource = __webpack_require__(13);
	
	var _eventsEventSource2 = _interopRequireDefault(_eventsEventSource);
	
	var _stylesStylesheet = __webpack_require__(16);
	
	var _stylesStylesheet2 = _interopRequireDefault(_stylesStylesheet);
	
	var _enumsStyleNames = __webpack_require__(18);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _cellCell = __webpack_require__(26);
	
	var _cellCell2 = _interopRequireDefault(_cellCell);
	
	var _cellGeometry = __webpack_require__(27);
	
	var _cellGeometry2 = _interopRequireDefault(_cellGeometry);
	
	var _View = __webpack_require__(29);
	
	var _View2 = _interopRequireDefault(_View);
	
	var _Model = __webpack_require__(44);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _changesRootChange = __webpack_require__(47);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	var _changesChildChange = __webpack_require__(49);
	
	var _changesChildChange2 = _interopRequireDefault(_changesChildChange);
	
	var _changesTerminalChange = __webpack_require__(54);
	
	var _changesTerminalChange2 = _interopRequireDefault(_changesTerminalChange);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _eventsEventSource2['default'],
	
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
	    pageFormat: null, // constants.PAGE_FORMAT_A4_PORTRAIT;
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
	    //swimlaneIndicatorColorAttribute: constants.STYLE_FILLCOLOR,
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
	
	        var that = this;
	
	        that.model = model || new _Model2['default']();
	        that.view = new _View2['default'](that);
	        that.stylesheet = stylesheet || new _stylesStylesheet2['default']();
	
	        that.model.on('change', function (evt) {
	            that.onModelChanged(evt.getData('changes'));
	        });
	
	        if (container) {
	            that.init(container);
	        }
	
	        that.view.revalidate();
	    },
	
	    init: function init(container) {
	
	        var that = this;
	
	        that.container = container;
	        that.view.init();
	
	        return that;
	    },
	
	    getModel: function getModel() {
	        return this.model;
	    },
	
	    getView: function getView() {
	        return this.view;
	    },
	
	    getSelectionCellsForChanges: function getSelectionCellsForChanges() {},
	
	    onModelChanged: function onModelChanged(changes) {
	
	        console.log(changes);
	
	        var that = this;
	
	        (0, _commonUtils.each)(changes, function (change) {
	            that.processChange(change);
	        });
	
	        that.removeSelectionCells(that.getRemovedCellsForChanges(changes));
	
	        that.view.validate();
	        that.sizeDidChange();
	    },
	
	    processChange: function processChange(change) {
	
	        var that = this;
	
	        if (change instanceof _changesRootChange2['default']) {
	            that.processRootChange(change);
	        } else if (change instanceof _changesChildChange2['default']) {
	            that.processChildChange(change);
	        } else if (change instanceof _changesTerminalChange2['default'] || change instanceof GeometryChange) {
	            if (change instanceof _changesTerminalChange2['default'] || (change.previous == null && change.geometry != null || change.previous != null && !change.previous.equals(change.geometry))) {
	                this.view.invalidate(change.cell);
	            }
	        }
	    },
	
	    processRootChange: function processRootChange(change) {
	
	        var that = this;
	
	        that.clearSelection();
	        that.removeStateForCell(change.previous);
	
	        if (that.resetViewOnRootChange) {
	            that.view.scale = 1;
	            that.view.translate.x = 0;
	            that.view.translate.y = 0;
	        }
	
	        return that;
	    },
	
	    processChildChange: function processChildChange(change) {
	
	        var that = this;
	        var view = that.view;
	        var child = change.child;
	        var newParent = change.parent;
	        var oldParent = change.previous;
	
	        view.invalidate(child, true, true);
	
	        if (!newParent || newParent.collapsed) {
	            that.removeStateForCell(child);
	
	            if (view.currentRoot === child) {
	                that.home();
	            }
	        }
	
	        if (newParent !== oldParent) {
	            newParent && view.invalidate(newParent, false, false);
	            oldParent && view.invalidate(oldParent, false, false);
	        }
	
	        return that;
	    },
	
	    getRemovedCellsForChanges: function getRemovedCellsForChanges() {},
	
	    removeStateForCell: function removeStateForCell(cell) {
	        var childCount = this.model.getChildCount(cell);
	
	        for (var i = 0; i < childCount; i++) {
	            this.removeStateForCell(this.model.getChildAt(cell, i));
	        }
	
	        this.view.invalidate(cell, false, true);
	        this.view.removeState(cell);
	    },
	
	    // Overlays
	    // ---------
	    addCellOverlay: function addCellOverlay(cell, overlay) {},
	    getCellOverlays: function getCellOverlays(cell) {
	        return cell.overlays;
	    },
	    removeCellOverlay: function removeCellOverlay(cell, overlay) {},
	    removeCellOverlays: function removeCellOverlays(cell) {},
	    clearCellOverlays: function clearCellOverlays(cell) {},
	    setCellWarning: function setCellWarning() {},
	
	    // In-place editing
	    // ----------------
	    startEditing: function startEditing(evt) {},
	    startEditingAtCell: function startEditingAtCell(cell, evt) {},
	    getEditingValue: function getEditingValue(cell, evt) {},
	    stopEditing: function stopEditing(cancel) {},
	    labelChanged: function labelChanged(cell, value, evt) {},
	    cellLabelChanged: function cellLabelChanged(cell, value, autoSize) {},
	
	    // Event processing
	    // ----------------
	    escape: function escape(evt) {},
	    click: function click(me) {},
	    dblClick: function dblClick(evt, cell) {},
	    tapAndHold: function tapAndHold(me) {},
	
	    scrollPointToVisible: function scrollPointToVisible(x, y, extend, border) {},
	    createPanningManager: function createPanningManager() {},
	    getBorderSizes: function getBorderSizes() {},
	    getPreferredPageSize: function getPreferredPageSize(bounds, width, height) {},
	    sizeDidChange: function sizeDidChange() {
	
	        var that = this;
	
	        return;
	
	        var bounds = that.view.graphBounds;
	
	        if (that.container) {
	            var border = this.getBorder();
	
	            var width = Math.max(0, bounds.x + bounds.width + 1 + border);
	            var height = Math.max(0, bounds.y + bounds.height + 1 + border);
	
	            if (this.minimumContainerSize) {
	                width = Math.max(width, this.minimumContainerSize.width);
	                height = Math.max(height, this.minimumContainerSize.height);
	            }
	
	            if (this.resizeContainer) {
	                this.doResizeContainer(width, height);
	            }
	
	            //if (this.preferPageSize || (!mxClient.IS_IE && this.pageVisible)) {
	            if (this.preferPageSize || this.pageVisible) {
	                var size = this.getPreferredPageSize(bounds, width, height);
	
	                if (size != null) {
	                    width = size.width;
	                    height = size.height;
	                }
	            }
	
	            if (this.minimumGraphSize) {
	                width = Math.max(width, this.minimumGraphSize.width * this.view.scale);
	                height = Math.max(height, this.minimumGraphSize.height * this.view.scale);
	            }
	
	            width = Math.ceil(width - 1);
	            height = Math.ceil(height - 1);
	
	            //if (this.dialect == mxConstants.DIALECT_SVG) {
	            var root = this.view.getDrawPane().ownerSVGElement;
	
	            root.style.minWidth = Math.max(1, width) + 'px';
	            root.style.minHeight = Math.max(1, height) + 'px';
	            root.style.width = '100%';
	            root.style.height = '100%';
	            //}
	            //else {
	            //    if (mxClient.IS_QUIRKS) {
	            // Quirks mode has no minWidth/minHeight support
	            //this.view.updateHtmlCanvasSize(Math.max(1, width), Math.max(1, height));
	            //}
	            //else {
	            //    this.view.canvas.style.minWidth = Math.max(1, width) + 'px';
	            //    this.view.canvas.style.minHeight = Math.max(1, height) + 'px';
	            //}
	            //}
	
	            return;
	
	            //this.updatePageBreaks(this.pageBreaksVisible, width - 1, height - 1);
	        }
	
	        //this.fireEvent(new mxEventObject(mxEvent.SIZE, 'bounds', bounds));
	    },
	    doResizeContainer: function doResizeContainer(width, height) {
	        // Fixes container size for different box models
	        //if (mxClient.IS_IE) {
	        //    if (mxClient.IS_QUIRKS) {
	        //        var borders = this.getBorderSizes();
	        //
	        //        // max(2, ...) required for native IE8 in quirks mode
	        //        width += Math.max(2, borders.x + borders.width + 1);
	        //        height += Math.max(2, borders.y + borders.height + 1);
	        //    }
	        //    else if (document.documentMode >= 9) {
	        //        width += 3;
	        //        height += 5;
	        //    }
	        //    else {
	        //        width += 1;
	        //        height += 1;
	        //    }
	        //}
	        //else {
	        height += 1;
	        //}
	
	        if (this.maximumContainerSize != null) {
	            width = Math.min(this.maximumContainerSize.width, width);
	            height = Math.min(this.maximumContainerSize.height, height);
	        }
	
	        this.container.style.width = Math.ceil(width) + 'px';
	        this.container.style.height = Math.ceil(height) + 'px';
	    },
	    updatePageBreaks: function updatePageBreaks(visible, width, height) {
	        var scale = this.view.scale;
	        var tr = this.view.translate;
	        var fmt = this.pageFormat;
	        var ps = scale * this.pageScale;
	        var bounds = new Rectangle(scale * tr.x, scale * tr.y, fmt.width * ps, fmt.height * ps);
	
	        // Does not show page breaks if the scale is too small
	        visible = visible && Math.min(bounds.width, bounds.height) > this.minPageBreakDist;
	
	        // Draws page breaks independent of translate. To ignore
	        // the translate set bounds.x/y = 0. Note that modulo
	        // in JavaScript has a bug, so use mxUtils instead.
	        bounds.x = utils.mod(bounds.x, bounds.width);
	        bounds.y = utils.mod(bounds.y, bounds.height);
	
	        var horizontalCount = visible ? Math.ceil((width - bounds.x) / bounds.width) : 0;
	        var verticalCount = visible ? Math.ceil((height - bounds.y) / bounds.height) : 0;
	        var right = width;
	        var bottom = height;
	
	        if (this.horizontalPageBreaks == null && horizontalCount > 0) {
	            this.horizontalPageBreaks = [];
	        }
	
	        if (this.horizontalPageBreaks != null) {
	            for (var i = 0; i <= horizontalCount; i++) {
	                var pts = [new mxPoint(bounds.x + i * bounds.width, 1), new mxPoint(bounds.x + i * bounds.width, bottom)];
	
	                if (this.horizontalPageBreaks[i] != null) {
	                    this.horizontalPageBreaks[i].points = pts;
	                    this.horizontalPageBreaks[i].redraw();
	                } else {
	                    var pageBreak = new mxPolyline(pts, this.pageBreakColor);
	                    pageBreak.dialect = this.dialect;
	                    pageBreak.pointerEvents = false;
	                    pageBreak.isDashed = this.pageBreakDashed;
	                    pageBreak.init(this.view.backgroundPane);
	                    pageBreak.redraw();
	
	                    this.horizontalPageBreaks[i] = pageBreak;
	                }
	            }
	
	            for (var i = horizontalCount; i < this.horizontalPageBreaks.length; i++) {
	                this.horizontalPageBreaks[i].destroy();
	            }
	
	            this.horizontalPageBreaks.splice(horizontalCount, this.horizontalPageBreaks.length - horizontalCount);
	        }
	
	        if (this.verticalPageBreaks == null && verticalCount > 0) {
	            this.verticalPageBreaks = [];
	        }
	
	        if (this.verticalPageBreaks != null) {
	            for (var i = 0; i <= verticalCount; i++) {
	                var pts = [new Point(1, bounds.y + i * bounds.height), new Point(right, bounds.y + i * bounds.height)];
	
	                if (this.verticalPageBreaks[i] != null) {
	                    this.verticalPageBreaks[i].points = pts;
	                    this.verticalPageBreaks[i].redraw();
	                } else {
	                    var pageBreak = new mxPolyline(pts, this.pageBreakColor);
	                    pageBreak.dialect = this.dialect;
	                    pageBreak.pointerEvents = false;
	                    pageBreak.isDashed = this.pageBreakDashed;
	                    pageBreak.init(this.view.backgroundPane);
	                    pageBreak.redraw();
	
	                    this.verticalPageBreaks[i] = pageBreak;
	                }
	            }
	
	            for (var i = verticalCount; i < this.verticalPageBreaks.length; i++) {
	                this.verticalPageBreaks[i].destroy();
	            }
	
	            this.verticalPageBreaks.splice(verticalCount, this.verticalPageBreaks.length - verticalCount);
	        }
	    },
	
	    // Cell styles
	    // -----------
	    getCellStyle: function getCellStyle(cell) {
	        return this.processCellStyle(cell, cell.style);
	    },
	    processCellStyle: function processCellStyle(cell, style) {
	        var that = this;
	        var defaultStyle = cell.isLink ? that.stylesheet.getDefaultLinkStyle() : cell.isNode ? that.stylesheet.getDefaultNodeStyle() : null;
	
	        return (0, _commonUtils.extend)({}, defaultStyle, style);
	    },
	    setCellStyle: function setCellStyle(style, cells) {
	        cells = cells || this.getSelectionCells();
	
	        if (cells) {
	            this.model.beginUpdate();
	            try {
	                for (var i = 0; i < cells.length; i++) {
	                    this.model.setStyle(cells[i], style);
	                }
	            } finally {
	                this.model.endUpdate();
	            }
	        }
	    },
	    setCellStyles: function setCellStyles(key, value, cells) {
	        cells = cells || this.getSelectionCells();
	        utils.setCellStyles(this.model, cells, key, value);
	    },
	    toggleCellStyle: function toggleCellStyle(key, defaultValue, cell) {},
	    toggleCellStyles: function toggleCellStyles(key, defaultValue, cells) {},
	    toggleCellStyleFlags: function toggleCellStyleFlags(key, flag, cells) {},
	    setCellStyleFlags: function setCellStyleFlags(key, flag, value, cells) {},
	
	    // Cell alignment and orientation
	    // ------------------------------
	    alignCells: function alignCells(align, cells, param) {},
	    flipEdge: function flipEdge(edge) {},
	    addImageBundle: function addImageBundle(bundle) {},
	    removeImageBundle: function removeImageBundle(bundle) {},
	    getImageFromBundles: function getImageFromBundles(key) {},
	
	    // Order
	    // -----
	    orderCells: function orderCells(back, cells) {},
	    cellsOrdered: function cellsOrdered(cells, back) {},
	
	    // Grouping
	    // --------
	    groupCells: function groupCells(group, border, cells) {},
	    getCellsForGroup: function getCellsForGroup(cells) {},
	    getBoundsForGroup: function getBoundsForGroup(group, children, border) {},
	    createGroupCell: function createGroupCell(cells) {},
	    ungroupCells: function ungroupCells(cells) {},
	    removeCellsFromParent: function removeCellsFromParent(cells) {},
	    updateGroupBounds: function updateGroupBounds(cells, border, moveGroup, topBorder, rightBorder, bottomBorder, leftBorder) {},
	
	    // Cell cloning, insertion and removal
	    // -----------------------------------
	    cloneCells: function cloneCells(cells, allowInvalidEdges) {},
	
	    insertNode: function insertNode(parent, id, value, x, y, width, height, style, relative) {
	        var node = this.createNode(id, value, x, y, width, height, style, relative);
	        return this.addNode(node, parent);
	    },
	
	    createNode: function createNode(id, value, x, y, width, height, style, relative) {
	        var geometry = new _cellGeometry2['default'](x, y, width, height, relative);
	        var node = new _cellCell2['default'](id, value, geometry, style);
	
	        node.isNode = true;
	        node.connectable = true;
	
	        return node;
	    },
	
	    addNode: function addNode(node, parent, index) {
	        return this.addCell(node, parent, index);
	    },
	
	    insertLink: function insertLink(parent, id, value, source, target, style) {
	        var link = this.createLink(parent, id, value, source, target, style);
	        return this.addLink(link, parent, source, target);
	    },
	
	    createLink: function createLink(parent, id, value, source, target, style) {
	
	        var geometry = new _cellGeometry2['default'](0, 0, 0, 0, true);
	        var link = new _cellCell2['default'](id, value, geometry, style);
	
	        link.isLink = true;
	
	        return link;
	    },
	
	    addLink: function addLink(link, parent, source, target, index) {
	        return this.addCell(link, parent, index, source, target);
	    },
	
	    addCell: function addCell(cell, parent, index, source, target) {
	        return this.addCells([cell], parent, index, source, target)[0];
	    },
	
	    addCells: function addCells(cells, parent, index, source, target) {
	
	        var that = this;
	        var model = that.model;
	
	        parent = parent || that.getDefaultParent();
	        index = (0, _commonUtils.isNullOrUndefined)(index) ? parent.getChildCount() : index;
	
	        model.beginUpdate();
	        that.cellsAdded(cells, parent, index, source, target, false, true);
	        model.endUpdate();
	
	        return cells;
	    },
	
	    cellsAdded: function cellsAdded(cells, parent, index, source, target, absolute, constrain) {
	
	        var that = this;
	        var model = that.model;
	
	        if (cells && parent && !(0, _commonUtils.isNullOrUndefined)(index)) {
	            model.beginUpdate();
	
	            var parentState = absolute ? this.view.getState(parent) : null;
	            var parentOrigin = parentState ? parentState.origin : null;
	
	            (0, _commonUtils.each)(cells, function (cell, i) {
	
	                if (!cell) {
	                    index -= 1;
	                    return;
	                }
	
	                var previous = cell.parent;
	
	                // TODO: Keeps the cell at its absolute location
	                if (parentOrigin && cell !== parent && previous !== parent) {}
	
	                // TODO: Decrements all following indices if cell is already in parent
	                if (previous === parent && index + i > parent.getChildCount()) {}
	
	                that.model.add(parent, cell, index + i);
	
	                if (that.autoSizeCellsOnAdd) {
	                    that.autoSizeCell(cell, true);
	                }
	
	                // TODO: Extends the parent or constrains the child
	                //if (this.isExtendParentsOnAdd() && this.isExtendParent(cells[i])) {
	                //    this.extendParent(cells[i]);
	                //}
	
	                // TODO: Additionally constrains the child after extending the parent
	                if (constrain) {}
	                //this.constrainChild(cells[i]);
	
	                // Sets the source terminal
	                if (source) {
	                    that.cellConnected(cells[i], source, true);
	                }
	
	                // Sets the target terminal
	                if (target) {
	                    that.cellConnected(cells[i], target, false);
	                }
	            });
	
	            model.endUpdate();
	        }
	    },
	
	    autoSizeCell: function autoSizeCell(cell, recurse) {},
	    removeCells: function removeCells(cells, includeEdges) {},
	    cellsRemoved: function cellsRemoved(cells) {},
	    splitEdge: function splitEdge(edge, cells, newEdge, dx, dy) {},
	
	    // Cell visibility
	    // ---------------
	    toggleCells: function toggleCells(show, cells, includeEdges) {},
	    cellsToggled: function cellsToggled(cells, show) {},
	
	    // Folding
	    // -------
	    foldCells: function foldCells() {},
	    cellsFolded: function cellsFolded() {},
	    swapBounds: function swapBounds() {},
	    updateAlternateBounds: function updateAlternateBounds() {},
	    addAllEdges: function addAllEdges() {},
	    getAllEdges: function getAllEdges() {},
	
	    // Cell sizing
	    // -----------
	    updateCellSize: function updateCellSize() {},
	    cellSizeUpdated: function cellSizeUpdated() {},
	    getPreferredSizeForCell: function getPreferredSizeForCell() {},
	    resizeCell: function resizeCell() {},
	    resizeCells: function resizeCells() {},
	    cellsResized: function cellsResized() {},
	    cellResized: function cellResized() {},
	    resizeChildCells: function resizeChildCells() {},
	    constrainChildCells: function constrainChildCells() {},
	    scaleCell: function scaleCell() {},
	    extendParent: function extendParent() {},
	
	    // Cell moving
	    // -----------
	    importCells: function importCells() {},
	    moveCells: function moveCells() {},
	    cellsMoved: function cellsMoved() {},
	    translateCell: function translateCell() {},
	    getCellContainmentArea: function getCellContainmentArea() {},
	    getMaximumGraphBounds: function getMaximumGraphBounds() {},
	    constrainChild: function constrainChild() {},
	    resetEdges: function resetEdges() {},
	    resetEdge: function resetEdge(link) {
	
	        var geo = link.geometry;
	
	        // Resets the control points
	        if (geo && geo.points && geo.points.length > 0) {
	            geo = geo.clone();
	            geo.points = [];
	
	            link.geometry = geo;
	        }
	
	        return link;
	    },
	
	    // Cell connecting and connection constraints
	    // ------------------------------------------
	    getOutlineConstraint: function getOutlineConstraint() {},
	    getAllConnectionConstraints: function getAllConnectionConstraints() {},
	
	    getConnectionConstraint: function getConnectionConstraint(linkState, terminalState, isSource) {
	        var point = null;
	        var x = linkState.style[isSource ? constants.STYLE_EXIT_X : constants.STYLE_ENTRY_X];
	
	        if (x != null) {
	            var y = linkState.style[isSource ? constants.STYLE_EXIT_Y : constants.STYLE_ENTRY_Y];
	
	            if (y != null) {
	                point = new Point(parseFloat(x), parseFloat(y));
	            }
	        }
	
	        var perimeter = false;
	
	        if (point) {
	            perimeter = getValue(linkState.style, isSource ? constants.STYLE_EXIT_PERIMETER : constants.STYLE_ENTRY_PERIMETER, true);
	        }
	
	        return new ConnectionConstraint(point, perimeter);
	    },
	
	    setConnectionConstraint: function setConnectionConstraint(edge, terminal, source, constraint) {
	        if (constraint) {
	            this.model.beginUpdate();
	
	            try {
	                if (constraint == null || constraint.point == null) {
	                    this.setCellStyles(source ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X, null, [edge]);
	                    this.setCellStyles(source ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y, null, [edge]);
	                    this.setCellStyles(source ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, null, [edge]);
	                } else if (constraint.point != null) {
	                    this.setCellStyles(source ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X, constraint.point.x, [edge]);
	                    this.setCellStyles(source ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y, constraint.point.y, [edge]);
	
	                    // Only writes 0 since 1 is default
	                    if (!constraint.perimeter) {
	                        this.setCellStyles(source ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, '0', [edge]);
	                    } else {
	                        this.setCellStyles(source ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, null, [edge]);
	                    }
	                }
	            } finally {
	                this.model.endUpdate();
	            }
	        }
	    },
	
	    getConnectionPoint: function getConnectionPoint(vertex, constraint) {
	        var point = null;
	
	        if (vertex != null && constraint.point != null) {
	            var bounds = this.view.getPerimeterBounds(vertex);
	            var cx = new Point(bounds.getCenterX(), bounds.getCenterY());
	            var direction = vertex.style[constants.STYLE_DIRECTION];
	            var r1 = 0;
	
	            // Bounds need to be rotated by 90 degrees for further computation
	            if (direction != null) {
	                if (direction == mxConstants.DIRECTION_NORTH) {
	                    r1 += 270;
	                } else if (direction == mxConstants.DIRECTION_WEST) {
	                    r1 += 180;
	                } else if (direction == mxConstants.DIRECTION_SOUTH) {
	                    r1 += 90;
	                }
	
	                // Bounds need to be rotated by 90 degrees for further computation
	                if (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH) {
	                    bounds.rotate90();
	                }
	            }
	
	            if (constraint.point != null) {
	                var sx = 1;
	                var sy = 1;
	                var dx = 0;
	                var dy = 0;
	
	                // LATER: Add flipping support for image shapes
	                if (this.getModel().isVertex(vertex.cell)) {
	                    var flipH = vertex.style[mxConstants.STYLE_FLIPH];
	                    var flipV = vertex.style[mxConstants.STYLE_FLIPV];
	
	                    // Legacy support for stencilFlipH/V
	                    if (vertex.shape != null && vertex.shape.stencil != null) {
	                        flipH = mxUtils.getValue(vertex.style, 'stencilFlipH', 0) == 1 || flipH;
	                        flipV = mxUtils.getValue(vertex.style, 'stencilFlipV', 0) == 1 || flipV;
	                    }
	
	                    if (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH) {
	                        var tmp = flipH;
	                        flipH = flipV;
	                        flipV = tmp;
	                    }
	
	                    if (flipH) {
	                        sx = -1;
	                        dx = -bounds.width;
	                    }
	
	                    if (flipV) {
	                        sy = -1;
	                        dy = -bounds.height;
	                    }
	                }
	
	                point = new mxPoint(bounds.x + constraint.point.x * bounds.width * sx - dx, bounds.y + constraint.point.y * bounds.height * sy - dy);
	            }
	
	            // Rotation for direction before projection on perimeter
	            var r2 = vertex.style[mxConstants.STYLE_ROTATION] || 0;
	
	            if (constraint.perimeter) {
	                if (r1 != 0 && point != null) {
	                    // Only 90 degrees steps possible here so no trig needed
	                    var cos = 0;
	                    var sin = 0;
	
	                    if (r1 == 90) {
	                        sin = 1;
	                    } else if (r1 == 180) {
	                        cos = -1;
	                    } else if (r1 == 270) {
	                        sin = -1;
	                    }
	
	                    point = mxUtils.getRotatedPoint(point, cos, sin, cx);
	                }
	
	                if (point != null && constraint.perimeter) {
	                    point = this.view.getPerimeterPoint(vertex, point, false);
	                }
	            } else {
	                r2 += r1;
	            }
	
	            // Generic rotation after projection on perimeter
	            if (r2 != 0 && point != null) {
	                var rad = mxUtils.toRadians(r2);
	                var cos = Math.cos(rad);
	                var sin = Math.sin(rad);
	
	                point = mxUtils.getRotatedPoint(point, cos, sin, cx);
	            }
	        }
	
	        if (point != null) {
	            point.x = Math.round(point.x);
	            point.y = Math.round(point.y);
	        }
	
	        return point;
	    },
	
	    connectCell: function connectCell() {},
	
	    cellConnected: function cellConnected(link, node, isSource, constraint) {
	
	        if (link) {
	            this.model.beginUpdate();
	            try {
	                //var previous = this.model.getTerminal(link, isSource);
	
	                // Updates the constraint
	                // this.setConnectionConstraint(link, node, isSource, constraint);
	
	                // Checks if the new terminal is a port, uses the ID of the port in the
	                // style and the parent of the port as the actual terminal of the edge.
	                //if (this.isPortsEnabled()) {
	                //    var id = null;
	                //
	                //    if (this.isPort(node)) {
	                //        id = node.getId();
	                //        node = this.getTerminalForPort(node, isSource);
	                //    }
	                //
	                //    // Sets or resets all previous information for connecting to a child port
	                //    var key = isSource ? constants.STYLE_SOURCE_PORT : constants.STYLE_TARGET_PORT;
	                //    this.setCellStyles(key, id, [link]);
	                //}
	
	                this.model.setTerminal(link, node, isSource);
	
	                //link.setTerminal(node, isSource);
	
	                if (this.resetEdgesOnConnect) {
	                    this.resetEdge(link);
	                }
	
	                //this.fireEvent(new mxEventObject(mxEvent.CELL_CONNECTED,
	                //    'edge', edge, 'terminal', terminal, 'source', source,
	                //    'previous', previous));
	            } finally {
	                this.model.endUpdate();
	            }
	        }
	    },
	    disconnectGraph: function disconnectGraph() {},
	
	    // Drilldown
	    // ---------
	    getCurrentRoot: function getCurrentRoot() {
	        return this.view.currentRoot;
	    },
	    getTranslateForRoot: function getTranslateForRoot() {},
	    isPort: function isPort(cell) {
	        return false;
	    },
	    getTerminalForPort: function getTerminalForPort() {},
	    // 获取某个 cell 的 offset，用户可以直接覆盖这个实现
	    getChildOffsetForCell: function getChildOffsetForCell(cell) {
	        return null;
	    },
	    enterGroup: function enterGroup() {},
	    exitGroup: function exitGroup() {},
	    home: function home() {},
	    isValidRoot: function isValidRoot() {},
	
	    // Graph display
	    // -------------
	    getGraphBounds: function getGraphBounds() {
	        return this.view.getGraphBounds();
	    },
	    getCellBounds: function getCellBounds() {},
	    getBoundingBoxFromGeometry: function getBoundingBoxFromGeometry() {},
	    refresh: function refresh() {},
	    snap: function snap() {},
	    panGraph: function panGraph() {},
	    zoomIn: function zoomIn() {},
	    zoomOut: function zoomOut() {},
	    zoomActual: function zoomActual() {},
	    zoomTo: function zoomTo() {},
	    center: function center() {},
	    zoom: function zoom() {},
	    zoomToRect: function zoomToRect() {},
	    fit: function fit() {},
	    scrollCellToVisible: function scrollCellToVisible() {},
	    scrollRectToVisible: function scrollRectToVisible() {},
	    getCellGeometry: function getCellGeometry(cell) {
	        return this.model.getGeometry(cell);
	    },
	    isCellVisible: function isCellVisible(cell) {
	        return this.model.isVisible(cell);
	    },
	    isCellCollapsed: function isCellCollapsed(cell) {
	        return this.model.isCollapsed(cell);
	    },
	    isCellConnectable: function isCellConnectable() {},
	
	    isOrthogonal: function isOrthogonal(edge) {
	
	        return false;
	
	        var orthogonal = edge.style.orthogonal;
	
	        if (orthogonal) {
	            return orthogonal;
	        }
	
	        var tmp = this.view.getEdgeStyle(edge);
	
	        return tmp == edgeStyle.SegmentConnector || tmp == edgeStyle.ElbowConnector || tmp == edgeStyle.SideToSide || tmp == edgeStyle.TopToBottom || tmp == edgeStyle.EntityRelation || tmp == edgeStyle.OrthConnector;
	    },
	    isLoop: function isLoop() {},
	    isCloneEvent: function isCloneEvent() {},
	    isToggleEvent: function isToggleEvent() {},
	    isGridEnabledEvent: function isGridEnabledEvent() {},
	    isConstrainedEvent: function isConstrainedEvent() {},
	
	    // Validation
	    // ----------
	
	    validationAlert: function validationAlert() {},
	    isEdgeValid: function isEdgeValid() {},
	    getEdgeValidationError: function getEdgeValidationError() {},
	    validateEdge: function validateEdge() {},
	    validateGraph: function validateGraph() {},
	    getCellValidationError: function getCellValidationError() {},
	    validateCell: function validateCell() {},
	
	    // Graph appearance
	    // ----------------
	    getBackgroundImage: function getBackgroundImage() {},
	    setBackgroundImage: function setBackgroundImage() {},
	    getFoldingImage: function getFoldingImage() {},
	    convertValueToString: function convertValueToString(cell) {
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
	    getLabel: function getLabel(cell) {
	        var result = '';
	
	        if (this.labelsVisible && cell) {
	            var state = this.view.getState(cell);
	            var style = state ? state.style : this.getCellStyle(cell);
	
	            if (!utils.getValue(style, constants.STYLE_NOLABEL, false)) {
	                result = this.convertValueToString(cell);
	            }
	        }
	
	        return result;
	    },
	    getCellLabel: function getCellLabel(cell) {
	        return cell.value;
	    },
	    isHtmlLabel: function isHtmlLabel() {
	        return this.isHtmlLabels();
	    },
	    isHtmlLabels: function isHtmlLabels() {
	        return this.htmlLabels;
	    },
	    setHtmlLabels: function setHtmlLabels() {},
	    isWrapping: function isWrapping(cell) {
	        var state = this.view.getState(cell);
	        var style = state ? state.style : this.getCellStyle(cell);
	
	        return style ? style[constants.STYLE_WHITE_SPACE] == 'wrap' : false;
	    },
	    isLabelClipped: function isLabelClipped(cell) {
	        var state = this.view.getState(cell);
	        var style = state ? state.style : this.getCellStyle(cell);
	
	        return style ? style[constants.STYLE_OVERFLOW] == 'hidden' : false;
	    },
	    getTooltip: function getTooltip() {},
	    getTooltipForCell: function getTooltipForCell() {},
	    getCursorForMouseEvent: function getCursorForMouseEvent() {},
	    getCursorForCell: function getCursorForCell() {},
	    getStartSize: function getStartSize() {},
	    getImage: function getImage(state) {
	        return state && state.style ? state.style[constants.STYLE_IMAGE] : null;
	    },
	    getVerticalAlign: function getVerticalAlign(state) {
	        return state && state.style ? state.style[constants.STYLE_VERTICAL_ALIGN] || constants.ALIGN_MIDDLE : null;
	    },
	    getIndicatorColor: function getIndicatorColor(state) {
	        return state && state.style ? state.style[constants.STYLE_INDICATOR_COLOR] : null;
	    },
	    getIndicatorGradientColor: function getIndicatorGradientColor(state) {
	        return state && state.style ? state.style[constants.STYLE_INDICATOR_GRADIENTCOLOR] : null;
	    },
	    getIndicatorShape: function getIndicatorShape(state) {
	        var style = state && state.style;
	        return style ? style[_enumsStyleNames2['default'].INDICATOR_SHAPE] : null;
	    },
	    getIndicatorImage: function getIndicatorImage(state) {
	        return state && state.style ? state.style[constants.STYLE_INDICATOR_IMAGE] : null;
	    },
	    getBorder: function getBorder() {
	        return this.border;
	    },
	    setBorder: function setBorder() {},
	    isSwimlane: function isSwimlane() {},
	
	    // Graph behaviour
	    // ---------------
	    isResizeContainer: function isResizeContainer() {},
	    setResizeContainer: function setResizeContainer() {},
	    isEnabled: function isEnabled() {},
	    setEnabled: function setEnabled() {},
	    isEscapeEnabled: function isEscapeEnabled() {},
	    setEscapeEnabled: function setEscapeEnabled() {},
	    isInvokesStopCellEditing: function isInvokesStopCellEditing() {},
	    setInvokesStopCellEditing: function setInvokesStopCellEditing() {},
	    isEnterStopsCellEditing: function isEnterStopsCellEditing() {},
	    setEnterStopsCellEditing: function setEnterStopsCellEditing() {},
	    isCellLocked: function isCellLocked() {},
	    isCellsLocked: function isCellsLocked() {},
	    setCellsLocked: function setCellsLocked() {},
	    getCloneableCells: function getCloneableCells() {},
	    isCellCloneable: function isCellCloneable() {},
	    isCellsCloneable: function isCellsCloneable() {},
	    setCellsCloneable: function setCellsCloneable() {},
	    getExportableCells: function getExportableCells() {},
	    canExportCell: function canExportCell() {},
	    getImportableCells: function getImportableCells() {},
	    canImportCell: function canImportCell() {},
	    isCellSelectable: function isCellSelectable() {},
	    isCellsSelectable: function isCellsSelectable() {},
	    setCellsSelectable: function setCellsSelectable() {},
	    getDeletableCells: function getDeletableCells() {},
	    isCellDeletable: function isCellDeletable() {},
	    isCellsDeletable: function isCellsDeletable() {},
	    setCellsDeletable: function setCellsDeletable() {},
	    isLabelMovable: function isLabelMovable() {},
	    isCellRotatable: function isCellRotatable() {},
	    getMovableCells: function getMovableCells() {},
	    isCellMovable: function isCellMovable() {},
	    isCellsMovable: function isCellsMovable() {},
	    setCellsMovable: function setCellsMovable() {},
	    isGridEnabled: function isGridEnabled() {},
	    setGridEnabled: function setGridEnabled() {},
	    isPortsEnabled: function isPortsEnabled() {
	        return this.portsEnabled;
	    },
	    setPortsEnabled: function setPortsEnabled() {},
	    getGridSize: function getGridSize() {},
	    setGridSize: function setGridSize() {},
	    getTolerance: function getTolerance() {},
	    setTolerance: function setTolerance() {},
	    isVertexLabelsMovable: function isVertexLabelsMovable() {},
	    setVertexLabelsMovable: function setVertexLabelsMovable() {},
	    isEdgeLabelsMovable: function isEdgeLabelsMovable() {},
	    setEdgeLabelsMovable: function setEdgeLabelsMovable() {},
	    isSwimlaneNesting: function isSwimlaneNesting() {},
	    setSwimlaneNesting: function setSwimlaneNesting() {},
	    isSwimlaneSelectionEnabled: function isSwimlaneSelectionEnabled() {},
	    setSwimlaneSelectionEnabled: function setSwimlaneSelectionEnabled() {},
	    isMultigraph: function isMultigraph() {},
	    setMultigraph: function setMultigraph() {},
	    isAllowLoops: function isAllowLoops() {},
	    setAllowDanglingEdges: function setAllowDanglingEdges() {},
	    isAllowDanglingEdges: function isAllowDanglingEdges() {},
	    setConnectableEdges: function setConnectableEdges() {},
	    isConnectableEdges: function isConnectableEdges() {},
	    setCloneInvalidEdges: function setCloneInvalidEdges() {},
	    isCloneInvalidEdges: function isCloneInvalidEdges() {},
	    setAllowLoops: function setAllowLoops() {},
	    isDisconnectOnMove: function isDisconnectOnMove() {},
	    setDisconnectOnMove: function setDisconnectOnMove() {},
	    isDropEnabled: function isDropEnabled() {},
	    setDropEnabled: function setDropEnabled() {},
	    isSplitEnabled: function isSplitEnabled() {},
	    setSplitEnabled: function setSplitEnabled() {},
	    isCellResizable: function isCellResizable() {},
	    isCellsResizable: function isCellsResizable() {},
	    setCellsResizable: function setCellsResizable() {},
	    isTerminalPointMovable: function isTerminalPointMovable() {},
	    isCellBendable: function isCellBendable() {},
	    isCellsBendable: function isCellsBendable() {},
	    setCellsBendable: function setCellsBendable() {},
	    isCellEditable: function isCellEditable() {},
	    isCellsEditable: function isCellsEditable() {},
	    setCellsEditable: function setCellsEditable() {},
	    isCellDisconnectable: function isCellDisconnectable() {},
	    isCellsDisconnectable: function isCellsDisconnectable() {},
	    setCellsDisconnectable: function setCellsDisconnectable() {},
	    isValidSource: function isValidSource() {},
	    isValidTarget: function isValidTarget() {},
	    isValidConnection: function isValidConnection() {},
	    setConnectable: function setConnectable() {},
	    isConnectable: function isConnectable() {},
	    setTooltips: function setTooltips() {},
	    setPanning: function setPanning() {},
	    isEditing: function isEditing() {},
	    isAutoSizeCell: function isAutoSizeCell() {},
	    isAutoSizeCells: function isAutoSizeCells() {},
	    setAutoSizeCells: function setAutoSizeCells() {},
	    isExtendParent: function isExtendParent() {},
	    isExtendParents: function isExtendParents() {},
	    setExtendParents: function setExtendParents() {},
	    isExtendParentsOnAdd: function isExtendParentsOnAdd() {},
	    setExtendParentsOnAdd: function setExtendParentsOnAdd() {},
	    isExtendParentsOnMove: function isExtendParentsOnMove() {},
	    setExtendParentsOnMove: function setExtendParentsOnMove() {},
	    isRecursiveResize: function isRecursiveResize() {},
	    setRecursiveResize: function setRecursiveResize() {},
	    isConstrainChild: function isConstrainChild() {},
	    isConstrainChildren: function isConstrainChildren() {},
	    setConstrainChildren: function setConstrainChildren() {},
	    setConstrainChildrenOnResize: function setConstrainChildrenOnResize() {},
	    isConstrainChildrenOnResize: function isConstrainChildrenOnResize() {},
	    isAllowNegativeCoordinates: function isAllowNegativeCoordinates() {},
	    setAllowNegativeCoordinates: function setAllowNegativeCoordinates() {},
	    getOverlap: function getOverlap() {},
	    isAllowOverlapParent: function isAllowOverlapParent() {},
	    getFoldableCells: function getFoldableCells() {},
	    isCellFoldable: function isCellFoldable() {},
	    isValidDropTarget: function isValidDropTarget() {},
	    isSplitTarget: function isSplitTarget() {},
	    getDropTarget: function getDropTarget() {},
	
	    // Cell retrieval
	    // ---------------
	    getDefaultParent: function getDefaultParent() {
	        var that = this;
	
	        return that.getCurrentRoot() || that.defaultParent || that.model.getRoot().getChildAt(0); // 第一层
	    },
	    setDefaultParent: function setDefaultParent() {},
	    getSwimlane: function getSwimlane() {},
	    getSwimlaneAt: function getSwimlaneAt() {},
	    getCellAt: function getCellAt(x, y, parent, vertices, edges) {
	        vertices = vertices != null ? vertices : true;
	        edges = edges != null ? edges : true;
	
	        if (parent == null) {
	            parent = this.getCurrentRoot();
	
	            if (parent == null) {
	                parent = this.getModel().getRoot();
	            }
	        }
	
	        if (parent != null) {
	            var childCount = this.model.getChildCount(parent);
	
	            for (var i = childCount - 1; i >= 0; i--) {
	                var cell = this.model.getChildAt(parent, i);
	                var result = this.getCellAt(x, y, cell, vertices, edges);
	
	                if (result != null) {
	                    return result;
	                } else if (this.isCellVisible(cell) && (edges && this.model.isEdge(cell) || vertices && this.model.isVertex(cell))) {
	                    var state = this.view.getState(cell);
	
	                    if (this.intersects(state, x, y)) {
	                        return cell;
	                    }
	                }
	            }
	        }
	
	        return null;
	    },
	    intersects: function intersects() {},
	    hitsSwimlaneContent: function hitsSwimlaneContent() {},
	    getChildVertices: function getChildVertices() {},
	    getChildEdges: function getChildEdges() {},
	    getChildCells: function getChildCells() {},
	    getConnections: function getConnections() {},
	    getIncomingEdges: function getIncomingEdges() {},
	    getOutgoingEdges: function getOutgoingEdges() {},
	    getEdges: function getEdges() {},
	    isValidAncestor: function isValidAncestor() {},
	    getOpposites: function getOpposites() {},
	    getEdgesBetween: function getEdgesBetween() {},
	    getPointForEvent: function getPointForEvent() {},
	    getCells: function getCells() {},
	    getCellsBeyond: function getCellsBeyond() {},
	    findTreeRoots: function findTreeRoots() {},
	    traverse: function traverse() {},
	
	    // Selection
	    // ---------
	    isCellSelected: function isCellSelected() {},
	    isSelectionEmpty: function isSelectionEmpty() {},
	    clearSelection: function clearSelection() {},
	    getSelectionCount: function getSelectionCount() {},
	    getSelectionCell: function getSelectionCell() {},
	    getSelectionCells: function getSelectionCells() {},
	    setSelectionCell: function setSelectionCell() {},
	    setSelectionCells: function setSelectionCells() {},
	    addSelectionCell: function addSelectionCell() {},
	    addSelectionCells: function addSelectionCells() {},
	    removeSelectionCell: function removeSelectionCell() {},
	    removeSelectionCells: function removeSelectionCells() {},
	    selectRegion: function selectRegion() {},
	    selectNextCell: function selectNextCell() {},
	    selectPreviousCell: function selectPreviousCell() {},
	    selectParentCell: function selectParentCell() {},
	    selectChildCell: function selectChildCell() {},
	    selectCell: function selectCell() {},
	    selectAll: function selectAll() {},
	    selectVertices: function selectVertices() {},
	    selectEdges: function selectEdges() {},
	    selectCells: function selectCells() {},
	    selectCellForEvent: function selectCellForEvent() {},
	    selectCellsForEvent: function selectCellsForEvent() {},
	
	    // Selection state
	    // ---------------
	    createHandler: function createHandler() {},
	    createVertexHandler: function createVertexHandler() {},
	    createEdgeHandler: function createEdgeHandler() {},
	    createEdgeSegmentHandler: function createEdgeSegmentHandler() {},
	    createElbowEdgeHandler: function createElbowEdgeHandler() {},
	
	    // Graph events
	    // ------------
	    addMouseListener: function addMouseListener() {},
	    removeMouseListener: function removeMouseListener() {},
	    updateMouseEvent: function updateMouseEvent(me) {
	        if (me.graphX == null || me.graphY == null) {
	            var pt = mxUtils.convertPoint(this.container, me.getX(), me.getY());
	
	            me.graphX = pt.x - this.panDx;
	            me.graphY = pt.y - this.panDy;
	        }
	
	        return me;
	    },
	    getStateForTouchEvent: function getStateForTouchEvent() {},
	    isEventIgnored: function isEventIgnored() {},
	    isSyntheticEventIgnored: function isSyntheticEventIgnored() {},
	    isEventSourceIgnored: function isEventSourceIgnored(evtName, me) {
	        var source = me.getSource();
	        var name = source.nodeName != null ? source.nodeName.toLowerCase() : '';
	        var candidate = !domEvent.isMouseEvent(me.getEvent()) || domEvent.isLeftMouseButton(me.getEvent());
	
	        return evtName == mxEvent.MOUSE_DOWN && candidate && (name == 'select' || name == 'option' || name == 'input' && source.type != 'checkbox' && source.type != 'radio' && source.type != 'button' && source.type != 'submit' && source.type != 'file');
	    },
	
	    fireMouseEvent: function fireMouseEvent(evtName, me, sender) {
	        //if (this.isEventSourceIgnored(evtName, me)) {
	        //    if (this.tooltipHandler != null) {
	        //        this.tooltipHandler.hide();
	        //    }
	        //
	        //    return;
	        //}
	
	        if (sender == null) {
	            sender = this;
	        }
	
	        // Updates the graph coordinates in the event
	        me = this.updateMouseEvent(me);
	
	        // Stops editing for all events other than from cellEditor
	        //if (evtName == mxEvent.MOUSE_DOWN && this.isEditing() && !this.cellEditor.isEventSource(me.getEvent())) {
	        //    this.stopEditing(!this.isInvokesStopCellEditing());
	        //}
	
	        // Detects and processes double taps for touch-based devices which do not have native double click events
	        // or where detection of double click is not always possible (quirks, IE10+). Note that this can only handle
	        // double clicks on cells because the sequence of events in IE prevents detection on the background, it fires
	        // two mouse ups, one of which without a cell but no mousedown for the second click which means we cannot
	        // detect which mouseup(s) are part of the first click, ie we do not know when the first click ends.
	        if (!this.nativeDblClickEnabled && !mxEvent.isPopupTrigger(me.getEvent()) || this.doubleTapEnabled && mxClient.IS_TOUCH && mxEvent.isTouchEvent(me.getEvent())) {
	            var currentTime = new Date().getTime();
	
	            // NOTE: Second mouseDown for double click missing in quirks mode
	            if (!mxClient.IS_QUIRKS && evtName == mxEvent.MOUSE_DOWN || mxClient.IS_QUIRKS && evtName == mxEvent.MOUSE_UP && !this.fireDoubleClick) {
	                if (this.lastTouchEvent != null && this.lastTouchEvent != me.getEvent() && currentTime - this.lastTouchTime < this.doubleTapTimeout && Math.abs(this.lastTouchX - me.getX()) < this.doubleTapTolerance && Math.abs(this.lastTouchY - me.getY()) < this.doubleTapTolerance && this.doubleClickCounter < 2) {
	                    this.doubleClickCounter++;
	                    var doubleClickFired = false;
	
	                    if (evtName == mxEvent.MOUSE_UP) {
	                        if (me.getCell() == this.lastTouchCell && this.lastTouchCell != null) {
	                            this.lastTouchTime = 0;
	                            var cell = this.lastTouchCell;
	                            this.lastTouchCell = null;
	
	                            // Fires native dblclick event via event source
	                            // NOTE: This fires two double click events on edges in quirks mode. While
	                            // trying to fix this, we realized that nativeDoubleClick can be disabled for
	                            // quirks and IE10+ (or we didn't find the case mentioned above where it
	                            // would not work), ie. all double clicks seem to be working without this.
	                            if (mxClient.IS_QUIRKS) {
	                                me.getSource().fireEvent('ondblclick');
	                            }
	
	                            this.dblClick(me.getEvent(), cell);
	                            doubleClickFired = true;
	                        }
	                    } else {
	                        this.fireDoubleClick = true;
	                        this.lastTouchTime = 0;
	                    }
	
	                    // Do not ignore mouse up in quirks in this case
	                    if (!mxClient.IS_QUIRKS || doubleClickFired) {
	                        mxEvent.consume(me.getEvent());
	                        return;
	                    }
	                } else if (this.lastTouchEvent == null || this.lastTouchEvent != me.getEvent()) {
	                    this.lastTouchCell = me.getCell();
	                    this.lastTouchX = me.getX();
	                    this.lastTouchY = me.getY();
	                    this.lastTouchTime = currentTime;
	                    this.lastTouchEvent = me.getEvent();
	                    this.doubleClickCounter = 0;
	                }
	            } else if ((this.isMouseDown || evtName == mxEvent.MOUSE_UP) && this.fireDoubleClick) {
	                this.fireDoubleClick = false;
	                var cell = this.lastTouchCell;
	                this.lastTouchCell = null;
	                this.isMouseDown = false;
	
	                // Workaround for Chrome/Safari not firing native double click events for double touch on background
	                var valid = cell != null || mxEvent.isTouchEvent(me.getEvent()) && (mxClient.IS_GC || mxClient.IS_SF);
	
	                if (valid && Math.abs(this.lastTouchX - me.getX()) < this.doubleTapTolerance && Math.abs(this.lastTouchY - me.getY()) < this.doubleTapTolerance) {
	                    this.dblClick(me.getEvent(), cell);
	                } else {
	                    mxEvent.consume(me.getEvent());
	                }
	
	                return;
	            }
	        }
	
	        if (!this.isEventIgnored(evtName, me, sender)) {
	            this.fireEvent(new mxEventObject(mxEvent.FIRE_MOUSE_EVENT, 'eventName', evtName, 'event', me));
	
	            if (mxClient.IS_OP || mxClient.IS_SF || mxClient.IS_GC || mxClient.IS_IE && mxClient.IS_SVG || me.getEvent().target != this.container) {
	                if (evtName == mxEvent.MOUSE_MOVE && this.isMouseDown && this.autoScroll && !mxEvent.isMultiTouchEvent(me.getEvent)) {
	                    this.scrollPointToVisible(me.getGraphX(), me.getGraphY(), this.autoExtend);
	                }
	
	                if (this.mouseListeners != null) {
	                    var args = [sender, me];
	
	                    // Does not change returnValue in Opera
	                    if (!me.getEvent().preventDefault) {
	                        me.getEvent().returnValue = true;
	                    }
	
	                    for (var i = 0; i < this.mouseListeners.length; i++) {
	                        var l = this.mouseListeners[i];
	
	                        if (evtName == mxEvent.MOUSE_DOWN) {
	                            l.mouseDown.apply(l, args);
	                        } else if (evtName == mxEvent.MOUSE_MOVE) {
	                            l.mouseMove.apply(l, args);
	                        } else if (evtName == mxEvent.MOUSE_UP) {
	                            l.mouseUp.apply(l, args);
	                        }
	                    }
	                }
	
	                // Invokes the click handler
	                if (evtName == mxEvent.MOUSE_UP) {
	                    this.click(me);
	                }
	            }
	
	            // Detects tapAndHold events using a timer
	            if (mxEvent.isTouchEvent(me.getEvent()) && evtName == mxEvent.MOUSE_DOWN && this.tapAndHoldEnabled && !this.tapAndHoldInProgress) {
	                this.tapAndHoldInProgress = true;
	                this.initialTouchX = me.getGraphX();
	                this.initialTouchY = me.getGraphY();
	
	                var handler = function handler() {
	                    if (this.tapAndHoldValid) {
	                        this.tapAndHold(me);
	                    }
	
	                    this.tapAndHoldInProgress = false;
	                    this.tapAndHoldValid = false;
	                };
	
	                if (this.tapAndHoldThread) {
	                    window.clearTimeout(this.tapAndHoldThread);
	                }
	
	                this.tapAndHoldThread = window.setTimeout(mxUtils.bind(this, handler), this.tapAndHoldDelay);
	                this.tapAndHoldValid = true;
	            } else if (evtName == mxEvent.MOUSE_UP) {
	                this.tapAndHoldInProgress = false;
	                this.tapAndHoldValid = false;
	            } else if (this.tapAndHoldValid) {
	                this.tapAndHoldValid = Math.abs(this.initialTouchX - me.getGraphX()) < this.tolerance && Math.abs(this.initialTouchY - me.getGraphY()) < this.tolerance;
	            }
	
	            this.consumeMouseEvent(evtName, me, sender);
	        }
	    },
	
	    consumeMouseEvent: function consumeMouseEvent() {},
	
	    fireGestureEvent: function fireGestureEvent(evt, cell) {
	        // Resets double tap event handling when gestures take place
	        this.lastTouchTime = 0;
	        this.emit(new EventObject(eventNames.GESTURE, {
	            event: evt,
	            cell: cell
	        }));
	    },
	
	    destroy: function destroy() {}
	});
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utils = __webpack_require__(1);
	
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
	
	// Create a sub Class based on `Class`.
	Class.extend = function (properties) {
	    properties || (properties = {});
	    properties.Extends = this;
	
	    return Class.create(properties);
	};
	
	// define special properties.
	Class.Mutators = {
	
	    // 继承
	    'Extends': function Extends(parent) {
	        var existed = this.prototype;
	        var parentProto = parent.prototype;
	        var proto = createProto(parentProto);
	
	        // Keep existed properties.
	        mix(proto, existed);
	
	        // Enforce the constructor to be what we expect.
	        proto.constructor = this;
	
	        this.prototype = proto;
	        this.superclass = parentProto;
	    },
	
	    // 实现
	    'Implements': function Implements(items) {
	
	        var list = (0, _utils.isArray)(items) ? items : [items];
	        var proto = this.prototype;
	
	        (0, _utils.each)(list, function (item) {
	            mix(proto, item.prototype || item);
	        });
	    },
	
	    // 属性访问器
	    'Accessors': function Accessors(propNames) {
	
	        var props = (0, _utils.isArray)(propNames) ? propNames : [propNames];
	        var proto = this.prototype;
	
	        (0, _utils.each)(props, function (prop) {
	
	            var uc = (0, _utils.ucFirst)(prop);
	
	            proto['set' + uc] = function (value) {
	                this[prop] = value;
	                return this;
	            };
	
	            proto['get' + uc] = function () {
	                return this[prop];
	            };
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
	        if (whiteList && indexOf(whiteList, key) === -1) {
	            return;
	        }
	
	        receiver[key] = value;
	    });
	}
	
	exports['default'] = Class;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _EventObject = __webpack_require__(15);
	
	var _EventObject2 = _interopRequireDefault(_EventObject);
	
	var eventSplitter = /\s+/;
	
	exports['default'] = _libBase2['default'].extend({
	
	    eventEnabled: true,
	
	    constructor: function EventSource() {},
	
	    enableEvent: function enableEvent() {
	        this.eventsEnabled = true;
	        return this;
	    },
	
	    disableEvent: function disableEvent() {
	        this.eventsEnabled = false;
	        return this;
	    },
	
	    on: function on(events, callback, context) {
	        var that = this;
	
	        if (!callback) {
	            return that;
	        }
	
	        var listeners = that.eventListeners || (that.eventListeners = {});
	
	        events = events.split(eventSplitter);
	
	        (0, _commonUtils.each)(events, function (event) {
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
	
	        events = events ? events.split(eventSplitter) : (0, _commonUtils.keys)(listeners);
	
	        (0, _commonUtils.each)(events, function (event) {
	
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
	
	    emit: function emit(eventName, data, sender) {
	
	        var that = this;
	        var listeners = that.eventListeners;
	
	        // No events.
	        if (!listeners || !eventName || !that.eventEnabled) {
	            return null;
	        }
	
	        var returned = []; // 返回每个回调函数返回值组成的数组
	        var eventObj = new _EventObject2['default'](eventName, data);
	        sender = sender || that;
	
	        var list = listeners[eventName];
	        var length = list ? list.length : 0;
	        var ret;
	
	        for (var i = 0; i < length; i += 2) {
	            ret = list[i].call(list[i + 1] || that, eventObj, sender);
	            returned.push(ret);
	        }
	
	        return returned;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonClass = __webpack_require__(12);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	exports['default'] = _commonClass2['default'].create({
	
	    constructor: function Base() {},
	
	    toString: function toString() {
	        return '[Class ' + (0, _commonUtils.getFunctionName)(this.constructor) + ']';
	    },
	
	    getValue: function getValue() {
	        return this.toString();
	    },
	
	    destroy: function destroy() {
	
	        var that = this;
	
	        (0, _commonUtils.forIn)(that, function (val, key) {
	            delete that[key];
	        });
	
	        that.destroyed = true;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function EventObject(name, eventData) {
	
	        var that = this;
	        var data = that.data = {};
	
	        that.name = name;
	        that.consumed = false;
	
	        if ((0, _commonUtils.isObject)(eventData)) {
	            (0, _commonUtils.extend)(data, eventData);
	        } else {
	            that.data = eventData;
	        }
	    },
	
	    getName: function getName() {
	        return this.name;
	    },
	
	    getData: function getData(key) {
	        var data = this.data;
	        return key ? data[key] : data;
	    },
	
	    isConsumed: function isConsumed() {
	        return this.consumed;
	    },
	
	    consume: function consume() {
	        this.consumed = true;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _defaultLinkStyle = __webpack_require__(17);
	
	var _defaultLinkStyle2 = _interopRequireDefault(_defaultLinkStyle);
	
	var _defaultNodeStyle = __webpack_require__(22);
	
	var _defaultNodeStyle2 = _interopRequireDefault(_defaultNodeStyle);
	
	var _defaultStyle = __webpack_require__(25);
	
	var _defaultStyle2 = _interopRequireDefault(_defaultStyle);
	
	var _shapesPerimeter = __webpack_require__(55);
	
	var _shapesPerimeter2 = _interopRequireDefault(_shapesPerimeter);
	
	exports['default'] = _libBase2['default'].extend({
	
	    constructor: function Stylesheet() {
	        var that = this;
	
	        that.styles = {};
	        var common = _defaultStyle2['default'].common;
	        var nodeStyle = _defaultStyle2['default'].node;
	        var linkStyle = _defaultStyle2['default'].link;
	
	        nodeStyle.label = (0, _commonUtils.extend)({}, common.label, nodeStyle.label);
	        linkStyle.label = (0, _commonUtils.extend)({}, common.label, linkStyle.label);
	
	        nodeStyle.perimeter = _shapesPerimeter2['default'].RectanglePerimeter;
	
	        that.setDefaultNodeStyle((0, _commonUtils.extend)({}, common, nodeStyle));
	        that.setDefaultLinkStyle((0, _commonUtils.extend)({}, common, linkStyle));
	    },
	
	    getDefaultNodeStyle: function getDefaultNodeStyle() {
	        return this.styles['defaultNode'];
	    },
	
	    setDefaultNodeStyle: function setDefaultNodeStyle(style) {
	        return this.setStyle('defaultNode', style);
	    },
	
	    getDefaultLinkStyle: function getDefaultLinkStyle() {
	        return this.styles['defaultLink'];
	    },
	
	    setDefaultLinkStyle: function setDefaultLinkStyle(style) {
	        return this.setStyle('defaultLink', style);
	    },
	
	    getStyle: function getStyle(name) {
	        return this.styles[name];
	    },
	
	    setStyle: function setStyle(name, style) {
	        this.styles[name] = style;
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _enumsStyleNames = __webpack_require__(18);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _enumsShapeNames = __webpack_require__(19);
	
	var _enumsShapeNames2 = _interopRequireDefault(_enumsShapeNames);
	
	var _enumsAlignments = __webpack_require__(20);
	
	var _enumsAlignments2 = _interopRequireDefault(_enumsAlignments);
	
	var _enumsArrowTypes = __webpack_require__(21);
	
	var _enumsArrowTypes2 = _interopRequireDefault(_enumsArrowTypes);
	
	var style = {};
	
	style[_enumsStyleNames2['default'].shape] = _enumsShapeNames2['default'].CONNECTOR;
	style[_enumsStyleNames2['default'].END_ARROW] = _enumsArrowTypes2['default'].CLASSIC;
	style[_enumsStyleNames2['default'].VERTICAL_ALIGN] = _enumsAlignments2['default'].MIDDLE;
	style[_enumsStyleNames2['default'].ALIGN] = _enumsAlignments2['default'].CENTER;
	style[_enumsStyleNames2['default'].strokeColor] = '#289de9';
	style[_enumsStyleNames2['default'].FONT_COLOR] = '#446299';
	
	exports['default'] = style;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    shape: 'shape',
	    perimeter: 'perimeter',
	
	    SOURCE_PORT: 'sourcePort',
	    TARGET_PORT: 'targetPort',
	    PORT_CONSTRAINT: 'portConstraint',
	    PORT_CONSTRAINT_ROTATION: 'portConstraintRotation',
	
	    opacity: 'opacity',
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
	    rotation: 'rotation',
	
	    SWIMLANE_FILL_COLOR: 'swimlaneFillColor',
	    MARGIN: 'margin',
	
	    fillColor: 'fillColor',
	    gradientColor: 'gradientColor',
	    gradientDirection: 'gradientDirection',
	
	    strokeColor: 'strokeColor',
	    strokeWidth: 'strokeWidth',
	
	    SEPARATOR_COLOR: 'separatorColor',
	
	    ALIGN: 'align',
	    VERTICAL_ALIGN: 'verticalAlign',
	
	    IMAGE_ASPECT: 'imageAspect',
	    IMAGE_ALIGN: 'imageAlign',
	    IMAGE_VERTICAL_ALIGN: 'imageVerticalAlign',
	
	    glass: 'glass',
	
	    IMAGE: 'image',
	    IMAGE_WIDTH: 'imageWidth',
	    IMAGE_HEIGHT: 'imageHeight',
	    IMAGE_BACKGROUND: 'imageBackground',
	    IMAGE_BORDER: 'imageBorder',
	
	    flipH: 'flipH',
	    flipV: 'flipV',
	
	    NO_LABEL: 'noLabel',
	    NO_EDGE_STYLE: 'noEdgeStyle',
	
	    LABEL_WIDTH: 'labelWidth',
	    LABEL_POSITION: 'labelPosition',
	    VERTICAL_LABEL_POSITION: 'verticalLabelPosition',
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
	
	    shadow: 'shadow',
	    SEGMENT: 'segment',
	    startArrow: 'startArrow',
	    endArrow: 'endArrow',
	    endSize: 'endSize',
	    startSize: 'startSize',
	    SWIMLANE_LINE: 'swimlaneLine',
	    END_FILL: 'endFill',
	    START_FILL: 'startFill',
	    dashed: 'dashed',
	    DASH_PATTERN: 'dashPattern',
	    rounded: 'rounded',
	    CURVED: 'curved',
	    ARCSIZE: 'arcSize',
	    SMOOTH: 'smooth',
	    SOURCE_PERIMETER_SPACING: 'sourcePerimeterSpacing',
	    TARGET_PERIMETER_SPACING: 'targetPerimeterSpacing',
	    PERIMETER_SPACING: 'perimeterSpacing',
	    spacing: 'spacing',
	    SPACING_TOP: 'spacingTop',
	    SPACING_LEFT: 'spacingLeft',
	    SPACING_BOTTOM: 'spacingBottom',
	    SPACING_RIGHT: 'spacingRight',
	    HORIZONTAL: 'horizontal',
	    direction: 'direction',
	    ELBOW: 'elbow',
	    FONT_COLOR: 'fontColor',
	    FONT_FAMILY: 'fontFamily',
	    FONT_SIZE: 'fontSize',
	    FONT_STYLE: 'fontStyle',
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

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
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

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    left: 'left',
	    center: 'center',
	    right: 'right',
	    top: 'top',
	    middle: 'middle',
	    bottom: 'bottom'
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    CLASSIC: 'classic',
	    BLOCK: 'block',
	    OPEN: 'open',
	    OVAL: 'oval',
	    DIAMOND: 'diamond',
	    DIAMOND_THIN: 'diamondThin'
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _enumsStyleNames = __webpack_require__(18);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _enumsShapeNames = __webpack_require__(19);
	
	var _enumsShapeNames2 = _interopRequireDefault(_enumsShapeNames);
	
	var _enumsAlignments = __webpack_require__(20);
	
	var _enumsAlignments2 = _interopRequireDefault(_enumsAlignments);
	
	var _commonPerimeter = __webpack_require__(23);
	
	var style = {};
	
	style[_enumsStyleNames2['default'].shape] = _enumsShapeNames2['default'].RECTANGLE;
	style[_enumsStyleNames2['default'].perimeter] = _commonPerimeter.rectanglePerimeter;
	style[_enumsStyleNames2['default'].VERTICAL_ALIGN] = _enumsAlignments2['default'].MIDDLE;
	style[_enumsStyleNames2['default'].ALIGN] = _enumsAlignments2['default'].CENTER;
	style[_enumsStyleNames2['default'].fillColor] = '#e3f4ff';
	style[_enumsStyleNames2['default'].strokeColor] = '#289de9';
	style[_enumsStyleNames2['default'].FONT_COLOR] = '#774400';
	
	exports['default'] = style;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libPoint = __webpack_require__(24);
	
	var _libPoint2 = _interopRequireDefault(_libPoint);
	
	function rectanglePerimeter(bounds, vertex, next, orthogonal) {
	    var cx = bounds.getCenterX();
	    var cy = bounds.getCenterY();
	    var dx = next.x - cx;
	    var dy = next.y - cy;
	    var alpha = Math.atan2(dy, dx);
	    var p = new _libPoint2['default'](0, 0);
	    var pi = Math.PI;
	    var pi2 = Math.PI / 2;
	    var beta = pi2 - alpha;
	    var t = Math.atan2(bounds.height, bounds.width);
	
	    if (alpha < -pi + t || alpha > pi - t) {
	        // Left edge
	        p.x = bounds.x;
	        p.y = cy - bounds.width * Math.tan(alpha) / 2;
	    } else if (alpha < -t) {
	        // Top Edge
	        p.y = bounds.y;
	        p.x = cx - bounds.height * Math.tan(beta) / 2;
	    } else if (alpha < t) {
	        // Right Edge
	        p.x = bounds.x + bounds.width;
	        p.y = cy + bounds.width * Math.tan(alpha) / 2;
	    } else {
	        // Bottom Edge
	        p.y = bounds.y + bounds.height;
	        p.x = cx + bounds.height * Math.tan(beta) / 2;
	    }
	
	    if (orthogonal) {
	        if (next.x >= bounds.x && next.x <= bounds.x + bounds.width) {
	            p.x = next.x;
	        } else if (next.y >= bounds.y && next.y <= bounds.y + bounds.height) {
	            p.y = next.y;
	        }
	        if (next.x < bounds.x) {
	            p.x = bounds.x;
	        } else if (next.x > bounds.x + bounds.width) {
	            p.x = bounds.x + bounds.width;
	        }
	        if (next.y < bounds.y) {
	            p.y = bounds.y;
	        } else if (next.y > bounds.y + bounds.height) {
	            p.y = bounds.y + bounds.height;
	        }
	    }
	
	    return p;
	}
	
	function ellipsePerimeter(bounds, vertex, next, orthogonal) {
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
	    } else if (dx == 0 && dy == 0) {
	        return new mxPoint(px, py);
	    }
	
	    if (orthogonal) {
	        if (py >= y && py <= y + bounds.height) {
	            var ty = py - cy;
	            var tx = Math.sqrt(a * a * (1 - ty * ty / (b * b))) || 0;
	
	            if (px <= x) {
	                tx = -tx;
	            }
	
	            return new mxPoint(cx + tx, py);
	        }
	
	        if (px >= x && px <= x + bounds.width) {
	            var tx = px - cx;
	            var ty = Math.sqrt(b * b * (1 - tx * tx / (a * a))) || 0;
	
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
	    var g = a * a * d * d * cx * cx + b * b * cx * cx - a * a * b * b;
	    var det = Math.sqrt(f * f - 4 * e * g);
	
	    // Two solutions (perimeter points)
	    var xout1 = (-f + det) / (2 * e);
	    var xout2 = (-f - det) / (2 * e);
	    var yout1 = d * xout1 + h;
	    var yout2 = d * xout2 + h;
	    var dist1 = Math.sqrt(Math.pow(xout1 - px, 2) + Math.pow(yout1 - py, 2));
	    var dist2 = Math.sqrt(Math.pow(xout2 - px, 2) + Math.pow(yout2 - py, 2));
	
	    // Correct solution
	    var xout = 0;
	    var yout = 0;
	
	    if (dist1 < dist2) {
	        xout = xout1;
	        yout = yout1;
	    } else {
	        xout = xout2;
	        yout = yout2;
	    }
	
	    return new mxPoint(xout, yout);
	}
	
	function rhombusPerimeter(bounds, vertex, next, orthogonal) {
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
	        } else {
	                return new mxPoint(cx, y + h); // bottom
	            }
	    } else if (cy == py) {
	            if (cx > px) {
	                return new mxPoint(x, cy); // left
	            } else {
	                    return new mxPoint(x + w, cy); // right
	                }
	        }
	
	    var tx = cx;
	    var ty = cy;
	
	    if (orthogonal) {
	        if (px >= x && px <= x + w) {
	            tx = px;
	        } else if (py >= y && py <= y + h) {
	            ty = py;
	        }
	    }
	
	    // In which quadrant will the intersection be?
	    // set the slope and offset of the border line accordingly
	    if (px < cx) {
	        if (py < cy) {
	            return mxUtils.intersection(px, py, tx, ty, cx, y, x, cy);
	        } else {
	            return mxUtils.intersection(px, py, tx, ty, cx, y + h, x, cy);
	        }
	    } else if (py < cy) {
	        return mxUtils.intersection(px, py, tx, ty, cx, y, x + w, cy);
	    } else {
	        return mxUtils.intersection(px, py, tx, ty, cx, y + h, x + w, cy);
	    }
	}
	
	function trianglePerimeter(bounds, vertex, next, orthogonal) {
	    var direction = vertex != null ? vertex.style[mxConstants.STYLE_DIRECTION] : null;
	    var vertical = direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH;
	
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
	    } else if (direction == mxConstants.DIRECTION_SOUTH) {
	        corner = new mxPoint(cx, y + h);
	        end = new mxPoint(x + w, y);
	    } else if (direction == mxConstants.DIRECTION_WEST) {
	        start = new mxPoint(x + w, y);
	        corner = new mxPoint(x, cy);
	        end = new mxPoint(x + w, y + h);
	    }
	
	    var dx = next.x - cx;
	    var dy = next.y - cy;
	
	    var alpha = vertical ? Math.atan2(dx, dy) : Math.atan2(dy, dx);
	    var t = vertical ? Math.atan2(w, h) : Math.atan2(h, w);
	
	    var base = false;
	
	    if (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_WEST) {
	        base = alpha > -t && alpha < t;
	    } else {
	        base = alpha < -Math.PI + t || alpha > Math.PI - t;
	    }
	
	    var result = null;
	
	    if (base) {
	        if (orthogonal && (vertical && next.x >= start.x && next.x <= end.x || !vertical && next.y >= start.y && next.y <= end.y)) {
	            if (vertical) {
	                result = new mxPoint(next.x, start.y);
	            } else {
	                result = new mxPoint(start.x, next.y);
	            }
	        } else {
	            if (direction == mxConstants.DIRECTION_NORTH) {
	                result = new mxPoint(x + w / 2 + h * Math.tan(alpha) / 2, y + h);
	            } else if (direction == mxConstants.DIRECTION_SOUTH) {
	                result = new mxPoint(x + w / 2 - h * Math.tan(alpha) / 2, y);
	            } else if (direction == mxConstants.DIRECTION_WEST) {
	                result = new mxPoint(x + w, y + h / 2 + w * Math.tan(alpha) / 2);
	            } else {
	                result = new mxPoint(x, y + h / 2 - w * Math.tan(alpha) / 2);
	            }
	        }
	    } else {
	        if (orthogonal) {
	            var pt = new mxPoint(cx, cy);
	
	            if (next.y >= y && next.y <= y + h) {
	                pt.x = vertical ? cx : direction == mxConstants.DIRECTION_WEST ? x + w : x;
	                pt.y = next.y;
	            } else if (next.x >= x && next.x <= x + w) {
	                pt.x = next.x;
	                pt.y = !vertical ? cy : direction == mxConstants.DIRECTION_NORTH ? y + h : y;
	            }
	
	            // Compute angle
	            dx = next.x - pt.x;
	            dy = next.y - pt.y;
	
	            cx = pt.x;
	            cy = pt.y;
	        }
	
	        if (vertical && next.x <= x + w / 2 || !vertical && next.y <= y + h / 2) {
	            result = mxUtils.intersection(next.x, next.y, cx, cy, start.x, start.y, corner.x, corner.y);
	        } else {
	            result = mxUtils.intersection(next.x, next.y, cx, cy, corner.x, corner.y, end.x, end.y);
	        }
	    }
	
	    if (result == null) {
	        result = new mxPoint(cx, cy);
	    }
	
	    return result;
	}
	
	function hexagonPerimeter(bounds, vertex, next, orthogonal) {
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
	
	    var direction = vertex != null ? mxUtils.getValue(vertex.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
	    var vertical = direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH;
	    var a = new mxPoint();
	    var b = new mxPoint();
	
	    //Only consider corrects quadrants for the orthogonal case.
	    if (px < x && py < y || px < x && py > y + h || px > x + w && py < y || px > x + w && py > y + h) {
	        orthogonal = false;
	    }
	
	    if (orthogonal) {
	        if (vertical) {
	            //Special cases where intersects with hexagon corners
	            if (px == cx) {
	                if (py <= y) {
	                    return new mxPoint(cx, y);
	                } else if (py >= y + h) {
	                    return new mxPoint(cx, y + h);
	                }
	            } else if (px < x) {
	                if (py == y + h / 4) {
	                    return new mxPoint(x, y + h / 4);
	                } else if (py == y + 3 * h / 4) {
	                    return new mxPoint(x, y + 3 * h / 4);
	                }
	            } else if (px > x + w) {
	                if (py == y + h / 4) {
	                    return new mxPoint(x + w, y + h / 4);
	                } else if (py == y + 3 * h / 4) {
	                    return new mxPoint(x + w, y + 3 * h / 4);
	                }
	            } else if (px == x) {
	                if (py < cy) {
	                    return new mxPoint(x, y + h / 4);
	                } else if (py > cy) {
	                    return new mxPoint(x, y + 3 * h / 4);
	                }
	            } else if (px == x + w) {
	                if (py < cy) {
	                    return new mxPoint(x + w, y + h / 4);
	                } else if (py > cy) {
	                    return new mxPoint(x + w, y + 3 * h / 4);
	                }
	            }
	            if (py == y) {
	                return new mxPoint(cx, y);
	            } else if (py == y + h) {
	                return new mxPoint(cx, y + h);
	            }
	
	            if (px < cx) {
	                if (py > y + h / 4 && py < y + 3 * h / 4) {
	                    a = new mxPoint(x, y);
	                    b = new mxPoint(x, y + h);
	                } else if (py < y + h / 4) {
	                    a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                    b = new mxPoint(x + w, y - Math.floor(0.25 * h));
	                } else if (py > y + 3 * h / 4) {
	                    a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                    b = new mxPoint(x + w, y + Math.floor(1.25 * h));
	                }
	            } else if (px > cx) {
	                if (py > y + h / 4 && py < y + 3 * h / 4) {
	                    a = new mxPoint(x + w, y);
	                    b = new mxPoint(x + w, y + h);
	                } else if (py < y + h / 4) {
	                    a = new mxPoint(x, y - Math.floor(0.25 * h));
	                    b = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                } else if (py > y + 3 * h / 4) {
	                    a = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                    b = new mxPoint(x, y + Math.floor(1.25 * h));
	                }
	            }
	        } else {
	            //Special cases where intersects with hexagon corners
	            if (py == cy) {
	                if (px <= x) {
	                    return new mxPoint(x, y + h / 2);
	                } else if (px >= x + w) {
	                    return new mxPoint(x + w, y + h / 2);
	                }
	            } else if (py < y) {
	                if (px == x + w / 4) {
	                    return new mxPoint(x + w / 4, y);
	                } else if (px == x + 3 * w / 4) {
	                    return new mxPoint(x + 3 * w / 4, y);
	                }
	            } else if (py > y + h) {
	                if (px == x + w / 4) {
	                    return new mxPoint(x + w / 4, y + h);
	                } else if (px == x + 3 * w / 4) {
	                    return new mxPoint(x + 3 * w / 4, y + h);
	                }
	            } else if (py == y) {
	                if (px < cx) {
	                    return new mxPoint(x + w / 4, y);
	                } else if (px > cx) {
	                    return new mxPoint(x + 3 * w / 4, y);
	                }
	            } else if (py == y + h) {
	                if (px < cx) {
	                    return new mxPoint(x + w / 4, y + h);
	                } else if (py > cy) {
	                    return new mxPoint(x + 3 * w / 4, y + h);
	                }
	            }
	            if (px == x) {
	                return new mxPoint(x, cy);
	            } else if (px == x + w) {
	                return new mxPoint(x + w, cy);
	            }
	
	            if (py < cy) {
	                if (px > x + w / 4 && px < x + 3 * w / 4) {
	                    a = new mxPoint(x, y);
	                    b = new mxPoint(x + w, y);
	                } else if (px < x + w / 4) {
	                    a = new mxPoint(x - Math.floor(0.25 * w), y + h);
	                    b = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                } else if (px > x + 3 * w / 4) {
	                    a = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                    b = new mxPoint(x + Math.floor(1.25 * w), y + h);
	                }
	            } else if (py > cy) {
	                if (px > x + w / 4 && px < x + 3 * w / 4) {
	                    a = new mxPoint(x, y + h);
	                    b = new mxPoint(x + w, y + h);
	                } else if (px < x + w / 4) {
	                    a = new mxPoint(x - Math.floor(0.25 * w), y);
	                    b = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
	                } else if (px > x + 3 * w / 4) {
	                    a = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
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
	            } else {
	                ty = y;
	            }
	        } else if (py >= y && py <= y + h) {
	            ty = py;
	
	            if (px < cx) {
	                tx = x + w;
	            } else {
	                tx = x;
	            }
	        }
	
	        result = mxUtils.intersection(tx, ty, next.x, next.y, a.x, a.y, b.x, b.y);
	    } else {
	        if (vertical) {
	            var beta = Math.atan2(h / 4, w / 2);
	
	            //Special cases where intersects with hexagon corners
	            if (alpha == beta) {
	                return new mxPoint(x + w, y + Math.floor(0.25 * h));
	            } else if (alpha == pi2) {
	                return new mxPoint(x + Math.floor(0.5 * w), y);
	            } else if (alpha == pi - beta) {
	                return new mxPoint(x, y + Math.floor(0.25 * h));
	            } else if (alpha == -beta) {
	                return new mxPoint(x + w, y + Math.floor(0.75 * h));
	            } else if (alpha == -pi2) {
	                return new mxPoint(x + Math.floor(0.5 * w), y + h);
	            } else if (alpha == -pi + beta) {
	                return new mxPoint(x, y + Math.floor(0.75 * h));
	            }
	
	            if (alpha < beta && alpha > -beta) {
	                a = new mxPoint(x + w, y);
	                b = new mxPoint(x + w, y + h);
	            } else if (alpha > beta && alpha < pi2) {
	                a = new mxPoint(x, y - Math.floor(0.25 * h));
	                b = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	            } else if (alpha > pi2 && alpha < pi - beta) {
	                a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                b = new mxPoint(x + w, y - Math.floor(0.25 * h));
	            } else if (alpha > pi - beta && alpha <= pi || alpha < -pi + beta && alpha >= -pi) {
	                a = new mxPoint(x, y);
	                b = new mxPoint(x, y + h);
	            } else if (alpha < -beta && alpha > -pi2) {
	                a = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                b = new mxPoint(x, y + Math.floor(1.25 * h));
	            } else if (alpha < -pi2 && alpha > -pi + beta) {
	                a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                b = new mxPoint(x + w, y + Math.floor(1.25 * h));
	            }
	        } else {
	            var beta = Math.atan2(h / 2, w / 4);
	
	            //Special cases where intersects with hexagon corners
	            if (alpha == beta) {
	                return new mxPoint(x + Math.floor(0.75 * w), y);
	            } else if (alpha == pi - beta) {
	                return new mxPoint(x + Math.floor(0.25 * w), y);
	            } else if (alpha == pi || alpha == -pi) {
	                return new mxPoint(x, y + Math.floor(0.5 * h));
	            } else if (alpha == 0) {
	                return new mxPoint(x + w, y + Math.floor(0.5 * h));
	            } else if (alpha == -beta) {
	                return new mxPoint(x + Math.floor(0.75 * w), y + h);
	            } else if (alpha == -pi + beta) {
	                return new mxPoint(x + Math.floor(0.25 * w), y + h);
	            }
	
	            if (alpha > 0 && alpha < beta) {
	                a = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                b = new mxPoint(x + Math.floor(1.25 * w), y + h);
	            } else if (alpha > beta && alpha < pi - beta) {
	                a = new mxPoint(x, y);
	                b = new mxPoint(x + w, y);
	            } else if (alpha > pi - beta && alpha < pi) {
	                a = new mxPoint(x - Math.floor(0.25 * w), y + h);
	                b = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	            } else if (alpha < 0 && alpha > -beta) {
	                a = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
	                b = new mxPoint(x + Math.floor(1.25 * w), y);
	            } else if (alpha < -beta && alpha > -pi + beta) {
	                a = new mxPoint(x, y + h);
	                b = new mxPoint(x + w, y + h);
	            } else if (alpha < -pi + beta && alpha > -pi) {
	                a = new mxPoint(x - Math.floor(0.25 * w), y);
	                b = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
	            }
	        }
	
	        result = mxUtils.intersection(cx, cy, next.x, next.y, a.x, a.y, b.x, b.y);
	    }
	
	    if (result == null) {
	        return new mxPoint(cx, cy);
	    }
	
	    return result;
	}
	
	exports.rectanglePerimeter = rectanglePerimeter;
	exports.ellipsePerimeter = ellipsePerimeter;
	exports.rhombusPerimeter = rhombusPerimeter;
	exports.trianglePerimeter = trianglePerimeter;
	exports.hexagonPerimeter = hexagonPerimeter;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(14);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var Point = _Base2['default'].extend({
	
	    constructor: function Point(x, y) {
	        this.x = !(0, _commonUtils.isNullOrUndefined)(x) ? x : 0;
	        this.y = !(0, _commonUtils.isNullOrUndefined)(y) ? y : 0;
	    },
	
	    equals: function equals(point) {
	        return point && point instanceof Point && point.x === this.x && point.y === this.y;
	    },
	
	    clone: function clone() {
	        return new Point(this.x, this.y);
	    }
	});
	
	exports['default'] = Point;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	
	    common: {
	        // translate
	        dx: 0,
	        dy: 0,
	
	        scale: 1,
	
	        // rotate
	        rotation: 0,
	        rotationCx: 0,
	        rotationCy: 0,
	
	        opacity: 1,
	
	        // fill
	        fillColor: '#e3f4ff',
	        fillOpacity: 1,
	        gradientColor: '',
	        gradientOpacity: 1,
	        gradientDirection: '',
	
	        // border
	        strokeWidth: 1,
	        strokeColor: '#2db7f5',
	        dashed: false,
	        dashPattern: '3 3',
	        dashOffset: 0,
	        lineCap: 'butt', // butt, round, square
	        lineJoin: 'miter', // miter, round, bevel
	        miterLimit: 10,
	
	        // shadow
	        shadow: false,
	        shadowColor: 'gray',
	        shadowOpacity: 1,
	        shadowDx: 2,
	        shadowDy: 3,
	
	        glass: false,
	        flipH: false, // 水平翻转
	        flipV: false, // 垂直翻转
	        visible: true, // 默认可见
	        outline: false,
	        antiAlias: true,
	
	        label: {
	            shape: 'label',
	            position: 'center', // top, right, bottom, left, center
	            align: 'center', // left, center, right
	            verticalAlign: 'middle', // top, middle, bottom
	            overflow: '', // hidden, fill, width
	            spacing: 5,
	            vertical: false,
	            verticalRotation: -90
	        }
	    },
	
	    node: {
	        shape: 'rectangle',
	        round: 0 // percentage
	    },
	
	    link: {
	        shape: 'connector',
	        endArrow: 'classic' }
	
	};
	// classic, block, open, oval, diamond, diamondThin

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	
	    // 原型上的属性
	    visible: true, // 默认可见
	    transients: ['id', 'value', 'parent', 'source', 'target', 'children', 'links'],
	
	    constructor: function Cell(id, value, geometry, style) {
	
	        var that = this;
	
	        that.id = id;
	        that.value = value;
	        that.style = style;
	        that.geometry = geometry;
	
	        // props
	        // -----
	        // that.parent = null;
	        // that.source = null;
	        // that.target = null;
	        // that.children = [];
	        // that.links = [];
	    },
	
	    // link
	    // ----
	
	    // 获取连线连接的节点
	    getTerminal: function getTerminal(isSource) {
	        return isSource ? this.source : this.target;
	    },
	
	    // 设置连线连接的节点
	    setTerminal: function setTerminal(node, isSource) {
	        if (isSource) {
	            this.source = node;
	        } else {
	            this.target = node;
	        }
	
	        return node;
	    },
	
	    // 将连线从节点移除
	    removeFromTerminal: function removeFromTerminal(isSource) {
	
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
	
	        (0, _commonUtils.each)(that.children || [], iterator, context);
	
	        return that;
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
	
	        (0, _commonUtils.each)(that.links || [], iterator, context);
	
	        return that;
	    },
	
	    insertLink: function insertLink(link, outgoing) {
	
	        var that = this;
	
	        if (link) {
	            link.removeFromTerminal(outgoing);
	            link.setTerminal(that, outgoing);
	
	            var links = that.links;
	
	            // 连线的起点和终点是同一个节点时，说明连线已经和节点关联，则不需要添加
	            if (!links || that.getLinkIndex(link) < 0 || link.getNode(!outgoing) !== that) {
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
	
	            // 连线的起点和终点是同一个节点时，不需要移除
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
	
	    // common
	    // ------
	
	    removeFromParent: function removeFromParent() {
	        var that = this;
	        var parent = that.parent;
	
	        if (parent) {
	            parent.removeChild(that);
	        }
	
	        return that;
	    },
	
	    cloneValue: function cloneValue() {
	        var value = this.value;
	
	        if (value) {
	            if (value.clone && (0, _commonUtils.isFunction)(value.clone)) {
	                return value.clone();
	            }
	
	            if ((0, _commonUtils.isNode)(value)) {
	                return value.cloneNode(true);
	            }
	        }
	
	        return value;
	    },
	
	    clone: function clone() {
	        var that = this;
	        var cloned = (0, _commonUtils.clone)(that, that.transients);
	        cloned.value = that.cloneValue();
	
	        return cloned;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libRectangle = __webpack_require__(28);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var Geometry = _libRectangle2['default'].extend({
	
	    TRANSLATE_CONTROL_POINTS: true, // 是否平移控制点，默认为 true
	
	    constructor: function Geometry(x, y, width, height, relative) {
	
	        var that = this;
	
	        Geometry.superclass.constructor.call(that, x, y, width, height);
	
	        // relative 为 true 时，即相对定位，x 和 y 是相对父节点 w 和 h 上的百分比；
	        // 绝对定位时，x 和 y 是相对于父节点左上角的坐标
	        that.relative = !!relative;
	
	        // props
	        // -----
	        // that.alternateBounds = null; //
	        // that.sourcePoint = null;     // 连线的起点坐标。如果一个连线没有对应的起点
	        //                              // 节点，用该点来指定该连线的起点；否则，就忽
	        //                              // 略该点，连线的起点坐标将自动计算得到。
	        // that.targetPoint = null;     // 连线的终点坐标。
	        // that.points = null;          // 连线中的控制点坐标，这些点不包含连线的起点和终点的坐标。
	        // that.offset = null;          // 对于连线，是相对于 x 和 y 的偏移量
	        //                              // 对于节点，
	    },
	
	    swap: function swap() {
	
	        var that = this;
	        var alternateBounds = that.alternateBounds;
	
	        if (alternateBounds) {
	            var old = new _libRectangle2['default'](that.x, that.y, that.width, that.height);
	
	            that.x = alternateBounds.x;
	            that.y = alternateBounds.y;
	            that.width = alternateBounds.width;
	            that.height = alternateBounds.height;
	
	            that.alternateBounds = old;
	        }
	
	        return that;
	    },
	
	    getTerminalPoint: function getTerminalPoint(isSource) {
	        return isSource ? this.sourcePoint : this.targetPoint;
	    },
	
	    setTerminalPoint: function setTerminalPoint(point, isSource) {
	
	        var that = this;
	
	        if (isSource) {
	            that.sourcePoint = point;
	        } else {
	            that.targetPoint = point;
	        }
	
	        return that;
	    },
	
	    // 根据给定的旋转中心旋转给定的角度
	    rotate: function rotate(angle, center) {
	
	        var that = this;
	
	        var rad = (0, _commonUtils.toRadians)(angle);
	        var cos = Math.cos(rad);
	        var sin = Math.sin(rad);
	
	        // 只有绝对定位时才旋转 x 和 y
	        if (!that.relative) {
	            // 按照几何中心旋转
	            var geoCenter = (0, _commonUtils.rotatePointEx)(that.getCenter(), cos, sin, center);
	
	            that.x = Math.round(geoCenter.x - that.width / 2);
	            that.y = Math.round(geoCenter.y - that.height / 2);
	        }
	
	        that.sourcePoint && (0, _commonUtils.rotatePointEx)(that.sourcePoint, cos, sin, center, true);
	        that.targetPoint && (0, _commonUtils.rotatePointEx)(that.targetPoint, cos, sin, center, true);
	
	        that.points && (0, _commonUtils.each)(that.points, function (point) {
	            (0, _commonUtils.rotatePointEx)(point, cos, sin, center, true);
	        });
	    },
	
	    // 平移
	    translate: function translate(dx, dy) {
	
	        var that = this;
	
	        dx = (0, _commonUtils.toFloat)(dx);
	        dy = (0, _commonUtils.toFloat)(dy);
	
	        if (!that.relative) {
	            that.x = (0, _commonUtils.toFloat)(that.x) + dx;
	            that.y = (0, _commonUtils.toFloat)(that.y) + dy;
	        }
	
	        that.sourcePoint && (0, _commonUtils.translatePoint)(that.sourcePoint, dx, dy);
	        that.targetPoint && (0, _commonUtils.translatePoint)(that.targetPoint, dx, dy);
	
	        if (that.TRANSLATE_CONTROL_POINTS && that.points) {
	            (0, _commonUtils.each)(that.points, function (point) {
	                (0, _commonUtils.translatePoint)(point, dx, dy);
	            });
	        }
	
	        return that;
	    },
	
	    // 缩放
	    scale: function scale(sx, sy, sameRatio) {
	
	        var that = this;
	
	        sx = (0, _commonUtils.toFloat)(sx);
	        sy = (0, _commonUtils.toFloat)(sy);
	
	        that.sourcePoint && (0, _commonUtils.scalePoint)(that.sourcePoint, sx, sy);
	        that.targetPoint && (0, _commonUtils.scalePoint)(that.targetPoint, sx, sy);
	
	        that.points && (0, _commonUtils.each)(that.points, function (point) {
	            (0, _commonUtils.scalePoint)(point, sx, sy);
	        });
	
	        if (!that.relative) {
	            that.x = (0, _commonUtils.toFloat)(that.x) * sx;
	            that.y = (0, _commonUtils.toFloat)(that.y) * sy;
	
	            // 长宽按固定比例缩放
	            if (sameRatio) {
	                sy = sx = Math.min(sx, sy);
	            }
	
	            that.width = (0, _commonUtils.toFloat)(that.width) * sx;
	            that.height = (0, _commonUtils.toFloat)(that.height) * sy;
	        }
	
	        return that;
	    },
	
	    equals: function equals(geom) {
	
	        var that = this;
	
	        return Geometry.superclass.equals.call(that, geo) && that.relative === geo.relative && (0, _commonUtils.isEqualEntity)(that.sourcePoint, geom.sourcePoint) && (0, _commonUtils.isEqualEntity)(that.targetPoint, geom.targetPoint) && (0, _commonUtils.isEqualEntity)(that.offset, geom.offset) && (0, _commonUtils.isEqualEntities)(that.points, geom.points) && (0, _commonUtils.isEqualEntity)(that.alternateBounds, geom.alternateBounds);
	    }
	});
	
	exports['default'] = Geometry;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(14);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _Point = __webpack_require__(24);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var Rectangle = _Base2['default'].extend({
	
	    constructor: function Rectangle(x, y, width, height) {
	
	        var that = this;
	
	        that.x = !(0, _commonUtils.isNullOrUndefined)(x) ? x : 0;
	        that.y = !(0, _commonUtils.isNullOrUndefined)(y) ? y : 0;
	        that.width = width ? width : 0;
	        that.height = height ? height : 0;
	    },
	
	    setRect: function setRect(x, y, width, height) {
	
	        var that = this;
	
	        that.x = x;
	        that.y = y;
	        that.width = width;
	        that.height = height;
	
	        return that;
	    },
	
	    getCenterX: function getCenterX() {
	        return this.x + this.width / 2;
	    },
	
	    getCenterY: function getCenterY() {
	        return this.y + this.height / 2;
	    },
	
	    getCenter: function getCenter() {
	        return new _Point2['default'](this.getCenterX(), this.getCenterY());
	    },
	
	    add: function add(rect) {
	
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
	
	    grow: function grow(amount) {
	
	        var rect = this;
	
	        rect.x -= amount;
	        rect.y -= amount;
	        rect.width += 2 * amount;
	        rect.height += 2 * amount;
	
	        return rect;
	    },
	
	    rotate90: function rotate90() {
	
	        var that = this;
	        var w = that.width;
	        var h = that.height;
	        var t = (w - h) / 2;
	
	        that.x += t;
	        that.y -= t;
	        that.width = h;
	        that.height = w;
	
	        return that;
	    },
	
	    equals: function equals(rect) {
	
	        var that = this;
	
	        return rect instanceof Rectangle && rect.x === that.x && rect.y === that.y && rect.width === that.width && rect.height === that.height;
	    },
	
	    clone: function clone() {
	        var rect = this;
	        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
	    }
	});
	
	exports['default'] = Rectangle;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonDetector = __webpack_require__(9);
	
	var _commonDetector2 = _interopRequireDefault(_commonDetector);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _libPoint = __webpack_require__(24);
	
	var _libPoint2 = _interopRequireDefault(_libPoint);
	
	var _libRectangle = __webpack_require__(28);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var _libDictionary = __webpack_require__(30);
	
	var _libDictionary2 = _interopRequireDefault(_libDictionary);
	
	var _enumsStyleNames = __webpack_require__(18);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _enumsAlignments = __webpack_require__(20);
	
	var _enumsAlignments2 = _interopRequireDefault(_enumsAlignments);
	
	var _cellState = __webpack_require__(32);
	
	var _cellState2 = _interopRequireDefault(_cellState);
	
	var _cellRenderer = __webpack_require__(33);
	
	var _cellRenderer2 = _interopRequireDefault(_cellRenderer);
	
	exports['default'] = _libBase2['default'].extend({
	
	    currentRoot: null,
	    graphBounds: null,
	    rendering: true, // 是否需要创建、更新或销毁图形
	    updateStyle: false, // 重绘过程中是否需要更新样式，默认只会在创建 state 和 state.style 改变时才更新样式
	    captureDocumentGesture: true,
	
	    constructor: function View(graph) {
	
	        var that = this;
	        that.graph = graph;
	        that.states = new _libDictionary2['default']();
	        that.renderer = new _cellRenderer2['default']();
	        that.graphBounds = new _libRectangle2['default']();
	        that.scale = 1;
	        that.translate = new _libPoint2['default']();
	    },
	
	    getBounds: function getBounds() {},
	
	    setCurrentRoot: function setCurrentRoot() {},
	
	    scaleAndTranslate: function scaleAndTranslate() {},
	
	    setScale: function setScale() {},
	
	    setTranslate: function setTranslate() {},
	
	    refresh: function refresh() {},
	
	    revalidate: function revalidate() {
	        return this.invalidate(null, true, true).validate(null);
	    },
	
	    clear: function clear(cell, force, recurse) {
	
	        var that = this;
	        var model = that.graph.model;
	
	        cell = cell || model.getRoot();
	        force = force ? force : false;
	        //recurse = !isNullOrUndefined(recurse) ? recurse : true;
	
	        that.removeState(cell);
	
	        if (recurse && (force || cell !== that.currentRoot)) {
	            cell.eachChild(function (child) {
	                that.clear(child, false, true);
	            });
	        } else {
	            that.invalidate(cell, true, true);
	        }
	
	        return that;
	    },
	
	    invalidate: function invalidate(cell, recurse, includeLink) {
	
	        var that = this;
	        var model = that.graph.model;
	
	        cell = cell || model.getRoot();
	        //recurse = !isNullOrUndefined(recurse) ? recurse : true;
	        //includeLink = !isNullOrUndefined(includeLink) ? includeLink : true;
	
	        var state = that.getState(cell);
	
	        if (state) {
	            state.invalid = true;
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
	
	        cell = cell || that.currentRoot || that.graph.model.getRoot();
	
	        that.resetValidationState();
	
	        that.validateCell(cell, true);
	        that.validateCellState(cell, true);
	
	        that.graphBounds = that.getBoundingBox(cell, true) || that.getEmptyBounds();
	
	        that.validateBackground();
	        that.resetValidationState();
	    },
	
	    // BackgroundPage
	    // ---------------
	    createBackgroundPageShape: function createBackgroundPageShape(bounds) {
	        return new RectangleShape(bounds, 'white', 'black');
	    },
	
	    validateBackground: function validateBackground() {
	        this.validateBackgroundImage();
	        this.validateBackgroundPage();
	    },
	
	    validateBackgroundImage: function validateBackgroundImage() {
	        var bg = this.graph.getBackgroundImage();
	
	        if (bg) {
	            if (this.backgroundImage == null || this.backgroundImage.image != bg.src) {
	                if (this.backgroundImage) {
	                    this.backgroundImage.destroy();
	                }
	
	                var bounds = new _libRectangle2['default'](0, 0, 1, 1);
	
	                this.backgroundImage = new ImageShape(bounds, bg.src);
	                this.backgroundImage.dialect = this.graph.dialect;
	                this.backgroundImage.init(this.backgroundPane);
	                this.backgroundImage.redraw();
	
	                // Workaround for ignored event on background in IE8 standards mode
	                if (document.documentMode == 8 && !mxClient.IS_EM) {
	                    mxEvent.addGestureListeners(this.backgroundImage.node, mxUtils.bind(this, function (evt) {
	                        this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
	                    }), mxUtils.bind(this, function (evt) {
	                        this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
	                    }), mxUtils.bind(this, function (evt) {
	                        this.graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
	                    }));
	                }
	            }
	
	            this.redrawBackgroundImage(this.backgroundImage, bg);
	        } else if (this.backgroundImage != null) {
	            this.backgroundImage.destroy();
	            this.backgroundImage = null;
	        }
	    },
	
	    validateBackgroundPage: function validateBackgroundPage() {},
	
	    getBackgroundPageBounds: function getBackgroundPageBounds() {
	        var view = this;
	        var scale = view.scale;
	        var translate = view.translate;
	        var fmt = view.graph.pageFormat;
	        var ps = scale * view.graph.pageScale;
	
	        return new _libRectangle2['default'](scale * translate.x, scale * translate.y, fmt.width * ps, fmt.height * ps);
	    },
	
	    redrawBackgroundImage: function redrawBackgroundImage(backgroundImage, bg) {
	        backgroundImage.scale = this.scale;
	        backgroundImage.bounds.x = this.scale * this.translate.x;
	        backgroundImage.bounds.y = this.scale * this.translate.y;
	        backgroundImage.bounds.width = this.scale * bg.width;
	        backgroundImage.bounds.height = this.scale * bg.height;
	
	        backgroundImage.redraw();
	    },
	
	    // Bounding
	    // --------
	    getEmptyBounds: function getEmptyBounds() {
	
	        var that = this;
	        var scale = that.scale;
	        var translate = that.translate;
	        return new _libRectangle2['default'](translate.x * scale, translate.y * scale);
	    },
	
	    getBoundingBox: function getBoundingBox(cell, recurse) {
	
	        var that = this;
	        var state = that.getState(cell);
	        var boundingBox = null;
	
	        if (state) {
	
	            var shapeBoundingBox = state.shape && state.shape.boundingBox;
	            if (shapeBoundingBox) {
	                boundingBox = shapeBoundingBox.clone();
	            }
	
	            var textBoundingBox = state.label && state.label.boundingBox;
	            if (textBoundingBox) {
	                if (boundingBox) {
	                    boundingBox.add(textBoundingBox);
	                } else {
	                    boundingBox = textBoundingBox.clone();
	                }
	            }
	
	            if (recurse) {
	                cell.eachChild(function (child) {
	                    var childBoundingBox = that.getBoundingBox(child, recurse);
	                    if (childBoundingBox) {
	                        if (boundingBox) {
	                            boundingBox.add(childBoundingBox);
	                        } else {
	                            boundingBox = childBoundingBox;
	                        }
	                    }
	                });
	            }
	        }
	
	        return boundingBox;
	    },
	
	    // 创建或移除 cell 对应的 state
	    validateCell: function validateCell(cell, visible) {
	        var that = this;
	
	        if (!cell) {
	            return cell;
	        }
	
	        //visible = !isNullOrUndefined(visible) ? visible : true;
	        visible = visible && cell.visible;
	
	        var state = that.getState(cell, visible);
	
	        if (state && !visible) {
	            that.removeState(cell);
	        } else {
	            cell.eachChild(function (child) {
	                var childVisible = visible && (!cell.collapsed || cell === that.currentRoot);
	                that.validateCell(child, childVisible);
	            });
	        }
	
	        return that;
	    },
	
	    validateCellState: function validateCellState(cell, recurse) {
	
	        var that = this;
	        var state = null;
	
	        if (!cell) {
	            return state;
	        }
	
	        state = that.getState(cell);
	
	        if (!state) {
	            return state;
	        }
	
	        //recurse = !isNullOrUndefined(recurse) ? recurse : true;
	
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
	
	            // 更新 state 的大小、位置信息
	            that.updateCellState(state);
	
	            if (cell !== that.currentRoot) {
	                that.renderer.redraw(state, false, that.rendering);
	            }
	        }
	
	        if (recurse) {
	            // 更新 state.cellBounds 和 state.paintBounds
	            state.updateCachedBounds();
	
	            // 更新 DOM 的层级顺序
	            //if (state.shape) {
	            //    that.stateValidated(state);
	            //}
	
	            cell.eachChild(function (child) {
	                that.validateCellState(child, true);
	            });
	        }
	
	        return state;
	    },
	
	    updateCellState: function updateCellState(state) {
	
	        var that = this;
	        var cell = state.cell;
	        var currentRoot = that.currentRoot;
	        var stateOrigin = state.origin;
	        var stateAbsoluteOffset = state.absoluteOffset;
	
	        // 重置
	        stateAbsoluteOffset.x = 0;
	        stateAbsoluteOffset.y = 0;
	        stateOrigin.x = 0;
	        stateOrigin.y = 0;
	        state.length = 0;
	
	        if (cell !== currentRoot) {
	
	            var graph = that.graph;
	            var scale = that.scale;
	            var translate = that.translate;
	            var parent = cell.parent;
	            var parentState = parent ? that.getState(parent) : null;
	
	            // 父节点的 origin
	            if (parentState && parent !== currentRoot) {
	                stateOrigin.x += parentState.origin.x;
	                stateOrigin.y += parentState.origin.y;
	            }
	
	            // 获取 cell 的 offset
	            var cellOffset = graph.getChildOffsetForCell(cell);
	            if (cellOffset) {
	                stateOrigin.x += cellOffset.x;
	                stateOrigin.y += cellOffset.y;
	            }
	
	            var geo = cell.geometry;
	            if (geo) {
	                if (!cell.isLink) {
	
	                    var geoOffset = geo.offset || new _libPoint2['default']();
	
	                    // 相对定位
	                    if (geo.relative && parentState) {
	                        if (parent.isLink) {
	                            var origin = that.getPoint(parentState, geo);
	
	                            if (origin) {
	                                stateOrigin.x += origin.x / scale - parentState.origin.x - translate.x;
	                                stateOrigin.y += origin.y / scale - parentState.origin.y - translate.y;
	                            }
	                        } else {
	                            // 相对定位时 geo.x 和 geo.y 是相对于父元素 w 和 h 的百分比
	                            stateOrigin.x += geo.x * parentState.width / scale + geoOffset.x;
	                            stateOrigin.y += geo.y * parentState.height / scale + geoOffset.y;
	                        }
	                    } else {
	                        stateAbsoluteOffset.x = scale * geoOffset.x;
	                        stateAbsoluteOffset.y = scale * geoOffset.y;
	                        stateOrigin.x += geo.x;
	                        stateOrigin.y += geo.y;
	                    }
	                }
	
	                // 设置 scale 和 translate 之后的 x, y, w, h
	                state.x = scale * (translate.x + stateOrigin.x);
	                state.y = scale * (translate.y + stateOrigin.y);
	                state.width = scale * geo.width;
	                state.height = scale * geo.height;
	
	                cell.isNode && that.updateNodeState(state);
	                cell.isLink && that.updateLinkState(state);
	            }
	        }
	
	        return that;
	    },
	
	    updateNodeState: function updateNodeState(state) {
	
	        var that = this;
	        var cell = state.cell;
	        var geo = cell.geometry;
	        var parent = cell.parent;
	        var parentState = parent ? that.getState(parent) : null;
	
	        if (geo.relative && parentState && !parent.isLink) {
	            var deg = parentState.style.rotation || 0;
	
	            // 绕父元素的中心旋转
	            if (deg) {
	                var origin = state.getCenter();
	                var center = parentState.getCenter();
	                var rotated = (0, _commonUtils.rotatePoint)(origin, deg, center);
	                state.x = rotated.x - state.width / 2;
	                state.y = rotated.y - state.height / 2;
	            }
	        }
	
	        return that.updateNodeLabelOffset(state);
	    },
	
	    updateLinkState: function updateLinkState(state) {
	
	        var that = this;
	        var cell = state.cell;
	        var geo = cell.geometry;
	
	        var sourceNode = cell.getTerminal(true);
	        var targetNode = cell.getTerminal(false);
	        var visibleSourceState = state.getVisibleTerminalState(true);
	        var visibleTargetState = state.getVisibleTerminalState(false);
	        var sourcePoint = geo.getTerminalPoint(true);
	        var targetPoint = geo.getTerminalPoint(false);
	
	        if (sourceNode && !visibleSourceState || !visibleSourceState && !sourcePoint || targetNode && !visibleTargetState || !visibleTargetState && !targetPoint) {
	            that.clear(cell, true, true);
	        } else {
	            // 获取绘制连点需要的起点/终点和关键点
	            that.updateFixedTerminalPoints(state, visibleSourceState, visibleTargetState);
	            that.updatePoints(state, geo.points, visibleSourceState, visibleTargetState);
	            that.updateFloatingTerminalPoints(state, visibleSourceState, visibleTargetState);
	
	            var absolutePoints = state.absolutePoints;
	            // 检查是否能够绘制连线
	            var canDrawLink = absolutePoints && absolutePoints.length >= 2 && absolutePoints[0] && absolutePoints[absolutePoints.length - 1];
	
	            if (cell !== that.currentRoot && !canDrawLink) {
	                that.clear(state.cell, true, true);
	            } else {
	                // 根据关键点更新 bounds
	                that.updateEdgeBounds(state);
	                // 更新标签位置
	                that.updateEdgeLabelOffset(state);
	            }
	        }
	
	        return that;
	    },
	
	    updateNodeLabelOffset: function updateNodeLabelOffset(state) {
	
	        var that = this;
	        var scale = that.scale;
	        var style = state.style.label;
	        var stateWidth = state.width;
	        var stateHeight = state.height;
	        var labelOffset = state.absoluteOffset;
	        var labelWidth = style.labelWidth || 0;
	        var position = style.position || 'center';
	
	        // label 在水平方向上的位置
	        if (position === 'left') {
	            // 左外侧
	            if (labelWidth) {
	                labelWidth *= scale;
	            } else {
	                labelWidth = stateWidth;
	            }
	            labelOffset.x -= labelWidth;
	        } else if (position === 'right') {
	            // 右外侧
	            labelOffset.x += stateWidth;
	        } else {
	            // 水平居中时，还要根据 cell 的对齐方式来确定 label 的位置
	            if (labelWidth) {
	                var cellAlign = style.align || 'center';
	                var dx = 0;
	
	                if (cellAlign === 'center') {
	                    dx = 0.5;
	                } else if (cellAlign === 'right') {
	                    dx = 1;
	                }
	
	                if (dx !== 0) {
	                    labelOffset.x -= (labelWidth * scale - stateWidth) * dx;
	                }
	            }
	        }
	
	        // label 在垂直方向上的位置
	        if (position === 'top') {
	            labelOffset.y -= stateHeight;
	        } else if (position === 'bottom') {
	            labelOffset.y += stateHeight;
	        }
	
	        return that;
	    },
	
	    resetValidationState: function resetValidationState() {
	        var that = this;
	        that.lastNode = null;
	        that.lastHtmlNode = null;
	        that.lastForegroundNode = null;
	        that.lastForegroundHtmlNode = null;
	        return that;
	    },
	
	    stateValidated: function stateValidated(state) {
	
	        var that = this;
	        var cell = state.cell;
	        var graph = that.graph;
	
	        var fg = cell.isLink && graph.keepEdgesInForeground || cell.isNode && graph.keepEdgesInBackground;
	
	        var htmlNode = fg ? that.lastForegroundHtmlNode || that.lastHtmlNode : that.lastHtmlNode;
	        var node = fg ? that.lastForegroundNode || that.lastNode : that.lastNode;
	        var result = graph.cellRenderer.insertStateAfter(state, node, htmlNode);
	
	        if (fg) {
	            that.lastForegroundHtmlNode = result[1];
	            that.lastForegroundNode = result[0];
	        } else {
	            that.lastHtmlNode = result[1];
	            that.lastNode = result[0];
	        }
	
	        return that;
	    },
	
	    updateFixedTerminalPoints: function updateFixedTerminalPoints(linkState, sourceState, targetState) {
	
	        //var sourceConstraint = this.graph.getConnectionConstraint(linkState, sourceState, true);
	        //var targetConstraint = this.graph.getConnectionConstraint(linkState, targetState, false);
	
	        var sourceConstraint = null;
	        var targetConstraint = null;
	
	        this.updateFixedTerminalPoint(linkState, sourceState, true, sourceConstraint);
	        this.updateFixedTerminalPoint(linkState, targetState, false, targetConstraint);
	    },
	
	    updateFixedTerminalPoint: function updateFixedTerminalPoint(linkState, terminalState, isSource, constraint) {
	        var pt = null;
	
	        if (constraint) {
	            pt = this.graph.getConnectionPoint(terminalState, constraint);
	        }
	
	        if (pt && terminalState) {
	            var s = this.scale;
	            var tr = this.translate;
	            var orig = linkState.origin;
	            var geo = this.graph.getCellGeometry(linkState.cell);
	            pt = geo.getTerminalPoint(isSource);
	
	            if (pt) {
	                pt = new mxPoint(s * (tr.x + pt.x + orig.x), s * (tr.y + pt.y + orig.y));
	            }
	        }
	
	        linkState.setAbsolutePoint(pt, isSource);
	    },
	
	    updatePoints: function updatePoints(linkState, points, sourceState, targetState) {
	        if (linkState) {
	            var pts = [];
	            pts.push(linkState.absolutePoints[0]);
	            var edgeStyle = this.getEdgeStyle(linkState, points, sourceState, targetState);
	
	            if (edgeStyle != null) {
	                var src = this.getTerminalPort(linkState, sourceState, true);
	                var trg = this.getTerminalPort(linkState, targetState, false);
	
	                edgeStyle(linkState, src, trg, points, pts);
	            } else if (points != null) {
	                for (var i = 0; i < points.length; i++) {
	                    if (points[i] != null) {
	                        var pt = mxUtils.clone(points[i]);
	                        pts.push(this.transformControlPoint(linkState, pt));
	                    }
	                }
	            }
	
	            var tmp = linkState.absolutePoints;
	            pts.push(tmp[tmp.length - 1]);
	
	            linkState.absolutePoints = pts;
	        }
	    },
	
	    transformControlPoint: function transformControlPoint(state, pt) {},
	
	    getEdgeStyle: function getEdgeStyle(edge, points, source, target) {},
	
	    updateFloatingTerminalPoints: function updateFloatingTerminalPoints(linkState, sourceState, targetState) {
	        var pts = linkState.absolutePoints;
	        var p0 = pts[0];
	        var pe = pts[pts.length - 1];
	
	        // 连线终点
	        if (!pe && targetState) {
	            this.updateFloatingTerminalPoint(linkState, targetState, sourceState, false);
	        }
	
	        // 连线起点
	        if (!p0 && sourceState) {
	            this.updateFloatingTerminalPoint(linkState, sourceState, targetState, true);
	        }
	    },
	
	    updateFloatingTerminalPoint: function updateFloatingTerminalPoint(linkState, startState, endState, isSource) {
	        startState = this.getTerminalPort(linkState, startState, isSource);
	
	        var nextPoint = this.getNextPoint(linkState, endState, isSource);
	        var orth = this.graph.isOrthogonal(linkState);
	        var alpha = startState.style.rotation || 0; // mxUtils.toRadians(Number(startState.style[mxConstants.STYLE_ROTATION] || '0'));
	        var center = startState.getCenter(); // new Point(startState.getCenterX(), startState.getCenterY());
	
	        if (alpha) {
	            var cos = Math.cos(-alpha);
	            var sin = Math.sin(-alpha);
	            nextPoint = mxUtils.getRotatedPoint(nextPoint, cos, sin, center);
	        }
	
	        var border = parseFloat(linkState.style.perimeterSpacing || 0);
	        border += parseFloat(linkState.style[isSource ? 'sourcePerimeterSpacing' : 'targetPerimeterSpacing'] || 0);
	
	        var pt = this.getPerimeterPoint(startState, nextPoint, alpha === 0 && orth, border);
	
	        if (alpha) {
	            var cos = Math.cos(alpha);
	            var sin = Math.sin(alpha);
	            pt = mxUtils.getRotatedPoint(pt, cos, sin, center);
	        }
	
	        linkState.setAbsolutePoint(pt, isSource);
	    },
	
	    getTerminalPort: function getTerminalPort(linkState, terminal, isSource) {
	
	        var key = isSource ? 'sourcePort' : 'targetPort';
	        var id = linkState.style[key];
	
	        if (id) {
	            var tmp = this.getState(this.graph.getModel().getCell(id));
	
	            // Only uses ports where a cell state exists
	            if (tmp) {
	                terminal = tmp;
	            }
	        }
	
	        return terminal;
	    },
	
	    getPerimeterPoint: function getPerimeterPoint(terminal, next, orthogonal, border) {
	        var point = null;
	
	        if (terminal) {
	            var perimeter = this.getPerimeterFunction(terminal);
	
	            if (perimeter && next) {
	                var bounds = this.getPerimeterBounds(terminal, border);
	
	                if (bounds.width > 0 || bounds.height > 0) {
	                    point = perimeter(bounds, terminal, next, orthogonal);
	
	                    if (point != null) {
	                        point.x = Math.round(point.x);
	                        point.y = Math.round(point.y);
	                    }
	                }
	            }
	
	            if (point === null) {
	                point = this.getPoint(terminal);
	            }
	        }
	
	        return point;
	    },
	
	    getRoutingCenterX: function getRoutingCenterX(state) {},
	
	    getRoutingCenterY: function getRoutingCenterY(state) {},
	
	    getPerimeterBounds: function getPerimeterBounds(terminal, border) {
	        border = border != null ? border : 0;
	
	        if (terminal) {
	            border += parseFloat(terminal.style.perimeterSpacing || 0);
	        }
	
	        return terminal.getPerimeterBounds(border * this.scale);
	    },
	
	    getPerimeterFunction: function getPerimeterFunction(state) {
	        var perimeter = state.style.perimeter;
	
	        // Converts string values to objects
	        if (typeof perimeter === "string") {
	            var tmp = mxStyleRegistry.getValue(perimeter);
	
	            if (tmp == null && this.isAllowEval()) {
	                tmp = mxUtils.eval(perimeter);
	            }
	
	            perimeter = tmp;
	        }
	
	        if (typeof perimeter === "function") {
	            return perimeter;
	        }
	
	        return null;
	    },
	
	    getNextPoint: function getNextPoint(linkState, opposite, isSource) {
	        var pts = linkState.absolutePoints;
	        var point = null;
	
	        if (pts && pts.length >= 2) {
	            var count = pts.length;
	            point = pts[isSource ? Math.min(1, count - 1) : Math.max(0, count - 2)];
	        }
	
	        if (!point && opposite) {
	            point = opposite.getCenter(); // new Point(opposite.getCenterX(), opposite.getCenterY());
	        }
	
	        return point;
	    },
	
	    getVisibleTerminal: function getVisibleTerminal(link, isSource) {
	
	        var that = this;
	        var best = null;
	
	        if (link) {
	            var result = link.getTerminal(isSource);
	            best = result;
	
	            while (result && result !== this.currentRoot) {
	                // 如果自己不可见或父节点处于折叠状态
	                if (!best.visible || result.collapsed) {
	                    best = result;
	                }
	
	                result = result.parent;
	            }
	
	            if (that.graph.model.isLayer(best)) {
	                best = null;
	            }
	        }
	
	        return best;
	    },
	
	    updateEdgeBounds: function updateEdgeBounds(state) {
	
	        var points = state.absolutePoints;
	        var p0 = points[0];
	        var pe = points[points.length - 1];
	
	        var dx;
	        var dy;
	
	        if (p0.x !== pe.x || p0.y !== pe.y) {
	            dx = pe.x - p0.x;
	            dy = pe.y - p0.y;
	            state.terminalDistance = Math.sqrt(dx * dx + dy * dy);
	        } else {
	            state.terminalDistance = 0;
	        }
	
	        var length = 0;
	        var segments = [];
	        var pt = p0;
	
	        if (pt) {
	            var minX = pt.x;
	            var minY = pt.y;
	            var maxX = minX;
	            var maxY = minY;
	
	            for (var i = 1; i < points.length; i++) {
	                var tmp = points[i];
	
	                if (tmp) {
	                    dx = pt.x - tmp.x;
	                    dy = pt.y - tmp.y;
	
	                    var segment = Math.sqrt(dx * dx + dy * dy);
	                    segments.push(segment);
	                    length += segment;
	
	                    pt = tmp;
	
	                    minX = Math.min(pt.x, minX);
	                    minY = Math.min(pt.y, minY);
	                    maxX = Math.max(pt.x, maxX);
	                    maxY = Math.max(pt.y, maxY);
	                }
	            }
	
	            state.length = length;
	            state.segments = segments;
	
	            var markerSize = 1; // TODO: include marker size
	
	            state.x = minX;
	            state.y = minY;
	            state.width = Math.max(markerSize, maxX - minX);
	            state.height = Math.max(markerSize, maxY - minY);
	        }
	    },
	
	    // 获取连线上的相对于 geometry 定位的点
	    // TODO: 搞明白
	    getPoint: function getPoint(state, geometry) {
	        var x = state.getCenterX();
	        var y = state.getCenterY();
	
	        if (state.segments && (!geometry || geometry.relative)) {
	
	            var gx = geometry ? geometry.x / 2 : 0;
	            var pointCount = state.absolutePoints.length;
	            var dist = (gx + 0.5) * state.length;
	            var segment = state.segments[0];
	            var length = 0;
	            var index = 1;
	
	            while (dist > length + segment && index < pointCount - 1) {
	                length += segment;
	                segment = state.segments[index++];
	            }
	
	            var factor = segment == 0 ? 0 : (dist - length) / segment;
	            var p0 = state.absolutePoints[index - 1];
	            var pe = state.absolutePoints[index];
	
	            if (p0 != null && pe != null) {
	                var gy = 0;
	                var offsetX = 0;
	                var offsetY = 0;
	
	                if (geometry != null) {
	                    gy = geometry.y;
	                    var offset = geometry.offset;
	
	                    if (offset != null) {
	                        offsetX = offset.x;
	                        offsetY = offset.y;
	                    }
	                }
	
	                var dx = pe.x - p0.x;
	                var dy = pe.y - p0.y;
	                var nx = segment == 0 ? 0 : dy / segment;
	                var ny = segment == 0 ? 0 : dx / segment;
	
	                x = p0.x + dx * factor + (nx * gy + offsetX) * this.scale;
	                y = p0.y + dy * factor - (ny * gy - offsetY) * this.scale;
	            }
	        } else if (geometry) {
	
	            var offset = geometry.offset;
	
	            if (offset != null) {
	                x += offset.x;
	                y += offset.y;
	            }
	        }
	
	        return new _libPoint2['default'](x, y);
	    },
	
	    getRelativePoint: function getRelativePoint(edgeState, x, y) {},
	
	    updateEdgeLabelOffset: function updateEdgeLabelOffset(state) {
	        var points = state.absolutePoints;
	
	        state.absoluteOffset = state.getCenter();
	        //state.absoluteOffset.x = state.getCenterX();
	        //state.absoluteOffset.y = state.getCenterY();
	
	        if (points && points.length > 0 && state.segments) {
	            var geometry = state.cell.geometry; // this.graph.getCellGeometry(state.cell);
	
	            if (geometry.relative) {
	                var offset = this.getPoint(state, geometry);
	
	                if (offset) {
	                    state.absoluteOffset = offset;
	                }
	            } else {
	                var p0 = points[0];
	                var pe = points[points.length - 1];
	
	                if (p0 != null && pe != null) {
	                    var dx = pe.x - p0.x;
	                    var dy = pe.y - p0.y;
	                    var x0 = 0;
	                    var y0 = 0;
	
	                    var off = geometry.offset;
	
	                    if (off != null) {
	                        x0 = off.x;
	                        y0 = off.y;
	                    }
	
	                    var x = p0.x + dx / 2 + x0 * this.scale;
	                    var y = p0.y + dy / 2 + y0 * this.scale;
	
	                    state.absoluteOffset.x = x;
	                    state.absoluteOffset.y = y;
	                }
	            }
	        }
	    },
	
	    // State
	    // -----
	    getState: function getState(cell, create) {
	
	        if (!cell) {
	            return;
	        }
	
	        var that = this;
	        var states = that.states;
	        var state = states.get(cell);
	
	        // TODO: that.updateStyle
	        if (create && (!state || that.updateStyle) && cell.visible) {
	
	            if (!state) {
	                state = that.createState(cell);
	                states.put(cell, state);
	            } else {
	                state.style = that.graph.getCellStyle(cell);
	            }
	        }
	
	        return state;
	    },
	
	    createState: function createState(cell) {
	
	        var that = this;
	        var graph = that.graph;
	        var style = graph.getCellStyle(cell);
	
	        // 使用 view 中的平移和缩放
	        style.scale = that.scale;
	        style.dx = that.translate.x;
	        style.dy = that.translate.y;
	
	        var state = new _cellState2['default'](that, cell, style);
	
	        // TODO: that.currentRoot
	        if (graph.container && cell !== that.currentRoot && (cell.isNode || cell.isLink)) {
	            that.renderer.createShape(state);
	        }
	
	        return state;
	    },
	
	    removeState: function removeState(cell) {
	
	        var that = this;
	        var state = null;
	
	        if (cell) {
	            state = that.states.remove(cell);
	
	            if (state) {
	                that.graph.cellRenderer.destroy(state);
	                state.destroy();
	            }
	        }
	
	        return state;
	    },
	
	    isContainerEvent: function isContainerEvent(evt) {},
	
	    isScrollEvent: function isScrollEvent(evt) {},
	
	    init: function init() {
	
	        var that = this;
	        var doc = window.document;
	        var root = (0, _commonUtils.createSvgElement)('svg');
	        var canvas = (0, _commonUtils.createSvgElement)('g');
	        var backgroundPane = (0, _commonUtils.createSvgElement)('g');
	        var drawPane = (0, _commonUtils.createSvgElement)('g');
	        var overlayPane = (0, _commonUtils.createSvgElement)('g');
	        var decoratorPane = (0, _commonUtils.createSvgElement)('g');
	        var foreignPane = doc.createElement('div');
	
	        canvas.appendChild(backgroundPane);
	        canvas.appendChild(drawPane);
	        canvas.appendChild(overlayPane);
	        canvas.appendChild(decoratorPane);
	        root.appendChild(canvas);
	
	        that.canvas = canvas;
	        that.backgroundPane = backgroundPane;
	        that.drawPane = drawPane;
	        that.overlayPane = overlayPane;
	        that.decoratorPane = decoratorPane;
	        that.foreignPane = foreignPane;
	
	        var container = that.graph.container;
	
	        if (container) {
	
	            // update container style
	            var style = (0, _commonUtils.getCurrentStyle)(container);
	            if (style.position === 'static') {
	                container.style.position = 'relative';
	            }
	
	            // Disables built-in pan and zoom in IE10 and later
	            if (_commonDetector2['default'].IS_POINTER) {
	                container.style.msTouchAction = 'none';
	            }
	
	            root.style.cssText = 'width: 100%; height: 100%; display: block;';
	
	            container.appendChild(root);
	            container.appendChild(foreignPane);
	        }
	
	        that.installListeners();
	    },
	
	    installListeners: function installListeners() {},
	
	    destroy: function destroy() {}
	});
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(14);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _commonObjectIdentity = __webpack_require__(31);
	
	var _commonObjectIdentity2 = _interopRequireDefault(_commonObjectIdentity);
	
	exports['default'] = _Base2['default'].extend({
	
	    constructor: function Dictionary() {
	        this.clear();
	    },
	
	    clear: function clear() {
	        var that = this;
	
	        that.map = {};
	
	        return that;
	    },
	
	    get: function get(key) {
	        var id = _commonObjectIdentity2['default'].get(key);
	        return this.map[id];
	    },
	
	    put: function put(key, value) {
	
	        var map = this.map;
	        var id = _commonObjectIdentity2['default'].get(key);
	        var previous = map[id];
	
	        map[id] = value;
	
	        return previous;
	    },
	
	    remove: function remove(key) {
	
	        var map = this.map;
	        var id = _commonObjectIdentity2['default'].get(key);
	        var previous = map[id];
	
	        delete map[id];
	
	        return previous;
	    },
	
	    getKeys: function getKeys() {
	        return (0, _commonUtils.keys)(this.map);
	    },
	
	    getValues: function getValues() {
	
	        var result = [];
	
	        (0, _commonUtils.forIn)(this.map, function (value) {
	            result.push(value);
	        });
	
	        return result;
	    },
	
	    each: function each(visitor, context) {
	
	        var that = this;
	
	        (0, _commonUtils.forIn)(that.map, visitor, context);
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utils = __webpack_require__(1);
	
	// 用构造函数名作为计数器依据
	var counterMap = {};
	
	var objectIdentity = {
	
	    fieldName: 'objectId',
	
	    get: function get(obj) {
	
	        var fieldName = objectIdentity.fieldName;
	        var isObj = (0, _utils.isObject)(obj);
	
	        if (isObj && (0, _utils.isUndefined)(obj[fieldName])) {
	
	            var ctorName = (0, _utils.getFunctionName)(obj.constructor);
	
	            if ((0, _utils.isUndefined)(counterMap[ctorName])) {
	                counterMap[ctorName] = 0;
	            } else {
	                counterMap[ctorName] += 1;
	            }
	
	            obj[fieldName] = ctorName + '#' + counterMap[ctorName];
	        }
	
	        return isObj ? obj[fieldName] : '' + obj;
	    },
	
	    clear: function clear(obj) {
	        if ((0, _utils.isObject)(obj)) {
	            delete obj[objectIdentity.fieldName];
	        }
	    }
	};
	
	exports['default'] = objectIdentity;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libPoint = __webpack_require__(24);
	
	var _libPoint2 = _interopRequireDefault(_libPoint);
	
	var _libRectangle = __webpack_require__(28);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var State = _libRectangle2['default'].extend({
	
	    invalid: true, // 默认为无效，需要重绘
	
	    constructor: function State(view, cell, style) {
	
	        var that = this;
	
	        that.view = view;
	        that.cell = cell;
	        that.style = style;
	
	        // cell 在画布上的原始（scale 和 translate）坐标，在 view.validateCellState() 过程中更新
	        that.origin = new _libPoint2['default']();
	        // 对于连线来说，这是 label 的绝对位置，对于节点来说，这是 label 相对于节点左上角的位置
	        that.absoluteOffset = new _libPoint2['default']();
	
	        // props
	        // -----
	        // that.shape = null;
	        // that.text = null;
	        // that.cellBounds = null;        // 缩放和平移之前的边界
	        // that.paintBounds = null;       // 缩放和平移之前的绘图边界，cellBounds 或旋转 90° 之后的 cellBounds
	        // that.absolutePoints = null;    // 连线关键点的坐标数组
	        // that.visibleSourceState =null;
	        // that.visibleTargetState =null;
	        // that.terminalDistance = 0;     // 连线起点和终点之间的距离
	        // that.segments = null;          // 连线每个片段的长度
	        // that.length = 0;               // 连线的长度
	    },
	
	    getPerimeterBounds: function getPerimeterBounds(border, bounds) {
	
	        var that = this;
	
	        border = border || 0;
	        bounds = bounds ? bounds : new _libRectangle2['default'](that.x, that.y, that.width, that.height);
	
	        if (border) {
	            bounds.grow(border);
	        }
	
	        return bounds;
	    },
	
	    // 设置连线起点或终点的坐标
	    setAbsolutePoint: function setAbsolutePoint(point, isSource) {
	        var that = this;
	        var absolutePoints = that.absolutePoints;
	
	        if (!absolutePoints) {
	            absolutePoints = that.absolutePoints = [];
	        }
	
	        var length = absolutePoints.length;
	
	        if (isSource) {
	            length ? absolutePoints[0] = point : absolutePoints.push(point);
	        } else {
	            if (length === 0) {
	                absolutePoints.push(null);
	                absolutePoints.push(point);
	            } else if (length === 1) {
	                absolutePoints.push(point);
	            } else {
	                absolutePoints[length - 1] = point;
	            }
	        }
	
	        return that;
	    },
	
	    // 设置鼠标样式
	    setCursor: function setCursor(cursor) {
	
	        var that = this;
	
	        that.shape && that.shape.setCursor(cursor);
	        that.text && that.text.setCursor(cursor);
	
	        return that;
	    },
	
	    // 获取连线连接的可见起点/终点节点
	    getVisibleTerminal: function getVisibleTerminal(isSource) {
	        var state = this.getVisibleTerminalState(isSource);
	        return state ? state.cell : null;
	    },
	
	    getVisibleTerminalState: function getVisibleTerminalState(isSource) {
	        return isSource ? this.visibleSourceState : this.visibleTargetState;
	    },
	
	    setVisibleTerminalState: function setVisibleTerminalState(state, isSource) {
	
	        var that = this;
	
	        if (isSource) {
	            that.visibleSourceState = state;
	        } else {
	            that.visibleTargetState = state;
	        }
	
	        return that;
	    },
	
	    updateCachedBounds: function updateCachedBounds() {
	
	        var that = this;
	        var view = that.view;
	        var shape = that.shape;
	        var scale = view.scale;
	        var translate = view.translate;
	
	        // 计算缩放和平移之前的边界
	        var x = that.x / scale - translate.x;
	        var y = that.y / scale - translate.y;
	        var w = that.width / scale;
	        var h = that.height / scale;
	
	        that.cellBounds = new _libRectangle2['default'](x, y, w, h);
	        that.paintBounds = new _libRectangle2['default'](x, y, w, h);
	
	        // 如果需要旋转，则旋转绘图边界
	        if (shape && shape.isPaintBoundsInverted()) {
	            that.paintBounds.rotate90();
	        }
	    },
	
	    equalToBounds: function equalToBounds(bounds) {
	
	        var that = this;
	        return that.x === bounds.x && that.y === bounds.y && that.width === bounds.width && that.height === bounds.height;
	    },
	
	    destroy: function destroy() {},
	
	    clone: function clone() {
	
	        var that = this;
	        var cloned = new State(that.view, that.cell, that.style);
	
	        if (that.absolutePoints) {
	            cloned.absolutePoints = [];
	
	            for (var i = 0, l = this.absolutePoints.length; i < l; i++) {
	                cloned.absolutePoints[i] = this.absolutePoints[i].clone();
	            }
	        }
	
	        if (that.origin) {
	            cloned.origin = that.origin.clone();
	        }
	
	        if (that.absoluteOffset) {
	            cloned.absoluteOffset = that.absoluteOffset.clone();
	        }
	
	        if (that.boundingBox) {
	            cloned.boundingBox = that.boundingBox.clone();
	        }
	
	        cloned.terminalDistance = that.terminalDistance;
	        cloned.segments = that.segments;
	        cloned.length = that.length;
	        cloned.x = that.x;
	        cloned.y = that.y;
	        cloned.width = that.width;
	        cloned.height = that.height;
	
	        return cloned;
	    }
	});
	
	exports['default'] = State;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _enumsStyleNames = __webpack_require__(18);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _libRectangle = __webpack_require__(28);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var _shapesRect = __webpack_require__(34);
	
	var _shapesRect2 = _interopRequireDefault(_shapesRect);
	
	var _shapesLabel = __webpack_require__(43);
	
	var _shapesLabel2 = _interopRequireDefault(_shapesLabel);
	
	var _shapesConnector = __webpack_require__(51);
	
	var _shapesConnector2 = _interopRequireDefault(_shapesConnector);
	
	var Renderer = _libBase2['default'].extend({
	
	    Statics: {
	        shapes: {},
	        getShape: function getShape(name) {
	            return Renderer.shapes[name];
	        },
	        registerShape: function registerShape(key, shape) {
	            Renderer.shapes[key] = shape;
	        }
	    },
	
	    defaultNodeShape: _shapesRect2['default'],
	    defaultLinkShape: _shapesConnector2['default'],
	    defaultLabelShape: _shapesLabel2['default'],
	
	    constructor: function Renderer() {},
	
	    getShape: function getShape(shapeName) {
	        return shapeName ? Renderer.getShape(shapeName) : null;
	    },
	
	    getLabelBounds: function getLabelBounds(state) {
	
	        var that = this;
	        var graph = state.view.graph;
	        var scale = state.view.scale;
	        var style = state.style;
	        var isLink = state.cell.isLink;
	        var bounds = new _libRectangle2['default'](state.absoluteOffset.x, state.absoluteOffset.y);
	        var inverted = state.label.isPaintBoundsInverted();
	
	        if (isLink) {
	            var spacing = state.label.getSpacing();
	            bounds.x += spacing.x * scale;
	            bounds.y += spacing.y * scale;
	
	            var geo = graph.getCellGeometry(state.cell);
	
	            if (geo) {
	                bounds.width = Math.max(0, geo.width * scale);
	                bounds.height = Math.max(0, geo.height * scale);
	            }
	        } else {
	            if (inverted) {
	                var temp = bounds.x;
	                bounds.x = bounds.y;
	                bounds.y = temp;
	            }
	
	            bounds.x += state.x;
	            bounds.y += state.y;
	            bounds.width = Math.max(1, state.width);
	            bounds.height = Math.max(1, state.height);
	
	            // 减去外边框
	            var strokeWidth = (0, _commonUtils.getCurrentStyle)(state.shape.node).strokeWidth;
	            strokeWidth = strokeWidth ? parseFloat(strokeWidth) : 0;
	            if (strokeWidth) {
	                bounds.grow(Math.max(strokeWidth, 1) * scale);
	            }
	        }
	
	        if (inverted) {
	            // Rotates around center of state
	            var t = (state.width - state.height) / 2;
	            var w = bounds.width;
	            var h = bounds.height;
	
	            bounds.x += t;
	            bounds.y -= t;
	            bounds.width = h;
	            bounds.height = w;
	        }
	
	        // shape can modify its label bounds
	        if (state.shape) {
	            bounds = state.shape.getLabelBounds(bounds);
	        }
	
	        // label width style overrides actual label width
	        var labelWidth = style.labelWidth;
	        if (labelWidth) {
	            bounds.width = labelWidth * scale;
	        }
	
	        if (!isLink) {
	            that.rotateLabelBounds(state, bounds);
	        }
	
	        return bounds;
	    },
	
	    rotateLabelBounds: function rotateLabelBounds(state, bounds) {
	
	        var label = state.label;
	        var overflow = label.overflow;
	
	        bounds.x -= label.alignments.x * bounds.width;
	        bounds.y -= label.alignments.y * bounds.height;
	
	        if (overflow !== 'fill' && overflow !== 'width') {
	            var scale = state.view.scale;
	            var spacing = label.getSpacing();
	
	            bounds.x += spacing.x * scale;
	            bounds.y += spacing.y * scale;
	
	            if (label.position === 'center') {
	                spacing = label.spacing;
	
	                bounds.width = Math.max(0, bounds.width - (spacing[1] + spacing[3]) * scale);
	                bounds.height = Math.max(0, bounds.height - (spacing[0] + spacing[2]) * scale);
	            }
	        }
	
	        var theta = state.label.getRotation();
	
	        // Only needed if rotated around another center
	        if (theta && state && state.cell.isNode) {
	            var center = state.getCenter();
	            if (bounds.x !== center.x || bounds.y !== center.y) {
	                var p = (0, _commonUtils.rotatePoint)(new Point(bounds.x, bounds.y), theta, center);
	                bounds.x = p.x;
	                bounds.y = p.y;
	            }
	        }
	    },
	
	    // try to create state's shape after the state be created
	    createShape: function createShape(state) {
	
	        var that = this;
	
	        if (state.style) {
	
	            var Constructor = that.getShape(state.style.shape);
	
	            if (!Constructor) {
	                Constructor = state.cell.isLink ? that.defaultLinkShape : state.cell.isNode ? that.defaultNodeShape : null;
	            }
	
	            if (Constructor) {
	                state.shape = new Constructor(state, state.style);
	            }
	        }
	
	        return that;
	    },
	
	    createLabel: function createLabel(state, bounds) {
	
	        var that = this;
	        var style = state.style.label;
	
	        if (style) {
	            var Constructor = that.getShape(style.shape) || that.defaultLabelShape;
	            state.label = new Constructor(state, style, bounds);
	        }
	    },
	
	    createIndicator: function createIndicator(state) {
	
	        var that = this;
	        var shapeName = state.view.graph.getIndicatorShape(state);
	
	        state.shape.indicatorShape = that.getShape(shapeName);
	
	        return that;
	    },
	
	    createOverlays: function createOverlays() {},
	
	    createControl: function createControl() {},
	
	    appendShape: function appendShape(state) {
	        state.shape.init(state.view.drawPane);
	        return this;
	    },
	
	    redraw: function redraw(state, force, rendering) {
	
	        var that = this;
	        // 处理 force, 检查样式是否更新，因为下面就更新样式了
	        var shapeChanged = that.redrawShape(state, force, rendering);
	
	        if (state.shape && rendering) {
	            that.redrawLabel(state, shapeChanged);
	            that.redrawOverlays(state, shapeChanged);
	            that.redrawControl(state, shapeChanged);
	        }
	    },
	
	    redrawShape: function redrawShape(state, force, rendering) {
	
	        var that = this;
	        var shape = state.shape;
	        var shapeChanged = false;
	
	        if (shape) {
	            if (!shape.node) {
	                that.createIndicator(state);
	                that.appendShape(state);
	                that.createOverlays(state);
	                that.installListeners(state);
	            }
	
	            // Handles changes of the collapse icon
	            that.createControl(state);
	
	            // 检查样式是否有更新
	            //if (!mxUtils.equalEntries(state.shape.style, state.style)) {
	            //    this.configureShape(state);
	            //    force = true;
	            //}
	
	            // Redraws the cell if required, ignores changes to bounds if points are
	            // defined as the bounds are updated for the given points inside the shape
	            if (force || !shape.bounds || shape.scale !== state.view.scale || !state.absolutePoints && !state.equalToBounds(shape.bounds) || state.absolutePoints && !utils.equalPoints(state.shape.points, state.absolutePoints)) {
	
	                if (state.absolutePoints) {
	                    // 绘制连线
	                    shape.points = state.absolutePoints.slice();
	                    shape.bounds = null;
	                } else {
	                    // 绘制节点
	                    shape.points = null;
	                    // 初始化节点的 bounds
	                    shape.bounds = new _libRectangle2['default'](state.x, state.y, state.width, state.height);
	                }
	
	                //shape.scale = state.view.scale;
	
	                if (rendering) {
	                    shape.redraw();
	                } else {
	                    shape.updateBoundingBox();
	                }
	
	                shapeChanged = true;
	            }
	        }
	
	        return shapeChanged;
	    },
	
	    redrawLabel: function redrawLabel(state, forced) {
	
	        var that = this;
	        var content = state.view.graph.getCellLabel(state.cell);
	
	        if (!state.label && content) {
	            that.createLabel(state, bounds);
	            var bounds = that.getLabelBounds(state);
	            state.label.bounds = bounds;
	        } else if (state.label && !content) {
	            state.label.destroy();
	            state.label = null;
	        }
	
	        if (state.label) {
	
	            var label = state.label;
	
	            if (forced || label.content !== content) {
	                label.content = content;
	                label.redraw();
	            }
	        }
	    },
	
	    redrawOverlays: function redrawOverlays() {},
	
	    redrawControl: function redrawControl() {},
	
	    installListeners: function installListeners() {}
	});
	
	// 注册图形
	var registerShape = Renderer.registerShape;
	
	registerShape('rectangle', _shapesRect2['default']);
	registerShape('connector', _shapesConnector2['default']);
	registerShape('label', _shapesLabel2['default']);
	
	exports['default'] = Renderer;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Shape = __webpack_require__(35);
	
	var _Shape2 = _interopRequireDefault(_Shape);
	
	exports['default'] = _Shape2['default'].extend({
	
	    constructor: function Rect(state, style, bounds) {
	        Rect.superclass.constructor.call(this, state, style, bounds);
	    },
	
	    drawNodeBackground: function drawNodeBackground(canvas, x, y, w, h) {
	
	        var that = this;
	        var style = that.style;
	
	        if (style.round) {
	            var r = Math.min(w, h) * style.round;
	            canvas.drawRect(x, y, w, h, r, r);
	        } else {
	            canvas.drawRect(x, y, w, h);
	        }
	
	        canvas.addNode(true, true);
	
	        return that;
	    },
	
	    drawNodeForeground: function drawNodeForeground(c, x, y, w, h) {
	
	        var that = this;
	
	        if (that.glass && !that.outline) {
	            that.paintGlassEffect(c, x, y, w, h, that.getArcSize(w + that.strokewidth, h + that.strokewidth));
	        }
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _drawingCanvas = __webpack_require__(36);
	
	var _drawingCanvas2 = _interopRequireDefault(_drawingCanvas);
	
	var _libPoint = __webpack_require__(24);
	
	var _libPoint2 = _interopRequireDefault(_libPoint);
	
	var _libRectangle = __webpack_require__(28);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var _commonDetector = __webpack_require__(9);
	
	var _commonDetector2 = _interopRequireDefault(_commonDetector);
	
	var _enumsStyleNames = __webpack_require__(18);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _enumsDirections = __webpack_require__(42);
	
	var _enumsDirections2 = _interopRequireDefault(_enumsDirections);
	
	var Shape = _libBase2['default'].extend({
	
	    pointerEvents: true,
	    svgPointerEvents: 'all',
	    svgStrokeTolerance: 8,
	    shapePointerEvents: false,
	    stencilPointerEvents: false,
	
	    constructor: function Shape(state, style, bounds) {
	
	        var that = this;
	        that.state = state;
	        that.style = style;
	        that.bounds = bounds;
	
	        // props
	        // -----
	        // that.node = null;        // 图形的根节点，通常是 g 元素
	        // that.points = null;      // 绘制连线需要的点
	        // that.bounds = null;      // 表示该图形的区域范围
	        // that.boundingBox = null; // 图形的边框
	    },
	
	    init: function init(container) {
	
	        var that = this;
	        var node = that.node || that.create(container);
	
	        if (node && container) {
	            that.node = node;
	            container.appendChild(node);
	        }
	
	        return that;
	    },
	
	    // create the root node
	    create: function create(container) {
	        if (container && container.ownerSVGElement) {
	            return (0, _commonUtils.createSvgElement)('g');
	        }
	    },
	
	    clear: function clear() {
	
	        var that = this;
	        var node = that.node;
	
	        if (node && node.ownerDocument) {
	            while (node.lastChild) {
	                node.removeChild(node.lastChild);
	            }
	        }
	
	        return that;
	    },
	
	    //getScreenOffset: function () {
	    //
	    //    var style = this.style;
	    //    var strokeWidth = style.strokeWidth * style.scale;
	    //
	    //    strokeWidth = Math.max(1, Math.round(strokeWidth));
	    //
	    //    return mod(strokeWidth, 2) === 1 ? 0.5 : 0;
	    //},
	
	    redraw: function redraw() {
	
	        var that = this;
	        var node = that.node;
	        var style = that.style;
	
	        that.updateLinkBounds();
	
	        if (style.visible && that.checkBounds()) {
	            node.style.visibility = 'visible';
	            that.clear();
	            that.redrawShape();
	            that.updateBoundingBox();
	        } else {
	            node.style.visibility = 'hidden';
	            that.boundingBox = null;
	        }
	
	        return that;
	    },
	
	    redrawShape: function redrawShape() {
	
	        var that = this;
	        var canvas = that.createCanvas();
	
	        if (canvas) {
	            canvas.pointerEvents = that.pointerEvents;
	
	            that.draw(canvas);
	            that.destroyCanvas(canvas);
	        }
	
	        return that;
	    },
	
	    draw: function draw(canvas) {
	
	        var that = this;
	        var bounds = that.bounds;
	        var scale = that.style.scale;
	        var x = bounds.x / scale;
	        var y = bounds.y / scale;
	        var w = bounds.width / scale;
	        var h = bounds.height / scale;
	
	        if (that.isPaintBoundsInverted()) {
	
	            var t = (w - h) / 2;
	            x += t;
	            y -= t;
	
	            t = w;
	            w = h;
	            h = t;
	        }
	
	        //that.updateTransform(canvas, x, y, w, h);
	        //that.configureCanvas(canvas, x, y, w, h);
	
	        // Adds background rectangle to capture events
	        var bg = null;
	
	        if (!that.points && that.shapePointerEvents) {
	
	            var bb = that.createBoundingBox();
	
	            bg = that.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
	            that.node.appendChild(bg);
	        }
	
	        if (that.points) {
	
	            var pts = [];
	            for (var i = 0; i < that.points.length; i++) {
	                if (that.points[i]) {
	                    pts.push(new _libPoint2['default'](that.points[i].x / scale, that.points[i].y / scale));
	                }
	            }
	
	            // 绘制连线
	            that.drawLink(canvas, pts);
	        } else {
	            // 绘制节点
	            that.drawNode(canvas, x, y, w, h);
	        }
	
	        if (bg && canvas.state && canvas.state.transform) {
	            bg.setAttribute('transform', canvas.state.transform);
	        }
	    },
	
	    drawNode: function drawNode(canvas, x, y, w, h) {
	        this.drawNodeBackground(canvas, x, y, w, h);
	        canvas.style.shadow = false;
	        this.drawNodeForeground(canvas, x, y, w, h);
	    },
	
	    // 绘制 node 背景
	    drawNodeBackground: function drawNodeBackground(canvas, x, y, w, h) {},
	
	    // 绘制 node 前景
	    drawNodeForeground: function drawNodeForeground(canvas, x, y, w, h) {},
	
	    drawLink: function drawLink(canvas, points) {},
	
	    paintGlassEffect: function paintGlassEffect(canvas, x, y, w, h, arc) {
	        var sw = Math.ceil(this.strokeWidth / 2);
	        var size = 0.4;
	
	        canvas.setGradient('#ffffff', '#ffffff', x, y, w, h * 0.6, 'south', 0.9, 0.1);
	        canvas.begin();
	        arc += 2 * sw;
	
	        if (this.isRounded) {
	            canvas.moveTo(x - sw + arc, y - sw);
	            canvas.quadTo(x - sw, y - sw, x - sw, y - sw + arc);
	            canvas.lineTo(x - sw, y + h * size);
	            canvas.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
	            canvas.lineTo(x + w + sw, y - sw + arc);
	            canvas.quadTo(x + w + sw, y - sw, x + w + sw - arc, y - sw);
	        } else {
	            canvas.moveTo(x - sw, y - sw);
	            canvas.lineTo(x - sw, y + h * size);
	            canvas.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
	            canvas.lineTo(x + w + sw, y - sw);
	        }
	
	        canvas.close();
	        canvas.fill();
	    },
	
	    addPoints: function addPoints(canvas, pts, rounded, arcSize, close) {
	
	        var lastPoint = pts[pts.length - 1];
	
	        // Adds virtual waypoint in the center between start and end point
	        if (close && rounded) {
	            pts = pts.slice();
	            var p0 = pts[0];
	            var wp = new _libPoint2['default'](lastPoint.x + (p0.x - lastPoint.x) / 2, lastPoint.y + (p0.y - lastPoint.y) / 2);
	            pts.splice(0, 0, wp);
	        }
	
	        var firstPoint = pts[0];
	        var i = 1;
	
	        // Draws the line segments
	        canvas.moveTo(firstPoint.x, firstPoint.y);
	
	        while (i < (close ? pts.length : pts.length - 1)) {
	            var tmp = pts[(0, _commonUtils.mod)(i, pts.length)];
	            var dx = firstPoint.x - tmp.x;
	            var dy = firstPoint.y - tmp.y;
	
	            if (rounded && (dx != 0 || dy != 0)) {
	                // Draws a line from the last point to the current
	                // point with a spacing of size off the current point
	                // into direction of the last point
	                var dist = Math.sqrt(dx * dx + dy * dy);
	                var nx1 = dx * Math.min(arcSize, dist / 2) / dist;
	                var ny1 = dy * Math.min(arcSize, dist / 2) / dist;
	
	                var x1 = tmp.x + nx1;
	                var y1 = tmp.y + ny1;
	                canvas.lineTo(x1, y1);
	
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
	
	                canvas.quadTo(tmp.x, tmp.y, x2, y2);
	                tmp = new _libPoint2['default'](x2, y2);
	            } else {
	                canvas.lineTo(tmp.x, tmp.y);
	            }
	
	            firstPoint = tmp;
	            i++;
	        }
	
	        if (close) {
	            canvas.close();
	        } else {
	            canvas.lineTo(lastPoint.x, lastPoint.y);
	        }
	    },
	
	    checkBounds: function checkBounds() {
	
	        var bounds = this.bounds;
	
	        return bounds && !isNaN(bounds.x) && !isNaN(bounds.y) && !isNaN(bounds.width) && !isNaN(bounds.height) && bounds.width > 0 && bounds.height > 0;
	    },
	
	    updateLinkBounds: function updateLinkBounds() {
	
	        var that = this;
	        var points = that.points;
	        var bounds;
	
	        points && (0, _commonUtils.each)(points, function (point, index) {
	
	            var rect = new _libRectangle2['default'](point.x, point.y, 1, 1);
	
	            if (bounds) {
	                bounds.add(rect);
	            } else {
	                that.bounds = bounds = rect;
	            }
	        });
	
	        return that;
	    },
	
	    // 可以更改内部 label 的 bounds
	    getLabelBounds: function getLabelBounds(rect) {
	        return rect;
	    },
	
	    getGradientBounds: function getGradientBounds(canvas, x, y, w, h) {
	        return new _libRectangle2['default'](x, y, w, h);
	    },
	
	    // 圆弧尺寸
	    getArcSize: function getArcSize(w, h) {
	        var f = (0, _commonUtils.getValue)(this.style, constants.STYLE_ARCSIZE, constants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
	        return Math.min(w * f, h * f);
	    },
	
	    createBoundingBox: function createBoundingBox() {
	
	        var that = this;
	        var bbox = that.bounds.clone();
	
	        if (that.isPaintBoundsInverted()) {
	            bbox.rotate90();
	        }
	
	        return bbox;
	    },
	
	    updateBoundingBox: function updateBoundingBox() {
	
	        var that = this;
	
	        if (that.bounds) {
	            var boundingBox = that.createBoundingBox();
	
	            if (boundingBox) {
	                that.augmentBoundingBox(boundingBox).rotateBoundingBox(boundingBox, that.getRotation());
	            }
	
	            that.boundingBox = boundingBox;
	        }
	    },
	
	    augmentBoundingBox: function augmentBoundingBox(bbox) {
	
	        var that = this;
	        var style = that.style;
	        var scale = style.scale;
	
	        if (style.shadow) {
	            bbox.width += Math.ceil(style.shadowDx * scale);
	            bbox.height += Math.ceil(style.shadowDY * scale);
	        }
	
	        // Adds strokeWidth
	        bbox.grow(style.strokeWidth * scale / 2);
	
	        return that;
	    },
	
	    rotateBoundingBox: function rotateBoundingBox(bbox, degree, center) {
	
	        if (bbox && degree) {
	
	            center = center || bbox.getCenter();
	
	            var p1 = new _libPoint2['default'](bbox.x, bbox.y);
	            var p2 = new _libPoint2['default'](bbox.x + bbox.width, bbox.y);
	            var p3 = new _libPoint2['default'](p2.x, bbox.y + bbox.height);
	            var p4 = new _libPoint2['default'](bbox.x, p3.y);
	
	            p1 = (0, _commonUtils.rotatePoint)(p1, degree, center);
	            p2 = (0, _commonUtils.rotatePoint)(p2, degree, center);
	            p3 = (0, _commonUtils.rotatePoint)(p3, degree, center);
	            p4 = (0, _commonUtils.rotatePoint)(p4, degree, center);
	
	            var result = new _libRectangle2['default'](p1.x, p1.y, 0, 0);
	            result.add(new _libRectangle2['default'](p2.x, p2.y, 0, 0));
	            result.add(new _libRectangle2['default'](p3.x, p3.y, 0, 0));
	            result.add(new _libRectangle2['default'](p4.x, p4.y, 0, 0));
	
	            bbox.setRect(result.x, result.y, result.width, result.height);
	        }
	
	        return this;
	    },
	
	    updateTransform: function updateTransform(canvas, x, y, w, h) {
	
	        var shape = this;
	
	        canvas.scale(shape.scale);
	        canvas.rotate(shape.getShapeRotation(), shape.flipH, shape.flipV, x + w / 2, y + h / 2);
	
	        return shape;
	    },
	
	    createCanvas: function createCanvas() {
	
	        var that = this;
	        var canvas = new _drawingCanvas2['default'](that.node, that.style);
	
	        canvas.strokeTolerance = that.pointerEvents ? that.svgStrokeTolerance : 0;
	        canvas.pointerEventsValue = that.svgPointerEvents;
	        canvas.blockImagePointerEvents = _commonDetector2['default'].IS_FF;
	        //canvas.antiAlias = that.antiAlias; // renderer.antiAlias -> shape.antiAlias -> canvas.antiAlias
	
	        //var off = that.getScreenOffset();
	        //
	        //if (off === 0) {
	        //    node.removeAttribute('transform');
	        //} else {
	        //    node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
	        //}
	
	        //if (that.outline) {
	        //    canvas.setStrokeWidth(this.strokeWidth);
	        //    canvas.setStrokeColor(this.stroke);
	        //
	        //    if (this.isDashed !== null) {
	        //        canvas.setDashed(this.isDashed);
	        //    }
	        //
	        //    canvas.setStrokeWidth = function () {};
	        //    canvas.setStrokeColor = function () {};
	        //    canvas.setFillColor = function () {};
	        //    canvas.setGradient = function () {};
	        //    canvas.setDashed = function () {};
	        //}
	
	        return canvas;
	    },
	
	    configureCanvas: function configureCanvas(canvas, x, y, w, h) {
	
	        return;
	
	        canvas.state = this.style;
	
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
	        } else {
	            canvas.setFillColor(this.fill);
	        }
	
	        canvas.setStrokeColor(this.stroke);
	    },
	
	    destroyCanvas: function destroyCanvas(canvas) {
	
	        //each(canvas.gradients, function (gradient) {
	        //    gradient.mxRefCount = (gradient.mxRefCount || 0) + 1;
	        //});
	        //this.releaseSvgGradients(this.oldGradients);
	        //this.oldGradients = canvas.gradients;
	    },
	
	    setCursor: function setCursor(cursor) {
	
	        var that = this;
	        var node = that.node;
	
	        cursor = cursor || '';
	
	        that.cursor = cursor;
	
	        if (node) {
	            node.style.cursor = cursor;
	        }
	
	        return that;
	    },
	
	    getRotation: function getRotation() {
	
	        var style = this.style;
	        var rot = style.rotation || 0;
	        var direction = style.direction;
	
	        if (direction) {
	            if (direction === 'north') {
	                rot += 270;
	            } else if (direction === 'west') {
	                rot += 180;
	            } else if (direction === 'south') {
	                rot += 90;
	            }
	        }
	
	        return rot;
	    },
	
	    createTransparentSvgRectangle: function createTransparentSvgRectangle(x, y, w, h) {
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
	
	    setTransparentBackgroundImage: function setTransparentBackgroundImage(node) {
	        node.style.backgroundImage = 'url(\'' + mxClient.imageBasePath + '/transparent.gif\')';
	    },
	
	    releaseSvgGradients: function releaseSvgGradients(grads) {
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
	
	    isPaintBoundsInverted: function isPaintBoundsInverted() {
	        var direction = this.style.direction;
	        return direction === 'north' || direction === 'south';
	    },
	
	    destroy: function destroy() {
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
	
	exports['default'] = Shape;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _Path = __webpack_require__(37);
	
	var _Path2 = _interopRequireDefault(_Path);
	
	var _Pen = __webpack_require__(38);
	
	var _Pen2 = _interopRequireDefault(_Pen);
	
	var _SolidBrush = __webpack_require__(39);
	
	var _SolidBrush2 = _interopRequireDefault(_SolidBrush);
	
	var _LinearGradientBrush = __webpack_require__(41);
	
	var _LinearGradientBrush2 = _interopRequireDefault(_LinearGradientBrush);
	
	exports['default'] = _libBase2['default'].extend({
	
	    constructor: function Canvas(root, style) {
	
	        var that = this;
	
	        that.root = root;
	        that.style = style;
	        that.format = style.antiAlias ? function (value) {
	            return (0, _commonUtils.toFixed)(value, 2);
	        } : function (value) {
	            return Math.round(value);
	        };
	    },
	
	    // Draw
	    // ----
	
	    createElement: function createElement(tagName, namespace) {
	        return (0, _commonUtils.createSvgElement)(tagName, this.root.ownerDocument, namespace);
	    },
	
	    drawPath: function drawPath() {
	
	        var that = this;
	        var path = new _Path2['default'](that);
	
	        that.node = that.createElement('path');
	        that.path = path;
	
	        return path;
	    },
	
	    drawRect: function drawRect(x, y, w, h, rx, ry) {
	
	        var that = this;
	        var style = that.style;
	        var scale = style.scale;
	        var format = that.format.bind(that);
	        var node = that.createElement('rect');
	
	        node.setAttribute('x', format((x + style.dx) * scale));
	        node.setAttribute('y', format((y + style.dy) * scale));
	        node.setAttribute('width', format(w * scale));
	        node.setAttribute('height', format(h * scale));
	
	        if (rx > 0) {
	            node.setAttribute('rx', format(rx * scale));
	        }
	
	        if (ry > 0) {
	            node.setAttribute('ry', format(ry * scale));
	        }
	
	        that.node = node;
	
	        return that;
	    },
	
	    drawEllipse: function drawEllipse(x, y, w, h) {
	
	        var canvas = this;
	        var style = canvas.style;
	        var scale = style.scale;
	
	        var node = canvas.createElement('ellipse');
	
	        node.setAttribute('cx', Math.round((x + w / 2 + style.dx) * scale));
	        node.setAttribute('cy', Math.round((y + h / 2 + style.dy) * scale));
	        node.setAttribute('rx', w / 2 * scale);
	        node.setAttribute('ry', h / 2 * scale);
	
	        canvas.node = node;
	
	        return canvas;
	    },
	
	    drawImage: function drawImage() {},
	
	    drawString: function drawString(x, y, w, h, text) {
	
	        var that = this;
	        var node = that.createElement('g');
	        var style = that.style;
	        var scale = style.scale;
	        var align = style.align;
	        var vAlign = style.verticalAlign;
	        var fontSize = Math.round(style.fontSize);
	
	        if (fontSize) {
	            node.setAttribute('font-size', Math.round(fontSize * scale) + 'px');
	        }
	
	        if (style.fontColor) {
	            node.setAttribute('fill', style.fontColor);
	        }
	
	        if (style.fontFamily) {
	            node.setAttribute('font-family', style.fontFamily);
	        }
	
	        if (style.fontWeight) {
	            node.setAttribute('font-weight', style.fontWeight);
	        }
	
	        if (style.italic) {
	            node.setAttribute('font-style', 'italic');
	        }
	
	        if (style.textDecoration) {
	            node.setAttribute('text-decoration', style.textDecoration);
	        }
	
	        var anchor = align === 'right' ? 'end' : align === 'center' ? 'middle' : 'start';
	
	        if (anchor !== 'start') {
	            node.setAttribute('text-anchor', anchor);
	        }
	
	        if (style.opacity < 1) {
	            node.setAttribute('opacity', style.opacity);
	        }
	
	        //var lines = text.split('\n');
	        //var lineHeight = Math.round(style.lineHeight * fontSize);
	        //var totalHeight = lines.length * lineHeight;
	
	        var textNode = that.createElement('text');
	        textNode.setAttribute('x', 10);
	        textNode.setAttribute('y', 10);
	
	        (0, _commonUtils.write)(textNode, text);
	        node.appendChild(textNode);
	
	        that.root.appendChild(node);
	    },
	
	    addNode: function addNode(filled, stroked) {
	
	        var that = this;
	        var root = that.root;
	        var node = that.node;
	        var style = that.style;
	
	        if (node) {
	
	            var path = that.path;
	            if (path) {
	                path.flush();
	            }
	
	            // fill
	            if (style.fillColor && style.gradientColor) {
	                new _LinearGradientBrush2['default'](that).fill(filled);
	            } else {
	                new _SolidBrush2['default'](that).fill(filled);
	            }
	
	            // stroke
	            new _Pen2['default'](that).stroke(stroked);
	
	            // transform
	            var transform = style.transform;
	            if (transform && transform.length > 0) {
	                node.setAttribute('transform', transform);
	            }
	
	            // shadow
	            if (style.shadow) {
	                root.appendChild(that.createShadow(node));
	            }
	
	            // strokeTolerance
	            filled = filled && style.fillColor ? true : false;
	            if (that.strokeTolerance > 0 && !filled) {
	                root.appendChild(that.createTolerance(node));
	            }
	
	            // pointer events
	            if (that.pointerEvents && (!path || path.closed)) {
	                node.setAttribute('pointer-events', that.pointerEventsValue);
	            } else if (!that.pointerEvents && !that.originalRoot) {
	                node.setAttribute('pointer-events', 'none');
	            }
	
	            root.appendChild(node);
	        }
	
	        return that;
	    },
	
	    createShadow: function createShadow(node) {
	
	        var that = this;
	        var style = that.style;
	        var shadow = node.cloneNode(true);
	
	        if (shadow.getAttribute('fill') !== 'none') {
	            shadow.setAttribute('fill', style.shadowColor);
	        }
	
	        if (shadow.getAttribute('stroke') !== 'none') {
	            shadow.setAttribute('stroke', style.shadowColor);
	        }
	
	        shadow.setAttribute('transform', 'translate(' + that.format(style.shadowDx * style.scale) + ',' + this.format(style.shadowDy * style.scale) + ')' + (style.transform || ''));
	        shadow.setAttribute('opacity', style.shadowAlpha);
	
	        return shadow;
	    },
	
	    createTolerance: function createTolerance(node) {
	
	        var ele = node.cloneNode(true);
	        var sw = parseFloat(ele.getAttribute('stroke-width') || 1) + this.strokeTolerance;
	        ele.setAttribute('pointer-events', 'stroke');
	        ele.setAttribute('visibility', 'hidden');
	        ele.setAttribute('stroke-width', sw);
	        ele.setAttribute('fill', 'none');
	        ele.setAttribute('stroke', 'white');
	        ele.removeAttribute('stroke-dasharray');
	
	        return ele;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function Path(canvas) {
	
	        var that = this;
	        that.canvas = canvas;
	        that.lastX = 0;
	        that.lastY = 0;
	        that.paths = [];
	    },
	
	    addOp: function addOp() {
	
	        var that = this;
	        var paths = that.paths;
	        var canvas = that.canvas;
	        var format = canvas.format;
	        var style = canvas.style;
	        var scale = style.scale;
	        var length = arguments.length;
	
	        if (paths) {
	            paths.push(arguments[0]);
	
	            if (length > 2) {
	                for (var i = 2; i < length; i += 2) {
	                    that.lastX = arguments[i - 1];
	                    that.lastY = arguments[i];
	
	                    paths.push(format((that.lastX + style.dx) * scale));
	                    paths.push(format((that.lastY + style.dy) * scale));
	                }
	            }
	        }
	
	        return that;
	    },
	
	    moveTo: function moveTo(x, y) {
	        return this.addOp('M', x, y);
	    },
	
	    lineTo: function lineTo(x, y) {
	        return this.addOp('L', x, y);
	    },
	
	    // 二次贝塞尔曲线
	    quadTo: function quadTo(x1, y1, x2, y2) {
	        return this.addOp('Q', x1, y1, x2, y2);
	    },
	
	    // 三次贝塞尔曲线
	    curveTo: function curveTo(x1, y1, x2, y2, x3, y3) {
	        return this.addOp('C', x1, y1, x2, y2, x3, y3);
	    },
	
	    // 圆弧
	    arcTo: function arcTo() /*rx, ry, angle, largeArcFlag, sweepFlag, x, y*/{},
	
	    close: function close() {
	
	        var that = this;
	
	        that.addOp('Z');
	        that.closed = true;
	        //that.canvas.node.setAttribute('d', paths.join(' '));
	
	        return that.canvas; // 链式调用
	    },
	
	    flush: function flush() {
	        var that = this;
	        that.canvas.node.setAttribute('d', that.paths.join(' '));
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	
	    // 创建一个描边画笔的实例
	    constructor: function Pen(canvas) {
	        this.canvas = canvas;
	    },
	
	    stroke: function stroke(stroked) {
	
	        var that = this;
	        var canvas = that.canvas;
	        var style = canvas.style;
	        var node = canvas.node;
	
	        if (stroked && style.strokeColor) {
	
	            node.setAttribute('stroke', style.strokeColor.toLowerCase());
	
	            if (style.alpha < 1) {
	                node.setAttribute('stroke-opacity', style.alpha);
	            }
	
	            var strokeWidth = style.strokeWidth * style.scale;
	            var fixedStrokeWidth = Math.max(1, strokeWidth);
	
	            if (fixedStrokeWidth !== 1) {
	                node.setAttribute('stroke-width', fixedStrokeWidth);
	            }
	
	            // 更新路径样式
	            if (node.nodeName.toLowerCase() === 'path') {
	
	                // lineJoin
	                var lineJoin = style.lineJoin;
	                // 'miter' is default in SVG
	                if (lineJoin && lineJoin !== 'miter') {
	                    node.setAttribute('stroke-linejoin', lineJoin);
	                }
	
	                // lineCap
	                var lineCap = style.lineCap;
	                // 'butt' is default in SVG
	                if (lineCap && lineCap !== 'butt') {
	                    node.setAttribute('stroke-linecap', lineCap);
	                }
	
	                // miterLimit
	                var miterLimit = style.miterLimit;
	                // 10 is default in our document
	                if (miterLimit && miterLimit !== 10) {
	                    this.node.setAttribute('stroke-miterlimit', miterLimit);
	                }
	            }
	
	            if (style.dashed) {
	
	                // dashPattern
	                var dashPattern = style.dashPattern;
	                var dash = ('' + dashPattern).split(' ');
	                var pattern = (0, _commonUtils.map)(dash, function (pat) {
	                    return pat * strokeWidth;
	                });
	
	                node.setAttribute('stroke-dasharray', pattern.join(' '));
	
	                // dashOffset
	                var dashOffset = style.dashOffset;
	                if (dashOffset) {
	                    node.setAttribute('stroke-dashoffset', dashOffset);
	                }
	            }
	        } else {
	            node.setAttribute('stroke', 'none');
	        }
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Brush = __webpack_require__(40);
	
	var _Brush2 = _interopRequireDefault(_Brush);
	
	exports['default'] = _Brush2['default'].extend({
	
	    constructor: function SolidBrush(canvas) {
	        SolidBrush.superclass.constructor.call(this, canvas);
	    },
	
	    doFill: function doFill() {
	
	        var that = this;
	        var canvas = that.canvas;
	        var style = canvas.style;
	        var node = canvas.node;
	
	        var fillColor = style.fillColor;
	
	        if (fillColor) {
	            node.setAttribute('fill', fillColor.toLowerCase());
	        }
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	
	    constructor: function Brush(canvas) {
	        this.canvas = canvas;
	    },
	
	    fill: function fill(filled) {
	
	        var that = this;
	        var canvas = that.canvas;
	        var style = canvas.style;
	        var node = canvas.node;
	
	        if (filled) {
	
	            if (style.alpha < 1) {
	                node.setAttribute('fill-opacity', style.alpha);
	            }
	
	            that.doFill();
	        } else {
	            node.setAttribute('fill', 'none');
	        }
	
	        return that;
	    },
	
	    doFill: function doFill() {
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Brush = __webpack_require__(40);
	
	var _Brush2 = _interopRequireDefault(_Brush);
	
	var _enumsDirections = __webpack_require__(42);
	
	var _enumsDirections2 = _interopRequireDefault(_enumsDirections);
	
	var LinearGradientBrush = _Brush2['default'].extend({
	
	    gradients: {},
	
	    constructor: function LinearGradientBrush(canvas) {
	        LinearGradientBrush.superclass.constructor.call(this, canvas);
	    },
	
	    createGradientId: function createGradientId(start, end, alpha1, alpha2, direction) {
	
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
	
	        var dir = '';
	
	        if (!direction || direction === _enumsDirections2['default'].south) {
	            dir = 's'; // 从上到下
	        } else if (direction === _enumsDirections2['default'].east) {
	                dir = 'e'; // 从左到右
	            } else {
	                    var tmp = start;
	                    start = end;
	                    end = tmp;
	
	                    if (direction === _enumsDirections2['default'].north) {
	                        dir = 's'; // 从下到上
	                    } else if (direction === _enumsDirections2['default'].west) {
	                            dir = 'e'; // 从右到左
	                        }
	                }
	
	        return 'gradient-' + start + '-' + end + '-' + dir;
	    },
	
	    createGradient: function createGradient(start, end, alpha1, alpha2, direction) {
	
	        var root = this.canvas.root;
	        var gradient = (0, _commonUtils.createSvgElement)('linearGradient', root);
	
	        gradient.setAttribute('x1', '0%');
	        gradient.setAttribute('y1', '0%');
	        gradient.setAttribute('x2', '0%');
	        gradient.setAttribute('y2', '0%');
	
	        if (!direction || direction === _enumsDirections2['default'].south) {
	            gradient.setAttribute('y2', '100%');
	        } else if (direction === _enumsDirections2['default'].east) {
	            gradient.setAttribute('x2', '100%');
	        } else if (direction === _enumsDirections2['default'].north) {
	            gradient.setAttribute('y1', '100%');
	        } else if (direction === _enumsDirections2['default'].west) {
	            gradient.setAttribute('x1', '100%');
	        }
	
	        var op = alpha1 < 1 ? ';stop-opacity:' + alpha1 : '';
	
	        var stop = (0, _commonUtils.createSvgElement)('stop', root);
	        stop.setAttribute('offset', '0%');
	        stop.setAttribute('style', 'stop-color:' + start + op);
	        gradient.appendChild(stop);
	
	        op = alpha2 < 1 ? ';stop-opacity:' + alpha2 : '';
	
	        stop = (0, _commonUtils.createSvgElement)('stop', root);
	        stop.setAttribute('offset', '100%');
	        stop.setAttribute('style', 'stop-color:' + end + op);
	        gradient.appendChild(stop);
	
	        return gradient;
	    },
	
	    getGradient: function getGradient(start, end, alpha1, alpha2, direction) {
	
	        var that = this;
	        var id = that.createGradientId(start, end, alpha1, alpha2, direction);
	        var gradients = LinearGradientBrush.gradients;
	        var gradient = gradients[id];
	
	        if (!gradient) {
	
	            var root = that.canvas.root;
	            var svg = root.ownerSVGElement;
	            var doc = svg.ownerDocument;
	
	            var counter = 0;
	            var tmpId = id + '-' + counter;
	
	            gradient = doc.getElementById(tmpId);
	            while (gradient && gradient.ownerSVGElement !== svg) {
	                tmpId = id + '-' + counter++;
	                gradient = doc.getElementById(tmpId);
	            }
	
	            if (!gradient) {
	                gradient = that.createGradient(start, end, alpha1, alpha2, direction);
	                gradient.setAttribute('id', tmpId);
	
	                svg.appendChild(gradient);
	            }
	
	            gradients[id] = gradient;
	        }
	
	        return gradient.getAttribute('id');
	    },
	
	    doFill: function doFill() {
	
	        var that = this;
	        var canvas = that.canvas;
	        var style = canvas.style;
	        var node = canvas.node;
	        var fillColor = style.fillColor;
	        var gradientColor = style.gradientColor;
	
	        if (fillColor && gradientColor) {
	            var id = that.getGradient(fillColor, gradientColor, style.fillAlpha, style.gradientAlpha, style.gradientDirection);
	            var base = (0, _commonUtils.getBaseUrl)().replace(/([\(\)])/g, '\\$1');
	
	            node.setAttribute('fill', 'url(' + base + '#' + id + ')');
	        }
	
	        return that;
	    }
	});
	
	exports['default'] = LinearGradientBrush;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    north: 'north',
	    south: 'south',
	    east: 'east',
	    west: 'west'
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Shape = __webpack_require__(35);
	
	var _Shape2 = _interopRequireDefault(_Shape);
	
	exports['default'] = _Shape2['default'].extend({
	
	    constructor: function Label(state, style, bounds) {
	
	        var that = this;
	
	        Label.superclass.constructor.call(that, state, style, bounds);
	
	        // set visible from shape
	        style.visible = state.shape.style.visible;
	
	        that.parent = state.shape;
	        that.position = style.position || 'center';
	        that.align = style.align || 'center';
	        that.verticalAlign = style.verticalAlign || 'middle';
	        that.vertical = style.vertical || false;
	        that.overflow = style.overflow;
	
	        var spacing = style.spacing;
	
	        if ((0, _commonUtils.isArray)(spacing)) {
	
	            spacing = spacing.slice();
	
	            spacing[0] = !isNaN(spacing[0]) ? Math.round(spacing[0]) : 0;
	            spacing[1] = !isNaN(spacing[1]) ? Math.round(spacing[1]) : 0;
	            spacing[2] = !isNaN(spacing[2]) ? Math.round(spacing[2]) : 0;
	            spacing[3] = !isNaN(spacing[3]) ? Math.round(spacing[3]) : 0;
	
	            that.spacing = spacing;
	        } else {
	            spacing = !isNaN(spacing) ? Math.round(spacing) : 0;
	            that.spacing = [spacing, spacing, spacing, spacing];
	        }
	
	        that.updateAlignments().init(state.view.foreignPane);
	    },
	
	    create: function create(container) {
	
	        var that = this;
	        var doc = container && container.ownerDocument;
	        if (doc) {
	
	            var node = doc.createElement('div');
	            var bg = doc.createElement('div');
	            var content = doc.createElement('div');
	
	            node.className = 'pane-label';
	            bg.className = 'pane-label-bg';
	            content.className = 'pane-label-content';
	
	            node.appendChild(bg);
	            node.appendChild(content);
	
	            that.backgroundNode = bg;
	            that.contentNode = content;
	
	            bg.style.cssText = 'position:absolute; top:0; left:0; right:0; bottom:0;';
	            content.style.cssText = 'position:relative;';
	
	            return node;
	        }
	    },
	
	    clear: function clear() {
	
	        var that = this;
	        var node = that.contentNode;
	
	        if (node && node.ownerDocument) {
	            while (node.lastChild) {
	                node.removeChild(node.lastChild);
	            }
	        }
	
	        return that;
	    },
	
	    redrawShape: function redrawShape() {
	        return this.draw();
	    },
	
	    draw: function draw() {
	        var that = this;
	        var node = that.node;
	
	        // resets CSS styles
	        node.style.cssText = 'position:absolute; whiteSpace:normal;';
	
	        return that.updateValue().updateSize().updateTransform();
	    },
	
	    updateBoundingBox: function updateBoundingBox() {
	
	        var that = this;
	        var style = that.style;
	        var alignments = that.alignments;
	        var boundingBox = that.bounds.clone();
	
	        if (style.overflow !== 'fill') {
	
	            var scale = that.getScale();
	            var contentNode = that.contentNode;
	
	            var w = contentNode.offsetWidth * scale || 1;
	            var h = contentNode.offsetHeight * scale || 1;
	
	            boundingBox.x += alignments.x * w;
	            boundingBox.y += alignments.y * h;
	            boundingBox.width = w;
	            boundingBox.height = h;
	        } else {
	            boundingBox.x += that.alignments.x * boundingBox.width;
	            boundingBox.y += that.alignments.y * boundingBox.height;
	        }
	
	        that.rotateBoundingBox(boundingBox, that.getRotation());
	        that.boundingBox = boundingBox;
	
	        return that;
	    },
	
	    updateValue: function updateValue() {
	
	        var that = this;
	        var content = that.content;
	        var contentNode = that.contentNode;
	
	        if ((0, _commonUtils.isNode)(content)) {
	            contentNode.innerHTML = '';
	            contentNode.appendChild(content);
	        } else {
	            contentNode.innerHTML = content;
	        }
	
	        return that;
	    },
	
	    updateSize: function updateSize() {
	
	        var that = this;
	        var scale = that.getScale();
	        var w = Math.round(that.bounds.width / scale) + 'px';
	        var h = Math.round(that.bounds.height / scale) + 'px';
	
	        var style = that.node.style;
	        var overflow = that.overflow;
	
	        if (overflow === 'hidden') {
	            style.maxHeight = h;
	            style.maxWidth = w;
	        } else if (overflow === 'fill') {
	            style.width = w;
	            style.height = h;
	        } else if (overflow === 'width') {
	            style.width = w;
	            style.maxHeight = h;
	        } else {}
	
	        return that;
	    },
	
	    updateTransform: function updateTransform() {
	
	        var that = this;
	        var theta = that.getRotation();
	        var scale = that.parent.style.scale;
	        var style = that.node.style;
	        var bounds = that.bounds;
	        var dx = that.alignments.x * 100;
	        var dy = that.alignments.y * 100;
	
	        if (theta) {
	            (0, _commonUtils.setPrefixedStyle)(style, 'transformOrigin', -dx + '%' + ' ' + -dy + '%');
	            (0, _commonUtils.setPrefixedStyle)(style, 'transform', 'translate(' + dx + '%' + ',' + dy + '%)' + 'scale(' + scale + ') rotate(' + theta + 'deg)');
	        } else {
	            (0, _commonUtils.setPrefixedStyle)(style, 'transformOrigin', '0% 0%');
	            (0, _commonUtils.setPrefixedStyle)(style, 'transform', 'scale(' + scale + ')' + 'translate(' + dx + '%' + ',' + dy + '%)');
	        }
	
	        style.left = Math.round(bounds.x) + 'px';
	        style.top = Math.round(bounds.y) + 'px';
	
	        return that;
	    },
	
	    updateAlignments: function updateAlignments() {
	        var that = this;
	        that.alignments = (0, _commonUtils.getAlignments)(that.align, that.verticalAlign);
	        return that;
	    },
	
	    isPaintBoundsInverted: function isPaintBoundsInverted() {
	        return this.vertical;
	    },
	
	    getSpacing: function getSpacing() {
	
	        var that = this;
	
	        var dx = 0;
	        var dy = 0;
	        var align = that.align;
	        var vAlign = that.verticalAlign;
	        var spacing = that.spacing;
	
	        if (align === 'center') {
	            dx = (spacing[1] - spacing[3]) / 2;
	        } else if (align === 'right') {
	            dx = -spacing[1];
	        } else {
	            dx = spacing[3];
	        }
	
	        if (vAlign === 'middle') {
	            dy = (spacing[0] - spacing[2]) / 2;
	        } else if (vAlign === 'top') {
	            dy = -spacing[0];
	        } else {
	            dy = spacing[2];
	        }
	
	        return {
	            x: dx,
	            y: dy
	        };
	    },
	
	    getScale: function getScale() {
	        return this.parent.style.scale;
	    },
	
	    getRotation: function getRotation() {
	
	        var that = this;
	        var rot = that.parent.style.rotation || 0;
	
	        if (that.vertical) {
	            rot += that.style.verticalRotation;
	        }
	
	        return rot;
	    }
	
	});
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonClass = __webpack_require__(12);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _cellCell = __webpack_require__(26);
	
	var _cellCell2 = _interopRequireDefault(_cellCell);
	
	// events
	
	var _eventsAspect = __webpack_require__(45);
	
	var _eventsAspect2 = _interopRequireDefault(_eventsAspect);
	
	var _eventsEventNames = __webpack_require__(46);
	
	var _eventsEventNames2 = _interopRequireDefault(_eventsEventNames);
	
	var _eventsEventSource = __webpack_require__(13);
	
	var _eventsEventSource2 = _interopRequireDefault(_eventsEventSource);
	
	// changes
	
	var _changesRootChange = __webpack_require__(47);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	var _changesChildChange = __webpack_require__(49);
	
	var _changesChildChange2 = _interopRequireDefault(_changesChildChange);
	
	var _changesTerminalChange = __webpack_require__(54);
	
	var _changesTerminalChange2 = _interopRequireDefault(_changesTerminalChange);
	
	var _changesChangeCollection = __webpack_require__(50);
	
	var _changesChangeCollection2 = _interopRequireDefault(_changesChangeCollection);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _eventsEventSource2['default'], // event
	    Implements: _eventsAspect2['default'], // AOP
	
	    // 配置项
	    createIds: true,
	    prefix: '',
	    postfix: '',
	    maintainEdgeParent: true,
	
	    constructor: function Model(root) {
	
	        var that = this;
	
	        that.nextId = 0;
	        that.updateLevel = 0;
	        that.endingUpdate = false;
	
	        that.changeCollection = new _changesChangeCollection2['default'](that);
	
	        if (root) {
	            that.setRoot(root);
	        } else {
	            that.clear();
	        }
	    },
	
	    clear: function clear() {
	        var that = this;
	        that.setRoot(that.createRoot());
	        return that;
	    },
	
	    isAncestor: function isAncestor(parent, child) {
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
	
	    // 按照层级获取所有父节点
	    getParents: function getParents(child) {
	
	        var that = this;
	        var result = [];
	        var parent = child ? child.parent : null;
	
	        if (parent) {
	            result.push(parent);
	            result = result.concat(that.getParents(parent));
	        }
	
	        return result;
	    },
	
	    // 获取子孙节点
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
	
	    // Root
	    // ----
	
	    isRoot: function isRoot(cell) {
	        return cell && this.root === cell;
	    },
	
	    createRoot: function createRoot() {
	        var root = new _cellCell2['default']();
	
	        root.insertChild(new _cellCell2['default']());
	
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
	        var that = this;
	        that.digest(new _changesRootChange2['default'](that, root));
	        return that;
	    },
	
	    // RootChange 的回调处理
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
	
	    // 获取所有图层
	    getLayers: function getLayers() {
	        // 根节点的所有子节点就是图层
	        return this.getRoot().children || [];
	    },
	
	    // Changes
	    // -------
	
	    //
	    //
	
	    add: function add(parent, child, index) {
	
	        var that = this;
	
	        if (parent && child && parent !== child) {
	
	            if ((0, _commonUtils.isNullOrUndefined)(index)) {
	                index = parent.getChildCount();
	            }
	
	            var parentChanged = parent !== child.parent;
	
	            that.digest(new _changesChildChange2['default'](that, parent, child, index));
	
	            // TODO: maintainEdgeParent
	            if (that.maintainEdgeParent && parentChanged) {
	                that.updateEdgeParents(child);
	            }
	        }
	
	        return that;
	    },
	
	    remove: function remove(cell) {
	        if (cell == this.root) {
	            this.setRoot(null);
	        } else if (this.getParent(cell) != null) {
	            this.execute(new _changesChildChange2['default'](this, null, cell));
	        }
	
	        return cell;
	    },
	
	    // cell 添加到画布后的处理工作
	    cellAdded: function cellAdded(cell) {
	
	        var that = this;
	
	        if (cell) {
	
	            var id = cell.id;
	
	            if (!id && that.createIds) {
	                id = that.createId(cell);
	            }
	
	            // 去重
	            if (id) {
	                var collision = that.getCellById(id);
	
	                if (collision !== cell) {
	                    while (collision) {
	                        id = that.createId(cell);
	                        collision = that.getCellById(id);
	                    }
	
	                    if (!that.cells) {
	                        that.cells = {};
	                    }
	
	                    cell.id = id;
	                    that.cells[id] = cell;
	                }
	            }
	
	            // 修正 nextId
	            if ((0, _commonUtils.isNumeric)(id)) {
	                that.nextId = Math.max(that.nextId, id);
	            }
	
	            cell.eachChild(that.cellAdded, that);
	        }
	    },
	
	    // cell 移除画布后的清理工作
	    cellRemoved: function cellRemoved(cell) {
	
	        var that = this;
	        var cells = that.cells;
	
	        if (cell && cells) {
	
	            if (cell.isNode) {
	                cell.eachChild(function (child) {
	                    that.cellRemoved(child);
	                });
	            }
	
	            var id = cell.id;
	            if (cells && !(0, _commonUtils.isUndefined)(id)) {
	                delete cells[id];
	            }
	        }
	    },
	
	    updateEdgeParents: function updateEdgeParents(cell, root) {},
	
	    updateEdgeParent: function updateEdgeParent(edge, root) {},
	
	    getOrigin: function getOrigin(cell) {},
	
	    getNearestCommonAncestor: function getNearestCommonAncestor(cell1, cell2) {},
	
	    // ChildChange 的回调处理
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
	
	        // Checks if the previous parent was already in the
	        // model and avoids calling cellAdded if it was.
	        if (newParent && !that.contains(oldParent)) {
	            that.cellAdded(cell);
	        } else if (!newParent) {
	            that.cellRemoved(cell);
	        }
	
	        return oldParent;
	    },
	
	    // ChildChange 的回调处理，处理连线连接的节点
	    linkChanged: function linkChanged(link, newNode, isSource) {
	        var oldNode = link.getNode(isSource);
	
	        if (newNode) {
	            newNode.insertLink(link, isSource);
	        } else if (oldNode) {
	            oldNode.removeLink(link, isSource);
	        }
	
	        return oldNode;
	    },
	
	    collapsedStateForCellChanged: function collapsedStateForCellChanged(cell, collapsed) {},
	
	    getTerminal: function getTerminal(link, isSource) {
	        return link ? link.getTerminal(isSource) : null;
	    },
	
	    setTerminal: function setTerminal(link, node, isSource) {
	        var terminalChanged = node !== this.getTerminal(link, isSource);
	        this.digest(new _changesTerminalChange2['default'](this, link, node, isSource));
	
	        if (this.maintainEdgeParent && terminalChanged) {
	            this.updateEdgeParent(link, this.getRoot());
	        }
	
	        return node;
	    },
	
	    // 连线的起点节点或终点节点改变后
	    terminalForCellChanged: function terminalForCellChanged(link, node, isSource) {
	        var previous = this.getTerminal(link, isSource);
	
	        if (node) {
	            node.insertLink(link, isSource);
	        } else if (previous) {
	            previous.removeLink(link, isSource);
	        }
	
	        return previous;
	    },
	
	    createId: function createId() {
	        var that = this;
	        var id = that.nextId;
	
	        that.nextId += 1;
	
	        return that.prefix + id + that.postfix;
	    },
	
	    digest: function digest(change) {
	
	        var that = this;
	
	        change.digest();
	
	        that.beginUpdate();
	        that.changeCollection.add(change);
	        that.endUpdate();
	
	        return that;
	    },
	
	    beginUpdate: function beginUpdate() {
	
	        var that = this;
	        that.updateLevel += 1;
	        that.emit(_eventsEventNames2['default'].BEGIN_UPDATE);
	
	        if (that.updateLevel === 1) {
	            that.emit(_eventsEventNames2['default'].START_EDIT);
	        }
	    },
	
	    endUpdate: function endUpdate() {
	
	        var that = this;
	
	        that.updateLevel -= 1;
	
	        if (that.updateLevel === 0) {
	            that.emit(_eventsEventNames2['default'].END_EDIT);
	        }
	
	        if (!that.endingUpdate) {
	
	            var changeCollection = that.changeCollection;
	
	            that.endingUpdate = that.updateLevel === 0;
	            that.emit(_eventsEventNames2['default'].END_UPDATE, { changes: changeCollection.changes });
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _commonUtils = __webpack_require__(1);
	
	var eventSplitter = /\s+/;
	
	function weave(when, methodName, callback, context) {
	
	    var that = this;
	    var names = methodName.split(eventSplitter);
	
	    (0, _commonUtils.each)(names, function (name) {
	        var method = that[name];
	
	        if (!method || !(0, _commonUtils.isFunction)(method)) {
	            throw new Error('Event handler must be function, event name: ' + name);
	        }
	
	        if (!method.__aspected) {
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
	        var args = (0, _commonUtils.toArray)(arguments);
	        var beforeArgs = ['before:' + methodName].concat(args);
	
	        // 检查每个回调的返回值，如果任何一个结果为 false，则直接返回
	        var results = (0, _commonUtils.invoke)(that.emit, beforeArgs, that);
	        var returned = (0, _commonUtils.some)(results || [], function (result) {
	            return result === false;
	        });
	        if (returned) {
	            return;
	        }
	
	        // 调用原方法
	        var ret = originMethod.apply(this, arguments);
	        var afterArgs = ['after:' + methodName, ret].concat(args);
	        //
	        (0, _commonUtils.invoke)(that.emit, afterArgs, that);
	
	        return ret;
	    };
	
	    that[methodName].__aspected = true;
	}
	
	var aspect = {
	
	    before: function before(methodName, callback, context) {
	        return weave.call(this, 'before', methodName, callback, context);
	    },
	
	    after: function after(methodName, callback, context) {
	        return weave.call(this, 'after', methodName, callback, context);
	    },
	
	    around: function around(methodName, callback, context) {
	        weave.call(this, 'before', methodName, callback, context);
	        weave.call(this, 'after', methodName, callback, context);
	        return this;
	    }
	};
	
	exports['default'] = aspect;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    //BEFORE_DIGEST: 'beforeDigest',
	    //AFTER_DIGEST: 'afterDigest',
	
	    BEGIN_UPDATE: 'beginUpdate',
	    END_UPDATE: 'endUpdate',
	
	    START_EDIT: 'startEdit',
	    END_EDIT: 'endEdit',
	
	    CHANGE: 'change'
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Change = __webpack_require__(48);
	
	var _Change2 = _interopRequireDefault(_Change);
	
	exports['default'] = _Change2['default'].extend({
	    constructor: function RootChange(model, root) {
	
	        var that = this;
	
	        that.model = model;
	        that.root = root;
	        that.previous = root;
	    },
	
	    digest: function digest() {
	
	        var that = this;
	        var model = that.model;
	        var previous = that.previous;
	
	        that.root = previous;
	        that.previous = model.rootChanged(previous);
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function Change() {},
	    digest: function digest() {
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Change = __webpack_require__(48);
	
	var _Change2 = _interopRequireDefault(_Change);
	
	exports['default'] = _Change2['default'].extend({
	
	    constructor: function ChildChange(model, parent, child, index) {
	
	        var that = this;
	
	        that.model = model;
	        that.child = child;
	        that.parent = parent;
	        that.index = index;
	        that.previous = parent;
	        that.previousIndex = index;
	    },
	
	    digest: function digest() {
	
	        var that = this;
	        var model = that.model;
	        var child = that.child;
	        var newParent = that.previous;
	        var newIndex = that.previousIndex;
	        var oldParent = child.parent;
	        var oldIndex = oldParent ? oldParent.getChildIndex(child) : 0;
	
	        // 移除连线时，需要移除连线和节点的关联关系
	        if (!newParent) {
	            that.connect(child, false);
	        }
	
	        oldParent = model.childChanged(child, newParent, newIndex);
	
	        // 更新连线的父节点时，同时更新连线的关联节点
	        if (newParent) {
	            that.connect(child, true);
	        }
	
	        that.parent = newParent;
	        that.index = newIndex;
	        that.previous = oldParent;
	        that.previousIndex = oldIndex;
	
	        return that;
	    },
	
	    connect: function connect(cell, connected) {
	
	        var that = this;
	        var model = that.model;
	
	        if (cell.isLink) {
	
	            var source = cell.getTerminal(true);
	            var target = cell.getTerminal(false);
	
	            if (source) {
	                model.linkChanged(cell, connected ? source : null, true);
	            }
	
	            if (target) {
	                model.linkChanged(cell, connected ? target : null, false);
	            }
	
	            cell.setTerminal(source, true);
	            cell.setTerminal(target, false);
	        }
	
	        cell.eachChild(function (child) {
	            that.connect(child, connected);
	        });
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(14);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _eventsEventNames = __webpack_require__(46);
	
	var _eventsEventNames2 = _interopRequireDefault(_eventsEventNames);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function ChangeCollection(model) {
	
	        var that = this;
	        that.model = model;
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
	
	        that.model.emit(_eventsEventNames2['default'].CHANGE, { changes: that.changes });
	
	        return that;
	    }
	
	});
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _PolyLine = __webpack_require__(52);
	
	var _PolyLine2 = _interopRequireDefault(_PolyLine);
	
	var _marker = __webpack_require__(53);
	
	var _marker2 = _interopRequireDefault(_marker);
	
	var Connector = _PolyLine2['default'].extend({
	
	    constructor: function Connector(state, style, points) {
	        Connector.superclass.constructor.call(this, state, style, points);
	    },
	
	    drawLink: function drawLink(canvas, points) {
	
	        var that = this;
	
	        var sourceMarker = that.createMarker(canvas, points, true);
	        var targetMarker = that.createMarker(canvas, points, false);
	
	        Connector.superclass.drawLink.call(that, canvas, points);
	
	        sourceMarker && sourceMarker();
	        targetMarker && targetMarker();
	
	        return that;
	    },
	
	    createMarker: function createMarker(canvas, points, isSource) {
	
	        var that = this;
	        var style = that.style;
	        var result = null;
	        var n = points.length;
	        var type = isSource ? style.startArrow : style.endArrow;
	        var p0 = isSource ? points[1] : points[n - 2];
	        var pe = isSource ? points[0] : points[n - 1];
	
	        if (type && p0 && pe) {
	            var count = 1;
	
	            // Uses next non-overlapping point
	            while (count < n - 1 && Math.round(p0.x - pe.x) === 0 && Math.round(p0.y - pe.y) === 0) {
	                p0 = isSource ? points[1 + count] : points[n - 2 - count];
	                count++;
	            }
	
	            // Computes the norm and the inverse norm
	            var dx = pe.x - p0.x;
	            var dy = pe.y - p0.y;
	
	            var dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
	
	            var unitX = dx / dist;
	            var unitY = dy / dist;
	
	            var size = 6; //mxUtils.getNumber(this.style, (isSource) ? mxConstants.STYLE_STARTSIZE : mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE);
	
	            // Allow for stroke width in the end point used and the
	            // orthogonal vectors describing the direction of the marker
	            var filled = true; //this.style[(isSource) ? mxConstants.STYLE_STARTFILL : mxConstants.STYLE_ENDFILL] != 0;
	
	            result = _marker2['default'].createMarker(canvas, this, type, pe, unitX, unitY, size, isSource, 1, filled);
	        }
	
	        return result;
	    }
	
	});
	
	//augmentBoundingBox: function (bbox) {
	//
	//}
	exports['default'] = Connector;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Shape = __webpack_require__(35);
	
	var _Shape2 = _interopRequireDefault(_Shape);
	
	exports['default'] = _Shape2['default'].extend({
	
	    constructor: function PolyLine(state, style, points) {
	
	        var that = this;
	
	        that.state = state;
	        that.style = style;
	        that.points = points;
	    },
	
	    getRotation: function getRotation() {
	        return 0;
	    },
	
	    isPaintBoundsInverted: function isPaintBoundsInverted() {
	        return false;
	    },
	
	    drawLink: function drawLink(canvas, points) {
	
	        var that = this;
	        var style = that.style;
	
	        if (style && style.curved) {
	            that.drawLine(canvas, points, this.isRounded);
	        } else {
	            that.drawCurve(canvas, points);
	        }
	
	        return that;
	    },
	
	    drawLine: function drawLine(c, pts, rounded) {},
	
	    drawCurve: function drawCurve(canvas, points) {
	
	        var path = canvas.drawPath();
	        var pt = points[0];
	        var n = points.length;
	
	        path.moveTo(pt.x, pt.y);
	
	        for (var i = 1; i < n - 2; i++) {
	            var p0 = points[i];
	            var p1 = points[i + 1];
	            var ix = (p0.x + p1.x) / 2;
	            var iy = (p0.y + p1.y) / 2;
	
	            path.quadTo(p0.x, p0.y, ix, iy);
	        }
	
	        var p0 = points[n - 2];
	        var p1 = points[n - 1];
	
	        path.quadTo(p0.x, p0.y, p1.x, p1.y);
	
	        canvas.addNode(false, true);
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var marker = {
	
	    markers: {},
	
	    addMarker: function addMarker(type, func) {
	        marker.markers[type] = func;
	    },
	
	    createMarker: function createMarker(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
	
	        var func = marker.markers[type];
	
	        return func ? func(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) : null;
	    }
	};
	
	function arrow(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
	    // The angle of the forward facing arrow sides against the x axis is
	    // 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
	    // only half the strokewidth is processed ).
	    var endOffsetX = unitX * sw * 1.118;
	    var endOffsetY = unitY * sw * 1.118;
	
	    unitX = unitX * (size + sw);
	    unitY = unitY * (size + sw);
	
	    var pt = pe.clone();
	    pt.x -= endOffsetX;
	    pt.y -= endOffsetY;
	
	    var f = type !== 'classic' ? 1 : 3 / 4;
	    pe.x += -unitX * f - endOffsetX;
	    pe.y += -unitY * f - endOffsetY;
	
	    return function () {
	
	        var path = canvas.drawPath();
	
	        path.moveTo(pt.x, pt.y);
	        path.lineTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);
	
	        if (type === 'classic') {
	            path.lineTo(pt.x - unitX * 3 / 4, pt.y - unitY * 3 / 4);
	        }
	
	        path.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
	        path.close();
	
	        if (filled) {
	            canvas.addNode(true, true);
	            //canvas.fillAndStroke();
	        } else {
	                canvas.addNode(false, true);
	                //canvas.stroke();
	            }
	    };
	}
	
	marker.addMarker('classic', arrow);
	marker.addMarker('block', arrow);
	
	exports['default'] = marker;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Change = __webpack_require__(48);
	
	var _Change2 = _interopRequireDefault(_Change);
	
	exports['default'] = _Change2['default'].extend({
	    constructor: function TerminalChange(model, link, node, isSource) {
	
	        var that = this;
	
	        that.model = model;
	        that.cell = link;
	        that.terminal = node;
	        that.previous = node;
	        that.isSource = isSource;
	    },
	
	    digest: function digest() {
	
	        var that = this;
	
	        that.terminal = that.previous;
	        that.previous = that.model.terminalForCellChanged(that.cell, that.previous, that.isSource);
	
	        return that;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libPoint = __webpack_require__(24);
	
	var _libPoint2 = _interopRequireDefault(_libPoint);
	
	module.exports = {
	    RectanglePerimeter: function RectanglePerimeter(bounds, vertex, next, orthogonal) {
	        var cx = bounds.getCenterX();
	        var cy = bounds.getCenterY();
	        var dx = next.x - cx;
	        var dy = next.y - cy;
	        var alpha = Math.atan2(dy, dx);
	        var p = new _libPoint2['default'](0, 0);
	        var pi = Math.PI;
	        var pi2 = Math.PI / 2;
	        var beta = pi2 - alpha;
	        var t = Math.atan2(bounds.height, bounds.width);
	
	        if (alpha < -pi + t || alpha > pi - t) {
	            // Left edge
	            p.x = bounds.x;
	            p.y = cy - bounds.width * Math.tan(alpha) / 2;
	        } else if (alpha < -t) {
	            // Top Edge
	            p.y = bounds.y;
	            p.x = cx - bounds.height * Math.tan(beta) / 2;
	        } else if (alpha < t) {
	            // Right Edge
	            p.x = bounds.x + bounds.width;
	            p.y = cy + bounds.width * Math.tan(alpha) / 2;
	        } else {
	            // Bottom Edge
	            p.y = bounds.y + bounds.height;
	            p.x = cx + bounds.height * Math.tan(beta) / 2;
	        }
	
	        if (orthogonal) {
	            if (next.x >= bounds.x && next.x <= bounds.x + bounds.width) {
	                p.x = next.x;
	            } else if (next.y >= bounds.y && next.y <= bounds.y + bounds.height) {
	                p.y = next.y;
	            }
	            if (next.x < bounds.x) {
	                p.x = bounds.x;
	            } else if (next.x > bounds.x + bounds.width) {
	                p.x = bounds.x + bounds.width;
	            }
	            if (next.y < bounds.y) {
	                p.y = bounds.y;
	            } else if (next.y > bounds.y + bounds.height) {
	                p.y = bounds.y + bounds.height;
	            }
	        }
	
	        return p;
	    },
	    EllipsePerimeter: function EllipsePerimeter(bounds, vertex, next, orthogonal) {
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
	        } else if (dx == 0 && dy == 0) {
	            return new mxPoint(px, py);
	        }
	
	        if (orthogonal) {
	            if (py >= y && py <= y + bounds.height) {
	                var ty = py - cy;
	                var tx = Math.sqrt(a * a * (1 - ty * ty / (b * b))) || 0;
	
	                if (px <= x) {
	                    tx = -tx;
	                }
	
	                return new mxPoint(cx + tx, py);
	            }
	
	            if (px >= x && px <= x + bounds.width) {
	                var tx = px - cx;
	                var ty = Math.sqrt(b * b * (1 - tx * tx / (a * a))) || 0;
	
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
	        var g = a * a * d * d * cx * cx + b * b * cx * cx - a * a * b * b;
	        var det = Math.sqrt(f * f - 4 * e * g);
	
	        // Two solutions (perimeter points)
	        var xout1 = (-f + det) / (2 * e);
	        var xout2 = (-f - det) / (2 * e);
	        var yout1 = d * xout1 + h;
	        var yout2 = d * xout2 + h;
	        var dist1 = Math.sqrt(Math.pow(xout1 - px, 2) + Math.pow(yout1 - py, 2));
	        var dist2 = Math.sqrt(Math.pow(xout2 - px, 2) + Math.pow(yout2 - py, 2));
	
	        // Correct solution
	        var xout = 0;
	        var yout = 0;
	
	        if (dist1 < dist2) {
	            xout = xout1;
	            yout = yout1;
	        } else {
	            xout = xout2;
	            yout = yout2;
	        }
	
	        return new mxPoint(xout, yout);
	    },
	    RhombusPerimeter: function RhombusPerimeter(bounds, vertex, next, orthogonal) {
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
	            } else {
	                    return new mxPoint(cx, y + h); // bottom
	                }
	        } else if (cy == py) {
	                if (cx > px) {
	                    return new mxPoint(x, cy); // left
	                } else {
	                        return new mxPoint(x + w, cy); // right
	                    }
	            }
	
	        var tx = cx;
	        var ty = cy;
	
	        if (orthogonal) {
	            if (px >= x && px <= x + w) {
	                tx = px;
	            } else if (py >= y && py <= y + h) {
	                ty = py;
	            }
	        }
	
	        // In which quadrant will the intersection be?
	        // set the slope and offset of the border line accordingly
	        if (px < cx) {
	            if (py < cy) {
	                return mxUtils.intersection(px, py, tx, ty, cx, y, x, cy);
	            } else {
	                return mxUtils.intersection(px, py, tx, ty, cx, y + h, x, cy);
	            }
	        } else if (py < cy) {
	            return mxUtils.intersection(px, py, tx, ty, cx, y, x + w, cy);
	        } else {
	            return mxUtils.intersection(px, py, tx, ty, cx, y + h, x + w, cy);
	        }
	    },
	    TrianglePerimeter: function TrianglePerimeter(bounds, vertex, next, orthogonal) {
	        var direction = vertex != null ? vertex.style[mxConstants.STYLE_DIRECTION] : null;
	        var vertical = direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH;
	
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
	        } else if (direction == mxConstants.DIRECTION_SOUTH) {
	            corner = new mxPoint(cx, y + h);
	            end = new mxPoint(x + w, y);
	        } else if (direction == mxConstants.DIRECTION_WEST) {
	            start = new mxPoint(x + w, y);
	            corner = new mxPoint(x, cy);
	            end = new mxPoint(x + w, y + h);
	        }
	
	        var dx = next.x - cx;
	        var dy = next.y - cy;
	
	        var alpha = vertical ? Math.atan2(dx, dy) : Math.atan2(dy, dx);
	        var t = vertical ? Math.atan2(w, h) : Math.atan2(h, w);
	
	        var base = false;
	
	        if (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_WEST) {
	            base = alpha > -t && alpha < t;
	        } else {
	            base = alpha < -Math.PI + t || alpha > Math.PI - t;
	        }
	
	        var result = null;
	
	        if (base) {
	            if (orthogonal && (vertical && next.x >= start.x && next.x <= end.x || !vertical && next.y >= start.y && next.y <= end.y)) {
	                if (vertical) {
	                    result = new mxPoint(next.x, start.y);
	                } else {
	                    result = new mxPoint(start.x, next.y);
	                }
	            } else {
	                if (direction == mxConstants.DIRECTION_NORTH) {
	                    result = new mxPoint(x + w / 2 + h * Math.tan(alpha) / 2, y + h);
	                } else if (direction == mxConstants.DIRECTION_SOUTH) {
	                    result = new mxPoint(x + w / 2 - h * Math.tan(alpha) / 2, y);
	                } else if (direction == mxConstants.DIRECTION_WEST) {
	                    result = new mxPoint(x + w, y + h / 2 + w * Math.tan(alpha) / 2);
	                } else {
	                    result = new mxPoint(x, y + h / 2 - w * Math.tan(alpha) / 2);
	                }
	            }
	        } else {
	            if (orthogonal) {
	                var pt = new mxPoint(cx, cy);
	
	                if (next.y >= y && next.y <= y + h) {
	                    pt.x = vertical ? cx : direction == mxConstants.DIRECTION_WEST ? x + w : x;
	                    pt.y = next.y;
	                } else if (next.x >= x && next.x <= x + w) {
	                    pt.x = next.x;
	                    pt.y = !vertical ? cy : direction == mxConstants.DIRECTION_NORTH ? y + h : y;
	                }
	
	                // Compute angle
	                dx = next.x - pt.x;
	                dy = next.y - pt.y;
	
	                cx = pt.x;
	                cy = pt.y;
	            }
	
	            if (vertical && next.x <= x + w / 2 || !vertical && next.y <= y + h / 2) {
	                result = mxUtils.intersection(next.x, next.y, cx, cy, start.x, start.y, corner.x, corner.y);
	            } else {
	                result = mxUtils.intersection(next.x, next.y, cx, cy, corner.x, corner.y, end.x, end.y);
	            }
	        }
	
	        if (result == null) {
	            result = new mxPoint(cx, cy);
	        }
	
	        return result;
	    },
	    HexagonPerimeter: function HexagonPerimeter(bounds, vertex, next, orthogonal) {
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
	
	        var direction = vertex != null ? mxUtils.getValue(vertex.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
	        var vertical = direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH;
	        var a = new mxPoint();
	        var b = new mxPoint();
	
	        //Only consider corrects quadrants for the orthogonal case.
	        if (px < x && py < y || px < x && py > y + h || px > x + w && py < y || px > x + w && py > y + h) {
	            orthogonal = false;
	        }
	
	        if (orthogonal) {
	            if (vertical) {
	                //Special cases where intersects with hexagon corners
	                if (px == cx) {
	                    if (py <= y) {
	                        return new mxPoint(cx, y);
	                    } else if (py >= y + h) {
	                        return new mxPoint(cx, y + h);
	                    }
	                } else if (px < x) {
	                    if (py == y + h / 4) {
	                        return new mxPoint(x, y + h / 4);
	                    } else if (py == y + 3 * h / 4) {
	                        return new mxPoint(x, y + 3 * h / 4);
	                    }
	                } else if (px > x + w) {
	                    if (py == y + h / 4) {
	                        return new mxPoint(x + w, y + h / 4);
	                    } else if (py == y + 3 * h / 4) {
	                        return new mxPoint(x + w, y + 3 * h / 4);
	                    }
	                } else if (px == x) {
	                    if (py < cy) {
	                        return new mxPoint(x, y + h / 4);
	                    } else if (py > cy) {
	                        return new mxPoint(x, y + 3 * h / 4);
	                    }
	                } else if (px == x + w) {
	                    if (py < cy) {
	                        return new mxPoint(x + w, y + h / 4);
	                    } else if (py > cy) {
	                        return new mxPoint(x + w, y + 3 * h / 4);
	                    }
	                }
	                if (py == y) {
	                    return new mxPoint(cx, y);
	                } else if (py == y + h) {
	                    return new mxPoint(cx, y + h);
	                }
	
	                if (px < cx) {
	                    if (py > y + h / 4 && py < y + 3 * h / 4) {
	                        a = new mxPoint(x, y);
	                        b = new mxPoint(x, y + h);
	                    } else if (py < y + h / 4) {
	                        a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                        b = new mxPoint(x + w, y - Math.floor(0.25 * h));
	                    } else if (py > y + 3 * h / 4) {
	                        a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                        b = new mxPoint(x + w, y + Math.floor(1.25 * h));
	                    }
	                } else if (px > cx) {
	                    if (py > y + h / 4 && py < y + 3 * h / 4) {
	                        a = new mxPoint(x + w, y);
	                        b = new mxPoint(x + w, y + h);
	                    } else if (py < y + h / 4) {
	                        a = new mxPoint(x, y - Math.floor(0.25 * h));
	                        b = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                    } else if (py > y + 3 * h / 4) {
	                        a = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                        b = new mxPoint(x, y + Math.floor(1.25 * h));
	                    }
	                }
	            } else {
	                //Special cases where intersects with hexagon corners
	                if (py == cy) {
	                    if (px <= x) {
	                        return new mxPoint(x, y + h / 2);
	                    } else if (px >= x + w) {
	                        return new mxPoint(x + w, y + h / 2);
	                    }
	                } else if (py < y) {
	                    if (px == x + w / 4) {
	                        return new mxPoint(x + w / 4, y);
	                    } else if (px == x + 3 * w / 4) {
	                        return new mxPoint(x + 3 * w / 4, y);
	                    }
	                } else if (py > y + h) {
	                    if (px == x + w / 4) {
	                        return new mxPoint(x + w / 4, y + h);
	                    } else if (px == x + 3 * w / 4) {
	                        return new mxPoint(x + 3 * w / 4, y + h);
	                    }
	                } else if (py == y) {
	                    if (px < cx) {
	                        return new mxPoint(x + w / 4, y);
	                    } else if (px > cx) {
	                        return new mxPoint(x + 3 * w / 4, y);
	                    }
	                } else if (py == y + h) {
	                    if (px < cx) {
	                        return new mxPoint(x + w / 4, y + h);
	                    } else if (py > cy) {
	                        return new mxPoint(x + 3 * w / 4, y + h);
	                    }
	                }
	                if (px == x) {
	                    return new mxPoint(x, cy);
	                } else if (px == x + w) {
	                    return new mxPoint(x + w, cy);
	                }
	
	                if (py < cy) {
	                    if (px > x + w / 4 && px < x + 3 * w / 4) {
	                        a = new mxPoint(x, y);
	                        b = new mxPoint(x + w, y);
	                    } else if (px < x + w / 4) {
	                        a = new mxPoint(x - Math.floor(0.25 * w), y + h);
	                        b = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                    } else if (px > x + 3 * w / 4) {
	                        a = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                        b = new mxPoint(x + Math.floor(1.25 * w), y + h);
	                    }
	                } else if (py > cy) {
	                    if (px > x + w / 4 && px < x + 3 * w / 4) {
	                        a = new mxPoint(x, y + h);
	                        b = new mxPoint(x + w, y + h);
	                    } else if (px < x + w / 4) {
	                        a = new mxPoint(x - Math.floor(0.25 * w), y);
	                        b = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
	                    } else if (px > x + 3 * w / 4) {
	                        a = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
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
	                } else {
	                    ty = y;
	                }
	            } else if (py >= y && py <= y + h) {
	                ty = py;
	
	                if (px < cx) {
	                    tx = x + w;
	                } else {
	                    tx = x;
	                }
	            }
	
	            result = mxUtils.intersection(tx, ty, next.x, next.y, a.x, a.y, b.x, b.y);
	        } else {
	            if (vertical) {
	                var beta = Math.atan2(h / 4, w / 2);
	
	                //Special cases where intersects with hexagon corners
	                if (alpha == beta) {
	                    return new mxPoint(x + w, y + Math.floor(0.25 * h));
	                } else if (alpha == pi2) {
	                    return new mxPoint(x + Math.floor(0.5 * w), y);
	                } else if (alpha == pi - beta) {
	                    return new mxPoint(x, y + Math.floor(0.25 * h));
	                } else if (alpha == -beta) {
	                    return new mxPoint(x + w, y + Math.floor(0.75 * h));
	                } else if (alpha == -pi2) {
	                    return new mxPoint(x + Math.floor(0.5 * w), y + h);
	                } else if (alpha == -pi + beta) {
	                    return new mxPoint(x, y + Math.floor(0.75 * h));
	                }
	
	                if (alpha < beta && alpha > -beta) {
	                    a = new mxPoint(x + w, y);
	                    b = new mxPoint(x + w, y + h);
	                } else if (alpha > beta && alpha < pi2) {
	                    a = new mxPoint(x, y - Math.floor(0.25 * h));
	                    b = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                } else if (alpha > pi2 && alpha < pi - beta) {
	                    a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                    b = new mxPoint(x + w, y - Math.floor(0.25 * h));
	                } else if (alpha > pi - beta && alpha <= pi || alpha < -pi + beta && alpha >= -pi) {
	                    a = new mxPoint(x, y);
	                    b = new mxPoint(x, y + h);
	                } else if (alpha < -beta && alpha > -pi2) {
	                    a = new mxPoint(x + Math.floor(1.5 * w), y + Math.floor(0.5 * h));
	                    b = new mxPoint(x, y + Math.floor(1.25 * h));
	                } else if (alpha < -pi2 && alpha > -pi + beta) {
	                    a = new mxPoint(x - Math.floor(0.5 * w), y + Math.floor(0.5 * h));
	                    b = new mxPoint(x + w, y + Math.floor(1.25 * h));
	                }
	            } else {
	                var beta = Math.atan2(h / 2, w / 4);
	
	                //Special cases where intersects with hexagon corners
	                if (alpha == beta) {
	                    return new mxPoint(x + Math.floor(0.75 * w), y);
	                } else if (alpha == pi - beta) {
	                    return new mxPoint(x + Math.floor(0.25 * w), y);
	                } else if (alpha == pi || alpha == -pi) {
	                    return new mxPoint(x, y + Math.floor(0.5 * h));
	                } else if (alpha == 0) {
	                    return new mxPoint(x + w, y + Math.floor(0.5 * h));
	                } else if (alpha == -beta) {
	                    return new mxPoint(x + Math.floor(0.75 * w), y + h);
	                } else if (alpha == -pi + beta) {
	                    return new mxPoint(x + Math.floor(0.25 * w), y + h);
	                }
	
	                if (alpha > 0 && alpha < beta) {
	                    a = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                    b = new mxPoint(x + Math.floor(1.25 * w), y + h);
	                } else if (alpha > beta && alpha < pi - beta) {
	                    a = new mxPoint(x, y);
	                    b = new mxPoint(x + w, y);
	                } else if (alpha > pi - beta && alpha < pi) {
	                    a = new mxPoint(x - Math.floor(0.25 * w), y + h);
	                    b = new mxPoint(x + Math.floor(0.5 * w), y - Math.floor(0.5 * h));
	                } else if (alpha < 0 && alpha > -beta) {
	                    a = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
	                    b = new mxPoint(x + Math.floor(1.25 * w), y);
	                } else if (alpha < -beta && alpha > -pi + beta) {
	                    a = new mxPoint(x, y + h);
	                    b = new mxPoint(x + w, y + h);
	                } else if (alpha < -pi + beta && alpha > -pi) {
	                    a = new mxPoint(x - Math.floor(0.25 * w), y);
	                    b = new mxPoint(x + Math.floor(0.5 * w), y + Math.floor(1.5 * h));
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane-0.0.1.js.map