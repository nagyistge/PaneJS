var utils = require('../common/utils');
var detector = require('../common/detector');

var each = utils.each;
var indexOf = utils.indexOf;

var IS_TOUCH = detector.IS_TOUCH;
var IS_POINTER = detector.IS_POINTER;

var domEvent = {

    // 保存已经绑定事件的元素
    cache: [],

    on: function () {

        var update = function (element, eventName, callback) {

            var list = element.eventListeners;

            if (!list) {
                list = element.eventListeners = [];
                domEvent.cache.push(element);
            }

            list.push({
                eventName: eventName,
                callback: callback
            });
        };

        if (window.addEventListener) {
            return function (element, eventName, callback) {
                element.addEventListener(eventName, callback, false);
                update(element, eventName, callback);
            };
        } else {
            return function (element, eventName, callback) {
                element.attachEvent('on' + eventName, callback);
                update(element, eventName, callback);
            };
        }
    }(),

    off: function () {
        var updateListener = function (element, eventName, callback) {

            var list = element.eventListeners;

            if (list) {
                for (var i = list.length - 1; i >= 0; i--) {
                    var entry = list[i];

                    if (entry.eventName === eventName && entry.callback === callback) {
                        list.splice(i, 1);
                    }
                }

                if (list.length === 0) {
                    delete element.eventListeners;

                    var idx = indexOf(domEvent.cache, element);
                    if (idx >= 0) {
                        domEvent.cache.splice(idx, 1);
                    }
                }
            }
        };

        if (window.removeEventListener) {
            return function (element, eventName, callback) {
                element.removeEventListener(eventName, callback, false);
                updateListener(element, eventName, callback);
            };
        }
        else {
            return function (element, eventName, callback) {
                element.detachEvent('on' + eventName, callback);
                updateListener(element, eventName, callback);
            };
        }
    }(),

    clear: function (element) {

        var list = element.eventListeners;

        list && each(list, function (entry) {
            domEvent.off(element, entry.eventName, entry.callback);

        });
    },

    release: function (element) {
        if (element) {
            domEvent.clear(element);

            var children = element.childNodes;

            if (children) {
                for (var i = 0, l = children.length; i < l; i += 1) {
                    domEvent.release(children[i]);
                }
            }
        }
    },

    onGesture: function (element, startListener, moveListener, endListener) {
        if (startListener) {
            domEvent.on(element, IS_POINTER ? 'MSPointerDown' : 'mousedown', startListener);
        }

        if (moveListener) {
            domEvent.on(element, IS_POINTER ? 'MSPointerMove' : 'mousemove', moveListener);
        }

        if (endListener) {
            domEvent.on(element, IS_POINTER ? 'MSPointerUp' : 'mouseup', endListener);
        }

        if (IS_TOUCH && !IS_POINTER) {
            if (startListener) {
                domEvent.on(element, 'touchstart', startListener);
            }

            if (moveListener) {
                domEvent.on(element, 'touchmove', moveListener);
            }

            if (endListener) {
                domEvent.on(element, 'touchend', endListener);
            }
        }
    },

    offGesture: function (element, startListener, moveListener, endListener) {
        if (startListener) {
            domEvent.off(element, (IS_POINTER) ? 'MSPointerDown' : 'mousedown', startListener);
        }

        if (moveListener) {
            domEvent.off(element, (IS_POINTER) ? 'MSPointerMove' : 'mousemove', moveListener);
        }

        if (endListener) {
            domEvent.off(element, (IS_POINTER) ? 'MSPointerUp' : 'mouseup', endListener);
        }

        if (IS_TOUCH && !IS_POINTER) {
            if (startListener) {
                domEvent.off(element, 'touchstart', startListener);
            }

            if (moveListener) {
                domEvent.off(element, 'touchmove', moveListener);
            }

            if (endListener) {
                domEvent.off(element, 'touchend', endListener);
            }
        }
    },

    onMouseWheel: function (callback) {
        if (!callback) {
            return;
        }

        var wheelHandler = function (evt) {

            // IE does not give an event object but the
            // global event object is the mousewheel event
            // at this point in time.
            evt = evt || window.event;

            var delta = 0;

            if (detector.IS_FF) {
                delta = -evt.detail / 2;
            } else {
                delta = evt.wheelDelta / 120;
            }

            // Handles the event using the given function
            if (delta !== 0) {
                callback(evt, delta > 0);
            }
        };

        // Webkit has NS event API, but IE event name and details
        if (detector.IS_NS && !document.documentMode) {
            var eventName = (detector.IS_SF || detector.IS_GC) ? 'mousewheel' : 'DOMMouseScroll';
            domEvent.on(window, eventName, wheelHandler);
        } else {
            domEvent.on(document, 'mousewheel', wheelHandler);
        }

    },

    getSource: function (evt) {
        return evt.srcElement || evt.target;
    },

    getMainEvent: function (e) {
        if ((e.type === 'touchstart' || e.type === 'touchmove') && e.touches && e.touches[0]) {
            e = e.touches[0];
        } else if (e.type === 'touchend' && e.changedTouches && e.changedTouches[0]) {
            e = e.changedTouches[0];
        }

        return e;
    },

    getClientX: function (e) {
        return domEvent.getMainEvent(e).clientX;
    },

    /**
     * Function: getClientY
     *
     * Returns true if the meta key is pressed for the given event.
     */
    getClientY: function (e) {
        return domEvent.getMainEvent(e).clientY;
    },

    consume: function (evt, preventDefault, stopPropagation) {
        preventDefault = preventDefault ? preventDefault : true;
        stopPropagation = stopPropagation ? stopPropagation : true;

        if (preventDefault) {
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        }

        if (stopPropagation) {
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
        }

        evt.consumed = true;
    },

    isTouchEvent: function (evt) {
        return evt.pointerType
            ? (evt.pointerType === 'touch' || evt.pointerType === evt.MSPOINTER_TYPE_TOUCH)
            : (evt.mozInputSource ? evt.mozInputSource === 5 : evt.type.indexOf('touch') === 0);
    },

    isMultiTouchEvent: function (evt) {
        return evt.type
            && evt.type.indexOf('touch') === 0
            && evt.touches
            && evt.touches.length > 1;
    },

    isMouseEvent: function (evt) {
        return evt.pointerType
            ? (evt.pointerType === 'mouse' || evt.pointerType === evt.MSPOINTER_TYPE_MOUSE)
            : (evt.mozInputSource ? evt.mozInputSource === 1 : evt.type.indexOf('mouse') === 0);
    },

    isLeftMouseButton: function (evt) {
        return evt.button === ((mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) ? 1 : 0);
    },

    isMiddleMouseButton: function (evt) {
        return evt.button == ((mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) ? 4 : 1);
    },

    isRightMouseButton: function (evt) {
        return evt.button === 2;
    },

    isPopupTrigger: function (evt) {
        return mxEvent.isRightMouseButton(evt) || (mxClient.IS_MAC && mxEvent.isControlDown(evt) && !mxEvent.isShiftDown(evt) && !mxEvent.isMetaDown(evt) && !mxEvent.isAltDown(evt));
    },

    isShiftDown: function (evt) {
        return evt ? evt.shiftKey : false;
    },

    isAltDown: function (evt) {
        return evt ? evt.altKey : false;
    },

    isControlDown: function (evt) {
        return evt ? evt.ctrlKey : false;
    },

    isMetaDown: function (evt) {
        return evt ? evt.metaKey : false;
    }
};

module.exports = domEvent;
