import Cell from './Cell';

export default Cell.extend({

    defaults: {
        position: {
            x: 0,
            y: 0,
            relative: false
        },
        size: {
            width: 1,
            height: 1,
            relative: false
        },
        rotation: {
            angle: 0,
            relative: false
        },
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        angle: 0
    },

    constructor: function Node(attributes) {
        Node.superclass.constructor.call(this, attributes);
    },

    getPosition: function (relative) {

    },

    setPosition: function (x, y, relative) {

    },

    translate: function () {

    },

    resize: function (width, height) {},

    rotate: function () {

    },

    isNode: function () {
        return true;
    },

    getBBox: function () {
        return false;
    }
});
