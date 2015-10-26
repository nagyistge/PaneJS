define([], function () {
    'use strict';

    function toString(str) {
        return '' + str;
    }

    function lcFirst(str) {
        str = str + '';
        return str.charAt(0).toLowerCase() + str.substr(1);
    }

    function ucFirst(str) {
        str = str + '';
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    function ltrim(str, chars) {
        chars = chars || '\\s';

        return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
    }

    function rtrim(str, chars) {
        chars = chars || '\\s';

        return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
    }

    function trim(str, chars) {
        return ltrim(rtrim(str, chars), chars);
    }

    return {
        toString: toString,
        lcFirst: lcFirst,
        ucFirst: ucFirst,
        ltrim: ltrim,
        rtrim: rtrim,
        trim: trim
    };
});
