
/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document, window */

var utils = require('../common/utils');
var detector = require('../common/detector');
var MouseEvent = require('./MouseEvent');

var each = utils.each;
var indexOf = utils.indexOf;

var IS_TOUCH = detector.IS_TOUCH;
var IS_POINTER = detector.IS_POINTER;

var domEvent = {
    ACTIVATE: 'activate',
    ADD: 'add',
    ADD_CELLS: 'addCells',
    ADD_OVERLAY: 'addOverlay',
    ADD_VERTEX: 'addVertex',
    AFTER_ADD_VERTEX: 'afterAddVertex',
    ALIGN_CELLS: 'alignCells',
    BEFORE_ADD_VERTEX: 'beforeAddVertex',
    BEFORE_UNDO: 'beforeUndo',
    BEGIN_UPDATE: 'beginUpdate',
    CELLS_ADDED: 'cellsAdded',
    CELLS_FOLDED: 'cellsFolded',
    CELLS_MOVED: 'cellsMoved',
    CELLS_ORDERED: 'cellsOrdered',
    CELLS_REMOVED: 'cellsRemoved',
    CELLS_RESIZED: 'cellsResized',
    CELLS_TOGGLED: 'cellsToggled',
    CELL_CONNECTED: 'cellConnected',
    CHANGE: 'change',
    CLEAR: 'clear',
    CLICK: 'click',
    CLOSE: 'close',
    CONNECT: 'connect',
    CONNECT_CELL: 'connectCell',
    CUSTOM_HANDLE: -100,
    DESTROY: 'destroy',
    DISCONNECT: 'disconnect',
    DONE: 'done',
    DOUBLE_CLICK: 'doubleClick',
    DOWN: 'down',
    EDITING_STARTED: 'editingStarted',
    EDITING_STOPPED: 'editingStopped',
    END_EDIT: 'endEdit',
    END_UPDATE: 'endUpdate',
    ESCAPE: 'escape',
    EXECUTE: 'execute',
    EXECUTED: 'executed',
    FIRED: 'fired',
    FIRE_MOUSE_EVENT: 'fireMouseEvent',
    FLIP_EDGE: 'flipEdge',
    FOLD_CELLS: 'foldCells',
    GESTURE: 'gesture',
    GET: 'get',
    GROUP_CELLS: 'groupCells',
    HIDE: 'hide',
    LABEL_CHANGED: 'labelChanged',
    LABEL_HANDLE: -1,
    LAYOUT_CELLS: 'layoutCells',
    MARK: 'mark',
    MAXIMIZE: 'maximize',
    MINIMIZE: 'minimize',
    MOUSE_DOWN: 'mouseDown',
    MOUSE_MOVE: 'mouseMove',
    MOUSE_UP: 'mouseUp',
    MOVE: 'move',
    MOVE_CELLS: 'moveCells',
    MOVE_END: 'moveEnd',
    MOVE_START: 'moveStart',
    NORMALIZE: 'normalize',
    NOTIFY: 'notify',
    ORDER_CELLS: 'orderCells',
    PAN: 'pan',
    PAN_END: 'panEnd',
    PAN_START: 'panStart',
    POST: 'post',
    RECEIVE: 'receive',
    REDO: 'redo',
    REFRESH: 'refresh',
    REMOVE: 'remove',
    REMOVE_CELLS: 'removeCells',
    REMOVE_CELLS_FROM_PARENT: 'removeCellsFromParent',
    REMOVE_OVERLAY: 'removeOverlay',
    RESET: 'reset',
    RESIZE: 'resize',
    RESIZE_CELLS: 'resizeCells',
    RESIZE_END: 'resizeEnd',
    RESIZE_START: 'resizeStart',
    RESUME: 'resume',
    ROOT: 'root',
    ROTATION_HANDLE: -2,
    SAVE: 'save',
    SCALE: 'scale',
    SCALE_AND_TRANSLATE: 'scaleAndTranslate',
    SELECT: 'select',
    SHOW: 'show',
    SIZE: 'size',
    SPLIT_EDGE: 'splitEdge',
    START: 'start',
    START_EDIT: 'startEdit',
    START_EDITING: 'startEditing',
    SUSPEND: 'suspend',
    TAP_AND_HOLD: 'tapAndHold',
    TOGGLE_CELLS: 'toggleCells',
    TRANSLATE: 'translate',
    UNDO: 'undo',
    UNGROUP_CELLS: 'ungroupCells',
    UP: 'up',
    UPDATE_CELL_SIZE: 'updateCellSize',


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

        if (list) {
            each(list, function (entry) {
                domEvent.off(element, entry.eventName, entry.callback);
            });
        }
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

    redirectMouseEvents: function (node, graph, state, down, move, up, dblClick) {
        var getState = function (evt) {
            return (typeof(state) == 'function') ? state(evt) : state;
        };

        domEvent.onGesture(node,
            function (evt) {
                if (down !== null) {
                    down(evt);
                } else if (!domEvent.isConsumed(evt)) {
                    graph.fireMouseEvent(domEvent.MOUSE_DOWN, new MouseEvent(evt, getState(evt)));
                }
            },
            function (evt) {
                if (move !== null) {
                    move(evt);
                } else if (!domEvent.isConsumed(evt)) {
                    graph.fireMouseEvent(domEvent.MOUSE_MOVE, new MouseEvent(evt, getState(evt)));
                }
            },
            function (evt) {
                if (up !== null) {
                    up(evt);
                } else if (!domEvent.isConsumed(evt)) {
                    graph.fireMouseEvent(domEvent.MOUSE_UP, new MouseEvent(evt, getState(evt)));
                }
            });

        domEvent.on(node, 'dblclick', function (evt) {
            if (dblClick !== null) {
                dblClick(evt);
            } else if (!domEvent.isConsumed(evt)) {
                var tmp = getState(evt);
                graph.dblClick(evt, (tmp !== null) ? tmp.cell : null);
            }
        });
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
        return evt.pointerType ?
            (evt.pointerType === 'touch' || evt.pointerType === evt.MSPOINTER_TYPE_TOUCH) :
            (evt.mozInputSource ? evt.mozInputSource === 5 : evt.type.indexOf('touch') === 0);
    },

    isMultiTouchEvent: function (evt) {
        return evt.type &&
            evt.type.indexOf('touch') === 0 &&
            evt.touches &&
            evt.touches.length > 1;
    },

    isMouseEvent: function (evt) {
        return evt.pointerType ?
            (evt.pointerType === 'mouse' || evt.pointerType === evt.MSPOINTER_TYPE_MOUSE) :
            (evt.mozInputSource ? evt.mozInputSource === 1 : evt.type.indexOf('mouse') === 0);
    },

    isLeftMouseButton: function (evt) {
        return evt.button === ((detector.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) ? 1 : 0);
    },

    isMiddleMouseButton: function (evt) {
        return evt.button === ((
            detector.IS_IE && (
                typeof(document.documentMode) === 'undefined' ||
                document.documentMode < 9
            )) ? 4 : 1);
    },

    isRightMouseButton: function (evt) {
        return evt.button === 2;
    },

    isPopupTrigger: function (evt) {
        return domEvent.isRightMouseButton(evt) || (
            detector.IS_MAC &&
            domEvent.isControlDown(evt) &&
            !domEvent.isShiftDown(evt) &&
            !domEvent.isMetaDown(evt) &&
            !domEvent.isAltDown(evt)
        );
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
    },

    isConsumed: function (evt) {
        return evt.isConsumed !== null && evt.isConsumed;
    },
};

module.exports = domEvent;
