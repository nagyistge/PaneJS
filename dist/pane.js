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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	window.zGraph = module.exports = {
	    Canvas2D: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Canvas2D\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Cell: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Cell\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    CellRenderer: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./CellRenderer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    CellState: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./CellState\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    EventObject: __webpack_require__(14),
	    Geometry: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Geometry\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Graph: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Graph\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Model: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Model\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Point: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Point\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Rectangle: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Rectangle\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Shape: __webpack_require__(46),
	    View: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./View\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    constants: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./constants\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	};

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	/* jshint node: true, loopfunc: true, undef: true, unused: true */
	/* global window, document */
	
	'use strict';
	
	var detector = __webpack_require__(34);
	
	var utils = {};
	
	var arrProto = Array.prototype;
	var objProto = Object.prototype;
	var slice = arrProto.slice;
	var toString = objProto.toString;
	var hasOwn = objProto.hasOwnProperty;
	
	//var Point = require('../Point');
	//var Rectangle = require('../Rectangle');
	//var constants = require('../constants');
	
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
	
	    return length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
	}
	
	function isNumeric(obj) {
	    return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
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
	    return (n % m + m) % m;
	};
	
	// Object
	// ------
	
	function hasKey(obj, key) {
	    return obj !== null && hasOwn.call(obj, key);
	}
	
	function clone(obj, transients, shallow) {
	
	    shallow = shallow !== null ? shallow : false;
	    var cloned = null;
	
	    if (obj && isFunction(obj.constructor)) {
	        cloned = new obj.constructor();
	
	        for (var i in obj) {
	            //if (i !== mxObjectIdentity.FIELD_NAME && (!transients || indexOf(transients, i) < 0)) {
	            if (i !== 'objectId' && (!transients || utils.indexOf(transients, i) < 0)) {
	                if (!shallow && typeof obj[i] === 'object') {
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
	    if (a === null && b !== null || a !== null && b === null || a !== null && b !== null && a.length !== b.length) {
	        return false;
	    } else if (a && b) {
	        for (var key in a) {
	            if ((!isNaN(a[key]) || !isNaN(b[key])) && a[key] !== b[key]) {
	                return false;
	            }
	        }
	    }
	
	    return true;
	};
	
	// Array
	// -----
	
	utils.indexOf = arrProto.indexOf ? function (arr, item) {
	    return arr.indexOf(item);
	} : function (arr, item) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        if (arr[i] === item) {
	            return i;
	        }
	    }
	    return -1;
	};
	
	// TODO: 改为 forIn 和 each 两个方法
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
	
	/**
	 * Function: bind
	 *
	 * Returns a wrapper function that locks the execution scope of the given
	 * function to the specified scope. Inside funct, the "this" keyword
	 * becomes a reference to that scope.
	 */
	utils.bind = function (scope, funct) {
	    return function () {
	        return funct.apply(scope, arguments);
	    };
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
	
	utils.getOffset = function (container, scrollOffset) {
	    var offsetLeft = 0;
	    var offsetTop = 0;
	
	    if (scrollOffset !== null && scrollOffset) {
	        var offset = utils.getDocumentScrollOrigin(container.ownerDocument);
	        offsetLeft += offset.left;
	        offsetTop += offset.top;
	    }
	
	    while (container.offsetParent) {
	        offsetLeft += container.offsetLeft;
	        offsetTop += container.offsetTop;
	
	        container = container.offsetParent;
	    }
	
	    return {
	        left: offsetLeft,
	        top: offsetTop
	    };
	};
	
	utils.getDocumentScrollOrigin = function (doc) {
	    var wnd = doc.defaultView || doc.parentWindow;
	
	    var x = wnd && window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	
	    var y = wnd && window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	
	    return {
	        left: x,
	        top: y
	    };
	};
	
	utils.getScrollOrigin = function (node) {
	    var b = document.body;
	    var d = document.documentElement;
	    var result = utils.getDocumentScrollOrigin(node ? node.ownerDocument : document);
	
	    while (node && node !== b && node !== d) {
	        if (!isNaN(node.scrollLeft) && !isNaN(node.scrollTop)) {
	            result.left += node.scrollLeft;
	            result.top += node.scrollTop;
	        }
	
	        node = node.parentNode;
	    }
	
	    return result;
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
	
	utils.setCellStyles = function (model, cells, key, value) {
	    if (cells && cells.length) {
	        model.beginUpdate();
	        try {
	            for (var i = 0; i < cells.length; i++) {
	                if (cells[i] !== null) {
	                    var style = utils.setStyle(model.getStyle(cells[i]), key, value);
	                    model.setStyle(cells[i], style);
	                }
	            }
	        } finally {
	            model.endUpdate();
	        }
	    }
	};
	
	utils.setStyle = function (style, key, value) {
	    var isValue = value != null && (typeof value.length == 'undefined' || value.length > 0);
	
	    if (style == null || style.length == 0) {
	        if (isValue) {
	            style = key + '=' + value;
	        }
	    } else {
	        var index = style.indexOf(key + '=');
	
	        if (index < 0) {
	            if (isValue) {
	                var sep = style.charAt(style.length - 1) === ';' ? '' : ';';
	                style = style + sep + key + '=' + value;
	            }
	        } else {
	            var tmp = isValue ? key + '=' + value : '';
	            var cont = style.indexOf(';', index);
	
	            if (!isValue) {
	                cont++;
	            }
	
	            style = style.substring(0, index) + tmp + (cont > index ? style.substring(cont) : '');
	        }
	    }
	
	    return style;
	};
	
	utils.setPrefixedStyle = (function () {
	    var prefix = null;
	
	    if (detector.IS_OP && detector.IS_OT) {
	        prefix = 'O';
	    } else if (detector.IS_SF || detector.IS_GC) {
	        prefix = 'Webkit';
	    } else if (detector.IS_MT) {
	        prefix = 'Moz';
	    } else if (detector.IS_IE && document.documentMode >= 9 && document.documentMode < 10) {
	        prefix = 'ms';
	    }
	
	    return function (style, name, value) {
	        style[name] = value;
	
	        if (prefix !== null && name.length > 0) {
	            name = prefix + name.substring(0, 1).toUpperCase() + name.substring(1);
	            style[name] = value;
	        }
	    };
	})();
	
	module.exports = utils;

/***/ },

/***/ 11:
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

/***/ 13:
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

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	
	/* jshint node: true, loopfunc: true, undef: true, unused: true */
	
	'use strict';
	
	var Class = __webpack_require__(11);
	var utils = __webpack_require__(1);
	
	var isObject = utils.isObject;
	var extend = utils.extend;
	var isNullOrUndefined = utils.isNullOrUndefined;
	
	module.exports = Class.create({
	    constructor: function EventObject(name, eventData) {
	
	        var that = this;
	        var data = that.data = {};
	
	        that.name = name;
	        that.consumed = false;
	
	        isObject(eventData) && extend(data, eventData);
	    },
	
	    getName: function getName() {
	        return this.name;
	    },
	
	    addData: function addData(key, value) {
	
	        var evtObj = this;
	        var data = evtObj.data;
	
	        if (isObject(key)) {
	            extend(data, key);
	        } else {
	            data[key] = value;
	        }
	
	        return evtObj;
	    },
	
	    getData: function getData(key) {
	        var data = this.data;
	        return isNullOrUndefined(key) ? data : data[key];
	    },
	
	    isConsumed: function isConsumed() {
	        return this.consumed;
	    },
	
	    consume: function consume() {
	        this.consumed = true;
	    }
	});

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(13);
	
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

/***/ 34:
/***/ function(module, exports) {

	'use strict';
	
	var ua = navigator.userAgent;
	var av = navigator.appVersion;
	
	module.exports = {
	    // IE
	    IS_IE: ua.indexOf('MSIE') >= 0,
	
	    IS_QUIRKS: navigator.userAgent.indexOf('MSIE') >= 0 && (document.documentMode === null || document.documentMode === 5),
	
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
	
	    IS_POINTER: window.navigator.msPointerEnabled || false,
	
	    IS_OT: navigator.userAgent.indexOf('Presto/2.4.') < 0 && navigator.userAgent.indexOf('Presto/2.3.') < 0 && navigator.userAgent.indexOf('Presto/2.2.') < 0 && navigator.userAgent.indexOf('Presto/2.1.') < 0 && navigator.userAgent.indexOf('Presto/2.0.') < 0 && navigator.userAgent.indexOf('Presto/1.') < 0,
	
	    /**
	     * Variable: IS_MT
	     *
	     * True if -moz-transform is available as a CSS style. This is the case
	     * for all Firefox-based browsers newer than or equal 3, such as Camino,
	     * Iceweasel, Seamonkey and Iceape.
	     */
	    IS_MT: navigator.userAgent.indexOf('Firefox/') >= 0 && navigator.userAgent.indexOf('Firefox/1.') < 0 && navigator.userAgent.indexOf('Firefox/2.') < 0 || navigator.userAgent.indexOf('Iceweasel/') >= 0 && navigator.userAgent.indexOf('Iceweasel/1.') < 0 && navigator.userAgent.indexOf('Iceweasel/2.') < 0 || navigator.userAgent.indexOf('SeaMonkey/') >= 0 && navigator.userAgent.indexOf('SeaMonkey/1.') < 0 || navigator.userAgent.indexOf('Iceape/') >= 0 && navigator.userAgent.indexOf('Iceape/1.') < 0
	
	};

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(13);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _Point = __webpack_require__(23);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var Rectangle = _Base2['default'].extend({
	
	    constructor: function Rectangle(x, y, width, height) {
	
	        var that = this;
	
	        that.x = !(0, _commonUtils.isNullOrUndefined)(x) ? x : 0;
	        that.y = !(0, _commonUtils.isNullOrUndefined)(y) ? y : 0;
	        that.width = width ? width : 0; // w 和 h 不能为负数，所以不需要 isNullOrUndefined 判断
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

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _libRectangle = __webpack_require__(35);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var Shape = _libBase2['default'].extend({
	
	    node: null, // 图形的根节点，通常是 g 元素
	    state: null, // cellState
	    style: null, // cellStyle
	    bounds: null, // Rectangle 表示该图形的区域范围
	    boundingBox: null, // 图形的边框
	    stencil: null,
	    points: null,
	
	    pointerEvents: true,
	    svgPointerEvents: 'all',
	    svgStrokeTolerance: 8,
	    shapePointerEvents: false,
	    stencilPointerEvents: false,
	
	    scale: 1,
	    rotation: 0,
	    strokeWidth: 1,
	    opacity: 100, // 透明度
	    antiAlias: true, // 抗锯齿，平滑处理
	    outline: false,
	    visible: true, // 默认可见
	    flipH: false, // 水平翻转
	    flipV: false, // 垂直翻转
	
	    constructor: function Shape(stencil) {
	
	        var that = this;
	
	        that.stencil = stencil; // 模板
	    },
	
	    // 根据 state.style 初始化该图形的样式属性
	    apply: function apply(state) {
	
	        var that = this;
	
	        that.state = state;
	        that.style = state.style;
	
	        if (that.style) {
	            that.fill = (0, _commonUtils.getValue)(that.style, constants.STYLE_FILLCOLOR, that.fill);
	            that.gradient = (0, _commonUtils.getValue)(that.style, constants.STYLE_GRADIENTCOLOR, that.gradient);
	            that.gradientDirection = (0, _commonUtils.getValue)(that.style, constants.STYLE_GRADIENT_DIRECTION, that.gradientDirection);
	            that.opacity = (0, _commonUtils.getValue)(that.style, constants.STYLE_OPACITY, that.opacity);
	            that.stroke = (0, _commonUtils.getValue)(that.style, constants.STYLE_STROKECOLOR, that.stroke);
	            that.strokeWidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokeWidth);
	            // Arrow stroke width is used to compute the arrow heads size in mxConnector
	            that.arrowStrokewidth = getNumber(that.style, constants.STYLE_STROKEWIDTH, that.strokeWidth);
	            that.spacing = (0, _commonUtils.getValue)(that.style, constants.STYLE_SPACING, that.spacing);
	            that.startSize = getNumber(that.style, constants.STYLE_STARTSIZE, that.startSize);
	            that.endSize = getNumber(that.style, constants.STYLE_ENDSIZE, that.endSize);
	            that.startArrow = (0, _commonUtils.getValue)(that.style, constants.STYLE_STARTARROW, that.startArrow);
	            that.endArrow = (0, _commonUtils.getValue)(that.style, constants.STYLE_ENDARROW, that.endArrow);
	            that.rotation = (0, _commonUtils.getValue)(that.style, constants.STYLE_ROTATION, that.rotation);
	            that.direction = (0, _commonUtils.getValue)(that.style, constants.STYLE_DIRECTION, that.direction);
	            that.flipH = (0, _commonUtils.getValue)(that.style, constants.STYLE_FLIPH, 0) === 1;
	            that.flipV = (0, _commonUtils.getValue)(that.style, constants.STYLE_FLIPV, 0) === 1;
	
	            // Legacy support for stencilFlipH/V
	            if (that.stencil) {
	                that.flipH = (0, _commonUtils.getValue)(that.style, 'stencilFlipH', 0) === 1 || that.flipH;
	                that.flipV = (0, _commonUtils.getValue)(that.style, 'stencilFlipV', 0) === 1 || that.flipV;
	            }
	
	            if (that.direction === constants.DIRECTION_NORTH || that.direction === constants.DIRECTION_SOUTH) {
	                var tmp = that.flipH;
	                that.flipH = that.flipV;
	                that.flipV = tmp;
	            }
	
	            that.isShadow = (0, _commonUtils.getValue)(that.style, constants.STYLE_SHADOW, that.isShadow) === 1;
	            that.isDashed = (0, _commonUtils.getValue)(that.style, constants.STYLE_DASHED, that.isDashed) === 1;
	            that.isRounded = (0, _commonUtils.getValue)(that.style, constants.STYLE_ROUNDED, that.isRounded) === 1;
	            that.glass = (0, _commonUtils.getValue)(that.style, constants.STYLE_GLASS, that.glass) === 1;
	
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
	    init: function init(container) {
	
	        var that = this;
	        var node = that.node || that.create(container);
	
	        if (node && container) {
	            that.node = node;
	            container.appendChild(node);
	        }
	
	        return that;
	    },
	
	    create: function create(container) {
	        if (container && container.ownerSVGElement) {
	            return (0, _commonUtils.createSvgElement)('g');
	        }
	    },
	
	    // 删除根节点下所有的子元素
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
	
	    getScreenOffset: function getScreenOffset() {
	
	        var that = this;
	        var strokeWidth = that.strokeWidth;
	        //var strokeWidth = that.stencil && that.stencil.strokeWidth !== 'inherit'
	        //    ? that.stencil.strokeWidth
	        //    : that.strokeWidth;
	
	        strokeWidth = Math.max(1, Math.round(strokeWidth * that.scale));
	
	        return (0, _commonUtils.mod)(strokeWidth, 2) === 1 ? 0.5 : 0;
	    },
	
	    reconfigure: function reconfigure() {
	        return this.redraw();
	    },
	
	    redraw: function redraw() {
	
	        var that = this;
	        var node = that.node;
	
	        that.updateBoundsFromPoints();
	
	        if (that.visible && that.checkBounds()) {
	            node.style.visibility = 'visible';
	            that.clear(); // 删除根节点下的所有子元素
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
	
	            that.paint(canvas);
	            that.destroyCanvas(canvas);
	        }
	
	        return that;
	    },
	
	    paint: function paint(canvas) {
	
	        var that = this;
	        var bounds = that.bounds;
	
	        // Scale is passed-through to canvas
	        var scale = that.scale;
	        var x = bounds.x / scale;
	        var y = bounds.y / scale;
	        var w = bounds.width / scale;
	        var h = bounds.height / scale;
	
	        if (that.isPaintBoundsInverted()) {
	
	            var t = (w - h) / 2;
	            x += t;
	            y -= t;
	
	            var tmp = w;
	            w = h;
	            h = tmp;
	        }
	
	        that.updateTransform(canvas, x, y, w, h);
	        that.configureCanvas(canvas, x, y, w, h);
	
	        // Adds background rectangle to capture events
	        var bg = null;
	
	        if (!that.stencil && !that.points && that.shapePointerEvents || that.stencil && that.stencilPointerEvents) {
	
	            var bb = that.createBoundingBox();
	
	            bg = that.createTransparentSvgRectangle(bb.x, bb.y, bb.width, bb.height);
	            that.node.appendChild(bg);
	        }
	
	        if (that.stencil) {
	            that.stencil.drawShape(canvas, that, x, y, w, h);
	        } else {
	            // Stencils have separate strokeWidth
	            canvas.setStrokeWidth(that.strokeWidth);
	
	            if (that.points) {
	                var pts = [];
	                for (var i = 0; i < that.points.length; i++) {
	                    if (that.points[i]) {
	                        pts.push(new Point(that.points[i].x / scale, that.points[i].y / scale));
	                    }
	                }
	
	                that.paintEdgeShape(canvas, pts);
	            } else {
	                that.paintVertexShape(canvas, x, y, w, h);
	            }
	        }
	
	        if (bg && canvas.state && canvas.state.transform) {
	            bg.setAttribute('transform', canvas.state.transform);
	        }
	    },
	
	    paintVertexShape: function paintVertexShape(c, x, y, w, h) {
	        this.paintBackground(c, x, y, w, h);
	        c.setShadow(false);
	        this.paintForeground(c, x, y, w, h);
	    },
	
	    // 绘制 node 背景
	    paintBackground: function paintBackground(c, x, y, w, h) {},
	
	    // 绘制 node 前景
	    paintForeground: function paintForeground(c, x, y, w, h) {},
	
	    paintEdgeShape: function paintEdgeShape(c, pts) {},
	
	    paintGlassEffect: function paintGlassEffect(c, x, y, w, h, arc) {
	        var sw = Math.ceil(this.strokeWidth / 2);
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
	        } else {
	            c.moveTo(x - sw, y - sw);
	            c.lineTo(x - sw, y + h * size);
	            c.quadTo(x + w * 0.5, y + h * 0.7, x + w + sw, y + h * size);
	            c.lineTo(x + w + sw, y - sw);
	        }
	
	        c.close();
	        c.fill();
	    },
	
	    addPoints: function addPoints(c, pts, rounded, arcSize, close) {
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
	
	        while (i < (close ? pts.length : pts.length - 1)) {
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
	            } else {
	                c.lineTo(tmp.x, tmp.y);
	            }
	
	            pt = tmp;
	            i++;
	        }
	
	        if (close) {
	            c.close();
	        } else {
	            c.lineTo(pe.x, pe.y);
	        }
	    },
	
	    updateBoundsFromPoints: function updateBoundsFromPoints() {
	
	        var that = this;
	        var bounds;
	
	        each(that.points || [], function (point, index) {
	
	            var rect = new _libRectangle2['default'](point.x, point.y, 1, 1);
	
	            if (index === 0) {
	                that.bounds = bounds = rect;
	            } else {
	                bounds.add(rect);
	            }
	        });
	
	        return that;
	    },
	
	    checkBounds: function checkBounds() {
	
	        var bounds = this.bounds;
	
	        return bounds && !isNaN(bounds.x) && !isNaN(bounds.y) && !isNaN(bounds.width) && !isNaN(bounds.height) && bounds.width > 0 && bounds.height > 0;
	    },
	
	    getLabelBounds: function getLabelBounds(rect) {
	        return rect;
	    },
	
	    getGradientBounds: function getGradientBounds(c, x, y, w, h) {
	        return new _libRectangle2['default'](x, y, w, h);
	    },
	
	    // 圆弧尺寸
	    getArcSize: function getArcSize(w, h) {
	        var f = (0, _commonUtils.getValue)(this.style, constants.STYLE_ARCSIZE, constants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
	        return Math.min(w * f, h * f);
	    },
	
	    createBoundingBox: function createBoundingBox() {
	
	        var bb = this.bounds.clone();
	
	        if (this.stencil && (this.direction === constants.DIRECTION_NORTH || this.direction === constants.DIRECTION_SOUTH) || this.isPaintBoundsInverted()) {
	            bb.rotate90();
	        }
	
	        return bb;
	    },
	
	    updateBoundingBox: function updateBoundingBox() {
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
	
	    augmentBoundingBox: function augmentBoundingBox(bbox) {
	        if (this.isShadow) {
	            bbox.width += Math.ceil(constants.SHADOW_OFFSET_X * this.scale);
	            bbox.height += Math.ceil(constants.SHADOW_OFFSET_Y * this.scale);
	        }
	
	        // Adds strokeWidth
	        bbox.grow(this.strokeWidth * this.scale / 2);
	    },
	
	    updateTransform: function updateTransform(canvas, x, y, w, h) {
	
	        var shape = this;
	
	        canvas.scale(shape.scale);
	        canvas.rotate(shape.getShapeRotation(), shape.flipH, shape.flipV, x + w / 2, y + h / 2);
	
	        return shape;
	    },
	
	    createCanvas: function createCanvas() {
	
	        var that = this;
	        var node = that.node;
	        var canvas = new Canvas2D(node, false);
	
	        canvas.strokeTolerance = that.pointerEvents ? that.svgStrokeTolerance : 0;
	        canvas.pointerEventsValue = that.svgPointerEvents;
	        canvas.blockImagePointerEvents = false; //mxClient.IS_FF;
	        canvas.antiAlias = that.antiAlias; // 抗锯齿
	
	        var off = that.getScreenOffset();
	
	        if (off === 0) {
	            node.removeAttribute('transform');
	        } else {
	            node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
	        }
	
	        if (that.outline) {
	            canvas.setStrokeWidth(this.strokeWidth);
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
	
	    configureCanvas: function configureCanvas(canvas, x, y, w, h) {
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
	
	        each(canvas.gradients, function (gradient) {
	            gradient.mxRefCount = (gradient.mxRefCount || 0) + 1;
	        });
	        this.releaseSvgGradients(this.oldGradients);
	        this.oldGradients = canvas.gradients;
	    },
	
	    setCursor: function setCursor(cursor) {
	
	        var shape = this;
	        var node = shape.node;
	
	        cursor = cursor || '';
	
	        shape.cursor = cursor;
	
	        if (node) {
	            node.style.cursor = cursor;
	        }
	
	        return shape;
	    },
	
	    getCursor: function getCursor() {
	        return this.cursor;
	    },
	
	    getRotation: function getRotation() {
	        var rotation = this.rotation;
	        return isNullOrUndefined(rotation) ? 0 : rotation;
	    },
	
	    getTextRotation: function getTextRotation() {
	        var rot = this.getRotation();
	
	        if ((0, _commonUtils.getValue)(this.style, constants.STYLE_HORIZONTAL, 1) !== 1) {
	            //rot += mxText.prototype.verticalTextRotation;
	            rot += -90;
	        }
	
	        return rot;
	    },
	
	    getShapeRotation: function getShapeRotation() {
	        var rot = this.getRotation();
	
	        if (this.direction) {
	            if (this.direction === constants.DIRECTION_NORTH) {
	                rot += 270;
	            } else if (this.direction === constants.DIRECTION_WEST) {
	                rot += 180;
	            } else if (this.direction === constants.DIRECTION_SOUTH) {
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
	        return !this.stencil && (this.direction === constants.DIRECTION_NORTH || this.direction === constants.DIRECTION_SOUTH);
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

/***/ }

/******/ })
});
;
//# sourceMappingURL=pane.js.map