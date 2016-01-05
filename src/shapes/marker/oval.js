function ovalMarker(vMarker, options) {

    if (vMarker) {

        let size = options.size || 7;
        let pathArr = [];

        pathArr.push('M', size, 0);
        pathArr.push('L', 0, size / 2);
        pathArr.push('L', size, size);

        vMarker.attr({
            d: pathArr.join(' '),
            fill: 'none'
        });

        return true;
    }
}

export default ovalMarker;

