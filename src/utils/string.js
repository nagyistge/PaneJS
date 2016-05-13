import { isNil } from './lang';
import { getByPath } from './object';

let proto = String.prototype;

function toString(str) {

    return '' + str;
}

function toUpper(str) {

    return toString(str).toUpperCase();
}

function toLower(str) {

    return toString(str).toLowerCase();
}

function ucFirst(str) {

    return str.charAt(0).toUpperCase() + str.substring(1);
}

function lcFirst(str) {

    return str.charAt(0).toLowerCase() + str.substring(1);
}

function split(str, divider = /\s+/) {

    return toString(str).split(divider);
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

    if (tpl && data) {
        return ('' + tpl).replace(/\$\{(\w+)\}/g, function (input, key) {
            let val = getByPath(data, key);
            return val !== undefined ? val : input;
        });
    }

    return tpl;
}

function sanitizeText(text) {

    // Replace all spaces with the Unicode No-break space.
    // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
    // IE would otherwise collapse all spaces into one. This is useful
    // e.g. in tests when you want to compare the actual DOM text content
    // without having to add the unicode character in the place of all spaces.

    return (text || '').replace(/ /g, '\u00A0');
}

function startWith(str, prefix) {

    return ('' + str).indexOf(prefix) === 0;
}

function endWith(str, suffix) {

    str = '' + str;

    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function padStr(str, max, pad, isStart) {

    if (isNil(str) || isNil(max)) {
        return str;
    }

    let result    = String(str);
    let targetLen = typeof max === 'number'
        ? max
        : parseInt(max, 10);

    if (isNaN(targetLen) || !isFinite(targetLen)) {
        return result;
    }


    let length = result.length;
    if (length >= targetLen) {
        return result;
    }


    let fill = isNil(pad) ? '' : String(pad);
    if (fill === '') {
        fill = ' ';
    }

    let fillLen = targetLen - length;

    while (fill.length < fillLen) {
        fill += fill;
    }

    let truncated = fill.length > fillLen ? fill.substr(0, fillLen) : fill;

    return isStart
        ? truncated + result
        : result + truncated;
}

function padStart(str, max, pad) {

    return padStr(str, max, pad, true);
}

function padEnd(str, max, pad) {

    return padStr(str, max, pad, false);
}


// exports
// -------

export {
    toLower,
    toUpper,
    ucFirst,
    lcFirst,
    trim,
    split,
    uuid,
    format,
    hashCode,
    toString,
    sanitizeText,
    startWith,
    endWith,
    padStart,
    padEnd
};
