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


// connectors
// ----------
import sharpConnector   from './shapes/connector/sharp';
import smoothConnector from './shapes/connector/smooth';
import roundedConnector from './shapes/connector/rounded';

Paper
    .registerConnector('sharp', sharpConnector)
    .registerConnector('smooth', smoothConnector)
    .registerConnector('rounded', roundedConnector);


// markers
// -------

import classicMarker from './shapes/marker/classic';
import diamondMarker from './shapes/marker/diamond';
import blockMarker   from './shapes/marker/block';
import clovenMarker  from './shapes/marker/cloven';
import ovalMarker    from './shapes/marker/oval';

Paper
    .registerMarker('classic', classicMarker)
    .registerMarker('diamond', diamondMarker)
    .registerMarker('cloven', clovenMarker)
    .registerMarker('block', blockMarker)
    .registerMarker('oval', ovalMarker);


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
}

export * from './geometry/index';
export * from './shapes/index';
