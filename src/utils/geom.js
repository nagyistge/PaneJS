function toDeg(rad) {

    return (180 * rad / Math.PI) % 360;
}

function toRad(deg, over360) {

    deg = over360 ? deg : (deg % 360);

    return deg * Math.PI / 180;
}

function snapToGrid(val, gridSize, method = 'round') {

    return Math[method](val / gridSize) * gridSize;
}

function normalizeAngle(angle) {

    return (angle % 360) + (angle < 0 ? 360 : 0);
}


// exports
// -------

export {
    toDeg,
    toRad,
    snapToGrid,
    normalizeAngle,
};
