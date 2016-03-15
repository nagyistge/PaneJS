import Text      from './basic/Text';
import Rect      from './basic/Rect';
import Path      from './basic/Path';
import Ports     from './basic/Ports';
import Image     from './basic/Image';
import Circle    from './basic/Circle';
import Rhombus   from './basic/Rhombus';
import Ellipse   from './basic/Ellipse';
import Polygon   from './basic/Polygon';
import Polyline  from './basic/Polyline';
import PortsView from './basic/PortsView';

import RectPort  from './port/Rect';

let shapes = {
    basic: {
        Text,
        Rect,
        Path,
        Image,
        Ports,
        Circle,
        Rhombus,
        Ellipse,
        Polygon,
        Polyline,
        PortsView
    },
    port: {
        Rect: RectPort
    }
};


export {
    shapes
};
