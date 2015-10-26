'use strict';

var Class = require('./class');
var utils = require('./utils');
var objectIdentity = require('./objectIdentity');

var isObject = utils.isObject;
var keys = utils.keys;
var each = utils.each;

function getId(key) {

    if (isObject(key)) {
        return objectIdentity.get(key);
    }

    return '' + key;
}

module.exports = Class.create({

    constructor: function Dictionary() {
        return this.clear();
    },

    clear: function () {
        var dic = this;

        dic.map = {};

        return dic;
    },

    get: function (key) {
        var id = getId(key);
        return this.map[id];
    },

    set: function (key, value) {

        var map = this.map;
        var id = getId(key);
        var previous = map[id];

        map[id] = value;

        return previous;
    },

    remove: function (key) {

        var map = this.map;
        var id = getId(key);
        var previous = map[id];

        delete map[id];

        return previous;
    },

    getKeys: function () {
        return keys(this.map);
    },

    getValues: function () {

        var result = [];

        each(this.map, function (value) {
            result.push(value);
        });

        return result;
    },

    visit: function (visitor) {

        var dic = this;

        each(dic.map, visitor);

        return dic;
    }
});
