var proto = String.prototype;

function toString(str) {
    return '' + str;
}

function uc(str) {
    return ('' + str).toUpperCase();
}

function lc(str) {
    return ('' + str).toLowerCase();
}

function sanitizeText(text) {

    // Replace all spaces with the Unicode No-break space.
    // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
    // IE would otherwise collapse all spaces into one. This is useful
    // e.g. in tests when you want to compare the actual DOM text content
    // without having to add the unicode character in the place of all spaces.

    return (text || '').replace(/ /g, '\u00A0');
}

function trim(str) {
    return str ? proto.trim.call('' + str) : '';
}


export {
    lc,
    uc,
    trim,
    toString,
    sanitizeText
}
