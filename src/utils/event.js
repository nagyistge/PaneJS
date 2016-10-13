import { isFunction } from '../utils/lang';
import { some } from '../utils/array';
import { containsElement } from '../utils/dom';
import detector            from '../common/detector';


const WIN      = window;
const DOC      = window.document;
const IS_TOUCH = detector.IS_TOUCH;

const hooks = {
    mouseenter: {
        type: 'mouseover',
        wrap: mouseEnterLeaveWrap
    },
    mouseleave: {
        type: 'mouseout',
        wrap: mouseEnterLeaveWrap
    }
};

const isMatchSelector = function () {

    const testDiv = DOC.createElement('div');

    // match selector
    const matchesSelector = testDiv.matches ||
        testDiv.webkitMatchesSelector ||
        testDiv.mozMatchesSelector ||
        testDiv.msMatchesSelector ||
        testDiv.oMatchesSelector;

    const hasMatchesSelector = matchesSelector && matchesSelector.call(testDiv, 'div');

    return function (elem, selector) {

        if (hasMatchesSelector) {
            return matchesSelector.call(elem, selector);
        }

        let parent = elem.parentNode;

        // if the element is an orphan, and the browser doesn't support matching
        // orphans, append it to a documentFragment
        if (!parent && !hasMatchesSelector) {
            parent = DOC.createDocumentFragment();
            parent.appendChild(elem);
        }

        // from the parent element's context, get all nodes that match the selector
        let nodes = parent.querySelectorAll(selector);

        return some(nodes, node => node === elem);
    };
}();

function mouseEnterLeaveWrap(elem, handler) {
    return function (e) {
        if (!isHover(e.delegateTarget || elem, e)) {
            handler.call(this, e);
        }
    };
}

function isHover(elem, e) {

    const target = e.type === 'mouseover'
        ? e.relatedTarget || e.fromElement
        : e.relatedTarget || e.toElement;

    return containsElement(elem, target) || elem === target;
}

function fixEvent(e) {

    // add W3C standard event methods
    e.preventDefault  = fixEvent.preventDefault;
    e.stopPropagation = fixEvent.stopPropagation;

    return e;
}

fixEvent.preventDefault = function () {

    this.returnValue = false;
};

fixEvent.stopPropagation = function () {

    this.cancelBubble = true;
};

function handleEvent(event) {

    let result  = true;
    let element = this;

    // grab the event object (IE uses a global event object)
    event = event || fixEvent((DOC.parentWindow || WIN).event);

    // get a reference to the hash table of event handlers
    let handlers = element.events[event.type];

    // execute each event handler
    for (let key in handlers) {

        if (handlers.hasOwnProperty(key)) {

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
            handler.$$guid = ++addEvent.guid;
        }

        // create a hash table of event types for the element
        if (!elem.events) {
            elem.events = {};
        }

        let fixedName = 'on' + type;

        // create a hash table of event handlers for each element/event pair
        let handlers = elem.events[type];
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
        elem[fixedName]          = handleEvent;
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


export function removeEventListener(elem, type, handler) {

    let hook    = hooks[type];
    let wrapper = handler._delegateWrapper;

    type = hook ? hook.type : type;

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

export function addEventListener(elem, type, selector, handler, once) {

    let hook = hooks[type];

    type = hook ? hook.type : type;

    if (isFunction(selector)) {
        return hook
            ? addEvent(elem, type, hook.wrap(elem, selector))
            : addEvent(elem, type, selector);
    }

    function wrapper(e) {

        // if this event has a delegateTarget, then we add it to the event
        // object (so that handlers may have a reference to the delegator
        // element) and fire the callback
        let delegateTarget = getDelegateTarget(elem, e.target, selector);
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

export function normalizeEvent(e) {

    let touchEvent = IS_TOUCH
        && e.originalEvent
        && e.originalEvent.changedTouches
        && e.originalEvent.changedTouches[0];

    if (touchEvent) {
        for (let prop in e) {
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

export const hasAltKey   = e => e.altKey;
export const hasCtrlKey  = e => e.ctrlKey;
export const hasMetaKey  = e => e.metaKey;
export const hasShiftKey = e => e.shiftKey;

export const hasModifierKey    = (e) => {

    return hasCtrlKey(e) || hasMetaKey(e) || hasShiftKey(e);
};
export const isLeftMouseButton = (e) => {

    return detector.IS_IE
        ? e.button === 1
        : e.button === 0;
};
