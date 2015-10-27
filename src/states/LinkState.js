import State from './State';


export default State.extend({
    constructor: function LinkState(view, cell, style) {

        var that = this;

        LinkState.superclass.constructor.call(that, view, cell, style);

        that.absolutePoints = null;
        that.visibleSourceState = null;
        that.visibleTargetState = null;
        that.terminalDistance = 0;
        that.length = 0;
        that.segments = null;
    },

    getVisibleNode: function (isSource) {
        var state = this.getVisibleTerminalState(isSource);

        return state ? state.cell : null;
    },

    getVisibleNodeState: function (isSource) {
        return isSource ? this.visibleSourceState : this.visibleTargetState;
    },

    setVisibleNodeState: function (state, isSource) {
        if (isSource) {
            this.visibleSourceState = state;
        } else {
            this.visibleTargetState = state;
        }
    },

    setAbsolutePoint: function (point, isSource) {

        var that = this;
        var absolutePoints = that.absolutePoints;

        if (!absolutePoints) {
            absolutePoints = that.absolutePoints = [];
        }

        var length = absolutePoints.length;

        if (isSource) {
            length
                ? absolutePoints[0] = point
                : absolutePoints.push(point);
        } else {
            if (length === 0) {
                absolutePoints.push(null);
                absolutePoints.push(point);
            } else if (length === 1) {
                absolutePoints.push(point);
            } else {
                absolutePoints[length - 1] = point;
            }
        }

        return that;
    }
});
