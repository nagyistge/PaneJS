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
	    Graph: __webpack_require__(10),
	    Model: __webpack_require__(19),
	    View: __webpack_require__(15)
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
	
	    var sources = slice.call(arguments, 1);
	
	    for (var i = 0, length = sources.length; i < length; i++) {
	        forIn(sources[i], function (key, value) {
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
	exports.forEach = forEach;
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
	
	var _lang = __webpack_require__(2);
	
	var NS_SVG = 'http://www.w3.org/2000/svg';
	
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
	
	exports.isNode = isNode;
	exports.getCurrentStyle = getCurrentStyle;
	exports.createSvgElement = createSvgElement;

/***/ },
/* 9 */,
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
	
	var _eventsEventSource = __webpack_require__(12);
	
	var _eventsEventSource2 = _interopRequireDefault(_eventsEventSource);
	
	var _stylesStylesheet = __webpack_require__(29);
	
	var _stylesStylesheet2 = _interopRequireDefault(_stylesStylesheet);
	
	var _View = __webpack_require__(15);
	
	var _View2 = _interopRequireDefault(_View);
	
	var _Model = __webpack_require__(19);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _cellsNode = __webpack_require__(20);
	
	var _cellsNode2 = _interopRequireDefault(_cellsNode);
	
	var _cellsLink = __webpack_require__(28);
	
	var _cellsLink2 = _interopRequireDefault(_cellsLink);
	
	var _libGeometry = __webpack_require__(37);
	
	var _libGeometry2 = _interopRequireDefault(_libGeometry);
	
	exports['default'] = _commonClass2['default'].create({
	
	    Extends: _eventsEventSource2['default'],
	
	    constructor: function Graph(container, model, stylesheet) {
	
	        var that = this;
	
	        that.model = model || new _Model2['default']();
	        that.view = new _View2['default'](that);
	        that.stylesheet = stylesheet || new _stylesStylesheet2['default']();
	
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
	
	    insertNode: function insertNode(parent, id, value, x, y, width, height, style, relative) {
	
	        var that = this;
	        var node = that.createNode(id, value, x, y, width, height, style, relative);
	
	        return that.addNode(node, parent);
	    },
	
	    createNode: function createNode(id, value, x, y, width, height, style, relative) {
	        var geometry = new _libGeometry2['default'](x, y, width, height, relative);
	        return new _cellsNode2['default'](id, value, geometry, style);
	    },
	
	    addNode: function addNode(node, parent, index) {
	        return this.addCells([node], parent, index)[0];
	    },
	
	    insertLink: function insertLink() {},
	
	    createLink: function createLink() {},
	
	    addLink: function addLink(cell, parent) {},
	
	    addCells: function addCells(cells, parent, index, source, target) {
	
	        var that = this;
	        var model = that.model;
	
	        parent = parent || that.getDefaultParent();
	        index = (0, _commonUtils.isUndefined)(index) ? parent.getChildCount() : index;
	
	        model.beginUpdate();
	        that.cellsAdded(cells, parent, index, source, target, false, true);
	        model.endUpdate();
	
	        return cells;
	    },
	
	    cellsAdded: function cellsAdded(cells, parent, index, source, target, absolute, constrain) {
	
	        var that = this;
	        var model = that.model;
	
	        if (cells && parent && !(0, _commonUtils.isUndefined)(index)) {
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
	                //if (source) {
	                //    this.cellConnected(cells[i], source, true);
	                //}
	
	                // Sets the target terminal
	                //if (target) {
	                //    this.cellConnected(cells[i], target, false);
	                //}
	            });
	
	            model.endUpdate();
	        }
	    },
	
	    getCellStyle: function getCellStyle(cell) {},
	
	    getCurrentRoot: function getCurrentRoot() {
	        return this.view.currentRoot;
	    },
	
	    getDefaultParent: function getDefaultParent() {
	
	        var that = this;
	
	        return that.getCurrentRoot() || that.defaultParent || that.model.getRoot().getChildAt(0);
	    },
	
	    // 一些便利方法
	    // ----------
	
	    getModel: function getModel() {
	        return this.model;
	    },
	
	    getView: function getView() {
	        return this.view;
	    },
	
	    beginUpdate: function beginUpdate() {
	        this.model.beginUpdate();
	        return this;
	    },
	
	    endUpdate: function endUpdate() {
	        this.model.endUpdate();
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _EventObject = __webpack_require__(14);
	
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(13);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonDetector = __webpack_require__(16);
	
	var _commonDetector2 = _interopRequireDefault(_commonDetector);
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _libPoint = __webpack_require__(17);
	
	var _libPoint2 = _interopRequireDefault(_libPoint);
	
	var _libRectangle = __webpack_require__(18);
	
	var _libRectangle2 = _interopRequireDefault(_libRectangle);
	
	var _libDictionary = __webpack_require__(26);
	
	var _libDictionary2 = _interopRequireDefault(_libDictionary);
	
	var _changesChildChange = __webpack_require__(38);
	
	var _changesChildChange2 = _interopRequireDefault(_changesChildChange);
	
	exports['default'] = _libBase2['default'].extend({
	
	    constructor: function View(graph) {
	
	        var that = this;
	        that.graph = graph;
	        that.states = new _libDictionary2['default']();
	        that.translate = new _libPoint2['default']();
	        that.graphBounds = new _libRectangle2['default']();
	    },
	
	    getBounds: function getBounds() {},
	
	    setCurrentRoot: function setCurrentRoot() {},
	
	    scaleAndTranslate: function scaleAndTranslate() {},
	
	    setScale: function setScale() {},
	
	    setTranslate: function setTranslate() {},
	
	    refresh: function refresh() {},
	
	    revalidate: function revalidate() {
	        return this.invalidate().validate();
	    },
	
	    clear: function clear() {},
	
	    invalidate: function invalidate(cell, recurse, includeLink) {
	
	        var that = this;
	        var model = that.graph.model;
	
	        cell = cell || model.getRoot();
	        recurse = !(0, _commonUtils.isUndefined)(recurse) ? recurse : true;
	        includeLink = !(0, _commonUtils.isUndefined)(includeLink) ? includeLink : true;
	
	        var state = that.getState(cell);
	
	        if (state) {
	            state.invalid = true;
	        }
	
	        // 只有 node 才有递归的必要
	        if (!cell.invalidating && cell.isNode) {
	
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
	
	            delete cell.invalidating;
	        }
	
	        return that;
	    },
	
	    validate: function validate() {},
	
	    getEmptyBounds: function getEmptyBounds() {},
	
	    getBoundingBox: function getBoundingBox() {},
	
	    validateCell: function validateCell() {},
	
	    validateCellState: function validateCellState() {},
	
	    updateCellState: function updateCellState() {},
	
	    updateVertexState: function updateVertexState() {},
	
	    updateEdgeState: function updateEdgeState() {},
	
	    updateVertexLabelOffset: function updateVertexLabelOffset() {},
	
	    resetValidationState: function resetValidationState() {
	        this.lastNode = null;
	        this.lastHtmlNode = null;
	        this.lastForegroundNode = null;
	        this.lastForegroundHtmlNode = null;
	    },
	
	    stateValidated: function stateValidated(state) {},
	
	    updateFixedTerminalPoints: function updateFixedTerminalPoints() {},
	    updateFixedTerminalPoint: function updateFixedTerminalPoint() {},
	
	    updatePoints: function updatePoints(edge, points, source, target) {},
	
	    transformControlPoint: function transformControlPoint(state, pt) {},
	
	    getEdgeStyle: function getEdgeStyle(edge, points, source, target) {},
	
	    updateFloatingTerminalPoints: function updateFloatingTerminalPoints(state, source, target) {},
	
	    updateFloatingTerminalPoint: function updateFloatingTerminalPoint(edge, start, end, source) {},
	
	    getTerminalPort: function getTerminalPort(state, terminal, source) {},
	
	    getPerimeterPoint: function getPerimeterPoint(terminal, next, orthogonal, border) {},
	
	    getRoutingCenterX: function getRoutingCenterX(state) {},
	
	    getRoutingCenterY: function getRoutingCenterY(state) {},
	
	    getPerimeterBounds: function getPerimeterBounds(terminal, border) {},
	
	    getPerimeterFunction: function getPerimeterFunction(state) {},
	
	    getNextPoint: function getNextPoint(edge, opposite, source) {},
	
	    getVisibleTerminal: function getVisibleTerminal(edge, source) {},
	
	    updateEdgeBounds: function updateEdgeBounds(state) {},
	
	    getPoint: function getPoint(state, geometry) {},
	
	    getRelativePoint: function getRelativePoint(edgeState, x, y) {},
	
	    updateEdgeLabelOffset: function updateEdgeLabelOffset(state) {},
	
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
	
	        // TODO: that.currentRoot
	
	        var state = new CellState(this, cell, this.graph.getCellStyle(cell));
	
	        if (graph.container && cell !== that.currentRoot && (cell.isNode || cell.isLink)) {
	            this.graph.cellRenderer.createShape(state);
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
	        var root = (0, _commonUtils.createSvgElement)('svg');
	        var canvas = (0, _commonUtils.createSvgElement)('g');
	        var backgroundPane = (0, _commonUtils.createSvgElement)('g');
	        var drawPane = (0, _commonUtils.createSvgElement)('g');
	        var overlayPane = (0, _commonUtils.createSvgElement)('g');
	        var decoratorPane = (0, _commonUtils.createSvgElement)('g');
	
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
	
	            // update container style
	            var style = (0, _commonUtils.getCurrentStyle)(container);
	            if (style.position === 'static') {
	                container.style.position = 'relative';
	            }
	
	            // Disables built-in pan and zoom in IE10 and later
	            if (_commonDetector2['default'].IS_POINTER) {
	                container.style.msTouchAction = 'none';
	            }
	        }
	
	        that.installListeners();
	    },
	
	    installListeners: function installListeners() {},
	
	    destroy: function destroy() {}
	});
	module.exports = exports['default'];

/***/ },
/* 16 */
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
	
	    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),
	
	    IS_WIN: av.indexOf('Win') > 0,
	
	    IS_MAC: av.indexOf('Mac') > 0,
	
	    IS_TOUCH: 'ontouchstart' in document.documentElement,
	
	    IS_POINTER: window.navigator.msPointerEnabled || false
	};

