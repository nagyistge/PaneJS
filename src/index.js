// styles
// ------

require('./style/index.less');


// common
// ------
import * as utils           from './common/utils';
import vector, { VElement } from './common/vector';
import detector             from './common/detector';
import Events               from './common/Events';


// core
// ----
import Model from './core/Model';
import Paper from './core/Paper';


// models
// ------
import Cell     from './cells/Cell';
import Link     from './cells/Link';
import Node     from './cells/Node';
import Portal   from './cells/Portal';
import Terminal from './cells/Terminal';


// views
// -----
import CellView   from './views/CellView';
import LinkView   from './views/LinkView';
import NodeView   from './views/NodeView';
import PortalView from './views/PortalView';
import VectorView from './views/VectorView';


import Handler           from './handlers/Handler';
import SelectionHandler  from './handlers/Selection';
import ConnectionHandler from './handlers/Connection';


// connectors
// ----------
import sharpConnector   from './shapes/connector/sharp';
import smoothConnector  from './shapes/connector/smooth';
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
    detector,
    vector,
    VElement,
    Events,

    Model,
    Paper,

    Cell,
    Link,
    Node,
    Portal,
    Terminal,

    CellView,
    LinkView,
    NodeView,
    PortalView,
    VectorView,

    Handler,
    SelectionHandler,
    ConnectionHandler,
};

export * from './shapes/index';
export * from './changes/index';
export * from './geometry/index';
