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

    return function (element, selector) {

        if (hasMatchesSelector) {
            return matchesSelector.call(element, selector);
        }

        var parentElem = element.parentNode;

        // if the element is an orphan, and the browser doesn't support matching
        // orphans, append it to a documentFragment
        if (!parentElem && !hasMatchesSelector) {
            parentElem = doc.createDocumentFragment();
            parentElem.appendChild(element);
        }

        // from the parent element's context, get all nodes that match the selector
        var nodes = parentElem.querySelectorAll(selector);

        return some(nodes, function (node) {
            return node === element;
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

function addEvent(element, type, handler) {

    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else {

        // assign each event handler a unique ID
        if (!handler.$$guid) {
            handler.$$guid = ++addEvent.guid;
        }

        // create a hash table of event types for the element
        if (!element.events) {
            element.events = {};
        }

        var fixedName = 'on' + type;

        // create a hash table of event handlers for each element/event pair
        var handlers = element.events[type];
        if (!handlers) {
            handlers = element.events[type] = {};
            // store the existing event handler (if there is one)
            if (element[fixedName]) {
                handlers[0] = element[fixedName];
            }
        }
        // store the event handler in the hash table
        handlers[handler.$$guid] = handler;
        // assign a global event handler to do all the work
        element[fixedName] = handleEvent;
    }
}

addEvent.guid = 0;

function getDelegateTarget(element, target, selector) {
    while (target && target !== element) {
        if (isMatchSelector(target, selector)) {
            return target;
        }
        target = target.parentElement;
    }
    return null;
}

function addEventListener(element, type, selector, handler, once) {

    if (isFunction(selector)) {
        return addEvent(element, type, selector);
    }

    function wrapper(e) {

        // if this event has a delegateTarget, then we add it to the event
        // object (so that handlers may have a reference to the delegator
        // element) and fire the callback
        if (e.delegateTarget = getDelegateTarget(element, e.target, selector)) {
            if (once === true) {
                removeEventListener(element, type, wrapper);
            }
            handler.call(element, e);
        }
    }

    handler._delegateWrapper = wrapper;
    addEvent(element, type, wrapper);

    return handler;
}

function removeEventListener(element, type, handler) {

    var wrapper = handler._delegateWrapper;

    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
        wrapper && element.removeEventListener(type, wrapper, false);
    } else {
        // delete the event handler from the hash table
        if (element.events && element.events[type]) {
            delete element.events[type][handler.$$guid];

            if (wrapper) {
                delete element.events[type][wrapper.$$guid];
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
