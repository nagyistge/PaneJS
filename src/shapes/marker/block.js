import Point from '../../geometry/Point';

function blockMarker(vMarker, options) {

    if (vMarker) {

        let size = options.size || 7;
        let pathArr = [];

        pathArr.push('M', size, 0);
        pathArr.push('L', 0, size / 2);
        pathArr.push('L', size, size);
        pathArr.push('Z');

        vMarker.attr({
            d: pathArr.join(' ')
        });


        // return the connection point on the marker
        return {
            rad: Math.atan2(size / 2, size),
            point: new Point(size, size / 2)
        };
    }
}

export default blockMarker;