/***/ },
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(13);
	
	var _Base2 = _interopRequireDefault(_Base);
	
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
	        return new Point(this.getCenterX(), this.getCenterY());
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _commonClass = __webpack_require__(11);
	
	var _commonClass2 = _interopRequireDefault(_commonClass);
	
	// cells
	
	var _cellsNode = __webpack_require__(20);
	
	var _cellsNode2 = _interopRequireDefault(_cellsNode);
	
	var _cellsLink = __webpack_require__(28);
	
	var _cellsLink2 = _interopRequireDefault(_cellsLink);
	
	// events
	
	var _eventsAspect = __webpack_require__(39);
	
	var _eventsAspect2 = _interopRequireDefault(_eventsAspect);
	
	var _eventsEventNames = __webpack_require__(22);
	
	var _eventsEventNames2 = _interopRequireDefault(_eventsEventNames);
	
	var _eventsEventSource = __webpack_require__(12);
	
	var _eventsEventSource2 = _interopRequireDefault(_eventsEventSource);
	
	// changes
	
	var _changesRootChange = __webpack_require__(23);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	var _changesChildChange = __webpack_require__(38);
	
	var _changesChildChange2 = _interopRequireDefault(_changesChildChange);
	
	var _changesChangeCollection = __webpack_require__(25);
	
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
	
	            if ((0, _commonUtils.isUndefined)(index)) {
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
	                var collision = that.getCell(id);
	
	                if (collision !== cell) {
	                    while (collision) {
	                        id = that.createId(cell);
	                        collision = that.getCell(id);
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
	
	            // 递归
	            if (cell.isNode) {
	                cell.eachChild(that.cellAdded, that);
	            }
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Cell = __webpack_require__(21);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	exports['default'] = _Cell2['default'].extend({
	
	    isNode: true,
	    connectAble: true,
	    transients: ['id', 'value', 'parent', 'children', 'links'],
	
	    constructor: function Node(id, value, geometry, style) {
	
	        var that = this;
	
	        Node.superclass.constructor.call(that, id, value, geometry, style);
	
	        // lazy
	        // that.parent = null;
	        // that.children = [];
	        // that.links = [];
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
	
	    // links
	    // ------
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	
	    // 属性访问器
	    //Accessors: [
	    //    'id',
	    //    'value',
	    //    'style',
	    //    'parent',
	    //    'visible',
	    //    'geometry'
	    //],
	
	    // 原型链上的属性
	    visible: true,
	
	    constructor: function Cell(id, value, geometry, style) {
	
	        var that = this;
	
	        that.id = id;
	        that.value = value;
	        that.geometry = geometry;
	        that.style = style;
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
	        var cloned = (0, _commonUtils.clone)(that, that.transients);
	        cloned.value = that.cloneValue();
	
	        return cloned;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Change = __webpack_require__(24);
	
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function Change() {},
	    digest: function digest() {
	        return this;
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _eventsEventNames = __webpack_require__(22);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonUtils = __webpack_require__(1);
	
	var _Base = __webpack_require__(13);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _commonObjectIdentity = __webpack_require__(27);
	
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Cell = __webpack_require__(21);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	exports['default'] = _Cell2['default'].extend({
	
	    isLink: true,
	    transients: ['id', 'value', 'parent', 'source', 'target'],
	
	    constructor: function Link(id, value, geometry, style) {
	
	        var that = this;
	
	        Link.superclass.constructor.call(that, id, value, geometry, style);
	
	        // lazy
	        // that.source = null;
	        // that.target = null;
	    },
	
	    getNode: function getNode(isSource) {
	        return isSource ? this.source : this.target;
	    },
	
	    setNode: function setNode(node, isSource) {
	        if (isSource) {
	            this.source = node;
	        } else {
	            this.target = node;
	        }
	
	        return node;
	    },
	
	    removeFromNode: function removeFromNode(isSource) {
	
	        var that = this;
	
	        var node = that.getNode(isSource);
	
	        node && node.removeLink(that, isSource);
	
	        return that;
	    }
	});
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
	
	var _libBase = __webpack_require__(13);
	
	var _libBase2 = _interopRequireDefault(_libBase);
	
	var _defaultLinkStyle = __webpack_require__(30);
	
	var _defaultLinkStyle2 = _interopRequireDefault(_defaultLinkStyle);
	
	var _defaultNodeStyle = __webpack_require__(31);
	
	var _defaultNodeStyle2 = _interopRequireDefault(_defaultNodeStyle);
	
	exports['default'] = _libBase2['default'].extend({
	    constructor: function Stylesheet() {
	        var that = this;
	
	        that.styles = {};
	        that.setDefaultNodeStyle((0, _commonUtils.extend)({}, _defaultNodeStyle2['default']));
	        that.setDefaultLinkStyle((0, _commonUtils.extend)({}, _defaultLinkStyle2['default']));
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
	
	    getStyle: function getStyle() {},
	
	    setStyle: function setStyle(name, style) {
	        this.styles[name] = style;
	        return this;
	    }
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
	
	var _enumsStyleNames = __webpack_require__(32);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _enumsShapeNames = __webpack_require__(33);
	
	var _enumsShapeNames2 = _interopRequireDefault(_enumsShapeNames);
	
	var _enumsAlignments = __webpack_require__(34);
	
	var _enumsAlignments2 = _interopRequireDefault(_enumsAlignments);
	
	var _enumsArrowTypes = __webpack_require__(36);
	
	var _enumsArrowTypes2 = _interopRequireDefault(_enumsArrowTypes);
	
	var style = {};
	
	style[_enumsStyleNames2['default'].SHAPE] = _enumsShapeNames2['default'].CONNECTOR;
	style[_enumsStyleNames2['default'].END_ARROW] = _enumsArrowTypes2['default'].CLASSIC;
	style[_enumsStyleNames2['default'].VERTICAL_ALIGN] = _enumsAlignments2['default'].MIDDLE;
	style[_enumsStyleNames2['default'].ALIGN] = _enumsAlignments2['default'].CENTER;
	style[_enumsStyleNames2['default'].STROKE_COLOR] = '#289de9';
	style[_enumsStyleNames2['default'].FONT_COLOR] = '#446299';
	
	exports['default'] = style;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _enumsStyleNames = __webpack_require__(32);
	
	var _enumsStyleNames2 = _interopRequireDefault(_enumsStyleNames);
	
	var _enumsShapeNames = __webpack_require__(33);
	
	var _enumsShapeNames2 = _interopRequireDefault(_enumsShapeNames);
	
	var _enumsAlignments = __webpack_require__(34);
	
	var _enumsAlignments2 = _interopRequireDefault(_enumsAlignments);
	
	var _commonPerimeter = __webpack_require__(35);
	
	var style = {};
	
	style[_enumsStyleNames2['default'].SHAPE] = _enumsShapeNames2['default'].RECTANGLE;
	style[_enumsStyleNames2['default'].PERIMETER] = _commonPerimeter.rectanglePerimeter;
	style[_enumsStyleNames2['default'].VERTICAL_ALIGN] = _enumsAlignments2['default'].MIDDLE;
	style[_enumsStyleNames2['default'].ALIGN] = _enumsAlignments2['default'].CENTER;
	style[_enumsStyleNames2['default'].FILL_COLOR] = '#e3f4ff';
	style[_enumsStyleNames2['default'].STROKE_COLOR] = '#289de9';
	style[_enumsStyleNames2['default'].FONT_COLOR] = '#774400';
	
	exports['default'] = style;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
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

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    LEFT: 'left',
	    CENTER: 'center',
	    RIGHT: 'right',
	    TOP: 'top',
	    MIDDLE: 'middle',
	    BOTTOM: 'bottom'
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libPoint = __webpack_require__(17);
	
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Rectangle = __webpack_require__(18);
	
	var _Rectangle2 = _interopRequireDefault(_Rectangle);
	
	exports['default'] = _Rectangle2['default'].extend({
	
	    //TRANSLATE_CONTROL_POINTS: true,
	    //alternateBounds: null,
	    //sourcePoint: null,
	    //targetPoint: null,
	    //points: null,
	    //offset: null,
	    //relative: false,
	
	    constructor: function Geometry(x, y, width, height, relative) {
	
	        var that = this;
	
	        Geometry.superclass.constructor.call(that, x, y, width, height);
	
	        that.relative = !!relative;
	    },
	
	    swap: function swap() {
	
	        var that = this;
	        var alternateBounds = that.alternateBounds;
	
	        if (alternateBounds) {
	            var old = new _Rectangle2['default'](that.x, that.y, that.width, that.height);
	
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
	
	        return point;
	    },
	
	    rotate: function rotate(angle, cx) {
	
	        var that = this;
	
	        var rad = utils.toRadians(angle);
	        var cos = Math.cos(rad);
	        var sin = Math.sin(rad);
	
	        // Rotates the geometry
	        if (!this.relative) {
	            var ct = new Point(this.getCenterX(), this.getCenterY());
	            var pt = utils.getRotatedPoint(ct, cos, sin, cx);
	
	            this.x = Math.round(pt.x - this.width / 2);
	            this.y = Math.round(pt.y - this.height / 2);
	        }
	
	        // Rotates the source point
	        if (this.sourcePoint) {
	            var pt = utils.getRotatedPoint(this.sourcePoint, cos, sin, cx);
	            this.sourcePoint.x = Math.round(pt.x);
	            this.sourcePoint.y = Math.round(pt.y);
	        }
	
	        // Translates the target point
	        if (this.targetPoint) {
	            var pt = utils.getRotatedPoint(this.targetPoint, cos, sin, cx);
	            this.targetPoint.x = Math.round(pt.x);
	            this.targetPoint.y = Math.round(pt.y);
	        }
	
	        // Translate the control points
	        if (this.points != null) {
	            for (var i = 0; i < this.points.length; i++) {
	                if (this.points[i] != null) {
	                    var pt = utils.getRotatedPoint(this.points[i], cos, sin, cx);
	                    this.points[i].x = Math.round(pt.x);
	                    this.points[i].y = Math.round(pt.y);
	                }
	            }
	        }
	    },
	
	    translate: function translate(dx, dy) {
	        dx = parseFloat(dx);
	        dy = parseFloat(dy);
	
	        // Translates the geometry
	        if (!this.relative) {
	            this.x = parseFloat(this.x) + dx;
	            this.y = parseFloat(this.y) + dy;
	        }
	
	        // Translates the source point
	        if (this.sourcePoint != null) {
	            this.sourcePoint.x = parseFloat(this.sourcePoint.x) + dx;
	            this.sourcePoint.y = parseFloat(this.sourcePoint.y) + dy;
	        }
	
	        // Translates the target point
	        if (this.targetPoint != null) {
	            this.targetPoint.x = parseFloat(this.targetPoint.x) + dx;
	            this.targetPoint.y = parseFloat(this.targetPoint.y) + dy;
	        }
	
	        // Translate the control points
	        if (this.TRANSLATE_CONTROL_POINTS && this.points != null) {
	            for (var i = 0; i < this.points.length; i++) {
	                if (this.points[i] != null) {
	                    this.points[i].x = parseFloat(this.points[i].x) + dx;
	                    this.points[i].y = parseFloat(this.points[i].y) + dy;
	                }
	            }
	        }
	    },
	
	    scale: function scale(sx, sy, fixedAspect) {
	        sx = parseFloat(sx);
	        sy = parseFloat(sy);
	
	        // Translates the source point
	        if (this.sourcePoint != null) {
	            this.sourcePoint.x = parseFloat(this.sourcePoint.x) * sx;
	            this.sourcePoint.y = parseFloat(this.sourcePoint.y) * sy;
	        }
	
	        // Translates the target point
	        if (this.targetPoint != null) {
	            this.targetPoint.x = parseFloat(this.targetPoint.x) * sx;
	            this.targetPoint.y = parseFloat(this.targetPoint.y) * sy;
	        }
	
	        // Translate the control points
	        if (this.points != null) {
	            for (var i = 0; i < this.points.length; i++) {
	                if (this.points[i] != null) {
	                    this.points[i].x = parseFloat(this.points[i].x) * sx;
	                    this.points[i].y = parseFloat(this.points[i].y) * sy;
	                }
	            }
	        }
	
	        // Translates the geometry
	        if (!this.relative) {
	            this.x = parseFloat(this.x) * sx;
	            this.y = parseFloat(this.y) * sy;
	
	            if (fixedAspect) {
	                sy = sx = Math.min(sx, sy);
	            }
	
	            this.width = parseFloat(this.width) * sx;
	            this.height = parseFloat(this.height) * sy;
	        }
	    },
	
	    equals: function equals() /*obj*/{}
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
	
	var _Change = __webpack_require__(24);
	
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
	
	        var isLink = child.isLink;
	        var newParent = that.previous;
	        var newIndex = that.previousIndex;
	        var previousParent = child.parent;
	        var previousIndex = previousParent ? previousParent.getChildIndex(child) : 0;
	
	        // 移除 link 上连接的 node
	        if (isLink && !newParent) {
	            that.connect(child, false);
	        }
	
	        previousParent = model.childChanged(child, newParent, newIndex);
	
	        if (isLink && newParent) {
	            that.connect(child, true);
	        }
	
	        that.parent = newParent;
	        that.index = newIndex;
	        that.previous = previousParent;
	        that.previousIndex = previousIndex;
	
	        return that;
	    },
	
	    connect: function connect(link, isConnected) {
	
	        var that = this;
	        var model = that.model;
	        var sourceNode = link.getNode(true);
	        var targetNode = link.getNode(false);
	
	        if (sourceNode) {
	            model.linkChanged(link, isConnected ? sourceNode : null, true);
	        }
	
	        if (targetNode) {
	            model.linkChanged(link, isConnected ? targetNode : null, false);
	        }
	
	        link.setNode(sourceNode, true);
	        link.setNode(targetNode, false);
	
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
	
	    that[methodName].__isAspected = true;
	}
	
	function before(methodName, callback, context) {
	    return weave.call(this, 'before', methodName, callback, context);
	}
	
	function after(methodName, callback, context) {
	    return weave.call(this, 'after', methodName, callback, context);
	}
	
	function around(methodName, callback, context) {
	    weave.call(this, 'before', methodName, callback, context);
	    weave.call(this, 'after', methodName, callback, context);
	    return this;
	}
	
	exports.before = before;
	exports.after = after;
	exports.around = around;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane.js.map