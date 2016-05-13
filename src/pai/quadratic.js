function quadratic(sourcePoint, targetPoint) {

    let centerX = (sourcePoint.x + targetPoint.x) / 2;
    let centerY = (sourcePoint.y + targetPoint.y) / 2;

    return [
        'M', sourcePoint.x, sourcePoint.y,
        'Q', sourcePoint.x, sourcePoint.y + 50,
        centerX, centerY,
        'T',
        targetPoint.x, targetPoint.y
    ].join(' ');
}


// exports
// -------

export default quadratic;
