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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.shapes = exports.Paper = exports.Model = exports.ChildChange = exports.RootChange = exports.Change = exports.NodeView = exports.LinkView = exports.CellView = exports.Node = exports.Link = exports.Cell = exports.Events = exports.VElement = exports.vector = exports.utils = undefined;
	
	var _vector2 = __webpack_require__(1);
	
	Object.defineProperty(exports, 'VElement', {
	    enumerable: true,
	    get: function get() {
	        return _vector2.VElement;
	    }
	});
	
	var _utils2 = __webpack_require__(2);
	
	var _utils = _interopRequireWildcard(_utils2);
	
	var _vector3 = _interopRequireDefault(_vector2);
	
	var _Events2 = __webpack_require__(14);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	var _Cell2 = __webpack_require__(15);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	var _Link2 = __webpack_require__(16);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	var _Node2 = __webpack_require__(17);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _CellView2 = __webpack_require__(18);
	
	var _CellView3 = _interopRequireDefault(_CellView2);
	
	var _LinkView2 = __webpack_require__(20);
	
	var _LinkView3 = _interopRequireDefault(_LinkView2);
	
	var _NodeView2 = __webpack_require__(21);
	
	var _NodeView3 = _interopRequireDefault(_NodeView2);
	
	var _Change2 = __webpack_require__(22);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	var _RootChange2 = __webpack_require__(23);
	
	var _RootChange3 = _interopRequireDefault(_RootChange2);
	
	var _ChildChange2 = __webpack_require__(24);
	
	var _ChildChange3 = _interopRequireDefault(_ChildChange2);
	
	var _Model2 = __webpack_require__(25);
	
	var _Model3 = _interopRequireDefault(_Model2);
	
	var _Paper2 = __webpack_require__(27);
	
	var _Paper3 = _interopRequireDefault(_Paper2);
	
	var _Generic = __webpack_require__(28);
	
	var _Generic2 = _interopRequireDefault(_Generic);
	
	var _Text = __webpack_require__(29);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Rect = __webpack_require__(30);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Circle = __webpack_require__(31);
	
	var _Circle2 = _interopRequireDefault(_Circle);
	
	var _Ellipse = __webpack_require__(32);
	
	var _Ellipse2 = _interopRequireDefault(_Ellipse);
	
	var _Image = __webpack_require__(33);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	var _Path = __webpack_require__(34);
	
	var _Path2 = _interopRequireDefault(_Path);
	
	var _Polygon = __webpack_require__(35);
	
	var _Polygon2 = _interopRequireDefault(_Polygon);
	
	var _Polyline = __webpack_require__(36);
	
	var _Polyline2 = _interopRequireDefault(_Polyline);
	
	var _Rhombus = __webpack_require__(37);
	
	var _Rhombus2 = _interopRequireDefault(_Rhombus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.utils = _utils;
	exports.vector = _vector3.default;
	exports.Events = _Events3.default;
	exports.Cell = _Cell3.default;
	exports.Link = _Link3.default;
	exports.Node = _Node3.default;
	exports.CellView = _CellView3.default;
	exports.LinkView = _LinkView3.default;
	exports.NodeView = _NodeView3.default;
	exports.Change = _Change3.default;
	exports.RootChange = _RootChange3.default;
	exports.ChildChange = _ChildChange3.default;
	exports.Model = _Model3.default;
	exports.Paper = _Paper3.default;
	
	var shapes = {
	    basic: {
	        Generic: _Generic2.default,
	        Text: _Text2.default,
	        Rect: _Rect2.default,
	        Circle: _Circle2.default,
	        Ellipse: _Ellipse2.default,
	        Image: _Image2.default,
	        Path: _Path2.default,
	        Polygon: _Polygon2.default,
	        Polyline: _Polyline2.default,
	        Rhombus: _Rhombus2.default
	    }
	};
	
	exports.shapes = shapes;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.VElement = undefined;
	
	var _utils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var rclass = /[\t\r\n\f]/g;
	var rnotwhite = /\S+/g;
	
	var pathCount = 0;
	function createPathId() {
	
	    var id;
	
	    do {
	        pathCount += 1;
	        id = 'pane-path-' + pathCount;
	    } while (document.getElementById(id));
	
	    return id;
	}
	
	var VElement = exports.VElement = (function () {
	    function VElement(elem) {
	        _classCallCheck(this, VElement);
	
	        if (elem instanceof VElement) {
	            elem = elem.node;
	        }
	
	        this.node = elem;
	    }
	
	    _createClass(VElement, [{
	        key: 'attr',
	        value: function attr(name, value) {
	
	            var that = this;
	            var node = that.node;
	            var length = arguments.length;
	
	            // return all attributes
	            if (!length) {
	                var attrs = {};
	                (0, _utils.forEach)(node.attributes, function (attr) {
	                    attrs[attr.nodeName] = attr.nodeValue;
	                });
	                return attrs;
	            }
	
	            if (length === 1) {
	                if ((0, _utils.isObject)(name)) {
	                    (0, _utils.forIn)(name, function (attrValue, attrName) {
	                        (0, _utils.setAttribute)(node, attrName, attrValue);
	                    });
	                } else {
	                    return node.getAttribute(name);
	                }
	            } else {
	                (0, _utils.setAttribute)(node, name, value);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'removeAttr',
	        value: function removeAttr(name) {
	
	            var that = this;
	            var node = that.node;
	
	            if (node && name) {
	                node.removeAttribute(name);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'css',
	        value: function css(style) {}
	    }, {
	        key: 'text',
	        value: function text(content, options) {
	
	            var that = this;
	            var textNode = that.node;
	
	            content = (0, _utils.sanitizeText)(content);
	            options = options || {};
	
	            // `alignment-baseline` does not work in Firefox.
	            // Setting `dominant-baseline` on the `<text>` element doesn't work in IE9.
	            // In order to have the 0,0 coordinate of the `<text>` element (or the first `<tspan>`)
	            // in the top left corner we translate the `<text>` element by `0.8em`.
	            // See `http://www.w3.org/Graphics/SVG/WG/wiki/How_to_determine_dominant_baseline`.
	            // See also `http://apike.ca/prog_svg_text_style.html`.
	            var y = that.attr('y');
	            if (!y) {
	                that.attr('y', '0.8em');
	            }
	
	            // An empty text gets rendered into the DOM in webkit-based browsers.
	            // In order to unify this behaviour across all browsers
	            // we rather hide the text element when it's empty.
	            that.attr('display', content ? null : 'none');
	
	            // Preserve spaces. In other words, we do not want consecutive spaces to get collapsed to one.
	            textNode.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
	
	            // clear all `<tspan>` children
	            textNode.textContent = '';
	
	            var textPathOptions = options.textPath;
	            if (textPathOptions) {
	
	                // Wrap the text in the SVG <textPath> element that points to a path
	                // defined by `options.textPath` inside the internal `<defs>` element.
	                var defs = that.find('defs');
	                if (!defs.length) {
	                    defs = createElement('defs');
	                    that.append(defs);
	                }
	
	                // If `opt.textPath` is a plain string, consider it to be directly
	                // the SVG path data for the text to go along (this is a shortcut).
	                // Otherwise if it is an object and contains the `d` property,
	                // then this is our path.
	                var isTextPathObject = (0, _utils.isObject)(textPathOptions);
	                var d = isTextPathObject ? textPathOptions.d : textPathOptions;
	                var vPath;
	
	                if (d) {
	                    vPath = createElement('path', { d: d, id: createPathId() });
	                    defs.append(vPath);
	                }
	
	                var vTextPath = createElement('textPath');
	
	                // Set attributes on the `<textPath>`. The most important one
	                // is the `xlink:href` that points to our newly created `<path/>` element in `<defs/>`.
	                // Note that we also allow the following construct:
	                // `t.text('my text', {textPath: {'xlink:href': '#my-other-path'}})`.
	                // In other words, one can completely skip the auto-creation of the path
	                // and use any other arbitrary path that is in the document.
	                if (isTextPathObject) {
	
	                    if (!textPathOptions['xlink:href'] && vPath) {
	                        vTextPath.attr('xlink:href', '#' + vPath.node.id);
	                    }
	
	                    vTextPath.attr(textPathOptions);
	                }
	
	                that.append(vTextPath);
	                textNode = vTextPath.node;
	            }
	
	            var offset = 0;
	            var lines = content.split('\n');
	            var lineHeight = options.lineHeight;
	            var annotations = options.annotations;
	            var includeAnnotationIndices = options.includeAnnotationIndices;
	
	            if (annotations) {
	                annotations = (0, _utils.isArray)(annotations) ? annotations : [annotations];
	            }
	
	            lineHeight = lineHeight === 'auto' ? '1.5em' : lineHeight || '1em';
	
	            (0, _utils.forEach)(lines, function (line, i) {
	
	                var vLine = createElement('tspan', {
	                    dy: i ? lineHeight : '0',
	                    x: that.attr('x') || 0
	                });
	
	                vLine.addClass('pane-text-line');
	
	                if (line) {
	
	                    if (annotations) {
	                        // Get the line height based on the biggest font size
	                        // in the annotations for this line.
	                        var maxFontSize = 0;
	
	                        // Find the *compacted* annotations for this line.
	                        var lineAnnotations = vector.annotateString(line, annotations, {
	                            offset: -offset,
	                            includeAnnotationIndices: includeAnnotationIndices
	                        });
	
	                        (0, _utils.forEach)(lineAnnotations, function (annotation) {
	
	                            if ((0, _utils.isObject)(annotation)) {
	
	                                var fontSize = (0, _utils.toInt)(annotation.attrs['font-size']);
	                                if (fontSize && fontSize > maxFontSize) {
	                                    maxFontSize = fontSize;
	                                }
	
	                                var tspan = createElement('tspan', annotation.attrs);
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
	            });
	
	            return that;
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(selector) {
	
	            var that = this;
	            var node = that.node;
	            var className = ' ' + selector + ' ';
	
	            if (node.nodeType === 1) {
	                return (' ' + (0, _utils.getClassName)(node) + ' ').replace(rclass, ' ').indexOf(className) > -1;
	            }
	            return false;
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(value) {
	
	            var that = this;
	            var node = that.node;
	
	            if ((0, _utils.isFunction)(value)) {
	                return that.addClass(value.call(node, (0, _utils.getClassName)(node)));
	            }
	
	            if (value && (0, _utils.isString)(value) && node.nodeType === 1) {
	
	                var classes = value.match(rnotwhite) || [];
	                var oldValue = (' ' + (0, _utils.getClassName)(node) + ' ').replace(rclass, ' ');
	                var newValue = (0, _utils.reduce)(classes, function (ret, cls) {
	                    if (ret.indexOf(' ' + cls + ' ') < 0) {
	                        ret += cls + ' ';
	                    }
	                    return ret;
	                }, oldValue);
	
	                newValue = (0, _utils.trim)(newValue);
	                if (oldValue !== newValue) {
	                    node.setAttribute('class', newValue);
	                }
	            }
	
	            return that;
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(value) {
	
	            var that = this;
	            var node = that.node;
	
	            if ((0, _utils.isFunction)(value)) {
	                return that.removeClass(value.call(node, (0, _utils.getClassName)(node)));
	            }
	
	            if ((!value || (0, _utils.isString)(value)) && node.nodeType === 1) {
	
	                var classes = (value || '').match(rnotwhite) || [];
	                var oldValue = (' ' + (0, _utils.getClassName)(node) + ' ').replace(rclass, ' ');
	                var newValue = (0, _utils.reduce)(classes, function (ret, cls) {
	                    if (ret.indexOf(' ' + cls + ' ') > -1) {
	                        ret = ret.replace(' ' + cls + ' ', ' ');
	                    }
	                    return ret;
	                }, oldValue);
	
	                newValue = value ? (0, _utils.trim)(newValue) : '';
	                if (oldValue !== newValue) {
	                    node.setAttribute('class', newValue);
	                }
	            }
	
	            return that;
	        }
	    }, {
	        key: 'toggleClass',
	        value: function toggleClass(value, stateVal) {
	
	            var that = this;
	            var node = that.node;
	
	            if ((0, _utils.isBoolean)(stateVal) && (0, _utils.isString)(value)) {
	                return stateVal ? that.addClass(value) : that.removeClass(value);
	            }
	
	            if ((0, _utils.isFunction)(value)) {
	                return that.toggleClass(value.call(node, (0, _utils.getClassName)(node), stateVal), stateVal);
	            }
	
	            if (value && (0, _utils.isString)(value)) {
	                var classes = value.match(rnotwhite) || [];
	                (0, _utils.forEach)(classes, function (cls) {
	                    that.hasClass(cls) ? that.removeClass(cls) : that.addClass(cls);
	                });
	            }
	
	            return that;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	
	            var that = this;
	            var node = that.node;
	
	            if (node && node.parentNode) {
	                node.parentNode.removeChild(node);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'empty',
	        value: function empty() {
	
	            var that = this;
	            var node = that.node;
	
	            if (node) {
	                while (node.lastChild) {
	                    node.removeChild(node.lastChild);
	                }
	            }
	
	            return that;
	        }
	    }, {
	        key: 'append',
	        value: function append(elem) {
	
	            var that = this;
	
	            elem && (0, _utils.forEach)((0, _utils.toArray)(elem), function (item) {
	                that.node.appendChild(normalize(item));
	            });
	
	            return that;
	        }
	    }, {
	        key: 'prepend',
	        value: function prepend(elem) {
	
	            var that = this;
	            var node = that.node;
	
	            elem && node.insertBefore(normalize(elem), node.firstChild);
	
	            return that;
	        }
	    }, {
	        key: 'appendTo',
	        value: function appendTo(elem) {
	            //elem.appendChild(this.node);
	            //return this;
	        }
	    }, {
	        key: 'prependTo',
	        value: function prependTo(elem) {}
	    }, {
	        key: 'before',
	        value: function before(elem) {}
	    }, {
	        key: 'after',
	        value: function after(elem) {}
	    }, {
	        key: 'getSVG',
	        value: function getSVG() {
	            var that = this;
	            var node = that.node;
	
	            return node instanceof window.SVGSVGElement ? that : vectorize(node.ownerSVGElement);
	        }
	    }, {
	        key: 'getDefs',
	        value: function getDefs() {
	
	            var defs = null;
	            var svg = this.getSVG();
	
	            (0, _utils.some)(svg.node.childNodes, function (node) {
	                if ((0, _utils.isNode)(node, 'defs')) {
	                    defs = vectorize(node);
	                    return true;
	                }
	            });
	
	            if (!defs) {
	                defs = createElement('defs');
	                svg.append(defs);
	            }
	
	            return defs;
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            var node = this.node;
	
	            var cloned = vectorize(node.cloneNode(true));
	
	            if (node.id) {
	                cloned.node.removeAttribute('id');
	            }
	            return cloned;
	        }
	    }, {
	        key: 'find',
	        value: function find(selector) {
	            return (0, _utils.map)(this.node.querySelectorAll(selector), vectorize);
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
	        }
	    }, {
	        key: 'index',
	        value: function index() {
	
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
	        }
	    }, {
	        key: 'translate',
	        value: function translate(tx, ty, relative) {
	
	            var that = this;
	            var transformAttr = that.attr('transform') || '';
	            var translate = (0, _utils.parseTranslate)(transformAttr);
	
	            if (!arguments.length) {
	                return translate;
	            }
	
	            transformAttr = (0, _utils.trim)(transformAttr.replace(/translate\([^\)]*\)/g, ''));
	
	            var dx = relative ? translate.tx + tx : tx;
	            var dy = relative ? translate.ty + ty : ty;
	            var newTranslate = 'translate(' + dx + ',' + dy + ')' + ' ' + transformAttr;
	
	            that.attr('transform', newTranslate);
	
	            return that;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(angle, cx, cy, relative) {
	
	            var transformAttr = that.attr('transform') || '';
	            var rotate = (0, _utils.parseRotate)(transformAttr);
	
	            if (!arguments.length) {
	                return rotate;
	            }
	
	            transformAttr = (0, _utils.trim)(transformAttr.replace(/rotate\([^\)]*\)/g, ''));
	
	            angle %= 360;
	
	            var newAngle = relative ? rotate.angle + angle : angle;
	            var newOrigin = (0, _utils.isUndefined)(cx) || (0, _utils.isUndefined)(cy) ? '' : ',' + cx + ',' + cy;
	            var newRotate = 'rotate(' + newAngle + newOrigin + ')';
	
	            return this.attr('transform', transformAttr + ' ' + newRotate);
	        }
	    }, {
	        key: 'scale',
	        value: function scale(sx, sy, relative) {
	
	            var transformAttr = this.attr('transform') || '';
	            var scale = (0, _utils.parseScale)(transformAttr);
	            var length = arguments.length;
	
	            if (!length) {
	                return scale;
	            }
	
	            transformAttr = (0, _utils.trim)(transformAttr.replace(/scale\([^\)]*\)/g, ''));
	
	            if (length === 1) {
	                sy = sx;
	            } else if (length === 2) {
	                if ((0, _utils.isBoolean)(sy)) {
	                    relative = sy;
	                    sy = sx;
	                }
	            }
	
	            sx = relative ? scale.sx * sx : sx;
	            sy = relative ? scale.sy * sy : sy;
	
	            var newScale = 'scale(' + sx + ',' + sy + ')';
	
	            return this.attr('transform', transformAttr + ' ' + newScale);
	        }
	    }, {
	        key: 'bbox',
	        value: function bbox(withoutTransformations, target) {
	
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
	
	            return vector.transformRect(box, matrix);
	        }
	    }, {
	        key: 'toLocalPoint',
	        value: function toLocalPoint(x, y) {
	
	            // Convert global point into the coordinate space of this element.
	
	            var that = this;
	            var svg = that.getSVG().node;
	            var point = svg.createSVGPoint();
	
	            point.x = x;
	            point.y = y;
	
	            try {
	                // ref: https://msdn.microsoft.com/zh-cn/library/hh535760(v=vs.85).aspx
	                var globalPoint = point.matrixTransform(svg.getScreenCTM().inverse());
	                var globalToLocalMatrix = that.node.getTransformToElement(svg).inverse();
	                return globalPoint.matrixTransform(globalToLocalMatrix);
	            } catch (e) {
	                // IE9 throws an exception in odd cases.
	                // (`Unexpected call to method or property access`)
	                // We have to make do with the original coordianates.
	                return point;
	            }
	        }
	    }, {
	        key: 'translateCenterToPoint',
	        value: function translateCenterToPoint() {}
	    }, {
	        key: 'translateAndAutoOrient',
	        value: function translateAndAutoOrient() {}
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
	        }
	    }, {
	        key: 'toPath',
	        value: function toPath() {
	
	            var that = this;
	            var path = vectorize((0, _utils.createSvgElement)('path'));
	            var d = that.toPathData();
	
	            path.attr(that.attr());
	
	            d && path.attr('d', d);
	
	            return path;
	        }
	    }, {
	        key: 'toPathData',
	        value: function toPathData() {
	
	            var that = this;
	            var node = that.node;
	            var tagName = node.tagName.toUpperCase();
	
	            switch (tagName) {
	                case 'PATH':
	                    return that.attr('d');
	                case 'LINE':
	                    return (0, _utils.lineToPathData)(node);
	                case 'POLYGON':
	                    return (0, _utils.polygonToPathData)(node);
	                case 'POLYLINE':
	                    return (0, _utils.polylineToPathData)(node);
	                case 'ELLIPSE':
	                    return (0, _utils.ellipseToPathData)(node);
	                case 'CIRCLE':
	                    return (0, _utils.circleToPathData)(node);
	                case 'RECT':
	                    return (0, _utils.rectToPathData)(node);
	            }
	
	            throw new Error(tagName + ' cannot be converted to PATH.');
	        }
	    }, {
	        key: 'findIntersection',
	        value: function findIntersection(ref, target) {
	
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
	    }]);
	
	    return VElement;
	})();
	
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
	
	    if ((0, _utils.isObject)(elem)) {
	        return vectorize(elem);
	    }
	
	    if (elem.toLowerCase() === 'svg') {
	        return vectorize((0, _utils.createSvgDocument)());
	    } else if (elem[0] === '<') {
	        var svgDoc = (0, _utils.createSvgDocument)(elem);
	        if (svgDoc.childNodes.length > 1) {
	            return (0, _utils.map)(svgDoc.childNodes, function (childNode) {
	                return vectorize(document.importNode(childNode, true));
	            });
	        }
	
	        return vectorize(document.importNode(svgDoc.firstChild, true));
	    }
	
	    // create svg node by tagName.
	    elem = (0, _utils.createSvgElement)(elem);
	
	    // set attributes.
	    attrs && (0, _utils.forIn)(attrs, function (value, attr) {
	        (0, _utils.setAttribute)(elem, attr, value);
	    });
	
	    // append children.
	    if (children) {
	        children = (0, _utils.isArray)(children) ? children : [children];
	
	        (0, _utils.forEach)(children, function (child) {
	            elem.appendChild(child instanceof VElement ? child.node : child);
	        });
	    }
	
	    return vectorize(elem);
	}
	
	// vector
	// ------
	
	var vector = VElement.createElement = createElement;
	var svgDocument = createElement('svg').node;
	
	vector.isVElement = function (obj) {
	    return obj instanceof VElement;
	};
	
	vector.createSVGMatrix = function (matrix) {
	    var svgMatrix = svgDocument.createSVGMatrix();
	    for (var key in matrix) {
	        svgMatrix[key] = matrix[key];
	    }
	
	    return svgMatrix;
	};
	
	vector.createSVGTransform = function () {
	    return svgDocument.createSVGTransform();
	};
	
	vector.createSVGPoint = function (x, y) {
	    var point = svgDocument.createSVGPoint();
	    point.x = x;
	    point.y = y;
	    return point;
	};
	
	vector.transformRect = function (rect, matrix) {
	
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
	
	    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
	};
	
	vector.styleToObject = function (styleString) {
	    var ret = {};
	    (0, _utils.forEach)(styleString.split(';'), function (style) {
	        var pair = style.split('=');
	        ret[(0, _utils.trim)(pair[0])] = (0, _utils.trim)(pair[1]);
	    });
	    return ret;
	};
	
	// exports
	// -------
	
	exports.default = vector;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lang = __webpack_require__(3);
	
	var _loop = function _loop(_key12) {
	  if (_key12 === "default") return 'continue';
	  Object.defineProperty(exports, _key12, {
	    enumerable: true,
	    get: function get() {
	      return _lang[_key12];
	    }
	  });
	};
	
	for (var _key12 in _lang) {
	  var _ret = _loop(_key12);
	
	  if (_ret === 'continue') continue;
	}
	
	var _array = __webpack_require__(4);
	
	var _loop2 = function _loop2(_key13) {
	  if (_key13 === "default") return 'continue';
	  Object.defineProperty(exports, _key13, {
	    enumerable: true,
	    get: function get() {
	      return _array[_key13];
	    }
	  });
	};
	
	for (var _key13 in _array) {
	  var _ret2 = _loop2(_key13);
	
	  if (_ret2 === 'continue') continue;
	}
	
	var _string = __webpack_require__(5);
	
	var _loop3 = function _loop3(_key14) {
	  if (_key14 === "default") return 'continue';
	  Object.defineProperty(exports, _key14, {
	    enumerable: true,
	    get: function get() {
	      return _string[_key14];
	    }
	  });
	};
	
	for (var _key14 in _string) {
	  var _ret3 = _loop3(_key14);
	
	  if (_ret3 === 'continue') continue;
	}
	
	var _number = __webpack_require__(7);
	
	var _loop4 = function _loop4(_key15) {
	  if (_key15 === "default") return 'continue';
	  Object.defineProperty(exports, _key15, {
	    enumerable: true,
	    get: function get() {
	      return _number[_key15];
	    }
	  });
	};
	
	for (var _key15 in _number) {
	  var _ret4 = _loop4(_key15);
	
	  if (_ret4 === 'continue') continue;
	}
	
	var _object = __webpack_require__(6);
	
	var _loop5 = function _loop5(_key16) {
	  if (_key16 === "default") return 'continue';
	  Object.defineProperty(exports, _key16, {
	    enumerable: true,
	    get: function get() {
	      return _object[_key16];
	    }
	  });
	};
	
	for (var _key16 in _object) {
	  var _ret5 = _loop5(_key16);
	
	  if (_ret5 === 'continue') continue;
	}
	
	var _function = __webpack_require__(8);
	
	var _loop6 = function _loop6(_key17) {
	  if (_key17 === "default") return 'continue';
	  Object.defineProperty(exports, _key17, {
	    enumerable: true,
	    get: function get() {
	      return _function[_key17];
	    }
	  });
	};
	
	for (var _key17 in _function) {
	  var _ret6 = _loop6(_key17);
	
	  if (_ret6 === 'continue') continue;
	}
	
	var _dom = __webpack_require__(9);
	
	var _loop7 = function _loop7(_key18) {
	  if (_key18 === "default") return 'continue';
	  Object.defineProperty(exports, _key18, {
	    enumerable: true,
	    get: function get() {
	      return _dom[_key18];
	    }
	  });
	};
	
	for (var _key18 in _dom) {
	  var _ret7 = _loop7(_key18);
	
	  if (_ret7 === 'continue') continue;
	}
	
	var _geom = __webpack_require__(10);
	
	var _loop8 = function _loop8(_key19) {
	  if (_key19 === "default") return 'continue';
	  Object.defineProperty(exports, _key19, {
	    enumerable: true,
	    get: function get() {
	      return _geom[_key19];
	    }
	  });
	};
	
	for (var _key19 in _geom) {
	  var _ret8 = _loop8(_key19);
	
	  if (_ret8 === 'continue') continue;
	}
	
	var _event = __webpack_require__(11);
	
	var _loop9 = function _loop9(_key20) {
	  if (_key20 === "default") return 'continue';
	  Object.defineProperty(exports, _key20, {
	    enumerable: true,
	    get: function get() {
	      return _event[_key20];
	    }
	  });
	};
	
	for (var _key20 in _event) {
	  var _ret9 = _loop9(_key20);
	
	  if (_ret9 === 'continue') continue;
	}
	
	var _pathData = __webpack_require__(12);
	
	var _loop10 = function _loop10(_key21) {
	  if (_key21 === "default") return 'continue';
	  Object.defineProperty(exports, _key21, {
	    enumerable: true,
	    get: function get() {
	      return _pathData[_key21];
	    }
	  });
	};
	
	for (var _key21 in _pathData) {
	  var _ret10 = _loop10(_key21);
	
	  if (_ret10 === 'continue') continue;
	}
	
	var _transform = __webpack_require__(13);
	
	var _loop11 = function _loop11(_key22) {
	  if (_key22 === "default") return 'continue';
	  Object.defineProperty(exports, _key22, {
	    enumerable: true,
	    get: function get() {
	      return _transform[_key22];
	    }
	  });
	};
	
	for (var _key22 in _transform) {
	  var _ret11 = _loop11(_key22);
	
	  if (_ret11 === 'continue') continue;
	}
	
	exports.default = {};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var objProto = Object.prototype;
	var toString = objProto.toString;
	var hasOwn = objProto.hasOwnProperty;
	
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
	    return toString.call(obj) === '[object ' + type + ']';
	}
	
	function isObject(obj) {
	    if (!obj) {
	        return false;
	    }
	
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	
	    return type === 'function' || type === 'object';
	}
	
	function isFunction(obj) {
	    return isType(obj, 'Function');
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
	
	function isWindow(obj) {
	    return obj && obj === obj.window;
	}
	
	function isPlainObject(obj) {
	
	    // Not plain objects:
	    // - Any object or value whose internal [[Class]] property is not "[object Object]"
	    // - DOM nodes
	    // - window
	    if (!isObject(obj) || obj.nodeType || isWindow(obj)) {
	        return false;
	    }
	
	    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
	        return false;
	    }
	
	    // If the function hasn't returned already, we're confident that
	    // |obj| is a plain object, created by {} or constructed with new Object
	    return true;
	}
	
	function isEmptyObject(obj) {
	    var name;
	    for (name in obj) {
	        return false;
	    }
	    return true;
	}
	
	// exports
	// -------
	
	exports.isNull = isNull;
	exports.isType = isType;
	exports.isArray = isArray;
	exports.isWindow = isWindow;
	exports.isObject = isObject;
	exports.isString = isString;
	exports.isBoolean = isBoolean;
	exports.isNumeric = isNumeric;
	exports.isFunction = isFunction;
	exports.isArrayLike = isArrayLike;
	exports.isUndefined = isUndefined;
	exports.isPlainObject = isPlainObject;
	exports.isEmptyObject = isEmptyObject;
	exports.isNullOrUndefined = isNullOrUndefined;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.contains = exports.lastIndexOf = exports.reduceRight = exports.indexOf = exports.toArray = exports.forEach = exports.reduce = exports.filter = exports.every = exports.some = exports.map = undefined;
	
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
	
	function contains(arr, item) {
	    return arr && indexOf(arr, item) >= 0;
	}
	
	exports.map = map;
	exports.some = some;
	exports.every = every;
	exports.filter = filter;
	exports.reduce = reduce;
	exports.forEach = forEach;
	exports.toArray = toArray;
	exports.indexOf = indexOf;
	exports.reduceRight = reduceRight;
	exports.lastIndexOf = lastIndexOf;
	exports.contains = contains;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sanitizeText = exports.toString = exports.hashCode = exports.format = exports.uuid = exports.trim = exports.uc = exports.lc = undefined;
	
	var _object = __webpack_require__(6);
	
	var proto = String.prototype;
	
	function toString(str) {
	    return '' + str;
	}
	
	function uc(str) {
	    return ('' + str).toUpperCase();
	}
	
	function lc(str) {
	    return ('' + str).toLowerCase();
	}
	
	function trim(str) {
	    return str ? proto.trim.call('' + str) : '';
	}
	
	function uuid() {
	
	    // credit: http://stackoverflow.com/posts/2117523/revisions
	
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = Math.random() * 16 | 0;
	        var v = c == 'x' ? r : r & 0x3 | 0x8;
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
	
	    for (var i = 0; i < length; i++) {
	        var c = str.charCodeAt(i);
	        hash = (hash << 5) - hash + c;
	        hash = hash & hash; // Convert to 32bit integer
	    }
	
	    return hash;
	}
	
	function format(tpl, data) {
	
	    data = data || {};
	
	    return ('' + tpl).replace(/\$\{(\w+)\}/g, function (input, key) {
	        var val = (0, _object.getByPath)(data, key);
	        return val !== undefined ? val : input;
	    });
	}
	
	function sanitizeText(text) {
	
	    // Replace all spaces with the Unicode No-break space.
	    // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
	    // IE would otherwise collapse all spaces into one. This is useful
	    // e.g. in tests when you want to compare the actual DOM text content
	    // without having to add the unicode character in the place of all spaces.
	
	    return (text || '').replace(/ /g, ' ');
	}
	
	exports.lc = lc;
	exports.uc = uc;
	exports.trim = trim;
	exports.uuid = uuid;
	exports.format = format;
	exports.hashCode = hashCode;
	exports.toString = toString;
	exports.sanitizeText = sanitizeText;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getByPath = exports.destroy = exports.extend = exports.merge = exports.forIn = exports.keys = exports.hasKey = undefined;
	
	var _array = __webpack_require__(4);
	
	var _lang = __webpack_require__(3);
	
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
	
	function extend(target) {
	
	    if (!target) {
	        target = {};
	    }
	
	    for (var i = 1, l = arguments.length; i < l; i++) {
	        var source = arguments[i];
	
	        if (source) {
	            for (var key in source) {
	                target[key] = source[key];
	            }
	        }
	    }
	
	    return target;
	}
	
	function merge(target) {
	
	    if (!target) {
	        target = {};
	    }
	
	    for (var i = 1, l = arguments.length; i < l; i++) {
	
	        var source = arguments[i];
	        if (source) {
	            for (var name in source) {
	
	                var src = target[name];
	                var copy = source[name];
	                var copyIsArray = (0, _lang.isArray)(copy);
	
	                if (copyIsArray || (0, _lang.isPlainObject)(copy)) {
	
	                    var clone;
	                    if (copyIsArray) {
	                        clone = src && (0, _lang.isArray)(src) ? src : [];
	                    } else {
	                        clone = src && (0, _lang.isPlainObject)(src) ? src : {};
	                    }
	
	                    target[name] = merge(clone, copy);
	                } else {
	                    target[name] = copy;
	                }
	            }
	        }
	    }
	
	    return target;
	}
	
	function getByPath(obj, path, delimiter) {
	
	    delimiter = delimiter || '.';
	
	    var keys = path.split(delimiter);
	
	    while (keys.length) {
	
	        var key = keys.shift();
	
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
	            if (obj.hasOwnProperty(prop)) {
	                delete obj[prop];
	            }
	        }
	        if (obj) {
	            obj.prototype = obj['__proto__'] = null;
	        }
	        obj.destroyed = true;
	    }
	}
	
	exports.hasKey = hasKey;
	exports.keys = keys;
	exports.forIn = forIn;
	exports.merge = merge;
	exports.extend = extend;
	exports.destroy = destroy;
	exports.getByPath = getByPath;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isPercentage = exports.isFinite = exports.toFixed = exports.toFloat = exports.toInt = undefined;
	
	var _lang = __webpack_require__(3);
	
	function isFinite(value) {
	    return window.isFinite(value) && !window.isNaN(parseFloat(value));
	}
	
	function isPercentage(str) {
	    return (0, _lang.isString)(str) && str.slice(-1) === '%';
	}
	
	function toInt(value) {
	    return parseInt(value, 10);
	}
	
	function toFloat(value, isPercentage) {
	    var v = parseFloat(value);
	    return isPercentage ? v / 100 : v;
	}
	
	function toFixed(value, precision) {
	    var power = Math.pow(10, precision);
	    return toFloat((Math.round(value * power) / power).toFixed(precision));
	}
	
	exports.toInt = toInt;
	exports.toFloat = toFloat;
	exports.toFixed = toFixed;
	exports.isFinite = isFinite;
	exports.isPercentage = isPercentage;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.invoke = exports.bind = undefined;
	
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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.containsElem = exports.createSvgDocument = exports.createSvgElement = exports.setAttribute = exports.getClassName = exports.getNodeName = exports.getOffset = exports.getWindow = exports.isNode = undefined;
	
	var _lang = __webpack_require__(3);
	
	function isNode(elem, nodeName, attrName, attrValue) {
	    var ret = elem && !isNaN(elem.nodeType);
	
	    if (ret) {
	        ret = isNullOrUndefined(nodeName) || getNodeName(elem) === nodeName.toLowerCase();
	    }
	
	    if (ret) {
	        ret = isNullOrUndefined(attrName) || elem.getAttribute(attrName) === attrValue;
	    }
	
	    return ret;
	}
	
	var docElem = document.documentElement;
	var contains = docElem.compareDocumentPosition || docElem.contains ? function (context, elem) {
	
	    var aDown = context.nodeType === 9 ? context.documentElement : context;
	    var bUp = elem && elem.parentNode;
	
	    return context === bUp || !!(bUp && bUp.nodeType === 1 && (aDown.contains ? aDown.contains(bUp) : context.compareDocumentPosition && context.compareDocumentPosition(bUp) & 16));
	} : function (context, elem) {
	    if (elem) {
	        while (elem = elem.parentNode) {
	            if (elem === context) {
	                return true;
	            }
	        }
	    }
	    return false;
	};
	
	function getWindow(elem) {
	    return (0, _lang.isWindow)(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	}
	
	function getOffset(elem) {
	
	    var box = { top: 0, left: 0 };
	    var doc = elem && elem.ownerDocument;
	
	    if (!doc) {
	        return box;
	    }
	
	    var docElem = doc.documentElement;
	
	    // Make sure it's not a disconnected DOM node
	    if (!contains(docElem, elem)) {
	        return box;
	    }
	
	    // If we don't have gBCR, just use 0,0 rather than error
	    // BlackBerry 5, iOS 3 (original iPhone)
	    if (!(0, _lang.isUndefined)(elem.getBoundingClientRect)) {
	        box = elem.getBoundingClientRect();
	    }
	
	    var win = getWindow(doc);
	
	    return {
	        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
	    };
	}
	
	function getNodeName(elem) {
	    return elem.nodeName ? elem.nodeName.toLowerCase() : '';
	}
	
	function getClassName(elem) {
	    return elem.getAttribute && elem.getAttribute('class') || '';
	}
	
	// xml namespaces.
	var ns = {
	    xmlns: 'http://www.w3.org/2000/svg',
	    xlink: 'http://www.w3.org/1999/xlink'
	};
	// svg version.
	var svgVersion = '1.1';
	
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
	
	// exports
	// -------
	
	exports.isNode = isNode;
	exports.getWindow = getWindow;
	exports.getOffset = getOffset;
	exports.getNodeName = getNodeName;
	exports.getClassName = getClassName;
	exports.setAttribute = setAttribute;
	exports.createSvgElement = createSvgElement;
	exports.createSvgDocument = createSvgDocument;
	exports.containsElem = contains;

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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.removeEventListener = exports.addEventListener = exports.normalizeEvent = undefined;
	
	var _lang = __webpack_require__(3);
	
	var _array = __webpack_require__(4);
	
	var win = window;
	var doc = document;
	var isMatchSelector = (function () {
	
	    var testDiv = doc.createElement('div');
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
	            parent = doc.createDocumentFragment();
	            parent.appendChild(elem);
	        }
	
	        // from the parent element's context, get all nodes that match the selector
	        var nodes = parent.querySelectorAll(selector);
	
	        return (0, _array.some)(nodes, function (node) {
	            return node === elem;
	        });
	    };
	})();
	
	function fixEvent(event) {
	    // add W3C standard event methods
	    event.preventDefault = fixEvent.preventDefault;
	    event.stopPropagation = fixEvent.stopPropagation;
	    return event;
	}
	
	fixEvent.preventDefault = function () {
	    this.returnValue = false;
	};
	
	fixEvent.stopPropagation = function () {
	    this.cancelBubble = true;
	};
	
	function handleEvent(event) {
	
	    var returnValue = true;
	    var element = this;
	
	    // grab the event object (IE uses a global event object)
	    event = event || fixEvent((doc.parentWindow || win).event);
	
	    // get a reference to the hash table of event handlers
	    var handlers = element.events[event.type];
	
	    // execute each event handler
	    for (var i in handlers) {
	        element.$$handleEvent = handlers[i];
	        if (element.$$handleEvent(event) === false) {
	            returnValue = false;
	        }
	    }
	    return returnValue;
	}
	
	function addEvent(elem, type, handler) {
	
	    if (elem.addEventListener) {
	        elem.addEventListener(type, handler, false);
	    } else {
	
	        // assign each event handler a unique ID
	        if (!handler.$$guid) {
	            handler.$$guid = ++addEvent.guid;
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
	
	function addEventListener(elem, type, selector, handler, once) {
	
	    if ((0, _lang.isFunction)(selector)) {
	        return addEvent(elem, type, selector);
	    }
	
	    function wrapper(e) {
	
	        // if this event has a delegateTarget, then we add it to the event
	        // object (so that handlers may have a reference to the delegator
	        // element) and fire the callback
	        if (e.delegateTarget = getDelegateTarget(elem, e.target, selector)) {
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
	
	function removeEventListener(elem, type, handler) {
	
	    var wrapper = handler._delegateWrapper;
	
	    if (elem.removeEventListener) {
	        elem.removeEventListener(type, handler, false);
	        wrapper && elem.removeEventListener(type, wrapper, false);
	    } else {
	        // delete the event handler from the hash table
	        if (elem.events && elem.events[type]) {
	            delete elem.events[type][handler.$$guid];
	
	            if (wrapper) {
	                delete elem.events[type][wrapper.$$guid];
	            }
	        }
	    }
	}
	
	function normalizeEvent(evt) {
	
	    var touchEvt = evt.originalEvent && evt.originalEvent.changedTouches && evt.originalEvent.changedTouches[0];
	
	    if (touchEvt) {
	        for (var property in evt) {
	            // copy all the properties from the input event that are not
	            // defined on the touch event (functions included).
	            if (touchEvt[property] === undefined) {
	                touchEvt[property] = evt[property];
	            }
	        }
	        return touchEvt;
	    }
	
	    return evt;
	}
	
	// exports
	// -------
	
	exports.normalizeEvent = normalizeEvent;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.polylineToPathData = exports.polygonToPathData = exports.ellipseToPathData = exports.circleToPathData = exports.rectToPathData = exports.lineToPathData = undefined;
	
	var _array = __webpack_require__(4);
	
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
	
	exports.lineToPathData = lineToPathData;
	exports.rectToPathData = rectToPathData;
	exports.circleToPathData = circleToPathData;
	exports.ellipseToPathData = ellipseToPathData;
	exports.polygonToPathData = polygonToPathData;
	exports.polylineToPathData = polylineToPathData;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.clearTranslate = exports.clearRotate = exports.clearScale = exports.parseTranslate = exports.parseTransform = exports.parseRotate = exports.parseScale = undefined;
	
	var _string = __webpack_require__(5);
	
	var _number = __webpack_require__(7);
	
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
	
	        var separator = /[ ,]+/;
	
	        var match = transform.match(/scale\((.*)\)/);
	        if (match) {
	            var arr = match[1].split(separator);
	
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
	
	        var separator = /[ ,]+/;
	
	        var match = transform.match(/rotate\((.*)\)/);
	        if (match) {
	            var arr = match[1].split(separator);
	
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
	
	// clear transform
	// ---------------
	
	function clearTranslate(transform) {
	    return transform && (0, _string.trim)(transform.replace(/translate\([^)]*\)/g, '')) || '';
	}
	
	function clearScale(transform) {
	    return transform && (0, _string.trim)(transform.replace(/scale\([^)]*\)/g, '')) || '';
	}
	
	function clearRotate(transform) {
	    return transform && (0, _string.trim)(transform.replace(/rotate\([^)]*\)/g, '')) || '';
	}
	
	exports.parseScale = parseScale;
	exports.parseRotate = parseRotate;
	exports.parseTransform = parseTransform;
	exports.parseTranslate = parseTranslate;
	exports.clearScale = clearScale;
	exports.clearRotate = clearRotate;
	exports.clearTranslate = clearTranslate;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var splitter = /\s+/;
	
	function triggerEvents(callbacks, args, context) {
	
	    var result = true;
	
	    for (var i = 0, l = callbacks.length; i < l; i += 2) {
	        result = (0, _utils.invoke)(callbacks[i], args, callbacks[i + 1] || context) && result;
	    }
	
	    return result;
	}
	
	var Events = (function () {
	    function Events() {
	        _classCallCheck(this, Events);
	    }
	
	    _createClass(Events, [{
	        key: 'on',
	        value: function on(events, callback, context) {
	
	            var that = this;
	
	            if (!callback) {
	                return that;
	            }
	
	            var listeners = that.__events || (that.__events = {});
	
	            events = events.split(splitter);
	
	            (0, _utils.forEach)(events, function (event) {
	                var list = listeners[event] || (listeners[event] = []);
	                list.push(callback, context);
	            });
	
	            return that;
	        }
	    }, {
	        key: 'once',
	        value: function once(events, callback, context) {
	
	            var that = this;
	            var cb = function cb() {
	                that.off(events, cb);
	                callback.apply(context || that, arguments);
	            };
	
	            return that.on(events, cb, context);
	        }
	    }, {
	        key: 'off',
	        value: function off(events, callback, context) {
	
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
	
	            events = events ? events.split(splitter) : (0, _utils.keys)(listeners);
	
	            (0, _utils.forEach)(events, function (event) {
	
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
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(eventName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            var that = this;
	            var listeners = that.__events;
	
	            // No events.
	            if (!listeners || !eventName) {
	                return null;
	            }
	
	            var result = true;
	            var commonCallbacks = listeners['*'];
	
	            (0, _utils.forEach)(eventName.split(splitter), function (event) {
	
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
	    }]);
	
	    return Events;
	})();
	
	exports.default = Events;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = (function () {
	    _createClass(Cell, null, [{
	        key: 'configure',
	        value: function configure(attributes) {
	
	            var that = this;
	
	            attributes && (0, _utils.forIn)(attributes, function (val, key) {
	                if (key === 'defaults') {
	                    val = (0, _utils.merge)({}, that.defaults, val);
	                }
	                that[key] = val;
	            });
	        }
	    }]);
	
	    function Cell(attributes) {
	        _classCallCheck(this, Cell);
	
	        var that = this;
	        var raw = (0, _utils.merge)({}, that.constructor.defaults, attributes);
	
	        that.raw = raw;
	        that.data = raw.data;
	        that.size = raw.size;
	        that.position = raw.position;
	        that.rotation = raw.rotation;
	        that.visible = raw.visible !== false;
	        that.attrs = raw.attrs;
	    }
	
	    _createClass(Cell, [{
	        key: 'isNode',
	        value: function isNode() {
	            return false;
	        }
	    }, {
	        key: 'isLink',
	        value: function isLink() {
	            return false;
	        }
	
	        // link
	        // ----
	
	    }, {
	        key: 'getTerminal',
	        value: function getTerminal(isSource) {
	            return isSource ? this.source : this.target;
	        }
	    }, {
	        key: 'setTerminal',
	        value: function setTerminal(node, isSource) {
	            if (isSource) {
	                this.source = node;
	            } else {
	                this.target = node;
	            }
	
	            return node;
	        }
	    }, {
	        key: 'removeFromTerminal',
	        value: function removeFromTerminal(isSource) {
	
	            // remove link from node
	
	            var that = this;
	
	            var node = that.getTerminal(isSource);
	
	            if (node) {
	                node.removeLink(that, isSource);
	            }
	
	            return that;
	        }
	
	        // children
	        // --------
	
	    }, {
	        key: 'getChildCount',
	        value: function getChildCount() {
	            var children = this.children;
	            return children ? children.length : 0;
	        }
	    }, {
	        key: 'getChildIndex',
	        value: function getChildIndex(child) {
	            return (0, _utils.indexOf)(this.children || [], child);
	        }
	    }, {
	        key: 'getChildAt',
	        value: function getChildAt(index) {
	            var children = this.children;
	            return children ? children[index] : null;
	        }
	    }, {
	        key: 'eachChild',
	        value: function eachChild(iterator, context) {
	
	            var that = this;
	            var children = that.children;
	
	            children && (0, _utils.forEach)(children, iterator, context);
	
	            return that;
	        }
	    }, {
	        key: 'filterChild',
	        value: function filterChild(iterator, context) {
	            var children = this.children;
	            return children ? (0, _utils.filter)(children, iterator, context) : [];
	        }
	    }, {
	        key: 'insertChild',
	        value: function insertChild(child, index) {
	            var that = this;
	
	            if (child) {
	
	                // fix index
	                if ((0, _utils.isNullOrUndefined)(index)) {
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
	        }
	    }, {
	        key: 'removeChild',
	        value: function removeChild(child) {
	            return this.removeChildAt(this.getChildIndex(child));
	        }
	    }, {
	        key: 'removeChildAt',
	        value: function removeChildAt(index) {
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
	        }
	
	        // node
	        // -----
	
	    }, {
	        key: 'getLinkCount',
	        value: function getLinkCount() {
	            var links = this.links;
	            return links ? links.length : 0;
	        }
	    }, {
	        key: 'getLinkIndex',
	        value: function getLinkIndex(link) {
	            return (0, _utils.indexOf)(this.links || [], link);
	        }
	    }, {
	        key: 'getLinkAt',
	        value: function getLinkAt(index) {
	            var links = this.links;
	            return links ? links[index] : null;
	        }
	    }, {
	        key: 'eachLink',
	        value: function eachLink(iterator, context) {
	
	            var that = this;
	            var links = that.links;
	
	            links && (0, _utils.forEach)(links, iterator, context);
	
	            return that;
	        }
	    }, {
	        key: 'filterLink',
	        value: function filterLink(iterator, context) {
	            var links = this.links;
	            return links ? (0, _utils.filter)(links, iterator, context) : [];
	        }
	    }, {
	        key: 'insertLink',
	        value: function insertLink(link, outgoing) {
	
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
	        }
	    }, {
	        key: 'removeLink',
	        value: function removeLink(link, outgoing) {
	
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
	        }
	
	        // parent
	        // ------
	
	    }, {
	        key: 'getParent',
	        value: function getParent() {
	            return this.parent;
	        }
	    }, {
	        key: 'removeFromParent',
	        value: function removeFromParent() {
	
	            var that = this;
	            var parent = that.parent;
	
	            if (parent) {
	                parent.removeChild(that);
	            }
	
	            return that;
	        }
	
	        // common
	        // ------
	
	    }, {
	        key: 'valueOf',
	        value: function valueOf() {}
	    }, {
	        key: 'toString',
	        value: function toString() {}
	    }, {
	        key: 'clone',
	        value: function clone() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {}
	    }, {
	        key: 'markup',
	        get: function get() {
	            return this.constructor.markup;
	        }
	    }]);
	
	    return Cell;
	})();
	
	exports.default = Cell;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Cell2 = __webpack_require__(15);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Link = (function (_Cell) {
	    _inherits(Link, _Cell);
	
	    function Link() {
	        _classCallCheck(this, Link);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
	    }
	
	    _createClass(Link, [{
	        key: 'isLink',
	        value: function isLink() {
	            return true;
	        }
	    }]);
	
	    return Link;
	})(_Cell3.default);
	
	exports.default = Link;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Cell2 = __webpack_require__(15);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Node = (function (_Cell) {
	    _inherits(Node, _Cell);
	
	    function Node() {
	        _classCallCheck(this, Node);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Node).apply(this, arguments));
	    }
	
	    _createClass(Node, [{
	        key: 'getPosition',
	        value: function getPosition(relative) {}
	    }, {
	        key: 'setPosition',
	        value: function setPosition(x, y, relative) {}
	    }, {
	        key: 'translate',
	        value: function translate() {}
	    }, {
	        key: 'resize',
	        value: function resize(width, height) {}
	    }, {
	        key: 'rotate',
	        value: function rotate() {}
	    }, {
	        key: 'isNode',
	        value: function isNode() {
	            return true;
	        }
	    }, {
	        key: 'getBBox',
	        value: function getBBox() {
	            return false;
	        }
	    }]);
	
	    return Node;
	})(_Cell3.default);
	
	Node.defaults = {
	    position: {
	        x: 0,
	        y: 0,
	        relative: false
	    },
	    size: {
	        width: 1,
	        height: 1,
	        relative: false
	    },
	    rotation: {
	        angle: 0,
	        relative: false
	    },
	    attrs: {}
	};
	
	exports.default = Node;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	var _Events = __webpack_require__(14);
	
	var _Events2 = _interopRequireDefault(_Events);
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _filters = __webpack_require__(19);
	
	var _filters2 = _interopRequireDefault(_filters);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CellView = (function () {
	    function CellView(paper, cell) {
	        _classCallCheck(this, CellView);
	
	        var that = this;
	
	        that.cell = cell;
	        that.paper = paper;
	        that.invalid = true;
	
	        that.ensureElement();
	
	        // attach cell's id to elem
	        that.elem.cellId = cell.id;
	    }
	
	    _createClass(CellView, [{
	        key: 'ensureElement',
	        value: function ensureElement() {
	
	            var that = this;
	            var vElem = (0, _vector2.default)('g');
	
	            that.elem = vElem.node;
	            that.vElem = vElem;
	            that.paper.drawPane.appendChild(that.elem);
	
	            return that;
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
	        key: 'find',
	        value: function find(selector) {
	            return selector === '.' ? [this.vElem] : this.vElem.find(selector);
	        }
	    }, {
	        key: 'applyFilter',
	        value: function applyFilter(selector, filter) {
	
	            // `selector` is a CSS selector or `'.'`.
	            // `filter` must be in the special filter format:
	            // `{ name: <name of the filter>, args: { <arguments>, ... }`.
	            // An example is: `{ filter: { name: 'blur', args: { radius: 5 } } }`.
	
	            var that = this;
	
	            filter = filter || {};
	
	            var name = filter.name || '';
	            var args = filter.args || {};
	            var attrs = filter.attrs;
	            var filterFn = _filters2.default[name];
	
	            if (!name || !filterFn) {
	                throw new Error('Non-existing filter: ' + name);
	            }
	
	            var vElements = (0, _utils.isString)(selector) ? that.find(selector) : selector;
	
	            if (!vElements.length) {
	                return that;
	            }
	
	            var paper = that.paper;
	            var svg = paper.svg;
	            var filterId = name + '-' + paper.id + '-' + (0, _utils.hashCode)(JSON.stringify(filter));
	
	            if (!svg.getElementById(filterId)) {
	
	                var vFilter = (0, _vector2.default)(filterFn(args));
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
	
	                vFilter.node.id = filterId;
	
	                (0, _vector2.default)(svg).getDefs().append(vFilter);
	            }
	
	            (0, _utils.forEach)(vElements, function (vElem) {
	                vElem.attr(filter, 'url(#' + filterId + ')');
	            });
	
	            return that;
	        }
	    }, {
	        key: 'applyGradient',
	        value: function applyGradient(selector, attrName, gradient) {
	
	            // `selector` is a CSS selector or `'.'`.
	            // `attrName` is either a `'fill'` or `'stroke'`.
	            // `gradient` must be in the special gradient format:
	            // `{ type: <linearGradient|radialGradient>, stops: [ { offset: <offset>, color: <color> }, ... ]`.
	            // An example is: `{ fill: { type: 'linearGradient', stops: [ { offset: '10%', color: 'green' }, { offset: '50%', color: 'blue' } ] } }`.
	
	            var that = this;
	
	            gradient = gradient || {};
	
	            var type = gradient.type;
	            var stops = gradient.stops;
	            var attrs = gradient.attrs;
	
	            if (!attrName || !type || !stops || !stops.length) {
	                return that;
	            }
	
	            var vElements = (0, _utils.isString)(selector) ? that.find(selector) : selector;
	
	            if (!vElements.length) {
	                return that;
	            }
	
	            var paper = that.paper;
	            var svg = paper.svg;
	            var gradientId = type + '-' + paper.id + '-' + (0, _utils.hashCode)(JSON.stringify(gradient));
	
	            if (!svg.getElementById(gradientId)) {
	
	                var gradientString = ['<' + type + '>', (0, _utils.map)(stops, function (stop) {
	                    return '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + ((0, _utils.isFinite)(stop.opacity) ? stop.opacity : 1) + '" />';
	                }).join(''), '</' + type + '>'].join('');
	
	                var vGradient = (0, _vector2.default)(gradientString);
	
	                if (attrs) {
	                    vGradient.attr(attrs);
	                }
	
	                vGradient.node.id = gradientId;
	
	                (0, _vector2.default)(svg).getDefs().append(vGradient);
	            }
	
	            (0, _utils.forEach)(vElements, function (vElem) {
	                vElem.attr(attrName, 'url(#' + gradientId + ')');
	            });
	
	            return that;
	        }
	    }, {
	        key: 'onDblClick',
	        value: function onDblClick() {}
	    }, {
	        key: 'onClick',
	        value: function onClick() {}
	    }, {
	        key: 'onPointerDown',
	        value: function onPointerDown() {}
	    }, {
	        key: 'onPointerMove',
	        value: function onPointerMove() {}
	    }, {
	        key: 'onPointerUp',
	        value: function onPointerUp() {}
	    }, {
	        key: 'onMouseOver',
	        value: function onMouseOver() {}
	    }, {
	        key: 'onMouseOut',
	        value: function onMouseOut() {}
	    }, {
	        key: 'onContextMenu',
	        value: function onContextMenu() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	
	            var that = this;
	            var elem = that.elem;
	
	            if (elem && elem.parentNode) {
	                elem.parentNode.removeChild(elem);
	            }
	        }
	    }]);
	
	    return CellView;
	})();
	
	exports.default = CellView;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	var filters = {
	
	    outline: function outline(args) {
	
	        // `color` ... outline color
	        // `width`... outline width
	        // `opacity` ... outline opacity
	        // `margin` ... gap between outline and the element
	
	        var tpl = '<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology in="SourceAlpha" result="morphedOuter" operator="dilate" radius="${outerRadius}" /><feMorphology in="SourceAlpha" result="morphedInner" operator="dilate" radius="${innerRadius}" /><feComposite result="morphedOuterColored" in="colored" in2="morphedOuter" operator="in"/><feComposite operator="xor" in="morphedOuterColored" in2="morphedInner" result="outline"/><feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
	
	        var margin = (0, _utils.isFinite)(args.margin) ? args.margin : 2;
	        var width = (0, _utils.isFinite)(args.width) ? args.width : 1;
	
	        return (0, _utils.format)(tpl)({
	            color: args.color || 'blue',
	            opacity: (0, _utils.isFinite)(args.opacity) ? args.opacity : 1,
	            outerRadius: margin + width,
	            innerRadius: margin
	        });
	    },
	
	    highlight: function highlight(args) {
	
	        // `color` ... color
	        // `width`... width
	        // `blur` ... blur
	        // `opacity` ... opacity
	
	        var tpl = '<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="${width}"/><feComposite result="composed" in="colored" in2="morphed" operator="in"/><feGaussianBlur result="blured" in="composed" stdDeviation="${blur}"/><feBlend in="SourceGraphic" in2="blured" mode="normal"/></filter>';
	
	        return (0, _utils.format)(tpl)({
	            color: args.color || 'red',
	            width: (0, _utils.isFinite)(args.width) ? args.width : 1,
	            blur: (0, _utils.isFinite)(args.blur) ? args.blur : 0,
	            opacity: (0, _utils.isFinite)(args.opacity) ? args.opacity : 1
	        });
	    },
	
	    blur: function blur(args) {
	
	        // `x` ... horizontal blur
	        // `y` ... vertical blur (optional)
	
	        var x = (0, _utils.isFinite)(args.x) ? args.x : 2;
	
	        return (0, _utils.format)('<filter><feGaussianBlur stdDeviation="${stdDeviation}"/></filter>')({
	            stdDeviation: (0, _utils.isFinite)(args.y) ? [x, args.y] : x
	        });
	    },
	
	    dropShadow: function dropShadow(args) {
	
	        // `dx` ... horizontal shift
	        // `dy` ... vertical shift
	        // `blur` ... blur
	        // `color` ... color
	        // `opacity` ... opacity
	
	        var tpl = 'SVGFEDropShadowElement' in window ? '<filter><feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}"/></filter>' : '<filter><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dx="${dx}" dy="${dy}" result="offsetblur"/><feFlood flood-color="${color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
	
	        return (0, _utils.format)(tpl)({
	            dx: args.dx || 0,
	            dy: args.dy || 0,
	            opacity: (0, _utils.isFinite)(args.opacity) ? args.opacity : 1,
	            color: args.color || 'black',
	            blur: (0, _utils.isFinite)(args.blur) ? args.blur : 4
	        });
	    },
	
	    grayscale: function grayscale(args) {
	
	        // `amount` ... the proportion of the conversion.
	        // A value of 1 is completely grayscale.
	        // A value of 0 leaves the input unchanged.
	
	        var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	        return (0, _utils.format)('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/></filter>')({
	            a: 0.2126 + 0.7874 * (1 - amount),
	            b: 0.7152 - 0.7152 * (1 - amount),
	            c: 0.0722 - 0.0722 * (1 - amount),
	            d: 0.2126 - 0.2126 * (1 - amount),
	            e: 0.7152 + 0.2848 * (1 - amount),
	            f: 0.0722 - 0.0722 * (1 - amount),
	            g: 0.2126 - 0.2126 * (1 - amount),
	            h: 0.0722 + 0.9278 * (1 - amount)
	        });
	    },
	
	    sepia: function sepia(args) {
	
	        // `amount` ... the proportion of the conversion.
	        // A value of 1 is completely sepia.
	        // A value of 0 leaves the input unchanged.
	
	        var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	        return (0, _utils.format)('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/></filter>')({
	            a: 0.393 + 0.607 * (1 - amount),
	            b: 0.769 - 0.769 * (1 - amount),
	            c: 0.189 - 0.189 * (1 - amount),
	            d: 0.349 - 0.349 * (1 - amount),
	            e: 0.686 + 0.314 * (1 - amount),
	            f: 0.168 - 0.168 * (1 - amount),
	            g: 0.272 - 0.272 * (1 - amount),
	            h: 0.534 - 0.534 * (1 - amount),
	            i: 0.131 + 0.869 * (1 - amount)
	        });
	    },
	
	    saturate: function saturate(args) {
	
	        // `amount` ... the proportion of the conversion.
	        // A value of 0 is completely un-saturated.
	        // A value of 1 leaves the input unchanged.
	
	        var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	        return (0, _utils.format)('<filter><feColorMatrix type="saturate" values="${amount}"/></filter>')({
	            amount: 1 - amount
	        });
	    },
	
	    hueRotate: function hueRotate(args) {
	
	        // `angle` ...  the number of degrees around the color
	        // circle the input samples will be adjusted.
	
	        return (0, _utils.format)('<filter><feColorMatrix type="hueRotate" values="${angle}"/></filter>')({
	            angle: args.angle || 0
	        });
	    },
	
	    invert: function invert(args) {
	
	        // `amount` ... the proportion of the conversion.
	        // A value of 1 is completely inverted.
	        // A value of 0 leaves the input unchanged.
	
	        var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	        return (0, _utils.format)('<filter><feComponentTransfer><feFuncR type="table" tableValues="${amount} ${amount2}"/><feFuncG type="table" tableValues="${amount} ${amount2}"/><feFuncB type="table" tableValues="${amount} ${amount2}"/></feComponentTransfer></filter>')({
	            amount: amount,
	            amount2: 1 - amount
	        });
	    },
	
	    brightness: function brightness(args) {
	
	        // `amount` ... proportion of the conversion.
	        // A value of 0 will create an image that is completely black.
	        // A value of 1 leaves the input unchanged.
	
	        return (0, _utils.format)('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}"/><feFuncG type="linear" slope="${amount}"/><feFuncB type="linear" slope="${amount}"/></feComponentTransfer></filter>')({
	            amount: (0, _utils.isFinite)(args.amount) ? args.amount : 1
	        });
	    },
	
	    contrast: function contrast(args) {
	
	        // `amount` ... proportion of the conversion.
	        // A value of 0 will create an image that is completely black.
	        // A value of 1 leaves the input unchanged.
	
	        var amount = (0, _utils.isFinite)(args.amount) ? args.amount : 1;
	
	        return (0, _utils.format)('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}" intercept="${amount2}"/><feFuncG type="linear" slope="${amount}" intercept="${amount2}"/><feFuncB type="linear" slope="${amount}" intercept="${amount2}"/></feComponentTransfer></filter>')({
	            amount: amount,
	            amount2: .5 - amount / 2
	        });
	    }
	};
	
	exports.default = filters;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _CellView2 = __webpack_require__(18);
	
	var _CellView3 = _interopRequireDefault(_CellView2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NodeView = (function (_CellView) {
	    _inherits(NodeView, _CellView);
	
	    function NodeView() {
	        _classCallCheck(this, NodeView);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NodeView).apply(this, arguments));
	    }
	
	    _createClass(NodeView, [{
	        key: 'update',
	        value: function update(specifiedAttrs) {
	
	            var that = this;
	            var cell = that.cell;
	            var allAttrs = cell.attrs;
	            var rotatableNode = that.rotatableNode;
	
	            if (rotatableNode) {
	                var rotationAttr = rotatableNode.attr('transform');
	                rotatableNode.attr('transform', '');
	            }
	
	            var relativelySelectors = [];
	            var nodesBySelector = {};
	
	            (0, _utils.forIn)(specifiedAttrs || allAttrs, function (attrs, selector) {
	
	                var vElems = that.find(selector);
	
	                if (!vElems.length) {
	                    return;
	                }
	
	                nodesBySelector[selector] = vElems;
	
	                var specialAttributes = NodeView.specialAttributes.slice();
	
	                if ((0, _utils.isObject)(attrs.filter)) {
	                    specialAttributes.push('filter');
	                    that.applyFilter(vElems, attrs.filter);
	                }
	
	                if ((0, _utils.isObject)(attrs.fill)) {
	                    specialAttributes.push('fill');
	                    that.applyGradient(vElems, 'fill', attrs.fill);
	                }
	
	                if ((0, _utils.isObject)(attrs.stroke)) {
	                    specialAttributes.push('stroke');
	                    that.applyGradient(vElems, 'stroke', attrs.stroke);
	                }
	
	                if (!(0, _utils.isUndefined)(attrs.text)) {
	                    specialAttributes.push('lineHeight', 'textPath', 'annotations');
	                    (0, _utils.forEach)(vElems, function (vElem) {
	                        vElem.text(attrs.text + '', {
	                            lineHeight: attrs.lineHeight,
	                            textPath: attrs.textPath,
	                            annotations: attrs.annotations
	                        });
	                    });
	                }
	
	                var finalAttributes = {};
	
	                (0, _utils.forIn)(attrs, function (value, key) {
	                    if (!(0, _utils.contains)(specialAttributes, key)) {
	                        finalAttributes[key] = value;
	                    }
	                });
	
	                // set regular attributes
	                (0, _utils.forEach)(vElems, function (vElem) {
	                    vElem.attr(finalAttributes);
	                });
	
	                if (attrs.port) {
	                    (0, _utils.forEach)(vElems, function (vElem) {
	                        vElem.attr('port', (0, _utils.isUndefined)(attrs.port.id) ? attrs.port : attrs.port.id);
	                    });
	                }
	
	                if (attrs.style) {
	                    (0, _utils.forEach)(vElems, function (vElem) {
	                        vElem.css(attrs.style);
	                    });
	                }
	
	                if (!(0, _utils.isUndefined)(attrs.html)) {
	                    (0, _utils.forEach)(vElems, function (vElem) {});
	                }
	
	                // Special `ref-x` and `ref-y` attributes make it possible to
	                // set both absolute or relative positioning of subElements.
	                (0, _utils.some)(['ref-x', 'ref-y', 'ref-dx', 'ref-dy', 'x-alignment', 'y-alignment', 'ref-width', 'ref-height'], function (key) {
	                    return !(0, _utils.isUndefined)(attrs[key]);
	                }) && relativelySelectors.push(selector);
	            });
	
	            // Note that we're using the bounding box without transformation
	            // because we are already inside a transformed coordinate system.
	            var size = cell.size;
	            var bbox = { x: 0, y: 0, width: size.width, height: size.height };
	
	            specifiedAttrs = specifiedAttrs || {};
	
	            (0, _utils.forEach)(relativelySelectors, function (selector) {
	
	                var specified = specifiedAttrs[selector];
	                var all = allAttrs[selector];
	                var attrs = specified ? (0, _utils.merge)({}, all, specified) : all;
	
	                (0, _utils.forEach)(nodesBySelector[selector], function (vElem) {
	                    that.positionRelative(vElem, bbox, attrs, nodesBySelector);
	                });
	            });
	
	            if (rotatableNode) {
	                rotatableNode.attr('transform', rotationAttr || '');
	            }
	
	            return that;
	        }
	    }, {
	        key: 'positionRelative',
	        value: function positionRelative(vElem, bbox, attributes, nodesBySelector) {
	
	            var that = this;
	            var ref = attributes['ref'];
	            var refDx = (0, _utils.toFloat)(attributes['ref-dx']);
	            var refDy = (0, _utils.toFloat)(attributes['ref-dy']);
	            var yAlignment = attributes['y-alignment'];
	            var xAlignment = attributes['x-alignment'];
	
	            var refX = attributes['ref-x'];
	            var refXPercentage = (0, _utils.isPercentage)(refX);
	            refX = (0, _utils.toFloat)(refX, refXPercentage);
	
	            var refY = attributes['ref-y'];
	            var refYPercentage = (0, _utils.isPercentage)(refY);
	            refY = (0, _utils.toFloat)(refY, refYPercentage);
	
	            var refWidth = attributes['ref-width'];
	            var refWidthPercentage = (0, _utils.isPercentage)(refWidth);
	            refWidth = (0, _utils.toFloat)(refWidth, refWidthPercentage);
	
	            var refHeight = attributes['ref-height'];
	            var refHeightPercentage = (0, _utils.isPercentage)(refHeight);
	            refHeight = (0, _utils.toFloat)(refHeight, refHeightPercentage);
	
	            // Check if the node is a descendant of the scalable group.
	            var scalableNode = vElem.findParent('pane-scalable', that.elem);
	
	            // `ref` is the selector of the reference element.
	            // If no `ref` specified, reference element is the root element.
	            if (ref) {
	
	                var vref;
	
	                if (nodesBySelector && nodesBySelector[ref]) {
	                    vref = nodesBySelector[ref][0];
	                } else {
	                    vref = ref === '.' ? that.vElem : that.vElem.findOne(ref);
	                }
	
	                if (!vref) {
	                    throw new Error('NodeView: reference does not exists.');
	                }
	
	                // Get the bounding box of the reference element
	                // relative to the root `<g>` element.
	                bbox = vref.bbox(false, that.elem);
	            }
	
	            // Remove the previous translate() from the transform attribute
	            // and translate the element relative to the root bounding box
	            // following the `ref-x` and `ref-y` attributes.
	            var transformAttr = vElem.attr('transform');
	            if (transformAttr) {
	                vElem.attr('transform', (0, _utils.clearTranslate)(transformAttr));
	            }
	
	            // `ref-width` and `ref-height` defines the width and height of the
	            // subElement relatively to the reference element size.
	            if (isFinite(refWidth)) {
	                if (refWidthPercentage || refWidth >= 0 && refWidth <= 1) {
	                    vElem.attr('width', refWidth * bbox.width);
	                } else {
	                    vElem.attr('width', Math.max(refWidth + bbox.width, 0));
	                }
	            }
	            if (isFinite(refHeight)) {
	                if (refHeightPercentage || refHeight >= 0 && refHeight <= 1) {
	                    vElem.attr('height', refHeight * bbox.height);
	                } else {
	                    vElem.attr('height', Math.max(refHeight + bbox.height, 0));
	                }
	            }
	
	            // The final translation of the subElement.
	            var tx = 0;
	            var ty = 0;
	            var scale;
	
	            // `ref-dx` and `ref-dy` define the offset of the subElement relative
	            // to the right and/or bottom coordinate of the reference element.
	            if (isFinite(refDx)) {
	                if (scalableNode) {
	                    scale = scalableNode.scale();
	                    tx = bbox.x + bbox.width + refDx / scale.sx;
	                } else {
	                    tx = bbox.x + bbox.width + refDx;
	                }
	            }
	            if (isFinite(refDy)) {
	                if (scalableNode) {
	                    scale = scale || scalableNode.scale();
	                    ty = bbox.y + bbox.height + refDy / scale.sy;
	                } else {
	                    ty = bbox.y + bbox.height + refDy;
	                }
	            }
	
	            if (isFinite(refX)) {
	                if (refXPercentage || refX > 0 && refX < 1) {
	                    tx = bbox.x + bbox.width * refX;
	                } else if (scalableNode) {
	                    scale = scale || scalableNode.scale();
	                    tx = bbox.x + refX / scale.sx;
	                } else {
	                    tx = bbox.x + refX;
	                }
	            }
	            if (isFinite(refY)) {
	                if (refXPercentage || refY > 0 && refY < 1) {
	                    ty = bbox.y + bbox.height * refY;
	                } else if (scalableNode) {
	                    scale = scale || scalableNode.scale();
	                    ty = bbox.y + refY / scale.sy;
	                } else {
	                    ty = bbox.y + refY;
	                }
	            }
	
	            if (!(0, _utils.isUndefined)(yAlignment) || !(0, _utils.isUndefined)(xAlignment)) {
	
	                var velBBox = vElem.bbox(false, that.paper.drawPane);
	
	                if (yAlignment === 'middle') {
	                    ty -= velBBox.height / 2;
	                } else if (isFinite(yAlignment)) {
	                    ty += yAlignment > -1 && yAlignment < 1 ? velBBox.height * yAlignment : yAlignment;
	                }
	
	                if (xAlignment === 'middle') {
	                    tx -= velBBox.width / 2;
	                } else if (isFinite(xAlignment)) {
	                    tx += xAlignment > -1 && xAlignment < 1 ? velBBox.width * xAlignment : xAlignment;
	                }
	            }
	
	            vElem.translate(tx, ty);
	
	            return that;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	
	            var that = this;
	            var vElem = that.vElem;
	
	            vElem.empty();
	
	            that.renderMarkup();
	
	            that.scalableNode = vElem.findOne('.pane-scalable');
	            that.rotatableNode = vElem.findOne('.pane-rotatable');
	
	            return that.update().resize().rotate().translate();
	        }
	    }, {
	        key: 'renderMarkup',
	        value: function renderMarkup() {
	
	            var that = this;
	            var cell = that.cell;
	            var markup = cell.markup;
	
	            if (markup) {
	                that.vElem.append((0, _vector2.default)(markup));
	            } else {
	                throw new Error('invalid markup');
	            }
	
	            return that;
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	
	            var that = this;
	            var size = that.cell.size || { width: 1, height: 1 };
	
	            var scalableNode = that.scalableNode;
	            if (!scalableNode) {
	                return;
	            }
	
	            var scalableBBox = scalableNode.bbox(true);
	
	            // Make sure `scalableBBox.width` and `scalableBBox.height` are not
	            // zero which can happen if the element does not have any content.
	            // By making the width(height) 1, we prevent HTML errors of the type
	            // `scale(Infinity, Infinity)`.
	            var sx = size.width / (scalableBBox.width || 1);
	            var sy = size.height / (scalableBBox.height || 1);
	            scalableNode.attr('transform', 'scale(' + sx + ',' + sy + ')');
	
	            var rotation = that.cell.rotation || { angle: 0 };
	            var angle = rotation.angle;
	
	            // Cancel the rotation but now around a different origin,
	            // which is the center of the scaled object.
	            var rotatableNode = that.rotatableNode;
	            var rotateAttr = rotatableNode && rotatableNode.attr('transform');
	
	            if (rotateAttr && rotateAttr !== 'null') {
	
	                rotatableNode.attr('transform', rotateAttr + ' rotate(' + -angle + ',' + size.width / 2 + ',' + size.height / 2 + ')');
	                var rotatableBBox = scalableNode.bbox(false, that.paper.drawPane);
	
	                // Store new x, y and perform rotate() again against the new rotation origin.
	                that.position = {
	                    x: rotatableBBox.x,
	                    y: rotatableBBox.y
	                };
	                that.rotate();
	            }
	
	            // Update must always be called on non-rotated element. Otherwise,
	            // relative positioning would work with wrong (rotated) bounding boxes.
	            that.update();
	
	            return that;
	        }
	    }, {
	        key: 'translate',
	        value: function translate() {
	
	            var that = this;
	            var position = that.cell.position || { x: 0, y: 0 };
	
	            that.vElem.attr('transform', 'translate(' + position.x + ',' + position.y + ')');
	            return that;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate() {
	
	            var that = this;
	            var node = that.rotatableNode;
	
	            if (node) {
	
	                var cell = that.cell;
	                var rotation = cell.rotation;
	                var angle = rotation && rotation.angle || 0;
	
	                var size = cell.size || { width: 1, height: 1 };
	                var ox = size.width / 2;
	                var oy = size.height / 2;
	
	                node.attr('transform', 'rotate(' + angle + ',' + ox + ',' + oy + ')');
	            }
	
	            return that;
	        }
	    }, {
	        key: 'scale',
	        value: function scale(sx, sy) {
	            var that = this;
	            that.vElem.scale(sx, sy);
	            return that;
	        }
	    }, {
	        key: 'getBBox',
	        value: function getBBox() {}
	    }]);
	
	    return NodeView;
	})(_CellView3.default);
	
	NodeView.specialAttributes = ['style', 'text', 'html', 'ref-x', 'ref-y', 'ref-dx', 'ref-dy', 'ref-width', 'ref-height', 'ref', 'x-alignment', 'y-alignment', 'port'];
	
	exports.default = NodeView;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Change = (function () {
	    function Change() {
	        _classCallCheck(this, Change);
	
	        if (new.target === Change) {
	            throw new Error('`Change` is an abstract class that cannot be instantiated.');
	        }
	    }
	
	    _createClass(Change, [{
	        key: 'digest',
	        value: function digest() {
	            return this;
	        }
	    }]);
	
	    return Change;
	})();
	
	exports.default = Change;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Change2 = __webpack_require__(22);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RootChange = (function (_Change) {
	    _inherits(RootChange, _Change);
	
	    function RootChange(model, root) {
	        _classCallCheck(this, RootChange);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RootChange).call(this));
	
	        var that = _this;
	
	        that.model = model;
	        that.root = root;
	        that.previous = root;
	        return _this;
	    }
	
	    _createClass(RootChange, [{
	        key: 'digest',
	        value: function digest() {
	
	            var that = this;
	            var model = that.model;
	            var previous = that.previous;
	
	            that.root = previous;
	            that.previous = model.rootChanged(previous);
	
	            return that;
	        }
	    }]);
	
	    return RootChange;
	})(_Change3.default);
	
	exports.default = RootChange;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Change2 = __webpack_require__(22);
	
	var _Change3 = _interopRequireDefault(_Change2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChildChange = (function (_Change) {
	    _inherits(ChildChange, _Change);
	
	    function ChildChange(model, parent, child, index) {
	        _classCallCheck(this, ChildChange);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildChange).call(this));
	
	        var that = _this;
	
	        that.model = model;
	        that.child = child;
	        that.parent = parent;
	        that.index = index;
	        that.previous = parent;
	        that.previousIndex = index;
	        return _this;
	    }
	
	    _createClass(ChildChange, [{
	        key: 'digest',
	        value: function digest() {
	
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
	        }
	    }, {
	        key: 'connect',
	        value: function connect(cell, connected) {
	
	            var that = this;
	            var model = that.model;
	
	            if (cell.isLink()) {
	
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
	    }]);
	
	    return ChildChange;
	})(_Change3.default);
	
	exports.default = ChildChange;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	var _Events2 = __webpack_require__(14);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	var _Cell = __webpack_require__(15);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _RootChange = __webpack_require__(23);
	
	var _RootChange2 = _interopRequireDefault(_RootChange);
	
	var _ChildChange = __webpack_require__(24);
	
	var _ChildChange2 = _interopRequireDefault(_ChildChange);
	
	var _ChangeCollection = __webpack_require__(26);
	
	var _ChangeCollection2 = _interopRequireDefault(_ChangeCollection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Model = (function (_Events) {
	    _inherits(Model, _Events);
	
	    function Model(root) {
	        _classCallCheck(this, Model);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this));
	
	        var that = _this;
	
	        that.nextId = 0;
	        that.updateLevel = 0;
	        that.endingUpdate = false;
	        that.changes = new _ChangeCollection2.default(that);
	
	        if (root) {
	            that.setRoot(root);
	        } else {
	            that.clear();
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
	            return this.getRoot().getChildAt(0); // the first layer
	        }
	    }, {
	        key: 'isAncestor',
	        value: function isAncestor(parent, child) {
	
	            if (!parent || !child) {
	                return false;
	            }
	
	            while (child && child !== parent) {
	                child = child.parent;
	            }
	
	            return child === parent;
	        }
	    }, {
	        key: 'contains',
	        value: function contains(cell) {
	            return this.isAncestor(this.root, cell);
	        }
	    }, {
	        key: 'getCellById',
	        value: function getCellById(id) {
	            return this.cells ? this.cells[id] : null;
	        }
	    }, {
	        key: 'createCellId',
	        value: function createCellId() {
	            var that = this;
	            var id = that.nextId;
	
	            that.nextId += 1;
	
	            return 'cell-' + id;
	        }
	    }, {
	        key: 'getAncestors',
	        value: function getAncestors(child) {
	
	            var that = this;
	            var result = [];
	            var parent = child ? child.parent : null;
	
	            if (parent) {
	                result.push(parent);
	                result = result.concat(that.getAncestors(parent));
	            }
	
	            return result;
	        }
	    }, {
	        key: 'getDescendants',
	        value: function getDescendants(parent) {
	
	            var that = this;
	            var result = [];
	
	            parent = parent || that.getRoot();
	            parent.eachChild(function (child) {
	                result.push(child);
	                result = result.concat(that.getDescendants(child));
	            });
	
	            return result;
	        }
	    }, {
	        key: 'getParents',
	        value: function getParents(cells) {
	
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
	
	            root.insertChild(this.createLayer());
	
	            return root;
	        }
	    }, {
	        key: 'getRoot',
	        value: function getRoot(cell) {
	
	            var root = cell || this.root;
	
	            if (cell) {
	                while (cell) {
	                    root = cell;
	                    cell = cell.parent;
	                }
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
	        value: function rootChanged(newRoot) {
	
	            var that = this;
	            var oldRoot = that.root;
	
	            that.root = newRoot;
	            that.cells = null;
	            that.nextId = 0;
	            that.cellAdded(newRoot);
	
	            return oldRoot;
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
	
	        // child
	        // -----
	
	    }, {
	        key: 'getParent',
	        value: function getParent(cell) {
	            return cell ? cell.parent : null;
	        }
	    }, {
	        key: 'addCell',
	        value: function addCell(child, parent, index) {
	            return this.addCells([child], parent, index);
	        }
	    }, {
	        key: 'addCells',
	        value: function addCells(cells, parent, index) {
	
	            var that = this;
	
	            parent = parent || that.getDefaultParent();
	            index = (0, _utils.isNullOrUndefined)(index) ? parent.getChildCount() : index;
	
	            that.beginUpdate();
	
	            (0, _utils.forEach)(cells, function (cell) {
	                if (cell && parent && cell !== parent) {
	                    that.digest(new _ChildChange2.default(that, parent, cell, index));
	                    index += 1;
	                } else {
	                    index -= 1;
	                }
	            });
	
	            that.endUpdate();
	
	            return that;
	        }
	    }, {
	        key: 'childChanged',
	        value: function childChanged(cell, newParent, newIndex) {
	
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
	        }
	    }, {
	        key: 'linkChanged',
	        value: function linkChanged(link, newNode, isSource) {
	            var oldNode = link.getNode(isSource);
	
	            if (newNode) {
	                newNode.insertLink(link, isSource);
	            } else if (oldNode) {
	                oldNode.removeLink(link, isSource);
	            }
	
	            return oldNode;
	        }
	    }, {
	        key: 'cellAdded',
	        value: function cellAdded(cell) {
	
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
	                if ((0, _utils.isNumeric)(id)) {
	                    that.nextId = Math.max(that.nextId, id);
	                }
	
	                cell.eachChild(that.cellAdded, that);
	            }
	        }
	    }, {
	        key: 'updateLinkParents',
	        value: function updateLinkParents(cell, root) {
	
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
	        }
	    }, {
	        key: 'updateLinkParent',
	        value: function updateLinkParent(link, root) {
	
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
	        }
	    }, {
	        key: 'getNearestCommonAncestor',
	        value: function getNearestCommonAncestor(cell1, cell2) {
	
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
	        }
	
	        // get the absolute, accumulated origin for the children
	        // inside the given parent as an `Point`.
	
	    }, {
	        key: 'getOrigin',
	        value: function getOrigin(cell) {
	
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
	        }
	    }, {
	        key: 'remove',
	        value: function remove(cell) {
	
	            var that = this;
	
	            if (cell) {
	                if (cell === that.root) {
	                    that.setRoot(null);
	                } else if (cell.parent) {
	                    that.digest(new _ChildChange2.default(that, null, cell));
	                }
	            }
	
	            return cell;
	        }
	    }, {
	        key: 'cellRemoved',
	        value: function cellRemoved(cell) {
	
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
	        }
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
	        key: 'getChildCells',
	        value: function getChildCells(parent, isNode, isLink) {
	            return parent ? parent.filterChild(function (child) {
	                return isNode && child.isNode || isLink && child.isLink;
	            }) : [];
	        }
	
	        // update
	        // ------
	
	    }, {
	        key: 'digest',
	        value: function digest(change) {
	
	            var that = this;
	
	            change.digest();
	
	            that.beginUpdate();
	            that.changes.add(change);
	            that.endUpdate();
	
	            return that;
	        }
	    }, {
	        key: 'beginUpdate',
	        value: function beginUpdate() {
	
	            var that = this;
	
	            that.updateLevel += 1;
	            that.trigger('beginUpdate');
	
	            if (that.updateLevel === 1) {
	                that.trigger('startEdit');
	            }
	        }
	    }, {
	        key: 'endUpdate',
	        value: function endUpdate() {
	
	            var that = this;
	
	            that.updateLevel -= 1;
	
	            if (that.updateLevel === 0) {
	                that.trigger('endEdit');
	            }
	
	            if (!that.endingUpdate) {
	
	                var changeCollection = that.changes;
	
	                that.endingUpdate = that.updateLevel === 0;
	                that.trigger('endUpdate', changeCollection.changes);
	
	                // TODO: 如果此时还没有和 paper 关联, 所有的 changes 都将失效, 所以需要一种机制来管理
	
	                if (that.endingUpdate && changeCollection.hasChange()) {
	                    changeCollection.notify().clear();
	                }
	
	                that.endingUpdate = false;
	            }
	        }
	    }]);
	
	    return Model;
	})(_Events3.default);
	
	exports.default = Model;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ChangeCollection = (function () {
	    function ChangeCollection(model) {
	        _classCallCheck(this, ChangeCollection);
	
	        this.model = model;
	    }
	
	    _createClass(ChangeCollection, [{
	        key: 'hasChange',
	        value: function hasChange() {
	            var changes = this.changes;
	            return changes && changes.length;
	        }
	    }, {
	        key: 'add',
	        value: function add(change) {
	
	            var that = this;
	            var changes = that.changes;
	
	            if (change) {
	
	                if (!changes) {
	                    changes = that.changes = [];
	                }
	
	                changes.push(change);
	            }
	
	            return change;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.changes = null;
	            return this;
	        }
	    }, {
	        key: 'notify',
	        value: function notify() {
	
	            var that = this;
	
	            that.model.trigger('change', that.changes);
	
	            return that;
	        }
	    }]);
	
	    return ChangeCollection;
	})();
	
	exports.default = ChangeCollection;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _utils = __webpack_require__(2);
	
	var _Events2 = __webpack_require__(14);
	
	var _Events3 = _interopRequireDefault(_Events2);
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _detector = __webpack_require__(38);
	
	var _detector2 = _interopRequireDefault(_detector);
	
	var _Model = __webpack_require__(25);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _Cell = __webpack_require__(15);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _LinkView = __webpack_require__(20);
	
	var _LinkView2 = _interopRequireDefault(_LinkView);
	
	var _NodeView = __webpack_require__(21);
	
	var _NodeView2 = _interopRequireDefault(_NodeView);
	
	var _RootChange = __webpack_require__(23);
	
	var _RootChange2 = _interopRequireDefault(_RootChange);
	
	var _ChildChange = __webpack_require__(24);
	
	var _ChildChange2 = _interopRequireDefault(_ChildChange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var counter = 0;
	
	// the default options for paper
	var defaultOptions = {
	    x: 0,
	    y: 0,
	    width: '100%',
	    height: '100%',
	    gridSize: 1,
	    viewportClassName: 'pane-viewport',
	    linkClassName: '',
	    nodeClassName: '',
	    getCellClassName: function getCellClassName(cell) {},
	    getView: function getView(cell) {}
	};
	
	var Paper = (function (_Events) {
	    _inherits(Paper, _Events);
	
	    function Paper(container, model, options) {
	        _classCallCheck(this, Paper);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).call(this));
	
	        var that = _this;
	
	        that.id = 'paper' + counter++;
	        that.model = model || new _Model2.default();
	
	        that.configure(options);
	
	        if (container) {
	            that.init(container).setup().resize().translate();
	        }
	        return _this;
	    }
	
	    // events
	    // ------
	    //  - paper:configure
	    //  - paper:init
	    //  - paper:setup
	    //  - paper:destroy
	    //  - paper:resize
	
	    _createClass(Paper, [{
	        key: 'configure',
	        value: function configure(options) {
	
	            var that = this;
	
	            that.options = (0, _utils.merge)({}, defaultOptions, options);
	            that.trigger('paper:configure', that.options);
	
	            return that;
	        }
	    }, {
	        key: 'snapToGrid',
	        value: function snapToGrid(point) {
	
	            // Convert global coordinates to the local ones of the `drawPane`.
	            // Otherwise, improper transformation would be applied when the
	            // drawPane gets transformed (scaled/rotated).
	
	            var that = this;
	            var gridSize = that.options.gridSize || 1;
	            var localPoint = (0, _vector2.default)(that.drawPane).toLocalPoint(point.x, point.y);
	
	            return {
	                x: (0, _utils.snapToGrid)(localPoint.x, gridSize),
	                y: (0, _utils.snapToGrid)(localPoint.y, gridSize)
	            };
	        }
	    }, {
	        key: 'toLocalPoint',
	        value: function toLocalPoint(point) {
	
	            var that = this;
	            var svg = that.svg;
	            var svgPoint = svg.createSVGPoint();
	
	            svgPoint.x = point.x;
	            svgPoint.y = point.y;
	
	            // This is a hack for Firefox! If there wasn't a fake (non-visible)
	            // rectangle covering the whole SVG area, the `$(paper.svg).offset()`
	            // used below won't work.
	            if (_detector2.default.IS_FF) {
	                var fakeRect = (0, _vector2.default)('rect', {
	                    width: that.options.width,
	                    height: that.options.height,
	                    x: 0,
	                    y: 0,
	                    opacity: 0
	                });
	                svg.appendChild(fakeRect.node);
	            }
	
	            var paperOffset = (0, _utils.getOffset)(svg);
	
	            if (_detector2.default.IS_FF) {
	                fakeRect.remove();
	            }
	
	            var doc = document;
	            var body = doc.body;
	            var docElem = doc.documentElement;
	            var scrollTop = body.scrollTop || docElem.scrollTop;
	            var scrollLeft = body.scrollLeft || docElem.scrollLeft;
	
	            svgPoint.x += scrollLeft - paperOffset.left;
	            svgPoint.y += scrollTop - paperOffset.top;
	
	            // Transform point into the viewport coordinate system.
	            return svgPoint.matrixTransform(that.drawPane.getCTM().inverse());
	        }
	
	        // lift cycle
	        // ----------
	
	    }, {
	        key: 'init',
	        value: function init(container) {
	
	            var that = this;
	
	            if (container) {
	
	                var svg = (0, _utils.createSvgDocument)();
	                var root = (0, _utils.createSvgElement)('g');
	                var drawPane = (0, _utils.createSvgElement)('g');
	
	                root.appendChild(drawPane);
	                svg.appendChild(root);
	                container.appendChild(svg);
	
	                that.svg = svg;
	                that.root = root;
	                that.drawPane = drawPane;
	                that.container = container;
	
	                that.trigger('paper:init', container);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'setup',
	        value: function setup() {
	
	            var that = this;
	            var svg = that.svg;
	
	            (0, _utils.addEventListener)(svg, 'contextmenu', that.onContextMenu.bind(that));
	            (0, _utils.addEventListener)(svg, 'dblclick', that.onMouseDblClick.bind(that));
	            (0, _utils.addEventListener)(svg, 'click', that.onMouseClick.bind(that));
	            (0, _utils.addEventListener)(svg, 'mousedown', that.onPointerDown.bind(that));
	            (0, _utils.addEventListener)(svg, 'touchstart', that.onPointerDown.bind(that));
	            (0, _utils.addEventListener)(svg, 'mousemove', that.onPointerMove.bind(that));
	            (0, _utils.addEventListener)(svg, 'touchmove', that.onPointerMove.bind(that));
	            (0, _utils.addEventListener)(svg, 'mouseover', '.pane-element', that.onCellMouseOver.bind(that));
	            (0, _utils.addEventListener)(svg, 'mouseout', '.pane-element', that.onCellMouseOut.bind(that));
	            (0, _utils.addEventListener)(svg, 'mouseover', '.pane-link', that.onCellMouseOver.bind(that));
	            (0, _utils.addEventListener)(svg, 'mouseout', '.pane-link', that.onCellMouseOut.bind(that));
	
	            // Disables built-in pan and zoom in IE10 and later
	            if (_detector2.default.IS_POINTER) {
	                that.container.style.msTouchAction = 'none';
	            }
	
	            that.model.on('change', that.processChanges, that);
	
	            that.trigger('paper:setup');
	
	            return that;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var that = this;
	
	            that.trigger('paper:destroy');
	
	            return that;
	        }
	
	        // validate
	        // --------
	
	    }, {
	        key: 'revalidate',
	        value: function revalidate() {
	            return this.invalidate().validate();
	        }
	    }, {
	        key: 'clear',
	        value: function clear(cell) {
	            var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	            var recurse = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	            var that = this;
	            var model = that.model;
	
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
	        }
	    }, {
	        key: 'invalidate',
	        value: function invalidate(cell) {
	            var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	            var includeLink = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	            var that = this;
	            var model = that.model;
	
	            cell = cell || model.getRoot();
	
	            var view = that.getView(cell);
	
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
	        }
	    }, {
	        key: 'validate',
	        value: function validate(cell) {
	
	            var that = this;
	
	            cell = cell || that.model.getRoot();
	
	            that.validateCell(cell).validateView(cell);
	
	            return that;
	        }
	    }, {
	        key: 'validateCell',
	        value: function validateCell(cell) {
	            var visible = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	            // create or remove view for cell
	
	            var that = this;
	
	            if (cell) {
	
	                visible = visible && cell.visible;
	
	                var view = that.getView(cell, visible);
	
	                if (view && !visible) {
	                    that.removeView(cell);
	                }
	
	                cell.eachChild(function (child) {
	                    that.validateCell(child, visible);
	                });
	            }
	
	            return that;
	        }
	    }, {
	        key: 'validateView',
	        value: function validateView(cell) {
	            var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	            var that = this;
	
	            if (cell) {
	
	                var view = that.getView(cell);
	
	                if (view) {
	                    if (view.invalid) {
	                        view.invalid = false;
	
	                        that.validateView(cell.getParent(), recurse);
	
	                        // render
	                        that.renderView(cell);
	                    }
	                }
	
	                if (recurse) {
	                    cell.eachChild(function (child) {
	                        that.validateView(child, recurse);
	                    });
	                }
	            }
	
	            return that;
	        }
	
	        // transform
	        // ---------
	
	    }, {
	        key: 'resize',
	        value: function resize(width, height) {
	
	            var that = this;
	            var options = that.options;
	
	            width = options.width = width || options.width;
	            height = options.height = height || options.height;
	
	            (0, _vector2.default)(that.svg).attr({ width: width, height: height });
	
	            that.trigger('paper:resize', width, height);
	
	            return that;
	        }
	    }, {
	        key: 'translate',
	        value: function translate(x, y, absolute) {
	
	            var that = this;
	            var options = that.options;
	
	            x = options.x = x || options.x;
	            y = options.y = y || options.y;
	
	            (0, _vector2.default)(that.root).translate(x, y, absolute);
	
	            that.trigger('paper:translate', x, y);
	
	            return that;
	        }
	    }, {
	        key: 'translateTo',
	        value: function translateTo(x, y) {
	            return this.translate(x, y, true);
	        }
	    }, {
	        key: 'scale',
	        value: function scale(sx, sy) {
	            var ox = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var oy = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(deg) {
	            var ox = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var oy = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        }
	
	        // view
	        // ----
	
	    }, {
	        key: 'getView',
	        value: function getView(cell, create) {
	
	            var that = this;
	            var views = that.views;
	
	            if (cell) {
	                var view = views ? views[cell.id] : null;
	
	                if (!view && create && cell.visible) {
	                    view = that.createView(cell);
	                }
	
	                return view;
	            }
	        }
	    }, {
	        key: 'createView',
	        value: function createView(cell) {
	
	            var that = this;
	            var options = that.options;
	
	            // get view's constructor from options.
	            var ViewClass = options.getView.call(that, cell);
	
	            if (!ViewClass) {
	                ViewClass = cell.isLink() ? _LinkView2.default : cell.isNode() ? _NodeView2.default : null;
	            }
	
	            if (ViewClass) {
	
	                var view = new ViewClass(that, cell);
	                var views = that.views;
	
	                if (!views) {
	                    views = that.views = {};
	                }
	
	                views[cell.id] = view;
	
	                return view;
	            }
	        }
	    }, {
	        key: 'removeView',
	        value: function removeView(cell) {
	
	            var that = this;
	            var view = that.getView(cell);
	
	            if (view) {
	                delete that.views[cell.id];
	                view.destroy();
	            }
	
	            return that;
	        }
	    }, {
	        key: 'renderView',
	        value: function renderView(cell) {
	
	            var that = this;
	            var view = that.getView(cell);
	
	            if (view) {
	                view.render();
	            }
	        }
	    }, {
	        key: 'findViewByElem',
	        value: function findViewByElem(elem) {
	
	            var that = this;
	            var svg = that.svg;
	
	            elem = (0, _utils.isString)(elem) ? svg.querySelector(elem) : elem;
	
	            while (elem && elem !== svg && elem !== document) {
	
	                var cellId = elem.cellId;
	                if (cellId) {
	                    return that.views[cellId];
	                }
	
	                elem = elem.parentNode;
	            }
	
	            return null;
	        }
	    }, {
	        key: 'findViewByCell',
	        value: function findViewByCell(cell) {
	
	            var id = (0, _utils.isString)(cell) ? cell : cell.id;
	            return this.views[id];
	        }
	    }, {
	        key: 'findViewByPoint',
	        value: function findViewByPoint(point) {}
	    }, {
	        key: 'findViewsInArea',
	        value: function findViewsInArea(rect) {}
	
	        // changes
	        // -------
	
	    }, {
	        key: 'processChanges',
	        value: function processChanges(changes) {
	
	            var that = this;
	
	            console.log(changes);
	
	            (0, _utils.forEach)(changes, function (change) {
	                that.distributeChange(change);
	            });
	
	            that.validate();
	
	            return that;
	        }
	    }, {
	        key: 'distributeChange',
	        value: function distributeChange(change) {
	
	            var that = this;
	
	            if (change instanceof _RootChange2.default) {
	                that.onRootChanged(change);
	            } else if (change instanceof _ChildChange2.default) {
	                that.onChildChanged(change);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'onRootChanged',
	        value: function onRootChanged(change) {}
	    }, {
	        key: 'onChildChanged',
	        value: function onChildChanged(change) {
	
	            var that = this;
	
	            var newParent = change.parent;
	            var oldParent = change.previous;
	
	            that.invalidate(change.child, true, true);
	
	            //if (newParent == null || this.isCellCollapsed(newParent)) {
	            //    this.view.invalidate(change.child, true, true);
	            //    this.removeStateForCell(change.child);
	            //
	            //    // Handles special case of current root of view being removed
	            //    if (this.view.currentRoot == change.child) {
	            //        this.home();
	            //    }
	            //}
	
	            if (newParent !== oldParent) {
	                // Refreshes the collapse/expand icons on the parents
	                if (newParent) {
	                    that.invalidate(newParent, false, false);
	                }
	
	                if (oldParent) {
	                    that.invalidate(oldParent, false, false);
	                }
	            }
	        }
	
	        // event handlers
	        // --------------
	
	    }, {
	        key: 'isValidEvent',
	        value: function isValidEvent(e, view) {
	
	            // If the event is interesting, guard returns `true`.
	            // Otherwise, it return `false`.
	
	            if (view && view.cell && view.cell instanceof _Cell2.default) {
	                return true;
	            } else {
	
	                var that = this;
	                var svg = that.svg;
	                var target = e.target;
	
	                if (svg === target || (0, _utils.containsElem)(svg, target)) {
	                    return true;
	                }
	            }
	        }
	    }, {
	        key: 'onContextMenu',
	        value: function onContextMenu(e) {
	
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var view = that.findViewByElem(e.target);
	
	            if (!that.isValidEvent(e, view)) {
	                return;
	            }
	
	            var localPoint = that.snapToGrid({ x: e.clientX, y: e.clientY });
	
	            if (view) {
	                that.sourceView = view;
	                view.onContextMenu(e, localPoint.x, localPoint.y);
	            } else {
	                that.trigger('blank:contextmenu', e, localPoint.x, localPoint.y);
	            }
	        }
	    }, {
	        key: 'onMouseDblClick',
	        value: function onMouseDblClick(e) {
	
	            e.preventDefault();
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var view = that.findViewByElem(e.target);
	
	            if (!that.isValidEvent(e, view)) {
	                return;
	            }
	
	            var localPoint = that.snapToGrid({ x: e.clientX, y: e.clientY });
	
	            if (view) {
	                view.onMouseDblClick(e, localPoint.x, localPoint.y);
	            } else {
	                that.trigger('blank:pointerdblclick', e, localPoint.x, localPoint.y);
	            }
	        }
	    }, {
	        key: 'onMouseClick',
	        value: function onMouseClick(e) {}
	    }, {
	        key: 'onPointerDown',
	        value: function onPointerDown(e) {
	
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var view = that.findViewByElem(e.target);
	
	            if (!that.isValidEvent(e, view)) {
	                return;
	            }
	
	            var localPoint = that.snapToGrid({ x: e.clientX, y: e.clientY });
	
	            if (view) {
	                view.onPointerDown(e, localPoint.x, localPoint.y);
	            } else {
	                that.trigger('blank:pointerDown', e, localPoint.x, localPoint.y);
	            }
	        }
	    }, {
	        key: 'onPointerMove',
	        value: function onPointerMove(e) {
	
	            e.preventDefault();
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var sourceView = that.sourceView;
	
	            if (sourceView) {
	
	                var localPoint = that.snapToGrid({ x: e.clientX, y: e.clientY });
	
	                that._mouseMoved++;
	
	                sourceView.onPointerMove(e, localPoint.x, localPoint.y);
	            }
	        }
	    }, {
	        key: 'onPointerUp',
	        value: function onPointerUp(e) {
	
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var localPoint = that.snapToGrid({ x: e.clientX, y: e.clientY });
	            var sourceView = that.sourceView;
	
	            if (sourceView) {
	                sourceView.onPointerUp(e, localPoint.x, localPoint.y);
	                that.sourceView = null;
	            } else {
	                that.trigger('blank:pointerUp', e, localPoint.x, localPoint.y);
	            }
	        }
	    }, {
	        key: 'onCellMouseOver',
	        value: function onCellMouseOver(e) {
	
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var view = that.findViewByElem(e.target);
	
	            if (view) {
	
	                if (!that.isValidEvent(e, view)) {
	                    return;
	                }
	
	                view.mouseover(e);
	            }
	        }
	    }, {
	        key: 'onCellMouseOut',
	        value: function onCellMouseOut(e) {
	
	            e = (0, _utils.normalizeEvent)(e);
	
	            var that = this;
	            var view = that.findViewByElem(e.target);
	
	            if (view) {
	
	                if (!that.isValidEvent(e, view)) {
	                    return;
	                }
	
	                view.mouseout(e);
	            }
	        }
	    }]);
	
	    return Paper;
	})(_Events3.default);
	
	exports.default = Paper;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Node2 = __webpack_require__(17);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Generic = (function (_Node) {
	    _inherits(Generic, _Node);
	
	    function Generic() {
	        _classCallCheck(this, Generic);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Generic).apply(this, arguments));
	    }
	
	    return Generic;
	})(_Node3.default);
	
	Generic.configure({
	    defaults: {
	        attrs: {
	            '.': { fill: '#ffffff', stroke: 'none' }
	        }
	    }
	});
	
	exports.default = Generic;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Text = (function (_Generic) {
	    _inherits(Text, _Generic);
	
	    function Text() {
	        _classCallCheck(this, Text);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
	    }
	
	    return Text;
	})(_Generic3.default);
	
	Text.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><text/></g></g>',
	    defaults: {
	        attrs: {
	            'text': {
	                'font-size': 18,
	                fill: '#000000'
	            }
	        }
	    }
	});
	
	exports.default = Text;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rect = (function (_Generic) {
	    _inherits(Rect, _Generic);
	
	    function Rect() {
	        _classCallCheck(this, Rect);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Rect).apply(this, arguments));
	    }
	
	    return Rect;
	})(_Generic3.default);
	
	Rect.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><rect/></g><text/></g>',
	    defaults: {
	        attrs: {
	            'rect': {
	                fill: '#ffffff',
	                stroke: '#000000',
	                width: 100,
	                height: 60
	            },
	            'text': {
	                fill: '#000000',
	                text: '',
	                'font-size': 14,
	                'ref-x': .5,
	                'ref-y': .5,
	                'text-anchor': 'middle',
	                'y-alignment': 'middle',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
	        }
	    }
	});
	
	exports.default = Rect;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Circle = (function (_Generic) {
	    _inherits(Circle, _Generic);
	
	    function Circle() {
	        _classCallCheck(this, Circle);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Circle).apply(this, arguments));
	    }
	
	    return Circle;
	})(_Generic3.default);
	
	Circle.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><circle/></g><text/></g>',
	    defaults: {
	        size: { width: 60, height: 60 },
	        attrs: {
	            'circle': {
	                fill: '#ffffff',
	                stroke: '#000000',
	                r: 30,
	                cx: 30,
	                cy: 30
	            },
	            'text': {
	                'font-size': 14,
	                text: '',
	                'text-anchor': 'middle',
	                'ref-x': .5,
	                'ref-y': .5,
	                'y-alignment': 'middle',
	                fill: '#000000',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
	        }
	    }
	
	});
	
	exports.default = Circle;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ellipse = (function (_Generic) {
	    _inherits(Ellipse, _Generic);
	
	    function Ellipse() {
	        _classCallCheck(this, Ellipse);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Ellipse).apply(this, arguments));
	    }
	
	    return Ellipse;
	})(_Generic3.default);
	
	Ellipse.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><ellipse/></g><text/></g>',
	    defaults: {
	        size: { width: 60, height: 40 },
	        attrs: {
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
	                text: '',
	                'text-anchor': 'middle',
	                'ref-x': .5,
	                'ref-y': .5,
	                'y-alignment': 'middle',
	                fill: '#000000',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
	        }
	    }
	});
	
	exports.default = Ellipse;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Image = (function (_Generic) {
	    _inherits(Image, _Generic);
	
	    function Image() {
	        _classCallCheck(this, Image);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Image).apply(this, arguments));
	    }
	
	    return Image;
	})(_Generic3.default);
	
	Image.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><image/></g><text/></g>',
	    defaults: {
	        attrs: {
	            'text': {
	                'font-size': 14,
	                text: '',
	                'text-anchor': 'middle',
	                'ref-x': .5,
	                'ref-dy': 20,
	                'y-alignment': 'middle',
	                fill: '#000000',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
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
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Path = (function (_Generic) {
	    _inherits(Path, _Generic);
	
	    function Path() {
	        _classCallCheck(this, Path);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Path).apply(this, arguments));
	    }
	
	    return Path;
	})(_Generic3.default);
	
	Path.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><path/></g><text/></g>',
	    defaults: {
	        size: { width: 60, height: 60 },
	        attrs: {
	            'path': {
	                fill: '#ffffff',
	                stroke: '#000000'
	            },
	            'text': {
	                'font-size': 14,
	                text: '',
	                'text-anchor': 'middle',
	                'ref': 'path',
	                'ref-x': .5,
	                'ref-dy': 10,
	                fill: '#000000',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
	        }
	    }
	});
	
	exports.default = Path;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Polygon = (function (_Generic) {
	    _inherits(Polygon, _Generic);
	
	    function Polygon() {
	        _classCallCheck(this, Polygon);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Polygon).apply(this, arguments));
	    }
	
	    return Polygon;
	})(_Generic3.default);
	
	Polygon.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><polygon/></g><text/></g>',
	    defaults: {
	        size: { width: 60, height: 40 },
	        attrs: {
	            'polygon': {
	                fill: '#ffffff',
	                stroke: '#000000'
	            },
	            'text': {
	                'font-size': 14,
	                text: '',
	                'text-anchor': 'middle',
	                'ref-x': .5,
	                'ref-dy': 20,
	                'y-alignment': 'middle',
	                fill: '#000000',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
	        }
	    }
	});
	
	exports.default = Polygon;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Generic2 = __webpack_require__(28);
	
	var _Generic3 = _interopRequireDefault(_Generic2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Polyline = (function (_Generic) {
	    _inherits(Polyline, _Generic);
	
	    function Polyline() {
	        _classCallCheck(this, Polyline);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Polyline).apply(this, arguments));
	    }
	
	    return Polyline;
	})(_Generic3.default);
	
	Polyline.configure({
	    markup: '<g class="pane-rotatable"><g class="pane-scalable"><polyline/></g><text/></g>',
	    defaults: {
	        size: { width: 60, height: 40 },
	        attrs: {
	            'polyline': {
	                fill: '#ffffff',
	                stroke: '#000000'
	            },
	            'text': {
	                'font-size': 14,
	                text: '',
	                'text-anchor': 'middle',
	                'ref-x': .5,
	                'ref-dy': 20,
	                'y-alignment': 'middle',
	                fill: '#000000',
	                'font-family': 'Arial, helvetica, sans-serif'
	            }
	        }
	    }
	});
	
	exports.default = Polyline;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Path2 = __webpack_require__(34);
	
	var _Path3 = _interopRequireDefault(_Path2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rhombus = (function (_Path) {
	    _inherits(Rhombus, _Path);
	
	    function Rhombus() {
	        _classCallCheck(this, Rhombus);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Rhombus).apply(this, arguments));
	    }
	
	    return Rhombus;
	})(_Path3.default);
	
	Rhombus.configure({
	    defaults: {
	        attrs: {
	            'path': {
	                d: 'M 30 0 L 60 30 30 60 0 30 z'
	            },
	            'text': {
	                'ref-y': 0.5,
	                'y-alignment': 'middle'
	            }
	        }
	    }
	});
	
	exports.default = Rhombus;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ua = navigator.userAgent;
	var av = navigator.appVersion;
	
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
	
	    IS_TOUCH: 'ontouchstart' in document.documentElement,
	
	    IS_POINTER: window.navigator.msPointerEnabled || false
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane.js.map