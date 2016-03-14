import { trim    } from './string';
import { toFloat } from './number';


// parse transform
// ---------------

function parseTranslate(transform) {

    let translate = { tx: 0, ty: 0 };

    if (transform) {

        let separator = /[ ,]+/;

        let match = transform.match(/translate\((.*)\)/);
        if (match) {
            let arr = match[1].split(separator);

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

function parseScale(transform) {

    let scale = { sx: 1, sy: 1 };

    if (transform) {

        let separator = /[ ,]+/;

        let match = transform.match(/scale\((.*)\)/);
        if (match) {
            let arr = match[1].split(separator);

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

function parseRotate(transform) {

    let rotate = { angle: 0 };

    if (transform) {

        let separator = /[ ,]+/;

        let match = transform.match(/rotate\((.*)\)/);
        if (match) {
            let arr = match[1].split(separator);

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

function parseTransform(transform) {

    return {
        translate: parseTranslate(transform),
        rotate   : parseRotate(transform),
        scale    : parseScale(transform)
    };
}


// clear transform
// ---------------

function clearTranslate(transform) {

    return transform && trim(transform.replace(/translate\([^)]*\)/g, '')) || '';
}

function clearScale(transform) {

    return transform && trim(transform.replace(/scale\([^)]*\)/g, '')) || '';
}

function clearRotate(transform) {

    return transform && trim(transform.replace(/rotate\([^)]*\)/g, '')) || '';
}


// exports
// -------

export {
    parseScale,
    parseRotate,
    parseTransform,
    parseTranslate,
    clearScale,
    clearRotate,
    clearTranslate
};
