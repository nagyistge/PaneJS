import { isUndefined } from './lang';

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

function getClassName(elem) {
    return elem.getAttribute && elem.getAttribute('class') || '';
}

function getNodeName(elem) {
    return elem.nodeName ? elem.nodeName.toLowerCase() : '';
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


export {
    isNode,
    createSvgDocument,
    createSvgElement,
    setAttribute,
    getClassName,
    getNodeName
}
