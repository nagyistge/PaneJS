require('./style/index.less');

export * as utils         from './common/utils';
export vector, {VElement} from './common/vector';
export Events             from './common/Events';


export Cell from './cells/Cell';
export Link from './cells/Link';
export Node from './cells/Node';


export CellView from './views/CellView';
export LinkView from './views/LinkView';
export NodeView from './views/NodeView';


export Change      from './changes/Change'
export RootChange  from './changes/RootChange'
export ChildChange from './changes/ChildChange'


export Model from './core/Model';
export Paper from './core/Paper';


import Generic  from './shapes/basic/Generic';
import Text     from './shapes/basic/Text';
import Rect     from './shapes/basic/Rect';
import Circle   from './shapes/basic/Circle';
import Ellipse  from './shapes/basic/Ellipse';
import Image    from './shapes/basic/Image';
import Path     from './shapes/basic/Path';
import Polygon  from './shapes/basic/Polygon';
import Polyline from './shapes/basic/Polyline';
import Rhombus  from './shapes/basic/Rhombus';

var shapes = {
    basic: {
        Generic: Generic,
        Text: Text,
        Rect: Rect,
        Circle: Circle,
        Ellipse: Ellipse,
        Image: Image,
        Path: Path,
        Polygon: Polygon,
        Polyline: Polyline,
        Rhombus: Rhombus,
    }
};

export {
    shapes
}
