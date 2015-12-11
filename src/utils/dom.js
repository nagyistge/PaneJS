import { isUndefined,isNullOrUndefined, isWindow } from './lang';

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

var docElem  = document.documentElement;
var contains = docElem.compareDocumentPosition || docElem.contains ?
    function (context, elem) {

        var aDown = context.nodeType === 9 ? context.documentElement : context;
        var bUp   = elem && elem.parentNode;

        return context === bUp || !!( bUp && bUp.nodeType === 1 && (
                aDown.contains
                    ? aDown.contains(bUp)
                    : context.compareDocumentPosition && context.compareDocumentPosition(bUp) & 16
            ));
    } :
    function (context, elem) {

        if (elem) {
            while ((elem = elem.parentNode)) {
                if (elem === context) {
                    return true;
                }
            }
        }
        return false;
    };

function getWindow(elem) {

    return isWindow(elem)
        ? elem : elem.nodeType === 9
        ? elem.defaultView || elem.parentWindow
        : false;
}

function getOffset(elem) {

    var box = {top: 0, left: 0};
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
    if (!isUndefined(elem.getBoundingClientRect)) {
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
            ? elem.setAttributeNS(ns[combined[0]], combined[1], value)
            : elem.setAttribute(name, value);
    }
}


// exports
// -------

export {
    isNode,
    getWindow,
    getOffset,
    getNodeName,
    getClassName,
    setAttribute,
    createSvgElement,
    createSvgDocument,
    contains as containsElem,
}
