export function toDeg(rad) {

    return (180 * rad / Math.PI) % 360;
}

export function toRad(deg, over360) {

    deg = over360 ? deg : (deg % 360);

    return deg * Math.PI / 180;
}

export function snapToGrid(val, gridSize = 1, method = 'round') {

    return Math[method](val / gridSize) * gridSize;
}

export function normalizeAngle(angle) {

    return (angle % 360) + (angle < 0 ? 360 : 0);
}
