var Base = require('../Base');

module.exports = Base.extend({

    id: null,
    value: null,
    geometry: null,
    style: null,

    //vertex: false,
    //edge: false,
    //connectable: true,
    visible: true,
    //collapsed: false,

    //source: null,
    //target: null,

    parent: null,
    children: null,
    //edges: null,

    constructor: function Cell(value, geometry, style) {

        var that = this;

        that.value = value;
        that.setGeometry(geometry);
        that.setStyle(style);

        that.onInit && that.onInit();
    },



});
