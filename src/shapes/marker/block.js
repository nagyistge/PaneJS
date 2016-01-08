import Point from '../../geometry/Point';

function blockMarker(vMarker, options) {

    if (vMarker) {

        let rx = options.rx || 7;
        let ry = options.ry || rx / 2;

        let pathArr = [];

        pathArr.push('M', rx, 0);
        pathArr.push('L', 0, ry);
        pathArr.push('L', rx, ry * 2);
        pathArr.push('Z');

        vMarker.attr({
            d: pathArr.join(' ')
        });


        // return the connection point on the marker
        return {
            rad: Math.atan2(ry, rx),
            point: new Point(rx, ry)
        };
    }
}

export default blockMarker;
