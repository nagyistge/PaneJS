define(function(require, exports, module) {window.zGraph = module.exports = {
    Canvas2D: require('./Canvas2D'),
    Cell: require('./Cell'),
    CellRenderer: require('./CellRenderer'),
    CellState: require('./CellState'),
    EventObject: require('./events/EventObject'),
    Geometry: require('./Geometry'),
    Graph: require('./Graph'),
    Model: require('./Model'),
    Point: require('./Point'),
    Rectangle: require('./Rectangle'),
    Shape: require('./shapes/Shape'),
    View: require('./View'),
    constants: require('./constants')
};
});