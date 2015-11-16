import {
    each,
    indexOf,
    isFunction,
} from '../common/utils';

import detector from '../common/detector'

var MOUSE_DOWN = detector.IS_POINTER ? 'MSPointerDown' : detector.IS_TOUCH ? 'touchstart' : 'mousedown';
var MOUSE_MOVE = detector.IS_POINTER ? 'MSPointerMove' : detector.IS_TOUCH ? 'touchmove' : 'mousemove';
var MOUSE_UP = detector.IS_POINTER ? 'MSPointerUp' : detector.IS_TOUCH ? 'touchend' : 'mouseup';

var domEvent = {

    cache: [],

    addListener: function () {

        function updateListenerList(element, eventName, handler) {
            if (!element.listeners) {
                element.listeners = [];
                domEvent.cache.push(element);
            }

            element.listeners.push({
                name: eventName,
                handler: handler
            });
        }

        if (window.addEventListener) {
            return function (element, eventName, handler) {
                element.addEventListener(eventName, handler, false);
                updateListenerList(element, eventName, handler);
            };
        } else {
            return function (element, eventName, handler) {
                element.attachEvent('on' + eventName, handler);
                updateListenerList(element, eventName, handler);
            };
        }
    }(),

    removeListener: function () {

        function updateListener(element, eventName, handler) {

            var listeners = element.listeners;

            if (listeners) {

                for (var i = listeners.length - 1; i >= 0; i--) {
                    var entry = listeners[i];

                    if (entry.name === eventName && entry.handler === handler) {
                        listeners.splice(i, 1);
                        break;
                    }
                }

                if (listeners.length === 0) {
                    element.listeners = null;

                    var idx = indexOf(domEvent.cache, element);

                    if (idx >= 0) {
                        domEvent.cache.splice(idx, 1);
                    }
                }
            }
        }

        if (window.removeEventListener) {
            return function (element, eventName, handler) {
                element.removeEventListener(eventName, handler, false);
                updateListener(element, eventName, handler);
            };
        } else {
            return function (element, eventName, handler) {
                element.detachEvent('on' + eventName, handler);
                updateListener(element, eventName, handler);
            };
        }
    }(),

    removeAllListeners: function (element) {
        var list = element.listeners;

        list && each(list, function (entry) {
            domEvent.removeListener(element, entry.name, entry.handler);
        });
    },

    addGestureListeners: function (node, startListener, moveListener, endListener) {
        if (startListener) {
            domEvent.addListener(node, MOUSE_DOWN, startListener);
        }

        if (moveListener) {
            domEvent.addListener(node, MOUSE_MOVE, moveListener);
        }

        if (endListener) {
            domEvent.addListener(node, MOUSE_UP, endListener);
        }
    },

    removeGestureListeners: function (node, startListener, moveListener, endListener) {
        if (startListener) {
            mxEvent.removeListener(node, MOUSE_DOWN, startListener);
        }

        if (moveListener) {
            mxEvent.removeListener(node, MOUSE_MOVE, moveListener);
        }

        if (endListener) {
            mxEvent.removeListener(node, MOUSE_UP, endListener);
        }
    },

    redirectMouseEvents: function (node, graph, state, down, move, up, dblClick) {

        var getState = function (e) {
            return isFunction(state) ? state(e) : state;
        };

        domEvent.addGestureListeners(node,
            function (e) {
                if (down) {
                    down(e);
                } else if (!domEvent.isConsumed(e)) {
                    graph.fireMouseEvent('mouseDown', new MouseEvent(e, getState(e)));
                }
            },
            function (e) {
                if (move) {
                    move(e);
                } else if (!domEvent.isConsumed(e)) {
                    graph.fireMouseEvent('mouseMove', new MouseEvent(e, getState(e)));
                }
            },
            function (e) {
                if (up) {
                    up(e);
                } else if (!domEvent.isConsumed(e)) {
                    graph.fireMouseEvent('mouseUp', new MouseEvent(e, getState(e)));
                }
            });

        domEvent.addListener(node, 'dblclick', function (e) {
            if (dblClick) {
                dblClick(e);
            } else if (!domEvent.isConsumed(e)) {
                var state = getState(e);
                graph.dblClick(e, state ? state.cell : null);
            }
        });
    },

    release: function (element) {
        if (element) {
            domEvent.removeAllListeners(element);

            var children = element.childNodes;

            if (children) {
                for (var i = 0, l = children.length; i < l; i++) {
                    domEvent.release(children[i]);
                }
            }
        }
    },

    addMouseWheelListener: function (handler) {
        if (handler) {
            var wheelHandler = function (e) {

                e = e || window.event;

                var delta = 0;

                if (detector.IS_FF) {
                    delta = -e.detail / 2;
                } else {
                    delta = e.wheelDelta / 120;
                }

                // handle the event using the given function
                if (delta !== 0) {
                    handler(e, delta > 0);
                }
            };

            // Webkit has NS event API, but IE event name and details
            if (detector.IS_NS && !document.documentMode) {
                var eventName = detector.IS_SF || detector.IS_GC ? 'mousewheel' : 'DOMMouseScroll';
                domEvent.addListener(window, eventName, wheelHandler);
            } else {
                domEvent.addListener(document, 'mousewheel', wheelHandler);
            }
        }
    },

    getSource: function (e) {
        return e.srcElement ? e.srcElement : e.target;
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

    getClientY: function (e) {
        return domEvent.getMainEvent(e).clientY;
    },

    isConsumed: function (e) {
        return e.consumed === true;
    },

    isTouchEvent: function (e) {
        return e.pointerType
            ? e.pointerType === 'touch' || e.pointerType === e.MSPOINTER_TYPE_TOUCH
            : e.mozInputSource
            ? e.mozInputSource === 5
            : e.type.indexOf('touch') === 0;
    },

    isMultiTouchEvent: function (e) {
        return e.type
            && e.type.indexOf('touch') === 0
            && e.touches
            && e.touches.length > 1;
    },

    isMouseEvent: function (e) {
        return e.pointerType
            ? e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE
            : e.mozInputSource
            ? e.mozInputSource === 1
            : e.type.indexOf('mouse') === 0;
    },

    isLeftMouseButton: function (e) {
        return e.button === 0;
    },

    isMiddleMouseButton: function (e) {
        return e.button === 1;
    },

    isRightMouseButton: function (e) {
        return e.button === 2;
    },

    isPopupTrigger: function (e) {
        return domEvent.isRightMouseButton(e) || (detector.IS_MAC && domEvent.isControlDown(e) && !domEvent.isShiftDown(e) && !domEvent.isMetaDown(e) && !domEvent.isAltDown(e));
    },

    isShiftDown: function (e) {
        return e ? e.shiftKey : false;
    },

    isAltDown: function (e) {
        return e ? e.altKey : false;
    },

    isControlDown: function (e) {
        return e ? e.ctrlKey : false;
    },

    isMetaDown: function (e) {
        return e ? e.metaKey : false;
    },

    consume: function (e, preventDefault = true, stopPropagation = true) {

        if (preventDefault) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        }

        if (stopPropagation) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            e.cancelBubble = true;
        }

        e.consumed = true;
    }
};

export default domEvent;