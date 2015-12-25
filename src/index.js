require('./style/index.less');

import * as utils         from './common/utils';
import vector, {VElement} from './common/vector';
import Events             from './common/Events';


import Model from './core/Model';
import Paper from './core/Paper';


import Cell from './cells/Cell';
import Link from './cells/Link';
import Node from './cells/Node';


import CellView from './views/CellView';
import LinkView from './views/LinkView';
import NodeView from './views/NodeView';


import Change         from './changes/Change'
import RootChange     from './changes/RootChange'
import ChildChange    from './changes/ChildChange'
import TerminalChange from './changes/TerminalChange'


import Text     from './shapes/basic/Text';
import Rect     from './shapes/basic/Rect';
import Circle   from './shapes/basic/Circle';
import Ellipse  from './shapes/basic/Ellipse';
import Image    from './shapes/basic/Image';
import Path     from './shapes/basic/Path';
import Polygon  from './shapes/basic/Polygon';
import Polyline from './shapes/basic/Polyline';
import Rhombus  from './shapes/basic/Rhombus';

import PortRect  from './shapes/port/Rect';


import sharp from './shapes/connector/sharp';
import rounded  from './shapes/connector/rounded';


// register default connectors and markers
Paper
    .registerConnector('sharp', sharp)
    .registerConnector('rounded', rounded);


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
        Rect
    }
};


// exports
// -------

export {
    utils,
    vector,
    VElement,

    Cell,
    Link,
    Node,

    CellView,
    LinkView,
    NodeView,

    Change,
    RootChange,
    ChildChange,
    TerminalChange,

    Model,
    Paper,

    shapes
}
