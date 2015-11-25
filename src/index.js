var pane = {
    geom: {
        Point: require('./geometry/Point')
    },
    utils: require('./common/utils'),
    Class: require('./common/Class'),
    Events: require('./common/Events'),
    Graph: require('./core/Graph'),
    Paper: require('./core/Paper'),
    shapes: {
        basic: {
            Generic: require('./shapes/basic/Generic'),
            Rect: require('./shapes/basic/Rect'),
        }
    }
};

module.exports = pane;
