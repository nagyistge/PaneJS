import {
    isNil,
    isString,
    isWindow,
    isBoolean,
    isFunction,
    isUndefined
} from './lang';

import { forEach, reduce } from './array'
import { trim            } from './string'


const rclass    = /[\t\r\n\f]/g;
const rnotwhite = (/\S+/g);

function getClassName(elem) {

    return elem.getAttribute && elem.getAttribute('class') || '';
}

function hasClass(node, selector) {

    if (isNil(node) || isNil(selector)) {
        return false;
    }

    let classNames = fillSpaces(getClassName(node));
    let className  = fillSpaces(selector);

    return node.nodeType === 1
        ? classNames.replace(rclass, ' ').indexOf(className) > -1
        : false;
}

function addClass(node, selector) {

    if (isNil(node) || isNil(selector)) {
        return;
    }

    if (isFunction(selector)) {
        return addClass(node, selector.call(node, getClassName(node)));
    }

    if (isString(selector) && node.nodeType === 1) {

        let classes  = selector.match(rnotwhite) || [];
        let oldValue = fillSpaces(getClassName(node)).replace(rclass, ' ');
        let newValue = reduce(classes, function (ret, cls) {

            if (ret.indexOf(fillSpaces(cls)) < 0) {
                ret += cls + ' ';
            }

            return ret;

        }, oldValue);

        newValue = trim(newValue);

        if (oldValue !== newValue) {
            node.setAttribute('class', newValue);
        }
    }
}

function removeClass(node, selector) {

    if (isNil(node)) {
        return;
    }

    if (isFunction(selector)) {
        return removeClass(node, selector.call(node, getClassName(node)));
    }

    if ((!selector || isString(selector)) && node.nodeType === 1) {

        let classes  = (selector || '').match(rnotwhite) || [];
        let oldValue = fillSpaces(getClassName(node)).replace(rclass, ' ');
        let newValue = reduce(classes, function (ret, cls) {

            let className = fillSpaces(cls);

            if (ret.indexOf(className) > -1) {
                ret = ret.replace(className, ' ');
            }

            return ret;

        }, oldValue);

        newValue = selector ? trim(newValue) : '';

        if (oldValue !== newValue) {
            node.setAttribute('class', newValue);
        }
    }
}

function toggleClass(node, selector, stateVal) {

    if (isNil(node) || isNil(selector)) {
        return;
    }

    if (isBoolean(stateVal) && isString(selector)) {
        return stateVal
            ? addClass(node, selector)
            : removeClass(node, selector);
    }

    if (isFunction(selector)) {
        return toggleClass(node, selector.call(node, getClassName(node), stateVal), stateVal);
    }

    if (isString(selector)) {
        forEach(selector.match(rnotwhite) || [], function (cls) {

            hasClass(node, cls)
                ? removeClass(node, cls)
                : addClass(node, cls);

        });
    }
}

function fillSpaces(str) {
    return ' ' + str + ' ';
}


