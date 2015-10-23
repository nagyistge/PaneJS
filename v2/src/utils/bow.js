define([
    './lang'
], function (
    lang
) {
    'use strict';

    var isNullOrUndefined = lang.isNullOrUndefined;

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

    return {
        isNode: isNode
    };
});
