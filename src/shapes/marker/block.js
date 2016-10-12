import Point from '../../geometry/Point';

function blockMarker(vMarker, options) {

    if (vMarker) {

        let width  = options.width || 5;
        let height = options.height || width * Math.tan(1 / 5 * Math.PI);

        let pathArr = [];

        pathArr.push('M', width, 0);
        pathArr.push('L', 0, height);
        pathArr.push('L', width, height * 2);
        pathArr.push('Z');

        vMarker.attr({
            d: pathArr.join(' ')
        });


        // return the connection point on the marker
        return {
            rad: Math.atan2(height, width),
            point: new Point(width, height)
        };
    }
}

export default blockMarker;
