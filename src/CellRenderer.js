'use strict';

var Class = require('./common/class');

var CellRenderer = Class.create({
    // 静态属性和方法
    Statics: {
        shapes: {},
        registerShape: function (key, shape) {
            CellRenderer.shapes[key] = shape;
        }
    },
    constructor: function CellRenderer() {},

    defaultEdgeShape: null,
    defaultVertexShape: null,
    defaultTextShape: null,
    legacyControlPosition: true,
    legacySpacing: true,
    antiAlias: true,

    createShape: function (state) {

    },

    getShape: function (name) {
        return CellRenderer.shapes[name];
    },

    getShapeConstructor: function (state) {

    }

});
