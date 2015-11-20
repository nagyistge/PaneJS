var proto = String.prototype;

// Replace all spaces with the Unicode No-break space.
// ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
// IE would otherwise collapse all spaces into one. This is useful e.g. in
// tests when you want to compare the actual DOM text content without having
// to add the unicode character in the place of all spaces.
function sanitizeText(text) {
    return (text || '').replace(/ /g, '\u00A0');
}

function trim(str) {
    return proto.trim.call(str);
}

export {
    trim,
    sanitizeText
}