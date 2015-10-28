import { toFloat }           from './number';
import { isNullOrUndefined } from './lang';


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

function isPointEqual(point1, point2) {
    return (!point1 && !point2) || (point1 && point1.equals(point2));
}

function isPointsEqual(points1, points2) {
    if ((!points1 && points2) ||
        (!points2 && points1) ||
        (!points1 && !points2 && points1.length != points2.length)) {
        return false;
    } else if (points1 && points2) {
        for (var i = 0, l = points1.length; i < l; i++) {
            if (!isPointEqual(points1[i], points2[i])) {
                return false;
            }
        }
    }

    return true;
}

function isRectangleEqual(rect1, rect2) {
    return (!rect1 && !rect2) || (rect1 && rect1.equals(rect2));
}

export {
    toRadians,
    roundPoint,
    scalePoint,
    rotatePoint,
    rotatePointEx,
    translatePoint,
    isPointEqual,
    isPointsEqual,
    isRectangleEqual
};
