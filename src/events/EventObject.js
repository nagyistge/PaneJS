import { extend } from '../common/utils';
import Base from '../lib/Base';

export default Base.extend({
    constructor: function EventObject(name, eventData) {

        var that = this;
        var data = that.data = {};

        that.name = name;
        that.consumed = false;

        eventData && extend(data, eventData);
    },

    getName: function () {
        return this.name;
    },

    getData: function (key) {
        var data = this.data;
        return key ? data[key] : data;
    },

    isConsumed: function () {
        return this.consumed;
    },

    consume: function () {
        this.consumed = true;
    }
});
