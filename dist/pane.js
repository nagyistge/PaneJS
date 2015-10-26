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

	const pane = {
	    utils: __webpack_require__(1)
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	
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
	
	    return {
	        isNull: isNull,
	        isUndefined: isUndefined,
	        isNullOrUndefined: isNullOrUndefined,
	        isType: isType,
	        isObject: isObject,
	        isFunction: isFunction,
	        isWindow: isWindow,
	        isArray: isArray,
	        isArrayLike: isArrayLike,
	        isNumeric: isNumeric
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	
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
	
	    return {
	        toString: toString,
	        lcFirst: lcFirst,
	        ucFirst: ucFirst,
	        ltrim: ltrim,
	        rtrim: rtrim,
	        trim: trim
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	
	    function toFixed(value, precision) {
	        var power = Math.pow(10, precision);
	        return (Math.round(value * power) / power).toFixed(precision);
	    }
	
	    function mod(n, m) {
	        return (n % m + m) % m;
	    }
	
	    return {
	        toFixed: toFixed,
	        mod: mod
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (lang, array) {
	    'use strict';
	
	    var isFunction = lang.isFunction;
	    var isUndefined = lang.isUndefined;
	    var indexOf = array.indexOf;
	    var hasOwn = Object.prototype.hasOwnProperty;
	    var slice = Array.prototype.slice;
	
	    var hasKey = exports.hasKey = function hasKey(obj, key) {
	        return obj !== null && hasOwn.call(obj, key);
	    };
	
	    var keys = exports.keys = Object.keys || function (obj) {
	        // ie < 9 不考虑
	
	        var keys = [];
	
	        if (isObject(obj)) {
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
	
	        if (obj && isFunction(obj.constructor)) {
	            cloned = new obj.constructor();
	
	            for (var key in obj) {
	                if (key !== mxObjectIdentity.FIELD_NAME && (!transients || indexOf(transients, key) < 0)) {
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
	
	        var sources = slice.call(arguments, 1);
	
	        for (var i = 0, length = sources.length; i < length; i++) {
	            var source = sources[i];
	
	            forIn(source, function () {
	                dist[key] = source[key];
	            });
	        }
	
	        return dist;
	    }
	
	    function getValue(obj, key, defaultValue) {
	        var value = obj[key];
	
	        if (isUndefined(value)) {
	            value = defaultValue;
	        }
	
	        return value;
	    }
	
	    function getNumber(obj, key, defaultValue) {
	        var value = obj ? obj[key] : null;
	
	        if (isUndefined(value)) {
	            value = defaultValue || 0;
	        }
	
	        return Number(value);
	    }
	
	    return {
	        hasKey: hasKey,
	        keys: keys,
	        forIn: forIn,
	        clone: clone,
	        extend: extend,
	        getValue: getValue,
	        getNumber: getNumber
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (lang) {
	
	    'use strict';
	
	    var isArrayLike = lang.isArrayLike;
	    var slice = Array.prototype.slice;
	
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
	
	    function each(list, iteratee, context) {
	        for (var i = 0, l = list.length; i < l; i++) {
	            iteratee.call(context, list[i], i, list);
	        }
	
	        return list;
	    }
	
	    function toArray(obj) {
	        return isArrayLike(obj) ? slice.call(obj) : [];
	    }
	
	    return {
	        indexOf: indexOf,
	        each: each,
	        toArray: toArray
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	
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
	
	    return {
	        getFuncName: getFunctionName
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (lang) {
	    'use strict';
	
	    var isNullOrUndefined = lang.isNullOrUndefined;
	
	    function isNode(node, nodeName, attributeName, attributeValue) {
	        var ret = node && !isNaN(node.nodeType);
	
	        if (ret) {
	            ret = isNullOrUndefined(nodeName) || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	        }
	
	        if (ret) {
	            ret = isNullOrUndefined(attributeName) || node.getAttribute(attributeName) === attributeValue;
	        }
	
	        return ret;
	    }
	
	    function getCurrentStyle(node) {
	        return node.currentStyle || window.getComputedStyle(node, null);
	    }
	
	    return {
	        isNode: isNode,
	        getCurrentStyle: getCurrentStyle
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane.js.map