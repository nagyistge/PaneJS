import vector from '../../common/vector';
import Point  from '../../geometry/Point';


function ovalMarker(vMarker, options) {

    // Note: vMarker should be a `g` element

    if (vMarker) {

        let rx = options.rx || 3.5;
        let ry = options.ry || rx;

        let vEllipse = vector('ellipse');

        vEllipse.attr({
            cx: rx,
            cy: ry,
            rx: rx,
            ry: ry
        });

        // return the connection point on the marker
        return {
            rad: 0,
            vel: vEllipse,
            point: new Point(rx * 2, ry)
        };
    }
}

export default ovalMarker;

