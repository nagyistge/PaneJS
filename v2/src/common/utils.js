define([
    '../utils/lang',
    '../utils/string',
    '../utils/number',
    '../utils/object',
    '../utils/array',
    '../utils/function',
    '../utils/bow',
], function (
    lang,
    string,
    number,
    object,
    array,
    func,
    bow
) {
    'use strict';

    var sources = array.toArray(arguments);

    sources.unshift({});

    return object.extend.apply(null, sources);

});
