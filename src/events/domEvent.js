var utils = require('../common/utils');
var client = require('../client');

var each = utils.each;
var indexOf = utils.indexOf;

var IS_TOUCH = client.IS_TOUCH;
var IS_POINTER = client.IS_POINTER;

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

            if (client.IS_FF) {
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
        if (client.IS_NS && !document.documentMode) {
            var eventName = (client.IS_SF || client.IS_GC) ? 'mousewheel' : 'DOMMouseScroll';
            domEvent.on(window, eventName, wheelHandler);
        } else {
            domEvent.on(document, 'mousewheel', wheelHandler);
        }

    },

    getSource: function (evt) {
        return evt.srcElement || evt.target;
    },

};

module.exports = domEvent;
