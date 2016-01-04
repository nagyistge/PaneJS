import * as utils from '../../common/utils'


// default size of jump if not specified in options
var JUMP_SIZE = 5;

// available jump types
var JUMP_TYPES = ['arc', 'gap', 'cubic'];

// takes care of math. error for case when jump is too close to end of line
var CLOSE_PROXIMITY_PADDING = 1;

// list of connector types not to jump over.
var IGNORED_CONNECTORS = ['smooth'];


function jumpover(sourcePoint, targetPoint, vertices, options = {}) {

}


export default jumpover;
