'use strict';

var Class = require('./common/class');

module.exports = Class.create({
    // 静态属性和方法
    Statics: {
        shapes: {},
        registerShape: function (key, shape) {
            CellRenderer.shapes[key] = shape;
        }
    },

    defaultEdgeShape: null,
    defaultVertexShape: null,
    defaultTextShape: null,
    legacyControlPosition: true,
    legacySpacing: true,
    antiAlias: true,

    constructor: function CellRenderer() {},

    createShape: function (state) {

    },

    getShape: function (name) {
        return this.constructor.shapes[name];
    },

    getShapeConstructor: function (state) {

    }
});


