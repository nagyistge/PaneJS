/******/
(function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};

    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {

        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId])
        /******/            {
            return installedModules[moduleId].exports;
        }

        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            exports: {},
            /******/            id: moduleId,
            /******/            loaded: false
            /******/
        };

        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ 		// Flag the module as loaded
        /******/
        module.loaded = true;

        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;

    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "./out/";

    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(0);
    /******/
})
    /************************************************************************/
    /******/([
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, '__esModule', {
            value: true
        });

        var _langEs6 = __webpack_require__(1);

        function isNode(node, nodeName, attributeName, attributeValue) {
            var ret = node && !isNaN(node.nodeType);

            if (ret) {
                ret = (0, _langEs6.isNullOrUndefined)(nodeName) || node.nodeName.toLowerCase() === nodeName.toLowerCase();
            }

            if (ret) {
                ret = (0, _langEs6.isNullOrUndefined)(attributeName) || node.getAttribute(attributeName) === attributeValue;
            }

            return ret;
        }

        function getCurrentStyle(node) {
            return node.currentStyle || window.getComputedStyle(node, null);
        }

        exports.isNode = isNode;
        exports.getCurrentStyle = getCurrentStyle;

        /***/
    },
    /* 1 */
    /***/ function (module, exports) {

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

        /***/
    }
    /******/]);
