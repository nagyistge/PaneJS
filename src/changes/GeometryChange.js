
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Change = require('./Change');

module.exports = Change.extend({

    constructor: function RootChange(model, cell, geometry) {
        var change = this;

        Change.call(change, model);

        change.cell = cell;
        change.geometry = geometry;
        change.previous = geometry;
    },

    digest: function () {
        var change = this;
        change.geometry = change.previous;
        change.previous = change.model.geometryForCellChanged(
            change.cell, change.previous);
        return change;
    }
});

