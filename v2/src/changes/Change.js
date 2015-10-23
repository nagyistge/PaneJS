define([
    '../lib/Base'
], function (
    Base
) {
    'use strict';

    return Base.extend({
        constructor: function Change(model) {},
        digest: function () {
            return this;
        }
    });
});
