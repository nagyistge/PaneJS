var Class = require('../common/class');
var utils = require('../common/utils');

module.exports = Class.create({
    constructor: function MouseEvent(evt, state) {
        var that = this;

        that.evt = evt;
        that.state = state;
    },
});
