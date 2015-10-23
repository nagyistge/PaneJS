define([
    '../lib/Base'
], function (
    Base
) {
    'use strict';

    return Base.extend({
        constructor: function Change() {},
        digest: function () {
            return this;
        }
    });
});
