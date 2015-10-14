'use strict';

var klass = require('../class');

module.exports = klass.create({

    constructor: function Change(model) {
        this.model = model;
    },

    digest: function () { }
});

