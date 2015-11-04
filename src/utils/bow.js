import { isNullOrUndefined } from './lang';

var NS_SVG = 'http://www.w3.org/2000/svg';

function getBaseUrl() {
    var href = window.location.href;
    var hash = href.lastIndexOf('#');

    if (hash > 0) {
        href = href.substring(0, hash);
    }

    return href;
}

function isNode(node, nodeName, attributeName, attributeValue) {
    var ret = node && !isNaN(node.nodeType);

    if (ret) {
        ret = isNullOrUndefined(nodeName) || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }

    if (ret) {
        ret = isNullOrUndefined(attributeName) || node.getAttribute(attributeName) === attributeValue;
    }

    return ret;
}

function getCurrentStyle(node) {
    return node.currentStyle || window.getComputedStyle(node, null);
}

function createSvgElement(tagName, ownerDocument, namespace) {

    var doc = ownerDocument || document;
    var ele = null;

    if (tagName) {
        if (doc.createElementNS) {
            ele = doc.createElementNS(namespace || NS_SVG, tagName);
        } else {
            ele = doc.createElement(tagName);
            namespace && ele.setAttribute('xmlns', namespace);
        }
    }

    return ele;
}

function write(parent, text) {
    var doc = parent.ownerDocument;
    var node = doc.createTextNode(text);

    if (parent) {
        parent.appendChild(node);
    }

    return node;
}

export {
    getBaseUrl,
    isNode,
    getCurrentStyle,
    createSvgElement,
    write
};
