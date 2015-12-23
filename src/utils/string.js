import { getByPath } from './object';

let proto = String.prototype;

function toString(str) {

    return '' + str;
}

function uc(str) {

    return ('' + str).toUpperCase();
}

function lc(str) {

    return ('' + str).toLowerCase();
}

function trim(str) {

    return str ? proto.trim.call('' + str) : '';
}

function uuid() {

    // credit: http://stackoverflow.com/posts/2117523/revisions

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0;
        let v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function hashCode(str) {

    // Return a simple hash code from a string.
    // See http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/.

    let hash   = 0;
    let length = str.length;

    if (length === 0) {
        return hash;
    }

    for (let i = 0; i < length; i++) {
        let c = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + c;
        hash  = hash & hash; // Convert to 32bit integer
    }

    return hash;
}

function format(tpl, data) {

    data = data || {};

    return ('' + tpl).replace(/\$\{(\w+)\}/g, function (input, key) {
        let val = getByPath(data, key);
        return val !== undefined ? val : input;
    });
}

function sanitizeText(text) {

    // Replace all spaces with the Unicode No-break space.
    // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
    // IE would otherwise collapse all spaces into one. This is useful
    // e.g. in tests when you want to compare the actual DOM text content
    // without having to add the unicode character in the place of all spaces.

    return (text || '').replace(/ /g, '\u00A0');
}


// exports
// -------

export {
    lc,
    uc,
    trim,
    uuid,
    format,
    hashCode,
    toString,
    sanitizeText
};
