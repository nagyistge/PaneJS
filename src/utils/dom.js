import {
  isNil,
  isObject,
  isString,
  isWindow,
  isBoolean,
  isFunction,
  isUndefined,
} from './lang';
import { forEach, reduce } from './array';
import { trim, split } from './string';
import { forIn } from './object';


// classNames
// ----------

const rclass       = /[\t\r\n\f]/g;
const rnotwhite    = (/\S+/g);
const transformKey = (() => {

  if (isUndefined(document)) {
    return '';
  }

  const element    = createElement('div');
  const transforms = [
    'transform',
    'webkitTransform',
    'OTransform',
    'MozTransform',
    'msTransform'
  ];

  for (let i = 0, l = transforms.length; i < l; i += 1) {

    const key = transforms[i];

    if (element.style[key] !== undefined) {
      return key;
    }
  }

  return transforms[0];
})();

const fillSpaces = str => ` ${str} `;

export function getClassName(elem) {

  return elem.getAttribute ? elem.getAttribute('class') : '';
}

export function hasClass(node, selector) {

  if (isNil(node) || isNil(selector)) {
    return false;
  }

  let classNames = fillSpaces(getClassName(node));
  let className  = fillSpaces(selector);

  return node.nodeType === 1
    ? classNames.replace(rclass, ' ').indexOf(className) > -1
    : false;
}

export function addClass(node, selector) {

  if (isNil(node) || isNil(selector)) {
    return;
  }

  if (isFunction(selector)) {
    addClass(node, selector.call(node, getClassName(node)));
    return;
  }

  if (isString(selector) && node.nodeType === 1) {

    let classes  = selector.match(rnotwhite) || [];
    let oldValue = fillSpaces(getClassName(node)).replace(rclass, ' ');
    let newValue = reduce(classes, (ret, cls) => {

      if (ret.indexOf(fillSpaces(cls)) < 0) {
        ret += `${cls} `;
      }

      return ret;

    }, oldValue);

    newValue = trim(newValue);

    if (oldValue !== newValue) {
      node.setAttribute('class', newValue);
    }
  }
}

export function removeClass(node, selector) {

  if (isNil(node)) {
    return;
  }

  if (isFunction(selector)) {
    removeClass(node, selector.call(node, getClassName(node)));
    return;
  }

  if ((!selector || isString(selector)) && node.nodeType === 1) {

    let classes  = (selector || '').match(rnotwhite) || [];
    let oldValue = fillSpaces(getClassName(node)).replace(rclass, ' ');
    let newValue = reduce(classes, (ret, cls) => {

      let className = fillSpaces(cls);

      if (ret.indexOf(className) > -1) {
        ret = ret.replace(className, ' ');
      }

      return ret;

    }, oldValue);

    newValue = selector ? trim(newValue) : '';

    if (oldValue !== newValue) {
      node.setAttribute('class', newValue);
    }
  }
}

export function toggleClass(node, selector, stateVal) {

  if (isNil(node) || isNil(selector)) {
    return;
  }

  if (isBoolean(stateVal) && isString(selector)) {
    stateVal
      ? addClass(node, selector)
      : removeClass(node, selector);

    return;
  }

  if (isFunction(selector)) {
    toggleClass(node, selector.call(node, getClassName(node), stateVal), stateVal);

    return;
  }

  if (isString(selector)) {
    forEach(selector.match(rnotwhite) || [], (cls) => {
      hasClass(node, cls)
        ? removeClass(node, cls)
        : addClass(node, cls);
    });
  }
}


// style
// -----

export function styleStrToObject(styleStr) {

  return reduce(split(styleStr, ';'), (result, style) => {

    if (style) {
      let [key, value] = split(style, '=');

      result[key] = trim(value);
    }

    return result;

  }, {});
}

export function setStyle(elem, name, value) {

  if (elem) {

    let pairs = {};

    if (isObject(name)) {

      pairs = name;

    } else if (isString(name) && isUndefined(value)) {

      pairs = styleStrToObject(name);

    } else {

      pairs[name] = value;
    }

    forIn(pairs, (v, k) => {
      elem.style[k === 'transform' ? transformKey : k] = v;
    });
  }
}

export function getComputedStyle(elem, name) {

  // IE9+

  let computed = elem.ownerDocument.defaultView.opener
    ? elem.ownerDocument.defaultView.getComputedStyle(elem, null)
    : window.getComputedStyle(elem, null);

  if (computed && name) {
    return computed.getPropertyValue(name) || computed[name];
  }

  return computed;
}

