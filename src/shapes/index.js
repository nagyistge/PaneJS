import Text     from './basic/Text';
import Rect     from './basic/Rect';
import Circle   from './basic/Circle';
import Ellipse  from './basic/Ellipse';
import Image    from './basic/Image';
import Path     from './basic/Path';
import Polygon  from './basic/Polygon';
import Polyline from './basic/Polyline';
import Rhombus  from './basic/Rhombus';

import RectPort  from './port/Rect';

let shapes = {
    basic: {
        Text,
        Rect,
        Circle,
        Ellipse,
        Image,
        Path,
        Polygon,
        Polyline,
        Rhombus
    },
    port: {
        Rect: RectPort
    }
};


export {
    shapes
}
