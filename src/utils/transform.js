import { toFloat }     from './number';
import { trim, split } from './string';


export function parseTranslate(transform) {

  let translate = { tx: 0, ty: 0 };

  if (transform) {

    let match = transform.match(/translate\((.*)\)/);
    if (match) {

      let arr = split(match[1], /[ ,]+/);
      if (arr[0]) {
        translate.tx += toFloat(arr[0]);
      }

      if (arr[1]) {
        translate.ty += toFloat(arr[1]);
      }
    }
  }

  return translate;
}

export function parseScale(transform) {

  let scale = { sx: 1, sy: 1 };

  if (transform) {

    let match = transform.match(/scale\((.*)\)/);
    if (match) {

      let arr = split(match[1], /[ ,]+/);
      if (arr[0]) {
        scale.sx *= toFloat(arr[0]);
      }

      if (arr[1] || arr[0]) {
        scale.sy *= toFloat(arr[1] || arr[0]);
      }
    }
  }

  return scale;
}

export function parseRotate(transform) {

  let rotate = { angle: 0 };

  if (transform) {

    let match = transform.match(/rotate\((.*)\)/);
    if (match) {

      let arr = split(match[1], /[ ,]+/);
      if (arr[0]) {
        rotate.angle += toFloat(arr[0]);
      }

      if (arr[1] && arr[2]) {
        rotate.cx = toFloat(arr[1]);
        rotate.cy = toFloat(arr[2]);
      }
    }
  }

  return rotate;
}

export function parseTransform(transform) {

  return {
    translate: parseTranslate(transform),
    rotate: parseRotate(transform),
    scale: parseScale(transform)
  };
}

export function clearTranslate(transform) {

  return transform ? trim(transform.replace(/translate\([^)]*\)/g, '')) : '';
}

export function clearScale(transform) {

  return transform ? trim(transform.replace(/scale\([^)]*\)/g, '')) : '';
}

export function clearRotate(transform) {

  return transform ? trim(transform.replace(/rotate\([^)]*\)/g, '')) : '';
}
