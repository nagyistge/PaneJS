(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["panejs"] = factory();
	else
		root["panejs"] = factory();
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ConnectionHandler = exports.SelectionHandler = exports.Handler = exports.VectorView = exports.PortalView = exports.NodeView = exports.LinkView = exports.CellView = exports.Terminal = exports.Portal = exports.Node = exports.Link = exports.Cell = exports.Paper = exports.Model = exports.Events = exports.VElement = exports.vector = exports.detector = exports.utils = undefined;
	
	var _index = __webpack_require__(76);
	
	Object.keys(_index).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _index[key];
	    }
	  });
	});
	
	var _index2 = __webpack_require__(1);
	
	Object.keys(_index2).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _index2[key];
	    }
	  });
	});
	
	var _index3 = __webpack_require__(41);
	
	Object.keys(_index3).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _index3[key];
	    }
	  });
	});
	
	var _index4 = __webpack_require__(50);
	
	Object.keys(_index4).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _index4[key];
	    }
	  });
	});
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _detector = __webpack_require__(15);
	
	var _detector2 = _interopRequireDefault(_detector);
	
	var _Events = __webpack_require__(52);
	
	var _Events2 = _interopRequireDefault(_Events);
	
	var _Model = __webpack_require__(53);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _Paper = __webpack_require__(58);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _Cell = __webpack_require__(20);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _Link = __webpack_require__(60);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	var _Node = __webpack_require__(3);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _Portal = __webpack_require__(25);
	
	var _Portal2 = _interopRequireDefault(_Portal);
	
	var _Terminal = __webpack_require__(21);
	
	var _Terminal2 = _interopRequireDefault(_Terminal);
	
	var _CellView = __webpack_require__(32);
	
	var _CellView2 = _interopRequireDefault(_CellView);
	
	var _LinkView = __webpack_require__(59);
	
	var _LinkView2 = _interopRequireDefault(_LinkView);
	
	var _NodeView = __webpack_require__(29);
	
	var _NodeView2 = _interopRequireDefault(_NodeView);
	
	var _PortalView = __webpack_require__(26);
	
	var _PortalView2 = _interopRequireDefault(_PortalView);
	
	var _VectorView = __webpack_require__(30);
	
	var _VectorView2 = _interopRequireDefault(_VectorView);
	
	var _Handler = __webpack_require__(61);
	
	var _Handler2 = _interopRequireDefault(_Handler);
	
	var _Selection = __webpack_require__(62);
	
	var _Selection2 = _interopRequireDefault(_Selection);
	
	var _Connection = __webpack_require__(65);
	
	var _Connection2 = _interopRequireDefault(_Connection);
	
	var _sharp = __webpack_require__(66);
	
	var _sharp2 = _interopRequireDefault(_sharp);
	
	var _smooth = __webpack_require__(67);
	
	var _smooth2 = _interopRequireDefault(_smooth);
	
	var _rounded = __webpack_require__(68);
	
	var _rounded2 = _interopRequireDefault(_rounded);
	
	var _classic = __webpack_require__(69);
	
	var _classic2 = _interopRequireDefault(_classic);
	
	var _diamond = __webpack_require__(70);
	
	var _diamond2 = _interopRequireDefault(_diamond);
	
	var _block = __webpack_require__(71);
	
	var _block2 = _interopRequireDefault(_block);
	
	var _cloven = __webpack_require__(72);
	
	var _cloven2 = _interopRequireDefault(_cloven);
	
	var _oval = __webpack_require__(73);
	
	var _oval2 = _interopRequireDefault(_oval);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// models
	// ------
	
	
	// core
	// ----
	// common
	// ------
	
	
	_Paper2.default.registConnector('sharp', _sharp2.default).registConnector('smooth', _smooth2.default).registConnector('rounded', _rounded2.default);
	
	// markers
	// -------
	
	
	// connectors
	// ----------
	
	
	// views
	// -----
	
	
	_Paper2.default.registMarker('classic', _classic2.default).registMarker('diamond', _diamond2.default).registMarker('cloven', _cloven2.default).registMarker('block', _block2.default).registMarker('oval', _oval2.default);
	
	// exports
	// -------
	
	exports.utils = utils;
	exports.detector = _detector2.default;
	exports.vector = _vector2.default;
	exports.VElement = _vector.VElement;
	exports.Events = _Events2.default;
	exports.Model = _Model2.default;
	exports.Paper = _Paper2.default;
	exports.Cell = _Cell2.default;
	exports.Link = _Link2.default;
	exports.Node = _Node2.default;
	exports.Portal = _Portal2.default;
	exports.Terminal = _Terminal2.default;
	exports.CellView = _CellView2.default;
	exports.LinkView = _LinkView2.default;
	exports.NodeView = _NodeView2.default;
	exports.PortalView = _PortalView2.default;
	exports.VectorView = _VectorView2.default;
	exports.Handler = _Handler2.default;
	exports.SelectionHandler = _Selection2.default;
	exports.ConnectionHandler = _Connection2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shapes = undefined;
	
	var _Rect = __webpack_require__(2);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Path = __webpack_require__(22);
	
	var _Path2 = _interopRequireDefault(_Path);
	
	var _Text = __webpack_require__(23);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Ports = __webpack_require__(24);
	
	var _Ports2 = _interopRequireDefault(_Ports);
	
	var _Image = __webpack_require__(33);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	var _Circle = __webpack_require__(34);
	
	var _Circle2 = _interopRequireDefault(_Circle);
	
	var _Rhombus = __webpack_require__(35);
	
	var _Rhombus2 = _interopRequireDefault(_Rhombus);
	
	var _Ellipse = __webpack_require__(36);
	
	var _Ellipse2 = _interopRequireDefault(_Ellipse);
	
	var _Polygon = __webpack_require__(37);
	
	var _Polygon2 = _interopRequireDefault(_Polygon);
	
	var _Polyline = __webpack_require__(38);
	
	var _Polyline2 = _interopRequireDefault(_Polyline);
	
	var _LabelLink = __webpack_require__(39);
	
	var _LabelLink2 = _interopRequireDefault(_LabelLink);
	
	var _ElementLink = __webpack_require__(40);
	
	var _ElementLink2 = _interopRequireDefault(_ElementLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var shapes = {
	  basic: {
	    Text: _Text2.default,
	    Rect: _Rect2.default,
	    Path: _Path2.default,
	    Image: _Image2.default,
	    Ports: _Ports2.default,
	    Circle: _Circle2.default,
	    Rhombus: _Rhombus2.default,
	    Ellipse: _Ellipse2.default,
	    Polygon: _Polygon2.default,
	    Polyline: _Polyline2.default,
	    LabelLink: _LabelLink2.default,
	    ElementLink: _ElementLink2.default
	  }
	};
	
	exports.shapes = shapes;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rect = function (_Node) {
	  _inherits(Rect, _Node);
	
	  function Rect() {
	    _classCallCheck(this, Rect);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Rect).apply(this, arguments));
	  }
	
	  return Rect;
	}(_Node3.default);
	
	Rect.setDefaults({
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><rect/></g><text/></g>',
	
	  attrs: {
	    '.': {
	      fill: '#fff',
	      stroke: 'none'
	    },
	    'rect': {
	      'fill': '#fff',
	      'stroke': '#000',
	      'stroke-width': '1',
	      'width': 80,
	      'height': 30
	    },
	    'text': {
	      'fill': '#000',
	      'font-size': 12,
	      'ref-x': .5,
	      'ref-y': .5,
	      'text-anchor': 'middle',
	      'y-alignment': 'middle',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Rect;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Cell2 = __webpack_require__(20);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Node = function (_Cell) {
	  _inherits(Node, _Cell);
	
	  function Node() {
	    _classCallCheck(this, Node);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Node).apply(this, arguments));
	  }
	
	  _createClass(Node, [{
	    key: 'isNode',
	
	
	    // methods
	    // -------
	
	    value: function isNode() {
	
	      return true;
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox() {
	
	      var pos = this.getPosition();
	      var size = this.getSize();
	
	      return new _Rect2.default(pos.x, pos.y, size.width, size.height);
	    }
	  }], [{
	    key: 'isNode',
	
	
	    // static
	    // ------
	
	    value: function isNode(node) {
	
	      return node && node instanceof Node;
	    }
	  }]);
	
	  return Node;
	}(_Cell3.default);
	
	Node.setDefaults({
	  tagName: 'g',
	  markup: '',
	  classNames: 'pane-cell pane-node', // pane-cell for event handler
	  pane: null, // specify the drawPane of the view
	  view: null, // specify the constructor of the view
	  data: null, // cached data(for business logic)
	  attrs: null, // styles
	
	  size: {
	    width: 1,
	    height: 1,
	    relative: false
	  },
	  position: {
	    x: 0,
	    y: 0,
	    relative: false
	  },
	  rotation: {
	    angle: 0,
	    inherited: true // inherit the parent's rotation
	  }
	});
	
	// exports
	// -------
	
	exports.default = Node;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Line = __webpack_require__(19);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rect = function () {
	  function Rect() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	    _classCallCheck(this, Rect);
	
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }
	
	  // statics
	  // -------
	
	  _createClass(Rect, [{
	    key: 'getOrigin',
	
	
	    // methods
	    // -------
	
	    value: function getOrigin() {
	
	      return new _Point2.default(this.x, this.y);
	    }
	  }, {
	    key: 'getCenter',
	    value: function getCenter() {
	
	      return new _Point2.default(this.x + this.width / 2, this.y + this.height / 2);
	    }
	  }, {
	    key: 'getCorner',
	    value: function getCorner() {
	
	      return new _Point2.default(this.x + this.width, this.y + this.height);
	    }
	  }, {
	    key: 'getTopRight',
	    value: function getTopRight() {
	
	      return new _Point2.default(this.x + this.width, this.y);
	    }
	  }, {
	    key: 'getBottomLeft',
	    value: function getBottomLeft() {
	
	      return new _Point2.default(this.x, this.y + this.height);
	    }
	  }, {
	    key: 'getNearestSideToPoint',
	    value: function getNearestSideToPoint(point) {
	
	      // get (left|right|top|bottom) side which is nearest to point
	
	      var distToLeft = point.x - this.x;
	      var distToTop = point.y - this.y;
	      var distToRight = this.x + this.width - point.x;
	      var distToBottom = this.y + this.height - point.y;
	
	      var closest = distToLeft;
	      var side = 'left';
	
	      if (distToRight < closest) {
	
	        closest = distToRight;
	        side = 'right';
	      }
	
	      if (distToTop < closest) {
	
	        closest = distToTop;
	        side = 'top';
	      }
	
	      if (distToBottom < closest) {
	
	        // closest = distToBottom;
	        side = 'bottom';
	      }
	
	      return side;
	    }
	  }, {
	    key: 'getNearestPointToPoint',
	    value: function getNearestPointToPoint(point) {
	
	      // get a point on my boundary nearest to `point`
	
	      if (this.containsPoint(point)) {
	
	        var side = this.getNearestSideToPoint(point);
	
	        if (side === 'right') {
	
	          return new _Point2.default(this.x + this.width, point.y);
	        } else if (side === 'left') {
	
	          return new _Point2.default(this.x, point.y);
	        } else if (side === 'bottom') {
	
	          return new _Point2.default(point.x, this.y + this.height);
	        } else if (side === 'top') {
	
	          return new _Point2.default(point.x, this.y);
	        }
	      }
	
	      return point.adhereToRect(this);
	    }
	  }, {
	    key: 'containsPoint',
	    value: function containsPoint(point) {
	      return point && point.x >= this.x && point.x <= this.x + this.width && point.y >= this.y && point.y <= this.y + this.height;
	    }
	  }, {
	    key: 'containsRect',
	    value: function containsRect(rect) {
	
	      this.normalize();
	      rect.normalize();
	
	      var x2 = rect.x;
	      var y2 = rect.y;
	      var w2 = rect.width;
	      var h2 = rect.height;
	
	      var x1 = this.x;
	      var y1 = this.y;
	      var w1 = this.width;
	      var h1 = this.height;
	
	      return x2 >= x1 && y2 >= y1 && x2 + w2 <= x1 + w1 && y2 + h2 <= y1 + h1;
	    }
	  }, {
	    key: 'unContainsRect',
	    value: function unContainsRect(rect) {
	
	      this.normalize();
	      rect.normalize();
	
	      return !(this.containPoint(rect.getOrigin()) || this.containPoint(rect.getCorner()) || this.containPoint(rect.getTopRight()) || this.containPoint(rect.getBottomLeft()));
	    }
	  }, {
	    key: 'intersect',
	    value: function intersect(rect) {
	
	      var origin1 = this.getOrigin();
	      var corner1 = this.getCorner();
	      var origin2 = rect.getOrigin();
	      var corner2 = rect.getCorner();
	
	      // no intersection found
	      if (origin1.x >= corner2.x || origin1.y >= corner2.y || origin2.x >= corner1.x || origin2.y >= corner1.y) {
	        return null;
	      }
	
	      var x = Math.max(origin1.x, origin2.x);
	      var y = Math.max(origin1.y, origin2.y);
	      var w = Math.min(corner1.x, corner2.x) - x;
	      var h = Math.min(corner1.y, corner2.y) - y;
	
	      return new Rect(x, y, w, h);
	    }
	  }, {
	    key: 'union',
	    value: function union(rect) {
	
	      var origin1 = this.getOrigin();
	      var corner1 = this.getCorner();
	      var origin2 = rect.getOrigin();
	      var corner2 = rect.getCorner();
	
	      var originX = Math.min(origin1.x, origin2.x);
	      var originY = Math.min(origin1.y, origin2.y);
	      var cornerX = Math.max(corner1.x, corner2.x);
	      var cornerY = Math.max(corner1.y, corner2.y);
	
	      return new Rect(originX, originY, cornerX - originX, cornerY - originY);
	    }
	  }, {
	    key: 'intersectionWithLineFromCenterToPoint',
	    value: function intersectionWithLineFromCenterToPoint(point, angle) {
	
	      // Find point on my boundary where line starting from my center ending
	      // in point p intersects me. If angle is specified, intersection with
	      // rotated rectangle is computed.
	
	      var result = void 0;
	      var center = this.getCenter();
	
	      if (angle) {
	        point.rotate(center, angle);
	      }
	
	      // clockwise, starting from the top side
	      var sides = [new _Line2.default(this.getOrigin(), this.getTopRight()), new _Line2.default(this.getTopRight(), this.getCorner()), new _Line2.default(this.getCorner(), this.getBottomLeft()), new _Line2.default(this.getBottomLeft(), this.getOrigin())];
	
	      var connector = new _Line2.default(center, point);
	
	      for (var i = sides.length - 1; i >= 0; i -= 1) {
	        var intersection = sides[i].intersection(connector);
	        if (intersection) {
	          result = intersection;
	          break;
	        }
	      }
	
	      if (result && angle) {
	        result.rotate(center, -angle);
	      }
	
	      return result;
	    }
	  }, {
	    key: 'moveAndExpand',
	    value: function moveAndExpand(rect) {
	
	      this.x += rect.x || 0;
	      this.y += rect.y || 0;
	      this.width += rect.width || 0;
	      this.height += rect.height || 0;
	
	      return this;
	    }
	  }, {
	    key: 'grow',
	    value: function grow(amount) {
	
	      this.x -= amount;
	      this.y -= amount;
	      this.width += 2 * amount;
	      this.height += 2 * amount;
	
	      return this;
	    }
	  }, {
	    key: 'round',
	    value: function round(precision) {
	
	      this.x = precision ? utils.toFixed(this.x, precision) : Math.round(this.x);
	      this.y = precision ? utils.toFixed(this.y, precision) : Math.round(this.y);
	      this.width = precision ? utils.toFixed(this.width, precision) : Math.round(this.width);
	      this.height = precision ? utils.toFixed(this.height, precision) : Math.round(this.height);
	
	      return this;
	    }
	  }, {
	    key: 'normalize',
	    value: function normalize() {
	
	      // Normalize the rectangle.
	      // i.e., make it so that it has a non-negative width and height.
	      // If width < 0 the function swaps the left and right corners,
	      // and it swaps the top and bottom corners if height < 0
	
	      var x = this.x;
	      var y = this.y;
	      var w = this.width;
	      var h = this.height;
	
	      if (w < 0) {
	        x = x + w;
	        w = -w;
	      }
	
	      if (h < 0) {
	        y = y + h;
	        h = -h;
	      }
	
	      this.x = x;
	      this.y = y;
	      this.width = w;
	      this.height = h;
	
	      return this;
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(angle) {
	
	      var rad = utils.toRad(angle || 0);
	      var sin = Math.abs(Math.sin(rad));
	      var cos = Math.abs(Math.cos(rad));
	      var w = this.width * cos + this.height * sin;
	      var h = this.width * sin + this.height * cos;
	
	      return new Rect(this.x + (this.width - w) / 2, this.y + (this.height - h) / 2, w, h);
	    }
	  }, {
	    key: 'snapToGrid',
	    value: function snapToGrid(gx, gy) {
	
	      var that = this;
	      var origin = that.getOrigin();
	      var corner = that.getCorner();
	
	      origin = origin.snapToGrid(gx, gy);
	      corner = corner.snapToGrid(gx, gy);
	
	      that.x = origin.x;
	      that.y = origin.y;
	      that.width = corner.x - origin.x;
	      that.height = corner.y - origin.y;
	
	      return that;
	    }
	
	    // common
	    // ------
	
	  }, {
	    key: 'equals',
	    value: function equals(rect) {
	
	      return Rect.equals(this, rect);
	    }
	  }, {
	    key: 'valueOf',
	    value: function valueOf() {
	
	      return [this.x, this.y, this.width, this.height];
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	
	      return this.valueOf().join(', ');
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	
	      return Rect.fromRect(this);
	    }
	  }], [{
	    key: 'equals',
	    value: function equals(rect1, rect2) {
	
	      var result = this.isRect(rect1) && this.isRect(rect2);
	      if (result) {
	
	        rect1.standardizePort();
	        rect2.standardizePort();
	
	        result = rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
	      }
	
	      return result;
	    }
	  }, {
	    key: 'fromRect',
	    value: function fromRect(rect) {
	
	      return new Rect(rect.x, rect.y, rect.width, rect.height);
	    }
	  }, {
	    key: 'fromVerticesAndRotation',
	    value: function fromVerticesAndRotation(v1, v2) {
	      var rotation = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	
	      var cx = (v1.x + v2.x) / 2;
	      var cy = (v1.y + v2.y) / 2;
	
	      var distance = new _Point2.default(v1.x, v1.y).distance(new _Point2.default(v2.x, v2.y));
	      var verticesAngle = Math.atan(Math.abs((v2.y - v1.y) / (v1.x - v2.x))) * 180 / Math.PI;
	
	      var width = Math.abs(distance * Math.sin((90 - rotation + verticesAngle) / 180 * Math.PI));
	      var height = Math.abs(distance * Math.cos((90 - rotation + verticesAngle) / 180 * Math.PI));
	
	      var x = cx - width / 2;
	      var y = cy - height / 2;
	
	      var rect = new Rect(x, y, width, height);
	
	      rect.cx = cx;
	      rect.cy = cy;
	      rect.rotation = rotation;
	
	      return rect;
	    }
	  }, {
	    key: 'isRect',
	    value: function isRect(rect) {
	
	      return rect && rect instanceof Rect;
	    }
	  }]);
	
	  return Rect;
	}();
	
	// exports
	// -------
	
	exports.default = Rect;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lang = __webpack_require__(6);
	
	Object.keys(_lang).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _lang[key];
	    }
	  });
	});
	
	var _array = __webpack_require__(7);
	
	Object.keys(_array).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _array[key];
	    }
	  });
	});
	
	var _string = __webpack_require__(8);
	
	Object.keys(_string).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _string[key];
	    }
	  });
	});
	
	var _number = __webpack_require__(10);
	
	Object.keys(_number).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _number[key];
	    }
	  });
	});
	
	var _object = __webpack_require__(9);
	
	Object.keys(_object).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _object[key];
	    }
	  });
	});
	
	var _function = __webpack_require__(11);
	
	Object.keys(_function).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _function[key];
	    }
	  });
	});
	
	var _dom = __webpack_require__(12);
	
	Object.keys(_dom).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _dom[key];
	    }
	  });
	});
	
	var _geom = __webpack_require__(13);
	
	Object.keys(_geom).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _geom[key];
	    }
	  });
	});
	
	var _event = __webpack_require__(14);
	
	Object.keys(_event).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _event[key];
	    }
	  });
	});
	
	var _pathData = __webpack_require__(16);
	
	Object.keys(_pathData).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _pathData[key];
	    }
	  });
	});
	
	var _transform = __webpack_require__(17);
	
	Object.keys(_transform).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _transform[key];
	    }
	  });
	});
	exports.default = {};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var toString = Object.prototype.toString;
	
	var isNull = exports.isNull = function isNull(val) {
	  return val === null;
	};
	var isString = exports.isString = function isString(val) {
	  return typeof val === 'string';
	};
	var isBoolean = exports.isBoolean = function isBoolean(val) {
	  return typeof val === 'boolean';
	};
	var isUndefined = exports.isUndefined = function isUndefined(val) {
	  return typeof val === 'undefined';
	};
	
	// is null or undefined
	var isNil = exports.isNil = function isNil(val) {
	  return isUndefined(val) || isNull(val);
	};
	
	// function and object are truly
	var isObject = exports.isObject = function isObject(val) {
	
	  if (!val) {
	    return false;
	  }
	
	  return typeof val === 'function' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
	};
	
	var isType = exports.isType = function isType(val, type) {
	  return toString.call(val) === '[object ' + type + ']';
	};
	var isArray = exports.isArray = function isArray(val) {
	  return Array.isArray(val);
	};
	var isWindow = exports.isWindow = function isWindow(val) {
	  return val && val === val.window;
	};
	var isNumeric = exports.isNumeric = function isNumeric(val) {
	  return !isArray(val) && val - parseFloat(val) + 1 >= 0;
	};
	var isFunction = exports.isFunction = function isFunction(val) {
	  return isType(val, 'Function');
	};
	
	var isArrayLike = exports.isArrayLike = function isArrayLike(val) {
	
	  if (isArray(val)) {
	    return true;
	  }
	
	  if (isFunction(val) || isWindow(val)) {
	    return false;
	  }
	
	  var len = !!val && 'length' in val && val.length;
	
	  return len === 0 || typeof len === 'number' && len > 0 && len - 1 in val;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArray = toArray;
	exports.slice = slice;
	exports.indexOf = indexOf;
	exports.contains = contains;
	exports.lastIndexOf = lastIndexOf;
	exports.map = map;
	exports.some = some;
	exports.every = every;
	exports.filter = filter;
	exports.forEach = forEach;
	exports.reduce = reduce;
	exports.reduceRight = reduceRight;
	
	var _lang = __webpack_require__(6);
	
	var proto = Array.prototype;
	
	function toArray(arr) {
	  return (0, _lang.isArrayLike)(arr) ? proto.slice.call(arr) : [arr];
	}
	
	function slice(arr, start, end) {
	  return arr ? proto.slice.call(arr, start, end) : [];
	}
	
	function indexOf(arr, item) {
	  return arr ? proto.indexOf.call(arr, item) : -1;
	}
	
	function contains(arr, item) {
	  return arr ? indexOf(arr, item) >= 0 : false;
	}
	
	function lastIndexOf(arr, item) {
	  return arr ? proto.lastIndexOf.call(arr, item) : -1;
	}
	
	function map(arr, iterator, context) {
	  return arr ? proto.map.call(arr, iterator, context) : [];
	}
	
	function some(arr, iterator, context) {
	  return arr ? proto.some.call(arr, iterator, context) : false;
	}
	
	function every(arr, iterator, context) {
	  return arr ? proto.every.call(arr, iterator, context) : false;
	}
	
	function filter(arr, iterator, context) {
	  return arr ? proto.filter.call(arr, iterator, context) : [];
	}
	
	function forEach(arr, iterator, context) {
	  arr && proto.forEach.call(arr, iterator, context);
	}
	
	function reduce(arr, iterator, initialValue) {
	  return arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
	}
	
	function reduceRight(arr, iterator, initialValue) {
	  return arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.padEnd = exports.padStart = exports.lcFirst = exports.ucFirst = exports.toLower = exports.toUpper = exports.toString = undefined;
	exports.trim = trim;
	exports.split = split;
	exports.startWith = startWith;
	exports.endWith = endWith;
	exports.uuid = uuid;
	exports.hashCode = hashCode;
	exports.format = format;
	exports.escape = escape;
	exports.sanitizeText = sanitizeText;
	
	var _lang = __webpack_require__(6);
	
	var _object = __webpack_require__(9);
	
	var proto = String.prototype;
	
	var toString = exports.toString = function toString(str) {
	  return String(str);
	};
	var toUpper = exports.toUpper = function toUpper(str) {
	  return toString(str).toUpperCase();
	};
	var toLower = exports.toLower = function toLower(str) {
	  return toString(str).toLowerCase();
	};
	
	var ucFirst = exports.ucFirst = function ucFirst(str) {
	  return str.charAt(0).toUpperCase() + str.substring(1);
	};
	var lcFirst = exports.lcFirst = function lcFirst(str) {
	  return str.charAt(0).toLowerCase() + str.substring(1);
	};
	
	function trim(str) {
	  return str ? proto.trim.call(toString(str)) : '';
	}
	
	function split(str) {
	  var divider = arguments.length <= 1 || arguments[1] === undefined ? /\s+/ : arguments[1];
	
	  return toString(str).split(divider);
	}
	
	function startWith(str, prefix) {
	  return toString(str).indexOf(prefix) === 0;
	}
	
	function endWith(str, suffix) {
	  return toString(str).indexOf(suffix, toString(str).length - suffix.length) !== -1;
	}
	
	function padStr(str, max, pad, isStart) {
	
	  if ((0, _lang.isNil)(str) || (0, _lang.isNil)(max)) {
	    return str;
	  }
	
	  var result = String(str);
	  var targetLen = typeof max === 'number' ? max : parseInt(max, 10);
	
	  if (isNaN(targetLen) || !isFinite(targetLen)) {
	    return result;
	  }
	
	  var length = result.length;
	  if (length >= targetLen) {
	    return result;
	  }
	
	  var fill = (0, _lang.isNil)(pad) ? '' : String(pad);
	  if (fill === '') {
	    fill = ' ';
	  }
	
	  var fillLen = targetLen - length;
	
	  while (fill.length < fillLen) {
	    fill += fill;
	  }
	
	  var truncated = fill.length > fillLen ? fill.substr(0, fillLen) : fill;
	
	  return isStart ? truncated + result : result + truncated;
	}
	
	var padStart = exports.padStart = function padStart(str, max, pad) {
	  return padStr(str, max, pad, true);
	};
	var padEnd = exports.padEnd = function padEnd(str, max, pad) {
	  return padStr(str, max, pad, false);
	};
	
	function uuid() {
	
	  // credit: http://stackoverflow.com/posts/2117523/revisions
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	
	    var r = Math.random() * 16 | 0;
	    var v = c === 'x' ? r : r & 0x3 | 0x8;
	
	    return v.toString(16);
	  });
	}
	
	function hashCode(str) {
	
	  // Return a simple hash code from a string.
	  // See http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/.
	
	  var hash = 0;
	  var length = str.length;
	
	  if (length === 0) {
	    return hash;
	  }
	
	  for (var i = 0; i < length; i += 1) {
	
	    var c = str.charCodeAt(i);
	
	    hash = (hash << 5) - hash + c;
	    hash &= hash; // Convert to 32bit integer
	  }
	
	  return hash;
	}
	
	function format(tpl, data) {
	
	  if (tpl && data) {
	    return toString(tpl).replace(/\$\{(.*?)\}/g, function (input, key) {
	      var val = (0, _object.getByPath)(data, key);
	      return !(0, _lang.isNil)(val) ? val : input;
	    });
	  }
	
	  return tpl;
	}
	
	function escape(str) {
	
	  var mapping = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	
	  var badChars = /[&<>"'`]/g;
	  var shouldEscape = /[&<>"'`]/;
	
	  if (shouldEscape.test(str)) {
	    return str.replace(badChars, function (chr) {
	      return mapping[chr];
	    });
	  }
	
	  return str;
	}
	
	function sanitizeText(text) {
	
	  // Replace all spaces with the Unicode No-break space.
	  // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
	  // IE would otherwise collapse all spaces into one. This is useful
	  // e.g. in tests when you want to compare the actual DOM text content
	  // without having to add the unicode character in the place of all spaces.
	
	  return toString(text).replace(/ /g, ' ');
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasOwn = hasOwn;
	exports.keys = keys;
	exports.forIn = forIn;
	exports.extend = extend;
	exports.merge = merge;
	exports.getByPath = getByPath;
	exports.destroy = destroy;
	exports.isEmptyObject = isEmptyObject;
	exports.isPlainObject = isPlainObject;
	
	var _string = __webpack_require__(8);
	
	var _array = __webpack_require__(7);
	
	var _lang = __webpack_require__(6);
	
	function hasOwn(obj, key) {
	
	  return obj && Object.prototype.hasOwnProperty.call(obj, key);
	}
	
	function keys(obj) {
	
	  return obj ? Object.keys(obj) : [];
	}
	
	function forIn(obj, iterator, context) {
	
	  (0, _array.forEach)(keys(obj), function (key) {
	    iterator.call(context, obj[key], key);
	  });
	}
	
	function extend() {
	  var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    sources[_key - 1] = arguments[_key];
	  }
	
	  (0, _array.forEach)(sources, function (source) {
	    if (source) {
	      /* eslint guard-for-in: 0 */
	      for (var key in source) {
	        target[key] = source[key];
	      }
	    }
	  });
	
	  return target;
	}
	
	function merge() {
	  var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    sources[_key2 - 1] = arguments[_key2];
	  }
	
	  (0, _array.forEach)(sources, function (source) {
	    if (source) {
	      /* eslint guard-for-in: 0 */
	      for (var name in source) {
	
	        var src = target[name];
	        var copy = source[name];
	        var copyIsArray = (0, _lang.isArray)(copy);
	
	        if (copyIsArray || isPlainObject(copy)) {
	
	          var clone = void 0;
	          if (copyIsArray) {
	            clone = src && (0, _lang.isArray)(src) ? src : [];
	          } else {
	            clone = src && isPlainObject(src) ? src : {};
	          }
	
	          target[name] = merge(clone, copy);
	        } else {
	          target[name] = copy;
	        }
	      }
	    }
	  });
	
	  return target;
	}
	
	function getByPath(obj, path) {
	  var delimiter = arguments.length <= 2 || arguments[2] === undefined ? '.' : arguments[2];
	
	
	  var paths = (0, _string.split)(path, delimiter);
	  while (paths.length) {
	
	    var key = paths.shift();
	
	    if (Object(obj) === obj && key in obj) {
	      obj = obj[key];
	    } else {
	      return undefined;
	    }
	  }
	
	  return obj;
	}
	
	function destroy(obj) {
	
	  if (obj) {
	    for (var prop in obj) {
	      if (hasOwn(obj, prop)) {
	        delete obj[prop];
	      }
	    }
	    if (obj) {
	
	      /* eslint no-proto: 0 */
	      obj.prototype = obj.__proto__ = null;
	    }
	    obj.destroyed = true;
	  }
	}
	
	function isEmptyObject(obj) {
	
	  /* eslint guard-for-in: 0 */
	  /* eslint no-unused-vars: 0 */
	  for (var key in obj) {
	    return false;
	  }
	
	  return true;
	}
	
	function isPlainObject(obj) {
	
	  // Not plain objects:
	  //  - Any object or value whose internal [[Class]] property is not "[object Object]"
	  //  - DOM nodes
	  //  - window
	  if (!(0, _lang.isObject)(obj) || obj.nodeType || (0, _lang.isWindow)(obj)) {
	    return false;
	  }
	
	  if (obj.constructor && !hasOwn(obj.constructor.prototype, 'isPrototypeOf')) {
	    return false;
	  }
	
	  // If the function hasn't returned already, we're confident that
	  // |obj| is a plain object, created by {} or constructed with new Object
	  return true;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isFinite = isFinite;
	exports.isPercentage = isPercentage;
	exports.toInt = toInt;
	exports.toFloat = toFloat;
	exports.toPercentage = toPercentage;
	exports.toFixed = toFixed;
	exports.fixNumber = fixNumber;
	exports.fixIndex = fixIndex;
	exports.clamp = clamp;
	exports.isWithin = isWithin;
	
	var _lang = __webpack_require__(6);
	
	function isFinite(value) {
	
	  return window.isFinite(value) && !window.isNaN(parseFloat(value));
	}
	
	function isPercentage(str) {
	
	  return (0, _lang.isString)(str) && str.slice(-1) === '%';
	}
	
	function toInt(value) {
	
	  return parseInt(value, 10);
	}
	
	function toFloat(value, percentage) {
	
	  var v = parseFloat(value);
	  return percentage ? v / 100 : v;
	}
	
	function toPercentage(value) {
	  var precision = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
	
	
	  return toFixed(value * 100, precision) + '%';
	}
	
	function toFixed(value) {
	  var precision = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
	
	
	  var power = Math.pow(10, precision);
	
	  return toFloat((Math.round(value * power) / power).toFixed(precision));
	}
	
	function fixNumber(num, percentage, defaultValue) {
	
	  var ret = toFloat(num, percentage);
	
	  return isNaN(ret) ? defaultValue : ret;
	}
	
	function fixIndex(index, max) {
	
	  if ((0, _lang.isNil)(index)) {
	    return max;
	  }
	
	  while (index < 0) {
	    index += max;
	  }
	
	  return Math.min(index, max);
	}
	
	function clamp(value, min, max) {
	
	  return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
	}
	
	function isWithin(value, min, max) {
	
	  return min < max ? value >= min && value <= max : value >= max && value <= min;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.invoke = invoke;
	exports.bind = bind;
	exports.defer = defer;
	exports.flush = flush;
	
	var _lang = __webpack_require__(6);
	
	function invoke(fn, args, context) {
	
	  var ret = void 0;
	
	  if ((0, _lang.isFunction)(fn)) {
	
	    var len = args.length;
	
	    var _args = _slicedToArray(args, 3);
	
	    var a1 = _args[0];
	    var a2 = _args[1];
	    var a3 = _args[2];
	
	
	    if (len === 0) {
	      ret = fn.call(context);
	    } else if (len === 1) {
	      ret = fn.call(context, a1);
	    } else if (len === 2) {
	      ret = fn.call(context, a1, a2);
	    } else if (len === 3) {
	      ret = fn.call(context, a1, a2, a3);
	    } else {
	      ret = fn.apply(context, args);
	    }
	  }
	
	  return ret;
	}
	
	function bind(fn) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return (0, _lang.isFunction)(fn) ? invoke(Function.prototype.bind, args, fn) : fn;
	}
	
	var deferred = [];
	
	function defer(fn) {
	
	  deferred.push(fn);
	}
	
	function flush() {
	
	  var fn = deferred.pop();
	  while (fn) {
	    fn();
	    fn = deferred.pop();
	  }
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.containsElement = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.getClassName = getClassName;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.toggleClass = toggleClass;
	exports.styleStrToObject = styleStrToObject;
	exports.setStyle = setStyle;
	exports.getComputedStyle = getComputedStyle;
	exports.normalizeSides = normalizeSides;
	exports.createElement = createElement;
	exports.removeElement = removeElement;
	exports.emptyElement = emptyElement;
	exports.getNodeName = getNodeName;
	exports.isNode = isNode;
	exports.getWindow = getWindow;
	exports.showHide = showHide;
	exports.isHidden = isHidden;
	exports.getOffset = getOffset;
	exports.getOffsetUntil = getOffsetUntil;
	exports.createSvgDocument = createSvgDocument;
	exports.createSvgElement = createSvgElement;
	exports.setAttribute = setAttribute;
	exports.removeAttribute = removeAttribute;
	exports.setScale = setScale;
	exports.setRotation = setRotation;
	exports.setTranslate = setTranslate;
	exports.getTransformToElement = getTransformToElement;
	exports.getBounds = getBounds;
	exports.getScrollParent = getScrollParent;
	exports.getScrollBarWidth = getScrollBarWidth;
	
	var _lang = __webpack_require__(6);
	
	var _array = __webpack_require__(7);
	
	var _string = __webpack_require__(8);
	
	var _object = __webpack_require__(9);
	
	// classNames
	// ----------
	
	var rclass = /[\t\r\n\f]/g;
	var rnotwhite = /\S+/g;
	var transformKey = function () {
	
	  if ((0, _lang.isUndefined)(document)) {
	    return '';
	  }
	
	  var element = createElement('div');
	  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	
	  for (var i = 0, l = transforms.length; i < l; i += 1) {
	
	    var key = transforms[i];
	
	    if (element.style[key] !== undefined) {
	      return key;
	    }
	  }
	
	  return transforms[0];
	}();
	
	var fillSpaces = function fillSpaces(str) {
	  return ' ' + str + ' ';
	};
	
	function getClassName(elem) {
	
	  return elem.getAttribute ? elem.getAttribute('class') : '';
	}
	
	function hasClass(node, selector) {
	
	  if ((0, _lang.isNil)(node) || (0, _lang.isNil)(selector)) {
	    return false;
	  }
	
	  var classNames = fillSpaces(getClassName(node));
	  var className = fillSpaces(selector);
	
	  return node.nodeType === 1 ? classNames.replace(rclass, ' ').indexOf(className) > -1 : false;
	}
	
	function addClass(node, selector) {
	
	  if ((0, _lang.isNil)(node) || (0, _lang.isNil)(selector)) {
	    return;
	  }
	
	  if ((0, _lang.isFunction)(selector)) {
	    addClass(node, selector.call(node, getClassName(node)));
	    return;
	  }
	
	  if ((0, _lang.isString)(selector) && node.nodeType === 1) {
	
	    var classes = selector.match(rnotwhite) || [];
	    var oldValue = fillSpaces(getClassName(node)).replace(rclass, ' ');
	    var newValue = (0, _array.reduce)(classes, function (ret, cls) {
	
	      if (ret.indexOf(fillSpaces(cls)) < 0) {
	        ret += cls + ' ';
	      }
	
	      return ret;
	    }, oldValue);
	
	    newValue = (0, _string.trim)(newValue);
	
	    if (oldValue !== newValue) {
	      node.setAttribute('class', newValue);
	    }
	  }
	}
	
	function removeClass(node, selector) {
	
	  if ((0, _lang.isNil)(node)) {
	    return;
	  }
	
	  if ((0, _lang.isFunction)(selector)) {
	    removeClass(node, selector.call(node, getClassName(node)));
	    return;
	  }
	
	  if ((!selector || (0, _lang.isString)(selector)) && node.nodeType === 1) {
	
	    var classes = (selector || '').match(rnotwhite) || [];
	    var oldValue = fillSpaces(getClassName(node)).replace(rclass, ' ');
	    var newValue = (0, _array.reduce)(classes, function (ret, cls) {
	
	      var className = fillSpaces(cls);
	
	      if (ret.indexOf(className) > -1) {
	        ret = ret.replace(className, ' ');
	      }
	
	      return ret;
	    }, oldValue);
	
	    newValue = selector ? (0, _string.trim)(newValue) : '';
	
	    if (oldValue !== newValue) {
	      node.setAttribute('class', newValue);
	    }
	  }
	}
	
	function toggleClass(node, selector, stateVal) {
	
	  if ((0, _lang.isNil)(node) || (0, _lang.isNil)(selector)) {
	    return;
	  }
	
	  if ((0, _lang.isBoolean)(stateVal) && (0, _lang.isString)(selector)) {
	    stateVal ? addClass(node, selector) : removeClass(node, selector);
	
	    return;
	  }
	
	  if ((0, _lang.isFunction)(selector)) {
	    toggleClass(node, selector.call(node, getClassName(node), stateVal), stateVal);
	
	    return;
	  }
	
	  if ((0, _lang.isString)(selector)) {
	    (0, _array.forEach)(selector.match(rnotwhite) || [], function (cls) {
	      hasClass(node, cls) ? removeClass(node, cls) : addClass(node, cls);
	    });
	  }
	}
	
	// style
	// -----
	
	function styleStrToObject(styleStr) {
	
	  return (0, _array.reduce)((0, _string.split)(styleStr, ';'), function (result, style) {
	
	    if (style) {
	      var _split = (0, _string.split)(style, '=');
	
	      var _split2 = _slicedToArray(_split, 2);
	
	      var key = _split2[0];
	      var value = _split2[1];
	
	
	      result[key] = (0, _string.trim)(value);
	    }
	
	    return result;
	  }, {});
	}
	
	function setStyle(elem, name, value) {
	
	  if (elem) {
	
	    var pairs = {};
	
	    if ((0, _lang.isObject)(name)) {
	
	      pairs = name;
	    } else if ((0, _lang.isString)(name) && (0, _lang.isUndefined)(value)) {
	
	      pairs = styleStrToObject(name);
	    } else {
	
	      pairs[name] = value;
	    }
	
	    (0, _object.forIn)(pairs, function (v, k) {
	      elem.style[k === 'transform' ? transformKey : k] = v;
	    });
	  }
	}
	
	function getComputedStyle(elem, name) {
	
	  // IE9+
	
	  var computed = elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
	
	  if (computed && name) {
	    return computed.getPropertyValue(name) || computed[name];
	  }
	
	  return computed;
	}
	
	function normalizeSides(box) {
	
	  if (Object(box) !== box) {
	
	    box = (0, _lang.isNil)(box) ? 0 : box;
	
	    return {
	      top: box,
	      right: box,
	      bottom: box,
	      left: box
	    };
	  }
	
	  return {
	    top: (0, _lang.isNil)(box.top) ? 0 : box.top,
	    right: (0, _lang.isNil)(box.right) ? 0 : box.right,
	    bottom: (0, _lang.isNil)(box.bottom) ? 0 : box.bottom,
	    left: (0, _lang.isNil)(box.left) ? 0 : box.left
	  };
	}
	
	// elem
	// ----
	
	var docElem = document.documentElement;
	
	var containsElement = exports.containsElement = docElem.compareDocumentPosition || docElem.contains ? function (context, elem) {
	
	  var aDown = context.nodeType === 9 ? context.documentElement : context;
	  var bUp = elem && elem.parentNode;
	
	  return context === bUp || !!(bUp && bUp.nodeType === 1 && (aDown.contains ? aDown.contains(bUp) : context.compareDocumentPosition && context.compareDocumentPosition(bUp) & 16));
	} : function (context, elem) {
	
	  if (elem) {
	
	    /* eslint no-cond-assign: 0 */
	    while (elem = elem.parentNode) {
	      if (elem === context) {
	        return true;
	      }
	    }
	  }
	
	  return false;
	};
	
	function createElement(tagName, doc) {
	
	  return (doc || document).createElement(tagName);
	}
	
	function removeElement(elem) {
	
	  if (elem && elem.parentNode) {
	    elem.parentNode.removeChild(elem);
	  }
	}
	
	function emptyElement(elem) {
	
	  if (elem) {
	    while (elem.firstChild) {
	      elem.removeChild(elem.firstChild);
	    }
	  }
	}
	
	function getNodeName(elem) {
	
	  return elem.nodeName ? elem.nodeName.toLowerCase() : '';
	}
	
	function isNode(elem, nodeName, attrName, attrValue) {
	
	  var ret = elem && !isNaN(elem.nodeType);
	
	  if (ret) {
	    ret = (0, _lang.isNil)(nodeName) || getNodeName(elem) === nodeName.toLowerCase();
	  }
	
	  if (ret) {
	    ret = (0, _lang.isNil)(attrName) || elem.getAttribute(attrName) === attrValue;
	  }
	
	  return ret;
	}
	
	function getWindow(elem) {
	
	  return (0, _lang.isWindow)(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	}
	
	function showHide(elem, show) {
	
	  /* eslint no-underscore-dangle: "off" */
	
	  if (elem && elem.style) {
	
	    var display = elem.style.display;
	
	    if (show && display === 'none') {
	
	      if (!(0, _lang.isUndefined)(elem.__display)) {
	        display = elem.__display;
	        delete elem.__display;
	      } else {
	        display = '';
	      }
	
	      elem.style.display = display || '';
	    } else if (!show && display !== 'none') {
	
	      if (display) {
	        elem.__display = display;
	      }
	
	      elem.style.display = 'none';
	    }
	  }
	}
	
	function isHidden(elem) {
	
	  return elem && (elem.style.display === 'none' || !containsElement(elem.ownerDocument, elem));
	}
	
	function getOffset(elem) {
	
	  var box = {
	    top: 0,
	    left: 0
	  };
	
	  var doc = elem && elem.ownerDocument;
	
	  if (!doc) {
	    return box;
	  }
	
	  var docElement = doc.documentElement;
	
	  // Make sure it's not a disconnected DOM node
	  if (!containsElement(docElement, elem)) {
	    return box;
	  }
	
	  // If we don't have gBCR, just use 0,0 rather than error
	  // BlackBerry 5, iOS 3 (original iPhone)
	  if (elem.getBoundingClientRect) {
	    box = elem.getBoundingClientRect();
	  }
	
	  var win = getWindow(doc);
	  var _box = box;
	  var top = _box.top;
	  var left = _box.left;
	
	
	  top += (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0);
	  left += (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0);
	
	  return { top: top, left: left };
	}
	
	function getOffsetUntil(elem, stop) {
	
	  var node = elem;
	  var left = 0;
	  var top = 0;
	
	  while (node && node !== stop && node !== document.documentElement) {
	    left += node.offsetLeft;
	    top += node.offsetTop;
	    node = node.offsetParent;
	  }
	
	  return { left: left, top: top };
	}
	
	// xml namespaces.
	var ns = {
	  xml: 'http://www.w3.org/XML/1998/namespace',
	  xmlns: 'http://www.w3.org/2000/svg',
	  xlink: 'http://www.w3.org/1999/xlink'
	};
	
	// svg version.
	var svgVersion = '1.1';
	
	function parseXML(str, async) {
	
	  var xml = void 0;
	
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
	
	  var svg = '<svg xmlns="' + ns.xmlns + '" xmlns:xlink="' + ns.xlink + '" version="' + svgVersion + '">' + (content || '') + '</svg>';
	  var xml = parseXML(svg, false);
	  return xml.documentElement;
	}
	
	function createSvgElement(tagName, doc) {
	
	  return (doc || document).createElementNS(ns.xmlns, tagName);
	}
	
	// attribute
	// ---------
	
	function qualifyAttributeName(name) {
	
	  if (name.indexOf(':') !== -1) {
	
	    var combined = name.split(':');
	
	    return {
	      ns: ns[combined[0]],
	      local: combined[1]
	    };
	  }
	
	  return {
	    ns: null,
	    local: name
	  };
	}
	
	function setAttribute(elem, name, value) {
	
	  if ((0, _lang.isNil)(value)) {
	
	    removeAttribute(elem, name);
	  } else if (name === 'id') {
	
	    elem.id = value;
	  } else {
	
	    var qualified = qualifyAttributeName(name);
	
	    qualified.ns
	    // attribute names can be namespaced. E.g. `image` elements
	    // have a `xlink:href` attribute to set the source of the image.
	    ? elem.setAttributeNS(qualified.ns, name, value) : elem.setAttribute(name, value);
	  }
	}
	
	function removeAttribute(elem, name) {
	
	  var qualified = qualifyAttributeName(name);
	  if (qualified.ns) {
	    if (elem.hasAttributeNS(qualified.ns, qualified.local)) {
	      elem.removeAttributeNS(qualified.ns, qualified.local);
	    }
	  } else if (elem.hasAttribute(name)) {
	    elem.removeAttribute(name);
	  }
	}
	
	// transform
	// ---------
	
	function setScale(elem, sx, sy) {
	
	  if (elem) {
	    elem.style[transformKey] = 'scale(' + sx + ', ' + sy + ')';
	  }
	}
	
	function setRotation(elem, angle, ox, oy) {
	
	  if (elem) {
	    elem.style[transformKey] = 'rotate(' + angle + ', ' + ox + ', ' + oy + ')';
	  }
	}
	
	function setTranslate(elem, tx, ty) {
	
	  if (elem) {
	
	    var translate = 'translateX(' + tx + 'px) translateY(' + ty + 'px)';
	
	    // if (transformKey !== 'msTransform') {
	    //     // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	    //     // but IE9 doesn't support 3d transforms and will choke.
	    //     translate += ' translateZ(0)';
	    // }
	
	    elem.style[transformKey] = translate;
	  }
	}
	
	function getTransformToElement(source, target) {
	
	  if (source.getTransformToElement) {
	    return source.getTransformToElement(target);
	  }
	
	  // chrome 48 removed svg getTransformToElement api
	
	  var matrix = void 0;
	  try {
	    matrix = target.getScreenCTM().inverse();
	  } catch (e) {
	    throw new Error('Can not inverse source element\'s ctm.');
	  }
	
	  return matrix.multiply(source.getScreenCTM());
	}
	
	function getActualBoundingClientRect(node) {
	
	  // same as native getBoundingClientRect, except it takes into
	  // account  parent <frame> offsets if the element lies within
	  // a nested document (<frame> or <iframe>-like).
	
	  var boundingRect = node.getBoundingClientRect();
	
	  // The original object returned by getBoundingClientRect is immutable,
	  // so we clone it We can't use extend because the properties are not
	  // considered part of the object by hasOwnProperty in IE9
	
	  var rect = {};
	
	  /* eslint-disable guard-for-in */
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }
	  /* eslint-enable guard-for-in */
	
	  if (node.ownerDocument !== document) {
	    var frameElement = node.ownerDocument.defaultView.frameElement;
	    if (frameElement) {
	      var frameRect = getActualBoundingClientRect(frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }
	
	  return rect;
	}
	
	function getBounds(elem) {
	
	  var doc = void 0;
	
	  if (elem === document) {
	    doc = document;
	    elem = document.documentElement;
	  } else {
	    doc = elem.ownerDocument;
	  }
	
	  var docEle = doc.documentElement;
	  var bounds = getActualBoundingClientRect(elem);
	
	  if ((0, _lang.isUndefined)(bounds.width)) {
	    bounds.width = document.body.scrollWidth - bounds.left - bounds.right;
	  }
	  if ((0, _lang.isUndefined)(bounds.height)) {
	    bounds.height = document.body.scrollHeight - bounds.top - bounds.bottom;
	  }
	
	  bounds.top = bounds.top - docEle.clientTop;
	  bounds.left = bounds.left - docEle.clientLeft;
	  bounds.right = doc.body.clientWidth - bounds.width - bounds.left;
	  bounds.bottom = doc.body.clientHeight - bounds.height - bounds.top;
	
	  return bounds;
	}
	
	function getScrollParent(elem) {
	
	  // In firefox if the el is inside an iframe with display: none;
	  // window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	
	  var computed = getComputedStyle(elem) || {};
	  var position = computed.position;
	
	  if (position === 'fixed') {
	    return elem;
	  }
	
	  var parent = elem;
	
	  while (parent = parent.parentNode) {
	    var style = void 0;
	
	    /* eslint-disable no-empty */
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}
	    /* eslint-enable no-empty */
	
	    if (typeof style === 'undefined' || style === null) {
	      return parent;
	    }
	
	    var overflow = style.overflow;
	    var overflowX = style.overflowX;
	    var overflowY = style.overflowY;
	
	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        return parent;
	      }
	    }
	  }
	
	  return document.body;
	}
	
	function getScrollBarWidth() {
	
	  var inner = createElement('p');
	  var outer = createElement('div');
	
	  setStyle(inner, {
	    width: '100%',
	    height: '200px'
	  });
	
	  setStyle(outer, {
	    overflow: 'hidden',
	    visibility: 'hidden',
	    position: 'absolute',
	    left: 0,
	    top: 0,
	    width: '200px',
	    height: '100px'
	  });
	
	  outer.appendChild(inner);
	  document.body.appendChild(outer);
	
	  var w1 = inner.offsetWidth;
	
	  outer.style.overflow = 'scroll';
	
	  var w2 = inner.offsetWidth;
	  if (w1 === w2) {
	    w2 = outer.clientWidth;
	  }
	
	  document.body.removeChild(outer);
	
	  return w1 - w2;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toDeg = toDeg;
	exports.toRad = toRad;
	exports.snapToGrid = snapToGrid;
	exports.normalizeAngle = normalizeAngle;
	function toDeg(rad) {
	
	  return 180 * rad / Math.PI % 360;
	}
	
	function toRad(deg, over360) {
	
	  deg = over360 ? deg : deg % 360;
	
	  return deg * Math.PI / 180;
	}
	
	function snapToGrid(val) {
	  var gridSize = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	  var method = arguments.length <= 2 || arguments[2] === undefined ? 'round' : arguments[2];
	
	
	  return Math[method](val / gridSize) * gridSize;
	}
	
	function normalizeAngle(angle) {
	
	  return angle % 360 + (angle < 0 ? 360 : 0);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasShiftKey = exports.hasMetaKey = exports.hasCtrlKey = exports.hasAltKey = undefined;
	exports.removeEventListener = removeEventListener;
	exports.addEventListener = addEventListener;
	exports.normalizeEvent = normalizeEvent;
	exports.hasModifierKey = hasModifierKey;
	exports.isLeftMouseButton = isLeftMouseButton;
	
	var _array = __webpack_require__(7);
	
	var _object = __webpack_require__(9);
	
	var _lang = __webpack_require__(6);
	
	var _dom = __webpack_require__(12);
	
	var _detector = __webpack_require__(15);
	
	var _detector2 = _interopRequireDefault(_detector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WIN = window;
	var DOC = window.document;
	var IS_TOUCH = _detector2.default.IS_TOUCH;
	
	var hooks = {
	  mouseenter: {
	    type: 'mouseover',
	    wrap: mouseEnterLeaveWrap
	  },
	  mouseleave: {
	    type: 'mouseout',
	    wrap: mouseEnterLeaveWrap
	  }
	};
	
	var isMatchSelector = function () {
	
	  var testDiv = DOC.createElement('div');
	
	  // match selector
	  var matchesSelector = testDiv.matches || testDiv.webkitMatchesSelector || testDiv.mozMatchesSelector || testDiv.msMatchesSelector || testDiv.oMatchesSelector;
	
	  var hasMatchesSelector = matchesSelector && matchesSelector.call(testDiv, 'div');
	
	  return function (elem, selector) {
	
	    if (hasMatchesSelector) {
	      return matchesSelector.call(elem, selector);
	    }
	
	    var parent = elem.parentNode;
	
	    // if the element is an orphan, and the browser doesn't support matching
	    // orphans, append it to a documentFragment
	    if (!parent && !hasMatchesSelector) {
	      parent = DOC.createDocumentFragment();
	      parent.appendChild(elem);
	    }
	
	    // from the parent element's context, get all nodes that match the selector
	    var nodes = parent.querySelectorAll(selector);
	
	    return (0, _array.some)(nodes, function (node) {
	      return node === elem;
	    });
	  };
	}();
	
	function mouseEnterLeaveWrap(elem, handler) {
	  var _this = this;
	
	  return function (e) {
	    if (!isHover(e.delegateTarget || elem, e)) {
	      handler.call(_this, e);
	    }
	  };
	}
	
	function isHover(elem, e) {
	
	  var target = e.type === 'mouseover' ? e.relatedTarget || e.fromElement : e.relatedTarget || e.toElement;
	
	  return (0, _dom.containsElement)(elem, target) || elem === target;
	}
	
	function fixEvent(e) {
	
	  // add W3C standard event methods
	  e.preventDefault = function () {
	    e.returnValue = false;
	  };
	  e.stopPropagation = function () {
	    e.cancelBubble = true;
	  };
	
	  return e;
	}
	
	function handleEvent(event) {
	
	  var result = true;
	  var element = this;
	
	  // grab the event object (IE uses a global event object)
	  event = event || fixEvent((DOC.parentWindow || WIN).event);
	
	  // get a reference to the hash table of event handlers
	  var handlers = element.events[event.type];
	
	  // execute each event handler
	  for (var key in handlers) {
	
	    if ((0, _object.hasOwn)(handlers, key)) {
	
	      element.$$handleEvent = handlers[key];
	
	      if (element.$$handleEvent(event) === false) {
	        result = false;
	      }
	    }
	  }
	
	  return result;
	}
	
	function addEvent(elem, type, handler) {
	
	  if (elem.addEventListener) {
	    elem.addEventListener(type, handler, false);
	  } else {
	
	    // assign each event handler a unique ID
	    if (!handler.$$guid) {
	      addEvent.guid += 1;
	      handler.$$guid = addEvent.guid;
	    }
	
	    // create a hash table of event types for the element
	    if (!elem.events) {
	      elem.events = {};
	    }
	
	    var fixedName = 'on' + type;
	
	    // create a hash table of event handlers for each element/event pair
	    var handlers = elem.events[type];
	    if (!handlers) {
	      handlers = elem.events[type] = {};
	      // store the existing event handler (if there is one)
	      if (elem[fixedName]) {
	        handlers[0] = elem[fixedName];
	      }
	    }
	    // store the event handler in the hash table
	    handlers[handler.$$guid] = handler;
	    // assign a global event handler to do all the work
	    elem[fixedName] = handleEvent;
	  }
	}
	
	addEvent.guid = 0;
	
	function getDelegateTarget(elem, target, selector) {
	
	  while (target && target !== elem) {
	
	    if (isMatchSelector(target, selector)) {
	      return target;
	    }
	
	    target = target.parentElement;
	  }
	
	  return null;
	}
	
	function removeEventListener(elem, type, handler) {
	
	  var hook = hooks[type];
	  var wrapper = handler._delegateWrapper;
	
	  type = hook ? hook.type : type;
	
	  if (elem.removeEventListener) {
	
	    elem.removeEventListener(type, handler, false);
	    wrapper && elem.removeEventListener(type, wrapper, false);
	  } else if (elem.events && elem.events[type]) {
	
	    // delete the event handler from the hash table
	    delete elem.events[type][handler.$$guid];
	
	    if (wrapper) {
	      delete elem.events[type][wrapper.$$guid];
	    }
	  }
	}
	
	function addEventListener(elem, type, selector, handler, once) {
	
	  var hook = hooks[type];
	
	  type = hook ? hook.type : type;
	
	  if ((0, _lang.isFunction)(selector)) {
	    return hook ? addEvent(elem, type, hook.wrap(elem, selector)) : addEvent(elem, type, selector);
	  }
	
	  function wrapper(e) {
	
	    // if this event has a delegateTarget, then we add it to the event
	    // object (so that handlers may have a reference to the delegator
	    // element) and fire the callback
	    var delegateTarget = getDelegateTarget(elem, e.target, selector);
	    if (delegateTarget) {
	
	      e.delegateTarget = delegateTarget;
	
	      if (hook) {
	        handler = hook.wrap(elem, handler);
	      }
	
	      if (once === true) {
	        removeEventListener(elem, type, wrapper);
	      }
	
	      handler.call(elem, e);
	    }
	  }
	
	  handler._delegateWrapper = wrapper;
	  addEvent(elem, type, wrapper);
	
	  return handler;
	}
	
	function normalizeEvent(e) {
	
	  var touchEvent = IS_TOUCH && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0];
	
	  if (touchEvent) {
	    for (var prop in e) {
	      // copy all the properties from the input event that are not
	      // defined on the touch event (functions included).
	      if (touchEvent[prop] === undefined) {
	        touchEvent[prop] = e[prop];
	      }
	    }
	    return touchEvent;
	  }
	
	  return e;
	}
	
	var hasAltKey = exports.hasAltKey = function hasAltKey(e) {
	  return e.altKey;
	};
	var hasCtrlKey = exports.hasCtrlKey = function hasCtrlKey(e) {
	  return e.ctrlKey;
	};
	var hasMetaKey = exports.hasMetaKey = function hasMetaKey(e) {
	  return e.metaKey;
	};
	var hasShiftKey = exports.hasShiftKey = function hasShiftKey(e) {
	  return e.shiftKey;
	};
	
	function hasModifierKey(e) {
	
	  return hasCtrlKey(e) || hasMetaKey(e) || hasShiftKey(e);
	}
	
	function isLeftMouseButton(e) {
	
	  return _detector2.default.IS_IE ? e.button === 1 : e.button === 0;
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ua = navigator.userAgent;
	var av = navigator.appVersion;
	
	// exports
	// -------
	
	exports.default = {
	
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
	
	  IS_POINTER: window.navigator.msPointerEnabled || false,
	
	  IS_TOUCH: 'ontouchstart' in document.documentElement || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
	
	  SUPPORT_FOREIGN_OBJECT: function () {
	
	    if (document.createElementNS) {
	
	      var _toString = Object.prototype.toString;
	      var foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	
	      return (/SVGForeignObject/.test(_toString.call(foreign))
	      );
	    }
	
	    return false;
	  }()
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lineToPathData = lineToPathData;
	exports.polygonToPathData = polygonToPathData;
	exports.polylineToPathData = polylineToPathData;
	exports.rectToPathData = rectToPathData;
	exports.circleToPathData = circleToPathData;
	exports.ellipseToPathData = ellipseToPathData;
	
	var _array = __webpack_require__(7);
	
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
	
	  var d = void 0;
	
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseTranslate = parseTranslate;
	exports.parseScale = parseScale;
	exports.parseRotate = parseRotate;
	exports.parseTransform = parseTransform;
	exports.clearTranslate = clearTranslate;
	exports.clearScale = clearScale;
	exports.clearRotate = clearRotate;
	
	var _number = __webpack_require__(10);
	
	var _string = __webpack_require__(8);
	
	function parseTranslate(transform) {
	
	  var translate = { tx: 0, ty: 0 };
	
	  if (transform) {
	
	    var match = transform.match(/translate\((.*)\)/);
	    if (match) {
	
	      var arr = (0, _string.split)(match[1], /[ ,]+/);
	      if (arr[0]) {
	        translate.tx += (0, _number.toFloat)(arr[0]);
	      }
	
	      if (arr[1]) {
	        translate.ty += (0, _number.toFloat)(arr[1]);
	      }
	    }
	  }
	
	  return translate;
	}
	
	function parseScale(transform) {
	
	  var scale = { sx: 1, sy: 1 };
	
	  if (transform) {
	
	    var match = transform.match(/scale\((.*)\)/);
	    if (match) {
	
	      var arr = (0, _string.split)(match[1], /[ ,]+/);
	      if (arr[0]) {
	        scale.sx *= (0, _number.toFloat)(arr[0]);
	      }
	
	      if (arr[1] || arr[0]) {
	        scale.sy *= (0, _number.toFloat)(arr[1] || arr[0]);
	      }
	    }
	  }
	
	  return scale;
	}
	
	function parseRotate(transform) {
	
	  var rotate = { angle: 0 };
	
	  if (transform) {
	
	    var match = transform.match(/rotate\((.*)\)/);
	    if (match) {
	
	      var arr = (0, _string.split)(match[1], /[ ,]+/);
	      if (arr[0]) {
	        rotate.angle += (0, _number.toFloat)(arr[0]);
	      }
	
	      if (arr[1] && arr[2]) {
	        rotate.cx = (0, _number.toFloat)(arr[1]);
	        rotate.cy = (0, _number.toFloat)(arr[2]);
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
	
	function clearTranslate(transform) {
	
	  return transform ? (0, _string.trim)(transform.replace(/translate\([^)]*\)/g, '')) : '';
	}
	
	function clearScale(transform) {
	
	  return transform ? (0, _string.trim)(transform.replace(/scale\([^)]*\)/g, '')) : '';
	}
	
	function clearRotate(transform) {
	
	  return transform ? (0, _string.trim)(transform.replace(/rotate\([^)]*\)/g, '')) : '';
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Point = function () {
	  function Point() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	    _classCallCheck(this, Point);
	
	    this.x = x;
	    this.y = y;
	  }
	
	  // statics
	  // -------
	
	  _createClass(Point, [{
	    key: 'update',
	
	
	    // methods
	    // -------
	
	    value: function update() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	
	      this.x = x;
	      this.y = y;
	
	      return this;
	    }
	  }, {
	    key: 'translate',
	    value: function translate() {
	      var dx = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var dy = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	
	      this.x += dx;
	      this.y += dy;
	
	      return this;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(origin, angle) {
	
	      // Rotate point by angle around origin `origin`.
	
	      angle = (angle + 360) % 360;
	
	      this.toPolar(origin);
	      this.y += utils.toRad(angle);
	
	      var p = Point.fromPolar(this.x, this.y, origin);
	
	      this.x = p.x;
	      this.y = p.y;
	
	      return this;
	    }
	  }, {
	    key: 'scale',
	    value: function scale(sx, sy, origin) {
	
	      origin = origin || new Point(0, 0);
	
	      this.x = origin.x + sx * (this.x - origin.x);
	      this.y = origin.y + sy * (this.y - origin.y);
	
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move(ref, distance) {
	
	      // Move point on the line from `ref` to me by `distance`.
	
	      var rad = utils.toRad(ref.theta(this));
	
	      return this.translate(Math.cos(rad) * distance, -Math.sin(rad) * distance);
	    }
	  }, {
	    key: 'reflect',
	    value: function reflect(ref) {
	
	      // Returns a point that is the reflection of me with
	      // the center of inversion in ref point.
	
	      return ref.move(this, this.distance(ref));
	    }
	  }, {
	    key: 'diff',
	    value: function diff(point) {
	
	      return new Point(this.x - point.x, this.y - point.y);
	    }
	  }, {
	    key: 'round',
	    value: function round(precision) {
	
	      this.x = precision ? utils.toFixed(this.x, precision) : Math.round(this.x);
	      this.y = precision ? utils.toFixed(this.y, precision) : Math.round(this.y);
	
	      return this;
	    }
	  }, {
	    key: 'smooth',
	    value: function smooth() {
	
	      return this.round(2);
	    }
	  }, {
	    key: 'theta',
	    value: function theta(point) {
	
	      // Compute the angle between me and `point` and the x axis.
	      // (cartesian-to-polar coordinates conversion)
	      // Return theta angle in degrees.
	
	      point = point || new Point();
	
	      // invert the y-axis.
	      var y = -(point.y - this.y);
	      var x = point.x - this.x;
	
	      var PRECISION = 10;
	      // Note that `atan2` is not defined for `x`, `y` both equal zero.
	      var rad = utils.toFixed(x, PRECISION) === 0 && utils.toFixed(y, PRECISION) === 0 ? 0 : Math.atan2(y, x);
	
	      // Correction for III. and IV. quadrant.
	      if (rad < 0) {
	        rad = 2 * Math.PI + rad;
	      }
	
	      return utils.toDeg(rad);
	    }
	  }, {
	    key: 'distance',
	    value: function distance(point) {
	
	      // Returns distance between me and point `point`.
	
	      point = point || new Point();
	
	      var dx = point.x - this.x;
	      var dy = point.y - this.y;
	
	      return Math.sqrt(dx * dx + dy * dy);
	    }
	  }, {
	    key: 'manhattanDistance',
	    value: function manhattanDistance(point) {
	
	      // Returns a manhattan (taxi-cab) distance between me and point `p`.
	
	      point = point || new Point();
	
	      return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
	    }
	  }, {
	    key: 'toPolar',
	    value: function toPolar(origin) {
	
	      // Converts rectangular to polar coordinates.
	      // An origin can be specified, otherwise it's `0 0`.
	
	      origin = origin || new Point(0, 0);
	
	      var dx = this.x - origin.x;
	      var dy = this.y - origin.y;
	
	      this.y = utils.toRad(origin.theta(Point.fromPoint(this)));
	      this.x = Math.sqrt(dx * dx + dy * dy);
	
	      return this;
	    }
	  }, {
	    key: 'normalize',
	    value: function normalize() {
	      var len = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	
	      // Scale the line segment between (0,0)
	      // and me to have a length of len.
	
	      var x = this.x;
	      var y = this.y;
	
	      if (x === 0 && y === 0) {
	        return this;
	      }
	
	      var scale = void 0;
	
	      if (x === 0) {
	        scale = len / y;
	      } else if (y === 0) {
	        scale = len / x;
	      } else {
	        scale = len / this.distance(new Point());
	      }
	
	      this.x = scale * x;
	      this.y = scale * y;
	
	      return this;
	    }
	  }, {
	    key: 'changeInAngle',
	    value: function changeInAngle(dx, dy, ref) {
	
	      // Returns change in angle from my previous position (-dx, -dy) to
	      // my new position relative to ref point.
	
	      // Revert the translation and measure the change in angle around x-axis.
	      return Point.fromPoint(this).translate(-dx, -dy).theta(ref) - this.theta(ref);
	    }
	  }, {
	    key: 'snapToGrid',
	    value: function snapToGrid(gx, gy) {
	
	      this.x = utils.snapToGrid(this.x, gx);
	      this.y = utils.snapToGrid(this.y, gy || gx);
	
	      return this;
	    }
	  }, {
	    key: 'adhereToRect',
	    value: function adhereToRect(rect) {
	
	      // If point lies outside rectangle `rect`, return the nearest point on
	      // the boundary of rect `rect`, otherwise return point itself.
	
	      if (rect.containsPoint(this)) {
	        return this;
	      }
	
	      this.x = Math.min(Math.max(this.x, rect.x), rect.x + rect.width);
	      this.y = Math.min(Math.max(this.y, rect.y), rect.y + rect.height);
	
	      return this;
	    }
	  }, {
	    key: 'magnitude',
	    value: function magnitude() {
	
	      return Math.sqrt(this.x * this.x + this.y * this.y) || 0.01;
	    }
	
	    // common
	    // ------
	
	  }, {
	    key: 'valueOf',
	    value: function valueOf() {
	      return [this.x, this.y];
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this.valueOf().join(', ');
	    }
	  }, {
	    key: 'equals',
	    value: function equals(p) {
	      return Point.equals(this, p);
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return Point.fromPoint(this);
	    }
	  }], [{
	    key: 'equals',
	    value: function equals(p1, p2) {
	
	      return this.isPoint(p1) && this.isPoint(p2) && p1.x === p2.x && p1.y === p2.y;
	    }
	  }, {
	    key: 'isPoint',
	    value: function isPoint(p) {
	      return p && p instanceof Point;
	    }
	  }, {
	    key: 'isPointLike',
	    value: function isPointLike(p) {
	
	      if (this.isPoint(p)) {
	        return true;
	      } else if (p) {
	        return utils.hasOwn(p, 'x') && utils.hasOwn(p, 'y');
	      }
	
	      return false;
	    }
	  }, {
	    key: 'fromPoint',
	    value: function fromPoint(p) {
	
	      return new Point(p.x, p.y);
	    }
	  }, {
	    key: 'fromPolar',
	    value: function fromPolar(r, angle, origin) {
	
	      origin = origin || new Point(0, 0);
	
	      var x = Math.abs(r * Math.cos(angle));
	      var y = Math.abs(r * Math.sin(angle));
	
	      var deg = utils.normalizeAngle(utils.toDeg(angle));
	
	      if (deg < 90) {
	        y = -y;
	      } else if (deg < 180) {
	        x = -x;
	        y = -y;
	      } else if (deg < 270) {
	        x = -x;
	      }
	
	      return new Point(origin.x + x, origin.y + y);
	    }
	  }, {
	    key: 'fromString',
	    value: function fromString(str) {
	
	      var arr = str.split(str.indexOf('@') === -1 ? ' ' : '@');
	
	      return new Point(utils.toFloat(arr[0]), utils.toFloat(arr[1]));
	    }
	  }, {
	    key: 'random',
	    value: function random(x1, x2, y1, y2) {
	
	      // Create a point with random coordinates that fall
	      // into the range `[x1, x2]` and `[y1, y2]`.
	
	      var x = Math.floor(Math.random() * (x2 - x1 + 1) + x1);
	      var y = Math.floor(Math.random() * (y2 - y1 + 1) + y1);
	
	      return new Point(x, y);
	    }
	  }]);
	
	  return Point;
	}();
	
	// exports
	// -------
	
	exports.default = Point;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Line = function () {
	  function Line(start, end) {
	    _classCallCheck(this, Line);
	
	    if (!start) {
	      throw new Error('The start point of line must be specified');
	    }
	
	    if (!end) {
	      throw new Error('The end point of line must be specified');
	    }
	
	    this.start = start;
	    this.end = end;
	  }
	
	  // statics
	  // -------
	
	  _createClass(Line, [{
	    key: 'getLength',
	
	
	    // methods
	    // -------
	
	    value: function getLength() {
	
	      return Math.sqrt(this.getSquaredLength());
	    }
	  }, {
	    key: 'getSquaredLength',
	    value: function getSquaredLength() {
	
	      // Return the line's length without sqrt.
	      // Note that for applications where the exact length
	      // is not necessary (e.g. compare only)
	
	      var dx = this.end.x - this.start.x;
	      var dy = this.end.y - this.end.x;
	
	      return dx * dx + dy * dy;
	    }
	  }, {
	    key: 'getMidpoint',
	    value: function getMidpoint() {
	
	      var x = (this.start.x + this.end.x) / 2;
	      var y = (this.start.y + this.end.y) / 2;
	
	      return new _Point2.default(x, y);
	    }
	  }, {
	    key: 'getPointAt',
	    value: function getPointAt(percent) {
	
	      // get point at `percent` (0~1).
	
	      var x = (1 - percent) * this.start.x + percent * this.end.x;
	      var y = (1 - percent) * this.start.y + percent * this.end.y;
	
	      return new _Point2.default(x, y);
	    }
	  }, {
	    key: 'intersection',
	    value: function intersection(line) {
	
	      var start1 = this.start;
	      var end1 = this.end;
	
	      var start2 = line.start;
	      var end2 = line.end;
	
	      var point1 = new _Point2.default(end1.x - start1.x, end1.y - start1.y);
	      var point2 = new _Point2.default(end2.x - start2.x, end2.y - start2.y);
	
	      var det = point1.x * point2.y - point1.y * point2.x;
	      var deltaPt = new _Point2.default(start2.x - start1.x, start2.y - start1.y);
	      var alpha = deltaPt.x * point2.y - deltaPt.y * point2.x;
	      var beta = deltaPt.x * point1.y - deltaPt.y * point1.x;
	
	      // no intersection found
	      if (det === 0 || alpha * det < 0 || beta * det < 0) {
	        return null;
	      }
	
	      if (det > 0) {
	        if (alpha > det || beta > det) {
	          return null;
	        }
	      } else {
	        if (alpha < det || beta < det) {
	          return null;
	        }
	      }
	
	      return new _Point2.default(start1.x + alpha * point1.x / det, start1.y + alpha * point1.y / det);
	    }
	  }, {
	    key: 'getDirection',
	    value: function getDirection() {
	
	      // get cardinal direction of the line.
	      // One of the following bearings : NE, E, SE, S, SW, W, NW, N.
	
	      var start = this.start;
	      var end = this.end;
	
	      var lat1 = utils.toRad(start.y);
	      var lat2 = utils.toRad(end.y);
	      var lon1 = start.x;
	      var lon2 = end.x;
	      var dLon = utils.toRad(lon2 - lon1);
	
	      var y = Math.sin(dLon) * Math.cos(lat2);
	      var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
	
	      var bearings = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
	      var brng = utils.toDeg(Math.atan2(y, x));
	      var index = brng - 22.5;
	
	      if (index < 0) {
	        index += 360;
	      }
	
	      index = utils.toInt(index / 45);
	
	      return bearings[index];
	    }
	  }, {
	    key: 'getOffset',
	    value: function getOffset(point) {
	
	      // get the offset of the `point` from the line.
	      // + if the `point` is on the right side of the line,
	      // - if on the left and `0` if on the line.
	
	      var start = this.start;
	      var end = this.end;
	
	      // Find the sign of the determinant of vectors (start,end), where p is the query point.
	      return ((end.x - start.x) * (point.y - start.y) - (end.y - start.y) * (point.x - start.x)) / 2;
	    }
	
	    // common
	    // ------
	
	  }, {
	    key: 'valueOf',
	    value: function valueOf() {
	
	      return [this.satrt.valueOf(), this.end.valueOf()];
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	
	      return this.start.toString() + ' ' + this.end.toString();
	    }
	  }, {
	    key: 'equals',
	    value: function equals(line) {
	
	      return Line.equals(this, line);
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	
	      return Line.fromLine(this);
	    }
	  }], [{
	    key: 'equals',
	    value: function equals(line1, line2) {
	
	      return this.isLine(line1) && this.isLine(line2) && (line1.start && line1.start.equals(line2.start) || !line1.start && !line2.start) && (line1.end && line1.end.equals(line2.end) || !line1.end && !line2.end);
	    }
	  }, {
	    key: 'fromLine',
	    value: function fromLine(line) {
	
	      return new Line(line.start.clone(), line.end.clone());
	    }
	  }, {
	    key: 'isLine',
	    value: function isLine(line) {
	
	      return line && line instanceof Line;
	    }
	  }]);
	
	  return Line;
	}();
	
	// exports
	// -------
	
	exports.default = Line;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Terminal = __webpack_require__(21);
	
	var _Terminal2 = _interopRequireDefault(_Terminal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// private
	// -------
	
	function _insertChild(child, index) {
	
	  var childCount = this.getChildCount();
	
	  index = utils.fixIndex(index, childCount);
	
	  if (child.parent === this && index === childCount) {
	    index -= 1;
	  }
	
	  // update parent
	  child.removeFromParent({ silent: true });
	  child.parent = this;
	
	  if (this.children && this.children.length) {
	    this.children.splice(index, 0, child);
	  } else {
	    // speed up
	    this.children = [];
	    this.children.push(child);
	  }
	
	  return this;
	}
	
	function getModel(primary, backup) {
	
	  var model = primary && primary.getModel();
	
	  if (!model && backup && backup.getModel) {
	    model = backup.getModel();
	  }
	
	  return model;
	}
	
	function scheduleSetParent(scheduled) {
	
	  this.setParent.scheduled = scheduled;
	
	  return this;
	}
	
	function isSetParentScheduled() {
	
	  return this.setParent.scheduled === true;
	}
	
	function scheduleSetTerminal(scheduled) {
	
	  this.setTerminal.scheduled = scheduled;
	
	  return this;
	}
	
	function isSetTerminalScheduled() {
	
	  return this.setTerminal.scheduled === true;
	}
	
	var Cell = function () {
	  function Cell(options) {
	    _classCallCheck(this, Cell);
	
	    var metadata = utils.merge({}, this.constructor.defaults, options);
	
	    // bind some common props
	    this.data = metadata.data;
	    this.attrs = metadata.attrs || {};
	    this.visible = metadata.visible !== false;
	    this.metadata = metadata;
	  }
	
	  // static
	  // ------
	
	  _createClass(Cell, [{
	    key: 'isLink',
	
	
	    // link
	    // ----
	
	    value: function isLink() {
	
	      return false;
	    }
	  }, {
	    key: 'getTerminal',
	    value: function getTerminal() {
	      var isSource = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	
	      return isSource ? this.source : this.target;
	    }
	  }, {
	    key: 'setTerminal',
	    value: function setTerminal(terminal) {
	      var isSource = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      scheduleSetTerminal.call(this, false);
	
	      if (!options.silent) {
	
	        var model = getModel(this, terminal);
	        if (model) {
	          // fully replace the previous terminal
	          model.setTerminal(this, terminal, isSource);
	          scheduleSetTerminal.call(this, true);
	        }
	      }
	
	      if (!isSetTerminalScheduled.call(this)) {
	
	        terminal = terminal ? new _Terminal2.default(terminal) : null;
	
	        if (isSource) {
	          this.source = terminal;
	
	          if (terminal) {
	            this.sourceNode = terminal.node;
	            this.sourcePort = terminal.port;
	            this.sourcePoint = terminal.point;
	          } else {
	            this.sourceNode = null;
	            this.sourcePort = null;
	            this.sourcePoint = null;
	          }
	        } else {
	          this.target = terminal;
	
	          if (terminal) {
	            this.targetNode = terminal.node;
	            this.targetPort = terminal.port;
	            this.targetPoint = terminal.point;
	          } else {
	            this.targetNode = null;
	            this.targetPort = null;
	            this.targetPoint = null;
	          }
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getTerminalNode',
	    value: function getTerminalNode() {
	      var isSource = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	
	      var node = isSource ? this.sourceNode : this.targetNode;
	
	      if (!node) {
	
	        var terminal = this.getTerminal(isSource);
	
	        node = terminal && terminal.node || null;
	      }
	
	      return node;
	    }
	  }, {
	    key: 'setTerminalNode',
	    value: function setTerminalNode(node) {
	      var isSource = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      scheduleSetTerminal.call(this, false);
	
	      if (!options.silent) {
	        var model = getModel(this, node);
	        if (model) {
	          model.setTerminalNode(this, node, isSource);
	          scheduleSetTerminal.call(this, true);
	        }
	      }
	
	      if (!isSetTerminalScheduled.call(this)) {
	
	        if (isSource) {
	          this.sourceNode = node;
	        } else {
	          this.targetNode = node;
	        }
	
	        var terminal = this.getTerminal(isSource);
	        if (terminal) {
	          terminal.node = node;
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getTerminalPort',
	    value: function getTerminalPort() {
	      var isSource = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	
	      var port = isSource ? this.sourcePort : this.targetPort;
	
	      if (!port) {
	
	        var terminal = this.getTerminal(isSource);
	
	        port = terminal && terminal.port || null;
	      }
	
	      return port;
	    }
	  }, {
	    key: 'setTerminalPort',
	    value: function setTerminalPort(port) {
	      var isSource = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      // partial replace the terminal port
	
	      scheduleSetTerminal.call(this, false);
	
	      if (!options.silent) {
	        var model = getModel(this);
	        if (model) {
	          model.setTerminalPort(this, port, isSource);
	          scheduleSetTerminal.call(this, true);
	        }
	      }
	
	      if (!isSetTerminalScheduled.call(this)) {
	
	        if (isSource) {
	          this.sourcePort = port;
	        } else {
	          this.targetPort = port;
	        }
	
	        var terminal = this.getTerminal(isSource);
	        if (terminal) {
	          terminal.port = port;
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getTerminalPoint',
	    value: function getTerminalPoint() {
	      var isSource = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	
	      var point = isSource ? this.sourcePoint : this.targetPoint;
	
	      if (!point) {
	
	        var terminal = this.getTerminal(isSource);
	
	        point = terminal && terminal.point || null;
	      }
	
	      return point;
	    }
	  }, {
	    key: 'setTerminalPoint',
	    value: function setTerminalPoint(point) {
	      var isSource = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      scheduleSetTerminal.call(this, false);
	
	      if (!options.silent) {
	        var model = getModel(this);
	        if (model) {
	          model.setTerminalPoint(this, point, isSource);
	          scheduleSetTerminal.call(this, true);
	        }
	      }
	
	      if (!isSetTerminalScheduled.call(this)) {
	
	        if (isSource) {
	          this.sourcePoint = point;
	        } else {
	          this.targetPoint = point;
	        }
	
	        var terminal = this.getTerminal(isSource);
	        if (terminal) {
	          terminal.point = point;
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeFromTerminal',
	    value: function removeFromTerminal() {
	      var isSource = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      // remove link from terminal
	      var terminal = this.getTerminal(isSource);
	      if (terminal) {
	
	        scheduleSetTerminal.call(this, false);
	
	        if (!options.silent) {
	          var model = getModel(this, terminal);
	          if (model) {
	            model.removeFromTerminal(this, isSource);
	            scheduleSetTerminal.call(this, true);
	          }
	        }
	
	        if (!isSetTerminalScheduled.call(this)) {
	          terminal.removeLink(this, isSource, { silent: true });
	        }
	      }
	
	      return this;
	    }
	
	    // node
	    // ----
	
	  }, {
	    key: 'isNode',
	    value: function isNode() {
	
	      return false;
	    }
	  }, {
	    key: 'getLinks',
	    value: function getLinks() {
	
	      return this.links || [];
	    }
	  }, {
	    key: 'getLinkCount',
	    value: function getLinkCount() {
	
	      return this.getLinks().length;
	    }
	  }, {
	    key: 'indexOfLink',
	    value: function indexOfLink(link) {
	
	      return utils.indexOf(this.links, link);
	    }
	  }, {
	    key: 'getLinkAt',
	    value: function getLinkAt(index) {
	
	      return this.links ? this.links[index] : null;
	    }
	  }, {
	    key: 'eachLink',
	    value: function eachLink(iterator, context) {
	
	      return utils.forEach(this.links, iterator, context);
	    }
	  }, {
	    key: 'filterLink',
	    value: function filterLink(iterator, context) {
	
	      return utils.filter(this.links, iterator, context);
	    }
	  }, {
	    key: 'addLink',
	    value: function addLink(link) {
	      var outgoing = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      if (!link) {
	        return this;
	      }
	
	      scheduleSetTerminal.call(link, false);
	
	      if (!options.silent) {
	        var model = getModel(link, this);
	        if (model) {
	          // fully replace the previous terminal
	          model.setTerminal(link, this, outgoing);
	          scheduleSetTerminal.call(link, true);
	        }
	      }
	
	      if (!isSetTerminalScheduled.call(link)) {
	
	        link.removeFromTerminal(outgoing, { silent: true });
	
	        // when source and target are the same node, these's
	        // no need to relate link with node once more.
	        if (!this.links || this.indexOfLink(link) < 0 || link.getTerminalNode(!outgoing) !== this) {
	
	          if (!this.links) {
	            this.links = [];
	          }
	
	          // links are unordered, push it to the array directly.
	          this.links.push(link);
	        }
	
	        link.setTerminal(this, outgoing, { silent: true });
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeLink',
	    value: function removeLink(link) {
	      var outgoing = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      if (!link) {
	        return this;
	      }
	
	      scheduleSetTerminal.call(link, false);
	
	      if (!options.silent) {
	        var model = getModel(link, this);
	        if (model) {
	          // fully remove the previous terminal
	          model.setTerminal(link, null, outgoing);
	          scheduleSetTerminal.call(link, true);
	        }
	      }
	
	      if (!isSetTerminalScheduled.call(link)) {
	
	        // when the source and target are the same, do not remove it
	        if (this.links && link.getTerminalNode(!outgoing) !== this) {
	
	          var index = this.indexOfLink(link);
	          if (index >= 0) {
	            this.links.splice(index, 1);
	          }
	        }
	
	        link.setTerminal(null, outgoing, { silent: true });
	      }
	
	      return this;
	    }
	
	    // children
	    // --------
	
	  }, {
	    key: 'getChildren',
	    value: function getChildren() {
	
	      return this.children || [];
	    }
	  }, {
	    key: 'getChildCount',
	    value: function getChildCount() {
	
	      return this.getChildren().length;
	    }
	  }, {
	    key: 'indexOfChild',
	    value: function indexOfChild(child) {
	
	      return utils.indexOf(this.children, child);
	    }
	  }, {
	    key: 'getChildAt',
	    value: function getChildAt(index) {
	
	      return this.children ? this.children[index] : null;
	    }
	  }, {
	    key: 'eachChild',
	    value: function eachChild(iterator, context) {
	
	      return utils.forEach(this.children, iterator, context);
	    }
	  }, {
	    key: 'filterChild',
	    value: function filterChild(iterator, context) {
	
	      return utils.filter(this.children, iterator, context);
	    }
	  }, {
	    key: 'insertChild',
	    value: function insertChild(child, index) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      if (!child) {
	        return this;
	      }
	
	      if (utils.isObject(index)) {
	        options = index;
	      }
	
	      scheduleSetParent.call(child, false);
	
	      if (!options.silent) {
	        child.setParent(this, index);
	      }
	
	      if (!isSetParentScheduled.call(child)) {
	        // if unscheduled, insert it directly
	        _insertChild.call(this, child, index);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeChild',
	    value: function removeChild(child) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      return this.removeChildAt(this.indexOfChild(child), options);
	    }
	  }, {
	    key: 'removeChildAt',
	    value: function removeChildAt(index) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var child = this.getChildAt(index);
	      if (child) {
	
	        scheduleSetParent.call(child, false);
	
	        if (!options.silent) {
	          child.setParent(null);
	        }
	
	        if (!isSetParentScheduled.call(child)) {
	          this.children.splice(index, 1);
	          child.parent = null;
	        }
	      }
	
	      // return the removed child
	      return child;
	    }
	
	    // parent
	    // ------
	
	  }, {
	    key: 'getParent',
	    value: function getParent() {
	
	      return this.parent;
	    }
	  }, {
	    key: 'setParent',
	    value: function setParent(parent, index) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      scheduleSetParent.call(this, false);
	
	      // try to schedule a change
	      if (!options.silent) {
	
	        // this cell maybe not in a model, try get parent's model
	        var model = getModel(this, parent);
	        // schedule a change
	        if (model) {
	          model.setParent(this, parent, index);
	          scheduleSetParent.call(this, true);
	        }
	      }
	
	      if (!isSetParentScheduled.call(this)) {
	        if (parent) {
	          _insertChild.call(parent, this, index);
	        } else {
	          this.removeFromParent({ silent: true });
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeFromParent',
	    value: function removeFromParent() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      if (this.parent) {
	
	        var scheduled = false;
	
	        // try to schedule a change
	        if (!options.silent) {
	          var model = getModel(this, this.parent);
	          if (model) {
	            model.removeCell(this);
	            scheduled = true;
	          }
	        }
	
	        if (!scheduled) {
	          this.parent.removeChild(this, { silent: true });
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'isOrphan',
	    value: function isOrphan() {
	
	      return utils.isNil(this.parent);
	    }
	  }, {
	    key: 'isAncestor',
	    value: function isAncestor(descendant) {
	
	      if (!descendant) {
	        return false;
	      }
	
	      while (descendant && descendant !== this) {
	        descendant = descendant.parent;
	      }
	
	      return descendant === this;
	    }
	  }, {
	    key: 'contains',
	    value: function contains(descendant) {
	
	      return this.isAncestor(this, descendant);
	    }
	  }, {
	    key: 'getAncestors',
	    value: function getAncestors() {
	
	      var result = [];
	      var parent = this.parent;
	
	      while (parent) {
	        result.push(parent);
	        parent = parent.parent;
	      }
	
	      return result;
	    }
	  }, {
	    key: 'getDescendants',
	    value: function getDescendants() {
	      var _this = this;
	
	      var result = [];
	
	      this.eachChild(function (child) {
	        result.push(child);
	        result = result.concat(_this.getDescendants(child));
	      });
	
	      return result;
	    }
	
	    // geometry
	    // --------
	
	  }, {
	    key: 'getSize',
	    value: function getSize(raw) {
	
	      return raw ? this.metadata.size : this.size;
	    }
	  }, {
	    key: '_setSize',
	    value: function _setSize(size) {
	
	      this.metadata.size = size;
	    }
	  }, {
	    key: 'setSize',
	    value: function setSize(size) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      size = {
	        width: size.width,
	        height: size.height,
	        relative: size.relative === true
	      };
	
	      if (!options.silent) {
	        var model = this.getModel();
	        if (model) {
	          model.setSize(this, size);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled) {
	        this._setSize(size);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'resize',
	    value: function resize(width, height) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      return this.setSize({ width: width, height: height }, options);
	    }
	  }, {
	    key: 'getPosition',
	    value: function getPosition(raw) {
	
	      return raw ? this.metadata.position : this.position;
	    }
	  }, {
	    key: '_setPosition',
	    value: function _setPosition(position) {
	
	      this.metadata.position = position;
	    }
	  }, {
	    key: 'setPosition',
	    value: function setPosition(position) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      position = {
	        x: position.x,
	        y: position.y,
	        relative: position.relative === true
	      };
	
	      if (!options.silent) {
	        var model = this.getModel();
	        if (model) {
	          model.setPosition(this, position);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled) {
	        this._setPosition(position);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'translate',
	    value: function translate(x, y) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      return this.setPosition({ x: x, y: y }, options);
	    }
	  }, {
	    key: 'getRotation',
	    value: function getRotation(raw) {
	
	      return raw ? this.metadata.rotation : this.rotation;
	    }
	  }, {
	    key: '_setRotation',
	    value: function _setRotation(rotation) {
	
	      this.metadata.rotation = rotation;
	    }
	  }, {
	    key: 'setRotation',
	    value: function setRotation(rotation) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      rotation = {
	        angle: rotation.angle,
	        relative: rotation.relative === true
	      };
	
	      if (!options.silent) {
	        var model = this.getModel();
	        if (model) {
	          model.setRotation(this, rotation);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled) {
	        this._setRotation(rotation);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(angle) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      return this.setRotation({ angle: angle }, options);
	    }
	  }, {
	    key: 'getGeometry',
	    value: function getGeometry(raw) {
	
	      return {
	        size: this.getSize(raw),
	        position: this.getPosition(raw),
	        rotation: this.getRotation(raw)
	      };
	    }
	  }, {
	    key: '_setGeometry',
	    value: function _setGeometry(geom) {
	      var _this2 = this;
	
	      utils.forEach(['size', 'position', 'rotation'], function (key) {
	
	        var val = geom[key];
	        if (val) {
	          _this2['_set' + utils.ucFirst(key)](val);
	        }
	      });
	    }
	  }, {
	    key: 'setGeometry',
	    value: function setGeometry(geom) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      if (!options.silent) {
	
	        var model = this.getModel();
	        if (model) {
	          model.setGeometry(this, geom);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled) {
	        this._setGeometry(geom);
	      }
	
	      return this;
	    }
	
	    // collapse
	    // --------
	
	  }, {
	    key: 'isCollapsed',
	    value: function isCollapsed() {
	
	      return this.metadata.collapsed === true;
	    }
	  }, {
	    key: '_setCollapsed',
	    value: function _setCollapsed(collapsed) {
	
	      this.metadata.collapsed = collapsed;
	    }
	  }, {
	    key: 'setCollapsed',
	    value: function setCollapsed(collapsed) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      if (!options.silent) {
	
	        var model = getModel(this);
	        if (model) {
	          model.setCollapsed(this, collapsed);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled) {
	        this._setCollapsed(collapsed);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'collapse',
	    value: function collapse() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      return this.setCollapsed(true, options);
	    }
	  }, {
	    key: 'expand',
	    value: function expand() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      return this.setCollapsed(false, options);
	    }
	  }, {
	    key: 'toggleCollapse',
	    value: function toggleCollapse() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      return this.isCollapsed() ? this.expand(options) : this.collapse(options);
	    }
	
	    // visible
	    // -------
	
	  }, {
	    key: 'isVisible',
	    value: function isVisible() {
	
	      return this.visible !== false;
	    }
	  }, {
	    key: '_setVisible',
	    value: function _setVisible(visible) {
	
	      this.visible = this.metadata.visible = !!visible;
	    }
	  }, {
	    key: 'setVisible',
	    value: function setVisible(visible) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      if (!options.silent) {
	
	        var model = getModel(this);
	        if (model) {
	          model.setVisible(this, visible);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled) {
	        this._setVisible(visible);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      return this.setVisible(true, options);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      return this.setVisible(false, options);
	    }
	  }, {
	    key: 'toggleVisible',
	    value: function toggleVisible() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      return this.isVisible() ? this.hide(options) : this.show(options);
	    }
	
	    // attribute
	    // ---------
	
	  }, {
	    key: 'getAttribute',
	    value: function getAttribute() {
	
	      return this.metadata.attrs;
	    }
	  }, {
	    key: '_setAttribute',
	    value: function _setAttribute(attrs) {
	
	      this.metadata.attrs = utils.merge({}, this.getAttribute(), attrs);
	    }
	  }, {
	    key: 'setAttribute',
	    value: function setAttribute(attrs) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var scheduled = false;
	
	      if (!options.silent) {
	
	        var model = this.getModel();
	        if (model) {
	          model.setAttribute(this, attrs);
	          scheduled = true;
	        }
	      }
	
	      if (!scheduled && this.metadata) {
	        this._setAttribute(attrs);
	      }
	
	      return this;
	    }
	
	    // access
	    // ------
	
	  }, {
	    key: 'getId',
	    value: function getId() {
	
	      return this.id;
	    }
	  }, {
	    key: 'setId',
	    value: function setId(id) {
	
	      this.id = id;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel() {
	
	      return this.model;
	    }
	  }, {
	    key: 'setModel',
	    value: function setModel(model) {
	
	      this.model = model || null;
	
	      return this;
	    }
	  }, {
	    key: 'addTo',
	    value: function addTo(parent, index) {
	      var model = arguments.length <= 2 || arguments[2] === undefined ? this.getModel() : arguments[2];
	
	
	      if (model) {
	        model.addCell(this, parent, index);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getView',
	    value: function getView(paper) {
	
	      return paper.getView(this);
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	
	      var classNames = this.metadata.classNames;
	
	      return utils.isArray(classNames) ? classNames.join(' ') : classNames || '';
	    }
	  }, {
	    key: 'getTagName',
	    value: function getTagName() {
	
	      return this.metadata.tagName || 'g';
	    }
	  }, {
	    key: 'getMarkup',
	    value: function getMarkup() {
	
	      return this.metadata.markup;
	    }
	  }, {
	    key: 'getRenderData',
	    value: function getRenderData() {
	
	      // get the data for render markup
	      return this.data;
	    }
	
	    // lang
	    // ----
	
	  }, {
	    key: 'valueOf',
	    value: function valueOf() {
	
	      return this.data;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	
	      return this.getId() || Object.toString.call(this);
	    }
	  }, {
	    key: 'cloneData',
	    value: function cloneData() {
	
	      var data = this.data;
	      if (data) {
	
	        if (data.clone && utils.isFunction(data.clone)) {
	          return data.clone();
	        }
	
	        if (utils.isNode(data)) {
	          return data.cloneNode(true);
	        }
	
	        if (utils.isObject(data)) {
	          return utils.merge({}, data);
	        }
	      }
	
	      return data;
	    }
	  }, {
	    key: 'clone',
	    value: function clone(options, withData) {
	
	      var metadata = utils.merge({}, this.metadata, options);
	
	      metadata.data = withData === true ? this.cloneData() : this.data;
	      metadata.visible = this.visible;
	
	      return new this.constructor(metadata);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      this.eachChild(function (child) {
	        return child.destroy();
	      });
	      this.eachLink(function (link) {
	        return link.destroy();
	      });
	
	      this.removeFromTerminal(true).removeFromTerminal(false).removeFromParent();
	
	      utils.destroy(this);
	    }
	  }], [{
	    key: 'setDefaults',
	    value: function setDefaults(options) {
	
	      // update default options
	      this.defaults = utils.merge({}, this.defaults, options);
	    }
	  }]);
	
	  return Cell;
	}();
	
	// exports
	// -------
	
	exports.default = Cell;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function scheduleSetTerminal(scheduled) {
	
	  this.setTerminal.scheduled = scheduled;
	
	  return this;
	}
	
	function isSetTerminalScheduled() {
	
	  return this.setTerminal.scheduled === true;
	}
	
	var Terminal = function () {
	  function Terminal(terminal) {
	    _classCallCheck(this, Terminal);
	
	    if (terminal instanceof Terminal) {
	      return terminal;
	    }
	
	    if (terminal) {
	
	      if (terminal.isNode && terminal.isNode()) {
	
	        this.node = terminal;
	      } else if (_Point2.default.isPointLike(terminal)) {
	
	        this.point = _Point2.default.fromPoint(terminal);
	      } else if (utils.isObject(terminal)) {
	
	        this.node = terminal.node;
	        this.port = terminal.port;
	        this.point = _Point2.default.isPointLike(terminal.point) ? _Point2.default.fromPoint(terminal.point) : null;
	      }
	    }
	
	    return this;
	  }
	
	  _createClass(Terminal, [{
	    key: 'addLink',
	    value: function addLink(link) {
	      var isSource = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      if (link) {
	
	        scheduleSetTerminal.call(link, false);
	
	        if (!options.silent) {
	          var model = link.getModel() || this.getModel();
	          if (model) {
	            model.setTerminal(link, this, isSource);
	            scheduleSetTerminal.call(link, true);
	          }
	        }
	
	        if (!isSetTerminalScheduled.call(link)) {
	
	          if (this.node) {
	            this.node.addLink(link, isSource, { silent: true });
	          }
	
	          link.setTerminal(this, isSource, { silent: true });
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeLink',
	    value: function removeLink(link) {
	      var isSource = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      if (link) {
	
	        scheduleSetTerminal.call(link, false);
	
	        if (!options.silent) {
	          var model = link.getModel() || this.getModel();
	          if (model) {
	            model.setTerminal(link, null, isSource);
	            scheduleSetTerminal.call(link, true);
	          }
	        }
	
	        if (!isSetTerminalScheduled.call(link)) {
	
	          if (this.node) {
	            this.node.removeLink(link, isSource, { silent: true });
	          }
	
	          link.setTerminal(null, isSource, { silent: true });
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'duplicate',
	    value: function duplicate(terminal) {
	
	      var cloned = new Terminal(terminal);
	
	      // copy the missing properties
	      utils.forEach(['node', 'port', 'point'], function (key) {
	        if (this[key] && !cloned[key]) {
	          cloned[key] = this[key];
	        }
	      }, this);
	
	      return cloned;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel() {
	
	      return this.node && this.node.getModel();
	    }
	  }]);
	
	  return Terminal;
	}();
	
	// exports
	// -------
	
	exports.default = Terminal;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Path = function (_Node) {
	  _inherits(Path, _Node);
	
	  function Path(options) {
	    _classCallCheck(this, Path);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Path).call(this, options));
	
	    _this.parsePathData();
	    return _this;
	  }
	
	  _createClass(Path, [{
	    key: 'parsePathData',
	    value: function parsePathData() {
	
	      // parse path data
	
	      var pathData = this.getPathData() || '';
	      var operators = pathData.match(/([A-Za-z])/g);
	
	      pathData = pathData.replace(/^[A-Za-z]/, '').replace(/[A-Za-z]$/, '');
	
	      var groups = utils.split(pathData, /[A-Za-z]/);
	
	      groups = utils.map(groups, function (group) {
	
	        group = utils.trim(group);
	
	        var xys = utils.split(group, /[\s,]+/);
	        var points = [];
	
	        for (var i = 0, l = xys.length; i < l; i += 2) {
	          points.push({
	            x: utils.toFloat(xys[i]),
	            y: utils.toFloat(xys[i + 1])
	          });
	        }
	
	        return points;
	      });
	
	      var points = utils.reduce(groups, function (previous, group) {
	        return previous.concat(group);
	      }, []);
	
	      var minX = points[0].x;
	      var minY = points[0].y;
	      utils.forEach(points, function (point) {
	        minX = Math.min(point.x, minX);
	        minY = Math.min(point.y, minY);
	      });
	
	      var formatted = [];
	      utils.forEach(groups, function (group, index) {
	
	        if (operators[index]) {
	          formatted.push(operators[index]);
	        }
	
	        utils.forEach(group, function (point) {
	
	          var x = utils.toFixed(point.x - minX, 2);
	          var y = utils.toFixed(point.y - minY, 2);
	
	          formatted.push(x, y);
	        });
	      });
	
	      if (operators[groups.length]) {
	        formatted.push(operators[groups.length]);
	      }
	
	      var d = formatted.join(' ');
	      var attrs = this.metadata.attrs;
	
	      if (attrs.path) {
	        attrs.path.d = d;
	      } else {
	        attrs.path = {
	          d: d
	        };
	      }
	    }
	  }, {
	    key: 'getPathData',
	    value: function getPathData() {
	
	      var metadata = this.metadata;
	      var attrs = metadata.attrs;
	      var pathAttr = attrs && attrs.path;
	      var pathData = pathAttr && pathAttr.d;
	
	      if (!pathData) {
	
	        var regPath = /<path(?:.+)d=(["|'])(.*?)\1/;
	        var markup = metadata.markup || '';
	        var match = markup.match(regPath);
	
	        if (match) {
	          pathData = match[2];
	        }
	      }
	
	      return pathData;
	    }
	  }]);
	
	  return Path;
	}(_Node3.default);
	
	Path.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><path/></g><text/></g>',
	
	  size: {
	    width: 60,
	    height: 60
	  },
	
	  attrs: {
	    '.': {
	      fill: '#ffffff',
	      stroke: 'none'
	    },
	    'path': {
	      fill: '#ffffff',
	      stroke: '#000000'
	    },
	    'text': {
	      'font-size': 14,
	      'text': '',
	      'text-anchor': 'middle',
	      'ref': 'path',
	      'ref-x': .5,
	      'ref-dy': 10,
	      'fill': '#000000',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Path;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Text = function (_Node) {
	  _inherits(Text, _Node);
	
	  function Text() {
	    _classCallCheck(this, Text);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
	  }
	
	  return Text;
	}(_Node3.default);
	
	Text.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><text/></g></g>',
	
	  attrs: {
	    '.': {
	      fill: '#fff',
	      stroke: 'none'
	    },
	    'text': {
	      'font-size': 18,
	      'fill': '#000'
	    }
	  }
	});
	
	exports.default = Text;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Portal2 = __webpack_require__(25);
	
	var _Portal3 = _interopRequireDefault(_Portal2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ports = function (_Portal) {
	  _inherits(Ports, _Portal);
	
	  function Ports(options) {
	    _classCallCheck(this, Ports);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ports).call(this, options));
	
	    _this.updatePortsAttrs();
	    return _this;
	  }
	
	  _createClass(Ports, [{
	    key: 'updatePortsAttrs',
	    value: function updatePortsAttrs() {
	
	      var attrs = {};
	
	      utils.forEach(this.inPorts, function (port, index) {
	        utils.merge(attrs, this.getPortAttrs(port, index, true));
	      }, this);
	
	      utils.forEach(this.outPorts, function (port, index) {
	        utils.merge(attrs, this.getPortAttrs(port, index, false));
	      }, this);
	
	      utils.merge(this.attrs, attrs);
	
	      return this;
	    }
	
	    // get the attrs for every port, so we can customize
	    // the port's position, color, etc
	
	  }, {
	    key: 'getPortAttrs',
	    value: function getPortAttrs(port, index, isInPort) {
	
	      var attrs = {};
	      var ports = isInPort ? this.inPorts : this.outPorts;
	
	      var rootSelector = this.getPortSelector(port, isInPort);
	      var labelSelector = rootSelector + '>.port-label';
	
	      attrs[labelSelector] = { text: port.id };
	      attrs[rootSelector] = {
	        'ref': '.node-body',
	        'ref-y': (index + 0.5) * (1 / ports.length)
	      };
	
	      if (!isInPort) {
	        attrs[rootSelector]['ref-dx'] = 0;
	      }
	
	      return attrs;
	    }
	  }, {
	    key: 'getPortSelector',
	    value: function getPortSelector(port, isInPort) {
	
	      return this.getPortsWrapSelector(isInPort) + '>.pane-port[data-id="' + port.id + '"]';
	    }
	  }, {
	    key: 'getPortsWrapSelector',
	    value: function getPortsWrapSelector(isInPort) {
	
	      return '.pane-ports.' + (isInPort ? 'in' : 'out');
	    }
	  }]);
	
	  return Ports;
	}(_Portal3.default);
	
	Ports.setDefaults({
	  size: {
	    width: 80,
	    height: 100
	  },
	
	  markup: '' + '<g class="pane-rotatable">' + '  <g class="pane-scalable">' + '    <rect class="node-body"/>' + '  </g>' + '  <text class="node-label"/>' + '  <g class="pane-ports in" />' + '  <g class="pane-ports out" />' + '</g>',
	
	  portMarkup: '' + '<g class="pane-port" data-id="${id}">' + '  <circle class="port-body"/>' + '  <text class="port-label"/>' + '</g>',
	
	  attrs: {
	    '.node-label': {
	      'text': 'port',
	      'ref-x': 0.5,
	      'ref-y': 0.5,
	      'y-alignment': 'middle',
	      'text-anchor': 'middle'
	    },
	    '.in .port-label': {
	      x: -15,
	      dy: 4
	    },
	    '.out .port-label': {
	      x: 15,
	      dy: 4
	    }
	  }
	});
	
	// exports
	// -------
	
	exports.default = Ports;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _string = __webpack_require__(8);
	
	var _lang = __webpack_require__(6);
	
	var _array = __webpack_require__(7);
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _PortalView = __webpack_require__(26);
	
	var _PortalView2 = _interopRequireDefault(_PortalView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Portal = function (_Node) {
	  _inherits(Portal, _Node);
	
	  function Portal(options) {
	    _classCallCheck(this, Portal);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Portal).call(this, options));
	
	    _this.inPorts = (0, _array.map)(_this.metadata.inPorts, function (port) {
	      return _this.standardizePort(port);
	    });
	    _this.outPorts = (0, _array.map)(_this.metadata.outPorts, function (port) {
	      return _this.standardizePort(port);
	    });
	    _this.portById = {};
	
	    (0, _array.forEach)(_this.inPorts, function (port) {
	      _this.portById[port.id] = port;
	    });
	
	    (0, _array.forEach)(_this.outPorts, function (port) {
	      _this.portById[port.id] = port;
	    });
	    return _this;
	  }
	
	  _createClass(Portal, [{
	    key: 'eachInPort',
	    value: function eachInPort(iterator, context) {
	
	      (0, _array.forEach)(this.inPorts, iterator, context);
	    }
	  }, {
	    key: 'eachOutPort',
	    value: function eachOutPort(iterator, context) {
	
	      (0, _array.forEach)(this.outPorts, iterator, context);
	    }
	  }, {
	    key: 'getInPorts',
	    value: function getInPorts() {
	
	      return this.inPorts;
	    }
	  }, {
	    key: 'getOutPorts',
	    value: function getOutPorts() {
	
	      return this.outPorts;
	    }
	  }, {
	    key: 'getPortById',
	    value: function getPortById(id) {
	
	      return this.portById[id] || null;
	    }
	  }, {
	    key: 'isInPort',
	    value: function isInPort(port) {
	
	      return (0, _array.some)(this.inPorts, function (item) {
	        return item.id === port.id;
	      });
	    }
	  }, {
	    key: 'isOutPort',
	    value: function isOutPort(port) {
	
	      return (0, _array.some)(this.outPorts, function (item) {
	        return item.id === port.id;
	      });
	    }
	  }, {
	    key: 'standardizePort',
	    value: function standardizePort(port) {
	
	      if (!(0, _lang.isObject)(port)) {
	        port = { id: port };
	      }
	
	      if (!port.id) {
	        port.id = (0, _string.uuid)();
	      }
	
	      return port;
	    }
	  }, {
	    key: 'getPortMarkup',
	    value: function getPortMarkup() {
	
	      return this.metadata.portMarkup;
	    }
	  }]);
	
	  return Portal;
	}(_Node3.default);
	
	Portal.setDefaults({
	  portMarkup: '',
	  inPorts: [],
	  outPorts: [],
	  view: _PortalView2.default
	});
	
	// exports
	// -------
	
	exports.default = Portal;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Ellipse = __webpack_require__(28);
	
	var _Ellipse2 = _interopRequireDefault(_Ellipse);
	
	var _NodeView2 = __webpack_require__(29);
	
	var _NodeView3 = _interopRequireDefault(_NodeView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PortalView = function (_NodeView) {
	  _inherits(PortalView, _NodeView);
	
	  function PortalView() {
	    _classCallCheck(this, PortalView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PortalView).apply(this, arguments));
	  }
	
	  _createClass(PortalView, [{
	    key: 'renderMarkup',
	    value: function renderMarkup() {
	
	      _get(Object.getPrototypeOf(PortalView.prototype), 'renderMarkup', this).call(this);
	      this.renderPorts();
	
	      return this;
	    }
	  }, {
	    key: 'renderPorts',
	    value: function renderPorts() {
	
	      var vel = this.vel;
	      var cell = this.getCell();
	
	      var inPorts = cell.getInPorts();
	      var outPorts = cell.getOutPorts();
	      var portMarkup = cell.getPortMarkup();
	
	      var inPortWrap = vel.findOne(cell.getPortsWrapSelector(true));
	      var outPortWrap = vel.findOne(cell.getPortsWrapSelector(false));
	
	      if (inPortWrap) {
	
	        inPortWrap.empty();
	
	        utils.forEach(inPorts, function (port) {
	          var html = this.compileMarkup(portMarkup, port);
	          inPortWrap.append((0, _vector2.default)(html));
	        }, this);
	      }
	
	      if (outPortWrap) {
	
	        outPortWrap.empty();
	
	        utils.forEach(outPorts, function (port) {
	          var html = this.compileMarkup(portMarkup, port);
	          outPortWrap.append((0, _vector2.default)(html));
	        }, this);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getConnectionPointOnPort',
	    value: function getConnectionPointOnPort() {
	
	      return null;
	    }
	  }, {
	    key: 'getPortBodyBBox',
	    value: function getPortBodyBBox(port) {
	
	      var node = this.getCell();
	      var portId = utils.isObject(port) ? port.id : port;
	
	      port = node.getPortById(portId);
	
	      var selector = node.getPortSelector(port, node.isInPort(port));
	      if (selector) {
	        var vel = this.findOne(selector);
	        var body = vel && vel.findOne('.port-body');
	        if (body) {
	          return body.getBBox();
	        }
	      }
	
	      return null;
	    }
	  }, {
	    key: 'getPortBodyGeom',
	    value: function getPortBodyGeom(port) {
	
	      var node = this.getCell();
	      var portId = utils.isObject(port) ? port.id : port;
	
	      port = node.getPortById(portId);
	
	      var selector = node.getPortSelector(port, node.isInPort(port));
	      if (selector) {
	        var vel = this.findOne(selector);
	        var body = vel && vel.findOne('.port-body');
	        var elem = body && body.node;
	
	        if (elem) {
	
	          var bbox = body.getBBox(false, this.getPane());
	          var center = bbox.getCenter();
	
	          var result = void 0;
	
	          if (utils.isNode(elem, 'circle')) {
	            var r = utils.getComputedStyle(elem, 'r');
	
	            r = utils.toFloat(r);
	
	            if (r) {
	              result = new _Ellipse2.default(center.x, center.y, r, r);
	            }
	          } else if (utils.isNode(elem, 'ellipse')) {
	            var rx = utils.getComputedStyle(elem, 'rx');
	            var ry = utils.getComputedStyle(elem, 'ry');
	
	            rx = utils.toFloat(rx);
	            ry = utils.toFloat(ry);
	
	            if (rx && ry) {
	              result = new _Ellipse2.default(center.x, center.y, rx, ry);
	            }
	          } else {
	            result = bbox;
	          }
	
	          return result;
	        }
	      }
	
	      return null;
	    }
	  }, {
	    key: 'findPortByElem',
	    value: function findPortByElem(elem) {
	
	      var that = this;
	      var vel = that.vel;
	      var cell = that.cell;
	      var vPort = (0, _vector2.default)(elem);
	
	      var className = 'pane-port';
	
	      if (!vPort.hasClass(className)) {
	        vPort = vPort.findParent(className, vel.node);
	      }
	
	      if (vPort) {
	
	        var vWrap = vPort.parent();
	        if (vWrap) {
	          var _ret = function () {
	
	            var index = vPort.index();
	            var type = vWrap.hasClass('in') ? 'in' : vWrap.hasClass('out') ? 'out' : '';
	            var ports = type === 'in' ? cell.inPorts : type === 'out' ? cell.outPorts : [];
	
	            var selector = cell.getPortSelector(type, index);
	            var result = null;
	
	            utils.some(ports, function (port) {
	
	              if (port.selector === selector) {
	                result = port;
	                return true;
	              }
	
	              return false;
	            });
	
	            return {
	              v: result
	            };
	          }();
	
	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }
	      }
	
	      return null;
	    }
	  }]);
	
	  return PortalView;
	}(_NodeView3.default);
	
	// exports
	// -------
	
	exports.default = PortalView;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VElement = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var pathCount = 0;
	
	function createPathId() {
	
	  var id = void 0;
	
	  do {
	    pathCount += 1;
	    id = 'pane-path-' + pathCount;
	  } while (document.getElementById(id));
	
	  return id;
	}
	
	function deltaTransformPoint(matrix, point) {
	
	  return {
	    x: point.x * matrix.a + point.y * matrix.c,
	    y: point.x * matrix.b + point.y * matrix.d
	  };
	}
	
	function decomposeMatrix(matrix) {
	
	  // @see https://gist.github.com/2052247
	
	  // calculate delta transform point
	  var px = deltaTransformPoint(matrix, {
	    x: 0,
	    y: 1
	  });
	  var py = deltaTransformPoint(matrix, {
	    x: 1,
	    y: 0
	  });
	
	  // calculate skew
	  var skewX = 180 / Math.PI * Math.atan2(px.y, px.x) - 90;
	  var skewY = 180 / Math.PI * Math.atan2(py.y, py.x);
	
	  return {
	    skewX: skewX,
	    skewY: skewY,
	    translateX: matrix.e,
	    translateY: matrix.f,
	    scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
	    scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
	    rotation: skewX // rotation is the same as skew x
	  };
	}
	
	var VElement = exports.VElement = function () {
	  function VElement(elem) {
	    _classCallCheck(this, VElement);
	
	    if (!(this instanceof VElement)) {
	      return new VElement(elem);
	    }
	
	    if (elem instanceof VElement) {
	      elem = elem.node;
	    }
	
	    if (!elem) {
	      throw new Error('Unknown elem for VElement');
	    }
	
	    this.node = elem;
	
	    return this;
	  }
	
	  _createClass(VElement, [{
	    key: 'attr',
	    value: function attr(name, value) {
	
	      if (utils.isUndefined(name)) {
	        // return all attributes.
	
	        return utils.reduce(this.node.attributes, function (result, attr) {
	          result[attr.nodeName] = attr.nodeValue;
	          return result;
	        }, {});
	      }
	
	      if (utils.isString(name) && utils.isUndefined(value)) {
	        return this.node.getAttribute(name);
	      }
	
	      if (utils.isObject(name)) {
	        this.setAttrs(name);
	      } else {
	        this.setAttr(name, value);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setAttr',
	    value: function setAttr(name, value) {
	
	      if (utils.isNil(value)) {
	        this.removeAttr(name);
	      } else {
	        utils.setAttribute(this.node, name, value);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setAttrs',
	    value: function setAttrs(attrs) {
	
	      utils.forIn(attrs, function (value, name) {
	        this.setAttr(name, value);
	      }, this);
	
	      return this;
	    }
	  }, {
	    key: 'removeAttr',
	    value: function removeAttr(name) {
	
	      utils.removeAttribute(this.node, name);
	
	      return this;
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	
	      utils.showHide(this.node, true);
	
	      return this;
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	
	      utils.showHide(this.node, false);
	
	      return this;
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(state) {
	
	      if (utils.isBoolean(state)) {
	        return state ? this.show() : this.hide();
	      }
	
	      if (utils.isHidden(this.node)) {
	        this.show();
	      } else {
	        this.hide();
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	
	      return utils.getClassName(this.node);
	    }
	  }, {
	    key: 'hasClass',
	    value: function hasClass(selector) {
	
	      return utils.hasClass(this.node, selector);
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(selector) {
	
	      utils.addClass(this.node, selector);
	
	      return this;
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(selector) {
	
	      utils.removeClass(this.node, selector);
	
	      return this;
	    }
	  }, {
	    key: 'toggleClass',
	    value: function toggleClass(selector, stateVal) {
	
	      utils.toggleClass(this.node, selector, stateVal);
	
	      return this;
	    }
	  }, {
	    key: 'css',
	    value: function css(name, value) {
	
	      if (!name) {
	        return this.node.style;
	      }
	
	      utils.setStyle(this.node, name, value);
	
	      return this;
	    }
	  }, {
	    key: 'text',
	    value: function text(content) {
	      var _this = this;
	
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      // replace all spaces with the Unicode No-break space
	      // (http://www.fileformat.info/info/unicode/char/a0/index.htm).
	      // IE would otherwise collapse all spaces into one.
	      content = utils.sanitizeText(content);
	
	      // `alignment-baseline` does not work in Firefox.
	      // Setting `dominant-baseline` on the `<text>` element doesn't work in IE9.
	      // In order to have the 0,0 coordinate of the `<text>` element (or the first `<tspan>`)
	      // in the top left corner we translate the `<text>` element by `0.8em`.
	      // See `http://www.w3.org/Graphics/SVG/WG/wiki/How_to_determine_dominant_baseline`.
	      // See also `http://apike.ca/prog_svg_text_style.html`.
	      var y = this.attr('y');
	      if (!y) {
	        this.attr('y', '0.8em');
	      }
	
	      // An empty text gets rendered into the DOM in webkit-based browsers.
	      // In order to unify this behaviour across all browsers we rather
	      // hide the text element when it's empty.
	      this.attr('display', content ? null : 'none');
	
	      // Preserve spaces. In other words, we do not want consecutive spaces to get collapsed to one.
	      this.attr('xml:space', 'preserve');
	
	      // Easy way to erase all `<tspan>` children;
	      this.node.textContent = '';
	
	      var textNode = this.node;
	      var textPathOptions = options.textPath;
	      if (textPathOptions) {
	
	        // Wrap the text in the SVG <textPath> element that points to a path
	        // defined by `options.textPath` inside the internal `<defs>` element.
	        var defs = this.find('defs');
	        if (!defs.length) {
	          defs = createVElement('defs');
	          this.append(defs);
	        }
	
	        // If `opt.textPath` is a plain string, consider it to be directly
	        // the SVG path data for the text to go along (this is a shortcut).
	        // Otherwise if it is an object and contains the `d` property,
	        // then this is our path.
	        var isTextPathObject = Object(textPathOptions) === textPathOptions;
	
	        // d attr
	        var d = isTextPathObject ? textPathOptions.d : textPathOptions;
	
	        var vPath = void 0;
	
	        if (d) {
	
	          vPath = createVElement('path', {
	            d: d,
	            id: createPathId()
	          });
	
	          defs.append(vPath);
	        }
	
	        var vTextPath = createVElement('textPath');
	
	        // Set attributes on the `<textPath>`. The most important one
	        // is the `xlink:href` that points to our newly created `<path/>` element in `<defs/>`.
	        // Note that we also allow the following construct:
	        // `t.text('my text', {textPath: {'xlink:href': '#my-other-path'}})`.
	        // In other words, one can completely skip the auto-creation of the path
	        // and use any other arbitrary path that is in the document.
	        if (!textPathOptions['xlink:href'] && vPath) {
	          vTextPath.attr('xlink:href', '#' + vPath.node.id);
	        }
	
	        if (isTextPathObject) {
	          vTextPath.attr(textPathOptions);
	        }
	
	        this.append(vTextPath);
	
	        // Now all the `<tspan>`s will be inside the `<textPath>`.
	        textNode = vTextPath.node;
	      }
	
	      var offset = 0;
	      var lines = content.split('\n');
	      var lineHeight = options.lineHeight;
	      var annotations = options.annotations;
	
	      var includeAnnotationIndices = options.includeAnnotationIndices;
	
	      if (annotations) {
	        annotations = utils.isArray(annotations) ? annotations : [annotations];
	      }
	
	      lineHeight = lineHeight === 'auto' ? '1.5em' : lineHeight || '1em';
	
	      utils.forEach(lines, function (line, i) {
	
	        var vLine = createVElement('tspan', {
	          dy: i ? lineHeight : '0',
	          x: _this.attr('x') || 0
	        });
	
	        vLine.addClass('pane-text-line');
	
	        if (line) {
	
	          if (annotations) {
	            (function () {
	              // Get the line height based on the biggest font size
	              // in the annotations for this line.
	              var maxFontSize = 0;
	
	              // Find the *compacted* annotations for this line.
	              var lineAnnotations = vector.annotateString(line, annotations, {
	                offset: -offset,
	                includeAnnotationIndices: includeAnnotationIndices
	              });
	
	              utils.forEach(lineAnnotations, function (annotation) {
	
	                var tspan = void 0;
	
	                if (utils.isObject(annotation)) {
	
	                  var fontSize = utils.toInt(annotation.attrs['font-size']);
	                  if (fontSize && fontSize > maxFontSize) {
	                    maxFontSize = fontSize;
	                  }
	
	                  tspan = createVElement('tspan', annotation.attrs);
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
	                vLine.attr('dy', maxFontSize * 1.2 + 'px');
	              }
	            })();
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
	
	        offset += line.length + 1; // + 1 = newline character.
	      }, this);
	
	      return this;
	    }
	  }, {
	    key: 'html',
	    value: function html(content) {
	
	      this.node.innerHTML = content;
	
	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	
	      utils.removeElement(this.node);
	
	      return this;
	    }
	  }, {
	    key: 'empty',
	    value: function empty() {
	
	      utils.emptyElement(this.node);
	
	      return this;
	    }
	  }, {
	    key: 'append',
	    value: function append(elem) {
	      eachElem(elem, function (item) {
	        this.node.appendChild(normalize(item));
	      }, this);
	
	      return this;
	    }
	  }, {
	    key: 'prepend',
	    value: function prepend(elem) {
	      eachElem(elem, function (item) {
	        this.node.insertBefore(normalize(item), this.node.firstChild);
	      }, this);
	
	      return this;
	    }
	  }, {
	    key: 'before',
	    value: function before(elem) {
	      eachElem(elem, function (item) {
	        if (this.node.parentNode) {
	          this.node.parentNode.insertBefore(normalize(item), this.node);
	        }
	      }, this);
	
	      return this;
	    }
	  }, {
	    key: 'after',
	    value: function after(elem) {
	      eachElem(elem, function (item) {
	        if (this.node.parentNode) {
	          this.node.parentNode.insertBefore(normalize(item), this.node.nextSibling);
	        }
	      }, this);
	
	      return this;
	    }
	  }, {
	    key: 'appendTo',
	    value: function appendTo(elem) {
	
	      getLastVElement(elem).append(this);
	
	      return this;
	    }
	  }, {
	    key: 'prependTo',
	    value: function prependTo(elem) {
	
	      getLastVElement(elem).prepend(this);
	
	      return this;
	    }
	  }, {
	    key: 'insertBefore',
	    value: function insertBefore(elem) {
	
	      getLastVElement(elem).before(this);
	
	      return this;
	    }
	  }, {
	    key: 'insertAfter',
	    value: function insertAfter(elem) {
	
	      getLastVElement(elem).after(this);
	
	      return this;
	    }
	  }, {
	    key: 'getSVG',
	    value: function getSVG() {
	
	      return this.node instanceof window.SVGSVGElement ? this : vectorize(this.node.ownerSVGElement);
	    }
	  }, {
	    key: 'getDefs',
	    value: function getDefs() {
	
	      var svg = this.getSVG();
	      var defs = svg.node.getElementsByTagName('defs');
	
	      if (defs && defs.length) {
	        defs = vectorize(defs[0]);
	      } else {
	        defs = createVElement('defs');
	        svg.append(defs);
	      }
	
	      return defs;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	
	      var cloned = vectorize(this.node.cloneNode(true));
	
	      if (this.node.id) {
	        cloned.node.removeAttribute('id');
	      }
	
	      return cloned;
	    }
	  }, {
	    key: 'find',
	    value: function find(selector) {
	
	      return utils.map(this.node.querySelectorAll(selector), vectorize);
	    }
	  }, {
	    key: 'findOne',
	    value: function findOne(selector) {
	
	      var found = this.node.querySelector(selector);
	      return found ? vectorize(found) : null;
	    }
	  }, {
	    key: 'findParent',
	    value: function findParent(className, terminator) {
	
	      var stop = terminator || this.node.ownerSVGElement;
	      var node = this.node.parentNode;
	
	      while (node && node !== stop) {
	        var vel = vectorize(node);
	        if (vel.hasClass(className)) {
	          return vel;
	        }
	
	        node = node.parentNode;
	      }
	
	      return null;
	    }
	  }, {
	    key: 'parent',
	    value: function parent() {
	
	      var parentNode = this.node && this.node.parentNode;
	      if (parentNode) {
	        return vectorize(parentNode);
	      }
	
	      return null;
	    }
	  }, {
	    key: 'index',
	    value: function index() {
	
	      var idx = 0;
	      var node = this.node.previousSibling;
	
	      while (node) {
	        // nodeType 1 for ELEMENT_NODE
	        if (node.nodeType === 1) {
	          idx += 1;
	        }
	        node = node.previousSibling;
	      }
	
	      return idx;
	    }
	  }, {
	    key: 'translate',
	    value: function translate(tx, ty, relative) {
	
	      var raw = this.attr('transform') || '';
	      var ts = utils.parseTranslate(raw);
	
	      if (utils.isUndefined(tx)) {
	        return ts;
	      }
	
	      tx = relative ? ts.tx + tx : tx;
	      ty = relative ? ts.ty + ty : ty;
	
	      var mutant = utils.clearTranslate(raw);
	      var final = 'translate(' + tx + ',' + ty + ')';
	
	      // Note that `translate()` is always the first transformation.
	      // This is usually the desired case.
	      if (mutant) {
	        final = final + ' ' + mutant;
	      }
	
	      this.attr('transform', final);
	
	      return this;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(angle, cx, cy, relative) {
	
	      var raw = this.attr('transform') || '';
	      var rt = utils.parseRotate(raw);
	
	      if (utils.isUndefined(angle)) {
	        return rt;
	      }
	
	      angle %= 360;
	
	      var newAngle = relative ? rt.angle + angle : angle;
	      var newOrigin = utils.isUndefined(cx) || utils.isUndefined(cy) ? '' : ',' + cx + ',' + cy;
	
	      var mutant = utils.clearRotate(raw);
	      var final = 'rotate(' + newAngle + newOrigin + ')';
	
	      if (mutant) {
	        final = mutant + ' ' + final;
	      }
	
	      return this.attr('transform', final);
	    }
	  }, {
	    key: 'scale',
	    value: function scale(sx, sy, relative) {
	
	      var raw = this.attr('transform') || '';
	      var sc = utils.parseScale(raw);
	
	      if (utils.isUndefined(sx)) {
	        return sc;
	      }
	
	      if (utils.isUndefined(sy)) {
	        sy = sx;
	      }
	
	      sx = relative ? sc.sx * sx : sx;
	      sy = relative ? sc.sy * sy : sy;
	
	      var mutant = utils.clearScale(raw);
	      var final = 'scale(' + sx + ',' + sy + ')';
	
	      if (mutant) {
	        final = mutant + ' ' + final;
	      }
	
	      return this.attr('transform', final);
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(withoutTransformations, target) {
	
	      // Get SVGRect that contains coordinates and dimension of the real
	      // bounding box, i.e. after transformations are applied.
	      // If `target` is specified, bounding box will be computed
	      // relatively to `target` element.
	
	      // If the element is not in the live DOM, it does not have a bounding
	      // box defined and so fall back to 'zero' dimension element.
	      if (!this.node.ownerSVGElement) {
	        return new _Rect2.default(0, 0, 0, 0);
	      }
	
	      var box = void 0;
	      try {
	        box = this.node.getBBox();
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
	          x: this.node.clientLeft,
	          y: this.node.clientTop,
	          width: this.node.clientWidth,
	          height: this.node.clientHeight
	        };
	      }
	
	      if (!withoutTransformations) {
	
	        var matrix = this.getTransformToElement(target || this.node.ownerSVGElement);
	
	        box = vector.transformRect(box, matrix);
	      }
	
	      return _Rect2.default.fromRect(box);
	    }
	  }, {
	    key: 'toLocalPoint',
	    value: function toLocalPoint(x, y) {
	
	      // Convert global point into the coordinate space of this element.
	      var svg = this.getSVG().node;
	      var point = svg.createSVGPoint();
	
	      point.x = x;
	      point.y = y;
	
	      try {
	        // ref: https://msdn.microsoft.com/zh-cn/library/hh535760(v=vs.85).aspx
	        var globalPoint = point.matrixTransform(svg.getScreenCTM().inverse());
	        var globalToLocalMatrix = this.getTransformToElement(svg).inverse();
	        return globalPoint.matrixTransform(globalToLocalMatrix);
	      } catch (e) {
	        // IE9 throws an exception in odd cases.
	        // (`Unexpected call to method or property access`)
	        // We have to make do with the original coordianates.
	        return point;
	      }
	    }
	  }, {
	    key: 'getTransformToElement',
	    value: function getTransformToElement(toElem) {
	
	      return utils.getTransformToElement(this.node, toElem);
	    }
	  }, {
	    key: 'translateCenterToPoint',
	    value: function translateCenterToPoint(point) {
	
	      var bbox = this.getBBox();
	      var center = bbox.getCenter();
	
	      this.translate(point.x - center.x, point.y - center.y);
	
	      return this;
	    }
	  }, {
	    key: 'translateAndAutoOrient',
	    value: function translateAndAutoOrient(position, reference, target) {
	
	      // Efficiently auto-orient an element.
	      // This basically implements the orient=auto attribute of markers.
	      // The easiest way of understanding on what this does is to imagine
	      // the element is an arrowhead. Calling this method on the arrowhead
	      // makes it point to the `position` point while being auto-oriented
	      // (properly rotated) towards the `reference` point. `target` is the
	      // element relative to which the transformations are applied. Usually
	      // a viewport.
	
	      // Clean-up previously set transformations except the scale. If we
	      // didn't clean up the previous transformations then they'd add up
	      // with the old ones. Scale is an exception as it doesn't add up,
	      // consider: `this.scale(2).scale(2).scale(2)`. The result is that the
	      // element is scaled by the factor 2, not 8.
	
	      var scale = this.scale();
	      this.attr('transform', '');
	      this.scale(scale.sx, scale.sy);
	
	      var svg = this.getSVG().node;
	      var bbox = this.getBBox(false, target);
	
	      // 1. Translate to origin.
	      var translateToOrigin = svg.createSVGTransform();
	      translateToOrigin.setTranslate(-bbox.x - bbox.width / 2, -bbox.y - bbox.height / 2);
	
	      // 2. Rotate around origin.
	      var rotateAroundOrigin = svg.createSVGTransform();
	
	      var angle = _Point2.default.fromPoint(position).changeInAngle(position.x - reference.x, position.y - reference.y, reference);
	      rotateAroundOrigin.setRotate(angle, 0, 0);
	
	      // 3. Translate to the `position` + the offset (half my width) towards the `reference` point.
	      var transformFinal = svg.createSVGTransform();
	      var finalPosition = _Point2.default.fromPoint(position).move(reference, bbox.width / 2);
	
	      var tx = position.x + (position.x - finalPosition.x);
	      var ty = position.y + (position.y - finalPosition.y);
	
	      transformFinal.setTranslate(tx, ty);
	
	      // 4. Apply transformations.
	      var matrix = this.getTransformToElement(target);
	      var transform = svg.createSVGTransform();
	      transform.setMatrix(transformFinal.matrix.multiply(rotateAroundOrigin.matrix.multiply(translateToOrigin.matrix.multiply(matrix))));
	
	      // Instead of directly setting the `matrix()` transform on the element,
	      // first, decompose the matrix into separate transforms. This allows us
	      // to use normal vector's methods as they don't work on matrices.
	      // An example of this is to retrieve a scale of an element.
	
	      var decomposition = decomposeMatrix(transform.matrix);
	
	      tx = utils.toFixed(decomposition.translateX, 2);
	      ty = utils.toFixed(decomposition.translateY, 2);
	      this.translate(tx, ty);
	      this.rotate(utils.toFixed(decomposition.rotation, 2));
	      // Note that scale has been already applied
	      // this.scale(decomposition.scaleX, decomposition.scaleY);
	
	      return this;
	    }
	  }, {
	    key: 'animateAlongPath',
	    value: function animateAlongPath() {}
	  }, {
	    key: 'sample',
	    value: function sample(interval) {
	
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
	
	      var length = this.node.getTotalLength();
	      var distance = 0;
	      var samples = [];
	
	      while (distance < length) {
	
	        var sample = this.node.getPointAtLength(distance);
	
	        samples.push({
	          distance: distance,
	          x: sample.x,
	          y: sample.y
	        });
	
	        distance += interval;
	      }
	
	      return samples;
	    }
	  }, {
	    key: 'toPath',
	    value: function toPath() {
	
	      var path = vectorize(utils.createSvgElement('path'));
	      var d = this.toPathData();
	
	      path.attr(this.attr());
	
	      d && path.attr('d', d);
	
	      return path;
	    }
	  }, {
	    key: 'toPathData',
	    value: function toPathData() {
	
	      var tagName = this.node.tagName.toLowerCase();
	      if (tagName === 'path') {
	        return this.attr('d');
	      }
	
	      var method = utils[tagName + 'ToPathData'];
	      if (utils.isFunction(method)) {
	        return method(this.node);
	      }
	
	      throw new Error(tagName + ' cannot be converted to PATH.');
	    }
	  }, {
	    key: 'findIntersection',
	    value: function findIntersection(ref, target) {
	
	      // Find the intersection of a line starting in the center of the `node`
	      // ending in the point `ref`. `target` is an SVG element to which
	      // node's transformations are relative to. Note that `ref` point must
	      // be in  the coordinate system of the `target` for this function to
	      // work  properly. Returns a point in the `target` coordinate system
	      // (the same system as `ref` is in) if an intersection is found.
	      // Returns `undefined` otherwise.
	
	      var that = this;
	      var svg = that.getSVG().node;
	
	      target = target || svg;
	
	      var bbox = _Rect2.default.fromRect(that.getBBox(false, target));
	      var center = bbox.getCenter();
	      var spot = bbox.intersectionWithLineFromCenterToPoint(ref);
	
	      if (!spot) {
	        return undefined;
	      }
	
	      var tagName = that.node.localName.toUpperCase();
	
	      // Little speed up optimalization for `<rect>` element. We do not do conversion
	      // to path element and sampling but directly calculate the intersection through
	      // a transformed geometrical rectangle.
	      if (tagName === 'RECT') {
	
	        var gRect = new _Rect2.default(parseFloat(this.attr('x') || 0), parseFloat(this.attr('y') || 0), parseFloat(this.attr('width')), parseFloat(this.attr('height')));
	        // Get the rect transformation matrix with regards to the SVG document.
	        var rectMatrix = that.getTransformToElement(target);
	        // Decompose the matrix to find the rotation angle.
	        var rectMatrixComponents = vector.decomposeMatrix(rectMatrix);
	        // Now we want to rotate the rectangle back so that we
	        // can use `intersectionWithLineFromCenterToPoint()` passing the angle as the second argument.
	        var resetRotation = svg.createSVGTransform();
	        resetRotation.setRotate(-rectMatrixComponents.rotation, center.x, center.y);
	        var rect = vector.transformRect(gRect, resetRotation.matrix.multiply(rectMatrix));
	
	        spot = _Rect2.default.fromRect(rect).intersectionWithLineFromCenterToPoint(ref, rectMatrixComponents.rotation);
	      } else if (tagName === 'PATH' || tagName === 'POLYGON' || tagName === 'POLYLINE' || tagName === 'CIRCLE' || tagName === 'ELLIPSE') {
	
	        var pathNode = tagName === 'PATH' ? that : that.toPath();
	        var samples = pathNode.sample();
	        var minDistance = Infinity;
	        var closestSamples = [];
	
	        for (var i = 0, len = samples.length; i < len; i + 1) {
	
	          var sample = samples[i];
	          // Convert the sample point in the local coordinate system to the global coordinate system.
	          var gp = vector.createSVGPoint(sample.x, sample.y);
	          gp = gp.matrixTransform(that.getTransformToElement(target));
	          sample = _Point2.default.fromPoint(gp);
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
	  }]);
	
	  return VElement;
	}();
	
	function getLastVElement(elem) {
	
	  var vel = vector.isVElement(elem) ? elem : createVElement(elem);
	
	  return utils.isArray(vel) ? vel[vel.length - 1] : vel;
	}
	
	function eachElem(elem, iterator, context) {
	
	  if (elem) {
	    var vel = utils.map(utils.isArray(elem) ? elem : [elem], function (item) {
	      if (vector.isVElement(item)) {
	        return item;
	      }
	      return createVElement(elem);
	    });
	
	    utils.forEach(vel, iterator, context);
	  }
	}
	
	function vectorize(node) {
	  return new VElement(node);
	}
	
	function normalize(elem) {
	  return elem instanceof VElement ? elem.node : elem;
	}
	
	function createVElement(elem, attrs, children) {
	
	  if (!elem) {
	    return null;
	  }
	
	  if (elem instanceof VElement) {
	    elem = elem.node;
	  }
	
	  if (utils.isString(elem)) {
	
	    elem = utils.trim(elem);
	
	    if (elem.toLowerCase() === 'svg') {
	      // create a new SVG canvas
	      elem = utils.createSvgDocument();
	    } else if (elem[0] === '<') {
	
	      // Create element from an SVG string.
	      var svgDoc = utils.createSvgDocument(elem);
	      if (svgDoc.childNodes.length > 1) {
	        return utils.map(svgDoc.childNodes, function (childNode) {
	          return vectorize(document.importNode(childNode, true));
	        });
	      }
	
	      elem = document.importNode(svgDoc.firstChild, true);
	    } else {
	      // create svg node by tagName.
	      elem = utils.createSvgElement(elem);
	    }
	  }
	
	  var vel = vectorize(elem);
	
	  // set attributes.
	  attrs && vel.setAttrs(attrs);
	
	  // append children.
	  children && vel.append(children);
	
	  return vel;
	}
	
	// vector
	// ------
	
	var vector = VElement.create = createVElement;
	var svgDocument = createVElement('svg').node;
	
	utils.extend(vector, {
	  isVElement: function isVElement(obj) {
	
	    return obj instanceof VElement;
	  },
	  createSVGPoint: function createSVGPoint(x, y) {
	
	    var point = svgDocument.createSVGPoint();
	
	    point.x = x;
	    point.y = y;
	
	    return point;
	  },
	  createSVGMatrix: function createSVGMatrix(matrix) {
	
	    var svgMatrix = svgDocument.createSVGMatrix();
	
	    /* eslint guard-for-in: 0 */
	    for (var key in matrix) {
	      svgMatrix[key] = matrix[key];
	    }
	
	    return svgMatrix;
	  },
	  createSVGTransform: function createSVGTransform(matrix) {
	
	    if (!utils.isUndefined(matrix)) {
	
	      if (!(matrix instanceof SVGMatrix)) {
	        matrix = vector.createSVGMatrix(matrix);
	      }
	      return svgDocument.createSVGTransformFromMatrix(matrix);
	    }
	
	    return svgDocument.createSVGTransform();
	  },
	  transformRect: function transformRect(rect, matrix) {
	
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
	
	    return {
	      x: minX,
	      y: minY,
	      width: maxX - minX,
	      height: maxY - minY
	    };
	  },
	  annotations: function annotations(t, _annotations, options) {
	
	    _annotations = _annotations || [];
	    _annotations = utils.isArray(_annotations) ? _annotations : [_annotations];
	    options = options || {};
	
	    var compacted = [];
	    var ret = [];
	    var offset = options.offset || 0;
	    var batch = void 0;
	    var item = void 0;
	    var prev = void 0;
	
	    for (var i = 0, l = t.length; i < l; i += 1) {
	
	      item = ret[i] = t[i];
	
	      for (var j = 0, k = _annotations.length; j < k; j += 1) {
	
	        var annotation = _annotations[j];
	        var start = annotation.start + offset;
	        var end = annotation.end + offset;
	
	        if (i >= start && i < end) {
	          // Annotation applies.
	          if (utils.isObject(item)) {
	            // There is more than one annotation to be applied => Merge attributes.
	            item.attrs = utils.merge({}, item.attrs, annotation.attrs);
	          } else {
	            item = ret[i] = {
	              t: t[i],
	              attrs: annotation.attrs
	            };
	          }
	          if (options.includeAnnotationIndices) {
	
	            if (!item.annotations) {
	              item.annotations = [];
	            }
	
	            item.annotations.push(j);
	          }
	        }
	      }
	
	      prev = ret[i - 1];
	
	      if (!prev) {
	
	        batch = item;
	      } else if (utils.isObject(item) && utils.isObject(prev)) {
	        // Both previous item and the current one are annotations. If the attributes
	        // didn't change, merge the text.
	        if (JSON.stringify(item.attrs) === JSON.stringify(prev.attrs)) {
	          batch.t += item.t;
	        } else {
	          compacted.push(batch);
	          batch = item;
	        }
	      } else if (utils.isObject(item)) {
	        // Previous item was a string, current item is an annotation.
	        compacted.push(batch);
	        batch = item;
	      } else if (utils.isObject(prev)) {
	        // Previous item was an annotation, current item is a string.
	        compacted.push(batch);
	        batch = item;
	      } else {
	        // Both previous and current item are strings.
	        batch = (batch || '') + item;
	      }
	    }
	
	    if (batch) {
	      compacted.push(batch);
	    }
	
	    return compacted;
	  }
	});
	
	// exports
	// -------
	
	exports.default = vector;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ellipse = function () {
	  function Ellipse() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var a = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var b = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	    _classCallCheck(this, Ellipse);
	
	    this.x = x;
	    this.y = y;
	    this.a = a;
	    this.b = b;
	  }
	
	  // statics
	  // -------
	
	  _createClass(Ellipse, [{
	    key: 'getCenter',
	
	
	    // methods
	    // -------
	
	    value: function getCenter() {
	
	      return new _Point2.default(this.x, this.y);
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox() {
	
	      return new _Rect2.default(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
	    }
	  }, {
	    key: 'grow',
	    value: function grow(amount) {
	
	      this.a += amount;
	      this.b += amount;
	
	      return this;
	    }
	  }, {
	    key: 'intersectionWithLineFromCenterToPoint',
	    value: function intersectionWithLineFromCenterToPoint(point, angle) {
	
	      // Find point on me where line from my center to `point` intersects with
	      // my boundary.
	      // If angle is specified, intersection with rotated ellipse is computed.
	
	      var result = void 0;
	      var center = this.getCenter();
	
	      if (angle) {
	        point.rotate(center, angle);
	      }
	
	      var dx = point.x - this.x;
	      var dy = point.y - this.y;
	      if (dx === 0) {
	
	        result = this.getBBox().getNearestPointToPoint(point);
	
	        if (angle) {
	          return result.rotate(center, -angle);
	        }
	
	        return result;
	      }
	
	      var m = dy / dx;
	      var mm = m * m;
	      var aa = this.a * this.a;
	      var bb = this.b * this.b;
	      var x = Math.sqrt(1 / (1 / aa + mm / bb));
	
	      x = dx < 0 ? -x : x;
	
	      var y = m * x;
	
	      result = new _Point2.default(this.x + x, this.y + y);
	
	      if (angle) {
	        return result.rotate(center, -angle);
	      }
	
	      return result;
	    }
	
	    // common
	    // ------
	
	  }, {
	    key: 'equals',
	    value: function equals(ellipse) {
	
	      return Ellipse.equals(this, ellipse);
	    }
	  }, {
	    key: 'valueOf',
	    value: function valueOf() {
	
	      return [this.x, this.y, this.a, this.b];
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	
	      return this.valueOf().join(', ');
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	
	      return Ellipse.fromEllipse(this);
	    }
	  }], [{
	    key: 'equals',
	    value: function equals(e1, e2) {
	
	      return this.isEllipse(e1) && this.isEllipse(e2) && e1.x === e2.x && e1.y === e2.y && e1.a === e2.a && e1.b === e2.b;
	    }
	  }, {
	    key: 'fromEllipse',
	    value: function fromEllipse(e) {
	
	      return new Ellipse(e.x, e.y, e.a, e.b);
	    }
	  }, {
	    key: 'isEllipse',
	    value: function isEllipse(e) {
	
	      return e && e instanceof Ellipse;
	    }
	  }]);
	
	  return Ellipse;
	}();
	
	// exports
	// -------
	
	exports.default = Ellipse;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _VectorView2 = __webpack_require__(30);
	
	var _VectorView3 = _interopRequireDefault(_VectorView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NodeView = function (_VectorView) {
	  _inherits(NodeView, _VectorView);
	
	  function NodeView() {
	    _classCallCheck(this, NodeView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NodeView).apply(this, arguments));
	  }
	
	  _createClass(NodeView, [{
	    key: 'render',
	
	    // 'port'
	    value: function render() {
	
	      this.vel.empty();
	      this.renderMarkup();
	
	      this.scalableNode = this.findOne('.pane-scalable');
	      this.rotatableNode = this.findOne('.pane-rotatable');
	
	      return this.update().resize().rotate().translate();
	    }
	  }, {
	    key: 'update',
	    value: function update(specifiedAttrs) {
	      var _this2 = this;
	
	      // process the `attrs` object and set attributes
	      // on sub elements based on the selectors.
	
	      var allAttrs = this.cell.attrs;
	      var rotatable = this.rotatableNode;
	      var rotation = void 0;
	
	      if (rotatable) {
	        rotation = rotatable.attr('transform');
	        rotatable.attr('transform', '');
	      }
	
	      var nodesMap = {};
	      var relatives = [];
	
	      utils.forIn(specifiedAttrs || allAttrs, function (attrs, selector) {
	
	        var vels = _this2.find(selector);
	        if (!vels.length) {
	          return;
	        }
	
	        nodesMap[selector] = vels;
	
	        var specials = NodeView.specialAttributes.slice();
	
	        // filter
	        if (utils.isObject(attrs.filter)) {
	          specials.push('filter');
	          _this2.applyFilter(vels, attrs.filter);
	        }
	
	        // gradient
	        if (utils.isObject(attrs.fill)) {
	          specials.push('fill');
	          _this2.applyGradient(vels, 'fill', attrs.fill);
	        }
	
	        // gradient
	        if (utils.isObject(attrs.stroke)) {
	          specials.push('stroke');
	          _this2.applyGradient(vels, 'stroke', attrs.stroke);
	        }
	
	        // text
	        if (!utils.isNil(attrs.text)) {
	          specials.push('lineHeight', 'textPath', 'annotations');
	          utils.forEach(vels, function (vel) {
	            vel.text(attrs.text, {
	              textPath: attrs.textPath,
	              lineHeight: attrs.lineHeight,
	              annotations: attrs.annotations
	            });
	          });
	        }
	
	        var normal = {};
	
	        utils.forIn(attrs, function (value, key) {
	          if (!utils.contains(specials, key)) {
	            normal[key] = value;
	          }
	        });
	
	        if (!utils.isEmptyObject(normal)) {
	          // set regular attributes
	          utils.forEach(vels, function (vel) {
	            vel.attr(normal);
	          });
	        }
	
	        // `port` attribute contains the `id` of the port
	        // that the underlying magnet represents.
	        // if (attrs.port) {
	        //    forEach(vels, function (vel) {
	        //        vel.attr('port', isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
	        //    });
	        // }
	
	        // TODO: vel.css()
	
	        // if (attrs.style) {
	        //    forEach(vels, function (vel) {
	        //        vel.css(attrs.style);
	        //    });
	        // }
	
	        // html
	        if (!utils.isNil(attrs.html)) {
	          utils.forEach(vels, function (vel) {
	            vel.node.innerHTML = attrs.html;
	          });
	        }
	
	        // Special `ref-x` and `ref-y` attributes make it possible to
	        // set both absolute or relative positioning of sub elements.
	        var isRelative = utils.some(['ref-x', 'ref-y', 'ref-dx', 'ref-dy', 'x-alignment', 'y-alignment', 'ref-width', 'ref-height'], function (key) {
	          return !utils.isNil(attrs[key]);
	        });
	
	        if (isRelative) {
	          relatives.push(selector);
	        }
	      });
	
	      // Note that we're using the bounding box without transformation
	      // because we are already inside a transformed coordinate system.
	      var size = this.cell.size;
	      var bbox = {
	        x: 0,
	        y: 0,
	        width: size.width,
	        height: size.height
	      };
	
	      utils.forEach(relatives, function (selector) {
	
	        var attrs = allAttrs[selector];
	        var specified = specifiedAttrs && specifiedAttrs[selector];
	        if (specified) {
	          attrs = utils.merge({}, attrs, specified);
	        }
	
	        utils.forEach(nodesMap[selector], function (vel) {
	          _this2.positionRelative(vel, bbox, attrs, nodesMap);
	        });
	      });
	
	      if (rotatable) {
	        rotatable.attr('transform', rotation || '');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'positionRelative',
	    value: function positionRelative(vel, bbox, attrs, nodeMapping) {
	
	      var ref = attrs.ref;
	
	      // `ref` is the selector of the reference element.
	      // If no `ref` specified, reference element is the root element.
	      if (ref) {
	
	        var refVel = nodeMapping && nodeMapping[ref];
	        if (refVel) {
	          refVel = refVel[0];
	        } else {
	          refVel = ref === '.' ? this.vel : this.vel.findOne(ref);
	        }
	
	        if (!refVel) {
	          throw new Error('NodeView: reference does not exists.');
	        }
	
	        // Get the bounding box of the reference element
	        // relative to the root `<g>` element.
	        bbox = refVel.getBBox(false, this.elem);
	      }
	
	      var refDx = utils.toFloat(attrs['ref-dx']);
	      var refDy = utils.toFloat(attrs['ref-dy']);
	
	      var yAlign = attrs['y-alignment'];
	      var xAlign = attrs['x-alignment'];
	
	      // 'ref-y', 'ref-x', 'ref-width', 'ref-height' can be
	      // defined by value or by percentage e.g 4, 0.5, '200%'.
	
	      var refX = attrs['ref-x'];
	      var xPercentage = utils.isPercentage(refX);
	      refX = utils.toFloat(refX, xPercentage);
	
	      var refY = attrs['ref-y'];
	      var yPercentage = utils.isPercentage(refY);
	      refY = utils.toFloat(refY, yPercentage);
	
	      var refWidth = attrs['ref-width'];
	      var wPercentage = utils.isPercentage(refWidth);
	      refWidth = utils.toFloat(refWidth, wPercentage);
	
	      var refHeight = attrs['ref-height'];
	      var hPercentage = utils.isPercentage(refHeight);
	      refHeight = utils.toFloat(refHeight, hPercentage);
	
	      // `ref-width` and `ref-height` defines the width and height
	      // of the sub element relatively to the reference element size.
	      if (utils.isFinite(refWidth)) {
	        if (wPercentage || refWidth >= 0 && refWidth <= 1) {
	          vel.attr('width', utils.toFixed(refWidth * bbox.width, 2));
	        } else {
	          vel.attr('width', Math.max(utils.toFixed(refWidth + bbox.width, 2), 0));
	        }
	      }
	
	      if (utils.isFinite(refHeight)) {
	        if (hPercentage || refHeight >= 0 && refHeight <= 1) {
	          vel.attr('height', utils.toFixed(refHeight * bbox.height, 2));
	        } else {
	          vel.attr('height', Math.max(utils.toFixed(refHeight + bbox.height, 2), 0));
	        }
	      }
	
	      // Check if the node is a descendant of the scalable group.
	      var scalableNode = vel.findParent('pane-scalable', this.elem);
	
	      // Remove the previous translate() from the transform attribute
	      // and translate the element relative to the bounding box following
	      // the `ref-x` and `ref-y` attributes.
	      var transformAttr = vel.attr('transform');
	      if (transformAttr) {
	        vel.attr('transform', utils.clearTranslate(transformAttr));
	      }
	
	      // The final translation of the sub element.
	      var tx = 0;
	      var ty = 0;
	      var scale = void 0;
	
	      // `ref-dx` and `ref-dy` define the offset of the sub element relative
	      // to the right and/or bottom coordinate of the reference element.
	      if (utils.isFinite(refDx)) {
	        if (scalableNode) {
	          scale = scalableNode.scale();
	          tx = bbox.x + bbox.width + refDx / scale.sx;
	        } else {
	          tx = bbox.x + bbox.width + refDx;
	        }
	      }
	
	      if (utils.isFinite(refDy)) {
	        if (scalableNode) {
	          scale = scale || scalableNode.scale();
	          ty = bbox.y + bbox.height + refDy / scale.sy;
	        } else {
	          ty = bbox.y + bbox.height + refDy;
	        }
	      }
	
	      if (utils.isFinite(refX)) {
	        if (xPercentage || refX > 0 && refX < 1) {
	          tx = bbox.x + bbox.width * refX;
	        } else if (scalableNode) {
	          scale = scale || scalableNode.scale();
	          tx = bbox.x + refX / scale.sx;
	        } else {
	          tx = bbox.x + refX;
	        }
	      }
	
	      if (utils.isFinite(refY)) {
	        if (xPercentage || refY > 0 && refY < 1) {
	          ty = bbox.y + bbox.height * refY;
	        } else if (scalableNode) {
	          scale = scale || scalableNode.scale();
	          ty = bbox.y + refY / scale.sy;
	        } else {
	          ty = bbox.y + refY;
	        }
	      }
	
	      if (!utils.isNil(yAlign) || !utils.isNil(xAlign)) {
	
	        var velBBox = vel.getBBox(false, this.getPane());
	
	        if (yAlign === 'middle') {
	          ty -= velBBox.height / 2;
	        } else if (utils.isFinite(yAlign)) {
	          ty += yAlign > -1 && yAlign < 1 ? velBBox.height * yAlign : yAlign;
	        }
	
	        if (xAlign === 'middle') {
	          tx -= velBBox.width / 2;
	        } else if (utils.isFinite(xAlign)) {
	          tx += xAlign > -1 && xAlign < 1 ? velBBox.width * xAlign : xAlign;
	        }
	      }
	
	      vel.translate(utils.toFixed(tx, 2), utils.toFixed(ty, 2));
	
	      return this;
	    }
	  }, {
	    key: 'scale',
	    value: function scale(sx, sy) {
	      // Scale the whole `<g>` group.
	
	      this.vel.scale(sx, sy);
	
	      return this;
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	
	      if (!this.scalableNode) {
	        return this;
	      }
	
	      // get bbox without transform
	      var nativeBBox = this.scalableNode.getBBox(true);
	
	      // Make sure `scalableBBox.width` and `scalableBBox.height` are not
	      // zero which can happen if the element does not have any content.
	      // By making the width(height) 1, we prevent HTML errors of the type
	      // `scale(Infinity, Infinity)`.
	      var size = this.cell.getSize();
	
	      var sx = size.width / (nativeBBox.width || 1);
	      var sy = size.height / (nativeBBox.height || 1);
	
	      sx = utils.toFixed(sx, 2);
	      sy = utils.toFixed(sy, 2);
	
	      this.scalableNode.attr('transform', 'scale(' + sx + ',' + sy + ')');
	
	      // Update must always be called on non-rotated element. Otherwise,
	      // relative positioning would work with wrong (rotated) bounding boxes.
	      this.update();
	
	      return this;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	
	      if (this.rotatableNode) {
	
	        var size = this.cell.getSize();
	        var ox = size.width / 2;
	        var oy = size.height / 2;
	
	        this.rotatableNode.attr('transform', 'rotate(' + this.cell.getRotation() + ',' + ox + ',' + oy + ')');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'translate',
	    value: function translate() {
	
	      var position = this.cell.getPosition();
	      this.vel.attr('transform', 'translate(' + position.x + ',' + position.y + ')');
	
	      return this;
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox() {
	
	      return this.vel.getBBox();
	    }
	  }, {
	    key: 'getStrokeWidth',
	    value: function getStrokeWidth() {
	
	      var vTarget = this.findOne('rect') || this.findOne('path') || this.findOne('circle') || this.findOne('ellipse') || this.findOne('polyline') || this.findOne('polygon');
	
	      if (vTarget && vTarget.node) {
	
	        var strokeWidth = utils.getComputedStyle(vTarget.node, 'stroke-width');
	
	        return strokeWidth && utils.toFloat(strokeWidth) || 0;
	      }
	
	      return 0;
	    }
	  }, {
	    key: 'getStrokedBBox',
	    value: function getStrokedBBox() {
	
	      var sw = this.getStrokeWidth() - 1;
	      var bbox = this.getCell().getBBox();
	
	      return sw ? bbox.grow(sw / 2) : bbox;
	    }
	  }, {
	    key: 'getConnectionPointOnBorder',
	    value: function getConnectionPointOnBorder() {
	
	      return null;
	    }
	  }], [{
	    key: 'specialAttributes',
	    get: function get() {
	
	      return ['text', 'html', 'style', 'ref', 'ref-x', 'ref-y', 'ref-dx', 'ref-dy', 'ref-width', 'ref-height', 'x-alignment', 'y-alignment'];
	    }
	  }]);
	
	  return NodeView;
	}(_VectorView3.default);
	
	// exports
	// -------
	
	exports.default = NodeView;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _filters = __webpack_require__(31);
	
	var _filters2 = _interopRequireDefault(_filters);
	
	var _CellView2 = __webpack_require__(32);
	
	var _CellView3 = _interopRequireDefault(_CellView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VectorView = function (_CellView) {
	  _inherits(VectorView, _CellView);
	
	  function VectorView() {
	    _classCallCheck(this, VectorView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VectorView).apply(this, arguments));
	  }
	
	  _createClass(VectorView, [{
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      this.vel = (0, _vector2.default)(this.cell.getTagName(), {
	        class: this.cell.getClassName()
	      });
	
	      this.elem = this.vel.node;
	
	      // attach cell's id to elem
	      this.elem.cellId = this.cell.id;
	
	      var pane = this.getPane();
	      if (pane) {
	        pane.appendChild(this.elem);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'renderMarkup',
	    value: function renderMarkup() {
	
	      // `markup` is rendered by default. Set the `markup` on model
	      // if the default markup is not desirable.
	
	      var markup = this.compileMarkup(this.cell.getMarkup(), this.cell.getRenderData());
	      if (markup) {
	        this.vel.append((0, _vector2.default)(markup));
	      } else {
	        throw new Error('`markup` is missing while the default `render()` implementation is used.');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'find',
	    value: function find(selector) {
	
	      return selector === '.' ? [this.vel] : this.vel.find(selector);
	    }
	  }, {
	    key: 'findOne',
	    value: function findOne(selector) {
	
	      return selector === '.' ? this.vel : this.vel.findOne(selector);
	    }
	  }, {
	    key: 'applyAttr',
	    value: function applyAttr(selector, attrs) {
	
	      if (attrs) {
	        utils.forEach(this.find(selector), function (vel) {
	          vel.attr(attrs);
	        });
	      }
	
	      return this;
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(selector, filter) {
	
	      // `selector` is a CSS selector or `'.'`.
	      // `filter` must be in the special filter format:
	      //   {
	      //      name: <name of the filter>,
	      //      args: { <arguments>, ... }
	      //   }
	      //
	      // example:
	      //   {
	      //      name: 'blur',
	      //      args: {
	      //        radius: 5
	      //      }
	      //   }
	
	      if (!filter) {
	        return this;
	      }
	
	      var name = filter.name || '';
	      var args = filter.args || {};
	      var attrs = filter.attrs;
	      var render = _filters2.default[name];
	
	      if (!name || !render) {
	        throw new Error('Invalided filter: "' + name + '"');
	      }
	
	      var vels = utils.isString(selector) ? this.find(selector) : selector;
	      if (!vels.length) {
	        return this;
	      }
	
	      var svg = this.paper.svg;
	      var hash = utils.hashCode(JSON.stringify(filter));
	      var id = name + '-' + this.paper.id + '-' + hash;
	
	      // define filter
	      if (!svg.getElementById(id)) {
	
	        var vFilter = (0, _vector2.default)(render(args));
	        // Set the filter area to be 3x the bounding box of the cell
	        // and center the filter around the cell.
	        vFilter.attr({
	          filterUnits: 'objectBoundingBox',
	          x: -1,
	          y: -1,
	          width: 3,
	          height: 3
	        });
	
	        if (attrs) {
	          vFilter.attr(attrs);
	        }
	
	        vFilter.node.id = id;
	
	        (0, _vector2.default)(svg).getDefs().append(vFilter);
	      }
	
	      // apply filter
	      utils.forEach(vels, function (vel) {
	        vel.attr('filter', 'url(#' + id + ')');
	      });
	
	      return this;
	    }
	  }, {
	    key: 'applyGradient',
	    value: function applyGradient(selector, attrName, gradient) {
	
	      // `selector` is a CSS selector or `'.'`.
	      // `attrName` is either a `'fill'` or `'stroke'`.
	      // `gradient` must be in the special gradient format:
	      //   {
	      //     type: <linearGradient|radialGradient>,
	      //     stops: [ { offset: <offset>, color: <color> }, ... ]
	      //   }
	      //
	      // example:
	      //   {
	      //     type: 'linearGradient',
	      //     stops: [
	      //       {
	      //          offset: '10%',
	      //          color: 'green'
	      //       }, {
	      //          offset: '50%',
	      //          color: 'blue'
	      //       }
	      //     ]
	      //   }
	
	      if (!attrName || !gradient) {
	        return this;
	      }
	
	      var type = gradient.type;
	      var stops = gradient.stops;
	      var attrs = gradient.attrs;
	
	      if (!type || !stops || !stops.length) {
	        return this;
	      }
	
	      var vels = utils.isString(selector) ? this.find(selector) : selector;
	      if (!vels.length) {
	        return this;
	      }
	
	      var svg = this.paper.svg;
	      var id = type + '-' + this.paper.id + '-' + utils.hashCode(JSON.stringify(gradient));
	
	      // define gradient
	      if (!svg.getElementById(id)) {
	
	        var gradientStr = ['<' + type + '>', utils.map(stops, function (stop) {
	          return '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + (utils.isFinite(stop.opacity) ? stop.opacity : 1) + '" />';
	        }).join(''), '</' + type + '>'].join('');
	
	        var vGradient = (0, _vector2.default)(gradientStr);
	
	        if (attrs) {
	          vGradient.attr(attrs);
	        }
	
	        vGradient.node.id = id;
	        (0, _vector2.default)(svg).getDefs().append(vGradient);
	      }
	
	      // apply gradient
	      utils.forEach(vels, function (vel) {
	        vel.attr(attrName, 'url(#' + id + ')');
	      });
	
	      return this;
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds(elem) {
	
	      // fix `utils.getBounds` of elements in foreignObject.
	      if (elem) {
	
	        var doc = elem === document ? elem : elem.ownerDocument;
	
	        // get the bounds of the cell
	        var bounds = utils.getBounds(this.elem);
	        // get the offset relative to the cell's root element
	        var offset = utils.getOffsetUntil(elem, this.elem);
	
	        var paper = this.getPaper();
	        var scale = paper && paper.sx || 1;
	
	        // calc the bounds
	        var width = (elem.offsetWidth || elem.clientWidth) * scale;
	        var height = (elem.offsetHeight || elem.clientHeight) * scale;
	        var left = bounds.left + offset.left * scale;
	        var top = bounds.top + offset.top * scale;
	        var right = doc.body.clientWidth - width - left;
	        var bottom = doc.body.clientHeight - height - top;
	
	        return {
	          left: left,
	          top: top,
	          right: right,
	          bottom: bottom,
	          width: width,
	          height: height
	        };
	      }
	
	      return null;
	    }
	  }]);
	
	  return VectorView;
	}(_CellView3.default);
	
	// exports
	// -------
	
	exports.default = VectorView;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(5);
	
	// exports
	// -------
	
	exports.default = {
	  outline: function outline() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `color`   ... outline color
	    // `width`   ... outline width
	    // `opacity` ... outline opacity
	    // `margin`  ... gap between outline and the element
	
	    var color = args.color || 'blue';
	    var width = (0, _utils.isFinite)(args.width) ? args.width : 1;
	    var margin = (0, _utils.isFinite)(args.margin) ? args.margin : 2;
	    var opacity = (0, _utils.isFinite)(args.opacity) ? args.opacity : 1;
	
	    var innerRadius = margin;
	    var outerRadius = margin + width;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feFlood flood-color="' + color + '" flood-opacity="' + opacity + '" result="colored"/>\n        <feMorphology in="SourceAlpha" result="morphedOuter" operator="dilate" radius="' + outerRadius + '" />\n        <feMorphology in="SourceAlpha" result="morphedInner" operator="dilate" radius="' + innerRadius + '" />\n        <feComposite result="morphedOuterColored" in="colored" in2="morphedOuter" operator="in"/>\n        <feComposite operator="xor" in="morphedOuterColored" in2="morphedInner" result="outline"/>\n        <feMerge>\n          <feMergeNode in="outline"/>\n          <feMergeNode in="SourceGraphic"/>\n        </feMerge>\n      </filter>\n    ');
	  },
	  highlight: function highlight() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `color`   ... color
	    // `blur`    ... blur
	    // `width`   ... width
	    // `opacity` ... opacity
	
	    var color = args.color || 'red';
	    var blur = (0, _utils.isFinite)(args.blur) ? args.blur : 0;
	    var width = (0, _utils.isFinite)(args.width) ? args.width : 1;
	    var opacity = (0, _utils.isFinite)(args.opacity) ? args.opacity : 1;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feFlood flood-color="' + color + '" flood-opacity="' + opacity + '" result="colored"/>\n        <feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="' + width + '"/>\n        <feComposite result="composed" in="colored" in2="morphed" operator="in"/>\n        <feGaussianBlur result="blured" in="composed" stdDeviation="' + blur + '"/> \n        <feBlend in="SourceGraphic" in2="blured" mode="normal"/>\n      </filter>\n    ');
	  },
	  blur: function blur() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `x` ... horizontal blur
	    // `y` ... vertical blur (optional)
	
	    var x = (0, _utils.isFinite)(args.x) ? args.x : 2;
	    var stdDeviation = (0, _utils.isFinite)(args.y) ? [x, args.y] : x;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feGaussianBlur stdDeviation="' + stdDeviation + '"/>\n      </filter>\n    ');
	  },
	  dropShadow: function dropShadow() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `dx`      ... horizontal shift
	    // `dy`      ... vertical shift
	    // `blur`    ... blur
	    // `color`   ... color
	    // `opacity` ... opacity
	
	    var dx = args.dx || 0;
	    var dy = args.dy || 0;
	    var color = args.color || 'black';
	    var blur = (0, _utils.isFinite)(args.blur) ? args.blur : 4;
	    var opacity = (0, _utils.isFinite)(args.opacity) ? args.opacity : 1;
	
	    var template = 'SVGFEDropShadowElement' in window ? '<filter>\n           <feDropShadow stdDeviation="' + blur + '" dx="' + dx + '" dy="' + dy + '" flood-color="' + color + '" flood-opacity="' + opacity + '" />\n         </filter>' : '<filter>\n           <feGaussianBlur in="SourceAlpha" stdDeviation="' + blur + '" />\n           <feOffset dx="' + dx + '" dy="' + dy + '" result="offsetblur" />\n           <feFlood flood-color="' + color + '" />\n           <feComposite in2="offsetblur" operator="in" />\n           <feComponentTransfer>\n             <feFuncA type="linear" slope="' + opacity + '" />\n           </feComponentTransfer>\n           <feMerge>\n             <feMergeNode/>\n             <feMergeNode in="SourceGraphic"/>\n           </feMerge>\n         </filter>';
	
	    return (0, _utils.trim)(template);
	  },
	  grayScale: function grayScale() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `amount` ... the proportion of the conversion.
	    // A value of 1 is completely grayscale.
	    // A value of 0 leaves the input unchanged.
	
	    var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	    var a = 0.2126 + 0.7874 * (1 - amount);
	    var b = 0.7152 - 0.7152 * (1 - amount);
	    var c = 0.0722 - 0.0722 * (1 - amount);
	    var d = 0.2126 - 0.2126 * (1 - amount);
	    var e = 0.7152 + 0.2848 * (1 - amount);
	    var f = 0.0722 - 0.0722 * (1 - amount);
	    var g = 0.2126 - 0.2126 * (1 - amount);
	    var h = 0.0722 + 0.9278 * (1 - amount);
	
	    return (0, _utils.trim)('\n      <filter>\n        <feColorMatrix type="matrix" values="' + a + ' ' + b + ' ' + c + ' 0 0 ' + d + ' ' + e + ' ' + f + ' 0 0 ' + g + ' ' + b + ' ' + h + ' 0 0 0 0 0 1 0"/>\n      </filter>\n    ');
	  },
	  sepia: function sepia() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `amount` ... the proportion of the conversion.
	    // A value of 1 is completely sepia.
	    // A value of 0 leaves the input unchanged.
	
	    var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	    var a = 0.393 + 0.607 * (1 - amount);
	    var b = 0.769 - 0.769 * (1 - amount);
	    var c = 0.189 - 0.189 * (1 - amount);
	    var d = 0.349 - 0.349 * (1 - amount);
	    var e = 0.686 + 0.314 * (1 - amount);
	    var f = 0.168 - 0.168 * (1 - amount);
	    var g = 0.272 - 0.272 * (1 - amount);
	    var h = 0.534 - 0.534 * (1 - amount);
	    var i = 0.131 + 0.869 * (1 - amount);
	
	    return (0, _utils.trim)('\n      <filter>\n        <feColorMatrix type="matrix" values="' + a + ' ' + b + ' ' + c + ' 0 0 ' + d + ' ' + e + ' ' + f + ' 0 0 ' + g + ' ' + h + ' ' + i + ' 0 0 0 0 0 1 0"/>\n      </filter>\n    ');
	  },
	  saturate: function saturate() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `amount` ... the proportion of the conversion.
	    // A value of 0 is completely un-saturated.
	    // A value of 1 leaves the input unchanged.
	
	    var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feColorMatrix type="saturate" values="' + (1 - amount) + '"/>\n      </filter>\n    ');
	  },
	  hueRotate: function hueRotate() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `angle` ...  the number of degrees around the color
	    // circle the input samples will be adjusted.
	
	    var angle = args.angle || 0;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feColorMatrix type="hueRotate" values="' + angle + '"/>\n      </filter>\n    ');
	  },
	  invert: function invert() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `amount` ... the proportion of the conversion.
	    // A value of 1 is completely inverted.
	    // A value of 0 leaves the input unchanged.
	
	    var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	    var amount2 = 1 - amount;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feComponentTransfer>\n          <feFuncR type="table" tableValues="' + amount + ' ' + amount2 + '"/>\n          <feFuncG type="table" tableValues="' + amount + ' ' + amount2 + '"/>\n          <feFuncB type="table" tableValues="' + amount + ' ' + amount2 + '"/>\n        </feComponentTransfer>\n      </filter>\n    ');
	  },
	  brightness: function brightness() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `amount` ... proportion of the conversion.
	    // A value of 0 will create an image that is completely black.
	    // A value of 1 leaves the input unchanged.
	
	    var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	    return (0, _utils.trim)('\n      <filter>\n        <feComponentTransfer>\n          <feFuncR type="linear" slope="' + amount + '"/>\n          <feFuncG type="linear" slope="' + amount + '"/>\n          <feFuncB type="linear" slope="' + amount + '"/>\n        </feComponentTransfer>\n      </filter>\n    ');
	  },
	  contrast: function contrast() {
	    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	    // `amount` ... proportion of the conversion.
	    // A value of 0 will create an image that is completely black.
	    // A value of 1 leaves the input unchanged.
	
	    var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	    var amount2 = 0.5 - amount / 2;
	
	    return (0, _utils.trim)('\n      <filter>\n       <feComponentTransfer>\n          <feFuncR type="linear" slope="' + amount + '" intercept="' + amount2 + '"/>\n          <feFuncG type="linear" slope="' + amount + '" intercept="' + amount2 + '"/>\n          <feFuncB type="linear" slope="' + amount + '" intercept="' + amount2 + '"/>\n        </feComponentTransfer>\n      </filter>\n    ');
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CellView = function () {
	  function CellView(paper, cell) {
	    _classCallCheck(this, CellView);
	
	    this.cell = cell;
	    this.paper = paper;
	    this.invalid = true; // default need to be repainted
	
	    this.ensureElement();
	    this.setup();
	  }
	
	  _createClass(CellView, [{
	    key: 'ensureElement',
	    value: function ensureElement() {
	      return this;
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	      return this;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      return this;
	    }
	  }, {
	    key: 'compileMarkup',
	    value: function compileMarkup(markup, data) {
	
	      return utils.isFunction(markup) ? markup(data) : utils.format(markup, data);
	    }
	  }, {
	    key: 'getCell',
	    value: function getCell() {
	
	      return this.cell;
	    }
	  }, {
	    key: 'getPaper',
	    value: function getPaper() {
	
	      return this.paper;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel() {
	
	      return this.paper && this.paper.getModel();
	    }
	  }, {
	    key: 'getPane',
	    value: function getPane() {
	
	      var result = void 0;
	
	      var pane = this.cell.metadata.pane;
	      if (pane) {
	        if (utils.isString(pane)) {
	          result = this.paper[pane];
	        } else if (utils.isNode(pane)) {
	          result = pane;
	        }
	      }
	
	      return result || this.paper.drawPane;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      utils.removeElement(this.elem);
	      utils.destroy(this);
	    }
	  }]);
	
	  return CellView;
	}();
	
	// exports
	// -------
	
	exports.default = CellView;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Image = function (_Node) {
	  _inherits(Image, _Node);
	
	  function Image() {
	    _classCallCheck(this, Image);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Image).apply(this, arguments));
	  }
	
	  return Image;
	}(_Node3.default);
	
	Image.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><image/></g><text/></g>',
	
	  attrs: {
	    '.': {
	      fill: '#ffffff',
	      stroke: 'none'
	    },
	    'text': {
	      'font-size': 14,
	      'text': '',
	      'text-anchor': 'middle',
	      'ref-x': .5,
	      'ref-dy': 20,
	      'y-alignment': 'middle',
	      'fill': '#000000',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Image;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Circle = function (_Node) {
	  _inherits(Circle, _Node);
	
	  function Circle() {
	    _classCallCheck(this, Circle);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Circle).apply(this, arguments));
	  }
	
	  return Circle;
	}(_Node3.default);
	
	Circle.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><circle/></g><text/></g>',
	
	  size: {
	    width: 60,
	    height: 60
	  },
	
	  attrs: {
	    '.': {
	      fill: '#ffffff',
	      stroke: 'none'
	    },
	    'circle': {
	      fill: '#ffffff',
	      stroke: '#000000',
	      r: 30,
	      cx: 30,
	      cy: 30
	    },
	    'text': {
	      'font-size': 14,
	      'text': '',
	      'text-anchor': 'middle',
	      'ref-x': .5,
	      'ref-y': .5,
	      'y-alignment': 'middle',
	      'fill': '#000000',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Circle;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Path2 = __webpack_require__(22);
	
	var _Path3 = _interopRequireDefault(_Path2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rhombus = function (_Path) {
	  _inherits(Rhombus, _Path);
	
	  function Rhombus() {
	    _classCallCheck(this, Rhombus);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Rhombus).apply(this, arguments));
	  }
	
	  return Rhombus;
	}(_Path3.default);
	
	Rhombus.setDefaults({
	
	  attrs: {
	    path: {
	      d: 'M 30 0 L 60 30 30 60 0 30 z'
	    },
	    text: {
	      'ref-y': 0.5,
	      'y-alignment': 'middle'
	    }
	  }
	});
	
	exports.default = Rhombus;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ellipse = function (_Node) {
	  _inherits(Ellipse, _Node);
	
	  function Ellipse() {
	    _classCallCheck(this, Ellipse);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Ellipse).apply(this, arguments));
	  }
	
	  return Ellipse;
	}(_Node3.default);
	
	Ellipse.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><ellipse/></g><text/></g>',
	
	  size: {
	    width: 60,
	    height: 40
	  },
	
	  attrs: {
	    '.': {
	      fill: '#ffffff',
	      stroke: 'none'
	    },
	    'ellipse': {
	      fill: '#ffffff',
	      stroke: '#000000',
	      rx: 30,
	      ry: 20,
	      cx: 30,
	      cy: 20
	    },
	    'text': {
	      'font-size': 14,
	      'text': '',
	      'text-anchor': 'middle',
	      'ref-x': .5,
	      'ref-y': .5,
	      'y-alignment': 'middle',
	      'fill': '#000000',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Ellipse;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Polygon = function (_Node) {
	  _inherits(Polygon, _Node);
	
	  function Polygon() {
	    _classCallCheck(this, Polygon);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Polygon).apply(this, arguments));
	  }
	
	  return Polygon;
	}(_Node3.default);
	
	Polygon.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><polygon/></g><text/></g>',
	
	  size: {
	    width: 60,
	    height: 40
	  },
	
	  attrs: {
	    '.': {
	      fill: '#ffffff',
	      stroke: 'none'
	    },
	    'polyline': {
	      fill: '#ffffff',
	      stroke: '#000000'
	    },
	    'text': {
	      'font-size': 14,
	      'text': '',
	      'text-anchor': 'middle',
	      'ref-x': .5,
	      'ref-dy': 20,
	      'y-alignment': 'middle',
	      'fill': '#000000',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Polygon;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Polyline = function (_Node) {
	  _inherits(Polyline, _Node);
	
	  function Polyline() {
	    _classCallCheck(this, Polyline);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Polyline).apply(this, arguments));
	  }
	
	  return Polyline;
	}(_Node3.default);
	
	Polyline.setDefaults({
	
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><polyline/></g><text/></g>',
	
	  size: {
	    width: 60,
	    height: 40
	  },
	
	  attrs: {
	    '.': {
	      fill: '#ffffff',
	      stroke: 'none'
	    },
	    'polyline': {
	      fill: '#ffffff',
	      stroke: '#000000'
	    },
	    'text': {
	      'font-size': 14,
	      'text': '',
	      'text-anchor': 'middle',
	      'ref-x': .5,
	      'ref-dy': 20,
	      'y-alignment': 'middle',
	      'fill': '#000000',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = Polyline;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LabelLink = function (_Node) {
	  _inherits(LabelLink, _Node);
	
	  function LabelLink() {
	    _classCallCheck(this, LabelLink);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LabelLink).apply(this, arguments));
	  }
	
	  return LabelLink;
	}(_Node3.default);
	
	LabelLink.setDefaults({
	  markup: '<g class="pane-rotatable"><g class="pane-scalable"><rect/></g><a><text/></a></g>',
	  attrs: {
	    '.': {
	      fill: '#fff',
	      stroke: 'none'
	    },
	    'rect': {
	      'fill': '#fff',
	      'stroke': '#000',
	      'stroke-width': '1',
	      'width': 80,
	      'height': 30
	    },
	    'text': {
	      'fill': '#000',
	      'font-size': 12,
	      'ref-x': .5,
	      'ref-y': .5,
	      'text-anchor': 'middle',
	      'y-alignment': 'middle',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = LabelLink;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ElementLink = function (_Node) {
	  _inherits(ElementLink, _Node);
	
	  function ElementLink() {
	    _classCallCheck(this, ElementLink);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ElementLink).apply(this, arguments));
	  }
	
	  return ElementLink;
	}(_Node3.default);
	
	ElementLink.setDefaults({
	  markup: '<a><g class="pane-rotatable"><g class="pane-scalable"><rect/></g><text/></g></a>',
	  attrs: {
	    '.': {
	      fill: '#fff',
	      stroke: 'none'
	    },
	    'rect': {
	      'fill': '#fff',
	      'stroke': '#000',
	      'stroke-width': '1',
	      'width': 80,
	      'height': 30
	    },
	    'text': {
	      'fill': '#000',
	      'font-size': 12,
	      'ref-x': .5,
	      'ref-y': .5,
	      'text-anchor': 'middle',
	      'y-alignment': 'middle',
	      'font-family': 'Arial, helvetica, sans-serif'
	    }
	  }
	});
	
	exports.default = ElementLink;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changes = undefined;
	
	var _Change = __webpack_require__(42);
	
	var _Change2 = _interopRequireDefault(_Change);
	
	var _RootChange = __webpack_require__(43);
	
	var _RootChange2 = _interopRequireDefault(_RootChange);
	
	var _ChildChange = __webpack_require__(44);
	
	var _ChildChange2 = _interopRequireDefault(_ChildChange);
	
	var _VisibleChange = __webpack_require__(45);
	
	var _VisibleChange2 = _interopRequireDefault(_VisibleChange);
	
	var _TerminalChange = __webpack_require__(46);
	
	var _TerminalChange2 = _interopRequireDefault(_TerminalChange);
	
	var _GeometryChange = __webpack_require__(47);
	
	var _GeometryChange2 = _interopRequireDefault(_GeometryChange);
	
	var _CollapseChange = __webpack_require__(48);
	
	var _CollapseChange2 = _interopRequireDefault(_CollapseChange);
	
	var _ChangeCollection = __webpack_require__(49);
	
	var _ChangeCollection2 = _interopRequireDefault(_ChangeCollection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var changes = {
	  Change: _Change2.default,
	  RootChange: _RootChange2.default,
	  ChildChange: _ChildChange2.default,
	  VisibleChange: _VisibleChange2.default,
	  TerminalChange: _TerminalChange2.default,
	  GeometryChange: _GeometryChange2.default,
	  CollapseChange: _CollapseChange2.default,
	  ChangeCollection: _ChangeCollection2.default
	};
	
	exports.changes = changes;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Change = function () {
	  function Change() {
	    _classCallCheck(this, Change);
	  }
	
	  _createClass(Change, [{
	    key: "digest",
	
	
	    // constructor() {
	    //
	    //   if (new.target === Change) {
	    //     throw new Error('`Change` is an abstract class that cannot be instantiated.');
	    //   }
	    // }
	
	    value: function digest() {
	
	      return this;
	    }
	  }]);
	
	  return Change;
	}();
	
	exports.default = Change;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RootChange = function (_Change) {
	  _inherits(RootChange, _Change);
	
	  function RootChange(model, root) {
	    _classCallCheck(this, RootChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RootChange).call(this));
	
	    _this.model = model;
	    _this.root = root;
	    _this.previous = root;
	    return _this;
	  }
	
	  _createClass(RootChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.root = this.previous;
	      this.previous = this.model.rootChanged(this.previous);
	
	      return this;
	    }
	  }]);
	
	  return RootChange;
	}(_Change3.default);
	
	exports.default = RootChange;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChildChange = function (_Change) {
	  _inherits(ChildChange, _Change);
	
	  function ChildChange(model, child, parent, index) {
	    _classCallCheck(this, ChildChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildChange).call(this));
	
	    _this.model = model;
	    _this.child = child;
	    _this.parent = parent;
	    _this.index = index;
	
	    _this.previous = parent;
	    _this.previousIndex = index;
	    return _this;
	  }
	
	  _createClass(ChildChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      var model = this.model;
	      var child = this.child;
	
	      var newParent = this.previous;
	      var newIndex = this.previousIndex;
	
	      var oldParent = child.parent;
	      var oldIndex = oldParent ? oldParent.indexOfChild(child) : 0;
	
	      // the new parent is null, then the child(and link) will be removed
	      if (!newParent) {
	        this.disConnect(child, false);
	      }
	
	      oldParent = model.childChanged(child, newParent, newIndex);
	
	      this.parent = newParent;
	      this.index = newIndex;
	      this.previous = oldParent;
	      this.previousIndex = oldIndex;
	
	      return this;
	    }
	  }, {
	    key: 'disConnect',
	    value: function disConnect(cell) {
	
	      if (cell.isLink()) {
	
	        var source = cell.getTerminal(true);
	        var target = cell.getTerminal(false);
	
	        if (source) {
	          this.model.terminalChanged(cell, null, true);
	        }
	
	        if (target) {
	          this.model.terminalChanged(cell, null, false);
	        }
	      }
	
	      cell.eachChild(function (child) {
	        this.disConnect(child);
	      }, this);
	
	      return this;
	    }
	  }]);
	
	  return ChildChange;
	}(_Change3.default);
	
	exports.default = ChildChange;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VisibleChange = function (_Change) {
	  _inherits(VisibleChange, _Change);
	
	  function VisibleChange(model, cell, visible) {
	    _classCallCheck(this, VisibleChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VisibleChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.visible = visible;
	    _this.previous = visible;
	    return _this;
	  }
	
	  _createClass(VisibleChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.visible = this.previous;
	      this.previous = this.model.visibleChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return VisibleChange;
	}(_Change3.default);
	
	exports.default = VisibleChange;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TerminalChange = function (_Change) {
	  _inherits(TerminalChange, _Change);
	
	  function TerminalChange(model, link, terminal, isSource) {
	    _classCallCheck(this, TerminalChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TerminalChange).call(this));
	
	    _this.model = model;
	    _this.link = link;
	    _this.terminal = terminal;
	    _this.previous = terminal;
	    _this.isSource = isSource;
	    return _this;
	  }
	
	  _createClass(TerminalChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.terminal = this.previous;
	      this.previous = this.model.terminalChanged(this.link, this.terminal, this.isSource);
	
	      return this;
	    }
	  }]);
	
	  return TerminalChange;
	}(_Change3.default);
	
	exports.default = TerminalChange;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GeometryChange = function (_Change) {
	  _inherits(GeometryChange, _Change);
	
	  function GeometryChange(model, cell, geometry) {
	    _classCallCheck(this, GeometryChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeometryChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.geometry = geometry;
	    _this.previous = geometry;
	
	    return _this;
	  }
	
	  _createClass(GeometryChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.geometry = this.previous;
	      this.previous = this.model.geometryChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return GeometryChange;
	}(_Change3.default);
	
	exports.default = GeometryChange;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CollapseChange = function (_Change) {
	  _inherits(CollapseChange, _Change);
	
	  function CollapseChange(model, cell, collapsed) {
	    _classCallCheck(this, CollapseChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CollapseChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.collapsed = collapsed;
	    _this.previous = collapsed;
	    return _this;
	  }
	
	  _createClass(CollapseChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.collapsed = this.previous;
	      this.previous = this.model.collapseChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return CollapseChange;
	}(_Change3.default);
	
	exports.default = CollapseChange;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ChangeCollection = function () {
	  function ChangeCollection(model) {
	    _classCallCheck(this, ChangeCollection);
	
	    this.model = model;
	    this.changes = [];
	  }
	
	  _createClass(ChangeCollection, [{
	    key: 'hasChange',
	    value: function hasChange() {
	
	      return !!this.changes.length;
	    }
	  }, {
	    key: 'getChanges',
	    value: function getChanges() {
	
	      return this.changes;
	    }
	  }, {
	    key: 'add',
	    value: function add(change) {
	
	      if (change) {
	        this.changes.push(change);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	
	      this.changes = [];
	
	      return this;
	    }
	  }, {
	    key: 'notify',
	    value: function notify() {
	
	      this.model.trigger('change', this.changes);
	
	      return this;
	    }
	  }]);
	
	  return ChangeCollection;
	}();
	
	exports.default = ChangeCollection;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.geometry = undefined;
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Line = __webpack_require__(19);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Ellipse = __webpack_require__(28);
	
	var _Ellipse2 = _interopRequireDefault(_Ellipse);
	
	var _bezier = __webpack_require__(51);
	
	var _bezier2 = _interopRequireDefault(_bezier);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var geometry = {
	  Point: _Point2.default,
	  Line: _Line2.default,
	  Rect: _Rect2.default,
	  Ellipse: _Ellipse2.default,
	  bezier: _bezier2.default
	};
	
	exports.geometry = geometry;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.curveThroughPoints = curveThroughPoints;
	exports.getCurveControlPoints = getCurveControlPoints;
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Line  from '../geometry/Line';
	
	function curveThroughPoints(points) {
	
	  var controlPoints = getCurveControlPoints(points);
	  var path = ['M', points[0].x, points[0].y];
	
	  for (var i = 0; i < controlPoints[0].length; i += 1) {
	    path.push('C', controlPoints[0][i].x, controlPoints[0][i].y, controlPoints[1][i].x, controlPoints[1][i].y, points[i + 1].x, points[i + 1].y);
	  }
	  return path;
	} // import * as utils from '../common/utils';
	
	
	function getCurveControlPoints(knots) {
	
	  var firstControlPoints = [];
	  var secondControlPoints = [];
	
	  var n = knots.length - 1;
	
	  // Special case: Bezier curve should be a straight line.
	  if (n === 1) {
	
	    // 3P1 = 2P0 + P3
	    firstControlPoints[0] = new _Point2.default((2 * knots[0].x + knots[1].x) / 3, (2 * knots[0].y + knots[1].y) / 3);
	
	    // P2 = 2P1 – P0
	    secondControlPoints[0] = new _Point2.default(2 * firstControlPoints[0].x - knots[0].x, 2 * firstControlPoints[0].y - knots[0].y);
	
	    return [firstControlPoints, secondControlPoints];
	  }
	
	  // Calculate first Bezier control points.
	  // Right hand side vector.
	  var rhs = [];
	
	  // Set right hand side X values.
	  for (var i = 1; i < n - 1; i += 1) {
	    rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
	  }
	  rhs[0] = knots[0].x + 2 * knots[1].x;
	  rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2.0;
	
	  // Get first control points X-values.
	  var x = getFirstControlPoints(rhs);
	
	  // Set right hand side Y values.
	  for (var _i = 1; _i < n - 1; _i += 1) {
	    rhs[_i] = 4 * knots[_i].y + 2 * knots[_i + 1].y;
	  }
	  rhs[0] = knots[0].y + 2 * knots[1].y;
	  rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2.0;
	
	  // Get first control points Y-values.
	  var y = getFirstControlPoints(rhs);
	
	  // Fill output arrays.
	  for (var _i2 = 0; _i2 < n; _i2 += 1) {
	    // First control point.
	    firstControlPoints.push(new _Point2.default(x[_i2], y[_i2]));
	    // Second control point.
	    if (_i2 < n - 1) {
	      secondControlPoints.push(new _Point2.default(2 * knots[_i2 + 1].x - x[_i2 + 1], 2 * knots[_i2 + 1].y - y[_i2 + 1]));
	    } else {
	      secondControlPoints.push(new _Point2.default((knots[n].x + x[n - 1]) / 2, (knots[n].y + y[n - 1]) / 2));
	    }
	  }
	
	  return [firstControlPoints, secondControlPoints];
	}
	
	function getFirstControlPoints(rhs) {
	
	  var n = rhs.length;
	  // `x` is a solution vector.
	  var x = [];
	  var tmp = [];
	  var b = 2.0;
	
	  x[0] = rhs[0] / b;
	
	  // Decomposition and forward substitution.
	  for (var i = 1; i < n; i += 1) {
	    tmp[i] = 1 / b;
	    b = (i < n - 1 ? 4.0 : 3.5) - tmp[i];
	    x[i] = (rhs[i] - x[i - 1]) / b;
	  }
	
	  for (var _i3 = 1; _i3 < n; _i3 += 1) {
	    // back substitution.
	    x[n - _i3 - 1] -= tmp[n - _i3] * x[n - _i3];
	  }
	
	  return x;
	}
	
	/* FIXME not used
	 function getInversionSolver(p0, p1, p2, p3) {
	 let pts = arguments;

	 function l(i, j) {
	 // calculates a determinant 3x3
	 // [p.x  p.y  1]
	 // [pi.x pi.y 1]
	 // [pj.x pj.y 1]
	 let pi = pts[i];
	 let pj = pts[j];
	 return function (p) {
	 let w = (i % 3 ? 3 : 1) * (j % 3 ? 3 : 1);
	 let lij = p.x * (pi.y - pj.y) + p.y * (pj.x - pi.x) + pi.x * pj.y - pi.y * pj.x;
	 return w * lij;
	 };
	 }

	 return function solveInversion(p) {
	 let ct = 3 * l(2, 3)(p1);
	 let c1 = l(1, 3)(p0) / ct;
	 let c2 = -l(2, 3)(p0) / ct;
	 let la = c1 * l(3, 1)(p) + c2 * (l(3, 0)(p) + l(2, 1)(p)) + l(2, 0)(p);
	 let lb = c1 * l(3, 0)(p) + c2 * l(2, 0)(p) + l(1, 0)(p);
	 return lb / (lb - la);
	 };
	 }
	 */

	/*
	 function getCurveDivider(p0, p1, p2, p3) {

	 // Divide a Bezier curve into two at point defined by value 't' <0,1>.
	 // Using deCasteljau algorithm. http://math.stackexchange.com/a/317867
	 // @param control points (start, control start, control end, end)
	 // @return a function accepts t and returns 2 curves each defined by 4 control points.

	 return function divideCurve(t) {
	 let l = new Line(p0, p1).pointAt(t);
	 let m = new Line(p1, p2).pointAt(t);
	 let n = new Line(p2, p3).pointAt(t);
	 let p = new Line(l, m).pointAt(t);
	 let q = new Line(m, n).pointAt(t);
	 let r = new Line(p, q).pointAt(t);

	 return [{
	 p0,
	 p1: l,
	 p2: p,
	 p3: r
	 }, {
	 p0: r,
	 p1: q,
	 p2: n,
	 p3
	 }];
	 };
	 }
	 */

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function triggerEvents(callbacks, args, context) {
	
	  var pass = true;
	
	  for (var i = 0, l = callbacks.length; i < l; i += 2) {
	    pass = utils.invoke(callbacks[i], args, callbacks[i + 1] || context) !== false && pass;
	  }
	
	  return pass;
	}
	
	var Events = function () {
	  function Events() {
	    _classCallCheck(this, Events);
	  }
	
	  _createClass(Events, [{
	    key: 'on',
	    value: function on(events, callback, context) {
	
	      if (!callback) {
	        return this;
	      }
	
	      var listeners = this.__events || (this.__events = {});
	
	      utils.forEach(utils.split(events), function (event) {
	        var list = listeners[event] || (listeners[event] = []);
	        list.push(callback, context);
	      });
	
	      return this;
	    }
	  }, {
	    key: 'once',
	    value: function once(events, callback, context) {
	
	      var that = this;
	      var cb = function cb() {
	        that.off(events, cb);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        callback.apply(context || that, args);
	      };
	
	      return this.on(events, cb, context);
	    }
	  }, {
	    key: 'off',
	    value: function off(events, callback, context) {
	
	      var listeners = this.__events;
	      if (!listeners) {
	        return this;
	      }
	
	      // removing *all* events.
	      if (!(events || callback || context)) {
	        delete this.__events;
	        return this;
	      }
	
	      events = events ? utils.split(events) : utils.keys(listeners);
	
	      utils.forEach(events, function (event) {
	
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
	
	      return this;
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(eventName) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }
	
	      var listeners = this.__events;
	      if (!listeners || !eventName) {
	        return null;
	      }
	
	      var pass = true;
	      var all = listeners['*'];
	
	      utils.forEach(utils.split(eventName), function (event) {
	
	        var callbacks = void 0;
	
	        if (event !== '*') {
	          callbacks = listeners[event];
	          if (callbacks) {
	            pass = triggerEvents(callbacks, args, this) && pass;
	          }
	        }
	
	        if (all) {
	          pass = triggerEvents(all, [event].concat(args), this) && pass;
	        }
	      }, this);
	
	      return pass;
	    }
	  }]);
	
	  return Events;
	}();
	
	// exports
	// -------
	
	exports.default = Events;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Events2 = __webpack_require__(52);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	var _Cell = __webpack_require__(20);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _Terminal = __webpack_require__(21);
	
	var _Terminal2 = _interopRequireDefault(_Terminal);
	
	var _RootChange = __webpack_require__(43);
	
	var _RootChange2 = _interopRequireDefault(_RootChange);
	
	var _SizeChange = __webpack_require__(54);
	
	var _SizeChange2 = _interopRequireDefault(_SizeChange);
	
	var _ChildChange = __webpack_require__(44);
	
	var _ChildChange2 = _interopRequireDefault(_ChildChange);
	
	var _VisibleChange = __webpack_require__(45);
	
	var _VisibleChange2 = _interopRequireDefault(_VisibleChange);
	
	var _PositionChange = __webpack_require__(55);
	
	var _PositionChange2 = _interopRequireDefault(_PositionChange);
	
	var _RotationChange = __webpack_require__(56);
	
	var _RotationChange2 = _interopRequireDefault(_RotationChange);
	
	var _TerminalChange = __webpack_require__(46);
	
	var _TerminalChange2 = _interopRequireDefault(_TerminalChange);
	
	var _GeometryChange = __webpack_require__(47);
	
	var _GeometryChange2 = _interopRequireDefault(_GeometryChange);
	
	var _CollapseChange = __webpack_require__(48);
	
	var _CollapseChange2 = _interopRequireDefault(_CollapseChange);
	
	var _AttributeChange = __webpack_require__(57);
	
	var _AttributeChange2 = _interopRequireDefault(_AttributeChange);
	
	var _ChangeCollection = __webpack_require__(49);
	
	var _ChangeCollection2 = _interopRequireDefault(_ChangeCollection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Model = function (_Events) {
	  _inherits(Model, _Events);
	
	  function Model(root) {
	    _classCallCheck(this, Model);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this));
	
	    _this.nextId = 0;
	    _this.updateLevel = 0;
	    _this.endingUpdate = false;
	
	    _this.changes = new _ChangeCollection2.default(_this);
	
	    if (root) {
	      _this.setRoot(root);
	    } else {
	      _this.clear();
	    }
	    return _this;
	  }
	
	  _createClass(Model, [{
	    key: 'clear',
	    value: function clear() {
	
	      return this.setRoot(this.createRoot());
	    }
	  }, {
	    key: 'getDefaultParent',
	    value: function getDefaultParent() {
	
	      // the first layer
	      return this.getRoot().getChildAt(0);
	    }
	  }, {
	    key: 'isOrphan',
	    value: function isOrphan(cell) {
	
	      return cell && cell.isOrphan();
	    }
	  }, {
	    key: 'isAncestor',
	    value: function isAncestor(ancestor, descendant) {
	
	      return ancestor && ancestor.isAncestor(descendant);
	    }
	  }, {
	    key: 'contains',
	    value: function contains(ancestor, descendant) {
	
	      if (!descendant) {
	        descendant = ancestor;
	        ancestor = this.root;
	      }
	
	      return this.isAncestor(ancestor, descendant);
	    }
	  }, {
	    key: 'getAncestors',
	    value: function getAncestors(descendant) {
	
	      return descendant ? descendant.getAncestors() : [];
	    }
	  }, {
	    key: 'getDescendants',
	    value: function getDescendants(ancestor) {
	
	      return ancestor ? ancestor.getDescendants() : [];
	    }
	  }, {
	    key: 'getParents',
	    value: function getParents() /* cells */{
	      /* FIXME
	       let parents = [];
	        if (cells) {
	        let hash = {};
	        forEach(cells, function (cell) {
	       let parent = cell.parent;
	        if (parent) {
	       let id = cellRoute.create(parent);
	        if (!hash[id]) {
	       hash[id] = parent;
	       parents.push(parent);
	       }
	       }
	       });
	       }
	        return parents;
	       */
	    }
	  }, {
	    key: 'getCellById',
	    value: function getCellById(id) {
	
	      return this.cells ? this.cells[id] : null;
	    }
	  }, {
	    key: 'findCellAtPoint',
	    value: function findCellAtPoint(localPoint) {
	      var _this2 = this;
	
	      var result = [];
	
	      if (localPoint) {
	        this.eachCell(function (cell) {
	          if (_this2.isNode(cell)) {
	            var rect = cell.getBBox();
	            if (rect && rect.containsPoint(localPoint)) {
	              result.push(cell);
	            }
	          }
	        });
	      }
	
	      return result;
	    }
	  }, {
	    key: 'findCellInArea',
	    value: function findCellInArea(area) {
	      var _this3 = this;
	
	      var result = [];
	
	      if (area) {
	        this.eachCell(function (cell) {
	          if (_this3.isNode(cell)) {
	            var rect = cell.getBBox();
	            if (rect && area.containsRect(rect)) {
	              result.push(cell);
	            }
	          }
	        });
	      }
	
	      return result;
	    }
	  }, {
	    key: 'createCellId',
	    value: function createCellId() {
	
	      var id = this.nextId;
	      this.nextId += 1;
	
	      return 'cell-' + id;
	    }
	
	    // root
	    // ----
	
	  }, {
	    key: 'isRoot',
	    value: function isRoot(cell) {
	
	      return cell && this.root === cell;
	    }
	  }, {
	    key: 'createRoot',
	    value: function createRoot() {
	
	      var root = new _Cell2.default();
	
	      root.insertChild(this.createLayer(), { silent: true });
	
	      return root;
	    }
	  }, {
	    key: 'getRoot',
	    value: function getRoot(cell) {
	
	      var root = this.root;
	
	      while (cell) {
	        root = cell;
	        cell = cell.parent;
	      }
	
	      return root;
	    }
	  }, {
	    key: 'setRoot',
	    value: function setRoot(root) {
	
	      return this.digest(new _RootChange2.default(this, root));
	    }
	  }, {
	    key: 'rootChanged',
	    value: function rootChanged(root) {
	
	      var prev = this.root;
	
	      this.root = root;
	      this.cells = null;
	      this.nextId = 0;
	      this.cellAdded(root);
	
	      return prev;
	    }
	
	    // Layers
	    // ------
	
	  }, {
	    key: 'isLayer',
	    value: function isLayer(cell) {
	
	      return cell && this.isRoot(cell.parent);
	    }
	  }, {
	    key: 'getLayers',
	    value: function getLayers() {
	
	      return this.getRoot().children || [];
	    }
	  }, {
	    key: 'createLayer',
	    value: function createLayer() {
	
	      return new _Cell2.default();
	    }
	  }, {
	    key: 'eachLayer',
	    value: function eachLayer(iterator, context) {
	
	      return utils.forEach(this.getLayers(), iterator, context);
	    }
	
	    // cell
	    // ----
	
	  }, {
	    key: 'addNode',
	    value: function addNode(node, parent, index) {
	
	      return this.addCells([node], parent, index);
	    }
	  }, {
	    key: 'addLink',
	    value: function addLink(link, source, target, parent, index) {
	
	      return this.addCells([link], parent, index, source, target);
	    }
	  }, {
	    key: 'addCell',
	    value: function addCell(cell, parent, index, source, target) {
	
	      return this.addCells([cell], parent, index, source, target);
	    }
	  }, {
	    key: 'addCells',
	    value: function addCells(cells, parent, index, source, target) {
	      var _this4 = this;
	
	      parent = parent || this.getDefaultParent();
	      index = utils.fixIndex(index, parent.getChildCount());
	
	      this.beginUpdate();
	
	      try {
	        utils.forEach(cells, function (child) {
	          if (child) {
	            if (child !== parent) {
	              _this4.setParent(child, parent, index);
	              index += 1;
	            }
	
	            source && _this4.setTerminal(child, source, true);
	            target && _this4.setTerminal(child, target, false);
	          }
	        });
	      } finally {
	        this.endUpdate();
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeCell',
	    value: function removeCell(cell) {
	
	      if (cell) {
	        if (this.isRoot(cell)) {
	          this.setRoot(null);
	        } else if (this.getParent(cell)) {
	          this.digest(new _ChildChange2.default(this, cell, null));
	        }
	      }
	
	      return cell;
	    }
	  }, {
	    key: 'getParent',
	    value: function getParent(child) {
	
	      return child ? child.parent : null;
	    }
	  }, {
	    key: 'setParent',
	    value: function setParent(child, parent, index) {
	
	      if (child) {
	        if (parent) {
	          try {
	            this.beginUpdate();
	            this.digest(new _ChildChange2.default(this, child, parent, index));
	          } finally {
	            this.endUpdate();
	          }
	        } else {
	          this.removeCell(child);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'childChanged',
	    value: function childChanged(child, parent, index) {
	
	      var previous = this.getParent(child);
	
	      if (parent) {
	        if (parent !== previous || previous.indexOfChild(child) !== index) {
	          // `insertChild` will firstly remove cell from previous parent
	          parent.insertChild(child, index, { silent: true });
	        }
	      } else if (previous) {
	        previous.removeChild(child, { silent: true });
	      }
	
	      if (parent) {
	        // check if the previous parent was already in the
	        // model and avoids calling cellAdded if it was.
	        if (!this.contains(previous)) {
	          this.cellAdded(child);
	        }
	      } else {
	        this.cellRemoved(child);
	      }
	
	      return previous;
	    }
	
	    // linkChanged(link, terminal, isSource) {
	    //
	    //    let prev = link.getTerminal(isSource);
	    //
	    //    if (terminal) {
	    //        terminal.addLink(link, isSource);
	    //    } else if (prev) {
	    //        prev.removeLink(link, isSource);
	    //    }
	    //
	    //    return prev;
	    // }
	
	  }, {
	    key: 'cellAdded',
	    value: function cellAdded(cell) {
	
	      // create an Id for the cell and map it
	
	      if (cell) {
	        // creates an Id for the cell if not Id exists
	        var id = cell.getId() || this.createCellId(cell);
	        if (id) {
	          var collision = this.getCellById(id);
	
	          if (collision !== cell) {
	            // creates new Id for the cell as long as there is a collision
	            while (collision) {
	              id = this.createCellId(cell);
	              collision = this.getCellById(id);
	            }
	
	            // lazily creates the cells dictionary
	            if (!this.cells) {
	              this.cells = {};
	            }
	
	            cell.setId(id);
	            this.cells[id] = cell;
	          }
	        }
	
	        // makes sure IDs of deleted cells are not reused
	        if (utils.isNumeric(id)) {
	          this.nextId = Math.max(this.nextId, id);
	        }
	
	        cell.setModel(this);
	        // recursively processes child cells
	        cell.eachChild(this.cellAdded, this);
	      }
	    }
	  }, {
	    key: 'cellRemoved',
	    value: function cellRemoved(cell) {
	      var _this5 = this;
	
	      if (cell) {
	        cell.eachChild(function (child) {
	          _this5.cellRemoved(child);
	        });
	
	        var id = cell.getId();
	        if (this.cells && id) {
	          delete this.cells[id];
	        }
	
	        cell.setModel(null);
	      }
	    }
	  }, {
	    key: 'updateLinkParents',
	    value: function updateLinkParents(cell, root) {
	      var _this6 = this;
	
	      // Updates the parent for all links that are connected to node
	
	      root = root || this.getRoot(cell);
	
	      // update links on children first
	      cell.eachChild(function (child) {
	        _this6.updateLinkParents(child, root);
	      });
	
	      // update the parents of all connected links
	      cell.eachLink(function (link) {
	        // update edge parent if edge and child have
	        // a common root node (does not need to be the
	        // model root node)
	        if (_this6.isAncestor(root, link)) {
	          _this6.updateLinkParent(link, root);
	        }
	      });
	    }
	  }, {
	    key: 'updateLinkParent',
	    value: function updateLinkParent(link, root) {
	
	      var that = this;
	      var cell = null;
	      var source = link.getTerminal(true);
	      var target = link.getTerminal(false);
	
	      // use the first non-relative descendants of the source terminal
	      while (source && !source.isLink() && source.geometry && source.geometry.relative) {
	        source = source.parent;
	      }
	
	      // use the first non-relative descendants of the target terminal
	      while (target && !target.isLink() && target.geometry && target.geometry.relative) {
	        target = target.parent;
	      }
	
	      if (that.isAncestor(root, source) && that.isAncestor(root, target)) {
	
	        if (source === target) {
	          cell = source.parent;
	        } else {
	          cell = that.getNearestCommonAncestor(source, target);
	        }
	
	        if (cell && (cell.parent !== that.viewport || that.isAncestor(cell, link)) && link.parent !== cell) {
	
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
	    }
	  }, {
	    key: 'getNearestCommonAncestor',
	    value: function getNearestCommonAncestor() /* cell1, cell2 */{
	
	      /* FIXME
	       if (cell1 && cell2) {
	        let route1 = cellRoute.create(cell1);
	       let route2 = cellRoute.create(cell2);
	        if (route1 && route2) {
	        let cell = cell1;
	       let route = route2;
	       let current = route1;
	        if (route1.length > route2.length) {
	       cell = cell2;
	       route = route1;
	       current = route2;
	       }
	        while (cell) {
	       let parent = cell.parent;
	        // check if the cell path is equal to the beginning of the given cell path
	       if (route.indexOf(current + cellRoute.separator) === 0 && parent) {
	       return cell;
	       }
	        cell = parent;
	       current = cellRoute.getParentRoute(current);
	       }
	       }
	       }
	       */
	
	      return null;
	    }
	  }, {
	    key: 'eachCell',
	    value: function eachCell(iterator, context) {
	
	      if (this.cells && iterator && utils.isFunction(iterator)) {
	        utils.forIn(this.cells, function (cell, id) {
	          iterator.call(context, cell, id);
	        });
	      }
	    }
	  }, {
	    key: 'filterCell',
	    value: function filterCell(iterator, context) {
	
	      var result = [];
	
	      if (this.cells && iterator && utils.isFunction(iterator)) {
	        utils.forIn(this.cells, function (cell, id) {
	          if (iterator.call(context, cell, id)) {
	            result.push(cell);
	          }
	        });
	      }
	
	      return result;
	    }
	  }, {
	    key: 'eachNode',
	    value: function eachNode(iterator, context) {
	      var _this7 = this;
	
	      var nodes = this.filterCell(function (cell) {
	        return _this7.isNode(cell);
	      }, this);
	
	      return utils.forEach(nodes, iterator, context);
	    }
	  }, {
	    key: 'eachLink',
	    value: function eachLink(iterator, context) {
	      var _this8 = this;
	
	      var links = this.filterCell(function (cell) {
	        return _this8.isLink(cell);
	      }, this);
	
	      return utils.forEach(links, iterator, context);
	    }
	
	    // children
	    // --------
	
	  }, {
	    key: 'getChildNodes',
	    value: function getChildNodes(parent) {
	
	      return this.getChildCells(parent, true, false);
	    }
	  }, {
	    key: 'getChildLinks',
	    value: function getChildLinks(parent) {
	
	      return this.getChildCells(parent, false, true);
	    }
	  }, {
	    key: 'eachChildNode',
	    value: function eachChildNode(parent, iterator, context) {
	
	      utils.forEach(this.getChildNodes(parent), iterator, context);
	    }
	  }, {
	    key: 'eachChildLink',
	    value: function eachChildLink(parent, iterator, context) {
	
	      utils.forEach(this.getChildLinks(parent), iterator, context);
	    }
	  }, {
	    key: 'getChildCells',
	    value: function getChildCells(parent, isNode, isLink) {
	
	      if (parent) {
	        return parent.filterChild(function (child) {
	          return isNode && child.isNode() || isLink && child.isLink();
	        });
	      }
	
	      return [];
	    }
	  }, {
	    key: 'indexOfChild',
	    value: function indexOfChild(cell, child) {
	
	      return cell ? cell.indexOfChild(child) : -1;
	    }
	  }, {
	    key: 'getChildAt',
	    value: function getChildAt(cell, index) {
	
	      return cell ? cell.getChildAt(index) : null;
	    }
	  }, {
	    key: 'getChildren',
	    value: function getChildren(cell) {
	
	      return cell ? cell.children : null;
	    }
	  }, {
	    key: 'getChildCount',
	    value: function getChildCount(cell) {
	
	      return cell ? cell.getChildCount() : 0;
	    }
	
	    // node
	    // ----
	
	  }, {
	    key: 'isNode',
	    value: function isNode(cell) {
	
	      return cell ? cell.isNode() : false;
	    }
	  }, {
	    key: 'getLinkCount',
	    value: function getLinkCount(cell) {
	
	      return cell ? cell.getLinkCount() : 0;
	    }
	  }, {
	    key: 'indexOfLink',
	    value: function indexOfLink(cell, link) {
	
	      return cell ? cell.indexOfLink(link) : -1;
	    }
	  }, {
	    key: 'getLinkAt',
	    value: function getLinkAt(cell, index) {
	
	      return cell ? cell.getLinkAt(index) : null;
	    }
	
	    // link
	    // ----
	
	  }, {
	    key: 'isLink',
	    value: function isLink(link) {
	
	      return link ? link.isLink() : false;
	    }
	  }, {
	    key: 'getTerminal',
	    value: function getTerminal(link, isSource) {
	
	      return link ? link.getTerminal(isSource) : null;
	    }
	  }, {
	    key: 'getTerminalNode',
	    value: function getTerminalNode(link, isSource) {
	
	      return link ? link.getTerminalNode(isSource) : null;
	    }
	  }, {
	    key: 'getTerminalPort',
	    value: function getTerminalPort(link, isSource) {
	
	      return link ? link.getTerminalPort(isSource) : null;
	    }
	  }, {
	    key: 'getTerminalPoint',
	    value: function getTerminalPoint(link, isSource) {
	
	      return link ? link.getTerminalPoint(isSource) : null;
	    }
	  }, {
	    key: 'setTerminal',
	    value: function setTerminal(link, terminal, isSource) {
	
	      // fully replace the terminal
	
	      if (link) {
	        try {
	          this.beginUpdate();
	          this.digest(new _TerminalChange2.default(this, link, new _Terminal2.default(terminal), isSource));
	        } finally {
	          this.endUpdate();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setTerminalNode',
	    value: function setTerminalNode(link, node, isSource) {
	
	      if (link) {
	        this.setTerminal(link, node, isSource);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setTerminalPort',
	    value: function setTerminalPort(link, port, isSource) {
	
	      // partial replace the terminal port
	
	      if (link) {
	        var terminal = this.getTerminal(link, isSource);
	
	        terminal = terminal ? terminal.duplicate({ port: port }) : new _Terminal2.default({ port: port });
	
	        this.setTerminal(link, terminal, isSource);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setTerminalPoint',
	    value: function setTerminalPoint(link, point, isSource) {
	
	      if (link) {
	        this.setTerminal(link, point, isSource);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setTerminals',
	    value: function setTerminals(link, source, target) {
	
	      this.beginUpdate();
	
	      try {
	        this.setTerminal(link, source, true);
	        this.setTerminal(link, target, false);
	      } finally {
	        this.endUpdate();
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeFromTerminal',
	    value: function removeFromTerminal(link, isSource) {
	
	      if (link) {
	        this.setTerminal(link, null, isSource);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'terminalChanged',
	    value: function terminalChanged(link, terminal, isSource) {
	
	      var prev = this.getTerminal(link, isSource);
	
	      if (terminal) {
	        terminal.addLink(link, isSource, { silent: true });
	      } else if (prev) {
	        prev.removeLink(link, isSource, { silent: true });
	      }
	
	      return prev;
	    }
	
	    // collapse
	    // --------
	
	  }, {
	    key: 'isCollapsed',
	    value: function isCollapsed(cell) {
	
	      return cell ? cell.isCollapsed() : false;
	    }
	  }, {
	    key: 'setCollapsed',
	    value: function setCollapsed(cell, collapsed) {
	
	      if (cell && collapsed !== this.isCollapsed(cell)) {
	        try {
	          this.beginUpdate();
	          this.digest(new _CollapseChange2.default(this, cell, collapsed));
	        } finally {
	          this.endUpdate();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'collapseChanged',
	    value: function collapseChanged(cell, collapsed) {
	
	      var previous = this.isCollapsed(cell);
	
	      cell.setCollapsed(collapsed, { silent: true });
	
	      return previous;
	    }
	
	    // visible
	    // -------
	
	  }, {
	    key: 'isVisible',
	    value: function isVisible(cell) {
	
	      return cell ? cell.isVisible() : false;
	    }
	  }, {
	    key: 'setVisible',
	    value: function setVisible(cell, visible) {
	
	      if (cell && visible !== this.isVisible(cell)) {
	        try {
	          this.beginUpdate();
	          this.digest(new _VisibleChange2.default(this, cell, visible));
	        } finally {
	          this.endUpdate();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'visibleChanged',
	    value: function visibleChanged(cell, visible) {
	
	      var previous = this.isVisible(cell);
	
	      cell.setVisible(visible, { silent: true });
	
	      return previous;
	    }
	
	    // attribute
	    // ---------
	
	  }, {
	    key: 'getAttribute',
	    value: function getAttribute(cell) {
	
	      return cell ? cell.getAttribute() : null;
	    }
	  }, {
	    key: 'setAttribute',
	    value: function setAttribute(cell, attrs) {
	
	      if (cell) {
	        try {
	          this.beginUpdate();
	          this.digest(new _AttributeChange2.default(this, cell, attrs));
	        } finally {
	          this.endUpdate();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'attributeChanged',
	    value: function attributeChanged(cell, attrs) {
	
	      var previous = this.getAttribute(cell);
	
	      cell.setAttribute(attrs, { silent: true });
	
	      return previous;
	    }
	
	    // geometry
	    // --------
	
	  }, {
	    key: 'getPosition',
	    value: function getPosition(cell, raw) {
	
	      return cell ? cell.getPosition(raw) : null;
	    }
	  }, {
	    key: 'setPosition',
	    value: function setPosition(cell, position) {
	
	      if (cell && position) {
	
	        var previous = cell.getPosition(true) || {};
	
	        position.relative = position.relative === true;
	        previous.relative = previous.relative === true;
	
	        if (previous.x !== position.x || previous.y !== position.y || previous.relative !== position.relative) {
	
	          try {
	            this.beginUpdate();
	            this.digest(new _PositionChange2.default(this, cell, {
	              x: position.x,
	              y: position.y,
	              relative: position.relative
	            }));
	          } finally {
	            this.endUpdate();
	          }
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'positionChanged',
	    value: function positionChanged(cell, position) {
	
	      var previous = cell.getPosition(true);
	
	      cell.setPosition(position, { silent: true });
	
	      return previous;
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize(cell, raw) {
	
	      return cell ? cell.getSize(raw) : null;
	    }
	  }, {
	    key: 'setSize',
	    value: function setSize(cell, size) {
	
	      if (cell && size) {
	
	        var prev = cell.getSize(true) || {};
	
	        size.relative = size.relative === true;
	        prev.relative = prev.relative === true;
	
	        if (prev.width !== size.width || prev.height !== size.height || prev.relative !== size.relative) {
	
	          try {
	            this.beginUpdate();
	            this.digest(new _SizeChange2.default(this, cell, {
	              width: size.width,
	              height: size.height,
	              relative: size.relative
	            }));
	          } finally {
	            this.endUpdate();
	          }
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'sizeChanged',
	    value: function sizeChanged(cell, size) {
	
	      var previous = cell.getSize(true);
	
	      cell.setSize(size, { silent: true });
	
	      return previous;
	    }
	  }, {
	    key: 'getRotation',
	    value: function getRotation(cell, raw) {
	
	      return cell ? cell.getRotation(raw) : null;
	    }
	  }, {
	    key: 'setRotation',
	    value: function setRotation(cell, rotation) {
	
	      if (cell && rotation) {
	
	        var previous = cell.getRotation(true) || {};
	
	        rotation.relative = rotation.relative === true;
	        previous.relative = previous.relative === true;
	
	        if (previous.angle !== rotation.angle || previous.relative !== rotation.relative) {
	
	          try {
	            this.beginUpdate();
	            this.digest(new _RotationChange2.default(this, cell, {
	              angle: rotation.angle,
	              relative: rotation.relative
	            }));
	          } finally {
	            this.endUpdate();
	          }
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'rotationChanged',
	    value: function rotationChanged(cell, rotation) {
	
	      var previous = cell.getRotation(true);
	
	      cell.setRotation(rotation, { silent: true });
	
	      return previous;
	    }
	  }, {
	    key: 'getGeometry',
	    value: function getGeometry(cell, raw) {
	
	      return cell ? cell.getGeometry(raw) : null;
	    }
	  }, {
	    key: 'setGeometry',
	    value: function setGeometry(cell, geom) {
	
	      if (cell && geom) {
	        try {
	          this.beginUpdate();
	          this.digest(new _GeometryChange2.default(this, cell, geom));
	        } finally {
	          this.endUpdate();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'geometryChanged',
	    value: function geometryChanged(cell, geom) {
	      var _this9 = this;
	
	      var previous = cell.getGeometry(true) || {};
	
	      utils.forEach(['size', 'position', 'rotation'], function (key) {
	        if (geom[key]) {
	          _this9[key + 'Changed'](cell, geom[key]);
	        }
	      });
	
	      return previous;
	    }
	
	    // update
	    // ------
	
	  }, {
	    key: 'digest',
	    value: function digest(change) {
	
	      // take effect the change
	      change.digest();
	
	      this.beginUpdate();
	      this.changes.add(change);
	      this.endUpdate();
	
	      return this;
	    }
	  }, {
	    key: 'beginUpdate',
	    value: function beginUpdate() {
	
	      this.updateLevel += 1;
	      this.trigger('beginUpdate');
	
	      if (this.updateLevel === 1) {
	        this.trigger('startEdit');
	      }
	    }
	  }, {
	    key: 'endUpdate',
	    value: function endUpdate() {
	
	      this.updateLevel -= 1;
	
	      if (this.updateLevel === 0) {
	        this.trigger('endEdit');
	      }
	
	      if (!this.endingUpdate) {
	
	        this.endingUpdate = this.updateLevel === 0;
	
	        var changes = this.changes;
	
	        this.trigger('endUpdate', changes.getChanges());
	
	        // TODO: 如果此时还没有和 paper 关联, 所有的 changes 都将失效, 还需要一种机制来管理
	        if (this.endingUpdate && changes.hasChange()) {
	          changes.notify().clear();
	        }
	
	        this.endingUpdate = false;
	      }
	    }
	  }, {
	    key: 'isUpdated',
	    value: function isUpdated() {
	
	      return this.updateLevel === 0;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      utils.destroy(this);
	    }
	  }]);
	
	  return Model;
	}(_Events3.default);
	
	// exports
	// -------
	
	exports.default = Model;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SizeChange = function (_Change) {
	  _inherits(SizeChange, _Change);
	
	  function SizeChange(model, cell, size) {
	    _classCallCheck(this, SizeChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.size = size;
	    _this.previous = size;
	    return _this;
	  }
	
	  _createClass(SizeChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.size = this.previous;
	      this.previous = this.model.sizeChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return SizeChange;
	}(_Change3.default);
	
	exports.default = SizeChange;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PositionChange = function (_Change) {
	  _inherits(PositionChange, _Change);
	
	  function PositionChange(model, cell, position) {
	    _classCallCheck(this, PositionChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PositionChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.position = position;
	    _this.previous = position;
	    return _this;
	  }
	
	  _createClass(PositionChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.position = this.previous;
	      this.previous = this.model.positionChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return PositionChange;
	}(_Change3.default);
	
	exports.default = PositionChange;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RotationChange = function (_Change) {
	  _inherits(RotationChange, _Change);
	
	  function RotationChange(model, cell, rotation) {
	    _classCallCheck(this, RotationChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RotationChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.rotation = rotation;
	    _this.previous = rotation;
	    return _this;
	  }
	
	  _createClass(RotationChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.position = this.previous;
	      this.previous = this.model.rotationChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return RotationChange;
	}(_Change3.default);
	
	exports.default = RotationChange;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Change2 = __webpack_require__(42);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AttributeChange = function (_Change) {
	  _inherits(AttributeChange, _Change);
	
	  function AttributeChange(model, cell, attrs) {
	    _classCallCheck(this, AttributeChange);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AttributeChange).call(this));
	
	    _this.model = model;
	    _this.cell = cell;
	    _this.attrs = attrs;
	    _this.previous = attrs;
	    return _this;
	  }
	
	  _createClass(AttributeChange, [{
	    key: 'digest',
	    value: function digest() {
	
	      this.attrs = this.previous;
	      this.previous = this.model.attributeChanged(this.cell, this.previous);
	
	      return this;
	    }
	  }]);
	
	  return AttributeChange;
	}(_Change3.default);
	
	exports.default = AttributeChange;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _detector = __webpack_require__(15);
	
	var _detector2 = _interopRequireDefault(_detector);
	
	var _Events2 = __webpack_require__(52);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Model = __webpack_require__(53);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _Cell = __webpack_require__(20);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _LinkView = __webpack_require__(59);
	
	var _LinkView2 = _interopRequireDefault(_LinkView);
	
	var _NodeView = __webpack_require__(29);
	
	var _NodeView2 = _interopRequireDefault(_NodeView);
	
	var _RootChange = __webpack_require__(43);
	
	var _RootChange2 = _interopRequireDefault(_RootChange);
	
	var _ChildChange = __webpack_require__(44);
	
	var _ChildChange2 = _interopRequireDefault(_ChildChange);
	
	var _SizeChange = __webpack_require__(54);
	
	var _SizeChange2 = _interopRequireDefault(_SizeChange);
	
	var _VisibleChange = __webpack_require__(45);
	
	var _VisibleChange2 = _interopRequireDefault(_VisibleChange);
	
	var _PositionChange = __webpack_require__(55);
	
	var _PositionChange2 = _interopRequireDefault(_PositionChange);
	
	var _RotationChange = __webpack_require__(56);
	
	var _RotationChange2 = _interopRequireDefault(_RotationChange);
	
	var _TerminalChange = __webpack_require__(46);
	
	var _TerminalChange2 = _interopRequireDefault(_TerminalChange);
	
	var _GeometryChange = __webpack_require__(47);
	
	var _GeometryChange2 = _interopRequireDefault(_GeometryChange);
	
	var _CollapseChange = __webpack_require__(48);
	
	var _CollapseChange2 = _interopRequireDefault(_CollapseChange);
	
	var _AttributeChange = __webpack_require__(57);
	
	var _AttributeChange2 = _interopRequireDefault(_AttributeChange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// const
	// -----
	var win = window;
	var doc = win.document;
	
	var classNames = {
	  wrap: 'pane-wrap',
	  stage: 'pane-stage',
	  svg: 'pane-svg',
	  viewport: 'pane-viewport',
	  htmlPane: 'pane-html',
	  rawPane: 'pane-raw'
	};
	
	// the default options for paper
	var defaultOptions = {
	  // container: null,
	  // model: null,
	  width: '100%',
	  height: '100%',
	  tx: 0,
	  ty: 0,
	  sx: 1,
	  sy: 1,
	  gridSize: 1,
	
	  // number of mouseMove events after which the
	  // pointerClick event will be still triggered.
	  clickThreshold: 0,
	  isValidEvent: null,
	  eventDelegate: null
	};
	
	var idCounter = 0;
	
	// Paper
	// -----
	
	var Paper = function (_Events) {
	  _inherits(Paper, _Events);
	
	  function Paper(options) {
	    _classCallCheck(this, Paper);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).call(this));
	
	    idCounter += 1;
	
	    _this.id = 'paper-' + idCounter;
	
	    // You should call `init` manually when `options` is empty.
	    // That's useful when you want to listen life-cycle events.
	    if (options) {
	      _this.init(options);
	    }
	    return _this;
	  }
	
	  // events
	  // ------
	  //  - paper:configure
	  //  - paper:ensureElements
	  //  - paper:createPanes
	  //  - paper:setup
	  //  - paper:init
	  //  - paper:destroy
	  //  - paper:resize
	  //  - paper:scale
	  //  - paper:translate
	
	  _createClass(Paper, [{
	    key: 'configure',
	    value: function configure(options) {
	
	      this.options = utils.merge({}, defaultOptions, options);
	      this.trigger('paper:configure', this.options);
	
	      return this;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      this.configure(options);
	      this.container = options.container;
	
	      if (!this.container) {
	        throw new Error('Initialize error: invalid container');
	      }
	
	      options = this.options;
	
	      this.ensureElement().createPanes().setup().resize(options.width, options.height).translate(options.tx, options.ty).scale(options.sx, options.sy).setModel(options.model);
	
	      this.trigger('paper:init', this.options);
	
	      return this;
	    }
	  }, {
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      this.wrap = utils.createElement('div');
	      this.stage = utils.createElement('div');
	      this.svg = utils.createSvgDocument();
	      this.viewport = utils.createSvgElement('g');
	
	      utils.addClass(this.wrap, classNames.wrap);
	      utils.addClass(this.stage, classNames.stage);
	      utils.addClass(this.svg, classNames.svg);
	      utils.addClass(this.viewport, classNames.viewport);
	
	      this.svg.appendChild(this.viewport);
	      this.stage.appendChild(this.svg);
	      this.wrap.appendChild(this.stage);
	      this.container.appendChild(this.wrap);
	
	      this.trigger('paper:ensureElements');
	
	      return this;
	    }
	  }, {
	    key: 'getContainer',
	    value: function getContainer() {
	
	      return this.container;
	    }
	  }, {
	    key: 'getWrap',
	    value: function getWrap() {
	
	      return this.wrap;
	    }
	  }, {
	    key: 'getStage',
	    value: function getStage() {
	
	      return this.stage;
	    }
	  }, {
	    key: 'getSvg',
	    value: function getSvg() {
	
	      return this.svg;
	    }
	  }, {
	    key: 'getViewport',
	    value: function getViewport() {
	
	      return this.viewport;
	    }
	  }, {
	    key: 'getEventDelegate',
	    value: function getEventDelegate() {
	
	      var eventDelegate = this.eventDelegate;
	
	      if (!eventDelegate) {
	
	        eventDelegate = this.options.eventDelegate;
	
	        if (utils.isFunction(eventDelegate)) {
	          eventDelegate = eventDelegate.call(this);
	        }
	
	        this.eventDelegate = eventDelegate || this.getWrap();
	      }
	
	      return this.eventDelegate;
	    }
	  }, {
	    key: 'createPanes',
	    value: function createPanes() {
	
	      var viewport = this.viewport;
	      var stage = this.stage;
	
	      this.backgroundPane = viewport.appendChild(utils.createSvgElement('g'));
	
	      // container of links
	      this.linkPane = viewport.appendChild(utils.createSvgElement('g'));
	
	      // container of nodes
	      this.drawPane = viewport.appendChild(utils.createSvgElement('g'));
	
	      // layer above the drawing pane, for controllers and handlers
	      this.controlPane = viewport.appendChild(utils.createSvgElement('g'));
	
	      // layer above the drawing pane and controller pane, for decorators
	      this.decoratePane = viewport.appendChild(utils.createSvgElement('g'));
	
	      // html pane for hold html element, with scale and translation
	      this.htmlPane = stage.appendChild(utils.createElement('div'));
	
	      utils.addClass(this.htmlPane, classNames.htmlPane);
	
	      // whithout scale and translation
	      this.rawPane = stage.appendChild(utils.createElement('div'));
	
	      utils.addClass(this.rawPane, classNames.rawPane);
	
	      this.trigger('paper:createPanes');
	
	      return this;
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	
	      var delegate = this.getEventDelegate();
	
	      utils.addEventListener(delegate, 'contextmenu', this.onContextMenu.bind(this));
	      utils.addEventListener(delegate, 'dblclick', this.onDblClick.bind(this));
	      utils.addEventListener(delegate, 'click', this.onClick.bind(this));
	      utils.addEventListener(delegate, 'mouseenter', '.pane-cell', this.onCellMouseEnter.bind(this));
	      utils.addEventListener(delegate, 'mouseleave', '.pane-cell', this.onCellMouseLeave.bind(this));
	      utils.addEventListener(delegate, 'mouseover', '.pane-cell', this.onCellMouseOver.bind(this));
	      utils.addEventListener(delegate, 'mouseout', '.pane-cell', this.onCellMouseOut.bind(this));
	
	      // Chrome in windows8: `'ontouchstart' in document.documentElement` return `true`
	
	      // if (detector.IS_TOUCH) {
	      //   utils.addEventListener(delegate, 'touchstart', this.onPointerDown.bind(this));
	      // } else {
	      utils.addEventListener(delegate, 'mousedown', this.onPointerDown.bind(this));
	      // }
	
	      // Hold the value when mouse has been moved: when mouse moved,
	      // no click event will be triggered.
	      this.mouseMoved = 0;
	
	      // Disables built-in pan and zoom in IE10 and later
	      if (_detector2.default.IS_POINTER) {
	        this.container.style.msTouchAction = 'none';
	      }
	
	      this.trigger('paper:setup');
	
	      return this;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel() {
	
	      return this.model;
	    }
	  }, {
	    key: 'setModel',
	    value: function setModel() {
	      var model = arguments.length <= 0 || arguments[0] === undefined ? new _Model2.default() : arguments[0];
	
	
	      // one model can be used in different papers
	
	      this.model = model;
	      this.model.on('change', this.handleChanges, this);
	
	      this.reValidate();
	
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      this.trigger('paper:destroy');
	
	      utils.removeElement(this.wrap);
	
	      if (_detector2.default.IS_POINTER) {
	        this.container.style.msTouchAction = '';
	      }
	
	      var model = this.getModel();
	      if (model && !model.destroyed) {
	        model.destroy();
	      }
	
	      utils.destroy(this);
	    }
	  }, {
	    key: 'registerHandlers',
	    value: function registerHandlers(handlers) {
	
	      handlers = utils.isArray(handlers) ? handlers : [handlers];
	
	      this.handlers = this.handlers || [];
	      this.handlerByName = this.handlerByName || {};
	
	      utils.forEach(handlers, function (handler) {
	        if (this.handlerByName[handler.name]) {
	          throw new Error('handler with name "' + handler.name + '" is already registered');
	        }
	        // handler = utils.isFunction(handler) ? new handler(that) : handler;
	        this.handlers.push(handler);
	        this.handlerByName[handler.name] = handler;
	      }, this);
	
	      return this;
	    }
	
	    // transform
	    // ---------
	
	  }, {
	    key: 'resize',
	    value: function resize(width, height, relative) {
	
	      if (!utils.isNil(width) && !utils.isNil(height)) {
	
	        var isPercent = utils.isPercentage(width);
	        if (isPercent) {
	          width = utils.toFloat(width, true) * this.container.clientWidth;
	        }
	
	        isPercent = utils.isPercentage(height);
	        if (isPercent) {
	          height = utils.toFloat(height, true) * this.container.clientHeight;
	        }
	
	        if (relative) {
	          width += utils.isNil(this.width) ? 0 : this.width;
	          height += utils.isNil(this.height) ? 0 : this.height;
	        }
	
	        width = Math.round(width);
	        height = Math.round(height);
	
	        (0, _vector2.default)(this.svg).attr({
	          width: width,
	          height: height
	        });
	
	        utils.setStyle(this.stage, {
	          width: width + 'px',
	          height: height + 'px'
	        });
	
	        this.width = width;
	        this.height = height;
	
	        this.trigger('paper:resize', width, height);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'resizeTo',
	    value: function resizeTo(width, height) {
	
	      return this.resize(width, height, false);
	    }
	  }, {
	    key: 'resizeBy',
	    value: function resizeBy(width, height) {
	
	      return this.resize(width, height, true);
	    }
	  }, {
	    key: 'translate',
	    value: function translate(tx, ty, relative) {
	
	      if (!utils.isNil(tx) && !utils.isNil(ty)) {
	
	        if (relative) {
	          tx += utils.isNil(this.tx) || 0;
	          ty += utils.isNil(this.ty) || 0;
	        }
	
	        (0, _vector2.default)(this.viewport).translate(tx, ty);
	
	        // translate htmlPane
	        utils.setStyle(this.htmlPane, {
	          top: ty + 'px',
	          left: tx + 'px'
	        });
	
	        this.tx = tx;
	        this.ty = ty;
	
	        this.trigger('paper:translate', tx, ty);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'translateTo',
	    value: function translateTo(x, y) {
	
	      return this.translate(x, y, false);
	    }
	  }, {
	    key: 'translateBy',
	    value: function translateBy(x, y) {
	
	      return this.translate(x, y, true);
	    }
	  }, {
	    key: 'scale',
	    value: function scale(sx, sy) {
	      var ox = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	      var oy = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	
	      sy = sy || sx;
	
	      if (sx && sy) {
	
	        var vViewport = (0, _vector2.default)(this.viewport);
	
	        // remove previous transform so that the new scale is not affected
	        // by previous scales, especially the old translate() does not
	        // affect the new translate if an origin is specified.
	        vViewport.attr('transform', '');
	
	        var oldTx = this.tx;
	        var oldTy = this.ty;
	
	        if (ox || oy || oldTx || oldTy) {
	
	          var newTx = oldTx - ox * (sx - 1);
	          var newTy = oldTy - oy * (sy - 1);
	          this.translateTo(newTx, newTy);
	        }
	
	        vViewport.scale(sx, sy);
	        // scale htmlPane
	        utils.setStyle(this.htmlPane, {
	          transform: 'translate3d(0, 0, 0) scale3d(' + sx + ',' + sy + ', 1)'
	        });
	
	        this.sx = sx;
	        this.sy = sy;
	
	        this.trigger('paper:scale', sx, sy, ox, oy);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getContentBBox',
	    value: function getContentBBox(withoutTransformations) {
	
	      if (withoutTransformations) {
	
	        return (0, _vector2.default)(this.viewport).getBBox(true, this.svg);
	      }
	
	      var rect = this.viewport.getBoundingClientRect();
	
	      // Using Screen CTM was the only way to get the real viewport
	      // bounding box working in both Google Chrome and Firefox.
	      var screenCTM = this.viewport.getScreenCTM();
	
	      // for non-default origin we need to take the
	      // viewport translation into account
	      var viewportCTM = this.viewport.getCTM();
	
	      return _Rect2.default.fromRect({
	        x: rect.left - screenCTM.e + viewportCTM.e,
	        y: rect.top - screenCTM.f + viewportCTM.f,
	        width: rect.width,
	        height: rect.height
	      });
	    }
	  }, {
	    key: 'fitToContent',
	    value: function fitToContent(frameWidth, frameHeight, padding, options) {
	
	      // Expand/shrink the paper to fit the content. Snap the width/height to
	      // the grid defined in `gridWidth`, `gridHeight`. `padding` adds to the
	      // resulting width/height of the paper.
	
	      if (utils.isObject(frameWidth)) {
	
	        options = frameWidth;
	        padding = options.padding || 0;
	        frameWidth = options.frameWidth || 1;
	        frameHeight = options.frameHeight || 1;
	      } else {
	
	        options = options || {};
	        padding = padding || 0;
	        frameWidth = frameWidth || 1;
	        frameHeight = frameHeight || 1;
	      }
	
	      padding = utils.normalizeSides(padding);
	
	      // get the content boundary
	      var cBounds = this.getContentBBox(true);
	
	      cBounds.x *= this.sx;
	      cBounds.y *= this.sy;
	      cBounds.width *= this.sx;
	      cBounds.height *= this.sy;
	
	      var width = utils.snapToGrid(cBounds.width + cBounds.x || 1, frameWidth, 'ceil');
	      var height = utils.snapToGrid(cBounds.height + cBounds.y || 1, frameHeight, 'ceil');
	
	      var tx = this.tx;
	      var ty = this.ty;
	
	      function needTranslate(val) {
	
	        return !options.allowNewOrigin || options.allowNewOrigin === 'any' || options.allowNewOrigin === 'negative' && val < 0 || options.allowNewOrigin === 'positive' && val >= 0;
	      }
	
	      if (needTranslate(cBounds.x)) {
	
	        tx = Math.ceil(-cBounds.x / frameWidth) * frameWidth;
	        tx += padding.left;
	        width += tx;
	      }
	
	      if (needTranslate(cBounds.y)) {
	
	        ty = Math.ceil(-cBounds.y / frameHeight) * frameHeight;
	        ty += padding.top;
	        height += ty;
	      }
	
	      width += padding.right;
	      height += padding.bottom;
	
	      width = utils.clamp(width, options.minWidth || 0, options.maxWidth || Number.MAX_VALUE);
	      height = utils.clamp(height, options.minHeight || 0, options.maxHeight || Number.MAX_VALUE);
	
	      var sizeChanged = width !== this.width || height !== this.height;
	      var originChanged = tx !== this.tx || ty !== this.ty;
	
	      if (originChanged) {
	        this.translate(tx, ty);
	      }
	
	      if (sizeChanged) {
	        this.resize(width, height);
	      }
	
	      return sizeChanged || originChanged;
	    }
	  }, {
	    key: 'scaleContentToFit',
	    value: function scaleContentToFit() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      var contentBBox = this.getContentBBox(true);
	
	      if (!contentBBox.width || !contentBBox.height) {
	        return this;
	      }
	
	      options = utils.merge({
	        padding: 0,
	        minScale: null,
	        maxScale: null,
	        scaleGrid: null,
	        preserveAspectRatio: true
	      }, // minScaleX,
	      // minScaleY,
	      // maxScaleX,
	      // maxScaleY,
	      // fittingBBox
	      options);
	
	      var padding = utils.normalizeSides(options.padding);
	      var fittingBBox = options.fittingBBox;
	
	      if (!fittingBBox) {
	        fittingBBox = {
	          x: this.tx,
	          y: this.ty,
	          width: this.width,
	          height: this.height
	        };
	      }
	
	      fittingBBox = _Rect2.default.fromRect(fittingBBox).moveAndExpand({
	        x: padding.left,
	        y: padding.top,
	        width: -(padding.left + padding.right),
	        height: -(padding.top + padding.bottom)
	      });
	
	      var sx = fittingBBox.width / contentBBox.width;
	      var sy = fittingBBox.height / contentBBox.height;
	
	      // snap scale to a grid
	      var scaleGrid = options.scaleGrid;
	      if (scaleGrid) {
	        sx = utils.snapToGrid(sx, scaleGrid, 'floor');
	        sy = utils.snapToGrid(sy, scaleGrid, 'floor');
	      }
	
	      // scale min/max boundaries
	      var minScaleX = options.minScaleX || options.minScale;
	      var maxScaleX = options.maxScaleX || options.maxScale;
	      var minScaleY = options.minScaleY || options.minScale;
	      var maxScaleY = options.maxScaleY || options.maxScale;
	
	      sx = utils.clamp(sx, minScaleX, maxScaleX);
	      sy = utils.clamp(sy, minScaleY, maxScaleY);
	
	      if (options.preserveAspectRatio) {
	        sx = sy = Math.min(sx, sy);
	      }
	
	      this.scale(sx, sy);
	
	      contentBBox = this.getContentBBox(true);
	
	      var tx = fittingBBox.x - contentBBox.x;
	      var ty = fittingBBox.y - contentBBox.y;
	
	      this.translateTo(tx, ty);
	
	      return this;
	    }
	
	    // validate
	    // --------
	
	  }, {
	    key: 'reValidate',
	    value: function reValidate() {
	
	      return this.invalidate().validate();
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var cell = arguments.length <= 0 || arguments[0] === undefined ? this.model.getRoot() : arguments[0];
	      var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      var recurse = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	
	      this.removeView(cell);
	
	      if (recurse && (force || cell !== this.currentRoot)) {
	        cell.eachChild(function (child) {
	          this.clear(child, force, recurse);
	        }, this);
	      } else {
	        this.invalidate(cell, true, true);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'invalidate',
	    value: function invalidate() {
	      var cell = arguments.length <= 0 || arguments[0] === undefined ? this.model.getRoot() : arguments[0];
	      var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var includeLink = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	
	      var view = this.getView(cell);
	      if (view) {
	        view.invalid = true;
	      }
	
	      if (!cell.invalidating) {
	
	        cell.invalidating = true;
	
	        if (recurse) {
	          cell.eachChild(function (child) {
	            this.invalidate(child, recurse, includeLink);
	          }, this);
	        }
	
	        if (includeLink) {
	          cell.eachLink(function (link) {
	            this.invalidate(link, recurse, includeLink);
	          }, this);
	        }
	
	        cell.invalidating = false;
	      }
	
	      return this;
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {
	      var cell = arguments.length <= 0 || arguments[0] === undefined ? this.model.getRoot() : arguments[0];
	
	
	      return this.validateCell(cell).validateView(cell);
	    }
	  }, {
	    key: 'validateCell',
	    value: function validateCell(cell) {
	      var visible = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	
	      // create or remove view for cell
	      if (cell) {
	
	        visible = visible && cell.isVisible();
	
	        var view = this.getView(cell, visible);
	        if (view && !visible) {
	          this.removeView(cell, false, false);
	        }
	
	        cell.eachChild(function (child) {
	          this.validateCell(child, visible);
	        }, this);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'validateView',
	    value: function validateView(cell) {
	      var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	
	      if (cell) {
	
	        var view = this.getView(cell);
	        if (view) {
	          if (view.invalid) {
	            // geometry shoule be updated after the parent be validated
	            // for child node may has relative geometry
	            this.validateView(cell.getParent(), false).updateNodeGeometry(cell).renderView(cell);
	
	            view.invalid = false;
	          }
	        }
	
	        if (recurse) {
	          cell.eachChild(function (child) {
	            this.validateView(child, recurse);
	          }, this);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateNodeGeometry',
	    value: function updateNodeGeometry(node) {
	      // update the node's geometry
	      if (node && node.isNode()) {
	        this.updateNodeSize(node).updateNodePosition(node).updateNodeRotation(node);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateNodeSize',
	    value: function updateNodeSize(node) {
	
	      // only update the node's size
	      if (node && node.isNode()) {
	
	        var size = node.metadata.size || {};
	        var width = !utils.isUndefined(size.width) ? size.width : 1;
	        var height = !utils.isUndefined(size.height) ? size.height : 1;
	
	        var parent = node.parent;
	
	        if (size.relative && parent && parent.isNode()) {
	
	          var parentSize = parent.size;
	          var isPercent = utils.isPercentage(width);
	
	          width = utils.fixNumber(width, isPercent, 0);
	
	          if (isPercent || width > 0 && width < 1) {
	            width *= parentSize.width;
	          } else {
	            width += parentSize.width;
	          }
	
	          isPercent = utils.isPercentage(height);
	          height = utils.fixNumber(height, isPercent, 0);
	
	          if (isPercent || height > 0 && height < 1) {
	            height *= parentSize.height;
	          } else {
	            height += parentSize.height;
	          }
	        } else {
	          width = utils.fixNumber(width, false, 1);
	          height = utils.fixNumber(height, false, 1);
	        }
	
	        // update size attribute of node
	        node.size = {
	          width: Math.max(width, 1),
	          height: Math.max(height, 1)
	        };
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateNodePosition',
	    value: function updateNodePosition(node) {
	
	      if (node && node.isNode()) {
	
	        var pos = node.metadata.position || {};
	        var x = !utils.isUndefined(pos.x) ? pos.x : 0;
	        var y = !utils.isUndefined(pos.y) ? pos.y : 0;
	
	        var parent = node.parent;
	
	        if (pos.relative && parent && parent.isNode()) {
	
	          var parentPos = parent.position;
	          var parentSize = parent.size;
	
	          var isPercent = utils.isPercentage(x);
	
	          x = utils.fixNumber(x, isPercent, 0);
	
	          if (isPercent || x > -1 && x < 1) {
	            x = parentPos.x + parentSize.width * x;
	          } else {
	            x += parentPos.x;
	          }
	
	          isPercent = utils.isPercentage(y);
	
	          y = utils.fixNumber(y, isPercent, 0);
	
	          if (isPercent || y > -1 && y < 1) {
	            y = parentPos.y + parentSize.height * y;
	          } else {
	            y += parentPos.y;
	          }
	        } else {
	          x = utils.fixNumber(x, false, 0);
	          y = utils.fixNumber(y, false, 0);
	        }
	
	        node.position = this.snapToGrid({
	          x: x,
	          y: y
	        }, true);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateNodeRotation',
	    value: function updateNodeRotation(node) {
	
	      if (node && node.isNode()) {
	
	        var raw = node.metadata.rotation || {};
	        var angle = utils.fixNumber(raw.angle, false, 0);
	        var parent = node.parent;
	
	        if (raw.inherited && parent && parent.isNode() && parent.rotation !== 0) {
	
	          // update node's position
	          var pos = node.position;
	          var size = node.size;
	          var center = new _Point2.default(pos.x + size.width / 2, pos.y + size.height / 2);
	
	          var parentPos = parent.position;
	          var parentSize = parent.size;
	
	          var centerX = parentPos.x + parentSize.width / 2;
	          var centerY = parentPos.y + parentSize.height / 2;
	          var parentCenter = new _Point2.default(centerX, centerY);
	
	          // angle is according to the clockwise
	          center.rotate(parentCenter, -parent.rotation);
	
	          // move the node to the new position
	          pos.x = center.x - size.width / 2;
	          pos.y = center.y - size.height / 2;
	
	          angle += parent.rotation;
	        }
	
	        node.rotation = angle;
	      }
	
	      return this;
	    }
	
	    // view
	    // ----
	
	  }, {
	    key: 'getView',
	    value: function getView(cell, create) {
	
	      if (cell) {
	        var view = this.getViewById(cell.id);
	        if (!view && create && cell.isVisible()) {
	          view = this.createView(cell);
	        }
	
	        return view;
	      }
	      return null;
	    }
	  }, {
	    key: 'getViewById',
	    value: function getViewById(cellId) {
	
	      return this.views ? this.views[cellId] : null;
	    }
	  }, {
	    key: 'eachView',
	    value: function eachView(iterator, context) {
	
	      return utils.forIn(this.views, iterator, context);
	    }
	  }, {
	    key: 'getTerminalView',
	    value: function getTerminalView(link, isSource) {
	
	      var terminal = this.model.getTerminal(link, isSource);
	
	      return terminal && terminal.node ? this.getView(terminal.node) : null;
	    }
	  }, {
	    key: 'createView',
	    value: function createView(cell) {
	
	      if (cell) {
	
	        var View = cell.metadata.view;
	        if (!View) {
	          View = cell.isLink() ? _LinkView2.default : cell.isNode() ? _NodeView2.default : null;
	        }
	
	        if (View) {
	
	          var view = new View(this, cell);
	
	          if (!this.views) {
	            this.views = {};
	          }
	
	          this.views[cell.id] = view;
	
	          return view;
	        }
	      }
	
	      return null;
	    }
	  }, {
	    key: 'removeView',
	    value: function removeView(cell) {
	      var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var includeLink = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	
	      if (cell) {
	
	        if (recurse) {
	          cell.eachChild(function (child) {
	            this.removeView(child, recurse, includeLink);
	          }, this);
	        }
	
	        if (includeLink) {
	          cell.eachLink(function (link) {
	            this.removeView(link, recurse, includeLink);
	          }, this);
	        }
	
	        var view = this.getView(cell);
	        if (view) {
	          delete this.views[cell.id];
	          view.destroy();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'renderView',
	    value: function renderView(cell) {
	
	      var view = this.getView(cell);
	      if (view) {
	        if (cell.isLink() && !this.canRenderLink(cell)) {
	          this.removeView(cell);
	        } else {
	          view.render();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'canRenderLink',
	    value: function canRenderLink(link) {
	
	      var sourceNode = link.getTerminalNode(true);
	      var targetNode = link.getTerminalNode(false);
	
	      // unVisible or do not in the paper(view is null)
	      if (sourceNode && (!sourceNode.isVisible() || !this.getView(sourceNode))) {
	        return false;
	      }
	
	      if (targetNode && (!targetNode.isVisible() || !this.getView(targetNode))) {
	        return false;
	      }
	
	      return (sourceNode || link.getTerminalPoint(true)) && (targetNode || link.getTerminalPoint(false));
	    }
	  }, {
	    key: 'findViewByElem',
	    value: function findViewByElem(elem) {
	
	      if (this.views) {
	
	        elem = utils.isString(elem) ? this.svg.querySelector(elem) : elem;
	
	        while (elem && elem !== this.svg && elem !== document) {
	
	          var cellId = elem.cellId;
	          if (cellId) {
	            return this.views[cellId];
	          }
	
	          elem = elem.parentNode;
	        }
	      }
	
	      return null;
	    }
	  }, {
	    key: 'findViewByCell',
	    value: function findViewByCell(cell) {
	
	      return utils.isString(cell) ? this.getViewById(cell) : this.getView(cell);
	    }
	  }, {
	    key: 'findViewByPoint',
	    value: function findViewByPoint() /* point */{}
	  }, {
	    key: 'findViewsInArea',
	    value: function findViewsInArea() /* rect */{}
	
	    // changes
	    // -------
	
	  }, {
	    key: 'handleChanges',
	    value: function handleChanges(changes) {
	
	      utils.forEach(changes, function (change) {
	        this.distributeChange(change);
	      }, this);
	
	      this.validate();
	
	      return this;
	    }
	  }, {
	    key: 'distributeChange',
	    value: function distributeChange(change) {
	
	      if (change instanceof _RootChange2.default) {
	
	        this.onRootChanged(change);
	      } else if (change instanceof _ChildChange2.default) {
	
	        this.onChildChanged(change);
	      } else if (change instanceof _VisibleChange2.default) {
	
	        this.onVisibleChange(change);
	      } else if (change instanceof _TerminalChange2.default) {
	
	        this.onTerminalChange(change);
	      } else if (change instanceof _SizeChange2.default) {
	
	        this.onSizeChange(change);
	      } else if (change instanceof _PositionChange2.default) {
	
	        this.onPositionChange(change);
	      } else if (change instanceof _RotationChange2.default) {
	
	        this.onRotationChange(change);
	      } else if (change instanceof _AttributeChange2.default) {
	
	        this.onAttributeChange(change);
	      } else if (change instanceof _GeometryChange2.default) {
	
	        this.onGeometryChange(change);
	      } else if (change instanceof _CollapseChange2.default) {
	
	        this.onCollapseChange(change);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'onRootChanged',
	    value: function onRootChanged(change) {
	
	      if (change.viewport) {
	        this.invalidate(change.viewport, true, true);
	      }
	
	      if (change.previous) {
	        this.removeView(change.previous, true, true);
	      }
	    }
	  }, {
	    key: 'onChildChanged',
	    value: function onChildChanged(change) {
	
	      var newParent = change.parent;
	      var oldParent = change.previous;
	
	      this.invalidate(change.child, true, true);
	
	      if (!newParent) {
	        this.removeView(change.child, true, true);
	      }
	
	      if (newParent !== oldParent) {
	        newParent && this.invalidate(newParent, false, false);
	        oldParent && this.invalidate(oldParent, false, false);
	      }
	    }
	  }, {
	    key: 'onVisibleChange',
	    value: function onVisibleChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	  }, {
	    key: 'onTerminalChange',
	    value: function onTerminalChange(change) {
	
	      this.invalidate(change.link, true, true);
	    }
	  }, {
	    key: 'onSizeChange',
	    value: function onSizeChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	  }, {
	    key: 'onPositionChange',
	    value: function onPositionChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	  }, {
	    key: 'onRotationChange',
	    value: function onRotationChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	  }, {
	    key: 'onAttributeChange',
	    value: function onAttributeChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	  }, {
	    key: 'onGeometryChange',
	    value: function onGeometryChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	  }, {
	    key: 'onCollapseChange',
	    value: function onCollapseChange(change) {
	
	      this.invalidate(change.cell, true, true);
	    }
	
	    // router
	    // ------
	
	  }, {
	    key: 'getRouter',
	    value: function getRouter(name) {
	
	      return this.constructor.getRouter(name);
	    }
	
	    // connector
	    // ---------
	
	  }, {
	    key: 'getConnector',
	    value: function getConnector(name) {
	
	      return this.constructor.getConnector(name);
	    }
	
	    // marker
	    // ------
	
	  }, {
	    key: 'getMarker',
	    value: function getMarker(name) {
	
	      return this.constructor.getMarker(name);
	    }
	
	    // events
	    // ------
	
	  }, {
	    key: 'isValidEvent',
	    value: function isValidEvent(e, view) {
	
	      // If the event is interesting, returns `true`.
	      // Otherwise, return `false`.
	
	      var cell = view && view.cell;
	
	      if (this.options.isValidEvent && !this.options.isValidEvent(e, cell, view)) {
	        return false;
	      }
	
	      if (cell && cell instanceof _Cell2.default) {
	        return true;
	      }
	
	      var target = e.target;
	      var delegate = this.eventDelegate;
	
	      if (delegate === target || utils.containsElement(delegate, target)) {
	        return true;
	      }
	
	      return false;
	    }
	  }, {
	    key: 'onContextMenu',
	    value: function onContextMenu(e) {
	
	      e = utils.normalizeEvent(e);
	
	      var view = this.findViewByElem(e.target);
	
	      if (!this.isValidEvent(e, view)) {
	        return;
	      }
	
	      var localPoint = this.snapToGrid({
	        x: e.clientX,
	        y: e.clientY
	      });
	
	      if (view) {
	        this.trigger('cell:contextmenu', view.cell, view, e, localPoint.x, localPoint.y);
	      } else {
	        this.trigger('blank:contextmenu', e, localPoint.x, localPoint.y);
	      }
	    }
	  }, {
	    key: 'onDblClick',
	    value: function onDblClick(e) {
	
	      e.preventDefault();
	      e = utils.normalizeEvent(e);
	
	      var view = this.findViewByElem(e.target);
	
	      if (!this.isValidEvent(e, view)) {
	        return;
	      }
	
	      var localPoint = this.snapToGrid({
	        x: e.clientX,
	        y: e.clientY
	      });
	
	      if (view) {
	        this.trigger('cell:dblclick', view.cell, view, e, localPoint.x, localPoint.y);
	      } else {
	        this.trigger('blank:dblclick', e, localPoint.x, localPoint.y);
	      }
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(e) {
	
	      if (this.mouseMoved <= this.options.clickThreshold) {
	
	        e = utils.normalizeEvent(e);
	
	        var view = this.findViewByElem(e.target);
	
	        if (!this.isValidEvent(e, view)) {
	          return;
	        }
	
	        var localPoint = this.snapToGrid({
	          x: e.clientX,
	          y: e.clientY
	        });
	
	        if (view) {
	          this.trigger('cell:click', view.cell, view, e, localPoint.x, localPoint.y);
	        } else {
	          this.trigger('blank:click', e, localPoint.x, localPoint.y);
	        }
	      }
	    }
	  }, {
	    key: 'onCellMouseOver',
	    value: function onCellMouseOver(e) {
	
	      this.onCellHover(e, 'mouseover');
	    }
	  }, {
	    key: 'onCellMouseOut',
	    value: function onCellMouseOut(e) {
	
	      this.onCellHover(e, 'mouseout');
	    }
	  }, {
	    key: 'onCellMouseEnter',
	    value: function onCellMouseEnter(e) {
	
	      this.onCellHover(e, 'mouseenter');
	    }
	  }, {
	    key: 'onCellMouseLeave',
	    value: function onCellMouseLeave(e) {
	
	      this.onCellHover(e, 'mouseleave');
	    }
	  }, {
	    key: 'onCellHover',
	    value: function onCellHover(e, eventName) {
	
	      e = utils.normalizeEvent(e);
	
	      var view = this.findViewByElem(e.target);
	
	      if (!this.isValidEvent(e, view)) {
	        return;
	      }
	
	      var localPoint = this.snapToGrid({
	        x: e.clientX,
	        y: e.clientY
	      });
	
	      this.trigger('cell:' + eventName, view.cell, view, e, localPoint.x, localPoint.y);
	    }
	  }, {
	    key: 'onPointerDown',
	    value: function onPointerDown(e) {
	
	      e = utils.normalizeEvent(e);
	
	      if (!utils.isLeftMouseButton(e)) {
	        return;
	      }
	
	      var view = this.findViewByElem(e.target);
	      var cell = view && view.cell;
	
	      if (!this.isValidEvent(e, view)) {
	        return;
	      }
	
	      this.triggerPointDown(e, cell, view);
	    }
	  }, {
	    key: 'triggerPointDown',
	    value: function triggerPointDown(e, cell, view) {
	
	      e.preventDefault();
	
	      this.mouseMoved = 0;
	
	      var localPoint = this.snapToGrid({
	        x: e.clientX,
	        y: e.clientY
	      });
	
	      if (view) {
	        this.sourceView = view;
	        this.trigger('cell:pointerDown', cell, view, e, localPoint.x, localPoint.y);
	      } else {
	        this.trigger('blank:pointerDown', e, localPoint.x, localPoint.y);
	      }
	
	      this.onMouseMoveHandler = this.onMouseMoveHandler || this.onPointerMove.bind(this);
	      this.onMouseUpHandler = this.onMouseUpHandler || this.onPointerUp.bind(this);
	
	      // Chrome in windows8: `'ontouchstart' in document.documentElement` return `true`
	      // if (detector.IS_TOUCH) {
	      //   utils.addEventListener(doc, 'touchmove', this.onMouseMoveHandler);
	      //   utils.addEventListener(doc, 'touchend', this.onMouseUpHandler);
	      // } else {
	      utils.addEventListener(doc, 'mousemove', this.onMouseMoveHandler);
	      utils.addEventListener(doc, 'mouseup', this.onMouseUpHandler);
	      // }
	    }
	  }, {
	    key: 'onPointerMove',
	    value: function onPointerMove(e) {
	
	      e.preventDefault();
	      e = utils.normalizeEvent(e);
	
	      var localPoint = this.snapToGrid({
	        x: e.clientX,
	        y: e.clientY
	      });
	
	      var sourceView = this.sourceView;
	      if (sourceView) {
	        this.mouseMoved += 1;
	        this.trigger('cell:pointerMove', sourceView.cell, sourceView, e, localPoint.x, localPoint.y);
	      } else {
	        this.trigger('blank:pointerMove', e, localPoint.x, localPoint.y);
	      }
	    }
	  }, {
	    key: 'onPointerUp',
	    value: function onPointerUp(e) {
	
	      e = utils.normalizeEvent(e);
	
	      var localPoint = this.snapToGrid({
	        x: e.clientX,
	        y: e.clientY
	      });
	
	      var sourceView = this.sourceView;
	      if (sourceView) {
	        this.trigger('cell:pointerUp', sourceView.cell, sourceView, e, localPoint.x, localPoint.y);
	        this.sourceView = null;
	      } else {
	        this.trigger('blank:pointerUp', e, localPoint.x, localPoint.y);
	      }
	
	      // Chrome in windows8: `'ontouchstart' in document.documentElement` return `true`
	      // if (detector.IS_TOUCH) {
	      //   utils.removeEventListener(doc, 'touchmove', this.onMouseMoveHandler);
	      //   utils.removeEventListener(doc, 'touchend', this.onMouseUpHandler);
	      // } else {
	      utils.removeEventListener(doc, 'mousemove', this.onMouseMoveHandler);
	      utils.removeEventListener(doc, 'mouseup', this.onMouseUpHandler);
	      // }
	    }
	
	    // utils
	    // -----
	
	  }, {
	    key: 'snapToGrid',
	    value: function snapToGrid(point, isLocal) {
	
	      // Convert global coordinates to the local ones of the `drawPane`.
	      // Otherwise, improper transformation would be applied when the
	      // drawPane gets transformed (scaled/rotated).
	      var gridSize = this.options.gridSize || 1;
	
	      if (!isLocal) {
	        point = (0, _vector2.default)(this.drawPane).toLocalPoint(point.x, point.y);
	      }
	
	      return {
	        x: utils.snapToGrid(point.x, gridSize),
	        y: utils.snapToGrid(point.y, gridSize)
	      };
	    }
	  }, {
	    key: 'toLocalPoint',
	    value: function toLocalPoint(point) {
	
	      var offset = this.getRootOffset();
	      var svgPoint = this.svg.createSVGPoint();
	
	      svgPoint.x = point.x + offset.left;
	      svgPoint.y = point.y + offset.top;
	
	      var result = svgPoint.matrixTransform(this.drawPane.getCTM().inverse());
	
	      return _Point2.default.fromPoint(result);
	    }
	  }, {
	    key: 'toClientPoint',
	    value: function toClientPoint(point) {
	
	      var offset = this.getRootOffset();
	      var svgPoint = this.svg.createSVGPoint();
	
	      svgPoint.x = point.x;
	      svgPoint.y = point.y;
	
	      var result = svgPoint.matrixTransform(this.drawPane.getCTM());
	
	      result.x -= offset.left;
	      result.y -= offset.top;
	
	      return _Point2.default.fromPoint(result);
	    }
	  }, {
	    key: 'getRootOffset',
	    value: function getRootOffset() {
	
	      // This is a hack for Firefox! If there wasn't a fake (non-visible)
	      // rectangle covering the whole SVG area, the `$(paper.svg).offset()`
	      // used below won't work.
	      var fakeRect = void 0;
	      if (_detector2.default.IS_FF) {
	
	        fakeRect = (0, _vector2.default)('rect', {
	          width: this.options.width,
	          height: this.options.height,
	          x: 0,
	          y: 0,
	          opacity: 0
	        });
	
	        this.svg.appendChild(fakeRect.node);
	      }
	
	      var paperOffset = utils.getOffset(this.svg);
	
	      if (_detector2.default.IS_FF) {
	        fakeRect.remove();
	      }
	
	      var body = doc.body;
	      var docElem = doc.documentElement;
	      var scrollTop = body.scrollTop || docElem.scrollTop;
	      var scrollLeft = body.scrollLeft || docElem.scrollLeft;
	
	      return {
	        left: scrollLeft - paperOffset.left,
	        top: scrollTop - paperOffset.top
	      };
	    }
	  }, {
	    key: 'toLocalRect',
	    value: function toLocalRect(rect) {
	
	      var origin = this.toLocalPoint({
	        x: rect.x,
	        y: rect.y
	      });
	      var corner = this.toLocalPoint({
	        x: rect.x + rect.width,
	        y: rect.y + rect.height
	      });
	
	      return new _Rect2.default(origin.x, origin.y, corner.x - origin.x, corner.y - origin.y);
	    }
	  }], [{
	    key: 'registRouter',
	    value: function registRouter(name, fn) {
	
	      if (!this.router) {
	        this.router = {};
	      }
	
	      this.router[name] = fn;
	
	      return this;
	    }
	  }, {
	    key: 'getRouter',
	    value: function getRouter(name) {
	
	      return this.router ? this.router[name] : null;
	    }
	  }, {
	    key: 'registConnector',
	    value: function registConnector(name, fn) {
	
	      if (!this.connectors) {
	        this.connectors = {};
	      }
	
	      this.connectors[name] = fn;
	
	      return this;
	    }
	  }, {
	    key: 'getConnector',
	    value: function getConnector(name) {
	
	      return this.connectors ? this.connectors[name] : null;
	    }
	  }, {
	    key: 'registMarker',
	    value: function registMarker(name, fn) {
	
	      if (!this.markers) {
	        this.markers = {};
	      }
	
	      this.markers[name] = fn;
	
	      return this;
	    }
	  }, {
	    key: 'getMarker',
	    value: function getMarker(name) {
	
	      return this.markers ? this.markers[name] : null;
	    }
	  }]);
	
	  return Paper;
	}(_Events3.default);
	
	// exports
	// -------
	
	exports.default = Paper;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _VectorView2 = __webpack_require__(30);
	
	var _VectorView3 = _interopRequireDefault(_VectorView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LinkView = function (_VectorView) {
	  _inherits(LinkView, _VectorView);
	
	  function LinkView() {
	    _classCallCheck(this, LinkView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkView).apply(this, arguments));
	  }
	
	  _createClass(LinkView, [{
	    key: 'render',
	    value: function render() {
	
	      this.vel.empty();
	
	      this.renderMarkup().update();
	
	      return this;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	
	      this.cache = {};
	
	      return this.parseRouter().parseConnector().parseTerminal(true).parseTerminal(false).updateMarker().updateConnector().updateAttributes();
	    }
	  }, {
	    key: 'updateAttributes',
	    value: function updateAttributes(attrs) {
	      var _this2 = this;
	
	      utils.forIn(attrs || this.cell.attrs, function (attrMap, selector) {
	
	        var processed = [];
	
	        if (utils.isObject(attrMap.fill)) {
	          _this2.applyGradient(selector, 'fill', attrMap.fill);
	          processed.push('fill');
	        }
	
	        if (utils.isObject(attrMap.stroke)) {
	          _this2.applyGradient(selector, 'stroke', attrMap.stroke);
	          processed.push('stroke');
	        }
	
	        if (utils.isObject(attrMap.filter)) {
	          _this2.applyFilter(selector, attrMap.filter);
	          processed.push('filter');
	        }
	
	        // remove processed attributes from attrs
	        var normal = {};
	
	        utils.forIn(attrMap, function (value, key) {
	          if (!utils.contains(processed, key)) {
	            normal[key] = value;
	          }
	        });
	
	        _this2.applyAttr(selector, normal);
	      });
	
	      return this;
	    }
	  }, {
	    key: 'parseRouter',
	    value: function parseRouter() {
	
	      // convert vertices to router points
	      var link = this.cell;
	      var router = link.getRouter();
	      var vertices = utils.filter(link.vertices || [], function (p) {
	        return _Point2.default.isPointLike(p);
	      });
	
	      vertices = utils.map(vertices, function (p) {
	        return _Point2.default.fromPoint(p);
	      });
	
	      var parser = router.parse && utils.isFunction(router.parse) ? router.parse : router.name && this.paper.getRouter(router.name);
	
	      // parsed vertices
	      var routerPoints = parser && utils.isFunction(parser) ? parser.call(this, vertices, router.options || {}) : vertices;
	
	      this.cacheRouterPoints(routerPoints);
	
	      return this;
	    }
	  }, {
	    key: 'parseConnector',
	    value: function parseConnector() {
	
	      var link = this.cell;
	      var connector = link.getConnector();
	      var sourceMarker = link.getMarker(true);
	      var targetMarker = link.getMarker(false);
	
	      var connectorStrokeWidth = this.getStrokeWidth(connector.selector);
	      var sourceMarkerStrokeWidth = this.getStrokeWidth(sourceMarker.selector);
	      var targetMarkerStrokeWidth = this.getStrokeWidth(targetMarker.selector);
	
	      // update stroke width to marker options
	      var sourceMarkerOptions = sourceMarker.options;
	      if (!sourceMarkerOptions) {
	        sourceMarkerOptions = sourceMarker.options = {};
	      }
	
	      sourceMarkerOptions.connectorStrokeWidth = connectorStrokeWidth;
	      sourceMarkerOptions.markerStrokeWidth = sourceMarkerStrokeWidth;
	
	      var targetMarkerOptions = targetMarker.options;
	      if (!targetMarkerOptions) {
	        targetMarkerOptions = targetMarker.options = {};
	      }
	
	      targetMarkerOptions.connectorStrokeWidth = connectorStrokeWidth;
	      targetMarkerOptions.markerStrokeWidth = targetMarkerStrokeWidth;
	
	      // cache
	      this.cacheConnector(connector);
	      this.cacheMarker(sourceMarker, true);
	      this.cacheMarker(targetMarker, false);
	
	      return this;
	    }
	  }, {
	    key: 'parseTerminal',
	    value: function parseTerminal(isSource) {
	
	      var link = this.cell;
	      var point = link.getTerminalPoint(isSource);
	      var node = link.getTerminalNode(isSource);
	      var view = node && this.paper.getView(node);
	      var port = link.getTerminalPort(isSource);
	
	      this.cacheStaticConnPoint(point, isSource);
	      this.cacheTerminalView(view, isSource);
	      this.cacheTerminalPort(port, isSource);
	
	      return this;
	    }
	  }, {
	    key: 'updateMarker',
	    value: function updateMarker() {
	
	      return this.renderMarker(true).renderMarker(false).updateConnectionPoint(true).updateConnectionPoint(false).transformMarker(true).transformMarker(false).updateConnectionPointOnMarker(true).updateConnectionPointOnMarker(false);
	    }
	  }, {
	    key: 'updateConnector',
	    value: function updateConnector() {
	
	      var connector = this.fetchConnector();
	
	      var parser = connector.parse && utils.isFunction(connector.parse) ? connector.parse : connector.name && this.paper.getConnector(connector.name);
	
	      if (parser && utils.isFunction(parser)) {
	
	        var sourcePoint = this.getConnectionPoint(true);
	        var targetPoint = this.getConnectionPoint(false);
	        if (sourcePoint && targetPoint) {
	
	          var pathData = parser.call(this, sourcePoint, targetPoint, this.fetchRouterPoints(), connector.options || {});
	
	          this.applyAttr(connector.selector, { d: pathData });
	        } else {
	          this.vel.empty();
	        }
	      } else {
	        throw new Error('Unknown connector: "' + connector.name + '"');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'renderMarker',
	    value: function renderMarker(isSource) {
	
	      var marker = this.fetchMarker(isSource);
	      var vMarker = this.findOne(marker.selector);
	
	      if (marker && vMarker) {
	
	        var parser = marker.parse && utils.isFunction(marker.parse) ? marker.parse : marker.name && this.paper.getMarker(marker.name);
	
	        if (parser && utils.isFunction(parser)) {
	
	          var renderedMarker = parser(vMarker, marker.options);
	
	          // if return a new marker element, replace the old one
	          var newVel = renderedMarker.vel;
	          if (newVel) {
	
	            // replace
	            var elem = vMarker.node;
	            var parent = elem.parentNode;
	            var className = vMarker.getClassName();
	
	            parent.insertBefore(newVel.node, elem);
	            parent.removeChild(elem);
	            newVel.addClass(className);
	
	            vMarker = newVel;
	          }
	
	          this.cacheMarkerVel(vMarker, isSource);
	          this.cacheRenderedMarker(renderedMarker, isSource);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateConnectionPoint',
	    value: function updateConnectionPoint(isSource) {
	
	      var staticPoint = this.fetchStaticConnPoint(isSource);
	      if (!staticPoint) {
	        this.updateConnPointOnPort(isSource) || this.updateConnPointOnNode(isSource);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateConnPointOnPort',
	    value: function updateConnPointOnPort(isSource) {
	
	      var point = this.fetchConnPointOnPort(isSource);
	      if (!point) {
	
	        var view = this.fetchTerminalView(isSource);
	        var port = this.fetchTerminalPort(isSource);
	        if (port && view) {
	
	          if (view.getConnectionPointOnPort) {
	            point = view.getConnectionPointOnPort(port, isSource);
	          }
	
	          if (!point) {
	            var bbox = this.getPortBodyBBox(isSource);
	            if (bbox) {
	
	              var ref = this.getReferencePoint(bbox, isSource);
	              var geom = this.getPortBodyGeom(isSource) || bbox;
	
	              if (ref) {
	                point = geom.intersectionWithLineFromCenterToPoint(ref);
	              }
	
	              point = point || geom.getCenter();
	            }
	          }
	
	          this.cacheConnPointOnPort(point, isSource);
	        }
	      }
	
	      return point;
	    }
	  }, {
	    key: 'updateConnPointOnNode',
	    value: function updateConnPointOnNode(isSource) {
	
	      // find the connection point on the terminal
	
	      var point = this.fetchConnPointOnNode(isSource);
	      if (!point) {
	
	        var view = this.fetchTerminalView(isSource);
	        if (view) {
	
	          if (view.getConnectionPointOnBorder) {
	            point = view.getConnectionPointOnBorder();
	          }
	
	          if (!point) {
	
	            var bbox = this.getTerminalBBox(isSource);
	            if (bbox) {
	
	              var reference = this.getReferencePoint(bbox, isSource);
	              if (reference) {
	                point = bbox.intersectionWithLineFromCenterToPoint(reference);
	              }
	
	              point = point || bbox.getCenter();
	            }
	          }
	
	          this.cacheConnPointOnNode(point, isSource);
	        }
	      }
	
	      return point;
	    }
	  }, {
	    key: 'getStrokeWidth',
	    value: function getStrokeWidth(selector) {
	
	      var vel = this.findOne(selector);
	      if (vel && vel.node) {
	
	        var strokeWidth = utils.getComputedStyle(vel.node, 'stroke-width');
	
	        return strokeWidth && utils.toFloat(strokeWidth) || 0;
	      }
	
	      return 0;
	    }
	  }, {
	    key: 'getTerminalBBox',
	    value: function getTerminalBBox(isSource) {
	
	      var bbox = this.fetchTerminalBBox(isSource);
	      if (!bbox) {
	
	        var view = this.fetchTerminalView(isSource);
	        if (view) {
	          bbox = view.getStrokedBBox();
	          bbox = this.fixStrokedBBox(bbox, isSource);
	        }
	
	        // cache
	        this.cacheTerminalBBox(bbox, isSource);
	      }
	
	      return bbox;
	    }
	  }, {
	    key: 'fixStrokedBBox',
	    value: function fixStrokedBBox(bbox, isSource) {
	
	      if (bbox) {
	
	        var marker = this.fetchMarker(isSource);
	        var renderedMarker = this.fetchRenderedMarker(isSource);
	
	        if (marker && renderedMarker) {
	
	          var markerStrokeWidth = marker.options.markerStrokeWidth;
	          if (markerStrokeWidth) {
	
	            var rad = renderedMarker.rad || 0;
	            if (rad >= Math.PI / 4 || rad === 0) {
	              bbox.grow(markerStrokeWidth / 2);
	            } else {
	              bbox.grow(markerStrokeWidth / Math.sin(rad) / 2);
	            }
	          }
	        }
	      }
	
	      return bbox;
	    }
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint(bbox, isSource) {
	
	      // static point
	      var reference = this.fetchStaticConnPoint(isSource);
	
	      // vertices
	      if (!reference) {
	
	        var vertices = this.fetchRouterPoints();
	
	        reference = isSource ? vertices[0] : vertices[vertices.length - 1];
	      }
	
	      // port
	      if (!reference) {
	
	        var portBBox = this.getPortBodyBBox(!isSource);
	        if (portBBox) {
	          reference = portBBox.intersectionWithLineFromCenterToPoint(bbox.getCenter());
	          reference = reference || portBBox.getCenter();
	        }
	      }
	
	      // terminal
	      if (!reference) {
	
	        var terminalBBox = this.getTerminalBBox(!isSource);
	        if (terminalBBox) {
	          reference = terminalBBox.intersectionWithLineFromCenterToPoint(bbox.getCenter());
	          reference = reference || terminalBBox.getCenter();
	        }
	      }
	
	      return reference;
	    }
	  }, {
	    key: 'getPortBodyBBox',
	    value: function getPortBodyBBox(isSource) {
	
	      var bbox = this.fetchPortBodyBBox(isSource);
	      if (!bbox) {
	
	        var view = this.fetchTerminalView(isSource);
	        var port = this.fetchTerminalPort(isSource);
	        if (view && port) {
	
	          if (view.getPortBodyBBox) {
	            bbox = view.getPortBodyBBox(port, isSource);
	          }
	
	          if (bbox) {
	            bbox = this.fixStrokedBBox(bbox, isSource);
	            this.cachePortBodyBBox(bbox, isSource);
	          }
	        }
	      }
	
	      return bbox;
	    }
	  }, {
	    key: 'getPortBodyGeom',
	    value: function getPortBodyGeom(isSource) {
	
	      var geom = this.fetchPortBodyGeom(isSource);
	      if (!geom) {
	
	        var view = this.fetchTerminalView(isSource);
	        var port = this.fetchTerminalPort(isSource);
	        if (view && port) {
	
	          if (view.getPortBodyGeom) {
	            geom = view.getPortBodyGeom(port, isSource);
	          }
	
	          if (geom) {
	            geom = this.fixStrokedBBox(geom, isSource);
	            this.cachePortBodyGeom(geom, isSource);
	          }
	        }
	      }
	
	      return geom;
	    }
	  }, {
	    key: 'getConnectionPoint',
	    value: function getConnectionPoint(isSource) {
	
	      return this.fetchStaticConnPoint(isSource) || this.fetchConnPointOnMarker(isSource) || this.fetchConnPointOnPort(isSource) || this.fetchConnPointOnNode(isSource);
	    }
	  }, {
	    key: 'transformMarker',
	    value: function transformMarker(isSource, ref) {
	
	      var renderedMarker = this.fetchRenderedMarker(isSource);
	      if (renderedMarker) {
	
	        var pane = this.getPane();
	        var vertices = this.fetchRouterPoints();
	        var sourcePoint = this.getConnectionPoint(true);
	        var targetPoint = this.getConnectionPoint(false);
	
	        var position = isSource ? sourcePoint : targetPoint;
	        var reference = ref || isSource ? vertices[0] || targetPoint : vertices[vertices.length - 1] || sourcePoint;
	        // make the marker at the right position
	        var markerVel = this.fetchMarkerVel(isSource);
	
	        if (position && reference && markerVel) {
	          markerVel.translateAndAutoOrient(position, reference, pane);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateConnectionPointOnMarker',
	    value: function updateConnectionPointOnMarker(isSource) {
	
	      var markerVel = this.fetchMarkerVel(isSource);
	      var renderedMarker = this.fetchRenderedMarker(isSource);
	
	      if (markerVel && renderedMarker) {
	
	        var pane = this.getPane();
	        var point = renderedMarker.point;
	
	        var p = _vector2.default.createSVGPoint(point.x, point.y);
	
	        p = p.matrixTransform(markerVel.getTransformToElement(pane));
	
	        var connectionPoint = _Point2.default.fromPoint(p);
	
	        this.cacheConnPointOnMarker(connectionPoint, isSource);
	      }
	
	      return this;
	    }
	
	    // cache
	    // -----
	
	  }, {
	    key: 'cacheRouterPoints',
	    value: function cacheRouterPoints(points) {
	
	      this.cache.routerPoints = points;
	    }
	  }, {
	    key: 'fetchRouterPoints',
	    value: function fetchRouterPoints() {
	
	      return this.cache.routerPoints;
	    }
	  }, {
	    key: 'cacheConnector',
	    value: function cacheConnector(connector) {
	
	      this.cache.connector = connector;
	    }
	  }, {
	    key: 'fetchConnector',
	    value: function fetchConnector() {
	
	      return this.cache.connector;
	    }
	  }, {
	    key: 'cacheMarker',
	    value: function cacheMarker(marker, isSource) {
	
	      if (isSource) {
	        this.cache.sourceMarker = marker;
	      } else {
	        this.cache.targetMarker = marker;
	      }
	    }
	  }, {
	    key: 'fetchMarker',
	    value: function fetchMarker(isSource) {
	
	      return isSource ? this.cache.sourceMarker : this.cache.targetMarker;
	    }
	  }, {
	    key: 'cacheRenderedMarker',
	    value: function cacheRenderedMarker(renderedMarker, isSource) {
	
	      if (renderedMarker) {
	        if (isSource) {
	          this.cache.renderedSourceMarker = renderedMarker;
	        } else {
	          this.cache.renderedTargetMarker = renderedMarker;
	        }
	      }
	    }
	  }, {
	    key: 'fetchRenderedMarker',
	    value: function fetchRenderedMarker(isSource) {
	
	      return isSource ? this.cache.renderedSourceMarker : this.cache.renderedTargetMarker;
	    }
	  }, {
	    key: 'cacheMarkerVel',
	    value: function cacheMarkerVel(vel, isSource) {
	
	      if (vel) {
	        if (isSource) {
	          this.cache.sourceMarkerVel = vel;
	        } else {
	          this.cache.targetMarkerVel = vel;
	        }
	      }
	    }
	  }, {
	    key: 'fetchMarkerVel',
	    value: function fetchMarkerVel(isSource) {
	
	      return isSource ? this.cache.sourceMarkerVel : this.cache.targetMarkerVel;
	    }
	  }, {
	    key: 'cacheTerminalView',
	    value: function cacheTerminalView(view, isSource) {
	
	      if (view) {
	        if (isSource) {
	          this.cache.sourceView = view;
	        } else {
	          this.cache.targetView = view;
	        }
	      }
	    }
	  }, {
	    key: 'fetchTerminalView',
	    value: function fetchTerminalView(isSource) {
	
	      return isSource ? this.cache.sourceView : this.cache.targetView;
	    }
	  }, {
	    key: 'cacheTerminalPort',
	    value: function cacheTerminalPort(port, isSource) {
	
	      if (!utils.isNil(port)) {
	        if (isSource) {
	          this.cache.sourcePort = port;
	        } else {
	          this.cache.targetPort = port;
	        }
	      }
	    }
	  }, {
	    key: 'fetchTerminalPort',
	    value: function fetchTerminalPort(isSource) {
	
	      return isSource ? this.cache.sourcePort : this.cache.targetPort;
	    }
	  }, {
	    key: 'cacheStaticConnPoint',
	    value: function cacheStaticConnPoint(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.staticSourcePoint = point;
	        } else {
	          this.cache.staticTargetPoint = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchStaticConnPoint',
	    value: function fetchStaticConnPoint(isSource) {
	
	      return isSource ? this.cache.staticSourcePoint : this.cache.staticTargetPoint;
	    }
	  }, {
	    key: 'cacheConnPointOnMarker',
	    value: function cacheConnPointOnMarker(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.sourcePointOnMarker = point;
	        } else {
	          this.cache.targetPointOnMarker = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchConnPointOnMarker',
	    value: function fetchConnPointOnMarker(isSource) {
	
	      return isSource ? this.cache.sourcePointOnMarker : this.cache.targetPointOnMarker;
	    }
	  }, {
	    key: 'cacheConnPointOnPort',
	    value: function cacheConnPointOnPort(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.sourcePointOnPort = point;
	        } else {
	          this.cache.targetPointOnPort = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchConnPointOnPort',
	    value: function fetchConnPointOnPort(isSource) {
	
	      return isSource ? this.cache.sourcePointOnPort : this.cache.targetPointOnPort;
	    }
	  }, {
	    key: 'cacheConnPointOnNode',
	    value: function cacheConnPointOnNode(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.sourcePointOnTerminal = point;
	        } else {
	          this.cache.targetPointOnTerminal = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchConnPointOnNode',
	    value: function fetchConnPointOnNode(isSource) {
	
	      return isSource ? this.cache.sourcePointOnTerminal : this.cache.targetPointOnTerminal;
	    }
	  }, {
	    key: 'cacheTerminalBBox',
	    value: function cacheTerminalBBox(bbox, isSource) {
	
	      if (bbox) {
	        if (isSource) {
	          this.cache.sourceTerminalBBox = bbox;
	        } else {
	          this.cache.targetTerminalBBox = bbox;
	        }
	      }
	    }
	  }, {
	    key: 'fetchTerminalBBox',
	    value: function fetchTerminalBBox(isSource) {
	
	      return isSource ? this.cache.sourceTerminalBBox : this.cache.targetTerminalBBox;
	    }
	  }, {
	    key: 'cachePortBodyBBox',
	    value: function cachePortBodyBBox(bbox, isSource) {
	
	      if (bbox) {
	        if (isSource) {
	          this.cache.sourcePortBBox = bbox;
	        } else {
	          this.cache.targetPortBBox = bbox;
	        }
	      }
	    }
	  }, {
	    key: 'fetchPortBodyBBox',
	    value: function fetchPortBodyBBox(isSource) {
	
	      return isSource ? this.cache.sourcePortBBox : this.cache.targetPortBBox;
	    }
	  }, {
	    key: 'cachePortBodyGeom',
	    value: function cachePortBodyGeom(geom, isSource) {
	
	      if (geom) {
	        if (isSource) {
	          this.cache.sourcePortGeom = geom;
	        } else {
	          this.cache.targetPortGeom = geom;
	        }
	      }
	    }
	  }, {
	    key: 'fetchPortBodyGeom',
	    value: function fetchPortBodyGeom(isSource) {
	
	      return isSource ? this.cache.sourcePortGeom : this.cache.targetPortGeom;
	    }
	  }]);
	
	  return LinkView;
	}(_VectorView3.default);
	
	// exports
	// -------
	
	exports.default = LinkView;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Cell2 = __webpack_require__(20);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Link = function (_Cell) {
	  _inherits(Link, _Cell);
	
	  function Link(options) {
	    _classCallCheck(this, Link);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, options));
	
	    _this.vertices = _this.metadata.vertices || [];
	    return _this;
	  }
	
	  // static
	  // ------
	
	  _createClass(Link, [{
	    key: 'isLink',
	
	
	    // methods
	    // -------
	
	    value: function isLink() {
	
	      return true;
	    }
	  }, {
	    key: 'getRouter',
	    value: function getRouter() {
	
	      var router = this.metadata.router || {};
	
	      if (utils.isFunction(router)) {
	        router = { parse: router };
	      } else if (!utils.isObject(router)) {
	        router = { name: router };
	      }
	
	      return router;
	    }
	  }, {
	    key: 'getMarker',
	    value: function getMarker(isSource) {
	
	      var marker = isSource ? this.metadata.sourceMarker : this.metadata.targetMarker;
	
	      if (utils.isFunction(marker)) {
	        marker = { parse: marker };
	      } else if (!utils.isObject(marker)) {
	        marker = { name: marker };
	      }
	
	      marker.selector = isSource ? '.source-marker' : '.target-marker';
	
	      return marker;
	    }
	  }, {
	    key: 'getConnector',
	    value: function getConnector() {
	
	      var connector = this.metadata.connector || {};
	
	      if (utils.isFunction(connector)) {
	        connector = { parse: connector };
	      } else if (!utils.isObject(connector)) {
	        connector = { name: connector };
	      }
	
	      connector.selector = '.connector';
	
	      return connector;
	    }
	
	    // vertices
	    // --------
	
	  }, {
	    key: 'getVertices',
	    value: function getVertices() {
	
	      return this.vertices;
	    }
	  }, {
	    key: 'getVerticesCount',
	    value: function getVerticesCount() {
	
	      return this.vertices ? this.vertices.length : 0;
	    }
	  }, {
	    key: 'getVerticeAt',
	    value: function getVerticeAt(index) {
	
	      return this.vertices ? this.vertices[index] : null;
	    }
	  }, {
	    key: 'indexOfVertice',
	    value: function indexOfVertice(point) {
	
	      if (point && _Point2.default.isPointLike(point)) {
	
	        for (var i = 0, l = this.getVerticesCount(); i < l; i += 1) {
	
	          var vertice = this.getVerticeAt(i);
	
	          if (point.x === vertice.x && point.y === vertice.y) {
	            return i;
	          }
	        }
	      }
	
	      return -1;
	    }
	  }, {
	    key: 'eachVertice',
	    value: function eachVertice(iterator, context) {
	
	      return utils.forEach(this.vertices, iterator, context);
	    }
	  }, {
	    key: 'filterVertice',
	    value: function filterVertice(iterator, context) {
	
	      return utils.filter(this.vertices, iterator, context);
	    }
	  }, {
	    key: 'insertVertice',
	    value: function insertVertice(points, index) {
	
	      var length = this.getVerticesCount();
	
	      index = utils.fixIndex(index, length);
	
	      if (!utils.isArray(points)) {
	        points = [points];
	      }
	
	      if (index === length) {
	        var _vertices;
	
	        (_vertices = this.vertices).push.apply(_vertices, _toConsumableArray(points));
	      } else {
	        this.vertices.splice(index, 0, points);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeVertice',
	    value: function removeVertice(point) {
	
	      var index = this.indexOfVertice(point);
	      if (index >= 0) {
	        this.removeVerticeAt(index);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeVerticeAt',
	    value: function removeVerticeAt(index) {
	
	      var vertice = this.getVerticeAt(index);
	      if (vertice) {
	        this.vertices.splice(index, 1);
	      }
	      return vertice;
	    }
	  }, {
	    key: 'clearVertices',
	    value: function clearVertices() {
	
	      this.vertices = [];
	
	      return this;
	    }
	
	    // common
	    // ------
	
	  }, {
	    key: 'clone',
	    value: function clone(options, withData) {
	
	      var cloned = _get(Object.getPrototypeOf(Link.prototype), 'clone', this).call(this, options, withData);
	
	      cloned.vertices = [];
	
	      utils.forEach(this.vertices, function (point) {
	        if (_Point2.default.isPointLike(point)) {
	          cloned.vertices.push({ x: point.x, y: point.y });
	        }
	      });
	
	      return cloned;
	    }
	  }], [{
	    key: 'isLink',
	    value: function isLink(link) {
	      return link && link instanceof Link;
	    }
	  }]);
	
	  return Link;
	}(_Cell3.default);
	
	Link.setDefaults({
	  tagName: 'g',
	  markup: '<path class="connector"/><path class="source-marker"/><path class="target-marker"/>',
	  classNames: 'pane-cell pane-link', // pane-cell for event handler
	  pane: 'linkPane',
	  data: null, // related data(for business logic)
	  view: null, // specify the constructor of the view
	  router: null,
	  connector: 'sharp',
	  sourceMarker: null,
	  targetMarker: null,
	  attrs: {
	    '.connector': {
	      'fill': 'none',
	      'stroke': '#000',
	      'stroke-width': 1
	    },
	    '.source-marker': {
	      'fill': '#000',
	      'stroke': '#000',
	      'stroke-width': 1
	    },
	    '.target-marker': {
	      'fill': '#000',
	      'stroke': '#000',
	      'stroke-width': 1
	    }
	  }
	});
	
	// exports
	// -------
	
	exports.default = Link;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Events2 = __webpack_require__(52);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Handler = function (_Events) {
	  _inherits(Handler, _Events);
	
	  function Handler(paper) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Handler);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Handler).call(this));
	
	    _this.paper = paper;
	    _this.disabled = false;
	
	    _this.configure(options).init();
	    return _this;
	  }
	
	  _createClass(Handler, [{
	    key: 'configure',
	    value: function configure() {
	      return this;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      utils.destroy(this);
	    }
	  }, {
	    key: 'getPaper',
	    value: function getPaper() {
	
	      return this.paper;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel() {
	
	      return this.paper && this.paper.model;
	    }
	  }, {
	    key: 'isDisabled',
	    value: function isDisabled() {
	
	      return this.disabled === true;
	    }
	  }, {
	    key: 'isEnabled',
	    value: function isEnabled() {
	
	      return this.disabled === false;
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	
	      this.disabled = true;
	      this.trigger('handler:disabled');
	
	      return this;
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	
	      this.disabled = false;
	      this.trigger('handler:enabled');
	
	      return this;
	    }
	  }, {
	    key: 'invoke',
	    value: function invoke(callback, context) {
	
	      if (!this.isDisabled()) {
	        callback.call(context);
	      }
	
	      return this;
	    }
	  }]);
	
	  return Handler;
	}(_Events3.default);
	
	// exports
	// -------
	
	exports.default = Handler;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Handler2 = __webpack_require__(61);
	
	var _Handler3 = _interopRequireDefault(_Handler2);
	
	var _Vertex = __webpack_require__(63);
	
	var _Vertex2 = _interopRequireDefault(_Vertex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SelectHandler = function (_Handler) {
	  _inherits(SelectHandler, _Handler);
	
	  function SelectHandler() {
	    _classCallCheck(this, SelectHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectHandler).apply(this, arguments));
	  }
	
	  _createClass(SelectHandler, [{
	    key: 'init',
	    value: function init() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      var that = this;
	
	      this.name = options.name || 'select';
	
	      var paper = this.getPaper();
	      var model = this.getModel();
	
	      this.previewVel = (0, _vector2.default)('rect', {
	        'fill': 'none',
	        'stroke-dasharray': '3px, 3px',
	        'stroke': 'black'
	      });
	      this.previewRect = this.previewVel.node;
	
	      paper.controlPane.appendChild(this.previewRect);
	
	      this.hidePreview();
	
	      paper.selection = [];
	
	      this.origin = {
	        x: 0,
	        y: 0
	      };
	
	      paper.on('cell:pointerDown', function (cell, view, e) {
	
	        that.invoke(function () {
	          that.origin = {
	            x: e.x,
	            y: e.y
	          };
	          that.selectCell(cell, utils.hasModifierKey(e));
	        });
	      });
	
	      paper.on('cell:pointerMove', function (cell, view, e) {
	        that.invoke(function () {
	          that.showPreview().redrawPreview(e);
	        });
	      });
	
	      paper.on('cell:pointerUp', function (cell, view, e) {
	        that.invoke(function () {
	          var previousPosition = that.origin;
	          if (e.x !== previousPosition.x || e.y !== previousPosition.y) {
	
	            model.beginUpdate();
	
	            utils.forEach(paper.selection, function (c) {
	              var position = c.metadata.position;
	              model.setGeometry(c, {
	                position: {
	                  x: position.x + (e.x - previousPosition.x),
	                  y: position.y + (e.y - previousPosition.y),
	                  relative: position.relative
	                }
	              });
	            });
	
	            model.endUpdate();
	
	            utils.forEach(paper.selection, function (c) {
	              c.vertexController.redraw();
	            });
	          }
	          that.hidePreview();
	        });
	      });
	
	      paper.on('blank:pointerDown', function (e) {
	        that.invoke(function () {
	          if (!utils.hasModifierKey(e)) {
	            that.clearSelection();
	          }
	        });
	      });
	
	      return this;
	    }
	  }, {
	    key: 'hidePreview',
	    value: function hidePreview() {
	
	      this.previewVel.hide();
	
	      return this;
	    }
	  }, {
	    key: 'showPreview',
	    value: function showPreview() {
	
	      this.previewVel.show();
	      return this;
	    }
	  }, {
	    key: 'redrawPreview',
	    value: function redrawPreview(position) {
	      var _this2 = this;
	
	      var paper = this.getPaper();
	      var previewVel = this.previewVel;
	      var selection = paper.selection;
	
	      if (selection.length) {
	        (function () {
	
	          var minP = {
	            x: Number.MAX_VALUE,
	            y: Number.MAX_VALUE
	          };
	          var maxP = {
	            x: 0,
	            y: 0
	          };
	
	          utils.forEach(selection, function (cell) {
	            var view = paper.getView(cell);
	            var bbox = view.vel.getBBox();
	            if (bbox.x < minP.x) {
	              minP.x = bbox.x;
	            }
	            if (bbox.y < minP.y) {
	              minP.y = bbox.y;
	            }
	            if (bbox.x + bbox.width > maxP.x) {
	              maxP.x = bbox.x + bbox.width;
	            }
	            if (bbox.y + bbox.height > maxP.y) {
	              maxP.y = bbox.y + bbox.height;
	            }
	          });
	
	          var previousPosition = _this2.origin;
	
	          previewVel.attr({
	            x: minP.x + (position.x - previousPosition.x),
	            y: minP.y + (position.y - previousPosition.y),
	            width: maxP.x - minP.x,
	            height: maxP.y - minP.y
	          });
	        })();
	      }
	
	      return this;
	    }
	  }, {
	    key: '_selectCell',
	    value: function _selectCell(cell) {
	
	      var paper = this.getPaper();
	
	      cell.vertexController = new _Vertex2.default(paper, {
	        cell: cell
	      });
	      cell.selected = true;
	      paper.selection.push(cell);
	      return this;
	    }
	  }, {
	    key: '_unselectCell',
	    value: function _unselectCell(cell) {
	
	      var paper = this.getPaper();
	      var selection = paper.selection;
	
	      if (utils.contains(selection, cell)) {
	        paper.selection.splice(utils.indexOf(selection, cell), 1);
	      }
	
	      cell.vertexController.destroy();
	      cell.selected = false;
	
	      return this;
	    }
	  }, {
	    key: 'selectCell',
	    value: function selectCell(cell, multi) {
	
	      if (!multi) {
	        this.clearSelection();
	      } else {
	        return cell.selected ? this._unselectCell(cell) : this._selectCell(cell);
	      }
	
	      if (cell.selected) {
	        return this;
	      }
	
	      this.clearSelection();
	      this._selectCell(cell);
	
	      return this;
	    }
	  }, {
	    key: 'clearSelection',
	    value: function clearSelection() {
	
	      utils.forEach(this.paper.selection, function (cell) {
	        cell.vertexController.destroy();
	        cell.selected = false;
	      });
	
	      this.paper.selection = [];
	
	      return this;
	    }
	  }]);
	
	  return SelectHandler;
	}(_Handler3.default);
	
	// exports
	// -------
	
	exports.default = SelectHandler;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _detector = __webpack_require__(15);
	
	var _detector2 = _interopRequireDefault(_detector);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Controller2 = __webpack_require__(64);
	
	var _Controller3 = _interopRequireDefault(_Controller2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO listen to cell's change event to redraw
	
	var win = window;
	var doc = win.document;
	
	var defaults = {
	  boundsAttr: {
	    'fill': 'none',
	    'stroke': '#0f0',
	    'stroke-dasharray': '3px, 3px'
	  },
	  rotaterOffset: -12,
	  rotaterAttr: {
	    rx: 5,
	    ry: 5,
	    fill: '#0f0',
	    stroke: 'black',
	    style: 'cursor:crosshair;'
	  },
	  resizerAttr: {
	    height: 6,
	    width: 6,
	    fill: '#0f0',
	    stroke: 'black'
	  }
	};
	
	var RESIZER_NAMES = ['nw-resize', 'n-resize', 'ne-resize', 'e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize'];
	
	var VertexController = function (_Controller) {
	  _inherits(VertexController, _Controller);
	
	  function VertexController() {
	    _classCallCheck(this, VertexController);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VertexController).apply(this, arguments));
	  }
	
	  _createClass(VertexController, [{
	    key: 'init',
	    value: function init(options) {
	
	      this.options = utils.merge({}, defaults, options);
	
	      var vel = (0, _vector2.default)('g', {
	        class: 'vertex-bounds'
	      });
	
	      this.cell = options.cell;
	      this.vel = vel;
	      this.elem = vel.node;
	      this.paper.controlPane.appendChild(this.elem);
	
	      this.redraw();
	
	      return this;
	    }
	  }, {
	    key: 'redraw',
	    value: function redraw() {
	      var that = this;
	      var cell = that.cell;
	
	      that.moveTo(cell.position).rotate().setSize(cell.size).drawBounds().drawRotater().drawResizers();
	
	      this.bindEvents();
	
	      return this;
	    }
	  }, {
	    key: 'moveTo',
	    value: function moveTo(pos) {
	
	      this.vel.translate(pos.x, pos.y);
	      this.position = pos;
	
	      return this;
	    }
	  }, {
	    key: 'setSize',
	    value: function setSize(size) {
	
	      this.size = size;
	
	      return this;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(rotation, cx, cy) {
	
	      var cell = this.cell;
	
	      cx = utils.isNumeric(cx) ? cx : cell.size.width / 2;
	      cy = utils.isNumeric(cy) ? cy : cell.size.height / 2;
	      rotation = utils.isNumeric(rotation) ? rotation : cell.rotation;
	
	      this.vel.rotate(rotation, cx, cy);
	      this.rotation = rotation;
	
	      return this;
	    }
	  }, {
	    key: 'drawBounds',
	    value: function drawBounds() {
	
	      var attrs = utils.extend({}, this.options.boundsAttr, this.size);
	      if (this.boundsVel) {
	        this.boundsVel.attr(attrs);
	      } else {
	        this.boundsVel = (0, _vector2.default)('rect', attrs);
	        this.vel.append(this.boundsVel);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'drawRotater',
	    value: function drawRotater() {
	
	      if (!this.rotaterVel) {
	        this.rotaterVel = (0, _vector2.default)('ellipse', this.options.rotaterAttr);
	        this.vel.append(this.rotaterVel);
	      }
	
	      this.rotaterVel.translate(this.size.width / 2, this.options.rotaterOffset);
	
	      return this;
	    }
	  }, {
	    key: 'drawResizers',
	    value: function drawResizers() {
	
	      var options = this.options;
	
	      if (!this.resizers) {
	        this.resizers = [];
	        utils.forEach(RESIZER_NAMES, function () {
	          this.createResizer();
	        }, this);
	      }
	
	      // TODO change class and cursor style according to cell rotate angle
	      var resizers = this.resizers;
	      var rx = options.resizerAttr.width / 2;
	      var ry = options.resizerAttr.height / 2;
	      var h = this.size.height;
	      var w = this.size.width;
	      resizers[0].translate(-rx, -ry);
	      resizers[1].translate(-rx + w / 2, -ry);
	      resizers[2].translate(-rx + w, -ry);
	      resizers[3].translate(-rx + w, -ry + h / 2);
	      resizers[4].translate(-rx + w, -ry + h);
	      resizers[5].translate(-rx + w / 2, -ry + h);
	      resizers[6].translate(-rx, -ry + h);
	      resizers[7].translate(-rx, -ry + h / 2);
	
	      this.cacheResizerBBox();
	      this.adjustResizers();
	
	      return this;
	    }
	  }, {
	    key: 'cacheResizerBBox',
	    value: function cacheResizerBBox() {
	
	      utils.forEach(this.resizers, function (resizer) {
	        if (!resizer.hidden) {
	          resizer.cachedBBox = resizer.getBBox();
	        }
	      });
	      return this;
	    }
	  }, {
	    key: 'adjustResizers',
	    value: function adjustResizers() {
	      var cell = this.cell;
	
	      var STEP_ANGLE = 45;
	      var rotation = utils.normalizeAngle(cell.rotation);
	      var offset = Math.floor(rotation / STEP_ANGLE);
	      var length = RESIZER_NAMES.length;
	
	      utils.forEach(this.resizers, function (resizer, i) {
	        var name = RESIZER_NAMES[(i + offset) % length];
	        resizer.attr({
	          class: 'resizer ' + name
	        });
	        resizer.css({
	          cursor: name
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'createResizer',
	    value: function createResizer() {
	      var that = this;
	
	      var resizerVel = (0, _vector2.default)('rect', that.options.resizerAttr);
	      that.resizers.push(resizerVel);
	      that.vel.append(resizerVel);
	      return that;
	    }
	  }, {
	    key: 'hideRotater',
	    value: function hideRotater() {
	
	      this.rotaterVel.hide();
	
	      return this;
	    }
	  }, {
	    key: 'showRotater',
	    value: function showRotater() {
	
	      this.rotaterVel.show();
	      return this;
	    }
	  }, {
	    key: 'showResizers',
	    value: function showResizers() {
	
	      utils.forEach(this.resizers, function (resizer) {
	        resizer.show();
	      });
	      return this;
	    }
	  }, {
	    key: 'hideResizers',
	    value: function hideResizers(exceptNode) {
	
	      this.cacheResizerBBox();
	      utils.forEach(this.resizers, function (resizer) {
	        if (resizer.node !== exceptNode) {
	          resizer.hide();
	        }
	      });
	
	      return this;
	    }
	  }, {
	    key: 'resetEvents',
	    value: function resetEvents(e) {
	
	      this.isRotating = false;
	      this.isResizing = false;
	      this.eventTarget = null;
	
	      if (e && e.target) {
	        this.eventTarget = e.target;
	        this.isRotating = e.target === this.rotaterVel.node;
	        this.isResizing = utils.hasClass(e.target, 'resizer');
	        this.oldEventPosition = {
	          x: e.x,
	          y: e.y
	        };
	      }
	      if (this.isRotating) {
	        this.hideResizers();
	      } else {
	        this.showResizers();
	      }
	      if (this.isResizing) {
	        this.hideRotater();
	        this.hideResizers(e.target);
	      } else {
	        this.showRotater();
	      }
	
	      return this;
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var elem = this.elem;
	      this.resetEvents();
	
	      var onPointerDown = this.onPointerDown.bind(this);
	      var onPointerMove = this.onPointerMove.bind(this);
	      var onPointerUp = this.onPointerUp.bind(this);
	      if (_detector2.default.IS_TOUCH) {
	        utils.addEventListener(elem, 'touchstart', onPointerDown);
	        utils.addEventListener(doc, 'touchmove', onPointerMove);
	        utils.addEventListener(doc, 'touchend', onPointerUp);
	      } else {
	        utils.addEventListener(elem, 'mousedown', onPointerDown);
	        utils.addEventListener(doc, 'mousemove', onPointerMove);
	        utils.addEventListener(doc, 'mouseup', onPointerUp);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'onPointerDown',
	    value: function onPointerDown(e) {
	
	      e.stopPropagation();
	
	      this.resetEvents(e);
	
	      return this;
	    }
	  }, {
	    key: 'onPointerMove',
	    value: function onPointerMove(e) {
	      var that = this;
	      // let paper = that.paper;
	
	      if (that.isRotating) {
	        e.stopPropagation();
	        var dx = that.position.x + that.size.width / 2 - e.x;
	        var dy = that.position.y + that.size.height / 2 - e.y;
	
	        var alpha = dx !== 0 ? Math.atan(dy / dx) * 180 / Math.PI + 90 : dy < 0 ? 180 : 0;
	        if (dx > 0) {
	          alpha -= 180;
	        }
	        that.rotate(alpha);
	      }
	      if (that.isResizing) {
	        (function () {
	          e.stopPropagation();
	          var oldPos = that.oldEventPosition;
	          var newPos = {
	            x: e.x,
	            y: e.y
	          };
	          var eventTarget = that.eventTarget;
	          var currentResizerIndex = 0;
	          var isRotationResizer = false;
	          var isAntiRotationResizer = false;
	          utils.some(that.resizers, function (resizer, i) {
	            if (resizer.node === eventTarget) {
	              currentResizerIndex = i;
	              return true;
	            }
	            return false;
	          });
	          var oppositeResizerIndex = (currentResizerIndex - 4 + 8) % 8;
	          if (currentResizerIndex % 2 !== 0) {
	            if (currentResizerIndex === 1 || currentResizerIndex === 5) {
	              isRotationResizer = true;
	            }
	            if (currentResizerIndex === 3 || currentResizerIndex === 7) {
	              isAntiRotationResizer = true;
	            }
	            currentResizerIndex -= 1;
	            oppositeResizerIndex -= 1;
	          }
	          var edgePoint = that.resizers[oppositeResizerIndex].cachedBBox.getCenter();
	          var movingEdgePoint = that.resizers[currentResizerIndex].getBBox().getCenter();
	          var dx = 0;
	          var dy = 0;
	          if (isRotationResizer) {
	            dx = 0; // TODO
	            dy = 0; // TODO
	          } else if (isAntiRotationResizer) {
	              dx = 0; // TODO
	              dy = 0; // TODO
	            } else {
	                dx = newPos.x - oldPos.x;
	                dy = newPos.y - oldPos.y;
	              }
	          var newRect = _Rect2.default.fromVerticesAndRotation(edgePoint, {
	            x: movingEdgePoint.x + dx,
	            y: movingEdgePoint.y + dy
	          }, that.rotation);
	          // let newCenter = newRect.getCenter();
	
	          that.moveTo({
	            x: newRect.x,
	            y: newRect.y
	          }).setSize({
	            height: newRect.height,
	            width: newRect.width
	          }).drawBounds().drawResizers().rotate(that.rotation /* , newCenter.x, newCenter.y */);
	
	          that.oldEventPosition = newPos;
	        })();
	      }
	      return that;
	    }
	  }, {
	    key: 'onPointerUp',
	    value: function onPointerUp(e) {
	      var that = this;
	
	      if (that.isResizing || that.isRotating) {
	        e.stopPropagation();
	        var model = that.model;
	        // let cell = that.cell;
	        model.beginUpdate();
	        if (that.isRotating) {
	          model.setGeometry(that.cell, {
	            rotation: {
	              angle: that.rotation
	            }
	          });
	        }
	        if (that.isResizing) {
	          model.setGeometry(that.cell, {
	            position: {
	              x: that.position.x,
	              y: that.position.y
	            },
	            rotation: {
	              angle: that.rotation
	            },
	            size: {
	              width: that.size.width,
	              height: that.size.height
	            }
	          });
	        }
	        model.endUpdate();
	        that.redraw();
	        that.resetEvents();
	      }
	      return that;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      this.boundsVel.remove();
	      this.rotaterVel.remove();
	
	      utils.forEach(this.resizers, function (vel) {
	        vel.remove();
	      });
	
	      this.vel.remove();
	
	      utils.destroy(this);
	    }
	  }]);
	
	  return VertexController;
	}(_Controller3.default);
	
	// exports
	// -------
	
	exports.default = VertexController;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Events2 = __webpack_require__(52);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Controller = function (_Events) {
	  _inherits(Controller, _Events);
	
	  function Controller(paper) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Controller);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).call(this));
	
	    _this.paper = paper;
	    _this.model = paper.model;
	
	    _this.init(options);
	    _this.on('controller:initalized');
	    return _this;
	  }
	
	  _createClass(Controller, [{
	    key: 'init',
	    value: function init() {
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }]);
	
	  return Controller;
	}(_Events3.default);
	
	// exports
	// -------
	
	exports.default = Controller;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Link = __webpack_require__(60);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	var _Handler2 = __webpack_require__(61);
	
	var _Handler3 = _interopRequireDefault(_Handler2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ConnectionHandler = function (_Handler) {
	  _inherits(ConnectionHandler, _Handler);
	
	  function ConnectionHandler() {
	    _classCallCheck(this, ConnectionHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionHandler).apply(this, arguments));
	  }
	
	  _createClass(ConnectionHandler, [{
	    key: 'init',
	    value: function init() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      var that = this;
	      var paper = this.getPaper();
	      var model = this.getModel();
	
	      this.name = options.name || 'connection';
	
	      this.sourceCellView = null;
	      this.targetCellView = null;
	      this.sourcePort = null;
	      this.targetPort = null;
	
	      this.connecting = false;
	      this.previewingLink = null;
	
	      paper.on('cell:mouseOver', function (cell, view) {
	        if (that.sourceCellView !== view) {
	          if (that.connecting) {
	            // 加校验
	            that.setTargetCellView(view);
	          } else {
	            // 加校验
	            that.setSourceCellView(view);
	          }
	        }
	      });
	
	      paper.on('cell:mouseOut', function (cell, view, e) {
	        if (that.connecting) {
	          if (that.targetCellView === view && that._isOut(view, e.toElement)) {
	            that.setTargetCellView(null);
	          }
	        } else {
	          if (that.sourceCellView === view && that._isOut(view, e.toElement)) {
	            that.setSourceCellView(null);
	          }
	        }
	      });
	
	      utils.addEventListener(paper.decoratePane, 'mouseout', '.port-decorator.out', function (e) {
	        if (!that.connecting && !utils.hasClass(e.toElement, 'port-decorator-layer')) {
	          that.setSourceCellView(null);
	        }
	      });
	
	      utils.addEventListener(paper.decoratePane, 'mousedown', '.port-decorator.out', function (e) {
	        that.connecting = true;
	        var decoratorNode = e.delegateTarget;
	        that.sourcePort = decoratorNode.cellView.findPortByElem(decoratorNode.portBody);
	        that._drawInPortDecorators();
	      });
	
	      utils.addEventListener(paper.container, 'mousemove', function (e) {
	        if (that.connecting) {
	          if (that.previewingLink) {
	            model.setTerminal(that.previewingLink, paper.toLocalPoint({
	              x: e.x,
	              y: e.y
	            }), false);
	          } else {
	            that.previewingLink = new _Link2.default({
	              sourceMarker: 'block',
	              targetMarker: 'block'
	            });
	            model.addLink(that.previewingLink, {
	              node: that.sourceCellView.cell,
	              port: that.sourcePort
	            }, paper.toLocalPoint({
	              x: e.x,
	              y: e.y
	            }));
	          }
	        }
	      });
	
	      paper.on('cell:pointerUp', function () /* cell, view, e, x, y */{
	        // console.log('cell:mouseup');
	        // if (that.connecting) {
	        // } else {
	        // }
	        that.connecting = false;
	        that.setSourceCellView(null);
	        that._clearInPortDecorators();
	      });
	      paper.on('blank:pointerUp', function () /* cell, view, e, x, y */{
	        // console.log('blank:mouseup');
	        // if (that.connecting) {
	        // } else {
	        // }
	        that.connecting = false;
	        that.setSourceCellView(null);
	        that._clearInPortDecorators();
	      });
	
	      return this;
	    }
	  }, {
	    key: '_isOut',
	    value: function _isOut(view, elem) {
	      return !utils.containsElement(view.elem, elem) && !utils.hasClass(elem, 'port-decorator-layer');
	    }
	  }, {
	    key: 'setSourceCellView',
	    value: function setSourceCellView(view) {
	
	      var that = this;
	      var paper = this.getPaper();
	      if (this.sourceCellView) {
	        utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.out'), function (decorator) {
	          (0, _vector2.default)(decorator).remove();
	        });
	      }
	
	      that.sourceCellView = view;
	
	      if (view) {
	        that._drawPortDecorators(view, 'out');
	      }
	
	      return this;
	    }
	  }, {
	    key: '_drawInPortDecorators',
	    value: function _drawInPortDecorators() {
	      var that = this;
	      // let sourceView = that.sourceCellView;
	      return that;
	    }
	  }, {
	    key: '_clearInPortDecorators',
	    value: function _clearInPortDecorators() {
	      var that = this;
	      var paper = that.paper;
	      utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.in'), function (decorator) {
	        (0, _vector2.default)(decorator).remove();
	      });
	      return that;
	    }
	  }, {
	    key: '_drawPortDecorators',
	    value: function _drawPortDecorators(view, inOrOut) {
	
	      var decoratorMarkup = ['<g class="port-decorator ${className}">', '<circle class="back port-decorator-layer" r="8" cx="${x}" cy="${y}"></circle>', '<circle class="front port-decorator-layer" r="3" cx="${x}" cy="${y}"></circle>', '</g>'].join('');
	
	      var portBodies = view.elem.querySelectorAll('.pane-ports.' + inOrOut + ' .pane-port .port-body');
	      var paper = this.getPaper();
	      var decoratePane = paper.decoratePane;
	
	      utils.forEach(portBodies, function (portBody) {
	        var bbox = _Rect2.default.fromRect((0, _vector2.default)(portBody).getBBox(false));
	        var center = bbox.getCenter();
	        var decorator = (0, _vector2.default)(utils.format(decoratorMarkup, utils.extend({
	          className: inOrOut
	        }, center)));
	        decoratePane.appendChild(decorator.node);
	        decorator.node.cellView = view;
	        decorator.node.portBody = portBody;
	        // TODO decorator.node.portMeta = portMeta
	      });
	    }
	  }, {
	    key: 'setTargetCellView',
	    value: function setTargetCellView() /* view */{
	      var that = this;
	      return that;
	    }
	  }]);
	
	  return ConnectionHandler;
	}(_Handler3.default);
	
	exports.default = ConnectionHandler;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sharpConnector;
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function sharpConnector(sourcePoint, targetPoint, vertices) {
	
	  var d = ['M', sourcePoint.x, sourcePoint.y];
	
	  utils.forEach(vertices, function (vertex) {
	    d.push(vertex.x, vertex.y);
	  });
	
	  d.push(targetPoint.x, targetPoint.y);
	
	  return d.join(' ');
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = smoothConnector;
	
	var _bezier = __webpack_require__(51);
	
	var bezier = _interopRequireWildcard(_bezier);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function fixMarker(view, isSource, reference) {
	
	  var cache = view.cache;
	
	  var renderedMarker = isSource ? cache.renderedSourceMarker : cache.renderedTargetMarker;
	
	  var markerVel = isSource ? cache.sourceMarkerVel : cache.targetMarkerVel;
	
	  if (renderedMarker && markerVel) {
	
	    // get connection point of the marker connecting to the terminal
	    var position = isSource ? cache.sourcePointOnTerminal || cache.staticSourcePoint : cache.targetPointOnTerminal || cache.staticTargetPoint;
	
	    if (position) {
	      markerVel.translateAndAutoOrient(position, reference, view.getPane());
	      // fix the connection point on the marker
	      view.updateConnectionPointOnMarker(isSource);
	    }
	  }
	}
	
	function getConnectionPoint(view, isSource) {
	
	  var cache = view.cache;
	
	  if (isSource) {
	    return cache.sourcePointOnMarker || cache.sourcePointOnTerminal || cache.staticSourcePoint;
	  }
	
	  return cache.targetPointOnMarker || cache.targetPointOnTerminal || cache.staticTargetPoint;
	}
	
	function smoothConnector(sourcePoint, targetPoint, vertices) {
	
	  var view = this;
	  var pathArr = void 0;
	  var sourceReference = void 0;
	  var targetReference = void 0;
	
	  if (vertices && vertices.length) {
	
	    var knots = [sourcePoint].concat(vertices).concat([targetPoint]);
	    var controlPoints = bezier.getCurveControlPoints(knots);
	    var length = controlPoints[0].length;
	
	    sourceReference = _Point2.default.fromPoint(controlPoints[0][0]);
	    targetReference = _Point2.default.fromPoint(controlPoints[1][length - 1]);
	
	    fixMarker(view, true, sourceReference);
	    fixMarker(view, false, targetReference);
	
	    knots[0] = getConnectionPoint(view, true);
	    knots[knots.length - 1] = getConnectionPoint(view, false);
	
	    pathArr = ['M', knots[0].x, knots[0].y];
	
	    for (var i = 0; i < length; i++) {
	      pathArr.push('C', controlPoints[0][i].x, controlPoints[0][i].y, controlPoints[1][i].x, controlPoints[1][i].y, knots[i + 1].x, knots[i + 1].y);
	    }
	  } else {
	
	    // if we have no vertices use a default cubic bezier curve, cubic
	    // bezier requires two control points. The two control points are both
	    // defined with X as mid way between the source and target points.
	    // SourceControlPoint Y is equal to sourcePoint Y and targetControlPointY
	    // being equal to targetPointY. Handle situation were sourcePointX is
	    // greater or less then targetPointX.
	
	    // let controlPointX = sourcePoint.x < targetPoint.x
	    //    ? targetPoint.x - (targetPoint.x - sourcePoint.x) / 2
	    //    : sourcePoint.x - (sourcePoint.x - targetPoint.x) / 2;
	    //
	    // sourceReference = new Point(controlPointX, sourcePoint.y);
	    // targetReference = new Point(controlPointX, targetPoint.y);
	
	    var controlPointY = (sourcePoint.y + targetPoint.y) / 2;
	
	    // sourceReference = new Point(sourcePoint.x, controlPointY);
	    // targetReference = new Point(targetPoint.x, controlPointY);
	    //
	    // fixMarker(view, true, sourceReference);
	    // fixMarker(view, false, targetReference);
	    //
	    // sourcePoint = getConnectionPoint(view, true);
	    // targetPoint = getConnectionPoint(view, false);
	
	    pathArr = ['M', sourcePoint.x, sourcePoint.y, 'C', sourcePoint.x, controlPointY, targetPoint.x, controlPointY, targetPoint.x, targetPoint.y];
	  }
	
	  return pathArr.join(' ');
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = roundedConnector;
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function roundedConnector(sourcePoint, targetPoint, vertices) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	
	  var offset = options.radius || 10;
	
	  var d1 = void 0;
	  var d2 = void 0;
	
	  var d = ['M', sourcePoint.x, sourcePoint.y];
	
	  utils.forEach(vertices, function (vertex, index) {
	
	    // the closest vertices
	    var prev = vertices[index - 1] || sourcePoint;
	    var next = vertices[index + 1] || targetPoint;
	    var cur = _Point2.default.fromPoint(vertex);
	
	    // a half distance to the closest vertex
	    d1 = d2 || cur.distance(prev) / 2;
	    d2 = cur.distance(next) / 2;
	
	    // control points
	    var c1 = _Point2.default.fromPoint(vertex).move(prev, -Math.min(offset, d1)).smooth();
	    var c2 = _Point2.default.fromPoint(vertex).move(next, -Math.min(offset, d2)).smooth();
	
	    d.push(c1.x, c1.y, 'S', vertex.x, vertex.y, c2.x, c2.y, 'L');
	  });
	
	  d.push(targetPoint.x, targetPoint.y);
	
	  return d.join(' ');
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classicMarker;
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function classicMarker(vMarker, options) {
	
	  if (vMarker) {
	
	    // let markerStrokeWidth = options.markerStrokeWidth;
	
	    var size = options.size || 7;
	    var pathArr = [];
	
	    var connectionX = size * 0.75;
	    var connectionY = size / 2;
	
	    pathArr.push('M', 0, size / 2);
	    pathArr.push('L', size, 0);
	    pathArr.push('L', connectionX, connectionY);
	    pathArr.push('L', size, size);
	    pathArr.push('Z');
	
	    vMarker.attr('d', pathArr.join(' '));
	
	    //
	    var connectorStrokeWidth = options.connectorStrokeWidth;
	
	    if (connectorStrokeWidth > 1) {
	      connectionX += connectorStrokeWidth / 2 * (size - connectionX) / connectionY;
	    }
	
	    // return the connection point on the marker
	    return {
	      rad: Math.atan2(size / 2, size),
	      point: new _Point2.default(connectionX, connectionY)
	    };
	  }
	
	  return null;
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = diamondMarker;
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function diamondMarker(vMarker, options) {
	
	  if (vMarker) {
	
	    var rx = options.rx || 5;
	    var ry = options.ry || rx / 2;
	    var pathArr = [];
	
	    pathArr.push('M', rx, 0);
	    pathArr.push('L', 0, ry);
	    pathArr.push('L', rx, ry * 2);
	    pathArr.push('L', rx * 2, ry);
	    pathArr.push('Z');
	
	    vMarker.attr('d', pathArr.join(' '));
	
	    // return the connection point on the marker
	    return {
	      rad: Math.atan2(ry, rx),
	      point: new _Point2.default(rx * 2 - 1, ry)
	    };
	  }
	
	  return null;
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = blockMarker;
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function blockMarker(vMarker, options) {
	
	  if (vMarker) {
	
	    var width = options.width || 5;
	    var height = options.height || width * Math.tan(1 / 5 * Math.PI);
	
	    var pathArr = [];
	
	    pathArr.push('M', width, 0);
	    pathArr.push('L', 0, height);
	    pathArr.push('L', width, height * 2);
	    pathArr.push('Z');
	
	    vMarker.attr({
	      d: pathArr.join(' ')
	    });
	
	    // return the connection point on the marker
	    return {
	      rad: Math.atan2(height, width),
	      point: new _Point2.default(width, height)
	    };
	  }
	
	  return null;
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = clovenMarker;
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function clovenMarker(vMarker, options) {
	
	  if (vMarker) {
	
	    var rx = options.rx || 7;
	    var ry = options.ry || rx / 2;
	    var pathArr = [];
	
	    pathArr.push('M', rx, 0);
	    pathArr.push('L', 0, ry);
	    pathArr.push('L', rx, ry * 2);
	
	    vMarker.attr('d', pathArr.join(' '));
	
	    return {
	      rad: Math.atan2(ry, rx),
	      point: new _Point2.default(0, ry)
	    };
	  }
	
	  return null;
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ovalMarker;
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function ovalMarker(vMarker, options) {
	
	  // Note: vMarker should be a `g` element
	
	  if (vMarker) {
	
	    var rx = options.rx || 3.5;
	    var ry = options.ry || rx;
	
	    var vEllipse = (0, _vector2.default)('ellipse');
	
	    vEllipse.attr({
	      cx: rx,
	      cy: ry,
	      rx: rx,
	      ry: ry
	    });
	
	    // return the connection point on the marker
	    return {
	      vel: vEllipse,
	      rad: 0,
	      point: new _Point2.default(rx * 2, ry)
	    };
	  }
	
	  return null;
	}

/***/ },
/* 74 */,
/* 75 */,
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pai = undefined;
	
	var _Node = __webpack_require__(77);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _NodeView = __webpack_require__(78);
	
	var _NodeView2 = _interopRequireDefault(_NodeView);
	
	var _LinkView = __webpack_require__(79);
	
	var _LinkView2 = _interopRequireDefault(_LinkView);
	
	var _Group = __webpack_require__(80);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _GroupView = __webpack_require__(81);
	
	var _GroupView2 = _interopRequireDefault(_GroupView);
	
	var _Remark = __webpack_require__(82);
	
	var _Remark2 = _interopRequireDefault(_Remark);
	
	var _RemarkView = __webpack_require__(83);
	
	var _RemarkView2 = _interopRequireDefault(_RemarkView);
	
	var _Navigator = __webpack_require__(84);
	
	var _Navigator2 = _interopRequireDefault(_Navigator);
	
	var _Snaplines = __webpack_require__(85);
	
	var _Snaplines2 = _interopRequireDefault(_Snaplines);
	
	var _PaperScroll = __webpack_require__(86);
	
	var _PaperScroll2 = _interopRequireDefault(_PaperScroll);
	
	var _Handler = __webpack_require__(87);
	
	var _Handler2 = _interopRequireDefault(_Handler);
	
	var _SelectionHandler = __webpack_require__(88);
	
	var _SelectionHandler2 = _interopRequireDefault(_SelectionHandler);
	
	var _ConnectionHandler = __webpack_require__(89);
	
	var _ConnectionHandler2 = _interopRequireDefault(_ConnectionHandler);
	
	var _quadratic = __webpack_require__(90);
	
	var _quadratic2 = _interopRequireDefault(_quadratic);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// handlers
	
	
	var pai = {
	  Node: _Node2.default,
	  NodeView: _NodeView2.default,
	  LinkView: _LinkView2.default,
	
	  Group: _Group2.default,
	  GroupView: _GroupView2.default,
	
	  Remark: _Remark2.default,
	  RemarkView: _RemarkView2.default,
	
	  Navigator: _Navigator2.default,
	  Snaplines: _Snaplines2.default,
	  PaperScroll: _PaperScroll2.default,
	
	  Handler: _Handler2.default,
	  SelectionHandler: _SelectionHandler2.default,
	  ConnectionHandler: _ConnectionHandler2.default,
	
	  quadratic: _quadratic2.default
	};
	
	exports.pai = pai;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Portal2 = __webpack_require__(25);
	
	var _Portal3 = _interopRequireDefault(_Portal2);
	
	var _NodeView = __webpack_require__(78);
	
	var _NodeView2 = _interopRequireDefault(_NodeView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Node = function (_Portal) {
	  _inherits(Node, _Portal);
	
	  function Node() {
	    _classCallCheck(this, Node);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Node).apply(this, arguments));
	  }
	
	  _createClass(Node, [{
	    key: 'isPortVisible',
	    value: function isPortVisible(port) {
	
	      return port.displayType !== 'hide';
	    }
	  }, {
	    key: 'getVisiblePorts',
	    value: function getVisiblePorts(isInPort) {
	
	      var ports = isInPort ? this.getInPorts() : this.getOutPorts();
	
	      return utils.filter(ports, function (port) {
	        return this.isPortVisible(port);
	      }, this);
	    }
	  }]);
	
	  return Node;
	}(_Portal3.default);
	
	Node.setDefaults({
	  tagName: 'g',
	  pane: 'drawPane',
	  view: _NodeView2.default,
	  size: {
	    width: 180,
	    height: 30
	  }
	});
	
	// exports
	// -------
	
	exports.default = Node;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _NodeView = __webpack_require__(29);
	
	var _NodeView2 = _interopRequireDefault(_NodeView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var selectors = {
	  content: '.pane-node-content',
	  name: '.name',
	  portList: '.pane-port-list',
	  inPortList: '.pane-port-list.in',
	  outPortList: '.pane-port-list.out',
	  portWrap: '.pane-port-wrap',
	  portItem: '.pane-port',
	  portMagnet: '.port-magnet',
	  portAdsorb: '.is-adsorbed'
	};
	
	var classNames = {
	  portItem: 'pane-port',
	  inPortList: 'pane-port-list in',
	  outPortList: 'pane-port-list out',
	  connected: 'is-connected',
	  connecting: 'is-connecting',
	  connectable: 'is-connectable',
	  adsorbed: 'is-adsorbed',
	  bulb: 'pane-node-bulb',
	  recommending: 'recommending',
	  recommendable: 'recommendable'
	};
	
	var NodeView = function (_BaseView) {
	  _inherits(NodeView, _BaseView);
	
	  function NodeView() {
	    _classCallCheck(this, NodeView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NodeView).apply(this, arguments));
	  }
	
	  _createClass(NodeView, [{
	    key: 'renderMarkup',
	    value: function renderMarkup() {
	
	      _get(Object.getPrototypeOf(NodeView.prototype), 'renderMarkup', this).call(this);
	      this.renderPorts(true);
	      this.renderPorts(false);
	
	      return this;
	    }
	  }, {
	    key: 'renderPorts',
	    value: function renderPorts(isInPort) {
	      var _this2 = this;
	
	      var node = this.getCell();
	      var ports = node.getVisiblePorts(isInPort);
	      var count = ports.length;
	
	      if (count) {
	
	        var portListVel = this.getPortListVel(isInPort);
	        if (portListVel) {
	          (function () {
	
	            var markup = node.getPortMarkup();
	            var content = utils.map(ports, function (port) {
	              return this.compileMarkup(markup, port);
	            }, _this2).join('');
	
	            portListVel.html(content);
	
	            utils.forEach(portListVel.find(selectors.portWrap), function (vel) {
	              vel.css({ width: utils.toPercentage(1 / (count + 1), 2) });
	            });
	          })();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setNodeName',
	    value: function setNodeName(name) {
	
	      var node = this.getCell();
	
	      if (node.data) {
	        node.data.name = name;
	      }
	
	      var vName = this.findOne(selectors.name);
	      if (vName) {
	        vName.empty();
	        vName.append(document.createTextNode(name));
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setPortConnected',
	    value: function setPortConnected(port, isInPort, isConnected) {
	
	      var vel = this.getPortVel(port, isInPort);
	      if (vel) {
	        vel.toggleClass(classNames.connected, isConnected);
	      }
	    }
	  }, {
	    key: 'setPortConnecting',
	    value: function setPortConnecting(port, isInPort, isConnecting) {
	
	      var vel = this.getPortVel(port, isInPort);
	      if (vel) {
	        vel.toggleClass(classNames.connecting, isConnecting);
	      }
	    }
	  }, {
	    key: 'setPortHighlight',
	    value: function setPortHighlight(port, isInPort, isHighlighted) {
	
	      var vel = this.getPortVel(port, isInPort);
	      if (vel) {
	        vel.toggleClass(classNames.connectable, isHighlighted);
	      }
	
	      var containerVel = this.findOne(selectors.content);
	      if (containerVel) {
	        containerVel.toggleClass(classNames.connectable, isHighlighted);
	      }
	    }
	  }, {
	    key: 'setPortAdsorbed',
	    value: function setPortAdsorbed(port, isInPort, isAdsorbed) {
	      var _this3 = this;
	
	      var vel = this.getPortVel(port, isInPort);
	      if (vel) {
	        (function () {
	
	          var magnet = vel.findOne(selectors.portMagnet);
	          if (magnet) {
	            magnet.toggleClass(classNames.adsorbed, isAdsorbed);
	          }
	
	          if (isAdsorbed) {
	
	            var selector = _this3.getPortSelector(isInPort) + ' ' + selectors.portAdsorb;
	
	            utils.forEach(_this3.find(selector), function (item) {
	              if (!magnet || item.node !== magnet.node) {
	                item.removeClass(classNames.adsorbed);
	              }
	            });
	          }
	        })();
	      }
	    }
	  }, {
	    key: 'setRecommendable',
	    value: function setRecommendable(recommendable) {
	
	      this.vel.toggleClass(classNames.recommendable, recommendable);
	    }
	  }, {
	    key: 'setRecommending',
	    value: function setRecommending(recommending) {
	
	      this.vel.toggleClass(classNames.recommending, recommending);
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox() {
	
	      var bounds = utils.getBounds(this.elem);
	      if (bounds) {
	        return new _Rect2.default(bounds.left, bounds.top, bounds.width, bounds.height);
	      }
	
	      return null;
	    }
	  }, {
	    key: 'getStrokedBBox',
	    value: function getStrokedBBox() {
	
	      var bbox = this.cell.getBBox();
	      var borderWidth = 0;
	      var contentVel = this.findOne(selectors.content);
	      if (contentVel) {
	        borderWidth = utils.getComputedStyle(contentVel.node, 'border-width') - 1;
	      }
	
	      return borderWidth ? bbox.grow(borderWidth / 2) : bbox;
	    }
	  }, {
	    key: 'getPortBodyBBox',
	    value: function getPortBodyBBox(port, isInPort) {
	
	      var elem = this.getPortElem(port, isInPort);
	      if (elem) {
	        var bounds = this.getBounds(elem);
	
	        return this.getPaper().toLocalRect({
	          x: bounds.left,
	          y: bounds.top,
	          width: bounds.width,
	          height: bounds.height
	        });
	      }
	
	      return null;
	    }
	  }, {
	    key: 'getPortSelector',
	    value: function getPortSelector(isInPort, port) {
	
	      var selector = this.getPortListSelector(isInPort) + ' ' + selectors.portItem;
	
	      if (port) {
	        selector += '[data-id="' + port.id + '"]';
	      }
	
	      return selector;
	    }
	  }, {
	    key: 'getPortListSelector',
	    value: function getPortListSelector(isInPort) {
	
	      return isInPort ? selectors.inPortList : selectors.outPortList;
	    }
	  }, {
	    key: 'getPortListVel',
	    value: function getPortListVel(isInPort) {
	
	      return this.findOne(this.getPortListSelector(isInPort));
	    }
	  }, {
	    key: 'getPortsVel',
	    value: function getPortsVel(isInPort) {
	
	      return this.find(this.getPortSelector(isInPort));
	    }
	  }, {
	    key: 'getPortVel',
	    value: function getPortVel(port, isInPort) {
	
	      var node = this.getCell();
	
	      if (!utils.isObject(port)) {
	        port = node.getPortById(port);
	      }
	
	      var selector = this.getPortSelector(isInPort, port);
	      if (selector) {
	        return this.findOne(selector);
	      }
	
	      return null;
	    }
	  }, {
	    key: 'getPortElem',
	    value: function getPortElem(port, isInPort) {
	
	      var portVel = this.getPortVel(port, isInPort);
	      return portVel ? portVel.node : null;
	    }
	  }, {
	    key: 'findPortElem',
	    value: function findPortElem(elem) {
	
	      while (elem && elem !== this.elem) {
	        if (utils.hasClass(elem, classNames.portItem)) {
	          return elem;
	        }
	        elem = elem.parentNode;
	      }
	
	      return null;
	    }
	  }, {
	    key: 'isPortElem',
	    value: function isPortElem(elem) {
	
	      return !!this.findPortElem(elem);
	    }
	  }, {
	    key: 'isOutPortElem',
	    value: function isOutPortElem(elem) {
	
	      elem = this.findPortElem(elem);
	
	      while (elem && elem !== this.elem) {
	        if (utils.hasClass(elem, classNames.outPortList)) {
	          return true;
	        }
	        elem = elem.parentNode;
	      }
	
	      return false;
	    }
	  }, {
	    key: 'isInPortElem',
	    value: function isInPortElem(elem) {
	
	      elem = this.findPortElem(elem);
	
	      while (elem && elem !== this.elem) {
	        if (utils.hasClass(elem, classNames.inPortList)) {
	          return true;
	        }
	        elem = elem.parentNode;
	      }
	
	      return false;
	    }
	  }, {
	    key: 'isBulbElem',
	    value: function isBulbElem(elem) {
	
	      while (elem && elem !== this.elem) {
	        if (utils.hasClass(elem, classNames.bulb)) {
	          return true;
	        }
	        elem = elem.parentNode;
	      }
	
	      return false;
	    }
	  }, {
	    key: 'findPortByElem',
	    value: function findPortByElem(elem) {
	      var _this4 = this;
	
	      var result = null;
	      var portElem = elem && this.findPortElem(elem);
	
	      if (portElem) {
	        (function () {
	          var collection = _this4.isOutPortElem(portElem) ? _this4.cell.getOutPorts() : _this4.cell.getInPorts();
	
	          var portId = portElem.getAttribute('data-id');
	
	          utils.some(collection, function (port) {
	
	            if (utils.toString(port.id) === portId) {
	              result = port;
	              return true;
	            }
	
	            return false;
	          });
	        })();
	      }
	
	      return result;
	    }
	  }]);
	
	  return NodeView;
	}(_NodeView2.default);
	
	// exports
	// -------
	
	exports.default = NodeView;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _Point = __webpack_require__(18);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _VectorView2 = __webpack_require__(30);
	
	var _VectorView3 = _interopRequireDefault(_VectorView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LinkView = function (_VectorView) {
	  _inherits(LinkView, _VectorView);
	
	  function LinkView() {
	    _classCallCheck(this, LinkView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkView).apply(this, arguments));
	  }
	
	  _createClass(LinkView, [{
	    key: 'render',
	    value: function render() {
	
	      this.vel.empty();
	
	      this.renderMarkup().update();
	
	      return this;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	
	      this.cache = {};
	
	      return this.parseConnector().parseTerminal(true).parseTerminal(false).updateMarker().updateConnector().updateComment();
	    }
	  }, {
	    key: 'parseConnector',
	    value: function parseConnector() {
	
	      var link = this.cell;
	      var connector = link.getConnector();
	      var sourceMarker = link.getMarker(true);
	      var targetMarker = link.getMarker(false);
	
	      var connectorStrokeWidth = this.getStrokeWidth(connector.selector);
	      var sourceMarkerStrokeWidth = this.getStrokeWidth(sourceMarker.selector);
	      var targetMarkerStrokeWidth = this.getStrokeWidth(targetMarker.selector);
	
	      // update stroke width to marker options
	      var sourceMarkerOptions = sourceMarker.options;
	      if (!sourceMarkerOptions) {
	        sourceMarkerOptions = sourceMarker.options = {};
	      }
	
	      sourceMarkerOptions.connectorStrokeWidth = connectorStrokeWidth;
	      sourceMarkerOptions.markerStrokeWidth = sourceMarkerStrokeWidth;
	
	      var targetMarkerOptions = targetMarker.options;
	      if (!targetMarkerOptions) {
	        targetMarkerOptions = targetMarker.options = {};
	      }
	
	      targetMarkerOptions.connectorStrokeWidth = connectorStrokeWidth;
	      targetMarkerOptions.markerStrokeWidth = targetMarkerStrokeWidth;
	
	      // cache
	      this.cacheConnector(connector);
	      this.cacheMarker(sourceMarker, true);
	      this.cacheMarker(targetMarker, false);
	
	      return this;
	    }
	  }, {
	    key: 'parseTerminal',
	    value: function parseTerminal(isSource) {
	
	      var link = this.cell;
	      var point = link.getTerminalPoint(isSource);
	      var port = link.getTerminalPort(isSource);
	      var node = link.getTerminalNode(isSource);
	      var view = node && this.paper.getView(node);
	
	      this.cacheStaticConnPoint(point, isSource);
	      this.cacheTerminalView(view, isSource);
	      this.cacheTerminalPort(port, isSource);
	
	      return this;
	    }
	  }, {
	    key: 'updateMarker',
	    value: function updateMarker() {
	
	      return this.renderMarker(true).renderMarker(false).updateConnectionPoint(true).updateConnectionPoint(false).transformMarker(true).transformMarker(false).updateConnectionPointOnMarker(true).updateConnectionPointOnMarker(false);
	    }
	  }, {
	    key: 'updateConnector',
	    value: function updateConnector() {
	
	      var connector = this.fetchConnector();
	
	      var parser = connector.parse && utils.isFunction(connector.parse) ? connector.parse : connector.name && this.paper.getConnector(connector.name);
	
	      if (parser && utils.isFunction(parser)) {
	
	        var sourcePoint = this.getConnectionPoint(true);
	        var targetPoint = this.getConnectionPoint(false);
	        if (sourcePoint && targetPoint) {
	
	          var pathData = parser.call(this, sourcePoint, targetPoint);
	
	          this.applyAttr('.connector-wrap', { d: pathData });
	          this.applyAttr(connector.selector, { d: pathData });
	        } else {
	          this.vel.empty();
	        }
	      } else {
	        throw new Error('Unknown connector: "' + connector.name + '"');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateComment',
	    value: function updateComment(comment) {
	
	      var data = this.cell.data;
	      var bbox = this.vel.getBBox(true);
	      var vBg = this.vel.findOne('.comment-bg');
	      var vText = this.vel.findOne('.comment');
	
	      if (utils.isUndefined(comment)) {
	        comment = data ? data.comment : '';
	      } else {
	        if (data) {
	          data.comment = comment;
	        }
	      }
	
	      if (vBg && vText) {
	
	        if (comment) {
	
	          vText.text(comment);
	
	          // Remove the previous translate() from the transform attribute
	          // and translate the element relative to the bounding box following
	          // the `ref-x` and `ref-y` attributes.
	          var transformAttr = vText.attr('transform');
	          if (transformAttr) {
	            vText.attr('transform', utils.clearTranslate(transformAttr));
	          }
	
	          var velBBox = vText.getBBox(true);
	
	          var tx = bbox.x + bbox.width * 0.5;
	          var ty = bbox.y + bbox.height * 0.5;
	
	          tx -= velBBox.width / 2;
	          ty -= velBBox.height / 2;
	
	          tx = utils.toFixed(tx, 2);
	          ty = utils.toFixed(ty, 2);
	
	          vText.translate(tx, ty);
	          vBg.attr({
	            width: velBBox.width + 10,
	            height: velBBox.height + 10
	          });
	
	          vBg.translate(tx - 5, ty - 5);
	        } else {
	          vBg.attr({
	            width: '',
	            height: '',
	            transform: ''
	          });
	
	          vText.attr({
	            y: '',
	            transform: ''
	          });
	
	          vText.empty();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'renderMarker',
	    value: function renderMarker(isSource) {
	
	      var marker = this.fetchMarker(isSource);
	      var vMarker = this.findOne(marker.selector);
	
	      if (marker && vMarker) {
	
	        var parser = marker.parse && utils.isFunction(marker.parse) ? marker.parse : marker.name && this.paper.getMarker(marker.name);
	
	        if (parser && utils.isFunction(parser)) {
	
	          var renderedMarker = parser(vMarker, marker.options);
	
	          // if return a new marker element, replace the old one
	          var newVel = renderedMarker.vel;
	          if (newVel) {
	
	            // replace
	            var elem = vMarker.node;
	            var parent = elem.parentNode;
	            var className = vMarker.getClassName();
	
	            parent.insertBefore(newVel.node, elem);
	            parent.removeChild(elem);
	            newVel.addClass(className);
	
	            vMarker = newVel;
	          }
	
	          this.cacheMarkerVel(vMarker, isSource);
	          this.cacheRenderedMarker(renderedMarker, isSource);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateConnectionPoint',
	    value: function updateConnectionPoint(isSource) {
	
	      var staticPoint = this.fetchStaticConnPoint(isSource);
	      if (!staticPoint) {
	        this.updateConnPointOnPort(isSource) || this.updateConnPointOnNode(isSource);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateConnPointOnPort',
	    value: function updateConnPointOnPort(isSource) {
	
	      var rect = this.getPortBodyBBox(isSource);
	      if (rect) {
	        var point = new _Point2.default(rect.getCenter().x, isSource ? rect.y + rect.height : rect.y);
	        this.cacheConnPointOnPort(point, isSource);
	      }
	
	      return this.fetchConnPointOnPort(isSource);
	    }
	  }, {
	    key: 'updateConnPointOnNode',
	    value: function updateConnPointOnNode(isSource) {
	
	      var point = null;
	      var bbox = this.getTerminalBBox(isSource);
	      if (bbox) {
	
	        var reference = this.getReferencePoint(bbox, isSource);
	        if (reference) {
	          point = bbox.intersectionWithLineFromCenterToPoint(reference);
	        }
	
	        point = point || bbox.getCenter();
	
	        this.cacheConnPointOnNode(point, isSource);
	      }
	
	      return this.fetchConnPointOnNode(isSource);
	    }
	  }, {
	    key: 'getStrokeWidth',
	    value: function getStrokeWidth(selector) {
	
	      var vel = this.findOne(selector);
	      if (vel && vel.node) {
	
	        var strokeWidth = utils.getComputedStyle(vel.node, 'stroke-width');
	
	        return strokeWidth && utils.toFloat(strokeWidth) || 0;
	      }
	
	      return 0;
	    }
	  }, {
	    key: 'getTerminalBBox',
	    value: function getTerminalBBox(isSource) {
	
	      var bbox = this.fetchTerminalBBox(isSource);
	      if (!bbox) {
	
	        var view = this.fetchTerminalView(isSource);
	        if (view) {
	          bbox = view.getStrokedBBox();
	          bbox = this.fixStrokedBBox(bbox, isSource);
	        }
	
	        // cache
	        this.cacheTerminalBBox(bbox, isSource);
	      }
	
	      return bbox;
	    }
	  }, {
	    key: 'fixStrokedBBox',
	    value: function fixStrokedBBox(bbox, isSource) {
	
	      if (bbox) {
	
	        var marker = this.fetchMarker(isSource);
	        var renderedMarker = this.fetchRenderedMarker(isSource);
	
	        if (marker && renderedMarker) {
	
	          var markerStrokeWidth = marker.options.markerStrokeWidth;
	          if (markerStrokeWidth) {
	
	            var rad = renderedMarker.rad || 0;
	            if (rad >= Math.PI / 4 || rad === 0) {
	              bbox.grow(markerStrokeWidth / 2);
	            } else {
	              bbox.grow(markerStrokeWidth / Math.sin(rad) / 2);
	            }
	          }
	        }
	      }
	
	      return bbox;
	    }
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint(bbox, isSource) {
	
	      // static point
	      var reference = this.fetchStaticConnPoint(isSource);
	
	      // port
	      if (!reference) {
	
	        var portBBox = this.getPortBodyBBox(!isSource);
	        if (portBBox) {
	          reference = portBBox.intersectionWithLineFromCenterToPoint(bbox.getCenter());
	          reference = reference || portBBox.getCenter();
	        }
	      }
	
	      // terminal
	      if (!reference) {
	
	        var terminalBBox = this.getTerminalBBox(!isSource);
	        if (terminalBBox) {
	          reference = terminalBBox.intersectionWithLineFromCenterToPoint(bbox.getCenter());
	          reference = reference || terminalBBox.getCenter();
	        }
	      }
	
	      return reference;
	    }
	  }, {
	    key: 'getPortBodyBBox',
	    value: function getPortBodyBBox(isSource) {
	
	      var bbox = this.fetchPortBodyBBox(isSource);
	      if (!bbox) {
	
	        var view = this.fetchTerminalView(isSource);
	        var port = this.fetchTerminalPort(isSource);
	        if (view && port) {
	
	          if (view.getPortBodyBBox) {
	            bbox = view.getPortBodyBBox(port, !isSource);
	          }
	
	          if (bbox) {
	            bbox = this.fixStrokedBBox(bbox, isSource);
	            this.cachePortBodyBBox(bbox, isSource);
	          }
	        }
	      }
	
	      return bbox;
	    }
	  }, {
	    key: 'getConnectionPoint',
	    value: function getConnectionPoint(isSource) {
	
	      var point = this.fetchConnPointOnMarker(isSource) || this.fetchStaticConnPoint(isSource) || this.fetchConnPointOnPort(isSource) || this.fetchConnPointOnNode(isSource);
	
	      return point;
	    }
	  }, {
	    key: 'transformMarker',
	    value: function transformMarker(isSource) {
	
	      var renderedMarker = this.fetchRenderedMarker(isSource);
	      if (renderedMarker) {
	
	        var pane = this.getPane();
	
	        var markerVel = this.fetchMarkerVel(isSource);
	        var position = this.getConnectionPoint(isSource);
	        var reference = new _Point2.default(position.x, position.y + (isSource ? 50 : -50));
	
	        if (position && reference && markerVel) {
	          markerVel.translateAndAutoOrient(position, reference, pane);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateConnectionPointOnMarker',
	    value: function updateConnectionPointOnMarker(isSource) {
	
	      var markerVel = this.fetchMarkerVel(isSource);
	      var renderedMarker = this.fetchRenderedMarker(isSource);
	
	      if (markerVel && renderedMarker) {
	
	        var pane = this.getPane();
	        var point = renderedMarker.point;
	
	        var p = _vector2.default.createSVGPoint(point.x, point.y);
	
	        p = p.matrixTransform(markerVel.getTransformToElement(pane));
	
	        var connectionPoint = _Point2.default.fromPoint(p);
	
	        this.cacheConnPointOnMarker(connectionPoint, isSource);
	      }
	
	      return this;
	    }
	
	    // cache
	    // -----
	
	  }, {
	    key: 'cacheConnector',
	    value: function cacheConnector(connector) {
	
	      this.cache.connector = connector;
	    }
	  }, {
	    key: 'fetchConnector',
	    value: function fetchConnector() {
	
	      return this.cache.connector;
	    }
	  }, {
	    key: 'cacheMarker',
	    value: function cacheMarker(marker, isSource) {
	
	      if (isSource) {
	        this.cache.sourceMarker = marker;
	      } else {
	        this.cache.targetMarker = marker;
	      }
	    }
	  }, {
	    key: 'fetchMarker',
	    value: function fetchMarker(isSource) {
	
	      return isSource ? this.cache.sourceMarker : this.cache.targetMarker;
	    }
	  }, {
	    key: 'cacheRenderedMarker',
	    value: function cacheRenderedMarker(renderedMarker, isSource) {
	
	      if (renderedMarker) {
	        if (isSource) {
	          this.cache.renderedSourceMarker = renderedMarker;
	        } else {
	          this.cache.renderedTargetMarker = renderedMarker;
	        }
	      }
	    }
	  }, {
	    key: 'fetchRenderedMarker',
	    value: function fetchRenderedMarker(isSource) {
	
	      return isSource ? this.cache.renderedSourceMarker : this.cache.renderedTargetMarker;
	    }
	  }, {
	    key: 'cacheMarkerVel',
	    value: function cacheMarkerVel(vel, isSource) {
	
	      if (vel) {
	        if (isSource) {
	          this.cache.sourceMarkerVel = vel;
	        } else {
	          this.cache.targetMarkerVel = vel;
	        }
	      }
	    }
	  }, {
	    key: 'fetchMarkerVel',
	    value: function fetchMarkerVel(isSource) {
	
	      return isSource ? this.cache.sourceMarkerVel : this.cache.targetMarkerVel;
	    }
	  }, {
	    key: 'cacheTerminalView',
	    value: function cacheTerminalView(view, isSource) {
	
	      if (view) {
	        if (isSource) {
	          this.cache.sourceView = view;
	        } else {
	          this.cache.targetView = view;
	        }
	      }
	    }
	  }, {
	    key: 'fetchTerminalView',
	    value: function fetchTerminalView(isSource) {
	
	      return isSource ? this.cache.sourceView : this.cache.targetView;
	    }
	  }, {
	    key: 'cacheTerminalPort',
	    value: function cacheTerminalPort(port, isSource) {
	
	      if (!utils.isNil(port)) {
	        if (isSource) {
	          this.cache.sourcePort = port;
	        } else {
	          this.cache.targetPort = port;
	        }
	      }
	    }
	  }, {
	    key: 'fetchTerminalPort',
	    value: function fetchTerminalPort(isSource) {
	
	      return isSource ? this.cache.sourcePort : this.cache.targetPort;
	    }
	  }, {
	    key: 'cacheStaticConnPoint',
	    value: function cacheStaticConnPoint(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.staticSourcePoint = point;
	        } else {
	          this.cache.staticTargetPoint = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchStaticConnPoint',
	    value: function fetchStaticConnPoint(isSource) {
	
	      return isSource ? this.cache.staticSourcePoint : this.cache.staticTargetPoint;
	    }
	  }, {
	    key: 'cacheConnPointOnMarker',
	    value: function cacheConnPointOnMarker(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.sourcePointOnMarker = point;
	        } else {
	          this.cache.targetPointOnMarker = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchConnPointOnMarker',
	    value: function fetchConnPointOnMarker(isSource) {
	
	      return isSource ? this.cache.sourcePointOnMarker : this.cache.targetPointOnMarker;
	    }
	  }, {
	    key: 'cacheConnPointOnPort',
	    value: function cacheConnPointOnPort(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.sourcePointOnPort = point;
	        } else {
	          this.cache.targetPointOnPort = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchConnPointOnPort',
	    value: function fetchConnPointOnPort(isSource) {
	
	      return isSource ? this.cache.sourcePointOnPort : this.cache.targetPointOnPort;
	    }
	  }, {
	    key: 'cacheConnPointOnNode',
	    value: function cacheConnPointOnNode(point, isSource) {
	
	      if (point) {
	        if (isSource) {
	          this.cache.sourcePointOnTerminal = point;
	        } else {
	          this.cache.targetPointOnTerminal = point;
	        }
	      }
	    }
	  }, {
	    key: 'fetchConnPointOnNode',
	    value: function fetchConnPointOnNode(isSource) {
	
	      return isSource ? this.cache.sourcePointOnTerminal : this.cache.targetPointOnTerminal;
	    }
	  }, {
	    key: 'cacheTerminalBBox',
	    value: function cacheTerminalBBox(bbox, isSource) {
	
	      if (bbox) {
	        if (isSource) {
	          this.cache.sourceTerminalBBox = bbox;
	        } else {
	          this.cache.targetTerminalBBox = bbox;
	        }
	      }
	    }
	  }, {
	    key: 'fetchTerminalBBox',
	    value: function fetchTerminalBBox(isSource) {
	
	      return isSource ? this.cache.sourceTerminalBBox : this.cache.targetTerminalBBox;
	    }
	  }, {
	    key: 'cachePortBodyBBox',
	    value: function cachePortBodyBBox(bbox, isSource) {
	
	      if (bbox) {
	        if (isSource) {
	          this.cache.sourcePortBBox = bbox;
	        } else {
	          this.cache.targetPortBBox = bbox;
	        }
	      }
	    }
	  }, {
	    key: 'fetchPortBodyBBox',
	    value: function fetchPortBodyBBox(isSource) {
	
	      return isSource ? this.cache.sourcePortBBox : this.cache.targetPortBBox;
	    }
	  }]);
	
	  return LinkView;
	}(_VectorView3.default);
	
	// exports
	// -------
	
	exports.default = LinkView;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _GroupView = __webpack_require__(81);
	
	var _GroupView2 = _interopRequireDefault(_GroupView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Group = function (_Node) {
	  _inherits(Group, _Node);
	
	  function Group() {
	    _classCallCheck(this, Group);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
	  }
	
	  _createClass(Group, [{
	    key: 'isGroup',
	    value: function isGroup() {
	
	      return true;
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox() {
	
	      var size = this.getSize();
	      var position = this.getPosition();
	
	      return new _Rect2.default(position.x, position.y, size.width, size.height);
	    }
	  }, {
	    key: 'getCollapsedSize',
	    value: function getCollapsedSize() {
	
	      return {
	        width: 180,
	        height: 30
	      };
	    }
	  }, {
	    key: 'getFullBBox',
	    value: function getFullBBox() {
	
	      var bounds = null;
	
	      utils.forEach(this.getNodes(), function (node) {
	        var rect = node.getBBox();
	        if (rect) {
	          bounds = bounds ? bounds.union(rect) : rect;
	        }
	      });
	
	      return bounds;
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	
	      return this.metadata.size;
	    }
	  }, {
	    key: 'getPosition',
	    value: function getPosition() {
	
	      return this.metadata.position;
	    }
	  }, {
	    key: 'getBBoxByStatus',
	    value: function getBBoxByStatus(collapsed) {
	
	      var bounds = this.getFullBBox();
	      var minSize = this.getCollapsedSize();
	
	      if (bounds) {
	
	        if (collapsed) {
	
	          bounds.x += bounds.width + 20 - 180;
	          bounds.y -= 35;
	
	          bounds.width = minSize.width;
	          bounds.height = minSize.height;
	        } else {
	
	          bounds.x -= 35;
	          bounds.y -= 35;
	          bounds.width += 70;
	          bounds.height += 55;
	        }
	      } else {
	        bounds = {
	          x: 0,
	          y: 0,
	          width: minSize.width,
	          height: minSize.height
	        };
	      }
	
	      return bounds;
	    }
	  }, {
	    key: 'updateGeometry',
	    value: function updateGeometry(silent) {
	
	      var bounds = this.getBBoxByStatus(this.isCollapsed());
	
	      this.setGeometry({
	        size: {
	          width: bounds.width,
	          height: bounds.height
	        },
	        position: {
	          x: bounds.x,
	          y: bounds.y
	        }
	      }, {
	        silent: silent
	      });
	
	      return this;
	    }
	  }, {
	    key: 'getNodes',
	    value: function getNodes() {
	
	      return this.children || [];
	    }
	  }, {
	    key: 'addNodes',
	    value: function addNodes() {
	      var _this2 = this;
	
	      var nodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	
	      if (!utils.isArray(nodes)) {
	        nodes = [nodes];
	      }
	
	      if (nodes.length) {
	        (function () {
	
	          var collapsed = _this2.isCollapsed();
	
	          utils.forEach(nodes, function (node) {
	
	            if (node && node.isNode()) {
	              this.insertChild(node);
	            }
	
	            if (collapsed) {
	              node.setVisible(false);
	            }
	          }, _this2);
	
	          if (collapsed) {
	
	            var changedLinks = _this2.getChangedLink(nodes);
	
	            _this2.updateLinks(changedLinks, collapsed);
	
	            if (_this2.changedLinks) {
	              _this2.changedLinks.concat(changedLinks);
	            } else {
	              _this2.changedLinks = changedLinks;
	            }
	          }
	
	          _this2.updateGeometry(true);
	        })();
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeNodes',
	    value: function removeNodes() {
	      var _this3 = this;
	
	      var nodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	      var parentNode = arguments[1];
	
	
	      if (!utils.isArray(nodes)) {
	        nodes = [nodes];
	      }
	
	      if (nodes.length) {
	        (function () {
	
	          var linkItems = [];
	          var collapsed = _this3.isCollapsed();
	
	          var index = 0;
	
	          utils.some(parentNode.getChildren(), function (node, idx) {
	
	            if (node.isGroup && node.isGroup()) {
	              index = idx;
	            } else if (node.isNode()) {
	              index += 1;
	              return true;
	            }
	
	            return false;
	          });
	
	          utils.forEach(nodes.slice(0), function (node) {
	
	            if (_this3.isInGroup(node)) {
	
	              utils.forEach(_this3.changedLinks, function (item) {
	                if (item.terminal.node === node) {
	                  linkItems.push(item);
	                }
	              });
	
	              if (parentNode) {
	
	                if (collapsed) {
	                  node.setVisible(true);
	                }
	
	                parentNode.insertChild(node, index);
	              }
	            }
	          });
	
	          _this3.updateLinks(linkItems, false);
	          _this3.updateGeometry(true);
	        })();
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getRenderData',
	    value: function getRenderData() {
	
	      var data = _get(Object.getPrototypeOf(Group.prototype), 'getRenderData', this).call(this);
	
	      return utils.merge({}, data, {
	        size: this.metadata.size,
	        position: this.metadata.position,
	        collapsed: this.isCollapsed()
	      });
	    }
	  }, {
	    key: 'isInGroup',
	    value: function isInGroup(node) {
	
	      return utils.some(this.getNodes(), function (item) {
	        return node === item;
	      });
	    }
	  }, {
	    key: 'getChangedLink',
	    value: function getChangedLink() {
	      var nodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	
	      var changedLinks = [];
	
	      utils.forEach(nodes, function (node) {
	
	        node.eachLink(function (link) {
	
	          var sourceNode = link.getTerminalNode(true);
	          var targetNode = link.getTerminalNode(false);
	          var otherNode = sourceNode === node ? targetNode : sourceNode;
	          var isSource = otherNode === targetNode;
	
	          if (!this.isInGroup(otherNode)) {
	            changedLinks.push({
	              link: link,
	              terminal: link.getTerminal(isSource),
	              isSource: isSource
	            });
	          }
	        }, this);
	      }, this);
	
	      return changedLinks;
	    }
	  }, {
	    key: 'updateLinks',
	    value: function updateLinks(links, collapsed) {
	
	      utils.forEach(links, function (item) {
	
	        item.link.setTerminalNode(collapsed ? this : item.terminal, item.isSource);
	
	        if (!item.isSource) {
	          item.link.metadata.targetMarker = collapsed ? 'block' : null;
	        }
	      }, this);
	    }
	  }, {
	    key: '_setCollapsed',
	    value: function _setCollapsed(collapsed) {
	
	      _get(Object.getPrototypeOf(Group.prototype), '_setCollapsed', this).call(this, collapsed);
	
	      this.updateGeometry(true);
	
	      utils.forEach(this.getNodes(), function (node) {
	        node.setVisible(!collapsed);
	      });
	
	      if (collapsed) {
	        this.changedLinks = this.getChangedLink(this.getNodes());
	      }
	
	      this.updateLinks(this.changedLinks, this.isCollapsed());
	
	      return this;
	    }
	  }]);
	
	  return Group;
	}(_Node3.default);
	
	Group.setDefaults({
	  tagName: 'g',
	  pane: 'backgroundPane',
	  classNames: 'pane-group',
	  view: _GroupView2.default
	});
	
	// exports
	// -------
	
	exports.default = Group;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _CellView2 = __webpack_require__(32);
	
	var _CellView3 = _interopRequireDefault(_CellView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GroupView = function (_CellView) {
	  _inherits(GroupView, _CellView);
	
	  function GroupView() {
	    _classCallCheck(this, GroupView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GroupView).apply(this, arguments));
	  }
	
	  _createClass(GroupView, [{
	    key: 'render',
	    value: function render() {
	
	      this.renderMarkup();
	
	      this.scalableNode = this.findOne('.pane-scalable');
	
	      this.resize().translate();
	
	      return this;
	    }
	  }, {
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      this.vel = (0, _vector2.default)(this.cell.getTagName(), {
	        class: this.cell.getClassName()
	      });
	      this.elem = this.vel.node;
	
	      // attach cell's id to elem
	      this.elem.cellId = this.cell.id;
	
	      var pane = this.getPane();
	      if (pane) {
	        pane.appendChild(this.elem);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	      var _this2 = this;
	
	      utils.addEventListener(this.elem, 'mousedown', '.btn-toggle', function (e) {
	        e.stopPropagation();
	      });
	
	      utils.addEventListener(this.elem, 'click', '.btn-toggle', function (e) {
	        e.stopPropagation();
	        _this2.cell.toggleCollapse();
	
	        var paper = _this2.getPaper();
	        if (paper) {
	          paper.trigger('group:collapseChanged', _this2.cell);
	        }
	      });
	
	      return this;
	    }
	  }, {
	    key: 'renderMarkup',
	    value: function renderMarkup() {
	
	      var group = this.cell;
	      var markup = this.compileMarkup(group.getMarkup(), group.getRenderData());
	
	      this.elem.innerHTML = markup;
	
	      return this;
	    }
	  }, {
	    key: 'find',
	    value: function find(selector) {
	
	      return selector === '.' ? [this.vel] : this.vel.find(selector);
	    }
	  }, {
	    key: 'findOne',
	    value: function findOne(selector) {
	
	      return selector === '.' ? this.vel : this.vel.findOne(selector);
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	
	      var scalableNode = this.scalableNode;
	      if (!scalableNode) {
	        return this;
	      }
	
	      // get bbox without transform
	      var bbox = scalableNode.getBBox(true);
	      var size = this.cell.getSize();
	
	      var sx = size.width / (bbox.width || 1);
	      var sy = size.height / (bbox.height || 1);
	
	      sx = utils.toFixed(sx, 2);
	      sy = utils.toFixed(sy, 2);
	
	      scalableNode.scale(sx, sy);
	
	      return this;
	    }
	  }, {
	    key: 'translate',
	    value: function translate() {
	
	      var position = this.cell.getPosition();
	
	      this.vel.translate(position.x, position.y);
	
	      return this;
	    }
	  }, {
	    key: 'setNodeName',
	    value: function setNodeName(name) {
	
	      var group = this.getCell();
	
	      if (group.data) {
	        group.data.name = name;
	      }
	
	      var vName = this.findOne('.name');
	      if (vName) {
	        vName.empty();
	        vName.append(document.createTextNode(name));
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getStrokeWidth',
	    value: function getStrokeWidth() {
	
	      return 1;
	    }
	  }, {
	    key: 'getStrokedBBox',
	    value: function getStrokedBBox() {
	
	      var sw = this.getStrokeWidth() - 1;
	      var bbox = this.getCell().getBBox();
	
	      return sw ? bbox.grow(sw / 2) : bbox;
	    }
	  }]);
	
	  return GroupView;
	}(_CellView3.default);
	
	// exports
	// -------
	
	exports.default = GroupView;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Node2 = __webpack_require__(3);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _RemarkView = __webpack_require__(83);
	
	var _RemarkView2 = _interopRequireDefault(_RemarkView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Remark = function (_Node) {
	  _inherits(Remark, _Node);
	
	  function Remark() {
	    _classCallCheck(this, Remark);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Remark).apply(this, arguments));
	  }
	
	  _createClass(Remark, [{
	    key: 'isRemark',
	    value: function isRemark() {
	
	      return true;
	    }
	  }, {
	    key: 'getRemark',
	    value: function getRemark() {
	
	      return this.data.name || '';
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox() {
	
	      var size = this.getSize();
	      var position = this.getPosition();
	
	      return new _Rect2.default(position.x, position.y, size.width, size.height);
	    }
	  }, {
	    key: 'getMaxSize',
	    value: function getMaxSize() {
	
	      return {
	        width: 180,
	        height: 96
	      };
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	
	      return this.metadata.size || this.getMaxSize();
	    }
	  }, {
	    key: 'getPosition',
	    value: function getPosition() {
	
	      return this.metadata.position;
	    }
	  }]);
	
	  return Remark;
	}(_Node3.default);
	
	Remark.setDefaults({
	  tagName: 'g',
	  pane: 'decoratePane',
	  classNames: 'pane-remark',
	  view: _RemarkView2.default
	});
	
	// exports
	// -------
	
	exports.default = Remark;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _vector = __webpack_require__(27);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _CellView2 = __webpack_require__(32);
	
	var _CellView3 = _interopRequireDefault(_CellView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var selectors = {
	  foreignobject: 'foreignobject',
	  content: '.pane-remark-content',
	  editor: '.pane-remark-editor'
	};
	
	var classNames = {
	  editor: 'pane-remark-editor',
	  float: 'pane-remark-float'
	};
	
	var RemarkView = function (_CellView) {
	  _inherits(RemarkView, _CellView);
	
	  function RemarkView() {
	    _classCallCheck(this, RemarkView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RemarkView).apply(this, arguments));
	  }
	
	  _createClass(RemarkView, [{
	    key: 'render',
	    value: function render() {
	
	      this.renderMarkup();
	
	      this.resize().translate();
	
	      return this;
	    }
	  }, {
	    key: 'renderMarkup',
	    value: function renderMarkup() {
	
	      var group = this.cell;
	      var markup = this.compileMarkup(group.getMarkup(), group.getRenderData());
	
	      this.elem.innerHTML = markup;
	
	      return this;
	    }
	  }, {
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      this.vel = (0, _vector2.default)(this.cell.getTagName(), {
	        class: this.cell.getClassName()
	      });
	      this.elem = this.vel.node;
	
	      // attach cell's id to elem
	      this.elem.cellId = this.cell.id;
	
	      var pane = this.getPane();
	      if (pane) {
	        pane.appendChild(this.elem);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	      var _this2 = this;
	
	      utils.addEventListener(this.elem, 'dblclick', selectors.content, function (e) {
	        e.stopPropagation();
	        _this2.editRemark();
	      });
	
	      utils.addEventListener(this.elem, 'mousedown', selectors.editor, function (e) {
	        e.stopPropagation();
	      });
	
	      utils.addEventListener(this.elem, 'keydown', selectors.editor, function (e) {
	        e.stopPropagation();
	      });
	
	      return this;
	    }
	  }, {
	    key: 'find',
	    value: function find(selector) {
	
	      return selector === '.' ? [this.vel] : this.vel.find(selector);
	    }
	  }, {
	    key: 'findOne',
	    value: function findOne(selector) {
	
	      return selector === '.' ? this.vel : this.vel.findOne(selector);
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	
	      var size = this.detectContentSize();
	
	      this.cell.size = size;
	      this.cell.metadata.size = size;
	
	      this.setContentSize(size.width, size.height);
	
	      return this;
	    }
	  }, {
	    key: 'translate',
	    value: function translate() {
	
	      var position = this.cell.getPosition();
	
	      this.vel.translate(position.x, position.y);
	
	      return this;
	    }
	  }, {
	    key: 'editRemark',
	    value: function editRemark() {
	      var _this3 = this;
	
	      if (!this.editing) {
	
	        this.editing = true;
	
	        var content = this.cell.getRemark();
	        var contentElem = this.getContentElem();
	
	        this.setContentSize(180, 72);
	
	        if (contentElem) {
	          contentElem.innerHTML = '<textarea class="' + classNames.editor + '">' + content + '</textarea>';
	
	          var textarea = contentElem.querySelector(selectors.editor);
	          if (textarea) {
	            textarea.focus();
	            textarea.select();
	            utils.addEventListener(textarea, 'blur', function (e) {
	              e.stopPropagation();
	              _this3.saveRemark();
	            });
	
	            utils.addEventListener(textarea, 'keydown', function (e) {
	
	              e.stopPropagation();
	
	              var keyCode = e.keyCode;
	              if (keyCode === 13) {
	                _this3.saveRemark();
	              } else if (keyCode === 27) {
	                _this3.saveRemark(true);
	              }
	            });
	          }
	        }
	      }
	    }
	  }, {
	    key: 'saveRemark',
	    value: function saveRemark(esc) {
	
	      if (this.editing) {
	
	        this.editing = false;
	
	        var contentElem = this.getContentElem();
	        if (contentElem) {
	
	          var textarea = contentElem.querySelector(selectors.editor);
	          if (textarea) {
	
	            var oldVal = this.cell.getRemark();
	            var newVal = textarea.value;
	
	            if (esc) {
	              newVal = oldVal;
	            } else {
	              if (newVal) {
	
	                newVal = utils.escape(newVal);
	
	                this.cell.data.name = newVal;
	              } else {
	                newVal = oldVal;
	              }
	            }
	
	            utils.removeElement(textarea);
	            contentElem.appendChild(document.createTextNode(newVal));
	
	            if (!esc) {
	              var paper = this.getPaper();
	              var oldSize = this.cell.getSize();
	              var newSize = this.detectContentSize();
	
	              this.cell.size = newSize;
	              this.cell.metadata.size = newSize;
	
	              this.setContentSize(newSize.width, newSize.height);
	
	              if (newVal !== oldVal) {
	                if (paper) {
	                  paper.trigger('remark:updateName', this.cell, newVal);
	                }
	              }
	
	              if (oldSize.width !== newSize.width || oldSize.height !== newSize.height) {
	
	                var dx = (oldSize.width - newSize.width) / 2;
	                var dy = (oldSize.height - newSize.height) / 2;
	                var pos = this.cell.getPosition();
	
	                pos.x += dx;
	                pos.y += dy;
	
	                this.cell.position = {
	                  x: pos.x,
	                  y: pos.y
	                };
	
	                this.translate();
	                if (paper) {
	                  paper.trigger('cells:updatePosition', [this.cell]);
	                }
	              }
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'detectContentSize',
	    value: function detectContentSize() {
	
	      var max = this.cell.getMaxSize();
	      var size = this.cell.getSize();
	
	      this.vel.addClass(classNames.float);
	      this.setContentSize(max.width, max.height);
	
	      var result = this.getContentSize();
	
	      this.setContentSize(size.width, size.height);
	      this.vel.removeClass(classNames.float);
	
	      return result;
	    }
	  }, {
	    key: 'setContentSize',
	    value: function setContentSize(width, height) {
	
	      this.findOne(selectors.foreignobject).attr({
	        width: width,
	        height: height
	      });
	    }
	  }, {
	    key: 'getContentSize',
	    value: function getContentSize() {
	
	      var elem = this.getContentElem();
	
	      return {
	        width: elem.offsetWidth || elem.clientWidth,
	        height: elem.offsetHeight || elem.clientHeight
	      };
	    }
	  }, {
	    key: 'getContentElem',
	    value: function getContentElem() {
	
	      return this.elem.querySelector(selectors.content);
	    }
	  }]);
	
	  return RemarkView;
	}(_CellView3.default);
	
	// exports
	// -------
	
	exports.default = RemarkView;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaults = {
	  paperScroll: null,
	  distance: 0
	};
	
	var Navigator = function () {
	  function Navigator(options) {
	    _classCallCheck(this, Navigator);
	
	    if (options) {
	      this.install(options);
	    }
	  }
	
	  _createClass(Navigator, [{
	    key: 'destroy',
	    value: function destroy() {
	
	      if (!this.destroyed) {
	        utils.removeElement(this.container);
	        utils.destroy(this);
	      }
	    }
	  }, {
	    key: 'install',
	    value: function install(options) {
	
	      this.options = utils.merge({}, defaults, options);
	      this.paperScroll = this.options.paperScroll;
	      this.paper = this.paperScroll.paper;
	
	      this.ensureElement();
	
	      return this;
	    }
	  }, {
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      this.container = utils.createElement('div');
	
	      this.paper.wrap.appendChild(this.container);
	
	      utils.addClass(this.container, 'pane-navigator');
	
	      return this;
	    }
	  }]);
	
	  return Navigator;
	}();
	
	// exports
	// -------
	
	exports.default = Navigator;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaults = {
	  paper: null,
	  distance: 0
	};
	
	var Snaplines = function () {
	  function Snaplines(options) {
	    _classCallCheck(this, Snaplines);
	
	    if (options) {
	      this.install(options);
	    }
	  }
	
	  _createClass(Snaplines, [{
	    key: 'destroy',
	    value: function destroy() {
	
	      if (!this.destroyed) {
	        this.hide();
	        utils.destroy(this);
	      }
	    }
	  }, {
	    key: 'install',
	    value: function install(options) {
	
	      this.options = utils.merge({}, defaults, options);
	      this.paper = this.options.paper;
	
	      this.ensureElement();
	
	      this.paper.on('cells:moving', this.onCellsMoving.bind(this));
	      this.paper.on('cells:moveEnd', this.onCellsMoveEnd.bind(this));
	    }
	  }, {
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      this.hLine = utils.createElement('div');
	      this.vLine = utils.createElement('div');
	
	      utils.addClass(this.hLine, 'pane-snapline horizontal');
	      utils.addClass(this.vLine, 'pane-snapline vertical');
	
	      return this;
	    }
	  }, {
	    key: 'onCellsMoving',
	    value: function onCellsMoving(cells, bounds) {
	
	      var previewCenter = bounds.getCenter();
	      var previewOrigin = bounds.getOrigin();
	      var previewCorner = bounds.getCorner();
	
	      this.vertical = null;
	      this.horizontal = null;
	
	      this.hide();
	
	      this.paper.eachView(function (view) {
	
	        var cell = view.cell;
	        if (!cell || !cell.isNode()) {
	          return;
	        }
	
	        // if (cells.length === 1 && cell === cells[0]) {
	        //    return;
	        // }
	
	        var snapBBox = cell.getBBox();
	        var snapCenter = snapBBox.getCenter();
	        var snapOrigin = snapBBox.getOrigin();
	        var snapCorner = snapBBox.getCorner();
	
	        this.check(previewCenter, snapCenter, bounds, snapBBox) || this.check(previewCenter, snapOrigin, bounds, snapBBox) || this.check(previewCenter, snapCorner, bounds, snapBBox) || this.check(previewOrigin, snapOrigin, bounds, snapBBox)
	        // || this.check(previewOrigin, snapCenter, bounds, snapBBox)
	         || this.check(previewOrigin, snapCorner, bounds, snapBBox) || this.check(previewCorner, snapOrigin, bounds, snapBBox)
	        // || this.check(previewCorner, snapCenter, bounds, snapBBox)
	         || this.check(previewCorner, snapCorner, bounds, snapBBox);
	      }, this);
	
	      this.show();
	    }
	  }, {
	    key: 'onCellsMoveEnd',
	    value: function onCellsMoveEnd() {
	
	      this.hide();
	    }
	  }, {
	    key: 'check',
	    value: function check(previewPoint, snapPoint, previewBBox, spanBBox) {
	
	      var distance = this.options.distance;
	
	      var vertical = this.vertical;
	      var horizontal = this.horizontal;
	
	      // horizontal
	      var diff = previewPoint.y - snapPoint.y;
	      if (Math.abs(diff) <= distance) {
	
	        if (!horizontal) {
	          horizontal = this.horizontal = {
	            top: snapPoint.y,
	            left: previewBBox.x,
	            right: previewBBox.x + previewBBox.width
	          };
	        }
	
	        horizontal.left = Math.min(horizontal.left, previewBBox.x, spanBBox.x);
	        horizontal.right = Math.max(horizontal.right, previewBBox.x + previewBBox.width, spanBBox.x + spanBBox.width);
	
	        return true;
	      }
	
	      // vertical
	      diff = previewPoint.x - snapPoint.x;
	      if (Math.abs(diff) <= distance) {
	
	        if (!vertical) {
	          vertical = this.vertical = {
	            left: snapPoint.x,
	            top: previewBBox.y,
	            bottom: previewBBox.y + previewBBox.height
	          };
	        }
	
	        vertical.top = Math.min(vertical.top, previewBBox.y, spanBBox.y);
	        vertical.bottom = Math.max(vertical.bottom, previewBBox.y + previewBBox.height, spanBBox.y + spanBBox.height);
	
	        return true;
	      }
	
	      return false;
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	
	      utils.removeElement(this.hLine);
	      utils.removeElement(this.vLine);
	
	      return this;
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	
	      var paper = this.paper;
	      var rawPane = paper.rawPane;
	
	      var sx = paper.sx;
	      var sy = paper.sy;
	      var tx = paper.tx;
	      var ty = paper.ty;
	
	      var vertical = this.vertical;
	      var horizontal = this.horizontal;
	
	      if (vertical) {
	
	        utils.setStyle(this.vLine, {
	          left: Math.round(vertical.left * sx + tx) + 'px',
	          top: Math.round(vertical.top * sy + ty) + 'px',
	          height: Math.round((vertical.bottom - vertical.top) * sy) + 'px'
	        });
	
	        rawPane.appendChild(this.vLine);
	      }
	
	      if (horizontal) {
	
	        utils.setStyle(this.hLine, {
	          left: Math.round(horizontal.left * sx + tx) + 'px',
	          top: Math.round(horizontal.top * sy + ty) + 'px',
	          width: Math.round((horizontal.right - horizontal.left) * sx) + 'px'
	        });
	
	        rawPane.appendChild(this.hLine);
	      }
	    }
	  }]);
	
	  return Snaplines;
	}();
	
	// exports
	// -------
	
	exports.default = Snaplines;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _detector = __webpack_require__(15);
	
	var _detector2 = _interopRequireDefault(_detector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaults = {
	  paper: null,
	  space: 50,
	  minWidth: 0,
	  minHeight: 0
	};
	
	var PaperScroll = function () {
	  function PaperScroll(options) {
	    _classCallCheck(this, PaperScroll);
	
	    if (options) {
	      this.install(options);
	    }
	  }
	
	  _createClass(PaperScroll, [{
	    key: 'destroy',
	    value: function destroy() {
	
	      if (!this.destroyed) {
	        utils.removeElement(this.scrollElem);
	        utils.destroy(this);
	      }
	    }
	  }, {
	    key: 'install',
	    value: function install(options) {
	
	      this.options = utils.merge({}, defaults, options);
	      this.space = utils.normalizeSides(this.options.space);
	      this.paper = this.options.paper;
	
	      var paper = this.paper;
	
	      // save scale for quick accessing
	      this.sx = paper.sx;
	      this.sy = paper.sy;
	
	      // save the original canvas size
	      this.baseWidth = paper.width;
	      this.baseHeight = paper.height;
	
	      // init for next calculating
	      this.scrollLeft = 0;
	      this.scrollTop = 0;
	      this.stageLevel = 0;
	      this.stageScrollLeft = 0;
	      this.stageScrollTop = 0;
	
	      paper.on('paper:scale', this.doScale, this);
	      paper.on('paper:resize', this.doResize, this);
	
	      this.ensureElement();
	      this.addScrollEvent();
	
	      this.doResize();
	      this.adjustClientSize();
	      this.adjustPadding();
	      this.center();
	    }
	  }, {
	    key: 'ensureElement',
	    value: function ensureElement() {
	
	      var paper = this.paper;
	      var scrollElem = utils.createElement('div');
	
	      this.scrollElem = scrollElem;
	      this.scrollParent = paper.getWrap();
	
	      utils.addClass(scrollElem, 'pane-scroll');
	
	      this.scrollElem.appendChild(paper.getStage());
	      this.scrollParent.appendChild(scrollElem);
	
	      return this;
	    }
	  }, {
	    key: 'addScrollEvent',
	    value: function addScrollEvent() {
	      var _this = this;
	
	      if (!this.onScroll) {
	        (function () {
	
	          var that = _this;
	
	          that.onScroll = function () {
	            that.setScroll(that.scrollParent.scrollLeft, that.scrollParent.scrollTop);
	          };
	        })();
	      }
	
	      utils.addEventListener(this.scrollParent, 'scroll', this.onScroll);
	
	      return this;
	    }
	  }, {
	    key: 'removeScrollEvent',
	    value: function removeScrollEvent() {
	
	      utils.removeEventListener(this.scrollParent, 'scroll', this.onScroll);
	
	      return this;
	    }
	  }, {
	    key: 'adjustClientSize',
	    value: function adjustClientSize() {
	
	      var scrollBarWidth = utils.getScrollBarWidth();
	      this.clientWidth = this.scrollParent.clientWidth - scrollBarWidth;
	      this.clientHeight = this.scrollParent.clientHeight - scrollBarWidth;
	
	      return this;
	    }
	  }, {
	    key: 'adjustPadding',
	    value: function adjustPadding(padding) {
	
	      if (padding) {
	        padding = utils.normalizeSides(padding);
	      } else {
	
	        var space = this.space;
	        var clientWidth = this.clientWidth;
	        var clientHeight = this.clientHeight;
	
	        padding = {
	          top: clientHeight - space.top,
	          right: clientWidth - space.right,
	          bottom: clientHeight - space.bottom,
	          left: clientWidth - space.left
	        };
	      }
	
	      this.padding = padding;
	
	      utils.setStyle(this.scrollElem, {
	        paddingTop: padding.top + 'px',
	        paddingRight: padding.right + 'px',
	        paddingBottom: padding.bottom + 'px',
	        paddingLeft: padding.left + 'px'
	      });
	
	      return this;
	    }
	  }, {
	    key: 'adjustPaper',
	    value: function adjustPaper() {
	
	      var paper = this.paper;
	
	      var sx = paper.sx;
	      var sy = paper.sy;
	
	      var options = {
	        frameWidth: this.baseWidth * sx,
	        frameHeight: this.baseHeight * sy
	      };
	
	      if (this.options.minWidth) {
	        options.minWidth = this.options.minWidth * sx;
	      }
	
	      if (this.options.minHeight) {
	        options.minHeight = this.options.minHeight * sy;
	      }
	
	      var tx = paper.tx;
	      var ty = paper.ty;
	
	      if (paper.fitToContent(options)) {
	
	        var dLeft = paper.tx - tx;
	        var dTop = paper.ty - ty;
	
	        if (dLeft !== 0 || dTop !== 0) {
	
	          this.increaseStage();
	          this.stageScroll(dLeft, dTop, { relative: true });
	          this.decreaseStage();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'doScale',
	    value: function doScale(sx, sy, ox, oy) {
	
	      this.sx = sx;
	      this.sy = sy;
	
	      this.adjustPaper();
	
	      if (ox || oy) {
	        this.center(ox, oy);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'doResize',
	    value: function doResize() {
	      var width = arguments.length <= 0 || arguments[0] === undefined ? this.baseWidth : arguments[0];
	      var height = arguments.length <= 1 || arguments[1] === undefined ? this.baseHeight : arguments[1];
	
	
	      utils.setStyle(this.scrollElem, {
	        width: width + 'px',
	        height: height + 'px'
	      });
	
	      return this;
	    }
	  }, {
	    key: 'applyScroll',
	    value: function applyScroll() {
	      var scrollLeft = arguments.length <= 0 || arguments[0] === undefined ? this.stageScrollLeft : arguments[0];
	      var scrollTop = arguments.length <= 1 || arguments[1] === undefined ? this.stageScrollTop : arguments[1];
	
	
	      this.removeScrollEvent();
	
	      this.scrollParent.scrollLeft = scrollLeft;
	      this.scrollParent.scrollTop = scrollTop;
	
	      this.setScroll(this.stageScrollLeft, this.stageScrollTop);
	      this.addScrollEvent();
	
	      return this;
	    }
	  }, {
	    key: 'setScroll',
	    value: function setScroll(scrollLeft, scrollTop) {
	
	      // save current scroll
	      this.scrollLeft = scrollLeft;
	      this.scrollTop = scrollTop;
	
	      return this;
	    }
	  }, {
	    key: 'stageScroll',
	    value: function stageScroll(scrollLeft, scrollTop) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	
	      if (options.relative) {
	        this.stageScrollLeft += scrollLeft;
	        this.stageScrollTop += scrollTop;
	      } else {
	        this.stageScrollLeft = scrollLeft;
	        this.stageScrollTop = scrollTop;
	      }
	
	      return this;
	    }
	  }, {
	    key: 'increaseStage',
	    value: function increaseStage() {
	
	      this.stageLevel += 1;
	
	      if (this.stageLevel === 1) {
	        this.stageScrollLeft = this.scrollLeft;
	        this.stageScrollTop = this.scrollTop;
	      }
	
	      return this;
	    }
	  }, {
	    key: 'decreaseStage',
	    value: function decreaseStage() {
	
	      this.stageLevel -= 1;
	
	      if (this.stageLevel === 0) {
	
	        this.applyScroll();
	
	        this.stageScrollLeft = 0;
	        this.stageScrollTop = 0;
	      }
	
	      return this;
	    }
	  }, {
	    key: 'center',
	    value: function center(x, y) {
	
	      // adjust the paper position so the point [x,y] is moved to the
	      // center of scroll element. If no point given [x,y] equals to
	      // center of the paper element.
	
	      var paper = this.paper;
	
	      var tx = paper.tx;
	      var ty = paper.ty;
	
	      if (utils.isUndefined(x) || utils.isUndefined(y)) {
	
	        // the paper rectangle
	        //   x1,y1 ---------
	        //   |             |
	        //   ----------- x2,y2
	        var x1 = -tx; // translate x
	        var y1 = -ty; // translate y
	        var x2 = x1 + paper.width;
	        var y2 = y1 + paper.height;
	
	        // get the center of the paper
	        x = (x1 + x2) / 2;
	        y = (y1 + y2) / 2;
	      } else {
	        // local coordinates to viewport coordinates
	        x *= paper.sx; // scale x
	        y *= paper.sy; // scale y
	      }
	
	      var dLeft = this.clientWidth / 2 - (x + tx + this.padding.left - this.scrollLeft);
	      var dTop = this.clientHeight / 2 - (y + ty + this.padding.top - this.scrollTop);
	
	      this.increaseStage();
	      this.stageScroll(-dLeft, -dTop, { relative: true });
	      this.decreaseStage();
	
	      return this;
	    }
	  }, {
	    key: 'centerContent',
	    value: function centerContent() {
	
	      var bound = this.paper.getContentBBox(true);
	      this.center(bound.x + bound.width / 2, bound.y + bound.height / 2);
	
	      return this;
	    }
	  }, {
	    key: 'toLocalPoint',
	    value: function toLocalPoint(x, y) {
	
	      // return point that relative to the stage's left-top corner
	      // x: x coordinate relative to the wrap
	      // y: y coordinate relative to the wrap
	
	      var paper = this.paper;
	      var padding = this.padding;
	
	      x += this.scrollLeft - padding.left - paper.tx;
	      x /= paper.sx;
	
	      y += this.scrollTop - padding.top - paper.ty;
	      y /= paper.sy;
	
	      return {
	        x: Math.round(x),
	        y: Math.round(y)
	      };
	    }
	  }, {
	    key: 'getCenter',
	    value: function getCenter() {
	
	      return this.toLocalPoint(this.clientWidth / 2, this.clientHeight / 2);
	    }
	  }, {
	    key: 'beforeZoom',
	    value: function beforeZoom() {
	
	      if (_detector2.default.IS_IE) {
	        // IE is trying to show every frame while we manipulate the paper.
	        // That makes the viewport kind of jumping while zooming.
	        utils.setStyle(this.elem, 'visibility', 'hidden');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'afterZoom',
	    value: function afterZoom() {
	
	      if (_detector2.default.IS_IE) {
	        utils.setStyle(this.elem, 'visibility', '');
	      }
	
	      return this;
	    }
	  }, {
	    key: 'zoom',
	    value: function zoom(value) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	
	      var sx = value;
	      var sy = value;
	
	      if (!options.absolute) {
	        sx += this.sx;
	        sy += this.sy;
	      }
	
	      var scaleGrid = options.scaleGrid;
	      if (scaleGrid) {
	        sx = utils.snapToGrid(sx, scaleGrid);
	        sy = utils.snapToGrid(sy, scaleGrid);
	      }
	
	      // check if the new scale won't exceed the given boundaries
	      var minScale = options.minScale;
	      var maxScale = options.maxScale;
	
	      sx = utils.clamp(sx, minScale || 0, maxScale || Number.MAX_VALUE);
	      sy = utils.clamp(sy, minScale || 0, maxScale || Number.MAX_VALUE);
	
	      // the scale center
	      var cx = options.cx;
	      var cy = options.cy;
	
	      // if the scale center is not specified find
	      // the center of the paper's visible area.
	      if (utils.isUndefined(cx) || utils.isUndefined(cy)) {
	
	        // the center of the container
	        var center = this.getCenter();
	
	        cx = center.x;
	        cy = center.y;
	      }
	
	      var dLeft = cx * (sx - this.sx);
	      var dTop = cy * (sy - this.sy);
	
	      this.beforeZoom();
	      this.increaseStage();
	
	      this.paper.scale(sx, sy);
	      this.stageScroll(dLeft, dTop, { relative: true });
	
	      this.decreaseStage();
	      this.afterZoom();
	
	      return this;
	    }
	  }, {
	    key: 'zoomToFit',
	    value: function zoomToFit() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	
	      var paper = this.paper;
	
	      var x = paper.tx;
	      var y = paper.ty;
	
	      var width = this.scrollParent.clientWidth;
	      var height = this.scrollParent.clientHeight;
	
	      options.fittingBBox = options.fittingBBox || { x: x, y: y, width: width, height: height };
	
	      this.beforeZoom();
	
	      // scale the viewport
	      paper.scaleContentToFit(options);
	      // restore original origin
	      paper.translate(x, y);
	
	      this.adjustPaper();
	      this.centerContent();
	
	      this.afterZoom();
	
	      return this;
	    }
	  }]);
	
	  return PaperScroll;
	}();
	
	// exports
	// -------
	
	exports.default = PaperScroll;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Handler = __webpack_require__(61);
	
	var _Handler2 = _interopRequireDefault(_Handler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Handler = function (_Base) {
	  _inherits(Handler, _Base);
	
	  function Handler() {
	    _classCallCheck(this, Handler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Handler).apply(this, arguments));
	  }
	
	  _createClass(Handler, [{
	    key: 'isGroup',
	    value: function isGroup(cell) {
	
	      return cell && cell.isGroup && cell.isGroup();
	    }
	  }, {
	    key: 'isRemark',
	    value: function isRemark(cell) {
	
	      return cell && cell.isRemark && cell.isRemark();
	    }
	  }, {
	    key: 'isNode',
	    value: function isNode(cell) {
	
	      return cell && cell.isNode();
	    }
	  }, {
	    key: 'isLink',
	    value: function isLink(cell) {
	
	      return cell && cell.isLink();
	    }
	  }]);
	
	  return Handler;
	}(_Handler2.default);
	
	// exports
	// -------
	
	exports.default = Handler;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _utils = __webpack_require__(5);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _Rect = __webpack_require__(4);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Handler2 = __webpack_require__(87);
	
	var _Handler3 = _interopRequireDefault(_Handler2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaults = {
	  multi: true,
	  movement: true,
	  areaSelect: true,
	  areaSelectKey: 'shift',
	  scrollDelay: 40,
	  scrollSense: 18
	};
	
	var classNames = {
	  previewRect: 'pane-selection-preview',
	  selectionRect: 'pane-selection-rect',
	  cursorMove: 'pane-cursor-move',
	  cursorMoving: 'pane-cursor-moving',
	  cursorCross: 'pane-cursor-cross'
	};
	
	var scrollBarWidth = utils.getScrollBarWidth();
	
	var SelectHandler = function (_Handler) {
	  _inherits(SelectHandler, _Handler);
	
	  function SelectHandler() {
	    _classCallCheck(this, SelectHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectHandler).apply(this, arguments));
	  }
	
	  _createClass(SelectHandler, [{
	    key: 'configure',
	    value: function configure(options) {
	
	      this.options = utils.merge({}, defaults, options);
	      this.scrollParent = utils.getScrollParent(this.getPaper().svg);
	
	      return this;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	
	      this.previewRect = utils.createElement('div');
	      this.selectionRect = utils.createElement('div');
	
	      utils.addClass(this.previewRect, classNames.previewRect);
	      utils.addClass(this.selectionRect, classNames.selectionRect);
	
	      this.focusedCell = null;
	      this.movingCells = [];
	      this.selectedCells = [];
	
	      this.origin = null;
	      this.bounds = null;
	
	      this.getPaper().on('cell:pointerDown', this.onCellMouseDown.bind(this)).on('cell:contextmenu', this.onCellContextMenu.bind(this)).on('blank:pointerDown', this.onBlankMouseDown.bind(this)).on('blank:pointerMove', this.onBlankMouseMove.bind(this)).on('blank:pointerUp', this.onBlankMouseUp.bind(this));
	
	      this.nodeMouseUpHandler = this.onCellMouseUp.bind(this);
	      this.nodeMouseMoveHandler = this.onCellMouseMove.bind(this);
	      this.keyUpHandler = this.onKeyUp.bind(this);
	      this.keyDownHandler = this.onKeyDown.bind(this);
	
	      utils.addEventListener(document.body, 'keydown', this.keyDownHandler);
	      utils.addEventListener(document.body, 'keyup', this.keyUpHandler);
	
	      this.switchMode(false);
	
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	
	      utils.removeEventListener(document.body, 'keydown', this.keyDownHandler);
	      utils.removeEventListener(document.body, 'keyup', this.keyUpHandler);
	
	      _get(Object.getPrototypeOf(SelectHandler.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: 'switchMode',
	    value: function switchMode(isSelectMode) {
	
	      this.isSelectMode = isSelectMode === true;
	      this.switchModeClass(this.isSelectMode);
	
	      return this;
	    }
	  }, {
	    key: 'switchModeClass',
	    value: function switchModeClass(isSelectMode) {
	
	      var wrap = this.getPaper().getWrap();
	      this.setCursorStyle(wrap, isSelectMode);
	
	      return this;
	    }
	  }, {
	    key: 'setCursorStyle',
	    value: function setCursorStyle(dom, isSelectMode) {
	
	      utils.removeClass(dom, classNames.cursorMove);
	      utils.removeClass(dom, classNames.cursorCross);
	
	      if (isSelectMode === true) {
	        utils.addClass(dom, classNames.cursorCross);
	      } else if (isSelectMode === false) {
	        utils.addClass(dom, classNames.cursorMove);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	
	      var areaSelectKey = this.options.areaSelectKey;
	
	      if (this.options.areaSelect && areaSelectKey) {
	        var method = 'has' + utils.ucFirst(areaSelectKey) + 'Key';
	        if (utils[method]) {
	          this.hasAreaSelectKey = utils[method](e);
	        }
	      }
	
	      if (this.hasAreaSelectKey && !this.isSelectMode) {
	        this.switchModeClass(true);
	      }
	    }
	  }, {
	    key: 'onKeyUp',
	    value: function onKeyUp() {
	
	      if (this.hasAreaSelectKey && !this.isSelectMode) {
	        this.switchModeClass(false);
	        this.hasAreaSelectKey = false;
	      }
	    }
	  }, {
	    key: 'onCellMouseDown',
	    value: function onCellMouseDown(cell, view, e, localX, localY) {
	
	      if (this.isDisabled()) {
	        return;
	      }
	
	      if (this.isNode(cell) && !this.isGroup(cell) && !this.isRemark(cell) && view.isPortElem(e.target)) {
	
	        return;
	      }
	
	      if (view.isBulbElem && view.isBulbElem(e.target)) {
	        return;
	      }
	
	      this.moving = false;
	      this.bounds = null;
	
	      if (this.isNode(cell)) {
	
	        this.lastX = localX;
	        this.lastY = localY;
	
	        this.origin = {
	          x: localX,
	          y: localY
	        };
	        this.movingCells = this.isCellSelected(cell) ? this.selectedCells : [cell];
	      }
	
	      this.getPaper().on('cell:pointerMove', this.nodeMouseMoveHandler).on('cell:pointerUp', this.nodeMouseUpHandler);
	    }
	  }, {
	    key: 'onCellMouseMove',
	    value: function onCellMouseMove(cell, view, e, localX, localY) {
	
	      if (this.isLink(cell) || !this.origin) {
	        return;
	      }
	
	      if (!this.moving) {
	
	        var bounds = this.getPreviewBounds();
	        if (bounds) {
	          this.bounds = bounds;
	          this.previewOriginX = bounds.x;
	          this.previewOriginY = bounds.y;
	
	          this.updatePreview(true);
	          this.showPreview();
	        }
	
	        this.moving = true;
	      }
	
	      if (this.bounds) {
	
	        this.stopScrollTimer();
	
	        var x = this.previewOriginX + localX - this.origin.x;
	        var y = this.previewOriginY + localY - this.origin.y;
	
	        var _bounds = this.getScrollBounds();
	        var direction = this.getMoveDirection(localX, localY);
	
	        this.bounds.x = Math.round(utils.clamp(x, _bounds.left, _bounds.right - this.bounds.width));
	        this.bounds.y = Math.round(utils.clamp(y, _bounds.top, _bounds.bottom - this.bounds.height));
	
	        this.updatePreview();
	
	        this.paper.trigger('cells:moving', this.movingCells, this.bounds);
	
	        if (this.movingCells.length === 1) {
	          this.paper.trigger('cell:moving', this.movingCells[0], this.bounds);
	        }
	
	        this.autoScrollPreview(direction);
	      }
	    }
	  }, {
	    key: 'onCellMouseUp',
	    value: function onCellMouseUp(cell, view, e, localX, localY) {
	
	      var dx = 0;
	      var dy = 0;
	
	      if (this.origin) {
	
	        this.hidePreview();
	
	        dx = localX - this.origin.x;
	        dy = localY - this.origin.y;
	      }
	
	      var paper = this.getPaper();
	
	      // movement
	      if (this.moving && (dx !== 0 || dy !== 0)) {
	
	        dx = this.bounds.x - this.previewOriginX;
	        dy = this.bounds.y - this.previewOriginY;
	
	        this.stopScrollTimer();
	
	        if (dx !== 0 || dy !== 0) {
	          this.updateNodesPosition(this.movingCells, dx, dy);
	        }
	      } else {
	
	        if (cell.isLink()) {
	          this.clearSelection();
	          this.setCellFocused(cell, view);
	        } else {
	
	          var multi = this.options.multi && utils.hasModifierKey(e);
	          this.selectCell(cell, view, multi);
	          this.notifySelectionChange();
	
	          if (!multi) {
	            this.setCellFocused(cell, view);
	          }
	        }
	      }
	
	      if (this.moving) {
	
	        paper.trigger('cells:moveEnd', this.movingCells, this.bounds);
	
	        if (this.movingCells.length === 1) {
	          paper.trigger('cell:moveEnd', this.movingCells[0], this.bounds);
	        }
	      }
	
	      if (this.origin) {
	
	        paper.off('cell:pointerMove', this.nodeMouseMoveHandler).off('cell:pointerUp', this.nodeMouseUpHandler);
	      }
	
	      this.lastX = null;
	      this.lastY = null;
	      this.origin = null;
	      this.bounds = null;
	      this.moving = false;
	      this.movingCells = null;
	    }
	  }, {
	    key: 'onCellContextMenu',
	    value: function onCellContextMenu(cell, view) {
	
	      // select cell when context menu
	      if (this.isNode(cell) && !this.isGroup(cell) && !this.isRemark(cell)) {
	        if (!this.isCellSelected(cell)) {
	          this.selectCell(cell, view);
	          // this.setCellFocused(cell, view);
	        }
	      }
	    }
	  }, {
	    key: 'onBlankMouseDown',
	    value: function onBlankMouseDown(e, localX, localY) {
	
	      if (this.isDisabled() || this.isOnScrollBar(e)) {
	        return;
	      }
	
	      this.isAreaSelect = this.isSelectMode || this.hasAreaSelectKey;
	      this.isMovement = !this.isAreaSelect && this.options.movement;
	
	      if (this.isAreaSelect) {
	
	        this.origin = {
	          x: localX,
	          y: localY
	        };
	      }
	
	      if (this.isMovement) {
	
	        this.origin = {
	          x: e.pageX,
	          y: e.pageY
	        };
	        this.originScrollLeft = this.scrollParent.scrollLeft;
	        this.originScrollTop = this.scrollParent.scrollTop;
	
	        var wrap = this.getPaper().getWrap();
	
	        utils.removeClass(wrap, classNames.cursorMove);
	        utils.addClass(wrap, classNames.cursorMoving);
	        utils.addClass(document.body, classNames.cursorMoving);
	      }
	
	      if (!utils.hasModifierKey(e)) {
	        this.clearSelection();
	      }
	    }
	  }, {
	    key: 'onBlankMouseMove',
	    value: function onBlankMouseMove(e, localX, localY) {
	
	      if (this.isDisabled()) {
	        return;
	      }
	
	      if (this.isAreaSelect) {
	        this.onAreaSelect(e, localX, localY);
	      } else if (this.isMovement) {
	        this.onMovement(e, localX, localY);
	      }
	    }
	  }, {
	    key: 'onAreaSelect',
	    value: function onAreaSelect(e, localX, localY) {
	
	      if (!this.moving) {
	        this.setCursorStyle(document.body, true);
	        this.showSelectionRect();
	        this.moving = true;
	      }
	
	      if (this.moving) {
	
	        var origin = this.origin;
	        var bounds = this.getScrollBounds();
	
	        var x = localX;
	        var y = localY;
	        var width = Math.abs(x - origin.x);
	        var height = Math.abs(y - origin.y);
	
	        var max = void 0;
	
	        if (x >= origin.x) {
	
	          x = origin.x;
	          max = bounds.right - x;
	
	          if (width > max) {
	            width = Math.round(max);
	          }
	        } else {
	
	          max = origin.x - bounds.left;
	
	          if (width > max) {
	            width = Math.round(max);
	            x = Math.round(bounds.left);
	          }
	        }
	
	        if (y >= origin.y) {
	
	          y = origin.y;
	          max = bounds.bottom - y;
	
	          if (max < height) {
	            height = Math.round(max);
	          }
	        } else {
	
	          max = origin.y - bounds.top;
	
	          if (height > max) {
	            height = Math.round(max);
	            y = Math.round(bounds.top);
	          }
	        }
	
	        this.bounds = {
	          x: x,
	          y: y,
	          width: width,
	          height: height
	        };
	
	        this.stopScrollTimer();
	        this.updateSelectionRect();
	        this.autoScrollSelectionRect(localX, localY);
	      }
	    }
	  }, {
	    key: 'onMovement',
	    value: function onMovement(e) {
	
	      if (!this.moving) {
	        this.moving = true;
	      }
	
	      var dx = this.origin.x - e.pageX;
	      var dy = this.origin.y - e.pageY;
	
	      this.scrollParent.scrollLeft = this.originScrollLeft + dx;
	      this.scrollParent.scrollTop = this.originScrollTop + dy;
	    }
	  }, {
	    key: 'onBlankMouseUp',
	    value: function onBlankMouseUp(e) {
	
	      if (this.isDisabled()) {
	        return;
	      }
	
	      if (this.isAreaSelect) {
	
	        if (!utils.hasModifierKey(e)) {
	          this.clearSelection();
	        }
	
	        if (this.moving && this.bounds) {
	          // range selection
	          this.stopScrollTimer();
	          this.hideSelectionRect();
	          this.selectCellsInRect(this.bounds);
	        }
	
	        this.notifySelectionChange();
	        this.setCellFocused(null);
	      } else if (this.isMovement) {
	
	        this.originScrollLeft = 0;
	        this.originScrollTop = 0;
	
	        if (!this.moving) {
	          this.clearSelection();
	          this.notifySelectionChange();
	          this.setCellFocused(null);
	        }
	
	        var wrap = this.getPaper().getWrap();
	
	        utils.addClass(wrap, classNames.cursorMove);
	        utils.removeClass(wrap, classNames.cursorMoving);
	        utils.removeClass(document.body, classNames.cursorMoving);
	      }
	
	      if (this.isAreaSelect || this.isMovement) {
	        this.setCursorStyle(document.body);
	      }
	
	      this.switchModeClass(!!this.isSelectMode);
	
	      this.bounds = null;
	      this.origin = null;
	      this.moving = false;
	
	      this.isMovement = false;
	      this.isAreaSelect = false;
	    }
	  }, {
	    key: 'getScrollBounds',
	    value: function getScrollBounds(isViewport) {
	
	      var paper = this.getPaper();
	      var scrollParent = this.scrollParent;
	      var stageParent = paper.stage.parentNode;
	
	      var sx = paper.sx;
	      var sy = paper.sy;
	
	      var scrollTop = scrollParent.scrollTop;
	      var scrollLeft = scrollParent.scrollLeft;
	      var scrollWidth = scrollParent.scrollWidth;
	      var scrollHeight = scrollParent.scrollHeight;
	      var clientWidth = scrollParent.clientWidth;
	      var clientHeight = scrollParent.clientHeight;
	      var paddingLeft = utils.toInt(stageParent.style.paddingLeft);
	      var paddingTop = utils.toInt(stageParent.style.paddingTop);
	
	      return isViewport ? {
	        left: (scrollLeft - paddingLeft - paper.tx) / sx,
	        top: (scrollTop - paddingTop - paper.ty) / sy,
	        right: (clientWidth + scrollLeft - paddingLeft - paper.tx) / sx,
	        bottom: (clientHeight + scrollTop - paddingTop - paper.ty) / sy
	      } : {
	        left: -(paddingLeft + paper.tx) / sx,
	        top: -(paddingTop + paper.ty) / sy,
	        right: (scrollWidth - paddingLeft - paper.tx) / sx,
	        bottom: (scrollHeight - paddingTop - paper.ty) / sy
	      };
	    }
	  }, {
	    key: 'getMoveDirection',
	    value: function getMoveDirection(localX, localY) {
	
	      var dx = localX - this.lastX;
	      var dy = localY - this.lastY;
	
	      this.lastX = localX;
	      this.lastY = localY;
	
	      // top   : 1
	      // right : 2
	      // bottom: 3
	      // left  : 4
	      var direction = 0;
	
	      if (Math.abs(dx) > Math.abs(dy)) {
	        direction = dx > 0 ? 2 : 4;
	      } else {
	        direction = dy > 0 ? 3 : 1;
	      }
	
	      return direction;
	    }
	  }, {
	    key: 'stopScrollTimer',
	    value: function stopScrollTimer() {
	
	      if (this.scrollTimer) {
	        clearTimeout(this.scrollTimer);
	        this.scrollTimer = 0;
	      }
	
	      return this;
	    }
	  }, {
	    key: 'getPreviewBounds',
	    value: function getPreviewBounds() {
	
	      var bounds = null;
	
	      utils.forEach(this.movingCells, function (node) {
	        if (node.isNode()) {
	          var rect = node.getBBox();
	          if (rect) {
	            bounds = bounds ? bounds.union(rect) : rect;
	          }
	        }
	      });
	
	      return bounds;
	    }
	  }, {
	    key: 'autoScrollPreview',
	    value: function autoScrollPreview(direction) {
	
	      if (this.isParentScrollable()) {
	
	        var bounds = this.bounds;
	        var paper = this.getPaper();
	
	        var sx = paper.sx;
	        var sy = paper.sy;
	
	        var scrollParent = this.scrollParent;
	        var scrollWidth = scrollParent.scrollWidth;
	        var scrollHeight = scrollParent.scrollHeight;
	        var clientWidth = scrollParent.clientWidth;
	        var clientHeight = scrollParent.clientHeight;
	
	        var sense = this.options.scrollSense;
	
	        var x = bounds.x;
	        var y = bounds.y;
	
	        var width = bounds.width;
	        var height = bounds.height;
	
	        var scrollTop = scrollParent.scrollTop;
	        var scrollLeft = scrollParent.scrollLeft;
	
	        var sBounds = this.getScrollBounds();
	        var vBounds = this.getScrollBounds(true);
	
	        var minX = vBounds.left;
	        var minY = vBounds.top;
	        var maxX = vBounds.right - width;
	        var maxY = vBounds.bottom - height;
	
	        var scrolled = false;
	
	        if (direction === 4 && scrollLeft > 0 && Math.round(x - minX) <= 0) {
	          // scroll left
	          scrolled = true;
	
	          bounds.x = Math.round(Math.max(sBounds.left, minX - sense / sx));
	          scrollLeft = Math.round(Math.max(0, scrollLeft - sense));
	        } else if (direction === 2 && scrollLeft < scrollWidth - clientWidth && Math.round(x - maxX) >= 0) {
	
	          // scroll right
	          scrolled = true;
	
	          bounds.x = Math.round(Math.min(sBounds.right - width, maxX + sense / sx));
	          scrollLeft = Math.round(Math.min(scrollWidth - clientWidth, scrollLeft + sense));
	        } else if (direction === 1 && scrollTop > 0 && Math.round(y - minY) <= 0) {
	
	          // scroll top
	          scrolled = true;
	
	          bounds.y = Math.round(Math.max(sBounds.top, minY - sense / sy));
	          scrollTop = Math.round(Math.max(0, scrollTop - sense));
	        } else if (direction === 3 && scrollTop < scrollHeight - clientHeight && Math.round(y - maxY) >= 0) {
	
	          scrolled = true;
	
	          bounds.y = Math.round(Math.min(sBounds.bottom - height, maxY + sense / sy));
	          scrollTop = Math.round(Math.min(scrollHeight - clientHeight, scrollTop + sense));
	        }
	
	        if (scrolled) {
	          scrollParent.scrollTop = scrollTop;
	          scrollParent.scrollLeft = scrollLeft;
	          this.updatePreview();
	          this.scrollTimer = setTimeout(this.autoScrollPreview.bind(this, direction), this.options.scrollDelay);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updatePreview',
	    value: function updatePreview(resize) {
	
	      var bounds = this.bounds;
	      if (bounds) {
	
	        var paper = this.getPaper();
	        var elem = this.previewRect;
	
	        var x = Math.round(bounds.x * paper.sx + paper.tx);
	        var y = Math.round(bounds.y * paper.sy + paper.ty);
	
	        utils.setTranslate(elem, x, y);
	
	        // update size
	        if (resize) {
	
	          var width = Math.round(bounds.width * paper.sx);
	          var height = Math.round(bounds.height * paper.sy);
	
	          utils.setStyle(elem, {
	            width: width + 'px',
	            height: height + 'px'
	          });
	
	          var borderRadius = '';
	
	          if (this.movingCells.length === 1 && !this.isGroup(this.movingCells[0]) && !this.isRemark(this.movingCells[0])) {
	
	            borderRadius = Math.floor(height / 2) + 'px';
	          }
	
	          utils.setStyle(elem, {
	            'border-radius': borderRadius
	          });
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'hidePreview',
	    value: function hidePreview() {
	
	      utils.removeElement(this.previewRect);
	
	      return this;
	    }
	  }, {
	    key: 'showPreview',
	    value: function showPreview() {
	
	      var paper = this.getPaper();
	      if (paper && paper.rawPane) {
	        paper.rawPane.appendChild(this.previewRect);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'hideSelectionRect',
	    value: function hideSelectionRect() {
	
	      utils.removeElement(this.selectionRect);
	
	      return this;
	    }
	  }, {
	    key: 'showSelectionRect',
	    value: function showSelectionRect() {
	
	      var paper = this.getPaper();
	      if (paper && paper.rawPane) {
	        paper.rawPane.appendChild(this.selectionRect);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'updateSelectionRect',
	    value: function updateSelectionRect() {
	
	      var bounds = this.bounds;
	      if (bounds) {
	
	        var paper = this.getPaper();
	        var elem = this.selectionRect;
	
	        var x = Math.round(bounds.x * paper.sx + paper.tx);
	        var y = Math.round(bounds.y * paper.sy + paper.ty);
	        var width = Math.round(bounds.width * paper.sx);
	        var height = Math.round(bounds.height * paper.sy);
	
	        utils.setTranslate(elem, x, y);
	        utils.setStyle(elem, {
	          width: width + 'px',
	          height: height + 'px'
	        });
	      }
	
	      return this;
	    }
	  }, {
	    key: 'autoScrollSelectionRect',
	    value: function autoScrollSelectionRect(localX, localY) {
	
	      if (this.isParentScrollable()) {
	
	        var sense = this.options.scrollSense;
	        var bounds = this.bounds;
	        var scrolled = false;
	
	        var scrollParent = this.scrollParent;
	        var scrollWidth = scrollParent.scrollWidth;
	        var scrollHeight = scrollParent.scrollHeight;
	        var clientWidth = scrollParent.clientWidth;
	        var clientHeight = scrollParent.clientHeight;
	        var scrollTop = scrollParent.scrollTop;
	        var scrollLeft = scrollParent.scrollLeft;
	
	        var paper = this.getPaper();
	
	        var sx = paper.sx;
	        var sy = paper.sy;
	
	        var sBounds = this.getScrollBounds();
	        var vBounds = this.getScrollBounds(true);
	
	        if (scrollLeft > 0 && localX <= vBounds.left) {
	
	          // scroll left
	          scrolled = true;
	          localX -= sense / sx;
	
	          bounds.x = Math.round(Math.max(sBounds.left, bounds.x - sense / sx));
	          scrollLeft = Math.round(Math.max(0, scrollLeft - sense));
	        } else if (scrollLeft < scrollWidth - clientWidth && localX >= vBounds.right) {
	
	          // scroll right
	          scrolled = true;
	          localX += sense / sx;
	
	          bounds.width = Math.round(Math.min(sBounds.right - bounds.x, bounds.width + sense / sx));
	          scrollLeft = Math.round(Math.min(scrollWidth - clientWidth, scrollLeft + sense));
	        } else if (scrollTop > 0 && localY < vBounds.top) {
	
	          // scroll top
	          scrolled = true;
	          localY -= sense / sy;
	
	          bounds.y = Math.round(Math.max(sBounds.top, bounds.y - sense / sy));
	          scrollTop = Math.round(Math.max(0, scrollTop - sense));
	        } else if (scrollTop < scrollHeight - clientHeight && localY > vBounds.bottom) {
	
	          // scroll bottom
	          scrolled = true;
	          localY += sense / sy;
	
	          bounds.height = Math.round(Math.min(sBounds.bottom - bounds.y, bounds.height + sense / sy));
	          scrollTop = Math.round(Math.min(scrollHeight - clientHeight, scrollTop + sense));
	        }
	
	        if (scrolled) {
	          scrollParent.scrollTop = scrollTop;
	          scrollParent.scrollLeft = scrollLeft;
	          this.updateSelectionRect();
	          this.scrollTimer = setTimeout(this.autoScrollSelectionRect.bind(this, localX, localY), this.options.scrollDelay);
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'selectCellsInRect',
	    value: function selectCellsInRect(area) {
	
	      var model = this.getModel();
	      var cells = model && model.findCellInArea(_Rect2.default.fromRect(area));
	
	      this.selectCells(cells);
	
	      return this;
	    }
	  }, {
	    key: 'selectCells',
	    value: function selectCells(cells) {
	
	      if (cells && cells.length) {
	        utils.forEach(cells, function (cell) {
	          this.setSelected(cell, this.paper.getView(cell), true);
	        }, this);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'selectCell',
	    value: function selectCell(cell, view, multi) {
	
	      if (multi) {
	        this.setSelected(cell, view, !cell.selected);
	      } else {
	        this.clearSelection().setSelected(cell, view, true);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'isCellSelected',
	    value: function isCellSelected(cell) {
	
	      return cell.selected === true;
	    }
	  }, {
	    key: 'setSelected',
	    value: function setSelected(cell, view, selected) {
	
	      selected = !!selected;
	
	      if (selected !== cell.selected) {
	
	        cell.selected = selected;
	
	        if (selected) {
	          this.selectedCells.push(cell);
	        } else {
	          if (utils.contains(this.selectedCells, cell)) {
	            this.selectedCells.splice(utils.indexOf(this.selectedCells, cell), 1);
	          }
	
	          cell.selected = false;
	        }
	
	        utils.toggleClass(view.elem, 'selected', cell.selected);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'clearSelection',
	    value: function clearSelection() {
	
	      var paper = this.getPaper();
	
	      utils.forEach(this.selectedCells, function (cell) {
	
	        var view = paper.getView(cell);
	        if (view) {
	          utils.removeClass(view.elem, 'selected');
	        }
	
	        cell.selected = false;
	      });
	
	      this.selectedCells = [];
	
	      return this;
	    }
	  }, {
	    key: 'setCellFocused',
	    value: function setCellFocused(cell, view) {
	
	      if (this.focusedCell !== cell) {
	
	        if (this.focusedCell) {
	
	          var focusedView = this.getPaper().getView(this.focusedCell);
	          if (focusedView) {
	            utils.removeClass(focusedView.elem, 'focused');
	          }
	
	          this.focusedCell = null;
	        }
	
	        if (cell && view) {
	          utils.addClass(view.elem, 'focused');
	          this.focusedCell = cell;
	        }
	      }
	
	      this.notifyFocus();
	
	      return this;
	    }
	  }, {
	    key: 'divGroupsAndNodes',
	    value: function divGroupsAndNodes() {
	      var _this2 = this;
	
	      var cells = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	
	      var nodes = [];
	      var groups = [];
	      var nodeById = {};
	
	      utils.forEach(cells, function (cell) {
	
	        if (_this2.isGroup(cell)) {
	
	          groups.push(cell);
	
	          var ret = _this2.divGroupsAndNodes(cell.getChildren());
	
	          utils.forEach(ret.nodes, function (node) {
	            if (!nodeById[node.id]) {
	              nodes.push(node);
	              nodeById[node.id] = true;
	            }
	          });
	
	          groups.push.apply(groups, _toConsumableArray(ret.groups));
	        } else {
	
	          if (!nodeById[cell.id]) {
	            nodes.push(cell);
	            nodeById[cell.id] = true;
	          }
	        }
	      });
	
	      return {
	        nodes: nodes,
	        groups: groups
	      };
	    }
	  }, {
	    key: 'updateNodesPosition',
	    value: function updateNodesPosition() {
	      var cells = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	      var _this3 = this;
	
	      var dx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	      var dy = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	      var _divGroupsAndNodes = this.divGroupsAndNodes(cells);
	
	      var nodes = _divGroupsAndNodes.nodes;
	      var groups = _divGroupsAndNodes.groups;
	
	
	      var paper = this.getPaper();
	      var model = this.getModel();
	
	      model.beginUpdate();
	
	      utils.forEach(nodes, function (node) {
	
	        var position = node.getPosition();
	
	        node.setPosition({
	          x: position.x + dx,
	          y: position.y + dy,
	          relative: position.relative === true
	        });
	      });
	
	      utils.forEach(groups, function (group) {
	
	        var position = group.getPosition();
	
	        group.setPosition({
	          x: position.x + dx,
	          y: position.y + dy,
	          relative: position.relative === true
	        });
	      });
	
	      model.endUpdate();
	
	      var shouldUpdate = function shouldUpdate(parentNode) {
	        return _this3.isGroup(parentNode) && !utils.some(groups, function (group) {
	          return parentNode === group;
	        });
	      };
	
	      utils.forEach(nodes, function (node) {
	
	        var parentNode = node.getParent();
	        while (parentNode) {
	
	          if (shouldUpdate(parentNode)) {
	            parentNode.updateGeometry();
	          }
	
	          parentNode = parentNode.getParent();
	        }
	      });
	
	      utils.forEach(nodes, function (node) {
	        // invisible node should be updated geometry manually,
	        // otherwise the node position would not be saved to server
	        if (!node.isVisible()) {
	          paper.updateNodeGeometry(node);
	        }
	      });
	
	      this.notifyPositionChange(nodes);
	    }
	  }, {
	    key: 'isParentScrollable',
	    value: function isParentScrollable() {
	
	      var scrollParent = this.scrollParent;
	
	      return scrollParent.scrollWidth > scrollParent.clientWidth || scrollParent.scrollHeight > scrollParent.clientHeight;
	    }
	  }, {
	    key: 'isOnScrollBar',
	    value: function isOnScrollBar(e) {
	
	      var paper = this.getPaper();
	      var bounds = utils.getBounds(paper.getWrap());
	
	      var maxX = bounds.left + bounds.width;
	      var minX = maxX - scrollBarWidth;
	
	      var maxY = bounds.top + bounds.height;
	      var minY = maxY - scrollBarWidth;
	
	      return utils.isWithin(e.pageX, minX, maxX) || utils.isWithin(e.pageY, minY, maxY);
	    }
	  }, {
	    key: 'notifyMoving',
	    value: function notifyMoving() {
	
	      this.getPaper().trigger('cells:moving', this.bounds, this.movingCells);
	    }
	  }, {
	    key: 'notifyFocus',
	    value: function notifyFocus() {
	
	      if (this.focusedCell) {
	        this.getPaper().trigger('cell:focus', this.focusedCell);
	      } else {
	        this.getPaper().trigger('paper:focus');
	      }
	    }
	  }, {
	    key: 'notifySelectionChange',
	    value: function notifySelectionChange() {
	
	      this.getPaper().trigger('cells:selectionChanged', this.selectedCells);
	    }
	  }, {
	    key: 'notifyPositionChange',
	    value: function notifyPositionChange(nodes) {
	
	      this.getPaper().trigger('cells:updatePosition', nodes);
	    }
	  }]);
	
	  return SelectHandler;
	}(_Handler3.default);
	
	// exports
	// -------
	
	exports.default = SelectHandler;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Handler2 = __webpack_require__(87);
	
	var _Handler3 = _interopRequireDefault(_Handler2);
	
	var _Link = __webpack_require__(60);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	var _LinkView = __webpack_require__(79);
	
	var _LinkView2 = _interopRequireDefault(_LinkView);
	
	var _quadratic = __webpack_require__(90);
	
	var _quadratic2 = _interopRequireDefault(_quadratic);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ConnectionHandler = function (_Handler) {
	  _inherits(ConnectionHandler, _Handler);
	
	  function ConnectionHandler() {
	    _classCallCheck(this, ConnectionHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionHandler).apply(this, arguments));
	  }
	
	  _createClass(ConnectionHandler, [{
	    key: 'init',
	    value: function init() {
	
	      this.clean();
	
	      this.getPaper().on('cell:pointerDown', this.onCellMouseDown.bind(this));
	
	      this.mouseUpHandler = this.onCellMouseUp.bind(this);
	      this.mouseMoveHandler = this.onCellMouseMove.bind(this);
	      this.mouseEnterHandler = this.onCellMouseEnter.bind(this);
	      this.mouseLeaveHandler = this.onCellMouseLeave.bind(this);
	
	      return this;
	    }
	  }, {
	    key: 'clean',
	    value: function clean() {
	
	      this.sourceNode = null;
	      this.sourcePort = null;
	      this.sourceView = null;
	      this.connecting = false;
	
	      this.targetNode = null;
	      this.targetView = null;
	      this.targetPort = null;
	      this.hasTarget = false;
	
	      this.localX = null;
	      this.localY = null;
	
	      return this;
	    }
	  }, {
	    key: 'getEventData',
	    value: function getEventData() {
	
	      return {
	        sourceNode: this.sourceNode,
	        sourceView: this.sourceView,
	        sourcePort: this.sourcePort,
	        targetNode: this.targetNode,
	        targetView: this.targetView,
	        targetPort: this.targetPort,
	        localX: this.localX,
	        localY: this.localY
	      };
	    }
	  }, {
	    key: 'onCellMouseDown',
	    value: function onCellMouseDown(cell, view, e) {
	
	      if (this.isDisabled() || this.isGroup(cell) || this.isRemark(cell) || !this.isNode(cell)) {
	        return;
	      }
	
	      if (!view.isOutPortElem(e.target)) {
	        return;
	      }
	
	      this.sourceNode = cell;
	      this.sourceView = view;
	      this.sourcePort = view.findPortByElem(e.target);
	
	      if (this.sourcePort) {
	        this.getPaper().on('cell:pointerMove', this.mouseMoveHandler).on('cell:pointerUp', this.mouseUpHandler);
	      }
	    }
	  }, {
	    key: 'onCellMouseMove',
	    value: function onCellMouseMove(cell, view, e, localX, localY) {
	
	      var paper = this.getPaper();
	      var model = this.getModel();
	
	      model.beginUpdate();
	
	      if (!this.connecting) {
	
	        this.getPaper().on('cell:mouseenter', this.mouseEnterHandler).on('cell:mouseleave', this.mouseLeaveHandler);
	
	        this.link = new _Link2.default({
	          view: _LinkView2.default,
	          pane: 'linkPane',
	          // special className for ignore default event handler
	          classNames: 'pane-link pane-link-connecting',
	          connector: _quadratic2.default,
	          sourceMarker: null,
	          targetMarker: 'block',
	          attrs: null
	        });
	
	        model.addLink(this.link, {
	          node: cell,
	          port: this.sourcePort.id
	        });
	
	        this.connecting = true;
	      }
	
	      if (this.link) {
	        // for smooth connecting, do not use the snapped local-point.
	        this.link.setTerminal(paper.toLocalPoint({
	          x: e.pageX,
	          y: e.pageY
	        }), false);
	      }
	
	      model.endUpdate();
	
	      if (this.targetView) {
	        this.localX = localX;
	        this.localY = localY;
	        this.targetPort = this.targetView.findPortByElem(e.target);
	      } else {
	        this.localX = null;
	        this.localY = null;
	        this.targetPort = null;
	      }
	
	      paper.trigger('cell:connecting', this.getEventData());
	    }
	  }, {
	    key: 'onCellMouseUp',
	    value: function onCellMouseUp() {
	
	      if (this.connecting) {
	
	        var paper = this.getPaper();
	        var model = this.getModel();
	
	        paper.off('cell:pointerMove', this.mouseMoveHandler).off('cell:pointerUp', this.mouseUpHandler).off('cell:mouseenter', this.mouseEnterHandler).off('cell:mouseleave', this.mouseLeaveHandler);
	
	        model.beginUpdate();
	
	        this.link.removeFromParent();
	
	        paper.trigger('cell:connected', this.getEventData());
	        model.endUpdate();
	
	        this.clean();
	      }
	    }
	  }, {
	    key: 'onCellMouseEnter',
	    value: function onCellMouseEnter(cell, view, e) {
	
	      if (this.isGroup(cell) || !this.isNode(cell)) {
	        return;
	      }
	
	      if (cell === this.sourceCell || !this.connecting) {
	        return;
	      }
	
	      this.hasTarget = true;
	      this.targetNode = cell;
	      this.targetView = view;
	      this.targetPort = view.findPortByElem(e.target);
	    }
	  }, {
	    key: 'onCellMouseLeave',
	    value: function onCellMouseLeave(cell) {
	
	      if (this.isGroup(cell) || !this.isNode(cell)) {
	        return;
	      }
	
	      if (!this.hasTarget || !this.connecting) {
	        return;
	      }
	
	      this.hasTarget = false;
	      this.targetNode = null;
	      this.targetView = null;
	      this.targetPort = null;
	    }
	  }]);
	
	  return ConnectionHandler;
	}(_Handler3.default);
	
	// exports
	// -------
	
	exports.default = ConnectionHandler;

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function quadratic(sourcePoint, targetPoint) {
	
	  var centerX = (sourcePoint.x + targetPoint.x) / 2;
	  var centerY = (sourcePoint.y + targetPoint.y) / 2;
	  var tolerance = 50;
	
	  var sub = targetPoint.y - sourcePoint.y;
	
	  if (sub > -100 && sub < 100) {
	    tolerance = Math.max(Math.abs(targetPoint.y - sourcePoint.y) / 2, 30);
	  }
	
	  return ['M', sourcePoint.x, sourcePoint.y, 'Q', sourcePoint.x, sourcePoint.y + tolerance, centerX, centerY, 'T', targetPoint.x, targetPoint.y].join(' ');
	}
	
	// exports
	// -------
	
	exports.default = quadratic;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=panejs-pai-0.2.2.js.map