import {
    keys,
    forIn
} from '../common/utils'

import Base             from './Base';
import objectIdentity   from '../common/objectIdentity';


export default Base.extend({

    constructor: function Dictionary() {
        this.clear();
    },

    clear: function () {
        var that = this;

        that.map = {};

        return that;
    },

    get: function (key) {
        var id = objectIdentity.get(key);
        return this.map[id];
    },

    put: function (key, value) {

        var map = this.map;
        var id = objectIdentity.get(key);
        var previous = map[id];

        map[id] = value;

        return previous;
    },

    remove: function (key) {

        var map = this.map;
        var id = objectIdentity.get(key);
        var previous = map[id];

        delete map[id];

        return previous;
    },

    getKeys: function () {
        return keys(this.map);
    },

    getValues: function () {

        var result = [];

        forIn(this.map, function (value) {
            result.push(value);
        });

        return result;
    },

    each: function (visitor, context) {

        var that = this;

        forIn(that.map, visitor, context);

        return that;
    }
});

