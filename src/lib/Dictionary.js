import {
    keys,
    forIn
} from '../common/utils'

import Base           from './Base';
import objectIdentity from '../common/objectIdentity';


export default Base.extend({

    constructor: function Dictionary() {
        this.clear();
    },

    clear() {
        var that = this;
        that.map = {};
        return that;
    },

    get(obj) {
        var id = objectIdentity.get(obj);
        return this.map[id];
    },

    put(obj, value) {

        var map = this.map;
        var id = objectIdentity.get(obj);
        var previous = map[id];

        map[id] = value;

        return previous;
    },

    remove(obj) {

        var map = this.map;
        var id = objectIdentity.get(obj);
        var previous = map[id];

        delete map[id];

        return previous;
    },

    getKeys() {
        return keys(this.map);
    },

    getValues() {
        var result = [];
        forIn(this.map, function (value) {
            result.push(value);
        });
        return result;
    },

    each(visitor, context) {
        var that = this;
        forIn(that.map, visitor, context);
        return that;
    }
});

