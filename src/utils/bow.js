import { isNullOrUndefined } from './lang'


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

export {
    isNode,
    getCurrentStyle
};
