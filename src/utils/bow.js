import { isNullOrUndefined } from './lang';
import constants from '../enums/constants';

var NS_SVG = 'http://www.w3.org/2000/svg';

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

export {
    isNode,
    getCurrentStyle,
    createSvgElement
};