export function normalizeSides(box) {

  if (Object(box) !== box) {

    box = isNil(box) ? 0 : box;

    return {
      top: box,
      right: box,
      bottom: box,
      left: box
    };
  }

  return {
    top: isNil(box.top) ? 0 : box.top,
    right: isNil(box.right) ? 0 : box.right,
    bottom: isNil(box.bottom) ? 0 : box.bottom,
    left: isNil(box.left) ? 0 : box.left,
  };
}


// elem
// ----

const docElem = document.documentElement;

export const containsElement = docElem.compareDocumentPosition || docElem.contains ?
  (context, elem) => {

    let aDown = context.nodeType === 9 ? context.documentElement : context;
    let bUp   = elem && elem.parentNode;

    return context === bUp || !!(bUp && bUp.nodeType === 1 && (
        aDown.contains
          ? aDown.contains(bUp)
          : context.compareDocumentPosition && context.compareDocumentPosition(bUp) & 16
      ));
  } :
  (context, elem) => {

    if (elem) {

      /* eslint no-cond-assign: 0 */
      while ((elem = elem.parentNode)) {
        if (elem === context) {
          return true;
        }
      }
    }

    return false;
  };

export function createElement(tagName, doc) {

  return (doc || document).createElement(tagName);
}

export function removeElement(elem) {

  if (elem && elem.parentNode) {
    elem.parentNode.removeChild(elem);
  }
}

export function emptyElement(elem) {

  if (elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }
}

export function getNodeName(elem) {

  return elem.nodeName ? elem.nodeName.toLowerCase() : '';
}

export function isNode(elem, nodeName, attrName, attrValue) {

  let ret = elem && !isNaN(elem.nodeType);

  if (ret) {
    ret = isNil(nodeName) || getNodeName(elem) === nodeName.toLowerCase();
  }

  if (ret) {
    ret = isNil(attrName) || elem.getAttribute(attrName) === attrValue;
  }

  return ret;
}

export function getWindow(elem) {

  return isWindow(elem)
    ? elem : elem.nodeType === 9
    ? elem.defaultView || elem.parentWindow
    : false;
}

export function showHide(elem, show) {

  /* eslint no-underscore-dangle: "off" */

  if (elem && elem.style) {

    let display = elem.style.display;

    if (show && display === 'none') {

      if (!isUndefined(elem.__display)) {
        display = elem.__display;
        delete elem.__display;
      } else {
        display = '';
      }

      elem.style.display = display || '';

    } else if (!show && display !== 'none') {

      if (display) {
        elem.__display = display;
      }

      elem.style.display = 'none';
    }
  }
}

export function isHidden(elem) {

  return elem && (elem.style.display === 'none' || !containsElement(elem.ownerDocument, elem));
}

export function getOffset(elem) {

  let box = {
    top: 0,
    left: 0
  };

  let doc = elem && elem.ownerDocument;

  if (!doc) {
    return box;
  }

  let docElement = doc.documentElement;

  // Make sure it's not a disconnected DOM node
  if (!containsElement(docElement, elem)) {
    return box;
  }

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if (elem.getBoundingClientRect) {
    box = elem.getBoundingClientRect();
  }

  let win = getWindow(doc);
  let { top, left } = box;

  top += (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0);
  left += (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0);

  return { top, left };
}

export function getOffsetUntil(elem, stop) {

  let node = elem;
  let left = 0;
  let top  = 0;

  while (node && node !== stop && node !== document.documentElement) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent;
  }

  return { left, top };
}


// xml namespaces.
const ns = {
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink'
};

// svg version.
const svgVersion = '1.1';

function parseXML(str, async) {

  let xml;

  try {

    let parser = new DOMParser();

    if (!isUndefined(async)) {
      parser.async = async;
    }

    xml = parser.parseFromString(str, 'text/xml');

  } catch (error) {
    xml = null;
  }

  if (!xml || xml.getElementsByTagName('parsererror').length) {
    throw new Error(`Invalid XML: ${str}`);
  }

  return xml;
}

export function createSvgDocument(content) {

  // Create an SVG document element.
  // If `content` is passed, it will be used as the SVG content of
  // the `<svg>` root element.

  let svg = `<svg xmlns="${ns.xmlns}" xmlns:xlink="${ns.xlink}" version="${svgVersion}">${content || ''}</svg>`;
  let xml = parseXML(svg, false);
  return xml.documentElement;
}

export function createSvgElement(tagName, doc) {

  return (doc || document).createElementNS(ns.xmlns, tagName);
}


// attribute
// ---------

function qualifyAttributeName(name) {

  if (name.indexOf(':') !== -1) {

    let combined = name.split(':');

    return {
      ns: ns[combined[0]],
      local: combined[1]
    };
  }

  return {
    ns: null,
    local: name
  };
}

