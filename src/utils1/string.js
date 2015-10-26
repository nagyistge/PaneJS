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

export {
    toString,
    lcFirst,
    ucFirst,
    ltrim,
    rtrim,
    trim
};
