define(function(require, exports, module) {'use strict';
var Change = require('./Change');

module.exports = Change.extend({

    constructor: function CurrentRootChange(model, root) {

        var change = this;

        RootChange.superclass.constructor.call(change, model);

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

});