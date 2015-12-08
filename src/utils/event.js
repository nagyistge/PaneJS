import { isFunction } from './lang'
import { some } from './array'


var win = window;
var doc = document;
var isMatchSelector = function () {

    var testDiv = doc.createElement('div');
    var matchesSelector = testDiv.matches ||
        testDiv.webkitMatchesSelector ||
        testDiv.mozMatchesSelector ||
        testDiv.msMatchesSelector ||
        testDiv.oMatchesSelector;
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

        return some(nodes, function (node) {
            return node === elem;
        });
    }
}();

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

    if (isFunction(selector)) {
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

    var touchEvt = evt.originalEvent
        && evt.originalEvent.changedTouches
        && evt.originalEvent.changedTouches[0];

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

export {
    normalizeEvent,
    addEventListener,
    removeEventListener
}
