import {
    each,
} from '../common/utils';
import Change from './Change';

export default Change.extend({
    constructor: function SelectionChange(selections, added, removed) {

        var that = this;

        that.selections = selections;
        that.added = added ? added.slice() : null;
        that.removed = removed ? removed.slice() : null;
    },

    digest() {

        var that = this;
        var added = that.added;
        var removed = that.removed;
        var selections = that.selections;

        removed && each(removed, function (item) {
            selections.cellRemoved(item);
        });

        added && each(added, function (item) {
            selections.cellAdded(item);
        });

        that.added = removed;
        that.removed = added;

        selections.emit('change', {added: added, removed: removed});

        return that;
    }
});