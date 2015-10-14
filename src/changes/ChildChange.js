
/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */

var Change = require('./Change');
var utils = require('../utils');

module.exports = Change.extend({

    constructor: function ChildChange(model, parent, child, index) {

        var change = this;

        ChildChange.superclass.constructor.call(change, model);

        change.parent = parent;
        change.child = child;
        change.index = index;
        change.previous = parent;
        change.previousIndex = index;
    },

    digest: function () {

        var change = this;
        var model = change.model;
        var child = change.child;
        var previous = change.previous;
        var previousIndex = change.previousIndex;

        var oldParent = model.getParent(child);
        var oldIndex = oldParent ? oldParent.getIndex(child) : 0;

        if (previous) {
            change.connect(child, false);
        }

        oldParent = model.parentForCellChanged(child, previous, previousIndex);

        if (previous) {
            change.connect(child, true);
        }

        change.parent = previous;
        change.index = previousIndex;
        change.previous = oldParent;
        change.previousIndex = oldIndex;

        return change;
    },

    connect: function (cell, isConnect) {

        var change = this;
        var model = change.model;

        isConnect = utils.isNullOrUndefined(isConnect) ? true : isConnect;

        var source = cell.getTerminal(true);
        var target = cell.getTerminal(false);

        if (source) {
            if (isConnect) {
                model.terminalForCellChanged(cell, source, true);
            }
            else {
                model.terminalForCellChanged(cell, null, true);
            }
        }

        if (target) {
            if (isConnect) {
                model.terminalForCellChanged(cell, target, false);
            }
            else {
                model.terminalForCellChanged(cell, null, false);
            }
        }

        cell.setTerminal(source, true);
        cell.setTerminal(target, false);

        var childCount = model.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            change.connect(model.getChildAt(cell, i), isConnect);
        }

        return change;
    }
});