export function setAttribute(elem, name, value) {

  if (isNil(value)) {

    removeAttribute(elem, name);

  } else if (name === 'id') {

    elem.id = value;

  } else {

    let qualified = qualifyAttributeName(name);

    qualified.ns
      // attribute names can be namespaced. E.g. `image` elements
      // have a `xlink:href` attribute to set the source of the image.
      ? elem.setAttributeNS(qualified.ns, name, value)
      : elem.setAttribute(name, value);
  }
}

export function removeAttribute(elem, name) {

  let qualified = qualifyAttributeName(name);
  if (qualified.ns) {
    if (elem.hasAttributeNS(qualified.ns, qualified.local)) {
      elem.removeAttributeNS(qualified.ns, qualified.local);
    }
  } else if (elem.hasAttribute(name)) {
    elem.removeAttribute(name);
  }
}


// transform
// ---------

export function setScale(elem, sx, sy) {

  if (elem) {
    elem.style[transformKey] = `scale(${sx}, ${sy})`;
  }
}

export function setRotation(elem, angle, ox, oy) {

  if (elem) {
    elem.style[transformKey] = `rotate(${angle}, ${ox}, ${oy})`;
  }
}

export function setTranslate(elem, tx, ty) {

  if (elem) {

    let translate = `translateX(${tx}px) translateY(${ty}px)`;

    // if (transformKey !== 'msTransform') {
    //     // The Z transform will keep this in the GPU (faster, and prevents artifacts),
    //     // but IE9 doesn't support 3d transforms and will choke.
    //     translate += ' translateZ(0)';
    // }

    elem.style[transformKey] = translate;
  }
}

export function getTransformToElement(source, target) {

  if (source.getTransformToElement) {
    return source.getTransformToElement(target);
  }

  // chrome 48 removed svg getTransformToElement api

  let matrix;
  try {
    matrix = target.getScreenCTM().inverse();
  } catch (e) {
    throw new Error('Can not inverse source element\'s ctm.');
  }

  return matrix.multiply(source.getScreenCTM());
}

function getActualBoundingClientRect(node) {

  // same as native getBoundingClientRect, except it takes into
  // account  parent <frame> offsets if the element lies within
  // a nested document (<frame> or <iframe>-like).

  let boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable,
  // so we clone it We can't use extend because the properties are not
  // considered part of the object by hasOwnProperty in IE9

  let rect = {};

  /* eslint-disable guard-for-in */
  for (let k in boundingRect) {
    rect[k] = boundingRect[k];
  }
  /* eslint-enable guard-for-in */

  if (node.ownerDocument !== document) {
    let frameElement = node.ownerDocument.defaultView.frameElement;
    if (frameElement) {
      let frameRect = getActualBoundingClientRect(frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

export function getBounds(elem) {

  let doc;

  if (elem === document) {
    doc  = document;
    elem = document.documentElement;
  } else {
    doc = elem.ownerDocument;
  }

  const docEle = doc.documentElement;
  const bounds = getActualBoundingClientRect(elem);

  if (isUndefined(bounds.width)) {
    bounds.width = document.body.scrollWidth - bounds.left - bounds.right;
  }
  if (isUndefined(bounds.height)) {
    bounds.height = document.body.scrollHeight - bounds.top - bounds.bottom;
  }

  bounds.top    = bounds.top - docEle.clientTop;
  bounds.left   = bounds.left - docEle.clientLeft;
  bounds.right  = doc.body.clientWidth - bounds.width - bounds.left;
  bounds.bottom = doc.body.clientHeight - bounds.height - bounds.top;

  return bounds;
}

export function getScrollParent(elem) {

  // In firefox if the el is inside an iframe with display: none;
  // window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  let computed = getComputedStyle(elem) || {};
  let position = computed.position;

  if (position === 'fixed') {
    return elem;
  }

  let parent = elem;

  while (parent = parent.parentNode) {
    let style;

    /* eslint-disable no-empty */
    try {
      style = getComputedStyle(parent);
    } catch (err) { }
    /* eslint-enable no-empty */


    if (typeof style === 'undefined' || style === null) {
      return parent;
    }

    let overflow  = style.overflow;
    let overflowX = style.overflowX;
    let overflowY = style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        return parent;
      }
    }
  }

  return document.body;
}

export function getScrollBarWidth() {

  const inner = createElement('p');
  const outer = createElement('div');

  setStyle(inner, {
    width: '100%',
    height: '200px'
  });

  setStyle(outer, {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '200px',
    height: '100px'
  });

  outer.appendChild(inner);
  document.body.appendChild(outer);

  let w1 = inner.offsetWidth;

  outer.style.overflow = 'scroll';

  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);

  return w1 - w2;
}
