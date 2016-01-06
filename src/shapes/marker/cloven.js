import * as utils from '../../common/utils';
import Point from '../../geometry/Point';

function clovenMarker(vMarker, options) {

    if (vMarker) {

        let rx = options.rx || 7;
        let ry = options.ry || rx / 2;
        let pathArr = [];

        pathArr.push('M', rx, 0);
        pathArr.push('L', 0, ry);
        pathArr.push('L', rx, ry * 2);

        vMarker.attr('d', pathArr.join(' '));

        return {
            rad: Math.atan2(ry, rx),
            point: new Point(0, ry)
        };
    }
}

export default clovenMarker;

