import Handler from './Handler';
// import vector from '../common/vector';
// import * as utils from '../common/utils';

class ConnectionHandler extends Handler {
    init(options = {}) {
        let that = this;
        let paper = that.paper;
        // let model = that.model;

        that.name = options.name || 'connect';

        paper.on('cell:mouseover', function (/* cell, view, e/* , x, y */) {
        });
        paper.on('cell:mouseout', function (/* cell, view, e/* , x, y */) {
        });
        return that;
    }
}

export default ConnectionHandler;
