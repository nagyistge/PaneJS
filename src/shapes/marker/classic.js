import Point from '../../geometry/Point';


function classicMarker(vMarker, options) {

    if (vMarker) {

        let size = options.size || 7;
        let pathArr = [];

        pathArr.push('M', 0, size / 2);
        pathArr.push('L', size, 0);
        pathArr.push('L', size * 0.75, size / 2);
        pathArr.push('L', size, size);
        pathArr.push('Z');

        vMarker.attr('d', pathArr.join(' '));

        return new Point(size * 0.75, size / 2);
    }
}

export default classicMarker;
