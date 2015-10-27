import State from './State';


export default State.extend({
    constructor: function NodeState(view, cell, style) {

        var that = this;

        NodeState.superclass.constructor.call(that, view, cell, style);
    },

    clone: function () {}
});
