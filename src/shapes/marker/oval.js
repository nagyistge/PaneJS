import vector from '../../common/vector';
import Point  from '../../geometry/Point';


function ovalMarker(vMarker, options) {


    if (vMarker) {

        let rx = options.rx || 5;
        let ry = options.ry || rx;

        let vEllipse = vector('ellipse');

        vEllipse.attr({
            cx: rx,
            cy: ry,
            rx: rx,
            ry: ry
        });

        vMarker.append(vEllipse);

        return new Point(rx * 2, ry);
    }
}

export default ovalMarker;

