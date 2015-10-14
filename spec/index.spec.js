
var zeroZgraph = require('../src/index.js');

var assert = chai.assert;

// NOTICE:
// you should start a static server in the root of this project
// then run this test

describe('zero-zgraph', function () {
    it('exists', function () {
        assert.typeOf(zeroZgraph, 'object');
    });
});

