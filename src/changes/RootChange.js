
/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Change = require('./Change');

module.exports = Change.extend({

    constructor: function RootChange(model, root) {

        var change = this;

        Change.call(change, model);

        change.root = root;
        change.previous = root;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var previous = change.previous;

        change.root = previous;
        change.previous = model.rootChanged(previous);

        return change;
    }
});

