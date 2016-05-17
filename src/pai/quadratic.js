function quadratic(sourcePoint, targetPoint) {

    let centerX   = (sourcePoint.x + targetPoint.x) / 2;
    let centerY   = (sourcePoint.y + targetPoint.y) / 2;
    let tolerance = 50;

    let sub = targetPoint.y - sourcePoint.y;

    if (sub > -100 && sub < 100) {
        tolerance = Math.max(Math.abs((targetPoint.y - sourcePoint.y)) / 2, 30);
    }

    return [
        'M', sourcePoint.x, sourcePoint.y,
        'Q', sourcePoint.x, sourcePoint.y + tolerance,
        centerX, centerY,
        'T',
        targetPoint.x, targetPoint.y
    ].join(' ');
}


// exports
// -------

export default quadratic;
