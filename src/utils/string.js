import { isNil } from './lang';
import { getByPath } from './object';

const proto = String.prototype;

export const toString = str => '' + str;

export const toUpper = str => toString(str).toUpperCase();
export const toLower = str => toString(str).toLowerCase();

export const ucFirst = str => str.charAt(0).toUpperCase() + str.substring(1);
export const lcFirst = str => str.charAt(0).toLowerCase() + str.substring(1);

export const startWith = (str, prefix) => toString(str).indexOf(prefix) === 0;
export const endWith   = (str, suffix) => toString(str).indexOf(suffix, toString(str).length - suffix.length) !== -1;

export const split = (str, divider = /\s+/) => toString(str).split(divider);
export const trim  = str => str ? proto.trim.call('' + str) : '';


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

export const padStart = (str, max, pad) => padStr(str, max, pad, true);
export const padEnd   = (str, max, pad) => padStr(str, max, pad, false);


export function uuid() {

  // credit: http://stackoverflow.com/posts/2117523/revisions
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {

    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : (r & 0x3 | 0x8);

    return v.toString(16);
  });
}

export function hashCode(str) {

  // Return a simple hash code from a string.
  // See http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/.

  let hash   = 0;
  let length = str.length;

  if (length === 0) {
    return hash;
  }

  for (let i = 0; i < length; i++) {

    let c = str.charCodeAt(i);

    hash = ((hash << 5) - hash) + c;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

export function format(tpl, data) {

  if (tpl && data) {
    return toString(tpl).replace(/\$\{(.*?)\}/g, (input, key) => {
      let val = getByPath(data, key);
      return !isNil(val) ? val : input;
    });
  }

  return tpl;
}

export function escape(str) {

  let mapping = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  let badChars     = /[&<>"'`]/g;
  let shouldEscape = /[&<>"'`]/;

  if (shouldEscape.test(str)) {
    return str.replace(badChars, chr => mapping[chr]);
  }

  return str;
}

export function sanitizeText(text) {

  // Replace all spaces with the Unicode No-break space.
  // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
  // IE would otherwise collapse all spaces into one. This is useful
  // e.g. in tests when you want to compare the actual DOM text content
  // without having to add the unicode character in the place of all spaces.

  return toString(text).replace(/ /g, '\u00A0');
}
