import detector from '../common/detector';
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

var setPrefixedStyle = function () {
    var prefix = null;

    if (detector.IS_OP && detector.IS_OT) {
        prefix = 'O';
    }
    else if (detector.IS_SF || detector.IS_GC) {
        prefix = 'Webkit';
    }
    else if (detector.IS_MT) {
        prefix = 'Moz';
    }
    else if (detector.IS_IE && document.documentMode >= 9 && document.documentMode < 10) {
        prefix = 'ms';
    }

    return function (style, name, value) {
        style[name] = value;

        if (prefix && name.length > 0) {
            name = prefix + name.substring(0, 1).toUpperCase() + name.substring(1);
            style[name] = value;
        }
    };
}();


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
    setPrefixedStyle,
    write
};
