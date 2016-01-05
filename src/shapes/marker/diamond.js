import Point from '../../geometry/Point';


function diamondMarker(vMarker, options) {

    if (vMarker) {

        let rx = options.rx || 5;
        let ry = options.ry || 2.5;
        let pathArr = [];

        pathArr.push('M', rx, 0);
        pathArr.push('L', 0, ry);
        pathArr.push('L', rx, ry * 2);
        pathArr.push('L', rx * 2, ry);
        pathArr.push('Z');

        vMarker.attr('d', pathArr.join(' '));

        return new Point(rx * 2, ry);
    }
}

export default diamondMarker;


