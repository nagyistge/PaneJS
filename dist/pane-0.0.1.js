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

	var pane = {
	    utils: __webpack_require__(1),
	    Graph: __webpack_require__(9),
	    Model: __webpack_require__(21),
	    View: __webpack_require__(12)
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
	
	function mod(n, m) {
	    return (n % m + m) % m;
	}
	
	exports.toFixed = toFixed;
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
	
	    if (obj && (0, _lang.isFunction)(obj.constructor)) {
	        cloned = new obj.constructor();
	
	        for (var key in obj) {
	            if (key !== mxObjectIdentity.FIELD_NAME && (!transients || (0, _array.indexOf)(transients, key) < 0)) {
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
	    return (0, _lang.isArrayLike)(obj) ? slice.call(obj) : [];
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
	
	var forEach = each;
	
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
	
	var reduce = arrProto.reduce ? function (arr, iterator, context) {} : function (arr, iterator, context) {};
	
	var reduceRight = arrProto.reduceRight ? function (arr, iterator, context) {} : function (arr, iterator, context) {};
	
	exports.toArray = toArray;
	exports.indexOf = indexOf;
	exports.lastIndexOf = lastIndexOf;
	exports.forEach = forEach;
	exports.each = each;
	exports.map = map;
	exports.filter = filter;
	exports.some = some;
	exports.every = every;
	exports.reduce = reduce;
	exports.reduceRight = reduceRight;

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
	
	var _lang = __webpack_require__(2);
	
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
	
	exports.isNode = isNode;
	exports.getCurrentStyle = getCurrentStyle;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonClass = __webpack_require__(24);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _eventsEventSource = __webpack_require__(25);
	
	var _eventsEventSource2 = _interopRequireDefault(_eventsEventSource);
	
	var _View = __webpack_require__(12);
	
	var _View2 = _interopRequireDefault(_View);
	
	var _Model = __webpack_require__(21);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _eventsEventSource2['default'],
	
	    constructor: function Graph(container, model, stylesheet) {
	
	        var that = this;
	
	        that.model = model || new _Model2['default']();
	        that.view = new _View2['default'](that);
	        //that.stylesheet = stylesheet || new Stylesheet();
	
	        if (container) {
	            that.init(container);
	        }
	
	        that.view.revalidate();
	    },
	
	    init: function init(container) {
	
	        var that = this;
	
	        that.container = container;
	        that.view.init();
	    },
	
	    insertNode: function insertNode() {},
	
	    createNode: function createNode() {},
	
	    insertLink: function insertLink() {},
	
	    createLink: function createLink() {}
	});
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var Base = _commonClass2['default'].create({
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
	
	exports['default'] = Base;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// ref: https://github.com/aralejs/class
	
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
	
	    'Implements': function Implements(items) {
	
	        var list = (0, _utils.isArray)(items) ? items : [items];
	        var proto = this.prototype;
	
	        (0, _utils.each)(list, function (item) {
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
	        if (whiteList && indexOf(whiteList, key) === -1) {
	            return;
	        }
	
	        receiver[key] = value;
	    });
	}
	
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
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonDetector = __webpack_require__(13);
	
	var _commonDetector2 = _interopRequireDefault(_commonDetector);
	
	var _libBase = __webpack_require__(10);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function View(graph) {
	
	        var that = this;
	        that.graph = graph;
	        that.translate = new Point();
	        that.graphBounds = new Rectangle();
	        that.states = new mxDictionary();
	    },
	
	    init: function init() {
	
	        var that = this;
	        var root = document.createElementNS(mxConstants.NS_SVG, 'svg');
	        var canvas = document.createElementNS(mxConstants.NS_SVG, 'g');
	        var backgroundPane = document.createElementNS(mxConstants.NS_SVG, 'g');
	        var drawPane = document.createElementNS(mxConstants.NS_SVG, 'g');
	        var overlayPane = document.createElementNS(mxConstants.NS_SVG, 'g');
	        var decoratorPane = document.createElementNS(mxConstants.NS_SVG, 'g');
	
	        canvas.appendChild(backgroundPane);
	        canvas.appendChild(drawPane);
	        canvas.appendChild(overlayPane);
	        canvas.appendChild(decoratorPane);
	        root.appendChild(canvas);
	
	        root.style.width = '100%';
	        root.style.height = '100%';
	        root.style.display = 'block';
	
	        that.canvas = canvas;
	        that.backgroundPane = backgroundPane;
	        that.drawPane = drawPane;
	        that.overlayPane = overlayPane;
	        that.decoratorPane = decoratorPane;
	
	        var container = that.graph.container;
	        if (container) {
	            container.appendChild(root);
	            that.updateContainerStyle(container);
	        }
	
	        that.installListeners();
	    },
	
	    installListeners: function installListeners() {},
	
	    updateContainerStyle: function updateContainerStyle(container) {
	        var style = (0, _commonUtils.getCurrentStyle)(container);
	
	        if (style.position === 'static') {
	            container.style.position = 'relative';
	        }
	
	        // 禁用默认的平移和缩放
	        // Disables built-in pan and zoom in IE10 and later
	        if (_commonDetector2['default'].IS_POINTER) {
	            container.style.msTouchAction = 'none';
	        }
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var ua = navigator.userAgent;
	var av = navigator.appVersion;
	
	var client = {
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
	
	    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),
	
	    IS_WIN: av.indexOf('Win') > 0,
	
	    IS_MAC: av.indexOf('Mac') > 0,
	
	    IS_TOUCH: 'ontouchstart' in document.documentElement,
	
	    IS_POINTER: window.navigator.msPointerEnabled || false
	};
	
	exports['default'] = client;
	module.exports = exports['default'];

/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Cell = __webpack_require__(17);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	exports['default'] = _Cell2['default'].extend({
	
	    constructor: function Node(value, geometry, style) {
	
	        var that = this;
	
	        Node.superclass.constructor.call(that, value, geometry, style);
	
	        that.isNode = true;
	        that.connectAble = true;
	
	        // lazy
	        // that.parent = null;
	        // that.children = [];
	        // that.links = [];
	    },
	
	    // children
	    // --------
	
	    getChildrenCount: function getChildrenCount() {
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
	                index = that.getChildrenCount();
	
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
	
	    // links
	    // ------
	
	    getLinksCount: function getLinksCount() {
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
	            link.removeFromNode(outgoing);
	            link.setNode(that, outgoing);
	
	            var links = that.links;
	
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
	
	            if (links && link.getNode(!outgoing) !== that) {
	                var index = that.getLinkIndex(link);
	
	                if (index >= 0) {
	                    links.splice(index, 1);
	                }
	            }
	
	            link.setNode(null, outgoing);
	        }
	
	        return link;
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
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(10);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var transients = ['id', 'value', 'parent', 'source', 'target', 'children', 'links'];
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function Cell(value, geometry, style) {
	
	        var that = this;
	
	        that.value = value;
	        that.geometry = geometry;
	        that.style = style;
	        that.visible = true;
	    },
	
	    removeFromParent: function removeFromParent() {
	        var that = this;
	        var parent = that.parent;
	
	        parent && parent.remove(that);
	
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
	        var cloned = (0, _commonUtils.clone)(that, transients);
	        cloned.value = that.cloneValue();
	
	        return cloned;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonClass = __webpack_require__(24);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	var _eventsEventSource = __webpack_require__(25);
	
	var _eventsEventSource2 = _interopRequireDefault(_eventsEventSource);
	
	var _cellsNode = __webpack_require__(16);
	
	var _cellsNode2 = _interopRequireDefault(_cellsNode);
	
	var _changesRootChange = __webpack_require__(22);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _eventsEventSource2['default'],
	
	    constructor: function Model(root) {
	
	        var that = this;
	
	        that.updateLevel = 0;
	        that.endingUpdate = false;
	
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
	
	    createRoot: function createRoot() {
	        var root = new _cellsNode2['default']();
	
	        root.insertChild(new _cellsNode2['default']());
	
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
	        this.digest(new _changesRootChange2['default'](this, root));
	
	        return root;
	    },
	
	    changeRoot: function changeRoot(root) {},
	
	    isRoot: function isRoot(cell) {
	        return cell && this.root === cell;
	    },
	
	    isLayer: function isLayer(cell) {
	        return cell && this.isRoot(cell.parent);
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
	
	    add: function add(parent, child, index) {},
	
	    cellAdded: function cellAdded() {},
	
	    digest: function digest(change) {
	
	        change.digest();
	
	        var that = this;
	
	        that.beginUpdate();
	        that.emit();
	        that.endUpdate();
	    },
	
	    beginUpdate: function beginUpdate() {
	
	        var that = this;
	        that.updateLevel++;
	        that.emit(new mxEventObject(mxEvent.BEGIN_UPDATE));
	
	        if (that.updateLevel === 1) {
	            that.emit(new mxEventObject(mxEvent.START_EDIT));
	        }
	    },
	
	    endUpdate: function endUpdate() {
	
	        var that = this;
	
	        that.updateLevel--;
	
	        if (that.updateLevel === 0) {
	            this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
	        }
	
	        if (!that.endingUpdate) {
	            that.endingUpdate = that.updateLevel === 0;
	            this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));
	
	            try {
	                if (that.endingUpdate && !this.currentEdit.isEmpty()) {
	                    this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
	                    var tmp = this.currentEdit;
	                    this.currentEdit = this.createUndoableEdit();
	                    tmp.notify();
	                    this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', tmp));
	                }
	            } finally {
	                that.endingUpdate = false;
	            }
	        }
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Change = __webpack_require__(23);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(10);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function Change() {},
	    digest: function digest() {
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// ref: https://github.com/aralejs/class
	
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
	
	    'Implements': function Implements(items) {
	
	        var list = (0, _utils.isArray)(items) ? items : [items];
	        var proto = this.prototype;
	
	        (0, _utils.each)(list, function (item) {
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
	        if (whiteList && indexOf(whiteList, key) === -1) {
	            return;
	        }
	
	        receiver[key] = value;
	    });
	}
	
	exports['default'] = Class;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(10);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _EventObject = __webpack_require__(26);
	
	var _EventObject2 = _interopRequireDefault(_EventObject);
	
	var eventSplitter = /\s+/;
	
	exports['default'] = _libBase2['default'].extend({
	
	    constructor: function EventSource() {
	        this.eventEnabled = true;
	        // lazy
	        // this.eventListeners = null;
	    },
	
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
	
	    emit: function emit(eventObj, sender) {
	        var that = this;
	        var listeners = that.eventListeners;
	        var returned = null;
	
	        // No events.
	        if (!listeners || !that.eventEnabled) {
	            return returned;
	        }
	
	        eventObj = eventObj || new _EventObject2['default']();
	
	        var eventName = eventObj.name;
	
	        if (!eventName) {
	            return returned;
	        }
	
	        sender = sender || that;
	        returned = []; // 返回每个回调函数返回值组成的数组
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(10);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function EventObject(name, eventData) {
	
	        var that = this;
	        var data = that.data = {};
	
	        that.name = name;
	        that.consumed = false;
	
	        eventData && (0, _commonUtils.extend)(data, eventData);
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane-0.0.1.js.map