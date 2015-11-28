var math = Math;
var PI = math.PI;
var round = math.round;

function toDeg(rad) {
    return (180 * rad / PI) % 360;
}

function toRad(deg, over360) {
    deg = over360 ? deg : (deg % 360);
    return deg * PI / 180;
}

function snapToGrid(val, gridSize) {
    return gridSize * round(val / gridSize);
}

function normalizeAngle(angle) {
    return (angle % 360) + (angle < 0 ? 360 : 0);
}

export {
    toDeg,
    toRad,
    snapToGrid,
    normalizeAngle,
}