const docElem         = document.documentElement;
const containsElement = docElem.compareDocumentPosition || docElem.contains ?
    function (context, elem) {

        let aDown = context.nodeType === 9 ? context.documentElement : context;
        let bUp   = elem && elem.parentNode;

        return context === bUp || !!(bUp && bUp.nodeType === 1 && (
                aDown.contains
                    ? aDown.contains(bUp)
                    : context.compareDocumentPosition && context.compareDocumentPosition(bUp) & 16
            ));
    } :
    function (context, elem) {

        if (elem) {

            /* eslint no-cond-assign: 0 */
            while ((elem = elem.parentNode)) {
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

    let ret = elem && !isNaN(elem.nodeType);

    if (ret) {
        ret = isNil(nodeName) || getNodeName(elem) === nodeName.toLowerCase();
    }

    if (ret) {
        ret = isNil(attrName) || elem.getAttribute(attrName) === attrValue;
    }

    return ret;
}

function getWindow(elem) {

    return isWindow(elem)
        ? elem : elem.nodeType === 9
        ? elem.defaultView || elem.parentWindow
        : false;
}

function getOffset(elem) {

    let box = {
        top: 0,
        left: 0
    };

    let doc = elem && elem.ownerDocument;

    if (!doc) {
        return box;
    }

    let docElement = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if (!containsElement(docElement, elem)) {
        return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if (elem.getBoundingClientRect) {
        box = elem.getBoundingClientRect();
    }

    let win = getWindow(doc);

    return {
        top: box.top + (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0),
        left: box.left + (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0)
    };
}

function showHide(elem, show) {

    if (elem && elem.style) {

        let display = elem.style.display;

        if (show) {
            if (display === 'none') {

                if (!isUndefined(elem.__display)) {
                    display = elem.__display;
                    delete elem.__display;
                } else {
                    display = '';
                }

                elem.style.display = display || '';
            }
        } else {
            if (display !== 'none') {

                if (display) {
                    elem.__display = display;
                }

                elem.style.display = 'none';
            }
        }
    }
}

function isHidden(elem) {

    return elem && (elem.style.display === 'none' || !containsElement(elem.ownerDocument, elem));
}

// xml namespaces.
let ns = {
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink'
};
// svg version.
let svgVersion = '1.1';

function parseXML(str, async) {

    let xml;

    try {

        let parser = new DOMParser();

        if (!isUndefined(async)) {
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

    let svg = '<svg xmlns="' + ns.xmlns + '" xmlns:xlink="' + ns.xmlns + '" version="' + svgVersion + '">' + (content || '') + '</svg>';
    let xml = parseXML(svg, false);
    return xml.documentElement;
}

function createSvgElement(tagName, doc) {

    return (doc || document).createElementNS(ns.xmlns, tagName);
}


function setAttribute(elem, name, value) {

    if (isNil(value)) {
        return removeAttribute(elem, name);
    }

    if (name === 'id') {
        elem.id = value;
    } else {

        let qualified = qualifyAttributeName(name);

        qualified.ns
            // attribute names can be namespaced. E.g. `image` elements
            // have a `xlink:href` attribute to set the source of the image.
            ? elem.setAttributeNS(qualified.ns, name, value)
            : elem.setAttribute(name, value);
    }
}

function removeAttribute(elem, name) {

    let qualified = qualifyAttributeName(name);

    if (qualified.ns) {
        if (elem.hasAttributeNS(qualified.ns, qualified.local)) {
            elem.removeAttributeNS(qualified.ns, qualified.local);
        }
    } else if (elem.hasAttribute(name)) {
        elem.removeAttribute(name);
    }
}

function qualifyAttributeName(name) {

    if (name.indexOf(':') !== -1) {
        let combined = name.split(':');
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


function getComputedStyle(elem, name) {

    // IE9+

    let computed = elem.ownerDocument.defaultView.opener
        ? elem.ownerDocument.defaultView.getComputedStyle(elem, null)
        : window.getComputedStyle(elem, null);

    if (computed && name) {
        return computed.getPropertyValue(name) || computed[name];
    }

    return computed;
}

function getTransformToElement(source, target) {

    if (source.getTransformToElement) {
        return source.getTransformToElement(target);
    }

    // chrome 48 removed svg getTransformToElement api

    let matrix;
    try {
        matrix = target.getScreenCTM().inverse();
    } catch (e) {
        throw new Error('Can not inverse source element\'s ctm.');
    }

    return matrix.multiply(source.getScreenCTM());
}


const transformKey = (function () {

    if (isUndefined(document)) {
        return '';
    }

    const element    = createElement('div');
    const transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];

    for (let i = 0; i < transforms.length; ++i) {

        const key = transforms[i];

        if (element.style[key] !== undefined) {
            return key;
        }
    }
})();

function setScale(elem, sx, sy) {

    if (elem) {
        elem.style[transformKey] = 'scale(' + sx + ',' + sy + ')';
    }
}

function setRotation(elem, angle, ox, oy) {

    if (elem) {
        elem.style[transformKey] = 'rotate(' + angle + ',' + ox + ',' + oy + ')';
    }
}

function setTranslate(elem, tx, ty) {

    if (elem) {

        var translate = 'translateX(' + tx + 'px) translateY(' + ty + 'px)';

        if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            translate += ' translateZ(0)';
        }

        elem.style[transformKey] = translate;
    }
}

function getBounds(elem) {

    let doc;

    if (elem === document) {
        doc  = document;
        elem = document.documentElement;
    } else {
        doc = elem.ownerDocument;
    }

    const docElem = doc.documentElement;
    const result  = {};
    // The original object returned by getBoundingClientRect is immutable, so we clone it
    // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
    const rect = elem.getBoundingClientRect();
    for (let k in rect) {
        result[k] = rect[k];
    }

    if (isUndefined(result.width)) {
        result.width = document.body.scrollWidth - result.left - result.right;
    }
    if (isUndefined(result.height)) {
        result.height = document.body.scrollHeight - result.top - result.bottom;
    }

    result.top    = result.top - docElem.clientTop;
    result.left   = result.left - docElem.clientLeft;
    result.right  = doc.body.clientWidth - result.width - result.left;
    result.bottom = doc.body.clientHeight - result.height - result.top;

    return result;
}


// exports
// -------

export {
    isNode,
    showHide,
    isHidden,
    getWindow,
    getOffset,
    getNodeName,

    createElement,
    createSvgDocument,
    createSvgElement,
    emptyElement,
    removeElement,
    containsElement,


    hasClass,
    addClass,
    removeClass,
    toggleClass,
    getClassName,


    setAttribute,
    removeAttribute,
    qualifyAttributeName,

    setScale,
    setRotation,
    setTranslate,

    getBounds,
    getComputedStyle,
    getTransformToElement
};
