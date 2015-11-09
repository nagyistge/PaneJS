import { toFloat }           from './number';


function toRadians(deg) {
    return Math.PI * deg / 180;
}

function roundPoint(point) {
    point.x = Math.round(point.x);
    point.y = Math.round(point.y);
    return point;
}

function rotatePoint(point, deg, center, rounded) {
    var rad = toRadians(deg);
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);

    return rotatePointEx(point, cos, sin, center, rounded);
}

function rotatePointEx(point, cos, sin, center, rounded) {
    var centerX = center ? center.x : 0;
    var centerY = center ? center.y : 0;
    var dx = point.x - centerX;
    var dy = point.y - centerY;

    var x1 = dx * cos - dy * sin;
    var y1 = dy * cos + dx * sin;

    point.x = x1 + centerX;
    point.y = y1 + centerY;

    return rounded ? roundPoint(point) : point;
}

function translatePoint(point, dx, dy) {
    point.x = toFloat(point.x) + dx;
    point.y = toFloat(point.y) + dy;
    return point;
}

function scalePoint(point, sx, sy) {
    point.x = toFloat(point.x) * sx;
    point.y = toFloat(point.y) * sy;
    return point;
}

function isEqualEntity(o1, o2) {
    return (!o1 && !o2) || (o1 && o1.equals(o2));
}

function isEqualEntities(arr1, arr2) {
    if ((!arr1 && arr2) ||
        (!arr2 && arr1) ||
        (!arr1 && !arr2 && arr1.length != arr2.length)) {
        return false;
    } else if (arr1 && arr2) {
        for (var i = 0, l = arr1.length; i < l; i++) {
            if (!isEqualEntity(arr1[i], arr2[i])) {
                return false;
            }
        }
    }

    return true;
}

function getAlignments(align, valign) {
    var dx = 0;
    var dy = 0;

    // Horizontal alignment
    if (align === 'center') {
        dx = -0.5;
    }
    else if (align === 'right') {
        dx = -1;
    }

    // Vertical alignment
    if (valign === 'middle') {
        dy = -0.5;
    }
    else if (valign === 'bottom') {
        dy = -1;
    }

    return {
        x: dx,
        y: dy
    };
}


export {
    toRadians,
    roundPoint,
    scalePoint,
    rotatePoint,
    rotatePointEx,
    translatePoint,
    isEqualEntity,
    isEqualEntities,
    getAlignments
};
